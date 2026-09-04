import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FoldText from "@/experimental-ui-v4/components/FoldText";
import GhostFibers from "@/experimental-ui-v4/components/GhostFibers";
import { GsapReveal } from "@/experimental-ui-v4/components/GsapReveal";

/**
 * Full-bleed GhostFibers background (lightMode=true, per the light/blue
 * direction for this page — everything else left at the given defaults),
 * with FoldText rendering the company name on top as the hero's animated
 * headline, plus supporting copy/CTAs to round it into a complete hero
 * rather than just a standalone wordmark.
 */
export function Hero() {
  return (
    <section className="relative flex min-h-[92vh] flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0" aria-hidden="true">
        <GhostFibers
          lineColor="#140E35"
          glowColor="#3437A0"
          speed={0.2}
          scale={2}
          rotation={0}
          rotationSpeed={0.25}
          layers={4}
          waveAmplitude={0.015}
          waveFrequency={3}
          waveSpeed={0.15}
          layerSpeed={0.08}
          twist={0.1}
          twistFrequency={5}
          twistSpeed={1.2}
          lineFrequency={5}
          lineSpacing={2}
          lineSharpness={16}
          glowFalloff={10}
          glowIntensity={1.6}
          brightness={2}
          blueBoost={1.25}
          vignette={0.8}
          grain={0.05}
          dpr={1}
          lightMode={true}
          fps={60}
          paused={false}
        />
      </div>

      <div className="container-page relative flex flex-col items-center gap-8 py-32 text-center">
        <GsapReveal immediate>
          <FoldText
            text="N R INDUSTRIES"
            splitBy="char"
            hinge="top"
            trigger="mount"
            duration={0.65}
            stagger={0.045}
            ease="power3.out"
            perspective={700}
            creaseShading={0.55}
            fontSize="clamp(2.25rem, 6vw + 1rem, 5rem)"
            fontWeight={800}
            color="#0f172a"
          />
        </GsapReveal>

        <GsapReveal immediate delay={0.4} className="flex flex-col items-center gap-6">
          <p className="v4-fg-dim max-w-xl text-base leading-relaxed sm:text-lg">
            Power &amp; distribution transformers, substations, and stabilizers — engineered and
            tested in-house, trusted across 500+ installations nationwide.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/products" className="v4-btn v4-btn-solid">
              View Our Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="v4-btn v4-btn-outline">
              Talk to Our Team
            </Link>
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
