import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Plus, LogOut, BadgeCheck, Trash2, Edit3, Bookmark, MapPin, Bell, Shield, ShoppingBag, Heart } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useSession } from "@/lib/session";
import { useSavedDesigns } from "@/lib/saved-designs";
import { MagneticButton } from "@/components/motion/MagneticButton";
import teeBlack from "@/assets/product-tee-black.jpg";
import hoodieGrey from "@/assets/product-hoodie-grey.jpg";
import crewCream from "@/assets/product-crew-cream.jpg";
import pantsOlive from "@/assets/product-pants-olive.jpg";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export const Route = createFileRoute("/vault")({
  head: () => ({ meta: [{ title: "My Vault — Hypervault" }, { name: "description", content: "Your private vault of bespoke creations." }] }),
  component: VaultGate,
});

const tabs = [
  { id: "orders", label: "Orders", icon: ShoppingBag },
  { id: "designs", label: "Designs", icon: Bookmark },
  { id: "wishlist", label: "Wishlist", icon: Heart },
  { id: "addresses", label: "Addresses", icon: MapPin },
  { id: "profile", label: "Account", icon: Edit3 },
  { id: "alerts", label: "Alerts", icon: Bell },
  { id: "preferences", label: "Preferences", icon: Bell },
  { id: "security", label: "Danger Zone", icon: Shield },
] as const;
type Tab = typeof tabs[number]["id"];

function VaultGate() {
  const { loggedIn, signIn, user } = useSession();
  if (!loggedIn || !user) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container-edge py-32 text-center max-w-lg mx-auto">
          <span className="micro-label">Vault Access</span>
          <h1 className="mt-6 font-serif text-5xl">Enter your <span className="italic text-[color:var(--gold)]">Vault</span></h1>
          <p className="mt-4 text-foreground/65">Your archive of orders, saved designs, and configuration history.</p>
          <MagneticButton className="mt-10">
            <button onClick={signIn} className="btn-ink">Enter Vault</button>
          </MagneticButton>
        </div>
        <Footer />
      </div>
    );
  }
  return <Vault />;
}

