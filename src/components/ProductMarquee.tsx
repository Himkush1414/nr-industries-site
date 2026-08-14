import { products } from "@/data/products";

/** Thin scrolling product ticker — moves right → left, mirrors CertificationMarquee styling. */
export function ProductMarquee() {
  const track = [...products, ...products];

  return (
    <div
      className="mt-[10px] overflow-hidden border-y border-navy-700/40 bg-navy-950 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Our products"
    >
      <div
        className="flex h-[20px] w-max items-center animate-marquee gap-4 hover:[animation-play-state:paused] sm:h-[22px] sm:gap-6 md:h-[25px] md:gap-8"
      >
        {track.map((product, i) => (
          <span
            key={`${product.slug}-${i}`}
            className="flex shrink-0 items-center gap-4 text-[8px] font-semibold tracking-[0.12em] text-navy-100/85 uppercase leading-none sm:gap-6 sm:text-[10px] sm:tracking-[0.16em] md:gap-8 md:text-[11px] md:tracking-[0.18em]"
          >
            <span>{product.name}</span>
            <span className="text-navy-400/50" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
