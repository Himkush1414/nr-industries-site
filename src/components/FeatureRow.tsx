import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useInView } from "@/hooks/useInView";

interface FeatureRowProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageLabel: string;
  /** Real photo path under /public. Falls back to the placeholder if omitted. */
  imageSrc?: string;
  /** When true, image sits on the right instead of the left. */
  reverse?: boolean;
  children?: ReactNode;
}

export function FeatureRow({
  eyebrow,
  title,
  description,
  imageLabel,
  imageSrc,
  reverse = false,
  children,
}: FeatureRowProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.25);
  const wipeDesktopRef = useRef<HTMLDivElement | null>(null);
  const wipeMobileRef = useRef<HTMLDivElement | null>(null);

  // Scroll-linked color wipe: progress (0 → 1) is a direct function of how close
  // this row's center is to the viewport's active line, and is applied straight to
  // the DOM via a transform — no CSS transition, so it tracks scroll 1:1 in both
  // directions (fading back out as the row scrolls past, not just fading in once).
  useLayoutEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;

    const compute = () => {
      frame = 0;
      const node = ref.current;
      if (!node) return;

      const vh = window.innerHeight;
      const activeLine = vh * 0.5;
      const halfWindow = vh * 0.42;
      const rect = node.getBoundingClientRect();
      const center = rect.top + rect.height / 2;
      const dist = Math.abs(center - activeLine);
      const progress = prefersReduced ? (dist < halfWindow ? 1 : 0) : Math.max(0, 1 - dist / halfWindow);

      if (wipeDesktopRef.current) wipeDesktopRef.current.style.transform = `scaleX(${progress})`;
      if (wipeMobileRef.current) wipeMobileRef.current.style.transform = `scaleY(${progress})`;
    };

    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const words = description.split(" ");

  return (
    <div
      ref={ref}
      className={`relative grid items-center gap-10 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-16 ${
        isInView
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      {/* Color wipe layers — behind the image/text content, invisible at rest
          (scale 0), scroll-linked so they sweep in and back out with position. */}
      <div
        ref={wipeMobileRef}
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 origin-top bg-gradient-to-b from-navy-700/35 via-navy-600/15 to-transparent lg:hidden"
        style={{ transform: "scaleY(0)" }}
      />
      <div
        ref={wipeDesktopRef}
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 z-0 hidden lg:block ${
          reverse ? "origin-right bg-gradient-to-l" : "origin-left bg-gradient-to-r"
        } from-navy-700/58 via-navy-600/50 to-transparent`}
        style={{ transform: "scaleX(0)" }}
      />

      <div className={`relative z-10 ${reverse ? "lg:order-2" : ""}`}>
        <ImagePlaceholder label={imageLabel} aspectRatio="video" className="rounded" src={imageSrc} />
      </div>
      <div className={`relative z-10 flex flex-col gap-4 ${reverse ? "lg:order-1" : ""}`}>
        {eyebrow && (
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase">
            <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <div className="inline-block">
          <h3
            className={`font-heading text-2xl font-bold text-navy-950 transition-all duration-700 ease-out ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {title}
          </h3>
          {/* Accent underline draws in just after the heading settles. */}
          <span
            aria-hidden="true"
            className={`mt-2 block h-[3px] w-12 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-transform delay-200 duration-500 ease-out ${
              isInView ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
        {/* Staggered word-by-word fade-up, cascading in just after the underline. */}
        <p className="text-base leading-relaxed text-ink-500">
          {words.map((word, i) => (
            <span
              key={i}
              className={`inline-block transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                isInView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
              style={{ transitionDelay: `${350 + i * 22}ms` }}
            >
              {word}&nbsp;
            </span>
          ))}
        </p>
        {children}
      </div>
    </div>
  );
}
