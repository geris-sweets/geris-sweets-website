/* Gallery page */
document.addEventListener('DOMContentLoaded', function () {
  var D = window.GS_DATA, GS = window.GS;
  var items = D.gallery;
  var grid = document.getElementById('gallery');
  var filters = document.getElementById('filters');

  function media(it, big) {
    if (it.photo) return '<img src="' + (big ? it.photo : (it.thumb || it.photo)) + '" alt="' + GS.esc(it.title) + '"' + (big ? '' : ' loading="lazy"') + '>';
    return GS.art(Object.assign({ seed: it.title }, it.art), it.title);
  }

  grid.innerHTML = items.map(function (it, i) {
    return '<button type="button" class="g-item reveal" data-i="' + i + '" data-cat="' + GS.esc(it.category) + '">' +
      GS.sampleTag(it.sample) +
      '<div class="g-media' + (it.photo ? ' photo' : '') + '">' + media(it) + '</div>' +
      '<div class="g-cap"><strong>' + GS.esc(it.title) + '</strong><span>' + GS.esc(it.category) + '</span></div></button>';
  }).join('');

  // Filters
  var cats = [];
  items.forEach(function (it) { if (cats.indexOf(it.category) < 0) cats.push(it.category); });
  var ORDER = ['Birthday', 'Baby Shower', 'Wedding', 'Graduation', 'Religious', 'Back to School', 'Occupation', 'Sports', 'Gifts'];
  cats.sort(function (a, b) { var x = ORDER.indexOf(a), y = ORDER.indexOf(b); return (x < 0 ? 99 : x) - (y < 0 ? 99 : y); });
  var count = function (c) { return items.filter(function (it) { return c === 'All' || it.category === c; }).length; };
  filters.innerHTML = ['All'].concat(cats).map(function (c, i) {
    return '<button type="button" class="chip" data-cat="' + GS.esc(c) + '" aria-pressed="' + (i === 0) + '">' + GS.esc(c) + '<span class="n">' + count(c) + '</span></button>';
  }).join('');
  var current = 'All';
  filters.addEventListener('click', function (e) {
    var b = e.target.closest('.chip'); if (!b) return;
    current = b.getAttribute('data-cat');
    filters.querySelectorAll('.chip').forEach(function (x) { x.setAttribute('aria-pressed', x === b); });
    grid.querySelectorAll('.g-item').forEach(function (g) {
      var show = current === 'All' || g.getAttribute('data-cat') === current;
      g.classList.toggle('hide', !show);
      if (show) g.classList.add('in');
    });
  });

  // Lightbox
  var lb = document.getElementById('lightbox'), idx = 0, lastFocus;
  function visible() { return Array.prototype.slice.call(grid.querySelectorAll('.g-item:not(.hide)')).map(function (g) { return +g.getAttribute('data-i'); }); }
  function show(i) {
    idx = i; var it = items[i];
    lb.querySelector('.lb-media').innerHTML = media(it, true);
    lb.querySelector('.lb-title').textContent = it.title;
    lb.querySelector('.lb-cat').textContent = it.category;
  }
  function open(i) { lastFocus = document.activeElement; show(i); lb.classList.add('open'); document.body.style.overflow = 'hidden'; lb.querySelector('.lb-close').focus(); }
  function close() { lb.classList.remove('open'); document.body.style.overflow = ''; if (lastFocus) lastFocus.focus(); }
  function step(d) { var v = visible(), p = v.indexOf(idx); show(v[(p + d + v.length) % v.length]); }
  grid.addEventListener('click', function (e) { var g = e.target.closest('.g-item'); if (g) open(+g.getAttribute('data-i')); });
  lb.querySelector('.lb-close').onclick = close;
  lb.querySelector('.lb-prev').onclick = function () { step(-1); };
  lb.querySelector('.lb-next').onclick = function () { step(1); };
  lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
  document.addEventListener('keydown', function (e) {
    if (!lb.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });

  GS.reveal();
});
