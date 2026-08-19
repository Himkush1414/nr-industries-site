import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface CapacityRow {
  rating: string;
  unitsPerAnnum: string;
}

interface ProductionCapacityChartProps {
  rows: CapacityRow[];
}

/** LAYOUT PREVIEW ONLY. Values are a proportional index (0–100), not currency or
 * real units — placeholder shape to preview bar grouping and growth curve only.
 * Must be replaced with confirmed real figures before this is shown to any visitor. */
const YEARS = Array.from({ length: 15 }, (_, i) => 2026 - 14 + i);

const LAYOUT_PREVIEW_DATA = YEARS.map((year, i) => {
  const t = i / (YEARS.length - 1);
  const eased = t < 0.65 ? t * 0.5 : 0.325 + (t - 0.65) * 1.93;
  const base = Math.round(8 + eased * 88);
  return {
    year: String(year),
    production: base,
    requirement: Math.round(base * 0.97),
    sales: Math.round(base * 0.86),
  };
});

/** rows is accepted for API compatibility with callers but unused here — this
 * component currently renders the layout-preview chart only. */
export function ProductionCapacityChart({ rows: _rows }: ProductionCapacityChartProps) {
  return (
    <div className="overflow-hidden rounded border border-ink-100 bg-white">
      <div className="border-b border-ink-100 bg-navy-950 px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-white">Layout Preview — Sample Structure Only</h3>
        <p className="mt-1 text-sm text-navy-100/75">
          Index values (0–100), not currency or real units. Grouped bars: Production / Requirement /
          Sales, per year.
        </p>
      </div>
      <div className="h-[440px] w-full p-4 sm:p-6">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={LAYOUT_PREVIEW_DATA} margin={{ top: 16, right: 12, left: 0, bottom: 8 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8ebee" />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: "#475569" }}
              tickLine={false}
              axisLine={{ stroke: "#e8ebee" }}
            />
            <YAxis
              domain={[0, 105]}
              tick={{ fontSize: 12, fill: "#475569" }}
              tickLine={false}
              axisLine={false}
              width={40}
            />
            <Tooltip cursor={{ fill: "rgba(10,26,47,0.04)" }} />
            <Legend
              formatter={(value) => (
                <span className="text-xs font-medium text-ink-700">{value}</span>
              )}
            />
            <Bar dataKey="production" name="Production (index)" fill="#1e3a5f" radius={[3, 3, 0, 0]} />
            <Bar dataKey="requirement" name="Requirement (index)" fill="#d4af37" radius={[3, 3, 0, 0]} />
            <Bar dataKey="sales" name="Sales (index)" fill="#2f855a" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="border-t border-ink-100 bg-navy-50 px-6 py-3">
        <p className="text-xs font-medium text-ink-500">
          Structural preview — values are an index (0–100), not real currency, units, or profit
          figures. Replace with confirmed data before this is shown to any visitor.
        </p>
      </div>
    </div>
  );
}