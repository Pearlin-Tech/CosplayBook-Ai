import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { a as useCart, u as useSession } from "./router-Bd89BIBB.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { j as ShoppingBag, y as Menu, X, Y as User, B as BadgeCheck, k as Bookmark, S as Settings, b as LogOut } from "../_libs/lucide-react.mjs";
import { A as AnimatePresence, m as motion, d as useMotionValue, b as useSpring } from "../_libs/framer-motion.mjs";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const MagneticButton = reactExports.forwardRef(function MagneticButton2({ children, className, radius = 90, strength = 0.35, onClick, type }, ref) {
  const localRef = reactExports.useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });
  const handleMove = (e) => {
    const el = localRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const r = Math.max(rect.width, rect.height) / 2 + radius;
    if (dist < r) {
      x.set(dx * strength);
      y.set(dy * strength);
    } else {
      x.set(0);
      y.set(0);
    }
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      ref: (el) => {
        localRef.current = el;
        if (typeof ref === "function") ref(el);
        else if (ref) ref.current = el;
      },
      onMouseMove: handleMove,
      onMouseLeave: handleLeave,
      onClick,
      style: { x: sx, y: sy },
      className: cn("inline-block will-change-transform", className),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { style: { x: useSpring(x, { stiffness: 150, damping: 15 }), y: useSpring(y, { stiffness: 150, damping: 15 }) }, children }),
        type === "submit" && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", className: "sr-only" })
      ]
    }
  );
});
function ProfileDropCard() {
  const { user, loggedIn, signIn, signOut } = useSession();
  const [open, setOpen] = reactExports.useState(false);
  const ref = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const onDoc = (e) => {
      if (!ref.current?.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref, className: "relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        onClick: () => setOpen((o) => !o),
        className: "relative inline-flex items-center gap-2 p-2.5 border border-border rounded-full hover:border-foreground transition-colors",
        "aria-label": "Profile",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 16, strokeWidth: 1.5 })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: open && /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        initial: { opacity: 0, y: -8, scale: 0.97 },
        animate: { opacity: 1, y: 0, scale: 1 },
        exit: { opacity: 0, y: -8, scale: 0.97 },
        transition: { duration: 0.22, ease: [0.2, 0.7, 0.2, 1] },
        className: "absolute right-0 mt-3 w-[320px] bg-background border border-border shadow-[0_30px_80px_-30px_rgba(17,17,17,0.25)] z-50 origin-top-right",
        children: loggedIn && user ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-foreground text-background grid place-items-center font-serif text-lg", children: user.initials }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg truncate", children: user.name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-foreground/60 truncate", children: [
                  user.email,
                  user.emailVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "text-[color:var(--gold)] shrink-0" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 flex items-center justify-between micro-label", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                "Vault ",
                user.vault
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--gold)]", children: user.tier })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "py-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropLink, { to: "/vault", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 }), label: "My Vault", onClick: () => setOpen(false) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropLink, { to: "/vault", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { size: 14 }), label: "Saved Designs", onClick: () => setOpen(false) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropLink, { to: "/checkout", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }), label: "Cart & Orders", onClick: () => setOpen(false) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(DropLink, { to: "/vault", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, { size: 14 }), label: "Account Settings", onClick: () => setOpen(false) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 border-t border-border", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              onClick: () => {
                signOut();
                setOpen(false);
              },
              className: "w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] hover:bg-[color:var(--destructive)] transition-colors",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13 }),
                " Sign Out of Vault"
              ]
            }
          ) }) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-xl", children: "Welcome to Hypervault" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-xs text-foreground/60", children: "Enter your vault to view orders & saved designs." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "w-full mt-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              onClick: () => {
                signIn();
                setOpen(false);
              },
              className: "w-full inline-flex items-center justify-center gap-2 py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.2em]",
              children: "Enter Vault"
            }
          ) })
        ] })
      }
    ) })
  ] });
}
function DropLink({
  to,
  icon,
  label,
  onClick
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Link,
    {
      to,
      onClick,
      className: "flex items-center gap-3 px-6 py-2.5 text-sm hover:bg-surface transition-colors",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/50", children: icon }),
        label
      ]
    }
  );
}
const nav = [
  { to: "/studio", label: "Studio" },
  { to: "/collections", label: "Collections" },
  { to: "/vault", label: "My Vault" },
  { to: "/journal", label: "Journal" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" }
];
function Header() {
  const { count } = useCart();
  const { loggedIn, signOut } = useSession();
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge flex items-center justify-between h-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "font-serif text-2xl tracking-tight", children: [
        "Hyper",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "vault" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-9", children: nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: n.to,
          className: "text-[12px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors relative group",
          activeProps: { className: "text-foreground" },
          children: [
            n.label,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute left-0 -bottom-1 h-px w-0 bg-[color:var(--pop)] group-hover:w-full transition-all duration-300" })
          ]
        },
        n.to
      )) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "hidden sm:inline-block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/checkout", className: "relative inline-flex items-center gap-2 group", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-2.5 border border-border rounded-full group-hover:border-foreground transition-colors", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 16, strokeWidth: 1.5 }),
          count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[color:var(--pop)] text-[10px] font-mono font-semibold flex items-center justify-center animate-pulse-pop", children: count })
        ] }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileDropCard, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            className: "lg:hidden p-2.5 border border-border rounded-full",
            onClick: () => setMobileOpen(true),
            "aria-label": "Open menu",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { size: 16 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        className: "fixed inset-0 z-50 bg-background",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge flex items-center justify-between h-20 border-b border-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-serif text-2xl", children: [
              "Hyper",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "vault" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setMobileOpen(false), "aria-label": "Close menu", className: "p-2.5 border border-border rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 16 }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.nav,
            {
              initial: "hidden",
              animate: "show",
              variants: { show: { transition: { staggerChildren: 0.04 } } },
              className: "container-edge py-10 flex flex-col gap-1",
              children: [
                nav.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    variants: { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      Link,
                      {
                        to: n.to,
                        onClick: () => setMobileOpen(false),
                        className: "block py-4 font-serif text-4xl border-b border-border hover:text-[color:var(--gold)]",
                        children: n.label
                      }
                    )
                  },
                  n.to
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 flex items-center gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Link,
                    {
                      to: "/checkout",
                      onClick: () => setMobileOpen(false),
                      className: "flex-1 inline-flex items-center justify-center gap-2 py-4 border border-border text-xs uppercase tracking-[0.2em]",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { size: 14 }),
                        " Cart ",
                        count > 0 && `(${count})`
                      ]
                    }
                  ),
                  loggedIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      onClick: () => {
                        signOut();
                        setMobileOpen(false);
                      },
                      className: "flex-1 inline-flex items-center justify-center py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em]",
                      children: "Sign Out"
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/vault", onClick: () => setMobileOpen(false), className: "flex-1 inline-flex items-center justify-center py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em]", children: "My Vault" })
                ] })
              ]
            }
          )
        ]
      }
    ) })
  ] });
}
export {
  Header as H,
  MagneticButton as M,
  cn as c
};
