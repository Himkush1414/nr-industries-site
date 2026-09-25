import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProductShowcase } from "@/components/home/ProductShowcase";
import { useNormalizedVh } from "@/hooks/useNormalizedVh";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page "Why Choose Us" panel — promoted from /lab/lv9's Lv4Page
 * (src/lab-lv9/lv4/pages/Lv4Page.tsx), left untouched as the reference this
 * was copied from.
 */

// Same 2-stop gradient + grain-texture technique used for this exact color
// in lab-lv2's panel-3 exploration, so it reads as matte rather than a flat
// plain white fill.
const BG_GRADIENT = "linear-gradient(160deg, #F2F4F7 0%, #E8E4DC 100%)";
// Base tone of the gradient above — used as the "Get Started" button's text
// color, so the button reads as a straight color inversion of the page
// itself (black fill, page's own background tone for the text).
const PANEL_BG_COLOR = "#F2F4F7";
// Punched-up version of the plain single-octave turbulence tried first: that
// read as too flat/smooth once blended, since fractalNoise's raw alpha
// output hovers close to mid-value with little swing. Desaturating to
// grayscale (drops any rainbow speckle tint) then stretching the alpha
// channel's contrast (feFuncA, slope > 1) pushes the noise's light/dark
// flecks much further apart, and more octaves at a higher base frequency
// gives it a finer, more organic "paper grain" pattern instead of a smooth
// blotchy one — all of which reads as noticeably more matte/textured once
// blended via `overlay` against the gradient below.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch' result='t'/%3E%3CfeColorMatrix in='t' type='saturate' values='0' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncA type='linear' slope='2.6' intercept='-0.6'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Muted, dusty-taupe edge lines — same low-contrast "matte" treatment as the
// dusty-cream lines/gradients used elsewhere (e.g. DUSTY_CREAM_GRADIENT in
// lab-lv3's hero marquee), just re-tuned from a light tone (for a dark
// panel) to a warm gray-taupe pulled from this panel's own background
// gradient (BG_GRADIENT's #E8E4DC stop) at a light alpha, instead of the
// near-black navy tried first — that read as too solid/heavy against this
// light background.
const LINE_COLOR = "rgba(120, 112, 98, 0.14)";
const LINE_GRADIENT_VERTICAL = `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
const LINE_GRADIENT_HORIZONTAL = `linear-gradient(to right, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;

// Same 5-line structure as lv2's About Us panel (VERTICAL_LINE_FRACTIONS in
// src/lab-lv2/components/LabDarkSections.tsx): the two edges (0 and 1, at
// the 30px insets) plus 3 evenly-spaced dividers, giving 4 equal columns —
// matching "the same structure used in lv2" requires 3 middle lines here,
// not 2: with the 2 edges fixed, 4 EQUAL columns need 3 internal dividers
// (2 would only make 3 unequal-or-fewer sections).
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];
// Width of column 1 alone (30px inset to the first divider at the 25% mark).
const COLUMN_ONE_WIDTH = "calc((100% - 60px) * 0.25)";
// Left/right inset of the content block so it lands exactly within the
// middle two columns (25%-75%) — same trick as CONTENT_INSET in lv2's
// LabDarkSections.tsx.
const CONTENT_INSET = "calc(30px + (100% - 60px) * 0.25)";

// Original prose (not copied from the main site's headings/points) —
// written to carry the same essence as its "Why Choose Us" section
// (engineering rigor, real-world testing, in-house control, standards,
// long-term support) as one natural, flowing statement rather than a list.
const WHY_CHOOSE_US_MAIN =
  "Reliability isn't a claim we make — it's a standard we test for. Every transformer that leaves our plant has already been pushed past the exact load, voltage, and site conditions it will face in the field, long before a customer ever sees it.";
const WHY_CHOOSE_US_SUPPORTING =
  "That discipline runs through design, manufacturing, and testing alike — all handled in-house, to internationally recognized standards, so nothing is left to chance between the drawing board and the field. It's the reason plants, utilities, and industrial operators keep specifying our equipment project after project, and why our team stays engaged long after a unit is commissioned, not just until the invoice is settled.";

// Scroll-brightening effect on the main text: dim/muted at rest, each word
// progressively reaching full "matte black" contrast in sync with scroll
// position, cascading left to right rather than all at once. Adapted from
// the usual dark-background "dim to white" version of this effect — on this
// panel's light/cream background, "brightening" instead means increasing
// the dark text's own contrast (fading up from a faint gray to the full
// matte black used everywhere else here), since white text would be
// invisible against this background.
const WORD_DIM_RGB = "34, 34, 34";
const WORD_DIM_ALPHA = 0.22;

