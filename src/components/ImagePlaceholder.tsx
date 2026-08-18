import { ImageOff } from "lucide-react";

export type PlaceholderAspectRatio = "square" | "video" | "banner" | "portrait";

interface ImagePlaceholderProps {
  label: string;
  aspectRatio?: PlaceholderAspectRatio;
  className?: string;
  /** Set true for logo/badge placeholders to render on a lighter card instead of navy. */
  light?: boolean;
  /** Real photo path under /public. When provided, renders the photo instead of the pending placeholder. */
  src?: string;
}

const ASPECT_CLASS: Record<PlaceholderAspectRatio, string> = {
  square: "aspect-square",
  video: "aspect-video",
  banner: "aspect-[21/9]",
  portrait: "aspect-[3/4]",
};

/**
 * Renders a real photo when `src` is provided; otherwise falls back to the
 * "image pending" placeholder. Reserves the correct aspect ratio either way,
 * so swapping a photo in later causes no layout shift.
 */
export function ImagePlaceholder({
  label,
  aspectRatio = "video",
  className = "",
  light = false,
  src,
}: ImagePlaceholderProps) {
  if (src) {
    return (
      <img
        src={src}
        alt={label}
        loading="lazy"
        className={`object-cover ${ASPECT_CLASS[aspectRatio]} ${className}`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={`${label} — image pending`}
      className={`flex items-center justify-center border ${ASPECT_CLASS[aspectRatio]} ${
        light
          ? "border-ink-100 bg-navy-50 text-ink-500"
          : "border-navy-600/60 bg-navy-800 text-navy-100/70"
      } ${className}`}
    >
      <div className="flex flex-col items-center gap-2 px-4 text-center">
        <ImageOff className="h-5 w-5 opacity-60" aria-hidden="true" />
        <span className="text-xs font-medium tracking-wide uppercase">{label}</span>
        <span className="text-[10px] opacity-60">Image pending</span>
      </div>
    </div>
  );
}