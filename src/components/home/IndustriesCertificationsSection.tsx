import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { HOME_REF_VH, HOME_REF_WIDTH, useNormalizedVh } from "@/hooks/useNormalizedVh";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page industries + certifications panel — promoted from /lab/lv9's
 * Lv5Page (src/lab-lv9/lv5/pages/Lv5Page.tsx), left untouched as the
 * reference this was copied from: matte black panel, 4-column vertical
 * divider grid, a top section (company lockup + industry quote), a 4-box
 * industries showcase with left/right cycling, certifications, a marquee,
 * and two image+stats blocks.
 */

// /lab/lv9-only: the exact same 6-stop gradient used behind the "About Us"
// panel (lv3/components/LabDarkSections.tsx's PANEL_GRADIENT) instead of
// this route's original near-black fill, so this section's dark panels
// match that palette rather than reading as plain matte black. Grain-
// texture blending technique unchanged.
const BG_GRADIENT =
  "linear-gradient(180deg, #0D1624 0%, #111C2B 20%, #182536 40%, #202D3D 60%, #2A3746 80%, #080D14 100%)";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Same thin, light, dusty white-cream line color used against dark panels
// elsewhere (e.g. lab-lv2's About Us panel).
const LINE_COLOR = "rgba(198, 192, 180, 0.14)";
const LINE_GRADIENT_VERTICAL = `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
const LINE_GRADIENT_HORIZONTAL = `linear-gradient(to right, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;

// Readable cream text tone against the dark panel — same TEXT_WHITE value
// used for headings/body copy against lab-lv2's dark panel, kept separate
// from LINE_COLOR above (that's a much lower-alpha, decorative-only tone).
const TEXT_CREAM = "#F2F4F7";
// Used for the mask-recolored company logo mark.
const DUSTY_CREAM_GRADIENT = "linear-gradient(160deg, rgb(214, 208, 195) 0%, rgb(178, 172, 159) 100%)";

// Same 5-line structure used throughout the other lab routes: the two
// edges (0 and 1, at the 30px insets) plus 3 evenly-spaced dividers, giving
// 4 EQUAL columns — with the 2 edges fixed, 4 equal columns need 3 internal
// dividers (2 would only make 3 unequal-or-fewer sections).
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];
const COLUMN_ONE_WIDTH = "calc((100% - 60px) * 0.25)";
// Left/right inset landing exactly on the panel 2/3 span (25%-75%).
const CONTENT_INSET = "calc(30px + (100% - 60px) * 0.25)";

const COMPANY_QUOTE =
  "Every industry that keeps moving trusts power that never stops. From factories to farmlands, hospitals to highways, nothing runs without it — and everything we build is engineered to keep that promise, day after day, without exception.";

// Real industry list + real photos (src/data/company.ts / public/industries/
// — same shared factual content and images the main site's Industries page
// uses).
const INDUSTRIES: { name: string; description: string; image: string }[] = [
  { name: "Food Industry", description: "Reliable power for continuous processing and cold-chain operations.", image: "/industries/food-industry.webp" },
  { name: "Paper Industry", description: "Stable supply for high-load pulping and paper production lines.", image: "/industries/paper-industry.webp" },
  { name: "Plastic Industry", description: "Consistent voltage for extrusion and molding equipment.", image: "/industries/plastic-industry.webp" },
  { name: "Foundry", description: "Heavy-duty transformers built for furnace and casting loads.", image: "/industries/foundry.webp" },
  { name: "Solar Power Plants", description: "Inverter duty transformers matched to grid integration requirements.", image: "/industries/solar-power-plants.webp" },
  { name: "Power Plant", description: "Power transformers for generation and primary distribution circuits.", image: "/industries/power-plant.webp" },
  { name: "Water Treatment", description: "Dependable supply for pumping and treatment infrastructure.", image: "/industries/water-treatment.webp" },
  { name: "Refinery", description: "Robust equipment engineered for demanding industrial environments.", image: "/industries/refinery.webp" },
  { name: "Chemical Industry", description: "Durable transformers suited to continuous-process facilities.", image: "/industries/chemical-industry.webp" },
  { name: "Windmill Power Projects", description: "Transformers engineered for renewable generation applications.", image: "/industries/windmill-power-projects.webp" },
  { name: "Rice Industry", description: "Steady power for milling and processing operations.", image: "/industries/rice-industry.webp" },
  { name: "Textile Industry", description: "Consistent supply for spinning, weaving, and finishing lines.", image: "/industries/textile-industry.webp" },
  { name: "Cement Industry", description: "Heavy industrial-grade transformers for continuous plant operation.", image: "/industries/cement-industry.webp" },
  { name: "Pharma Industry", description: "Reliable, standards-compliant power for regulated manufacturing.", image: "/industries/pharma-industry.webp" },
  { name: "Hydro Projects", description: "Equipment suited to generation and distribution in hydro installations.", image: "/industries/hydro-projects.webp" },
];

