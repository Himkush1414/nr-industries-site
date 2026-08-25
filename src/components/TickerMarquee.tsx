interface TickerMarqueeProps {
  items: string[];
  ariaLabel: string;
  /** Screen movement: ltr = content moves left → right, rtl = right → left. */
  direction?: "ltr" | "rtl";
  variant?: "gold" | "muted";
  className?: string;
  /** Full-loop duration in seconds — longer lists should use a higher value to match perceived speed. */
  durationSeconds?: number;
}

const VARIANT_CLASS = {
  gold: {
    wrap: "border-y border-gold-500/20 bg-navy-900",
    text: "text-gold-400/90",
    dot: "text-gold-500/35",
  },
  muted: {
    wrap: "border-y border-navy-700/40 bg-navy-950",
    text: "text-navy-100/85",
    dot: "text-navy-400/50",
  },
} as const;

/** Thin infinite scrolling ticker — shared by home strips and interior page heroes. */
export function TickerMarquee({
  items,
  ariaLabel,
  direction = "ltr",
  variant = "gold",
  className = "",
  durationSeconds = 38,
}: TickerMarqueeProps) {
  const track = [...items, ...items];
  const styles = VARIANT_CLASS[variant];
  const directionClass = direction === "ltr" ? "[animation-direction:reverse]" : "";

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)] ${styles.wrap} ${className}`.trim()}
      aria-label={ariaLabel}
    >
      <div
        className={`flex h-[clamp(20px,18.385px+0.4307vw,25px)] w-max items-center animate-marquee gap-[clamp(16px,10.832px+1.3781vw,32px)] hover:[animation-play-state:paused] ${directionClass}`}
        style={{ animationDuration: `${durationSeconds}s` }}
      >
        {track.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`flex shrink-0 items-center gap-[clamp(16px,10.832px+1.3781vw,32px)] text-[clamp(0.5rem,0.4394rem+0.2584vw,0.6875rem)] font-semibold tracking-[clamp(0.12em,0.1em+0.03vw,0.18em)] uppercase leading-none ${styles.text}`}
          >
            <span>{item}</span>
            <span className={styles.dot} aria-hidden="true">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
