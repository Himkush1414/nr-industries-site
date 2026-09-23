import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { clients } from "@/data/company";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page products/photo-grid/FAQ panel — promoted from /lab/lv9's
 * Lv6Page (src/lab-lv9/lv6/pages/Lv6Page.tsx), left untouched as the
 * reference this was copied from: cream/matte panel with a 4-column divider
 * grid, a top "NR INDUSTRIES" marquee, and six stacked sections below it
 * (products intro, product showcase, company statement, photo grid, a
 * second marquee, and an FAQ).
 *
 * Section A's and Section C's heights depend on their own text content
 * (line-wrapped paragraphs), so their bottoms are measured live via refs
 * rather than guessed as fixed pixel values — everything below them
 * (B through F) then cascades from those real measurements. Sections B, D,
 * E have fixed, content-controlled heights; Section F has the explicit
 * ~900px height from the original design.
 */

// Same 2-stop gradient + grain-texture technique used for this exact
// cream/matte background in lab-lv4.
const BG_GRADIENT = "linear-gradient(160deg, #F2F4F7 0%, #E8E4DC 100%)";
const PANEL_BG_COLOR = "#F2F4F7";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch' result='t'/%3E%3CfeColorMatrix in='t' type='saturate' values='0' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncA type='linear' slope='2.6' intercept='-0.6'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Same muted dark-taupe, low-alpha line color used in lab-lv4 — reads as a
// light, subtle "black matte" hairline against this cream background,
// rather than a heavy solid black rule.
const LINE_COLOR = "rgba(120, 112, 98, 0.14)";
const LINE_GRADIENT_VERTICAL = `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
const LINE_GRADIENT_HORIZONTAL = `linear-gradient(to right, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;

// Same 5-line structure used throughout the other lab routes: the two
// edges (0 and 1, at the 30px insets) plus 3 evenly-spaced dividers, giving
// 4 equal columns.
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];
const COLUMN_ONE_WIDTH = "calc((100% - 60px) * 0.25)";
// Left/right inset landing exactly on the panel 2/3 span (25%-75%).
const CONTENT_INSET = "calc(30px + (100% - 60px) * 0.25)";

// Same matte black used for the logo/text elsewhere on the cream panels
// (lab-lv4's LOGO_MATTE_BLACK), used here for both marquees' logo marks
// and text, and for body copy throughout this page.
const MATTE_BLACK = "#222222";

// Extra breathing room at the very top (before the top marquee) and very
// bottom (after the FAQ section) of the page, on top of everything else —
// makes the overall page taller/more scrollable at both ends. Was 100,
// nudged down in two rounds (to 85, then 60) so the whole top marquee+line
// block (both anchor off this) sits progressively higher.
const PAGE_TOP_PADDING = 60;
// Was upped to 160 earlier, then reported back as leftover dead space at
// the very bottom of the page — trimmed back down to a normal trailing
// gap, matching the ~60-80px rhythm the rest of the page's section gaps
// (SECTION_F_GAP, SECTION_D_GAP, SECTION_E_GAP) already use.
const PAGE_BOTTOM_PADDING = 70;

// Top section's closing line position — was 300px, moved to 200px, then
// pushed down further by PAGE_TOP_PADDING. The "200" local offset has
// since been nudged down twice too (to 185, then 165) — independent of
// PAGE_TOP_PADDING's own reductions above — to sit closer to the marquee
// text above it.
const TOP_LINE_POSITION = PAGE_TOP_PADDING + 165;
// The marquee wrapper's own box height, independent of TOP_LINE_POSITION —
// kept short enough (anchored at top:0) that its flex-centered text stays
// clear of the line above, rather than tying the two together and letting
// the text drift into the line whenever the line moves.
const MARQUEE_WRAPPER_HEIGHT = 160;
const MARQUEE_ITEM_GAP_PX = 90;

type MarqueeSlot = { type: "logo" } | { type: "word"; text: string };

function buildMarqueeTrack(word: string, repeats: number): MarqueeSlot[] {
  const base = Array.from({ length: repeats }, () => [
    { type: "logo" as const },
    { type: "word" as const, text: word },
  ]).flat();
  return [...base, ...base];
}

const TOP_MARQUEE_TRACK = buildMarqueeTrack("NR INDUSTRIES", 4);

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
          backgroundColor: MATTE_BLACK,
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
        color: MATTE_BLACK,
        flexShrink: 0,
        marginRight: `${MARQUEE_ITEM_GAP_PX}px`,
      }}
    >
      {item.text}
    </span>
  );
}

