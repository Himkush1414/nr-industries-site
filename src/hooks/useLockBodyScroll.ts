import { useEffect } from "react";

/**
 * Locks page scroll while `locked` is true, restoring whatever the prior
 * value was on unlock/unmount — same save/restore technique already used
 * by AppointmentModal.tsx for its own overlay.
 */
export function useLockBodyScroll(locked: boolean) {
  useEffect(() => {
    if (!locked) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [locked]);
}
