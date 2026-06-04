import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AnimatePresence, motion, LayoutGroup } from "framer-motion";
import { ArrowLeft, Upload, Minus, Plus, ShoppingBag, Check, Bookmark, RotateCcw } from "lucide-react";
import { Header } from "@/components/Header";
import { useCart } from "@/lib/cart";
import { useSavedDesigns } from "@/lib/saved-designs";
import { GARMENTS, COLORWAYS, type View, type Garment } from "@/lib/garments";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { ParallaxTilt } from "@/components/motion/ParallaxTilt";
import { ScanLine } from "@/components/motion/ScanLine";

export const Route = createFileRoute("/studio")({
  head: () => ({
    meta: [
      { title: "Studio — Hypervault" },
      { name: "description", content: "Design every thread of your custom garment in real-time. Materials, color, graphics, typography." },
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

function Studio() {
  const { add } = useCart();
  const { save } = useSavedDesigns();
  const [garment, setGarment] = useState<Garment>(GARMENTS[0]);
  const [color, setColor] = useState(COLORWAYS[0]);
  const [material, setMaterial] = useState(garment.materials[0]);
  const [printMethod, setPrintMethod] = useState(garment.printMethods[0]);
  const [size, setSize] = useState(garment.sizes[Math.floor(garment.sizes.length / 2)]);
  const [placementId, setPlacementId] = useState(garment.placements[0].id);
  const [view, setView] = useState<View>("front");
  const [qty, setQty] = useState(1);
  const [customText, setCustomText] = useState("");
  const [font, setFont] = useState(fonts[0]);
  const [textColor, setTextColor] = useState("#111111");
  const [design, setDesign] = useState<string | null>(null);
  const [added, setAdded] = useState<"added" | "saved" | null>(null);

  const price = useMemo(() => garment.basePrice + material.delta, [garment, material]);
  const placement = garment.placements.find((p) => p.id === placementId) ?? garment.placements[0];
  const activePlacements = garment.placements.filter((p) => p.view === view);
  const visiblePlacement = placement.view === view ? placement : null;

  // when garment changes, reset compatible selections
  const switchGarment = (g: Garment) => {
    setGarment(g);
    setMaterial((m) => g.materials.find((x) => x.id === m.id) ?? g.materials[0]);
    setPrintMethod((p) => g.printMethods.find((x) => x.id === p.id) ?? g.printMethods[0]);
    setSize((s) => (g.sizes.includes(s) ? s : g.sizes[Math.floor(g.sizes.length / 2)]));
    setPlacementId(g.placements[0].id);
    setView("front");
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
      price,
      qty,
      image: garment.views.front,
    });
    setAdded("added");
    setTimeout(() => setAdded(null), 2200);
  };

  const handleSave = () => {
    save({
      garmentId: garment.id,
      garmentName: garment.name,
      colorName: color.name,
      colorHex: color.hex,
      materialName: material.name,
      size,
      placement: placement.label,
      text: customText,
      printMethod: printMethod.label,
      price,
      thumb: garment.views.front,
    });
    setAdded("saved");
    setTimeout(() => setAdded(null), 2200);
  };

  // resolve blend class
  const blendClass = `print-${printMethod.blend}`;
  const isLightColor = ["#FAF9F6", "#E8E2D5", "#D4FF00", "#c9b48a"].includes(color.hex);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container-edge py-6 flex items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] hover:text-[color:var(--gold)]">
          <ArrowLeft size={14} /> Back to Gallery
        </Link>
        <span className="micro-label hidden md:inline">Atelier Studio · Live</span>
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
        {/* Preview canvas */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <motion.div
            layout
            transition={{ type: "spring", stiffness: 140, damping: 22 }}
            className="relative bg-surface overflow-hidden mx-auto w-full"
            style={{ aspectRatio: garment.aspect, maxWidth: 720 }}
          >
            <ParallaxTilt max={4} className="absolute inset-0">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${garment.id}-${view}`}
                  initial={{ rotateY: view === "back" ? -180 : 180, opacity: 0 }}
                  animate={{ rotateY: 0, opacity: 1 }}
                  exit={{ rotateY: view === "back" ? 180 : -180, opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.4, 0.0, 0.2, 1] }}
                  className="absolute inset-0"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                >
                  {/* color background tint */}
                  <div
                    className="absolute inset-0 transition-colors duration-500"
                    style={{ backgroundColor: `${color.hex}0d` }}
                  />

                  {/* Grayscale base */}
                  <img
                    src={garment.views[view]}
                    alt={`${garment.name} ${view}`}
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ filter: "grayscale(1) contrast(1.08) brightness(1.02)" }}
                    width={1024}
                    height={1280}
                  />
                  {/* Color multiply layer — preserves wrinkles/shadows */}
                  <div
                    className="absolute inset-0 pointer-events-none transition-colors duration-500"
                    style={{
                      backgroundColor: color.hex,
                      mixBlendMode: "multiply",
                      maskImage: `url(${garment.views[view]})`,
                      WebkitMaskImage: `url(${garment.views[view]})`,
                      maskSize: "contain",
                      WebkitMaskSize: "contain",
                      maskRepeat: "no-repeat",
                      WebkitMaskRepeat: "no-repeat",
                      maskPosition: "center",
                      WebkitMaskPosition: "center",
                    }}
                  />
                  {/* highlight retention */}
                  <img
                    src={garment.views[view]}
                    alt=""
                    aria-hidden
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none"
                    style={{ mixBlendMode: "soft-light", opacity: 0.55 }}
                  />

                  {/* Graphic overlay */}
                  {design && visiblePlacement && (
                    <div
                      className={`absolute pointer-events-none ${blendClass}`}
                      style={{
                        left: `${visiblePlacement.x}%`,
                        top: `${visiblePlacement.y}%`,
                        width: `${visiblePlacement.w}%`,
                        transform: `translate(-50%, -50%) rotate(${visiblePlacement.rotate ?? 0}deg)`,
                      }}
                    >
                      <img src={design} alt="Your design" className="w-full h-auto" />
                    </div>
                  )}

                  {/* Text overlay */}
                  {customText && visiblePlacement && (
                    <div
                      className={`absolute pointer-events-none text-center leading-none ${blendClass}`}
                      style={{
                        left: `${visiblePlacement.x}%`,
                        top: `${visiblePlacement.y + (design ? 10 : 0)}%`,
                        width: `${visiblePlacement.w * 1.4}%`,
                        transform: "translate(-50%, -50%)",
                        fontFamily: font.css,
                        fontStyle: font.italic ? "italic" : "normal",
                        color: textColor,
                        fontSize: "clamp(10px, 2.6vw, 28px)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {customText}
                    </div>
                  )}

                  {/* placement guide dots */}
                  {activePlacements.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPlacementId(p.id)}
                      className={`absolute rounded-full transition-all -translate-x-1/2 -translate-y-1/2 ${
                        p.id === placementId
                          ? "bg-[color:var(--pop)] ring-2 ring-foreground"
                          : "bg-foreground/30 hover:bg-foreground/60"
                      }`}
                      style={{
                        left: `${p.x}%`,
                        top: `${p.y}%`,
                        width: 10,
                        height: 10,
                      }}
                      title={p.label}
                    />
                  ))}
                </motion.div>
              </AnimatePresence>
            </ParallaxTilt>

            {/* scan line — re-mounts on key change */}
            <ScanLine trigger={`${garment.id}-${color.hex}-${material.id}-${view}`} />

            {/* badges */}
            <div className="absolute top-5 left-5 z-30 micro-label bg-background/85 backdrop-blur px-3 py-1.5 rounded-sm">
              Edition · 01 / Vault
            </div>
            <div className="absolute top-5 right-5 z-30 px-3 py-1.5 rounded-sm bg-foreground text-background text-[10px] font-mono uppercase tracking-[0.2em] flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[color:var(--pop)] animate-pulse-beacon" />
              Live
            </div>
          </motion.div>

          {/* view toggle — true reverse perspective */}
          <div className="mt-5 grid grid-cols-2 gap-2 max-w-[720px] mx-auto">
            {(["front", "back"] as View[]).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`py-3.5 text-[11px] uppercase tracking-[0.2em] border transition-all flex items-center justify-center gap-2 ${
                  view === v
                    ? "bg-foreground text-background border-foreground"
                    : "border-border text-foreground/70 hover:border-foreground"
                }`}
              >
                {v === "back" && <RotateCcw size={12} />}
                {v} view
              </button>
            ))}
          </div>

          {/* zone callouts */}
          <div className="mt-4 max-w-[720px] mx-auto flex flex-wrap gap-2">
            {garment.zoneCallouts
              .filter((z) => z.view === view)
              .map((z) => (
                <span key={z.name} className="text-[10px] font-mono uppercase tracking-[0.15em] px-2 py-1 bg-surface text-foreground/55">
                  · {z.name}
                </span>
              ))}
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

          <Accordion title="Colorway" value={color.name}>
            <div className="grid grid-cols-5 sm:grid-cols-10 gap-3">
              {COLORWAYS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setColor(c)}
                  className={`relative aspect-square rounded-full border-2 transition-all ${
                    color.name === c.name ? "border-foreground scale-110" : "border-border hover:scale-105"
                  }`}
                  style={{ backgroundColor: c.hex }}
                  title={c.name}
                >
                  {color.name === c.name && (
                    <span className="absolute inset-0 flex items-center justify-center">
                      <Check size={12} className={["#FAF9F6", "#E8E2D5", "#D4FF00", "#c9b48a"].includes(c.hex) ? "text-foreground" : "text-background"} />
                    </span>
                  )}
                </button>
              ))}
            </div>
            <div className="mt-3 text-[11px] font-mono uppercase tracking-[0.15em] text-foreground/55">
              Hex {color.hex} · color masked into garment weave
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

          <Accordion title={`Placement (${view})`} value={placement.label}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {activePlacements.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlacementId(p.id)}
                  className={`p-3 text-xs uppercase tracking-[0.15em] border transition-colors ${
                    placement.id === p.id
                      ? "bg-foreground text-background border-foreground"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {p.label}
                </button>
              ))}
              {activePlacements.length === 0 && (
                <p className="text-xs text-foreground/50 col-span-full">Flip to the other view to see additional placement coordinates.</p>
              )}
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
        {/* tiny ignore note */}
        <div className="sr-only" aria-live="polite">{isLightColor ? "Light colorway" : "Deep colorway"}</div>
      </div>
    </div>
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
