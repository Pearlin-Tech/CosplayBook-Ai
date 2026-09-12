import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { d as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import { H as Header, M as MagneticButton, c as cn } from "./Header-CRS0q2G1.mjs";
import { F as Footer } from "./Footer-BBdS2KMd.mjs";
import { u as useSession } from "./router-CYT0jzOA.mjs";
import { u as useSavedDesigns } from "./saved-designs-X5M1K1V9.mjs";
import { t as teeBlack, h as hoodieGrey, c as crewCream, p as pantsOlive } from "./product-pants-olive-BM6jgIYu.mjs";
import { R as Root2, T as Trigger2, P as Portal2, C as Content2, a as Title2, D as Description2, b as Cancel, A as Action, O as Overlay2 } from "../_libs/radix-ui__react-alert-dialog.mjs";
import { S as Slot } from "../_libs/radix-ui__react-slot.mjs";
import { c as cva } from "../_libs/class-variance-authority.mjs";
import { B as BadgeCheck, i as Plus, j as ShoppingBag, k as Bookmark, H as Heart, M as MapPin, l as PenLine, m as Bell, n as Shield, b as LogOut, T as Trash2 } from "../_libs/lucide-react.mjs";
import { m as motion, u as useInView } from "../_libs/framer-motion.mjs";
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
import "../_libs/clsx.mjs";
import "../_libs/tailwind-merge.mjs";
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
import "../_libs/radix-ui__react-context.mjs";
import "../_libs/radix-ui__react-compose-refs.mjs";
import "../_libs/radix-ui__react-dialog.mjs";
import "../_libs/radix-ui__primitive.mjs";
import "../_libs/radix-ui__react-id.mjs";
import "../_libs/@radix-ui/react-use-layout-effect+[...].mjs";
import "../_libs/@radix-ui/react-use-controllable-state+[...].mjs";
import "../_libs/@radix-ui/react-dismissable-layer+[...].mjs";
import "../_libs/radix-ui__react-primitive.mjs";
import "../_libs/@radix-ui/react-use-callback-ref+[...].mjs";
import "../_libs/@radix-ui/react-use-escape-keydown+[...].mjs";
import "../_libs/radix-ui__react-focus-scope.mjs";
import "../_libs/radix-ui__react-portal.mjs";
import "../_libs/radix-ui__react-presence.mjs";
import "../_libs/radix-ui__react-focus-guards.mjs";
import "../_libs/react-remove-scroll.mjs";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "../_libs/aria-hidden.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        icon: "h-9 w-9"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
const Button = reactExports.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Comp, { className: cn(buttonVariants({ variant, size, className })), ref, ...props });
  }
);
Button.displayName = "Button";
const AlertDialog = Root2;
const AlertDialogTrigger = Trigger2;
const AlertDialogPortal = Portal2;
const AlertDialogOverlay = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Overlay2,
  {
    className: cn(
      "fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    ),
    ...props,
    ref
  }
));
AlertDialogOverlay.displayName = Overlay2.displayName;
const AlertDialogContent = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogPortal, { children: [
  /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogOverlay, {}),
  /* @__PURE__ */ jsxRuntimeExports.jsx(
    Content2,
    {
      ref,
      className: cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg",
        className
      ),
      ...props
    }
  )
] }));
AlertDialogContent.displayName = Content2.displayName;
const AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("flex flex-col space-y-2 text-center sm:text-left", className), ...props });
AlertDialogHeader.displayName = "AlertDialogHeader";
const AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  "div",
  {
    className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
    ...props
  }
);
AlertDialogFooter.displayName = "AlertDialogFooter";
const AlertDialogTitle = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Title2,
  {
    ref,
    className: cn("text-lg font-semibold", className),
    ...props
  }
));
AlertDialogTitle.displayName = Title2.displayName;
const AlertDialogDescription = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Description2,
  {
    ref,
    className: cn("text-sm text-muted-foreground", className),
    ...props
  }
));
AlertDialogDescription.displayName = Description2.displayName;
const AlertDialogAction = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(Action, { ref, className: cn(buttonVariants(), className), ...props }));
AlertDialogAction.displayName = Action.displayName;
const AlertDialogCancel = reactExports.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
  Cancel,
  {
    ref,
    className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
    ...props
  }
));
AlertDialogCancel.displayName = Cancel.displayName;
const tabs = [{
  id: "orders",
  label: "Orders",
  icon: ShoppingBag
}, {
  id: "designs",
  label: "Designs",
  icon: Bookmark
}, {
  id: "wishlist",
  label: "Wishlist",
  icon: Heart
}, {
  id: "addresses",
  label: "Addresses",
  icon: MapPin
}, {
  id: "profile",
  label: "Account",
  icon: PenLine
}, {
  id: "alerts",
  label: "Alerts",
  icon: Bell
}, {
  id: "preferences",
  label: "Preferences",
  icon: Bell
}, {
  id: "security",
  label: "Danger Zone",
  icon: Shield
}];
function VaultGate() {
  const {
    loggedIn,
    signIn,
    user
  } = useSession();
  if (!loggedIn || !user) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "container-edge py-32 text-center max-w-lg mx-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Vault Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "mt-6 font-serif text-5xl", children: [
          "Enter your ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "italic text-[color:var(--gold)]", children: "Vault" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-foreground/65", children: "Your archive of orders, saved designs, and configuration history." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: signIn, className: "btn-ink", children: "Enter Vault" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Vault, {});
}
function Vault() {
  const [tab, setTab] = reactExports.useState("orders");
  const {
    user,
    signOut
  } = useSession();
  const navigate = useNavigate();
  if (!user) return null;
  const handleLogout = () => {
    signOut();
    navigate({
      to: "/login"
    });
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "container-edge py-12 lg:py-16 grid lg:grid-cols-[300px_1fr] gap-8 lg:gap-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("aside", { className: "lg:sticky lg:top-24 lg:self-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-surface p-7", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-full bg-foreground text-background grid place-items-center font-serif text-xl", children: user.initials }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-xl truncate", children: user.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 text-xs text-foreground/55 truncate", children: [
                user.email,
                " ",
                user.emailVerified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "text-[color:var(--gold)]" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 grid grid-cols-3 gap-2 text-center", children: [["3", "Active"], ["7", "Drafts"], ["$1.8K", "Spent"]].map(([n, l]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-2xl", children: n }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label mt-0.5 text-[10px]", children: l })
          ] }, l)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MagneticButton, { className: "mt-6 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", className: "flex items-center justify-center gap-3 bg-[color:var(--pop)] text-foreground py-3.5 text-xs uppercase tracking-[0.2em] w-full", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 14 }),
            " Create New Design"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "mt-6 space-y-2 text-sm border-t border-border pt-5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/55", children: "Vault" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono", children: user.vault })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/55", children: "Tier" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[color:var(--gold)]", children: user.tier })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground/55", children: "Member" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: user.joined })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "mt-4 flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible", children: [
          tabs.map((t) => {
            const Icon = t.icon;
            const active = tab === t.id;
            return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setTab(t.id), className: `flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.18em] whitespace-nowrap transition-colors ${active ? "bg-foreground text-background" : "hover:bg-surface text-foreground/70"} ${t.id === "security" ? active ? "" : "text-[color:var(--destructive)]/80 hover:text-[color:var(--destructive)]" : ""}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { size: 13 }),
              t.label
            ] }, t.id);
          }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: handleLogout, className: "lg:mt-4 flex items-center gap-3 px-4 py-3 text-xs uppercase tracking-[0.18em] border border-border hover:bg-foreground hover:text-background transition-colors whitespace-nowrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { size: 13 }),
            " Sign Out"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
        tab === "orders" && /* @__PURE__ */ jsxRuntimeExports.jsx(Orders, {}),
        tab === "designs" && /* @__PURE__ */ jsxRuntimeExports.jsx(Designs, {}),
        tab === "wishlist" && /* @__PURE__ */ jsxRuntimeExports.jsx(Wishlist, {}),
        tab === "profile" && /* @__PURE__ */ jsxRuntimeExports.jsx(Profile, {}),
        tab === "addresses" && /* @__PURE__ */ jsxRuntimeExports.jsx(Addresses, {}),
        tab === "alerts" && /* @__PURE__ */ jsxRuntimeExports.jsx(Alerts, {}),
        tab === "preferences" && /* @__PURE__ */ jsxRuntimeExports.jsx(Preferences, {}),
        tab === "security" && /* @__PURE__ */ jsxRuntimeExports.jsx(DangerZone, { onLogout: handleLogout })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Footer, {})
  ] });
}
const STAGES = ["Order Confirmed", "Crafting in Batch", "Shipped via Premium Courier", "Delivered"];
function Orders() {
  const orders = [{
    id: "HV-2026-0247",
    item: "Oversized Tee · Obsidian · M",
    price: 95,
    stage: 1,
    img: teeBlack,
    eta: "ETA 18 Jun"
  }, {
    id: "HV-2026-0241",
    item: "Atelier Hoodie · Cobalt · L",
    price: 210,
    stage: 2,
    img: hoodieGrey,
    eta: "ETA 09 Jun"
  }, {
    id: "HV-2026-0233",
    item: "Studio Crewneck · Cream · M",
    price: 145,
    stage: 3,
    img: crewCream,
    eta: "Delivered 02 Jun"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-end justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Active Orders" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Atelier Tracking" })
    ] }) }),
    orders.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx(OrderCard, { ...o }, o.id))
  ] });
}
function OrderCard({
  id,
  item,
  price,
  stage,
  img,
  eta
}) {
  const ref = reactExports.useRef(null);
  const inView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: "bg-surface p-5 md:p-7", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: img, alt: "", className: "w-20 h-24 md:w-24 md:h-28 object-cover shrink-0" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-baseline justify-between gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "micro-label", children: id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-xl mt-1", children: item })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-mono text-sm", children: [
            "$",
            price,
            ".00"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[11px] text-foreground/55 mt-0.5", children: eta })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative h-1 bg-border rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(motion.div, { initial: {
          width: 0
        }, animate: inView ? {
          width: `${stage / (STAGES.length - 1) * 100}%`
        } : {}, transition: {
          duration: 1.2,
          ease: [0.2, 0.7, 0.2, 1],
          delay: 0.2
        }, className: "absolute inset-y-0 left-0 bg-foreground" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-4 gap-2", children: STAGES.map((s, i) => {
          const reached = i <= stage;
          const current = i === stage;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-start gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `relative w-2.5 h-2.5 rounded-full ${reached ? "bg-foreground" : "bg-border"}`, children: current && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute inset-0 rounded-full bg-[color:var(--pop)] animate-pulse-beacon" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-mono uppercase tracking-[0.12em] leading-tight ${reached ? "text-foreground" : "text-foreground/40"}`, children: s })
          ] }, s);
        }) })
      ] })
    ] })
  ] }) });
}
function Designs() {
  const {
    items,
    remove
  } = useSavedDesigns();
  const stock = [{
    thumb: teeBlack,
    name: "Heritage Tee Draft",
    config: "Obsidian · M"
  }, {
    thumb: hoodieGrey,
    name: "Atelier Hoodie Draft",
    config: "Cobalt · L"
  }, {
    thumb: crewCream,
    name: "Studio Crewneck",
    config: "Cream · M"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Saved Designs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Your Drafts" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/studio", className: "btn-outline", children: "+ New Design" })
    ] }),
    items.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid grid-cols-2 md:grid-cols-3 gap-4", children: items.map((d) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 12
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "bg-surface overflow-hidden group", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "aspect-[3/4] relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: d.thumb, alt: "", className: "w-full h-full object-cover", style: {
          filter: "grayscale(1)"
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0", style: {
          backgroundColor: d.colorHex,
          mixBlendMode: "multiply",
          opacity: 0.7
        } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2 micro-label !text-background bg-foreground/70 px-2 py-1 text-[9px]", children: "VAULTED" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => remove(d.id), className: "absolute top-2 right-2 p-1.5 bg-background/85 hover:bg-[color:var(--destructive)] hover:text-background transition-colors", title: "Remove", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 12 }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-sm truncate", children: d.garmentName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "micro-label mt-1 text-[9px] truncate", children: [
          d.colorName,
          " · ",
          d.size
        ] })
      ] })
    ] }, d.id)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Workspace" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 grid grid-cols-2 md:grid-cols-3 gap-4", children: stock.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/studio", className: "aspect-[3/4] bg-surface overflow-hidden relative group block", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: s.thumb, alt: "", className: "w-full h-full object-cover" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-foreground/0 group-hover:bg-foreground/60 transition-colors grid place-items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "opacity-0 group-hover:opacity-100 btn-outline !border-background !text-background", children: "Edit" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute bottom-2 left-2 micro-label !text-background bg-foreground/70 px-2 py-1", children: [
          "Draft Nº 0",
          i + 1
        ] })
      ] }, i)) })
    ] })
  ] });
}
function Profile() {
  const {
    user,
    update
  } = useSession();
  if (!user) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Personal Information" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Identity" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/55 italic-serif", children: "All fields editable. Changes persist to your vault profile." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-10 grid md:grid-cols-2 gap-x-8 gap-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Full name", value: user.name, onChange: (v) => update({
        name: v,
        initials: v.split(" ").map((p) => p[0]).slice(0, 2).join("").toUpperCase()
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Email", value: user.email, onChange: (v) => update({
        email: v
      }), verified: user.emailVerified }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Phone", value: user.phone, onChange: (v) => update({
        phone: v
      }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Date of birth", value: user.dob, onChange: (v) => update({
        dob: v
      }), type: "date" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Gender", value: user.gender, onChange: (v) => update({
        gender: v
      }), options: ["Prefer not to say", "Woman", "Man", "Non-binary", "Other"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { label: "Tier", value: user.tier, onChange: (v) => update({
        tier: v
      }), readOnly: true })
    ] })
  ] });
}
function Addresses() {
  const [addrs, setAddrs] = reactExports.useState([{
    id: "a1",
    label: "Home",
    name: "Aarav Verma",
    line: "4th floor, Bandra Heights",
    city: "Mumbai, MH 400050",
    country: "India",
    phone: "+91 ••• ••• 4521",
    primary: true
  }, {
    id: "a2",
    label: "Studio",
    name: "Aarav Verma",
    line: "Atelier Loft Nº 12",
    city: "Lower Parel, MH 400013",
    country: "India",
    phone: "+91 ••• ••• 4521",
    primary: false
  }]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Address Book" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Shipping Vault" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 grid md:grid-cols-2 gap-4", children: [
      addrs.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-6 border border-border bg-surface/40", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between items-start", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: a.label }),
            a.primary && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-mono uppercase tracking-[0.15em] bg-[color:var(--pop)] px-2 py-0.5", children: "Primary" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "text-xs underline hover:text-foreground/60", children: "Edit" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setAddrs(addrs.filter((x) => x.id !== a.id)), className: "text-xs underline text-[color:var(--destructive)]/80", children: "Remove" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-4 font-serif text-xl", children: a.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "mt-2 text-sm text-foreground/70 leading-relaxed", children: [
          a.line,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          a.city,
          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
          a.country,
          " · ",
          a.phone
        ] })
      ] }, a.id)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "border border-dashed border-[color:var(--gold)] p-6 text-center hover:bg-surface min-h-[180px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { size: 22, className: "mx-auto text-[color:var(--gold)]" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 micro-label", children: "Add Address" })
      ] })
    ] })
  ] });
}
function Preferences() {
  const [notify, setNotify] = reactExports.useState({
    shipping: true,
    drops: true,
    marketing: false,
    atelier: true
  });
  const [currency, setCurrency] = reactExports.useState("USD");
  const [defaultSize, setDefaultSize] = reactExports.useState("M");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Notifications" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Atelier Signals" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 space-y-2", children: [["shipping", "Shipping & order updates"], ["atelier", "Atelier crafting status"], ["drops", "Edition releases"], ["marketing", "Promotional content"]].map(([k, label]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between p-4 bg-surface", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm", children: label }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setNotify({
          ...notify,
          [k]: !notify[k]
        }), className: `relative w-11 h-6 rounded-full transition-colors ${notify[k] ? "bg-[color:var(--pop)]" : "bg-border"}`, "aria-label": label, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute top-0.5 w-5 h-5 rounded-full bg-foreground transition-all ${notify[k] ? "left-[22px]" : "left-0.5"}` }) })
      ] }, k)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid md:grid-cols-2 gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Default size", value: defaultSize, onChange: setDefaultSize, options: ["XS", "S", "M", "L", "XL", "XXL"] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { label: "Currency", value: currency, onChange: setCurrency, options: ["USD", "EUR", "GBP", "INR", "JPY"] })
    ] })
  ] });
}
function Wishlist() {
  const [items, setItems] = reactExports.useState([{
    id: "w1",
    name: "Atelier Hoodie · Cobalt",
    price: 210,
    img: hoodieGrey,
    stock: "In atelier"
  }, {
    id: "w2",
    name: "Heritage Tee · Obsidian",
    price: 95,
    img: teeBlack,
    stock: "Made-to-order"
  }, {
    id: "w3",
    name: "Cargo Pants · Olive",
    price: 245,
    img: pantsOlive,
    stock: "Edition · 12 remaining"
  }, {
    id: "w4",
    name: "Studio Crewneck · Cream",
    price: 145,
    img: crewCream,
    stock: "Restocking"
  }]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Wishlist" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Coveted Editions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-foreground/55 italic-serif", children: "Pieces you've earmarked for the next acquisition." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 grid sm:grid-cols-2 gap-4", children: items.map((w) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      y: 10
    }, animate: {
      opacity: 1,
      y: 0
    }, className: "flex gap-4 p-4 bg-surface", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: w.img, alt: "", className: "w-24 h-28 object-cover" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg truncate", children: w.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-[10px] font-mono uppercase tracking-[0.15em] text-[color:var(--gold)]", children: w.stock }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2 font-mono", children: [
          "$",
          w.price
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-3 flex gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/studio", className: "text-[10px] uppercase tracking-[0.18em] px-3 py-2 bg-foreground text-background", children: "Customize" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setItems(items.filter((x) => x.id !== w.id)), className: "text-[10px] uppercase tracking-[0.18em] px-3 py-2 border border-border hover:border-[color:var(--destructive)] hover:text-[color:var(--destructive)]", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { size: 11, className: "inline mr-1" }),
            " Remove"
          ] })
        ] })
      ] })
    ] }, w.id)) })
  ] });
}
function Alerts() {
  const alerts = [{
    id: 1,
    title: "Order HV-2026-0241 — Crafting in Batch",
    time: "2h ago",
    tone: "gold",
    body: "Your Atelier Hoodie has entered the cut-and-sew pipeline."
  }, {
    id: 2,
    title: "New Edition Drop — Lunar Indigo Cargo",
    time: "1d ago",
    tone: "pop",
    body: "Limited 80 pieces · Vault members get early access."
  }, {
    id: 3,
    title: "Design saved to Vault",
    time: "3d ago",
    tone: "neutral",
    body: "Heritage Tee Draft · Obsidian · M was archived."
  }, {
    id: 4,
    title: "Shipping address verified",
    time: "6d ago",
    tone: "neutral",
    body: "Mumbai, MH · Confirmed by courier partner."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label", children: "Atelier Signals" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Alerts" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 space-y-3", children: alerts.map((a) => /* @__PURE__ */ jsxRuntimeExports.jsxs(motion.div, { initial: {
      opacity: 0,
      x: -8
    }, animate: {
      opacity: 1,
      x: 0
    }, className: "flex gap-4 p-5 bg-surface relative overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `absolute left-0 top-0 bottom-0 w-1 ${a.tone === "gold" ? "bg-[color:var(--gold)]" : a.tone === "pop" ? "bg-[color:var(--pop)]" : "bg-foreground/20"}` }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-lg", children: a.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-[10px] font-mono uppercase tracking-[0.15em] text-foreground/50", children: a.time })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/65", children: a.body })
      ] })
    ] }, a.id)) })
  ] });
}
function DangerZone({
  onLogout
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "micro-label !text-[color:var(--destructive)]", children: "Danger Zone" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-serif text-4xl mt-2", children: "Irreversible Actions" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-8 relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -left-2 w-6 h-6 border-t border-l border-[color:var(--destructive)]/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2 -right-2 w-6 h-6 border-t border-r border-[color:var(--destructive)]/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -left-2 w-6 h-6 border-b border-l border-[color:var(--destructive)]/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-2 -right-2 w-6 h-6 border-b border-r border-[color:var(--destructive)]/60" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border border-[color:var(--destructive)]/35 p-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DangerRow, { title: "Sign Out of All Devices", desc: "Revoke active sessions across every browser and device tied to this vault.", actionLabel: "Sign Out Everywhere", onConfirm: onLogout }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-[color:var(--destructive)]/20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DangerRow, { title: "Delete Vault Account", desc: "Permanently erase your profile, saved designs, addresses, and order history. This cannot be undone.", actionLabel: "Delete Account", destructive: true, onConfirm: onLogout })
      ] })
    ] })
  ] });
}
function DangerRow({
  title,
  desc,
  actionLabel,
  destructive,
  onConfirm
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-serif text-xl", children: title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-sm text-foreground/60", children: desc })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialog, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogTrigger, { asChild: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: `text-xs uppercase tracking-[0.18em] px-5 py-3 border ${destructive ? "border-[color:var(--destructive)] bg-[color:var(--destructive)] text-background hover:opacity-90" : "border-[color:var(--destructive)] text-[color:var(--destructive)] hover:bg-[color:var(--destructive)] hover:text-background"} transition-colors`, children: actionLabel }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogTitle, { children: [
            title,
            "?"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogDescription, { children: desc })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AlertDialogFooter, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogCancel, { children: "Cancel" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDialogAction, { onClick: onConfirm, children: "Confirm" })
        ] })
      ] })
    ] })
  ] });
}
function Field({
  label,
  value,
  onChange,
  type = "text",
  verified,
  readOnly
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("label", { className: "micro-label flex items-center gap-2", children: [
      label,
      verified && /* @__PURE__ */ jsxRuntimeExports.jsx(BadgeCheck, { size: 12, className: "text-[color:var(--gold)]" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type, className: "field", value, readOnly, onChange: (e) => onChange(e.target.value) })
  ] });
}
function Select({
  label,
  value,
  onChange,
  options
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("label", { className: "micro-label", children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("select", { className: "field bg-transparent", value, onChange: (e) => onChange(e.target.value), children: options.map((o) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: o, children: o }, o)) })
  ] });
}
export {
  VaultGate as component
};
