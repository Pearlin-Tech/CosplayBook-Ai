import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-BhxuAuAz.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import { t as teeBlack, h as hoodieGrey, c as crewCream, p as pantsOlive } from "./product-pants-olive-BM6jgIYu.mjs";
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
const items = [{
  id: "tee-01",
  name: "Heritage Tee",
  price: 95,
  img: teeBlack,
  tag: "Edition 01"
}, {
  id: "hoodie-01",
  name: "Atelier Hoodie",
  price: 185,
  img: hoodieGrey,
  tag: "Edition 01"
}, {
  id: "crew-01",
  name: "Studio Crewneck",
  price: 145,
  img: crewCream,
  tag: "Vault Drop"
}, {
  id: "pants-01",
  name: "Workshop Cargo",
  price: 215,
  img: pantsOlive,
  tag: "Edition 01"
}, {
  id: "tee-02",
  name: "Atelier Long Sleeve",
  price: 125,
  img: teeBlack,
  tag: "Coming Soon"
}, {
  id: "hoodie-02",
  name: "Cropped Hood",
  price: 165,
  img: hoodieGrey,
  tag: "Edition 02"
}];
function Collections() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 02 — Catalogue" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-serif text-6xl md:text-8xl leading-[0.95]", children: [
        "Every piece,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic", children: "a beginning." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 max-w-md text-foreground/65", children: "Choose a silhouette. Take it to the Studio. Make it yours." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid grid-cols-2 md:grid-cols-3 gap-6", children: items.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", className: "group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] overflow-hidden bg-surface", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.name, className: "w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700", loading: "lazy" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3 micro-label bg-background/80 backdrop-blur px-2 py-1", children: p.tag })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl", children: p.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono", children: [
            "$",
            p.price
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mt-1", children: "Customize →" })
      ] }, p.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
export {
  Collections as component
};
