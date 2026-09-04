import { Reveal } from "@/components/Reveal";

/**
 * Same four figures as the live site's StatStrip, restructured into the
 * reference's two-row treatment: a category label + short description on
 * top, a bold figure + the original descriptive caption underneath.
 */
const STATS = [
  {
    label: "Capacity",
    description: "Built for heavy industrial and utility-scale loads.",
    value: "12.5 MVA",
    caption: "Max Transformer Capacity",
  },
  {
    label: "Voltage",
    description: "Engineered across the full distribution voltage range.",
    value: "66 kV",
    caption: "Max Voltage Class",
  },
  {
    label: "Experience",
    description: "Decades of manufacturing and in-house testing.",
    value: "15+",
    caption: "Years of Industry Experience",
  },
  {
    label: "Reach",
    description: "Trusted across energy, industry, and infrastructure.",
    value: "500+",
    caption: "Industries Trusting Us",
  },
];

export function StatsStrip() {
  return (
    <section className="v2-surface py-4">
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`v2-border flex flex-col gap-6 ${i > 0 ? "sm:border-l sm:pl-8" : ""}`}
              >
                <div className="flex flex-col gap-1.5">
                  <dt className="v2-fg text-sm font-semibold">{stat.label}</dt>
                  <p className="v2-fg-dim text-sm leading-relaxed">{stat.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <dd className="font-heading v2-accent-text text-3xl font-bold">{stat.value}</dd>
                  <p className="v2-fg-faint text-xs font-semibold tracking-wide uppercase">{stat.caption}</p>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
