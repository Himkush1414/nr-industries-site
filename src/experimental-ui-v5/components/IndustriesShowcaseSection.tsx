import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { GsapReveal } from "@/experimental-ui-v5/components/GsapReveal";
import { MorphArrowLink } from "@/experimental-ui-v5/components/MorphArrowLink";
import { gsap } from "@/experimental-ui-v5/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v5/lib/usePrefersReducedMotion";
import { industries } from "@/data/company";

/**
 * Same 3-panel structure/layout as V3's ShowcaseCards (Power Transformers /
 * Distribution Transformers / Compact Substations), verbatim — only the
 * content changed: the real site's industries-served list (data/company.ts,
 * 15 entries, each with a real photo at imageSrc) is the authoritative
 * source rather than an invented one. Since 15 industries don't fit 3
 * static slots, each panel independently cycles through its own subset
 * (round-robin split) with a blur+fade cross-fade — the same blur motif as
 * V3's statement sections — and carries a fuller description, not just a
 * label.
 *
 * Fix (round 3, item 1): industry.imageSrc was never read anywhere in this
 * file — every panel rendered only its flat gradient fill, so no photo ever
 * appeared for any of the 15 industries, not a z-index/stacking bug. Each
 * panel is split into two zones: a top zone holding the photo (object-cover,
 * cropped not stretched), and a bottom zone on the section's own surface
 * color holding the description + button in that surface's foreground color
 * — both theme-reactive (see experimental-v5.css / Fix 3), which is why this
 * reads "solid white on dark text" in light mode without being hardcoded
 * white. The old flat gradient is kept only as a fallback fill behind the
 * top zone for the (currently unused) case of an industry with no imageSrc.
 *
 * Fix (round 5): the top zone was sized to its own label+heading content
 * (~21% of the card height in practice — nowhere near the 60% the photo
 * needs), and the label/heading sat directly on a flat scrim covering that
 * whole small box, jammed at the top. Now the top zone is a fixed 60% of
 * card height (h-[60%] on a definite-height ancestor — the card's own
 * aspect-[3/4] gives it one), the photo fills that full 60% with the same
 * object-cover crop as before (unchanged crop logic, just a taller box), the
 * scrim is a gradient confined to the card's 50%-60% band only (transparent
 * at 50%, dark at the 60% crop line — expressed as the bottom 1/6 of the
 * zone's own height, since 10% of the card / 60% zone height = 1/6), and the
 * label+heading are bottom-anchored within the zone (flex justify-end) so
 * they land on that scrim band instead of the top of the card. Everything
 * from 60% down (the bottom zone below) is untouched.
 */
const FALLBACK_GRADIENTS = [
  "linear-gradient(135deg, #494f8d, #1a1b3d)",
  "linear-gradient(135deg, #564b96, #2b2e44)",
  "linear-gradient(135deg, #3f427d, #000000)",
];

const PANEL_GROUPS: (typeof industries)[number][][] = [[], [], []];
industries.forEach((industry, i) => {
  PANEL_GROUPS[i % 3]!.push(industry);
});

function IndustryPanel({
  group,
  fallbackGradient,
  intervalMs = 4200,
}: {
  group: typeof industries;
  fallbackGradient: string;
  intervalMs?: number;
}) {
  const [index, setIndex] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (reducedMotion || group.length < 2) return;
    const id = setInterval(() => {
      const el = contentRef.current;
      if (!el) {
        setIndex((i) => (i + 1) % group.length);
        return;
      }
      gsap.to(el, {
        opacity: 0,
        filter: "blur(8px)",
        duration: 0.4,
        ease: "power2.in",
        onComplete: () => {
          setIndex((i) => (i + 1) % group.length);
          gsap.fromTo(el, { opacity: 0, filter: "blur(8px)" }, { opacity: 1, filter: "blur(0px)", duration: 0.5, ease: "power2.out" });
        },
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [group.length, intervalMs, reducedMotion]);

  const industry = group[index];
  if (!industry) return null;

  return (
    <div className="v3-border relative flex aspect-[3/4] flex-col overflow-hidden rounded-2xl border">
      <div ref={contentRef} className="flex flex-1 flex-col">
        {/* Top zone — fixed 60% of card height. The card's aspect-[3/4] gives this
            flex column a definite height, so this percentage resolves correctly. */}
        <div className="relative h-[60%] shrink-0 overflow-hidden" style={{ background: fallbackGradient }}>
          {industry.imageSrc && (
            <img
              src={industry.imageSrc}
              alt={industry.name}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
          )}
          {/* Scrim confined to the card's 50%-60% band: transparent at 50%, dark at
              the 60% crop line. In this zone's own coordinate space (0%-100% ==
              card's 0%-60%) that band is its bottom 1/6 (10% card-height / 60%
              zone-height), not the full zone — the photo above 50% stays clear. */}
          <div
            className="absolute inset-x-0 bottom-0"
            aria-hidden="true"
            style={{ height: "16.6667%", background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.78) 100%)" }}
          />
          <div className="relative flex h-full flex-col justify-end gap-2 p-6 pb-5">
            <span className="text-xs font-semibold tracking-[0.18em] text-white uppercase">Industries We Serve</span>
            <h3 className="font-heading text-2xl leading-tight font-bold text-white">{industry.name}</h3>
          </div>
        </div>

        {/* Bottom zone — the section's own surface color/text, theme-reactive. */}
        <div
          className="flex flex-1 flex-col justify-between gap-4 p-6 pt-5"
          style={{ backgroundColor: "var(--v3-bg-start)" }}
        >
          <p className="text-sm leading-relaxed" style={{ color: "var(--v3-fg-dim)" }}>
            {industry.description}
          </p>
          <MorphArrowLink to="/industries" variant="outline" className="mt-2 w-fit">
            View Industries
          </MorphArrowLink>
        </div>
      </div>
    </div>
  );
}

export function IndustriesShowcaseSection() {
  return (
    <section className="v3-page-bg py-24 sm:py-32" style={{ backgroundColor: "var(--v3-bg-start)" }}>
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">Featured Categories</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for every stage of the grid
          </h2>
        </GsapReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {PANEL_GROUPS.map((group, i) => (
            <GsapReveal key={i} delay={i * 0.08}>
              <IndustryPanel group={group} fallbackGradient={FALLBACK_GRADIENTS[i]!} />
            </GsapReveal>
          ))}
        </div>

        <GsapReveal className="flex justify-center">
          <Link to="/industries" className="v3-btn v3-btn-outline">
            View All 15 Industries
          </Link>
        </GsapReveal>
      </div>
    </section>
  );
}
