# HyperVault Studio — Vendor Fleet Dashboard

A premium, dark-themed vendor-side dashboard UI for the HyperVault Studio custom apparel platform. Pure presentation layer — all data is hardcoded mock data (no API calls).

## What's included

```
src/
  lib/
    vendorData.ts                 Types, mock data (8 vendors, 6 orders, 10 activity entries) + helpers
  components/vendor/
    VendorFleet.tsx               Main dashboard (top bar, metrics, roster, capacity, activity)
    VendorRosterGrid.tsx          Filterable / sortable workshop grid
    VendorCard.tsx                Individual workshop card
    VendorMetricCard.tsx          Top telemetry stat card (with radial arc + trend variants)
    CapacityGauge.tsx             Horizontal capacity bar (lime / amber / red coding)
    AssignmentMatrix.tsx          Split-panel order → vendor matching + confirm modal
    VendorOnboardingModal.tsx     3-step "Add Workshop" wizard
    VendorAnalyticsDrawer.tsx     Right slide-in drawer with recharts bar chart
    ActivityFeed.tsx              Live activity log widget
  pages/
    VendorDashboard.tsx           Page wrapper: sidebar + bottom mobile nav + tab switching
```

## Design tokens (matches existing frontend)

| Token            | Value                                              |
| ---------------- | -------------------------------------------------- |
| Background       | `bg-[#08080A]`                                      |
| Glass panel      | `bg-white/5 border border-white/10 rounded-[2rem] p-6 backdrop-blur-md` |
| Accent 1 (lime)  | `#DFFF00` — CTAs, active states, price badges      |
| Accent 2 (cyan)  | `#06B6D4` — status, secondary highlights            |
| Text             | white / `white/60` / `white/30`                     |
| Radius           | `2rem` panels · `1rem` cards · `0.5rem` inputs      |
| Font             | Inter                                               |

## Dropping into an existing Vite + React + Tailwind project

1. **Copy files** — copy the `src/lib/vendorData.ts`, `src/components/vendor/*`, and `src/pages/VendorDashboard.tsx` into your project. The components use the `@/` path alias (`@ -> src`); if your project doesn't have it, replace `@/` imports with relative paths.

2. **Install dependencies**
   ```bash
   npm install lucide-react recharts
   ```

3. **Add the Inter font** (e.g. in your global CSS):
   ```css
   @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap");
   ```

4. **Add a route.** This project uses TanStack Router (file-based), so a route file is included:

   ```tsx
   // src/routes/vendor.tsx
   import { createFileRoute } from "@tanstack/react-router";
   import VendorDashboard from "@/pages/VendorDashboard";

   export const Route = createFileRoute("/vendor")({ component: VendorDashboard });
   ```

   **React Router** equivalent:
   ```tsx
   import VendorDashboard from "@/pages/VendorDashboard";
   <Route path="/vendor" element={<VendorDashboard />} />
   ```

   **Next.js (app router)** — drop `VendorDashboard` into `app/vendor/page.tsx` and add `"use client"` at the top.

## Responsive behaviour

- `< 768px` — single column, fixed bottom tab navigation
- `768–1024px` — 2-column grids, sidebar visible
- `> 1024px` — full 3-panel layout with capacity + activity side column

## Notes

- All numbers/labels are mock data in `src/lib/vendorData.ts` — swap these for API calls when ready.
- `compatibilityScore()` in `vendorData.ts` ranks vendors for the Assignment Matrix (skill fit 60% / free capacity 20% / rating 20%).
- `formatCurrency()` outputs INR in `₹X,XX,XXX` format via `Intl.NumberFormat("en-IN")`.
