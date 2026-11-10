# Geri's Sweets — Website

A five-page static website for Geri's Sweets custom decorated cookies:
**Home · Events · Gallery · Pricing · Contact Us**.

No build tools, no database, no server code — just HTML, CSS and JavaScript.
It runs by double-clicking a file and publishes free on GitHub Pages.

---

## 1. View it on your computer

**Easiest:** unzip the folder and double-click `index.html`. Everything works,
including the order form, because nothing needs a server.

**Optional local server** (behaves exactly like the live site):

```bash
cd gerissweets
python -m http.server 8000
```
Then open http://localhost:8000

While previewing locally you'll see a small **Preview mode** note and yellow
**SAMPLE** tags on placeholder content. Those never appear on the published site.

---

## 2. Make it yours (edit these two files)

| File | What's in it |
|---|---|
| `js/config.js` | Email, phone, service area, social links, order-form delivery, lead time |
| `js/data.js`   | Announcement bar, events, gallery, prices, add-ons, FAQ, home-page text |

Each item in `data.js` has `sample: true`. Remove that line once you've replaced
the item with real content and the SAMPLE tag disappears.

Geri's "Hi, I'm Geri!" story is in `index.html` (search for `EDIT ME`).

### Adding real cookie photos to the gallery
1. Put photos in `images/gallery/` (square-ish JPGs around 1200px look best).
2. In `js/data.js`, add a `photo` line to a gallery item:
   ```js
   { title: "Unicorn Birthday", category: "Birthday", date: "2026-11", photo: "images/gallery/unicorn.jpg" },
   ```
   The illustrated cookie is only used when there's no photo. New categories
   automatically become filter buttons.
3. Give each item a `date: "YYYY-MM"` (the month the cookies were made). The
   newest ones (8 by default, `showcaseCount` in `js/config.js`) automatically appear in
   **Fresh from Geri's kitchen** on the Home page, with a "New" badge for this
   month and last month.

### Events
Add, edit or remove entries in the `events` list. Past dates hide
automatically, and the "Next up" countdown always points at the next one.

---

## 3. Receiving orders (and customer photos)

**Default (no setup, free):** when a customer submits, their email app opens with
the whole order filled in, addressed to the email in `config.js`. If they added
photos, the site reminds them to attach those photos to that email before sending.

**Recommended:** [Formspree](https://formspree.io). Orders and the customer's
photos arrive together. Photo uploads need Formspree's **Personal** plan or
higher; the free plan can't receive files.
1. Create a Formspree account and a new form.
2. Copy the endpoint (looks like `https://formspree.io/f/abcdwxyz`).
3. Paste it into `formEndpoint` in `js/config.js`.
4. In the form's settings, add a file validation rule allowing **images only**
   (a server-side backstop to the website's own checks).

Every order includes contact info, date, rush flag, style, exact cookie count,
photos, extras, allergies and the website estimate.

### How photos are checked
Before any photo can be sent, the website:
1. **Reads the file's real signature.** It must truly be a JPG, PNG, WebP or GIF,
   whatever its name says. Renamed programs, PDFs, web pages and SVGs are rejected.
2. **Opens it as a picture.** Damaged or fake images are rejected, as are
   absurdly huge ones.
3. **Sends a clean copy.** The picture is redrawn into a brand-new JPEG, so only
   the pixels travel. Hidden data, camera details and GPS location are removed.
   The original file is never uploaded.

Limits: up to 6 photos per order, 20 MB each. Change them at the top of
`js/photo-upload.js`.

---

## 4. Publish on GitHub Pages (free)

1. Create a new **public** repository on GitHub, e.g. `gerissweets-site`.
2. Upload everything **inside** the `gerissweets` folder to the repo root
   (`index.html` must be at the top level). Include the hidden `.nojekyll` file.
   Using git:
   ```bash
   cd gerissweets
   git init
   git add .
   git commit -m "Geri's Sweets website"
   git branch -M main
   git remote add origin https://github.com/YOUR-ACCOUNT/gerissweets-site.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
   pick `main` and `/ (root)`, then **Save**.
4. In a minute or two the site is live at
   `https://YOUR-ACCOUNT.github.io/gerissweets-site/`.

**Custom domain** (e.g. `gerissweets.com`): buy the domain, add it under
Settings → Pages → Custom domain, and follow GitHub's DNS instructions.
Tick **Enforce HTTPS** once it's available.

---

## Folder map

```
index.html  events.html  gallery.html  pricing.html  contact.html
css/style.css       all styling (colors at the top under :root)
css/fonts.css       self-hosted fonts
js/config.js        business settings          <- edit
js/data.js          site content and prices    <- edit
js/cookie-art.js    draws the illustrated cookies
js/site.js          header, footer, effects, price math
js/photo-upload.js  photo checks for the order form
js/home.js events.js gallery.js pricing.js contact.js   page scripts
images/             logo, icons, gallery photos
fonts/              font files
```

Fonts: Lobster Two, Alfa Slab One, Nunito and Caveat (SIL Open Font License).
