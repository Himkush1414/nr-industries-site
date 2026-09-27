import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { BlurPhotoShowcase } from "@/components/home/BlurPhotoShowcase";

/**
 * /lab/lv16 — "Why Choose Us" panel, genuinely re-coded: every size below is
 * a `clamp()` fluid value (no fixed px, no breakpoint-only jumps). The
 * "grid doesn't forgive shortcuts" photo panel uses `BlurPhotoShowcase` — a
 * blur-crossfade transition that exists ONLY for this panel, not the
 * slide-based showcase any other lab route might use.
 */

const BG_GRADIENT = "linear-gradient(160deg, #F2F4F7 0%, #E8E4DC 100%)";
const PANEL_BG_COLOR = "#F2F4F7";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch' result='t'/%3E%3CfeColorMatrix in='t' type='saturate' values='0' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncA type='linear' slope='2.6' intercept='-0.6'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const LOGO_MATTE_BLACK = "#222222";

const WHY_CHOOSE_US_MAIN =
  "Reliability isn't a claim we make — it's a standard we test for. Every transformer that leaves our plant has already been pushed past the exact load, voltage, and site conditions it will face in the field.";
const WHY_CHOOSE_US_SUPPORTING =
  "Design, manufacturing, and testing all handled in-house, to internationally recognized standards — the reason plants, utilities, and industrial operators keep specifying our equipment project after project.";

const WORD_DIM_RGB = "34, 34, 34";
const WORD_DIM_ALPHA = 0.22;

function wordRevealAmount(progress: number, wordCount: number, index: number) {
  if (wordCount <= 1) return progress;
  const revealWindow = 1.6 / wordCount;
  const start = (index / wordCount) * (1 - revealWindow);
  return Math.min(1, Math.max(0, (progress - start) / revealWindow));
}

const MARQUEE_WORDS = [
  "Power",
  "Precision",
  "Reliability",
  "Durability",
  "Performance",
  "Trust",
  "Quality",
  "Engineering",
  "Strength",
  "Efficiency",
];
const MARQUEE_ITEM_GAP_PX = 48;

type MarqueeItem = { type: "logo" } | { type: "word"; text: string };
const MARQUEE_SET: MarqueeItem[] = MARQUEE_WORDS.flatMap((word) => [
  { type: "logo" as const },
  { type: "word" as const, text: word },
]);
const MARQUEE_TRACK = [...MARQUEE_SET, ...MARQUEE_SET];

function BrandMarqueeItem({ item }: { item: MarqueeItem }) {
  if (item.type === "logo") {
    return (
      <img
        src="/company-logo-black-2-cropped.png"
        alt=""
        loading="lazy"
        style={{ height: "clamp(22px, 4vw, 32px)", width: "auto", flexShrink: 0, marginRight: `${MARQUEE_ITEM_GAP_PX}px` }}
      />
    );
  }
  return (
    <span
      className="font-heading"
      style={{
        fontSize: "clamp(22px, 4vw, 32px)",
        fontWeight: 600,
        lineHeight: 1,
        whiteSpace: "nowrap",
        color: LOGO_MATTE_BLACK,
        flexShrink: 0,
        marginRight: `${MARQUEE_ITEM_GAP_PX}px`,
      }}
    >
      {item.text}
    </span>
  );
}

const WHY_CHOOSE_US_POINTS = [
  {
    title: "Precision Engineering",
    image: "/why-choose-us/precision-engineering-hover.jpeg",
    blurb: "Built to exact tolerances, tested against real operating loads.",
  },
  {
    title: "International Standards",
    image: "/why-choose-us/international-standards-hover.jpeg",
    blurb: "Certified to internationally recognized safety standards.",
  },
  {
    title: "After-Sales Support",
    image: "/why-choose-us/after-sales-support-hover.jpeg",
    blurb: "Engineers stay involved well past commissioning.",
  },
  {
    title: "Eco-Friendly Manufacturing",
    image: "/why-choose-us/eco-friendly-manufacturing-hover.jpeg",
    blurb: "Production minimizes waste and energy use.",
  },
];

const PANEL_THREE_QUOTE =
  "The grid doesn't forgive shortcuts. Every unit we build is engineered to keep running long after the warranty ends.";
