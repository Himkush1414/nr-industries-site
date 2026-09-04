import { useLayoutEffect, useRef } from "react";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { gsap, ScrollTrigger } from "@/experimental-ui-v3/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";
import { productionCapacity } from "@/data/specifications";

/** Real annual production capacity data (same source as the live
 * Specifications page) — the one dataset in our content that's genuinely
 * comparable as proportional bars (same "units/annum" unit throughout). */
const MAX_UNITS = Math.max(
  ...productionCapacity.map((row) => Number.parseInt(row.unitsPerAnnum.replace(/[^\d]/g, ""), 10)),
);

export function StatsBars() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const bars = container.querySelectorAll<HTMLElement>("[data-bar]");

    if (reducedMotion) {
      bars.forEach((bar) => {
        const pct = bar.dataset.pct;
        gsap.set(bar, { scaleX: pct ? Number(pct) / 100 : 1 });
      });
      return;
    }

    const trigger = ScrollTrigger.create({
      trigger: container,
      start: "top 75%",
      once: true,
      onEnter: () => {
        bars.forEach((bar, i) => {
          const pct = bar.dataset.pct;
          gsap.to(bar, {
            scaleX: pct ? Number(pct) / 100 : 1,
            duration: 1.1,
            delay: i * 0.08,
            ease: "power3.out",
          });
        });
      },
    });
    return () => trigger.kill();
  }, [reducedMotion]);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">Production Capacity</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Scaled for volume, without compromise
          </h2>
          <p className="v3-fg-dim text-base leading-relaxed">
            Annual production capacity across our transformer range.
          </p>
        </GsapReveal>

        <div ref={containerRef} className="mx-auto flex w-full max-w-2xl flex-col gap-6">
          {productionCapacity.map((row) => {
            const units = Number.parseInt(row.unitsPerAnnum.replace(/[^\d]/g, ""), 10);
            const pct = Math.max(4, Math.round((units / MAX_UNITS) * 100));
            return (
              <div key={row.rating} className="flex flex-col gap-2">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="v3-fg font-semibold">{row.rating}</span>
                  <span className="v3-fg-dim">{row.unitsPerAnnum}</span>
                </div>
                <div className="v3-bar-track">
                  <div className="v3-bar-fill" data-bar data-pct={pct} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
