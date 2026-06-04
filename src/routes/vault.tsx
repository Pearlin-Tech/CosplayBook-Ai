import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import teeBlack from "@/assets/product-tee-black.jpg";
import hoodieGrey from "@/assets/product-hoodie-grey.jpg";
import crewCream from "@/assets/product-crew-cream.jpg";

export const Route = createFileRoute("/vault")({
  head: () => ({ meta: [{ title: "My Vault — Hypervault" }, { name: "description", content: "Your private vault of bespoke creations." }] }),
  component: Vault,
});

const tabs = ["Orders", "Designs", "Addresses", "Account", "Wishlist", "Alerts"] as const;
type Tab = typeof tabs[number];

function Vault() {
  const [tab, setTab] = useState<Tab>("Orders");

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16 grid lg:grid-cols-[1fr_2.2fr] gap-10">
        {/* Profile card */}
        <aside className="bg-surface p-8 self-start">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-foreground text-background grid place-items-center font-serif text-2xl">AV</div>
            <div>
              <div className="font-serif text-2xl">Aarav Verma</div>
              <div className="micro-label">Vault Nº 0247</div>
            </div>
          </div>
          <div className="mt-10 grid grid-cols-3 gap-4 text-center">
            {[["3", "Active"], ["7", "Drafts"], ["$1.8K", "Invested"]].map(([n, l]) => (
              <div key={l}>
                <div className="font-serif text-3xl">{n}</div>
                <div className="micro-label mt-1">{l}</div>
              </div>
            ))}
          </div>
          <Link to="/studio" className="mt-10 flex items-center justify-center gap-3 bg-[color:var(--pop)] text-foreground py-4 text-xs uppercase tracking-[0.2em] hover:scale-[1.02] transition-transform animate-pulse-pop">
            <Plus size={16} /> Create New Design
          </Link>
          <div className="mt-10 hairline" />
          <ul className="mt-6 space-y-3 text-sm">
            <li className="flex justify-between"><span className="text-foreground/60">Member since</span><span>Mar 2025</span></li>
            <li className="flex justify-between"><span className="text-foreground/60">Tier</span><span className="text-[color:var(--gold)]">Atelier</span></li>
            <li className="flex justify-between"><span className="text-foreground/60">Reward credit</span><span>$45</span></li>
          </ul>
        </aside>

        {/* Main */}
        <div>
          <div className="flex flex-wrap gap-1 border-b border-border">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-3 text-xs uppercase tracking-[0.2em] relative ${tab === t ? "text-foreground" : "text-foreground/50 hover:text-foreground"}`}
              >
                {t}
                {tab === t && <span className="absolute left-3 right-3 -bottom-px h-[2px] bg-[color:var(--pop)]" />}
              </button>
            ))}
          </div>

          <div className="mt-10">
            {tab === "Orders" && <Orders />}
            {tab === "Designs" && <Designs />}
            {tab === "Addresses" && <Addresses />}
            {tab === "Account" && <Account />}
            {tab === "Wishlist" && <Wishlist />}
            {tab === "Alerts" && <Alerts />}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function Orders() {
  const orders = [
    { id: "HV-2026-0247", item: "Heritage Tee · Obsidian · M", price: 95, status: "In Atelier", img: teeBlack },
    { id: "HV-2026-0241", item: "Atelier Hoodie · Cobalt · L", price: 210, status: "Shipped", img: hoodieGrey },
    { id: "HV-2026-0233", item: "Studio Crewneck · Cream · M", price: 145, status: "Vaulted", img: crewCream },
  ];
  return (
    <div className="space-y-3">
      {orders.map((o) => (
        <div key={o.id} className="flex items-center gap-5 p-4 bg-surface">
          <img src={o.img} alt="" className="w-20 h-24 object-cover" />
          <div className="flex-1">
            <div className="micro-label">{o.id}</div>
            <div className="font-serif text-xl mt-1">{o.item}</div>
            <div className="text-sm text-foreground/60 mt-1">${o.price}.00</div>
          </div>
          <span className={`text-[11px] font-mono uppercase tracking-[0.18em] px-3 py-1.5 ${
            o.status === "Shipped" ? "bg-[color:var(--pop)]" : "border border-[color:var(--gold)]"
          }`}>{o.status}</span>
        </div>
      ))}
    </div>
  );
}

function Designs() {
  const items = [teeBlack, hoodieGrey, crewCream];
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((img, i) => (
        <div key={i} className="aspect-[3/4] bg-surface overflow-hidden relative group">
          <img src={img} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors grid place-items-center">
            <Link to="/studio" className="opacity-0 group-hover:opacity-100 btn-outline !border-background !text-background">Edit</Link>
          </div>
          <div className="absolute bottom-2 left-2 micro-label !text-background bg-foreground/70 px-2 py-1">Draft Nº 0{i+1}</div>
        </div>
      ))}
    </div>
  );
}

function Addresses() {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      {["Home", "Studio"].map((t) => (
        <div key={t} className="p-6 border border-border">
          <div className="flex justify-between items-start">
            <div className="micro-label">{t}</div>
            <button className="text-xs underline">Edit</button>
          </div>
          <div className="mt-4 font-serif text-xl">Aarav Verma</div>
          <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
            4th floor, Bandra Heights<br />
            Mumbai, MH 400050<br />
            India · +91 ••• ••• 4521
          </p>
        </div>
      ))}
      <button className="border border-dashed border-[color:var(--gold)] p-6 text-center hover:bg-surface">
        <Plus size={20} className="mx-auto text-[color:var(--gold)]" />
        <div className="mt-2 micro-label">Add Address</div>
      </button>
    </div>
  );
}

function Account() {
  const [notify, setNotify] = useState({ shipping: true, drops: true, marketing: false });
  return (
    <div className="space-y-10">
      <div className="grid md:grid-cols-2 gap-6">
        <Field label="Full name" defaultValue="Aarav Verma" />
        <Field label="Email" defaultValue="aarav@studio.com" />
        <Field label="Phone" defaultValue="+91 ••• ••• 4521" />
        <Field label="Date of birth" defaultValue="04 / 12 / 1996" />
      </div>

      <div>
        <span className="micro-label">Notifications</span>
        <div className="mt-4 space-y-2">
          {Object.entries(notify).map(([k, v]) => (
            <div key={k} className="flex items-center justify-between p-4 bg-surface">
              <div>
                <div className="capitalize">{k}</div>
                <div className="text-xs text-foreground/55 mt-0.5">{k === "shipping" ? "Order & atelier updates" : k === "drops" ? "Edition releases" : "Promotional content"}</div>
              </div>
              <button
                onClick={() => setNotify({ ...notify, [k]: !v })}
                className={`relative w-11 h-6 rounded-full transition-colors ${v ? "bg-[color:var(--pop)]" : "bg-border"}`}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all ${v ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-[color:var(--destructive)]/40 rounded p-6">
        <span className="micro-label !text-[color:var(--destructive)]">Danger Zone</span>
        <h3 className="font-serif text-2xl mt-2">Irreversible actions</h3>
        <div className="mt-6 flex flex-wrap gap-3">
          <button className="text-xs uppercase tracking-[0.2em] px-5 py-3 border border-[color:var(--destructive)] text-[color:var(--destructive)] hover:bg-[color:var(--destructive)] hover:text-background">Sign Out All Devices</button>
          <button className="text-xs uppercase tracking-[0.2em] px-5 py-3 border border-[color:var(--destructive)] text-[color:var(--destructive)] hover:bg-[color:var(--destructive)] hover:text-background">Delete Account</button>
        </div>
      </div>
    </div>
  );
}

function Wishlist() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {[teeBlack, crewCream].map((i, idx) => (
        <div key={idx} className="aspect-[3/4] bg-surface overflow-hidden">
          <img src={i} alt="" className="w-full h-full object-cover" />
        </div>
      ))}
    </div>
  );
}

function Alerts() {
  const items = [
    { t: "Edition 02 drops Friday", d: "2h ago" },
    { t: "Your order HV-2026-0241 has shipped", d: "yesterday" },
    { t: "New Italian linen now in atelier", d: "3 days ago" },
  ];
  return (
    <div className="space-y-2">
      {items.map((a, i) => (
        <div key={i} className="flex items-center justify-between p-4 bg-surface border-l-2 border-[color:var(--pop)]">
          <div className="font-serif text-lg">{a.t}</div>
          <div className="micro-label">{a.d}</div>
        </div>
      ))}
    </div>
  );
}

function Field({ label, defaultValue }: { label: string; defaultValue: string }) {
  return (
    <div>
      <label className="micro-label">{label}</label>
      <input className="field" defaultValue={defaultValue} />
    </div>
  );
}
