import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CertificationMarquee } from "@/components/CertificationMarquee";
import { ProductMarquee } from "@/components/ProductMarquee";
import { CertificationStrip } from "@/components/CertificationStrip";
import { ClientMarquee } from "@/components/ClientMarquee";
import { FeatureRow } from "@/components/FeatureRow";
import { HomeAboutSection } from "@/components/HomeAboutSection";
import { IndustryIconChip } from "@/components/IndustryCard";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { StatStrip } from "@/components/StatStrip";
import { COMPANY_NAME } from "@/config/contact";
import { industries, whyChooseUs } from "@/data/company";
import { products } from "@/data/products";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function HomePage() {
  useDocumentMeta(
    "N R Industries",
    "N R Industries manufactures Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations and HT & LT Panels from Himachal Pradesh, India.",
  );

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[calc(92vh-70px)] flex-col justify-center overflow-hidden bg-navy-950">
          <img
            src="/hero-home.jpg"
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

        <div className="container-page relative flex flex-col gap-10 py-24">
          <div className="flex max-w-3xl flex-col gap-6">
            <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase">
              <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
              Power &amp; Distribution Equipment Manufacturer
            </span>
            <h1 className="font-heading text-5xl font-bold tracking-tight text-white uppercase sm:text-6xl lg:text-7xl">
              {COMPANY_NAME}
            </h1>
            <p className="font-heading text-xl font-semibold text-gold-400 sm:text-2xl">
              Power at Best
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-navy-100/85 sm:text-lg">
              Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
              Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
              and utility-scale power distribution.
            </p>
            <div className="flex flex-wrap gap-4 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded bg-gold-500 px-6 py-3.5 text-sm font-semibold tracking-wide text-navy-950 transition-colors duration-150 hover:bg-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Our Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded border border-white/35 px-6 py-3.5 text-sm font-semibold tracking-wide text-white transition-colors duration-150 hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
              </Link>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8">
            <StatStrip />
          </div>
        </div>
      </section>

      <CertificationMarquee />
      <ProductMarquee />

      {/* About teaser */}
      <HomeAboutSection />

      {/* Products */}
      <section className="bg-navy-50 py-20 sm:py-24">
        <div className="container-page flex flex-col gap-12">
          <Reveal>
            <SectionHeading
              eyebrow="Our Products"
              title="A complete range of power equipment"
              subtitle="From power plants to precision electronics, engineered products for every stage of the distribution network."
              align="center"
            />
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={i * 40}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us — alternating feature rows */}
      <section className="py-20 sm:py-24">
        <div className="container-page flex flex-col gap-8">
          <Reveal>
            <SectionHeading
              eyebrow="Why Choose Us"
              title="Engineered for performance and longevity"
              align="center"
              subtitle="Every product is built to hold up under real operating conditions, backed by a team that stays involved after the sale."
            />
          </Reveal>
          <div className="flex flex-col gap-16 pt-6 sm:gap-20">
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
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Certifications" title="Built to recognized standards" align="center" />
          </Reveal>
          <Reveal>
            <CertificationStrip />
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Trusted By" title="Clients across industries" align="center" />
          </Reveal>
          <Reveal>
            <ClientMarquee />
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="bg-navy-50 py-16 sm:py-20">
        <div className="container-page flex flex-col gap-8">
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
    </>
  );
}