function Vault() {
  const [tab, setTab] = useState<Tab>("orders");
  const { user, signOut } = useSession();
  const navigate = useNavigate();
  if (!user) return null;

  const handleLogout = () => {
    signOut();
    navigate({ to: "/" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-12 lg:py-16 grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12">
        {/* Sidebar */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="bg-surface p-7">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-foreground text-background grid place-items-center font-serif text-xl">
                {user.initials}
              </div>
              <div className="min-w-0">
                <div className="font-serif text-xl truncate">{user.name}</div>
                <div className="flex items-center gap-1 text-xs text-foreground/55 truncate">
                  {user.email} {user.emailVerified && <BadgeCheck size={12} className="text-[color:var(--gold)]" />}
                </div>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-3 gap-2 text-center">
              {[["3", "Active"], ["7", "Drafts"], ["$1.8K", "Spent"]].map(([n, l]) => (
                <div key={l}>
                  <div className="font-serif text-2xl">{n}</div>
                  <div className="micro-label mt-0.5 text-[10px]">{l}</div>
                </div>
              ))}
            </div>
            <MagneticButton className="mt-6 w-full">
              <Link to="/studio" className="flex items-center justify-center gap-3 bg-[color:var(--pop)] text-foreground py-3.5 text-xs uppercase tracking-[0.2em] w-full">
                <Plus size={14} /> Create New Design
              </Link>
            </MagneticButton>
            <ul className="mt-6 space-y-2 text-sm border-t border-border pt-5">
              <li className="flex justify-between"><span className="text-foreground/55">Vault</span><span className="font-mono">{user.vault}</span></li>
              <li className="flex justify-between"><span className="text-foreground/55">Tier</span><span className="text-[color:var(--gold)]">{user.tier}</span></li>
              <li className="flex justify-between"><span className="text-foreground/55">Member</span><span>{user.joined}</span></li>
            </ul>
          </div>

          {/* Tab nav */}
          <nav className="mt-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
            {tabs.map((t) => {
              const Icon = t.icon;
              const active = tab === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${
                    active ? "bg-foreground text-background" : "hover:bg-surface text-foreground/70"
                  } ${t.id === "security" ? (active ? "" : "text-[color:var(--destructive)]/80 hover:text-[color:var(--destructive)]") : ""}`}
                >
                  <Icon size={13} />
                  {t.label}
                </button>
              );
            })}
            <button
              onClick={handleLogout}
              className="lg:mt-4 flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.18em] border border-border hover:bg-foreground hover:text-background transition-colors whitespace-nowrap"
            >
              <LogOut size={13} /> Sign Out
            </button>
          </nav>
        </aside>

        {/* Main */}
        <div className="min-w-0">
          {tab === "orders" && <Orders />}
          {tab === "designs" && <Designs />}
          {tab === "wishlist" && <Wishlist />}
          {tab === "profile" && <Profile />}
          {tab === "addresses" && <Addresses />}
          {tab === "alerts" && <Alerts />}
          {tab === "preferences" && <Preferences />}
          {tab === "security" && <DangerZone onLogout={handleLogout} />}
        </div>
      </section>
      <Footer />
    </div>
  );
}

const STAGES = ["Order Confirmed", "Crafting in Batch", "Shipped via Premium Courier", "Delivered"];

function Orders() {
  const orders = [
    { id: "HV-2026-0247", item: "Oversized Tee · Obsidian · M", price: 95, stage: 1, img: teeBlack, eta: "ETA 18 Jun" },
    { id: "HV-2026-0241", item: "Atelier Hoodie · Cobalt · L", price: 210, stage: 2, img: hoodieGrey, eta: "ETA 09 Jun" },
    { id: "HV-2026-0233", item: "Studio Crewneck · Cream · M", price: 145, stage: 3, img: crewCream, eta: "Delivered 02 Jun" },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-end justify-between">
        <div>
          <span className="micro-label">Active Orders</span>
          <h2 className="font-serif text-4xl mt-2">Atelier Tracking</h2>
        </div>
      </div>
      {orders.map((o) => (
        <OrderCard key={o.id} {...o} />
      ))}
    </div>
  );
}

function OrderCard({ id, item, price, stage, img, eta }: { id: string; item: string; price: number; stage: number; img: string; eta: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <div ref={ref} className="bg-surface p-5 md:p-7">
      <div className="flex items-start gap-5">
        <img src={img} alt="" className="w-20 h-24 md:w-24 md:h-28 object-cover shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <div>
              <div className="micro-label">{id}</div>
              <div className="font-serif text-xl mt-1">{item}</div>
            </div>
            <div className="text-right">
              <div className="font-mono text-sm">${price}.00</div>
              <div className="text-[11px] text-foreground/55 mt-0.5">{eta}</div>
            </div>
          </div>
          {/* Radar tracker */}
          <div className="mt-6">
            <div className="relative h-1 bg-border rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={inView ? { width: `${(stage / (STAGES.length - 1)) * 100}%` } : {}}
                transition={{ duration: 1.2, ease: [0.2, 0.7, 0.2, 1], delay: 0.2 }}
                className="absolute inset-y-0 left-0 bg-foreground"
              />
            </div>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {STAGES.map((s, i) => {
                const reached = i <= stage;
                const current = i === stage;
                return (
                  <div key={s} className="flex flex-col items-start gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className={`relative w-2.5 h-2.5 rounded-full ${reached ? "bg-foreground" : "bg-border"}`}
                      >
                        {current && (
                          <span className="absolute inset-0 rounded-full bg-[color:var(--pop)] animate-pulse-beacon" />
                        )}
                      </span>
                    </div>
                    <span className={`text-[10px] font-mono uppercase tracking-[0.12em] leading-tight ${reached ? "text-foreground" : "text-foreground/40"}`}>
                      {s}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Designs() {
  const { items, remove } = useSavedDesigns();
  const stock = [
    { thumb: teeBlack, name: "Heritage Tee Draft", config: "Obsidian · M" },
    { thumb: hoodieGrey, name: "Atelier Hoodie Draft", config: "Cobalt · L" },
    { thumb: crewCream, name: "Studio Crewneck", config: "Cream · M" },
  ];
  return (
    <div>
      <div className="flex items-end justify-between">
        <div>
          <span className="micro-label">Saved Designs</span>
          <h2 className="font-serif text-4xl mt-2">Your Drafts</h2>
        </div>
        <Link to="/studio" className="btn-outline">+ New Design</Link>
      </div>

      {items.length > 0 && (
        <div className="mt-8 grid grid-cols-2 md:grid-cols-3 gap-4">
          {items.map((d) => (
            <motion.div
              key={d.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-surface overflow-hidden group"
            >
              <div className="aspect-[3/4] relative">
                <img src={d.thumb} alt="" className="w-full h-full object-cover" style={{ filter: "grayscale(1)" }} />
                <div className="absolute inset-0" style={{ backgroundColor: d.colorHex, mixBlendMode: "multiply", opacity: 0.7 }} />
                <div className="absolute top-2 left-2 micro-label !text-background bg-foreground/70 px-2 py-1 text-[9px]">VAULTED</div>
                <button
                  onClick={() => remove(d.id)}
                  className="absolute top-2 right-2 p-1.5 bg-background/85 hover:bg-[color:var(--destructive)] hover:text-background transition-colors"
                  title="Remove"
                >
                  <Trash2 size={12} />
                </button>
              </div>
              <div className="p-3">
                <div className="font-serif text-sm truncate">{d.garmentName}</div>
                <div className="micro-label mt-1 text-[9px] truncate">{d.colorName} · {d.size}</div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <span className="micro-label">Workspace</span>
        <div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-4">
          {stock.map((s, i) => (
            <Link to="/studio" key={i} className="aspect-[3/4] bg-surface overflow-hidden relative group block">
              <img src={s.thumb} alt="" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors grid place-items-center">
                <span className="opacity-0 group-hover:opacity-100 btn-outline !border-background !text-background">Edit</span>
              </div>
              <div className="absolute bottom-2 left-2 micro-label !text-background bg-foreground/70 px-2 py-1">Draft Nº 0{i+1}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function Profile() {
  const { user, update } = useSession();
  if (!user) return null;
  return (
    <div>
      <span className="micro-label">Personal Information</span>
      <h2 className="font-serif text-4xl mt-2">Identity</h2>
      <p className="mt-2 text-sm text-foreground/55 italic-serif">All fields editable. Changes persist to your vault profile.</p>

      <div className="mt-10 grid md:grid-cols-2 gap-x-8 gap-y-6">
        <Field label="Full name" value={user.name} onChange={(v) => update({ name: v, initials: v.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase() })} />
        <Field label="Email" value={user.email} onChange={(v) => update({ email: v })} verified={user.emailVerified} />
        <Field label="Phone" value={user.phone} onChange={(v) => update({ phone: v })} />
        <Field label="Date of birth" value={user.dob} onChange={(v) => update({ dob: v })} type="date" />
        <Select
          label="Gender"
          value={user.gender}
          onChange={(v) => update({ gender: v })}
          options={["Prefer not to say", "Woman", "Man", "Non-binary", "Other"]}
        />
        <Field label="Tier" value={user.tier} onChange={(v) => update({ tier: v })} readOnly />
      </div>
    </div>
  );
}

function Addresses() {
  const [addrs, setAddrs] = useState([
    { id: "a1", label: "Home", name: "Aarav Verma", line: "4th floor, Bandra Heights", city: "Mumbai, MH 400050", country: "India", phone: "+91 ••• ••• 4521", primary: true },
    { id: "a2", label: "Studio", name: "Aarav Verma", line: "Atelier Loft Nº 12", city: "Lower Parel, MH 400013", country: "India", phone: "+91 ••• ••• 4521", primary: false },
  ]);
  return (
    <div>
      <span className="micro-label">Address Book</span>
      <h2 className="font-serif text-4xl mt-2">Shipping Vault</h2>
      <div className="mt-8 grid md:grid-cols-2 gap-4">
        {addrs.map((a) => (
          <div key={a.id} className="p-6 border border-border bg-surface/40">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-2">
                <span className="micro-label">{a.label}</span>
                {a.primary && <span className="text-[9px] font-mono uppercase tracking-[0.15em] bg-[color:var(--pop)] px-2 py-0.5">Primary</span>}
              </div>
              <div className="flex gap-2">
                <button className="text-xs underline hover:text-foreground/60">Edit</button>
                <button onClick={() => setAddrs(addrs.filter((x) => x.id !== a.id))} className="text-xs underline text-[color:var(--destructive)]/80">Remove</button>
              </div>
            </div>
            <div className="mt-4 font-serif text-xl">{a.name}</div>
            <p className="mt-2 text-sm text-foreground/70 leading-relaxed">
              {a.line}<br />{a.city}<br />{a.country} · {a.phone}
            </p>
          </div>
        ))}
        <button className="border border-dashed border-[color:var(--gold)] p-6 text-center hover:bg-surface min-h-[180px]">
          <Plus size={22} className="mx-auto text-[color:var(--gold)]" />
          <div className="mt-2 micro-label">Add Address</div>
        </button>
      </div>
    </div>
  );
}

function Preferences() {
  const [notify, setNotify] = useState({ shipping: true, drops: true, marketing: false, atelier: true });
  const [currency, setCurrency] = useState("USD");
  const [defaultSize, setDefaultSize] = useState("M");
  return (
    <div className="space-y-10">
      <div>
        <span className="micro-label">Notifications</span>
        <h2 className="font-serif text-4xl mt-2">Atelier Signals</h2>
        <div className="mt-6 space-y-2">
          {([
            ["shipping", "Shipping & order updates"],
            ["atelier", "Atelier crafting status"],
            ["drops", "Edition releases"],
            ["marketing", "Promotional content"],
          ] as const).map(([k, label]) => (
            <div key={k} className="flex items-center justify-between p-4 bg-surface">
              <div>
                <div className="text-sm">{label}</div>
              </div>
              <button
                onClick={() => setNotify({ ...notify, [k]: !notify[k] })}
                className={`relative w-11 h-6 rounded-full transition-colors ${notify[k] ? "bg-[color:var(--pop)]" : "bg-border"}`}
                aria-label={label}
              >
                <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all ${notify[k] ? "left-[22px]" : "left-0.5"}`} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Select label="Default size" value={defaultSize} onChange={setDefaultSize} options={["XS", "S", "M", "L", "XL", "XXL"]} />
        <Select label="Currency" value={currency} onChange={setCurrency} options={["USD", "EUR", "GBP", "INR", "JPY"]} />
      </div>
    </div>
  );
}

function DangerZone({ onLogout }: { onLogout: () => void }) {
  return (
    <div>
      <span className="micro-label !text-[color:var(--destructive)]">Danger Zone</span>
      <h2 className="font-serif text-4xl mt-2">Irreversible Actions</h2>

      <div className="mt-8 relative">
        {/* Bracketed card */}
        <div className="absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[color:var(--destructive)]/60" />
        <div className="absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[color:var(--destructive)]/60" />
        <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[color:var(--destructive)]/60" />
        <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[color:var(--destructive)]/60" />
        <div className="border border-[color:var(--destructive)]/35 p-8 space-y-6">
          <DangerRow
            title="Sign Out of All Devices"
            desc="Revoke active sessions across every browser and device tied to this vault."
            actionLabel="Sign Out Everywhere"
            onConfirm={onLogout}
          />
          <div className="border-t border-[color:var(--destructive)]/20" />
          <DangerRow
            title="Delete Vault Account"
            desc="Permanently erase your profile, saved designs, addresses, and order history. This cannot be undone."
            actionLabel="Delete Account"
            destructive
            onConfirm={onLogout}
          />
        </div>
      </div>
    </div>
  );
}

function DangerRow({ title, desc, actionLabel, destructive, onConfirm }: { title: string; desc: string; actionLabel: string; destructive?: boolean; onConfirm: () => void }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="max-w-md">
        <div className="font-serif text-xl">{title}</div>
        <p className="mt-1 text-sm text-foreground/60">{desc}</p>
      </div>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <button className={`text-xs uppercase tracking-[0.18em] px-5 py-3 border ${destructive ? "border-[color:var(--destructive)] bg-[color:var(--destructive)] text-background hover:opacity-90" : "border-[color:var(--destructive)] text-[color:var(--destructive)] hover:bg-[color:var(--destructive)] hover:text-background"} transition-colors`}>
            {actionLabel}
          </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}?</AlertDialogTitle>
            <AlertDialogDescription>{desc}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  verified,
  readOnly,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  verified?: boolean;
  readOnly?: boolean;
}) {
  return (
    <div>
      <label className="micro-label flex items-center gap-2">
        {label}
        {verified && <BadgeCheck size={12} className="text-[color:var(--gold)]" />}
      </label>
      <input
        type={type}
        className="field"
        value={value}
        readOnly={readOnly}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div>
      <label className="micro-label">{label}</label>
      <select
        className="field bg-transparent"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o} value={o}>{o}</option>
        ))}
      </select>
    </div>
  );
}
