import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as Header } from "./Header-BhxuAuAz.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import "./router-Bd89BIBB.mjs";
import { d as Star } from "../_libs/lucide-react.mjs";
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
const reviews = [{
  n: "Aarav K.",
  c: "Mumbai",
  r: 5,
  t: "Heirloom-quality. The vault concept changes everything.",
  item: "Heritage Tee"
}, {
  n: "Sienna M.",
  c: "Brooklyn",
  r: 5,
  t: "The cobalt linen is unreal. Fit is precisely what I designed.",
  item: "Atelier Hoodie"
}, {
  n: "Theo R.",
  c: "Berlin",
  r: 5,
  t: "Numbered. Signed. Mine. Worth every cent.",
  item: "Workshop Cargo"
}, {
  n: "Mira J.",
  c: "Tokyo",
  r: 4,
  t: "Shipping took 3 weeks but the piece is unrepeatable.",
  item: "Studio Crewneck"
}, {
  n: "Luca B.",
  c: "Milan",
  r: 5,
  t: "The macro zoom on the studio preview convinced me. Atelier-level.",
  item: "Heritage Tee"
}, {
  n: "Ines D.",
  c: "Paris",
  r: 5,
  t: "Worn twice in editorials already. People ask, I smile.",
  item: "Atelier Hoodie"
}];
function Reviews() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 12 — Voices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 font-serif text-6xl md:text-8xl", children: "Reviews." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [...Array(5)].map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 18, fill: "currentColor", className: "text-[color:var(--gold)]" }, i)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-sm", children: "4.9 · 247 reviews" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6", children: reviews.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-8 bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex", children: [...Array(r.r)].map((_, i2) => /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { size: 14, fill: "currentColor", className: "text-[color:var(--gold)]" }, i2)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("blockquote", { className: "mt-4 font-serif text-2xl leading-snug", children: [
          '"',
          r.t,
          '"'
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline mt-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg", children: r.n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: r.c })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-foreground/55", children: r.item })
        ] })
      ] }, i)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Reviews as component
};
