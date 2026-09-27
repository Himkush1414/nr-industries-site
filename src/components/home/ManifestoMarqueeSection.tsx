/**
 * /lab/lv15 — final dark/matte-blue section before the footer, rewritten
 * from src/components/home/ManifestoMarqueeSection.tsx: the "Built for the
 * moment power can't fail." manifesto lines are removed entirely. What's
 * left is only the "NR INDUSTRIES" marquee (sized down from the original),
 * immediately followed by the real Footer.tsx (rendered by Lv15Page.tsx,
 * same as the real Home) — matching "footer + one marquee line, nothing
 * else" in this section.
 */

const BG_GRADIENT =
  "linear-gradient(180deg, #0D1624 0%, #111C2B 20%, #182536 40%, #202D3D 60%, #2A3746 80%, #080D14 100%)";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const TEXT_CREAM = "#F2F4F7";

const MARQUEE_ITEM_GAP_PX = 48;
const MARQUEE_WORD = "NR INDUSTRIES";

type MarqueeSlot = { type: "logo" } | { type: "word" };
const MARQUEE_REPEATS = 6;
const MARQUEE_BASE: MarqueeSlot[] = Array.from({ length: MARQUEE_REPEATS }, () => [
  { type: "logo" as const },
  { type: "word" as const },
]).flat();
const MARQUEE_TRACK = [...MARQUEE_BASE, ...MARQUEE_BASE];

function MarqueeItem({ item }: { item: MarqueeSlot }) {
  if (item.type === "logo") {
    return (
      <div
        role="img"
        aria-label="Company logo"
        style={{
          height: "clamp(24px, 5vw, 40px)",
          width: "clamp(24px, 5vw, 40px)",
          flexShrink: 0,
          marginRight: `${MARQUEE_ITEM_GAP_PX}px`,
          backgroundColor: TEXT_CREAM,
          WebkitMaskImage: "url(/company-logo-black-2-cropped.png)",
          maskImage: "url(/company-logo-black-2-cropped.png)",
          WebkitMaskSize: "contain",
          maskSize: "contain",
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
        }}
      />
    );
  }
  return (
    <span
      className="font-heading"
      style={{
        fontSize: "clamp(24px, 5vw, 40px)",
        fontWeight: 700,
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: TEXT_CREAM,
        flexShrink: 0,
        marginRight: `${MARQUEE_ITEM_GAP_PX}px`,
      }}
    >
      {MARQUEE_WORD}
    </span>
  );
}

export function ManifestoMarqueeSection() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "140px 140px, cover" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none relative flex items-center overflow-hidden py-6"
        style={{
          maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        }}
      >
        <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "140s" }}>
          {MARQUEE_TRACK.map((item, i) => (
            <MarqueeItem key={i} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
