import { PageHero } from "@/components/PageHero";
import { ProductionCapacityChart } from "@/components/ProductionCapacityChart";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { SpecTable } from "@/components/SpecTable";
import { productionCapacity, technicalSpecs } from "@/data/specifications";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function SpecificationsPage() {
  useDocumentMeta(
    "Technical Specifications",
    "Technical specifications and annual production capacity for N R Industries' transformer range — rating, cooling, vector group, tap changer, and more.",
  );

  return (
    <>
           <PageHero
        eyebrow="Technical Specifications"
        title="Specifications & production capacity"
        description="Standard technical parameters across our transformer range, along with annual production capacity by rating."
        backgroundImage="/products/all-products-bg.jpg"
        tickerItems={[
          ...technicalSpecs.map((spec) => `${spec.label}: ${spec.value}`),
          ...productionCapacity.map((row) => `${row.rating} — ${row.unitsPerAnnum}`),
        ]}
        tickerLabel="Technical specifications"
      />

      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-16">
          <Reveal>
            <SectionHeading eyebrow="Standard Parameters" title="Technical Specifications" as="h2" />
            <div className="mt-6">
              <SpecTable
                title="Technical Specifications"
                columnLabels={["Parameter", "Specification"]}
                rows={technicalSpecs}
              />
            </div>
          </Reveal>

          <Reveal>
            <SectionHeading
              eyebrow="Manufacturing Scale"
              title="Production Capacity"
              subtitle="Annual production capacity by transformer rating."
              as="h2"
            />
            <div className="mt-6">
              <ProductionCapacityChart rows={productionCapacity} />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}