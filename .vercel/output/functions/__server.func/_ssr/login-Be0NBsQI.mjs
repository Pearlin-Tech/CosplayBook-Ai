import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { d as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { s as supabase } from "./router-CYT0jzOA.mjs";
import { E as EyeOff, t as Eye, u as Loader2, v as ArrowRight } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/scheduler.mjs";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/supabase__supabase-js.mjs";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
function LoginPage() {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = reactExports.useState(false);
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [fullName, setFullName] = reactExports.useState("");
  const [phone, setPhone] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const [errorMsg, setErrorMsg] = reactExports.useState("");
  const [mousePos, setMousePos] = reactExports.useState({
    x: 0.5,
    y: 0.5
  });
  const [hovered, setHovered] = reactExports.useState(false);
  const leftRef = reactExports.useRef(null);
  const handleMouseMove = (e) => {
    const rect = leftRef.current?.getBoundingClientRect();
    if (!rect) return;
    setMousePos({
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height
    });
  };
  const handleAuth = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    try {
      if (isSignUp) {
        const {
          data,
          error
        } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              full_name: fullName,
              phone_number: phone
            }
          }
        });
        if (error) throw error;
        if (data.user) {
          await supabase.from("profiles").insert({
            id: data.user.id,
            email,
            full_name: fullName,
            phone_number: phone,
            role: "CUSTOMER"
          });
        }
        alert("Account created! You can now sign in.");
        setIsSignUp(false);
      } else {
        const {
          data,
          error
        } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        if (error) throw error;
        let role = "";
        for (let i = 0; i < 3; i++) {
          const {
            data: p
          } = await supabase.from("profiles").select("role").eq("id", data.user.id).maybeSingle();
          if (p?.role) {
            role = String(p.role).toUpperCase();
            break;
          }
          await new Promise((r) => setTimeout(r, 600));
        }
        if (role === "ADMIN") navigate({
          to: "/admin"
        });
        else if (role === "VENDOR") navigate({
          to: "/vendor"
        });
        else navigate({
          to: "/"
        });
      }
    } catch (err) {
      setErrorMsg(err.message || "Authentication failed.");
    } finally {
      setLoading(false);
    }
  };
  const glowX = `${mousePos.x * 100}%`;
  const glowY = `${mousePos.y * 100}%`;
  const cards = [{
    num: "01",
    title: "COMPOSE",
    sub: "Choose your weight, weave, and base colorway from our matte heritage palette."
  }, {
    num: "02",
    title: "CONFIGURE",
    sub: "Drag graphics, type, embroidery onto a photoreal 3D garment in real time."
  }, {
    num: "03",
    title: "VAULT",
    sub: "Your design is numbered, signed and held in your private vault — forever."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex bg-[#0E0E0C]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: leftRef, onMouseMove: handleMouseMove, onMouseEnter: () => setHovered(true), onMouseLeave: () => setHovered(false), className: "hidden lg:flex lg:w-[52%] relative flex-col justify-between p-14 overflow-hidden cursor-default select-none", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
        backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, transparent 0)",
        backgroundSize: "28px 28px"
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 transition-opacity duration-500 pointer-events-none", style: {
        opacity: hovered ? 1 : 0,
        background: `radial-gradient(600px circle at ${glowX} ${glowY}, rgba(223,255,0,0.07), transparent 60%)`
      } }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/4 w-80 h-80 bg-[#DFFF00]/[0.03] rounded-full blur-3xl pointer-events-none" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 bg-[#DFFF00] rounded-sm flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0E0E0C] font-black text-sm tracking-tighter", children: "H" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/60 text-xs font-medium tracking-[0.22em] uppercase", children: "Hypervault" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#DFFF00]/50 text-[10px] tracking-[0.28em] uppercase", children: "Edition 01 — The Vault" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "text-5xl xl:text-[3.6rem] font-light text-white leading-[1.08] tracking-tight", children: [
          "Bespoke",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "Streetwear,",
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx("em", { className: "not-italic text-[#DFFF00]", children: "Vaulted" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          "by You."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/30 text-sm leading-relaxed max-w-[280px]", children: "Design every thread. Own every detail. Crafted in limited batches — never mass-produced, never repeated." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3 transition-all duration-700", style: {
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(12px)"
        }, children: cards.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-white/[0.08] rounded-xl p-4 bg-white/[0.02] backdrop-blur-sm", style: {
          transition: "border-color 0.3s"
        }, onMouseEnter: (e) => e.currentTarget.style.borderColor = "rgba(223,255,0,0.2)", onMouseLeave: (e) => e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#DFFF00]/40 text-[9px] font-mono", children: c.num }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-1.5 h-1.5 rounded-full bg-[#DFFF00]/30" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/80 text-[10px] font-semibold tracking-[0.15em] mb-2", children: c.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/25 text-[10px] leading-relaxed", children: c.sub })
        ] }, c.num)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4 transition-all duration-500 absolute bottom-0 left-0", style: {
          opacity: hovered ? 0 : 1,
          pointerEvents: hovered ? "none" : "auto"
        }, children: ["Design", "Configure", "Vault"].map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          i > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-px bg-white/10" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[#DFFF00]/35 text-[9px] font-mono", children: [
              "0",
              i + 1
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white/25 text-[10px] uppercase tracking-widest", children: step })
          ] })
        ] }, step)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative z-10 mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-white/15 text-xs italic tracking-wide", children: '"Wear what no one else can."' }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 lg:w-[48%] flex items-center justify-center p-8 bg-[#F9F8F5]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[400px] space-y-7", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 bg-[#0E0E0C] rounded-sm flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#DFFF00] font-black text-xs", children: "H" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[#0E0E0C] text-xs tracking-[0.2em] uppercase font-medium", children: "Hypervault" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[#0E0E0C] text-2xl font-semibold tracking-tight", children: isSignUp ? "Create your vault" : "Welcome back" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[#888880] text-sm mt-1.5", children: isSignUp ? "Join the atelier. Build your identity." : "Sign in to your account to continue." })
      ] }),
      errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-red-50 border border-red-200 rounded-xl px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-red-600 text-xs", children: errorMsg }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleAuth, className: "space-y-4", children: [
        isSignUp && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-medium uppercase tracking-wider text-[#888880]", children: "Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", required: true, value: fullName, onChange: (e) => setFullName(e.target.value), placeholder: "Tony Stark", className: "w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-medium uppercase tracking-wider text-[#888880]", children: "Phone" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", required: true, value: phone, onChange: (e) => setPhone(e.target.value), placeholder: "+91 XXXXX XXXXX", className: "w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-medium uppercase tracking-wider text-[#888880]", children: "Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", required: true, value: email, onChange: (e) => setEmail(e.target.value), placeholder: "you@example.com", className: "w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "text-[11px] font-medium uppercase tracking-wider text-[#888880]", children: "Password" }),
            !isSignUp && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", tabIndex: -1, className: "text-[11px] text-[#888880] hover:text-[#0E0E0C] transition-colors", children: "Forgot password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: showPassword ? "text" : "password", required: true, value: password, onChange: (e) => setPassword(e.target.value), placeholder: "••••••••••••", className: "w-full bg-white border border-[#E8E6E0] rounded-xl px-4 py-3 pr-12 text-sm text-[#0E0E0C] placeholder-[#C8C6C0] outline-none focus:border-[#0E0E0C] transition-colors" }, showPassword ? "text" : "password"),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", tabIndex: -1, onMouseDown: (e) => e.preventDefault(), onClick: () => setShowPassword((v) => !v), className: "absolute right-0 top-0 h-full px-4 flex items-center text-[#C8C6C0] hover:text-[#0E0E0C] transition-colors rounded-r-xl", children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-4 h-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full bg-[#0E0E0C] text-white rounded-xl py-3.5 text-sm font-medium flex items-center justify-center gap-2 hover:bg-[#1a1a18] active:scale-[0.99] transition-all disabled:opacity-50", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          isSignUp ? "Create Account" : "Sign In",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "w-4 h-4" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[#E8E6E0]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[11px] text-[#C8C6C0] uppercase tracking-wider", children: "or" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-[#E8E6E0]" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => navigate({
        to: "/"
      }), className: "w-full bg-white border border-[#E8E6E0] text-[#888880] rounded-xl py-3 text-sm hover:border-[#0E0E0C] hover:text-[#0E0E0C] transition-colors", children: "Browse as Guest" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-sm text-[#888880]", children: [
        isSignUp ? "Already have an account? " : "Don't have an account? ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => {
          setIsSignUp(!isSignUp);
          setErrorMsg("");
        }, className: "text-[#0E0E0C] font-semibold hover:underline", children: isSignUp ? "Sign in" : "Create one" })
      ] })
    ] }) })
  ] });
}
export {
  LoginPage as component
};
