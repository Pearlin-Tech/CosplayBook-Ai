import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-CRS0q2G1.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import "./router-CYT0jzOA.mjs";
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
import "../_libs/lucide-react.mjs";
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
const steps = [{
  n: "01",
  t: "Wash cold",
  d: "Inside out, 30°C max. Gentle cycle with neutral detergent."
}, {
  n: "02",
  t: "Air dry",
  d: "Lay flat in shade. Never tumble dry — heat is the enemy of bespoke."
}, {
  n: "03",
  t: "Iron low",
  d: "On the reverse side, never directly over print or embroidery."
}, {
  n: "04",
  t: "Store folded",
  d: "Folded, not hung. Cotton breathes better off the hanger."
}];
function Care() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 13 — Longevity" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-serif text-6xl md:text-7xl", children: "Care instructions." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/65 max-w-xl", children: "A Hypervault piece is built to outlast the season. Treat it like the heirloom it is." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 space-y-px", children: steps.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-[80px_1fr] gap-8 p-8 bg-surface border-b border-background last:border-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-2xl text-[color:var(--gold)]", children: s.n }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-3xl", children: s.t }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-foreground/65", children: s.d })
        ] })
      ] }, s.n)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 p-8 border border-[color:var(--gold)] text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Lifetime guarantee" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-serif text-3xl", children: "Every stitch, vaulted." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/65", children: "Any factory fault, any time. We repair or replace — forever." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-outline mt-8", children: "Claim repair" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Care as component
};
