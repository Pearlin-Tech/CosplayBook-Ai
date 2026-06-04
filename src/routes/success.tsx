import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, Package } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/success")({
  head: () => ({ meta: [{ title: "Order Vaulted — Hypervault" }] }),
  component: Success,
});

function Success() {
  const orderId = `HV-2026-${Math.floor(1000 + Math.random()*9000)}`;
  const stages = ["Confirmed", "In Atelier", "Crafted", "Shipped"];
  const activeStage = 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-24 text-center max-w-3xl mx-auto">
        <div className="mx-auto w-20 h-20 rounded-full bg-[color:var(--pop)] grid place-items-center animate-pulse-pop">
          <Check size={32} strokeWidth={2.2} />
        </div>
        <span className="micro-label mt-8 block">Receipt</span>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Order vaulted<br/><span className="italic text-[color:var(--gold)]">successfully.</span></h1>
        <p className="mt-6 text-foreground/65">Your bespoke creation is now numbered, signed, and entering our atelier.</p>

        <div className="mt-12 bg-surface p-8 text-left">
          <div className="flex justify-between">
            <div>
              <div className="micro-label">Order Reference</div>
              <div className="font-mono mt-1">{orderId}</div>
            </div>
            <div className="text-right">
              <div className="micro-label">Est. Delivery</div>
              <div className="font-mono mt-1">14–21 days</div>
            </div>
          </div>

          <div className="mt-10">
            <div className="micro-label mb-4">Shipping Tracker</div>
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px bg-border" />
              <div className="absolute top-3 left-0 h-px bg-[color:var(--pop)]" style={{ width: `${(activeStage / (stages.length-1)) * 100}%` }} />
              <div className="relative grid grid-cols-4">
                {stages.map((s, i) => (
                  <div key={s} className="text-center">
                    <div className={`mx-auto w-6 h-6 rounded-full grid place-items-center ${i <= activeStage ? "bg-[color:var(--pop)]" : "bg-background border border-border"}`}>
                      {i <= activeStage ? <Check size={12}/> : <Package size={10} className="text-foreground/40" />}
                    </div>
                    <div className="mt-3 text-[10px] font-mono uppercase tracking-[0.18em]">{s}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3 flex-wrap">
          <Link to="/vault" className="btn-ink">View in Vault</Link>
          <Link to="/" className="btn-outline">Back to Home</Link>
        </div>
      </section>
      <Footer />
    </div>
  );
}
