import type { CSSProperties } from "react";

/**
 * Ambient, atmospheric background motion for a solid navy section (currently
 * Certifications and Clients) — a handful of blurred radial-gradient blobs
 * (same navy family as the section's solid base) that slowly drift and
 * rescale via CSS `transform` animations. No canvas, no per-frame JS.
 *
 * Each blob uses its own keyframe path, duration, and negative animation
 * delay (so they start pre-offset in their cycle rather than all beginning
 * in sync) — that combination is what keeps the motion reading as organic
 * drifting smoke/liquid rather than a mechanical, synchronized loop.
 *
 * Blur radius and blob count are deliberately tuned, not just "as large/soft
 * as possible": `filter: blur()` cost scales sharply with both blur radius
 * and the pixel area being blurred. This component now renders in two
 * sections (Certifications, Clients) that can both be partially on-screen
 * at once mid-scroll, doubling the number of simultaneously-blurred layers —
 * measuring at that boundary showed 4 blobs/24px blur (great for a single
 * section in isolation, ~60fps) dropping to ~44fps once both instances were
 * visible together. 3 blobs at 18px blur measured ~57fps in that same
 * worst-case two-instance scenario — keep both numbers at or below that if
 * adjusting, and re-measure with two instances on screen at once.
 */
type FlowBlob = {
  className: string;
  style: CSSProperties;
};

const FLOW_BLOBS: FlowBlob[] = [
  {
    className: "animate-blob-drift-a motion-reduce:animate-none",
    style: {
      top: "-10%",
      left: "-6%",
      width: "34vw",
      height: "34vw",
      background: "radial-gradient(circle, var(--color-navy-950) 0%, transparent 70%)",
      opacity: 0.55,
      animationDuration: "32s",
      animationDelay: "-6s",
    },
  },
  {
    className: "animate-blob-drift-b motion-reduce:animate-none",
    style: {
      top: "16%",
      right: "-10%",
      width: "29vw",
      height: "29vw",
      background: "radial-gradient(circle, var(--color-navy-800) 0%, transparent 70%)",
      opacity: 0.45,
      animationDuration: "40s",
      animationDelay: "-18s",
    },
  },
  {
    className: "animate-blob-drift-c motion-reduce:animate-none",
    style: {
      bottom: "-12%",
      left: "18%",
      width: "25vw",
      height: "25vw",
      background: "radial-gradient(circle, var(--color-navy-700) 0%, transparent 70%)",
      opacity: 0.4,
      animationDuration: "36s",
      animationDelay: "-9s",
    },
  },
];

export function AmbientFlowBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      {FLOW_BLOBS.map((blob, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-[18px] will-change-transform ${blob.className}`}
          style={blob.style}
        />
      ))}
    </div>
  );
}
