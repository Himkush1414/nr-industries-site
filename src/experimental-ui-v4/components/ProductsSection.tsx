import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { GsapReveal } from "@/experimental-ui-v4/components/GsapReveal";
import { products } from "@/data/products";

/** Features breakdown — full real product catalog, light cards/blue accents. */
export function ProductsSection() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: "var(--v4-bg-alt)" }}>
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v4-micro-label">Our Products</span>
          <h2 className="font-heading v4-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            A complete range of power equipment
          </h2>
          <p className="v4-fg-dim text-base leading-relaxed">
            From power plants to precision electronics, engineered products for every stage of
            the distribution network.
          </p>
        </GsapReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product, i) => (
            <GsapReveal key={product.slug} delay={i * 0.04}>
              <Link
                to={`/products/${product.slug}`}
                className="v4-card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                {product.mainImageSrc && (
                  <div className="flex aspect-square items-center justify-center border-b p-8" style={{ borderColor: "var(--v4-border)" }}>
                    <img
                      src={product.mainImageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-2 p-6">
                  <h3 className="font-heading v4-fg text-base font-bold">{product.name}</h3>
                  <p className="v4-fg-dim text-sm leading-relaxed">{product.cardDescription}</p>
                  <span className="v4-accent-text mt-auto flex items-center gap-1 text-xs font-semibold tracking-wide uppercase">
                    View Details
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
