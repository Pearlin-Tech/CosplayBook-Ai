import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { H as Header } from "./Header-BhxuAuAz.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import "./router-Bd89BIBB.mjs";
import { h as Check } from "../_libs/lucide-react.mjs";
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
function Contact() {
  const [sent, setSent] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16 grid md:grid-cols-2 gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 09 — Atelier" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-serif text-6xl md:text-7xl leading-[0.95]", children: [
          "Write to the",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "house." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-foreground/65 max-w-md", children: "Questions, custom commissions, press inquiries. Our atelier responds within 24 hours." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-12 space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Atelier", value: "4F, Bandra Heights · Mumbai 400050" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Studio NYC", value: "312 Canal St · Brooklyn 11211" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Email", value: "hello@hypervault.studio" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Phone", value: "+91 22 4567 8910" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Info, { label: "Hours", value: "Mon–Sat · 11:00 – 19:00 IST" })
        ] })
      ] }),
      sent ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface p-12 flex flex-col items-center justify-center text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-[color:var(--pop)] grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 28 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-serif text-3xl", children: "Message vaulted." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 text-foreground/60", children: "Our atelier will respond within 24 hours." })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => {
        e.preventDefault();
        setSent(true);
      }, className: "bg-surface p-8 md:p-12 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "First name" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Last name" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", type: "email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Subject" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: "Message" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { rows: 5, className: "field resize-none" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "btn-ink w-full justify-center", children: "Send Message" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Info({
  label,
  value
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 font-serif text-xl", children: value })
  ] });
}
function Field({
  label,
  type = "text"
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, className: "field", required: true })
  ] });
}
export {
  Contact as component
};
