/* Home page */
document.addEventListener('DOMContentLoaded', function () {
  var D = window.GS_DATA, GS = window.GS;

  // Cookies orbiting the logo
  var orbit = document.getElementById('hero-orbit');
  var picks = [
    { shape: 'heart',  icing: '#F4A9BD', accent: '#FFFFFF', deco: 'dots' },
    { shape: 'star',   icing: '#F6DD72', accent: '#A98ADB', deco: 'sprinkles' },
    { shape: 'flower', icing: '#A98ADB', accent: '#F6DD72', deco: 'swirl' },
    { shape: 'round',  icing: '#FFFFFF', accent: '#F4A9BD', deco: 'flowers' },
    { shape: 'plaque', icing: '#8FD3C1', accent: '#FFFFFF', deco: 'hearts' }
  ];
  orbit.innerHTML = picks.map(function (p) { return '<div class="orbit-cookie">' + GS.art(p) + '</div>'; }).join('');

  // Occasions
  document.getElementById('occasions').innerHTML = D.occasions.map(function (o) {
    return '<a class="card piped occasion reveal" href="gallery.html" style="text-decoration:none;color:inherit">' +
      '<div class="cookie-wrap">' + GS.art(o.art, o.name + ' cookie') + '</div>' +
      '<h3>' + GS.esc(o.name) + '</h3><p>' + GS.esc(o.blurb) + '</p></a>';
  }).join('');

  // Showcase: newest gallery items by date
  var C = window.SITE_CONFIG;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var latest = D.gallery
    .map(function (it, i) { return Object.assign({ _i: i }, it); })
    .sort(function (a, b) { return (b.date || '').localeCompare(a.date || '') || a._i - b._i; })
    .slice(0, C.showcaseCount || 8);
  function when(it) { if (!it.date) return ''; var p = it.date.split('-'); return MONTHS[+p[1] - 1] + ' ' + p[0]; }
  function isNew(it) {
    if (!it.date) return false;
    var p = it.date.split('-'), now = new Date();
    return (now.getFullYear() * 12 + now.getMonth()) - (+p[0] * 12 + (+p[1] - 1)) <= 1;
  }
  function media(it, big) {
    return it.photo ? '<img src="' + (big ? it.photo : (it.thumb || it.photo)) + '" alt="' + GS.esc(it.title) + '"' + (big ? '' : ' loading="lazy"') + '>'
                    : GS.art(Object.assign({ seed: it.title }, it.art), it.title);
  }
  var tilts = [-2.5, 1.8, -1.2, 2.6, -2, 1.2, -1.6, 2.2];
  document.getElementById('showcase').innerHTML = latest.map(function (it, k) {
    return '<button type="button" class="polaroid reveal" data-k="' + k + '" style="--tilt:' + tilts[k % tilts.length] + 'deg">' +
      '<span class="tape" aria-hidden="true"></span>' + GS.sampleTag(it.sample) +
      (isNew(it) ? '<span class="new-badge">New</span>' : '') +
      '<span class="pol-media' + (it.photo ? ' photo' : '') + '">' + media(it) + '</span>' +
      '<span class="pol-cap"><strong>' + GS.esc(it.title) + '</strong><span>' + GS.esc(it.category) + (it.date ? ' · ' + when(it) : '') + '</span></span>' +
    '</button>';
  }).join('');
  document.getElementById('showcase').addEventListener('click', function (e) {
    var b = e.target.closest('.polaroid'); if (!b) return;
    GS.lightbox(latest, +b.getAttribute('data-k'), function (it) { return media(it, true); },
      function (it) { return it.category + (it.date ? ' · ' + when(it) : ''); });
  });
  document.getElementById('showcase-cta').innerHTML =
    '<a class="btn" href="gallery.html">See the full gallery →</a>' +
    (C.facebook ? '<a class="btn btn-fb" href="' + GS.esc(C.facebook) + '" target="_blank" rel="noopener">' + GS.icon('fb') + 'Follow Geri’s Sweets on Facebook</a>' : '');

  // Steps
  document.getElementById('steps').innerHTML = D.steps.map(function (s) {
    return '<div class="step reveal"><div class="step-num" aria-hidden="true"></div><h3>' + GS.esc(s.title) + '</h3><p>' + GS.esc(s.text) + '</p></div>';
  }).join('');

  GS.reveal();
});
