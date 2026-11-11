/* =========================================================
   GERI'S SWEETS — SITE CONTENT
   Everything here is plain data. Edit text, prices, dates and
   gallery items without touching any page code.

   "sample: true" marks placeholder content. While you preview
   the site on your own computer, those items show a little
   "sample" tag so you remember to replace them. The tag never
   shows on the published site.

   COOKIE ART: anywhere you see  art: { shape, icing, accent, deco }
   the site draws an illustrated cookie. Options:
     shape: round | heart | star | flower | plaque | tree
     deco:  dots | sprinkles | flowers | swirl | stripes | hearts | snow | monogram
     letter: one character (used with deco "monogram")
   Add  photo: "images/gallery/your-photo.jpg"  to use a real photo instead.

   GALLERY DATES: give every gallery item  date: "YYYY-MM"  (the month the
   cookies were made). The newest ones appear automatically in the
   "Fresh from Geri's kitchen" showcase on the Home page.
   ========================================================= */

window.GS_DATA = {

  /* Banner across the top of every page. Hidden after "until". */
  announcement: {
    text: "Holiday cookie orders are open! Reserve your date by December 10.",
    link: "contact.html",
    linkText: "Reserve your date",
    until: "2026-12-10",
    sample: true
  },

  /* Home page: "Made for your moments" */
  occasions: [
    { name: "Birthdays",     blurb: "Names, ages, favorite colors — a party on a plate.",  art: { shape: "star",   icing: "#A98ADB", accent: "#F6DD72", deco: "sprinkles" } },
    { name: "Weddings",      blurb: "Elegant favors and dessert-table showpieces.",        art: { shape: "plaque", icing: "#FFFFFF", accent: "#C8A15A", deco: "flowers" } },
    { name: "Baby Showers",  blurb: "Soft pastels, tiny details, sweet little welcomes.",  art: { shape: "heart",  icing: "#F4A9BD", accent: "#FFFFFF", deco: "dots" } },
    { name: "Holidays",      blurb: "Seasonal collections for gifting and sharing.",       art: { shape: "tree",   icing: "#7FB89A", accent: "#FFFFFF", deco: "snow" } },
    { name: "Corporate",     blurb: "Logo cookies and thank-you boxes for clients & teams.", art: { shape: "round", icing: "#FFF4D6", accent: "#6A3B1F", deco: "monogram", letter: "G" } },
    { name: "Just Because",  blurb: "No reason needed. Cookies are the reason.",            art: { shape: "flower", icing: "#F6DD72", accent: "#F4A9BD", deco: "swirl" } }
  ],

  /* Events page: upcoming dates. Past events hide automatically. */
  events: [
    { date: "2026-11-24", title: "Thanksgiving Pickup Day", type: "Pickup",
      place: "Pickup from Geri's kitchen", time: "10am – 4pm",
      text: "Pre-ordered pumpkin, leaf and turkey sets ready for your table.", sample: true,
      art: { shape: "flower", icing: "#E8A25A", accent: "#FFF4D6", deco: "dots" } },
    { date: "2026-12-05", title: "Holiday Cookie Pop-Up", type: "Pop-Up Market",
      place: "Location to be announced", time: "9am – 1pm",
      text: "Grab-and-go holiday cookies, gift boxes and stocking stuffers while they last.", sample: true,
      art: { shape: "tree", icing: "#7FB89A", accent: "#FFFFFF", deco: "snow" } },
    { date: "2026-12-10", title: "Last Day for Holiday Orders", type: "Order Deadline",
      place: "Online", time: "11:59pm",
      text: "Final day to reserve custom holiday cookies for Christmas week.", sample: true,
      art: { shape: "star", icing: "#F6DD72", accent: "#FFFFFF", deco: "dots" } },
    { date: "2026-12-13", title: "Winter Wonderland Decorating Class", type: "Class",
      place: "Location to be announced", time: "2pm – 4pm",
      text: "Learn flooding, wet-on-wet and piping basics. Take home six cookies you decorated yourself.", sample: true,
      art: { shape: "round", icing: "#BFD9F2", accent: "#FFFFFF", deco: "snow" } },
    { date: "2027-02-06", title: "Valentine's Pre-Order Deadline", type: "Order Deadline",
      place: "Online", time: "11:59pm",
      text: "Hearts, love notes and sweetheart boxes — reserve yours early.", sample: true,
      art: { shape: "heart", icing: "#E86A8A", accent: "#FFFFFF", deco: "hearts" } },
    { date: "2027-04-03", title: "Easter Collection Pickup", type: "Pickup",
      place: "Pickup from Geri's kitchen", time: "10am – 2pm",
      text: "Bunnies, eggs and spring blooms in soft pastel sets.", sample: true,
      art: { shape: "flower", icing: "#C9B6EE", accent: "#F6DD72", deco: "flowers" } }
  ],

  /* Events page: "Bring the cookies to your event" */
  services: [
    { title: "Cookie Decorating Parties", text: "Geri brings pre-baked cookies, piping bags and sprinkles. Your guests decorate, laugh and take home their creations. Great for birthdays and girls' nights.", icon: "party" },
    { title: "Favors & Dessert Tables", text: "Individually wrapped favors with custom tags, or a styled cookie display that matches your colors and theme.", icon: "gift" }
  ],

  /* Events page: the seasonal cookie calendar */
  calendar: [
    { m: "Jan", theme: "Snowflakes & winter blues",     art: { shape: "star",   icing: "#BFD9F2", accent: "#FFFFFF", deco: "snow" } },
    { m: "Feb", theme: "Valentine's hearts",            art: { shape: "heart",  icing: "#E86A8A", accent: "#FFFFFF", deco: "hearts" } },
    { m: "Mar", theme: "Shamrocks & spring showers",    art: { shape: "flower", icing: "#8CCB8F", accent: "#FFFFFF", deco: "dots" } },
    { m: "Apr", theme: "Easter eggs & bunnies",         art: { shape: "plaque", icing: "#C9B6EE", accent: "#F6DD72", deco: "stripes" } },
    { m: "May", theme: "Mother's Day & graduations",    art: { shape: "flower", icing: "#F4A9BD", accent: "#F6DD72", deco: "flowers" } },
    { m: "Jun", theme: "Weddings & Father's Day",       art: { shape: "plaque", icing: "#FFFFFF", accent: "#C8A15A", deco: "dots" } },
    { m: "Jul", theme: "Stars, stripes & summer",       art: { shape: "star",   icing: "#5B7FC7", accent: "#FFFFFF", deco: "dots" } },
    { m: "Aug", theme: "Back to school",                art: { shape: "round",  icing: "#F6DD72", accent: "#6A3B1F", deco: "monogram", letter: "A" } },
    { m: "Sep", theme: "Fall leaves & football",        art: { shape: "flower", icing: "#E8A25A", accent: "#FFF4D6", deco: "swirl" } },
    { m: "Oct", theme: "Pumpkins & sweet spooks",       art: { shape: "round",  icing: "#F08A3C", accent: "#3B2A1A", deco: "stripes" } },
    { m: "Nov", theme: "Thankful harvest sets",         art: { shape: "flower", icing: "#D98B4E", accent: "#FFF4D6", deco: "dots" } },
    { m: "Dec", theme: "Christmas & holiday gifting",   art: { shape: "tree",   icing: "#7FB89A", accent: "#FFFFFF", deco: "snow" } }
  ],

  /* Gallery. Categories become the filter buttons automatically. */
  gallery: [
    // Geri's real cookie photos. The first 8 appear in "Fresh from Geri's kitchen"
    // on the Home page. Add new photos at the TOP so they show up there first.
    // Optional: date: "2026-11" (month made) adds the month to the caption and a "New" badge.
    { title: "Dink for Pink Pickleball Event", category: "Corporate", date: "", photo: "images/gallery/dink-for-pink-pickleball-event.jpg", thumb: "images/gallery/thumbs/dink-for-pink-pickleball-event.jpg" },
    { title: "Pretty Spooky Halloween", category: "Holidays", date: "", photo: "images/gallery/pretty-spooky-halloween.jpg", thumb: "images/gallery/thumbs/pretty-spooky-halloween.jpg" },
    { title: "Just Married Wedding Cakes", category: "Wedding", date: "", photo: "images/gallery/just-married-wedding-cakes.jpg", thumb: "images/gallery/thumbs/just-married-wedding-cakes.jpg" },
    { title: "Thank You Pastor Appreciation", category: "Religious", date: "", photo: "images/gallery/thank-you-pastor-appreciation.jpg", thumb: "images/gallery/thumbs/thank-you-pastor-appreciation.jpg" },
    { title: "Level 14 Unlocked Gamer Birthday", category: "Birthday", date: "", photo: "images/gallery/level-14-unlocked-gamer-birthday.jpg", thumb: "images/gallery/thumbs/level-14-unlocked-gamer-birthday.jpg" },
    { title: "Baby-Q Brews & Babies", category: "Baby Shower", date: "", photo: "images/gallery/baby-q-brews-babies.jpg", thumb: "images/gallery/thumbs/baby-q-brews-babies.jpg" },
    { title: "Paw Patrol Pups", category: "Birthday", date: "", photo: "images/gallery/paw-patrol-pups.jpg", thumb: "images/gallery/thumbs/paw-patrol-pups.jpg" },
    { title: "Vintage 1986 40th Birthday", category: "Birthday", date: "", photo: "images/gallery/vintage-1986-40th-birthday.jpg", thumb: "images/gallery/thumbs/vintage-1986-40th-birthday.jpg" },
    { title: "Pink Roses Baby Shower", category: "Baby Shower", date: "", photo: "images/gallery/pink-roses-baby-shower.jpg", thumb: "images/gallery/thumbs/pink-roses-baby-shower.jpg" },
    { title: "Roller Disco 10th Birthday", category: "Birthday", date: "", photo: "images/gallery/roller-disco-10th-birthday.jpg", thumb: "images/gallery/thumbs/roller-disco-10th-birthday.jpg" },
    { title: "Hole in One Golf 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/hole-in-one-golf-1st-birthday.jpg", thumb: "images/gallery/thumbs/hole-in-one-golf-1st-birthday.jpg" },
    { title: "Plaid Teddy Bear Baby Shower", category: "Baby Shower", date: "", photo: "images/gallery/plaid-teddy-bear-baby-shower.jpg", thumb: "images/gallery/thumbs/plaid-teddy-bear-baby-shower.jpg" },
    { title: "Racing ONEder 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/racing-oneder-1st-birthday.jpg", thumb: "images/gallery/thumbs/racing-oneder-1st-birthday.jpg" },
    { title: "Sweet Peach 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/sweet-peach-1st-birthday.jpg", thumb: "images/gallery/thumbs/sweet-peach-1st-birthday.jpg" },
    { title: "Classic Pooh Storybook Shower", category: "Baby Shower", date: "", photo: "images/gallery/classic-pooh-storybook-shower.jpg", thumb: "images/gallery/thumbs/classic-pooh-storybook-shower.jpg" },
    { title: "Touchdown 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/touchdown-1st-birthday.jpg", thumb: "images/gallery/thumbs/touchdown-1st-birthday.jpg" },
    { title: "Tropical Plants Birthday", category: "Birthday", date: "", photo: "images/gallery/tropical-plants-birthday.jpg", thumb: "images/gallery/thumbs/tropical-plants-birthday.jpg" },
    { title: "Floral Tea Party 3rd Birthday", category: "Birthday", date: "", photo: "images/gallery/floral-tea-party-3rd-birthday.jpg", thumb: "images/gallery/thumbs/floral-tea-party-3rd-birthday.jpg" },
    { title: "Little Pumpkin Baby Shower", category: "Baby Shower", date: "", photo: "images/gallery/little-pumpkin-baby-shower.jpg", thumb: "images/gallery/thumbs/little-pumpkin-baby-shower.jpg" },
    { title: "Rose Teacup 3rd Birthday", category: "Birthday", date: "", photo: "images/gallery/rose-teacup-3rd-birthday.jpg", thumb: "images/gallery/thumbs/rose-teacup-3rd-birthday.jpg" },
    { title: "Michigan Grad 2022", category: "Graduation", date: "", photo: "images/gallery/michigan-grad-2022.jpg", thumb: "images/gallery/thumbs/michigan-grad-2022.jpg" },
    { title: "Gabby's Dollhouse Birthday", category: "Birthday", date: "", photo: "images/gallery/gabby-s-dollhouse-birthday.jpg", thumb: "images/gallery/thumbs/gabby-s-dollhouse-birthday.jpg" },
    { title: "First Communion Blessings", category: "Religious", date: "", photo: "images/gallery/first-communion-blessings.jpg", thumb: "images/gallery/thumbs/first-communion-blessings.jpg" },
    { title: "School Supplies Set", category: "Back to School", date: "", photo: "images/gallery/school-supplies-set.jpg", thumb: "images/gallery/thumbs/school-supplies-set.jpg" },
    { title: "Healthcare Heroes Thank You", category: "Occupation", date: "", photo: "images/gallery/healthcare-heroes-thank-you.jpg", thumb: "images/gallery/thumbs/healthcare-heroes-thank-you.jpg" },
    { title: "Two Fast 2nd Birthday", category: "Birthday", date: "", photo: "images/gallery/two-fast-2nd-birthday.jpg", thumb: "images/gallery/thumbs/two-fast-2nd-birthday.jpg" },
    { title: "Pooh Bear Baby Shower", category: "Baby Shower", date: "", photo: "images/gallery/pooh-bear-baby-shower.jpg", thumb: "images/gallery/thumbs/pooh-bear-baby-shower.jpg" },
    { title: "Fire Academy Graduation", category: "Graduation", date: "", photo: "images/gallery/fire-academy-graduation.jpg", thumb: "images/gallery/thumbs/fire-academy-graduation.jpg" },
    { title: "Future Nurse Graduation", category: "Graduation", date: "", photo: "images/gallery/future-nurse-graduation.jpg", thumb: "images/gallery/thumbs/future-nurse-graduation.jpg" },
    { title: "Incredible Hulk Birthday", category: "Birthday", date: "", photo: "images/gallery/incredible-hulk-birthday.jpg", thumb: "images/gallery/thumbs/incredible-hulk-birthday.jpg" },
    { title: "School Bus Back to School", category: "Back to School", date: "", photo: "images/gallery/school-bus-back-to-school.jpg", thumb: "images/gallery/thumbs/school-bus-back-to-school.jpg" },
    { title: "Blue First Communion", category: "Religious", date: "", photo: "images/gallery/blue-first-communion.jpg", thumb: "images/gallery/thumbs/blue-first-communion.jpg" },
    { title: "Tassel Hassle Class of 2022", category: "Graduation", date: "", photo: "images/gallery/tassel-hassle-class-of-2022.jpg", thumb: "images/gallery/thumbs/tassel-hassle-class-of-2022.jpg" },
    { title: "Keep Calm 50th Birthday", category: "Birthday", date: "", photo: "images/gallery/keep-calm-50th-birthday.jpg", thumb: "images/gallery/thumbs/keep-calm-50th-birthday.jpg" },
    { title: "Apples & Diplomas", category: "Graduation", date: "", photo: "images/gallery/apples-diplomas.jpg", thumb: "images/gallery/thumbs/apples-diplomas.jpg" },
    { title: "One-a-Saurus 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/one-a-saurus-1st-birthday.jpg", thumb: "images/gallery/thumbs/one-a-saurus-1st-birthday.jpg" },
    { title: "Congrats Grad Florals", category: "Graduation", date: "", photo: "images/gallery/congrats-grad-florals.jpg", thumb: "images/gallery/thumbs/congrats-grad-florals.jpg" },
    { title: "First Holy Communion Cross", category: "Religious", date: "", photo: "images/gallery/first-holy-communion-cross.jpg", thumb: "images/gallery/thumbs/first-holy-communion-cross.jpg" },
    { title: "Cheers to 50 Years", category: "Birthday", date: "", photo: "images/gallery/cheers-to-50-years.jpg", thumb: "images/gallery/thumbs/cheers-to-50-years.jpg" },
    { title: "Graduation Birthday Celebration", category: "Graduation", date: "", photo: "images/gallery/graduation-birthday-celebration.jpg", thumb: "images/gallery/thumbs/graduation-birthday-celebration.jpg" },
    { title: "Red Rose Wedding", category: "Wedding", date: "", photo: "images/gallery/red-rose-wedding.jpg", thumb: "images/gallery/thumbs/red-rose-wedding.jpg" },
    { title: "Bluey 4th Birthday", category: "Birthday", date: "", photo: "images/gallery/bluey-4th-birthday.jpg", thumb: "images/gallery/thumbs/bluey-4th-birthday.jpg" },
    { title: "A Little Sprout Is Growing", category: "Baby Shower", date: "", photo: "images/gallery/a-little-sprout-is-growing.jpg", thumb: "images/gallery/thumbs/a-little-sprout-is-growing.jpg" },
    { title: "Hawks Basketball Team", category: "Sports", date: "", photo: "images/gallery/hawks-basketball-team.jpg", thumb: "images/gallery/thumbs/hawks-basketball-team.jpg" },
    { title: "Blessed Baptism Roses", category: "Religious", date: "", photo: "images/gallery/blessed-baptism-roses.jpg", thumb: "images/gallery/thumbs/blessed-baptism-roses.jpg" },
    { title: "Dino World 3rd Birthday", category: "Birthday", date: "", photo: "images/gallery/dino-world-3rd-birthday.jpg", thumb: "images/gallery/thumbs/dino-world-3rd-birthday.jpg" },
    { title: "We Can Bearly Wait", category: "Baby Shower", date: "", photo: "images/gallery/we-can-bearly-wait.jpg", thumb: "images/gallery/thumbs/we-can-bearly-wait.jpg" },
    { title: "Time for Tea Bridal Shower", category: "Wedding", date: "", photo: "images/gallery/time-for-tea-bridal-shower.jpg", thumb: "images/gallery/thumbs/time-for-tea-bridal-shower.jpg" },
    { title: "Sesame Street Party", category: "Birthday", date: "", photo: "images/gallery/sesame-street-party.jpg", thumb: "images/gallery/thumbs/sesame-street-party.jpg" },
    { title: "Under the Sea Baby", category: "Baby Shower", date: "", photo: "images/gallery/under-the-sea-baby.jpg", thumb: "images/gallery/thumbs/under-the-sea-baby.jpg" },
    { title: "Vintage 50th Birthday", category: "Birthday", date: "", photo: "images/gallery/vintage-50th-birthday.jpg", thumb: "images/gallery/thumbs/vintage-50th-birthday.jpg" },
    { title: "Wrapped Gift Name Tags", category: "Gifts", date: "", photo: "images/gallery/wrapped-gift-name-tags.jpg", thumb: "images/gallery/thumbs/wrapped-gift-name-tags.jpg" },
    { title: "Safari Baby Girl", category: "Baby Shower", date: "", photo: "images/gallery/safari-baby-girl.jpg", thumb: "images/gallery/thumbs/safari-baby-girl.jpg" },
    { title: "Roaring Lion 4th Birthday", category: "Birthday", date: "", photo: "images/gallery/roaring-lion-4th-birthday.jpg", thumb: "images/gallery/thumbs/roaring-lion-4th-birthday.jpg" },
    { title: "Something Blue Bridal Shower", category: "Wedding", date: "", photo: "images/gallery/something-blue-bridal-shower.jpg", thumb: "images/gallery/thumbs/something-blue-bridal-shower.jpg" },
    { title: "Two Peas in a Pod", category: "Baby Shower", date: "", photo: "images/gallery/two-peas-in-a-pod.jpg", thumb: "images/gallery/thumbs/two-peas-in-a-pod.jpg" },
    { title: "Baseball Birthday Boy", category: "Birthday", date: "", photo: "images/gallery/baseball-birthday-boy.jpg", thumb: "images/gallery/thumbs/baseball-birthday-boy.jpg" },
    { title: "Game Day Basketball", category: "Sports", date: "", photo: "images/gallery/game-day-basketball.jpg", thumb: "images/gallery/thumbs/game-day-basketball.jpg" },
    { title: "Little Blue Baby Boy", category: "Baby Shower", date: "", photo: "images/gallery/little-blue-baby-boy.jpg", thumb: "images/gallery/thumbs/little-blue-baby-boy.jpg" },
    { title: "Sweet One Ice Cream Party", category: "Birthday", date: "", photo: "images/gallery/sweet-one-ice-cream-party.jpg", thumb: "images/gallery/thumbs/sweet-one-ice-cream-party.jpg" },
    { title: "Cherry on Top", category: "Baby Shower", date: "", photo: "images/gallery/cherry-on-top.jpg", thumb: "images/gallery/thumbs/cherry-on-top.jpg" },
    { title: "Frozen 4th Birthday", category: "Birthday", date: "", photo: "images/gallery/frozen-4th-birthday.jpg", thumb: "images/gallery/thumbs/frozen-4th-birthday.jpg" },
    { title: "Berry Sweet Baby Girl", category: "Baby Shower", date: "", photo: "images/gallery/berry-sweet-baby-girl.jpg", thumb: "images/gallery/thumbs/berry-sweet-baby-girl.jpg" },
    { title: "Winnie the Pooh 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/winnie-the-pooh-1st-birthday.jpg", thumb: "images/gallery/thumbs/winnie-the-pooh-1st-birthday.jpg" },
    { title: "Blue Elephant Baby", category: "Baby Shower", date: "", photo: "images/gallery/blue-elephant-baby.jpg", thumb: "images/gallery/thumbs/blue-elephant-baby.jpg" },
    { title: "Goose & Gingham 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/goose-gingham-1st-birthday.jpg", thumb: "images/gallery/thumbs/goose-gingham-1st-birthday.jpg" },
    { title: "Tea Party Blooms", category: "Baby Shower", date: "", photo: "images/gallery/tea-party-blooms.jpg", thumb: "images/gallery/thumbs/tea-party-blooms.jpg" },
    { title: "Berry Sweet One", category: "Birthday", date: "", photo: "images/gallery/berry-sweet-one.jpg", thumb: "images/gallery/thumbs/berry-sweet-one.jpg" },
    { title: "Storybook Classics", category: "Baby Shower", date: "", photo: "images/gallery/storybook-classics.jpg", thumb: "images/gallery/thumbs/storybook-classics.jpg" },
    { title: "Hunny Pot 1st Birthday", category: "Birthday", date: "", photo: "images/gallery/hunny-pot-1st-birthday.jpg", thumb: "images/gallery/thumbs/hunny-pot-1st-birthday.jpg" },
    { title: "Frozen 3rd Birthday", category: "Birthday", date: "", photo: "images/gallery/frozen-3rd-birthday.jpg", thumb: "images/gallery/thumbs/frozen-3rd-birthday.jpg" },
    { title: "Woodland Friends", category: "Birthday", date: "", photo: "images/gallery/woodland-friends.jpg", thumb: "images/gallery/thumbs/woodland-friends.jpg" }
  ],

  /* Pricing. These are PLACEHOLDER prices — set your own. */
  pricing: {
    sample: false,
    tiers: [
      { id: "simple", name: "Sweet & Simple", perDozen: 35,
        tagline: "Pretty, cheerful and party-ready",
        features: ["1–2 icing colors", "Classic shapes", "Sprinkles, dots or simple patterns", "Great for classrooms & big crowds"],
        art: { shape: "round", icing: "#F4A9BD", accent: "#FFFFFF", deco: "sprinkles" } },
      { id: "corporate", name: "Corporate Logos", perDozen: 40, badge: "For businesses",
        tagline: "Your brand, deliciously",
        features: ["Your company logo in icing", "Matched to your brand colors", "Client gifts, events & thank-yous", "Pairs with custom tags & bagging"],
        art: { shape: "plaque", icing: "#FFFFFF", accent: "#6A3B1F", deco: "monogram", letter: "Co" } }
    ],
    addons: [
      { id: "bag",   name: "Individually bagged with ribbon", price: 0.50, unit: "cookie" },
      { id: "tag",   name: "Custom tag or sticker",            price: 0.25, unit: "cookie" },
      { id: "names", name: "Personalized name on each cookie", price: 0.75, unit: "cookie" },
      { id: "box",   name: "Gift box (per dozen)",             price: 6.00, unit: "dozen" }
    ],
    deliveryFee: 10,
    rushPct: 20,
    discount: { minDozen: 6, pct: 5 },
    minimumDozen: 1
  },

  /* Pricing page: ingredients (copied from Geri's product labels) */
  ingredients: {
    business: "Geri's Sweets, LLC",
    location: "Venice, FL",
    product: "Decorated Sugar Cookies",
    parts: [
      { name: "Cookie base",
        text: "Bleached Wheat Flour Enriched (bleached wheat flour, niacin, reduced iron, thiamine, mononitrate, riboflavin, folic acid), Malted Barley Flour, Butter (cream, natural flavors, milk), Eggs, Water, Caramel color class IV, Ethyl alcohol 1%, Monopropileneglycol, Artificial flavor, Potassium sorbate (preservative), and Sulfiting agent." },
      { name: "Icing",
        text: "Corn starch, Sugar, Dried egg white, Gum arabic, Sodium aluminum sulphate, Citric acid, Cream of tartar, Vanillin." }
    ],
    contains: ["Wheat", "Milk", "Eggs"],
    mayContain: ["Soy"],
    cottage: "Made in a cottage food operation that is not subject to Florida's food safety regulations."
  },

  /* Pricing page FAQ */
  faq: [
    { q: "How far ahead should I order?", a: "Two to three weeks is ideal, and holidays book up fast. Orders needed in under a week may be possible for a rush fee — just ask!" },
    { q: "How do I pay?", a: "Zelle, Venmo or cash, due at pickup or delivery." },
    { q: "Do you deliver?", a: "Yes, locally for a small flat fee. Pickup is always free." },
    { q: "How long do the cookies stay fresh?", a: "Sealed cookies stay fresh for well over a week at room temperature. Keep them out of the fridge and direct sun so the icing stays beautiful." },
    { q: "What about allergies?", a: "Our cookies contain wheat, milk and eggs, and may contain soy. See the full ingredient list above, and please tell us about any allergies when you order so we can talk it through." },
    { q: "Can you match my invitation or logo?", a: "Absolutely. Send a photo of your invitation, color swatch or logo after placing your order and Geri will design around it." }
  ],

  /* Home page: steps */
  steps: [
    { title: "Dream it up",   text: "Tell us your date, theme and colors — and add photos of anything that inspires you." },
    { title: "Design chat",   text: "Geri reaches out to fine-tune the details and confirm your quote." },
    { title: "Baked & piped", text: "Every cookie is baked fresh and decorated by hand, one layer of icing at a time." },
    { title: "Sweet delivery",text: "Pick up or have them delivered, ready to wow your guests." }
  ]
};
