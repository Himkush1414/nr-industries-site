import { Check, Send } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page "About Us" dark panel, directly below the hero — promoted from
 * /lab/lv9's LabDarkSections.tsx (src/lab-lv9/lv3/components/LabDarkSections.tsx),
 * left untouched as the reference this was copied from.
 */

// Ordered top -> bottom exactly as specified, including the two lighter
// "secondary"/"subtle blue-gray" stops as background gradient colors (not
// reserved for UI elements, since there's no UI in this panel yet).
const GRADIENT_STOPS = ["#0D1624", "#111C2B", "#182536", "#202D3D", "#2A3746", "#080D14"];
const GOLD = "#D9B43C";
const TEXT_WHITE = "#F2F4F7";

// Left/right inset of the content block so it lands exactly within the
// middle two columns (the 25%-75% span between the 5 structural lines
// below), never columns 1 or 4.
const CONTENT_INSET = "calc(30px + (100% - 60px) * 0.25)";
// Width of column 1 alone (from the 30px left inset to the first divider at
// the 25% mark) — where the "About Us" heading lives, on its own. All 4
// columns are this same width, so this is reused for column 3 below too.
const COLUMN_ONE_WIDTH = "calc((100% - 60px) * 0.25)";
// Left edge of column 3 (the 50%-75% span) — where the "15+ Years of
// Experience" stat box sits, and where the narrative text below it lives.
const COLUMN_THREE_LEFT = "calc(30px + (100% - 60px) * 0.5)";

