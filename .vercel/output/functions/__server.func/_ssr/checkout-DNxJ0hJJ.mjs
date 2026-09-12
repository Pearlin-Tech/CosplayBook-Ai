import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header } from "./Header-CRS0q2G1.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import { a as useCart } from "./router-CYT0jzOA.mjs";
import { s as Minus, i as Plus, X, f as ShieldCheck, e as Lock, h as Check } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion } from "../_libs/framer-motion.mjs";
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
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function detectBrand(num) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mc";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6/.test(n)) return "discover";
  return "generic";
}
function formatNumber(v) {
  return v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}
function Checkout() {
  const {
    cart,
    remove,
    setQty,
    subtotal,
    clear
  } = useCart();
  const navigate = useNavigate();
  const [tab, setTab] = reactExports.useState("card");
  const [upiOpen, setUpiOpen] = reactExports.useState(false);
  const [upi, setUpi] = reactExports.useState("");
  const [card, setCard] = reactExports.useState({
    number: "",
    name: "",
    exp: "",
    cvv: ""
  });
  const [flipped, setFlipped] = reactExports.useState(false);
  const [processing, setProcessing] = reactExports.useState(false);
  const shipping = subtotal > 0 ? 12 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const brand = detectBrand(card.number);
  const handlePay = () => {
    if (!cart.length) return;
    setProcessing(true);
    setTimeout(() => {
      clear();
      navigate({
        to: "/success"
      });
    }, 2400);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 08 — Transaction" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-4 font-serif text-5xl md:text-7xl", children: [
        "Secure your ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "italic-serif text-[color:var(--gold)]", children: "vault." })
      ] }),
      cart.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-24 text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/60", children: "Your cabinet is empty." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/studio", className: "btn-ink mt-8", children: "Enter the Studio" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          cart.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-5 p-5 bg-surface", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: c.image, alt: "", className: "w-24 h-32 object-cover" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-2xl", children: c.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-sm text-foreground/65", children: c.config }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center border border-border", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(c.id, c.qty - 1), className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Minus, { size: 12 }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-3 font-mono text-sm", children: c.qty }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setQty(c.id, c.qty + 1), className: "p-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 12 }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => remove(c.id), className: "text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-[color:var(--destructive)] inline-flex items-center gap-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 12 }),
                  " Remove"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-serif text-xl", children: [
              "$",
              c.price * c.qty
            ] })
          ] }, c.id)),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface p-8 mt-10", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 micro-label", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 14 }),
              " Premium Gateway · 256-bit AES"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-3xl mt-3", children: "Payment" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 grid grid-cols-2 gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("card"), className: `p-3 text-xs uppercase tracking-[0.18em] border ${tab === "card" ? "bg-foreground text-background border-foreground" : "border-border"}`, children: "Card" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setTab("upi"), className: `p-3 text-xs uppercase tracking-[0.18em] border ${tab === "upi" ? "bg-foreground text-background border-foreground" : "border-border"}`, children: "Instant UPI" })
            ] }),
            tab === "card" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-6", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CardVisualizer, { card, brand, flipped }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: "Card Number" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: card.number, onChange: (e) => setCard({
                    ...card,
                    number: formatNumber(e.target.value)
                  }), onFocus: () => setFlipped(false), placeholder: "0000 0000 0000 0000", className: "field font-mono tracking-[0.15em]" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: "Cardholder Name" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: card.name, onChange: (e) => setCard({
                    ...card,
                    name: e.target.value.toUpperCase()
                  }), onFocus: () => setFlipped(false), placeholder: "A. VERMA", className: "field" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: "Expiry" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: card.exp, onChange: (e) => {
                      const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                      setCard({
                        ...card,
                        exp: v.length > 2 ? `${v.slice(0, 2)}/${v.slice(2)}` : v
                      });
                    }, onFocus: () => setFlipped(false), placeholder: "MM/YY", className: "field font-mono" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: "CVV" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: card.cvv, onChange: (e) => setCard({
                      ...card,
                      cvv: e.target.value.replace(/\D/g, "").slice(0, 4)
                    }), onFocus: () => setFlipped(true), onBlur: () => setFlipped(false), maxLength: 4, placeholder: "•••", className: "field font-mono" })
                  ] })
                ] })
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-2", children: [{
                id: "gpay",
                label: "Google Pay",
                color: "#4285F4"
              }, {
                id: "phonepe",
                label: "PhonePe",
                color: "#5f259f"
              }, {
                id: "paytm",
                label: "Paytm",
                color: "#00BAF2"
              }].map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "p-5 bg-background border border-border hover:border-foreground transition-colors flex flex-col items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-8 h-8 rounded-full", style: {
                  background: p.color
                } }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: p.label })
              ] }, p.id)) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setUpiOpen(!upiOpen), className: "w-full flex items-center justify-between p-4 border border-border hover:border-foreground transition-colors", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm", children: "Enter UPI ID manually" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-lg", children: upiOpen ? "−" : "+" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, children: upiOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
                height: 0,
                opacity: 0
              }, animate: {
                height: "auto",
                opacity: 1
              }, exit: {
                height: 0,
                opacity: 0
              }, className: "overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("input", { value: upi, onChange: (e) => setUpi(e.target.value), placeholder: "yourname@upi", className: "field" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/55", children: "Verification dispatched to your linked banking app." })
              ] }) }) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 self-start bg-surface p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: "Summary" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-serif text-3xl mt-2", children: [
            "Order Nº ",
            Math.floor(Math.random() * 9999)
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 space-y-3 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Subtotal", value: `$${subtotal}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Shipping (Express)", value: `$${shipping}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Tax", value: `$${tax}` }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline my-4" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Row, { label: "Total", value: `$${total}`, large: true })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handlePay, disabled: processing, className: "btn-ink mt-8 w-full justify-center disabled:opacity-50", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { size: 12 }),
            " Vault Order · $",
            total
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 text-[11px] text-center text-foreground/55 font-mono uppercase tracking-[0.15em]", children: "Encrypted · PCI-DSS · 30-day returns" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: processing && /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0
    }, animate: {
      opacity: 1
    }, exit: {
      opacity: 0
    }, className: "fixed inset-0 z-[100] bg-background/96 backdrop-blur-md grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm px-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-24 h-24 mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full border border-[color:var(--gold)]/40" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-2 rounded-full border-2 border-foreground border-t-transparent animate-spin" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { size: 26, className: "text-[color:var(--gold)]" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mt-6", children: "Hypervault Gateway" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-3 font-serif text-3xl", children: "Securing Transaction…" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2 text-left max-w-xs mx-auto", children: ["Encrypting payload", "Verifying issuer", "Issuing vault receipt"].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -10
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        delay: 0.3 + i * 0.5
      }, className: "flex items-center gap-3 text-xs font-mono uppercase tracking-[0.15em]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { size: 12, className: "text-[color:var(--pop)]" }),
        " ",
        s
      ] }, s)) })
    ] }) }) })
  ] });
}
function CardVisualizer({
  card,
  brand,
  flipped
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-56", style: {
    perspective: "1400px"
  }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { animate: {
    rotateY: flipped ? 180 : 0
  }, transition: {
    duration: 0.8,
    ease: [0.4, 0, 0.2, 1]
  }, className: "absolute inset-0", style: {
    transformStyle: "preserve-3d"
  }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-xl overflow-hidden text-background p-6 flex flex-col justify-between", style: {
      backfaceVisibility: "hidden",
      background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 45%, #0a0a0a 100%)",
      boxShadow: "0 30px 60px -25px rgba(17,17,17,0.5)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 opacity-20 pointer-events-none", style: {
        background: "radial-gradient(circle at 20% 10%, rgba(212,163,115,0.45), transparent 50%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none", style: {
        background: "radial-gradient(circle, rgba(212,255,0,0.12), transparent 70%)"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[9px] font-mono uppercase tracking-[0.3em] text-[color:var(--gold)]", children: "Hypervault" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] font-mono uppercase tracking-[0.2em] opacity-70", children: "Atelier Card" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(BrandMark, { brand })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 -mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-7 rounded-sm", style: {
        background: "linear-gradient(135deg, #d4b878, #8a6f3f)"
      }, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 grid-rows-3 gap-px p-0.5 opacity-60", children: Array.from({
        length: 9
      }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-black/30" }, i)) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-xl md:text-2xl tracking-[0.2em]", children: card.number || "•••• •••• •••• ••••" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] opacity-80", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-60", children: "Holder" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: card.name || "YOUR NAME" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "opacity-60", children: "Valid Thru" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-0.5", children: card.exp || "MM/YY" })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 rounded-xl overflow-hidden text-background", style: {
      backfaceVisibility: "hidden",
      transform: "rotateY(180deg)",
      background: "linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%)",
      boxShadow: "0 30px 60px -25px rgba(17,17,17,0.5)"
    }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-12 bg-black mt-6" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 mt-5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label !text-background/60", children: "Signature" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 h-10 bg-background/90 flex items-center justify-end pr-3 font-mono tracking-[0.3em] text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic-serif text-foreground/40 mr-2 text-xs", children: "authorized" }),
          card.cvv || "•••"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-[9px] font-mono uppercase tracking-[0.2em] opacity-50", children: "This card is property of Hypervault Atelier. Misuse will be tracked." })
      ] })
    ] })
  ] }) });
}
function BrandMark({
  brand
}) {
  const common = "h-7 flex items-center";
  if (brand === "visa") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: common, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif italic text-2xl tracking-tight", children: "VISA" }) });
  if (brand === "mc") return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: common + " gap-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-[#EB001B] -mr-2 opacity-95" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-6 h-6 rounded-full bg-[#F79E1B] opacity-95 mix-blend-screen" })
  ] });
  if (brand === "amex") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: common, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-1 bg-[#2E77BC] text-[10px] font-mono tracking-[0.15em]", children: "AMEX" }) });
  if (brand === "discover") return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: common, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-mono tracking-[0.15em]", children: "DISCOVER" }) });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: common + " text-[10px] font-mono tracking-[0.15em] opacity-50", children: "•••• Network" });
}
function Row({
  label,
  value,
  large
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between ${large ? "font-serif text-2xl" : "text-foreground/70"}`, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value })
  ] });
}
export {
  Checkout as component
};
