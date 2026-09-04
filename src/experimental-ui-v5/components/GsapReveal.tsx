import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/experimental-ui-v5/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v5/lib/usePrefersReducedMotion";

interface GsapRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  immediate?: boolean;
}

/** Shared fade-up-once entrance, GSAP + ScrollTrigger powered. */
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
