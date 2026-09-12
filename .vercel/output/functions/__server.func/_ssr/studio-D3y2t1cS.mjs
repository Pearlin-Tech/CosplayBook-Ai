import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, M as MagneticButton } from "./Header-BhxuAuAz.mjs";
import { a as useCart } from "./router-Bd89BIBB.mjs";
import { u as useSavedDesigns } from "./saved-designs-X5M1K1V9.mjs";
import { o as ArrowLeft, p as Palette, l as PenLine, q as Image, R as RotateCw, r as Sparkles, T as Trash2, U as Upload, h as Check, j as ShoppingBag, s as Minus, i as Plus, k as Bookmark } from "../_libs/lucide-react.mjs";
import { L as LayoutGroup, m as motion, A as AnimatePresence } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const teeFront = "/assets/tee-front-K7omWMi6.jpg";
const teeBack = "/assets/tee-back-Cl83dvng.jpg";
const hoodieFront = "/assets/hoodie-front-Bk3ujs33.jpg";
const hoodieBack = "/assets/hoodie-back-wM6x_uut.jpg";
const oxfordFront = "/assets/oxford-front-CL8oyhla.jpg";
const oxfordBack = "/assets/oxford-back-Ca7R1C59.jpg";
const cargoFront = "/assets/cargo-front-C8RHYd48.jpg";
const cargoBack = "/assets/cargo-back-DoYip1Eu.jpg";
const COMMON_MATERIALS = [
  { id: "cotton-240", name: "Heavy Cotton", weight: "240 GSM", delta: 0, description: "Heritage-weight, opaque, all-season." },
  { id: "terry-320", name: "Atelier Terry Loop", weight: "320 GSM", delta: 25, description: "Brushed loop interior, sculptural drape." },
  { id: "linen-180", name: "Italian Linen", weight: "180 GSM", delta: 35, description: "Slubbed weave, breathable, ages with character." }
];
const COMMON_PRINTS = [
  { id: "dtg", label: "DTG Premium", blend: "multiply", description: "Direct-to-garment, ultra-fine gradient capability." },
  { id: "screen", label: "Screen Print", blend: "darken", description: "Plastisol ink, deep saturation, vintage hand." },
  { id: "dtf", label: "Direct-to-Film", blend: "overlay", description: "Crisp edge, full-color, raised micro-relief." },
  { id: "embroidery", label: "Embroidery", blend: "soft-light", description: "Stitched into the weave, dimensional finish." }
];
const GARMENTS = [
  {
    id: "tee",
    name: "Oversized Heavyweight Tee",
    tagline: "Drop-shoulder · Loomstate Cotton",
    basePrice: 95,
    aspect: 0.82,
    views: { front: teeFront, back: teeBack },
    materials: COMMON_MATERIALS,
    printMethods: COMMON_PRINTS,
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    placements: [
      { id: "center-chest", label: "Center Chest", view: "front", x: 50, y: 38, w: 28 },
      { id: "left-chest", label: "Left Chest", view: "front", x: 35, y: 32, w: 10 },
      { id: "all-over", label: "All Over", view: "front", x: 50, y: 50, w: 88 },
      { id: "sleeve", label: "Right Sleeve", view: "front", x: 82, y: 30, w: 9 },
      { id: "nape", label: "Nape", view: "back", x: 50, y: 18, w: 12 },
      { id: "back-center", label: "Back Center", view: "back", x: 50, y: 45, w: 40 }
    ],
    zoneCallouts: [
      { name: "Drop-shoulder seam", view: "front", x: 78, y: 22 },
      { name: "Heritage hem", view: "back", x: 30, y: 86 }
    ]
  },
  {
    id: "hoodie",
    name: "Premium French Terry Hoodie",
    tagline: "Kangaroo Pocket · Brushed Loop",
    basePrice: 185,
    aspect: 0.78,
    views: { front: hoodieFront, back: hoodieBack },
    materials: COMMON_MATERIALS,
    printMethods: COMMON_PRINTS,
    sizes: ["S", "M", "L", "XL", "XXL"],
    placements: [
      { id: "center-chest", label: "Center Chest", view: "front", x: 50, y: 32, w: 26 },
      { id: "left-chest", label: "Left Chest", view: "front", x: 34, y: 28, w: 10 },
      { id: "hood", label: "Hood Embroidery", view: "front", x: 50, y: 12, w: 14 },
      { id: "sleeve", label: "Right Sleeve", view: "front", x: 85, y: 38, w: 8 },
      { id: "back-center", label: "Back Panel", view: "back", x: 50, y: 42, w: 42 },
      { id: "nape", label: "Nape", view: "back", x: 50, y: 18, w: 12 }
    ],
    zoneCallouts: [
      { name: "Kangaroo pocket barrier", view: "front", x: 50, y: 62 },
      { name: "Drawstring hood", view: "front", x: 50, y: 8 }
    ]
  },
  {
    id: "oxford",
    name: "Bespoke Oxford Button-Shirt",
    tagline: "Structured Collar · Box Pleat",
    basePrice: 215,
    aspect: 0.84,
    views: { front: oxfordFront, back: oxfordBack },
    materials: COMMON_MATERIALS,
    printMethods: COMMON_PRINTS.filter((p) => p.id !== "screen"),
    sizes: ["S", "M", "L", "XL"],
    placements: [
      { id: "left-chest", label: "Chest Pocket Monogram", view: "front", x: 34, y: 30, w: 9 },
      { id: "placket", label: "Button Placket", view: "front", x: 50, y: 50, w: 6 },
      { id: "back-yoke", label: "Back Yoke", view: "back", x: 50, y: 22, w: 36 },
      { id: "cuff", label: "Cuff", view: "front", x: 88, y: 70, w: 7 },
      { id: "nape", label: "Collar Stand", view: "back", x: 50, y: 12, w: 14 }
    ],
    zoneCallouts: [
      { name: "Structured collar", view: "front", x: 50, y: 12 },
      { name: "Box pleat", view: "back", x: 50, y: 35 }
    ]
  },
  {
    id: "cargo",
    name: "Technical Relaxed Cargo Pants",
    tagline: "Multi-Pocket · Tapered Leg",
    basePrice: 245,
    aspect: 0.62,
    views: { front: cargoFront, back: cargoBack },
    materials: [
      ...COMMON_MATERIALS,
      { id: "ripstop-280", name: "Ripstop Technical", weight: "280 GSM", delta: 45, description: "Tear-resistant grid weave, water-shedding." }
    ],
    printMethods: COMMON_PRINTS,
    sizes: ["28", "30", "32", "34", "36", "38"],
    placements: [
      { id: "thigh-left", label: "Left Thigh Pocket", view: "front", x: 28, y: 42, w: 14 },
      { id: "thigh-right", label: "Right Thigh Pocket", view: "front", x: 72, y: 42, w: 14 },
      { id: "hem-left", label: "Left Hem", view: "front", x: 28, y: 88, w: 10 },
      { id: "back-pocket", label: "Back Pocket", view: "back", x: 32, y: 32, w: 12 },
      { id: "waist-back", label: "Waist Back", view: "back", x: 50, y: 12, w: 16 }
    ],
    zoneCallouts: [
      { name: "Cargo pocket matrix", view: "front", x: 72, y: 42 },
      { name: "Tapered hem", view: "front", x: 28, y: 92 }
    ]
  }
];
const COLORWAYS = [
  { name: "Obsidian", hex: "#111111" },
  { name: "Alabaster", hex: "#FAF9F6" },
  { name: "Linen", hex: "#E8E2D5" },
  { name: "Champagne", hex: "#D4A373" },
  { name: "Moss", hex: "#5b6b4a" },
  { name: "Cobalt", hex: "#1d3a8a" },
  { name: "Rust", hex: "#a64b2a" },
  { name: "Cyber", hex: "#D4FF00" },
  { name: "Crimson", hex: "#7a1f2b" },
  { name: "Sand", hex: "#c9b48a" }
];
const Garment3D = reactExports.lazy(() => import("./Garment3D-DRfHSTt0.mjs"));
const fonts = [{
  id: "fraunces",
  label: "Fraunces",
  css: "'Fraunces', serif",
  italic: true
}, {
  id: "instrument-sans",
  label: "Instrument Sans",
  css: "'Instrument Sans', sans-serif",
  italic: false
}, {
  id: "instrument-serif",
  label: "Instrument Serif",
  css: "'Instrument Serif', serif",
  italic: true
}, {
  id: "mono",
  label: "JetBrains Mono",
  css: "'JetBrains Mono', monospace",
  italic: false
}];
function Studio() {
  const {
    add
  } = useCart();
  const {
    save
  } = useSavedDesigns();
  const [garment, setGarment] = reactExports.useState(GARMENTS[0]);
  const [color, setColor] = reactExports.useState(COLORWAYS[0]);
  const [material, setMaterial] = reactExports.useState(garment.materials[0]);
  const [printMethod, setPrintMethod] = reactExports.useState(garment.printMethods[0]);
  const [size, setSize] = reactExports.useState(garment.sizes[Math.floor(garment.sizes.length / 2)]);
  const [placementId, setPlacementId] = reactExports.useState(garment.placements[0].id);
  const [qty, setQty] = reactExports.useState(1);
  const [customText, setCustomText] = reactExports.useState("");
  const [font, setFont] = reactExports.useState(fonts[0]);
  const [textColor, setTextColor] = reactExports.useState("#111111");
  const [design, setDesign] = reactExports.useState(null);
  const [added, setAdded] = reactExports.useState(null);
  const [activeTool, setActiveTool] = reactExports.useState(null);
  const [autoRotate, setAutoRotate] = reactExports.useState(false);
  const [hd, setHd] = reactExports.useState(true);
  const [bg, setBg] = reactExports.useState("studio");
  const price = reactExports.useMemo(() => garment.basePrice + material.delta, [garment, material]);
  const placement = garment.placements.find((p) => p.id === placementId) ?? garment.placements[0];
  const frontPlacement = reactExports.useMemo(() => {
    if (!design) return null;
    const p = garment.placements.find((x) => x.id === placementId && x.view === "front");
    return p ? {
      x: p.x,
      y: p.y,
      w: p.w
    } : null;
  }, [design, garment, placementId]);
  const backPlacement = reactExports.useMemo(() => {
    if (!design) return null;
    const p = garment.placements.find((x) => x.id === placementId && x.view === "back");
    return p ? {
      x: p.x,
      y: p.y,
      w: p.w
    } : null;
  }, [design, garment, placementId]);
  const switchGarment = (g) => {
    setGarment(g);
    setMaterial((m) => g.materials.find((x) => x.id === m.id) ?? g.materials[0]);
    setPrintMethod((p) => g.printMethods.find((x) => x.id === p.id) ?? g.printMethods[0]);
    setSize((s) => g.sizes.includes(s) ? s : g.sizes[Math.floor(g.sizes.length / 2)]);
    setPlacementId(g.placements[0].id);
  };
  const onFile = (f) => {
    if (!f) return;
    setDesign(URL.createObjectURL(f));
  };
  const handleAdd = () => {
    add({
      id: `${garment.id}-${color.name}-${size}-${Date.now()}`,
      name: garment.name,
      config: `${color.name} · ${material.name} · ${size} · ${placement.label}${customText ? ` · "${customText}"` : ""}`,
      price,
      qty,
      image: garment.views.front
    });
    setAdded("added");
    setTimeout(() => setAdded(null), 2200);
  };
  const handleSave = () => {
    save({
      garmentId: garment.id,
      garmentName: garment.name,
      colorName: color.name,
      colorHex: color.hex,
      materialName: material.name,
      size,
      placement: placement.label,
      text: customText,
      printMethod: printMethod.label,
      price,
      thumb: garment.views.front
    });
    setAdded("saved");
    setTimeout(() => setAdded(null), 2200);
  };
  const tools = [{
    id: "color",
    label: "Color",
    icon: Palette
  }, {
    id: "edit",
    label: "Edit",
    icon: PenLine
  }, {
    id: "bg",
    label: "Backdrop",
    icon: Image
  }, {
    id: "rotate",
    label: "Rotate",
    icon: RotateCw
  }, {
    id: "hd",
    label: "HD",
    icon: Sparkles
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge py-6 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { size: 14 }),
        " Back to Gallery"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label hidden md:inline", children: "Atelier Studio · 3D · Live" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "container-edge", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 overflow-x-auto border-b border-border pb-px", children: GARMENTS.map((g) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => switchGarment(g), className: `relative px-5 py-4 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${garment.id === g.id ? "text-foreground" : "text-foreground/50 hover:text-foreground"}`, children: [
      g.name.split(" ").slice(-2).join(" "),
      garment.id === g.id && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.span, { layoutId: "garment-tab-underline", className: "absolute left-3 right-3 -bottom-px h-[2px] bg-[color:var(--pop)]", transition: {
        type: "spring",
        stiffness: 350,
        damping: 30
      } })
    ] }, g.id)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge grid lg:grid-cols-[1.2fr_1fr] gap-10 pt-8 pb-32", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:sticky lg:top-24 lg:self-start", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full mx-auto", style: {
        maxWidth: 720
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { layout: true, className: "relative bg-surface overflow-hidden", style: {
          aspectRatio: 1
        }, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 grid place-items-center text-xs font-mono uppercase tracking-[0.2em] text-foreground/50", children: "Loading atelier…" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Garment3D, { frontUrl: garment.views.front, backUrl: garment.views.back, designUrl: design, designPlacement: frontPlacement, designOnBack: backPlacement, colorHex: color.hex, autoRotate, hd, background: bg, aspect: garment.aspect }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CornerBrackets, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-5 left-5 z-30 micro-label bg-background/85 backdrop-blur px-3 py-1.5 rounded-sm pointer-events-none", children: "Edition · 01 / Vault" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-5 right-5 z-30 px-3 py-1.5 rounded-sm bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 pointer-events-none", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-[color:var(--pop)] animate-pulse-beacon" }),
            hd ? "HD" : "Draft"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-5 z-30 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/55 pointer-events-none", children: "Drag to orbit · Scroll to zoom" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 bg-background border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-5", children: tools.map((t) => {
            const Icon = t.icon;
            const active = t.id === "rotate" && autoRotate || t.id === "hd" && hd || activeTool === t.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => {
              if (t.id === "rotate") {
                setAutoRotate(!autoRotate);
                return;
              }
              if (t.id === "hd") {
                setHd(!hd);
                return;
              }
              setActiveTool(activeTool === t.id ? null : t.id);
            }, className: `relative flex flex-col items-center gap-1.5 py-4 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors border-r border-border last:border-r-0 ${active ? "bg-[color:var(--pop)] text-foreground" : "hover:bg-surface text-foreground/70"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 16, strokeWidth: 1.4 }),
              t.label
            ] }, t.id);
          }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { initial: false, children: [
            activeTool === "color" && /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolPanel, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mb-3", children: "Fabric · Colorway" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-10 gap-2", children: COLORWAYS.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setColor(c), className: `aspect-square rounded-full border-2 transition-all ${color.name === c.name ? "border-foreground scale-110" : "border-border hover:scale-105"}`, style: {
                backgroundColor: c.hex
              }, title: c.name }, c.name)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/55", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  color.name,
                  " · ",
                  color.hex
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "color-masked into weave" })
              ] })
            ] }, "color"),
            activeTool === "edit" && /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolPanel, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mb-3", children: "Placement Zones" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: garment.placements.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPlacementId(p.id), className: `p-3 text-[10px] uppercase tracking-[0.15em] border text-left transition-colors ${placementId === p.id ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono opacity-60", children: [
                  "[",
                  p.view,
                  "]"
                ] }),
                p.label
              ] }, p.id)) }),
              design && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between bg-surface px-3 py-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs italic-serif text-foreground/70 truncate", children: [
                  "Artwork layer active · blend: ",
                  printMethod.blend
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDesign(null), className: "text-[color:var(--destructive)] hover:opacity-70", title: "Delete graphic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 14 }) })
              ] })
            ] }, "edit"),
            activeTool === "bg" && /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolPanel, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mb-3", children: "Studio Backdrop" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [{
                id: "studio",
                label: "Linen Studio",
                hex: "#F4F3F0"
              }, {
                id: "warm",
                label: "Warm Apartment",
                hex: "#EAE2D3"
              }, {
                id: "noir",
                label: "Noir Vault",
                hex: "#141414"
              }].map((b) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setBg(b.id), className: `p-3 text-left border transition-colors ${bg === b.id ? "border-foreground" : "border-border hover:border-foreground/50"}`, children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block w-full h-10 mb-2", style: {
                  backgroundColor: b.hex
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono uppercase tracking-[0.15em]", children: b.label })
              ] }, b.id)) })
            ] }, "bg")
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 grid grid-cols-2 gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "cursor-pointer", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/png", hidden: true, onChange: (e) => onFile(e.target.files?.[0] ?? null) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "btn-outline w-full justify-center text-[10px]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { size: 12 }),
              " Upload 360 Image"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, className: "btn-ink w-full justify-center text-[10px]", children: added === "added" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }),
            " Vaulted"
          ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 12 }),
            " Add Custom Creation to Bag"
          ] }) }) })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Now Configuring" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(motion.h1, { initial: {
            opacity: 0,
            y: 12
          }, animate: {
            opacity: 1,
            y: 0
          }, transition: {
            duration: 0.5
          }, className: "mt-3 font-serif text-4xl md:text-5xl", children: garment.name }, garment.id),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/55 text-sm italic-serif", children: garment.tagline }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-foreground/55 text-xs", children: "Single edition · Numbered & signed · Made to order" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { title: "Material", value: `${material.name} · ${material.weight}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-3", children: garment.materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setMaterial(m), className: `p-4 text-left border transition-all ${material.id === m.id ? "border-foreground bg-surface" : "border-border hover:border-foreground/50"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg", children: m.name }),
            m.delta > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-xs text-[color:var(--gold)]", children: [
              "+$",
              m.delta
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/60", children: m.weight }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 text-xs text-foreground/55 leading-relaxed", children: m.description })
        ] }, m.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { title: "Graphic", value: design ? "Uploaded" : "None", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "block border border-dashed border-[color:var(--gold)] p-8 text-center cursor-pointer hover:bg-surface transition-colors", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "file", accept: "image/*", hidden: true, onChange: (e) => onFile(e.target.files?.[0] ?? null) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Upload, { className: "mx-auto mb-3 text-[color:var(--gold)]", size: 26, strokeWidth: 1.2 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg", children: design ? "Replace artwork" : "Drop your design" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-foreground/55", children: "PNG · SVG · JPG · up to 20MB" })
          ] }),
          design && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center justify-between text-xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-foreground/60", children: [
              "Blend mode auto: ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic-serif", children: printMethod.blend })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setDesign(null), className: "underline underline-offset-4 hover:text-foreground/80", children: "Remove" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { title: "Typography", value: customText || "—", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: customText, onChange: (e) => setCustomText(e.target.value), placeholder: "Enter custom text (max 24 chars)", maxLength: 24, className: "field" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2", children: fonts.map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setFont(f), className: `p-3 text-left border transition-colors text-sm ${font.id === f.id ? "border-foreground bg-surface" : "border-border"}`, style: {
            fontFamily: f.css,
            fontStyle: f.italic ? "italic" : "normal"
          }, children: f.label }, f.id)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Ink" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "color", value: textColor, onChange: (e) => setTextColor(e.target.value), className: "w-10 h-10 rounded border border-border bg-transparent cursor-pointer" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-foreground/55", children: textColor })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { title: "Print Method", value: printMethod.label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-2", children: garment.printMethods.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setPrintMethod(m), className: `p-3 text-left border transition-colors ${printMethod.id === m.id ? "border-foreground bg-surface" : "border-border hover:border-foreground"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs uppercase tracking-[0.15em]", children: m.label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-xs text-foreground/55", children: m.description })
        ] }, m.id)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Accordion, { title: "Size", value: size, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-6 gap-2", children: garment.sizes.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSize(s), className: `py-3 text-sm font-mono border ${size === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"}`, children: s }, s)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/sizing", className: "mt-3 inline-block text-xs underline underline-offset-4 text-foreground/60 hover:text-foreground", children: "Need help? View sizing guide →" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sticky bottom-0 z-30 bg-background/95 backdrop-blur border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge py-4 flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: "Premium Total" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-serif text-2xl md:text-3xl", children: [
            "$",
            (price * qty).toLocaleString()
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(Math.max(1, qty - 1)), className: "p-3 hover:bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 14 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-4 font-mono", children: qty }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(qty + 1), className: "p-3 hover:bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleSave, className: "btn-outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { size: 14 }),
          " Save to Vault"
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleAdd, className: "btn-ink", children: added === "added" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
          " Vaulted"
        ] }) : added === "saved" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 14 }),
          " Saved"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
          " Add to Bag"
        ] }) }) })
      ] })
    ] }) })
  ] });
}
function CornerBrackets() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 left-2 w-5 h-5 border-t border-l border-[color:var(--gold)] z-20 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute top-2 right-2 w-5 h-5 border-t border-r border-[color:var(--gold)] z-20 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[color:var(--gold)] z-20 pointer-events-none" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[color:var(--gold)] z-20 pointer-events-none" })
  ] });
}
function ToolPanel({
  children
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
    height: 0,
    opacity: 0
  }, animate: {
    height: "auto",
    opacity: 1
  }, exit: {
    height: 0,
    opacity: 0
  }, transition: {
    duration: 0.35,
    ease: [0.2, 0.7, 0.2, 1]
  }, className: "overflow-hidden border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children }) });
}
function Accordion({
  title,
  value,
  children
}) {
  const [open, setOpen] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border pt-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setOpen(!open), className: "w-full flex items-center justify-between text-left", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm italic-serif text-foreground/70 truncate", children: value })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/40 font-mono text-xl", children: open ? "−" : "+" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      height: 0,
      opacity: 0
    }, animate: {
      height: "auto",
      opacity: 1
    }, exit: {
      height: 0,
      opacity: 0
    }, transition: {
      duration: 0.35,
      ease: [0.2, 0.7, 0.2, 1]
    }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children }) }) })
  ] });
}
export {
  Studio as component
};
