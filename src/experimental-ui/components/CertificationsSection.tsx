import { ShieldCheck } from "lucide-react";
import { certifications } from "@/data/company";
import { RevealBlock } from "./RevealBlock";
import { SectionHeader } from "./SectionHeader";

/**
 * Certifications — replaces the current site's "Running quietly across
 * industries" client-logo marquee. Fresh copy about standards compliance; the
 * real certification badges from the company data, in a static grid. No marquee,
 * no auto-scroll.
 */
export function CertificationsSection() {
  return (
    <section className="exp-sec-dark py-24 sm:py-28">
      <div className="container-page flex flex-col gap-12">
        <SectionHeader
          eyebrow="Certifications"
          title="Certified to the standards that matter"
          subtitle="Every N R Industries product is built under quality systems audited by national and international bodies — from core design through final routine test."
        />
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <RevealBlock key={cert.code} delayMs={(i % 4) * 60} distance={18}>
              <div className="exp-card flex h-full items-center gap-3 p-4">
                {cert.logoSrc ? (
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-1.5">
                    <img src={cert.logoSrc} alt={cert.label} loading="lazy" className="h-full w-full object-contain" />
                  </span>
                ) : (
                  <span
                    className="exp-hair exp-accent-text flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border"
                    aria-hidden="true"
                  >
                    <ShieldCheck className="h-5 w-5" />
                  </span>
                )}
                <span className="flex min-w-0 flex-col">
                  <span className="exp-ink text-sm font-semibold">{cert.code}</span>
                  <span className="exp-dim text-[11px] leading-tight">{cert.label}</span>
                </span>
              </div>
            </RevealBlock>
          ))}
        </div>
      </div>
    </section>
  );
}
