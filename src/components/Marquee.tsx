export function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden py-8 border-y border-border bg-surface">
      <div className="flex gap-16 animate-marquee whitespace-nowrap">
        {doubled.map((t, i) => (
          <span key={i} className="font-serif italic text-3xl md:text-5xl text-foreground/70 flex items-center gap-16">
            {t}
            <span className="text-[color:var(--gold)]">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
