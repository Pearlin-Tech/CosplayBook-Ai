import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhxuAuAz.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import "./router-Bd89BIBB.mjs";
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
const rows = [["XS", "34–36", "26–28", "67"], ["S", "36–38", "28–30", "69"], ["M", "38–40", "30–32", "71"], ["L", "40–42", "32–34", "73"], ["XL", "42–44", "34–36", "75"], ["XXL", "44–46", "36–38", "77"]];
function Sizing() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16 max-w-4xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 11 — Fit" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-serif text-6xl md:text-7xl", children: "Sizing guide." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/65", children: "All measurements in centimetres. Garments cut for a relaxed contemporary fit." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 border border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "bg-surface text-left", children: ["Size", "Chest", "Waist", "Length"].map((h) => /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "p-4 micro-label", children: h }, h)) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: rows.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-t border-border hover:bg-surface", children: r.map((c, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: `p-4 ${i === 0 ? "font-serif text-xl" : "font-mono text-sm"}`, children: c }, i)) }, r[0])) })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 grid md:grid-cols-2 gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Need help?" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-serif text-2xl", children: "Talk to the atelier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "btn-outline mt-6", children: "Open chat" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Care" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-2 font-serif text-2xl", children: "Wash & last" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/care", className: "btn-outline mt-6", children: "Care guide" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Sizing as component
};
