/* =========================================================
   SHARED SITE SCRIPT — header, footer, effects, helpers.
   ========================================================= */
(function () {
  var C = window.SITE_CONFIG, D = window.GS_DATA, Art = window.CookieArt;
  var GS = window.GS = {};

  var NAV = [
    ['home', 'Home', 'index.html'],
    ['events', 'Events', 'events.html'],
    ['gallery', 'Gallery', 'gallery.html'],
    ['pricing', 'Pricing', 'pricing.html'],
    ['contact', 'Contact Us', 'contact.html']
  ];

  GS.isPreview = location.protocol === 'file:' || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
  GS.reducedMotion = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  GS.esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  GS.money = function (n) { var s = Math.abs(n).toFixed(2).replace(/\.00$/, ''); return (n < 0 ? '−$' : '$') + s; };
  GS.listOr = function (a) { return a.length < 2 ? a.join('') : a.slice(0, -1).join(', ') + ' or ' + a[a.length - 1]; };
  GS.today = function () { var d = new Date(); d.setHours(0, 0, 0, 0); return d; };
  GS.parseDate = function (s) { var p = s.split('-'); return new Date(+p[0], +p[1] - 1, +p[2]); };
  GS.isoDate = function (d) { return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  GS.art = function (spec, label) { return Art.svg(Object.assign({ label: label || 'Illustrated decorated cookie' }, spec)); };
  GS.sampleTag = function (on) { return on && GS.isPreview ? '<span class="sample-tag" title="Placeholder — edit js/data.js">sample</span>' : ''; };

  /* ---------- Price estimator (used by Pricing + Order pages) ---------- */
  GS.estimate = function (o) {
    var P = D.pricing;
    var t = P.tiers.filter(function (x) { return x.id === o.tier; })[0] || P.tiers[0];
    var cookies = o.cookies != null ? Math.max(0, Math.round(+o.cookies) || 0) : Math.round(Math.max(0, +o.dozens || 0) * 12);
    var dz = cookies / 12, lines = [], total;
    total = t.perDozen * dz;
    lines.push([(cookies % 12 === 0 ? dz + ' dozen' : cookies + ' cookies') + ' · ' + t.name, total]);
    (o.addons || []).forEach(function (id) {
      var a = P.addons.filter(function (x) { return x.id === id; })[0]; if (!a) return;
      var amt = a.unit === 'cookie' ? a.price * cookies : a.unit === 'dozen' ? a.price * Math.ceil(dz) : a.price;
      lines.push([a.name.replace(/ \(per dozen\)/, ''), amt]); total += amt;
    });
    if (dz >= P.discount.minDozen) { var d = -total * P.discount.pct / 100; lines.push([P.discount.pct + '% off ' + P.discount.minDozen + '+ dozen', d]); total += d; }
    if (o.rush) { var r = total * P.rushPct / 100; lines.push(['Rush order (+' + P.rushPct + '%)', r]); total += r; }
    if (o.delivery) { lines.push(['Local delivery', P.deliveryFee]); total += P.deliveryFee; }
    return { lines: lines, total: total, tier: t };
  };

  /* ---------- Announcement + header ---------- */
  function renderHeader() {
    var page = document.body.getAttribute('data-page');
    var h = document.getElementById('site-header');
    if (!h) return;
    var a = D.announcement, bar = '';
    if (a && a.text && (!a.until || GS.today() <= GS.parseDate(a.until))) {
      bar = '<div class="announce"><div class="wrap">' + GS.sampleTag(a.sample) + '<span>' + GS.esc(a.text) + '</span>' +
        (a.link ? ' <a href="' + a.link + '">' + GS.esc(a.linkText || 'Learn more') + ' →</a>' : '') + '</div></div>';
    }
    h.innerHTML = bar +
      '<div class="header-bar"><div class="wrap header-inner">' +
        '<a class="brand" href="index.html" aria-label="' + GS.esc(C.businessName) + ' — home">' +
          '<img class="brand-logo" src="' + C.logoSmall + '" alt="" width="58" height="58">' +
          '<span class="brand-text"><span class="brand-script">' + GS.esc(C.brandScript) + '</span><span class="brand-slab">' + GS.esc(C.brandSlab) + '</span></span>' +
        '</a>' +
        '<button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-nav"><span class="bar"></span><span class="bar"></span><span class="bar"></span><span class="sr-only">Menu</span></button>' +
        '<nav id="site-nav" class="site-nav" aria-label="Main"><ul>' +
          NAV.map(function (n) {
            var cur = n[0] === page;
            return '<li><a href="' + n[2] + '" class="' + (n[0] === 'contact' ? 'nav-cta ' : '') + (cur ? 'active' : '') + '"' + (cur ? ' aria-current="page"' : '') + '>' + n[1] + '</a></li>';
          }).join('') +
        '</ul></nav>' +
      '</div></div>';

    var btn = h.querySelector('.nav-toggle'), nav = h.querySelector('.site-nav');
    btn.addEventListener('click', function () {
      var open = btn.getAttribute('aria-expanded') !== 'true';
      btn.setAttribute('aria-expanded', open);
      nav.classList.toggle('open', open);
      document.body.classList.toggle('nav-open', open);
    });
    var bh = h.querySelector('.header-bar');
    function onScroll() { bh.classList.toggle('scrolled', window.scrollY > 10); }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  }

  /* ---------- Footer ---------- */
  function icon(name) {
    var p = {
      ig: '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor"/>',
      fb: '<path d="M14 8h3V4h-3a4 4 0 0 0-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>',
      mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
      phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2"/>',
      pin: '<path d="M12 21s-7-6.2-7-11a7 7 0 0 1 14 0c0 4.8-7 11-7 11z"/><circle cx="12" cy="10" r="2.5"/>'
    }[name];
    return '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + p + '</svg>';
  }
  GS.icon = icon;

  function renderFooter() {
    var f = document.getElementById('site-footer');
    if (!f) return;
    var social = '';
    if (C.facebook) social += '<a class="fb-link" href="' + GS.esc(C.facebook) + '" target="_blank" rel="noopener">' + icon('fb') + '<span>Find us on Facebook</span></a>';
    f.innerHTML =
      '<div class="scallop scallop-top" aria-hidden="true"></div>' +
      '<div class="footer-body"><div class="wrap footer-grid">' +
        '<div class="footer-brand">' +
          '<img src="' + C.logoSmall + '" alt="' + GS.esc(C.businessName) + ' logo" width="110" height="110" loading="lazy">' +
          '<p>' + GS.esc(C.tagline) + '.</p>' +
          (social ? '<div class="social">' + social + '</div>' : '') +
        '</div>' +
        '<div><h3>Visit</h3><ul class="footer-links">' +
          NAV.map(function (n) { return '<li><a href="' + n[2] + '">' + n[1] + '</a></li>'; }).join('') +
        '</ul></div>' +
        '<div><h3>Say hello</h3><ul class="footer-contact">' +
          '<li>' + icon('mail') + '<a href="mailto:' + C.email + '">' + GS.esc(C.email) + '</a></li>' +
          (C.phone ? '<li>' + icon('phone') + '<a href="tel:' + C.phone.replace(/[^\d+]/g, '') + '">' + GS.esc(C.phone) + '</a></li>' : '') +
          '<li>' + icon('pin') + '<span>' + GS.esc(C.serviceArea) + '</span></li>' +
        '</ul></div>' +
        '<div><h3>We accept</h3><div class="pay-badges">' +
          C.payment.map(function (p) { return '<span class="pay-badge">' + GS.esc(p) + '</span>'; }).join('') +
        '</div><p class="small">Custom orders by appointment.<br>Please allow ' + C.leadTimeDays + ' days or more.</p></div>' +
      '</div>' +
      '<div class="wrap footer-base"><span>© ' + new Date().getFullYear() + ' ' + GS.esc(C.businessName) + '</span><span>Baked from scratch · Piped by hand · Made with love</span></div>' +
      '</div>';
  }

  /* ---------- Scroll reveal ---------- */
  GS.reveal = function (root) {
    var els = (root || document).querySelectorAll('.reveal:not(.in)');
    if (!('IntersectionObserver' in window) || GS.reducedMotion) { els.forEach(function (e) { e.classList.add('in'); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    els.forEach(function (e, i) { e.style.setProperty('--d', (i % 6) * 70 + 'ms'); io.observe(e); });
  };

  /* ---------- Falling sprinkles background ---------- */
  GS.sprinkles = function (canvas, opts) {
    if (!canvas) return;
    opts = opts || {};
    var ctx = canvas.getContext('2d'), W, H, dpr = Math.min(window.devicePixelRatio || 1, 2);
    var cols = ['#F4A9BD', '#A98ADB', '#F6DD72', '#FFFFFF', '#8FD3C1', '#E9B37A'];
    var bits = [], N = opts.count || 70, raf, mouse = { x: -999, y: -999 };
    function size() {
      var r = canvas.getBoundingClientRect(); W = r.width; H = r.height;
      canvas.width = W * dpr; canvas.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function make(top) {
      return { x: Math.random() * W, y: top ? -10 : Math.random() * H, vy: 0.25 + Math.random() * 0.6, vx: (Math.random() - 0.5) * 0.2,
        a: Math.random() * Math.PI, va: (Math.random() - 0.5) * 0.04, c: cols[Math.floor(Math.random() * cols.length)],
        l: 7 + Math.random() * 6, dot: Math.random() < 0.25 };
    }
    function draw() {
      ctx.clearRect(0, 0, W, H);
      bits.forEach(function (b) {
        var dx = b.x - mouse.x, dy = b.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 6400) { var f = (6400 - d2) / 6400 * 1.6; b.x += dx / Math.sqrt(d2 + 1) * f; b.y += dy / Math.sqrt(d2 + 1) * f; }
        b.y += b.vy; b.x += b.vx; b.a += b.va;
        if (b.y > H + 12) Object.assign(b, make(true));
        ctx.save(); ctx.translate(b.x, b.y); ctx.rotate(b.a); ctx.fillStyle = b.c; ctx.globalAlpha = 0.85;
        ctx.beginPath();
        if (b.dot) ctx.arc(0, 0, 2.6, 0, Math.PI * 2);
        else if (ctx.roundRect) ctx.roundRect(-b.l / 2, -1.7, b.l, 3.4, 1.7);
        else ctx.rect(-b.l / 2, -1.7, b.l, 3.4);
        ctx.fill(); ctx.restore();
      });
      if (!GS.reducedMotion) raf = requestAnimationFrame(draw);
    }
    size(); for (var i = 0; i < N; i++) bits.push(make(false));
    window.addEventListener('resize', function () { size(); });
    canvas.parentElement.addEventListener('pointermove', function (e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; });
    canvas.parentElement.addEventListener('pointerleave', function () { mouse.x = mouse.y = -999; });
    draw();
  };

  /* ---------- Confetti burst of sprinkles ---------- */
  GS.confetti = function () {
    if (GS.reducedMotion) return;
    var cols = ['#F4A9BD', '#A98ADB', '#F6DD72', '#8FD3C1', '#E9B37A', '#FFFFFF'];
    var box = document.createElement('div'); box.className = 'confetti'; document.body.appendChild(box);
    for (var i = 0; i < 90; i++) {
      var s = document.createElement('i');
      s.style.left = Math.random() * 100 + 'vw';
      s.style.background = cols[i % cols.length];
      s.style.animationDelay = Math.random() * 0.6 + 's';
      s.style.animationDuration = 1.8 + Math.random() * 1.6 + 's';
      s.style.setProperty('--r', (Math.random() * 720 - 360) + 'deg');
      s.style.setProperty('--x', (Math.random() * 200 - 100) + 'px');
      box.appendChild(s);
    }
    setTimeout(function () { box.remove(); }, 4200);
  };

  /* ---------- Photo viewer (used by the Home showcase) ---------- */
  // list: array of items; media(item) returns HTML; caption(item) returns text
  GS.lightbox = function (list, start, media, caption) {
    var lb = document.getElementById('gs-lightbox');
    if (!lb) {
      lb = document.createElement('div');
      lb.id = 'gs-lightbox'; lb.className = 'lightbox';
      lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', 'Photo');
      lb.innerHTML = '<div class="lb-inner"><button class="lb-close" type="button" aria-label="Close">×</button>' +
        '<button class="lb-nav lb-prev" type="button" aria-label="Previous">‹</button><button class="lb-nav lb-next" type="button" aria-label="Next">›</button>' +
        '<div class="lb-media"></div><h3 class="lb-title"></h3><p class="lb-cat small"></p></div>';
      document.body.appendChild(lb);
    }
    var i = start, last = document.activeElement;
    function show() {
      var it = list[i];
      lb.querySelector('.lb-media').innerHTML = media(it);
      lb.querySelector('.lb-title').textContent = it.title;
      lb.querySelector('.lb-cat').textContent = caption ? caption(it) : '';
    }
    function step(d) { i = (i + d + list.length) % list.length; show(); }
    function close() { lb.classList.remove('open'); document.body.style.overflow = ''; document.removeEventListener('keydown', key); if (last) last.focus(); }
    function key(e) { if (e.key === 'Escape') close(); if (e.key === 'ArrowLeft') step(-1); if (e.key === 'ArrowRight') step(1); }
    lb.querySelector('.lb-close').onclick = close;
    lb.querySelector('.lb-prev').onclick = function () { step(-1); };
    lb.querySelector('.lb-next').onclick = function () { step(1); };
    lb.onclick = function (e) { if (e.target === lb) close(); };
    document.addEventListener('keydown', key);
    show(); lb.classList.add('open'); document.body.style.overflow = 'hidden';
    lb.querySelector('.lb-close').focus();
  };

  /* ---------- Floating flower decorations ---------- */
  GS.flowers = function (el, n) {
    if (!el) return;
    var cols = ['#F4A9BD', '#A98ADB', '#F6DD72', '#FFFFFF'], html = '';
    for (var i = 0; i < (n || 7); i++) {
      var side = i % 2 ? 82 + Math.random() * 14 : 2 + Math.random() * 12;
      html += '<span class="float-flower" style="left:' + side.toFixed(1) + '%;top:' + (8 + Math.random() * 72) + '%;--s:' + (0.6 + Math.random() * 0.8).toFixed(2) +
        ';--t:' + (6 + Math.random() * 6).toFixed(1) + 's;--dl:-' + (Math.random() * 6).toFixed(1) + 's">' + Art.flower(cols[i % cols.length], 40) + '</span>';
    }
    el.insertAdjacentHTML('beforeend', html);
  };

  /* ---------- Preview helper badge ---------- */
  function previewBadge() {
    if (!GS.isPreview) return;
    var b = document.createElement('div');
    b.className = 'preview-badge';
    b.innerHTML = '<strong>Preview mode</strong> · items tagged <span class="sample-tag">sample</span> are placeholders — edit <code>js/data.js</code> &amp; <code>js/config.js</code><button type="button" aria-label="Hide">×</button>';
    b.querySelector('button').onclick = function () { b.remove(); };
    document.body.appendChild(b);
  }

  document.addEventListener('DOMContentLoaded', function () {
    renderHeader();
    renderFooter();
    document.querySelectorAll('[data-flowers]').forEach(function (el) { GS.flowers(el, +el.getAttribute('data-flowers') || 7); });
    document.querySelectorAll('canvas.sprinkle-canvas').forEach(function (c) { GS.sprinkles(c, { count: +c.getAttribute('data-count') || 60 }); });
    GS.reveal();
    previewBadge();
  });
})();
