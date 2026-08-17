import {
  Activity,
  Gauge,
  Layers,
  type LucideIcon,
  Repeat,
  Ruler,
  Settings2,
  Thermometer,
  Wrench,
  Zap,
} from "lucide-react";

interface SpecTableProps {
  title: string;
  columnLabels: [string, string];
  rows: { label: string; value: string }[];
  caption?: string;
}

const ICON_BY_LABEL: Record<string, LucideIcon> = {
  Rating: Gauge,
  Phase: Zap,
  "Vector Group": Layers,
  Cooling: Thermometer,
  Frequency: Activity,
  "Winding Material": Ruler,
  "Tapping Range": Settings2,
  "Temperature Rise": Thermometer,
  Losses: Zap,
  "Fitting & Accessories": Wrench,
  "Tap Changer": Repeat,
  "Voltage Class": Zap,
};

/** Dense, scannable key/value grid — used for Technical Specifications and Production Capacity. */
export function SpecTable({ title, columnLabels, rows, caption }: SpecTableProps) {
  return (
    <div className="overflow-hidden rounded border border-ink-100 bg-white">
      <div className="border-b border-ink-100 bg-navy-950 px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
        {caption && <p className="mt-1 text-sm text-navy-100/75">{caption}</p>}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2">
        {rows.map((row, i) => {
          const Icon = ICON_BY_LABEL[row.label] ?? Settings2;
          return (
            <div
              key={row.label}
              className={`flex items-start gap-3 border-b border-ink-100 px-6 py-4 transition-colors duration-150 hover:bg-navy-50/60 sm:border-r sm:[&:nth-child(2n)]:border-r-0 ${
                i === rows.length - 1 || i === rows.length - 2 ? "sm:border-b-0" : ""
              }`}
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded bg-navy-50">
                <Icon className="h-4 w-4 text-navy-600" aria-hidden="true" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-xs font-semibold tracking-wide text-ink-500 uppercase">
                  {row.label}
                </span>
                <span className="text-sm font-medium text-navy-950">{row.value}</span>
              </div>
            </div>
          );
        })}
      </div>
      <span className="sr-only">{columnLabels.join(", ")}</span>
    </div>
  );
}