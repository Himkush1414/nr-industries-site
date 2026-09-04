import { Reveal } from "@/components/Reveal";
import { clients } from "@/data/company";
import type { ClientItem } from "@/types/content";

/**
 * The reference's "customer name card row" is followed by a pricing section
 * we don't have (no subscriptions) — skipped entirely per spec. For the card
 * row itself, we have no testimonial quotes on file, so this adapts it into
 * real client-logo cards instead (our actual trusted-partner data), rather
 * than inventing quotes that don't exist.
 *
 * Round 3: converted from a static grid into a genuinely moving two-row
 * marquee — top row drifts left, bottom row drifts right, both looping
 * seamlessly. Reuses the exact animation technique the live site's own
 * TickerMarquee already uses (the global `animate-marquee` keyframe +
 * `[animation-direction:reverse]` for the opposite row, plus the same
 * edge-fade mask), rather than inventing a new one.
 */
const TOP_ROW = clients.slice(0, 11);
const BOTTOM_ROW = clients.slice(11);

function LogoCard({ client }: { client: ClientItem }) {
  return (
    <div className="v2-card-dark flex h-24 w-40 shrink-0 items-center justify-center p-3 sm:h-28 sm:w-48">
      {/* White chip: several client logo files carry an opaque background
          rather than true transparency (same issue as our own logo.webp),
          so a white plate is the reliable way to show any of them cleanly
          on a dark card. */}
      <div className="flex h-full w-full items-center justify-center rounded-lg bg-white p-3">
        <img
          src={client.logoSrc}
          alt={client.name}
          className="max-h-10 w-auto max-w-full object-contain sm:max-h-12"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
}

function MarqueeRow({
  items,
  reverse,
  durationSeconds,
}: {
  items: ClientItem[];
  reverse: boolean;
  durationSeconds: number;
}) {
  const track = [...items, ...items];
  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className={`flex w-max items-center gap-4 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((client, i) => (
          <LogoCard key={`${client.name}-${i}`} client={client} />
        ))}
      </div>
    </div>
  );
}

export function TrustedSection() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page flex flex-col gap-10">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="v2-accent-text text-xs font-semibold tracking-[0.22em] uppercase">
            Trusted By
          </span>
          <h2 className="font-heading v2-fg text-3xl font-bold tracking-tight sm:text-4xl">
            Running behind the scenes for names you know
          </h2>
          <p className="v2-fg-dim text-base leading-relaxed">
            From energy majors to national utilities, our equipment powers organizations across
            sectors.
          </p>
        </Reveal>

        <Reveal delayMs={100} className="flex flex-col gap-4">
          <MarqueeRow items={TOP_ROW} reverse={false} durationSeconds={34} />
          <MarqueeRow items={BOTTOM_ROW} reverse durationSeconds={30} />
        </Reveal>
      </div>
    </section>
  );
}
