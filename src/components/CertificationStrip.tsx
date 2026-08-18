import { ShieldCheck } from "lucide-react";
import { certifications } from "@/data/company";

/** Real logos render where available; entries without one (e.g. Make in India) fall back to the icon placeholder. */
export function CertificationStrip() {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-8 lg:gap-5">
      {certifications.map((cert) => (
        <li key={cert.code} className="flex flex-col items-center gap-2 text-center">
          {cert.logoSrc ? (
            <div className="flex h-20 w-20 items-center justify-center rounded bg-navy-50 p-2">
              <img
                src={cert.logoSrc}
                alt={cert.label}
                className="h-full w-full object-contain"
                loading="lazy"
              />
            </div>
          ) : (
            <div
              role="img"
              aria-label={`${cert.label} — badge pending`}
              className="flex h-20 w-20 items-center justify-center rounded bg-navy-50"
            >
              <ShieldCheck className="h-8 w-8 text-navy-600" aria-hidden="true" />
            </div>
          )}
          <span className="text-[11px] leading-tight font-semibold text-navy-950">
            {cert.code}
          </span>
          <span className="text-[10px] leading-tight text-ink-500">{cert.label}</span>
        </li>
      ))}
    </ul>
  );
}