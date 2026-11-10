/* =========================================================
   COOKIE ART — draws illustrated decorated cookies as SVG.
   Used for placeholders, the cookie designer and decorations.
   ========================================================= */
(function () {
  var TAU = Math.PI * 2;
  var uid = 0;

  function rng(seed) {
    var a = seed >>> 0 || 1;
    return function () {
      a = (a + 0x6D2B79F5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hash(s) {
    var h = 2166136261; s = String(s);
    for (var i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619); }
    return h >>> 0;
  }
  function shade(hex, amt) { // amt<0 darker, >0 lighter
    var n = parseInt(hex.replace('#', ''), 16);
    var r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    function f(c) { return Math.round(amt < 0 ? c * (1 + amt) : c + (255 - c) * amt); }
    return '#' + ((1 << 24) + (f(r) << 16) + (f(g) << 8) + f(b)).toString(16).slice(1);
  }
  function lum(hex) {
    var n = parseInt(hex.replace('#', ''), 16);
    return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) / 255;
  }

  function shapePoints(shape) {
    var pts = [], i, t, n;
    switch (shape) {
      case 'heart':
        for (i = 0; i < 140; i++) {
          t = i / 140 * TAU;
          var x = 16 * Math.pow(Math.sin(t), 3);
          var y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
          pts.push([100 + x * 4.7, 96 - y * 4.7]);
        }
        break;
      case 'star':
        for (i = 0; i < 10; i++) {
          t = -Math.PI / 2 + i * TAU / 10;
          var r = i % 2 ? 40 : 84;
          pts.push([100 + r * Math.cos(t), 106 + r * Math.sin(t)]);
        }
        break;
      case 'flower':
        for (i = 0; i < 160; i++) {
          t = i / 160 * TAU;
          var rr = 64 + 16 * Math.cos(5 * t);
          pts.push([100 + rr * Math.cos(t - Math.PI / 2), 100 + rr * Math.sin(t - Math.PI / 2)]);
        }
        break;
      case 'plaque':
        n = 4;
        for (i = 0; i < 120; i++) {
          t = i / 120 * TAU;
          var c = Math.cos(t), s = Math.sin(t);
          pts.push([100 + 84 * Math.sign(c) * Math.pow(Math.abs(c), 2 / n),
                    100 + 64 * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)]);
        }
        break;
      case 'tree':
        pts = [[100, 16], [138, 64], [124, 64], [156, 110], [136, 110], [168, 156], [112, 156], [112, 182],
               [88, 182], [88, 156], [32, 156], [64, 110], [44, 110], [76, 64], [62, 64]];
        break;
      default: // round
        for (i = 0; i < 120; i++) { t = i / 120 * TAU; pts.push([100 + 80 * Math.cos(t), 100 + 80 * Math.sin(t)]); }
    }
    return pts;
  }
  function centroid(pts) {
    var x = 0, y = 0; pts.forEach(function (p) { x += p[0]; y += p[1]; });
    return [x / pts.length, y / pts.length];
  }
  function scale(pts, k) {
    var c = centroid(pts);
    return pts.map(function (p) { return [c[0] + (p[0] - c[0]) * k, c[1] + (p[1] - c[1]) * k]; });
  }
  function toPath(pts) {
    return 'M' + pts.map(function (p) { return p[0].toFixed(1) + ' ' + p[1].toFixed(1); }).join('L') + 'Z';
  }
  function along(pts, spacing) { // evenly spaced points around a closed outline
    var out = [], acc = 0, i, a, b, seg, d;
    var closed = pts.concat([pts[0]]);
    var total = 0;
    for (i = 1; i < closed.length; i++) total += Math.hypot(closed[i][0] - closed[i - 1][0], closed[i][1] - closed[i - 1][1]);
    var count = Math.max(8, Math.round(total / spacing)); spacing = total / count;
    var next = 0;
    for (i = 1; i < closed.length; i++) {
      a = closed[i - 1]; b = closed[i];
      seg = Math.hypot(b[0] - a[0], b[1] - a[1]);
      while (next <= acc + seg && out.length < count) {
        d = (next - acc) / seg;
        out.push([a[0] + (b[0] - a[0]) * d, a[1] + (b[1] - a[1]) * d]);
        next += spacing;
      }
      acc += seg;
    }
    return out;
  }

  function miniFlower(x, y, s, petal, center) {
    var g = '<g transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + s.toFixed(2) + ')">';
    for (var i = 0; i < 5; i++) {
      var t = i * TAU / 5 - Math.PI / 2;
      g += '<circle cx="' + (7 * Math.cos(t)).toFixed(1) + '" cy="' + (7 * Math.sin(t)).toFixed(1) + '" r="6.4" fill="' + petal + '" stroke="' + shade(petal, -0.18) + '" stroke-width=".8"/>';
    }
    return g + '<circle r="3.6" fill="' + center + '"/><circle r="1.4" cx="-1" cy="-1" fill="#fff" opacity=".6"/></g>';
  }
  function miniHeart(x, y, s, col) {
    return '<path transform="translate(' + x.toFixed(1) + ' ' + y.toFixed(1) + ') scale(' + s.toFixed(2) + ')" d="M0 6 C-9 -1 -7 -9 -2 -8 C-1 -8 0 -7 0 -6 C0 -7 1 -8 2 -8 C7 -9 9 -1 0 6Z" fill="' + col + '"/>';
  }

  var SPRINKLES = ['#F6DD72', '#A98ADB', '#FFFFFF', '#F4A9BD', '#8FD3C1', '#7FB2E5'];
  var PETALS = ['#F4A9BD', '#A98ADB', '#F6DD72', '#FFFFFF'];

  function decorate(o, icePts, R) {
    var deco = o.deco, accent = o.accent, out = '', i, p, c = centroid(icePts);
    var inner = scale(icePts, 0.82);
    var bbox = icePts.reduce(function (b, p) { return [Math.min(b[0], p[0]), Math.min(b[1], p[1]), Math.max(b[2], p[0]), Math.max(b[3], p[1])]; }, [999, 999, -999, -999]);
    function rand() { return [bbox[0] + R() * (bbox[2] - bbox[0]), bbox[1] + R() * (bbox[3] - bbox[1])]; }
    switch (deco) {
      case 'none':
        break;
      case 'sprinkles':
        for (i = 0; i < 46; i++) {
          p = rand();
          var col = SPRINKLES[Math.floor(R() * SPRINKLES.length)];
          if (col.toLowerCase() === o.icing.toLowerCase()) col = accent;
          out += '<rect x="' + (p[0] - 4.5).toFixed(1) + '" y="' + (p[1] - 1.6).toFixed(1) + '" width="9" height="3.2" rx="1.6" fill="' + col + '" transform="rotate(' + Math.floor(R() * 180) + ' ' + p[0].toFixed(1) + ' ' + p[1].toFixed(1) + ')"/>';
        }
        break;
      case 'flowers':
        var spots = [[-22, -18, 1.25], [20, -6, 1.05], [-6, 22, 0.95], [28, 26, 0.7], [-30, 14, 0.65]];
        spots.forEach(function (s, k) {
          var petal = PETALS[(k + Math.floor(R() * 4)) % PETALS.length];
          if (petal.toLowerCase() === o.icing.toLowerCase()) petal = accent;
          out += miniFlower(c[0] + s[0], c[1] + s[1], s[2], petal, '#E9B949');
        });
        out += piped(along(inner, 13), accent, 2.6);
        break;
      case 'swirl':
        var d = 'M' + c[0] + ' ' + c[1];
        for (i = 1; i < 220; i++) { var t = i / 14; var r = 2.4 * t * 1.6; d += 'L' + (c[0] + r * Math.cos(t)).toFixed(1) + ' ' + (c[1] + r * Math.sin(t)).toFixed(1); }
        out += '<path d="' + d + '" fill="none" stroke="' + shade(accent, -0.08) + '" stroke-width="6.5" stroke-linecap="round" opacity=".95"/>';
        out += '<path d="' + d + '" fill="none" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".45" transform="translate(-1.2 -1.2)"/>';
        break;
      case 'stripes':
        for (i = -10; i < 12; i++) {
          var x = 100 + i * 22;
          out += '<rect x="' + x + '" y="-40" width="10" height="280" fill="' + accent + '" transform="rotate(35 100 100)"/>';
        }
        out += piped(along(inner, 13), lum(o.icing) > 0.6 ? accent : '#ffffff', 2.4);
        break;
      case 'hearts':
        for (i = 0; i < 9; i++) { p = rand(); out += miniHeart(p[0], p[1], 0.9 + R() * 0.8, accent); }
        break;
      case 'snow':
        for (i = 0; i < 34; i++) { p = rand(); out += '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + (1.4 + R() * 3.4).toFixed(1) + '" fill="#fff" opacity="' + (0.65 + R() * 0.35).toFixed(2) + '"/>'; }
        var sx = c[0] + 4, sy = c[1] + 4;
        for (i = 0; i < 6; i++) {
          var a = i * Math.PI / 3;
          out += '<line x1="' + sx + '" y1="' + sy + '" x2="' + (sx + 20 * Math.cos(a)).toFixed(1) + '" y2="' + (sy + 20 * Math.sin(a)).toFixed(1) + '" stroke="#fff" stroke-width="3.2" stroke-linecap="round"/>';
        }
        out += '<circle cx="' + sx + '" cy="' + sy + '" r="4" fill="#fff"/>';
        break;
      case 'monogram':
        var L = String(o.letter || 'G').slice(0, 2);
        var fs = L.length > 1 ? 58 : 82;
        out += piped(along(inner, 12), accent, 2.4);
        out += '<text x="' + c[0].toFixed(1) + '" y="' + (c[1] + fs * 0.33).toFixed(1) + '" text-anchor="middle" font-family="\'Lobster Two\', \'Lobster\', cursive" font-weight="700" font-size="' + fs + '" fill="' + accent + '" stroke="' + shade(o.icing, -0.25) + '" stroke-width="1.2" paint-order="stroke">' + esc(L) + '</text>';
        break;
      default: // dots
        out += piped(along(scale(icePts, 0.86), 13), accent, 3.4);
        out += piped(along(scale(icePts, 0.58), 15), accent, 2.2);
    }
    return out;
  }
  function piped(points, col, r) {
    return points.map(function (p) {
      return '<circle cx="' + p[0].toFixed(1) + '" cy="' + p[1].toFixed(1) + '" r="' + r + '" fill="' + col + '" stroke="' + shade(col, -0.15) + '" stroke-width=".6"/>' +
             '<circle cx="' + (p[0] - r * 0.3).toFixed(1) + '" cy="' + (p[1] - r * 0.35).toFixed(1) + '" r="' + (r * 0.32).toFixed(2) + '" fill="#fff" opacity=".7"/>';
    }).join('');
  }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  function cookieSVG(opts) {
    var o = Object.assign({ shape: 'round', icing: '#F4A9BD', accent: '#FFFFFF', deco: 'dots', letter: '', label: 'Decorated cookie' }, opts || {});
    var id = 'ck' + (++uid);
    var R = rng(hash(o.seed || (o.shape + o.icing + o.accent + o.deco + o.letter)));
    var pts = shapePoints(o.shape);
    var ice = scale(pts, 0.86);
    var base = toPath(pts), icePath = toPath(ice);
    var c = centroid(ice);
    var dark = shade(o.icing, -0.2);
    return '<svg class="cookie-svg" viewBox="-6 -6 212 212" role="img" aria-label="' + esc(o.label) + '">' +
      '<defs>' +
        '<clipPath id="' + id + 'c"><path d="' + icePath + '"/></clipPath>' +
        '<radialGradient id="' + id + 'g" cx="38%" cy="32%" r="80%"><stop offset="0" stop-color="#EDC48A"/><stop offset=".7" stop-color="#D49A5A"/><stop offset="1" stop-color="#B9773E"/></radialGradient>' +
        '<radialGradient id="' + id + 'i" cx="35%" cy="30%" r="85%"><stop offset="0" stop-color="' + shade(o.icing, 0.25) + '"/><stop offset=".65" stop-color="' + o.icing + '"/><stop offset="1" stop-color="' + shade(o.icing, -0.08) + '"/></radialGradient>' +
      '</defs>' +
      '<path d="' + base + '" transform="translate(3 6)" fill="rgba(70,35,10,.16)" stroke="rgba(70,35,10,.16)" stroke-width="18" stroke-linejoin="round"/>' +
      '<path d="' + base + '" fill="url(#' + id + 'g)" stroke="#B9773E" stroke-width="20" stroke-linejoin="round"/>' +
      '<path d="' + base + '" fill="url(#' + id + 'g)" stroke="#D9A466" stroke-width="13" stroke-linejoin="round"/>' +
      '<path d="' + icePath + '" fill="url(#' + id + 'i)" stroke="' + o.icing + '" stroke-width="5" stroke-linejoin="round"/>' +
      '<g clip-path="url(#' + id + 'c)">' + decorate(o, ice, R) +
        '<ellipse cx="' + (c[0] - 26).toFixed(1) + '" cy="' + (c[1] - 34).toFixed(1) + '" rx="36" ry="16" transform="rotate(-28 ' + (c[0] - 26).toFixed(1) + ' ' + (c[1] - 34).toFixed(1) + ')" fill="#fff" opacity=".26"/>' +
      '</g>' +
      '<path d="' + icePath + '" fill="none" stroke="' + dark + '" stroke-width="2.4" stroke-linejoin="round" opacity=".55"/>' +
    '</svg>';
  }

  function flowerSVG(petal, size) {
    size = size || 40;
    return '<svg class="deco-flower" viewBox="-20 -20 40 40" width="' + size + '" height="' + size + '" aria-hidden="true">' +
      miniFlower(0, 0, 1.45, petal, '#E9B949').replace('stroke-width=".8"', 'stroke-width="1"') + '</svg>';
  }

  window.CookieArt = {
    svg: cookieSVG,
    flower: flowerSVG,
    shade: shade,
    shapes: ['round', 'heart', 'star', 'flower', 'plaque', 'tree'],
    decos: ['dots', 'sprinkles', 'flowers', 'swirl', 'stripes', 'hearts', 'snow', 'monogram']
  };
})();
