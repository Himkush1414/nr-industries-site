import type { CSSProperties } from "react";
import { aboutFull, infrastructurePoints, visionStatement, whyChooseUs } from "@/data/company";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { AboutHero } from "../components/AboutHero";
import { AppointmentFab } from "../components/AppointmentFab";
import { ExpNavBar } from "../components/ExpNavBar";
import { RevealBlock } from "../components/RevealBlock";
import { RevealText } from "../components/RevealText";
import { PlateTag } from "../components/Schematic";
import { SectionHeader } from "../components/SectionHeader";
import { WhyChooseGrid } from "../components/WhyChooseGrid";
import "../styles/experimental.css";

/**
 * Experimental About page — same "Graphite + Molten Amber" system as the
 * homepage. Same sections, same order, same real data. See ACTIVE_HOMEPAGE_UI.
 */
export function ExperimentalAboutPage() {
  useDocumentMeta(
    "About Us",
    "Learn about N R Industries — our vision, infrastructure, and why industrial and commercial clients across India choose our power distribution equipment.",
  );

  return (
    <div className="exp-root">
      <ExpNavBar />

      <AboutHero
        eyebrow="About Us"
        title="Decades of experience in power distribution"
        description="Manufacturer of high-performance transformers and power distribution equipment, built for reliability across small installations and large industrial projects alike."
        image="/why-choose-us/precision-engineering.jpeg"
      />

      {/* ── Who we are (light) ───────────────────────────────────────────── */}
      <section className="exp-sec-light py-24 sm:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
          <RevealBlock direction="left">
            <img
              src="/about-1.webp"
              alt="N R Industries manufacturing facility"
              loading="lazy"
              decoding="async"
              className="exp-hair aspect-[4/5] w-full rounded-[1.75rem] border object-cover"
            />
          </RevealBlock>

          <RevealBlock direction="right" className="flex flex-col items-start gap-5">
            <SectionHeader eyebrow="Who We Are" title="N R Industries" />
            {aboutFull.map((paragraph) => (
              <p key={paragraph} className="exp-body-lg">
                {paragraph}
              </p>
            ))}
          </RevealBlock>
        </div>
      </section>

      {/* ── Vision (graphite) ───────────────────────────────────────────── */}
      <section className="exp-sec-dark-deep py-24 sm:py-32">
        <div className="container-page">
          <RevealBlock className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <PlateTag>Our Vision</PlateTag>
            <p className="exp-display exp-display-md">
              <RevealText text={visionStatement} staggerMs={16} />
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── Infrastructure (light) ──────────────────────────────────────── */}
      <section className="exp-sec-light-2 py-24 sm:py-28">
        <div className="container-page grid items-center gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <RevealBlock direction="right" className="lg:order-2">
            <img
              src="/about-3.webp"
              alt="Manufacturing infrastructure and testing facility"
              loading="lazy"
              decoding="async"
              className="exp-hair aspect-[4/3] w-full rounded-[1.75rem] border object-cover"
            />
          </RevealBlock>

          <div className="flex flex-col items-start gap-6 lg:order-1">
            <SectionHeader eyebrow="Infrastructure" title="Built for quality at scale" />
            <ul className="flex flex-col gap-4">
              {infrastructurePoints.map((point, i) => (
                <RevealBlock key={point} delayMs={i * 80} direction="left" className="flex gap-4">
                  <span className="exp-value text-sm tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="exp-body-lg">{point}</span>
                </RevealBlock>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── Parallax window ─────────────────────────────────────────────── */}
      <section
        className="relative flex min-h-[62vh] items-end bg-cover bg-fixed bg-center py-16"
        style={{ backgroundImage: "url('/about-parallax.webp')" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: "linear-gradient(to bottom, rgba(17,19,24,0.55), rgba(17,19,24,0.82))" } as CSSProperties}
        />
        <div className="container-page relative">
          <RevealBlock className="exp-sec-dark-deep exp-hair max-w-lg rounded-[1.5rem] border p-9">
            <PlateTag className="mb-4">Global Standards</PlateTag>
            <h2 className="exp-display exp-display-md">
              <RevealText text="Built to serve industries everywhere" />
            </h2>
            <p className="exp-body mt-3">
              Engineered to international standards, ready for the demands of any market.
            </p>
          </RevealBlock>
        </div>
      </section>

      {/* ── Why choose us (light) ───────────────────────────────────────── */}
      <section className="exp-sec-light py-24 sm:py-28">
        <div className="container-page flex flex-col gap-14">
          <SectionHeader eyebrow="Differentiators" title="What sets our products apart" align="center" />
          <WhyChooseGrid items={whyChooseUs} />
        </div>
      </section>

      <AppointmentFab />
    </div>
  );
}
