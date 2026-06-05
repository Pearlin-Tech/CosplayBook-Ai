import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState, lazy, Suspense } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import {
  ArrowLeft, Upload, Minus, Plus, ShoppingBag, Check, Bookmark,
  Palette, Edit3, Image as ImageIcon, RotateCw, Sparkles, Trash2,
} from "lucide-react";
import { Header } from "@/components/Header";
import { useCart } from "@/lib/cart";
import { useSavedDesigns } from "@/lib/saved-designs";
import { GARMENTS, COLORWAYS, type Garment } from "@/lib/garments";
import { MagneticButton } from "@/components/motion/MagneticButton";

const Garment3D = lazy(() => import("@/components/studio/Garment3D"));

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Hypervault" },
      { name: "description", content: "Sculpt your bespoke garment in a real-time 3D atelier." },
    ],
  }),
  component: Studio,
});

const fonts = [
  { id: "fraunces", label: "Fraunces", css: "'Fraunces', serif", italic: true },
  { id: "instrument-sans", label: "Instrument Sans", css: "'Instrument Sans', sans-serif", italic: false },
  { id: "instrument-serif", label: "Instrument Serif", css: "'Instrument Serif', serif", italic: true },
  { id: "mono", label: "JetBrains Mono", css: "'JetBrains Mono', monospace", italic: false },
];

type Tool = "color" | "edit" | "bg" | "rotate" | "hd";
type BgKey = "studio" | "warm" | "noir";

