import { useReveal } from "../lib/useReveal";

interface RevealTextProps {
  text: string;
  className?: string;
  wordClassName?: string;
  delayMs?: number;
  staggerMs?: number;
  /** Optional external gate. When `false`, the text stays hidden even after it
   *  scrolls into view; the staggered reveal runs once this flips to `true`
   *  (and the text is in view). Defaults to `true` — unchanged behaviour. */
  enabled?: boolean;
}

/**
 * Staggered word-by-word reveal, triggered once the text scrolls into view.
 * Renders as an inline <span> — wrap it in the semantic heading/paragraph tag
 * at the call site (e.g. `<h1><RevealText text="..." /></h1>`).
 */
export function RevealText({
  text,
  className = "",
  wordClassName = "",
  delayMs = 0,
  staggerMs = 45,
  enabled = true,
}: RevealTextProps) {
  const { ref, revealed: inView } = useReveal<HTMLSpanElement>({ threshold: 0.4 });
  const revealed = inView && enabled;
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={`${i}-${word}`} className="inline-block overflow-hidden pb-[0.2em] align-bottom -mb-[0.2em]">
          <span
            className={`inline-block will-change-transform ${wordClassName}`}
            style={{
              transitionProperty: "transform, opacity",
              transitionDuration: "900ms",
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              transitionDelay: `${delayMs + i * staggerMs}ms`,
              transform: revealed ? "translateY(0%)" : "translateY(115%)",
              opacity: revealed ? 1 : 0,
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </span>
        </span>
      ))}
    </span>
  );
}
