import { certifications } from "@/data/company";
import { TickerMarquee } from "@/components/TickerMarquee";

/** Thin scrolling certification ticker on the home page — moves left → right. */
export function CertificationMarquee() {
  const items = certifications.map((cert) =>
    cert.label ? `${cert.code} — ${cert.label}` : cert.code,
  );

  return (
    <TickerMarquee
      className="mt-[5px]"
      items={items}
      ariaLabel="Certifications"
      direction="ltr"
      variant="gold"
    />
  );
}
