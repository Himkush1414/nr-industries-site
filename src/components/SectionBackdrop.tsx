interface SectionBackdropProps {
  /** "light" for sections on a pale surface (navy grid + soft color blobs). "dark" for
   * sections on a navy background (white grid + subtler blobs). */
  variant?: "light" | "dark";
}

/**
 * Decorative grid + glow layer for sections that would otherwise read as flat/empty.
 * Render as the first child of a `relative overflow-hidden` section — it never
 * captures pointer events, and real content should follow it in DOM order so it
 * paints on top without needing z-index.
 */
export function SectionBackdrop({ variant = "light" }: SectionBackdropProps) {
  const isLight = variant === "light";

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className={`absolute inset-0 ${isLight ? "blueprint-grid-light opacity-70" : "blueprint-grid opacity-30"}`} />
      <div
        className={`absolute -top-32 -left-24 h-80 w-80 rounded-full blur-3xl ${
          isLight ? "bg-gold-400/15" : "bg-gold-400/10"
        }`}
      />
      <div
        className={`absolute -right-24 -bottom-32 h-96 w-96 rounded-full blur-3xl ${
          isLight ? "bg-navy-600/10" : "bg-navy-500/15"
        }`}
      />
      <div
        className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent to-transparent ${
          isLight ? "via-navy-900/10" : "via-white/15"
        }`}
      />
    </div>
  );
}
