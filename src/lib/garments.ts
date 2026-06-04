import teeFront from "@/assets/garments/tee-front.jpg";
import teeBack from "@/assets/garments/tee-back.jpg";
import hoodieFront from "@/assets/garments/hoodie-front.jpg";
import hoodieBack from "@/assets/garments/hoodie-back.jpg";
import oxfordFront from "@/assets/garments/oxford-front.jpg";
import oxfordBack from "@/assets/garments/oxford-back.jpg";
import cargoFront from "@/assets/garments/cargo-front.jpg";
import cargoBack from "@/assets/garments/cargo-back.jpg";

export type View = "front" | "back";

export type Placement = {
  id: string;
  label: string;
  view: View;
  /** Percentage coordinates relative to canvas */
  x: number;
  y: number;
  w: number;
  rotate?: number;
};

export type Material = {
  id: string;
  name: string;
  weight: string;
  delta: number;
  description: string;
};

export type PrintMethod = {
  id: string;
  label: string;
  blend: "multiply" | "overlay" | "soft-light" | "darken";
  description: string;
};

export type Garment = {
  id: string;
  name: string;
  tagline: string;
  basePrice: number;
  /** width/height ratio of the canvas */
  aspect: number;
  views: Record<View, string>;
  placements: Placement[];
  materials: Material[];
  printMethods: PrintMethod[];
  sizes: string[];
  zoneCallouts: { name: string; view: View; x: number; y: number }[];
};

const COMMON_MATERIALS: Material[] = [
  { id: "cotton-240", name: "Heavy Cotton", weight: "240 GSM", delta: 0, description: "Heritage-weight, opaque, all-season." },
  { id: "terry-320", name: "Atelier Terry Loop", weight: "320 GSM", delta: 25, description: "Brushed loop interior, sculptural drape." },
  { id: "linen-180", name: "Italian Linen", weight: "180 GSM", delta: 35, description: "Slubbed weave, breathable, ages with character." },
];

const COMMON_PRINTS: PrintMethod[] = [
  { id: "dtg", label: "DTG Premium", blend: "multiply", description: "Direct-to-garment, ultra-fine gradient capability." },
  { id: "screen", label: "Screen Print", blend: "darken", description: "Plastisol ink, deep saturation, vintage hand." },
  { id: "dtf", label: "Direct-to-Film", blend: "overlay", description: "Crisp edge, full-color, raised micro-relief." },
  { id: "embroidery", label: "Embroidery", blend: "soft-light", description: "Stitched into the weave, dimensional finish." },
];

export const GARMENTS: Garment[] = [
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
      { id: "back-center", label: "Back Center", view: "back", x: 50, y: 45, w: 40 },
    ],
    zoneCallouts: [
      { name: "Drop-shoulder seam", view: "front", x: 78, y: 22 },
      { name: "Heritage hem", view: "back", x: 30, y: 86 },
    ],
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
      { id: "nape", label: "Nape", view: "back", x: 50, y: 18, w: 12 },
    ],
    zoneCallouts: [
      { name: "Kangaroo pocket barrier", view: "front", x: 50, y: 62 },
      { name: "Drawstring hood", view: "front", x: 50, y: 8 },
    ],
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
      { id: "nape", label: "Collar Stand", view: "back", x: 50, y: 12, w: 14 },
    ],
    zoneCallouts: [
      { name: "Structured collar", view: "front", x: 50, y: 12 },
      { name: "Box pleat", view: "back", x: 50, y: 35 },
    ],
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
      { id: "ripstop-280", name: "Ripstop Technical", weight: "280 GSM", delta: 45, description: "Tear-resistant grid weave, water-shedding." },
    ],
    printMethods: COMMON_PRINTS,
    sizes: ["28", "30", "32", "34", "36", "38"],
    placements: [
      { id: "thigh-left", label: "Left Thigh Pocket", view: "front", x: 28, y: 42, w: 14 },
      { id: "thigh-right", label: "Right Thigh Pocket", view: "front", x: 72, y: 42, w: 14 },
      { id: "hem-left", label: "Left Hem", view: "front", x: 28, y: 88, w: 10 },
      { id: "back-pocket", label: "Back Pocket", view: "back", x: 32, y: 32, w: 12 },
      { id: "waist-back", label: "Waist Back", view: "back", x: 50, y: 12, w: 16 },
    ],
    zoneCallouts: [
      { name: "Cargo pocket matrix", view: "front", x: 72, y: 42 },
      { name: "Tapered hem", view: "front", x: 28, y: 92 },
    ],
  },
];

export const COLORWAYS = [
  { name: "Obsidian", hex: "#111111" },
  { name: "Alabaster", hex: "#FAF9F6" },
  { name: "Linen", hex: "#E8E2D5" },
  { name: "Champagne", hex: "#D4A373" },
  { name: "Moss", hex: "#5b6b4a" },
  { name: "Cobalt", hex: "#1d3a8a" },
  { name: "Rust", hex: "#a64b2a" },
  { name: "Cyber", hex: "#D4FF00" },
  { name: "Crimson", hex: "#7a1f2b" },
  { name: "Sand", hex: "#c9b48a" },
];
