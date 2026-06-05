// ===== FILE: src/mocks/vendorPortalData.ts =====
// CosplayBook-AI — Vendor Portal mock data & types (no API calls).

export type OrderStatus =
  | "pending_acceptance"
  | "in_progress"
  | "ready"
  | "completed";

export type Complexity = "S" | "M" | "L" | "XL";

export type PayoutStatus = "paid" | "pending" | "processing";

export interface ProgressNote {
  text: string;
  timestamp: string;
}

export interface VendorOrder {
  id: string;
  costume_name: string;
  complexity: Complexity;
  status: OrderStatus;
  skills: string[];
  deadline: string; // ISO date
  days_left: number;
  blueprint_notes: string;
  required_materials: string[];
  customer_note: string;
  progress_notes: ProgressNote[];
  payout_amount: number;
  completed_date?: string;
  dispatch_tracking?: string;
}

export interface PayoutRecord {
  id: string;
  date: string;
  order_id: string;
  costume_name: string;
  amount: number;
  status: PayoutStatus;
}

export interface MonthlyEarning {
  month: string;
  amount: number;
}

export interface VendorProfile {
  id: string;
  workshop_name: string;
  owner_name: string;
  initials: string;
  email: string;
  phone: string;
  bio: string;
  specialty_tags: string[];
  max_capacity: number;
  active_assignments: number;
  rating_score: number;
  is_verified: boolean;
  total_earned: number;
  month_earned: number;
  pending_payout: number;
}

// ---------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------