// Dusty/muted cream, desaturated toward gray and kept very low-alpha at its
// peak — the structural lines fade in/out along their length via a gradient
// (below) rather than rendering as a flat, uniform, solid-color rule.
const LINE_COLOR = "rgba(198, 192, 180, 0.14)";
// Exported so the hero section (src/lab-lv2/pages/HomePage.tsx) can reuse the
// exact same dusty-cream, matte, fade-in/out line style for its own 30px
// left/right edge lines, instead of a second, potentially-drifting copy.
export const LINE_GRADIENT_VERTICAL = `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
export const LINE_GRADIENT_HORIZONTAL = `linear-gradient(to right, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
// 5 vertical lines at 0%, 25%, 50%, 75%, 100% of the space between the two
// 30px edge insets: the first/last land exactly on the "30px in from each
// edge" lines, the middle 3 split the remaining space into 4 equal columns.
// Exported so the hero can reuse the exact same 3 middle dividers.
export const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

const PANEL_GRADIENT = `linear-gradient(180deg, ${GRADIENT_STOPS[0]} 0%, ${GRADIENT_STOPS[1]} 20%, ${GRADIENT_STOPS[2]} 40%, ${GRADIENT_STOPS[3]} 60%, ${GRADIENT_STOPS[4]} 80%, ${GRADIENT_STOPS[5]} 100%)`;

// Small tiled fractal-noise SVG, blended with "overlay" so the gradient reads
// as matte/dusty/grainy instead of a flat, glossy fill.
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Subtle vertical gradient (rather than a flat fill) for the chat box's own
// surface — a touch darker than the panel's "secondary"/"subtle blue-gray"
// tones, so it reads as a distinct, slightly recessed surface, not a sticker
// pasted on top.
const CHAT_BOX_GRADIENT = "linear-gradient(180deg, #232F40 0%, #1B2530 100%)";
const CHAT_BOX_BORDER = "rgba(226, 214, 184, 0.14)";
const CHAT_BOX_SHADOW =
  "0 16px 32px -8px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.035)";

// A few realistic, distinct queries — cycled through in order rather than
// repeating a single line.
const DEMO_MESSAGES = [
  "I want to order a power transformer",
  "Do you have 100 kVA units in stock?",
  "Can I get a quote for 3 distribution transformers?",
  "What's the lead time on a custom substation?",
];

type ChatPhase = "typing" | "pause" | "sending" | "sent";

/** Randomized per-character delay so the typing rhythm reads as natural, not mechanically uniform. */
function nextTypeDelay() {
  return 35 + Math.random() * 55;
}

/**
 * Static example only — never wired to a real send action. Cycles through
 * typing -> pause -> button-press -> "sent" -> reset onto the next message
 * in DEMO_MESSAGES, looping, once scrolled into view. Respects
 * prefers-reduced-motion by rendering the first message with no animation.
 */
function ChatDemoBox() {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const [reducedMotion, setReducedMotion] = useState(false);
  const [messageIndex, setMessageIndex] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const [phase, setPhase] = useState<ChatPhase>("typing");
  const startedRef = useRef(false);

  const currentMessage = DEMO_MESSAGES[messageIndex % DEMO_MESSAGES.length] ?? "";

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    if (isInView) startedRef.current = true;
  }, [isInView]);

  useEffect(() => {
    if (reducedMotion || !startedRef.current) return;

    let timeout: number;
    if (phase === "typing") {
      timeout = window.setTimeout(() => {
        if (typedLength < currentMessage.length) {
          setTypedLength((n) => n + 1);
        } else {
          setPhase("pause");
        }
      }, nextTypeDelay());
    } else if (phase === "pause") {
      timeout = window.setTimeout(() => setPhase("sending"), 550);
    } else if (phase === "sending") {
      timeout = window.setTimeout(() => setPhase("sent"), 380);
    } else {
      timeout = window.setTimeout(() => {
        setTypedLength(0);
        setMessageIndex((i) => (i + 1) % DEMO_MESSAGES.length);
        setPhase("typing");
      }, 1500);
    }
    return () => window.clearTimeout(timeout);
  }, [phase, typedLength, reducedMotion, isInView, currentMessage.length]);

  const displayedText = reducedMotion ? DEMO_MESSAGES[0] : currentMessage.slice(0, typedLength);
  const isPressed = phase === "sending";
  const isSent = phase === "sent";

  return (
    <div ref={ref} style={{ marginTop: "16px" }}>
      <style>{`
        @keyframes lab-lv2-chat-cursor-blink {
          0%, 49% { opacity: 1; }
          50%, 100% { opacity: 0; }
        }
        .lab-lv2-chat-cursor {
          display: inline-block;
          width: 2px;
          border-radius: 1px;
          margin-left: 3px;
          background-color: ${TEXT_WHITE};
          animation: lab-lv2-chat-cursor-blink 0.9s step-start infinite;
        }
        .lab-lv2-chat-send {
          transition: transform 0.18s cubic-bezier(0.34, 1.56, 0.64, 1), background-color 0.3s ease;
        }
        .lab-lv2-chat-send:hover {
          transform: scale(1.06);
        }
        .lab-lv2-chat-send.is-pressed {
          transform: scale(0.86);
        }
        .lab-lv2-chat-message {
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
      `}</style>
      <div
        className="flex items-center"
        style={{
          height: "clamp(72px, 18vw, 104px)",
          borderRadius: "20px",
          backgroundImage: `${GRAIN_URL}, ${CHAT_BOX_GRADIENT}`,
          backgroundBlendMode: "overlay, normal",
          backgroundSize: "140px 140px, cover",
          border: `1px solid ${CHAT_BOX_BORDER}`,
          boxShadow: CHAT_BOX_SHADOW,
          padding: "0 clamp(14px, 4vw, 24px)",
          gap: "clamp(10px, 3vw, 18px)",
        }}
      >
        <span
          className="lab-lv2-chat-message"
          style={{
            flex: 1,
            fontSize: "clamp(13px, 3.6vw, 20px)",
            letterSpacing: "0.01em",
            color: `${TEXT_WHITE}cc`,
            opacity: isSent ? 0.32 : 1,
            transform: isSent ? "translateX(-4px)" : "translateX(0)",
            whiteSpace: "nowrap",
            overflow: "hidden",
          }}
        >
          {displayedText || (reducedMotion ? "" : " ")}
          {!reducedMotion && phase === "typing" && (
            <span className="lab-lv2-chat-cursor" style={{ height: "22px" }} aria-hidden="true" />
          )}
        </span>
        <button
          type="button"
          aria-label="Send message"
          tabIndex={-1}
          className={`lab-lv2-chat-send${isPressed ? " is-pressed" : ""}`}
          style={{
            flexShrink: 0,
            width: "clamp(34px, 8vw, 44px)",
            height: "clamp(34px, 8vw, 44px)",
            borderRadius: "9999px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: isSent ? "rgba(226, 214, 184, 0.7)" : GOLD,
            color: "#140f0c",
            border: "none",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          }}
        >
          {isSent ? (
            <Check style={{ width: "18px", height: "18px" }} aria-hidden="true" />
          ) : (
            <Send style={{ width: "18px", height: "18px" }} aria-hidden="true" />
          )}
        </button>
      </div>
    </div>
  );
}

