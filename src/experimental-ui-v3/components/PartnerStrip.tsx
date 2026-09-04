import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { clients } from "@/data/company";

/**
 * Real client logos, shown as muted pills in a single auto-scrolling row —
 * reuses the same marquee technique (global `animate-marquee` keyframe) the
 * live site's TickerMarquee already uses, so it's a proven, lightweight
 * approach rather than a new one.
 *
 * A third of these files (checked directly) have an opaque background baked
 * in rather than true transparency — the same issue hit in Lab V2 — so each
 * logo sits on a small light chip inside the pill (guaranteed correct
 * regardless of the source file) rather than floating directly on the dark
 * pill background, with `grayscale` muting its color either way.
 */
const PARTNERS = clients.slice(0, 14);
const TRACK = [...PARTNERS, ...PARTNERS];

export function PartnerStrip() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-page flex flex-col items-center gap-8">
        <GsapReveal>
          <span className="v3-micro-label">Trusted By</span>
        </GsapReveal>

        <GsapReveal className="w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
          <div className="animate-marquee flex w-max items-center gap-4" style={{ animationDuration: "40s" }}>
            {TRACK.map((client, i) => (
              <div
                key={`${client.name}-${i}`}
                className="v3-border flex h-14 shrink-0 items-center rounded-full border bg-white/[0.03] py-2 pr-5 pl-2"
              >
                <span className="flex h-10 w-16 items-center justify-center rounded-full bg-[#eceaf5]">
                  <img
                    src={client.logoSrc}
                    alt={client.name}
                    className="h-6 w-auto max-w-[3.2rem] object-contain opacity-80 grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </span>
              </div>
            ))}
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
