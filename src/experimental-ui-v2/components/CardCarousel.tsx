import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

/**
 * Three of the four photos from the About page's "What sets our products
 * apart" section (skipping the eco-friendly-manufacturing shot, which reads
 * more as a process/values photo than a product one — the other three are a
 * tighter fit for a product-focused carousel). Fresh, NR-specific captions —
 * not a translation of the reference's placeholder copy.
 */
const CARDS = [
  {
    image: "/why-choose-us/precision-engineering.jpeg",
    title: "Precision Engineering",
    caption: "Every unit built to withstand real operating conditions, not just spec sheets.",
  },
  {
    image: "/why-choose-us/international-standards.jpeg",
    title: "International Standards",
    caption: "Designed and manufactured to international safety and efficiency standards.",
  },
  {
    image: "/why-choose-us/after-sales-support.jpeg",
    title: "After-Sales Support",
    caption: "Our engineering team stays engaged well past commissioning.",
  },
];

export function CardCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const scrollToIndex = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (child) {
      track.scrollTo({ left: child.offsetLeft - track.offsetLeft, behavior: "smooth" });
    }
    setActive(index);
  };

  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="flex flex-col justify-center gap-5">
          <h2 className="font-heading v2-fg text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Built to a standard,
            <br />
            not just a spec.
          </h2>
          <p className="v2-fg-dim max-w-md text-base leading-relaxed">
            Every product that leaves our facility is engineered, tested, and supported the same
            way — no matter the size of the order.
          </p>
          <Link to="/about" className="v2-btn v2-btn-solid w-fit">
            Learn More About Us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delayMs={120} className="flex flex-col gap-6">
          <div
            ref={trackRef}
            className="v2-carousel-track flex gap-5 overflow-x-auto pb-2"
          >
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="v2-card-dark v2-carousel-item flex w-[78%] shrink-0 flex-col overflow-hidden sm:w-[62%] lg:w-[70%]"
              >
                <div className="aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="h-full w-full object-cover"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-col gap-2 p-6">
                  <h3 className="font-heading text-lg font-bold" style={{ color: "var(--v2-card-dark-fg)" }}>
                    {card.title}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--v2-fg-faint)" }}>
                    {card.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {CARDS.map((card, i) => (
                <button
                  key={card.title}
                  type="button"
                  aria-label={`Go to card ${i + 1}`}
                  data-active={active === i}
                  className="v2-dot"
                  onClick={() => scrollToIndex(i)}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous card"
                className="v2-arrow-btn"
                disabled={active === 0}
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next card"
                className="v2-arrow-btn"
                disabled={active === CARDS.length - 1}
                onClick={() => scrollToIndex(Math.min(CARDS.length - 1, active + 1))}
              >
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
