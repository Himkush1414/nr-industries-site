import type { ReactNode } from "react";
import { useReveal } from "../lib/useReveal";

interface RevealBlockProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
  delayMs?: number;
  durationMs?: number;
  distance?: number;
  /** Optional external gate. When `false`, the block stays hidden even after it
   *  scrolls into view; the reveal runs once this flips to `true` (and the
   *  block is in view). Defaults to `true` — unchanged behaviour. */
  enabled?: boolean;
}

/** Directional fade + translate reveal, triggered once the block scrolls into view. */
export function RevealBlock({
  children,
  className = "",
  direction = "up",
  delayMs = 0,
  durationMs = 800,
  distance = 28,
  enabled = true,
}: RevealBlockProps) {
  const { ref, revealed: inView } = useReveal<HTMLDivElement>();
  const revealed = inView && enabled;

  const translate =
    direction === "none"
      ? "none"
      : direction === "up"
        ? `translateY(${distance}px)`
        : direction === "left"
          ? `translateX(-${distance}px)`
          : `translateX(${distance}px)`;

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transitionProperty: "transform, opacity",
        transitionDuration: `${durationMs}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        transitionDelay: `${delayMs}ms`,
        transform: revealed ? "translate(0, 0)" : translate,
        opacity: revealed ? 1 : 0,
        willChange: "transform, opacity",
      }}
    >
      {children}
    </div>
  );
}
