import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { User, LogOut, ShoppingBag, Bookmark, Settings, BadgeCheck } from "lucide-react";
import { useSession } from "@/lib/session";
import { MagneticButton } from "@/components/motion/MagneticButton";

export function ProfileDropCard() {
  const { user, loggedIn, signIn, signOut } = useSession();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: globalThis.MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((o) => !o)}
        className="relative inline-flex items-center gap-2 p-2.5 border border-border rounded-full hover:border-foreground transition-colors"
        aria-label="Profile"
      >
        <User size={16} strokeWidth={1.5} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="absolute right-0 mt-3 w-[320px] bg-background border border-border shadow-[0_30px_80px_-30px_rgba(17,17,17,0.25)] z-50 origin-top-right"
          >
            {loggedIn && user ? (
              <>
                <div className="p-6 border-b border-border">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-foreground text-background grid place-items-center font-serif text-lg">
                      {user.initials}
                    </div>
                    <div className="min-w-0">
                      <div className="font-serif text-lg truncate">{user.name}</div>
                      <div className="flex items-center gap-1 text-xs text-foreground/60 truncate">
                        {user.email}
                        {user.emailVerified && (
                          <BadgeCheck size={12} className="text-[color:var(--gold)] shrink-0" />
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center justify-between micro-label">
                    <span>Vault {user.vault}</span>
                    <span className="text-[color:var(--gold)]">{user.tier}</span>
                  </div>
                </div>
                <nav className="py-2">
                  <DropLink to="/vault" icon={<User size={14} />} label="My Vault" onClick={() => setOpen(false)} />
                  <DropLink to="/vault" icon={<Bookmark size={14} />} label="Saved Designs" onClick={() => setOpen(false)} />
                  <DropLink to="/checkout" icon={<ShoppingBag size={14} />} label="Cart & Orders" onClick={() => setOpen(false)} />
                  <DropLink to="/vault" icon={<Settings size={14} />} label="Account Settings" onClick={() => setOpen(false)} />
                </nav>
                <div className="p-4 border-t border-border">
                  <MagneticButton className="w-full">
                    <button
                      onClick={() => {
                        signOut();
                        setOpen(false);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-foreground text-background text-[11px] uppercase tracking-[0.2em] hover:bg-[color:var(--destructive)] transition-colors"
                    >
                      <LogOut size={13} /> Sign Out of Vault
                    </button>
                  </MagneticButton>
                </div>
              </>
            ) : (
              <div className="p-6">
                <div className="font-serif text-xl">Welcome to Hypervault</div>
                <p className="mt-2 text-xs text-foreground/60">Enter your vault to view orders & saved designs.</p>
                <MagneticButton className="w-full mt-5">
                  <button
                    onClick={() => {
                      signIn();
                      setOpen(false);
                    }}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 bg-foreground text-background text-[11px] uppercase tracking-[0.2em]"
                  >
                    Enter Vault
                  </button>
                </MagneticButton>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function DropLink({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center gap-3 px-6 py-2.5 text-sm hover:bg-surface transition-colors"
    >
      <span className="text-foreground/50">{icon}</span>
      {label}
    </Link>
  );
}
