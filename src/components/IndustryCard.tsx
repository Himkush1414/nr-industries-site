import {
  Beef,
  Building2,
  Factory,
  FlaskConical,
  Fuel,
  Landmark,
  type LucideIcon,
  Pill,
  Recycle,
  Scissors,
  Sprout,
  SunMedium,
  Waves,
  Wheat,
  Wind,
  Zap,
} from "lucide-react";
import type { IndustryItem } from "@/types/content";

export const ICON_BY_INDUSTRY: Record<string, LucideIcon> = {
  "Food Industry": Beef,
  "Paper Industry": Recycle,
  "Plastic Industry": FlaskConical,
  Foundry: Factory,
  "Solar Power Plants": SunMedium,
  "Power Plant": Zap,
  "Water Treatment": Waves,
  Refinery: Fuel,
  "Chemical Industry": FlaskConical,
  "Windmill Power Projects": Wind,
  "Rice Industry": Wheat,
  "Textile Industry": Scissors,
  "Cement Industry": Building2,
  "Pharma Industry": Pill,
  "Hydro Projects": Sprout,
};

const ACCENT_GRADIENTS = [
  "from-navy-700 to-navy-900",
  "from-gold-600 to-gold-500",
  "from-navy-600 to-navy-800",
  "from-navy-800 to-navy-950",
  "from-gold-500 to-gold-600",
] as const;

function getAccent(index: number): string {
  return ACCENT_GRADIENTS[index % ACCENT_GRADIENTS.length]!;
}

interface IndustryCardProps {
  industry: IndustryItem;
  index?: number;
}

/**
 * Mobile (below md): plain static card, description always visible — no 3D transform,
 * so nothing expensive renders on phone GPUs.
 * Desktop (md and up): 3D flip card, front shows icon+name, hover/focus reveals description
 * on a colored back face.
 */
export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const Icon = ICON_BY_INDUSTRY[industry.name] ?? Landmark;
  const accent = getAccent(index);

  return (
    <>
      {/* Mobile: simple static card */}
      <div className="flex flex-col gap-4 rounded-lg border border-ink-100 bg-white p-6 md:hidden">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${accent} shadow-md`}
        >
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h3 className="font-heading text-lg font-bold text-navy-950">{industry.name}</h3>
        <p className="text-sm leading-relaxed text-ink-500">{industry.description}</p>
      </div>

      {/* Desktop: 3D flip card */}
      <div
        className="flip-card-perspective hidden h-56 w-full md:block"
        tabIndex={0}
        role="group"
        aria-label={`${industry.name}: ${industry.description}`}
      >
        <div className="flip-card-inner relative h-full w-full">
          {/* Front */}
          <div className="flip-card-face absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-lg border border-ink-100 bg-white p-6 text-center">
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${accent} shadow-md`}
            >
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h3 className="font-heading text-lg font-bold text-navy-950">{industry.name}</h3>
            <span className="text-xs font-medium tracking-wide text-ink-300 uppercase">
              Hover to learn more
            </span>
          </div>

          {/* Back */}
          <div
            className={`flip-card-face flip-card-back absolute inset-0 flex flex-col items-center justify-center gap-3 rounded-lg bg-gradient-to-br p-6 text-center ${accent} shadow-lg`}
          >
            <Icon className="h-8 w-8 text-white/90" aria-hidden="true" />
            <h3 className="font-heading text-base font-bold text-white">{industry.name}</h3>
            <p className="text-sm leading-relaxed text-white/90">{industry.description}</p>
          </div>
        </div>
      </div>
    </>
  );
}

/** Compact icon + label chip — used in the condensed Home page industries grid (no flip, stays simple for the dense grid). */
export function IndustryIconChip({ name, index = 0 }: { name: string; index?: number }) {
  const Icon = ICON_BY_INDUSTRY[name] ?? Landmark;
  const accent = getAccent(index);

  return (
    <div className="group flex flex-col items-center gap-2.5 rounded-lg border border-ink-100 bg-white px-3 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-navy-950/10">
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg bg-gradient-to-br ${accent} shadow-sm transition-transform duration-300 group-hover:scale-110`}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <span className="text-xs leading-tight font-semibold text-navy-950">{name}</span>
    </div>
  );
}