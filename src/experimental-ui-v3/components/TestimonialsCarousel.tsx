import { ChevronLeft, ChevronRight } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useRef, useState } from "react";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { gsap } from "@/experimental-ui-v3/lib/gsapSetup";

/**
 * Placeholder testimonial content, written fresh for our own product at the
 * reference's tone/scale — generic roles rather than real named clients or
 * companies, since we have no testimonial quotes on file (same reasoning as
 * Lab V2's Trusted By section, just resolved differently here because this
 * section explicitly calls for quote content, not logos).
 */
const TESTIMONIALS = [
  {
    quote:
      "The turnaround time was exactly what we were quoted — no surprises, no delays on a project where timing mattered.",
    name: "Plant Manager",
    role: "Textile Manufacturing Unit",
    stat: { value: "On Time", label: "Delivery" },
  },
  {
    quote:
      "Their engineering team worked with us on the exact voltage spec our site needed, not just an off-the-shelf unit.",
    name: "Project Engineer",
    role: "Regional Power Utility",
    stat: { value: "Custom", label: "Engineering" },
  },
  {
    quote:
      "Years in, the unit hasn't missed a beat. Support has stayed responsive every time we've needed it.",
    name: "Facilities Head",
    role: "Food Processing Plant",
    stat: { value: "15+ yrs", label: "In Service" },
  },
];

function Initials({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <span
      className="flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold"
      style={{ background: "linear-gradient(135deg, var(--v3-accent-start), var(--v3-accent-end))", color: "var(--v3-highlight-end)" }}
    >
      {initials}
    </span>
  );
}

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const go = (next: number) => {
    const wrapped = (next + TESTIMONIALS.length) % TESTIMONIALS.length;
    const card = cardRef.current;
    if (card) {
      gsap.fromTo(card, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" });
    }
    setIndex(wrapped);
  };

  // `index` is always kept in bounds via modulo wrapping in `go`, so this index
  // access is provably safe despite the array-index type being `T | undefined`.
  const testimonial = TESTIMONIALS[index]!;

  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col items-center gap-12">
        <GsapReveal className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">What Our Clients Say</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Built on <em className="v3-accent-text italic">trust</em>, backed by delivery
          </h2>
        </GsapReveal>

        <div className="v3-glass grid w-full max-w-3xl grid-cols-1 gap-8 p-8 sm:grid-cols-[1fr_auto] sm:p-10">
          <div ref={cardRef} className="flex flex-col gap-6">
            <p className="font-heading v3-fg text-xl leading-relaxed font-medium sm:text-2xl">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="flex items-center gap-3">
              <Initials name={testimonial.name} />
              <div className="flex flex-col">
                <span className="v3-fg text-sm font-semibold">{testimonial.name}</span>
                <span className="v3-fg-faint text-xs">{testimonial.role}</span>
              </div>
            </div>
          </div>

          <div className="v3-border flex flex-col justify-center gap-1 border-t pt-6 text-center sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8">
            <span className="font-heading v3-accent-text text-3xl font-bold">{testimonial.stat.value}</span>
            <span className="v3-fg-faint text-xs font-semibold tracking-wide uppercase">{testimonial.stat.label}</span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <button type="button" aria-label="Previous testimonial" className="v3-arrow-btn" onClick={() => go(index - 1)}>
            <MorphIcon icon={ChevronLeft} size={18} reducedMotion="user" />
          </button>
          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.name}
                type="button"
                aria-label={`Go to testimonial ${i + 1}`}
                data-active={index === i}
                className="v3-dot"
                onClick={() => go(i)}
              />
            ))}
          </div>
          <button type="button" aria-label="Next testimonial" className="v3-arrow-btn" onClick={() => go(index + 1)}>
            <MorphIcon icon={ChevronRight} size={18} reducedMotion="user" />
          </button>
        </div>
      </div>
    </section>
  );
}
