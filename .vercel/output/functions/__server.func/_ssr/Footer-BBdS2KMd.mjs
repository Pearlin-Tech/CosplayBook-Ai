import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
function Footer() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-background border-t border-border mt-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge py-20", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-12 gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-serif text-4xl", children: [
          "Hyper",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "vault" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-6 text-foreground/65 max-w-sm leading-relaxed", children: "Luxury custom apparel. Every piece designed by you, crafted by us, vaulted for life." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: "Newsletter" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: (e) => e.preventDefault(), className: "mt-3 flex items-center gap-3 border-b border-foreground/30 pb-2 max-w-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "bg-transparent flex-1 outline-none text-sm py-1", placeholder: "you@studio.com" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-[11px] uppercase tracking-[0.2em] hover:text-[color:var(--gold)]", children: "Subscribe →" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Navigate", links: [["Studio", "/studio"], ["Collections", "/collections"], ["Journal", "/journal"], ["My Vault", "/vault"]] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "Support", links: [["Sizing Guide", "/sizing"], ["Care Instructions", "/care"], ["Contact", "/contact"], ["Reviews", "/reviews"]] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FooterCol, { title: "House", links: [["Manifesto", "/manifesto"], ["Process", "/process"], ["Press", "/press"], ["Privacy", "/privacy"]] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline mt-16" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-4 pt-8 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/55", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "© 2026 Hypervault Atelier" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Made in small batches · Mumbai · NYC" })
    ] })
  ] }) });
}
function FooterCol({ title, links }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "mt-5 space-y-3", children: links.map(([l, h]) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: h, className: "text-sm text-foreground/75 hover:text-foreground transition-colors", children: l }) }, h)) })
  ] });
}
export {
  Footer as F
};
