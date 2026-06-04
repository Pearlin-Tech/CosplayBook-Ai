import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { ParallaxTilt } from "@/components/motion/ParallaxTilt";
import { ImageReveal } from "@/components/motion/ImageReveal";
import { TextSplit, RiseLine } from "@/components/motion/TextSplit";
import teeBlack from "@/assets/product-tee-black.jpg";
import hoodieGrey from "@/assets/product-hoodie-grey.jpg";
import crewCream from "@/assets/product-crew-cream.jpg";
import pantsOlive from "@/assets/product-pants-olive.jpg";
import craftHands from "@/assets/craft-hands.jpg";
import moodPalms from "@/assets/mood-palms.jpg";
import modelPortrait from "@/assets/model-portrait.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hypervault — Bespoke Streetwear, Vaulted by You" },
      { name: "description", content: "Design every thread. Own every detail. Your custom apparel, crafted in limited batches — never mass-produced, never repeated." },
    ],
  }),
  component: Index,
});

function Index() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });
  const scaleX = useTransform(progress, [0, 1], [0, 1]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-[color:var(--gold)] origin-left z-[60]"
      />
      <Header />
      <Hero />
      <Manifesto />
      <Marquee items={["Bespoke", "Vaulted", "Edition 01", "Made in small batches", "Wear the hour", "Cruelty-free"]} />
      <Process />
      <Vault />
      <Featured />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);

  return (
    <section ref={ref} className="container-edge pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-start">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="md:col-span-6 md:sticky md:top-28">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center gap-3"
        >
          <div className="hairline w-10" />
          <span className="micro-label">Edition 01 — The Vault</span>
          <span className="ticker-dot w-1.5 h-1.5 rounded-full bg-[color:var(--gold)]" />
        </motion.div>

        <h1 className="mt-10 font-serif text-[16vw] md:text-[7.5vw] leading-[0.92] tracking-[-0.03em]">
          <RiseLine>Bespoke</RiseLine>
          <br />
          <RiseLine delay={0.08}>Streetwear,</RiseLine>
          <br />
          <RiseLine delay={0.16} className="italic text-[color:var(--gold)]">Vaulted</RiseLine>
          <br />
          <RiseLine delay={0.24}>by You.</RiseLine>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-10 max-w-md text-foreground/70 leading-relaxed"
        >
          Design every thread. Own every detail. Your custom apparel,
          crafted in limited batches — never mass-produced, never repeated.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton>
            <Link to="/studio" className="btn-ink">
              Enter Studio <ArrowRight size={14} />
            </Link>
          </MagneticButton>
          <MagneticButton>
            <Link to="/vault" className="btn-outline">My Vault</Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className="md:col-span-6 grid grid-cols-2 gap-3 md:gap-5 relative">
        <ParallaxTilt max={4} className="aspect-[3/4] tile group">
          <img src={teeBlack} alt="Black premium tee" className="w-full h-full object-cover" width={1024} height={1280} />
          <div className="tile-cap micro-label">
            <span>Heritage Tee</span><span className="font-mono">$95</span>
          </div>
        </ParallaxTilt>
        <div className="relative aspect-[3/4] tile mt-12 group">
          <img src={hoodieGrey} alt="Grey premium hoodie" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-foreground text-background flex items-center justify-center animate-spin-slow z-20">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <defs>
                <path id="circle-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
              </defs>
              <text className="text-[9px] uppercase tracking-[0.18em] fill-background font-mono">
                <textPath href="#circle-path">START CUSTOMIZING · START CUSTOMIZING · </textPath>
              </text>
            </svg>
            <Link to="/studio" className="w-12 h-12 rounded-full bg-[color:var(--pop)] text-foreground flex items-center justify-center hover:scale-110 transition-transform animate-pulse-pop">
              <Zap size={18} fill="currentColor" />
            </Link>
          </div>
          <div className="tile-cap micro-label">
            <span>Atelier Hoodie</span><span className="font-mono">$185</span>
          </div>
        </div>
        <div className="aspect-[3/4] tile group">
          <img src={moodPalms} alt="Mood palms" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
          <div className="tile-cap micro-label">
            <span>Mood — 01</span><span className="font-mono">SS26</span>
          </div>
        </div>
        <ParallaxTilt max={4} className="aspect-[3/4] tile mt-12 group">
          <img src={modelPortrait} alt="Model" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
          <div className="tile-cap micro-label">
            <span>Worn by Sienna</span><span className="font-mono">NYC</span>
          </div>
        </ParallaxTilt>
      </div>
    </section>
  );
}

