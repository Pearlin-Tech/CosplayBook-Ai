import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { supabase } from "../lib/supabase";
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react";

function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [hovered, setHovered] = useState(false);
  const leftRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = leftRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    });
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName, phone_number: phone } },
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            full_name: fullName,
            phone_number: phone,
            role: "CUSTOMER",
          });
        }
        alert("Account created! You can now sign in.");
        setIsSignUp(false);
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        let role = "";
        for (let i = 0; i < 3; i++) {
          const { data: p } = await supabase
            .from("profiles").select("role").eq("id", data.user.id).maybeSingle();
          if (p?.role) { role = String(p.role).toUpperCase(); break; }
          await new Promise(r => setTimeout(r, 600));
        }
        if (role === "ADMIN")       navigate({ to: "/admin" });
        else if (role === "VENDOR") navigate({ to: "/vendor" });
        else                        navigate({ to: "/" });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };

  const glowX = `${mousePos.x * 100}%`;
  const glowY = `${mousePos.y * 100}%`;

  const cards = [
    { num: "01", title: "COMPOSE", sub: "Choose your weight, weave, and base colorway from our matte heritage palette." },
    { num: "02", title: "CONFIGURE", sub: "Drag graphics, type, embroidery onto a photoreal 3D garment in real time." },
    { num: "03", title: "VAULT", sub: "Your design is numbered, signed and held in your private vault — forever." },
  ];

  return (
    <div className="min-h-screen flex bg-[#0E0E0C]">
      {/* ── Left panel ── */}
      <div
        ref={leftRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="hidden lg:flex lg:w-[52%] relative flex-col justify-between p-14 overflow-hidden cursor-default select-none"
      >
        {/* Dot grid */}
        <div className="absolute inset-0"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)", backgroundSize: "28px 28px" }} />

        {/* Mouse-follow glow */}
        <div className="absolute inset-0 transition-opacity duration-500 pointer-events-none"
          style={{
            opacity: hovered ? 1 : 0,
            background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(223,255,0,0.07), transparent 60%)`,
          }} />

        {/* Static ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-80 h-80 bg-[#DFFF00]/[0.03] rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#DFFF00] rounded-sm flex items-center justify-center">
            <span className="text-[#0E0E0C] font-black text-sm tracking-tighter">H</span>
          </div>
          <span className="text-white/60 text-xs font-medium tracking-[0.22em] uppercase">Hypervault</span>
        </div>

        {/* Hero text */}
        <div className="relative z-10 space-y-6">
          <p className="text-[#DFFF00]/50 text-[10px] tracking-[0.28em] uppercase">Edition 01 — The Vault</p>
          <h1 className="text-5xl xl:text-[3.6rem] font-light text-white leading-[1.08] tracking-tight">
            Bespoke<br />
            Streetwear,<br />
            <em className="not-italic text-[#DFFF00]">Vaulted</em><br />
            by You.
          </h1>
          <p className="text-white/30 text-sm leading-relaxed max-w-[280px]">
            Design every thread. Own every detail. Crafted in limited batches — never mass-produced, never repeated.
          </p>
        </div>

        {/* Process cards — appear on hover */}
        <div className="relative z-10">
          <div
            className="grid grid-cols-3 gap-3 transition-all duration-700"
            style={{ opacity: hovered ? 1 : 0, transform: hovered ? "translateY(0)" : "translateY(12px)" }}
          >
            {cards.map((c) => (
              <div key={c.num}
                className="border border-white/[0.08] rounded-xl p-4 bg-white/[0.02] backdrop-blur-sm"
                style={{ transition: "border-color 0.3s" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(223,255,0,0.2)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[#DFFF00]/40 text-[9px] font-mono">{c.num}</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-[#DFFF00]/30" />
                </div>
                <p className="text-white/80 text-[10px] font-semibold tracking-[0.15em] mb-2">{c.title}</p>
                <p className="text-white/25 text-[10px] leading-relaxed">{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Static bottom text when not hovered */}
          <div
            className="flex items-center gap-4 transition-all duration-500 absolute bottom-0 left-0"
            style={{ opacity: hovered ? 0 : 1, pointerEvents: hovered ? "none" : "auto" }}
          >
            {["Design", "Configure", "Vault"].map((step, i) => (
              <div key={step} className="flex items-center gap-3">
                {i > 0 && <div className="w-5 h-px bg-white/10" />}
                <div className="flex items-center gap-1.5">
                  <span className="text-[#DFFF00]/35 text-[9px] font-mono">0{i + 1}</span>
                  <span className="text-white/25 text-[10px] uppercase tracking-widest">{step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <div className="relative z-10 mt-6">
          <p className="text-white/15 text-xs italic tracking-wide">"Wear what no one else can."</p>
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="flex-1 lg:w-[48%] flex items-center justify-center p-8 bg-[#F9F8F5]">
        <div className="w-full max-w-[400px] space-y-7">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-7 h-7 bg-[#0E0E0C] rounded-sm flex items-center justify-center">
              <span className="text-[#DFFF00] font-black text-xs">H</span>
            </div>
            <span className="text-[#0E0E0C] text-xs tracking-[0.2em] uppercase font-medium">Hypervault</span>
          </div>

          <div>
            <h2 className="text-[#0E0E0C] text-2xl font-semibold tracking-tight">
              {isSignUp ? "Create your vault" : "Welcome back"}
            </h2>
            <p className="text-[#888880] text-sm mt-1.5">
              {isSignUp ? "Join the atelier. Build your identity." : "Sign in to your account to continue."}
            </p>
          </div>

          {errorMsg && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3">
              <p className="text-red-600 text-xs">{errorMsg}</p>
            </div>
          )}

          <form onSubmit={handleAuth} className="space-y-4">
            {isSignUp && (
              <>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Full Name</label>
                  <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
                    placeholder="Tony Stark"
                    className="w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Phone</label>
                  <input type="tel" required value={phone} onChange={e => setPhone(e.target.value)}
                    placeholder="+91 XXXXX XXXXX"
                    className="w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" />
                </div>
              </>
            )}

            <div className="space-y-1.5">
              <label className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Email Address</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" />
            </div>

            {/* Password — fixed toggle */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-[11px] font-medium uppercase tracking-wider text-[#888880]">Password</label>
                {!isSignUp && (
                  <button type="button" tabIndex={-1}
                    className="text-[11px] text-[#888880] hover:text-[#0E0E0C] transition-colors">
                    Forgot password?
                  </button>
                )}
              </div>
              <div className="relative flex items-center">
                <input
                  key={showPassword ? "text" : "password"}
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 pr-12 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors"
                />
                <button
                  type="button"
                  tabIndex={-1}
                  onMouseDown={e => e.preventDefault()}
                  onClick={() => setShowPassword(v => !v)}
                  className="absolute right-0 top-0 h-full px-4 flex items-center text-[#C8C6C0] hover:text-[#0E0E0C] transition-colors rounded-r-xl"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-[#0E0E0C] text-white rounded-xl py-3.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1a1a18] active:scale-[0.99] transition-all disabled:opacity-50">
              {loading
                ? <Loader2 className="w-4 h-4 animate-spin" />
                : <>{isSignUp ? "Create Account" : "Sign In"} <ArrowRight className="w-4 h-4" /></>
              }
            </button>
          </form>

          <div className="relative flex items-center gap-4">
            <div className="flex-1 h-px bg-[#E8E6E0]" />
            <span className="text-[11px] text-[#C8C6C0] uppercase tracking-wider">or</span>
            <div className="flex-1 h-px bg-[#E8E6E0]" />
          </div>

          <button onClick={() => navigate({ to: "/" })}
            className="w-full bg-white border border-[#E8E6E0] text-[#888880] rounded-xl py-3 text-sm hover:border-[#0E0E0C] hover:text-[#0E0E0C] transition-colors">
            Browse as Guest
          </button>

          <p className="text-center text-sm text-[#888880]">
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => { setIsSignUp(!isSignUp); setErrorMsg(""); }}
              className="text-[#0E0E0C] font-semibold hover:underline">
              {isSignUp ? "Sign in" : "Create one"}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/login")({
  beforeLoad: async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return;
    const { data: profile } = await supabase
      .from("profiles").select("role").eq("id", session.user.id).maybeSingle();
    const role = String(profile?.role ?? "").toUpperCase();
    if (role === "ADMIN")  throw redirect({ to: "/admin" });
    if (role === "VENDOR") throw redirect({ to: "/vendor" });
    throw redirect({ to: "/" });
  },
  component: LoginPage,
});