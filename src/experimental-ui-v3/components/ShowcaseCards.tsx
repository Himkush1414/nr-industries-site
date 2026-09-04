import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { MorphArrowLink } from "@/experimental-ui-v3/components/MorphArrowLink";

/** Three real product categories, gradient thumbnail + bold overlay label
 * (distinct from ShowcaseGallery's real-photo bulge cards above). */
const CARDS = [
  {
    to: "/products/power-transformers",
    label: "Power Transformers",
    gradient: "linear-gradient(135deg, #494f8d, #1a1b3d)",
  },
  {
    to: "/products/distribution-transformers",
    label: "Distribution Transformers",
    gradient: "linear-gradient(135deg, #564b96, #2b2e44)",
  },
  {
    to: "/products/compact-substation",
    label: "Compact Substations",
    gradient: "linear-gradient(135deg, #3f427d, #000000)",
  },
];

export function ShowcaseCards() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">Featured Categories</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Built for every stage of the grid
          </h2>
        </GsapReveal>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {CARDS.map((card, i) => (
            <GsapReveal key={card.to} delay={i * 0.08}>
              <div
                className="v3-border relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-2xl border p-6"
                style={{ background: card.gradient }}
              >
                <div className="v3-glow absolute -top-10 -right-10 h-48 w-48 opacity-50" aria-hidden="true" />
                <h3 className="font-heading relative text-2xl leading-tight font-bold text-[var(--v3-highlight-end)]">
                  {card.label}
                </h3>
                <MorphArrowLink to={card.to} variant="outline" className="relative mt-4 w-fit !border-white/30">
                  View Range
                </MorphArrowLink>
              </div>
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
