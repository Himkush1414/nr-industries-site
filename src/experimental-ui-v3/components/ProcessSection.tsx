import { ClipboardList, Settings2, ShieldCheck, Truck } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useLayoutEffect, useRef, useState } from "react";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { ScrollTrigger } from "@/experimental-ui-v3/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";

/** Real process, grounded in the same facts used sitewide (infrastructurePoints,
 * certifications, aboutFull) — not invented marketing steps. */
const STEPS = [
  {
    icon: ClipboardList,
    title: "Consultation & Specification",
    description: "We size the equipment to your load, voltage class, and site conditions before manufacturing begins.",
  },
  {
    icon: Settings2,
    title: "Engineering & Manufacturing",
    description: "Built in an ISO-certified facility with in-house R&D and precision testing equipment.",
  },
  {
    icon: ShieldCheck,
    title: "Testing & Certification",
    description: "Every unit is validated against ISO, BIS, ERDA, and CPRI standards before it ships.",
  },
  {
    icon: Truck,
    title: "Delivery & After-Sales Support",
    description: "Organized logistics for on-time delivery, backed by a team that stays engaged after commissioning.",
  },
];

export function ProcessSection() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    if (reducedMotion) return;
    const triggers = cardRefs.current.map((card, i) => {
      if (!card) return null;
      return ScrollTrigger.create({
        trigger: card,
        start: "top center",
        end: "bottom center",
        onToggle: (self) => {
          if (self.isActive) setActiveIndex(i);
        },
      });
    });
    return () => triggers.forEach((t) => t?.kill());
  }, [reducedMotion]);

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">Our Process</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            From spec sheet to <em className="v3-accent-text italic">commissioning</em>
          </h2>
        </GsapReveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => {
            const isActive = activeIndex === i;
            return (
              <div
                key={step.title}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                className="v3-glass flex flex-col gap-4 p-6 transition-all duration-500"
                style={{
                  transform: isActive ? "translateY(-6px) scale(1.02)" : "none",
                  borderColor: isActive ? "var(--v3-highlight-start)" : "var(--v3-glass-border)",
                  boxShadow: isActive ? "0 24px 60px -24px var(--v3-accent-end)" : "none",
                }}
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl transition-colors duration-500"
                  style={{ backgroundColor: isActive ? "var(--v3-accent-start)" : "color-mix(in srgb, var(--v3-glass-end) 60%, transparent)" }}
                >
                  <MorphIcon icon={isActive ? ShieldCheck : step.icon} size={18} color="var(--v3-highlight-end)" reducedMotion="user" />
                </span>
                <span className="v3-fg-faint text-xs font-semibold tracking-wide uppercase">
                  Step {i + 1}
                </span>
                <h3 className="font-heading v3-fg text-base font-bold">{step.title}</h3>
                <p className="v3-fg-dim text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
