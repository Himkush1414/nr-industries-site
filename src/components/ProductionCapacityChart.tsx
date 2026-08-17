interface CapacityRow {
    rating: string;
    unitsPerAnnum: string;
  }
  
  interface ProductionCapacityChartProps {
    rows: CapacityRow[];
  }
  
  /** Parses "11,440 units/annum" into a raw number for bar-width scaling. */
  function parseUnits(value: string): number {
    const match = value.match(/[\d,]+/);
    return match ? Number(match[0].replace(/,/g, "")) : 0;
  }
  
  /** Horizontal bar chart — makes the scale relationship (small units built in volume,
   * large units built in small runs) immediately visible, which a plain table doesn't convey. */
  export function ProductionCapacityChart({ rows }: ProductionCapacityChartProps) {
    const maxUnits = Math.max(...rows.map((row) => parseUnits(row.unitsPerAnnum)));
  
    return (
      <div className="overflow-hidden rounded border border-ink-100 bg-white">
        <div className="border-b border-ink-100 bg-navy-950 px-6 py-4">
          <h3 className="font-heading text-lg font-bold text-white">Production Capacity</h3>
          <p className="mt-1 text-sm text-navy-100/75">Annual output by transformer rating</p>
        </div>
        <div className="flex flex-col gap-5 p-6">
          {rows.map((row, i) => {
            const units = parseUnits(row.unitsPerAnnum);
            const widthPercent = maxUnits > 0 ? Math.max((units / maxUnits) * 100, 3) : 0;
  
            return (
              <div key={row.rating} className="flex items-center gap-4">
                <span className="w-20 shrink-0 text-right text-sm font-semibold text-navy-950">
                  {row.rating}
                </span>
                <div className="relative h-8 flex-1 overflow-hidden rounded bg-navy-50">
                  <div
                    className="animate-fade-up h-full rounded bg-gradient-to-r from-navy-700 to-navy-500"
                    style={{
                      width: `${widthPercent}%`,
                      animationDelay: `${i * 80}ms`,
                    }}
                  />
                </div>
                <span className="w-32 shrink-0 text-sm font-medium text-ink-500">
                  {row.unitsPerAnnum}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }