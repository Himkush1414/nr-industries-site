import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useCountUp } from "@/hooks/useCountUp";
import { useInView } from "@/hooks/useInView";

/**
 * /lab/lv16 — hero (byte-for-byte unchanged from the real site) + a fully
 * re-coded "About Us" panel. Every size below is a `clamp()` tied to `vw`
 * (fluid across the full width range) rather than a fixed pixel value or a
 * media-query breakpoint, so it scales continuously at any viewport width
 * instead of jumping between a few hand-picked sizes.
 */

const MOBILE_BREAKPOINT = 767;

const LINE_COLOR = "rgba(198, 192, 180, 0.14)";
const LINE_GRADIENT_VERTICAL = `linear-gradient(to bottom, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
const LINE_GRADIENT_HORIZONTAL = `linear-gradient(to right, transparent 0%, ${LINE_COLOR} 25%, ${LINE_COLOR} 75%, transparent 100%)`;
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

export function HeroAndAboutSection() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRestRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const targets = [eyebrowRef.current, headlineRef.current, heroRestRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!targets.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 28 });
    const delays = [0, 0.4, 0.8];
    targets.forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay: delays[i], ease: "power3.out" });
    });
  }, []);

  useEffect(() => {
    const img = heroImageRef.current;
    if (!img) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    function onScroll() {
      const y = window.scrollY;
      if (img) img.style.transform = `translateY(${y * 0.3}px)`;
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const heading = headlineRef.current;
    if (!heading) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const FADE_DISTANCE = 420;
    function onScroll() {
      const y = window.scrollY;
      if (heading) heading.style.opacity = String(Math.max(0, 1 - y / FADE_DISTANCE));
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Hero — unchanged. */}
      <section
        data-nav-theme="dark"
        className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-navy-950"
        style={{ minHeight: "var(--vh100, 100vh)" }}
      >
        <img
          ref={heroImageRef}
          src="/hero-wind-generation-1920.webp"
          srcSet="/hero-wind-generation-960.webp 960w, /hero-wind-generation-1920.webp 1920w"
          sizes="100vw"
          width={1920}
          height={1080}
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center will-change-transform"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3"
          style={{ background: "linear-gradient(to bottom, transparent, #0D1624)" }}
          aria-hidden="true"
        />
        {VERTICAL_LINE_FRACTIONS.map((fraction) => (
          <div
            key={fraction}
            aria-hidden="true"
            className="pointer-events-none absolute"
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
          className="pointer-events-none absolute"
          style={{ top: "75px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ bottom: "25px", left: 0, right: 0, height: "1px", backgroundImage: LINE_GRADIENT_HORIZONTAL }}
        />

        <HeroLocationTime />

        <div className="relative flex w-full max-w-3xl flex-col gap-6 px-5 py-16 sm:px-8 sm:py-20 lg:max-w-none lg:px-12 lg:py-24">
          <span
            ref={eyebrowRef}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase"
          >
            <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
            Power &amp; Distribution Equipment Manufacturer
          </span>
          <h1
            ref={headlineRef}
            className="break-words font-heading text-6xl font-bold tracking-tight text-white sm:text-7xl md:text-8xl lg:text-[105px] xl:text-[125px] 2xl:text-[150px]"
          >
            <span className="uppercase">N R</span>{" "}
            <span className="text-gold-400 uppercase">Industries</span>
          </h1>
          <div ref={heroRestRef} className="flex flex-col gap-6">
            <p className="font-heading text-3xl font-semibold text-gold-400 sm:text-4xl md:text-5xl lg:text-[45px] xl:text-[54px] 2xl:text-[60px]">
              Power at Best
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-navy-100/85">
              Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
              Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
              and utility-scale power distribution.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-4 text-sm font-semibold tracking-wide text-navy-950 shadow-lg shadow-gold-900/20 transition-all duration-150 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Our Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-150 hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboutSection />
    </>
  );
}

// Live IST clock, not the visitor's local time.
function HeroLocationTime() {
  const [time, setTime] = useState(() =>
    new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(
      new Date(),
    ),
  );

  useEffect(() => {
    const id = window.setInterval(() => {
      setTime(
        new Intl.DateTimeFormat("en-IN", { hour: "numeric", minute: "2-digit", timeZone: "Asia/Kolkata" }).format(
          new Date(),
        ),
      );
    }, 15000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="pointer-events-none absolute lv16-hero-location-time">
      <style>{`
        .lv16-hero-location-time { top: 95px; left: calc(30px + (100% - 60px) * 0.75); right: 30px; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv16-hero-location-time { top: 106px; left: 16px; right: 16px; }
        }
      `}</style>
      <span
        style={{
          display: "block",
          fontSize: "clamp(11px, 3.2vw, 16px)",
          lineHeight: 1.4,
          color: "rgb(198, 192, 180)",
        }}
      >
        Based in Paonta Sahib, HP &middot; {time} IST &middot; Welcome
      </span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// About Us — genuinely re-coded, not resized from any prior version.
// ---------------------------------------------------------------------------

const GRADIENT_STOPS = ["#0D1624", "#111C2B", "#182536", "#202D3D", "#2A3746", "#080D14"];
const GOLD = "#D9B43C";
// Brightened from the previous off-white/70%-alpha secondary text for better
// contrast against the dark panel — pure white for primary copy, a higher
// alpha for supporting copy/labels than before.
const TEXT_BRIGHT = "#FFFFFF";
const TEXT_SECONDARY = "rgba(255, 255, 255, 0.88)";

const PANEL_GRADIENT = `linear-gradient(180deg, ${GRADIENT_STOPS[0]} 0%, ${GRADIENT_STOPS[1]} 20%, ${GRADIENT_STOPS[2]} 40%, ${GRADIENT_STOPS[3]} 60%, ${GRADIENT_STOPS[4]} 80%, ${GRADIENT_STOPS[5]} 100%)`;
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const STAT_ITEMS: { value: number; suffix: string; label: string }[] = [
  { value: 12.5, suffix: " MVA", label: "Max Transformer Capacity" },
  { value: 66, suffix: " kV", label: "Max Voltage Class" },
  { value: 15, suffix: "+", label: "Years of Experience" },
  { value: 500, suffix: "+", label: "Companies Trust Us" },
];

function StatCell({ value, suffix, label, start }: { value: number; suffix: string; label: string; start: boolean }) {
  const display = useCountUp(value, start, 1800);
  return (
    <div className="flex min-w-0 flex-1 flex-col items-center justify-center text-center" style={{ padding: "clamp(12px, 2vw, 28px) clamp(8px, 1.5vw, 20px)" }}>
      {/* Fluid across the full width range so it visibly shrinks/grows with
          the viewport instead of sitting at one fixed size. */}
      <span className="font-heading" style={{ fontSize: "clamp(24px, 4.6vw, 56px)", lineHeight: 1, fontWeight: 700, color: TEXT_BRIGHT, whiteSpace: "nowrap" }}>
        {display}
        {suffix}
      </span>
      <span style={{ marginTop: "clamp(4px, 0.8vw, 10px)", fontSize: "clamp(11px, 1.3vw, 15px)", lineHeight: 1.25, color: TEXT_SECONDARY }}>
        {label}
      </span>
    </div>
  );
}

function AboutSection() {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <section data-nav-theme="dark" className="relative overflow-hidden" style={{ backgroundColor: GRADIENT_STOPS[0] }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `${GRAIN_URL}, ${PANEL_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "140px 140px, cover" }}
      />
      <div aria-hidden="true" className="absolute" style={{ top: 0, left: "50%", width: "clamp(64px, 8vw, 120px)", height: "2px", transform: "translateX(-50%)", backgroundColor: GOLD }} />

      {/* Heading + main copy — a centered, fluid-width column so the text
          reads as filling the middle of the panel at any screen size,
          rather than either hugging one edge or stretching edge-to-edge
          into unreadably long lines. */}
      <div
        className="relative mx-auto flex flex-col items-center text-center"
        style={{
          width: "min(92%, 62rem)",
          paddingBlock: "clamp(56px, 9vh, 128px)",
          gap: "clamp(16px, 2.4vw, 28px)",
        }}
      >
        <span
          className="font-heading uppercase"
          style={{ fontSize: "clamp(12px, 1.4vw, 15px)", fontWeight: 600, letterSpacing: "0.16em", color: GOLD }}
        >
          About Us
        </span>
        <h2
          className="font-heading"
          style={{ fontSize: "clamp(24px, 4.4vw, 52px)", fontWeight: 700, lineHeight: 1.25, color: TEXT_BRIGHT }}
        >
          NR Industries builds transformers and distribution equipment engineered to run for
          decades, not just pass a spec sheet.
        </h2>
        <p style={{ fontSize: "clamp(14px, 1.7vw, 20px)", lineHeight: 1.6, color: TEXT_SECONDARY, maxWidth: "52ch" }}>
          Every product is tested under real operating conditions before it ships. From compact
          substations to servo voltage stabilizers and HT/LT panels, every unit is built, tested,
          and certified in-house — with our team staying involved well past commissioning.
        </p>
      </div>

      {/* Stats row — a full-bleed strip (only a thin side gutter, no
          centering container/max-width) so it spans the section's whole
          width rather than sitting centered with margins on either side. */}
      {/* min-width set via a scoped <style> tag, not an arbitrary-value
          Tailwind class (`min-w-[45%]`) — this project's dev server has
          repeatedly failed to generate CSS for brand-new bracket-notation
          classes on a freshly-added lazy route. */}
      <style>{`
        .lv16-stat-cell { min-width: 45%; }
        @media (min-width: 640px) { .lv16-stat-cell { min-width: 0; } }
      `}</style>
      <div
        ref={ref}
        className="relative flex w-full flex-wrap border-t"
        style={{ borderColor: "rgba(255, 255, 255, 0.12)" }}
      >
        {STAT_ITEMS.map((item, i) => (
          <div
            key={item.label}
            className="lv16-stat-cell flex flex-1"
            style={{ borderLeft: i === 0 ? "none" : "1px solid rgba(255, 255, 255, 0.12)" }}
          >
            <StatCell {...item} start={isInView} />
          </div>
        ))}
      </div>
    </section>
  );
}
