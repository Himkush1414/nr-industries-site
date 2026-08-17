import { clients } from "@/data/company";

export function ClientMarquee() {
  // Duplicated once so the track can loop seamlessly at -50% translateX.
  const track = [...clients, ...clients];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div className="flex w-max animate-marquee gap-8 hover:[animation-play-state:paused]">
        {track.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex h-16 w-32 shrink-0 items-center justify-center"
          >
            <img
              src={client.logoSrc}
              alt={client.name}
              className="max-h-full max-w-full object-contain"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}