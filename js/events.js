/* Events page */
document.addEventListener('DOMContentLoaded', function () {
  var D = window.GS_DATA, GS = window.GS;
  var MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  var DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  var today = GS.today();

  var upcoming = D.events
    .map(function (e) { return Object.assign({ d: GS.parseDate(e.date) }, e); })
    .filter(function (e) { return e.d >= today; })
    .sort(function (a, b) { return a.d - b.d; });

  // Next-up spotlight with live countdown
  var nu = document.getElementById('next-up');
  if (!upcoming.length) {
    nu.innerHTML = '<div class="empty-note" style="grid-column:1/-1"><h2>New dates coming soon!</h2><p>Follow along or <a href="contact.html">contact Geri</a> anytime.</p></div>';
  } else {
    var n = upcoming[0];
    nu.innerHTML =
      '<div class="cookie-wrap">' + GS.art(n.art, n.title) + '</div>' +
      '<div><span class="eyebrow" style="margin:0 0 .4em">Next up</span>' + GS.sampleTag(n.sample) +
        '<h2>' + GS.esc(n.title) + '</h2>' +
        '<p style="margin:0"><strong>' + DAYS[n.d.getDay()] + ', ' + MONTHS[n.d.getMonth()] + ' ' + n.d.getDate() + '</strong> · ' + GS.esc(n.time) + ' · ' + GS.esc(n.place) + '</p></div>' +
      '<div class="countdown" aria-live="off">' +
        ['days', 'hours', 'min', 'sec'].map(function (k) { return '<div><b data-k="' + k + '">0</b><span>' + k + '</span></div>'; }).join('') +
      '</div>';
    var target = new Date(n.d); var hm = /(\d+)(?::(\d+))?\s*(am|pm)/i.exec(n.time);
    if (hm) { var hr = +hm[1] % 12 + (/pm/i.test(hm[3]) ? 12 : 0); target.setHours(hr, +(hm[2] || 0)); }
    var els = {}; nu.querySelectorAll('[data-k]').forEach(function (b) { els[b.getAttribute('data-k')] = b; });
    var tick = function () {
      var ms = Math.max(0, target - new Date());
      els.days.textContent = Math.floor(ms / 864e5);
      els.hours.textContent = Math.floor(ms / 36e5) % 24;
      els.min.textContent = Math.floor(ms / 6e4) % 60;
      els.sec.textContent = String(Math.floor(ms / 1e3) % 60).padStart(2, '0');
    };
    tick(); setInterval(tick, 1000);
  }

  // Timeline
  document.getElementById('timeline').innerHTML = upcoming.length ? upcoming.map(function (e) {
    var cls = 't-' + e.type.toLowerCase().replace(/[^a-z]+/g, '-');
    return '<article class="event reveal">' +
      '<div class="date-chip"><span class="mo">' + MONTHS[e.d.getMonth()].toUpperCase() + '</span><span class="dy">' + e.d.getDate() + '</span><span class="wk">' + DAYS[e.d.getDay()] + '</span></div>' +
      '<div class="card"><div>' +
        GS.sampleTag(e.sample) + '<span class="type-pill ' + cls + '">' + GS.esc(e.type) + '</span>' +
        '<h3>' + GS.esc(e.title) + '</h3>' +
        '<div class="meta"><span>🕑 ' + GS.esc(e.time) + '</span><span>📍 ' + GS.esc(e.place) + '</span></div>' +
        '<p>' + GS.esc(e.text) + '</p></div>' +
        '<div class="cookie-wrap">' + GS.art(e.art, '') + '</div>' +
      '</div></article>';
  }).join('') : '<p class="empty-note">No upcoming events right now — check back soon!</p>';

  // Services
  var ICONS = {
    party: '<path d="M4 20 9 7l8 8z"/><path d="M14 4v2M19 9h2M17.5 5.5 16 7M20 13l-1.5-.5M11 2.5l.5 1.5"/>',
    gift: '<rect x="3" y="9" width="18" height="12" rx="2"/><path d="M3 13h18M12 9v12M12 9S10 4 7.5 4.5 7 9 12 9zm0 0s2-5 4.5-4.5S17 9 12 9z"/>',
    class: '<path d="M3 21h18M6 21V10l6-6 6 6v11"/><path d="M10 21v-5h4v5"/><circle cx="12" cy="10" r="1.5"/>'
  };
  document.getElementById('services').innerHTML = D.services.map(function (s) {
    return '<div class="card piped service reveal"><div class="svc-icon"><svg viewBox="0 0 24 24" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">' + (ICONS[s.icon] || ICONS.gift) + '</svg></div>' +
      '<h3>' + GS.esc(s.title) + '</h3><p>' + GS.esc(s.text) + '</p></div>';
  }).join('');

  // Calendar
  var cm = today.getMonth();
  document.getElementById('calendar').innerHTML = D.calendar.map(function (c, i) {
    return '<div class="cal-month reveal' + (i === cm ? ' now' : '') + '"><div class="m">' + c.m + '</div><div class="cookie-wrap">' + GS.art(c.art, c.theme) + '</div><p>' + GS.esc(c.theme) + '</p></div>';
  }).join('');

  GS.reveal();
});
