import { ShieldCheck } from "lucide-react";
import { certifications } from "@/data/company";

/** PLACEHOLDER — swap each badge for the real certification mark before launch. */
export function CertificationStrip() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-9 lg:gap-4">
      {certifications.map((cert) => (
        <li
          key={cert.code}
          aria-label={`${cert.label} — badge pending`}
          className="flex flex-col items-center gap-2 rounded border border-ink-100 bg-white px-3 py-4 text-center"
        >
          <ShieldCheck className="h-6 w-6 text-navy-600" aria-hidden="true" />
          <span className="text-[11px] leading-tight font-semibold text-navy-950">
            {cert.code}
          </span>
          <span className="text-[10px] leading-tight text-ink-500">{cert.label}</span>
        </li>
      ))}
    </ul>
  );
}
