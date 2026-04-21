# RED-BATCH

Web storefront for RED-Batch — a controlled release apparel brand from South Africa. Each drop is a numbered batch. Once a batch closes, it's archived.

Live product categories: **T-shirts** and **Hoodies** only.

---

## Stack

| Layer | Tech |
|---|---|
| UI | React 18 (UMD via CDN) |
| JSX | Babel Standalone (no build step) |
| Styles | Inline React styles + `styles.css` |
| Fonts | Space Grotesk · Space Mono (Google Fonts) |
| Effects | Vanilla JS — film grain canvas, custom cursor |

No bundler. No framework. No dependencies to install. Open `index.html` via a local server and it runs.

---

## Structure

```
index.html    — Shell. Loads fonts, React, Babel, and the three source files.
styles.css    — Global styles: cursor, ticker, animations, scrollbar.
effects.js    — Film grain canvas + custom crosshair cursor (vanilla JS).
app.jsx       — Full React app: data, components, screens, routing.
```

---

## Screens

- **DROP** — Active batches available now. Stats bar shows units issued, season, and drop count.
- **PRODUCT** — Detail view for a single batch: specs, sizing, price, origin.
- **ARCHIVE** — All closed batches. Click any row to expand the record.
- **MANIFESTO** — Brand principles.
- **QUEUE** — Next batch preview with notification register.

---

## Current Drop — SS26-A

| ID | Item | Units | Price |
|---|---|---|---|
| RB-001 | Heavy Tee | 120 | R 850 |
| RB-002 | Pullover Hoodie | 80 | R 1 200 |
| RB-003 | Acid Wash Tee | 60 | R 950 |

All units manufactured in **South Africa**.

---

## Running Locally

Babel Standalone requires HTTP — it won't load `.jsx` files over `file://`.

**Option 1 — VS Code Live Server**
Install the Live Server extension, right-click `index.html` → *Open with Live Server*.

**Option 2 — Python**
```bash
python -m http.server 8000
# open http://localhost:8000
```

**Option 3 — Node**
```bash
npx serve .
```

---

## Responsive

Mobile layout activates at `≤ 768px`. Custom cursor and film grain are disabled on touch devices.

---

*RED-BATCH · South Africa · SS26-A*