/** How "revealed" (0-1) a given word is at the current scroll progress — a cascading left-to-right fade, not an all-at-once switch. */
function wordRevealAmount(progress: number, wordCount: number, index: number) {
  if (wordCount <= 1) return progress;
  // Reveal window wider than 1/wordCount so neighboring words overlap
  // slightly, reading as a cascading fade rather than one word "popping" at
  // a time.
  const revealWindow = 1.6 / wordCount;
  // Scaled by (1 - revealWindow) so the LAST word's window ends exactly at
  // progress = 1 — without this, words in roughly the back half never reach
  // full brightness even at max scroll, since their window would extend
  // past 1 (confirmed live: the last word capped at ~0.71 alpha, not 1).
  const start = (index / wordCount) * (1 - revealWindow);
  return Math.min(1, Math.max(0, (progress - start) / revealWindow));
}

// Sampled directly from the logo's own dark fill (public/company-logo-black-2-cropped.png,
// cropped from the user-supplied file — the source PNG had the mark centered
// in a canvas ~4x larger than the visible shape, so it's cropped tight to the
// actual artwork with a small margin, rather than rendered oversized to
// compensate) so the "Why Choose Us" text matches its matte black finish
// exactly, not an approximated/invented black.
const LOGO_MATTE_BLACK = "#222222";

// Brand-related words for the marquee between the two lines below the "Get
// Started" button, alternating with the logo (Logo -> Word -> Logo -> Word).
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

// Spacing baked into each item's own trailing margin rather than a flex
// `gap` on the track — a container `gap` only applies BETWEEN items, so with
// this track duplicated and split via translateX(-50%), the halves would be
// off by one gap-width and the loop would visibly stutter on every repeat
// (same fix already used for the hero's client-logo marquee).
const MARQUEE_ITEM_GAP_PX = 90;

type MarqueeItem = { type: "logo" } | { type: "word"; text: string };

// One logo before every word, then the whole set duplicated so the doubled
// track's exact midpoint (translateX(-50%)) lands on the start of an
// identical second copy — a seamless loop with no visible restart.
const MARQUEE_SET: MarqueeItem[] = MARQUEE_WORDS.flatMap((word) => [
  { type: "logo" as const },
  { type: "word" as const, text: word },
]);
const MARQUEE_TRACK = [...MARQUEE_SET, ...MARQUEE_SET];

// Real "Why Choose Us" points/imagery, reused as-is from src/data/company.ts
// and public/why-choose-us/*.jpeg (shared static assets, allowed across lab
// routes) — these are the actual 4 differentiators and photos the main site
// uses, matching the user's own named examples ("Precision Engineering",
// "International Standards", etc.). The per-point supporting blurb below is
// original writing, not copied from company.ts's one-line descriptions.
// /lab/lv9-only: these 4 use the "-hover" suffixed files, NOT the plain
// `/why-choose-us/<name>.jpeg` filenames LV4's own original still uses —
// those plain names are shared with other, unrelated sections (this same
// route's own lv5/lv6 copies reuse them for "Decades of hands-on expertise"
// / "Power isn't just what we build") that must keep their original photos.
// A prior attempt overwrote the shared files in place, which silently
// changed those other sections too — reverted, and these dedicated
// "-hover" copies added instead so only this section's images change.
const WHY_CHOOSE_US_POINTS = [
  {
    title: "Precision Engineering",
    image: "/why-choose-us/precision-engineering-hover.jpeg",
    blurb: "Built to exact tolerances, tested against real operating loads.",
  },
  {
    title: "International Standards",
    image: "/why-choose-us/international-standards-hover.jpeg",
    blurb: "Tested and certified to internationally recognized safety standards.",
  },
  {
    title: "Expert Engineering & After-Sales Support",
    image: "/why-choose-us/after-sales-support-hover.jpeg",
    blurb: "Engineers stay involved well past commissioning with hands-on support.",
  },
  {
    title: "Eco-Friendly Manufacturing",
    image: "/why-choose-us/eco-friendly-manufacturing-hover.jpeg",
    blurb: "Production minimizes waste and energy use without sacrificing performance.",
  },
];

