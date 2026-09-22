import { useLayoutEffect, useRef, useState } from "react";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page manifesto + marquee panel — promoted from /lab/lv9's Lv7Page
 * (src/lab-lv9/lv7/pages/Lv7Page.tsx), left untouched as the reference this
 * was copied from, minus its own footer recreation (Section 3): the real
 * site's Footer.tsx already renders directly below this via Layout.tsx, so
 * duplicating it here would render it twice.
 *
 * Section 1+2 live in one absolutely-positioned canvas (their exact heights
 * depend on the manifesto text's real wrapped line count, so it's measured
 * live via a ref rather than guessed as a fixed pixel value).
 */

// The exact same 6-stop gradient used behind the "About Us" panel
// (LabDarkSections.tsx's PANEL_GRADIENT) instead of a plain near-black fill,
// so the manifesto/marquee below match that palette.
const BG_GRADIENT =
  "linear-gradient(180deg, #0D1624 0%, #111C2B 20%, #182536 40%, #202D3D 60%, #2A3746 80%, #080D14 100%)";
// Same grain-texture technique used for every "matte" surface elsewhere in
// these lab routes, so this reads as a dusty matte finish rather than a
// flat, glossy fill.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Same thin, light, dusty cream line color used against dark panels
// elsewhere (lab-lv5) — light/subtle, but here applied as a flat solid
// color (no gradient fade) so it stays fully connected top to bottom.
const LINE_COLOR = "rgba(198, 192, 180, 0.16)";
// Readable cream text tone against the dark panel — same TEXT_CREAM value
// used for headings/body copy against lab-lv5's dark panel.
const TEXT_CREAM = "#F2F4F7";

// Same 5-line structure used throughout the other lab routes: the two
// edges (0 and 1, at the 30px insets) plus 3 evenly-spaced dividers, giving
// 4 equal columns.
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];
// Left/right inset landing exactly on the panel 2/3 span (25%-75%).
const CONTENT_INSET = "calc(30px + (100% - 60px) * 0.25)";

// ---------------------------------------------------------------------------
// Section 1 — closing line + manifesto statement (panels 2-3 only)
// ---------------------------------------------------------------------------
const TOP_LINE_POSITION = 70;
const MANIFESTO_TOP_GAP = 40;
// Original, four short declarative lines (not copied from elsewhere on the
// site) — a manifesto/"code"-style read rather than one wrapped paragraph,
// each grounded in facts already established elsewhere on this site
// (testing, on-time delivery).
const MANIFESTO_LINES = [
  "Built for the moment power can't fail.",
  "Tested beyond what the spec sheet asks.",
  "Delivered on time, every time.",
  "This is how we build transformers.",
];

// ---------------------------------------------------------------------------
// Section 2 — "NR INDUSTRIES" marquee
// ---------------------------------------------------------------------------
const MARQUEE_GAP_AFTER_TEXT = 150;
const MARQUEE_SECTION_HEIGHT = 150;
const MARQUEE_ITEM_GAP_PX = 90;
const MARQUEE_WORD = "NR INDUSTRIES";

type MarqueeSlot = { type: "logo" } | { type: "word" };
const MARQUEE_REPEATS = 4;
const MARQUEE_BASE: MarqueeSlot[] = Array.from({ length: MARQUEE_REPEATS }, () => [
  { type: "logo" as const },
  { type: "word" as const },
]).flat();
// Doubled so the track can loop seamlessly at -50% translateX — same
// technique lab-lv6's marquee uses.
const MARQUEE_TRACK = [...MARQUEE_BASE, ...MARQUEE_BASE];