export function formatINR(value: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

export const ALL_SPECIALTIES: string[] = [
  "Heavy Armor",
  "EVA Foam",
  "Sewing",
  "Embroidery",
  "Leather Work",
  "Electronics",
  "LED Integration",
  "Mechanical Props",
  "3D Printing",
  "Synthetic Texturing",
];

// ---------------------------------------------------------------------
// Mock data
// ---------------------------------------------------------------------

export const vendorProfile: VendorProfile = {
  id: "vendor-01",
  workshop_name: "Aryan Craft Studio",
  owner_name: "Aryan Sharma",
  initials: "AC",
  email: "aryan@aryancraft.studio",
  phone: "+91 98765 43210",
  bio: "Boutique fabrication workshop specialising in screen-accurate heavy armor and foam builds. 6+ years crafting tournament-grade cosplay.",
  specialty_tags: ["Heavy Armor", "EVA Foam", "Leather Work"],
  max_capacity: 3,
  active_assignments: 2,
  rating_score: 4.9,
  is_verified: true,
  total_earned: 312400,
  month_earned: 28500,
  pending_payout: 12000,
};

export const vendorOrders: VendorOrder[] = [
  {
    id: "#HV-2847",
    costume_name: "Cyber Samurai Exo-Suit",
    complexity: "XL",
    status: "pending_acceptance",
    skills: ["Heavy Armor", "EVA Foam", "LED Integration"],
    deadline: "2026-06-14",
    days_left: 13,
    blueprint_notes:
      "Full articulated exo-suit with motorised shoulder plates. Reference sheet attached. Client requests matte gunmetal finish with reactive LED veins along the spine and forearms. Internal cooling channels must be left accessible for maintenance. Helmet visor should be removable with magnetic mounts.",
    required_materials: [
      "10mm EVA foam (high density)",
      "Gunmetal plasti-dip x4",
      "Addressable RGB LED strips (5m)",
      "Neodymium magnets (24)",
    ],
    customer_note:
      "This is for the regional finals — fit and finish matter more than speed. Please prioritise mobility in the shoulders.",
    progress_notes: [],
    payout_amount: 48000,
  },
  {
    id: "#HV-2848",
    costume_name: "Arcane Rogue Leathers",
    complexity: "M",
    status: "in_progress",
    skills: ["Leather Work", "Sewing"],
    deadline: "2026-06-09",
    days_left: 8,
    blueprint_notes:
      "Layered leather chest harness with tooled celtic patterns. Aged brown finish, brass buckle hardware. Matching bracers and belt pouches.",
    required_materials: [
      "Veg-tan leather (4 sq ft)",
      "Antique brass buckles x6",
      "Leather dye — chestnut",
    ],
    customer_note: "Love the rugged worn look — don't make it too clean!",
    progress_notes: [
      { text: "Pattern cut and dyed, starting tooling tonight.", timestamp: "2 days ago" },
      { text: "Chest harness assembled, fitting buckles next.", timestamp: "Yesterday" },
    ],
    payout_amount: 22000,
  },
  {
    id: "#HV-2849",
    costume_name: "Neon Sentinel Helmet",
    complexity: "S",
    status: "in_progress",
    skills: ["3D Printing", "LED Integration"],
    deadline: "2026-06-06",
    days_left: 5,
    blueprint_notes:
      "3D printed helmet shell with internal LED ring. Glossy white finish with cyan accent lighting. Padded interior for comfort.",
    required_materials: ["PLA+ filament (white)", "LED ring 60mm", "Foam padding"],
    customer_note: "Need it bright enough for stage photos.",
    progress_notes: [
      { text: "Print done, sanding and priming.", timestamp: "3 hours ago" },
    ],
    payout_amount: 14000,
  },
  {
    id: "#HV-2850",
    costume_name: "Wasteland Raider Plate",
    complexity: "L",
    status: "ready",
    skills: ["Heavy Armor", "Synthetic Texturing", "EVA Foam"],
    deadline: "2026-06-11",
    days_left: 10,
    blueprint_notes:
      "Post-apocalyptic scrap armor with heavy weathering. Rust streaks, dents, and mixed-material panels. Adjustable strapping for layered fit.",
    required_materials: ["EVA foam", "Rust weathering pigments", "Webbing straps"],
    customer_note: "The grungier the better.",
    progress_notes: [
      { text: "Base plates shaped.", timestamp: "5 days ago" },
      { text: "Weathering complete, ready to ship.", timestamp: "Today" },
    ],
    payout_amount: 31000,
    dispatch_tracking: "",
  },
  {
    id: "#HV-2841",
    costume_name: "Frost Valkyrie Wings",
    complexity: "L",
    status: "completed",
    skills: ["Mechanical Props", "LED Integration"],
    deadline: "2026-05-20",
    days_left: 0,
    blueprint_notes:
      "Articulated mechanical wings with expand/retract mechanism and frost-blue LED feathers.",
    required_materials: ["Aluminium rods", "LED feathers", "Servo motors"],
    customer_note: "Absolutely stunning, thank you!",
    progress_notes: [
      { text: "Mechanism tested and working.", timestamp: "May 16" },
      { text: "Dispatched via BlueDart.", timestamp: "May 18" },
    ],
    payout_amount: 36500,
    completed_date: "2026-05-18",
    dispatch_tracking: "BD-4471829301",
  },
];

export const payoutHistory: PayoutRecord[] = [
  { id: "p1", date: "2026-05-28", order_id: "#HV-2841", costume_name: "Frost Valkyrie Wings", amount: 36500, status: "paid" },
  { id: "p2", date: "2026-05-22", order_id: "#HV-2835", costume_name: "Ember Knight Helm", amount: 18000, status: "paid" },
  { id: "p3", date: "2026-05-15", order_id: "#HV-2829", costume_name: "Shadow Assassin Cloak", amount: 21500, status: "paid" },
  { id: "p4", date: "2026-06-01", order_id: "#HV-2848", costume_name: "Arcane Rogue Leathers", amount: 22000, status: "processing" },
  { id: "p5", date: "2026-06-01", order_id: "#HV-2849", costume_name: "Neon Sentinel Helmet", amount: 14000, status: "pending" },
  { id: "p6", date: "2026-05-30", order_id: "#HV-2850", costume_name: "Wasteland Raider Plate", amount: 31000, status: "pending" },
];

export const monthlyEarnings: MonthlyEarning[] = [
  { month: "Jan", amount: 42000 },
  { month: "Feb", amount: 38500 },
  { month: "Mar", amount: 51000 },
  { month: "Apr", amount: 47500 },
  { month: "May", amount: 76000 },
  { month: "Jun", amount: 28500 },
];
