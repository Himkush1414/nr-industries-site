import { useLayoutEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/experimental-ui-v3/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";

const STATEMENT = "Every unit is tested, certified, and validated before it ever leaves our facility.";

/** Full-bleed near-black statement — dim and blurred until the section
 * scrolls into view, then sharpens word-by-word (GSAP ScrollTrigger,
 * blur filter + opacity, staggered, fires once). */
export function StatementReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const words = container.querySelectorAll<HTMLElement>("[data-word]");

    if (reducedMotion) {
      gsap.set(words, { opacity: 1, filter: "blur(0px)" });
      return;
    }

    gsap.set(words, { opacity: 0.2, filter: "blur(10px)" });
    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 70%",
      once: true,
      onEnter: () => {
        gsap.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.06,
          ease: "power2.out",
        });
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section className="v3-page-bg py-32 sm:py-40" style={{ backgroundColor: "var(--v3-bg-start)" }}>
      <div className="container-page">
        <div ref={containerRef} className="mx-auto max-w-4xl text-center">
          <p className="font-heading text-3xl leading-snug font-medium tracking-tight sm:text-4xl lg:text-5xl">
            {STATEMENT.split(" ").map((word, i) => (
              <span key={i} data-word className="v3-fg mr-[0.28em] inline-block will-change-[filter,opacity]">
                {word}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  );
}
