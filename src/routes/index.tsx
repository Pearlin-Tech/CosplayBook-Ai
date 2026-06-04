import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Zap } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
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
  return (
    <div className="min-h-screen bg-background text-foreground">
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
  return (
    <section className="container-edge pt-16 pb-24 md:pt-24 md:pb-32 grid md:grid-cols-12 gap-10 items-start">
      <div className="md:col-span-6 md:sticky md:top-28">
        <div className="flex items-center gap-3">
          <div className="hairline w-10" />
          <span className="micro-label">Edition 01 — The Vault</span>
        </div>
        <h1 className="mt-10 font-serif text-[14vw] md:text-[7.5vw] leading-[0.92] tracking-[-0.03em]">
          Bespoke
          <br />
          Streetwear,
          <br />
          <span className="italic text-[color:var(--gold)]">Vaulted</span>
          <br />
          by You.
        </h1>
        <p className="mt-10 max-w-md text-foreground/70 leading-relaxed">
          Design every thread. Own every detail. Your custom apparel,
          crafted in limited batches — never mass-produced, never repeated.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Link to="/studio" className="btn-ink">
            Enter Studio <ArrowRight size={14} />
          </Link>
          <Link to="/vault" className="btn-outline">My Vault</Link>
        </div>
      </div>

      <div className="md:col-span-6 grid grid-cols-2 gap-3 md:gap-5 relative">
        <div className="aspect-[3/4] bg-surface overflow-hidden">
          <img src={teeBlack} alt="Black premium tee" className="w-full h-full object-cover" width={1024} height={1280} />
        </div>
        <div className="relative aspect-[3/4] bg-surface overflow-hidden mt-12">
          <img src={hoodieGrey} alt="Grey premium hoodie" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
          <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-foreground text-background flex items-center justify-center animate-spin-slow">
            <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
              <defs>
                <path id="circle-path" d="M 50,50 m -36,0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0" />
              </defs>
              <text className="text-[9px] uppercase tracking-[0.18em] fill-background font-mono">
                <textPath href="#circle-path">START CUSTOMIZING · START CUSTOMIZING · </textPath>
              </text>
            </svg>
            <Link to="/studio" className="w-12 h-12 rounded-full bg-[color:var(--pop)] text-foreground flex items-center justify-center hover:scale-110 transition-transform">
              <Zap size={18} fill="currentColor" />
            </Link>
          </div>
        </div>
        <div className="aspect-[3/4] bg-surface overflow-hidden">
          <img src={moodPalms} alt="Mood palms" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
        </div>
        <div className="aspect-[3/4] bg-surface overflow-hidden mt-12">
          <img src={modelPortrait} alt="Model" className="w-full h-full object-cover" width={1024} height={1280} loading="lazy" />
        </div>
      </div>
    </section>
  );
}

function Manifesto() {
  return (
    <section className="bg-[#0d0d0d] text-background py-32">
      <div className="container-edge text-center">
        <div className="font-serif text-7xl text-[color:var(--gold)]">&quot;</div>
        <h2 className="mt-4 font-serif text-3xl md:text-6xl leading-[1.1] max-w-5xl mx-auto">
          The only garment you wear that{" "}
          <span className="italic bg-gradient-to-r from-[color:var(--gold-soft)] to-[color:var(--gold)] bg-clip-text text-transparent">nobody</span>{" "}
          can copy.
        </h2>
        <div className="mt-10 flex items-center justify-center gap-4">
          <span className="hairline w-20 bg-foreground/30" />
          <span className="micro-label">The Hypervault Manifesto</span>
          <span className="hairline w-20 bg-foreground/30" />
        </div>
      </div>
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
      <div className="flex items-center gap-3">
        <div className="hairline w-10" />
        <span className="micro-label">Nº 04 — The Process</span>
      </div>
      <h2 className="mt-8 font-serif text-6xl md:text-8xl leading-[0.95]">
        Three movements,
        <br />
        <span className="italic">one garment.</span>
      </h2>
      <div className="mt-16 border border-[color:var(--gold-soft)] rounded-md grid md:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.n} className={`p-10 md:p-12 ${i < 2 ? "md:border-r border-[color:var(--gold-soft)]" : ""}`}>
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 border border-[color:var(--gold)] rounded grid place-items-center">
                <span className="text-[color:var(--gold)] font-mono text-xs">◆</span>
              </div>
              <span className="font-mono text-xs text-foreground/50">{s.n} / 03</span>
            </div>
            <h3 className="mt-12 font-serif text-4xl">{s.t}</h3>
            <p className="mt-4 text-foreground/65 max-w-xs leading-relaxed">{s.d}</p>
            <div className="hairline mt-12 bg-[color:var(--gold-soft)]" />
          </div>
        ))}
      </div>
    </section>
  );
}

