import { IndustryCard } from "@/components/IndustryCard";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { industries } from "@/data/company";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function IndustriesPage() {
  useDocumentMeta(
    "Industries We Serve",
    "N R Industries powers 15+ sectors — from food, paper, and textile manufacturing to solar power plants, refineries, and hydro projects.",
  );

  return (
    <>
      <PageHero
        eyebrow="Industries We Serve"
        title="Powering every sector"
        description="From heavy industry to renewable energy, our transformers and power distribution equipment are built for the demands of each sector we serve."
        backgroundImage="/industries-hero-bg.jpg"
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
    </>
  );
}