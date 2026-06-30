# RED-BATCH

Web storefront for RED-Batch — a controlled release apparel brand from South Africa. Each drop is a numbered batch. Once a batch closes, it's archived.

**Live site:** [joshtanashi.github.io/RED-Batch-Brand](https://joshtanashi.github.io/RED-Batch-Brand/)

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 18 |
| Build | Vite |
| Styles | Inline React styles + `styles.css` |
| Data | Static array in `src/lib/products.js` |
| Email | EmailJS |
| Payments | PayFast |
| Fonts | Space Grotesk · Space Mono (Google Fonts) |

---

## Structure

```
index.html              — Vite entry shell.
src/main.jsx             — React root.
src/App.jsx              — State machine, query-param routing.
src/lib/
  products.js             — Static product catalogue (BATCHES, SETS).
  payfast.js              — PayFast MD5 signature helpers.
  config.js                — Reads import.meta.env.* into named exports.
  format.js, theme.js, useCursor.js, useIsMobile.js
src/components/          — Shared UI: Header, Footer, Btn, Divider, Ticker, etc.
src/screens/             — One file per screen (Drop, Product, Cart, Checkout,
                            Success, Cancel, Queue, Sets, Contact, Dropping).
.env.example             — Template for required environment variables.
```

---

## Screens

- **DROP** (`?s=drop`) — Active batches available now.
- **PRODUCT** (`?s=product`) — Detail view for a single batch: specs, sizing, price, origin.
- **SETS** (`?s=sets`) — Permanent cycle sets (tee + hoodie bundles).
- **QUEUE** (`?s=queue`) — Next batch preview with notification register.
- **CART** / **CHECKOUT** / **SUCCESS** / **CANCEL** — Order flow via PayFast.
- **CONTACT** (`?s=contact`) — Contact form via EmailJS.

---

## Products

Products live in `src/lib/products.js` as two plain arrays, `BATCHES` and `SETS`. To add, edit, or remove a product (or swap an image), edit that file directly and redeploy.

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

---

## Responsive

Mobile layout activates at `≤ 768px`. The custom cursor is disabled on touch devices.

---

*RED-BATCH · South Africa*
