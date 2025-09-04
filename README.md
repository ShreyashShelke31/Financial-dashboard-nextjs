# Financial Dashboard – Next.js 14 + Tailwind + Recharts + Capacitor

This project implements the following assignment requirements:

- Recreate a **financial dashboard UI** in **Next.js 14 (App Router)** with **Tailwind CSS**.  
- Add a **PDF download** button that exports the dashboard section with the same design.  
- Wrap the same project into **Android/iOS apps using Capacitor**.  
- Fetch data from **mock JSON endpoints** located under `/public/mock` to support **static export** and Capacitor integration.  

---

## 🚀 Quick Start

```bash
# 1) Install dependencies
npm install

# 2) Run in development
npm run dev

# 3) Build a static export (output: ./out)
npm run build
```

Open [http://localhost:3000](http://localhost:3000) in your browser.  

> **Note:** We use static JSON files instead of Next.js API routes so that `next export` works cleanly and the app bundles smoothly with Capacitor.

---

## 📂 Project Structure

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
│     ├─ ClientsBubbleChart.tsx    # Scatter/Bubble
│     ├─ SipBusinessChart.tsx      # Bar + Line
│     └─ MonthlyMISChart.tsx       # Multi-line
├─ lib/
│  ├─ theme.tsx                    # Dark mode provider
│  └─ types.ts
├─ public/
│  └─ mock/                        # Mock "API" JSONs by time range
├─ styles/
│  └─ globals.css
├─ capacitor.config.ts             # Capacitor setup
├─ next.config.mjs                 # Static export, unoptimized images
├─ tailwind.config.ts
├─ postcss.config.mjs
├─ tsconfig.json
└─ package.json
```

---

## ✨ Features

- **Navigation Bar** with menu items and a dark mode toggle.  
- **Summary Cards**: AUM and SIP with MoM % and "View Report".  
- **Time Range Filter**: 3D, 7D, 10D, 30D — swaps mock JSON files dynamically.  
- **Stat Cards**: Purchases, Redemptions, Rejected Transactions, SIP Rejections, New SIP.  
- **Charts** using **Recharts**:  
  - Clients **bubble (scatter)** chart  
  - SIP Business **bar + line** (ComposedChart)  
  - Monthly MIS **multi-line** (LineChart)  
- **Responsive design** with **dark mode** (`dark` class strategy in Tailwind).  
- **PDF Export** using `html2canvas` + `jspdf`:  
  - Captures the `#dashboard-pdf` container.  
  - High quality (`scale: 2`) rendering.  
  - On **Capacitor native**, saves using the **Filesystem plugin** to the **Documents** directory.  

---

## 📄 PDF Export Notes

- The `Download PDF` button captures only the `#dashboard-pdf` container.  
- For large dashboards, scaling may reduce readability — consider limiting the capture area.  
- On web: downloads directly.  
- On native (Capacitor): saves to the **Documents** directory.  

---

## 📱 Capacitor – Android/iOS Setup

Capacitor wraps the exported web app.

### 1. Initialize Capacitor (already included)

If Android/iOS folders are not created yet:

```bash
npm run cap:android
npm run cap:ios
```

### 2. Build and copy assets

```bash
npm run build         # produces ./out
npm run cap:copy      # copies ./out into platforms
npm run cap:sync      # ensures plugins/platforms are synced
```

### 3. Serve mode (optional)

If you prefer to load from a hosted URL instead of bundled assets, edit `capacitor.config.ts`:

```ts
server: {
  url: "https://your-https-url.com",
  cleartext: true
}
```

### 4. Open IDEs

```bash
npm run cap:open:android
npm run cap:open:ios
```

Build and run from **Android Studio** or **Xcode**.  

---

## 📊 Customizing Data

Modify the mock JSON files under `public/mock/`:

- `dashboard-3d.json`  
- `dashboard-7d.json`  
- `dashboard-10d.json`  
- `dashboard-30d.json`  

Each file follows this structure:

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

---

## 🛠 Linting

Run ESLint:

```bash
npm run lint
```

(Uses the default `eslint-config-next`.)

---

## ❗ Troubleshooting

- **Charts not rendering?** Check console for missing `/mock/...json` fetches.  
- **PDF export issues?** Very long pages may scale poorly — capture only the dashboard area.  
- **Capacitor issues?** Always run `npm run build` before `npx cap copy`.  

## Screen Shots
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/83d5a654-ea30-433e-a7b4-6628e43a4f72" />
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/ae6e3e11-7f74-487e-a70d-ac9b843c433b" />
