import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowLeft, Upload, Minus, Plus, ShoppingBag, Check } from "lucide-react";
import { Header } from "@/components/Header";
import { useCart } from "@/lib/cart";
import teeBlack from "@/assets/product-tee-black.jpg";
import hoodieGrey from "@/assets/product-hoodie-grey.jpg";
import crewCream from "@/assets/product-crew-cream.jpg";
import pantsOlive from "@/assets/product-pants-olive.jpg";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Hypervault" },
      { name: "description", content: "Design every thread of your custom garment in real-time. Materials, color, graphics, typography." },
    ],
  }),
  component: Studio,
});

const garments = [
  { id: "tee-01", name: "Heritage Tee", base: 95, img: teeBlack },
  { id: "hoodie-01", name: "Atelier Hoodie", base: 185, img: hoodieGrey },
  { id: "crew-01", name: "Studio Crewneck", base: 145, img: crewCream },
  { id: "pants-01", name: "Workshop Cargo", base: 215, img: pantsOlive },
];

const colors = [
  { name: "Obsidian", hex: "#111111" },
  { name: "Alabaster", hex: "#FAF9F6" },
  { name: "Linen", hex: "#E8E2D5" },
  { name: "Champagne", hex: "#D4A373" },
  { name: "Moss", hex: "#5b6b4a" },
  { name: "Cobalt", hex: "#1d3a8a" },
  { name: "Rust", hex: "#a64b2a" },
  { name: "Cyber", hex: "#D4FF00" },
];

const materials = [
  { id: "cotton-240", name: "Heavy Cotton", weight: "240 GSM", delta: 0 },
  { id: "cotton-320", name: "Atelier Loop", weight: "320 GSM", delta: 25 },
  { id: "linen-180", name: "Italian Linen", weight: "180 GSM", delta: 35 },
];

const placements = ["Center Chest", "Left Chest", "All Over", "Back Center", "Nape", "Sleeve"];
const fonts = ["Fraunces", "Inter", "JetBrains Mono", "Hand-stitched Script"];
const printMethods = ["DTG Premium", "Screen Print", "Embroidery", "Heat Transfer"];

