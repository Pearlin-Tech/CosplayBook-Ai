# Hypervault Re-Engineering Plan

A full motion + interaction overhaul. Frontend only — no backend/auth changes (session is mocked client-side).

---

## 1. Motion Foundation

- Install `framer-motion`.
- Build reusable primitives in `src/components/motion/`:
  - `MagneticButton.tsx` — tracks cursor within 30px radius, leans toward it via spring; wraps any child (CTA, "Add to Bag", "Enter Studio", "+ Create New Design").
  - `ParallaxTilt.tsx` — pointer-driven 3D tilt (max 4°) with depth shadow, used on the studio canvas and hero product.
  - `ScanLine.tsx` — horizontal glow sweep triggered on key change (material/color/garment).
  - `MorphContainer.tsx` — `motion.div` with `layout` + spring transition for skeletal container morphing between garments.
  - `FadeUp`, `Stagger` helpers for section reveals.

## 2. Studio Re-Architecture (`src/routes/studio.tsx`)

Refactor into a state machine driven by a `useGarmentConfig` hook.

**Garment data model** (`src/lib/garments.ts`):
```
type Garment = {
  id, name, basePrice, aspect (w/h),
  views: { front: img, back: img, sleeve?: img, detail?: img },
  placements: Placement[],           // each with coord matrices per view
  materials: Material[],             // with gsm + price delta
  printMethods: PrintMethod[],
  zones: { name, polygon }[]         // e.g. kangaroo pocket barrier
}
```

Four garment classes, each with generated front + back assets:
1. Oversized Heavyweight Tee (drop-shoulder regions)
2. Premium French Terry Hoodie (kangaroo pocket + hood zone)
3. Bespoke Oxford Button-Shirt (collar + button line masks)
4. Technical Relaxed Cargo Pants (side pocket matrices + leg zones)

Generate 8 product images (front/back × 4) via `imagegen` on neutral studio backdrops, shot orthographically so masking works.

**Color-masking engine**: replace `mix-blend-color` overlay with a layered approach:
- Base garment photo rendered grayscale (CSS `filter: grayscale(1) contrast(1.05)`).
- Color layer applied with `mix-blend-mode: multiply` + `hue-rotate`/HSL fill, preserving wrinkles/shadows.
- A subtle `mix-blend-mode: screen` highlight layer to retain fabric weave specular.

**True reverse perspective**: replace `scaleX(-1)` hack. Each garment has a real `back` image. View toggle triggers a 180° Y-axis 3D flip on the canvas (`rotateY`) using framer-motion's `AnimatePresence` with mode="wait"; the back face shows the actual back asset.

**Placement coordinate matrices**: each placement defines `{ x, y, w }` per view. When flipping, front graphics hide and back-only placements render. Custom graphic + custom text both follow the same coordinate system, with `mix-blend-mode: multiply` (DTG/Screen) or `overlay` (Embroidery) plus a faint noise/grain texture so they read as printed-into-fabric.

**Scan line**: a transient `<ScanLine />` mounts on every change to `color | material | garment.id` via `useEffect`, sweeps once, unmounts.

**Skeletal morph**: the canvas container uses `motion.div layout` so swapping a tall pant for a square tee morphs the bounding box with a spring.

**Garment switcher**: animated tab bar at the top of the controls; underline indicator uses `layoutId` for smooth slide.

## 3. Header / Profile Drop-Card

- Profile icon opens a `motion` drop-card with: avatar, name/email, quick links (Vault, Designs, Orders), and a high-visibility **LOGOUT** button.
- Mock auth state via `src/lib/session.tsx` (Context + localStorage). Logout triggers fade-out, clears session, routes to `/`.
- Cart icon stays; add magnetic effect.

## 4. Vault Dashboard Overhaul (`src/routes/vault.tsx`)

Sidebar + content layout (collapses to top tabs on mobile).

- **Personal Information** card: Full Name, Phone, DOB, Gender (select), Email with verified badge. Editable inline.
- **Address Book**: list with add/edit/remove, default flag.
- **Saved Designs / Wishlist**: grid of saved studio configs (stored in localStorage), each re-loadable into the studio.
- **Orders → Animated Radar Tracking**: horizontal 4-step track ("Confirmed → Crafting → Shipped → Delivered"). Bars fill via framer-motion on scroll-into-view; active step has a pulsing beacon (radial pulse animation).
- **Preferences**: notifications, size defaults, currency.
- **Danger Zone**: bracketed card at the bottom with muted crimson 1px border. Buttons: "Sign Out of All Devices", "Delete Vault Account" (confirm dialog using existing `alert-dialog`).
- Visible **Logout** action in the dashboard header too.

## 5. Typography & Design System (`src/styles.css`)

- Load Google Fonts: Fraunces (display, with italic), Instrument Sans (UI), JetBrains Mono (micro-labels).
- Replace Inter usage with Instrument Sans across UI tokens.
- Use Fraunces italic for accent parameter labels (e.g. "*colorway*").
- Keep palette: `#FAF9F6` canvas, `#F4F3F0` surface, `#111` ink, `#D4A373` gold, `#D4FF00` pop. Tighten to 1px hairline borders, more whitespace.

## 6. Responsiveness

- Studio: stacked single column under `lg`; sticky bottom CTA bar already exists, ensure safe-area + wraps.
- Header: hamburger sheet on mobile with all nav + profile + logout.
- Vault: sidebar collapses to horizontal scroll tab strip on mobile.
- Homepage hero: clamp font sizes, reflow grid.
- Test breakpoints at 360 / 768 / 1024 / 1440.

## 7. Other Page Polish

- Add magnetic CTAs and fade-up stagger to: index, collections, journal, reviews, contact, checkout.
- Checkout: keep flipping card; add magnetic "Place Order" + scan-line confirmation on submit.

---

## Files

**New**
- `src/components/motion/MagneticButton.tsx`
- `src/components/motion/ParallaxTilt.tsx`
- `src/components/motion/ScanLine.tsx`
- `src/components/motion/MorphContainer.tsx`
- `src/components/motion/Reveal.tsx`
- `src/components/ProfileDropCard.tsx`
- `src/lib/garments.ts`
- `src/lib/session.tsx`
- `src/lib/saved-designs.ts`
- `src/assets/garments/tee-{front,back}.jpg`
- `src/assets/garments/hoodie-{front,back}.jpg`
- `src/assets/garments/oxford-{front,back}.jpg`
- `src/assets/garments/cargo-{front,back}.jpg`

**Edited**
- `src/styles.css` (fonts, tokens, hairlines)
- `src/routes/__root.tsx` (session provider, Google Fonts link)
- `src/routes/studio.tsx` (full rewrite)
- `src/routes/vault.tsx` (full rewrite)
- `src/components/Header.tsx` (profile drop-card, mobile sheet, magnetic)
- `src/routes/index.tsx`, `checkout.tsx`, others (apply magnetic + reveal)

## Out of Scope

- Real backend / real auth (session is mocked client-side; can wire Lovable Cloud later on request).
- WebGL/Three.js — the 3D feeling is achieved via CSS 3D transforms + framer-motion only.