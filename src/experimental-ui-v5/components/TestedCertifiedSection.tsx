import FoldText from "@/experimental-ui-v5/components/FoldText";

/**
 * Source: V3's StatementReveal ("Every unit is tested, certified, and
 * validated before it ever leaves our facility." — exact copy confirmed
 * from src/experimental-ui-v3/components/StatementReveal.tsx). Container,
 * background, and colors are V3's `.v3-page-bg` / `--v3-bg-start` treatment.
 * Per spec, the heading's original word-by-word blur reveal is swapped for
 * the same FoldText effect/config used in the hero (splitBy="char", same
 * hinge/duration/stagger/ease/perspective/crease), just re-triggered on
 * scroll (this section sits below the fold).
 *
 * Fix (round 3, item 3): color was hardcoded to #fcfbfe (near-white), which
 * only worked while this section's background was permanently near-black.
 * --v3-bg-start/--v3-fg are now theme-reactive (see experimental-v5.css),
 * so this reads var(--v3-fg) to stay legible in light mode too.
 */
const STATEMENT = "Every unit is tested, certified, and validated before it ever leaves our facility.";

export function TestedCertifiedSection() {
  return (
    <section className="v3-page-bg py-32 sm:py-40" style={{ backgroundColor: "var(--v3-bg-start)" }}>
      <div className="container-page">
        <div className="mx-auto max-w-4xl text-center">
          <FoldText
            text={STATEMENT}
            splitBy="char"
            hinge="top"
            trigger="scroll"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize="clamp(1.75rem, 1.2rem + 2.4vw, 3rem)"
            fontWeight={500}
            color="var(--v3-fg)"
          />
        </div>
      </div>
    </section>
  );
}
