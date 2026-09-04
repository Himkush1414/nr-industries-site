import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificationMarquee } from "@/components/CertificationMarquee";
import { ProductMarquee } from "@/components/ProductMarquee";
import { AmbientFlowBackground } from "@/components/AmbientFlowBackground";
import { CertificationStrip } from "@/components/CertificationStrip";
import { ClientMarquee } from "@/components/ClientMarquee";
import { FeatureRow } from "@/components/FeatureRow";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeAboutSection } from "@/components/HomeAboutSection";
import { IndustryIconChip } from "@/components/IndustryCard";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatStrip } from "@/components/StatStrip";
import { industries, whyChooseUs } from "@/data/company";
import { products } from "@/data/products";

/**
 * Lab V1 — archived reference copy of the real production homepage, exactly
 * as it looked before it was replaced by Lab V5's design (see the "PRODUCTION
 * ROUTING CHANGE" task). Same pattern as every other lab: its own folder, its
 * own /lab/v1 route (not linked in the live nav), rendered outside <Layout>.
 *
 * This is a preservation snapshot, not a redesign — so unlike V2/V3/V4/V5 it
 * does not clone its own nav/footer. It imports the real Header and Footer
 * components directly (unmodified), because that's what makes it a faithful,
 * pixel-identical copy of what was live rather than a diverging clone (the
 * exact problem the routing-change task called out and had fix for V5's own
 * nav). The section content below is copied verbatim from the former
 * src/pages/HomePage.tsx — not altered while relocating it.
 *
 * Deliberately excluded, matching every other lab's convention: Layout.tsx's
 * shared-only extras (OrganizationSchema JSON-LD, the fixed brand watermark,
 * ScrollToTop, the site-wide AppointmentFab, page <title>/meta via
 * useDocumentMeta). Those are shared-layout/production concerns that
 * shouldn't be duplicated onto an archived lab page that was never meant to
 * be indexed — see the routing-change task's own "don't duplicate shared
 * layout" instruction.
 */
export function ExperimentalV1HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden bg-navy-950 sm:min-h-[72vh] lg:min-h-[calc(92vh-70px)]">
          <img
            src="/hero-home.webp"
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
            fetchPriority="high"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90"
            aria-hidden="true"
          />
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

          <div className="container-page relative flex flex-col gap-10 py-16 sm:py-20 lg:py-24">
            <Reveal className="flex max-w-3xl flex-col gap-6">
              <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase">
                <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
                Power &amp; Distribution Equipment Manufacturer
              </span>
              <h1 className="font-heading text-5xl font-bold tracking-tight text-white">
                <span className="uppercase">N R</span>{" "}
                <span className="text-gold-400 uppercase">Industries</span>
              </h1>
              <p className="font-heading text-xl font-semibold text-gold-400">
                Power at Best
              </p>
              <p className="max-w-2xl text-base leading-relaxed text-navy-100/85">
                Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
                Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
                and utility-scale power distribution.
              </p>
              <div className="flex flex-wrap items-center gap-5 pt-2">
                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-4 text-sm font-semibold tracking-wide text-navy-950 shadow-lg shadow-gold-900/20 transition-all duration-150 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  View Our Products
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-150 hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                >
                  Contact Us
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </Link>
              </div>
            </Reveal>

            <Reveal delayMs={150}>
              <StatStrip />
            </Reveal>
          </div>
        </section>

        <CertificationMarquee />
        <ProductMarquee />

        {/* About teaser */}
        <HomeAboutSection />

        {/* Products */}
        <section className="bg-navy-50 py-16 sm:py-20">
          {/* Intro band only — ambient flow background stops here, not behind
              the product cards below. */}
          <div className="relative mb-10 overflow-hidden bg-navy-900 py-16 sm:mb-14 sm:py-20">
            <AmbientFlowBackground />
            <div className="container-page relative z-10">
              <Reveal>
                <SectionHeading
                  eyebrow="Our Products"
                  title="A complete range of power equipment"
                  subtitle="From power plants to precision electronics, engineered products for every stage of the distribution network."
                  align="center"
                  light
                />
              </Reveal>
            </div>
          </div>
          <div className="container-page">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product, i) => (
                <Reveal key={product.slug} delayMs={i * 40} className="h-full">
                  <ProductCard product={product} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why choose us — alternating feature rows */}
        <section id="why-choose-us" className="py-16 sm:py-20">
          {/* Intro band only — ambient flow background stops here, not behind
              the rows below (each row has its own separate scroll-linked wipe). */}
          <div className="relative mb-10 overflow-hidden bg-navy-900 py-16 sm:mb-14 sm:py-20">
            <AmbientFlowBackground />
            <div className="container-page relative z-10">
              <Reveal>
                <SectionHeading
                  eyebrow="Why Choose Us"
                  title="Engineered for performance and longevity"
                  align="center"
                  subtitle="Every transformer is engineered to the load, voltage, and environmental demands of its site — validated through in-house testing, not a generic spec sheet. It's the standard trusted by power plants, refineries, and utility networks across India, backed by our team long after installation."
                  light
                />
              </Reveal>
            </div>
          </div>
          <div className="container-page flex flex-col gap-14 sm:gap-16">
            {whyChooseUs.map((item, i) => (
              <FeatureRow
                key={item.title}
                title={item.title}
                description={item.description}
                imageLabel={item.title}
                imageSrc={item.imageSrc}
                reverse={i % 2 === 1}
              />
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="relative mb-6 overflow-hidden bg-navy-900 py-16 sm:mb-8 sm:py-20">
          <AmbientFlowBackground />
          <div className="container-page relative z-10 flex flex-col gap-8">
            <Reveal>
              <SectionHeading eyebrow="Certifications" title="Built to recognized standards" align="center" light />
            </Reveal>
            <Reveal>
              <CertificationStrip light />
            </Reveal>
          </div>
        </section>

        {/* Clients */}
        <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
          <AmbientFlowBackground />
          <div className="container-page relative z-10 flex flex-col gap-10">
            <Reveal>
              <SectionHeading
                eyebrow="Trusted By"
                title="Clients across industries"
                subtitle="From energy majors to national utilities, our equipment runs behind the scenes for organizations across sectors."
                align="center"
                light
              />
            </Reveal>
            <Reveal>
              <ClientMarquee />
            </Reveal>
          </div>
        </section>

        {/* Industries */}
        <section className="relative overflow-hidden bg-navy-50 py-16 sm:py-20">
          <div className="container-page relative flex flex-col gap-8">
            <Reveal>
              <SectionHeading eyebrow="Industries We Serve" title="Powering every sector" align="center" />
            </Reveal>
            <Reveal>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                {industries.map((industry, i) => (
                  <IndustryIconChip key={industry.name} industry={industry} index={i} />
                ))}
              </div>
            </Reveal>
            <Reveal className="flex justify-center">
              <Link
                to="/industries"
                className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600"
              >
                View All Industries
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
