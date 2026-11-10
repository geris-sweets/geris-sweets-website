/* Pricing page */
document.addEventListener('DOMContentLoaded', function () {
  var C = window.SITE_CONFIG, D = window.GS_DATA, GS = window.GS, P = D.pricing;

  // Tiers
  document.getElementById('tiers').innerHTML = P.tiers.map(function (t) {
    return '<div class="card piped tier reveal' + (t.badge ? ' popular' : '') + '">' +
      (t.badge ? '<span class="badge-pop">' + GS.esc(t.badge) + '</span>' : '') +
      '<div class="cookie-wrap">' + GS.art(t.art, t.name) + '</div>' +
      '<h3>' + GS.esc(t.name) + '</h3><div class="tagline">' + GS.esc(t.tagline) + '</div>' +
      '<div class="price"><sup>$</sup>' + t.perDozen + '</div><div class="price-unit">per dozen</div>' +
      '<ul>' + t.features.map(function (f) { return '<li>' + GS.esc(f) + '</li>'; }).join('') + '</ul>' +
    '</div>';
  }).join('');
  document.getElementById('sample-note').innerHTML = GS.sampleTag(P.sample) || '';

  document.getElementById('fine-print').innerHTML = [
    'Minimum order is ' + P.minimumDozen + ' dozen per design set.',
    'Save ' + P.discount.pct + '% on orders of ' + P.discount.minDozen + ' dozen or more.',
    'Please order ' + C.leadTimeDays + '+ days ahead; holidays book up early.',
    'Payment by ' + GS.listOr(C.payment) + '.',
    'Individually bagged with ribbon.',
    'Pickup is always free.',
    'Local delivery add ' + GS.money(P.deliveryFee) + '.'
  ].map(function (t) { return '<li>' + GS.esc(t) + '</li>'; }).join('');

  // Ingredients label
  var I = D.ingredients;
  if (I) {
    document.getElementById('ingredients').innerHTML =
      '<div class="label-head"><div class="label-biz">' + GS.esc(I.business) + '</div><div class="label-loc">' + GS.esc(I.location) + '</div>' +
        '<div class="label-product">' + GS.esc(I.product) + '</div></div>' +
      '<div class="label-cols">' +
        I.parts.map(function (part) {
          return '<div class="label-part"><h3>' + GS.esc(part.name) + '</h3><p>' + GS.esc(part.text) + '</p></div>';
        }).join('') +
      '</div>' +
      '<div class="label-contains"><span class="contains-title">Contains</span>' +
        I.contains.map(function (c) { return '<span class="allergen">' + GS.esc(c) + '</span>'; }).join('') +
        (I.mayContain.length ? '<span class="may-contain">May contain: ' + GS.esc(I.mayContain.join(', ')) + '</span>' : '') +
      '</div>' +
      '<p class="cottage-notice" role="note">' + GS.esc(I.cottage) + '</p>';
  }

  // FAQ
  document.getElementById('faq').innerHTML = D.faq.map(function (f, i) {
    return '<details class="reveal"' + (i === 0 ? ' open' : '') + '><summary>' + GS.esc(f.q) + '</summary><p>' + GS.esc(f.a) + '</p></details>';
  }).join('');

  GS.reveal();
});
