import { PageHero } from "@/components/PageHero";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function ProductsPage() {
  useDocumentMeta(
    "Products",
    "Explore N R Industries' full range: Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations, and HT & LT Panels.",
  );
  return (
    <>
      <PageHero
        eyebrow="Our Products"
        title="A complete range of power equipment"
        description="Engineered for power plants, industrial facilities, commercial buildings, and utility-scale distribution networks — every product built to international standards."
        backgroundImage="/products/all-products-bg.webp"
      />
      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delayMs={i * 30} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}