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

const ICON_BY_INDUSTRY: Record<string, LucideIcon> = {
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
 * so nothing expensive renders on phone GPUs. Front-style treatment only (no flip on mobile).
 * Desktop (md and up): 3D flip card. Front shows the real industry photo as background with
 * icon+name overlaid; hover/focus flips to reveal the description on a colored back face.
 */
export function IndustryCard({ industry, index = 0 }: IndustryCardProps) {
  const Icon = ICON_BY_INDUSTRY[industry.name] ?? Landmark;
  const accent = getAccent(index);

  return (
    <>
      {/* Mobile: simple static card, photo background if available */}
      <div
        className="relative flex flex-col gap-4 overflow-hidden rounded-lg border border-ink-100 bg-white p-6 md:hidden"
        style={
          industry.imageSrc
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(6,15,31,0.55), rgba(6,15,31,0.85)), url('${industry.imageSrc}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-lg shadow-md ${
            industry.imageSrc ? "bg-white/15 backdrop-blur-sm" : `bg-gradient-to-br ${accent}`
          }`}
        >
          <Icon className="h-6 w-6 text-white" aria-hidden="true" />
        </div>
        <h3
          className={`font-heading text-lg font-bold ${industry.imageSrc ? "text-white" : "text-navy-950"}`}
        >
          {industry.name}
        </h3>
        <p
          className={`text-sm leading-relaxed ${industry.imageSrc ? "text-white/85" : "text-ink-500"}`}
        >
          {industry.description}
        </p>
      </div>

      {/* Desktop: 3D flip card */}
      <div
        className="flip-card-perspective hidden h-56 w-full md:block"
        tabIndex={0}
        role="group"
        aria-label={`${industry.name}: ${industry.description}`}
      >
        <div className="flip-card-inner relative h-full w-full">
          {/* Front — real photo background, icon + name overlaid */}
          <div
            className="flip-card-face relative flex flex-col items-center justify-center gap-4 overflow-hidden rounded-lg border border-ink-100 p-6 text-center"
            style={
              industry.imageSrc
                ? {
                    backgroundImage: `linear-gradient(to bottom, rgba(6,15,31,0.5), rgba(6,15,31,0.8)), url('${industry.imageSrc}')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }
                : { backgroundColor: "white" }
            }
          >
            <div
              className={`flex h-14 w-14 items-center justify-center rounded-lg shadow-md ${
                industry.imageSrc ? "bg-white/15 backdrop-blur-sm" : `bg-gradient-to-br ${accent}`
              }`}
            >
              <Icon className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <h3
              className={`font-heading text-lg font-bold ${industry.imageSrc ? "text-white" : "text-navy-950"}`}
            >
              {industry.name}
            </h3>
            <span
              className={`text-xs font-medium tracking-wide uppercase ${
                industry.imageSrc ? "text-white/70" : "text-ink-300"
              }`}
            >
              Hover to learn more
            </span>
          </div>

          {/* Back — unchanged, colored gradient + description */}
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

/** Compact icon + label chip — used in the condensed Home page industries grid.
 * Background becomes the real industry photo when available; icon + name stay overlaid. */
export function IndustryIconChip({ industry, index = 0 }: { industry: IndustryItem; index?: number }) {
  const Icon = ICON_BY_INDUSTRY[industry.name] ?? Landmark;
  const accent = getAccent(index);

  return (
    <div
      className="group relative flex flex-col items-center gap-2.5 overflow-hidden rounded-lg border border-ink-100 px-3 py-5 text-center transition-all duration-300 hover:-translate-y-0.5 hover:border-transparent hover:shadow-lg hover:shadow-navy-950/10"
      style={
        industry.imageSrc
          ? {
              backgroundImage: `linear-gradient(to bottom, rgba(6,15,31,0.5), rgba(6,15,31,0.8)), url('${industry.imageSrc}')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }
          : { backgroundColor: "white" }
      }
    >
      <div
        className={`flex h-11 w-11 items-center justify-center rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-110 ${
          industry.imageSrc ? "bg-white/15 backdrop-blur-sm" : `bg-gradient-to-br ${accent}`
        }`}
      >
        <Icon className="h-5 w-5 text-white" aria-hidden="true" />
      </div>
      <span
        className={`text-xs leading-tight font-semibold ${industry.imageSrc ? "text-white" : "text-navy-950"}`}
      >
        {industry.name}
      </span>
    </div>
  );
}