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
 * The width the home page's cinematic "desktop" sections actually render
 * correctly at — see useNormalizedVh's own doc comment (specifically its
 * `zoom` section) for why. Also matches index.css's own fluid type scale's
 * upper bound (375px -> 1536px), the one other place this project has
 * already committed to an intended "full-size desktop" width.
 */
export const HOME_REF_WIDTH = 1536;
/** One "screen" within that reference canvas, at a normal 16:9 ratio. */
export const HOME_REF_VH = Math.round((HOME_REF_WIDTH * 9) / 16);

function computeHomeZoom(): number {
  const width = window.innerWidth;
  const height = window.innerHeight;
  if (!isPortraitDesktopAnomaly(width, height)) return 1;
  return width / HOME_REF_WIDTH;
}

/**
 * Keeps a `--vh100` custom property (on <html>) in sync, and returns both
 * numbers below for callers that need them directly in JS (scroll-progress
 * math, measurement corrections, and each affected section's own inline
 * `zoom`/`width` styles).
 *
 * `vh100`: see computeVh100Px above.
 *
 * `zoom`: Home's cinematic sections (Hero, WhyChooseUs, Industries+Certs,
 * the LabDarkSections "About" panel, ManifestoMarquee, ProductsFaq) mix
 * percentage-based structural positioning (already width-fluid, like every
 * other page on this site) with literal fixed-px text sizes and fixed-px
 * gaps between absolutely-positioned blocks — NOT fluid, unlike every other
 * real page (About, Products, etc.), which sizes all its text off
 * index.css's clamp()-based `text-*` scale and lets wrapped text push
 * normal-flow siblings down naturally. Those fixed-px choices were tuned to
 * look right at a normal desktop width (HOME_REF_WIDTH) and never needed to
 * handle anything narrower, since real desktop windows are never narrower
 * than that in practice and real mobile uses a completely separate,
 * simpler layout branch below MOBILE_BREAKPOINT.
 *
 * The phone + "Desktop site" anomaly is the one case that breaks that
 * assumption: it forces a >=768px-wide layout viewport that's still
 * typically narrower than HOME_REF_WIDTH, so those fixed-px sizes and gaps
 * now occupy a disproportionately large share of the (narrower-than-
 * intended) column widths — text wraps onto extra lines the fixed-px
 * vertical offsets below it never accounted for, producing exactly the
 * reported symptoms: oversized-looking text, uneven spacing, overlapping
 * elements.
 *
 * `zoom` (applied to each section's own root element, alongside sizing
 * everything else inside them off HOME_REF_VH/HOME_REF_WIDTH instead of
 * raw vh/vw — see those sections for how) renders each section as it would
 * naturally render on a real HOME_REF_WIDTH-wide desktop — where every
 * fixed-px value is already known to look right, since that's the width
 * they were tuned for — and then uses the (Chrome-only, but this bug is
 * Chrome-only too) CSS `zoom` property to visually AND structurally shrink
 * (or grow) that whole rendering to fit however wide the phone's forced
 * viewport actually is, exactly like a real desktop browser window does
 * when physically resized. Real desktop (never narrower than
 * HOME_REF_WIDTH in practice) and real mobile (a separate layout branch)
 * both get zoom===1, i.e. no change from today.
 */
export function useNormalizedVh(): { vh100: number; zoom: number } {
  const [vh100, setVh100] = useState(computeVh100Px);
  const [zoom, setZoom] = useState(computeHomeZoom);

  useLayoutEffect(() => {
    function apply() {
      const nextVh = computeVh100Px();
      const nextZoom = computeHomeZoom();
      document.documentElement.style.setProperty("--vh100", `${nextVh}px`);
      setVh100(nextVh);
      setZoom(nextZoom);
    }
    apply();
    window.addEventListener("resize", apply);
    window.addEventListener("orientationchange", apply);
    return () => {
      window.removeEventListener("resize", apply);
      window.removeEventListener("orientationchange", apply);
    };
  }, []);

  return { vh100, zoom };
}