// Darkened/desaturated toward this panel's own near-black tone — same
// "tint so the photo blends with the panel instead of showing raw color"
// idea used for the product images elsewhere, just inverted (darker, not
// lighter) since this panel's background is matte black, not cream.
const INDUSTRY_IMAGE_TINT = "grayscale(100%) brightness(0.45) contrast(1.05)";
const BOX_IMAGE_HEIGHT = 180;

const INDUSTRIES_PER_PAGE = 4;
const TOTAL_PAGES = Math.ceil(INDUSTRIES.length / INDUSTRIES_PER_PAGE);
const BLUR_TRANSITION_MS = 400;

// Position/height for the section between the two near-bottom lines
// (HOME_REF_VH - 36px and 650px below it) — reused for every element
// placed in that band below. Fixed to HOME_REF_VH (not the real --vh100
// viewport height) since this whole section renders in reference-canvas
// pixels — see the zoom comment on the <section> root further down.
const CERT_SECTION_TOP = `${HOME_REF_VH - 36}px`;
const CERT_SECTION_HEIGHT = 650;

const CERTIFICATIONS_HEADING =
  "Every certification we hold reflects a standard we've actually met — not just filed for.";
const CERTIFICATIONS_SUPPORTING =
  "Each one is earned through independent testing and periodic audits, not a one-time formality.";

// Every certification logo available in the project (src/data/company.ts's
// full certifications list, minus "Make in India", which has no logo asset
// at all). ISO and ERDA use the dedicated transparent-PNG versions; the
// rest use their real .webp (some of those have their own opaque circular/
// square backing as part of the actual badge artwork, which is fine here —
// unlike a plain rectangular product photo, a badge's own background is
// real design, not an unwanted box).
const CERTIFICATIONS = [
  { name: "ISO 9001:2015", image: "/certifications/iso-v5-transparent.png" },
  { name: "BIS Certification", image: "/certifications/bis.webp" },
  { name: "ERDA", image: "/certifications/erda-v5-transparent.png" },
  { name: "NABL", image: "/certifications/nabl.webp" },
  { name: "United Nations Global Marketplace", image: "/certifications/un.webp" },
  { name: "BEE (Energy is Life)", image: "/certifications/bee.webp" },
  { name: "CPRI Approved", image: "/certifications/cpri.webp" },
];
const CERT_CYCLE_MS = 5500;
const CERT_BLUR_MS = 500;
// Panel 4's cycle starts this far after panel 3's, so the two slots never
// swap at the same moment.
const CERT_STAGGER_MS = CERT_CYCLE_MS / 2;
// A moderate `filter`, not the full mask-recolor tried first (that
// replaced all color with a flat tint — recognizable as a badge shape, but
// not as a specific certification). This keeps the badge's own colors and
// detail readable while still muting/darkening it toward the panel's own
// near-black tone, a slighter version of the same idea used for the
// industry photos above.
const CERT_IMAGE_TINT = "grayscale(40%) brightness(0.85) contrast(1.05)";

// Marquee band between the certifications-closing line and the new 300px
// line below it — same right-to-left, seamless-loop technique as lab-lv4's
// marquee below "Why Choose Us" (doubled track + translateX(-50%), with
// spacing baked into each item's own trailing margin rather than a
// container `gap`, since a `gap` only applies BETWEEN items and would throw
// off the doubled track's exact halfway point, producing a visible stutter
// on every loop).
const MARQUEE_SECTION_TOP = `${HOME_REF_VH - 36 + 650}px`;
const MARQUEE_SECTION_HEIGHT = 300;
const MARQUEE_WORD = "NR INDUSTRIES";
const MARQUEE_ITEM_GAP_PX = 90;

type MarqueeSlot = { type: "logo" } | { type: "word" };
const MARQUEE_REPEATS = 4;
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