// Real, already-verified figures — the same ones used earlier in this
// page's history (the removed HomeStatsSection/LabStatsDarkSection passes),
// not invented numbers.
const STAT_GRID_ITEMS: { value: number; suffix: string; label: string }[] = [
  { value: 12.5, suffix: " MVA", label: "Max Transformer Capacity" },
  { value: 66, suffix: " kV", label: "Max Voltage Class" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Companies Trust Us" },
];

function StatGridBox({
  value,
  suffix,
  label,
  start,
}: {
  value: number;
  suffix: string;
  label: string;
  start: boolean;
}) {
  const display = useCountUp(value, start, 1800);
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "16px",
        height: "100%",
      }}
    >
      <span
        className="font-heading"
        style={{ fontSize: "90px", lineHeight: 1, fontWeight: 700, color: TEXT_WHITE, textAlign: "center" }}
      >
        {display}
        {suffix}
      </span>
      <span
        style={{
          fontSize: "20px",
          lineHeight: 1.2,
          textAlign: "center",
          color: `${TEXT_WHITE}b3`,
        }}
      >
        {label}
      </span>
    </div>
  );
}

/** Fills the grid box formed by the two extra horizontal lines x the 3 middle vertical dividers. */
function StatGrid({ top, height }: { top: number; height: number }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className="absolute grid"
      style={{ top: `${top}px`, height: `${height}px`, left: "30px", right: "30px", gridTemplateColumns: "repeat(4, 1fr)" }}
    >
      {STAT_GRID_ITEMS.map((item) => (
        <StatGridBox key={item.label} {...item} start={isInView} />
      ))}
    </div>
  );
}

