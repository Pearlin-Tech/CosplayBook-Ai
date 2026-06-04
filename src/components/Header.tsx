import { Link } from "@tanstack/react-router";
import { ShoppingBag, Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { ProfileDropCard } from "@/components/ProfileDropCard";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { useSession } from "@/lib/session";

const nav = [
  { to: "/studio", label: "Studio" },
  { to: "/collections", label: "Collections" },
  { to: "/vault", label: "My Vault" },
  { to: "/journal", label: "Journal" },
  { to: "/reviews", label: "Reviews" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  const { loggedIn, signOut } = useSession();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-edge flex items-center justify-between h-20">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Hyper<span className="italic text-[color:var(--gold)]">vault</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-9">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-[12px] uppercase tracking-[0.18em] text-foreground/70 hover:text-foreground transition-colors relative group"
              activeProps={{ className: "text-foreground" }}
            >
              {n.label}
              <span className="absolute left-0 -bottom-1 h-px w-0 bg-[color:var(--pop)] group-hover:w-full transition-all duration-300" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <MagneticButton className="hidden sm:inline-block">
            <Link to="/checkout" className="relative inline-flex items-center gap-2 group">
              <div className="relative p-2.5 border border-border rounded-full group-hover:border-foreground transition-colors">
                <ShoppingBag size={16} strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[color:var(--pop)] text-[10px] font-mono font-semibold flex items-center justify-center animate-pulse-pop">
                    {count}
                  </span>
                )}
              </div>
            </Link>
          </MagneticButton>

          <div className="hidden sm:block">
            <ProfileDropCard />
          </div>

          <button
            className="lg:hidden p-2.5 border border-border rounded-full"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={16} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-background"
          >
            <div className="container-edge flex items-center justify-between h-20 border-b border-border">
              <span className="font-serif text-2xl">
                Hyper<span className="italic text-[color:var(--gold)]">vault</span>
              </span>
              <button onClick={() => setMobileOpen(false)} aria-label="Close menu" className="p-2.5 border border-border rounded-full">
                <X size={16} />
              </button>
            </div>
            <motion.nav
              initial="hidden"
              animate="show"
              variants={{ show: { transition: { staggerChildren: 0.04 } } }}
              className="container-edge py-10 flex flex-col gap-1"
            >
              {nav.map((n) => (
                <motion.div
                  key={n.to}
                  variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
                >
                  <Link
                    to={n.to}
                    onClick={() => setMobileOpen(false)}
                    className="block py-4 font-serif text-4xl border-b border-border hover:text-[color:var(--gold)]"
                  >
                    {n.label}
                  </Link>
                </motion.div>
              ))}
              <div className="mt-8 flex items-center gap-3">
                <Link
                  to="/checkout"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 inline-flex items-center justify-center gap-2 py-4 border border-border text-xs uppercase tracking-[0.2em]"
                >
                  <ShoppingBag size={14} /> Cart {count > 0 && `(${count})`}
                </Link>
                {loggedIn ? (
                  <button
                    onClick={() => {
                      signOut();
                      setMobileOpen(false);
                    }}
                    className="flex-1 inline-flex items-center justify-center py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em]"
                  >
                    Sign Out
                  </button>
                ) : (
                  <Link to="/vault" onClick={() => setMobileOpen(false)} className="flex-1 inline-flex items-center justify-center py-4 bg-foreground text-background text-xs uppercase tracking-[0.2em]">
                    My Vault
                  </Link>
                )}
              </div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
