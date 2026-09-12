import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-CRS0q2G1.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import { c as craftHands, m as modelPortrait, a as moodPalms } from "./model-portrait-Bui95KBv.mjs";
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
const posts = [{
  id: "01",
  title: "Why one-of-one is the only luxury left.",
  date: "MAR 2026",
  img: craftHands,
  cat: "Manifesto"
}, {
  id: "02",
  title: "Inside the atelier: 240 GSM and the perfect tee.",
  date: "FEB 2026",
  img: modelPortrait,
  cat: "Process"
}, {
  id: "03",
  title: "Edition 01: a love letter to slow streetwear.",
  date: "JAN 2026",
  img: moodPalms,
  cat: "Drops"
}];
function Journal() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 10 — The Journal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-serif text-6xl md:text-8xl", children: [
        "Notes from",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "the atelier." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-20 space-y-16", children: posts.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: `grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "aspect-[4/3] bg-surface overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.title, className: "w-full h-full object-cover hover:scale-105 transition-transform duration-700", loading: "lazy" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: p.cat }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs text-foreground/55", children: p.date })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 font-serif text-4xl md:text-5xl leading-tight", children: p.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/70 leading-relaxed", children: "An exploration of craft, restraint, and the obsession with detail that defines every Hypervault piece. Read about the people, materials, and decisions behind the edition." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/journal", className: "mt-8 inline-block text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]", children: "Read essay →" })
        ] })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Journal as component
};