// Layout constants for the points/boxes/image row group below the marquee.
// This block starts right after the marquee's own bottom line — only a
// small natural gap, not a large empty span. The ~1000-1200px figure marks
// where this block's own closing divider line goes (its far boundary), not
// a gap before it starts.
const SECTION_TWO_GAP_ABOVE = 60;
// Room between the block's top (level with the "Explore All Services"
// button) and the first point/box/image row.
const SECTION_TWO_TOP_PADDING = 70;
// Vertical spacing between rows — brought in tighter per two rounds of
// explicit requests, while staying just wide enough that an expanded box
// (BOX_EXPANDED_HEIGHT) never reaches into the next row's collapsed square.
const ROW_GAP = 130;
// Collapsed default: a square icon box, not a wide bar/strip.
const BOX_COLLAPSED_HEIGHT = 56;
const BOX_EXPANDED_HEIGHT = 115;
// The block's own closing divider line now sits a small, fixed distance
// below the actual content (not a large fixed offset from the marquee),
// per an explicit request to bring it in close.
const SECTION_TWO_BOUNDARY_MARGIN = 35;
// Space reserved after the boundary line, before the frozen line that used
// to be the section's own true bottom.
const SECTION_TWO_FINAL_MARGIN = 100;

// New full-screen (100vh) panel below the frozen line — original industry
// statement, not copied from the main site.
const PANEL_THREE_QUOTE =
  "The grid doesn't forgive shortcuts. Every unit we build is engineered to keep running long after the warranty ends — reliability first, always.";
const PANEL_THREE_TAGLINE = "Powering Industries, Building Trust";

// A "+" that rotates 45deg into an "×" on hover — two overlapping bars in a
// rotating wrapper, rather than swapping icon components, so the morph is a
// single smooth CSS transform transition instead of a hard cut.
function PlusCrossIcon({ active }: { active: boolean }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: "16px",
        height: "16px",
        flexShrink: 0,
        transform: active ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s ease",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: 0,
          right: 0,
          height: "2px",
          backgroundColor: LOGO_MATTE_BLACK,
          transform: "translateY(-50%)",
        }}
      />
      <span
        style={{
          position: "absolute",
          left: "50%",
          top: 0,
          bottom: 0,
          width: "2px",
          backgroundColor: LOGO_MATTE_BLACK,
          transform: "translateX(-50%)",
        }}
      />
    </div>
  );
}

