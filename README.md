# Financial Dashboard – Next.js 14 + Tailwind + Recharts + Capacitor

This project implements the assignment:

- Recreate a financial dashboard UI in **Next.js 14 (App Router)** with **Tailwind CSS**.
- A **PDF download** button that exports the dashboard section with the same design.
- The same project can be wrapped into **Android/iOS apps using Capacitor**.
- Data is fetched from **mock JSON endpoints** located under `/public/mock` to support **static export** and Capacitor.

## Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run in development
npm run dev

# 3) Build a static export (to ./out)
npm run build
```

Open http://localhost:3000 to view.

> **Note:** We use static JSON files instead of Next API routes so `next export` works cleanly and the app bundles nicely with Capacitor.

## Project Structure

```
financial-dashboard-nextjs/
├─ app/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ Navbar.tsx
│  ├─ StatCard.tsx
│  ├─ TimeFilter.tsx
│  └─ charts/
│     ├─ ClientsBubbleChart.tsx    (Scatter/Bubble)
│     ├─ SipBusinessChart.tsx      (Bar + Line)
│     └─ MonthlyMISChart.tsx       (Multi-line)
├─ lib/
│  ├─ theme.tsx                    (Dark mode provider)
│  └─ types.ts
├─ public/
│  └─ mock/                        (Mock "API" JSONs by time range)
├─ styles/
│  └─ globals.css
├─ capacitor.config.ts             (Capacitor setup)
├─ next.config.mjs                 (Static export, unoptimized images)
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json
```

## Features

- **Top Navigation Bar** with menu items and dark mode toggle.
- **Two main cards**: AUM and SIP with MoM % and "View Report" action.
- **Time Range** filter: 3D, 7D, 10D, 30D — swapping the mock JSON file.
- **Stat Cards**: Purchases, Redemptions, Rejected Transactions, SIP Rejections, New SIP.
- **Charts** using **Recharts**:
  - Clients **bubble** (Scatter) chart
  - SIP Business **bar + line** (ComposedChart)
  - Monthly MIS **multi-line** (LineChart)
- **Responsive** and **dark mode** (Tailwind `dark` class strategy).
- **PDF Download** using `html2canvas` + `jspdf`:
  - Captures the dashboard section and saves as `financial-dashboard-<range>.pdf`.
  - On **Capacitor native**, uses the **Filesystem** plugin to save to **Documents**.

## PDF Notes

The `Download PDF` button captures the `#dashboard-pdf` container. For best quality, it uses `html2canvas` with `scale: 2`. You can style the capture area as needed; everything inside will render to the PDF.

## Capacitor – Android/iOS

Capacitor wraps the exported web app.

### 1) Initialize Capacitor (already included)

`capacitor.config.ts` is present. To finish setup:

```bash
# If Android/iOS folders not created yet
npm run cap:android
npm run cap:ios
```

### 2) Build web assets and copy to platforms

```bash
npm run build                # produces ./out
npm run cap:copy             # copies ./out into platforms
npm run cap:sync             # ensures plugins/platforms are synced
```

### 3) Serve mode (optional)

If you prefer to load from a hosted URL instead of bundled assets, edit `capacitor.config.ts` `server.url` to your HTTPS URL and set `cleartext` accordingly.

### 4) Open IDEs

```bash
npm run cap:open:android
npm run cap:open:ios
```

Build and run from Android Studio / Xcode as usual.

### Filesystem plugin on native

The PDF save path in native uses Capacitor's Filesystem plugin and writes to the **Documents** directory. You can adjust to `Data` or `External` if desired.

## Customizing Data

Edit the JSON files under `public/mock/`:

- `dashboard-3d.json`
- `dashboard-7d.json`
- `dashboard-10d.json`
- `dashboard-30d.json`

Each contains:
```json
{
  "range": "7d",
  "updatedAt": "2025-09-01T12:00:00.000000",
  "cards": { "aum": { "value": 12500000, "mom": 3.2 }, "sip": { "value": 275000, "mom": 1.1 } },
  "stats": { "purchases": 110, "redemptions": 45, "rejected": 3, "sipRejections": 6, "newSip": 20 },
  "clients": [ { "x": 200, "y": 30, "z": 60, "name": "Alpha" } ],
  "sipBusiness": { "categories": ["Mon","Tue"], "bar": [12,18], "line": [6,9] },
  "monthlyMIS": { "months": ["Jan","Feb"], "equity": [12,14], "debt": [8,7], "hybrid": [5,6] }
}
```

## Linting

ESLint config is the default provided by `eslint-config-next`. Run:
```bash
npm run lint
```

## Troubleshooting

- If charts don't render: check the browser console for any fetch errors to `/mock/...json` files.
- When exporting to PDF, extremely long pages may scale down; consider capturing only the main dashboard area.
- For Capacitor, ensure you run `npm run build` before `npx cap copy` so `out/` is up-to-date.