// Two image+stats blocks below the marquee. First block starts 40px below
// the marquee's own bottom edge (which is exactly where the "new 300px
// line" added earlier sits — see MARQUEE_SECTION_TOP + MARQUEE_SECTION_HEIGHT).
const IMAGE_STATS_BLOCK_HEIGHT = 450;
const IMAGE_STATS_BLOCK_GAP = 15;
const IMAGE_STATS_BLOCK1_TOP = `${HOME_REF_VH - 36 + 990}px`;
const IMAGE_STATS_BLOCK2_TOP = `${HOME_REF_VH - 36 + 990 + IMAGE_STATS_BLOCK_HEIGHT + IMAGE_STATS_BLOCK_GAP}px`;
// Image zone: panel 1 fully + 40% of panel 2's width.
const IMAGE_ZONE_WIDTH = "calc((100% - 60px) * 0.35)";
// Text zone: the remaining 60% of panel 2 + all of panel 3.
const TEXT_ZONE_LEFT = "calc(30px + (100% - 60px) * 0.35)";
const TEXT_ZONE_WIDTH = "calc((100% - 60px) * 0.4)";
// Splits the text zone into its upper (greeting/lockup/copy) and lower
// (stat figure) parts.
const TEXT_ZONE_UPPER_HEIGHT = 320;
// A slightly lighter matte tone than the panel's own near-black background
// — a subtle white wash rather than a new hex value, so it stays in the
// same "matte black" family while still reading as its own zone.
const TEXT_ZONE_BG = "rgba(255, 255, 255, 0.045)";

function ImageStatsBlock({
  top,
  imageSrc,
  imageAlt,
  greeting,
  boldLine,
  secondaryLine,
  statValue,
  statLabel,
}: {
  top: string;
  imageSrc: string;
  imageAlt: string;
  greeting: string;
  boldLine: string;
  secondaryLine: string;
  statValue: string;
  statLabel: string;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="absolute" style={{ top, left: 0, right: 0, height: `${IMAGE_STATS_BLOCK_HEIGHT}px` }}>
      {/* Image zone. Darkened/desaturated toward this panel's own matte
          black, same idea as the industry photos further up this page —
          hovering brightens it slightly rather than jumping to full
          brightness, a subtle matte "glow" rather than a jarring change. */}
      <div
        className="absolute overflow-hidden"
        style={{ top: 0, left: "30px", width: IMAGE_ZONE_WIDTH, height: "100%" }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <img
          src={imageSrc}
          alt={imageAlt}
          loading="lazy"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: hovered ? "grayscale(70%) brightness(0.78) contrast(1.05)" : "grayscale(85%) brightness(0.5) contrast(1.05)",
            transition: "filter 0.4s ease",
          }}
        />
      </div>

      {/* Text zone. */}
      <div className="absolute" style={{ top: 0, left: TEXT_ZONE_LEFT, width: TEXT_ZONE_WIDTH, height: "100%", backgroundColor: TEXT_ZONE_BG }}>
        {/* Upper part. */}
        <div className="absolute flex flex-col" style={{ top: "30px", left: "24px", right: "24px", gap: "14px" }}>
          <span style={{ fontSize: "14px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.7 }}>{greeting}</span>
          <div className="flex items-center" style={{ gap: "8px" }}>
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "19px",
                width: "19px",
                flexShrink: 0,
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
            <span className="font-heading" style={{ fontSize: "19px", fontWeight: 600, color: TEXT_CREAM }}>
              NR Industries
            </span>
          </div>
          <p className="font-heading" style={{ fontSize: "48px", fontWeight: 700, lineHeight: 1.25, color: TEXT_CREAM }}>
            {boldLine}
          </p>
          <p style={{ fontSize: "17px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.8, marginTop: "4px" }}>
            {secondaryLine}
          </p>
        </div>

        {/* Internal divider — only within the text zone, not the full
            block width. */}
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            top: `${TEXT_ZONE_UPPER_HEIGHT}px`,
            left: "24px",
            right: "24px",
            height: "1px",
            backgroundImage: LINE_GRADIENT_HORIZONTAL,
          }}
        />

        {/* Lower part: the stat figure. */}
        <div
          className="absolute flex flex-col justify-center"
          style={{ top: `${TEXT_ZONE_UPPER_HEIGHT + 1}px`, bottom: "25px", left: "24px", right: "24px", gap: "6px" }}
        >
          <span className="font-heading" style={{ fontSize: "48px", fontWeight: 700, color: TEXT_CREAM }}>
            {statValue}
          </span>
          <span style={{ fontSize: "16px", color: TEXT_CREAM, opacity: 0.75 }}>{statLabel}</span>
        </div>
      </div>

      {/* This block's own boundary line, spanning panels 1-3 only (panel 4
          stays empty, no line under it). */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          bottom: 0,
          left: "30px",
          width: "calc((100% - 60px) * 0.75)",
          height: "1px",
          backgroundImage: LINE_GRADIENT_HORIZONTAL,
        }}
      />

      {/* Panel 4: an otherwise-empty box, same height as the adjacent
          images, with an arrow in its top-right corner. */}
      <div
        className="absolute"
        style={{
          top: 0,
          left: "calc(30px + (100% - 60px) * 0.75)",
          width: COLUMN_ONE_WIDTH,
          height: "100%",
          border: `1px solid ${LINE_COLOR}`,
        }}
      >
        <ArrowUpRight
          size={22}
          color={TEXT_CREAM}
          aria-hidden="true"
          style={{ position: "absolute", top: "20px", right: "20px" }}
        />
      </div>
    </div>
  );
}

