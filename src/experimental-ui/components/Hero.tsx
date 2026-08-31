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

// Exact backdrop colour the "Neon Ring" gradient layers below are tuned
// against — their screen/multiply blend modes read correctly only on this
// specific dark base, so it's set as the section's own background (not the
// generic --exp-graphite the rest of the dark sections use).
const HERO_BG_COLOR = "#100e0b";

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
  const [showFx, setShowFx] = useState(false);

  // Same reasoning/pattern as the section's former image backdrop: the
  // effect layers below are `position: fixed` so they read as one
  // viewport-pinned background rather than stretching across the section's
  // actual (scroll-driven, ~2.7 viewport-heights tall) rendered height. Mount
  // them only while the section itself overlaps the viewport, and with no
  // rootMargin buffer, so they don't keep painting behind later sections.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShowFx(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setShowFx(Boolean(e?.isIntersecting)));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="exp-hero exp-sec-dark relative isolate"
      style={{ backgroundColor: HERO_BG_COLOR }}
    >
      {showFx && (
        // Neon Ring - Aura (prism) — pure CSS gradient layers, no image.
        <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 blur-[70px] md:blur-[101px]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 34%, rgba(34,211,238,0.22) 38%, rgba(59,130,246,0.22) 42%, rgba(139,92,246,0.20) 46%, rgba(236,72,153,0.18) 50%, rgba(245,158,11,0.14) 54%, transparent 61%)",
              mixBlendMode: "screen",
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 blur-[30px] md:blur-[43px]"
            style={{
              background:
                "radial-gradient(circle at 50% 50%, transparent 42%, rgba(255,255,255,0.16) 46%, transparent 51%)",
              mixBlendMode: "screen",
              opacity: 0.85,
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 blur-[20px] md:blur-[29px]"
            style={{
              background: "radial-gradient(circle at 50% 50%, #030306 0%, #030306 34%, transparent 35%)",
              mixBlendMode: "multiply",
            }}
          />
        </div>
      )}

      <ScrollExpand
        src={HERO_IMAGE_SRC}
        mediaType="image"
        alt="Rows of finished transformers on the N R Industries factory floor, ready for dispatch"
        title="N R INDUSTRIES"
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
