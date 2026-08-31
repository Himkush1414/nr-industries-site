import { Link } from "react-router-dom";
import { IndustryCard } from "@/components/IndustryCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { industries } from "@/data/company";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function IndustriesPage() {
  useDocumentMeta(PAGE_META.industries.title, PAGE_META.industries.description);

  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Powering every sector"
        description="From heavy industry to renewable energy, our transformers and power distribution equipment are built for the demands of each sector we serve."
        backgroundImage="/industries-hero-bg.webp"
        tickerItems={industries.map((industry) => industry.name)}
        tickerLabel="Industries we serve"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {industries.map((industry, i) => (
            <Reveal key={industry.name} delayMs={i * 30}>
              <IndustryCard industry={industry} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-100 bg-navy-50 py-14">
        <Reveal className="container-page flex flex-col items-center gap-3 text-center">
          <h2 className="font-heading text-xl font-bold text-navy-950">
            See the equipment built for these industries
          </h2>
          <p className="max-w-xl text-sm text-ink-500">
            Transformers, compact substations, servo voltage stabilizers, and HT &amp; LT panels —
            engineered to the load each sector demands.
          </p>
          <Link
            to="/products"
            className="mt-1 text-sm font-semibold text-navy-700 hover:text-gold-600"
          >
            Browse our products →
          </Link>
        </Reveal>
      </section>
    </>
  );
}