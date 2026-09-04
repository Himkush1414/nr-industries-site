import MagicBento from "@/experimental-ui-v4/components/MagicBento";
import { GsapReveal } from "@/experimental-ui-v4/components/GsapReveal";

/** About Us — directly under the hero, per spec. glowColor changed from the
 * given default purple (132, 0, 255) to blue (59, 130, 246); card
 * backgrounds/text contrast/content are changed inside MagicBento.tsx
 * itself (see that file's comments) since those require real markup edits,
 * not just props. */
export function AboutSection() {
  return (
    <section className="py-24 sm:py-32" style={{ backgroundColor: "var(--v4-bg-alt)" }}>
      <div className="container-page flex flex-col items-center gap-12">
        <GsapReveal className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v4-micro-label">About Us</span>
          <h2 className="font-heading v4-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            What sets our products apart
          </h2>
          <p className="v4-fg-dim text-base leading-relaxed">
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
