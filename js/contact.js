/* Contact Us page */
document.addEventListener('DOMContentLoaded', function () {
  var C = window.SITE_CONFIG, D = window.GS_DATA, GS = window.GS, Art = window.CookieArt, P = D.pricing;
  var form = document.getElementById('order-form');
  var $ = function (id) { return document.getElementById(id); };
  var params = new URLSearchParams(location.search);
  var MIN_COOKIES = P.minimumDozen * 12, MAX_COOKIES = 600;

  /* ----- Build options ----- */
  var wantTier = params.get('tier');
  $('tier-opts').innerHTML = P.tiers.map(function (t) {
    var on = !!wantTier && t.id === wantTier;
    return '<label class="opt"><input type="radio" name="tier" value="' + t.id + '"' + (on ? ' checked' : '') + '><span>' + GS.esc(t.name) + ' · ' + GS.money(t.perDozen) + '/dz</span></label>';
  }).join('');

  if (params.get('delivery')) form.querySelector('input[name=getting][value=Delivery]').checked = true;

  /* ----- Date rules ----- */
  var minD = GS.today(); minD.setDate(minD.getDate() + C.minimumNoticeDays);
  var rushD = GS.today(); rushD.setDate(rushD.getDate() + C.leadTimeDays);
  $('f-date').min = GS.isoDate(minD);
  function isRush() { var v = $('f-date').value; return !!v && GS.parseDate(v) < rushD; }

  /* ----- Quantity: dozen buttons OR an exact cookie count — one at a time ----- */
  // Using one locks (grays out) the other. Bring it back to 0 / empty to unlock it.
  var cookies = 0, mode = '';           // mode: '' | 'dozens' | 'cookies'
  var dzBox = $('f-dozens'), ckBox = $('f-cookies'), dzBtns = form.querySelectorAll('.qty button');
  function fmtDozens(n) { return String(Math.round(n / 12 * 100) / 100); }
  function lock() {
    var dzLocked = mode === 'cookies', ckLocked = mode === 'dozens';
    dzBox.disabled = dzLocked; dzBtns.forEach(function (b) { b.disabled = dzLocked; });
    ckBox.disabled = ckLocked;
    dzBox.closest('.qty-unit').classList.toggle('locked', dzLocked);
    ckBox.closest('.qty-unit').classList.toggle('locked', ckLocked);
    $('qty-hint').textContent = mode === 'dozens' ? 'Set dozens back to 0 to type an exact number instead.'
      : mode === 'cookies' ? 'Clear the cookie count to use the dozen buttons instead.' : '';
  }
  function setCookies(n, from) {
    cookies = Math.max(0, Math.min(MAX_COOKIES, Math.round(n) || 0));
    mode = cookies === 0 ? '' : from;
    if (from !== 'cookies') ckBox.value = cookies ? cookies : '';
    if (from !== 'dozens') dzBox.value = cookies ? fmtDozens(cookies) : '0';
    lock();
  }
  ckBox.addEventListener('input', function () {
    if (mode === 'dozens') return;
    setCookies(parseInt(this.value, 10), 'cookies');
  });
  dzBox.addEventListener('input', function () {
    if (mode === 'cookies') return;
    var whole = Math.max(0, Math.min(50, Math.floor(parseFloat(this.value) || 0)));
    setCookies(whole * 12, 'dozens');
  });
  dzBox.addEventListener('blur', function () { if (mode !== 'cookies') dzBox.value = String(cookies / 12); });
  dzBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      if (mode === 'cookies') return;
      var dz = cookies / 12 + (+b.getAttribute('data-q'));
      setCookies(Math.max(0, Math.min(50, dz)) * 12, 'dozens');
      dzBox.value = String(cookies / 12);
      update();
    });
  });
  var q0 = Math.floor(parseFloat(params.get('dozens')));
  setCookies(q0 > 0 ? q0 * 12 : 0, 'dozens');

  /* ----- Live summary ----- */
  function val(name) { var el = form.querySelector('[name=' + name + ']:checked'); return el ? el.value : ''; }
  function state() {
    return {
      tier: val('tier'),
      cookies: cookies,
      dozens: cookies / 12,
      addons: [],
      delivery: val('getting') === 'Delivery',
      rush: isRush()
    };
  }
  function update() {
    var s = state(), r = GS.estimate(s);
    if (s.tier) $('f-tier-field').classList.remove('invalid');
    if (s.cookies >= MIN_COOKIES) $('f-dozens-field').classList.remove('invalid');
    $('rush-warn').classList.toggle('show', s.rush);
    $('addr-field').hidden = !s.delivery;
    $('f-address').required = s.delivery;
    return r;
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  update();

  /* ----- Validation ----- */
  function validate() {
    var ok = true, first = null;
    form.querySelectorAll('[required]').forEach(function (el) {
      var f = el.closest('.field'); var good = el.checkValidity() && String(el.value).trim() !== '';
      if (el.type === 'date' && el.value && GS.parseDate(el.value) < minD) good = false;
      if (f) f.classList.toggle('invalid', !good);
      if (!good) { ok = false; if (!first) first = el; }
    });
    var s = state();
    var tierOk = !!s.tier, qtyOk = s.cookies >= MIN_COOKIES;
    $('f-tier-field').classList.toggle('invalid', !tierOk);
    $('f-dozens-field').classList.toggle('invalid', !qtyOk);
    if (!tierOk || !qtyOk) {
      ok = false;
      var el = !tierOk ? form.querySelector('input[name=tier]') : (ckBox.disabled ? dzBtns[1] : ckBox);
      var top = function (x) { return x.getBoundingClientRect().top; };
      if (!first || top(el) < top(first)) first = el;
    }
    if (first) { first.focus(); first.scrollIntoView({ behavior: GS.reducedMotion ? 'auto' : 'smooth', block: 'center' }); }
    return ok;
  }
  // Clear an error as soon as the field becomes valid (not on blur — clearing on
  // blur shifts the layout mid-click and swallows the user's next click).
  function clearFixed(e) {
    var t = e.target, f = t.closest && t.closest('.field.invalid');
    if (f && f.id !== 'f-dozens-field' && t.checkValidity && t.checkValidity() && String(t.value).trim()) f.classList.remove('invalid');
  }
  form.addEventListener('input', clearFixed);
  form.addEventListener('change', clearFixed);

  /* ----- Submit ----- */
  function quantityText(s) {
    return s.cookies + ' cookies' + (s.cookies % 12 === 0 ? ' (' + s.cookies / 12 + ' dozen)' : ' (' + fmtDozens(s.cookies) + ' dozen)');
  }
  function compose(photos) {
    var s = state(), r = GS.estimate(s), fd = new FormData(form);
    var get = function (k) { return (fd.get(k) || '').toString().trim(); };
    var data = {
      _subject: 'New message from the website — ' + get('name') + ' (' + get('date') + ')',
      Name: get('name'), Phone: get('phone'), Email: get('email'), 'Preferred contact': get('contact'),
      Occasion: get('occasion'), 'Date needed': get('date') + (s.rush ? ' (RUSH)' : ''),
      'Pickup / Delivery': get('getting') + (s.delivery ? ' — ' + get('address') : ''),
      Style: r.tier.name, Quantity: quantityText(s),
      'Theme & colors': get('theme'),
      Photos: photos.length ? photos.length + ' photo' + (photos.length > 1 ? 's' : '') + (C.formEndpoint ? ' attached' : ' — customer will attach to this email') : 'None',
      Allergies: get('allergies') || 'None noted', Inspiration: get('inspiration') || '—',
      Notes: get('notes') || '—', 'Heard about us': get('heard') || '—'
    };
    if (C.formEndpoint) data._replyto = get('email');
    return data;
  }
  function success(viaEmail, photoCount) {
    form.hidden = true;
    $('success-art').innerHTML = Art.svg({ shape: 'heart', icing: '#F4A9BD', accent: '#FFFFFF', deco: 'hearts', label: 'Thank you cookie' });
    if (viaEmail) {
      $('success-msg').innerHTML = 'Your email app should open with your order filled in.' +
        (photoCount ? ' <strong>Please attach your ' + photoCount + ' photo' + (photoCount > 1 ? 's' : '') + '</strong> to that email, then press <strong>Send</strong>.' : ' Just press <strong>Send</strong>.') +
        ' Nothing opened? Email us at <a href="mailto:' + C.email + '">' + GS.esc(C.email) + '</a>.';
    }
    var s = $('success'); s.classList.add('show'); s.focus();
    window.scrollTo({ top: s.getBoundingClientRect().top + window.scrollY - 120, behavior: 'smooth' });
    GS.confetti();
  }
  function waitForPhotos() {
    return new Promise(function (res) {
      (function poll() { if (!window.GSPhotos || !GSPhotos.pending()) res(); else setTimeout(poll, 150); })();
    });
  }
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    if (!validate()) return;
    var btn = $('submit-btn');
    if (window.GSPhotos && GSPhotos.pending()) { btn.disabled = true; btn.textContent = 'Checking photos…'; await waitForPhotos(); }
    var photos = window.GSPhotos ? GSPhotos.files() : [];
    var data = compose(photos);
    if (C.formEndpoint) {
      btn.disabled = true; btn.textContent = photos.length ? 'Sending message & photos…' : 'Sending…';
      // multipart form: order details + the CLEANED photo copies (never the originals)
      var body = new FormData();
      Object.keys(data).forEach(function (k) { body.append(k, data[k]); });
      photos.forEach(function (p, i) { body.append('photo_' + (i + 1), p.blob, p.name); });
      fetch(C.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body: body })
        .then(function (r) { if (!r.ok) throw new Error(r.status); success(false, photos.length); })
        .catch(function () {
          btn.disabled = false; btn.textContent = 'Send to Geri';
          $('submit-note').innerHTML = 'Hmm, that didn\'t go through. Please try again or email <a href="mailto:' + C.email + '">' + GS.esc(C.email) + '</a>.';
        });
    } else {
      var text = Object.keys(data).filter(function (k) { return k[0] !== '_'; }).map(function (k) { return k + ': ' + data[k]; }).join('\n');
      var cc = (C.orderCopyTo || []).filter(Boolean).join(',');
      location.href = 'mailto:' + C.email + '?' + (cc ? 'cc=' + encodeURIComponent(cc) + '&' : '') +
        'subject=' + encodeURIComponent(data._subject) + '&body=' + encodeURIComponent(text);
      success(true, photos.length);
    }
  });

  GS.reveal();
});
