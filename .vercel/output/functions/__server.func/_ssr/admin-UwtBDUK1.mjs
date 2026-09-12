import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { s as supabase } from "./router-CYT0jzOA.mjs";
import { n as Shield, w as Sun, x as Moon, X, y as Menu, L as LayoutDashboard, F as FileSearch, z as Truck, G as Banknote, J as UserCheck, K as Users, N as ChevronRight, b as LogOut, P as Package, C as Clock, O as TrendingUp, Q as CheckCircle2, V as RefreshCw, Z as Zap, M as MapPin, W as Gauge, Y as User, _ as Vault, e as Lock, $ as Unlock, t as Eye, q as Image, a0 as AlignCenter, a1 as Ruler, a2 as AlertTriangle, a3 as ArrowRightLeft, a4 as ChevronDown } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/tanstack__react-router.mjs";
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
const CHECKLIST = [
  { key: "blueprint", label: "Blueprint Attached", icon: Image },
  { key: "address", label: "Shipping Address Set", icon: AlignCenter },
  { key: "price", label: "Price Confirmed (>₹0)", icon: Ruler }
];
function checkValue(order, key) {
  if (key === "blueprint") return !!order.blueprint_url;
  if (key === "address") return !!order.shipping_address;
  if (key === "price") return Number(order.price) > 0;
  return false;
}
const STATUS_COLORS = {
  pending: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  processing: "text-blue-400 bg-blue-400/10 border-blue-400/20",
  approved: "text-green-400 bg-green-400/10 border-green-400/20",
  shipped: "text-purple-400 bg-purple-400/10 border-purple-400/20",
  delivered: "text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20",
  rejected: "text-red-400 bg-red-400/10 border-red-400/20"
};
function IntakePipeline() {
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [selectedId, setSelectedId] = reactExports.useState("");
  const [flagVisible, setFlagVisible] = reactExports.useState(false);
  const [flagText, setFlagText] = reactExports.useState("");
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const { data: ordersData, error } = await supabase.from("apparel_orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!ordersData) {
        setOrders([]);
        return;
      }
      const userIds = [...new Set(ordersData.map((o) => o.user_id))];
      const { data: profiles } = await supabase.from("profiles").select("id, full_name, email").in("id", userIds);
      const profileMap = {};
      profiles?.forEach((p) => {
        profileMap[p.id] = p;
      });
      const enriched = ordersData.map((o) => ({
        ...o,
        customerName: profileMap[o.user_id]?.full_name || "Unknown Customer",
        customerEmail: profileMap[o.user_id]?.email || ""
      }));
      setOrders(enriched);
      if (enriched.length > 0 && !selectedId) setSelectedId(enriched[0].id);
    } catch (err) {
      console.error("IntakePipeline fetch error:", err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  reactExports.useEffect(() => {
    fetchOrders();
  }, []);
  const pending = orders.filter((o) => o.status === "pending" || o.status === "processing");
  const flagged = orders.filter((o) => o.status === "rejected");
  const active = orders.find((o) => o.id === selectedId) ?? null;
  const handleAuthorize = async () => {
    if (!active) return;
    try {
      const { error } = await supabase.from("apparel_orders").update({ status: "approved" }).eq("id", active.id);
      if (error) throw error;
      setOrders((prev) => prev.map((o) => o.id === active.id ? { ...o, status: "approved" } : o));
      const next = pending.find((o) => o.id !== active.id);
      setSelectedId(next?.id ?? "");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };
  const handleFlag = async () => {
    if (!active) return;
    if (!flagVisible) {
      setFlagVisible(true);
      return;
    }
    if (!flagText.trim()) return;
    try {
      const { error } = await supabase.from("apparel_orders").update({ status: "rejected" }).eq("id", active.id);
      if (error) throw error;
      setOrders((prev) => prev.map((o) => o.id === active.id ? { ...o, status: "rejected" } : o));
      setFlagVisible(false);
      setFlagText("");
      const next = pending.find((o) => o.id !== active.id);
      setSelectedId(next?.id ?? "");
    } catch (err) {
      alert("Failed: " + err.message);
    }
  };
  if (loading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-xs tracking-widest uppercase font-mono", children: "Loading Orders..." })
    ] }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-6 rounded-full bg-[#DFFF00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase", children: "The Intake Pipeline" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-white/35 ml-5", children: [
          "Live Order Queue — ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#DFFF00]/60", children: [
            pending.length,
            " pending"
          ] }),
          " · ",
          orders.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: fetchOrders,
          disabled: refreshing,
          className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? "opacity-50" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}` }),
            "Refresh"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Total Orders", value: orders.length, color: "text-white" },
      { label: "Pending Review", value: pending.length, color: "text-yellow-400" },
      { label: "Approved", value: orders.filter((o) => o.status === "approved" || o.status === "shipped" || o.status === "delivered").length, color: "text-green-400" },
      { label: "Flagged", value: flagged.length, color: "text-red-400" }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 rounded-xl border border-white/[0.08] bg-white/[0.03]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-wider text-white/25 uppercase", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-xl mt-1 ${s.color}`, children: s.value })
    ] }, i)) }),
    orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-24 text-white/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-10 h-10 text-[#DFFF00]/20 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] tracking-wider uppercase", children: "No orders in the system yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/15 mt-1", children: "Orders will appear here when customers place them" })
    ] }),
    orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-white/[0.08] bg-white/[0.02] overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3 border-b border-white/[0.06] flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-[0.15em] text-white/30 uppercase font-medium", children: "Order Queue" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] text-white/20 font-mono", children: [
            orders.length,
            " orders"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-white/[0.04] max-h-[480px] overflow-y-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: orders.map((order) => {
          const isSelected = order.id === selectedId;
          const statusCls = STATUS_COLORS[order.status] ?? STATUS_COLORS.pending;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.button,
            {
              layout: true,
              initial: { opacity: 0, x: -10 },
              animate: { opacity: 1, x: 0 },
              exit: { opacity: 0, x: -20 },
              onClick: () => {
                setSelectedId(order.id);
                setFlagVisible(false);
              },
              className: `w-full flex items-start gap-3 px-4 py-3.5 text-left transition-colors ${isSelected ? "bg-[#DFFF00]/[0.05] border-l-2 border-[#DFFF00]/50" : "hover:bg-white/[0.02] border-l-2 border-transparent"}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-4 h-4 text-white/20" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-0.5 flex-wrap", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono tracking-wider text-[12px] text-white/70 truncate", children: order.product_name || "Custom Order" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-semibold px-1.5 py-0.5 rounded border uppercase ${statusCls}`, children: order.status })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/35 truncate", children: order.customerName }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[10px] text-white/20 font-mono mt-0.5", children: [
                    "₹",
                    Number(order.price || 0).toLocaleString("en-IN"),
                    " · ",
                    new Date(order.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })
                  ] })
                ] })
              ]
            },
            order.id
          );
        }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/[0.08] bg-white/[0.03] overflow-hidden", children: active ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-3 border-b border-white/[0.06]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-[#DFFF00]/60 flex-shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[13px] text-[#DFFF00] truncate", children: active.id.slice(0, 8).toUpperCase() }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] text-white/25 uppercase hidden sm:block truncate", children: active.product_name })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-white/20 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px]", children: new Date(active.created_at).toLocaleDateString("en-IN") })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-[16/7] rounded-lg border border-white/[0.06] overflow-hidden bg-white/[0.015]", children: [
          active.blueprint_url ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: active.blueprint_url, alt: "Blueprint", className: "w-full h-full object-contain" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-2 text-white/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { className: "w-10 h-10" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-wider uppercase", children: "No Blueprint Uploaded" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 inset-x-0 px-3 py-1.5 bg-gradient-to-t from-black/60 to-transparent", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] text-white/40 uppercase tracking-wider", children: "Customer Blueprint" }) })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-[0.15em] text-white/25 uppercase mb-2.5", children: "Auto QC Checklist" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-2", children: CHECKLIST.map((item) => {
            const pass = checkValue(active, item.key);
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-3 py-2.5 rounded-lg border ${pass ? "bg-emerald-500/[0.06] border-emerald-500/20 text-emerald-400" : "bg-red-500/[0.06] border-red-500/20 text-red-400"}`, children: [
              pass ? /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 flex-shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-3 h-3 opacity-60 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-medium leading-tight", children: item.label })
            ] }, item.key);
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 pb-3 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-white/20" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/50", children: active.customerName })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25", children: active.customerEmail })
          ] }),
          active.shipping_address && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/20 leading-relaxed", children: active.shipping_address })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-[11px]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-3 h-3" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#DFFF00]/60 font-mono", children: [
              "₹",
              Number(active.price || 0).toLocaleString("en-IN")
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] px-1.5 py-0.5 rounded border uppercase font-semibold ${STATUS_COLORS[active.status] ?? STATUS_COLORS.pending}`, children: active.status })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: flagVisible && /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, height: 0 },
            animate: { opacity: 1, height: "auto" },
            exit: { opacity: 0, height: 0 },
            className: "px-5 overflow-hidden",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "textarea",
              {
                value: flagText,
                onChange: (e) => setFlagText(e.target.value),
                placeholder: "Describe the issue or required revisions...",
                className: "w-full h-20 px-4 py-3 rounded-lg border border-white/[0.08] bg-white/[0.03] text-[13px] text-white/80 placeholder:text-white/20 resize-none focus:outline-none focus:border-[#DFFF00]/30 transition-colors"
              }
            )
          }
        ) }),
        (active.status === "pending" || active.status === "processing") && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 px-5 py-4 mt-auto border-t border-white/[0.06]", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleFlag,
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-red-500/30 bg-red-500/[0.08] text-red-400 text-[11px] font-semibold tracking-wider uppercase hover:bg-red-500/[0.15] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-3.5 h-3.5" }),
                flagVisible ? "Submit Flag" : "Flag Revision"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: handleAuthorize,
              className: "flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-[#DFFF00] text-[#08080A] text-[11px] font-semibold tracking-wider uppercase hover:bg-[#DFFF00]/90 transition-colors shadow-[0_0_20px_rgba(223,255,0,0.15)]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-3.5 h-3.5" }),
                "Authorize"
              ]
            }
          )
        ] }),
        active.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 mt-auto border-t border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-emerald-400 text-[11px] font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4" }),
          "Order approved and sent to production"
        ] }) }),
        active.status === "rejected" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 mt-auto border-t border-white/[0.06]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-red-400 text-[11px] font-semibold", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTriangle, { className: "w-4 h-4" }),
          "Order flagged for revision"
        ] }) })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-white/20", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-8 h-8 text-[#DFFF00]/20 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-wider uppercase", children: "Select an order to inspect" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: flagged.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-6 rounded-full bg-red-500" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[12px] font-semibold tracking-[0.12em] text-red-400/70 uppercase", children: [
          "Flagged Orders (",
          flagged.length,
          ")"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: flagged.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-5 py-3 rounded-lg border border-red-500/10 bg-red-500/[0.02]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-red-400/60", children: item.id.slice(0, 8).toUpperCase() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[11px] text-white/30 flex-1 truncate", children: [
          item.customerName,
          " — ",
          item.product_name
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => {
              setSelectedId(item.id);
              setFlagVisible(false);
            },
            className: "text-[10px] text-white/30 hover:text-white border border-white/10 px-2 py-1 rounded",
            children: "View"
          }
        )
      ] }, item.id)) })
    ] }) })
  ] });
}
const fmt$1 = (v) => new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0
}).format(v);
function PayoutMatrix() {
  const [orders, setOrders] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const [filter, setFilter] = reactExports.useState("all");
  const fetch = async () => {
    setRefreshing(true);
    try {
      const { data: raw, error } = await supabase.from("apparel_orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!raw) {
        setOrders([]);
        return;
      }
      const uids = [...new Set(raw.map((o) => o.user_id))];
      const { data: profs } = await supabase.from("profiles").select("id,full_name,email").in("id", uids);
      const pm = {};
      profs?.forEach((p) => {
        pm[p.id] = { name: p.full_name || "Unknown", email: p.email || "" };
      });
      setOrders(raw.map((o) => ({
        id: o.id,
        product_name: o.product_name || "Custom Order",
        price: Number(o.price) || 0,
        status: o.status,
        created_at: o.created_at,
        customerName: pm[o.user_id]?.name || "Unknown",
        customerEmail: pm[o.user_id]?.email || "",
        marginPct: 25,
        marginLocked: false,
        cleared: ["approved", "delivered"].includes(o.status)
      })));
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  reactExports.useEffect(() => {
    fetch();
  }, []);
  const updateMargin = (id, v) => setOrders((p) => p.map((o) => o.id === id ? { ...o, marginPct: v } : o));
  const toggleLock = (id) => setOrders((p) => p.map((o) => o.id === id ? { ...o, marginLocked: !o.marginLocked } : o));
  const markCleared = async (id) => {
    try {
      await supabase.from("apparel_orders").update({ status: "approved" }).eq("id", id);
      setOrders((p) => p.map((o) => o.id === id ? { ...o, cleared: true, status: "approved" } : o));
    } catch (e) {
      alert(e.message);
    }
  };
  const filtered = filter === "all" ? orders : filter === "cleared" ? orders.filter((o) => o.cleared) : orders.filter((o) => !o.cleared);
  const pendingCount = orders.filter((o) => !o.cleared).length;
  const clearedCount = orders.filter((o) => o.cleared).length;
  const totalVault = orders.reduce((s, o) => s + o.price * (o.marginPct / 100), 0);
  const totalRevenue = orders.reduce((s, o) => s + o.price, 0);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/25 text-xs tracking-widest uppercase font-mono", children: "Loading Ledger..." })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-6 rounded-full bg-[#DFFF00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase", children: "Split Payout Matrix" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-white/35 ml-5", children: [
          "Live financial ledger — ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#DFFF00]/60", children: [
            pendingCount,
            " pending"
          ] }),
          " · ",
          orders.length,
          " total"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: fetch,
          disabled: refreshing,
          className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? "opacity-50" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Refresh" })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Total Revenue", value: fmt$1(totalRevenue), color: "text-white" },
      { label: "Pending Payout", value: String(pendingCount), color: "text-yellow-400" },
      { label: "Cleared", value: String(clearedCount), color: "text-emerald-400" },
      { label: "Admin Vault", value: fmt$1(totalVault), color: "text-[#DFFF00]", icon: true }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-4 py-3.5 rounded-xl border backdrop-blur-xl ${s.icon ? "border-[#DFFF00]/10 bg-[#DFFF00]/[0.02]" : "border-white/[0.08] bg-white/[0.03]"}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-[9px] tracking-wider uppercase flex items-center gap-1 ${s.icon ? "text-[#DFFF00]/40" : "text-white/25"}`, children: [
        s.icon && /* @__PURE__ */ jsxRuntimeExports.jsx(Vault, { className: "w-2.5 h-2.5" }),
        s.label
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-lg sm:text-xl mt-1 ${s.color}`, children: s.value })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
      ["all", "pending", "cleared"].map((f) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setFilter(f),
          className: `px-3 py-1.5 rounded-md text-[10px] tracking-wider uppercase font-medium transition-colors ${filter === f ? "bg-[#DFFF00]/[0.08] border border-[#DFFF00]/20 text-[#DFFF00]" : "border border-white/[0.06] bg-white/[0.02] text-white/35 hover:text-white/50"}`,
          children: f
        },
        f
      )),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-white/20", children: [
        filtered.length,
        " rows"
      ] })
    ] }),
    orders.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-20 text-white/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-10 h-10 text-[#DFFF00]/10 mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-wider uppercase", children: "No transactions yet" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/15 mt-1", children: "Orders will appear here once customers place them" })
    ] }),
    orders.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/[0.08] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", style: { WebkitOverflowScrolling: "touch" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[780px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/[0.06] bg-white/[0.01]", children: ["Order", "Customer", "Price", "Margin %", "Admin Cut", "Vendor Pay", "Status", "Action"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[9px] tracking-[0.13em] text-white/25 uppercase font-medium whitespace-nowrap first:pl-5 last:pr-5 last:text-right", children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((order) => {
        const adminCut = order.price * (order.marginPct / 100);
        const vendorPay = order.price - adminCut;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.tr,
          {
            layout: true,
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            exit: { opacity: 0, x: -30, transition: { duration: 0.2 } },
            className: `border-b border-white/[0.04] hover:bg-white/[0.015] transition-colors ${order.cleared ? "bg-emerald-500/[0.01]" : ""}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "pl-5 pr-4 py-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-[11px] ${order.cleared ? "text-emerald-400/50" : "text-[#DFFF00]/80"}`, children: order.id.slice(0, 8).toUpperCase() }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/25 mt-0.5 max-w-[100px] truncate", children: order.product_name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-4 py-3.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] text-white/50 whitespace-nowrap", children: order.customerName }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/20 truncate max-w-[120px]", children: order.customerEmail })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-white/60 whitespace-nowrap", children: fmt$1(order.price) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 min-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    onClick: () => toggleLock(order.id),
                    className: `p-1 rounded border flex-shrink-0 transition-colors ${order.marginLocked ? "border-[#DFFF00]/20 bg-[#DFFF00]/[0.06] text-[#DFFF00]" : "border-white/[0.06] bg-white/[0.02] text-white/25 hover:text-white/40"}`,
                    children: order.marginLocked ? /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Unlock, { className: "w-3 h-3" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "range",
                    min: "5",
                    max: "60",
                    step: "0.5",
                    value: order.marginPct,
                    onChange: (e) => updateMargin(order.id, Number(e.target.value)),
                    disabled: order.marginLocked,
                    className: `flex-1 h-1 rounded-full appearance-none cursor-pointer accent-[#DFFF00] bg-white/[0.08] ${order.marginLocked ? "opacity-30 cursor-not-allowed" : ""}`
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `font-mono text-[11px] text-[#DFFF00]/70 w-9 text-right flex-shrink-0 ${order.marginLocked ? "opacity-50" : ""}`, children: [
                  order.marginPct.toFixed(1),
                  "%"
                ] })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-[#DFFF00]/60 whitespace-nowrap", children: fmt$1(adminCut) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-white/40 whitespace-nowrap", children: fmt$1(vendorPay) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-semibold px-2 py-1 rounded border uppercase whitespace-nowrap ${order.cleared ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : "text-yellow-400 bg-yellow-400/10 border-yellow-400/20"}`, children: order.status }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pl-4 pr-5 py-3.5 text-right", children: !order.cleared ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  onClick: () => markCleared(order.id),
                  className: "px-3 py-1.5 rounded-md border border-emerald-500/20 bg-emerald-500/[0.06] text-[10px] tracking-wider text-emerald-400 uppercase hover:bg-emerald-500/[0.12] transition-colors whitespace-nowrap",
                  children: "Clear"
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(CheckCircle2, { className: "w-4 h-4 text-emerald-400/30 inline" }) })
            ]
          },
          order.id
        );
      }) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 sm:gap-6 px-1 flex-wrap", children: [
      { c: "bg-white/[0.15]", l: "Customer Retail" },
      { c: "bg-[#DFFF00]/30", l: "Admin Vault" },
      { c: "bg-white/[0.08]", l: "Vendor Payout" }
    ].map((x) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-3 h-3 rounded-sm ${x.c}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-wider text-white/25 uppercase", children: x.l })
    ] }, x.l)) })
  ] });
}
const FACTORIES = [
  {
    id: "F1",
    name: "Delhi Digital Hub",
    city: "New Delhi",
    region: "North",
    isActive: true,
    capacityPct: 72,
    inventory: [{ material: "Oversized Cotton Black", status: "IN_STOCK" }, { material: "Heavyweight Fleece 320 GSM", status: "LOW_STOCK" }, { material: "Premium Poly-Blend White", status: "IN_STOCK" }]
  },
  {
    id: "F2",
    name: "Tirupur Knitwear Node",
    city: "Tirupur",
    region: "South",
    isActive: true,
    capacityPct: 58,
    inventory: [{ material: "Oversized Cotton Black", status: "IN_STOCK" }, { material: "Terry-Cotton Grey", status: "IN_STOCK" }, { material: "Lightweight Jersey 180 GSM", status: "OUT_OF_STOCK" }]
  },
  {
    id: "F3",
    name: "Mumbai Edge Print",
    city: "Mumbai",
    region: "West",
    isActive: true,
    capacityPct: 89,
    inventory: [{ material: "Heavyweight Fleece 320 GSM", status: "IN_STOCK" }, { material: "Oversized Cotton Black", status: "LOW_STOCK" }, { material: "Slim-Fit Cotton Navy", status: "IN_STOCK" }]
  },
  {
    id: "F4",
    name: "Bangalore Precision Press",
    city: "Bangalore",
    region: "South",
    isActive: true,
    capacityPct: 34,
    inventory: [{ material: "Premium Poly-Blend White", status: "IN_STOCK" }, { material: "Oversized Cotton Black", status: "LOW_STOCK" }, { material: "Slim-Fit Cotton Navy", status: "IN_STOCK" }]
  },
  {
    id: "F5",
    name: "Jaipur Textile Forge",
    city: "Jaipur",
    region: "North",
    isActive: true,
    capacityPct: 45,
    inventory: [{ material: "Heavyweight Fleece 320 GSM", status: "OUT_OF_STOCK" }, { material: "Oversized Cotton Black", status: "IN_STOCK" }, { material: "Lightweight Jersey 180 GSM", status: "LOW_STOCK" }]
  },
  {
    id: "F6",
    name: "Chennai Silks Unit",
    city: "Chennai",
    region: "South",
    isActive: false,
    capacityPct: 0,
    inventory: [{ material: "Oversized Cotton Black", status: "OUT_OF_STOCK" }, { material: "Heavyweight Fleece 320 GSM", status: "OUT_OF_STOCK" }]
  }
];
const STOCK_STYLES = {
  IN_STOCK: { bg: "bg-emerald-500/[0.06]", border: "border-emerald-500/20", text: "text-emerald-400", dot: "bg-emerald-400" },
  LOW_STOCK: { bg: "bg-yellow-500/[0.06]", border: "border-yellow-500/20", text: "text-yellow-400", dot: "bg-yellow-400" },
  OUT_OF_STOCK: { bg: "bg-red-500/[0.06]", border: "border-red-500/20", text: "text-red-400", dot: "bg-red-400" }
};
function CapacityBar({ pct }) {
  const color = pct >= 80 ? "bg-red-400" : pct >= 60 ? "bg-yellow-400" : "bg-[#DFFF00]";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-1.5 rounded-full bg-white/[0.06] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { className: `h-full rounded-full ${color}`, initial: { width: 0 }, animate: { width: `${pct}%` }, transition: { duration: 0.8, ease: "easeOut" } }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-[11px] text-white/40 w-8 text-right", children: [
      pct,
      "%"
    ] })
  ] });
}
function StockPill({ material, status }) {
  const s = STOCK_STYLES[status] ?? STOCK_STYLES.OUT_OF_STOCK;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-[9px] tracking-wider uppercase font-medium border ${s.bg} ${s.border} ${s.text}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `w-1.5 h-1.5 rounded-full flex-shrink-0 ${s.dot}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[120px]", children: material })
  ] });
}
function RouteDropdown({ currentFactoryId, onSelect }) {
  const [open, setOpen] = reactExports.useState(false);
  const current = FACTORIES.find((f) => f.id === currentFactoryId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative inline-block", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => setOpen(!open),
        className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-white/[0.08] bg-white/[0.03] text-[10px] tracking-wider text-white/50 hover:text-white/70 hover:border-white/[0.12] transition-colors",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRightLeft, { className: "w-3 h-3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate max-w-[100px] hidden sm:block", children: current?.name ?? "---" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: `w-3 h-3 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}` })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        className: "absolute top-full mt-1 right-0 w-52 rounded-lg border border-white/[0.08] bg-[#08080A]/98 backdrop-blur-xl z-50 shadow-xl overflow-hidden",
        children: FACTORIES.filter((f) => f.isActive).map((f) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => {
              onSelect(f.id);
              setOpen(false);
            },
            className: `w-full flex items-center gap-2 px-3 py-2.5 text-left text-[11px] tracking-wider hover:bg-white/[0.04] transition-colors ${f.id === currentFactoryId ? "text-[#DFFF00]/70" : "text-white/50"}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-3 h-3 flex-shrink-0 opacity-50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: f.name }),
              f.id === currentFactoryId && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-[9px] text-[#DFFF00]/40 uppercase flex-shrink-0", children: "Active" })
            ]
          },
          f.id
        ))
      }
    ) })
  ] });
}
function VendorFleet() {
  const [routes, setRoutes] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [refreshing, setRefreshing] = reactExports.useState(false);
  const fetchRoutes = async () => {
    setRefreshing(true);
    try {
      const { data: orders, error } = await supabase.from("apparel_orders").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      if (!orders) {
        setRoutes([]);
        return;
      }
      const uids = [...new Set(orders.map((o) => o.user_id))];
      const { data: profs } = await supabase.from("profiles").select("id,full_name").in("id", uids);
      const pm = {};
      profs?.forEach((p) => {
        pm[p.id] = p.full_name || "Unknown";
      });
      setRoutes(orders.map((o, i) => ({
        id: o.id,
        orderId: o.id.slice(0, 8).toUpperCase(),
        productName: o.product_name || "Custom Order",
        customerName: pm[o.user_id] || "Unknown",
        factoryId: FACTORIES[i % 5].id,
        // round robin active factories
        isOverride: false,
        status: o.status
      })));
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };
  reactExports.useEffect(() => {
    fetchRoutes();
  }, []);
  const handleReroute = async (routeId, newFactoryId) => {
    setRoutes((p) => p.map((r) => r.id === routeId ? { ...r, factoryId: newFactoryId, isOverride: true } : r));
  };
  const handleDispatch = async (routeId) => {
    try {
      await supabase.from("apparel_orders").update({ status: "shipped" }).eq("id", routeId);
      setRoutes((p) => p.map((r) => r.id === routeId ? { ...r, status: "shipped" } : r));
    } catch (e) {
      alert(e.message);
    }
  };
  const activeFactories = FACTORIES.filter((f) => f.isActive);
  const offlineFactories = FACTORIES.filter((f) => !f.isActive);
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 border-2 border-[#DFFF00]/30 border-t-[#DFFF00] rounded-full animate-spin" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/25 text-xs tracking-widest uppercase font-mono", children: "Loading Fleet..." })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-6 rounded-full bg-[#DFFF00]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[13px] font-semibold tracking-[0.14em] text-white/90 uppercase", children: "Vendor Fleet Dispatch" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[12px] text-white/35 ml-5", children: [
          "Order routing engine — ",
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#DFFF00]/60", children: [
            activeFactories.length,
            " active"
          ] }),
          " · ",
          FACTORIES.length,
          " print houses"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: fetchRoutes,
          disabled: refreshing,
          className: `flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-white/[0.03] text-white/40 hover:text-white/60 text-[11px] tracking-wider transition-colors ${refreshing ? "opacity-50" : ""}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: `w-3.5 h-3.5 ${refreshing ? "animate-spin" : ""}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Refresh" })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-4 gap-3", children: [
      { label: "Active Houses", value: activeFactories.length, color: "text-[#DFFF00]" },
      { label: "Orders Routing", value: routes.length, color: "text-white" },
      { label: "Dispatched", value: routes.filter((r) => r.status === "shipped" || r.status === "delivered").length, color: "text-emerald-400" },
      { label: "Manual Overrides", value: routes.filter((r) => r.isOverride).length, color: "text-orange-400" }
    ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3.5 rounded-xl border border-white/[0.08] bg-white/[0.03]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[9px] tracking-wider text-white/25 uppercase", children: s.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `font-mono text-xl mt-1 ${s.color}`, children: s.value })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3.5 h-3.5 text-[#DFFF00]/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-[11px] font-semibold tracking-[0.12em] text-white/50 uppercase", children: "Connected Print Houses" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-[10px] text-white/20", children: [
          activeFactories.length,
          " online · ",
          offlineFactories.length,
          " offline"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4", children: FACTORIES.map((factory) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          layout: true,
          className: `rounded-xl border transition-colors duration-200 ${factory.isActive ? "border-white/[0.08] bg-white/[0.03] hover:border-white/[0.12]" : "border-white/[0.04] bg-white/[0.01] opacity-40"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-4 border-b border-white/[0.06]", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-2 h-2 rounded-full flex-shrink-0 ${factory.isActive ? "bg-[#DFFF00] animate-pulse" : "bg-white/15"}` }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-[11px] font-semibold tracking-[0.1em] text-white/85 uppercase truncate", children: factory.name })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[9px] text-white/20 uppercase flex items-center gap-1 flex-shrink-0 ml-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { className: "w-2.5 h-2.5" }),
                  factory.city
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Gauge, { className: "w-3 h-3 text-white/20 flex-shrink-0" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(CapacityBar, { pct: factory.capacityPct })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 sm:px-5 py-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-3 h-3 text-white/20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] tracking-wider text-white/20 uppercase", children: "Inventory" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: factory.inventory.map((inv, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(StockPill, { material: inv.material, status: inv.status }, idx)) })
            ] })
          ]
        },
        factory.id
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-6 rounded-full bg-[#DFFF00]/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "text-[12px] font-semibold tracking-[0.12em] text-white/70 uppercase", children: [
          "Live Order Routing (",
          routes.length,
          ")"
        ] })
      ] }),
      routes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center py-16 text-white/20 border border-white/[0.06] rounded-xl", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-10 h-10 text-[#DFFF00]/10 mb-3" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11px] tracking-wider uppercase", children: "No orders to route yet" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-white/15 mt-1", children: "Orders appear here once customers place them" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl border border-white/[0.08] overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", style: { WebkitOverflowScrolling: "touch" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[640px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-white/[0.06] bg-white/[0.01]", children: ["Order", "Customer", "Product", "Destination", "Status", "Override", "Action"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-4 py-3 text-left text-[9px] tracking-[0.13em] text-white/25 uppercase font-medium whitespace-nowrap first:pl-5 last:pr-5 last:text-right", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: routes.map((route, idx) => {
          const dest = FACTORIES.find((f) => f.id === route.factoryId);
          const statusColor = route.status === "shipped" || route.status === "delivered" ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20" : route.status === "approved" || route.status === "processing" ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-white/40 bg-white/5 border-white/10";
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "tr",
            {
              className: `border-b border-white/[0.04] hover:bg-white/[0.02] transition-colors ${idx === routes.length - 1 ? "border-b-0" : ""}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "pl-5 pr-4 py-3.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-[12px] text-[#DFFF00]/70", children: route.orderId }),
                  route.isOverride && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1.5 text-[8px] text-orange-400/50 uppercase px-1.5 py-0.5 rounded border border-orange-400/15 bg-orange-400/[0.05]", children: "Override" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-3 h-3 text-white/20 flex-shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/40 truncate max-w-[100px]", children: route.customerName })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/50 truncate max-w-[120px] block", children: route.productName }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-white/40", children: dest?.name ?? "---" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-semibold px-2 py-1 rounded border uppercase whitespace-nowrap ${statusColor}`, children: route.status }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 text-[10px] text-white/25", children: route.isOverride ? "Manual" : "Auto" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "pl-4 pr-5 py-3.5 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RouteDropdown,
                    {
                      currentFactoryId: route.factoryId,
                      onSelect: (newId) => handleReroute(route.id, newId)
                    }
                  ),
                  route.status === "approved" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      onClick: () => handleDispatch(route.id),
                      className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border border-purple-400/20 bg-purple-400/[0.06] text-[10px] text-purple-400 uppercase tracking-wider hover:bg-purple-400/[0.12] transition-colors whitespace-nowrap",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Truck, { className: "w-3 h-3" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:block", children: "Dispatch" })
                      ]
                    }
                  )
                ] }) })
              ]
            },
            route.id
          );
        }) })
      ] }) }) })
    ] })
  ] });
}
function useTheme(dark) {
  return {
    bg: dark ? "bg-[#08080A]" : "bg-[#F7F6F3]",
    sidebar: dark ? "bg-[#0D0D0F]" : "bg-white",
    card: dark ? "bg-white/[0.03] border-white/[0.08]" : "bg-white border-[#E8E6E0]",
    border: dark ? "border-white/[0.08]" : "border-[#E8E6E0]",
    text: dark ? "text-white/90" : "text-[#1a1a18]",
    textMut: dark ? "text-white/40" : "text-[#888880]",
    textDim: dark ? "text-white/20" : "text-[#BBBBBB]",
    accent: dark ? "bg-[#DFFF00]" : "bg-[#1a1a18]",
    accentT: dark ? "text-[#08080A]" : "text-white",
    accentHl: dark ? "text-[#DFFF00]" : "text-[#1a1a18]",
    navActive: dark ? "bg-[#DFFF00]/[0.08] border border-[#DFFF00]/20 text-[#DFFF00]" : "bg-[#1a1a18]/[0.06] border border-[#1a1a18]/10 text-[#1a1a18]",
    navIdle: dark ? "text-white/35 hover:text-white/60 hover:bg-white/[0.03] border border-transparent" : "text-[#888880] hover:text-[#1a1a18] hover:bg-black/[0.03] border border-transparent",
    pill: dark ? "bg-white/5 text-white/50 border-white/10" : "bg-black/5 text-[#555] border-black/10",
    pillAct: dark ? "bg-[#DFFF00] text-[#08080A] border-transparent" : "bg-[#1a1a18] text-white border-transparent",
    input: dark ? "bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/20 focus:border-[#DFFF00]/30" : "bg-white border-[#E8E6E0] text-[#1a1a18] placeholder:text-[#BBBBBB] focus:border-[#1a1a18]/30",
    table: dark ? "border-white/[0.06]" : "border-[#E8E6E0]",
    tableRow: dark ? "hover:bg-white/[0.02] border-white/[0.04]" : "hover:bg-[#F7F6F3] border-[#E8E6E0]",
    badge: {
      pending: dark ? "text-yellow-400 bg-yellow-400/10 border-yellow-400/20" : "text-yellow-700 bg-yellow-50 border-yellow-200",
      approved: dark ? "text-green-400 bg-green-400/10 border-green-400/20" : "text-green-700 bg-green-50 border-green-200",
      shipped: dark ? "text-purple-400 bg-purple-400/10 border-purple-400/20" : "text-purple-700 bg-purple-50 border-purple-200",
      delivered: dark ? "text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20" : "text-lime-700 bg-lime-50 border-lime-200",
      rejected: dark ? "text-red-400 bg-red-400/10 border-red-400/20" : "text-red-700 bg-red-50 border-red-200",
      processing: dark ? "text-blue-400 bg-blue-400/10 border-blue-400/20" : "text-blue-700 bg-blue-50 border-blue-200"
    }
  };
}
const fmt = (v) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(v);
function OverviewTab({ dark, t }) {
  const [stats, setStats] = reactExports.useState(null);
  const [recent, setRecent] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const fetchData = reactExports.useCallback(async () => {
    setLoading(true);
    try {
      const [ordersRes, profilesRes] = await Promise.all([
        supabase.from("apparel_orders").select("*").order("created_at", { ascending: false }),
        supabase.from("profiles").select("id, full_name, role, email")
      ]);
      const orders = ordersRes.data || [];
      const profiles = profilesRes.data || [];
      const profileMap = {};
      profiles.forEach((p) => {
        profileMap[p.id] = p.full_name || "Unknown";
      });
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1e3);
      const totalRevenue = orders.reduce((s, o) => s + Number(o.price || 0), 0);
      setStats({
        totalOrders: orders.length,
        pendingOrders: orders.filter((o) => ["pending", "processing"].includes(o.status)).length,
        totalRevenue,
        activeVendors: profiles.filter((p) => p.role === "VENDOR").length,
        totalCustomers: profiles.filter((p) => !["ADMIN", "VENDOR"].includes(p.role)).length,
        ordersThisWeek: orders.filter((o) => new Date(o.created_at) > weekAgo).length
      });
      setRecent(orders.slice(0, 8).map((o) => ({
        id: o.id,
        product_name: o.product_name || "Custom Order",
        price: Number(o.price || 0),
        status: o.status,
        created_at: o.created_at,
        customerName: profileMap[o.user_id] || "Unknown"
      })));
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  }, []);
  reactExports.useEffect(() => {
    fetchData();
  }, [fetchData]);
  const statCards = stats ? [
    { label: "Total Orders", value: stats.totalOrders, sub: `${stats.ordersThisWeek} this week`, icon: Package, color: dark ? "text-[#DFFF00]" : "text-[#1a1a18]" },
    { label: "Pending Review", value: stats.pendingOrders, sub: "awaiting approval", icon: Clock, color: "text-yellow-500" },
    { label: "Total Revenue", value: fmt(stats.totalRevenue), sub: "all time", icon: TrendingUp, color: "text-emerald-500" },
    { label: "Active Vendors", value: stats.activeVendors, sub: "registered", icon: UserCheck, color: "text-blue-500" },
    { label: "Customers", value: stats.totalCustomers, sub: "registered users", icon: Users, color: "text-purple-500" },
    { label: "Completed", value: stats.totalOrders - stats.pendingOrders, sub: "processed", icon: CheckCircle2, color: "text-emerald-500" }
  ] : [];
  if (loading) return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center py-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 border-2 rounded-full animate-spin ${dark ? "border-[#DFFF00]/30 border-t-[#DFFF00]" : "border-[#1a1a18]/20 border-t-[#1a1a18]"}` }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs tracking-widest uppercase font-mono ${t.textMut}`, children: "Loading Dashboard..." })
  ] }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-2xl font-semibold tracking-tight ${t.text}`, children: "Command Overview" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-sm mt-1 ${t.textMut}`, children: (/* @__PURE__ */ new Date()).toLocaleDateString("en-IN", { weekday: "long", year: "numeric", month: "long", day: "numeric" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: fetchData, className: `flex items-center gap-2 px-3 py-2 rounded-lg border text-xs tracking-wider transition-colors ${t.card} ${t.textMut} hover:${t.text}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }),
        " Refresh"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4", children: statCards.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { delay: i * 0.05 },
        className: `p-4 rounded-xl border ${t.card}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] uppercase tracking-wider ${t.textMut}`, children: s.label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: `w-3.5 h-3.5 ${s.color}` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-2xl font-semibold tracking-tight ${t.text}`, children: s.value }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[10px] mt-1 ${t.textDim}`, children: s.sub })
        ]
      },
      i
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border overflow-hidden ${t.card}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center justify-between px-5 py-4 border-b ${t.border}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: `w-4 h-4 ${t.accentHl}` }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-sm font-medium ${t.text}`, children: "Recent Orders" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: `text-[10px] uppercase tracking-wider ${t.textDim}`, children: [
          recent.length,
          " shown"
        ] })
      ] }),
      recent.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center justify-center py-16 ${t.textDim}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { className: "w-10 h-10 mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs tracking-wider uppercase", children: "No orders yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full min-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: `border-b text-left ${t.border}`, children: ["Order ID", "Customer", "Product", "Amount", "Status", "Date"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-5 py-3 text-[10px] uppercase tracking-wider font-medium ${t.textDim}`, children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.map((o, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b transition-colors ${t.tableRow} ${i === recent.length - 1 ? "border-0" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-xs ${t.accentHl}`, children: o.id.slice(0, 8).toUpperCase() }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textMut}`, children: o.customerName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.text} max-w-[140px] truncate block`, children: o.product_name }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-mono text-xs ${t.text}`, children: fmt(o.price) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-semibold px-2 py-1 rounded border uppercase ${t.badge[o.status] ?? t.badge.pending}`, children: o.status }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textDim}`, children: new Date(o.created_at).toLocaleDateString("en-IN") }) })
        ] }, o.id)) })
      ] }) })
    ] })
  ] });
}
function VendorsTab({ dark, t }) {
  const [vendors, setVendors] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [promoteEmail, setPromoteEmail] = reactExports.useState("");
  const [promoting, setPromoting] = reactExports.useState(false);
  const [msg, setMsg] = reactExports.useState("");
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const { data } = await supabase.from("profiles").select("*").eq("role", "VENDOR").order("created_at", { ascending: false });
      setVendors(data || []);
    } catch (e) {
      console.error(e.message);
    } finally {
      setLoading(false);
    }
  };
  reactExports.useEffect(() => {
    fetchVendors();
  }, []);
  const promoteUser = async () => {
    if (!promoteEmail.trim()) return;
    setPromoting(true);
    setMsg("");
    try {
      const { data: profile, error } = await supabase.from("profiles").select("id, email").eq("email", promoteEmail.trim()).maybeSingle();
      if (error || !profile) {
        setMsg("User not found. Make sure they have signed up first.");
        return;
      }
      await supabase.from("profiles").update({ role: "VENDOR" }).eq("id", profile.id);
      setMsg(`✓ ${promoteEmail} promoted to VENDOR`);
      setPromoteEmail("");
      fetchVendors();
    } catch (e) {
      setMsg("Error: " + e.message);
    } finally {
      setPromoting(false);
    }
  };
  const demoteVendor = async (id, name) => {
    if (!confirm(`Remove VENDOR role from ${name}?`)) return;
    await supabase.from("profiles").update({ role: "CUSTOMER" }).eq("id", id);
    fetchVendors();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-xl font-semibold ${t.text}`, children: "Vendor Management" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm mt-0.5 ${t.textMut}`, children: [
          vendors.length,
          " registered vendors"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: fetchVendors, className: `flex items-center gap-2 px-3 py-2 rounded-lg border text-xs ${t.card} ${t.textMut}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "w-3.5 h-3.5" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border p-5 ${t.card}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: `w-4 h-4 ${t.accentHl}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-sm font-medium ${t.text}`, children: "Promote User to Vendor" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "email",
            value: promoteEmail,
            onChange: (e) => setPromoteEmail(e.target.value),
            onKeyDown: (e) => e.key === "Enter" && promoteUser(),
            placeholder: "user@email.com",
            className: `flex-1 px-4 py-2.5 rounded-lg border text-sm outline-none transition-colors ${t.input}`
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: promoteUser,
            disabled: promoting,
            className: `px-5 py-2.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 ${t.accent} ${t.accentT}`,
            children: promoting ? "Promoting..." : "Promote"
          }
        )
      ] }),
      msg && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-xs mt-2 ${msg.startsWith("✓") ? "text-emerald-500" : "text-red-500"}`, children: msg })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `rounded-xl border overflow-hidden ${t.card}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-5 py-4 border-b ${t.border}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: `text-sm font-medium ${t.text}`, children: "Active Vendors" }) }),
      loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center py-16 ${t.textDim}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 border-2 rounded-full animate-spin ${dark ? "border-[#DFFF00]/20 border-t-[#DFFF00]" : "border-[#1a1a18]/20 border-t-[#1a1a18]"}` }) }) : vendors.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center py-16 ${t.textDim}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 mb-3 opacity-30" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider", children: "No vendors yet" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: `border-b ${t.border}`, children: ["Name", "Email", "Joined", "Role", "Actions"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-5 py-3 text-left text-[10px] uppercase tracking-wider ${t.textDim}`, children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: vendors.map((v, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b transition-colors ${t.tableRow} ${i === vendors.length - 1 ? "border-0" : ""}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium ${t.text}`, children: v.full_name || "—" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textMut}`, children: v.email }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textDim}`, children: new Date(v.created_at).toLocaleDateString("en-IN") }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[9px] font-semibold px-2 py-1 rounded border uppercase ${dark ? "text-[#DFFF00] bg-[#DFFF00]/10 border-[#DFFF00]/20" : "text-lime-700 bg-lime-50 border-lime-200"}`, children: "VENDOR" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => demoteVendor(v.id, v.full_name || v.email),
              className: `text-[10px] px-3 py-1.5 rounded-lg border transition-colors ${dark ? "border-red-500/20 text-red-400 hover:bg-red-500/10" : "border-red-200 text-red-600 hover:bg-red-50"}`,
              children: "Remove Role"
            }
          ) })
        ] }, v.id)) })
      ] }) })
    ] })
  ] });
}
function CustomersTab({ dark, t }) {
  const [customers, setCustomers] = reactExports.useState([]);
  const [loading, setLoading] = reactExports.useState(true);
  const [search, setSearch] = reactExports.useState("");
  reactExports.useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data: profiles } = await supabase.from("profiles").select("*").not("role", "in", '("ADMIN","VENDOR")').order("created_at", { ascending: false });
        const { data: orders } = await supabase.from("apparel_orders").select("user_id");
        const orderCount = {};
        orders?.forEach((o) => {
          orderCount[o.user_id] = (orderCount[o.user_id] || 0) + 1;
        });
        setCustomers((profiles || []).map((p) => ({ ...p, orderCount: orderCount[p.id] || 0 })));
      } catch (e) {
        console.error(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, []);
  const filtered = customers.filter(
    (c) => !search || c.full_name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase())
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: `text-xl font-semibold ${t.text}`, children: "Customer Registry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: `text-sm mt-0.5 ${t.textMut}`, children: [
          customers.length,
          " registered customers"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          value: search,
          onChange: (e) => setSearch(e.target.value),
          placeholder: "Search by name or email...",
          className: `w-full sm:w-64 px-4 py-2 rounded-lg border text-sm outline-none transition-colors ${t.input}`
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border overflow-hidden ${t.card}`, children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex items-center justify-center py-16 ${t.textDim}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-6 h-6 border-2 rounded-full animate-spin ${dark ? "border-[#DFFF00]/20 border-t-[#DFFF00]" : "border-[#1a1a18]/20 border-t-[#1a1a18]"}` }) }) : filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex flex-col items-center py-16 ${t.textDim}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-10 h-10 mb-3 opacity-30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs uppercase tracking-wider", children: "No customers found" })
    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: `border-b ${t.border}`, children: ["Name", "Email", "Orders", "Joined"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: `px-5 py-3 text-left text-[10px] uppercase tracking-wider ${t.textDim}`, children: h }, h)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: `border-b transition-colors ${t.tableRow} ${i === filtered.length - 1 ? "border-0" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-sm font-medium ${t.text}`, children: c.full_name || "—" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textMut}`, children: c.email }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-mono font-semibold ${c.orderCount > 0 ? t.accentHl : t.textDim}`, children: c.orderCount }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-5 py-3.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs ${t.textDim}`, children: new Date(c.created_at).toLocaleDateString("en-IN") }) })
      ] }, c.id)) })
    ] }) }) })
  ] });
}
const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, group: "main" },
  { id: "intake", label: "Intake Pipeline", icon: FileSearch, group: "ops" },
  { id: "fleet", label: "Vendor Fleet", icon: Truck, group: "ops" },
  { id: "payout", label: "Split Payout", icon: Banknote, group: "ops" },
  { id: "vendors", label: "Vendors", icon: UserCheck, group: "people" },
  { id: "customers", label: "Customers", icon: Users, group: "people" }
];
const TAB_COMPONENTS = {
  intake: IntakePipeline,
  payout: PayoutMatrix,
  fleet: VendorFleet
};
function AdminDashboard() {
  const [activeTab, setActiveTab] = reactExports.useState("overview");
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(false);
  const [dark, setDark] = reactExports.useState(true);
  const t = useTheme(dark);
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSidebarOpen(false);
  };
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };
  const SidebarContent = () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `px-5 py-5 border-b ${t.border}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-9 h-9 rounded-xl ${t.accent} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: `w-5 h-5 ${t.accentT}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: `text-[11px] font-bold tracking-[0.18em] uppercase ${t.text}`, children: "HYPERVAULT" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[9px] tracking-[0.12em] uppercase mt-0.5 ${t.accentHl}`, children: "Admin Console" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => setDark(!dark),
          className: `w-8 h-8 rounded-lg border ${t.border} flex items-center justify-center ${t.textMut} hover:${t.text} transition-colors`,
          children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-3.5 h-3.5" })
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 px-3 py-4 overflow-y-auto space-y-5", children: [
      { group: "main", label: "Dashboard" },
      { group: "ops", label: "Operations" },
      { group: "people", label: "People" }
    ].map(({ group, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `px-4 text-[9px] font-semibold uppercase tracking-[0.18em] mb-2 ${t.textDim}`, children: label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-1", children: NAV_ITEMS.filter((n) => n.group === group).map((item) => {
        const isActive = activeTab === item.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            onClick: () => handleTabChange(item.id),
            className: `relative w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left transition-all duration-150 text-[12px] font-medium tracking-[0.04em] ${isActive ? t.navActive : t.navIdle}`,
            children: [
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(
                motion.div,
                {
                  layoutId: "sidebar-active",
                  className: `absolute inset-0 rounded-xl ${dark ? "bg-[#DFFF00]/[0.08] border border-[#DFFF00]/[0.15]" : "bg-[#1a1a18]/[0.06] border border-[#1a1a18]/[0.1]"}`,
                  transition: { type: "spring", stiffness: 400, damping: 30 }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "relative w-4 h-4 flex-shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "relative", children: item.label }),
              isActive && /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "relative w-3 h-3 ml-auto opacity-40" })
            ]
          },
          item.id
        );
      }) })
    ] }, group)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `px-3 py-3 border-t ${t.border} space-y-1`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex items-center gap-2 px-4 py-2 ${t.textDim}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-1.5 h-1.5 rounded-full animate-pulse ${dark ? "bg-[#DFFF00]" : "bg-emerald-500"}` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] tracking-wider uppercase", children: "System Online" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          onClick: handleSignOut,
          className: `w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-left text-[12px] transition-all ${dark ? "text-red-400/50 hover:text-red-400 hover:bg-red-500/[0.06]" : "text-red-500/60 hover:text-red-600 hover:bg-red-50"} border border-transparent`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "w-4 h-4" }),
            "Sign Out"
          ]
        }
      )
    ] })
  ] });
  const renderContent = () => {
    if (activeTab === "overview") return /* @__PURE__ */ jsxRuntimeExports.jsx(OverviewTab, { dark, t });
    if (activeTab === "vendors") return /* @__PURE__ */ jsxRuntimeExports.jsx(VendorsTab, { dark, t });
    if (activeTab === "customers") return /* @__PURE__ */ jsxRuntimeExports.jsx(CustomersTab, { dark, t });
    const TabComponent = TAB_COMPONENTS[activeTab];
    if (TabComponent) return /* @__PURE__ */ jsxRuntimeExports.jsx(TabComponent, {});
    return null;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `min-h-screen transition-colors duration-300 ${t.bg}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 py-3 ${t.sidebar} border-b ${t.border}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `w-8 h-8 rounded-xl ${t.accent} flex items-center justify-center`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: `w-4 h-4 ${t.accentT}` }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: `text-[11px] font-bold tracking-[0.15em] uppercase ${t.text}`, children: "HYPERVAULT" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setDark(!dark),
            className: `w-8 h-8 rounded-xl border ${t.border} flex items-center justify-center ${t.textMut}`,
            children: dark ? /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, { className: "w-3.5 h-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, { className: "w-3.5 h-3.5" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            onClick: () => setSidebarOpen(!sidebarOpen),
            className: `w-9 h-9 rounded-xl border ${t.border} flex items-center justify-center ${t.textMut}`,
            children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "w-4 h-4" })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `lg:hidden fixed top-[52px] left-0 right-0 z-40 flex gap-2 px-4 py-2.5 ${t.sidebar} border-b ${t.border} overflow-x-auto`, style: { scrollbarWidth: "none" }, children: NAV_ITEMS.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        onClick: () => handleTabChange(item.id),
        className: `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-semibold tracking-wider uppercase whitespace-nowrap flex-shrink-0 transition-all border ${activeTab === item.id ? t.pillAct : t.pill}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, { className: "w-3 h-3" }),
          item.label.split(" ")[0]
        ]
      },
      item.id
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("aside", { className: `hidden lg:block fixed left-0 top-0 bottom-0 w-[240px] ${t.sidebar} border-r ${t.border} z-50`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setSidebarOpen(false),
          className: "lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.aside,
        {
          initial: { x: -260 },
          animate: { x: 0 },
          exit: { x: -260 },
          transition: { type: "spring", stiffness: 300, damping: 30 },
          className: `lg:hidden fixed left-0 top-0 bottom-0 w-60 z-50 ${t.sidebar} border-r ${t.border}`,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, {})
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "lg:ml-[240px] min-h-screen pt-[52px] lg:pt-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:hidden h-[44px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 lg:px-8 py-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { opacity: 0, y: 6 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -6 },
          transition: { duration: 0.18 },
          children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-theme": dark ? "dark" : "light", className: dark ? "text-white" : "text-[#1a1a18]", children: renderContent() })
        },
        activeTab
      ) }) })
    ] })
  ] });
}
const SplitComponent = AdminDashboard;
export {
  SplitComponent as component
};