function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section ref={ref} className="bg-[#0d0d0d] text-background py-32 overflow-hidden relative grain">
      <motion.div style={{ y }} className="container-edge text-center relative">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          whileInView={{ scale: 1, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-7xl text-[color:var(--gold)]"
        >
          &quot;
        </motion.div>
        <h2 className="mt-4 font-serif text-3xl md:text-6xl leading-[1.1] max-w-5xl mx-auto">
          <RiseLine>The</RiseLine>{" "}
          <RiseLine delay={0.05}>only</RiseLine>{" "}
          <RiseLine delay={0.1}>garment</RiseLine>{" "}
          <RiseLine delay={0.15}>you</RiseLine>{" "}
          <RiseLine delay={0.2}>wear</RiseLine>{" "}
          <RiseLine delay={0.25}>that</RiseLine>{" "}
          <RiseLine delay={0.3} className="italic bg-gradient-to-r from-[color:var(--gold-soft)] to-[color:var(--gold)] bg-clip-text text-transparent">nobody</RiseLine>{" "}
          <RiseLine delay={0.4}>can</RiseLine>{" "}
          <RiseLine delay={0.45}>copy.</RiseLine>
        </h2>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4"
        >
          <span className="hairline w-20 bg-foreground/30" />
          <span className="micro-label">The Hypervault Manifesto</span>
          <span className="hairline w-20 bg-foreground/30" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function Process() {
  const steps = [
    { n: "01", t: "Compose", d: "Choose your weight, weave, and base colorway from our matte heritage palette." },
    { n: "02", t: "Configure", d: "Drag graphics, type, embroidery onto a photoreal 3D garment in real time." },
    { n: "03", t: "Vault", d: "Your design is numbered, signed and held in your private vault — forever." },
  ];
  return (
    <section className="container-edge py-32">
      <Reveal>
        <div className="flex items-center gap-3">
          <div className="hairline w-10" />
          <span className="micro-label">Nº 04 — The Process</span>
        </div>
        <h2 className="mt-8 font-serif text-6xl md:text-8xl leading-[0.95]">
          <TextSplit text="Three movements," /><br />
          <TextSplit text="one garment." className="italic" delay={0.2} />
        </h2>
      </Reveal>
      <div className="mt-16 border border-[color:var(--gold-soft)] rounded-md grid md:grid-cols-3 overflow-hidden">
        {steps.map((s, i) => (
          <motion.div
            key={s.n}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ backgroundColor: "rgba(184,137,90,0.04)" }}
            className={`p-10 md:p-12 relative group cursor-default ${i < 2 ? "md:border-r border-[color:var(--gold-soft)]" : ""}`}
          >
            <div className="flex items-start justify-between">
              <motion.div
                whileHover={{ rotate: 90, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-10 h-10 border border-[color:var(--gold)] rounded grid place-items-center"
              >
                <span className="text-[color:var(--gold)] font-mono text-xs">◆</span>
              </motion.div>
              <span className="font-mono text-xs text-foreground/50">{s.n} / 03</span>
            </div>
            <h3 className="mt-12 font-serif text-4xl transition-transform duration-500 group-hover:translate-x-2">{s.t}</h3>
            <p className="mt-4 text-foreground/65 max-w-xs leading-relaxed">{s.d}</p>
            <div className="hairline mt-12 bg-[color:var(--gold-soft)]" />
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
              className="absolute bottom-0 left-0 right-0 h-[2px] bg-[color:var(--gold)] origin-left opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Vault() {
  return (
    <section className="container-edge py-32 grid md:grid-cols-2 gap-10 items-center">
      <ImageReveal className="aspect-[4/5]" parallax={40} zoom={1.2}>
        <img src={craftHands} alt="Hands crafting fabric" className="w-full h-full object-cover" width={1280} height={1024} loading="lazy" />
      </ImageReveal>
      <div>
        <Reveal>
          <span className="micro-label">Nº 05 — The Vault</span>
        </Reveal>
        <h2 className="mt-6 font-serif text-5xl md:text-7xl leading-[0.98]">
          <TextSplit text="Your archive," /><br />
          <TextSplit text="held forever." className="italic text-[color:var(--gold)]" delay={0.2} />
        </h2>
        <Reveal delay={0.3}>
          <p className="mt-8 text-foreground/70 max-w-md leading-relaxed">
            Every Hypervault piece is numbered, signed, and recorded in your
            private vault — a permanent record of your creative ownership.
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {[["247", "Active Vaults"], ["1.2K", "Pieces Crafted"], ["100%", "Single-Edition"]].map(([n, l], i) => (
            <motion.div
              key={l}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.4 + i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="font-serif text-4xl md:text-5xl">{n}</div>
              <div className="mt-1 micro-label">{l}</div>
            </motion.div>
          ))}
        </div>
        <Reveal delay={0.6}>
          <MagneticButton className="mt-12"><Link to="/vault" className="btn-ink">Open Vault <ArrowRight size={14} /></Link></MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}

const featured = [
  { id: "tee-01", name: "Heritage Tee", price: 95, img: teeBlack },
  { id: "hoodie-01", name: "Atelier Hoodie", price: 185, img: hoodieGrey },
  { id: "crew-01", name: "Studio Crewneck", price: 145, img: crewCream },
  { id: "pants-01", name: "Workshop Cargo", price: 215, img: pantsOlive },
];

function Featured() {
  return (
    <section className="container-edge py-32">
      <Reveal>
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="micro-label">Nº 06 — The Collection</span>
            <h2 className="mt-6 font-serif text-5xl md:text-7xl">
              <TextSplit text="Featured pieces." />
            </h2>
          </div>
          <Link to="/collections" className="link-underline text-sm uppercase tracking-[0.2em] hover:text-[color:var(--gold)] inline-flex items-center gap-2">
            View all <ArrowRight size={14} />
          </Link>
        </div>
      </Reveal>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
        {featured.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link to="/studio" search={{ p: p.id }} className="group block">
              <div className="aspect-[3/4] tile">
                <img src={p.img} alt={p.name} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover" />
                <div className="tile-cap micro-label">
                  <span>Customize →</span><span className="font-mono">{String(i + 1).padStart(2, "0")}</span>
                </div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif text-xl link-underline">{p.name}</h3>
                <span className="font-mono text-sm">${p.price}</span>
              </div>
              <div className="mt-1 micro-label opacity-70 transition-opacity group-hover:opacity-100">Customize →</div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  const items = [
    { q: "I've never owned a garment that felt this personal. The vault concept is wild.", a: "Aarav K. — Mumbai" },
    { q: "Fabric weight, stitch, color — every decision was mine. It shows.", a: "Sienna M. — Brooklyn" },
    { q: "More an heirloom than a purchase. Numbered. Signed. Mine.", a: "Theo R. — Berlin" },
  ];
  return (
    <section className="bg-surface py-32 relative grain">
      <div className="container-edge relative">
        <Reveal>
          <span className="micro-label">Nº 07 — Voices</span>
          <h2 className="mt-6 font-serif text-5xl md:text-7xl">
            <TextSplit text="Worn by makers." />
          </h2>
        </Reveal>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -6 }}
              className="border-t border-[color:var(--gold-soft)] pt-8 cursor-default"
            >
              <motion.div
                initial={{ rotate: -20, opacity: 0 }}
                whileInView={{ rotate: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 + i * 0.15 }}
                className="text-[color:var(--gold)] font-serif text-3xl leading-none"
              >
                "
              </motion.div>
              <blockquote className="mt-4 font-serif text-2xl leading-snug">{t.q}</blockquote>
              <figcaption className="mt-8 micro-label">{t.a}</figcaption>
            </motion.figure>
          ))}
        </div>
        <Reveal delay={0.3} className="mt-16 text-center">
          <Link to="/reviews" className="btn-outline">Read all reviews</Link>
        </Reveal>
      </div>
    </section>
  );
}

function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.05]);

  return (
    <section ref={ref} className="container-edge py-32 text-center overflow-hidden">
      <Reveal>
        <span className="micro-label">Begin</span>
      </Reveal>
      <motion.h2 style={{ y, scale }} className="mt-6 font-serif text-6xl md:text-9xl leading-[0.95]">
        <RiseLine>Make</RiseLine>{" "}
        <RiseLine delay={0.08}>something</RiseLine>
        <br />
        <RiseLine delay={0.16} className="italic">irreplaceable.</RiseLine>
      </motion.h2>
      <Reveal delay={0.4}>
        <MagneticButton className="mt-12"><Link to="/studio" className="btn-ink">Enter the Studio <ArrowRight size={14} /></Link></MagneticButton>
      </Reveal>
    </section>
  );
}