export function LabAboutDarkSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const chatWrapperRef = useRef<HTMLDivElement>(null);
  // Two extra horizontal lines below the chat box, at fixed 150px/400px
  // offsets from its actual (dynamic) bottom edge — the chat box sits in
  // normal document flow after two paragraphs of body copy whose wrapped
  // height depends on viewport width, so its position can't be hardcoded.
  // Measured via getBoundingClientRect (not offsetTop) so it's correct
  // regardless of which element is the positioned ancestor.
  const [extraLineTops, setExtraLineTops] = useState<[number, number] | null>(null);

  useLayoutEffect(() => {
    function measure() {
      const section = sectionRef.current;
      const chatWrapper = chatWrapperRef.current;
      if (!section || !chatWrapper) return;
      const chatBottomRelative = chatWrapper.getBoundingClientRect().bottom - section.getBoundingClientRect().top;
      setExtraLineTops([chatBottomRelative + 150, chatBottomRelative + 150 + 400]);
    }
    measure();
    window.addEventListener("resize", measure);
    document.fonts?.ready?.then(measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    // Sizing/position set via inline style rather than Tailwind utility
    // classes (h-screen, h-0.5, etc.) — this project's dev server was
    // caught not always generating CSS for those exact class strings for
    // this lazily-loaded route (confirmed live: computed height came back
    // 0px despite the class being present in the markup), which is why the
    // panel wasn't visible even though the JSX was correct. Inline styles
    // can't silently fail to generate, so anything load-bearing here uses
    // them instead.
    // Height is 150vh + 240px (100vh, then +50vh, then +60px, then +80px,
    // then +100px more — the last increment needed so the column-3
    // narrative paragraph below the stat grid has room to render without
    // being clipped by this section's own overflow-hidden; confirmed live
    // that at +140px there wasn't enough space left after the stat row for
    // 4 lines of 18px text). Positioned content/heading/chat box/stat grid
    // below don't depend on the panel's own height (top-offsets or measured
    // off the chat box's rendered position), so nothing else moves; the 5
    // vertical divider lines use top:0/bottom:0 and the bottom horizontal
    // rule uses bottom:35px, so both already stretch to and re-anchor
    // against whatever the panel's actual height is.
    <section ref={sectionRef} className="relative overflow-hidden lv9-about-section">
      {/* Desktop keeps its fixed calc(150vh + 240px) height (unchanged, no
          media query matches above MOBILE_BREAKPOINT) — the whole absolute-
          positioned/JS-measured layout below is built around that fixed
          canvas. Mobile instead renders a second, completely separate,
          normal-document-flow version further down (`.lv9-about-mobile`)
          with its own auto height, rather than trying to force the same
          measurement-dependent absolute system to reflow at a phone width —
          `height`/`overflow` need to actually change at the breakpoint, so
          they live here instead of as inline styles a class could never
          out-specificity. */}
      <style>{`
        .lv9-about-section { width: 100%; height: calc(var(--vh100, 100vh) * 1.5 + 240px); }
        .lv9-about-desktop { display: block; }
        .lv9-about-mobile { display: none; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv9-about-section { height: auto; overflow: visible; }
          .lv9-about-desktop { display: none; }
          .lv9-about-mobile { display: block; }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `${GRAIN_URL}, ${PANEL_GRADIENT}`,
          backgroundBlendMode: "overlay, normal",
          backgroundSize: "140px 140px, cover",
        }}
      />

      {/* Sparing gold highlight — a single thin accent line, not a background color */}
      <div
        aria-hidden="true"
        className="absolute"
        style={{
          top: 0,
          left: "50%",
          width: "96px",
          height: "2px",
          transform: "translateX(-50%)",
          backgroundColor: GOLD,
        }}
      />

      {/* ---------------------------------------------------------------
          DESKTOP (unchanged) — every line, offset and font size below is
          byte-for-byte what it was before this responsive pass.
          --------------------------------------------------------------- */}
      <div className="lv9-about-desktop">
        {/* Structural lines — 30px edge insets + 3 evenly-spaced dividers
            between them (4 equal columns), plus 35px-inset top/bottom rules.
            Pure layout guides, no content yet. */}
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
        <div
          aria-hidden="true"
          className="absolute"
          style={{ bottom: "35px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
        />

        {/* "About Us" heading — column 1 only, nothing else in that box. Plain
            CSS (scoped via this unique class name), not Tailwind hover/group
            utilities — same reasoning as the inline-style sizing above: this
            exact combination of classes has never been used elsewhere in the
            codebase, so it can't be trusted to already be in the generated
            CSS for this lazily-loaded route. A plain <style> tag can't
            silently fail to generate. */}
        <style>{`
          .lab-lv2-about-heading {
            position: relative;
            display: inline-block;
          }
          .lab-lv2-about-heading .lab-lv2-about-underline {
            position: absolute;
            left: 0;
            bottom: 0;
            height: 1px;
            width: 100%;
            background-color: rgba(242, 244, 247, 0.35);
            transition: width 0.3s ease, background-color 0.3s ease;
          }
          .lab-lv2-about-heading:hover .lab-lv2-about-underline {
            width: 130%;
            background-color: ${GOLD};
          }
        `}</style>
        <div className="absolute" style={{ top: "110px", left: "30px", width: COLUMN_ONE_WIDTH }}>
          <h2
            className="font-heading lab-lv2-about-heading"
            style={{ fontSize: "35px", fontWeight: 600, color: TEXT_WHITE, paddingBottom: "10px" }}
          >
            About Us
            <span className="lab-lv2-about-underline" aria-hidden="true" />
          </h2>
        </div>

        {/* Main body copy + supporting copy — confined to the middle two
            columns only. */}
        <div
          className="absolute flex flex-col"
          style={{ top: "140px", left: CONTENT_INSET, right: CONTENT_INSET, gap: "28px" }}
        >
          <p
            className="font-heading"
            style={{ fontSize: "40px", lineHeight: 1.3, fontWeight: 600, color: TEXT_WHITE }}
          >
            NR Industries builds transformers and distribution equipment engineered to run for
            decades, not just pass a spec sheet. Every product is tested under real operating
            conditions before it ships.
          </p>
          <p style={{ fontSize: "30px", lineHeight: 1.4, color: `${TEXT_WHITE}b3` }}>
            From compact substations to servo voltage stabilizers and HT/LT panels, every unit is
            built, tested, and certified in-house. Our team stays involved well past commissioning,
            ready to support you for years to come.
          </p>
          <div ref={chatWrapperRef}>
            <ChatDemoBox />
          </div>
        </div>

        {/* Two more full-width horizontal lines below the chat box — combined
            with the 3 permanent middle vertical dividers above, these form the
            4 grid boxes that <StatGrid/> below fills with stat content. */}
        {extraLineTops && (
          <>
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                top: `${extraLineTops[0]}px`,
                left: 0,
                right: 0,
                height: "1px",
                backgroundImage: LINE_GRADIENT_HORIZONTAL,
              }}
            />
            <div
              aria-hidden="true"
              className="absolute"
              style={{
                top: `${extraLineTops[1]}px`,
                left: 0,
                right: 0,
                height: "1px",
                backgroundImage: LINE_GRADIENT_HORIZONTAL,
              }}
            />
            <StatGrid top={extraLineTops[0]} height={extraLineTops[1] - extraLineTops[0]} />

            {/* Narrative company copy below the stat row, confined to column 3
                only (under the "15+ Years of Experience" box) — not restating
                the numbers, just brand context. */}
            <p
              style={{
                position: "absolute",
                top: `${extraLineTops[1] + 40}px`,
                left: COLUMN_THREE_LEFT,
                width: COLUMN_ONE_WIDTH,
                fontSize: "18px",
                lineHeight: 1.5,
                color: `${TEXT_WHITE}b3`,
              }}
            >
              These figures reflect decades of manufacturing experience across India&apos;s power
              sector, built on consistent performance and lasting partnerships.
            </p>
          </>
        )}
      </div>

      {/* ---------------------------------------------------------------
          MOBILE (<=767px) — a separate, simple, normal-flow rendering of
          the same content and the same 4 stats in the same order (stacked
          vertically: 12.5 MVA, then 66 kV, then 15+, then 500+ — "first,
          second, third, fourth" per the request, which is just this array's
          existing order read top-to-bottom instead of across a 4-column
          grid). Not a reflow of the desktop tree above — that tree's
          layout depends on a live chat-box measurement tuned for a fixed
          150vh-tall canvas, which doesn't translate to a content-driven
          mobile height. Keeps the same two outer edge lines (subtle, not
          the 3 internal 4-column dividers, which don't apply to a single
          stacked column) per the general "keep edge lines visible" rule.
          --------------------------------------------------------------- */}
      <div className="lv9-about-mobile relative" style={{ padding: "70px 20px 50px" }}>
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
        <h2 className="font-heading" style={{ fontSize: "26px", fontWeight: 600, color: TEXT_WHITE, marginBottom: "18px" }}>
          About Us
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
          <p className="font-heading" style={{ fontSize: "20px", lineHeight: 1.35, fontWeight: 600, color: TEXT_WHITE }}>
            NR Industries builds transformers and distribution equipment engineered to run for
            decades, not just pass a spec sheet. Every product is tested under real operating
            conditions before it ships.
          </p>
          <p style={{ fontSize: "15px", lineHeight: 1.5, color: `${TEXT_WHITE}b3` }}>
            From compact substations to servo voltage stabilizers and HT/LT panels, every unit is
            built, tested, and certified in-house. Our team stays involved well past commissioning,
            ready to support you for years to come.
          </p>
          <ChatDemoBox />
        </div>

        <div
          style={{
            marginTop: "36px",
            paddingTop: "28px",
            borderTop: `1px solid ${LINE_COLOR}`,
            display: "flex",
            flexDirection: "column",
            gap: "28px",
          }}
        >
          {STAT_GRID_ITEMS.map((item) => (
            <MobileStatRow key={item.label} {...item} />
          ))}
        </div>

        <p style={{ marginTop: "28px", fontSize: "14px", lineHeight: 1.5, color: `${TEXT_WHITE}b3` }}>
          These figures reflect decades of manufacturing experience across India&apos;s power
          sector, built on consistent performance and lasting partnerships.
        </p>
      </div>
    </section>
  );
}

function MobileStatRow({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { ref, isInView } = useInView<HTMLDivElement>();
  const display = useCountUp(value, isInView, 1800);
  return (
    <div ref={ref} style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
      <span className="font-heading" style={{ fontSize: "44px", lineHeight: 1, fontWeight: 700, color: TEXT_WHITE }}>
        {display}
        {suffix}
      </span>
      <span style={{ fontSize: "14px", color: `${TEXT_WHITE}b3` }}>{label}</span>
    </div>
  );
}
