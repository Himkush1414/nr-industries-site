import { useLayoutEffect, useState } from "react";

/**
 * Real desktop browser windows are always landscape (wider than tall).
 * Chrome's Android "Desktop site" toggle is the only way a >=768px-wide
 * layout viewport ever reports a *taller-than-wide* height: it forces a
 * wide desktop-style viewport width while still preserving the phone's own
 * portrait screen aspect ratio for height, so `window.innerHeight` comes
 * back 2-3x taller than any real desktop window (e.g. ~2100px instead of
 * ~900px).
 */
function isPortraitDesktopAnomaly(width: number, height: number): boolean {
  return width >= 768 && height > width;
}

/**
 * One real viewport height (`window.innerHeight`) — except in the phone +
 * "Desktop site" case above, where a realistic 16:9 desktop-window height
 * (derived from the, correctly wide, viewport width) is substituted
 * instead. Every other case — real desktop (landscape) and real mobile
 * (<768px wide) — returns `window.innerHeight` straight through, unchanged
 * from today.
 */
function computeVh100Px(): number {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (isPortraitDesktopAnomaly(width, height)) {
    return Math.round((width * 9) / 16);
  }
  return height;
}

/**
 * Keeps a `--vh100` custom property (in px) on <html> in sync with
 * computeVh100Px(), and returns that same number for callers that need it
 * in JS (scroll-progress math etc.) rather than as a CSS value. The home
 * page's cinematic sections size full-height panels — and, in
 * WhyChooseUsSection's case, a scroll-reveal progress fraction — off raw
 * `window.innerHeight` (or CSS `100vh`) assuming a normal landscape window;
 * on the phone-desktop-mode anomaly above, that inflated height stretches
 * panels into a broken, oversized layout and throws off scroll-progress
 * math, neither of which matches how the same page renders on an actual
 * desktop browser at the same width.
 */
export function useNormalizedVh(): number {
  const [vh100, setVh100] = useState(computeVh100Px);

  useLayoutEffect(() => {
    function apply() {
      const next = computeVh100Px();
      document.documentElement.style.setProperty("--vh100", `${next}px`);
      setVh100(next);
    }
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  return vh100;
}