function Studio() {
  const { add } = useCart();
  const { save } = useSavedDesigns();
  const [garment, setGarment] = useState<Garment>(GARMENTS[0]);
  const [color, setColor] = useState(COLORWAYS[0]);
  const [material, setMaterial] = useState(garment.materials[0]);
  const [printMethod, setPrintMethod] = useState(garment.printMethods[0]);
  const [size, setSize] = useState(garment.sizes[Math.floor(garment.sizes.length / 2)]);
  const [placementId, setPlacementId] = useState(garment.placements[0].id);
  const [qty, setQty] = useState(1);
  const [customText, setCustomText] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [textColor, setTextColor] = useState("#111111");
  const [design, setDesign] = useState<string | null>(null);
  const [added, setAdded] = useState<"added" | "saved" | null>(null);

  // Toolbar state
  const [activeTool, setActiveTool] = useState<Tool | null>(null);
  const [autoRotate, setAutoRotate] = useState(false);
  const [hd, setHd] = useState(true);
  const [bg, setBg] = useState<BgKey>("studio");

  const price = useMemo(() => garment.basePrice + material.delta, [garment, material]);
  const placement = garment.placements.find((p) => p.id === placementId) ?? garment.placements[0];

  const frontPlacement = useMemo(() => {
    if (!design) return null;
    const p = garment.placements.find((x) => x.id === placementId && x.view === "front");
    return p ? { x: p.x, y: p.y, w: p.w } : null;
  }, [design, garment, placementId]);

  const backPlacement = useMemo(() => {
    if (!design) return null;
    const p = garment.placements.find((x) => x.id === placementId && x.view === "back");
    return p ? { x: p.x, y: p.y, w: p.w } : null;
  }, [design, garment, placementId]);

  const switchGarment = (g: Garment) => {
    setGarment(g);
    setMaterial((m) => g.materials.find((x) => x.id === m.id) ?? g.materials[0]);
    setPrintMethod((p) => g.printMethods.find((x) => x.id === p.id) ?? g.printMethods[0]);
    setSize((s) => (g.sizes.includes(s) ? s : g.sizes[Math.floor(g.sizes.length / 2)]));
    setPlacementId(g.placements[0].id);
  };

  const onFile = (f: File | null) => {
    if (!f) return;
    setDesign(URL.createObjectURL(f));
  };

  const handleAdd = () => {
    add({
      id: `${garment.id}-${color.name}-${size}-${Date.now()}`,
      name: garment.name,
      config: `${color.name} · ${material.name} · ${size} · ${placement.label}${customText ? ` · "${customText}"` : ""}`,
      price, qty, image: garment.views.front,
    });
    setAdded("added");
    setTimeout(() => setAdded(null), 2200);
  };

  const handleSave = () => {
    save({
      garmentId: garment.id, garmentName: garment.name,
      colorName: color.name, colorHex: color.hex,
      materialName: material.name, size,
      placement: placement.label, text: customText,
      printMethod: printMethod.label, price,
      thumb: garment.views.front,
    });
    setAdded("saved");
    setTimeout(() => setAdded(null), 2200);
  };

  const tools: { id: Tool; label: string; icon: any }[] = [
    { id: "color", label: "Color", icon: Palette },
    { id: "edit", label: "Edit", icon: Edit3 },
    { id: "bg", label: "Backdrop", icon: ImageIcon },
    { id: "rotate", label: "Rotate", icon: RotateCw },
    { id: "hd", label: "HD", icon: Sparkles },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container-edge py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]">
          <ArrowLeft size={14} /> Back to Gallery
        </Link>
        <span className="micro-label hidden md:inline">Atelier Studio · 3D · Live</span>
      </div>

      {/* Garment tabs */}
      <div className="container-edge">
        <LayoutGroup>
          <div className="flex gap-1 overflow-x-auto border-b border-border pb-px">
            {GARMENTS.map((g) => (
              <button
                key={g.id}
                onClick={() => switchGarment(g)}
                className={`relative px-5 py-4 text-xs uppercase tracking-[0.2em] whitespace-nowrap transition-colors ${
                  garment.id === g.id ? "text-foreground" : "text-foreground/50 hover:text-foreground"
                }`}
              >
                {g.name.split(" ").slice(-2).join(" ")}
                {garment.id === g.id && (
                  <motion.span
                    layoutId="garment-tab-underline"
                    className="absolute left-3 right-3 -bottom-px h-[2px] bg-[color:var(--pop)]"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </LayoutGroup>
      </div>

      <div className="container-edge grid lg:grid-cols-[1.2fr_1fr] gap-10 pt-8 pb-32">
        {/* 3D Canvas */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div className="relative w-full mx-auto" style={{ maxWidth: 720 }}>
            <motion.div
              layout
              className="relative bg-surface overflow-hidden"
              style={{ aspectRatio: 1 }}
            >
              <Suspense fallback={<div className="absolute inset-0 grid place-items-center text-xs font-mono uppercase tracking-[0.2em] text-foreground/50">Loading atelier…</div>}>
                <Garment3D
                  frontUrl={garment.views.front}
                  backUrl={garment.views.back}
                  designUrl={design}
                  designPlacement={frontPlacement}
                  designOnBack={backPlacement}
                  colorHex={color.hex}
                  autoRotate={autoRotate}
                  hd={hd}
                  background={bg}
                  aspect={garment.aspect}
                />
              </Suspense>

              {/* corner brackets */}
              <CornerBrackets />

              {/* badges */}
              <div className="absolute top-5 left-5 z-30 micro-label bg-background/85 backdrop-blur px-3 py-1.5 rounded-sm pointer-events-none">
                Edition · 01 / Vault
              </div>
              <div className="absolute top-5 right-5 z-30 px-3 py-1.5 rounded-sm bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--pop)] animate-pulse-beacon" />
                {hd ? "HD" : "Draft"}
              </div>
              <div className="absolute bottom-3 left-5 z-30 text-[10px] font-mono uppercase tracking-[0.2em] text-foreground/55 pointer-events-none">
                Drag to orbit · Scroll to zoom
              </div>
            </motion.div>

            {/* Sticky Toolbar */}
            <div className="mt-4 bg-background border border-border">
              <div className="grid grid-cols-5">
                {tools.map((t) => {
                  const Icon = t.icon;
                  const active =
                    (t.id === "rotate" && autoRotate) ||
                    (t.id === "hd" && hd) ||
                    activeTool === t.id;
                  return (
                    <button
                      key={t.id}
                      onClick={() => {
                        if (t.id === "rotate") { setAutoRotate(!autoRotate); return; }
                        if (t.id === "hd") { setHd(!hd); return; }
                        setActiveTool(activeTool === t.id ? null : t.id);
                      }}
                      className={`relative flex flex-col items-center gap-1.5 py-4 text-[10px] font-mono uppercase tracking-[0.18em] transition-colors border-r border-border last:border-r-0 ${
                        active ? "bg-[color:var(--pop)] text-foreground" : "hover:bg-surface text-foreground/70"
                      }`}
                    >
                      <Icon size={16} strokeWidth={1.4} />
                      {t.label}
                    </button>
                  );
                })}
              </div>

              {/* Slide-out panels */}
              <AnimatePresence initial={false}>
                {activeTool === "color" && (
                  <ToolPanel key="color">
                    <div className="micro-label mb-3">Fabric · Colorway</div>
                    <div className="grid grid-cols-10 gap-2">
                      {COLORWAYS.map((c) => (
                        <button
                          key={c.name}
                          onClick={() => setColor(c)}
                          className={`aspect-square rounded-full border-2 transition-all ${color.name === c.name ? "border-foreground scale-110" : "border-border hover:scale-105"}`}
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>
                    <div className="mt-3 flex items-center justify-between text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/55">
                      <span>{color.name} · {color.hex}</span>
                      <span>color-masked into weave</span>
                    </div>
                  </ToolPanel>
                )}

                {activeTool === "edit" && (
                  <ToolPanel key="edit">
                    <div className="micro-label mb-3">Placement Zones</div>
                    <div className="grid grid-cols-3 gap-2">
                      {garment.placements.map((p) => (
                        <button
                          key={p.id}
                          onClick={() => setPlacementId(p.id)}
                          className={`p-3 text-[10px] uppercase tracking-[0.15em] border text-left transition-colors ${
                            placementId === p.id ? "bg-foreground text-background border-foreground" : "border-border hover:border-foreground"
                          }`}
                        >
                          <div className="font-mono opacity-60">[{p.view}]</div>
                          {p.label}
                        </button>
                      ))}
                    </div>
                    {design && (
                      <div className="mt-4 flex items-center justify-between bg-surface px-3 py-2">
                        <span className="text-xs italic-serif text-foreground/70 truncate">Artwork layer active · blend: {printMethod.blend}</span>
                        <button onClick={() => setDesign(null)} className="text-[color:var(--destructive)] hover:opacity-70" title="Delete graphic">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    )}
                  </ToolPanel>
                )}

                {activeTool === "bg" && (
                  <ToolPanel key="bg">
                    <div className="micro-label mb-3">Studio Backdrop</div>
                    <div className="grid grid-cols-3 gap-2">
                      {([
                        { id: "studio", label: "Linen Studio", hex: "#F4F3F0" },
                        { id: "warm", label: "Warm Apartment", hex: "#EAE2D3" },
                        { id: "noir", label: "Noir Vault", hex: "#141414" },
                      ] as { id: BgKey; label: string; hex: string }[]).map((b) => (
                        <button
                          key={b.id}
                          onClick={() => setBg(b.id)}
                          className={`p-3 text-left border transition-colors ${bg === b.id ? "border-foreground" : "border-border hover:border-foreground/50"}`}
                        >
                          <span className="block w-full h-10 mb-2" style={{ backgroundColor: b.hex }} />
                          <span className="text-[10px] font-mono uppercase tracking-[0.15em]">{b.label}</span>
                        </button>
                      ))}
                    </div>
                  </ToolPanel>
                )}
              </AnimatePresence>
            </div>

            {/* Secondary actions */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <label className="cursor-pointer">
                <input type="file" accept="image/png" hidden onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
                <div className="btn-outline w-full justify-center text-[10px]">
                  <Upload size={12} /> Upload 360 Image
                </div>
              </label>
              <MagneticButton>
                <button onClick={handleAdd} className="btn-ink w-full justify-center text-[10px]">
                  {added === "added" ? <><Check size={12}/> Vaulted</> : <><ShoppingBag size={12}/> Add Custom Creation to Bag</>}
                </button>
              </MagneticButton>
            </div>
          </div>
        </div>

        {/* Control panel */}
        <div className="space-y-8">
          <div>
            <span className="micro-label">Now Configuring</span>
            <motion.h1
              key={garment.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-3 font-serif text-4xl md:text-5xl"
            >
              {garment.name}
            </motion.h1>
            <p className="mt-2 text-foreground/55 text-sm italic-serif">{garment.tagline}</p>
            <p className="mt-1 text-foreground/55 text-xs">Single edition · Numbered & signed · Made to order</p>
          </div>

          <Accordion title="Material" value={`${material.name} · ${material.weight}`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {garment.materials.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMaterial(m)}
                  className={`p-4 text-left border transition-all ${
                    material.id === m.id ? "border-foreground bg-surface" : "border-border hover:border-foreground/50"
                  }`}
                >
                  <div className="flex items-baseline justify-between">
                    <div className="font-serif text-lg">{m.name}</div>
                    {m.delta > 0 && <div className="text-xs text-[color:var(--gold)]">+${m.delta}</div>}
                  </div>
                  <div className="mt-1 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/60">{m.weight}</div>
                  <div className="mt-2 text-xs text-foreground/55 leading-relaxed">{m.description}</div>
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Graphic" value={design ? "Uploaded" : "None"}>
            <label className="block border border-dashed border-[color:var(--gold)] p-8 text-center cursor-pointer hover:bg-surface transition-colors">
              <input type="file" accept="image/*" hidden onChange={(e) => onFile(e.target.files?.[0] ?? null)} />
              <Upload className="mx-auto mb-3 text-[color:var(--gold)]" size={26} strokeWidth={1.2} />
              <div className="font-serif text-lg">{design ? "Replace artwork" : "Drop your design"}</div>
              <div className="mt-1 text-xs text-foreground/55">PNG · SVG · JPG · up to 20MB</div>
            </label>
            {design && (
              <div className="mt-3 flex items-center justify-between text-xs">
                <span className="text-foreground/60">Blend mode auto: <span className="italic-serif">{printMethod.blend}</span></span>
                <button onClick={() => setDesign(null)} className="underline underline-offset-4 hover:text-foreground/80">Remove</button>
              </div>
            )}
          </Accordion>

          <Accordion title="Typography" value={customText || "—"}>
            <input
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              placeholder="Enter custom text (max 24 chars)"
              maxLength={24}
              className="field"
            />
            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
              {fonts.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFont(f)}
                  className={`p-3 text-left border transition-colors text-sm ${
                    font.id === f.id ? "border-foreground bg-surface" : "border-border"
                  }`}
                  style={{ fontFamily: f.css, fontStyle: f.italic ? "italic" : "normal" }}
                >
                  {f.label}
                </button>
              ))}
            </div>
            <div className="mt-4 flex items-center gap-3">
              <span className="micro-label">Ink</span>
              <input
                type="color"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-10 h-10 rounded border border-border bg-transparent cursor-pointer"
              />
              <span className="text-xs font-mono text-foreground/55">{textColor}</span>
            </div>
          </Accordion>

          <Accordion title="Print Method" value={printMethod.label}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {garment.printMethods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setPrintMethod(m)}
                  className={`p-3 text-left border transition-colors ${
                    printMethod.id === m.id ? "border-foreground bg-surface" : "border-border hover:border-foreground"
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.15em]">{m.label}</div>
                  <div className="mt-1 text-xs text-foreground/55">{m.description}</div>
                </button>
              ))}
            </div>
          </Accordion>

          <Accordion title="Size" value={size}>
            <div className="grid grid-cols-6 gap-2">
              {garment.sizes.map((s) => (
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
        <div className="container-edge py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-5">
            <div>
              <div className="micro-label">Premium Total</div>
              <div className="font-serif text-2xl md:text-3xl">${(price * qty).toLocaleString()}</div>
            </div>
            <div className="flex items-center border border-border">
              <button onClick={() => setQty(Math.max(1, qty - 1))} className="p-3 hover:bg-surface"><Minus size={14} /></button>
              <span className="px-4 font-mono">{qty}</span>
              <button onClick={() => setQty(qty + 1)} className="p-3 hover:bg-surface"><Plus size={14} /></button>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <MagneticButton>
              <button onClick={handleSave} className="btn-outline">
                <Bookmark size={14} /> Save to Vault
              </button>
            </MagneticButton>
            <MagneticButton>
              <button onClick={handleAdd} className="btn-ink">
                {added === "added" ? (
                  <><Check size={14}/> Vaulted</>
                ) : added === "saved" ? (
                  <><Check size={14}/> Saved</>
                ) : (
                  <><ShoppingBag size={14}/> Add to Bag</>
                )}
              </button>
            </MagneticButton>
          </div>
        </div>
      </div>
    </div>
  );
}

function CornerBrackets() {
  return (
    <>
      <span className="absolute top-2 left-2 w-5 h-5 border-t border-l border-[color:var(--gold)] z-20 pointer-events-none" />
      <span className="absolute top-2 right-2 w-5 h-5 border-t border-r border-[color:var(--gold)] z-20 pointer-events-none" />
      <span className="absolute bottom-2 left-2 w-5 h-5 border-b border-l border-[color:var(--gold)] z-20 pointer-events-none" />
      <span className="absolute bottom-2 right-2 w-5 h-5 border-b border-r border-[color:var(--gold)] z-20 pointer-events-none" />
    </>
  );
}

function ToolPanel({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      className="overflow-hidden border-t border-border"
    >
      <div className="p-5">{children}</div>
    </motion.div>
  );
}

function Accordion({ title, value, children }: { title: string; value: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-t border-border pt-6">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between text-left">
        <div className="flex items-center gap-4 min-w-0">
          <span className="micro-label">{title}</span>
          <span className="text-sm italic-serif text-foreground/70 truncate">{value}</span>
        </div>
        <span className="text-foreground/40 font-mono text-xl">{open ? "−" : "+"}</span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-6">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
