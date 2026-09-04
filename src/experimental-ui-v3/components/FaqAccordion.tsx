import { Minus, Plus } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useState } from "react";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";

/** Real, grounded answers (certifications, AMC, repair services — all sourced
 * from data already used elsewhere on the site), not invented claims. */
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

function FaqItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="v3-glass overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
      >
        <span className="v3-fg font-heading text-base font-semibold">{question}</span>
        <span
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
          style={{ backgroundColor: "color-mix(in srgb, var(--v3-glass-end) 60%, transparent)" }}
        >
          <MorphIcon icon={open ? Minus : Plus} size={16} color="var(--v3-fg)" reducedMotion="user" />
        </span>
      </button>
      <div className="v3-accordion-panel" data-open={open}>
        <div>
          <p className="v3-fg-dim px-6 pb-5 text-sm leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FaqAccordion() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v3-micro-label">FAQ</span>
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Common <em className="v3-accent-text italic">questions</em>
          </h2>
        </GsapReveal>

        <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
          {FAQS.map((faq, i) => (
            <GsapReveal key={faq.question} delay={i * 0.04}>
              <FaqItem question={faq.question} answer={faq.answer} defaultOpen={i === 0} />
            </GsapReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
