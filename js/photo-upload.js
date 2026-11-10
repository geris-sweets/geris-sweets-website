/* =========================================================
   INSPIRATION PHOTO UPLOAD — with safety checks
   Every file goes through three gates before it can be sent:
     1. Signature check: the file's first bytes must really be a
        JPG, PNG, WebP or GIF (a renamed program or document fails,
        whatever its name says).
     2. Full decode: the browser must be able to open it as a picture.
     3. Clean copy: the picture is redrawn into a brand-new JPEG.
        Only the pixels survive. Hidden data, scripts, camera details
        and GPS location are thrown away. The original is never sent.
   ========================================================= */
(function () {
  var GS = window.GS;
  var LIMITS = {
    maxFiles: 6,                    // photos per order
    maxBytes: 20 * 1024 * 1024,     // 20 MB per original file
    maxPixels: 40e6,                // 40 megapixels (guards against "decompression bombs")
    minSide: 32,                    // pixels
    outMaxSide: 2000,               // cleaned copy: longest side, pixels
    outQuality: 0.85                // cleaned copy: JPEG quality
  };
  var items = [];   // {id, file, status: 'checking'|'ok'|'bad', blob, name, url, msg}
  var seq = 0;

  /* ---------- 1. Signature check ---------- */
  function ascii(b, s, e) { var t = ''; for (var i = s; i < e; i++) t += String.fromCharCode(b[i]); return t; }
  function sniff(b) {
    if (b.length >= 3 && b[0] === 0xFF && b[1] === 0xD8 && b[2] === 0xFF) return 'JPG';
    if (b.length >= 8 && [0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A].every(function (v, i) { return b[i] === v; })) return 'PNG';
    if (b.length >= 6 && /^GIF8[79]a$/.test(ascii(b, 0, 6))) return 'GIF';
    if (b.length >= 12 && ascii(b, 0, 4) === 'RIFF' && ascii(b, 8, 12) === 'WEBP') return 'WebP';
    return null;
  }
  function readHead(file) {
    if (file.slice(0, 1).arrayBuffer) return file.slice(0, 16).arrayBuffer().then(function (a) { return new Uint8Array(a); });
    return new Promise(function (res, rej) {
      var r = new FileReader(); r.onload = function () { res(new Uint8Array(r.result)); }; r.onerror = rej; r.readAsArrayBuffer(file.slice(0, 16));
    });
  }

  /* ---------- 2. Decode ---------- */
  function decode(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: 'from-image' })
        .catch(function () { return createImageBitmap(file); })
        .catch(function () { return decodeWithImg(file); });
    }
    return decodeWithImg(file);
  }
  function decodeWithImg(file) {
    return new Promise(function (res, rej) {
      var url = URL.createObjectURL(file), img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); res(img); };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error('decode')); };
      img.src = url;
    });
  }

  /* ---------- 3. Clean copy ---------- */
  function reencode(img) {
    var w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
    var k = Math.min(1, LIMITS.outMaxSide / Math.max(w, h));
    var cw = Math.max(1, Math.round(w * k)), ch = Math.max(1, Math.round(h * k));
    var c = document.createElement('canvas'); c.width = cw; c.height = ch;
    var ctx = c.getContext('2d');
    ctx.fillStyle = '#ffffff'; ctx.fillRect(0, 0, cw, ch);   // transparent areas become white
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, 0, 0, cw, ch);
    if (img.close) img.close();
    return new Promise(function (res, rej) {
      c.toBlob(function (b) { b ? res(b) : rej(new Error('encode')); }, 'image/jpeg', LIMITS.outQuality);
    });
  }

  function safeName(n, i) {
    var base = String(n || 'photo').replace(/\.[^.]*$/, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 40);
    return 'photo-' + (i + 1) + (base ? '-' + base : '') + '.jpg';
  }
  function size(b) { return b < 1024 * 1024 ? Math.max(1, Math.round(b / 1024)) + ' KB' : (b / 1024 / 1024).toFixed(1) + ' MB'; }

  async function process(it) {
    var f = it.file;
    try {
      if (!f.size) throw new Error('This file is empty.');
      if (f.size > LIMITS.maxBytes) throw new Error('Too large (' + size(f.size) + '). Please use a photo under 20 MB.');
      var kind = sniff(await readHead(f));
      if (!kind) {
        if (/hei[cf]/i.test(f.type) || /\.hei[cf]$/i.test(f.name)) throw new Error('This is an iPhone HEIC photo, which this browser can’t open. Please share it as a JPG (or take a screenshot) and try again.');
        throw new Error('This isn’t a picture. Only JPG, PNG, WebP or GIF images can be uploaded.');
      }
      var img;
      try { img = await decode(f); } catch (e) { throw new Error('This ' + kind + ' file is damaged or isn’t a real image.'); }
      var w = img.width || img.naturalWidth, h = img.height || img.naturalHeight;
      if (!w || !h) throw new Error('This file isn’t a readable image.');
      if (w * h > LIMITS.maxPixels) { if (img.close) img.close(); throw new Error('This image is too large (' + Math.round(w * h / 1e6) + ' megapixels).'); }
      if (Math.min(w, h) < LIMITS.minSide) { if (img.close) img.close(); throw new Error('This image is too small to be useful.'); }
      var blob = await reencode(img);
      if (items.filter(function (x) { return x.status === 'ok'; }).length >= LIMITS.maxFiles) {
        throw new Error('Photo limit reached — up to ' + LIMITS.maxFiles + ' photos per order.');
      }
      it.blob = blob; it.kind = kind; it.status = 'ok';
      it.url = URL.createObjectURL(blob);
      it.msg = kind + ' · ' + size(f.size) + ' → cleaned ' + size(blob.size);
    } catch (e) {
      it.status = 'bad'; it.msg = e.message;
    }
    render();
  }

  /* ---------- UI ---------- */
  var zone, input, list, counter;
  function okCount() { return items.filter(function (x) { return x.status === 'ok'; }).length; }
  function add(fileList) {
    var files = Array.prototype.slice.call(fileList || []);
    // Check up to 20 files at a time; only photos that PASS count toward the limit.
    var room = 20, skipped = 0;
    files.forEach(function (f) {
      if (items.some(function (x) { return x.file.name === f.name && x.file.size === f.size && x.status !== 'bad'; })) return;
      if (okCount() >= LIMITS.maxFiles || room <= 0) { skipped++; return; }
      room--;
      var it = { id: ++seq, file: f, status: 'checking', msg: 'Checking…' };
      items.push(it);
      process(it);
    });
    render();
    if (skipped) counter.textContent = 'Up to ' + LIMITS.maxFiles + ' photos per order — ' + skipped + ' not added.';
  }
  function remove(id) {
    items = items.filter(function (x) {
      if (x.id === id && x.url) URL.revokeObjectURL(x.url);
      return x.id !== id;
    });
    render();
  }
  function render() {
    list.innerHTML = items.map(function (it) {
      var thumb = it.status === 'ok' ? '<img src="' + it.url + '" alt="">' :
        it.status === 'checking' ? '<span class="ph-spin" aria-hidden="true"></span>' : '<span class="ph-x" aria-hidden="true">!</span>';
      var badge = it.status === 'ok' ? '<span class="ph-badge ok">✓ Verified &amp; cleaned</span>' :
        it.status === 'checking' ? '<span class="ph-badge">Checking…</span>' : '<span class="ph-badge bad">Not accepted</span>';
      return '<li class="ph-item ' + it.status + '"><div class="ph-thumb">' + thumb + '</div>' +
        '<div class="ph-info"><strong>' + GS.esc(it.file.name) + '</strong>' + badge + '<span class="ph-msg">' + GS.esc(it.status === 'checking' ? '' : it.msg) + '</span></div>' +
        '<button type="button" class="ph-rm" data-rm="' + it.id + '" aria-label="Remove ' + GS.esc(it.file.name) + '">×</button></li>';
    }).join('');
    var n = okCount();
    counter.textContent = n ? n + ' of ' + LIMITS.maxFiles + ' photos' : '';
    zone.classList.toggle('full', n >= LIMITS.maxFiles);
  }

  document.addEventListener('DOMContentLoaded', function () {
    zone = document.getElementById('dropzone'); if (!zone) return;
    input = document.getElementById('f-photos'); list = document.getElementById('photo-list'); counter = document.getElementById('photo-count');
    var open = function () { if (okCount() < LIMITS.maxFiles) input.click(); };
    zone.addEventListener('click', open);
    zone.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
    input.addEventListener('change', function () { add(input.files); input.value = ''; });
    ['dragenter', 'dragover'].forEach(function (t) { zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.add('over'); }); });
    ['dragleave', 'drop'].forEach(function (t) { zone.addEventListener(t, function (e) { e.preventDefault(); zone.classList.remove('over'); }); });
    zone.addEventListener('drop', function (e) { add(e.dataTransfer && e.dataTransfer.files); });
    list.addEventListener('click', function (e) { var b = e.target.closest('[data-rm]'); if (b) remove(+b.getAttribute('data-rm')); });
    // stop a stray drop elsewhere on the page from opening the photo in the browser tab
    window.addEventListener('dragover', function (e) { e.preventDefault(); });
    window.addEventListener('drop', function (e) { e.preventDefault(); });
  });

  window.GSPhotos = {
    limits: LIMITS,
    pending: function () { return items.some(function (x) { return x.status === 'checking'; }); },
    files: function () {
      return items.filter(function (x) { return x.status === 'ok'; })
        .map(function (x, i) { return { blob: x.blob, name: safeName(x.file.name, i), original: x.file.name }; });
    },
    _sniff: sniff
  };
})();
