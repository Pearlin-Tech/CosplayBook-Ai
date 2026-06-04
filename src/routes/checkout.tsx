import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, X, ShieldCheck, CreditCard } from "lucide-react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useCart } from "@/lib/cart";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout — Hypervault" }] }),
  component: Checkout,
});

function Checkout() {
  const { cart, remove, setQty, subtotal, clear } = useCart();
  const navigate = useNavigate();
  const [method, setMethod] = useState<"upi" | "card">("upi");
  const [upi, setUpi] = useState("");
  const [card, setCard] = useState({ number: "", name: "", exp: "", cvv: "" });
  const [flipped, setFlipped] = useState(false);
  const [processing, setProcessing] = useState(false);

  const shipping = subtotal > 0 ? 12 : 0;
  const tax = Math.round(subtotal * 0.08);
  const total = subtotal + shipping + tax;

  const brand = card.number.startsWith("4") ? "VISA" : card.number.startsWith("5") ? "MASTERCARD" : card.number.startsWith("3") ? "AMEX" : "•••";

  const handlePay = () => {
    if (!cart.length) return;
    setProcessing(true);
    setTimeout(() => {
      clear();
      navigate({ to: "/success" });
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16">
        <span className="micro-label">Nº 08 — Transaction</span>
        <h1 className="mt-4 font-serif text-5xl md:text-7xl">Secure your vault.</h1>

        {cart.length === 0 ? (
          <div className="mt-24 text-center">
            <p className="text-foreground/60">Your cabinet is empty.</p>
            <Link to="/studio" className="btn-ink mt-8">Enter the Studio</Link>
          </div>
        ) : (
          <div className="mt-16 grid lg:grid-cols-[1.4fr_1fr] gap-10">
            {/* Cart */}
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
                <div className="flex items-center gap-2 micro-label"><ShieldCheck size={14}/> Premium Gateway · 256-bit</div>
                <h2 className="font-serif text-3xl mt-3">Payment</h2>

                <div className="mt-6 grid grid-cols-2 gap-2">
                  <button onClick={() => setMethod("upi")} className={`p-3 text-xs uppercase tracking-[0.18em] border ${method === "upi" ? "bg-foreground text-background border-foreground" : "border-border"}`}>Instant UPI</button>
                  <button onClick={() => setMethod("card")} className={`p-3 text-xs uppercase tracking-[0.18em] border ${method === "card" ? "bg-foreground text-background border-foreground" : "border-border"}`}>Card</button>
                </div>

                {method === "upi" ? (
                  <div className="mt-6 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {["Google Pay", "PhonePe", "Paytm"].map((p) => (
                        <button key={p} className="p-4 bg-background border border-border hover:border-foreground text-sm">{p}</button>
                      ))}
                    </div>
                    <div>
                      <label className="micro-label">Or enter UPI ID</label>
                      <input value={upi} onChange={(e) => setUpi(e.target.value)} placeholder="yourname@upi" className="field" />
                    </div>
                  </div>
                ) : (
                  <div className="mt-6 space-y-6">
                    {/* Card visualizer */}
                    <div className="relative h-52" style={{ perspective: "1000px" }}>
                      <div className="absolute inset-0 transition-transform duration-700" style={{ transformStyle: "preserve-3d", transform: flipped ? "rotateY(180deg)" : "rotateY(0)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#1a1a1a] to-[#3a3a3a] text-background p-6 rounded-lg" style={{ backfaceVisibility: "hidden" }}>
                          <div className="flex justify-between">
                            <CreditCard size={28} strokeWidth={1}/>
                            <span className="font-mono text-xs tracking-[0.2em]">{brand}</span>
                          </div>
                          <div className="mt-12 font-mono text-2xl tracking-[0.2em]">{card.number || "•••• •••• •••• ••••"}</div>
                          <div className="mt-6 flex justify-between text-xs font-mono uppercase opacity-80">
                            <span>{card.name || "CARDHOLDER"}</span>
                            <span>{card.exp || "MM/YY"}</span>
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-br from-[#3a3a3a] to-[#1a1a1a] text-background rounded-lg" style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}>
                          <div className="h-10 bg-black mt-6" />
                          <div className="m-6 p-3 bg-background text-foreground font-mono text-right tracking-[0.3em]">{card.cvv || "•••"}</div>
                        </div>
                      </div>
                    </div>
                    <input value={card.number} onChange={(e) => setCard({ ...card, number: e.target.value })} maxLength={19} placeholder="Card number" className="field" />
                    <input value={card.name} onChange={(e) => setCard({ ...card, name: e.target.value })} placeholder="Cardholder name" className="field" />
                    <div className="grid grid-cols-2 gap-4">
                      <input value={card.exp} onChange={(e) => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" className="field" />
                      <input value={card.cvv} onChange={(e) => setCard({ ...card, cvv: e.target.value })} onFocus={() => setFlipped(true)} onBlur={() => setFlipped(false)} maxLength={4} placeholder="CVV" className="field" />
                    </div>
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
              <button onClick={handlePay} disabled={processing} className="btn-ink mt-8 w-full justify-center">
                {processing ? (
                  <>
                    <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                    Securing Transaction
                  </>
                ) : (
                  <>Vault Order · ${total}</>
                )}
              </button>
              <div className="mt-4 text-[11px] text-center text-foreground/55 font-mono uppercase tracking-[0.15em]">Encrypted · PCI-DSS · 30-day returns</div>
            </aside>
          </div>
        )}
      </section>
      <Footer />
    </div>
  );
}

function Row({ label, value, large }: { label: string; value: string; large?: boolean }) {
  return (
    <div className={`flex justify-between ${large ? "font-serif text-2xl" : "text-foreground/70"}`}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
