import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import craftHands from "@/assets/craft-hands.jpg";
import moodPalms from "@/assets/mood-palms.jpg";
import modelPortrait from "@/assets/model-portrait.jpg";

export const Route = createFileRoute("/journal")({
  head: () => ({ meta: [{ title: "Journal — Hypervault" }] }),
  component: Journal,
});

const posts = [
  { id: "01", title: "Why one-of-one is the only luxury left.", date: "MAR 2026", img: craftHands, cat: "Manifesto" },
  { id: "02", title: "Inside the atelier: 240 GSM and the perfect tee.", date: "FEB 2026", img: modelPortrait, cat: "Process" },
  { id: "03", title: "Edition 01: a love letter to slow streetwear.", date: "JAN 2026", img: moodPalms, cat: "Drops" },
];

function Journal() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16">
        <span className="micro-label">Nº 10 — The Journal</span>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl">Notes from<br/><span className="italic">the atelier.</span></h1>

        <div className="mt-20 space-y-16">
          {posts.map((p, i) => (
            <article key={p.id} className={`grid md:grid-cols-2 gap-10 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
              <div className="aspect-[4/3] bg-surface overflow-hidden">
                <img src={p.img} alt={p.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" loading="lazy" />
              </div>
              <div>
                <div className="flex items-center gap-4">
                  <span className="micro-label">{p.cat}</span>
                  <span className="font-mono text-xs text-foreground/55">{p.date}</span>
                </div>
                <h2 className="mt-4 font-serif text-4xl md:text-5xl leading-tight">{p.title}</h2>
                <p className="mt-6 text-foreground/70 leading-relaxed">An exploration of craft, restraint, and the obsession with detail that defines every Hypervault piece. Read about the people, materials, and decisions behind the edition.</p>
                <Link to="/journal" className="mt-8 inline-block text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]">Read essay →</Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
