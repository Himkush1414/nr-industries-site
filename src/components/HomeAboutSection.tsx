import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useInView } from "@/hooks/useInView";

const ABOUT_STEPS = [
  {
    image: "/about-1.webp",
    imageAlt: "N R Industries manufacturing facility",
  },
  {
    image: "/about-2.webp",
    imageAlt: "N R Industries power equipment production",
  },
  {
    image: "/about-3.webp",
    imageAlt: "N R Industries transformer solutions",
  },
] as const;

interface TextSegment {
  text: string;
  bold?: boolean;
}

/**
 * Word-by-word fade-up across one or more text segments (plain/bold), each
 * word delayed a little further than the last — the same staggered idiom
 * `FeatureRow` uses for its description text further down this page. Reused
 * here so the two sections read as one consistent design language rather
 * than two different techniques.
 */
function StaggeredWords({
  segments,
  isInView,
  startDelayMs = 0,
  stepMs = 20,
}: {
  segments: TextSegment[];
  isInView: boolean;
  startDelayMs?: number;
  stepMs?: number;
}) {
  let wordIndex = 0;
  return (
    <>
      {segments.map((segment, segIndex) => (
        <span key={segIndex}>
          {segment.text.split(" ").map((word, i) => {
            const delay = startDelayMs + wordIndex * stepMs;
            wordIndex += 1;
            return (
              <span
                key={i}
                className={`inline-block transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                  segment.bold ? "font-semibold text-navy-950" : ""
                } ${isInView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
                style={{ transitionDelay: `${delay}ms` }}
              >
                {word}&nbsp;
              </span>
            );
          })}
        </span>
      ))}
    </>
  );
}

/**
 * Home page About Us teaser.
 *
 * Each of the three steps reveals once — fade + upward movement, staggered
 * word-by-word on the body copy — the first time it scrolls roughly to the
 * center of the viewport, via `useInView` (the same one-shot IntersectionObserver
 * hook used everywhere else on the site: Reveal, FeatureRow). The sticky image
 * crossfades to match whichever step most recently revealed; it never reverses
 * on scroll-up, matching the site's one-shot reveal convention elsewhere.
 */
export function HomeAboutSection() {
  const step0 = useInView<HTMLDivElement>(0.5);
  const step1 = useInView<HTMLParagraphElement>(0.5);
  const step2 = useInView<HTMLDivElement>(0.4);

  const activeIndex = step2.isInView ? 2 : step1.isInView ? 1 : step0.isInView ? 0 : -1;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        {/* Left: sticky image panel */}
        <div className="sticky top-[4.75rem] z-30 -mx-5 bg-surface px-5 pb-4 sm:-mx-8 sm:px-8 lg:top-24 lg:z-10 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0">
          <div
            className={[
              "relative aspect-video overflow-hidden rounded",
              "border border-ink-100 shadow-sm",
              "lg:border-0 lg:rounded-xl",
              "lg:shadow-[0_2px_4px_-1px_rgba(11,31,58,0.08),0_12px_32px_-8px_rgba(11,31,58,0.22),0_32px_56px_-16px_rgba(11,31,58,0.16)]",
            ].join(" ")}
          >
            {ABOUT_STEPS.map((step, index) => (
              <img
                key={step.image}
                src={step.image}
                alt={step.imageAlt}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out motion-reduce:transition-none ${
                  index <= activeIndex || (activeIndex === -1 && index === 0)
                    ? "opacity-100"
                    : "opacity-0"
                }`}
                style={{ zIndex: index }}
                decoding="async"
              />
            ))}
          </div>
        </div>

        {/* Right: text steps */}
        <div className="flex flex-col gap-16 sm:gap-20 lg:gap-24">
          {/* Step 0 — eyebrow + headline */}
          <div ref={step0.ref} className="flex flex-col gap-4">
            <span
              className={`flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase transition-all duration-500 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                step0.isInView ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"
              }`}
            >
              <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
              About Us
            </span>
            <div className="inline-block">
              <h2
                className={`font-heading text-3xl font-bold tracking-tight text-navy-950 transition-all delay-100 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:text-4xl ${
                  step0.isInView ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                }`}
              >
                Powering industries with reliable transformer solutions
              </h2>
              <span
                aria-hidden="true"
                className={`mt-3 block h-[3px] w-14 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-transform delay-500 duration-500 ease-out motion-reduce:scale-x-100 ${
                  step0.isInView ? "scale-x-100" : "scale-x-0"
                }`}
              />
            </div>
          </div>

          {/* Step 1 — company intro paragraph */}
          <p
            ref={step1.ref}
            className="max-w-xl text-base leading-relaxed font-medium text-ink-700 sm:text-lg"
          >
            <StaggeredWords
              segments={[
                { text: "N R Industries", bold: true },
                {
                  text: "manufactures reliable, high-performance transformers and voltage solutions for industrial and commercial applications.",
                },
              ]}
              isInView={step1.isInView}
            />
          </p>

          {/* Step 2 — product range + tagline + CTA */}
          <div ref={step2.ref} className="flex max-w-xl flex-col gap-6">
            <p className="text-base leading-relaxed font-medium text-ink-700 sm:text-lg">
              <StaggeredWords
                segments={[
                  { text: "From" },
                  { text: "Distribution and Power Transformers", bold: true },
                  { text: "to" },
                  {
                    text: "Furnace, Dry Type, Solar, Pad Mounted Transformers, HT-AVR Transformers, and Servo Voltage Stabilizers,",
                    bold: true,
                  },
                  { text: "we provide solutions built for dependable performance." },
                ]}
                isInView={step2.isInView}
              />
            </p>

            <p
              className={`font-heading text-lg font-semibold text-navy-950 transition-all delay-300 duration-700 ease-out motion-reduce:translate-y-0 motion-reduce:opacity-100 sm:text-xl ${
                step2.isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              Quality products. On-time delivery. Reliable support.
            </p>

            <Link
              to="/about"
              className={`inline-flex w-fit items-center gap-2 text-sm font-semibold text-navy-800 transition-all delay-500 duration-700 ease-out hover:text-gold-600 motion-reduce:translate-y-0 motion-reduce:opacity-100 ${
                step2.isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
              }`}
            >
              Learn More About Us
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
