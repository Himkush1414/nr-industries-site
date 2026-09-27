import { useLayoutEffect, useState } from "react";

/**
 * Real desktop browser windows are always landscape (wider than tall).
 * Chrome's Android "Desktop site" toggle is the only way a >=768px-wide
 * layout viewport ever reports a *taller-than-wide* height: it forces a
 * wide desktop-style viewport width while still preserving the phone's own
 * portrait screen aspect ratio for height, so `window.innerHeight` comes
 * back 2-3x taller than any real desktop window (e.g. ~2100px instead of
 * ~900px), and the forced width itself is typically narrower than any
 * normal desktop window too.
 */
function isPortraitDesktopAnomaly(width: number, height: number): boolean {
  return width >= 768 && height > width;
}

/**
 * One real viewport height (`window.innerHeight`) — except on the anomaly
 * above, where a realistic 16:9 desktop-window height (derived from the,
 * correctly wide, viewport width) is substituted instead. Every other case
 * — real desktop (landscape) and real mobile (<768px wide) — returns
 * `window.innerHeight` straight through, unchanged from today.
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
 * Keeps a `--vh100` custom property (on <html>) in sync with computeVh100Px
 * above — used by the hero's `min-height: var(--vh100, 100vh)` — and also
 * returns the same number directly, for any caller that needs it in JS.
 */
export function useNormalizedVh(): { vh100: number } {
  const [vh100, setVh100] = useState(computeVh100Px);

  useLayoutEffect(() => {
    function apply() {
      const nextVh = computeVh100Px();
      document.documentElement.style.setProperty("--vh100", `${nextVh}px`);
      setVh100(nextVh);
    }
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  return { vh100 };
}
