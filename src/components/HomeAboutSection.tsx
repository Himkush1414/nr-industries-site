import { ArrowRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/SectionHeading";

const ABOUT_STEPS = [
  {
    image: "/about-1.jpg",
    imageAlt: "N R Industries manufacturing facility",
  },
  {
    image: "/about-2.jpg",
    imageAlt: "N R Industries power equipment production",
  },
  {
    image: "/about-3.jpg",
    imageAlt: "N R Industries transformer solutions",
  },
] as const;

/** Home page About Us — scroll-linked text reveals with a crossfading image panel.
 * 3 text steps, 3 images, 1:1 mapping. */
export function HomeAboutSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [revealedSteps, setRevealedSteps] = useState<Set<number>>(() => new Set([0]));
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const rootMargin = mobileQuery.matches ? "-42% 0px -8% 0px" : "-12% 0px -12% 0px";

    const observers = stepRefs.current.map((node, index) => {
      if (!node) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry?.isIntersecting) return;
          setActiveStep(index);
          setRevealedSteps((prev) => {
            if (prev.has(index)) return prev;
            const next = new Set(prev);
            next.add(index);
            return next;
          });
        },
        { threshold: 0.45, rootMargin },
      );

      observer.observe(node);
      return observer;
    });

    return () => observers.forEach((observer) => observer?.disconnect());
  }, []);

  const isRevealed = (index: number) => revealedSteps.has(index);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
        <div className="sticky top-[4.75rem] z-30 -mx-5 bg-surface px-5 pb-4 sm:-mx-8 sm:px-8 lg:top-24 lg:z-10 lg:mx-0 lg:bg-transparent lg:px-0 lg:pb-0">
          <div className="relative aspect-video overflow-hidden rounded border border-ink-100 bg-white shadow-sm lg:border-0 lg:shadow-none">
            {ABOUT_STEPS.map((step, index) => (
              <img
                key={step.image}
                src={step.image}
                alt={step.imageAlt}
                className={`absolute inset-0 h-full w-full object-cover object-center transition-opacity duration-700 ease-out ${
                  activeStep === index ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden={activeStep !== index}
                decoding="async"
              />
            ))}
          </div>
        </div>

        <div className="relative z-0 flex flex-col lg:z-auto">
          <div
            ref={(node) => {
              stepRefs.current[0] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <div
              className={`transition-all duration-500 ease-out ${
                isRevealed(0)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              <SectionHeading
                eyebrow="About Us"
                title="Powering industries with reliable transformer solutions"
                as="h2"
              />
            </div>
          </div>

          <div
            ref={(node) => {
              stepRefs.current[1] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <p
              className={`text-base leading-relaxed font-medium text-ink-700 transition-all duration-500 ease-out sm:text-lg ${
                isRevealed(1)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              <strong className="font-semibold text-navy-950">N R Industries</strong> manufactures
              reliable, high-performance transformers and voltage solutions for industrial and
              commercial applications.
            </p>
          </div>

          <div
            ref={(node) => {
              stepRefs.current[2] = node;
            }}
            className="min-h-[28vh] py-6 sm:min-h-[32vh] lg:min-h-[38vh] lg:py-10"
          >
            <p
              className={`text-base leading-relaxed font-medium text-ink-700 transition-all duration-500 ease-out sm:text-lg ${
                isRevealed(2)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              From{" "}
              <strong className="font-semibold text-navy-950">
                Distribution and Power Transformers
              </strong>{" "}
              to{" "}
              <strong className="font-semibold text-navy-950">
                Furnace, Dry Type, Solar, Pad Mounted Transformers, HT-AVR Transformers, and Servo
                Voltage Stabilizers
              </strong>
              , we provide solutions built for dependable performance.
            </p>

            <p
              className={`mt-6 font-heading text-lg font-semibold text-navy-950 transition-all duration-500 ease-out sm:text-xl ${
                isRevealed(2)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-5 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
              }`}
            >
              Quality products. On-time delivery. Reliable support.
            </p>

            <Link
              to="/about"
              className={`mt-6 inline-flex items-center gap-2 text-sm font-semibold text-navy-800 transition-all duration-500 ease-out hover:text-gold-600 ${
                isRevealed(2)
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
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