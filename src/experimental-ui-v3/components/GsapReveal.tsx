import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/experimental-ui-v3/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds before the entrance tween starts. */
  delay?: number;
  /** Starting Y offset in px (settles to 0). */
  y?: number;
  /** Fire on mount instead of gating on ScrollTrigger — for above-the-fold content (the hero). */
  immediate?: boolean;
}

/** Shared fade-up-once entrance, GSAP + ScrollTrigger powered — this
 * experiment's equivalent of Lab V2's CSS-based `Reveal`, used the same way
 * across most sections here so every entrance shares one spring/ease curve. */
export function GsapReveal({ children, className = "", delay = 0, y = 28, immediate = false }: GsapRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reducedMotion) {
      gsap.set(el, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(el, { opacity: 0, y });
    const tween = () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay, ease: "power3.out" });

    if (immediate) {
      tween();
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: el,
      start: "top 85%",
      once: true,
      onEnter: tween,
    });
    return () => trigger.kill();
  }, [reducedMotion, delay, y, immediate]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