function BrandMarqueeItem({ item }: { item: MarqueeItem }) {
  if (item.type === "logo") {
    return (
      <img
        src="/company-logo-black-2-cropped.png"
        alt=""
        loading="lazy"
        style={{ height: "clamp(44px, 12vw, 100px)", width: "auto", flexShrink: 0, marginRight: `${MARQUEE_ITEM_GAP_PX}px` }}
      />
    );
  }
  return (
    <span
      className="font-heading"
      style={{
        fontSize: "clamp(44px, 12vw, 100px)",
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

export function WhyChooseUsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRowRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  // The divider under the logo/"Why Choose Us" row must span the full panel
  // width (all 4 columns), not just column 1 — so it can't live inside that
  // column's own flex container. Its vertical position still needs to sit
  // right below that row, whose height depends on the logo image / font
  // metrics, so it's measured rather than hardcoded.
  const [dividerTop, setDividerTop] = useState<number | null>(null);
  // Two more full-width lines below the "Get Started" button, at fixed
  // 100px/310px offsets from its actual (dynamic) bottom edge — the button
  // sits inside a vertically-centered flex block, so its position can't be
  // hardcoded; measured the same way as dividerTop above.
  const [buttonLineTops, setButtonLineTops] = useState<[number, number] | null>(null);
  // Which of the 4 points/boxes is currently hovered (via either its Panel 2
  // label or its Panel 3 box) — a single index, rather than per-box local
  // state, so the image in Panel 1 and the "only one box open" rule both
  // follow from the same source of truth.
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const section = sectionRef.current;
      const row = headerRowRef.current;
      const button = buttonRef.current;
      if (!section || !row || !button) return;
      const sectionTop = section.getBoundingClientRect().top;
      setDividerTop(row.getBoundingClientRect().bottom - sectionTop + 14);
      const buttonBottom = button.getBoundingClientRect().bottom - sectionTop;
      setButtonLineTops([buttonBottom + 100, buttonBottom + 100 + 310]);
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  // Scroll-brightening progress for the main text (0 = fully dim, 1 = fully
  // revealed), driven by this section's own position relative to the
  // viewport — same plain-scroll-listener technique used for the hero
  // effects elsewhere in this project, no new animation library. With
  // nothing above/below this section in this isolated route yet, the page
  // has no scroll room at all, so `progress` will sit at a constant value
  // (effectively fully revealed) rather than animating — expected per this
  // pass's explicit note, and it'll animate correctly once real content
  // exists before/after this section.
  const [revealProgress, setRevealProgress] = useState(0);
  // Real viewport height, except on the phone + Chrome "Desktop site"
  // anomaly (see the hook) — raw window.innerHeight there is 2-3x inflated
  // (portrait screen height forced under a wide layout viewport), which
  // makes the progress fraction below reach 1 far later than a real
  // desktop's scroll amount would, leaving the text under-revealed relative
  // to how much the user has actually scrolled.
  const vh100 = useNormalizedVh();

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
      // 0 when the section's top is at the bottom of the viewport (just
      // arriving), 1 once it has scrolled a full viewport height further.
      const progress = (vh100 - rect.top) / vh100;
      setRevealProgress(Math.min(1, Math.max(0, progress)));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [vh100]);

  const mainWords = WHY_CHOOSE_US_MAIN.split(" ");

  // The whole points/boxes/image/button block starts shortly after the
  // marquee's own bottom line (which is itself dynamic, derived from the
  // button's measured position). Its own closing boundary line now sits a
  // small fixed distance below the actual rendered content (rowsTop +
  // rowsHeight), rather than a large fixed offset from the marquee — so
  // both it and the section's total height are derived from real content
  // size. Falls back to the pre-existing vh-based height until the first
  // measurement lands (synchronously, before paint, via the
  // useLayoutEffect above), avoiding any visible layout jump.
  const sectionTwoTop = buttonLineTops ? buttonLineTops[1] + SECTION_TWO_GAP_ABOVE : null;
  const rowsTop = sectionTwoTop !== null ? sectionTwoTop + SECTION_TWO_TOP_PADDING : null;
  const rowsHeight = (WHY_CHOOSE_US_POINTS.length - 1) * ROW_GAP + BOX_EXPANDED_HEIGHT;
  const sectionTwoBoundary = rowsTop !== null ? rowsTop + rowsHeight + SECTION_TWO_BOUNDARY_MARGIN : null;
  // This used to be the section's own true bottom (a `bottom: 35px` line).
  // Adding the new full-screen panel below it must not move this line, so
  // its position is frozen here as a fixed pixel value (converted from
  // `bottom` to `top`) instead of staying bottom-anchored to the
  // now-taller section.
  const frozenBottomLineTop = sectionTwoBoundary !== null ? sectionTwoBoundary + SECTION_TWO_FINAL_MARGIN - 35 : null;
  // New full-screen (100vh) panel appended right after the frozen line.
  const panelThreeTop = frozenBottomLineTop !== null ? frozenBottomLineTop + 35 : null;
  const sectionHeight =
    panelThreeTop !== null
      ? `calc(${panelThreeTop}px + var(--vh100, 100vh))`
      : "calc(var(--vh100, 100vh) * 3 + 450px)";

  return (
    // Height is now derived (sectionHeight, computed above) from the points/
    // boxes/image/button block's own real size, itself anchored a fixed gap
    // below the marquee's live bottom line — see sectionTwoTop above. The 5
    // vertical edge/divider lines use top:0/bottom:0, so they already
    // stretch to cover whatever height this section ends up with — no
    // change needed there for them to "continue downward." Every
    // horizontal line above (top, header divider, both button-relative
    // lines) is positioned from a fixed top offset or from the button's own
    // measured position, never from the section's total height, so none of
    // them move when this height changes. Only the bottom-anchored line
    // (bottom: 35px) relocates to the new true bottom, which is the intended
    // behavior for "continuing the line structure downward."
    <section
      ref={sectionRef}
      className="relative overflow-hidden lv9-lv4-section"
      style={{ width: "100%", height: sectionHeight }}
    >
      {/* `sectionHeight` above is a JS-computed value, not a static string,
          so it can't be moved into a plain CSS class rule the way LV3's
          About section's fixed height was — instead, this uses `!important`
          in an author stylesheet, which (unlike a plain class rule) DOES
          win over a non-important inline style. Desktop is untouched (no
          media query matches above MOBILE_BREAKPOINT); the whole desktop
          tree below is also wrapped and hidden on mobile in favor of a
          separate, simpler, normal-flow mobile tree (same reasoning as
          LV3's About section: this layout's absolute positions and content-
          driven height come from live `getBoundingClientRect` measurements
          tuned for the desktop column layout, which doesn't translate to a
          single-column mobile reflow). */}
      <style>{`
        .lv9-lv4-desktop { display: block; }
        .lv9-lv4-mobile { display: none; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv9-lv4-section { height: auto !important; overflow: visible !important; }
          .lv9-lv4-desktop { display: none; }
          .lv9-lv4-mobile { display: block; }
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
      <div className="lv9-lv4-desktop">
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
      <div
        aria-hidden="true"
        className="absolute"
        style={{ top: "35px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
      />
      {/* Was the section's own true-bottom line (bottom: 35px) before the
          new full-screen panel below was added — frozen at its old
          computed position so extending the section further doesn't move
          it, per an explicit "do not move it" request. */}
      {frozenBottomLineTop !== null && (
        <div
          aria-hidden="true"
          className="absolute"
          style={{
            top: `${frozenBottomLineTop}px`,
            left: 0,
            right: 0,
            height: "1px",
            backgroundImage: LINE_GRADIENT_HORIZONTAL,
          }}
        />
      )}

      {/* Column 1, top area: logo + "Why Choose Us" label side by side
          (logo first). Nothing else in this panel yet, per this pass's
          explicit scope. */}
      <div
        ref={headerRowRef}
        className="absolute flex items-center"
        style={{ top: "60px", left: "30px", width: COLUMN_ONE_WIDTH, gap: "12px" }}
      >
        <img
          src="/company-logo-black-2-cropped.png"
          alt="Company logo"
          loading="lazy"
          style={{ height: "40px", width: "auto" }}
        />
        <span className="font-heading" style={{ fontSize: "25px", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
          Why Choose Us
        </span>
      </div>

      {/* Divider below that row — spans the full panel width (all 4
          columns), not just column 1. */}
      {dividerTop !== null && (
        <div
          aria-hidden="true"
          className="absolute"
          style={{ top: `${dividerTop}px`, left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
        />
      )}

      {/* Middle two columns: "Why Choose Us" details, vertically centered
          within the panel and spanning the full width of columns 2-3 (not
          just the text's natural width) via text-align: justify. Same matte
          black as column 1's logo/label. Original prose, not the main
          site's literal headings/points. */}
      <div
        className="absolute flex flex-col justify-center"
        style={{
          top: "35px",
          // Fixed height, shorter than a full screen on purpose: this box's
          // own vertical center is what "vertically centered" means for its
          // content, so shrinking the box (while anchoring its top at the
          // same 35px used elsewhere) moves that center upward — a clean,
          // clipping-free way to shift content up, without a `transform`.
          // (A translateY(-50px) was tried first: it pushed the box's top
          // edge to -15px relative to the section, i.e. partly outside the
          // section's own bounds and clipped by its overflow-hidden — and
          // -50px wasn't a large enough shift to read as intentional even
          // where it wasn't clipped. This box is 650px tall vs. a "full
          // centering" box that would run top:35 to bottom:35 — its center
          // now sits 90px above true vertical center.)
          height: "650px",
          left: CONTENT_INSET,
          right: CONTENT_INSET,
          gap: "16px",
        }}
      >
        <p
          className="font-heading"
          style={{ fontSize: "35px", fontWeight: 600, lineHeight: 1.3, textAlign: "justify" }}
        >
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
        <p style={{ fontSize: "20px", lineHeight: 1.5, textAlign: "justify", color: LOGO_MATTE_BLACK }}>
          {WHY_CHOOSE_US_SUPPORTING}
        </p>

        {/* Left-aligned within this block, which itself starts at column
            2's left edge — puts the button in column 2's left area, per an
            explicit request. Color-inverted from the rest of the panel:
            black fill, page-background tone for the text/icon. */}
        <button
          ref={buttonRef}
          type="button"
          className="inline-flex items-center"
          style={{
            alignSelf: "flex-start",
            marginTop: "10px",
            gap: "10px",
            padding: "14px 28px",
            borderRadius: "6px",
            backgroundColor: "#000000",
            color: PANEL_BG_COLOR,
            fontSize: "16px",
            fontWeight: 600,
            border: "none",
          }}
        >
          Get Started
          <ArrowRight style={{ width: "18px", height: "18px" }} aria-hidden="true" />
        </button>
      </div>

      {/* Two more full-width lines below the "Get Started" button, with a
          continuous right-to-left brand marquee filling the band between
          them. */}
      {buttonLineTops && (
        <>
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: `${buttonLineTops[0]}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundImage: LINE_GRADIENT_HORIZONTAL,
            }}
          />

          <div
            aria-hidden="true"
            className="pointer-events-none absolute flex items-center overflow-hidden"
            style={{
              top: `${buttonLineTops[0]}px`,
              height: `${buttonLineTops[1] - buttonLineTops[0]}px`,
              left: 0,
              right: 0,
              maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
              WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            }}
          >
            {/* Slow, explicit duration: this track's items (100px logo/text)
                are much larger than the hero's client-logo marquee, so the
                default --animate-marquee duration would read as too fast for
                the extra distance travelled per loop. */}
            <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "120s" }}>
              {MARQUEE_TRACK.map((item, i) => (
                <BrandMarqueeItem key={i} item={item} />
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: `${buttonLineTops[1]}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundImage: LINE_GRADIENT_HORIZONTAL,
            }}
          />
        </>
      )}

      {/* Points/boxes/image/button block, starting shortly after the
          marquee's own bottom line, closing with its own boundary line just
          35px below the actual content. Column 1: image showcase that
          follows the hovered point. Column 2: the point list. Column 3: a
          matching expandable box per point. Column 4: just the "Explore
          All Services" button, top-right. */}
      {sectionTwoTop !== null && rowsTop !== null && sectionTwoBoundary !== null && (
        <>
          {/* This block's own closing divider line. */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{
              top: `${sectionTwoBoundary}px`,
              left: 0,
              right: 0,
              height: "1px",
              backgroundImage: LINE_GRADIENT_HORIZONTAL,
            }}
          />

          <button
            type="button"
            className="absolute inline-flex items-center"
            style={{
              top: `${sectionTwoTop}px`,
              right: "30px",
              gap: "10px",
              padding: "14px 28px",
              borderRadius: "6px",
              backgroundColor: "#000000",
              color: PANEL_BG_COLOR,
              fontSize: "16px",
              fontWeight: 600,
              border: "none",
            }}
          >
            Explore All Services
            <ArrowRight style={{ width: "18px", height: "18px" }} aria-hidden="true" />
          </button>

          {/* Column 1: stacked, crossfading images — all 4 mounted at once
              (they're static assets anyway) so switching is a pure opacity
              transition with no load flicker. */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: `${rowsTop}px`,
              left: "30px",
              width: COLUMN_ONE_WIDTH,
              height: `${rowsHeight}px`,
              borderRadius: "4px",
            }}
          >
            {WHY_CHOOSE_US_POINTS.map((point, i) => (
              <img
                key={point.title}
                src={point.image}
                alt=""
                loading="lazy"
                className="absolute inset-0"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  // Desaturated and warmed so the photo reads as part of
                  // this panel's dusty, matte palette instead of a bright,
                  // untouched photo dropped on top of it.
                  filter: "grayscale(70%) sepia(18%) brightness(0.92) contrast(0.95)",
                  opacity: (hoveredIndex ?? 0) === i ? 1 : 0,
                  transition: "opacity 0.6s ease",
                }}
              />
            ))}
            {/* Tint overlay, multiplied over every image, pulling them
                further toward the panel's own background tone. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: "#E8E4DC", mixBlendMode: "multiply", opacity: 0.22 }}
            />
          </div>

          {/* Columns 2-3: point labels + their matching boxes, positioned
              relative to this wrapper (which spans exactly those two
              columns) rather than the section, so the row math below is
              relative to the 25%-75% span, not the whole panel. Leaving
              this hover area (including moving onto the image or button)
              clears hoveredIndex, collapsing whichever box was open. */}
          <div
            className="absolute"
            style={{ top: `${rowsTop}px`, left: CONTENT_INSET, right: CONTENT_INSET, height: `${rowsHeight}px` }}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            {WHY_CHOOSE_US_POINTS.map((point, i) => {
              const rowTop = i * ROW_GAP;
              // The first point/box is expanded by default (nothing hovered
              // yet); hovering any point switches which one is active.
              const isActive = hoveredIndex === null ? i === 0 : hoveredIndex === i;
              return (
                <div key={point.title}>
                  {/* Point label — left-aligned toward the shared 25% line
                      with panel 1 (not touching it, not centered in column
                      2). This is the only hover trigger for the row:
                      entering the label sets it active, and Panel 3's box
                      (below) just reflects that state rather than
                      triggering it itself. */}
                  <div
                    className="absolute"
                    style={{
                      top: `${rowTop}px`,
                      left: "24px",
                      maxWidth: "calc(50% - 24px)",
                      textAlign: "left",
                    }}
                    onMouseEnter={() => setHoveredIndex(i)}
                  >
                    <span style={{ fontSize: "25px", fontWeight: 400, lineHeight: 1.3, color: LOGO_MATTE_BLACK }}>
                      {point.title}
                    </span>
                  </div>

                  {/* Matching box — a square icon box by default (not a
                      wide bar), anchored to the RIGHT side of column 3 (not
                      centered, not near the shared line with column 2),
                      offset from column 3's own right edge line. Grows
                      leftward (right edge stays fixed) once its point
                      (above) is hovered, revealing its blurb — never
                      triggered by hovering the box itself. ROW_GAP is kept
                      bigger than BOX_EXPANDED_HEIGHT so an expanded box
                      never overlaps the next row's collapsed square. */}
                  <div
                    className="absolute overflow-hidden"
                    style={{
                      top: `${rowTop}px`,
                      right: "24px",
                      width: isActive ? "calc(50% - 48px)" : `${BOX_COLLAPSED_HEIGHT}px`,
                      height: isActive ? `${BOX_EXPANDED_HEIGHT}px` : `${BOX_COLLAPSED_HEIGHT}px`,
                      borderRadius: "4px",
                      border: `1px solid ${LINE_COLOR}`,
                      backgroundColor: isActive ? "rgba(255, 255, 255, 0.5)" : "transparent",
                      padding: "14px 18px",
                      transition: "width 0.35s ease, height 0.35s ease, background-color 0.35s ease",
                    }}
                  >
                    <PlusCrossIcon active={isActive} />
                    <p
                      style={{
                        marginTop: "10px",
                        fontSize: "16px",
                        fontWeight: 400,
                        lineHeight: 1.45,
                        color: LOGO_MATTE_BLACK,
                        opacity: isActive ? 1 : 0,
                        transition: "opacity 0.25s ease 0.08s",
                      }}
                    >
                      {point.blurb}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {/* New, separate full-screen (100vh) panel appended after the frozen
          line. The 5 vertical edge/divider lines already span top:0/
          bottom:0, so they continue through this panel automatically. */}
      {panelThreeTop !== null && (
        <>
          {/* This panel's own closing line — now the section's true
              bottom (bottom: 35px re-anchors here, since this is the last
              thing appended to the section). */}
          <div
            aria-hidden="true"
            className="absolute"
            style={{ bottom: "35px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
          />

          {/* Top area: an industry statement spanning panels 1-3 (columns
              1-3, i.e. up to the panel 3/4 boundary) — offset from both the
              left edge and the panel's own top, not flush against either. */}
          <p
            className="absolute font-heading"
            style={{
              top: `${panelThreeTop + 110}px`,
              left: "70px",
              right: CONTENT_INSET,
              fontSize: "55px",
              fontWeight: 700,
              lineHeight: 1.3,
              color: LOGO_MATTE_BLACK,
            }}
          >
            {PANEL_THREE_QUOTE}
          </p>

          {/* Panel 1, bottom area: positioned just above the panel's true
              bottom, not flush against it. A single centered group — logo +
              name + tagline — bounded within panel 1's own width. (A second
              "NR INDUSTRIES" caps block used to sit to its right; removed
              as a redundant repeat of the same name right next to it.) */}
          <div
            className="absolute flex flex-col items-center"
            style={{ bottom: "100px", left: "30px", width: COLUMN_ONE_WIDTH, gap: "8px" }}
          >
            <div className="flex items-center" style={{ gap: "10px" }}>
              <img
                src="/company-logo-black-2-cropped.png"
                alt="Company logo"
                loading="lazy"
                style={{ height: "36px", width: "auto" }}
              />
              <span className="font-heading" style={{ fontSize: "19px", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
                NR Industries
              </span>
            </div>
            <span
              style={{
                fontSize: "12px",
                lineHeight: 1.4,
                color: LOGO_MATTE_BLACK,
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {PANEL_THREE_TAGLINE}
            </span>
          </div>

          {/* Panel 4: nothing but a product image showcase, sized to fully
              cover panel 4's own column (from the panel 3/4 shared line to
              the page's right edge inset) — it must not spill into panels
              1-3. Top/bottom match the same 35px inset used for every
              other line/edge on this page. */}
          <div
            className="absolute overflow-hidden"
            style={{
              top: `${panelThreeTop + 35}px`,
              bottom: "35px",
              left: `calc(30px + (100% - 60px) * 0.75)`,
              right: "30px",
            }}
          >
            <ProductShowcase />
          </div>
        </>
      )}
      </div>

      {/* ---------------------------------------------------------------
          MOBILE (<=767px) — a separate, simple, normal-flow rendering.
          Touch devices have no hover, so the 4 points render as always-
          expanded stacked cards (image + title + blurb) instead of the
          desktop's hover-to-expand row, which needed a pointer to work.
          --------------------------------------------------------------- */}
      <div className="lv9-lv4-mobile relative" style={{ padding: "60px 20px 50px" }}>
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

        <div className="flex items-center" style={{ gap: "10px", marginBottom: "24px" }}>
          <img src="/company-logo-black-2-cropped.png" alt="Company logo" loading="lazy" style={{ height: "30px", width: "auto" }} />
          <span className="font-heading" style={{ fontSize: "20px", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
            Why Choose Us
          </span>
        </div>

        <p
          className="font-heading"
          style={{ fontSize: "22px", fontWeight: 600, lineHeight: 1.35, textAlign: "left", marginBottom: "16px" }}
        >
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
        <p style={{ fontSize: "15px", lineHeight: 1.5, color: LOGO_MATTE_BLACK, marginBottom: "20px" }}>
          {WHY_CHOOSE_US_SUPPORTING}
        </p>
        <button
          type="button"
          className="inline-flex items-center"
          style={{
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "6px",
            backgroundColor: "#000000",
            color: PANEL_BG_COLOR,
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            marginBottom: "36px",
          }}
        >
          Get Started
          <ArrowRight style={{ width: "16px", height: "16px" }} aria-hidden="true" />
        </button>

        {/* Marquee band — same track/component as desktop, smaller via
            BrandMarqueeItem's own clamp()-based sizing. */}
        <div
          aria-hidden="true"
          className="pointer-events-none flex items-center overflow-hidden"
          style={{
            margin: "0 -20px 36px",
            padding: "20px 0",
            borderTop: `1px solid ${LINE_COLOR}`,
            borderBottom: `1px solid ${LINE_COLOR}`,
            maskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
          }}
        >
          <div className="animate-marquee flex w-max items-center" style={{ animationDuration: "80s" }}>
            {MARQUEE_TRACK.map((item, i) => (
              <BrandMarqueeItem key={i} item={item} />
            ))}
          </div>
        </div>

        {/* The 4 points, always-expanded (no hover on touch), each with its
            image directly above its title/blurb. */}
        <div style={{ display: "flex", flexDirection: "column", gap: "28px", marginBottom: "40px" }}>
          {WHY_CHOOSE_US_POINTS.map((point) => (
            <div key={point.title}>
              <div className="overflow-hidden" style={{ height: "180px", borderRadius: "4px", position: "relative" }}>
                <img
                  src={point.image}
                  alt=""
                  loading="lazy"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    filter: "grayscale(70%) sepia(18%) brightness(0.92) contrast(0.95)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{ backgroundColor: "#E8E4DC", mixBlendMode: "multiply", opacity: 0.22 }}
                />
              </div>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "12px", marginTop: "14px" }}>
                <PlusCrossIcon active={true} />
                <div>
                  <span style={{ fontSize: "18px", fontWeight: 400, lineHeight: 1.3, color: LOGO_MATTE_BLACK }}>
                    {point.title}
                  </span>
                  <p style={{ marginTop: "6px", fontSize: "14px", fontWeight: 400, lineHeight: 1.45, color: LOGO_MATTE_BLACK }}>
                    {point.blurb}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="inline-flex items-center"
          style={{
            gap: "10px",
            padding: "12px 22px",
            borderRadius: "6px",
            backgroundColor: "#000000",
            color: PANEL_BG_COLOR,
            fontSize: "15px",
            fontWeight: 600,
            border: "none",
            marginBottom: "48px",
          }}
        >
          Explore All Services
          <ArrowRight style={{ width: "16px", height: "16px" }} aria-hidden="true" />
        </button>

        {/* Panel 3 content — industry statement, then the logo/tagline
            lockup, then the product showcase, stacked. */}
        <div style={{ borderTop: `1px solid ${LINE_COLOR}`, paddingTop: "36px" }}>
          <p
            className="font-heading"
            style={{ fontSize: "26px", fontWeight: 700, lineHeight: 1.35, color: LOGO_MATTE_BLACK, marginBottom: "28px" }}
          >
            {PANEL_THREE_QUOTE}
          </p>
          <div style={{ height: "220px", marginBottom: "28px" }}>
            <ProductShowcase />
          </div>
          <div className="flex flex-col items-center" style={{ gap: "8px" }}>
            <div className="flex items-center" style={{ gap: "10px" }}>
              <img src="/company-logo-black-2-cropped.png" alt="Company logo" loading="lazy" style={{ height: "30px", width: "auto" }} />
              <span className="font-heading" style={{ fontSize: "16px", fontWeight: 600, color: LOGO_MATTE_BLACK }}>
                NR Industries
              </span>
            </div>
            <span style={{ fontSize: "12px", lineHeight: 1.4, color: LOGO_MATTE_BLACK, textAlign: "center" }}>
              {PANEL_THREE_TAGLINE}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
