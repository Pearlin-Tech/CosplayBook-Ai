import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhxuAuAz.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import "./router-Bd89BIBB.mjs";
import { h as Check, P as Package } from "../_libs/lucide-react.mjs";
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
import "../_libs/framer-motion.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
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
function Success() {
  const orderId = `HV-2026-${Math.floor(1e3 + Math.random() * 9e3)}`;
  const stages = ["Confirmed", "In Atelier", "Crafted", "Shipped"];
  const activeStage = 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-24 text-center max-w-3xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto w-20 h-20 rounded-full bg-[color:var(--pop)] grid place-items-center animate-pulse-pop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 32, strokeWidth: 2.2 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label mt-8 block", children: "Receipt" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-serif text-5xl md:text-7xl", children: [
        "Order vaulted",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "successfully." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/65", children: "Your bespoke creation is now numbered, signed, and entering our atelier." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 bg-surface p-8 text-left", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: "Order Reference" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono mt-1", children: orderId })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: "Est. Delivery" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono mt-1", children: "14–21 days" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mb-4", children: "Shipping Tracker" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-0 right-0 h-px bg-border" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-0 h-px bg-[color:var(--pop)]", style: {
              width: `${activeStage / (stages.length - 1) * 100}%`
            } }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative grid grid-cols-4", children: stages.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `mx-auto w-6 h-6 rounded-full grid place-items-center ${i <= activeStage ? "bg-[color:var(--pop)]" : "bg-background border border-border"}`, children: i <= activeStage ? /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Package, { size: 10, className: "text-foreground/40" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 text-[10px] font-mono uppercase tracking-[0.18em]", children: s })
            ] }, s)) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 flex justify-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vault", className: "btn-ink", children: "View in Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", className: "btn-outline", children: "Back to Home" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Success as component
};
