import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Smooth, slowed-down scroll for the Home page only — promoted from
 * /lab/lv9's LenisProvider (src/lab-lv9/components/LenisProvider.tsx), left
 * untouched as the reference this was copied from. Mounts/tears down with
 * the page (React unmounts it, and Lenis restores native scrolling, on
 * navigating away), never touches the rest of the site's native scroll.
 *
 * Tuned specifically for a slower, more deliberate feel than the default
 * (which experimental-ui-v3/v4 use for a snappier effect): a lower
 * `wheelMultiplier` means the same wheel input covers less scroll
 * distance, and a longer `duration` makes each input's glide settle more
 * gradually — together, "small input still moves the page, just at a
 * slower, more controlled pace" rather than reduced responsiveness.
 * `lerp` (smoothing) is left at Lenis's usual 0.1.
 *
 * Skipped entirely under prefers-reduced-motion, which just leaves native
 * scrolling in place.
 */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ lerp: 0.1, duration: 1.6, wheelMultiplier: 0.7 }}>
      {children}
    </ReactLenis>
  );
}
