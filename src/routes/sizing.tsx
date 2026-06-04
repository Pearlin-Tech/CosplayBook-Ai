import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/sizing")({
  head: () => ({ meta: [{ title: "Sizing Guide — Hypervault" }] }),
  component: Sizing,
});

const rows = [
  ["XS", "34–36", "26–28", "67"],
  ["S", "36–38", "28–30", "69"],
  ["M", "38–40", "30–32", "71"],
  ["L", "40–42", "32–34", "73"],
  ["XL", "42–44", "34–36", "75"],
  ["XXL", "44–46", "36–38", "77"],
];

function Sizing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16 max-w-4xl">
        <span className="micro-label">Nº 11 — Fit</span>
        <h1 className="mt-4 font-serif text-6xl md:text-7xl">Sizing guide.</h1>
        <p className="mt-6 text-foreground/65">All measurements in centimetres. Garments cut for a relaxed contemporary fit.</p>

        <div className="mt-12 border border-border">
          <table className="w-full">
            <thead>
              <tr className="bg-surface text-left">
                {["Size", "Chest", "Waist", "Length"].map((h) => (
                  <th key={h} className="p-4 micro-label">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r[0]} className="border-t border-border hover:bg-surface">
                  {r.map((c, i) => (
                    <td key={i} className={`p-4 ${i === 0 ? "font-serif text-xl" : "font-mono text-sm"}`}>{c}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-6">
          <div className="p-8 bg-surface">
            <span className="micro-label">Need help?</span>
            <h3 className="mt-2 font-serif text-2xl">Talk to the atelier</h3>
            <Link to="/contact" className="btn-outline mt-6">Open chat</Link>
          </div>
          <div className="p-8 bg-surface">
            <span className="micro-label">Care</span>
            <h3 className="mt-2 font-serif text-2xl">Wash & last</h3>
            <Link to="/care" className="btn-outline mt-6">Care guide</Link>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
