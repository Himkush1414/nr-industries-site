import { useEffect, useState } from "react";

/**
 * Animates a number from 0 up to `target` once `start` flips true. Returns
 * the formatted string with the same decimal precision as `target`, so
 * "12.5" counts up showing one decimal place throughout, not just at the end.
 */
export function useCountUp(target: number, start: boolean, duration = 1400) {
  const [value, setValue] = useState(0);
  const decimals = Number.isInteger(target) ? 0 : (String(target).split(".")[1]?.length ?? 0);

  useEffect(() => {
    if (!start) return;

    let frame: number;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setValue(target);
      }
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);

  return value.toFixed(decimals);
}
