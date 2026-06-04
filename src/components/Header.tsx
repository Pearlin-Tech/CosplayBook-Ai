import { Link } from "@tanstack/react-router";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";

const nav = [
  { to: "/studio", label: "Studio" },
  { to: "/collections", label: "Collections" },
  { to: "/vault", label: "My Vault" },
  { to: "/journal", label: "Journal" },
  { to: "/contact", label: "Contact" },
];

export function Header() {
  const { count } = useCart();
  return (
    <header className="sticky top-0 z-40 bg-background/85 backdrop-blur-md border-b border-border">
      <div className="container-edge flex items-center justify-between h-20">
        <Link to="/" className="font-serif text-2xl tracking-tight">
          Hyper<span className="italic text-[color:var(--gold)]">vault</span>
        </Link>
        <nav className="hidden md:flex items-center gap-10">
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
        <Link to="/checkout" className="relative inline-flex items-center gap-2 group">
          <span className="text-[11px] font-mono uppercase tracking-[0.18em] hidden md:inline">Cabinet</span>
          <div className="relative p-2.5 border border-border rounded-full group-hover:border-foreground transition-colors">
            <ShoppingBag size={16} strokeWidth={1.5} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-[color:var(--pop)] text-[10px] font-mono font-semibold flex items-center justify-center animate-pulse-pop">
                {count}
              </span>
            )}
          </div>
        </Link>
      </div>
    </header>
  );
}
