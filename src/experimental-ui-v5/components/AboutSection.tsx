import MagicBento from "@/experimental-ui-v5/components/MagicBento";
import { GsapReveal } from "@/experimental-ui-v5/components/GsapReveal";

/**
 * Source: V4's MagicBento, same heading ("What sets our products apart").
 * Widened (max-w-[54rem] -> max-w-[78rem], gap/padding bumped to match) and
 * its 6-card content replaced per spec: cards 3 & 4 (the grid's existing big
 * 2x2 spans) now hold two real About-page photos with captions; cards 1, 2,
 * 5, 6 hold four real certifications. See MagicBento.tsx's own comments for
 * exactly which images/certs were picked and why (a judgment call, flagged
 * in the chat wrap-up).
 */
export function AboutSection() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: "var(--v4-bg-alt)" }}>
      <div className="container-page flex flex-col items-center gap-12">
        <GsapReveal className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label" style={{ color: "var(--v4-accent)" }}>
            About Us
          </span>
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl" style={{ color: "var(--v4-fg)" }}>
            What sets our products apart
          </h2>
          <p className="text-base leading-relaxed" style={{ color: "var(--v4-fg-dim)" }}>
            Decades of experience in power distribution, backed by in-house engineering and
            testing at every step.
          </p>
        </GsapReveal>

        <div className="flex w-full justify-center">
          <MagicBento
            textAutoHide={true}
            enableStars
            enableSpotlight
            enableBorderGlow={true}
            enableTilt={false}
            enableMagnetism={false}
            clickEffect
            spotlightRadius={400}
            particleCount={12}
            glowColor="59, 130, 246"
            disableAnimations={false}
          />
        </div>
      </div>
    </section>
  );
}
