import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { StatStrip } from "@/components/StatStrip";
import { useIsMobile } from "../lib/useIsMobile";
import ScrollExpand from "../vendor/ScrollExpand";

// A real N R Industries factory-floor photo — rows of finished transformers
// ready for dispatch, shot wide/elevated so it reads well once the frame has
// expanded to fill the screen. Re-encoded in place from the original
// 1600x1200 upload (public/about-3.jpg in git history) — the webp checked
// into public/ had been downscaled to 1200x900 by an earlier "optimize
// images" pass, which read as soft once stretched full-bleed on desktop.
const HERO_IMAGE_SRC = "/about-3.webp";

// The original industry/factory photo used as this page's hero backdrop
// before the ScrollExpand rebuild — an electrical substation/transformer
// installation shot. Restored here as the backdrop behind the ScrollExpand
// frame (the frame's own photo above is unrelated and untouched).
const BACKDROP_IMAGE_SRC = "/hero-home.webp";

/**
 * Scroll-scrubbed expanding hero (React Bits' ScrollExpand, vendored at
 * ../vendor/ScrollExpand — see that file for why it's hand-vendored instead
 * of CLI-installed). Starts as a small rounded card with the company name
 * over the factory photo; scrolling smoothly grows it to fill the viewport
 * (tied to scroll position, fully reversible), fading the title out and the
 * heading/description/stats/CTAs in once expanded.
 *
 * `useWindowScroll` ties progress to page scroll rather than an inner
 * scroll container, so the effect plays out as part of the normal page
 * scroll. `holdDistance` is nudged up from the component's default (0.35 →
 * 0.5) to give the expanded content a bit more room to breathe before the
 * next section arrives — a modest increase to the hero's scroll length, not
 * the dramatic kind. `overlayScrim` is raised from the default (0.45 → 0.72)
 * because the factory photo is busier than the component's forest demo
 * image and the centred white text needs the extra contrast.
 *
 * The starting frame's proportions differ by breakpoint: desktop keeps the
 * vendor's own portrait-ish card, but on mobile the same startWidth/
 * startHeight produced a narrow "phone booth" (46% of an already-narrow
 * viewport width, 60% of its height) — cramped and awkward. Mobile instead
 * gets a wide/short landscape strip (startWidth 88, startHeight 34), which
 * reads as a preview strip rather than a squeezed box; tested both a
 * shortened-portrait variant and this one, and the landscape strip looked
 * far more intentional on real mobile widths.
 */
export function Hero() {
  const isMobile = useIsMobile();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showBackdrop, setShowBackdrop] = useState(false);

  // Mount the blurred backdrop only while the hero section itself genuinely
  // overlaps the viewport — it's `position: fixed`, so it visually pins to
  // the viewport regardless of DOM nesting. A previous version used a 200px
  // rootMargin buffer, which kept it mounted (and therefore paintable) for
  // up to 200px of extra scroll *after* the hero had fully scrolled past —
  // long enough to overlap the video section directly below and, on a
  // fixed-position element under active scroll compositing, occasionally
  // show through for a frame. No margin: it unmounts the instant the hero
  // section stops overlapping the viewport at all, closing that window.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShowBackdrop(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShowBackdrop(Boolean(e?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="exp-hero exp-sec-dark relative isolate">
      {showBackdrop && (
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <img
            src={BACKDROP_IMAGE_SRC}
            alt=""
            className="h-full w-full scale-110 object-cover opacity-80 blur-md"
          />
          <div className="absolute inset-0 bg-[var(--exp-graphite)]/40" />
        </div>
      )}

      <ScrollExpand
        src={HERO_IMAGE_SRC}
        mediaType="image"
        alt="Rows of finished transformers on the N R Industries factory floor, ready for dispatch"
        title="N R Industries"
        scrollHint="Scroll to explore"
        useWindowScroll
        startWidth={isMobile ? 88 : 46}
        startHeight={isMobile ? 34 : 60}
        holdDistance={0.5}
        overlayScrim={0.72}
        className="exp-hero-scroll"
      >
        <div className="flex w-full max-w-3xl flex-col items-center gap-5">
          <h1 className="exp-display exp-display-xl text-white [text-shadow:0_2px_20px_rgba(0,0,0,0.55)]">
            N R Industries
          </h1>
          <p className="mx-auto max-w-xl text-[15px] leading-relaxed text-white/90 [text-shadow:0_1px_12px_rgba(0,0,0,0.6)] sm:text-base">
            N R Industries manufactures distribution and power transformers, compact
            substations, servo voltage stabilizers, and HT &amp; LT panels — each engineered to
            its load and validated in our own test facility before it ships.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <Link
              to="/products"
              className="exp-btn exp-btn-solid !bg-yellow-400 !text-black hover:!bg-yellow-300"
            >
              Explore our range
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              to="/contact"
              className="exp-btn exp-btn-outline !border-black !bg-black !text-white hover:!bg-neutral-800"
            >
              Request a quote
            </Link>
          </div>
          <div className="w-full overflow-hidden rounded-lg bg-black/45 backdrop-blur-md">
            <StatStrip />
          </div>
        </div>
      </ScrollExpand>
    </section>
  );
}
