interface Stat {
  value: string;
  label: string;
}

const stats: Stat[] = [
  { value: "12.5 MVA", label: "Max Transformer Capacity" },
  { value: "66 kV", label: "Max Voltage Class" },
  { value: "15+", label: "Years of Industry Experience" },
  { value: "500+", label: "Industries Trusting Us" },
]; 

export function StatStrip() {
  return (
    <dl className="grid grid-cols-2 gap-x-6 gap-y-8 rounded-lg border border-white/10 bg-white/[0.03] px-6 py-7 backdrop-blur-sm sm:grid-cols-4 sm:gap-8 sm:px-8">
      {stats.map((stat, i) => (
        <div
          key={stat.label}
          className={`flex flex-col gap-1.5 ${i > 0 ? "border-white/10 sm:border-l sm:pl-8" : ""}`}
        >
          <dt className="order-2 text-[11px] font-semibold tracking-[0.12em] text-navy-100/60 uppercase">
            {stat.label}
          </dt>
          <dd className="order-1 font-heading text-3xl font-bold text-gold-400 sm:text-4xl">
            {stat.value}
          </dd>
        </div>
      ))}
    </dl>
  );
}