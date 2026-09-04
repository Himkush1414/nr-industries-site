import { BulgeCard } from "@/experimental-ui-v3/components/BulgeCard";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";

/** Real industry photography, same data set as the live Industries page. */
const GALLERY = [
  { image: "/industries/power-plant.webp", label: "Power Plants" },
  { image: "/industries/refinery.webp", label: "Refineries" },
  { image: "/industries/solar-power-plants.webp", label: "Solar Power Plants" },
  { image: "/industries/textile-industry.webp", label: "Textile Industry" },
  { image: "/industries/paper-industry.webp", label: "Paper Industry" },
  { image: "/industries/cement-industry.webp", label: "Cement Industry" },
];

export function ShowcaseGallery() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">Where We Work</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Equipment running across <em className="v3-accent-text italic">every</em> sector
          </h2>
        </GsapReveal>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {GALLERY.map((item, i) => (
            <GsapReveal key={item.label} delay={i * 0.05}>
              <BulgeCard image={item.image} label={item.label} />
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