/** One slot's independent cycle-through-the-full-list state, with its own
 * blur-out/swap/blur-in phase machine and its own start delay — used twice
 * (panel 3, panel 4) with different `startIndex`/`startDelayMs` so the two
 * slots show different badges and never swap at the same moment. */
function useCertSlot(startIndex: number, startDelayMs: number) {
  const [index, setIndex] = useState(startIndex);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  useEffect(() => {
    let intervalId = 0;

    function advance() {
      setPhase("out");
      window.setTimeout(() => {
        setIndex((i) => (i + 1) % CERTIFICATIONS.length);
        setPhase("in");
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setPhase("idle");
          });
        });
      }, CERT_BLUR_MS);
    }

    // Waits a full cycle before the first swap (rather than swapping
    // immediately on mount), so each slot displays its starting badge for
    // one full CERT_CYCLE_MS before the cadence begins.
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(advance, CERT_CYCLE_MS);
    }, startDelayMs + CERT_CYCLE_MS);

    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalId);
    };
  }, []);

  return { cert: CERTIFICATIONS[index]!, phase };
}

export function IndustriesCertificationsSection() {
  // See WhyChooseUsSection's equivalent comment — zoom is 1 normally; on
  // the phone + Chrome "Desktop site" anomaly, it's the ratio this section
  // (rendered at a fixed HOME_REF_WIDTH canvas — see the <style> block
  // below) is visually/structurally shrunk or grown by to fit the phone's
  // actual forced viewport width.
  const { zoom } = useNormalizedVh();
  const isHomeZoomed = zoom !== 1;
  const [page, setPage] = useState(0);
  // "idle" = fully sharp/visible; "out"/"in" both render blurred+faded —
  // "in" is a distinct step so the page-index swap can happen while the
  // content is already hidden, then a rAF-delayed flip back to "idle"
  // triggers the fade/sharpen-in transition on the freshly swapped page.
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  function goToPage(direction: 1 | -1) {
    if (phase !== "idle") return;
    setPhase("out");
    window.setTimeout(() => {
      setPage((p) => (p + direction + TOTAL_PAGES) % TOTAL_PAGES);
      setPhase("in");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
        });
      });
    }, BLUR_TRANSITION_MS);
  }

  const pageIndustries = INDUSTRIES.slice(page * INDUSTRIES_PER_PAGE, page * INDUSTRIES_PER_PAGE + INDUSTRIES_PER_PAGE);

  // Certification badges — panel 3 and panel 4 each cycle independently
  // through the full list, starting at different positions and on
  // staggered timers, so they never swap at the same moment.
  const panel3Cert = useCertSlot(0, 0);
  const panel4Cert = useCertSlot(Math.floor(CERTIFICATIONS.length / 2), CERT_STAGGER_MS);

  return (
    // Height trimmed back down to end just 60px below Block 2's own
    // bottom edge (Block 2's top, calc(100vh - 36px + 1455px), plus its
    // 450px height, plus 60px = calc(100vh - 36px + 1965px), i.e.
    // calc(100vh + 1929px)). The 5 vertical lines already use
    // top:0/bottom:0, so they automatically match whatever height this
    // section ends up with. The line that used to be bottom-anchored (see
    // its own comment below) is frozen at its original position instead
    // of following this section's height.
    <section className="relative overflow-hidden lv9-lv5-section">
      <style>{`
        .lv9-lv5-section {
          width: ${isHomeZoomed ? `${HOME_REF_WIDTH}px` : "100%"};
          height: ${HOME_REF_VH + 1929}px;
          zoom: ${zoom};
        }
        .lv9-lv5-desktop { display: block; }
        .lv9-lv5-mobile { display: none; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv9-lv5-section { height: auto; overflow: visible; }
          .lv9-lv5-desktop { display: none; }
          .lv9-lv5-mobile { display: block; }
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
      <div className="lv9-lv5-desktop">
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
            backgroundImage: LINE_GRADIENT_VERTICAL,
          }}
        />
      ))}

      {/* First horizontal line — moved from 35px to 400px down, closing
          the top section below. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: "400px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
      />
      {/* Second horizontal line — 400px below the first (at 800px),
          closing the industries showcase band below. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: "800px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
      />
      {/* Was `bottom: "35px"` when the section was a single 100vh — that
          bottom-anchoring would drag this line down along with the new,
          taller section. Since it was always viewport-relative (never tied
          to real content below it), the exact same position is expressed
          as a fixed offset from the ORIGINAL 100vh instead, so it stays
          put regardless of how much space is added below. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: CERT_SECTION_TOP, left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
      />
      {/* Line closing off the certifications section, 650px below the one
          directly above it. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: MARQUEE_SECTION_TOP,
          left: 0,
          right: 0,
          height: "1px",
          backgroundImage: LINE_GRADIENT_HORIZONTAL,
        }}
      />
      {/* New line, 300px below the one that closes the certifications
          section. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: `${HOME_REF_VH - 36 + 950}px`,
          left: 0,
          right: 0,
          height: "1px",
          backgroundImage: LINE_GRADIENT_HORIZONTAL,
        }}
      />

      {/* Top section (0-400px). Panel 1: company lockup — top matches the
          quote's own top (below) so the two align at the same height, and
          left is nudged in from the panel's edge rather than flush
          against it. */}
      <div
        className="absolute flex items-center"
        style={{ top: "110px", left: "60px", width: COLUMN_ONE_WIDTH, gap: "10px" }}
      >
        <div
          role="img"
          aria-label="Company logo"
          style={{
            height: "25px",
            width: "25px",
            flexShrink: 0,
            backgroundImage: DUSTY_CREAM_GRADIENT,
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
        <span className="font-heading" style={{ fontSize: "20px", fontWeight: 700, color: TEXT_CREAM }}>
          NR
        </span>
        <span className="font-heading" style={{ fontSize: "20px", fontWeight: 400, color: TEXT_CREAM }}>
          Industries
        </span>
      </div>

      {/* Panels 2-3: short original industry statement. */}
      <p
        className="absolute font-heading"
        style={{
          top: "110px",
          left: CONTENT_INSET,
          right: CONTENT_INSET,
          fontSize: "34px",
          fontWeight: 600,
          lineHeight: 1.35,
          color: TEXT_CREAM,
        }}
      >
        {COMPANY_QUOTE}
      </p>

      {/* Between the two 400px lines: 4-box industries showcase. */}
      <div
        className="absolute"
        style={{
          top: "400px",
          height: "400px",
          left: 0,
          right: 0,
          filter: phase === "idle" ? "blur(0px)" : "blur(10px)",
          opacity: phase === "idle" ? 1 : 0,
          transition: `filter ${BLUR_TRANSITION_MS}ms ease, opacity ${BLUR_TRANSITION_MS}ms ease`,
        }}
      >
        {pageIndustries.map((industry, i) => (
          <div
            key={industry.name}
            className="absolute overflow-hidden"
            style={{
              top: 0,
              left: `calc(30px + (100% - 60px) * ${i * 0.25})`,
              width: COLUMN_ONE_WIDTH,
              height: "400px",
            }}
          >
            {/* Top half: the real industry photo, darkened/desaturated
                toward this panel's own matte black rather than shown in
                raw color. Full-bleed within the column (not inset), the
                bottom half's text below still uses the usual 24px inset. */}
            <img
              src={industry.image}
              alt={industry.name}
              loading="lazy"
              className="absolute inset-0"
              style={{ width: "100%", height: `${BOX_IMAGE_HEIGHT}px`, objectFit: "cover", filter: INDUSTRY_IMAGE_TINT }}
            />

            {/* Bottom half: headline + supporting text. */}
            <div
              className="absolute flex flex-col"
              style={{ top: `${BOX_IMAGE_HEIGHT + 24}px`, left: "24px", right: "24px", gap: "10px" }}
            >
              <span className="font-heading" style={{ fontSize: "18px", fontWeight: 600, color: TEXT_CREAM }}>
                {industry.name}
              </span>
              <span style={{ fontSize: "14px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.75 }}>
                {industry.description}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Left/right navigation, cycling the industries in groups of 4. */}
      <button
        type="button"
        aria-label="Previous industries"
        onClick={() => goToPage(-1)}
        className="absolute inline-flex items-center justify-center"
        style={{
          top: "700px",
          left: "50px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: `1px solid ${LINE_COLOR}`,
          backgroundColor: "transparent",
          color: TEXT_CREAM,
          cursor: "pointer",
        }}
      >
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Next industries"
        onClick={() => goToPage(1)}
        className="absolute inline-flex items-center justify-center"
        style={{
          top: "700px",
          right: "50px",
          width: "36px",
          height: "36px",
          borderRadius: "50%",
          border: `1px solid ${LINE_COLOR}`,
          backgroundColor: "transparent",
          color: TEXT_CREAM,
          cursor: "pointer",
        }}
      >
        <ChevronRight size={18} aria-hidden="true" />
      </button>

      {/* Newly added section, between the two near-bottom lines. Left half
          (panels 1-2): certifications heading + supporting text, fully
          left-aligned and vertically centered in this band. Right half:
          one badge in panel 3, a different one in panel 4 (not one shared
          badge centered across both), auto-cycling through the full list
          in pairs. */}

      {/* Logo + label lockup at the top of panel 1 — same style as the
          logo + "NR Industries" lockup at the top of the page. */}
      <div
        className="absolute flex items-center"
        style={{ top: `calc(${CERT_SECTION_TOP} + 40px)`, left: "60px", width: COLUMN_ONE_WIDTH, gap: "10px" }}
      >
        <div
          role="img"
          aria-label="Company logo"
          style={{
            height: "30px",
            width: "30px",
            flexShrink: 0,
            backgroundImage: DUSTY_CREAM_GRADIENT,
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
        <span className="font-heading" style={{ fontSize: "30px", fontWeight: 600, color: TEXT_CREAM }}>
          Certificates
        </span>
      </div>

      <div
        className="absolute flex flex-col justify-center"
        style={{
          top: CERT_SECTION_TOP,
          height: `${CERT_SECTION_HEIGHT}px`,
          left: "30px",
          width: "calc((100% - 60px) * 0.5 - 24px)",
          gap: "24px",
        }}
      >
        <h2
          className="font-heading"
          style={{ fontSize: "65px", fontWeight: 700, lineHeight: 1.2, color: TEXT_CREAM, textAlign: "left" }}
        >
          {CERTIFICATIONS_HEADING}
        </h2>
        <p style={{ fontSize: "25px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.75, textAlign: "left" }}>
          {CERTIFICATIONS_SUPPORTING}
        </p>
      </div>

      {[panel3Cert, panel4Cert].map((slot, i) => (
        <div
          key={i}
          className="absolute flex items-center justify-center"
          style={{
            top: CERT_SECTION_TOP,
            height: `${CERT_SECTION_HEIGHT}px`,
            // Panel 3 (i === 0) then panel 4 (i === 1) — each badge fully
            // within its own column, not centered across both.
            left: `calc(30px + (100% - 60px) * ${0.5 + i * 0.25})`,
            width: COLUMN_ONE_WIDTH,
          }}
        >
          <img
            key={slot.cert.name}
            src={slot.cert.image}
            alt={slot.cert.name}
            loading="lazy"
            style={{
              maxHeight: "170px",
              maxWidth: "80%",
              objectFit: "contain",
              filter: `${CERT_IMAGE_TINT} ${slot.phase === "idle" ? "blur(0px)" : "blur(12px)"}`,
              opacity: slot.phase === "idle" ? 1 : 0,
              transition: `filter ${CERT_BLUR_MS}ms ease, opacity ${CERT_BLUR_MS}ms ease`,
            }}
          />
        </div>
      ))}

      {/* Marquee band, between the certifications-closing line and the new
          300px line below it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute flex items-center overflow-hidden"
        style={{
          top: MARQUEE_SECTION_TOP,
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

      {/* Two image+stats blocks, 40px below the marquee's own bottom edge. */}
      <ImageStatsBlock
        top={IMAGE_STATS_BLOCK1_TOP}
        // Same image used on the main site's About page, "Built for
        // quality at scale" (Infrastructure) section.
        imageSrc="/about-infrastructure.jpeg"
        imageAlt="Manufacturing infrastructure and testing facility"
        greeting="The numbers behind our impact."
        boldLine="Trusted across every industry."
        secondaryLine="From cement to power generation, our transformers are built to handle the harshest industrial conditions."
        statValue="500+"
        statLabel="Industries Trusting Us"
      />
      <ImageStatsBlock
        top={IMAGE_STATS_BLOCK2_TOP}
        imageSrc="/why-choose-us/after-sales-support-new.jpeg"
        imageAlt="Engineers at work"
        greeting="The people driving that impact."
        boldLine="Decades of hands-on expertise."
        secondaryLine="Our engineers bring hands-on expertise to every project, from design through commissioning."
        statValue="15+"
        statLabel="Years of Industry Experience"
      />
      </div>

      {/* ---------------------------------------------------------------
          MOBILE (<=767px) — separate, simple, normal-flow rendering.
          Reuses the same state (page/goToPage for industries, panel3Cert
          for a single cycling certification badge) rather than duplicating
          any timers/cycling logic. Industries keep the same "groups of 4,
          prev/next" paging as desktop, just stacked vertically instead of
          in a 4-column row. Certifications show one slot (not two side by
          side) cycling the same way, per the "keep displaying one at a
          time, large/prominent" instruction.
          --------------------------------------------------------------- */}
      <div className="lv9-lv5-mobile relative" style={{ padding: "60px 20px 50px" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ left: "20px", width: "1px", backgroundImage: LINE_GRADIENT_VERTICAL }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ right: "20px", width: "1px", backgroundImage: LINE_GRADIENT_VERTICAL }}
        />

        <div className="flex items-center" style={{ gap: "10px", marginBottom: "20px" }}>
          <div
            role="img"
            aria-label="Company logo"
            style={{
              height: "22px",
              width: "22px",
              flexShrink: 0,
              backgroundImage: DUSTY_CREAM_GRADIENT,
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
          <span className="font-heading" style={{ fontSize: "17px", fontWeight: 700, color: TEXT_CREAM }}>
            NR Industries
          </span>
        </div>
        <p className="font-heading" style={{ fontSize: "20px", fontWeight: 600, lineHeight: 1.35, color: TEXT_CREAM, marginBottom: "36px" }}>
          {COMPANY_QUOTE}
        </p>

        {/* Industries — same page/goToPage state as desktop, stacked. */}
        <div
          style={{
            filter: phase === "idle" ? "blur(0px)" : "blur(8px)",
            opacity: phase === "idle" ? 1 : 0,
            transition: `filter ${BLUR_TRANSITION_MS}ms ease, opacity ${BLUR_TRANSITION_MS}ms ease`,
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            marginBottom: "20px",
          }}
        >
          {pageIndustries.map((industry) => (
            <div key={industry.name}>
              <img
                src={industry.image}
                alt={industry.name}
                loading="lazy"
                style={{ width: "100%", height: "160px", objectFit: "cover", filter: INDUSTRY_IMAGE_TINT, borderRadius: "2px" }}
              />
              <div style={{ marginTop: "12px" }}>
                <span className="font-heading" style={{ fontSize: "16px", fontWeight: 600, color: TEXT_CREAM }}>
                  {industry.name}
                </span>
                <p style={{ marginTop: "6px", fontSize: "13px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.75 }}>
                  {industry.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center" style={{ gap: "16px", marginBottom: "44px" }}>
          <button
            type="button"
            aria-label="Previous industries"
            onClick={() => goToPage(-1)}
            className="inline-flex items-center justify-center"
            style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${LINE_COLOR}`, backgroundColor: "transparent", color: TEXT_CREAM }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next industries"
            onClick={() => goToPage(1)}
            className="inline-flex items-center justify-center"
            style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${LINE_COLOR}`, backgroundColor: "transparent", color: TEXT_CREAM }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* Certificates — a single large cycling badge. */}
        <div style={{ borderTop: `1px solid ${LINE_COLOR}`, paddingTop: "32px", marginBottom: "44px" }}>
          <div className="flex items-center" style={{ gap: "10px", marginBottom: "18px" }}>
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "24px",
                width: "24px",
                flexShrink: 0,
                backgroundImage: DUSTY_CREAM_GRADIENT,
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
            <span className="font-heading" style={{ fontSize: "20px", fontWeight: 600, color: TEXT_CREAM }}>
              Certificates
            </span>
          </div>
          <h2 className="font-heading" style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.3, color: TEXT_CREAM, marginBottom: "12px" }}>
            {CERTIFICATIONS_HEADING}
          </h2>
          <p style={{ fontSize: "14px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.75, marginBottom: "28px" }}>
            {CERTIFICATIONS_SUPPORTING}
          </p>
          <div className="flex items-center justify-center" style={{ height: "220px" }}>
            <img
              key={panel3Cert.cert.name}
              src={panel3Cert.cert.image}
              alt={panel3Cert.cert.name}
              loading="lazy"
              style={{
                maxHeight: "100%",
                maxWidth: "80%",
                objectFit: "contain",
                filter: `${CERT_IMAGE_TINT} ${panel3Cert.phase === "idle" ? "blur(0px)" : "blur(10px)"}`,
                opacity: panel3Cert.phase === "idle" ? 1 : 0,
                transition: `filter ${CERT_BLUR_MS}ms ease, opacity ${CERT_BLUR_MS}ms ease`,
              }}
            />
          </div>
        </div>

        {/* Marquee band */}
        <div
          aria-hidden="true"
          className="pointer-events-none flex items-center overflow-hidden"
          style={{
            margin: "0 -20px 44px",
            padding: "20px 0",
            borderTop: `1px solid ${LINE_COLOR}`,
            borderBottom: `1px solid ${LINE_COLOR}`,
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

        {/* Two image+stats blocks, stacked (image above text). */}
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          <MobileImageStatsBlock
            imageSrc="/about-infrastructure.jpeg"
            imageAlt="Manufacturing infrastructure and testing facility"
            greeting="The numbers behind our impact."
            boldLine="Trusted across every industry."
            secondaryLine="From cement to power generation, our transformers are built to handle the harshest industrial conditions."
            statValue="500+"
            statLabel="Industries Trusting Us"
          />
          <MobileImageStatsBlock
            imageSrc="/why-choose-us/after-sales-support-new.jpeg"
            imageAlt="Engineers at work"
            greeting="The people driving that impact."
            boldLine="Decades of hands-on expertise."
            secondaryLine="Our engineers bring hands-on expertise to every project, from design through commissioning."
            statValue="15+"
            statLabel="Years of Industry Experience"
          />
        </div>
      </div>
    </section>
  );
}

function MobileImageStatsBlock({
  imageSrc,
  imageAlt,
  greeting,
  boldLine,
  secondaryLine,
  statValue,
  statLabel,
}: {
  imageSrc: string;
  imageAlt: string;
  greeting: string;
  boldLine: string;
  secondaryLine: string;
  statValue: string;
  statLabel: string;
}) {
  return (
    <div>
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        style={{ width: "100%", height: "200px", objectFit: "cover", filter: "grayscale(85%) brightness(0.5) contrast(1.05)", borderRadius: "2px" }}
      />
      <div style={{ marginTop: "18px", display: "flex", flexDirection: "column", gap: "10px" }}>
        <span style={{ fontSize: "13px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.7 }}>{greeting}</span>
        <p className="font-heading" style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1.25, color: TEXT_CREAM }}>
          {boldLine}
        </p>
        <p style={{ fontSize: "14px", lineHeight: 1.5, color: TEXT_CREAM, opacity: 0.8 }}>{secondaryLine}</p>
      </div>
      <div style={{ marginTop: "18px", paddingTop: "16px", borderTop: `1px solid ${LINE_COLOR}`, display: "flex", flexDirection: "column", gap: "4px" }}>
        <span className="font-heading" style={{ fontSize: "32px", fontWeight: 700, color: TEXT_CREAM }}>
          {statValue}
        </span>
        <span style={{ fontSize: "13px", color: TEXT_CREAM, opacity: 0.75 }}>{statLabel}</span>
      </div>
    </div>
  );
}
