import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { aboutFull, infrastructurePoints, visionStatement, whyChooseUs } from "@/data/company";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

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
          <Reveal className="flex flex-col gap-4">
            <SectionHeading eyebrow="Who We Are" title="N R Industries" as="h2" />
            {aboutFull.map((paragraph) => (
              <p key={paragraph} className="text-base leading-relaxed text-ink-500">
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
          <Reveal className="flex flex-col gap-5 lg:order-1">
            <SectionHeading eyebrow="Infrastructure" title="Built for quality at scale" as="h2" />
            <ul className="flex flex-col gap-3">
              {infrastructurePoints.map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-600" aria-hidden="true" />
                  <span className="text-base leading-relaxed text-ink-500">{point}</span>
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
              <Reveal key={item.title} delayMs={i * 60}>
                <div className="flex h-full flex-col gap-3 rounded border border-ink-100 bg-white p-6">
                  <span className="font-heading text-sm font-bold text-gold-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-heading text-base font-bold text-navy-950">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-500">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}