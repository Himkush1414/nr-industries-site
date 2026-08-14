interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "12.5 MVA", label: "Max Transformer Capacity" },
  { value: "33 kV", label: "Max Voltage Class" },
  { value: "9", label: "Product Lines" },
  { value: "15", label: "Industries Served" },
];

export function StatStrip() {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1 ${i > 0 ? "border-white/15 sm:border-l sm:pl-8" : ""}`}
        >
          <dt className="order-2 text-xs font-medium tracking-wide text-navy-100/70 uppercase">
            {stat.label}
          </dt>
          <dd className="order-1 font-heading text-3xl font-bold text-white sm:text-4xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
