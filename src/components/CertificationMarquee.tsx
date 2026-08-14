import { certifications } from "@/data/company";

/** Thin scrolling certification ticker — same marquee loop as ClientMarquee, moves left → right. */
export function CertificationMarquee() {
  const track = [...certifications, ...certifications];

  return (
    <div
      className="mt-[5px] overflow-hidden border-y border-gold-500/20 bg-navy-900 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
      aria-label="Certifications"
    >
      <div
        className="flex h-[20px] w-max items-center animate-marquee gap-4 [animation-direction:reverse] hover:[animation-play-state:paused] sm:h-[22px] sm:gap-6 md:h-[25px] md:gap-8"
      >
        {track.map((cert, i) => (
          <span
            key={`${cert.code}-${i}`}
            className="flex shrink-0 items-center gap-4 text-[8px] font-semibold tracking-[0.12em] text-gold-400/90 uppercase leading-none sm:gap-6 sm:text-[10px] sm:tracking-[0.16em] md:gap-8 md:text-[11px] md:tracking-[0.18em]"
          >
            <span>{cert.code}</span>
            <span className="hidden text-gold-400/55 md:inline">{cert.label}</span>
            <span className="text-gold-500/35" aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
