import type { DifferentiatorItem } from "@/types/content";
import { RevealBlock } from "./RevealBlock";

/** Index-matched to the `whyChooseUs` data — same four real photos the About
 * page's "What sets our products apart" section uses. */
const IMAGES = [
  "/why-choose-us/precision-engineering.jpeg",
  "/why-choose-us/international-standards.jpeg",
  "/why-choose-us/after-sales-support.jpeg",
  "/why-choose-us/eco-friendly-manufacturing.jpeg",
];

/** Fresh short headlines shown over each image (the title/description below the
 * card come straight from the real `whyChooseUs` data). */
const OVERLAYS = [
  "Engineered to the load",
  "Tested to global norms",
  "Support that stays on",
  "Cleaner by design",
];

export function HighlightRow({ items }: { items: DifferentiatorItem[] }) {
  return (
    <div className="grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
      {items.slice(0, 4).map((item, i) => (
        <RevealBlock key={item.title} delayMs={i * 90} distance={28} className="flex flex-col gap-4">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem]">
            <img
              src={IMAGES[i]}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
            <div className="exp-card-scrim pointer-events-none absolute inset-0" />
            <h3 className="absolute inset-x-0 bottom-0 p-5 font-heading text-[1.35rem] leading-tight font-bold text-white">
              {OVERLAYS[i]}
            </h3>
          </div>
          <div className="flex flex-col gap-1.5">
            <p className="exp-display exp-display-sm">{item.title}</p>
            <p className="exp-body-sm">{item.description}</p>
          </div>
        </RevealBlock>
      ))}
    </div>
  );
}
