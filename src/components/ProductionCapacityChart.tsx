import { Factory, Gauge, type LucideIcon, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";

interface CapacityRow {
  rating: string;
  unitsPerAnnum: string;
}

interface ProductionCapacityChartProps {
  rows: CapacityRow[];
}

interface ParsedRow extends CapacityRow {
  units: number;
}

function parseUnits(value: string): number {
  const match = value.replace(/,/g, "").match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function formatNumber(value: number, decimals = 0): string {
  return value.toLocaleString("en-IN", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

/** Eases a number from 0 up to `target` once `active` flips true; jumps straight to the
 * target when the visitor has requested reduced motion. */
function useCountUp(target: number, active: boolean, durationMs = 1400): number {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }

    let frame: number;
    const start = performance.now();

    function tick(now: number) {
      const progress = Math.min((now - start) / durationMs, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(target * eased);
      if (progress < 1) frame = requestAnimationFrame(tick);
    }

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, target, durationMs]);

  return value;
}

function StatTile({
  icon: Icon,
  label,
  value,
  prefix,
  suffix,
  decimals = 0,
  active,
}: {
  icon: LucideIcon;
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  active: boolean;
}) {
  const display = useCountUp(value, active);

  return (
    <div className="flex flex-col gap-1.5">
      <Icon className="h-5 w-5 text-gold-400" aria-hidden="true" />
      <span className="font-heading text-2xl font-bold text-white sm:text-3xl">
        {prefix}
        {formatNumber(display, decimals)}
        {suffix && <span className="ml-1 text-base font-semibold text-navy-100/70">{suffix}</span>}
      </span>
      <span className="text-[11px] font-semibold tracking-[0.1em] text-navy-100/60 uppercase">
        {label}
      </span>
    </div>
  );
}

function CapacityGroup({
  title,
  subtitle,
  rows,
  isInView,
}: {
  title: string;
  subtitle: string;
  rows: ParsedRow[];
  isInView: boolean;
}) {
  const max = Math.max(...rows.map((row) => row.units), 1);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <h4 className="font-heading text-base font-bold text-navy-950">{title}</h4>
        <p className="text-xs font-medium tracking-wide text-ink-300 uppercase">{subtitle}</p>
      </div>
      <div className="flex flex-col gap-4">
        {rows.map((row, i) => (
          <div key={row.rating} className="flex flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-navy-950">{row.rating}</span>
              <span className="text-xs font-medium text-ink-500">{row.unitsPerAnnum}</span>
            </div>
            <div className="h-2.5 w-full overflow-hidden rounded-full bg-navy-50">
              <div
                className="h-full rounded-full bg-gradient-to-r from-navy-700 to-gold-500 transition-[width] duration-1000 ease-out"
                style={{
                  width: isInView ? `${Math.max((row.units / max) * 100, 4)}%` : "0%",
                  transitionDelay: `${i * 90}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Annual production capacity, grouped into the distribution-class and power-class rating
 * bands so units/annum (which spans two orders of magnitude across the range) stays
 * readable — each group's bars are scaled against its own maximum. Bars fill in and the
 * headline stats count up once the section scrolls into view. */
export function ProductionCapacityChart({ rows }: ProductionCapacityChartProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.25);

  const parsed: ParsedRow[] = rows.map((row) => ({ ...row, units: parseUnits(row.unitsPerAnnum) }));
  const distribution = parsed.filter((row) => !row.rating.toUpperCase().includes("MVA"));
  const power = parsed.filter((row) => row.rating.toUpperCase().includes("MVA"));

  return (
    <div ref={ref} className="overflow-hidden rounded-xl border border-ink-100 bg-white shadow-sm">
      <div className="relative overflow-hidden bg-navy-950 px-6 py-8 sm:px-10 sm:py-10">
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-20" aria-hidden="true" />
        <div
          className="pointer-events-none absolute -top-20 -right-16 h-64 w-64 rounded-full bg-gold-400/10 blur-3xl"
          aria-hidden="true"
        />
        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-3">
          <StatTile
            icon={Factory}
            label="Annual Capacity"
            value={5000}
            suffix="+ MVA"
            active={isInView}
          />
          <StatTile
            icon={Zap}
            label="Voltage Class"
            value={66}
            prefix="Up to "
            suffix=" kV"
            active={isInView}
          />
          <StatTile
            icon={Gauge}
            label="Max Rating"
            value={12.5}
            prefix="Up to "
            suffix=" MVA"
            decimals={1}
            active={isInView}
          />
        </div>
      </div>

      <div className="grid gap-10 p-6 sm:p-10 lg:grid-cols-2 lg:gap-12">
        <CapacityGroup
          title="Distribution Range"
          subtitle="25 kVA – 630 kVA"
          rows={distribution}
          isInView={isInView}
        />
        <CapacityGroup title="Power Range" subtitle="3.15 MVA – 10 MVA" rows={power} isInView={isInView} />
      </div>
    </div>
  );
}
