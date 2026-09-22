import { useEffect, useState } from "react";

/** Live-updating (not just checked-once) prefers-reduced-motion flag.
 * Own copy for this route (not imported from experimental-ui-v3/v4),
 * matching each lab's self-contained pattern. */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return reduced;
}
