import { ArrowLeft, ArrowRight } from "lucide-react";
import { type CSSProperties, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { products } from "@/data/products";
import type { Product } from "@/types/content";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { RevealBlock } from "./RevealBlock";
import { RevealText } from "./RevealText";

/**
 * Sequential product showcase — one product on stage at a time, looping through
 * the full range. Each cycle: the cut-out product image slides in from the right
 * and stops centre-left; its name + one-line description + "View Product" link
 * fade in beside it; after a hold the text fades out and the image continues
 * left and off, while the next one enters. Sits between <ProductPanel> and
 * <TrustBlock>; uses the light `exp-sec-white` context so its eyebrow / display
 * / body / accent styling resolves dark-on-white and reads as its own section.
 *
 * The /products/*-main.webp files are real transparent cut-outs (WebP with an
 * alpha channel), so the products genuinely float on the stage.
 *
 * prefers-reduced-motion: no auto-rotation and no sliding — one product shown
 * statically (name / image / button) with prev/next buttons to step through.
 */

const SHOWCASE = products.filter(
  (p): p is Product & { mainImageSrc: string } => Boolean(p.mainImageSrc),
);
const COUNT = SHOWCASE.length;

const ENTER_MS = 1100; // image slides in from the right
const HOLD_MS = 4200; // text + button held on screen
const TEXT_OUT_MS = 420; // text/button fade out before the image leaves
const EXIT_MS = 950; // image continues left and off
const TEXT_MS = 520; // text fade / rise duration

type Phase = "in" | "hold" | "textout" | "exit";
const NEXT: Record<Phase, [Phase, number]> = {
  in: ["hold", ENTER_MS],
  hold: ["textout", HOLD_MS],
  textout: ["exit", TEXT_OUT_MS],
  exit: ["in", EXIT_MS],
};

export function ProductShowcase() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");
  const [armed, setArmed] = useState(false); // false = image parked off-stage right
  const [inView, setInView] = useState(false);
  const [docHidden, setDocHidden] = useState(false);
  const [paused, setPaused] = useState(false); // pointer hover / keyboard focus
  const stageRef = useRef<HTMLDivElement>(null);

  const active = !reduced && inView && !docHidden && !paused;

  // Only run the choreography while the stage is actually on screen.
  useEffect(() => {
    const el = stageRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(([e]) => setInView(Boolean(e?.isIntersecting)), {
      threshold: 0.25,
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const onVis = () => setDocHidden(document.hidden);
    document.addEventListener("visibilitychange", onVis);
    return () => document.removeEventListener("visibilitychange", onVis);
  }, []);

  // Release the parked image one painted frame after it enters the "in" phase,
  // so the slide-in from the right actually animates.
  useEffect(() => {
    if (reduced || phase !== "in" || armed || !inView) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setArmed(true)));
    return () => cancelAnimationFrame(r);
  }, [reduced, phase, armed, inView]);

  // Phase sequencer.
  useEffect(() => {
    if (!active) return;
    const [to, ms] = NEXT[phase];
    const t = window.setTimeout(() => {
      if (phase === "exit") {
        setIndex((i) => (i + 1) % COUNT);
        setArmed(false); // park the incoming image off-stage right
      }
      setPhase(to);
    }, ms);
    return () => window.clearTimeout(t);
  }, [active, phase]);

  const go = (delta: number) => setIndex((i) => (i + delta + COUNT) % COUNT);

  const current = SHOWCASE[index];
  if (!current) return null;
  const nextSrc = SHOWCASE[(index + 1) % COUNT]?.mainImageSrc;

  const atRest = reduced || armed;
  const leaving = !reduced && phase === "exit";
  const slideStyle: CSSProperties = reduced
    ? { transform: "none" }
    : {
        transform: leaving
          ? "translateX(-100%)"
          : atRest
            ? "translateX(0)"
            : "translateX(100%)",
        transition:
          phase === "in" && !armed
            ? "none"
            : `transform ${leaving ? EXIT_MS : ENTER_MS}ms cubic-bezier(0.33, 1, 0.68, 1)`,
      };

  const textShown = reduced || phase === "hold";
  const textStyle: CSSProperties = {
    opacity: textShown ? 1 : 0,
    transform: textShown ? "translateY(0)" : "translateY(14px)",
    transition: `opacity ${TEXT_MS}ms ease, transform ${TEXT_MS}ms cubic-bezier(0.16, 1, 0.3, 1)`,
    transitionDelay: textShown && !reduced ? "140ms" : "0ms",
  };

  return (
    <section className="exp-sec-white py-24 sm:py-28">
      <div className="container-page flex flex-col items-center gap-12">
        <RevealBlock className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="exp-eyebrow">Our Products</span>
          <h2 className="exp-display exp-display-lg">
            <RevealText text="A closer look at the range" />
          </h2>
        </RevealBlock>

        <RevealBlock distance={30} className="w-full max-w-5xl">
          <div
            ref={stageRef}
            className="exp-showcase-stage exp-showcase-glow"
            aria-label="Product showcase"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget as Node)) setPaused(false);
            }}
          >
            {/* sliding cut-out image — the wrapper spans the whole stage so a
                100% translate always clears it, on any screen width. Phones:
                image sits in the top half, detail text below it. */}
            <div
              className="pointer-events-none absolute inset-0 flex items-start justify-center pt-6 lg:items-center lg:justify-start lg:pt-0"
              style={slideStyle}
            >
              <img
                src={current.mainImageSrc}
                alt={current.name}
                decoding="async"
                className="max-h-[200px] w-auto max-w-[76%] object-contain drop-shadow-2xl sm:max-h-[240px] lg:ml-[9%] lg:max-h-[78%] lg:max-w-[34%]"
              />
            </div>

            {/* product detail. Phones: pinned to the bottom, below the image.
                Desktop: fills the full stage height (lg:inset-y-0) and centres
                its content vertically (lg:justify-center) so it balances the
                full-height image on the left instead of clustering at the top. */}
            <div className="absolute inset-x-0 bottom-7 px-6 lg:inset-x-auto lg:inset-y-0 lg:right-[7%] lg:flex lg:max-w-[40%] lg:flex-col lg:justify-center lg:px-0">
              <div
                className="flex flex-col items-center gap-3 text-center lg:items-start lg:text-left"
                style={{ ...textStyle, pointerEvents: textShown ? "auto" : "none" }}
                aria-live={reduced ? "polite" : "off"}
              >
                <p className="exp-display exp-display-sm exp-accent-text">{current.name}</p>
                <p className="exp-body max-w-sm">{current.cardDescription}</p>
                <Link
                  to={`/products/${current.slug}`}
                  className="exp-btn exp-btn-solid mt-1"
                  tabIndex={textShown ? 0 : -1}
                >
                  View Product
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>

            <span className="exp-mono exp-dim absolute top-4 right-4 text-[11px] tracking-widest tabular-nums">
              {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
            </span>

            {/* reduced-motion fallback: manual stepping */}
            {reduced && (
              <div className="absolute right-4 bottom-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous product"
                  className="exp-hair exp-dim flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next product"
                  className="exp-hair exp-dim flex h-9 w-9 items-center justify-center rounded-full border transition-colors hover:bg-black/5"
                >
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </button>
              </div>
            )}

            {/* keep the upcoming image warm so the hand-off never flashes empty */}
            {!reduced && nextSrc && (
              <img
                src={nextSrc}
                alt=""
                aria-hidden="true"
                className="absolute h-px w-px opacity-0"
              />
            )}
          </div>
        </RevealBlock>
      </div>
    </section>
  );
}