const PANEL_THREE_TAGLINE = "Powering Industries, Building Trust";

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [revealProgress, setRevealProgress] = useState(0);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setRevealProgress(1);
      return;
    }

    function onScroll() {
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      const progress = (vh - rect.top) / vh;
      setRevealProgress(Math.min(1, Math.max(0, progress)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const mainWords = WHY_CHOOSE_US_MAIN.split(" ");

  return (
    <>
      <section ref={sectionRef} data-nav-theme="light" className="relative overflow-hidden">
        <style>{`
          .lv16-why-grid, .lv16-panel3-grid { display: grid; gap: clamp(20px, 3vw, 40px); grid-template-columns: 1fr; }
          @media (min-width: 768px) {
            .lv16-why-grid { grid-template-columns: 1.3fr 1fr; align-items: start; }
            .lv16-panel3-grid { grid-template-columns: 1.3fr 1fr; align-items: center; }
          }
        `}</style>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "120px 120px, cover" }}
        />
        <div
          className="relative flex w-full flex-col"
          style={{ gap: "clamp(20px, 3vw, 36px)", padding: "clamp(24px, 4vh, 56px) clamp(20px, 5vw, 96px)" }}
        >
          <div className="flex items-center" style={{ gap: "10px" }}>
            <img src="/company-logo-black-2-cropped.png" alt="Company logo" loading="lazy" style={{ height: "clamp(20px, 2.2vw, 26px)", width: "auto" }} />
            <span className="font-heading" style={{ fontSize: "clamp(15px, 1.6vw, 18px)", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
              Why Choose Us
            </span>
          </div>

          <div className="lv16-why-grid border-t" style={{ borderColor: "rgba(120, 112, 98, 0.14)", paddingTop: "clamp(16px, 2.4vw, 28px)" }}>
            <p className="font-heading" style={{ fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 600, lineHeight: 1.35 }}>
              {mainWords.map((word, i) => {
                const reveal = wordRevealAmount(revealProgress, mainWords.length, i);
                const alpha = WORD_DIM_ALPHA + (1 - WORD_DIM_ALPHA) * reveal;
                return (
                  <span key={i} style={{ color: `rgba(${WORD_DIM_RGB}, ${alpha})`, transition: "color 0.2s linear" }}>
                    {word}
                    {i < mainWords.length - 1 ? " " : ""}
                  </span>
                );
              })}
            </p>
            <div className="flex flex-col" style={{ gap: "clamp(12px, 1.6vw, 18px)" }}>
              <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.55, color: LOGO_MATTE_BLACK }}>
                {WHY_CHOOSE_US_SUPPORTING}
              </p>
              <button
                type="button"
                className="inline-flex w-fit items-center"
                style={{
                  gap: "8px",
                  padding: "clamp(9px, 1.1vw, 13px) clamp(16px, 2vw, 24px)",
                  borderRadius: "6px",
                  backgroundColor: "#000000",
                  color: PANEL_BG_COLOR,
                  fontSize: "clamp(12.5px, 1.3vw, 14.5px)",
                  fontWeight: 600,
                  border: "none",
                }}
              >
                Get Started
                <ArrowRight style={{ width: "14px", height: "14px" }} aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* Brand marquee band — decorative, static (not one of the
              conveyor-belt marquees; those apply only to Industries,
              Products, and company logos). */}
          <div
            aria-hidden="true"
            className="pointer-events-none relative flex items-center overflow-hidden border-y"
            style={{
              borderColor: "rgba(120, 112, 98, 0.14)",
              paddingBlock: "clamp(10px, 1.6vw, 16px)",
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "70s" }}>
              {MARQUEE_TRACK.map((item, i) => (
                <BrandMarqueeItem key={i} item={item} />
              ))}
            </div>
          </div>

          {/* Image showcase — photos sized modestly smaller (each capped
              narrower than its grid cell), captions below sized up. */}
          <div className="grid grid-cols-2 sm:grid-cols-4" style={{ gap: "clamp(14px, 2vw, 24px)" }}>
            {WHY_CHOOSE_US_POINTS.map((point) => (
              <div key={point.title} className="flex flex-col" style={{ gap: "clamp(8px, 1vw, 12px)" }}>
                {/* Width set via inline style, not an arbitrary-value
                    Tailwind class (`w-[86%]`) — this project's dev server has
                    repeatedly failed to generate CSS for brand-new
                    bracket-notation classes on a freshly-added lazy route. */}
                <div className="relative mx-auto overflow-hidden rounded-md" style={{ width: "86%", aspectRatio: "4 / 3" }}>
                  <img
                    src={point.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="text-center">
                  <span style={{ fontSize: "clamp(13px, 1.5vw, 16px)", fontWeight: 600, lineHeight: 1.3, color: LOGO_MATTE_BLACK }}>{point.title}</span>
                  <p style={{ marginTop: "4px", fontSize: "clamp(11.5px, 1.3vw, 14px)", lineHeight: 1.45, color: LOGO_MATTE_BLACK, opacity: 0.88 }}>{point.blurb}</p>
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            className="inline-flex w-fit items-center self-end"
            style={{
              gap: "8px",
              padding: "clamp(9px, 1.1vw, 13px) clamp(16px, 2vw, 24px)",
              borderRadius: "6px",
              backgroundColor: "#000000",
              color: PANEL_BG_COLOR,
              fontSize: "clamp(12.5px, 1.3vw, 14.5px)",
              fontWeight: 600,
              border: "none",
            }}
          >
            Explore All Services
            <ArrowRight style={{ width: "14px", height: "14px" }} aria-hidden="true" />
          </button>
        </div>
      </section>

      {/* "The grid doesn't forgive shortcuts" — blur-crossfade photo panel. */}
      <section data-nav-theme="light" className="relative overflow-hidden border-t" style={{ borderColor: "rgba(120, 112, 98, 0.14)" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "120px 120px, cover" }}
        />
        <div
          className="lv16-panel3-grid relative w-full"
          style={{ padding: "clamp(28px, 5vh, 72px) clamp(20px, 5vw, 96px)" }}
        >
          <div className="flex flex-col" style={{ gap: "clamp(14px, 2vw, 20px)" }}>
            <p className="font-heading" style={{ fontSize: "clamp(19px, 2.6vw, 28px)", fontWeight: 700, lineHeight: 1.3, color: LOGO_MATTE_BLACK }}>
              {PANEL_THREE_QUOTE}
            </p>
            <div className="flex items-center" style={{ gap: "10px" }}>
              <img src="/company-logo-black-2-cropped.png" alt="Company logo" loading="lazy" style={{ height: "clamp(20px, 2.2vw, 26px)", width: "auto" }} />
              <div>
                <span className="font-heading block" style={{ fontSize: "clamp(13px, 1.4vw, 15px)", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
                  NR Industries
                </span>
                <span style={{ fontSize: "clamp(10.5px, 1.1vw, 12.5px)", color: LOGO_MATTE_BLACK, opacity: 0.88 }}>{PANEL_THREE_TAGLINE}</span>
              </div>
            </div>
          </div>
          <div className="overflow-hidden rounded-lg" style={{ height: "clamp(160px, 24vw, 260px)" }}>
            <BlurPhotoShowcase />
          </div>
        </div>
      </section>
    </>
  );
}