function MarqueeItem({ item }: { item: MarqueeSlot }) {
  if (item.type === "logo") {
    return (
      <div
        role="img"
        aria-label="Company logo"
        style={{
          height: "clamp(46px, 12vw, 100px)",
          width: "clamp(46px, 12vw, 100px)",
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
        fontSize: "clamp(46px, 12vw, 100px)",
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
  const canvasRef = useRef<HTMLElement>(null);
  const manifestoRef = useRef<HTMLDivElement>(null);
  const [marqueeTop, setMarqueeTop] = useState<number | null>(null);

  // The manifesto's exact wrapped height isn't known ahead of time (font
  // rendering/kerning varies), so — same technique lab-lv6 uses for its own
  // variable-height text blocks — it's measured live via a ref rather than
  // guessed as a fixed pixel value, and everything below it (the marquee)
  // cascades from that real measurement.
  useLayoutEffect(() => {
    function measure() {
      const canvas = canvasRef.current;
      const manifesto = manifestoRef.current;
      if (!canvas || !manifesto) return;
      const canvasTop = canvas.getBoundingClientRect().top;
      setMarqueeTop(manifesto.getBoundingClientRect().bottom - canvasTop + MARQUEE_GAP_AFTER_TEXT);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // The canvas ends exactly at the marquee's closing line — the footer
  // starts immediately below it in normal flow, so that line does double
  // duty as both the marquee section's own closing line and the footer's
  // top border (same as the real Footer.tsx's own `border-t`).
  const canvasHeight = marqueeTop !== null ? marqueeTop + MARQUEE_SECTION_HEIGHT : null;

  return (
      <section
        ref={canvasRef}
        className="relative overflow-hidden lv9-lv7-canvas"
        style={{ width: "100%", height: canvasHeight !== null ? `${canvasHeight}px` : "100vh" }}
      >
        {/* `canvasHeight` is JS-computed (from a live manifesto-text
            measurement), so this uses `!important` to override the inline
            height on mobile rather than moving it into a plain class rule
            — same technique as LV4/LV6's own sections. Desktop is
            untouched; the desktop tree is wrapped and hidden on mobile in
            favor of a simpler, separate, normal-flow mobile tree, for the
            same reason as every other lv9 file's responsive pass. */}
        <style>{`
          .lv9-lv7-canvas-desktop, .lv9-lv7-footer-desktop { display: block; }
          .lv9-lv7-canvas-mobile, .lv9-lv7-footer-mobile { display: none; }
          @media (max-width: ${MOBILE_BREAKPOINT}px) {
            .lv9-lv7-canvas { height: auto !important; overflow: visible !important; }
            .lv9-lv7-canvas-desktop, .lv9-lv7-footer-desktop { display: none; }
            .lv9-lv7-canvas-mobile, .lv9-lv7-footer-mobile { display: block; }
          }
        `}</style>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`,
            backgroundBlendMode: "overlay, normal",
            backgroundSize: "140px 140px, cover",
          }}
        />
        <div className="lv9-lv7-canvas-desktop">
        {VERTICAL_LINE_FRACTIONS.map((fraction) => (
          <div
            key={fraction}
            aria-hidden="true"
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: `calc(30px + (100% - 60px) * ${fraction})`,
              width: "1px",
              backgroundColor: LINE_COLOR,
            }}
          />
        ))}

        {/* SECTION 1 — closing line 70px down, spanning panels 2-3 only. */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{ top: `${TOP_LINE_POSITION}px`, left: CONTENT_INSET, right: CONTENT_INSET, height: "1px", backgroundColor: LINE_COLOR }}
        />
        <div
          ref={manifestoRef}
          className="absolute flex flex-col items-center"
          style={{ top: `${TOP_LINE_POSITION + MANIFESTO_TOP_GAP}px`, left: CONTENT_INSET, right: CONTENT_INSET, gap: "10px" }}
        >
          {MANIFESTO_LINES.map((line) => (
            <p
              key={line}
              className="font-heading"
              style={{ fontSize: "30px", fontWeight: 600, lineHeight: 1.35, color: TEXT_CREAM, textAlign: "center", margin: 0 }}
            >
              {line}
            </p>
          ))}
        </div>

        {/* SECTION 2 — right-to-left "NR INDUSTRIES" marquee, 150px below
            the manifesto text, itself 150px tall, closed by a full-width
            line at its own bottom edge. */}
        {marqueeTop !== null && (
          <>
            <div
              aria-hidden="true"
              className="pointer-events-none absolute flex items-center overflow-hidden"
              style={{
                top: `${marqueeTop}px`,
                height: `${MARQUEE_SECTION_HEIGHT}px`,
                left: 0,
                right: 0,
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
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                top: `${marqueeTop + MARQUEE_SECTION_HEIGHT}px`,
                left: 0,
                right: 0,
                height: "1px",
                backgroundColor: LINE_COLOR,
              }}
            />
          </>
        )}
        </div>

        {/* MOBILE (<=767px) — separate, simple, normal-flow rendering of
            the manifesto + marquee, reusing MANIFESTO_LINES/MARQUEE_TRACK. */}
        <div className="lv9-lv7-canvas-mobile relative" style={{ padding: "50px 20px 30px" }}>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0"
            style={{ left: "20px", width: "1px", backgroundColor: LINE_COLOR }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0"
            style={{ right: "20px", width: "1px", backgroundColor: LINE_COLOR }}
          />
          <div style={{ borderTop: `1px solid ${LINE_COLOR}`, paddingTop: "24px", display: "flex", flexDirection: "column", gap: "8px" }}>
            {MANIFESTO_LINES.map((line) => (
              <p
                key={line}
                className="font-heading"
                style={{ fontSize: "18px", fontWeight: 600, lineHeight: 1.35, color: TEXT_CREAM, textAlign: "center", margin: 0 }}
              >
                {line}
              </p>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none flex items-center overflow-hidden"
            style={{
              margin: "28px -20px 0",
              padding: "18px 0",
              borderTop: `1px solid ${LINE_COLOR}`,
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "90s" }}>
              {MARQUEE_TRACK.map((item, i) => (
                <MarqueeItem key={i} item={item} />
              ))}
            </div>
          </div>
        </div>
      </section>
  );
}

