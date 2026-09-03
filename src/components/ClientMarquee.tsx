import { clients } from "@/data/company";

function ClientRow({
  items,
  direction,
  durationSeconds,
}: {
  items: typeof clients;
  direction: "ltr" | "rtl";
  durationSeconds: number;
}) {
  // Duplicated once so the track can loop seamlessly at -50% translateX.
  const track = [...items, ...items];

  return (
    <div className="overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <div
        className={`flex w-max animate-marquee items-center gap-10 hover:[animation-play-state:paused] sm:gap-14 ${
          direction === "ltr" ? "[animation-direction:reverse]" : ""
        }`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((client, i) => (
          <div
            key={`${client.name}-${i}`}
            className="flex h-20 w-40 shrink-0 items-center justify-center rounded-lg border border-ink-100 bg-white p-4 shadow-sm sm:h-24 sm:w-48"
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

/** Two counter-scrolling rows so the full client roster reads as one wide, prominent wall of logos. */
export function ClientMarquee() {
  const mid = Math.ceil(clients.length / 2);
  const rowA = clients.slice(0, mid);
  const rowB = clients.slice(mid);

  return (
    <div className="flex flex-col gap-6">
      <ClientRow items={rowA} direction="rtl" durationSeconds={42} />
      <ClientRow items={rowB} direction="ltr" durationSeconds={38} />
    </div>
  );
}