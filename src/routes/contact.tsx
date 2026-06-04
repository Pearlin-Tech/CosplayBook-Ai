import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — Hypervault" }] }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16 grid md:grid-cols-2 gap-16">
        <div>
          <span className="micro-label">Nº 09 — Atelier</span>
          <h1 className="mt-4 font-serif text-6xl md:text-7xl leading-[0.95]">Write to the<br/><span className="italic text-[color:var(--gold)]">house.</span></h1>
          <p className="mt-8 text-foreground/65 max-w-md">Questions, custom commissions, press inquiries. Our atelier responds within 24 hours.</p>
          <div className="mt-12 space-y-6">
            <Info label="Atelier" value="4F, Bandra Heights · Mumbai 400050" />
            <Info label="Studio NYC" value="312 Canal St · Brooklyn 11211" />
            <Info label="Email" value="hello@hypervault.studio" />
            <Info label="Phone" value="+91 22 4567 8910" />
            <Info label="Hours" value="Mon–Sat · 11:00 – 19:00 IST" />
          </div>
        </div>

        {sent ? (
          <div className="bg-surface p-12 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 rounded-full bg-[color:var(--pop)] grid place-items-center"><Check size={28}/></div>
            <h2 className="mt-6 font-serif text-3xl">Message vaulted.</h2>
            <p className="mt-3 text-foreground/60">Our atelier will respond within 24 hours.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="bg-surface p-8 md:p-12 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <Field label="First name" />
              <Field label="Last name" />
            </div>
            <Field label="Email" type="email" />
            <Field label="Subject" />
            <div>
              <label className="micro-label">Message</label>
              <textarea rows={5} className="field resize-none" />
            </div>
            <button className="btn-ink w-full justify-center">Send Message</button>
          </form>
        )}
      </section>
      <Footer />
    </div>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="micro-label">{label}</div>
      <div className="mt-1 font-serif text-xl">{value}</div>
    </div>
  );
}
function Field({ label, type = "text" }: { label: string; type?: string }) {
  return (
    <div>
      <label className="micro-label">{label}</label>
      <input type={type} className="field" required />
    </div>
  );
}