function Studio() {
  const { add } = useCart();
  const [garment, setGarment] = useState(garments[0]);
  const [color, setColor] = useState(colors[0]);
  const [material, setMaterial] = useState(materials[0]);
  const [size, setSize] = useState("M");
  const [placement, setPlacement] = useState(placements[0]);
  const [font, setFont] = useState(fonts[0]);
  const [printMethod, setPrintMethod] = useState(printMethods[0]);
  const [view, setView] = useState<"Front" | "Back" | "Sleeve" | "Macro">("Front");
  const [qty, setQty] = useState(1);
  const [customText, setCustomText] = useState("");
  const [design, setDesign] = useState<string | null>(null);
  const [added, setAdded] = useState(false);

  const price = useMemo(() => garment.base + material.delta, [garment, material]);

  const onFile = (f: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setDesign(url);
  };

  const handleAdd = () => {
    add({
      id: `${garment.id}-${color.name}-${size}-${Date.now()}`,
      name: garment.name,
      config: `${color.name} · ${material.name} · ${size} · ${placement}${customText ? ` · "${customText}"` : ""}`,
      price,
      qty,
      image: garment.img,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="container-edge py-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]">
          <ArrowLeft size={14} /> Back to Gallery
        </Link>
      </div>

      <div className="container-edge grid lg:grid-cols-[1.2fr_1fr] gap-10 pb-32">
        {/* Preview canvas */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative aspect-[4/5] bg-surface overflow-hidden">
            <div
              className="absolute inset-0 transition-colors duration-500"
              style={{ backgroundColor: color.hex === "#FAF9F6" ? "#efece5" : `${color.hex}14` }}
            />
            <img
              src={garment.img}
              alt={garment.name}
              className="absolute inset-0 w-full h-full object-cover mix-blend-multiply transition-transform duration-700"
              style={{
                transform:
                  view === "Back" ? "scaleX(-1)" :
                  view === "Sleeve" ? "scale(1.15) translateX(15%)" :
                  view === "Macro" ? "scale(2)" : "scale(1)",
              }}
              width={1024}
              height={1280}
            />
            {/* color overlay */}
            <div
              className="absolute inset-0 mix-blend-color opacity-80 pointer-events-none transition-colors duration-500"
              style={{ backgroundColor: color.hex }}
            />
            {/* design overlay */}
            {design && (
              <div
                className="absolute pointer-events-none"
                style={{
                  top: placement === "Back Center" || placement === "Nape" ? "18%" : placement === "All Over" ? "10%" : "32%",
                  left: placement === "Left Chest" ? "32%" : placement === "All Over" ? "10%" : "38%",
                  width: placement === "All Over" ? "80%" : placement === "Left Chest" ? "12%" : "24%",
                }}
              >
                <img src={design} alt="Your design" className="w-full h-auto" />
              </div>
            )}
            {/* edition badge */}
            <div className="absolute top-6 left-6 micro-label bg-background/80 backdrop-blur px-3 py-1.5 rounded-sm">
              Edition · 01 / Vault
            </div>
            <div className="absolute top-6 right-6 px-3 py-1.5 rounded-sm bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.2em]">
              Live Preview
            </div>
          </div>

          {/* view toggles */}
          <div className="mt-4 grid grid-cols-4 gap-2">
            {(["Front", "Back", "Sleeve", "Macro"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`py-3 text-[11px] uppercase tracking-[0.2em] border transition-all ${
                  view === v
                    ? "bg-[color:var(--pop)] border-[color:var(--pop)] text-foreground"
                    : "border-[color:var(--gold-soft)] text-foreground/70 hover:border-foreground"
                }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* garment switcher */}
          <div className="mt-6 flex items-center gap-3 overflow-x-auto">
            {garments.map((g) => (
              <button
                key={g.id}
                onClick={() => setGarment(g)}
                className={`shrink-0 w-20 h-24 bg-surface overflow-hidden border-2 transition-colors ${
                  garment.id === g.id ? "border-foreground" : "border-transparent"
                }`}
                title={g.name}
              >
                <img src={g.img} alt={g.name} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Control panel */}
        <div className="space-y-8">
          <div>
            <span className="micro-label">Now Configuring</span>
            <h1 className="mt-3 font-serif text-5xl">{garment.name}</h1>
            <p className="mt-2 text-foreground/60 text-sm">Single edition · Numbered & signed · Made to order</p>
          </div>

          <Accordion title="Material" value={material.name}>
            <div className="grid grid-cols-3 gap-3">
              {materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m)}
                  className={`p-4 text-left border transition-all ${
                    material.id === m.id ? "border-foreground bg-surface" : "border-border hover:border-foreground/50"
                  }`}
                >
                  <div className="font-serif text-lg">{m.name}</div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/60">{m.weight}</div>
                  {m.delta > 0 && <div className="mt-2 text-xs text-[color:var(--gold)]">+${m.delta}</div>}
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Colorway" value={color.name}>
            <div className="grid grid-cols-8 gap-3">
              {colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  className={`relative aspect-square rounded-full border transition-all ${
                    color.name === c.name ? "border-foreground scale-110" : "border-border"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {color.name === c.name && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check size={14} className={c.hex === "#FAF9F6" || c.hex === "#D4FF00" || c.hex === "#E8E2D5" ? "text-foreground" : "text-background"} />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Graphic" value={design ? "Uploaded" : "None"}>
            <label className="block border border-dashed border-[color:var(--gold)] rounded p-10 text-center cursor-pointer hover:bg-surface transition-colors">
              <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
              <Upload className="mx-auto mb-3 text-[color:var(--gold)]" size={28} strokeWidth={1.2} />
              <div className="font-serif text-lg">{design ? "Replace artwork" : "Drop your design"}</div>
              <div className="mt-1 text-xs text-foreground/55">PNG · SVG · JPG · up to 20MB</div>
            </label>
            <div className="mt-4">
              <div className="micro-label mb-3">Placement</div>
              <div className="grid grid-cols-3 gap-2">
                {placements.map((p) => (
                  <button
                    key={p}
                    onClick={() => setPlacement(p)}
                    className={`p-3 text-xs uppercase tracking-[0.15em] border transition-colors ${
                      placement === p ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </Accordion>

          <Accordion title="Typography" value={customText || "—"}>
            <input
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text (max 24 chars)"
              maxLength={24}
              className="field"
            />
            <div className="mt-4 micro-label mb-3">Font</div>
            <div className="grid grid-cols-2 gap-2">
              {fonts.map((f) => (
                <button
                  key={f}
                  onClick={() => setFont(f)}
                  className={`p-3 text-left border transition-colors ${font === f ? "border-foreground bg-surface" : "border-border"}`}
                  style={{ fontFamily: f === "Hand-stitched Script" ? "Fraunces" : f }}
                >
                  <span className={f === "Fraunces" || f === "Hand-stitched Script" ? "italic" : ""}>{f}</span>
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Print Method" value={printMethod}>
            <div className="grid grid-cols-2 gap-2">
              {printMethods.map((m) => (
                <button
                  key={m}
                  onClick={() => setPrintMethod(m)}
                  className={`p-3 text-xs uppercase tracking-[0.15em] border ${
                    printMethod === m ? "bg-[color:var(--pop)] border-[color:var(--pop)]" : "border-border"
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Size" value={size}>
            <div className="grid grid-cols-6 gap-2">
              {["XS", "S", "M", "L", "XL", "XXL"].map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`py-3 text-sm font-mono border ${
                    size === s ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <Link to="/sizing" className="mt-3 inline-block text-xs underline underline-offset-4 text-foreground/60 hover:text-foreground">
              Need help? View sizing guide →
            </Link>
          </Accordion>
        </div>
      </div>

      {/* sticky footer */}
      <div className="sticky bottom-0 z-30 bg-background/95 backdrop-blur border-t border-border">
        <div className="container-edge py-5 flex items-center justify-between gap-6 flex-wrap">
          <div className="flex items-center gap-6">
            <div>
              <div className="micro-label">Premium Total</div>
              <div className="font-serif text-3xl">${(price * qty).toLocaleString()}</div>
            </div>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-surface"><Minus size={14} /></button>
              <span className="px-4 font-mono">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-surface"><Plus size={14} /></button>
            </div>
          </div>
          <button onClick={handleAdd} className="btn-ink">
            {added ? <><Check size={14}/> Vaulted</> : <><ShoppingBag size={14}/> Add Custom Creation to Bag</>}
          </button>
        </div>
      </div>
    </div>
  );
}

function Accordion({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-border pt-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-4">
          <span className="micro-label">{title}</span>
          <span className="text-sm">{value}</span>
        </div>
        <span className="text-foreground/40 font-mono text-xl">{open ? "−" : "+"}</span>
      </button>
      {open && <div className="mt-6 animate-fade-up">{children}</div>}
    </div>
  );
}
