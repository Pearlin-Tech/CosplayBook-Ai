import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, M as MagneticButton, c as cn } from "./Header-CRS0q2G1.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import { t as teeBlack, h as hoodieGrey, c as crewCream, p as pantsOlive } from "./product-pants-olive-BM6jgIYu.mjs";
import { a as moodPalms, m as modelPortrait, c as craftHands } from "./model-portrait-Bui95KBv.mjs";
import "./router-CYT0jzOA.mjs";
import { a as useScroll, b as useSpring, c as useTransform, m as motion, d as useMotionValue, u as useInView } from "../_libs/framer-motion.mjs";
import { v as ArrowRight, Z as Zap } from "../_libs/lucide-react.mjs";
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
function Marquee({ items }) {
  const doubled = [...items, ...items];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "marquee-wrap overflow-hidden py-8 border-y border-border bg-surface", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-16 animate-marquee whitespace-nowrap", children: doubled.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif italic text-3xl md:text-5xl text-foreground/70 flex items-center gap-16 transition-colors hover:text-foreground", children: [
    t,
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--gold)]", children: "✦" })
  ] }, i)) }) });
}
function Reveal({
  children,
  delay = 0,
  y = 24,
  className
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      initial: { opacity: 0, y },
      animate: inView ? { opacity: 1, y: 0 } : {},
      transition: { duration: 0.8, delay, ease: [0.2, 0.7, 0.2, 1] },
      className,
      children
    }
  );
}
function ParallaxTilt({ children, className, max = 4 }) {
  const ref = reactExports.useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 120, damping: 16 });
  const sy = useSpring(my, { stiffness: 120, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const shadowX = useTransform(sx, [-0.5, 0.5], [40, -40]);
  const shadowY = useTransform(sy, [-0.5, 0.5], [-30, 30]);
  const boxShadow = useTransform(
    [shadowX, shadowY],
    ([x, y]) => `${x}px ${y}px 60px -25px rgba(17,17,17,0.25)`
  );
  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    mx.set(0);
    my.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, onMouseMove: onMove, onMouseLeave: onLeave, className: cn("[perspective:1400px]", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      style: { rotateX, rotateY, boxShadow, transformStyle: "preserve-3d" },
      className: "w-full h-full will-change-transform",
      children
    }
  ) });
}
function ImageReveal({
  children,
  className,
  parallax = 60,
  zoom = 1.15
}) {
  const ref = reactExports.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [parallax, -parallax]);
  const scale = useTransform(scrollYProgress, [0, 1], [zoom, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ref,
      initial: { clipPath: "inset(100% 0% 0% 0%)" },
      whileInView: { clipPath: "inset(0% 0% 0% 0%)" },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 1.2, ease: [0.77, 0, 0.175, 1] },
      className: cn("overflow-hidden relative", className),
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { y, scale }, className: "w-full h-full", children })
    }
  );
}
function TextSplit({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "span"
}) {
  const words = text.split(" ");
  const Comp = as;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn("inline-block", className), children: words.map((w, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: "inline-block overflow-hidden align-bottom",
      style: { marginRight: "0.25em" },
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { y: "110%", rotate: 4 },
          whileInView: { y: "0%", rotate: 0 },
          viewport: { once: true, margin: "-10%" },
          transition: {
            duration: 0.9,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1]
          },
          className: "inline-block",
          children: w
        }
      )
    },
    i
  )) });
}
function RiseLine({
  children,
  delay = 0,
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("inline-block overflow-hidden align-bottom", className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.span,
    {
      initial: { y: "110%" },
      whileInView: { y: "0%" },
      viewport: { once: true, margin: "-10%" },
      transition: { duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] },
      className: "inline-block",
      children
    }
  ) });
}
function Index() {
  const {
    scrollYProgress
  } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    mass: 0.2
  });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: {
      scaleX
    }, className: "fixed top-0 left-0 right-0 h-[2px] bg-[color:var(--gold)] origin-left z-[60]" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Hero, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Manifesto, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Marquee, { items: ["Bespoke", "Vaulted", "Edition 01", "Made in small batches", "Wear the hour", "Cruelty-free"] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Process, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Vault, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Featured, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Testimonials, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CTA, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
function Hero() {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "container-edge pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: {
      y: heroY,
      opacity: heroOpacity
    }, className: "md:col-span-6 md:sticky md:top-28", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        x: -20
      }, animate: {
        opacity: 1,
        x: 0
      }, transition: {
        duration: 0.8
      }, className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Edition 01 — The Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ticker-dot w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-10 font-serif text-[16vw] md:text-[7.5vw] leading-[0.92] tracking-[-0.03em]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { children: "Bespoke" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.08, children: "Streetwear," }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.16, className: "italic text-[color:var(--gold)]", children: "Vaulted" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.24, children: "by You." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.p, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.8,
        delay: 0.5
      }, className: "mt-10 max-w-md text-foreground/70 leading-relaxed", children: "Design every thread. Own every detail. Your custom apparel, crafted in limited batches — never mass-produced, never repeated." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 20
      }, animate: {
        opacity: 1,
        y: 0
      }, transition: {
        duration: 0.8,
        delay: 0.7
      }, className: "mt-10 flex flex-wrap items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", className: "btn-ink", children: [
          "Enter Studio ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vault", className: "btn-outline", children: "My Vault" }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "md:col-span-6 grid grid-cols-2 gap-3 md:gap-5 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ParallaxTilt, { max: 4, className: "aspect-[3/4] tile group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: teeBlack, alt: "Black premium tee", className: "w-full h-full object-cover", width: 1024, height: 1280 }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tile-cap micro-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Heritage Tee" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "$95" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[3/4] tile mt-12 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: hoodieGrey, alt: "Grey premium hoodie", className: "w-full h-full object-cover", width: 1024, height: 1280, loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute -top-6 -right-6 w-28 h-28 rounded-full bg-foreground text-background flex items-center justify-center animate-spin-slow z-20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: "0 0 100 100", className: "absolute inset-0 w-full h-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { id: "circle-path", d: "M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("text", { className: "text-[9px] uppercase tracking-[0.18em] fill-background font-mono", children: /* @__PURE__ */ jsxRuntimeExports.jsx("textPath", { href: "#circle-path", children: "START CUSTOMIZING · START CUSTOMIZING · " }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/studio", className: "w-12 h-12 rounded-full bg-[color:var(--pop)] text-foreground flex items-center justify-center hover:scale-110 transition-transform animate-pulse-pop", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { size: 18, fill: "currentColor" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tile-cap micro-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Atelier Hoodie" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "$185" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] tile group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: moodPalms, alt: "Mood palms", className: "w-full h-full object-cover", width: 1024, height: 1280, loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tile-cap micro-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Mood — 01" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "SS26" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ParallaxTilt, { max: 4, className: "aspect-[3/4] tile mt-12 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: modelPortrait, alt: "Model", className: "w-full h-full object-cover", width: 1024, height: 1280, loading: "lazy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tile-cap micro-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Worn by Sienna" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: "NYC" })
        ] })
      ] })
    ] })
  ] });
}
function Manifesto() {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { ref, className: "bg-[#0d0d0d] text-background py-32 overflow-hidden relative grain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { style: {
    y
  }, className: "container-edge text-center relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      scale: 0,
      rotate: -180
    }, whileInView: {
      scale: 1,
      rotate: 0
    }, viewport: {
      once: true
    }, transition: {
      duration: 1,
      ease: [0.22, 1, 0.36, 1]
    }, className: "font-serif text-7xl text-[color:var(--gold)]", children: '"' }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-4 font-serif text-3xl md:text-6xl leading-[1.1] max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { children: "The" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.05, children: "only" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.1, children: "garment" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.15, children: "you" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.2, children: "wear" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.25, children: "that" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.3, className: "italic bg-gradient-to-r from-[color:var(--gold-soft)] to-[color:var(--gold)] bg-clip-text text-transparent", children: "nobody" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.4, children: "can" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.45, children: "copy." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0
    }, whileInView: {
      opacity: 1
    }, viewport: {
      once: true
    }, transition: {
      duration: 1,
      delay: 0.6
    }, className: "mt-10 flex items-center justify-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hairline w-20 bg-foreground/30" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "The Hypervault Manifesto" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hairline w-20 bg-foreground/30" })
    ] })
  ] }) });
}
function Process() {
  const steps = [{
    n: "01",
    t: "Compose",
    d: "Choose your weight, weave, and base colorway from our matte heritage palette."
  }, {
    n: "02",
    t: "Configure",
    d: "Drag graphics, type, embroidery onto a photoreal 3D garment in real time."
  }, {
    n: "03",
    t: "Vault",
    d: "Your design is numbered, signed and held in your private vault — forever."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline w-10" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 04 — The Process" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-8 font-serif text-6xl md:text-8xl leading-[0.95]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "Three movements," }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "one garment.", className: "italic", delay: 0.2 })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 border border-[color:var(--gold-soft)] rounded-md grid md:grid-cols-3 overflow-hidden", children: steps.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 60
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-15%"
    }, transition: {
      duration: 0.8,
      delay: i * 0.15,
      ease: [0.22, 1, 0.36, 1]
    }, whileHover: {
      backgroundColor: "rgba(184,137,90,0.04)"
    }, className: `p-10 md:p-12 relative group cursor-default ${i < 2 ? "md:border-r border-[color:var(--gold-soft)]" : ""}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { whileHover: {
          rotate: 90,
          scale: 1.1
        }, transition: {
          duration: 0.6
        }, className: "w-10 h-10 border border-[color:var(--gold)] rounded grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--gold)] font-mono text-xs", children: "◆" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-xs text-foreground/50", children: [
          s.n,
          " / 03"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "mt-12 font-serif text-4xl transition-transform duration-500 group-hover:translate-x-2", children: s.t }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/65 max-w-xs leading-relaxed", children: s.d }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hairline mt-12 bg-[color:var(--gold-soft)]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        scaleX: 0
      }, whileInView: {
        scaleX: 1
      }, viewport: {
        once: true
      }, transition: {
        duration: 1.2,
        delay: 0.3 + i * 0.15
      }, className: "absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--gold)] origin-left opacity-0 group-hover:opacity-100 transition-opacity" })
    ] }, s.n)) })
  ] });
}
function Vault() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-32 grid md:grid-cols-2 gap-10 items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ImageReveal, { className: "aspect-[4/5]", parallax: 40, zoom: 1.2, children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: craftHands, alt: "Hands crafting fabric", className: "w-full h-full object-cover", width: 1280, height: 1024, loading: "lazy" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 05 — The Vault" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mt-6 font-serif text-5xl md:text-7xl leading-[0.98]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "Your archive," }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "held forever.", className: "italic text-[color:var(--gold)]", delay: 0.2 })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-8 text-foreground/70 max-w-md leading-relaxed", children: "Every Hypervault piece is numbered, signed, and recorded in your private vault — a permanent record of your creative ownership." }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 grid grid-cols-3 gap-6", children: [["247", "Active Vaults"], ["1.2K", "Pieces Crafted"], ["100%", "Single-Edition"]].map(([n, l], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
        opacity: 0,
        y: 30
      }, whileInView: {
        opacity: 1,
        y: 0
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.7,
        delay: 0.4 + i * 0.1
      }, whileHover: {
        y: -4
      }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-4xl md:text-5xl", children: n }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 micro-label", children: l })
      ] }, l)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.6, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/vault", className: "btn-ink", children: [
        "Open Vault ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] }) }) })
    ] })
  ] });
}
const featured = [{
  id: "tee-01",
  name: "Heritage Tee",
  price: 95,
  img: teeBlack
}, {
  id: "hoodie-01",
  name: "Atelier Hoodie",
  price: 185,
  img: hoodieGrey
}, {
  id: "crew-01",
  name: "Studio Crewneck",
  price: 145,
  img: crewCream
}, {
  id: "pants-01",
  name: "Workshop Cargo",
  price: 215,
  img: pantsOlive
}];
function Featured() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-32", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end justify-between gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 06 — The Collection" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-serif text-5xl md:text-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "Featured pieces." }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/collections", className: "link-underline text-sm uppercase tracking-[0.2em] hover:text-[color:var(--gold)] inline-flex items-center gap-2", children: [
        "View all ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-14 grid grid-cols-2 md:grid-cols-4 gap-5", children: featured.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
      opacity: 0,
      y: 60
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-10%"
    }, transition: {
      duration: 0.8,
      delay: i * 0.08,
      ease: [0.22, 1, 0.36, 1]
    }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", search: {
      p: p.id
    }, className: "group block", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] tile", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: p.img, alt: p.name, loading: "lazy", width: 1024, height: 1280, className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "tile-cap micro-label", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Customize →" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: String(i + 1).padStart(2, "0") })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-baseline justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-xl link-underline", children: p.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono text-sm", children: [
          "$",
          p.price
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 micro-label opacity-70 transition-opacity group-hover:opacity-100", children: "Customize →" })
    ] }) }, p.id)) })
  ] });
}
function Testimonials() {
  const items = [{
    q: "I've never owned a garment that felt this personal. The vault concept is wild.",
    a: "Aarav K. — Mumbai"
  }, {
    q: "Fabric weight, stitch, color — every decision was mine. It shows.",
    a: "Sienna M. — Brooklyn"
  }, {
    q: "More an heirloom than a purchase. Numbered. Signed. Mine.",
    a: "Theo R. — Berlin"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-surface py-32 relative grain", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Reveal, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Nº 07 — Voices" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 font-serif text-5xl md:text-7xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextSplit, { text: "Worn by makers." }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-16 grid md:grid-cols-3 gap-8", children: items.map((t, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.figure, { initial: {
      opacity: 0,
      y: 40
    }, whileInView: {
      opacity: 1,
      y: 0
    }, viewport: {
      once: true,
      margin: "-10%"
    }, transition: {
      duration: 0.8,
      delay: i * 0.15
    }, whileHover: {
      y: -6
    }, className: "border-t border-[color:var(--gold-soft)] pt-8 cursor-default", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
        rotate: -20,
        opacity: 0
      }, whileInView: {
        rotate: 0,
        opacity: 1
      }, viewport: {
        once: true
      }, transition: {
        duration: 0.8,
        delay: 0.2 + i * 0.15
      }, className: "text-[color:var(--gold)] font-serif text-3xl leading-none", children: '"' }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("blockquote", { className: "mt-4 font-serif text-2xl leading-snug", children: t.q }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "mt-8 micro-label", children: t.a })
    ] }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.3, className: "mt-16 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/reviews", className: "btn-outline", children: "Read all reviews" }) })
  ] }) });
}
function CTA() {
  const ref = reactExports.useRef(null);
  const {
    scrollYProgress
  } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, className: "container-edge py-32 text-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Begin" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.h2, { style: {
      y,
      scale
    }, className: "mt-6 font-serif text-6xl md:text-9xl leading-[0.95]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { children: "Make" }),
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.08, children: "something" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RiseLine, { delay: 0.16, className: "italic", children: "irreplaceable." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Reveal, { delay: 0.4, children: /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "mt-12", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", className: "btn-ink", children: [
      "Enter the Studio ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 14 })
    ] }) }) })
  ] });
}
export {
  Index as component
};