function MarqueeBand({ top, track }: { top: number; track: MarqueeSlot[] }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute flex items-center overflow-hidden"
      style={{
        top: `${top + 10}px`,
        height: `${MARQUEE_WRAPPER_HEIGHT}px`,
        left: 0,
        right: 0,
        // Nudges the text itself up within this wrapper's own 160px box,
        // independent of both the wrapper's own top offset
        // (PAGE_TOP_PADDING) and the closing line below (TOP_LINE_POSITION)
        // — a small relative adjustment layered on top of those two. Set
        // here on the non-animated wrapper (not the animated track below)
        // since a static transform on that inner div would just get
        // overwritten every frame by its own translateX keyframes.
        transform: "translateY(-20px)",
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "140s" }}>
        {track.map((item, i) => (
          <MarqueeItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

// A "+" that rotates 45deg into an "×" on click — two overlapping bars in a
// rotating wrapper, same technique used in lab-lv4's points/boxes.
function PlusCrossIcon({ active, size = 16, color = MATTE_BLACK }: { active: boolean; size?: number; color?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        transform: active ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: color,
          transform: "translateY(-50%)",
          transition: "background-color 0.25s ease",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: color,
          transform: "translateX(-50%)",
          transition: "background-color 0.25s ease",
        }}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section A — Products intro
// ---------------------------------------------------------------------------
const SECTION_A_TOP = TOP_LINE_POSITION + 70;
// The wrapper (holding both the paragraph and the button) shifts down by
// 35px total — the paragraph, as the wrapper's first child, gets that
// full +35px (its own requested +15px "natural" shift, plus another
// +20px on top). The button sits after it in the same flex column, so
// for the button's own net shift to come out to +15px (20px less than
// the paragraph's), the gap between them has to shrink by that same 20px
// (28px original -> 8px) — the two are structurally linked, so a smaller
// shift for the button below a larger shift for the text above it means
// the space between them necessarily closes up a bit.
const SECTION_A_WRAPPER_TOP = SECTION_A_TOP + 35;
// Original copy (not copied from the real ProductsPage's hero description),
// capturing the same real facts (full equipment range, built for power
// plants/industrial/utility-scale use).
const PRODUCTS_INTRO_TEXT =
  "A complete range of power and distribution equipment, engineered for power plants, industrial facilities, and utility-scale networks.";

// ---------------------------------------------------------------------------
// Section B — Product showcase
// ---------------------------------------------------------------------------
const SECTION_B_GAP = 75;
const SECTION_B_HEIGHT = 440;
// Real products (src/data/products.ts, the same data the live ProductsPage
// uses) with their real card descriptions and real product photos.
const PRODUCTS = [
  { name: "Power Transformers", description: "High-efficiency power transformers for power plants, industrial facilities, and utilities.", image: "/products/power-transformers-main.webp" },
  { name: "Distribution Transformers", description: "Reliable distribution transformers stepping down power for commercial and industrial use.", image: "/products/distribution-transformers-main.webp" },
  { name: "Solar Inverter Duty Transformers", description: "Grid-matching transformers engineered for solar power systems and harmonic stability.", image: "/products/solar-inverter-duty-transformers-main.webp" },
  { name: "Furnace Transformers", description: "Heavy-duty transformers built for the extreme demands of arc and induction furnaces.", image: "/products/furnace-transformers-main.webp" },
  { name: "Servo Voltage Stabilizer", description: "Oil-cooled servo stabilizers protecting equipment from input voltage fluctuation.", image: "/products/servo-voltage-stabilizer-main.webp" },
  { name: "HT-AVR Transformer", description: "Precision transformer combining HT AVR and distribution transformer in a single unit.", image: "/products/ht-avr-transformer-main.webp" },
  { name: "Dry Type Transformer", description: "Air-cooled transformers offering safer, low-maintenance indoor and outdoor operation.", image: "/products/dry-type-transformer-main.webp" },
  { name: "Compact Substation", description: "Pre-engineered, modular substation integrating transformer, switchgear and protection.", image: "/products/compact-substation-main.webp" },
  { name: "HT & LT Panels", description: "High and low tension panels and RMUs for distributing and controlling power.", image: "/products/ht-lt-panels-main.webp" },
];
const PRODUCT_BLUR_TRANSITION_MS = 400;
// Each column now cycles through the full product list independently, on
// its own repeating 7s interval, staggered so they never all change at
// once: panel 4 starts at 7s, panel 3 at 10s, panel 2 at 13s, panel 1 at
// 16s (a consistent +3s stagger per panel, each then repeating every 7s).
const PRODUCT_CYCLE_MS = 7000;
const PRODUCT_START_DELAYS_MS = [16000, 13000, 10000, 7000]; // panel 1, 2, 3, 4
// Starting products spread evenly across the list so the 4 panels don't
// all show the same product initially.
const PRODUCT_START_INDEXES = [0, 2, 4, 6]; // panel 1, 2, 3, 4

// ---------------------------------------------------------------------------
// Section C — Company statement
// ---------------------------------------------------------------------------
// Was 150 — increased by another 150 to move the whole section down.
const SECTION_C_GAP = 300;
// Original tagline, not duplicated from anywhere else on the site.
const COMPANY_STATEMENT = "Power isn't just what we build. It's a promise we keep.";

// ---------------------------------------------------------------------------
// Section D — Photo grid
// ---------------------------------------------------------------------------
const SECTION_D_GAP = 80;
const SECTION_D_HEIGHT = 470;
const PHOTO_HEIGHT = 320;
// Inset applied to both sides of each image's own column so neighboring
// images don't touch — a 2 * PHOTO_GAP_INSET gap between adjacent photos.
const PHOTO_GAP_INSET = 10;
// Real photos (public/why-choose-us/, the same 4 real assets used
// elsewhere) with original captions written for this page (not copied from
// lab-lv4's wording for the same photos).
const PHOTO_GRID = [
  { image: "/why-choose-us/precision-engineering.jpeg", caption: "Precision built into every product we ship." },
  { image: "/why-choose-us/international-standards.jpeg", caption: "Tested against internationally recognized standards." },
  { image: "/why-choose-us/after-sales-support-new.jpeg", caption: "Support that continues well after installation." },
  { image: "/why-choose-us/eco-friendly-manufacturing.jpeg", caption: "Manufacturing built around sustainability." },
];
// Dusty/muted but still colorful — a moderate saturation cut plus a slight
// warm shift, not full grayscale and not full raw brightness/saturation.
const PHOTO_TINT = "saturate(0.55) sepia(0.12) brightness(0.96) contrast(0.95)";

// ---------------------------------------------------------------------------
// Section E — Company statement + logo marquee
// ---------------------------------------------------------------------------
const SECTION_E_GAP = 80;
// The boxed height between Section E's own top/bottom framing lines. Its
// content (statement + gap + logo band) is vertically centered inside this
// box, so this number IS the section's real total height, not a padding
// value stacked above the content — set it directly to ~250px rather than
// inflating it and letting the centering absorb the difference as top/
// bottom margin (which is what previously made the extra space read as
// sitting at the section's top).
const SECTION_E_HEIGHT = 250;
// Exact phrasing pulled from the homepage hero's eyebrow line (see
// src/pages/HomePage.tsx) rather than invented — a real one-line company
// descriptor, short enough to stay on one line at this size.
const SECTION_E_STATEMENT = "Power & Distribution Equipment Manufacturer";
// Every real client logo (src/data/company.ts's `clients`, the same set
// ClientMarquee.tsx uses on the live site), duplicated once so the track
// loops seamlessly at -50% translateX (same technique as buildMarqueeTrack
// and ClientMarquee's own row).
const LOGO_MARQUEE_TRACK = [...clients, ...clients];
const LOGO_MARQUEE_HEIGHT = 95;
const LOGO_MARQUEE_GAP_PX = 80;

function LogoMarqueeBand() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none overflow-hidden"
      style={{
        width: "100%",
        maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "70s" }}>
        {LOGO_MARQUEE_TRACK.map((client, i) => (
          <img
            key={`${client.name}-${i}`}
            src={client.logoSrc}
            alt={client.name}
            loading="lazy"
            style={{
              height: `${LOGO_MARQUEE_HEIGHT}px`,
              width: "auto",
              maxWidth: "210px",
              objectFit: "contain",
              flexShrink: 0,
              marginRight: `${LOGO_MARQUEE_GAP_PX}px`,
              // Same muted treatment as Section D's photos (PHOTO_TINT) —
              // toned down to blend with the cream background rather than
              // reading as full-color brand marks, but not desaturated
              // to plain grayscale.
              filter: PHOTO_TINT,
            }}
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Section F — FAQ
// ---------------------------------------------------------------------------
const SECTION_F_GAP = 60;
// Was 900 — measured against the tallest real case (the last FAQ row open,
// which pushes content lowest and adds its own reveal height): content
// bottoms out at ~838px from this box's own top, so 860 still keeps a
// ~22px safety margin without leaving a few hundred wasted px below it.
const SECTION_F_HEIGHT = 860;
// A touch darker than the page's usual LINE_COLOR hairline — the FAQ list's
// row dividers need to read clearly against the cream background at this
// small, unobtrusive 1px weight, more than the big full-width panel
// dividers (which get length and gradient fade to stay legible) do.
const FAQ_DIVIDER_COLOR = "rgba(120, 112, 98, 0.28)";
// Left 30% of panel 2 — each FaqItem row's own icon column (holding its
// question-mark image) lives here, one per question row, left of the
// vertical boundary line that still marks this zone.
const FAQ_ICON_ZONE_END = 0.25 + 0.3 * 0.25; // 0.325
const FAQ_ICON_ZONE_WIDTH_FRACTION = FAQ_ICON_ZONE_END - 0.25; // 0.075
// Text column: remaining 70% of panel 2, plus all of panel 3.
const FAQ_TEXT_LEFT = `calc(30px + (100% - 60px) * ${FAQ_ICON_ZONE_END})`;
const FAQ_TEXT_ZONE_FRACTION = 0.75 - FAQ_ICON_ZONE_END; // 0.425
const FAQ_TEXT_WIDTH = `calc((100% - 60px) * ${FAQ_TEXT_ZONE_FRACTION})`;
// Each FaqItem row only occupies the text+button zone (0.325-1.0 of page
// width), so its own border-top would normally stop short of the icon
// zone (0.25-0.325). Expressed as a fraction of the row's OWN width, that
// zone is FAQ_ICON_ZONE_WIDTH_FRACTION / (text zone + button zone) — used
// to pull the row's box (and its divider) that far left via a negative
// margin, with matching padding to keep its actual content in place.
const FAQ_ROW_ZONE_FRACTION = FAQ_TEXT_ZONE_FRACTION + 0.25;
const FAQ_ROW_EXTEND_RATIO = FAQ_ICON_ZONE_WIDTH_FRACTION / FAQ_ROW_ZONE_FRACTION; // 1/9
// Real, grounded Q&A (same content already used in this project's own
// experimental FAQ components — certifications, AMC, repair services — not
// invented claims).
const FAQS = [
  {
    question: "How long does delivery typically take?",
    answer:
      "Timelines depend on the unit's rating and specification, but our logistics are organized around on-time delivery — confirmed for your exact order at the quotation stage.",
  },
  {
    question: "Can equipment be customized to our site's voltage and load requirements?",
    answer:
      "Yes. Every unit is engineered to the load, voltage class, and environmental demands of its site rather than built to a generic spec sheet.",
  },
  {
    question: "What certifications do your products carry?",
    answer:
      "Our operations are ISO 9001:2015 certified, with products tested and validated against BIS, ERDA, NABL, and CPRI standards.",
  },
  {
    question: "Do you offer support after installation?",
    answer:
      "Yes — our team stays engaged from consultation through commissioning and beyond, including Annual Maintenance Contracts (AMC).",
  },
  {
    question: "Do you repair existing transformers, or only supply new ones?",
    answer: "Both. We offer distribution and power transformer repair services, backed by warranty.",
  },
];

/** One product column's independent cycle-through-the-full-list state,
 * with its own blur-out/swap/blur-in phase machine and its own start
 * delay/repeat interval — used four times (one per panel) with different
 * `startIndex`/`startDelayMs` so the columns show different products and
 * auto-advance on staggered schedules instead of all changing together.
 * `advance` is also exposed so the shared left/right arrows can nudge every
 * column immediately, independent of (and without resetting) each
 * column's own timer. */
function useProductSlot(startIndex: number, startDelayMs: number) {
  const [index, setIndex] = useState(startIndex);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");
  const phaseRef = useRef(phase);
  phaseRef.current = phase;

  function advance(direction: 1 | -1) {
    if (phaseRef.current !== "idle") return;
    setPhase("out");
    window.setTimeout(() => {
      setIndex((i) => (i + direction + PRODUCTS.length) % PRODUCTS.length);
      setPhase("in");
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setPhase("idle");
        });
      });
    }, PRODUCT_BLUR_TRANSITION_MS);
  }

  useLayoutEffect(() => {
    let intervalId = 0;
    const startTimer = window.setTimeout(() => {
      intervalId = window.setInterval(() => advance(1), PRODUCT_CYCLE_MS);
    }, startDelayMs);
    return () => {
      window.clearTimeout(startTimer);
      window.clearInterval(intervalId);
    };
  }, []);

  return { product: PRODUCTS[index]!, phase, advance };
}

export function ProductsFaqSection() {
  const mainSectionRef = useRef<HTMLElement>(null);
  const sectionARef = useRef<HTMLDivElement>(null);
  const sectionCRef = useRef<HTMLDivElement>(null);

  const [sectionBTop, setSectionBTop] = useState<number | null>(null);
  const [sectionDTop, setSectionDTop] = useState<number | null>(null);

  // Stage 1: measure Section A's real bottom (its paragraph's line count
  // isn't known ahead of time) to place Section B.
  useLayoutEffect(() => {
    function measure() {
      const main = mainSectionRef.current;
      const a = sectionARef.current;
      if (!main || !a) return;
      const mainTop = main.getBoundingClientRect().top;
      setSectionBTop(a.getBoundingClientRect().bottom - mainTop + SECTION_B_GAP);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const sectionCTop = sectionBTop !== null ? sectionBTop + SECTION_B_HEIGHT + SECTION_C_GAP : null;

  // Stage 2: Section C only mounts once sectionCTop is known, so this
  // effect (depending on sectionBTop) re-fires right after it mounts to
  // measure its own real bottom (its tagline's line count also isn't known
  // ahead of time) to place Section D.
  useLayoutEffect(() => {
    if (sectionCTop === null) return;
    function measure() {
      const main = mainSectionRef.current;
      const c = sectionCRef.current;
      if (!main || !c) return;
      const mainTop = main.getBoundingClientRect().top;
      setSectionDTop(c.getBoundingClientRect().bottom - mainTop + SECTION_D_GAP);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [sectionCTop]);

  const sectionETop = sectionDTop !== null ? sectionDTop + SECTION_D_HEIGHT + SECTION_E_GAP : null;
  const sectionFTop = sectionETop !== null ? sectionETop + SECTION_E_HEIGHT + SECTION_F_GAP : null;
  const totalHeight = sectionFTop !== null ? sectionFTop + SECTION_F_HEIGHT + PAGE_BOTTOM_PADDING : null;

  // Section B: 4 independent per-column carousels, each auto-advancing on
  // its own staggered schedule (see PRODUCT_START_DELAYS_MS/INDEXES).
  const productSlots = [
    useProductSlot(PRODUCT_START_INDEXES[0]!, PRODUCT_START_DELAYS_MS[0]!),
    useProductSlot(PRODUCT_START_INDEXES[1]!, PRODUCT_START_DELAYS_MS[1]!),
    useProductSlot(PRODUCT_START_INDEXES[2]!, PRODUCT_START_DELAYS_MS[2]!),
    useProductSlot(PRODUCT_START_INDEXES[3]!, PRODUCT_START_DELAYS_MS[3]!),
  ];

  // Arrows nudge every column by one product immediately, independent of
  // (and without resetting) each column's own auto-cycle timer.
  function goToProductPage(direction: 1 | -1) {
    for (const slot of productSlots) slot.advance(direction);
  }

  // Section F: click-only accordion (never hover-triggered), one answer
  // open at a time — opening a new one closes whichever was open. This
  // isn't just a UX default: Section F's height is fixed at ~900px, and
  // with all 5 answers open at once the flex-flowed list is taller than
  // that box, silently clipped by the section's own overflow-hidden. A
  // single open answer never gets close to that limit.
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  function toggleFaq(index: number) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }

  return (
    <>
      <FaqSchema />
      <section
        ref={mainSectionRef}
        className="relative overflow-hidden lv9-lv6-section"
        style={{ width: "100%", height: totalHeight !== null ? `${totalHeight}px` : "300vh" }}
      >
      {/* `totalHeight` is JS-computed (a cascading chain of live
          measurements), so — same reasoning as LV4's own section — this
          uses `!important` to override the inline height on mobile rather
          than moving it into a plain class rule. Desktop is untouched (no
          media query matches above MOBILE_BREAKPOINT); the whole desktop
          tree below is wrapped and hidden on mobile in favor of a simpler,
          separate, normal-flow mobile tree, for the same reason as LV3/LV4/
          LV5's own responsive passes: this layout's positions are tuned for
          a desktop measurement chain that doesn't translate to a single-
          column mobile reflow. */}
      <style>{`
        .lv9-lv6-desktop { display: block; }
        .lv9-lv6-mobile { display: none; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv9-lv6-section { height: auto !important; overflow: visible !important; }
          .lv9-lv6-desktop { display: none; }
          .lv9-lv6-mobile { display: block; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`,
          backgroundBlendMode: "overlay, normal",
          backgroundSize: "120px 120px, cover",
        }}
      />
      <div className="lv9-lv6-desktop">
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

      {/* Horizontal line closing the top section — 200px down. */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: `${TOP_LINE_POSITION}px`, left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
      />

      {/* Top marquee band. */}
      <MarqueeBand top={PAGE_TOP_PADDING} track={TOP_MARQUEE_TRACK} />

      {/* SECTION A — Products intro, 70px below the top line. */}
      <div
        className="absolute flex items-center"
        style={{ top: `${SECTION_A_TOP}px`, left: "30px", width: COLUMN_ONE_WIDTH, gap: "24px" }}
      >
        <div
          role="img"
          aria-label="Company logo"
          style={{
            height: "25px",
            width: "25px",
            flexShrink: 0,
            backgroundColor: MATTE_BLACK,
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
        <span className="font-heading" style={{ fontSize: "25px", fontWeight: 600, color: MATTE_BLACK }}>
          Products
        </span>
      </div>

      <div
        ref={sectionARef}
        className="absolute flex flex-col"
        style={{ top: `${SECTION_A_WRAPPER_TOP}px`, left: CONTENT_INSET, right: CONTENT_INSET, gap: "8px" }}
      >
        <p style={{ fontSize: "40px", fontWeight: 500, lineHeight: 1.3, color: MATTE_BLACK }}>{PRODUCTS_INTRO_TEXT}</p>
        <button
          type="button"
          className="inline-flex items-center"
          style={{
            alignSelf: "flex-start",
            gap: "10px",
            padding: "14px 28px",
            borderRadius: "6px",
            backgroundColor: MATTE_BLACK,
            color: PANEL_BG_COLOR,
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
          }}
        >
          View Products
          <ArrowRight style={{ width: "18px", height: "18px" }} aria-hidden="true" />
        </button>
      </div>

      {/* SECTION B — Product showcase. No horizontal lines anywhere in
          this section (above, below, or between columns). */}
      {sectionBTop !== null && (
        <>
          {productSlots.map((slot, i) => (
            <div
              key={i}
              className="absolute flex flex-col items-center"
              style={{
                top: `${sectionBTop + 20}px`,
                left: `calc(30px + (100% - 60px) * ${i * 0.25} + 20px)`,
                width: `calc((100% - 60px) * 0.25 - 40px)`,
                height: `calc(${SECTION_B_HEIGHT}px - 40px)`,
                gap: "16px",
                filter: slot.phase === "idle" ? "blur(0px)" : "blur(10px)",
                opacity: slot.phase === "idle" ? 1 : 0,
                transition: `filter ${PRODUCT_BLUR_TRANSITION_MS}ms ease, opacity ${PRODUCT_BLUR_TRANSITION_MS}ms ease`,
              }}
            >
              <p style={{ fontSize: "16px", lineHeight: 1.5, textAlign: "center", color: MATTE_BLACK }}>
                {slot.product.description}
              </p>
              <img
                src={slot.product.image}
                alt={slot.product.name}
                loading="lazy"
                style={{ width: "100%", flex: 1, objectFit: "contain", minHeight: 0 }}
              />
              <span className="font-heading" style={{ fontSize: "16px", fontWeight: 600, color: MATTE_BLACK, textAlign: "center" }}>
                {slot.product.name}
              </span>
            </div>
          ))}

          <button
            type="button"
            aria-label="Previous products"
            onClick={() => goToProductPage(-1)}
            className="absolute inline-flex items-center justify-center"
            style={{
              top: `${sectionBTop + SECTION_B_HEIGHT / 2 - 18}px`,
              left: "50px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${LINE_COLOR}`,
              backgroundColor: "transparent",
              color: MATTE_BLACK,
              cursor: "pointer",
            }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => goToProductPage(1)}
            className="absolute inline-flex items-center justify-center"
            style={{
              top: `${sectionBTop + SECTION_B_HEIGHT / 2 - 18}px`,
              right: "50px",
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: `1px solid ${LINE_COLOR}`,
              backgroundColor: "transparent",
              color: MATTE_BLACK,
              cursor: "pointer",
            }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </>
      )}

      {/* SECTION C — Company statement. */}
      {sectionCTop !== null && (
        <>
          <div
            className="absolute flex items-center"
            style={{ top: `${sectionCTop}px`, left: "30px", width: COLUMN_ONE_WIDTH, gap: "10px" }}
          >
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "30px",
                width: "30px",
                flexShrink: 0,
                backgroundColor: MATTE_BLACK,
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
            <span className="font-heading" style={{ fontSize: "30px", fontWeight: 600, color: MATTE_BLACK }}>
              NR Industries
            </span>
          </div>

          <p
            ref={sectionCRef}
            className="absolute font-heading"
            style={{
              top: `${sectionCTop}px`,
              left: CONTENT_INSET,
              right: CONTENT_INSET,
              fontSize: "65px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: MATTE_BLACK,
            }}
          >
            {COMPANY_STATEMENT}
          </p>
        </>
      )}

      {/* SECTION D — Photo grid. */}
      {sectionDTop !== null &&
        PHOTO_GRID.map((photo, i) => (
          <div key={photo.image}>
            <div
              className="absolute overflow-hidden"
              style={{
                top: `${sectionDTop}px`,
                left: `calc(30px + (100% - 60px) * ${i * 0.25} + ${PHOTO_GAP_INSET}px)`,
                width: `calc((100% - 60px) * 0.25 - ${PHOTO_GAP_INSET * 2}px)`,
                height: `${PHOTO_HEIGHT}px`,
              }}
            >
              <img
                src={photo.image}
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "100%", objectFit: "cover", filter: PHOTO_TINT }}
              />
            </div>
            <div
              className="absolute flex items-center justify-between"
              style={{
                top: `${sectionDTop + PHOTO_HEIGHT + 27}px`,
                left: `calc(30px + (100% - 60px) * ${i * 0.25} + 16px)`,
                width: `calc((100% - 60px) * 0.25 - 32px)`,
                gap: "12px",
              }}
            >
              <span style={{ fontSize: "25px", lineHeight: 1.3, color: MATTE_BLACK, flex: 1 }}>{photo.caption}</span>
              <PhotoCaptionIcon />
            </div>
          </div>
        ))}

      {/* SECTION E — Company statement + logo marquee, framed by its own
          top/bottom lines (SECTION_E_HEIGHT apart). Content is a flex
          column centered within that boxed area, rather than each piece
          hand-positioned with its own top offset. */}
      {sectionETop !== null && (
        <>
          <div
            aria-hidden="true"
            className="absolute"
            style={{ top: `${sectionETop}px`, left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
          />
          <div
            className="absolute flex flex-col items-center justify-center"
            style={{ top: `${sectionETop}px`, height: `${SECTION_E_HEIGHT}px`, left: 0, right: 0, gap: "36px" }}
          >
            <p
              className="font-heading"
              style={{
                fontSize: "50px",
                fontWeight: 700,
                lineHeight: 1.15,
                color: MATTE_BLACK,
                textAlign: "center",
                whiteSpace: "nowrap",
                margin: 0,
                padding: "0 30px",
              }}
            >
              {SECTION_E_STATEMENT}
            </p>
            <LogoMarqueeBand />
          </div>
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: `${sectionETop + SECTION_E_HEIGHT}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundImage: LINE_GRADIENT_HORIZONTAL,
            }}
          />
        </>
      )}

      {/* SECTION F — FAQ. */}
      {sectionFTop !== null && (
        <div className="absolute" style={{ top: `${sectionFTop}px`, height: `${SECTION_F_HEIGHT}px`, left: 0, right: 0 }}>
          {/* Vertical line at the 30%-of-panel-2 boundary, full height of
              this FAQ section. */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: `calc(30px + (100% - 60px) * ${FAQ_ICON_ZONE_END})`,
              width: "1px",
              backgroundImage: LINE_GRADIENT_VERTICAL,
            }}
          />

          <div
            className="absolute flex flex-col"
            style={{ top: "40px", left: FAQ_TEXT_LEFT, width: `calc(${FAQ_TEXT_WIDTH} + (100% - 60px) * 0.25)` }}
          >
            <h3 className="font-heading" style={{ fontSize: "34px", fontWeight: 700, lineHeight: 1.2, color: MATTE_BLACK, margin: 0 }}>
              Frequently Asked Questions
            </h3>
            <p style={{ fontSize: "16px", lineHeight: 1.6, color: MATTE_BLACK, opacity: 0.55, marginTop: "10px", marginBottom: "40px", maxWidth: FAQ_TEXT_WIDTH }}>
              Answers to what teams most often ask us before placing an order.
            </p>

            <div className="flex flex-col">
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.question} faq={faq} isOpen={openFaqIndex === i} isFirst={i === 0} onToggle={() => toggleFaq(i)} />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>

      {/* ---------------------------------------------------------------
          MOBILE (<=767px) — separate, simple, normal-flow rendering of
          the same 6 sections in the same order, reusing the same state
          (productSlots, openFaqIndex/toggleFaq) rather than duplicating
          any timers/cycling logic.
          --------------------------------------------------------------- */}
      <div className="lv9-lv6-mobile relative" style={{ padding: "60px 20px 50px" }}>
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

        {/* Top marquee */}
        <div
          aria-hidden="true"
          className="pointer-events-none flex items-center overflow-hidden"
          style={{
            margin: "0 -20px 32px",
            padding: "16px 0",
            borderBottom: `1px solid ${LINE_COLOR}`,
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "90s" }}>
            {TOP_MARQUEE_TRACK.map((item, i) => (
              <MarqueeItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* SECTION A — Products intro */}
        <div className="flex items-center" style={{ gap: "10px", marginBottom: "16px" }}>
          <div
            role="img"
            aria-label="Company logo"
            style={{
              height: "20px",
              width: "20px",
              flexShrink: 0,
              backgroundColor: MATTE_BLACK,
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
          <span className="font-heading" style={{ fontSize: "18px", fontWeight: 600, color: MATTE_BLACK }}>
            Products
          </span>
        </div>
        <p style={{ fontSize: "20px", fontWeight: 500, lineHeight: 1.35, color: MATTE_BLACK, marginBottom: "16px" }}>
          {PRODUCTS_INTRO_TEXT}
        </p>
        <button
          type="button"
          className="inline-flex items-center"
          style={{
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "6px",
            backgroundColor: MATTE_BLACK,
            color: PANEL_BG_COLOR,
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            marginBottom: "44px",
          }}
        >
          View Products
          <ArrowRight style={{ width: "16px", height: "16px" }} aria-hidden="true" />
        </button>

        {/* SECTION B — Product showcase: 4 independently-cycling slots,
            reusing the exact same productSlots state as desktop, stacked
            instead of in a 4-column row. */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "20px" }}>
          {productSlots.map((slot, i) => (
            <div
              key={i}
              style={{
                filter: slot.phase === "idle" ? "blur(0px)" : "blur(8px)",
                opacity: slot.phase === "idle" ? 1 : 0,
                transition: `filter ${PRODUCT_BLUR_TRANSITION_MS}ms ease, opacity ${PRODUCT_BLUR_TRANSITION_MS}ms ease`,
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <img
                src={slot.product.image}
                alt={slot.product.name}
                loading="lazy"
                style={{ width: "110px", height: "110px", objectFit: "contain", flexShrink: 0 }}
              />
              <div>
                <span className="font-heading" style={{ fontSize: "15px", fontWeight: 600, color: MATTE_BLACK }}>
                  {slot.product.name}
                </span>
                <p style={{ marginTop: "4px", fontSize: "13px", lineHeight: 1.5, color: MATTE_BLACK, opacity: 0.75 }}>
                  {slot.product.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center" style={{ gap: "16px", marginBottom: "44px" }}>
          <button
            type="button"
            aria-label="Previous products"
            onClick={() => goToProductPage(-1)}
            className="inline-flex items-center justify-center"
            style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${LINE_COLOR}`, backgroundColor: "transparent", color: MATTE_BLACK }}
          >
            <ChevronLeft size={18} aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Next products"
            onClick={() => goToProductPage(1)}
            className="inline-flex items-center justify-center"
            style={{ width: "36px", height: "36px", borderRadius: "50%", border: `1px solid ${LINE_COLOR}`, backgroundColor: "transparent", color: MATTE_BLACK }}
          >
            <ChevronRight size={18} aria-hidden="true" />
          </button>
        </div>

        {/* SECTION C — Company statement */}
        <div style={{ borderTop: `1px solid ${LINE_COLOR}`, paddingTop: "36px", marginBottom: "44px" }}>
          <div className="flex items-center" style={{ gap: "10px", marginBottom: "16px" }}>
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "22px",
                width: "22px",
                flexShrink: 0,
                backgroundColor: MATTE_BLACK,
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
            <span className="font-heading" style={{ fontSize: "18px", fontWeight: 600, color: MATTE_BLACK }}>
              NR Industries
            </span>
          </div>
          <p className="font-heading" style={{ fontSize: "28px", fontWeight: 700, lineHeight: 1.3, color: MATTE_BLACK }}>
            {COMPANY_STATEMENT}
          </p>
        </div>

        {/* SECTION D — Photo grid, stacked. */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "44px" }}>
          {PHOTO_GRID.map((photo) => (
            <div key={photo.image}>
              <img
                src={photo.image}
                alt=""
                loading="lazy"
                style={{ width: "100%", height: "200px", objectFit: "cover", filter: PHOTO_TINT, borderRadius: "2px" }}
              />
              <div className="flex items-center justify-between" style={{ marginTop: "14px", gap: "12px" }}>
                <span style={{ fontSize: "16px", lineHeight: 1.4, color: MATTE_BLACK, flex: 1 }}>{photo.caption}</span>
                <PhotoCaptionIcon />
              </div>
            </div>
          ))}
        </div>

        {/* SECTION E — Statement + logo marquee. */}
        <div style={{ borderTop: `1px solid ${LINE_COLOR}`, borderBottom: `1px solid ${LINE_COLOR}`, padding: "32px 0", marginBottom: "44px", display: "flex", flexDirection: "column", gap: "24px" }}>
          <p className="font-heading" style={{ fontSize: "20px", fontWeight: 700, lineHeight: 1.3, color: MATTE_BLACK, textAlign: "center" }}>
            {SECTION_E_STATEMENT}
          </p>
          <LogoMarqueeBand />
        </div>

        {/* SECTION F — FAQ */}
        <h3 className="font-heading" style={{ fontSize: "24px", fontWeight: 700, lineHeight: 1.2, color: MATTE_BLACK, marginBottom: "8px" }}>
          Frequently Asked Questions
        </h3>
        <p style={{ fontSize: "14px", lineHeight: 1.6, color: MATTE_BLACK, opacity: 0.55, marginBottom: "24px" }}>
          Answers to what teams most often ask us before placing an order.
        </p>
        <div className="flex flex-col">
          {FAQS.map((faq, i) => (
            <MobileFaqItem key={faq.question} faq={faq} isOpen={openFaqIndex === i} isFirst={i === 0} onToggle={() => toggleFaq(i)} />
          ))}
        </div>
      </div>
      </section>
    </>
  );
}

/** FAQPage structured data (JSON-LD) for the section's Q&A — same FAQS content
 * rendered visually above, so search engines and AI answer engines can cite it
 * directly (AEO). */
function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Safe to inject: built entirely from the FAQS constant above, never from user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/** One FAQ row: click-only toggle (via the cross-icon button or the row
 * itself — never hover), with local hover state purely for the visual
 * affordance (question emphasis, button tint) that signals it's
 * interactive without changing open/closed state on its own. */
function FaqItem({
  faq,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onToggle}
      style={{
        display: "flex",
        alignItems: "flex-start",
        cursor: "pointer",
        // Pulled left so the row's box (and its icon column) reaches back
        // across the icon zone (0.25-0.325 of the page) instead of
        // stopping at this row's default left edge (0.325) — see
        // FAQ_ROW_EXTEND_RATIO. Unlike the previous divider-only version,
        // that reclaimed space is now real flex content (the icon column
        // below), not just padding.
        marginLeft: `calc(-100% * ${FAQ_ROW_EXTEND_RATIO})`,
        width: `calc(100% * ${1 + FAQ_ROW_EXTEND_RATIO})`,
        borderTop: isFirst ? "none" : `1px solid ${FAQ_DIVIDER_COLOR}`,
        paddingTop: isFirst ? "0px" : "40px",
        paddingBottom: "40px",
      }}
    >
      {/* Icon column: the 30%-of-panel-2 icon zone reclaimed by the
          negative margin above. flex-grow (basis 0) split 3:17:10 across
          the icon/text/button columns matches the page-fraction ratio
          0.075:0.425:0.25 (icon zone : text zone : button zone) —
          expressing it this way (rather than each column's own
          calc(100%...) constant) keeps it correct regardless of this
          row's actual rendered width, which is what previously dragged
          the toggle button back into Panel 3. */}
      {/* height matches the question title's own line-height, so the much
          taller icon still optically centers against just that line (not
          the row's full, variable height) — it overflows the box
          symmetrically above/below rather than being clipped. */}
      <div style={{ flex: "3 0 0px", display: "flex", justifyContent: "center", alignItems: "center", height: "37px" }}>
        <img
          src="/faq-question-mark.png"
          alt=""
          loading="lazy"
          aria-hidden="true"
          style={{ width: "120px", height: "120px", objectFit: "contain", mixBlendMode: "multiply" }}
        />
      </div>
      <div style={{ flex: "17 0 0px", paddingRight: "32px" }}>
        <p
          className="font-heading"
          style={{
            fontSize: "26px",
            fontWeight: 600,
            lineHeight: 1.4,
            color: MATTE_BLACK,
            opacity: isOpen || hovered ? 1 : 0.82,
            transition: "opacity 0.25s ease",
          }}
        >
          {faq.question}
        </p>
        <p
          style={{
            fontSize: "16px",
            lineHeight: 1.65,
            color: MATTE_BLACK,
            opacity: isOpen ? 0.72 : 0,
            marginTop: isOpen ? "14px" : "0px",
            maxHeight: isOpen ? "160px" : "0px",
            overflow: "hidden",
            transition:
              "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {faq.answer}
        </p>
      </div>
      <div style={{ flex: "10 0 0px", display: "flex", justifyContent: "flex-end", paddingRight: "40px" }}>
        <button
          type="button"
          aria-label={isOpen ? `Collapse answer: ${faq.question}` : `Expand answer: ${faq.question}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="inline-flex items-center justify-center"
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "0px",
            border: `1px solid ${isOpen ? MATTE_BLACK : LINE_COLOR}`,
            backgroundColor: isOpen ? MATTE_BLACK : hovered ? "rgba(34, 34, 34, 0.05)" : "transparent",
            cursor: "pointer",
            flexShrink: 0,
            transition: "background-color 0.25s ease, border-color 0.25s ease",
          }}
        >
          <PlusCrossIcon active={isOpen} size={16} color={isOpen ? PANEL_BG_COLOR : MATTE_BLACK} />
        </button>
      </div>
    </div>
  );
}

/** Mobile-only FAQ row — same click-only accordion behavior/state as
 * desktop's FaqItem, laid out as a plain simple stack instead of the
 * desktop's icon-zone flex-ratio columns tuned for a wide row. */
function MobileFaqItem({
  faq,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      style={{
        cursor: "pointer",
        borderTop: isFirst ? "none" : `1px solid ${FAQ_DIVIDER_COLOR}`,
        paddingTop: isFirst ? "0px" : "24px",
        paddingBottom: "24px",
      }}
    >
      <div className="flex items-start justify-between" style={{ gap: "16px" }}>
        <p className="font-heading" style={{ fontSize: "17px", fontWeight: 600, lineHeight: 1.4, color: MATTE_BLACK, flex: 1 }}>
          {faq.question}
        </p>
        <button
          type="button"
          aria-label={isOpen ? `Collapse answer: ${faq.question}` : `Expand answer: ${faq.question}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="inline-flex items-center justify-center"
          style={{
            width: "32px",
            height: "32px",
            flexShrink: 0,
            border: `1px solid ${isOpen ? MATTE_BLACK : LINE_COLOR}`,
            backgroundColor: isOpen ? MATTE_BLACK : "transparent",
          }}
        >
          <PlusCrossIcon active={isOpen} size={14} color={isOpen ? PANEL_BG_COLOR : MATTE_BLACK} />
        </button>
      </div>
      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.6,
          color: MATTE_BLACK,
          opacity: isOpen ? 0.72 : 0,
          marginTop: isOpen ? "12px" : "0px",
          maxHeight: isOpen ? "200px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {faq.answer}
      </p>
    </div>
  );
}

function PhotoCaptionIcon() {
  const [active, setActive] = useState(false);
  return (
    <button
      type="button"
      aria-label={active ? "Collapse" : "Expand"}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="inline-flex items-center justify-center"
      style={{
        width: "36px",
        height: "36px",
        borderRadius: "50%",
        border: `1px solid ${LINE_COLOR}`,
        backgroundColor: "transparent",
        cursor: "pointer",
        flexShrink: 0,
      }}
    >
      <PlusCrossIcon active={active} />
    </button>
  );
}
