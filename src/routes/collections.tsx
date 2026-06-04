import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import teeBlack from "@/assets/product-tee-black.jpg";
import hoodieGrey from "@/assets/product-hoodie-grey.jpg";
import crewCream from "@/assets/product-crew-cream.jpg";
import pantsOlive from "@/assets/product-pants-olive.jpg";

export const Route = createFileRoute("/collections")({
  head: () => ({ meta: [{ title: "Collections — Hypervault" }] }),
  component: Collections,
});

const items = [
  { id: "tee-01", name: "Heritage Tee", price: 95, img: teeBlack, tag: "Edition 01" },
  { id: "hoodie-01", name: "Atelier Hoodie", price: 185, img: hoodieGrey, tag: "Edition 01" },
  { id: "crew-01", name: "Studio Crewneck", price: 145, img: crewCream, tag: "Vault Drop" },
  { id: "pants-01", name: "Workshop Cargo", price: 215, img: pantsOlive, tag: "Edition 01" },
  { id: "tee-02", name: "Atelier Long Sleeve", price: 125, img: teeBlack, tag: "Coming Soon" },
  { id: "hoodie-02", name: "Cropped Hood", price: 165, img: hoodieGrey, tag: "Edition 02" },
];

function Collections() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <section className="container-edge py-16">
        <span className="micro-label">Nº 02 — Catalogue</span>
        <h1 className="mt-4 font-serif text-6xl md:text-8xl leading-[0.95]">
          Every piece,
          <br /><span className="italic">a beginning.</span>
        </h1>
        <p className="mt-8 max-w-md text-foreground/65">Choose a silhouette. Take it to the Studio. Make it yours.</p>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-3 gap-6">
          {items.map((p) => (
            <Link key={p.id} to="/studio" className="group">
              <div className="relative aspect-[3/4] overflow-hidden bg-surface">
                <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" loading="lazy" />
                <div className="absolute top-3 left-3 micro-label bg-background/80 backdrop-blur px-2 py-1">{p.tag}</div>
              </div>
              <div className="mt-4 flex items-baseline justify-between">
                <h3 className="font-serif text-2xl">{p.name}</h3>
                <span className="font-mono">${p.price}</span>
              </div>
              <div className="micro-label mt-1">Customize →</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </div>
  );
}
