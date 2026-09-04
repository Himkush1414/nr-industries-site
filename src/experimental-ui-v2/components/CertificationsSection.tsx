import { ShieldCheck } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { certifications } from "@/data/company";

/**
 * Real certification data/logos, same source as the live CertificationStrip.
 * Styled with the same dark-card + white-logo-chip treatment as the Trusted
 * By and card-carousel sections, for visual consistency across this
 * experiment's "badge grid" pattern.
 */
export function CertificationsSection() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page flex flex-col gap-10">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="v2-accent-text text-xs font-semibold tracking-[0.22em] uppercase">
            Certifications
          </span>
          <h2 className="font-heading v2-fg text-3xl font-bold tracking-tight sm:text-4xl">
            Built to recognized standards
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-8">
            {certifications.map((cert) => (
              <div
                key={cert.code}
                className="v2-card-dark flex flex-col items-center gap-2 p-4 text-center"
              >
                {cert.logoSrc ? (
                  <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-white p-2">
                    <img
                      src={cert.logoSrc}
                      alt={cert.label}
                      className="h-full w-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ) : (
                  <div
                    role="img"
                    aria-label={`${cert.label} — badge pending`}
                    className="flex h-14 w-14 items-center justify-center rounded-lg"
                    style={{ backgroundColor: "var(--v2-card-dark-bg-raised)" }}
                  >
                    <ShieldCheck className="h-6 w-6" style={{ color: "var(--v2-accent-bright)" }} aria-hidden="true" />
                  </div>
                )}
                <span className="text-xs font-semibold" style={{ color: "var(--v2-card-dark-fg)" }}>
                  {cert.code}
                </span>
                <span className="text-[10px] leading-tight" style={{ color: "var(--v2-fg-faint)" }}>
                  {cert.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
