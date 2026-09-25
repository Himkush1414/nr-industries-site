import { useLayoutEffect } from "react";

/**
 * Sets a `--vh100` custom property (in px) on <html>, equal to one real
 * viewport height (`window.innerHeight`) — except in one specific case.
 *
 * Real desktop browser windows are always landscape (wider than tall).
 * Chrome's Android "Desktop site" toggle is the only way a >=768px-wide
 * layout viewport ever reports a *taller-than-wide* height: it forces a
 * wide desktop-style viewport width while still preserving the phone's own
 * portrait screen aspect ratio for height, so `window.innerHeight` comes
 * back 2-3x taller than any real desktop window (e.g. ~2100px instead of
 * ~900px). The home page's cinematic sections size full-height panels off
 * raw `100vh` (and multiples of it) assuming a normal landscape window, so
 * that inflated height stretches them into a broken, oversized layout that
 * doesn't match how the same page renders on an actual desktop browser at
 * the same width.
 *
 * When that specific wide+portrait mismatch is detected, this substitutes a
 * realistic 16:9 desktop-window height derived from the (correctly wide)
 * viewport width, instead of the phone's actual portrait height. Every
 * other case — real desktop (landscape) and real mobile (<768px wide) —
 * passes `window.innerHeight` straight through, unchanged from today.
 */
function computeVh100Px(): number {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (width >= 768 && height > width) {
    return Math.round((width * 9) / 16);
  }
  return height;
}

export function useNormalizedVh() {
  useLayoutEffect(() => {
    function apply() {
      document.documentElement.style.setProperty("--vh100", `${computeVh100Px()}px`);
    }
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);
}
