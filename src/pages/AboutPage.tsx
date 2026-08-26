import { Globe2, Headset, Leaf, Target } from "lucide-react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutFull, infrastructurePoints, visionStatement, whyChooseUs } from "@/data/company";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useInView } from "@/hooks/useInView";

const WHY_CHOOSE_ICONS = [Target, Globe2, Headset, Leaf];

/** Index-matched to `whyChooseUs` (Precision Engineering, International Standards,
 * Expert Engineering & After-Sales Support, Eco-Friendly Manufacturing). */
const WHY_CHOOSE_IMAGES = [
  "/why-choose-us/precision-engineering.jpeg",
  "/why-choose-us/international-standards.jpeg",
  "/why-choose-us/after-sales-support.jpeg",
  "/why-choose-us/eco-friendly-manufacturing.jpeg",
];

/** Uniform tile: all four cards share the same image height, padding, and type
 * scale, so no card can end up taller or with a smaller image than its siblings
 * regardless of grid position or its source photo's natural proportions. */
function WhyChooseTile({
  index,
  title,
  description,
}: {
  index: number;
  title: string;
  description: string;
}) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.2);
  const Icon = WHY_CHOOSE_ICONS[index] ?? Target;
  const image = WHY_CHOOSE_IMAGES[index];

  return (
    <div
      ref={ref}
      style={{ transitionDelay: isInView ? `${index * 100}ms` : "0ms" }}
      className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border border-ink-100 bg-navy-400/25 shadow-sm transition-all duration-700 ease-out hover:-translate-y-1 hover:border-gold-400 hover:shadow-xl hover:shadow-navy-900/10 ${
        isInView
          ? "translate-y-0 scale-100 opacity-100"
          : "translate-y-8 scale-95 opacity-0 motion-reduce:translate-y-0 motion-reduce:scale-100 motion-reduce:opacity-100"
      }`}
    >
      {image && (
        <div className="shrink-0 overflow-hidden">
          <ImagePlaceholder
            label={title}
            aspectRatio="video"
            src={image}
            className="h-56 transition-transform duration-500 group-hover:scale-105 sm:h-64"
          />
        </div>
      )}
      <div className="relative flex flex-1 flex-col gap-6 p-6">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-3 -right-1 text-6xl leading-none font-heading font-black text-gold-500/20 select-none"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-700 transition-transform duration-500 group-hover:scale-105">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="relative flex flex-col gap-2">
          <h3 className="font-heading text-base font-bold text-navy-950">{title}</h3>
          <p className="text-sm leading-relaxed text-ink-500">{description}</p>
        </div>
      </div>
    </div>
  );
}

export function AboutPage() {
  useDocumentMeta(
    "About Us",
    "Learn about N R Industries — our vision, infrastructure, and why industrial and commercial clients across India choose our power distribution equipment.",
  );

  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Decades of experience in power distribution"
        description="Manufacturer of high-performance transformers and power distribution equipment, built for reliability across small installations and large industrial projects alike."
        backgroundImage="/hero-factory.webp"
        tickerItems={[
          ...infrastructurePoints,
          ...whyChooseUs.map((item) => item.title),
        ]}
        tickerLabel="About N R Industries"
      />

      {/* About */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImagePlaceholder
              label="N R Industries manufacturing facility"
              aspectRatio="video"
              className="rounded"
              src="/about-2.webp"
            />
          </Reveal>
          <Reveal className="flex flex-col gap-4 rounded-2xl border border-gold-100 bg-gradient-to-br from-gold-100/60 via-navy-50/40 to-navy-100/40 p-8 shadow-[0_16px_40px_-24px_rgba(11,31,58,0.2)] backdrop-blur-sm sm:p-10">
            <SectionHeading eyebrow="Who We Are" title="N R Industries" as="h2" />
            {aboutFull.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink-700">
                {paragraph}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-navy-950 py-20 sm:py-24">
        <div className="container-page">
          <Reveal className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
            <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
              <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
              Our Vision
            </span>
            <p className="font-heading text-2xl leading-snug font-semibold text-white">
              {visionStatement}
            </p>
          </Reveal>
        </div>
      </section>

      {/* Infrastructure */}
      <section className="py-20 sm:py-24">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="lg:order-2">
            <ImagePlaceholder
              label="Manufacturing infrastructure & testing facility"
              aspectRatio="video"
              className="rounded"
              src="/products/dry-type-transformer-bg.webp"
            />
          </Reveal>
          <Reveal className="flex flex-col gap-5 rounded-2xl border border-gold-100 bg-gradient-to-br from-gold-100/60 via-navy-50/40 to-navy-100/40 p-8 shadow-[0_16px_40px_-24px_rgba(11,31,58,0.2)] backdrop-blur-sm sm:p-10 lg:order-1">
            <SectionHeading eyebrow="Infrastructure" title="Built for quality at scale" as="h2" />
            <ul className="flex flex-col gap-3">
              {infrastructurePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                  <span className="text-base leading-relaxed text-ink-700">{point}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Parallax window — this section is a transparent cutout revealing a fixed background photo pinned behind the whole page, independent of the sections above/below it. (Note: background-attachment: fixed doesn't work on iOS Safari; it degrades to a normal scrolling image there.) */}
      <section
        className="relative mt-[110px] flex h-[70vh] min-h-[420px] items-end bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('/about-parallax.webp')" }}
      >
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/60 via-navy-950/40 to-navy-950/70"
          aria-hidden="true"
        />
        <div className="container-page relative w-full pb-0">
          <div className="max-w-lg -mb-16 rounded bg-navy-950 p-10 shadow-xl">
            <SectionHeading
              eyebrow="Global Standards"
              title="Built to serve industries everywhere"
              subtitle="Engineered to international standards, ready for the demands of any market."
              light
            />
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="container-page flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="What sets our products apart"
              align="center"
              as="h2"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyChooseUs.map((item, i) => (
              <WhyChooseTile key={item.title} index={i} title={item.title} description={item.description} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}