function Vault() {
  return (
    <section className="container-edge py-32 grid md:grid-cols-2 gap-10 items-center">
      <div className="aspect-[4/5] overflow-hidden bg-surface">
        <img src={craftHands} alt="Hands crafting fabric" className="w-full h-full object-cover" width={1280} height={1024} loading="lazy" />
      </div>
      <div>
        <span className="micro-label">Nº 05 — The Vault</span>
        <h2 className="mt-6 font-serif text-5xl md:text-7xl leading-[0.98]">
          Your archive,
          <br />
          <span className="italic text-[color:var(--gold)]">held forever.</span>
        </h2>
        <p className="mt-8 text-foreground/70 max-w-md leading-relaxed">
          Every Hypervault piece is numbered, signed, and recorded in your
          private vault — a permanent record of your creative ownership.
        </p>
        <div className="mt-10 grid grid-cols-3 gap-6">
          {[["247", "Active Vaults"], ["1.2K", "Pieces Crafted"], ["100%", "Single-Edition"]].map(([n, l]) => (
            <div key={l}>
              <div className="font-serif text-4xl md:text-5xl">{n}</div>
              <div className="mt-1 micro-label">{l}</div>
            </div>
          ))}
        </div>
        <Link to="/vault" className="btn-ink mt-12">Open Vault <ArrowRight size={14} /></Link>
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
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <span className="micro-label">Nº 06 — The Collection</span>
          <h2 className="mt-6 font-serif text-5xl md:text-7xl">Featured pieces.</h2>
        </div>
        <Link to="/collections" className="text-sm uppercase tracking-[0.2em] hover:text-[color:var(--gold)] inline-flex items-center gap-2">
          View all <ArrowRight size={14} />
        </Link>
      </div>
      <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-5">
        {featured.map((p) => (
          <Link key={p.id} to="/studio" search={{ p: p.id }} className="group">
            <div className="aspect-[3/4] overflow-hidden bg-surface">
              <img src={p.img} alt={p.name} loading="lazy" width={1024} height={1280} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
            </div>
            <div className="mt-4 flex items-baseline justify-between">
              <h3 className="font-serif text-xl">{p.name}</h3>
              <span className="font-mono text-sm">${p.price}</span>
            </div>
            <div className="mt-1 micro-label opacity-70">Customize →</div>
          </Link>
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
    <section className="bg-surface py-32">
      <div className="container-edge">
        <span className="micro-label">Nº 07 — Voices</span>
        <h2 className="mt-6 font-serif text-5xl md:text-7xl">Worn by makers.</h2>
        <div className="mt-16 grid md:grid-cols-3 gap-8">
          {items.map((t, i) => (
            <figure key={i} className="border-t border-[color:var(--gold-soft)] pt-8">
              <div className="text-[color:var(--gold)] font-serif text-3xl leading-none">"</div>
              <blockquote className="mt-4 font-serif text-2xl leading-snug">{t.q}</blockquote>
              <figcaption className="mt-8 micro-label">{t.a}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-16 text-center">
          <Link to="/reviews" className="btn-outline">Read all reviews</Link>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="container-edge py-32 text-center">
      <span className="micro-label">Begin</span>
      <h2 className="mt-6 font-serif text-6xl md:text-9xl leading-[0.95]">
        Make something
        <br />
        <span className="italic">irreplaceable.</span>
      </h2>
      <Link to="/studio" className="btn-ink mt-12">Enter the Studio <ArrowRight size={14} /></Link>
    </section>
  );
}
