import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Star } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({ meta: [{ title: "Reviews — Hypervault" }] }),
  component: Reviews,
});

const reviews = [
  { n: "Aarav K.", c: "Mumbai", r: 5, t: "Heirloom-quality. The vault concept changes everything.", item: "Heritage Tee" },
  { n: "Sienna M.", c: "Brooklyn", r: 5, t: "The cobalt linen is unreal. Fit is precisely what I designed.", item: "Atelier Hoodie" },
  { n: "Theo R.", c: "Berlin", r: 5, t: "Numbered. Signed. Mine. Worth every cent.", item: "Workshop Cargo" },
  { n: "Mira J.", c: "Tokyo", r: 4, t: "Shipping took 3 weeks but the piece is unrepeatable.", item: "Studio Crewneck" },
  { n: "Luca B.", c: "Milan", r: 5, t: "The macro zoom on the studio preview convinced me. Atelier-level.", item: "Heritage Tee" },
  { n: "Ines D.", c: "Paris", r: 5, t: "Worn twice in editorials already. People ask, I smile.", item: "Atelier Hoodie" },
];

function Reviews() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16">
        <span className="micro-label">Nº 12 — Voices</span>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl">Reviews.</h1>
        <div className="mt-6 flex items-center gap-3">
          <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} size={18} fill="currentColor" className="text-[color:var(--gold)]"/>)}</div>
          <span className="font-mono text-sm">4.9 · 247 reviews</span>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div key={i} className="p-8 bg-surface">
              <div className="flex">{[...Array(r.r)].map((_, i) => <Star key={i} size={14} fill="currentColor" className="text-[color:var(--gold)]"/>)}</div>
              <blockquote className="mt-4 font-serif text-2xl leading-snug">"{r.t}"</blockquote>
              <div className="hairline mt-8" />
              <div className="mt-4 flex justify-between items-end">
                <div>
                  <div className="font-serif text-lg">{r.n}</div>
                  <div className="micro-label">{r.c}</div>
                </div>
                <div className="text-xs text-foreground/55">{r.item}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
