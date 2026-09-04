import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { HalftonePhoto } from "@/experimental-ui-v2/components/HalftonePhoto";
import { HERO_PHOTOS } from "@/experimental-ui-v2/lib/productPhotos";

/**
 * Split hero — left column reuses the live site's exact hero text treatment
 * (eyebrow / two-tone h1 / subheading / Reveal fade-up stagger), just
 * restyled for this theme's tokens instead of navy/gold. Right column: real
 * NR transformer product photos, cross-dissolving through a rotation, each
 * run through the halftone treatment (see HalftonePhoto) instead of the
 * reference's single abstract dot graphic.
 */
export function Hero() {
  return (
    <section className="v2-surface relative overflow-hidden py-16 sm:py-20 lg:py-28">
      <div className="container-page relative grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <span className="v2-accent-text flex items-center gap-2 text-xs font-semibold tracking-[0.22em] uppercase">
            <span className="h-px w-8" style={{ backgroundColor: "var(--v2-accent)" }} aria-hidden="true" />
            Power &amp; Distribution Equipment Manufacturer
          </span>
          <h1 className="font-heading v2-fg text-5xl font-bold tracking-tight">
            <span className="uppercase">N R</span>{" "}
            <span className="v2-accent-text uppercase">Industries</span>
          </h1>
          <p className="font-heading v2-accent-text text-xl font-semibold">Power at Best</p>
          <p className="v2-fg-dim max-w-xl text-base leading-relaxed">
            Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
            Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
            and utility-scale power distribution.
          </p>
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link to="/products" className="v2-btn v2-btn-solid">
              View Our Products
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link to="/contact" className="v2-btn v2-btn-outline">
              Contact Us
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>
        </Reveal>

        <Reveal delayMs={150} className="relative">
          <HalftonePhoto images={HERO_PHOTOS} className="aspect-[4/3] w-full" />
        </Reveal>
      </div>
    </section>
  );
}
