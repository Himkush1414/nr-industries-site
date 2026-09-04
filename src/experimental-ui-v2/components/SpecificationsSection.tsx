import { ArrowRight, BarChart3, Settings2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { productionCapacity, technicalSpecs } from "@/data/specifications";
import { HalftonePhoto } from "@/experimental-ui-v2/components/HalftonePhoto";

/** A single static (non-cycling) halftone photo anchors this section visually — deliberately
 * not rotating, unlike Hero/ClosingCta, so this section reads as its own distinct moment
 * rather than a third instance of the same rotating motif. */
const SPEC_PHOTO = [{ src: "/products/power-transformers-main.webp", alt: "N R Industries power transformer" }];

function DataBlock({
  icon: Icon,
  title,
  rows,
}: {
  icon: typeof Settings2;
  title: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="v2-card overflow-hidden">
      <div className="v2-border flex items-center gap-3 border-b px-6 py-5">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
          style={{ backgroundColor: "var(--v2-accent-soft)" }}
        >
          <Icon className="v2-accent-text h-4 w-4" aria-hidden="true" />
        </span>
        <h3 className="font-heading v2-fg text-lg font-bold">{title}</h3>
      </div>
      <dl>
        {rows.map((row, i) => (
          <div
            key={row.label}
            className={`v2-border flex items-center justify-between gap-6 px-6 py-4 text-sm ${
              i > 0 ? "border-t" : ""
            }`}
          >
            <dt className="v2-fg-dim font-medium">{row.label}</dt>
            <dd className="v2-fg text-right font-semibold">{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

/** Real spec + production-capacity data, same source the live Specifications page uses. */
export function SpecificationsSection() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page flex flex-col gap-14">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v2-accent-text text-xs font-semibold tracking-[0.22em] uppercase">
            Specifications
          </span>
          <h2 className="font-heading v2-fg text-4xl font-bold tracking-tight sm:text-5xl">
            Engineered to exacting standards
          </h2>
          <p className="v2-fg-dim text-base leading-relaxed">
            Technical specifications and annual production capacity for our transformer range.
          </p>
        </Reveal>

        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-16">
          <Reveal className="lg:sticky lg:top-24">
            <HalftonePhoto images={SPEC_PHOTO} className="aspect-[4/5] w-full" />
          </Reveal>

          <Reveal delayMs={120} className="flex flex-col gap-8">
            <DataBlock icon={Settings2} title="Technical Specifications" rows={technicalSpecs} />
            <DataBlock
              icon={BarChart3}
              title="Annual Production Capacity"
              rows={productionCapacity.map((row) => ({ label: row.rating, value: row.unitsPerAnnum }))}
            />
          </Reveal>
        </div>

        <Reveal className="flex justify-center">
          <Link to="/specifications" className="v2-btn v2-btn-outline">
            Full Specifications
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
