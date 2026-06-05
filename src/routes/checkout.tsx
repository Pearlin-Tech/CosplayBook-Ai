import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, X, ShieldCheck, Lock, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Hypervault" }] }),
  component: Checkout,
});

function detectBrand(num: string) {
  const n = num.replace(/\s/g, "");
  if (/^4/.test(n)) return "visa";
  if (/^(5[1-5]|2[2-7])/.test(n)) return "mc";
  if (/^3[47]/.test(n)) return "amex";
  if (/^6/.test(n)) return "discover";
  return "generic";
}

function formatNumber(v: string) {
  return v.replace(/\D/g, "").slice(0, 19).replace(/(.{4})/g, "$1 ").trim();
}

function Checkout() {
  const { cart, remove, setQty, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [tab, setTab] = useState<"upi" | "card">("card");
  const [upiOpen, setUpiOpen] = useState(false);
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [flipped, setFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 0 ? 12 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;
  const brand = detectBrand(card.number);

  const handlePay = () => {
    if (!cart.length) return;
    setProcessing(true);
    setTimeout(() => { clear(); navigate({ to: "/success" }); }, 2400);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16">
        <span className="micro-label">Nº 08 — Transaction</span>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Secure your <em className="italic-serif text-[color:var(--gold)]">vault.</em></h1>

        {cart.length === 0 ? (
          <div className="mt-24 text-center">
            <p className="text-foreground/60">Your cabinet is empty.</p>
            <Link to="/studio" className="btn-ink mt-8">Enter the Studio</Link>
          </div>
        ) : (
          <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-10">
            <div className="space-y-4">
              {cart.map((c) => (
                <div key={c.id} className="flex gap-5 p-5 bg-surface">
                  <img src={c.image} alt="" className="w-24 h-32 object-cover" />
                  <div className="flex-1">
                    <div className="font-serif text-2xl">{c.name}</div>
                    <div className="mt-1 text-sm text-foreground/65">{c.config}</div>
                    <div className="mt-4 flex items-center gap-4">
                      <div className="flex items-center border border-border">
                        <button onClick={() => setQty(c.id, c.qty - 1)} className="p-2"><Minus size={12} /></button>
                        <span className="px-3 font-mono text-sm">{c.qty}</span>
                        <button onClick={() => setQty(c.id, c.qty + 1)} className="p-2"><Plus size={12} /></button>
                      </div>
                      <button onClick={() => remove(c.id)} className="text-xs uppercase tracking-[0.2em] text-foreground/55 hover:text-[color:var(--destructive)] inline-flex items-center gap-1"><X size={12}/> Remove</button>
                    </div>
                  </div>
                  <div className="font-serif text-xl">${c.price * c.qty}</div>
                </div>
              ))}

              {/* Payment */}
              <div className="bg-surface p-8 mt-10">
                <div className="flex items-center gap-2 micro-label"><ShieldCheck size={14}/> Premium Gateway · 256-bit AES</div>
                <h2 className="font-serif text-3xl mt-3">Payment</h2>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button onClick={() => setTab("card")} className={`p-3 text-xs uppercase tracking-[0.18em] border ${tab === "card" ? "bg-foreground text-background border-foreground" : "border-border"}`}>Card</button>
                  <button onClick={() => setTab("upi")} className={`p-3 text-xs uppercase tracking-[0.18em] border ${tab === "upi" ? "bg-foreground text-background border-foreground" : "border-border"}`}>Instant UPI</button>
                </div>

                {tab === "card" ? (
                  <div className="mt-8 space-y-6">
                    <CardVisualizer card={card} brand={brand} flipped={flipped} />

                    <div className="space-y-5">
                      <div>
                        <label className="micro-label">Card Number</label>
                        <input
                          value={card.number}
                          onChange={(e) => setCard({ ...card, number: formatNumber(e.target.value) })}
                          onFocus={() => setFlipped(false)}
                          placeholder="0000 0000 0000 0000"
                          className="field font-mono tracking-[0.15em]"
                        />
                      </div>
                      <div>
                        <label className="micro-label">Cardholder Name</label>
                        <input
                          value={card.name}
                          onChange={(e) => setCard({ ...card, name: e.target.value.toUpperCase() })}
                          onFocus={() => setFlipped(false)}
                          placeholder="A. VERMA"
                          className="field"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="micro-label">Expiry</label>
                          <input
                            value={card.exp}
                            onChange={(e) => {
                              const v = e.target.value.replace(/\D/g, "").slice(0, 4);
                              setCard({ ...card, exp: v.length > 2 ? `${v.slice(0,2)}/${v.slice(2)}` : v });
                            }}
                            onFocus={() => setFlipped(false)}
                            placeholder="MM/YY"
                            className="field font-mono"
                          />
                        </div>
                        <div>
                          <label className="micro-label">CVV</label>
                          <input
                            value={card.cvv}
                            onChange={(e) => setCard({ ...card, cvv: e.target.value.replace(/\D/g, "").slice(0,4) })}
                            onFocus={() => setFlipped(true)}
                            onBlur={() => setFlipped(false)}
                            maxLength={4}
                            placeholder="•••"
                            className="field font-mono"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: "gpay", label: "Google Pay", color: "#4285F4" },
                        { id: "phonepe", label: "PhonePe", color: "#5f259f" },
                        { id: "paytm", label: "Paytm", color: "#00BAF2" },
                      ].map((p) => (
                        <button key={p.id} className="p-5 bg-background border border-border hover:border-foreground transition-colors flex flex-col items-center gap-2">
                          <span className="w-8 h-8 rounded-full" style={{ background: p.color }} />
                          <span className="text-xs">{p.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Accordion */}
                    <button
                      onClick={() => setUpiOpen(!upiOpen)}
                      className="w-full flex items-center justify-between p-4 border border-border hover:border-foreground transition-colors"
                    >
                      <span className="text-sm">Enter UPI ID manually</span>
                      <span className="font-mono text-lg">{upiOpen ? "−" : "+"}</span>
                    </button>
                    <AnimatePresence initial={false}>
                      {upiOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-2">
                            <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@upi" className="field" />
                            <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/55">Verification dispatched to your linked banking app.</p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </div>

            {/* Summary */}
            <aside className="lg:sticky lg:top-24 self-start bg-surface p-8">
              <div className="micro-label">Summary</div>
              <h2 className="font-serif text-3xl mt-2">Order Nº {Math.floor(Math.random()*9999)}</h2>
              <div className="mt-8 space-y-3 text-sm">
                <Row label="Subtotal" value={`$${subtotal}`} />
                <Row label="Shipping (Express)" value={`$${shipping}`} />
                <Row label="Tax" value={`$${tax}`} />
                <div className="hairline my-4" />
                <Row label="Total" value={`$${total}`} large />
              </div>
              <button onClick={handlePay} disabled={processing} className="btn-ink mt-8 w-full justify-center disabled:opacity-50">
                <Lock size={12} /> Vault Order · ${total}
              </button>
              <div className="mt-4 text-[11px] text-center text-foreground/55 font-mono uppercase tracking-[0.15em]">Encrypted · PCI-DSS · 30-day returns</div>
            </aside>
          </div>
        )}
      </section>
      <Footer />

      {/* Securing overlay */}
      <AnimatePresence>
        {processing && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-background/96 backdrop-blur-md grid place-items-center"
          >
            <div className="text-center max-w-sm px-6">
              <div className="relative w-24 h-24 mx-auto">
                <span className="absolute inset-0 rounded-full border border-[color:var(--gold)]/40" />
                <span className="absolute inset-2 rounded-full border-2 border-foreground border-t-transparent animate-spin" />
                <span className="absolute inset-0 grid place-items-center">
                  <ShieldCheck size={26} className="text-[color:var(--gold)]" />
                </span>
              </div>
              <div className="micro-label mt-6">Hypervault Gateway</div>
              <h3 className="mt-3 font-serif text-3xl">Securing Transaction…</h3>
              <div className="mt-6 space-y-2 text-left max-w-xs mx-auto">
                {["Encrypting payload","Verifying issuer","Issuing vault receipt"].map((s, i) => (
                  <motion.div
                    key={s}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + i * 0.5 }}
                    className="flex items-center gap-3 text-xs font-mono uppercase tracking-[0.15em]"
                  >
                    <Check size={12} className="text-[color:var(--pop)]" /> {s}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function CardVisualizer({ card, brand, flipped }: { card: { number: string; name: string; exp: string; cvv: string }; brand: string; flipped: boolean }) {
  return (
    <div className="relative h-56" style={{ perspective: "1400px" }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.8, ease: [0.4, 0.0, 0.2, 1] }}
        className="absolute inset-0"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden text-background p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 45%, #0a0a0a 100%)",
            boxShadow: "0 30px 60px -25px rgba(17,17,17,0.5)",
          }}
        >
          {/* sheen */}
          <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 20% 10%, rgba(212,163,115,0.45), transparent 50%)" }} />
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(212,255,0,0.12), transparent 70%)" }} />

          <div className="flex justify-between items-start relative z-10">
            <div>
              <div className="text-[9px] font-mono uppercase tracking-[0.3em] text-[color:var(--gold)]">Hypervault</div>
              <div className="mt-1 text-[10px] font-mono uppercase tracking-[0.2em] opacity-70">Atelier Card</div>
            </div>
            <BrandMark brand={brand} />
          </div>
          {/* chip */}
          <div className="relative z-10 -mt-4">
            <div className="w-10 h-7 rounded-sm" style={{ background: "linear-gradient(135deg, #d4b878, #8a6f3f)" }}>
              <div className="grid grid-cols-3 grid-rows-3 gap-px p-0.5 opacity-60">
                {Array.from({ length: 9 }).map((_, i) => <span key={i} className="bg-black/30" />)}
              </div>
            </div>
          </div>
          <div className="relative z-10">
            <div className="font-mono text-xl md:text-2xl tracking-[0.2em]">{card.number || "•••• •••• •••• ••••"}</div>
            <div className="mt-4 flex justify-between text-[10px] font-mono uppercase tracking-[0.18em] opacity-80">
              <div>
                <div className="opacity-60">Holder</div>
                <div className="mt-0.5">{card.name || "YOUR NAME"}</div>
              </div>
              <div className="text-right">
                <div className="opacity-60">Valid Thru</div>
                <div className="mt-0.5">{card.exp || "MM/YY"}</div>
              </div>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className="absolute inset-0 rounded-xl overflow-hidden text-background"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #2a2a2a 0%, #0a0a0a 100%)",
            boxShadow: "0 30px 60px -25px rgba(17,17,17,0.5)",
          }}
        >
          <div className="h-12 bg-black mt-6" />
          <div className="px-6 mt-5">
            <div className="micro-label !text-background/60">Signature</div>
            <div className="mt-2 h-10 bg-background/90 flex items-center justify-end pr-3 font-mono tracking-[0.3em] text-foreground">
              <span className="italic-serif text-foreground/40 mr-2 text-xs">authorized</span>
              {card.cvv || "•••"}
            </div>
            <p className="mt-4 text-[9px] font-mono uppercase tracking-[0.2em] opacity-50">This card is property of Hypervault Atelier. Misuse will be tracked.</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

function BrandMark({ brand }: { brand: string }) {
  const common = "h-7 flex items-center";
  if (brand === "visa") return <div className={common}><span className="font-serif italic text-2xl tracking-tight">VISA</span></div>;
  if (brand === "mc") return (
    <div className={common + " gap-0"}>
      <span className="w-6 h-6 rounded-full bg-[#EB001B] -mr-2 opacity-95" />
      <span className="w-6 h-6 rounded-full bg-[#F79E1B] opacity-95 mix-blend-screen" />
    </div>
  );
  if (brand === "amex") return <div className={common}><span className="px-2 py-1 bg-[#2E77BC] text-[10px] font-mono tracking-[0.15em]">AMEX</span></div>;
  if (brand === "discover") return <div className={common}><span className="text-[10px] font-mono tracking-[0.15em]">DISCOVER</span></div>;
  return <div className={common + " text-[10px] font-mono tracking-[0.15em] opacity-50"}>•••• Network</div>;
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`flex justify-between ${large ? "font-serif text-2xl" : "text-foreground/70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
