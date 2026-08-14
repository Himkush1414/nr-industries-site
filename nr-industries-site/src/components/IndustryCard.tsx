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

interface IndustryCardProps {
  industry: IndustryItem;
}

export function IndustryCard({ industry }: IndustryCardProps) {
  const Icon = ICON_BY_INDUSTRY[industry.name] ?? Landmark;

  return (
    <div className="flex flex-col gap-3 rounded border border-ink-100 bg-white p-5 transition-colors duration-150 hover:border-navy-300">
      <div className="flex h-11 w-11 items-center justify-center rounded bg-navy-950">
        <Icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
      </div>
      <h3 className="font-heading text-base font-bold text-navy-950">{industry.name}</h3>
      <p className="text-sm leading-relaxed text-ink-500">{industry.description}</p>
    </div>
  );
}

/** Compact icon + label chip — used in the condensed Home page industries grid. */
export function IndustryIconChip({ name }: { name: string }) {
  const Icon = ICON_BY_INDUSTRY[name] ?? Landmark;

  return (
    <div className="flex flex-col items-center gap-2.5 rounded border border-ink-100 bg-white px-3 py-5 text-center transition-colors duration-150 hover:border-navy-300">
      <div className="flex h-10 w-10 items-center justify-center rounded bg-navy-950">
        <Icon className="h-4 w-4 text-gold-400" aria-hidden="true" />
      </div>
      <span className="text-xs leading-tight font-semibold text-navy-950">{name}</span>
    </div>
  );
}
