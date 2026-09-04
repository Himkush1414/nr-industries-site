import { ReactLenis, useLenis } from "lenis/react";
import type { ReactNode } from "react";
import { useEffect } from "react";
import { gsap, ScrollTrigger } from "@/experimental-ui-v4/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v4/lib/usePrefersReducedMotion";

/** Drives Lenis from GSAP's own ticker and feeds every Lenis scroll event
 * into ScrollTrigger.update — the standard Lenis + GSAP ScrollTrigger sync
 * pattern, adapted to the official React binding. Own copy for this route
 * (not imported from Lab V3), matching each Lab's self-contained pattern. */
function LenisGsapBridge() {
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    const activeLenis = lenis;

    const onScroll = () => ScrollTrigger.update();
    activeLenis.on("scroll", onScroll);

    function update(time: number) {
      activeLenis.raf(time * 1000);
    }
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    return () => {
      activeLenis.off("scroll", onScroll);
      gsap.ticker.remove(update);
    };
  }, [lenis]);

  return null;
}

/** Smooth-scroll wrapper for this route only — mounts/tears down with the
 * page, never touches the rest of the site's native scroll. Skipped entirely
 * under prefers-reduced-motion, which just leaves native scrolling in place. */
export function LenisProvider({ children }: { children: ReactNode }) {
  const reducedMotion = usePrefersReducedMotion();

  if (reducedMotion) {
    return <>{children}</>;
  }

  return (
    <ReactLenis root options={{ autoRaf: false, lerp: 0.1, duration: 1.2 }}>
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
