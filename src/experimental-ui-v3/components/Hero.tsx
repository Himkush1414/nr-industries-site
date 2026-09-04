import { CursorBlobCanvas } from "@/experimental-ui-v3/components/CursorBlobCanvas";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { MorphArrowLink } from "@/experimental-ui-v3/components/MorphArrowLink";

/**
 * Split hero: headline/copy/CTAs on the left (matches Lab V2's hero CTA
 * pattern — two buttons, no search/prompt-style input bar), the cursor blob
 * as the visual on the right instead of a static graphic.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="v3-glow absolute top-1/4 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 opacity-40" aria-hidden="true" />
      <div className="container-page relative grid items-center gap-16 lg:grid-cols-2">
        <div className="flex flex-col gap-7">
          <GsapReveal immediate>
            <span className="v3-micro-label">Power &amp; Distribution Equipment</span>
          </GsapReveal>
          <GsapReveal immediate delay={0.08}>
            <h1 className="font-heading text-5xl leading-[1.05] font-semibold tracking-tight text-[var(--v3-fg)] sm:text-6xl">
              Power equipment built for <em className="v3-accent-text italic">decades</em>, not deadlines.
            </h1>
          </GsapReveal>
          <GsapReveal immediate delay={0.16}>
            <p className="v3-fg-dim max-w-md text-base leading-relaxed">
              Transformers, substations, and stabilizers engineered and tested in-house — trusted
              across 500+ installations nationwide.
            </p>
          </GsapReveal>
          <GsapReveal immediate delay={0.24} className="flex flex-wrap items-center gap-4 pt-2">
            <MorphArrowLink to="/products" variant="solid">
              View Our Products
            </MorphArrowLink>
            <MorphArrowLink to="/contact" variant="outline">
              Talk to Our Team
            </MorphArrowLink>
          </GsapReveal>
        </div>

        <GsapReveal immediate delay={0.2} className="relative">
          <CursorBlobCanvas className="aspect-square w-full" />
        </GsapReveal>
      </div>
    </section>
  );
}
