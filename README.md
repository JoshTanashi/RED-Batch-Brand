# RED-BATCH

Web storefront for RED-Batch — a controlled release apparel brand from South Africa. Each drop is a numbered batch. Once a batch closes, it's archived.

**Live site:** [joshtanashi.github.io/RED-Batch-Brand](https://joshtanashi.github.io/RED-Batch-Brand/)

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 18 |
| Build | Vite |
| Motion | motion (framer) + lenis smooth scroll |
| Styles | Inline React styles + per-section CSS custom properties (`styles.css`) |
| Data | Static array in `src/lib/products.js` |
| Email | EmailJS |
| Payments | PayFast |
| Fonts | Space Grotesk Variable · Space Mono (self-hosted via @fontsource) |

---

## Design

"Bone editorial" — off-white (#EDEAE4) base with alternating deep-charcoal sections, RED-BATCH red as the single accent, huge lowercase display typography, and transparent product cutouts floating across section boundaries. Sections set their palette via a `<Section tone="light|dark">` wrapper that provides CSS custom properties; components read semantic tokens (`C.bg`, `C.ink`, `C.dim`, `C.line`, `C.red`) that resolve per-section.

---

## Structure

```
index.html               — Vite entry shell + static preloader.
styles.css               — Global CSS: tokens, cursor, marquee/float keyframes, grain.
src/main.jsx             — React root + font imports.
src/App.jsx              — State machine, ?s= routing with legacy aliases, scroll owner.
src/lib/
  products.js            — Static product catalogue (BATCHES, SETS, optional cutout paths).
  payfast.js             — PayFast MD5 signature helpers.
  config.js              — Reads import.meta.env.* into named exports.
  theme.js               — TONES (light/dark CSS vars) + C/F tokens + type helpers.
  motion.js              — Shared motion re-exports and variants.
  useLenis.js            — Smooth-scroll init (skipped under reduced motion).
  format.js, useCursor.js, useIsMobile.js
src/components/          — Section, Reveal, Marquee, ProductImage, Header, Footer, Btn, Badge.
src/sections/            — Home page sections: Hero, CycleRow, QueueSection, ContactSection.
src/screens/             — HomeScreen, ProductScreen, CartScreen, CheckoutScreen, ResultScreen.
scripts/cutout.py        — One-off: extracts transparent product cutouts from photos.
```

---

## Pages

- **Home** (`?s=drop`) — one long editorial scroll: hero → red marquee band → the cycle's drops → the record set (with inline add-to-cart) → next-cycle queue signup → contact form. Legacy URLs `?s=queue`, `?s=contact`, `?s=sets` land on the matching home section.
- **PRODUCT** (`?s=product`) — detail view for a single batch: specs, sizing, price, origin.
- **CART** / **CHECKOUT** / **SUCCESS** / **CANCEL** — order flow via PayFast.

---

## Products

Products live in `src/lib/products.js` as two plain arrays, `BATCHES` and `SETS`. To add, edit, or remove a product (or swap an image), edit that file directly and redeploy. The optional `cutout` field points at a transparent WebP in `public/images/cutouts/` — regenerate with `python3 scripts/cutout.py` after replacing source photos.

---

## Running Locally

**1. Install dependencies:**
```bash
npm install
```

**2. Set up environment variables:**
```bash
cp .env.example .env
# Fill in your real PayFast and EmailJS credentials in .env
```

**3. Start the dev server:**
```bash
npm run dev
```

**4. Build for production:**
```bash
npm run build
npx serve dist   # preview the production build locally
```

---

## Deployment

The site deploys automatically to GitHub Pages on every push to `main` via `.github/workflows/deploy.yml`, and is also configured for Netlify (`netlify.toml`).

**How it works:**
1. GitHub Actions checks out the repo, runs `npm ci` and `npm run build`
2. Each `VITE_*` variable is injected at build time from a matching GitHub Secret
3. The built `dist/` folder is uploaded and published to GitHub Pages

**Setting up credentials for production:**
1. Go to the repo on GitHub → Settings → Secrets and variables → Actions
2. Add a secret for each key listed in `.env.example` (e.g. `PAYFAST_MERCHANT_ID`, `EMAILJS_PUBLIC_KEY`, etc.)
3. Push any change to `main` to trigger a redeploy with the new secrets

`VITE_PAYFAST_URL` defaults to the PayFast **sandbox** endpoint. Switching to the production PayFast URL is a deliberate manual step, not something a routine deploy should change.

> **Note:** `og:image` still points at `https://redbatch.store/images/og-image.jpg`, which is not in this repo — social link previews will show the old dark design until a new image is generated and hosted.

---

## Responsive & Accessibility

Mobile layout activates at `≤ 768px`. The custom cursor is disabled on touch devices. Smooth scrolling and entrance animations are disabled under `prefers-reduced-motion`. Text colors meet WCAG AA (≥ 4.5:1) on both tones.

---

*RED-BATCH · South Africa*
