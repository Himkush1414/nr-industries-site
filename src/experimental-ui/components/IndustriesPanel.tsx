import { ArrowLeft, ArrowRight } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { industries } from "@/data/company";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { CurvedPanel } from "./CurvedPanel";
import { RevealText } from "./RevealText";

const ADVANCE_MS = 4800;
const COUNT = industries.length;

/**
 * "Industries We Serve" panel. Right side cross-fades through the real
 * industry-sector photos; the left side's sub-label + description are driven by
 * the same index, so image and text always change together. Auto-advances on a
 * timer (paused on hover); prev/next for manual control. prefers-reduced-motion
 * disables the timer and the cross-fade — the visitor browses with the arrows.
 */
export function IndustriesPanel() {
  const reduced = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const intervalRef = useRef(0);
  const pausedRef = useRef(false);

  const arm = useCallback(() => {
    window.clearInterval(intervalRef.current);
    if (reduced) return;
    intervalRef.current = window.setInterval(() => {
      if (!pausedRef.current && !document.hidden) {
        setIndex((i) => (i + 1) % COUNT);
      }
    }, ADVANCE_MS);
  }, [reduced]);

  useEffect(() => {
    arm();
    return () => window.clearInterval(intervalRef.current);
  }, [arm]);

  const go = (delta: number) => {
    setIndex((i) => (i + delta + COUNT) % COUNT);
    arm(); // restart the timer so it doesn't fire immediately after a manual step
  };

  const current = industries[index];
  if (!current) return null;

  const visual = (
    <div
      className="absolute inset-0"
      onMouseEnter={() => {
        pausedRef.current = true;
      }}
      onMouseLeave={() => {
        pausedRef.current = false;
      }}
    >
      {industries.map((ind, i) => (
        <img
          key={ind.name}
          src={ind.imageSrc}
          alt={i === index ? `${ind.name} — a sector N R Industries serves` : ""}
          loading={i < 2 ? "eager" : "lazy"}
          decoding="async"
          className="exp-fade-layer absolute inset-0 h-full w-full object-cover"
          style={{ opacity: i === index ? 1 : 0 }}
        />
      ))}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
      <div className="absolute right-4 bottom-4 flex items-center gap-2">
        <button
          type="button"
          onClick={() => go(-1)}
          aria-label="Previous industry"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <button
          type="button"
          onClick={() => go(1)}
          aria-label="Next industry"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-white/40 text-white transition-colors hover:bg-white/15"
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
      <span className="exp-mono absolute bottom-6 left-5 text-[11px] tracking-widest text-white/85 tabular-nums">
        {String(index + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <section className="exp-sec-white py-24 sm:py-28">
      <div className="container-page">
        <CurvedPanel visual={visual} visualSide="right">
          <span className="exp-eyebrow">Sectors</span>
          <h2 className="exp-display exp-display-lg">
            <RevealText text="Industries We Serve" />
          </h2>
          <div key={index} className="exp-text-swap flex min-h-[7rem] flex-col gap-2">
            <p className="exp-display exp-display-sm exp-accent-text">{current.name}</p>
            <p className="exp-body max-w-sm">{current.description}</p>
          </div>
          <Link to="/industries" className="exp-btn exp-btn-solid mt-1">
            View all industries
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </CurvedPanel>
      </div>
    </section>
  );
}
