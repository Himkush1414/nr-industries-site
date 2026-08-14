import { clientNames } from "@/data/company";

/** PLACEHOLDER — swap each box for the real client logo before launch. */
export function ClientMarquee() {
  // Duplicated once so the track can loop seamlessly at -50% translateX.
  const track = [...clientNames, ...clientNames];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-4 hover:[animation-play-state:paused]">
        {track.map((name, i) => (
          <div
            key={`${name}-${i}`}
            aria-label={`${name} — logo pending`}
            className="flex h-16 w-40 shrink-0 items-center justify-center rounded border border-ink-100 bg-white px-4 text-center text-sm font-semibold text-ink-500"
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  );
}
