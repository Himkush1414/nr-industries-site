import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import FoldText from "@/experimental-ui-v5/components/FoldText";
import GhostFibers from "@/experimental-ui-v5/components/GhostFibers";
import { GsapReveal } from "@/experimental-ui-v5/components/GsapReveal";
import { HalftonePhoto } from "@/experimental-ui-v5/components/HalftonePhoto";
import { HERO_PHOTOS } from "@/experimental-ui-v5/lib/productPhotos";
import type { V5Theme } from "@/experimental-ui-v5/components/ThemeToggle";

/**
 * Background: GhostFibers with V4's exact current prop values (confirmed
 * from src/experimental-ui-v4/components/Hero.tsx), lightMode reactive to
 * the page toggle (V4 hard-codes lightMode=true; here it follows the V5
 * theme state per the cross-cutting toggle spec).
 * Layout: V2's hero arrangement, unchanged — name/headline left, the
 * transformer halftone ("dot dot dot") visual right.
 * Text effect: the left-side name now uses V4's FoldText config
 * (splitBy="char", same hinge/duration/stagger/ease/perspective/crease),
 * replacing V2's plain two-tone <h1>, with the name in caps as V4 has it.
 */
export function Hero({ theme }: { theme: V5Theme }) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28">
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
          lightMode={theme === "light"}
          fps={60}
          paused={false}
        />
      </div>

      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <GsapReveal className="flex flex-col gap-6">
          <span className="v5-chrome-accent-text flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase">
            <span className="h-px w-8" style={{ backgroundColor: "var(--v5-chrome-accent)" }} aria-hidden="true" />
            Power &amp; Distribution Equipment Manufacturer
          </span>

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
            fontSize="clamp(2rem, 1.2rem + 3.4vw, 3.75rem)"
            fontWeight={800}
            color={theme === "light" ? "#131318" : "#f2f2f6"}
          />

          <p className="font-heading v5-chrome-accent-text text-xl font-semibold">Power at Best</p>
          <p className="v5-chrome-fg-dim max-w-xl text-base leading-relaxed">
            Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
            Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
            and utility-scale power distribution.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/products" className="v5-btn v5-btn-solid">
              View Our Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="v5-btn v5-btn-outline">
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </GsapReveal>

        <GsapReveal delay={0.15} className="relative">
          <HalftonePhoto images={HERO_PHOTOS} className="aspect-[4/3] w-full" />
        </GsapReveal>
      </div>
    </section>
  );
}
