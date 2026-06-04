import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/care")({
  head: () => ({ meta: [{ title: "Care Guide — Hypervault" }] }),
  component: Care,
});

const steps = [
  { n: "01", t: "Wash cold", d: "Inside out, 30°C max. Gentle cycle with neutral detergent." },
  { n: "02", t: "Air dry", d: "Lay flat in shade. Never tumble dry — heat is the enemy of bespoke." },
  { n: "03", t: "Iron low", d: "On the reverse side, never directly over print or embroidery." },
  { n: "04", t: "Store folded", d: "Folded, not hung. Cotton breathes better off the hanger." },
];

function Care() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16 max-w-4xl">
        <span className="micro-label">Nº 13 — Longevity</span>
        <h1 className="mt-4 font-serif text-6xl md:text-7xl">Care instructions.</h1>
        <p className="mt-6 text-foreground/65 max-w-xl">A Hypervault piece is built to outlast the season. Treat it like the heirloom it is.</p>

        <div className="mt-16 space-y-px">
          {steps.map((s) => (
            <div key={s.n} className="grid grid-cols-[80px_1fr] gap-8 p-8 bg-surface border-b border-background last:border-0">
              <div className="font-mono text-2xl text-[color:var(--gold)]">{s.n}</div>
              <div>
                <h3 className="font-serif text-3xl">{s.t}</h3>
                <p className="mt-2 text-foreground/65">{s.d}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 border border-[color:var(--gold)] text-center">
          <span className="micro-label">Lifetime guarantee</span>
          <h2 className="mt-4 font-serif text-3xl">Every stitch, vaulted.</h2>
          <p className="mt-3 text-foreground/65">Any factory fault, any time. We repair or replace — forever.</p>
          <Link to="/contact" className="btn-outline mt-8">Claim repair</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
