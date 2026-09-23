import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  LabAboutDarkSection,
  LINE_GRADIENT_HORIZONTAL,
  LINE_GRADIENT_VERTICAL,
  VERTICAL_LINE_FRACTIONS,
} from "@/components/home/LabDarkSections";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Home page hero + "About Us" dark panel — promoted from /lab/lv9's Lv3Page
 * (src/lab-lv9/lv3/pages/Lv3Page.tsx), left untouched as the reference this
 * was copied from. No `-mt-20` on the hero: the real Header is `position:
 * fixed` and reserves no space (see Layout.tsx), so the hero already sits
 * flush under it without a negative margin.
 */
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
      {/* Hero */}
      <section className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-navy-950">
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

      <LabAboutDarkSection />
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
    <div className="pointer-events-none absolute lv9-hero-location-time">
      {/* Desktop keeps the original fixed 75%-inset column (unchanged, no
          media query matches above MOBILE_BREAKPOINT); below it, this same
          box spans nearly the full width instead of a cramped quarter-
          column, which is what was causing this text to overflow its box
          on phone widths. `left`/`right` need to actually change at the
          breakpoint (not just scale), so they live in the class below
          rather than as inline styles a class could never out-specificity. */}
      <style>{`
        .lv9-hero-location-time { top: 95px; left: calc(30px + (100% - 60px) * 0.75); right: 30px; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .lv9-hero-location-time { top: 106px; left: 16px; right: 16px; }
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
