import { useEffect, useState } from "react";

/**
 * Tracks whether the viewport is at or below a breakpoint, reactively.
 * Defaults to Tailwind's `sm` boundary (640px) so it lines up with this
 * project's own `sm:` utility classes.
 */
export function useIsMobile(breakpointPx = 640): boolean {
  const query = `(max-width: ${breakpointPx - 1}px)`;

  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia(query).matches;
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setIsMobile(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return isMobile;
}
