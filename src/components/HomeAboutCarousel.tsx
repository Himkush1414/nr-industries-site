import { ArrowLeft, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";

/**
 * New "About Us" section for the homepage, replacing <HomeAboutSection/>
 * (commented out in HomePage.tsx, not deleted) with a card carousel matching
 * src/experimental-ui-v2/components/CardCarousel.tsx (read-only reference,
 * not imported, not modified). Copy is V2's as-is — its heading, subtext,
 * CTA text, and all three card title/captions — the current section's copy
 * is shaped for a totally different step-by-step layout, so nothing about
 * it "obviously carries over" onto a card format; not spending time
 * rewriting either version's copy, per spec. Card photos are the same real
 * assets V2 itself uses (public/why-choose-us/*.jpeg — shared with the
 * About page, not V2-exclusive).
 *
 * Visuals are re-expressed with this site's own tokens rather than V2's
 * --v2-* custom properties (same approach as the earlier Footer/Stats
 * fixes) — navy-950 stands in for V2's near-black card background, gold-500
 * for its indigo accent (dots/hover), ink-100/ink-500 for its neutral
 * borders/dim text.
 *
 * Mobile arrow bug (diagnosed live at 375px against V2's actual /lab/v2,
 * not guessed from source): V2's outer grid only gets an explicit
 * grid-template-columns at lg: (`lg:grid-cols-[...]`); below that it falls
 * back to an unconstrained implicit column, and a grid item's default
 * min-width is `auto` — so the carousel's horizontally-scrollable card
 * track, instead of containing its own overflow, drags the whole grid
 * column (and the controls row below it, arrows included) out to its
 * content's intrinsic width. Measured on V2 at 375px: the track rendered
 * ~507px wide, and the arrow buttons sat at x=407-507 — off the right edge
 * of a 375px viewport, invisible/unreachable. Fixed here by giving the
 * carousel-side grid item an explicit `min-w-0` (the standard fix for this
 * exact grid/flexbox overflow-containment gap) so `overflow-x-auto` on the
 * track actually contains the cards instead of expanding its ancestor.
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

export function HomeAboutCarousel() {
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
    <section className="py-20 sm:py-24">
      <div className="container-page grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
        <Reveal className="flex flex-col justify-center gap-5">
          <h2 className="font-heading text-3xl leading-tight font-bold tracking-tight text-navy-950 sm:text-4xl">
            Built to a standard,
            <br />
            not just a spec.
          </h2>
          <p className="max-w-md text-base leading-relaxed text-ink-500">
            Every product that leaves our facility is engineered, tested, and supported the same
            way — no matter the size of the order.
          </p>
          <Link
            to="/about"
            className="inline-flex w-fit items-center gap-2 rounded-full bg-navy-950 px-6 py-3 text-sm font-semibold text-white transition-colors duration-150 hover:bg-navy-800"
          >
            Learn More About Us
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        {/* min-w-0 is the mobile fix — see file header comment. Without it this
            grid item inherits the track's full content width below `lg:`. */}
        <Reveal delayMs={120} className="flex min-w-0 flex-col gap-6">
          <div
            ref={trackRef}
            className="flex w-full snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {CARDS.map((card) => (
              <div
                key={card.title}
                className="flex w-[78%] shrink-0 snap-start flex-col overflow-hidden rounded-3xl border border-navy-900 bg-navy-950 sm:w-[62%] lg:w-[70%]"
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
                  <h3 className="font-heading text-lg font-bold text-white">{card.title}</h3>
                  <p className="text-sm leading-relaxed text-navy-100/70">{card.caption}</p>
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
                  onClick={() => scrollToIndex(i)}
                  className={`h-[0.4rem] rounded-full transition-[width,background-color] duration-200 ease-out ${
                    active === i ? "w-[1.4rem] bg-gold-500" : "w-[0.4rem] bg-ink-100"
                  }`}
                />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label="Previous card"
                disabled={active === 0}
                onClick={() => scrollToIndex(Math.max(0, active - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-navy-950 transition-colors duration-150 hover:border-gold-500 hover:text-gold-600 disabled:opacity-35"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next card"
                disabled={active === CARDS.length - 1}
                onClick={() => scrollToIndex(Math.min(CARDS.length - 1, active + 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-ink-100 text-navy-950 transition-colors duration-150 hover:border-gold-500 hover:text-gold-600 disabled:opacity-35"
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
