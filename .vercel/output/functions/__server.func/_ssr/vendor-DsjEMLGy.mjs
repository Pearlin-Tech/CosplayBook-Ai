import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { T as Toaster, t as toast } from "../_libs/sonner.mjs";
import { B as BadgeCheck, C as Clock, L as LayoutDashboard, P as Package, I as IndianRupee, S as Settings, a as LifeBuoy, b as LogOut, A as ArrowUpRight, c as Info, D as Download, d as Star, e as Lock, f as ShieldCheck, X, g as Calendar, h as Check } from "../_libs/lucide-react.mjs";
import { R as ResponsiveContainer, B as BarChart, C as CartesianGrid, X as XAxis, Y as YAxis, T as Tooltip, a as Bar } from "../_libs/recharts.mjs";
import "../_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/scheduler.mjs";
import "../_libs/es-toolkit.mjs";
import "../_libs/clsx.mjs";
import "../_libs/react-is.mjs";
import "../_libs/tiny-invariant.mjs";
import "../_libs/d3-shape.mjs";
import "../_libs/d3-path.mjs";
import "../_libs/reselect.mjs";
import "../_libs/reduxjs__toolkit.mjs";
import "../_libs/redux.mjs";
import "../_libs/immer.mjs";
import "../_libs/redux-thunk.mjs";
import "../_libs/react-redux.mjs";
import "../_libs/use-sync-external-store.mjs";
import "../_libs/victory-vendor.mjs";
import "../_libs/d3-scale.mjs";
import "../_libs/internmap.mjs";
import "../_libs/d3-array.mjs";
import "../_libs/d3-time-format.mjs";
import "../_libs/d3-time.mjs";
import "../_libs/d3-interpolate.mjs";
import "../_libs/d3-color.mjs";
import "../_libs/d3-format.mjs";
import "../_libs/decimal.js-light.mjs";
import "../_libs/eventemitter3.mjs";
const navItems = [
  { id: "home", label: "Home", icon: LayoutDashboard },
  { id: "orders", label: "My Orders", icon: Package },
  { id: "earnings", label: "Earnings", icon: IndianRupee },
  { id: "profile", label: "Workshop Profile", icon: Settings }
];
function VendorSidebar({
  active,
  onChange,
  profile,
  activeOrderCount
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "flex w-[240px] shrink-0 flex-col border-r border-white/[0.08] bg-[#0A0A0B] p-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-2 pb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-bold text-[#6366F1]", children: "CosplayBook" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-xs text-[#52525B]", children: "Vendor Portal" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.08]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-10 w-10 items-center justify-center rounded-full bg-indigo-900 text-sm font-semibold text-indigo-300", children: profile.initials }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm font-semibold text-white", children: profile.workshop_name }),
        profile.is_verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[#22C55E]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3 w-3" }),
          " Verified"
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[#F59E0B]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3 w-3" }),
          " Pending"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-white/[0.08]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex flex-1 flex-col gap-1 py-4", children: navItems.map((item) => {
      const Icon = item.icon;
      const isActive = active === item.id;
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => onChange(item.id),
          className: `flex items-center gap-3 rounded-r-lg px-3 py-2 text-sm transition-colors ${isActive ? "border-l-2 border-indigo-500 bg-[#18181B] text-white" : "border-l-2 border-transparent text-[#71717A] hover:bg-[#111113] hover:text-white"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-4 w-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 text-left", children: item.label }),
            item.id === "orders" && activeOrderCount > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-full bg-indigo-600 px-1.5 py-0.5 text-[10px] font-semibold text-white", children: activeOrderCount })
          ]
        },
        item.id
      );
    }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 border-t border-white/[0.08] pt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 px-3 text-xs text-[#52525B] transition-colors hover:text-[#A1A1AA]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LifeBuoy, { className: "h-3.5 w-3.5" }),
        " Help & Support"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-2 rounded-lg border border-white/[0.12] px-3 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "h-4 w-4" }),
        " Logout"
      ] })
    ] })
  ] });
}
function formatINR(value) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}
const ALL_SPECIALTIES = [
  "Heavy Armor",
  "EVA Foam",
  "Sewing",
  "Embroidery",
  "Leather Work",
  "Electronics",
  "LED Integration",
  "Mechanical Props",
  "3D Printing",
  "Synthetic Texturing"
];
const vendorProfile = {
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
  pending_payout: 12e3
};
const vendorOrders = [
  {
    id: "#HV-2847",
    costume_name: "Cyber Samurai Exo-Suit",
    complexity: "XL",
    status: "pending_acceptance",
    skills: ["Heavy Armor", "EVA Foam", "LED Integration"],
    deadline: "2026-06-14",
    days_left: 13,
    blueprint_notes: "Full articulated exo-suit with motorised shoulder plates. Reference sheet attached. Client requests matte gunmetal finish with reactive LED veins along the spine and forearms. Internal cooling channels must be left accessible for maintenance. Helmet visor should be removable with magnetic mounts.",
    required_materials: [
      "10mm EVA foam (high density)",
      "Gunmetal plasti-dip x4",
      "Addressable RGB LED strips (5m)",
      "Neodymium magnets (24)"
    ],
    customer_note: "This is for the regional finals — fit and finish matter more than speed. Please prioritise mobility in the shoulders.",
    progress_notes: [],
    payout_amount: 48e3
  },
  {
    id: "#HV-2848",
    costume_name: "Arcane Rogue Leathers",
    complexity: "M",
    status: "in_progress",
    skills: ["Leather Work", "Sewing"],
    deadline: "2026-06-09",
    days_left: 8,
    blueprint_notes: "Layered leather chest harness with tooled celtic patterns. Aged brown finish, brass buckle hardware. Matching bracers and belt pouches.",
    required_materials: [
      "Veg-tan leather (4 sq ft)",
      "Antique brass buckles x6",
      "Leather dye — chestnut"
    ],
    customer_note: "Love the rugged worn look — don't make it too clean!",
    progress_notes: [
      { text: "Pattern cut and dyed, starting tooling tonight.", timestamp: "2 days ago" },
      { text: "Chest harness assembled, fitting buckles next.", timestamp: "Yesterday" }
    ],
    payout_amount: 22e3
  },
  {
    id: "#HV-2849",
    costume_name: "Neon Sentinel Helmet",
    complexity: "S",
    status: "in_progress",
    skills: ["3D Printing", "LED Integration"],
    deadline: "2026-06-06",
    days_left: 5,
    blueprint_notes: "3D printed helmet shell with internal LED ring. Glossy white finish with cyan accent lighting. Padded interior for comfort.",
    required_materials: ["PLA+ filament (white)", "LED ring 60mm", "Foam padding"],
    customer_note: "Need it bright enough for stage photos.",
    progress_notes: [
      { text: "Print done, sanding and priming.", timestamp: "3 hours ago" }
    ],
    payout_amount: 14e3
  },
  {
    id: "#HV-2850",
    costume_name: "Wasteland Raider Plate",
    complexity: "L",
    status: "ready",
    skills: ["Heavy Armor", "Synthetic Texturing", "EVA Foam"],
    deadline: "2026-06-11",
    days_left: 10,
    blueprint_notes: "Post-apocalyptic scrap armor with heavy weathering. Rust streaks, dents, and mixed-material panels. Adjustable strapping for layered fit.",
    required_materials: ["EVA foam", "Rust weathering pigments", "Webbing straps"],
    customer_note: "The grungier the better.",
    progress_notes: [
      { text: "Base plates shaped.", timestamp: "5 days ago" },
      { text: "Weathering complete, ready to ship.", timestamp: "Today" }
    ],
    payout_amount: 31e3,
    dispatch_tracking: ""
  },
  {
    id: "#HV-2841",
    costume_name: "Frost Valkyrie Wings",
    complexity: "L",
    status: "completed",
    skills: ["Mechanical Props", "LED Integration"],
    deadline: "2026-05-20",
    days_left: 0,
    blueprint_notes: "Articulated mechanical wings with expand/retract mechanism and frost-blue LED feathers.",
    required_materials: ["Aluminium rods", "LED feathers", "Servo motors"],
    customer_note: "Absolutely stunning, thank you!",
    progress_notes: [
      { text: "Mechanism tested and working.", timestamp: "May 16" },
      { text: "Dispatched via BlueDart.", timestamp: "May 18" }
    ],
    payout_amount: 36500,
    completed_date: "2026-05-18",
    dispatch_tracking: "BD-4471829301"
  }
];
const payoutHistory = [
  { id: "p1", date: "2026-05-28", order_id: "#HV-2841", costume_name: "Frost Valkyrie Wings", amount: 36500, status: "paid" },
  { id: "p2", date: "2026-05-22", order_id: "#HV-2835", costume_name: "Ember Knight Helm", amount: 18e3, status: "paid" },
  { id: "p3", date: "2026-05-15", order_id: "#HV-2829", costume_name: "Shadow Assassin Cloak", amount: 21500, status: "paid" },
  { id: "p4", date: "2026-06-01", order_id: "#HV-2848", costume_name: "Arcane Rogue Leathers", amount: 22e3, status: "processing" },
  { id: "p5", date: "2026-06-01", order_id: "#HV-2849", costume_name: "Neon Sentinel Helmet", amount: 14e3, status: "pending" },
  { id: "p6", date: "2026-05-30", order_id: "#HV-2850", costume_name: "Wasteland Raider Plate", amount: 31e3, status: "pending" }
];
const monthlyEarnings = [
  { month: "Jan", amount: 42e3 },
  { month: "Feb", amount: 38500 },
  { month: "Mar", amount: 51e3 },
  { month: "Apr", amount: 47500 },
  { month: "May", amount: 76e3 },
  { month: "Jun", amount: 28500 }
];
const statusMeta = {
  pending_acceptance: {
    label: "PENDING ACCEPTANCE",
    className: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20"
  },
  in_progress: {
    label: "IN PROGRESS",
    className: "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20"
  },
  ready: {
    label: "READY FOR DISPATCH",
    className: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20"
  },
  completed: {
    label: "COMPLETED",
    className: "bg-zinc-700/30 text-zinc-400 border border-white/10"
  }
};
const complexityMeta = {
  S: { className: "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20" },
  M: { className: "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20" },
  L: { className: "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20" },
  XL: { className: "bg-[#EF4444]/10 text-[#EF4444] border border-[#EF4444]/20" }
};
function StatusPill({ status }) {
  const m = statusMeta[status];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold tracking-wider ${m.className}`,
      children: m.label
    }
  );
}
function ComplexityBadge({ tier }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: `inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${complexityMeta[tier].className}`,
      children: tier
    }
  );
}
function deadlineColor(daysLeft) {
  if (daysLeft < 2) return "text-[#EF4444]";
  if (daysLeft < 7) return "text-[#F59E0B]";
  return "text-[#A1A1AA]";
}
function payoutStatusPill(status) {
  switch (status) {
    case "paid":
      return "bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20";
    case "processing":
      return "bg-[#6366F1]/10 text-[#818CF8] border border-[#6366F1]/20";
    case "pending":
      return "bg-[#F59E0B]/10 text-[#F59E0B] border border-[#F59E0B]/20";
  }
}
function StarRow({ score }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Star,
    {
      className: `h-3.5 w-3.5 ${i < Math.round(score) ? "fill-indigo-500 text-indigo-500" : "fill-zinc-700 text-zinc-700"}`
    },
    i
  )) });
}
function VendorHome({
  profile,
  orders,
  payouts,
  completedThisMonth,
  onViewOrder,
  onGoToProfile,
  onGoToEarnings
}) {
  const activeOrders = orders.filter(
    (o) => o.status === "in_progress" || o.status === "ready" || o.status === "pending_acceptance"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-2xl font-semibold tracking-[-0.02em] text-white", children: [
        "Good morning, ",
        profile.workshop_name
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#52525B]", children: "Monday, 1 June 2026" })
    ] }),
    !profile.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/10 px-5 py-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F59E0B]", children: "Your workshop is pending verification. Complete your profile to start receiving orders." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: onGoToProfile,
          className: "shrink-0 text-sm font-medium text-[#F59E0B] hover:underline",
          children: "Go to Profile →"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-[#A1A1AA]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-indigo-500" }),
          " Active Orders"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-3xl font-semibold text-white", children: activeOrders.length }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#52525B]", children: "orders in progress" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "Completed This Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 flex items-center gap-1 text-3xl font-semibold text-white", children: [
          completedThisMonth,
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "h-5 w-5 text-[#22C55E]" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#52525B]", children: "delivered" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "Earnings This Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-2xl font-bold text-[#818CF8]", children: formatINR(profile.month_earned) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#52525B]", children: "this month" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "Rating" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-3xl font-semibold text-white", children: [
          profile.rating_score.toFixed(1),
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base text-[#52525B]", children: "/ 5.0" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StarRow, { score: profile.rating_score }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold text-white", children: "Active Orders" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
          activeOrders.slice(0, 3).map((o) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => onViewOrder(o.id),
              className: "flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left transition-colors hover:bg-[#18181B]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 shrink-0 font-mono text-xs text-[#52525B]", children: o.id }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 truncate text-sm text-white", children: o.costume_name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `hidden shrink-0 text-xs sm:block ${deadlineColor(o.days_left)}`, children: [
                  o.days_left,
                  "d"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: o.status }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs font-medium text-[#6366F1]", children: "View" })
              ]
            },
            o.id
          )),
          activeOrders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-4 text-center text-sm text-[#52525B]", children: "No active orders." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-sm font-semibold text-white", children: "Recent Payouts" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: payouts.slice(0, 3).map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-3 rounded-lg px-2 py-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-20 shrink-0 text-xs text-[#52525B]", children: p.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-1 font-mono text-xs text-[#A1A1AA]", children: p.order_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 font-mono text-sm text-white", children: formatINR(p.amount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${payoutStatusPill(p.status)}`,
                  children: p.status
                }
              )
            ]
          },
          p.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: onGoToEarnings,
            className: "mt-3 text-sm font-medium text-[#6366F1] hover:underline",
            children: "View all earnings →"
          }
        )
      ] })
    ] })
  ] });
}
function VendorOrderCard({
  order,
  onOpen,
  onAccept,
  onDecline,
  onAddNote,
  onMarkReady,
  onConfirmDispatch
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [note, setNote] = reactExports.useState("");
  const [tracking, setTracking] = reactExports.useState(order.dispatch_tracking ?? "");
  const isCompleted = order.status === "completed";
  const stop = (e) => e.stopPropagation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      onClick: () => onOpen(order.id),
      className: `mb-3 cursor-pointer rounded-xl border border-white/[0.08] bg-[#111113] p-5 transition-colors hover:border-white/[0.14] ${isCompleted ? "opacity-70" : ""}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-x-3 gap-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-[#52525B]", children: order.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-white", children: order.costume_name }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ComplexityBadge, { tier: order.complexity }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: order.status }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: order.skills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400",
            children: s
          },
          s
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "h-4 w-4 text-[#52525B]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#A1A1AA]", children: order.deadline }),
          !isCompleted && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: deadlineColor(order.days_left), children: [
            "· ",
            order.days_left,
            " days left"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: `mt-3 text-sm text-[#A1A1AA] ${expanded ? "" : "line-clamp-2"}`,
            children: order.blueprint_notes
          }
        ),
        order.blueprint_notes.length > 90 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: (e) => {
              stop(e);
              setExpanded((v) => !v);
            },
            className: "mt-1 text-xs font-medium text-[#6366F1] hover:underline",
            children: expanded ? "Show less" : "Show more"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", onClick: stop, children: [
          order.status === "pending_acceptance" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onAccept(order.id),
                className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500",
                children: "Accept Order"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onDecline(order.id),
                className: "rounded-lg border border-[#EF4444]/30 px-4 py-2 text-sm text-[#EF4444] transition-colors hover:bg-[#EF4444]/10",
                children: "Decline"
              }
            )
          ] }),
          order.status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: note,
                  onChange: (e) => setNote(e.target.value),
                  placeholder: "Add a progress note...",
                  className: "flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => {
                    if (note.trim()) {
                      onAddNote(order.id, note.trim());
                      setNote("");
                    }
                  },
                  className: "rounded-lg border border-white/[0.12] px-4 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white",
                  children: "Update"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onMarkReady(order.id),
                className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500",
                children: "Mark as Ready for Dispatch"
              }
            )
          ] }),
          order.status === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                value: tracking,
                onChange: (e) => setTracking(e.target.value),
                placeholder: "Dispatch tracking #",
                className: "flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => onConfirmDispatch(order.id, tracking),
                className: "rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#22C55E]/90",
                children: "Confirm Dispatched"
              }
            )
          ] }),
          order.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#52525B]", children: [
              "Completed ",
              order.completed_date
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[#22C55E]", children: [
              "Payout: ",
              formatINR(order.payout_amount)
            ] })
          ] })
        ] })
      ]
    }
  );
}
function VendorOrders(props) {
  const [tab, setTab] = reactExports.useState("active");
  const active = props.orders.filter((o) => o.status !== "completed");
  const completed = props.orders.filter((o) => o.status === "completed");
  const list = tab === "active" ? active : completed;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-[-0.02em] text-white", children: "My Orders" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setTab("active"),
          className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === "active" ? "bg-indigo-600 text-white" : "border border-white/[0.12] text-[#A1A1AA] hover:text-white"}`,
          children: [
            "Active (",
            active.length,
            ")"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: () => setTab("completed"),
          className: `rounded-lg px-4 py-2 text-sm font-medium transition-colors ${tab === "completed" ? "bg-indigo-600 text-white" : "border border-white/[0.12] text-[#A1A1AA] hover:text-white"}`,
          children: [
            "Completed (",
            completed.length,
            ")"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: list.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-10 text-center text-sm text-[#52525B]", children: [
      "No ",
      tab,
      " orders."
    ] }) : list.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorOrderCard,
      {
        order: o,
        onOpen: props.onOpen,
        onAccept: props.onAccept,
        onDecline: props.onDecline,
        onAddNote: props.onAddNote,
        onMarkReady: props.onMarkReady,
        onConfirmDispatch: props.onConfirmDispatch
      },
      o.id
    )) })
  ] });
}
function ChartTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-xs shadow-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#A1A1AA]", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-semibold text-white", children: formatINR(payload[0].value) })
  ] });
}
function VendorEarnings({ profile, payouts, monthly }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-[-0.02em] text-white", children: "Earnings" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#52525B]", children: "Your financial overview" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "Total Earned" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-2xl font-bold text-[#818CF8]", children: formatINR(profile.total_earned) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#52525B]", children: "all time" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#A1A1AA]", children: "This Month" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-2xl font-bold text-white", children: formatINR(profile.month_earned) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-1 text-xs text-[#A1A1AA]", children: [
          "Pending Payout",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "group relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { className: "h-3 w-3 cursor-help text-[#52525B]" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "pointer-events-none absolute bottom-full left-1/2 mb-1 hidden -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-[#18181B] px-2 py-1 text-[10px] text-[#A1A1AA] group-hover:block", children: "Awaiting admin release" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 font-mono text-2xl font-bold text-[#F59E0B]", children: formatINR(profile.pending_payout) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-4 text-sm font-semibold text-white", children: "Last 6 Months" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { height: 220 }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: "100%", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { data: monthly, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { stroke: "rgba(255,255,255,0.05)", vertical: false }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          XAxis,
          {
            dataKey: "month",
            stroke: "#52525B",
            fontSize: 12,
            tickLine: false,
            axisLine: false
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          YAxis,
          {
            stroke: "#52525B",
            fontSize: 12,
            tickLine: false,
            axisLine: false,
            tickFormatter: (v) => `₹${v / 1e3}k`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { cursor: { fill: "rgba(255,255,255,0.04)" }, content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "amount", fill: "#6366F1", radius: [6, 6, 0, 0] })
      ] }) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-white", children: "Payout History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "flex items-center gap-1.5 rounded-lg border border-white/[0.12] px-3 py-1.5 text-xs text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "h-3.5 w-3.5" }),
          " Export"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-hidden rounded-xl border border-white/[0.08] bg-[#111113]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[1fr_1fr_2fr_1fr_1fr] bg-[#18181B] px-4 py-3 text-xs uppercase tracking-wider text-[#52525B]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Date" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Order ID" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Costume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Amount" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: "Status" })
        ] }),
        payouts.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "grid grid-cols-[1fr_1fr_2fr_1fr_1fr] items-center border-t border-white/[0.05] px-4 py-3 text-sm transition-colors hover:bg-[#18181B]",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#A1A1AA]", children: p.date }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-[#A1A1AA]", children: p.order_id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-white", children: p.costume_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right font-mono text-white", children: formatINR(p.amount) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `rounded-md px-2 py-0.5 text-[10px] font-semibold uppercase ${payoutStatusPill(p.status)}`,
                  children: p.status
                }
              ) })
            ]
          },
          p.id
        ))
      ] })
    ] })
  ] });
}
function VendorWorkshopProfile({
  profile,
  onSave,
  onRequestVerification
}) {
  const [form, setForm] = reactExports.useState(profile);
  const update = (key, value) => setForm((f) => ({ ...f, [key]: value }));
  const toggleSpecialty = (s) => setForm((f) => ({
    ...f,
    specialty_tags: f.specialty_tags.includes(s) ? f.specialty_tags.filter((t) => t !== s) : [...f.specialty_tags, s]
  }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-semibold tracking-[-0.02em] text-white", children: "Workshop Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-6 lg:grid-cols-[38%_62%]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider text-[#52525B]", children: "How you appear on the platform" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-16 w-16 items-center justify-center rounded-full bg-indigo-900 text-xl font-semibold text-indigo-300", children: form.initials }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 text-lg font-semibold text-white", children: form.workshop_name || "Workshop Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#A1A1AA]", children: form.owner_name || "Owner Name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-3", children: [
            form.is_verified ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[#22C55E]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { className: "h-3.5 w-3.5" }),
              " Verified"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-xs text-[#F59E0B]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "h-3.5 w-3.5" }),
              " Pending"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex items-center gap-0.5", children: Array.from({ length: 5 }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              Star,
              {
                className: `h-3.5 w-3.5 ${i < Math.round(form.rating_score) ? "fill-indigo-500 text-indigo-500" : "fill-zinc-700 text-zinc-700"}`
              },
              i
            )) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 flex flex-wrap gap-1.5", children: form.specialty_tags.map((t) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400", children: t }, t)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mb-1 text-xs text-[#A1A1AA]", children: [
              form.active_assignments,
              " / ",
              form.max_capacity,
              " slots active"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: Array.from({ length: form.max_capacity }, (_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `h-1.5 flex-1 rounded-full ${i < form.active_assignments ? "bg-indigo-500" : "bg-zinc-700"}`
              },
              i
            )) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold text-white", children: "Workshop Info" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-[#A1A1AA]", children: "Workshop Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: form.workshop_name,
                  onChange: (e) => update("workshop_name", e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-[#A1A1AA]", children: "Owner Name" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: form.owner_name,
                  onChange: (e) => update("owner_name", e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-[#A1A1AA]", children: "Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: form.email,
                    disabled: true,
                    className: "w-full cursor-not-allowed rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 pr-9 text-sm text-[#52525B]"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#52525B]" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-[#A1A1AA]", children: "Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "input",
                {
                  value: form.phone,
                  onChange: (e) => update("phone", e.target.value),
                  className: "w-full rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "mb-1 block text-xs text-[#A1A1AA]", children: "About / Bio" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: form.bio,
                maxLength: 200,
                onChange: (e) => update("bio", e.target.value),
                rows: 3,
                className: "w-full resize-none rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white focus:border-indigo-500 focus:outline-none"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-1 text-right text-xs text-[#52525B]", children: [
              form.bio.length,
              "/200"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold text-white", children: "Specializations" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: ALL_SPECIALTIES.map((s) => {
            const checked = form.specialty_tags.includes(s);
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: () => toggleSpecialty(s),
                className: `rounded-lg px-3 py-2 text-xs font-medium transition-colors ${checked ? "bg-indigo-600 text-white" : "border border-white/[0.12] text-[#A1A1AA] hover:border-white/20 hover:text-white"}`,
                children: s
              },
              s
            );
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-[#111113] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-sm font-semibold text-white", children: "Capacity" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm text-[#818CF8]", children: form.max_capacity })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              type: "range",
              min: 1,
              max: 6,
              value: form.max_capacity,
              onChange: (e) => update("max_capacity", Number(e.target.value)),
              className: "w-full accent-indigo-500"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-[#52525B]", children: "Maximum simultaneous orders your workshop can handle" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => onSave(form),
            className: "w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-medium text-white transition-colors hover:bg-indigo-500",
            children: "Save Changes"
          }
        ),
        !form.is_verified && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-[#F59E0B]/30 bg-[#F59E0B]/[0.05] p-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "flex items-center gap-2 text-sm font-semibold text-[#F59E0B]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "h-4 w-4" }),
            " Request Verification"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-[#A1A1AA]", children: "Verified workshops appear higher in matching and unlock larger orders. Submit your details for review — approval usually takes 1–2 business days." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: onRequestVerification,
              className: "mt-3 rounded-lg border border-[#F59E0B]/40 px-4 py-2 text-sm font-medium text-[#F59E0B] transition-colors hover:bg-[#F59E0B]/10",
              children: "Submit Verification Request"
            }
          )
        ] })
      ] })
    ] })
  ] });
}
function Stepper({ status }) {
  const steps = ["Assigned", "In Progress", "Dispatched"];
  let activeIndex = 0;
  if (status === "in_progress" || status === "ready") activeIndex = 1;
  if (status === "completed") activeIndex = 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: steps.map((label, i) => {
    const done = i < activeIndex || status === "completed";
    const isActive = i === activeIndex && status !== "completed";
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 items-center last:flex-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${done ? "bg-[#22C55E] text-white" : isActive ? "bg-indigo-600 text-white" : "bg-zinc-700 text-zinc-400"}`,
            children: done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "h-3.5 w-3.5" }) : i + 1
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-[10px] ${done || isActive ? "text-white" : "text-[#52525B]"}`,
            children: label
          }
        )
      ] }),
      i < steps.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `mx-2 h-0.5 flex-1 ${i < activeIndex ? "bg-[#22C55E]" : isActive ? "bg-indigo-600" : "bg-zinc-700"}`
        }
      )
    ] }, label);
  }) });
}
function VendorOrderDetailModal({
  order,
  onClose,
  onAccept,
  onDecline,
  onAddNote,
  onMarkReady,
  onConfirmDispatch
}) {
  const [note, setNote] = reactExports.useState("");
  const [tracking, setTracking] = reactExports.useState("");
  if (!order) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm",
      onClick: onClose,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "relative max-h-[85vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-white/[0.08] bg-[#111113] p-8",
          onClick: (e) => e.stopPropagation(),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                onClick: onClose,
                className: "absolute right-5 top-5 rounded-lg border border-white/[0.12] p-1.5 text-[#A1A1AA] transition-colors hover:text-white",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pr-10", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono text-xs text-[#52525B]", children: order.id }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-1 text-xl font-semibold text-white", children: order.costume_name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ComplexityBadge, { tier: order.complexity }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(StatusPill, { status: order.status })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-white/[0.06] pt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-semibold text-white", children: "Blueprint Details" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm leading-relaxed text-[#A1A1AA]", children: order.blueprint_notes }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-xs font-medium uppercase tracking-wider text-[#52525B]", children: "Required Materials" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-2 space-y-1", children: order.required_materials.map((m) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-2 text-sm text-[#A1A1AA]", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-indigo-500" }),
                " ",
                m
              ] }, m)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-white/[0.06] pt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-2 text-sm font-semibold text-white", children: "Customer Note" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg bg-[#18181B] p-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm italic text-[#A1A1AA]", children: [
                '"',
                order.customer_note,
                '"'
              ] }) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-white/[0.06] pt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-4 text-sm font-semibold text-white", children: "Timeline" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Stepper, { status: order.status })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-5 border-t border-white/[0.06] pt-5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mb-3 text-sm font-semibold text-white", children: "Progress Notes" }),
              order.progress_notes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#52525B]", children: "No notes yet." }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3", children: [...order.progress_notes].reverse().map((n, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-indigo-900 text-[10px] font-semibold text-indigo-300", children: "AC" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F4F4F5]", children: n.text }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-[#52525B]", children: n.timestamp })
                ] })
              ] }, i)) })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-white/[0.06] pt-5", children: [
              order.status === "pending_acceptance" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onAccept(order.id),
                    className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500",
                    children: "Accept Order"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onDecline(order.id),
                    className: "rounded-lg border border-[#EF4444]/30 px-4 py-2 text-sm text-[#EF4444] transition-colors hover:bg-[#EF4444]/10",
                    children: "Decline"
                  }
                )
              ] }),
              order.status === "in_progress" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "input",
                    {
                      value: note,
                      onChange: (e) => setNote(e.target.value),
                      placeholder: "Add a progress note...",
                      className: "flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        if (note.trim()) {
                          onAddNote(order.id, note.trim());
                          setNote("");
                        }
                      },
                      className: "rounded-lg border border-white/[0.12] px-4 py-2 text-sm text-[#A1A1AA] transition-colors hover:border-white/20 hover:text-white",
                      children: "Update"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onMarkReady(order.id),
                    className: "rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500",
                    children: "Mark as Ready for Dispatch"
                  }
                )
              ] }),
              order.status === "ready" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    value: tracking,
                    onChange: (e) => setTracking(e.target.value),
                    placeholder: "Dispatch tracking #",
                    className: "flex-1 rounded-lg border border-white/10 bg-[#18181B] px-3 py-2 text-sm text-white placeholder:text-[#52525B] focus:border-indigo-500 focus:outline-none"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => onConfirmDispatch(order.id, tracking),
                    className: "rounded-lg bg-[#22C55E] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#22C55E]/90",
                    children: "Confirm Dispatched"
                  }
                )
              ] }),
              order.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-sm", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#52525B]", children: [
                  "Completed ",
                  order.completed_date
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[#22C55E]", children: [
                  "Payout: ",
                  formatINR(order.payout_amount)
                ] })
              ] })
            ] })
          ]
        }
      )
    }
  );
}
function VendorPortal() {
  const [tab, setTab] = reactExports.useState("home");
  const [orders, setOrders] = reactExports.useState(vendorOrders);
  const [profile, setProfile] = reactExports.useState(vendorProfile);
  const [openOrderId, setOpenOrderId] = reactExports.useState(null);
  const activeOrderCount = orders.filter((o) => o.status !== "completed").length;
  const completedThisMonth = orders.filter((o) => o.status === "completed").length;
  const openOrder = reactExports.useMemo(
    () => orders.find((o) => o.id === openOrderId) ?? null,
    [orders, openOrderId]
  );
  const acceptOrder = (id) => {
    setOrders(
      (prev) => prev.map((o) => o.id === id ? { ...o, status: "in_progress" } : o)
    );
    toast.success("Order accepted!");
  };
  const declineOrder = (id) => {
    setOrders((prev) => prev.filter((o) => o.id !== id));
    setOpenOrderId((cur) => cur === id ? null : cur);
    toast("Order declined", { description: "Removed from your queue." });
  };
  const addNote = (id, text) => {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === id ? { ...o, progress_notes: [...o.progress_notes, { text, timestamp: "Just now" }] } : o
      )
    );
    toast.success("Progress note added");
  };
  const markReady = (id) => {
    setOrders(
      (prev) => prev.map((o) => o.id === id ? { ...o, status: "ready" } : o)
    );
    toast.success("Marked as ready for dispatch");
  };
  const confirmDispatch = (id, tracking) => {
    setOrders(
      (prev) => prev.map(
        (o) => o.id === id ? {
          ...o,
          status: "completed",
          dispatch_tracking: tracking,
          completed_date: "1 Jun 2026"
        } : o
      )
    );
    toast.success("Order dispatched & completed");
  };
  const saveProfile = (updated) => {
    setProfile(updated);
    toast.success("Profile saved");
  };
  const requestVerification = () => {
    toast.success("Verification request submitted", {
      description: "We'll review your workshop within 1–2 business days."
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen bg-[#0A0A0B] font-sans text-[#F4F4F5]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorSidebar,
      {
        active: tab,
        onChange: setTab,
        profile,
        activeOrderCount
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "flex-1 overflow-y-auto p-8", children: [
      tab === "home" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VendorHome,
        {
          profile,
          orders,
          payouts: payoutHistory,
          completedThisMonth,
          onViewOrder: setOpenOrderId,
          onGoToProfile: () => setTab("profile"),
          onGoToEarnings: () => setTab("earnings")
        }
      ),
      tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VendorOrders,
        {
          orders,
          onOpen: setOpenOrderId,
          onAccept: acceptOrder,
          onDecline: declineOrder,
          onAddNote: addNote,
          onMarkReady: markReady,
          onConfirmDispatch: confirmDispatch
        }
      ),
      tab === "earnings" && /* @__PURE__ */ jsxRuntimeExports.jsx(VendorEarnings, { profile, payouts: payoutHistory, monthly: monthlyEarnings }),
      tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(
        VendorWorkshopProfile,
        {
          profile,
          onSave: saveProfile,
          onRequestVerification: requestVerification
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      VendorOrderDetailModal,
      {
        order: openOrder,
        onClose: () => setOpenOrderId(null),
        onAccept: acceptOrder,
        onDecline: declineOrder,
        onAddNote: addNote,
        onMarkReady: markReady,
        onConfirmDispatch: confirmDispatch
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toaster, { theme: "dark" })
  ] });
}
const SplitComponent = VendorPortal;
export {
  SplitComponent as component
};
