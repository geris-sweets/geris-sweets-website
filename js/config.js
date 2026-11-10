/* =========================================================
   GERI'S SWEETS — SITE SETTINGS
   Edit the values below; every page picks them up.
   ========================================================= */
window.SITE_CONFIG = {
  businessName: "Geri's Sweets",
  brandScript: "Geri's",
  brandSlab: "Sweets",
  tagline: "Hand-decorated custom cookies for every celebration",

  // Contact details shown in the footer and used by the order form
  email: "g.guastel@hotmail.com",
  phone: "(763) 402-0901",              // or "" to hide
  serviceArea: "Local pickup & delivery", // e.g. "Brandon, FL & nearby"

  // Facebook business page (leave "" to hide the Facebook links)
  facebook: "https://www.facebook.com/profile.php?id=100042275606862",

  // Home page showcase: how many of the newest gallery photos to show
  showcaseCount: 8,

  // Extra people who get a copy of every order (not shown on the website)
  orderCopyTo: ["robert.guastella.sr@gmail.com"],

  // ORDER FORM DELIVERY
  // Leave blank: the form opens the customer's email app with the order filled in.
  // Paste a free Formspree endpoint (https://formspree.io) to receive orders
  // straight to your inbox instead, e.g. "https://formspree.io/f/abcdwxyz"
  // (With Formspree, also add the orderCopyTo address(es) as recipients in
  //  the form's settings on formspree.io; the website can't set that itself.)
  formEndpoint: "",

  leadTimeDays: 7,                 // orders inside this window count as "rush"
  minimumNoticeDays: 2,            // earliest date a customer can pick
  payment: ["Zelle", "Venmo", "Cash"],

  logo: "images/logo.png",
  logoSmall: "images/logo-small.png"
};
