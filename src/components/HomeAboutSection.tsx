import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";

const ABOUT_STEPS = [
  {
    image: "/about-1.webp",
    imageAlt: "N R Industries manufacturing facility",
  },
  {
    image: "/about-2.webp",
    imageAlt: "N R Industries power equipment production",
  },
  {
    image: "/about-3.webp",
    imageAlt: "N R Industries transformer solutions",
  },
] as const;

/**
 * Home page About Us — scroll-progress-linked image + text reveals.
 *
 * Key design: progress[i] (0 → 1) is computed live from scroll position and
 * applied *directly to the DOM*, bypassing React re-renders entirely.  Both the
 * image crossfade and the text panel opacity/scale read the *identical number*
 * for each step, so they are guaranteed to stay in pixel-perfect sync — there
 * is no separate CSS transition timer that can drift relative to the other.
 *
 * Scrolling back up past an activated step returns it to its inactive state so
 * the reveal replays in either scroll direction.
 */
export function HomeAboutSection() {
  // DOM refs for the three animated layers of each step.
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);
  const textWrapperRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Cached at mount; never changes during a session.
  const prefersReduced = useRef(false);

  // ─── Scroll-progress computation ──────────────────────────────────────────
  //
  // For each step i we compute:
  //   progress[i] = clamp(1 − |stepCenter − activeLine| / halfWindow, 0, 1)
  //
  // halfWindow (40 % of vh) is chosen so that on desktop (steps ≈ 42 vh tall)
  // adjacent step centers are ~42 vh apart — just beyond the half-window —
  // meaning a step reaches 0 progress before its neighbour reaches 1.  On
  // mobile (steps ≈ 32 vh) there is a small overlap which produces a gentle
  // image crossfade rather than a hard cut.
  //
  // Progress is written directly to element.style, so no React state update
  // (and no re-render) is needed per scroll frame.
  // ──────────────────────────────────────────────────────────────────────────

  const compute = () => {
    const reduced = prefersReduced.current;
    const isMobile = window.matchMedia("(max-width: 1023px)").matches;
    // On mobile the sticky image takes up the top ~42 % of the viewport, so the
    // "sweet spot" where a text block feels most prominent sits lower.
    const activeLine = window.innerHeight * (isMobile ? 0.67 : 0.5);
    const halfWindow = window.innerHeight * 0.40;

    stepRefs.current.forEach((node, i) => {
      if (!node) return;
      const { top, height } = node.getBoundingClientRect();
      const center = top + height / 2;
      const dist = Math.abs(center - activeLine);

      // With reduced-motion, snap: nearest step = 1, others = 0.
      const p = reduced
        ? dist < halfWindow ? 1 : 0
        : Math.max(0, 1 - dist / halfWindow);

      // ── Apply to image ──
      const img = imgRefs.current[i];
      if (img) img.style.opacity = String(p);

      // ── Apply to text wrapper (opacity + scale) ──
      const wrapper = textWrapperRefs.current[i];
      if (wrapper) {
        wrapper.style.opacity = String(p);
        if (!reduced) {
          // Scale: 0.90 at p=0, 1.00 at p=1. transformOrigin keeps the
          // block anchored to its left edge so it doesn't jump laterally.
          wrapper.style.transform = `scale(${0.9 + 0.1 * p})`;
        }
      }

      // ── Apply to glass-panel backdrop ──
      // Use a steeper curve: panel only becomes visible once p > 0.5,
      // which ensures exactly one panel is visible at a time (no overlap
      // between adjacent steps) and it disappears promptly on scroll-away.
      const panel = panelRefs.current[i];
      if (panel) panel.style.opacity = String(Math.max(0, 2 * p - 1));
    });
  };

  // Run once synchronously before first paint (refs are already wired up after
  // React's commit phase) so that elements start at the correct opacity rather
  // than flashing from opacity-0 to their computed value.
  useLayoutEffect(() => {
    prefersReduced.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    compute();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Set up the scroll / resize listeners.
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        compute();
      });
    };

    // Re-run once on mount (after paint) to catch any layout shift that happened
    // between useLayoutEffect and useEffect.
    compute();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ─── Render ────────────────────────────────────────────────────────────────
  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">

        {/* ── Left: sticky image panel ──────────────────────────────────────── */}
        {/* On desktop (lg+) an elevated card shadow adds visual depth against the
            open background.  On mobile/tablet the image is full-bleed inside the
            sticky bar so no shadow is added there. */}
        <div className="sticky top-[4.75rem] z-30 -mx-5 bg-surface px-5 pb-4 sm:-mx-8 sm:px-8 lg:top-24 lg:z-10 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0">
          <div
            className={[
              // No bg-white: keep the container transparent so there is no
              // warm surface that could bleed through semi-transparent images.
              "relative aspect-video overflow-hidden rounded",
              // Mobile / tablet: subtle border + small shadow (full-bleed sticky bar).
              "border border-ink-100 shadow-sm",
              // Desktop: no border, deeper multi-layer shadow for card lift effect.
              "lg:border-0 lg:rounded-xl",
              "lg:shadow-[0_2px_4px_-1px_rgba(11,31,58,0.08),0_12px_32px_-8px_rgba(11,31,58,0.22),0_32px_56px_-16px_rgba(11,31,58,0.16)]",
            ].join(" ")}
          >
            {ABOUT_STEPS.map((step, index) => (
              <img
                key={step.image}
                ref={(node) => {
                  imgRefs.current[index] = node;
                }}
                src={step.image}
                alt={step.imageAlt}
                className="absolute inset-0 h-full w-full object-cover object-center"
                // Start invisible; compute() sets the initial correct value
                // synchronously in useLayoutEffect before first paint.
                style={{ opacity: 0 }}
                decoding="async"
              />
            ))}
          </div>
        </div>

        {/* ── Right: scrolling text steps ───────────────────────────────────── */}
        <div className="relative z-0 flex flex-col lg:z-auto">

          {/* Step 0 — eyebrow + headline */}
          <div
            ref={(node) => {
              stepRefs.current[0] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <div
              ref={(node) => {
                textWrapperRefs.current[0] = node;
              }}
              className="relative"
              style={{
                opacity: 0,
                transform: "scale(0.9)",
                transformOrigin: "left center",
                willChange: "opacity, transform",
              }}
            >
              {/* Glass-panel backdrop — no backdrop-blur: that filter composites
                  against sibling stacking contexts in Chromium and was causing
                  the orange tint + blur artefact visible on the image column. */}
              <span
                ref={(node) => {
                  panelRefs.current[0] = node;
                }}
                aria-hidden="true"
                className="absolute -inset-x-4 -inset-y-3 rounded-2xl border border-gold-100 bg-gradient-to-br from-gold-100/60 via-navy-50/40 to-navy-100/40 shadow-[0_16px_40px_-24px_rgba(11,31,58,0.18)] sm:-inset-x-6 sm:-inset-y-4"
                style={{ opacity: 0 }}
              />
              <div className="relative px-5 py-6 sm:px-7 sm:py-7">
                <SectionHeading
                  eyebrow="About Us"
                  title="Powering industries with reliable transformer solutions"
                  as="h2"
                />
              </div>
            </div>
          </div>

          {/* Step 1 — company intro paragraph */}
          <div
            ref={(node) => {
              stepRefs.current[1] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <div
              ref={(node) => {
                textWrapperRefs.current[1] = node;
              }}
              className="relative"
              style={{
                opacity: 0,
                transform: "scale(0.9)",
                transformOrigin: "left center",
                willChange: "opacity, transform",
              }}
            >
              <span
                ref={(node) => {
                  panelRefs.current[1] = node;
                }}
                aria-hidden="true"
                className="absolute -inset-x-4 -inset-y-3 rounded-2xl border border-gold-100 bg-gradient-to-br from-gold-100/60 via-navy-50/40 to-navy-100/40 shadow-[0_16px_40px_-24px_rgba(11,31,58,0.18)] sm:-inset-x-6 sm:-inset-y-4"
                style={{ opacity: 0 }}
              />
              <p className="relative px-5 py-6 text-base leading-relaxed font-medium text-ink-700 sm:px-7 sm:py-7">
                <strong className="font-semibold text-navy-950">N R Industries</strong> manufactures
                reliable, high-performance transformers and voltage solutions for industrial and
                commercial applications.
              </p>
            </div>
          </div>

          {/* Step 2 — product range + CTA */}
          <div
            ref={(node) => {
              stepRefs.current[2] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <div
              ref={(node) => {
                textWrapperRefs.current[2] = node;
              }}
              className="relative"
              style={{
                opacity: 0,
                transform: "scale(0.9)",
                transformOrigin: "left center",
                willChange: "opacity, transform",
              }}
            >
              <span
                ref={(node) => {
                  panelRefs.current[2] = node;
                }}
                aria-hidden="true"
                className="absolute -inset-x-4 -inset-y-3 rounded-2xl border border-gold-100 bg-gradient-to-br from-gold-100/60 via-navy-50/40 to-navy-100/40 shadow-[0_16px_40px_-24px_rgba(11,31,58,0.18)] sm:-inset-x-6 sm:-inset-y-4"
                style={{ opacity: 0 }}
              />
              <div className="relative px-5 py-6 sm:px-7 sm:py-7">
                <p className="text-base leading-relaxed font-medium text-ink-700">
                  From{" "}
                  <strong className="font-semibold text-navy-950">
                    Distribution and Power Transformers
                  </strong>{" "}
                  to{" "}
                  <strong className="font-semibold text-navy-950">
                    Furnace, Dry Type, Solar, Pad Mounted Transformers, HT-AVR Transformers, and
                    Servo Voltage Stabilizers
                  </strong>
                  , we provide solutions built for dependable performance.
                </p>

                <p className="mt-6 font-heading text-lg font-semibold text-navy-950">
                  Quality products. On-time delivery. Reliable support.
                </p>

                <Link
                  to="/about"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600"
                >
                  Learn More About Us
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
