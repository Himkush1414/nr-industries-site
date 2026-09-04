import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { products } from "@/data/products";

/**
 * Full 9-product catalog, reusing the exact same data the live Products page
 * renders from.
 *
 * Alignment pass (round 3): three real, compounding issues here, all fixed
 * together —
 *  1. `sm:grid-cols-2` orphaned the 9th card alone on a 2-col tablet row;
 *     dropped straight from 1 col to 3 (9 divides evenly by 3, never by 2).
 *  2. `aspect-[4/3] object-contain` let the real product photos' wildly
 *     different native proportions (upright transformer vs. wide substation)
 *     read as inconsistent sizing card-to-card; `aspect-square` is far more
 *     neutral across mixed real photography.
 *  3. `rangeValue` ranges from 17 to 76 characters across the 9 products, so
 *     the single-line uppercase badge wrapped to 1–3 lines depending on the
 *     card, breaking the bottom rhythm across a row. Split into a label +
 *     value with a hairline divider, and clamp the value to 2 lines.
 */
export function ProductRangeSection() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page flex flex-col gap-14">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v2-accent-text text-xs font-semibold tracking-[0.22em] uppercase">
            Our Products
          </span>
          <h2 className="font-heading v2-fg text-3xl font-bold tracking-tight sm:text-4xl">
            A complete range of power equipment
          </h2>
          <p className="v2-fg-dim text-base leading-relaxed">
            From power plants to precision electronics, engineered products for every stage of
            the distribution network.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {products.map((product, i) => (
            <Reveal key={product.slug} delayMs={i * 40} className="h-full">
              <Link
                to={`/products/${product.slug}`}
                className="v2-card group flex h-full flex-col overflow-hidden transition-transform duration-300 hover:-translate-y-1"
              >
                {product.mainImageSrc && (
                  <div className="v2-border flex aspect-square items-center justify-center border-b p-8">
                    <img
                      src={product.mainImageSrc}
                      alt={product.name}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <div className="flex flex-col gap-1.5">
                    <h3 className="font-heading v2-fg text-base font-bold">{product.name}</h3>
                    <p className="v2-fg-dim text-sm leading-relaxed">{product.cardDescription}</p>
                  </div>
                  <div className="v2-border mt-auto flex flex-col gap-1 border-t pt-3">
                    <span className="v2-fg-faint text-[10px] font-semibold tracking-[0.1em] uppercase">
                      {product.rangeLabel}
                    </span>
                    <span className="v2-fg-dim line-clamp-2 text-xs font-medium">
                      {product.rangeValue}
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Link to="/products" className="v2-btn v2-btn-outline">
            View All Products
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
