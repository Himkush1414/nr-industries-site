import { Reveal } from "@/components/Reveal";

/**
 * Fix (round: hero animation + stats restyle task, Task 2): the homepage's
 * stat block used to be <StatStrip/> (src/components/StatStrip.tsx) — a
 * compact, semi-transparent glassmorphic card overlaid directly on the hero
 * photo. This restyles it to match src/experimental-ui-v2/components/
 * StatsStrip.tsx's actual layout/typography/spacing/animation (read
 * directly, not approximated): its own standalone light section right after
 * the hero (not overlaid on it — confirmed from V2's own page assembly,
 * ExperimentalV2HomePage.tsx: Hero -> StatsStrip as separate sibling
 * sections), a two-row per-item treatment (category label + short
 * description on top, big bold figure + caption underneath), divided by
 * thin vertical rules on sm+, and a scroll-triggered fade-up via the same
 * <Reveal/> component already used elsewhere on this page — not a new
 * animation, the existing one V2 also happens to use.
 *
 * Colors/tokens are re-expressed using this site's own palette rather than
 * V2's --v2-* custom properties (same approach as the earlier Footer.tsx
 * fix) — V2's own indigo accent would clash with this site's established
 * gold accent, so gold-600 stands in for it; ink/navy stand in for V2's
 * near-black/gray text tokens.
 *
 * This is a NEW component, not an edit to StatStrip.tsx — that file is also
 * used by the archived /lab/v1 snapshot (src/experimental-ui-v1), which
 * must stay a frozen, unaltered copy of the pre-V5 homepage. Editing it in
 * place would have silently changed V1 too.
 *
 * Data: the four values and captions are unchanged from StatStrip.tsx's
 * existing content (word-for-word identical — verified). The `label`
 * (Capacity/Voltage/Experience/Reach) and `description` fields don't exist
 * in StatStrip.tsx at all; V2's two-row layout structurally needs them, and
 * they're V2's own already-authored copy for these exact same four metrics
 * (its captions are byte-identical to StatStrip's existing labels — not
 * newly invented text for this task).
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

export function HomeStatsSection() {
  return (
    <section className="bg-navy-50 py-4">
      <div className="container-page">
        <Reveal>
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className={`flex flex-col gap-6 border-ink-100 ${i > 0 ? "sm:border-l sm:pl-8" : ""}`}
              >
                <div className="flex flex-col gap-1.5">
                  <dt className="text-sm font-semibold text-navy-950">{stat.label}</dt>
                  <p className="text-sm leading-relaxed text-ink-500">{stat.description}</p>
                </div>
                <div className="flex flex-col gap-1">
                  <dd className="font-heading text-3xl font-bold text-gold-600">{stat.value}</dd>
                  <p className="text-xs font-semibold tracking-wide text-ink-500 uppercase">{stat.caption}</p>
                </div>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
