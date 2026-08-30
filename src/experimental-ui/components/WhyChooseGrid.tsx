import type { DifferentiatorItem } from "@/types/content";
import { RevealBlock } from "./RevealBlock";
import { PlateTag } from "./Schematic";

/** Index-matched to `whyChooseUs` — same real company photography as the current
 * About page's "What sets our products apart" section. */
const IMAGES = [
  "/why-choose-us/precision-engineering.jpeg",
  "/why-choose-us/international-standards.jpeg",
  "/why-choose-us/after-sales-support.jpeg",
  "/why-choose-us/eco-friendly-manufacturing.jpeg",
];

export function WhyChooseGrid({ items }: { items: DifferentiatorItem[] }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => {
        const image = IMAGES[i];
        return (
          <RevealBlock key={item.title} delayMs={i * 80} distance={28} className="h-full">
            <div className="exp-card flex h-full flex-col overflow-hidden">
              {image && (
                <img
                  src={image}
                  alt={item.title}
                  loading="lazy"
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover"
                />
              )}
              <div className="flex flex-1 flex-col gap-3 p-5">
                <PlateTag>{`REQ. ${String(i + 1).padStart(2, "0")}`}</PlateTag>
                <h3 className="exp-display exp-display-sm">{item.title}</h3>
                <p className="exp-body-sm">{item.description}</p>
              </div>
            </div>
          </RevealBlock>
        );
      })}
    </div>
  );
}
