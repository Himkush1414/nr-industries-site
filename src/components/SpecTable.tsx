interface SpecTableProps {
  title: string;
  columnLabels: [string, string];
  rows: { label: string; value: string }[];
  caption?: string;
}

/** Dense, scannable key/value table — used for Technical Specifications and Production Capacity. */
export function SpecTable({ title, columnLabels, rows, caption }: SpecTableProps) {
  return (
    <div className="overflow-hidden rounded border border-ink-100 bg-white">
      <div className="border-b border-ink-100 bg-navy-950 px-6 py-4">
        <h3 className="font-heading text-lg font-bold text-white">{title}</h3>
        {caption && <p className="mt-1 text-sm text-navy-100/75">{caption}</p>}
      </div>
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{title}</caption>
        <thead>
          <tr className="border-b border-ink-100 bg-navy-50">
            <th scope="col" className="px-6 py-3 font-semibold text-ink-700">
              {columnLabels[0]}
            </th>
            <th scope="col" className="px-6 py-3 font-semibold text-ink-700">
              {columnLabels[1]}
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.label}
              className={`border-b border-ink-100 last:border-0 ${i % 2 === 1 ? "bg-navy-50/50" : ""}`}
            >
              <td className="px-6 py-3 font-medium text-navy-950">{row.label}</td>
              <td className="px-6 py-3 text-ink-500">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
