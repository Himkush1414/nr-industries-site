import { AmbientFlowBackground } from "@/components/AmbientFlowBackground";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { products } from "@/data/products";
import { ProductCard } from "@/experimental-ui-v5/components/ProductCard";

/**
 * Source: the real production site's Products section — same markup, same
 * component (ProductCard, copied verbatim from src/components/ProductCard.tsx),
 * same data (the full 9-product catalog from data/products.ts), taken as-is
 * per spec, straight from src/pages/HomePage.tsx.
 *
 * Fix (round 3, item 3): the outer section's bg-navy-50 is a static Tailwind
 * color from the real (toggle-less) production site — left as-is it stayed a
 * light band inside an otherwise dark page in dark mode. Swapped for the
 * page's own reactive chrome background; the inner navy-900 band is kept
 * exactly as-is (it's already a deliberately dark inset with white text, so
 * it already reads correctly in both themes, like the product cards below
 * it — those stay their own fixed white regardless of theme, matching every
 * other self-contained "card" in this build: certificate badges, the two
 * facility photos, and the client-logo cards).
 */
export function ProductsSection() {
  return (
    <section className="py-16 sm:py-20" style={{ backgroundColor: "var(--v5-chrome-bg)" }}>
      <div className="relative mb-10 overflow-hidden bg-navy-900 py-16 sm:mb-14 sm:py-20">
        <AmbientFlowBackground />
        <div className="container-page relative z-10">
          <Reveal>
            <SectionHeading
              eyebrow="Our Products"
              title="A complete range of power equipment"
              subtitle="From power plants to precision electronics, engineered products for every stage of the distribution network."
              align="center"
              light
            />
          </Reveal>
        </div>
      </div>
      <div className="container-page">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delayMs={i * 40} className="h-full">
              <ProductCard product={product} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
