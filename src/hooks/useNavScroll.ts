import { useEffect, useState } from "react";

const FADE_DISTANCE = 160;
const TOP_THRESHOLD = 4;
const BOTTOM_THRESHOLD = 48;

/**
 * Tracks scroll position and derives a single 0-1 "hide progress" value for
 * the navbar: 0 at the very top of the page (or the very bottom of the
 * document), 1 once scrolled far enough down. Deriving it purely from
 * position (not scroll direction) means scrolling back to the top, or
 * reaching the bottom of the page, always resolves back to 0 on its own.
 */
export function useNavScroll() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function compute() {
      const y = window.scrollY;
      const doc = document.documentElement;
      const atBottom = y + window.innerHeight >= doc.scrollHeight - BOTTOM_THRESHOLD;

      if (y <= TOP_THRESHOLD || atBottom) {
        setProgress(0);
      } else {
        setProgress(Math.min(1, (y - TOP_THRESHOLD) / FADE_DISTANCE));
      }
    }

    compute();
    window.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);
    return () => {
      window.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, []);

  return progress;
}
