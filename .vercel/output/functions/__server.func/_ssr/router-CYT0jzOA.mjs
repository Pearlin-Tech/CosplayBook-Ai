import { Q as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { Q as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { c as createRouter, a as createRootRouteWithContext, u as useRouter, L as Link, O as Outlet, H as HeadContent, S as Scripts, b as createFileRoute, l as lazyRouteComponent } from "../_libs/tanstack__react-router.mjs";
import { Q as redirect } from "../_libs/tanstack__router-core.mjs";
import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { c as createClient } from "../_libs/supabase__supabase-js.mjs";
import "../_libs/react-dom.mjs";
import "stream";
import "util";
import "../_libs/scheduler.mjs";
import "node:stream";
import "../_libs/isbot.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "../_libs/supabase__postgrest-js.mjs";
import "../_libs/supabase__realtime-js.mjs";
import "../_libs/supabase__phoenix.mjs";
import "../_libs/supabase__storage-js.mjs";
import "../_libs/iceberg-js.mjs";
import "../_libs/supabase__auth-js.mjs";
import "tslib";
import "../_libs/supabase__functions-js.mjs";
const appCss = "/assets/styles-F-ZSkRZf.css";
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
const CartContext = reactExports.createContext(null);
function CartProvider({ children }) {
  const [cart, setCart] = reactExports.useState([]);
  const add = reactExports.useCallback((i) => {
    setCart((s) => {
      const ex = s.find((c) => c.id === i.id);
      if (ex) return s.map((c) => c.id === i.id ? { ...c, qty: c.qty + i.qty } : c);
      return [...s, i];
    });
  }, []);
  const remove = reactExports.useCallback((id) => setCart((s) => s.filter((c) => c.id !== id)), []);
  const setQty = reactExports.useCallback(
    (id, qty) => setCart((s) => s.map((c) => c.id === id ? { ...c, qty: Math.max(1, qty) } : c)),
    []
  );
  const clear = reactExports.useCallback(() => setCart([]), []);
  const count = cart.reduce((a, b) => a + b.qty, 0);
  const subtotal = cart.reduce((a, b) => a + b.price * b.qty, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CartContext.Provider, { value: { cart, add, remove, setQty, clear, count, subtotal }, children });
}
function useCart() {
  const c = reactExports.useContext(CartContext);
  if (!c) throw new Error("useCart must be inside CartProvider");
  return c;
}
const DEFAULT_USER = {
  name: "Aarav Verma",
  email: "aarav@studio.com",
  initials: "AV",
  vault: "Nº 0247",
  phone: "+91 98765 ••• 21",
  dob: "1996-12-04",
  gender: "Prefer not to say",
  emailVerified: true,
  tier: "Atelier",
  joined: "Mar 2025"
};
const SessionContext = reactExports.createContext(null);
const KEY = "hv:session";
function SessionProvider({ children }) {
  const [user, setUser] = reactExports.useState(DEFAULT_USER);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw === "null") setUser(null);
      else if (raw) setUser(JSON.parse(raw));
    } catch {
    }
  }, []);
  reactExports.useEffect(() => {
    if (typeof window === "undefined") return;
    localStorage.setItem(KEY, user ? JSON.stringify(user) : "null");
  }, [user]);
  const signIn = reactExports.useCallback(() => setUser(DEFAULT_USER), []);
  const signOut = reactExports.useCallback(() => setUser(null), []);
  const update = reactExports.useCallback(
    (patch) => setUser((u) => u ? { ...u, ...patch } : u),
    []
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(SessionContext.Provider, { value: { user, loggedIn: !!user, signIn, signOut, update }, children });
}
function useSession() {
  const c = reactExports.useContext(SessionContext);
  if (!c) throw new Error("useSession must be used within SessionProvider");
  return c;
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  reactExports.useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$e = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Hypervault — Bespoke Streetwear, Vaulted by You" },
      { name: "description", content: "Luxury custom apparel. Design every thread, own every detail. Crafted in limited batches — never mass-produced, never repeated." },
      { property: "og:title", content: "Hypervault — Bespoke Streetwear, Vaulted by You" },
      { property: "og:description", content: "Luxury custom apparel atelier. Design, configure, vault." },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Hypervault" },
      { name: "twitter:card", content: "summary_large_image" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..700;1,9..144,300..700&family=Instrument+Sans:ital,wght@0,400..700;1,400..700&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@400;500&display=swap" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("head", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$e.useRouteContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxRuntimeExports.jsx(SessionProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CartProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) }) });
}
const supabaseUrl = "https://zsdudvsyyykumpgwjlqn.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpzZHVkdnN5eXlrdW1wZ3dqbHFuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk3NjU1OTMsImV4cCI6MjA5NTM0MTU5M30.o9rpsQk8ivkdu5SaaH7aWn0DCBgdFiMtmkaLZyVjKrc";
let client;
{
  client = createClient(supabaseUrl, supabaseKey);
}
const supabase = client;
const $$splitComponentImporter$d = () => import("./vendor-DsjEMLGy.mjs");
const Route$d = createFileRoute("/vendor")({
  beforeLoad: async () => {
    return;
  },
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./vault-R83189RV.mjs");
const Route$c = createFileRoute("/vault")({
  head: () => ({
    meta: [{
      title: "My Vault — Hypervault"
    }, {
      name: "description",
      content: "Your private vault of bespoke creations."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./success-CN9LzNcT.mjs");
const Route$b = createFileRoute("/success")({
  head: () => ({
    meta: [{
      title: "Order Vaulted — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./studio-CKRhlMHv.mjs");
const Route$a = createFileRoute("/studio")({
  head: () => ({
    meta: [{
      title: "Studio — Hypervault"
    }, {
      name: "description",
      content: "Sculpt your bespoke garment in a real-time 3D atelier."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./sizing-Dw5S8VIn.mjs");
const Route$9 = createFileRoute("/sizing")({
  head: () => ({
    meta: [{
      title: "Sizing Guide — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./reviews-DRAroCLQ.mjs");
const Route$8 = createFileRoute("/reviews")({
  head: () => ({
    meta: [{
      title: "Reviews — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("./login-Be0NBsQI.mjs");
const Route$7 = createFileRoute("/login")({
  beforeLoad: async () => {
    const {
      data: {
        session
      }
    } = await supabase.auth.getSession();
    if (!session) return;
    const {
      data: profile
    } = await supabase.from("profiles").select("role").eq("id", session.user.id).maybeSingle();
    const role = String(profile?.role ?? "").toUpperCase();
    if (role === "ADMIN") throw redirect({
      to: "/admin"
    });
    if (role === "VENDOR") throw redirect({
      to: "/vendor"
    });
    throw redirect({
      to: "/"
    });
  },
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./journal-DL35eYl5.mjs");
const Route$6 = createFileRoute("/journal")({
  head: () => ({
    meta: [{
      title: "Journal — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./contact-BFw-ntXv.mjs");
const Route$5 = createFileRoute("/contact")({
  head: () => ({
    meta: [{
      title: "Contact — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./collections-CdD82rjQ.mjs");
const Route$4 = createFileRoute("/collections")({
  head: () => ({
    meta: [{
      title: "Collections — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./checkout-DNxJ0hJJ.mjs");
const Route$3 = createFileRoute("/checkout")({
  head: () => ({
    meta: [{
      title: "Checkout — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./care-COcjsLIP.mjs");
const Route$2 = createFileRoute("/care")({
  head: () => ({
    meta: [{
      title: "Care Guide — Hypervault"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./admin-UwtBDUK1.mjs");
const Route$1 = createFileRoute("/admin")({
  beforeLoad: async () => {
    return;
  },
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-BgLawiWj.mjs");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "Hypervault — Bespoke Streetwear, Vaulted by You"
    }, {
      name: "description",
      content: "Design every thread. Own every detail. Your custom apparel, crafted in limited batches — never mass-produced, never repeated."
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const VendorRoute = Route$d.update({
  id: "/vendor",
  path: "/vendor",
  getParentRoute: () => Route$e
});
const VaultRoute = Route$c.update({
  id: "/vault",
  path: "/vault",
  getParentRoute: () => Route$e
});
const SuccessRoute = Route$b.update({
  id: "/success",
  path: "/success",
  getParentRoute: () => Route$e
});
const StudioRoute = Route$a.update({
  id: "/studio",
  path: "/studio",
  getParentRoute: () => Route$e
});
const SizingRoute = Route$9.update({
  id: "/sizing",
  path: "/sizing",
  getParentRoute: () => Route$e
});
const ReviewsRoute = Route$8.update({
  id: "/reviews",
  path: "/reviews",
  getParentRoute: () => Route$e
});
const LoginRoute = Route$7.update({
  id: "/login",
  path: "/login",
  getParentRoute: () => Route$e
});
const JournalRoute = Route$6.update({
  id: "/journal",
  path: "/journal",
  getParentRoute: () => Route$e
});
const ContactRoute = Route$5.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$e
});
const CollectionsRoute = Route$4.update({
  id: "/collections",
  path: "/collections",
  getParentRoute: () => Route$e
});
const CheckoutRoute = Route$3.update({
  id: "/checkout",
  path: "/checkout",
  getParentRoute: () => Route$e
});
const CareRoute = Route$2.update({
  id: "/care",
  path: "/care",
  getParentRoute: () => Route$e
});
const AdminRoute = Route$1.update({
  id: "/admin",
  path: "/admin",
  getParentRoute: () => Route$e
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$e
});
const rootRouteChildren = {
  IndexRoute,
  AdminRoute,
  CareRoute,
  CheckoutRoute,
  CollectionsRoute,
  ContactRoute,
  JournalRoute,
  LoginRoute,
  ReviewsRoute,
  SizingRoute,
  StudioRoute,
  SuccessRoute,
  VaultRoute,
  VendorRoute
};
const routeTree = Route$e._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  useCart as a,
  router as r,
  supabase as s,
  useSession as u
};
