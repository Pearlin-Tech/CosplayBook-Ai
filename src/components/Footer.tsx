import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border mt-32">
      <div className="container-edge py-20">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-serif text-4xl">Hyper<span className="italic text-[color:var(--gold)]">vault</span></div>
            <p className="mt-6 text-foreground/65 max-w-sm leading-relaxed">
              Luxury custom apparel. Every piece designed by you, crafted by us, vaulted for life.
            </p>
            <div className="mt-10">
              <div className="micro-label">Newsletter</div>
              <form onSubmit={(e) => e.preventDefault()} className="mt-3 flex items-center gap-3 border-b border-foreground/30 pb-2 max-w-sm">
                <input className="bg-transparent flex-1 outline-none text-sm py-1" placeholder="you@studio.com" />
                <button className="text-[11px] uppercase tracking-[0.2em] hover:text-[color:var(--gold)]">Subscribe →</button>
              </form>
            </div>
          </div>
          <FooterCol title="Navigate" links={[["Studio","/studio"],["Collections","/collections"],["Journal","/journal"],["My Vault","/vault"]]} />
          <FooterCol title="Support" links={[["Sizing Guide","/sizing"],["Care Instructions","/care"],["Contact","/contact"],["Reviews","/reviews"]]} />
          <FooterCol title="House" links={[["Manifesto","/manifesto"],["Process","/process"],["Press","/press"],["Privacy","/privacy"]]} />
        </div>
        <div className="hairline mt-16" />
        <div className="flex flex-wrap items-center justify-between gap-4 pt-8 text-[11px] font-mono uppercase tracking-[0.2em] text-foreground/55">
          <span>© 2026 Hypervault Atelier</span>
          <span>Made in small batches · Mumbai · NYC</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div className="md:col-span-2">
      <div className="micro-label">{title}</div>
      <ul className="mt-5 space-y-3">
        {links.map(([l, h]) => (
          <li key={h}>
            <Link to={h} className="text-sm text-foreground/75 hover:text-foreground transition-colors">{l}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
