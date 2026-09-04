import { useEffect, useRef, useState } from "react";

interface HalftonePhotoImage {
  src: string;
  alt: string;
}

interface HalftonePhotoProps {
  images: HalftonePhotoImage[];
  /** Milliseconds each photo holds before cross-dissolving to the next. */
  intervalMs?: number;
  className?: string;
}

/**
 * Real product photos run through a CSS/SVG halftone-style treatment: each
 * source image is desaturated + contrast-boosted, with a dot-screen layer
 * blended on top (`mix-blend-mode: hard-light`, see `.v2-halftone` in
 * experimental-v2.css) so the underlying luminance modulates dot visibility —
 * a print-halftone look from a real photo, not an abstract placeholder.
 *
 * With more than one image, they auto-cycle on a timer with a cross-dissolve
 * (all images stacked absolutely, only the active one at opacity-100), looping
 * back to the first after the last. Disabled under prefers-reduced-motion —
 * the first photo just stays put.
 */
export function HalftonePhoto({ images, intervalMs = 4500, className = "" }: HalftonePhotoProps) {
  const [active, setActive] = useState(0);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useEffect(() => {
    if (images.length < 2 || reducedMotionRef.current) return;
    const id = setInterval(() => {
      setActive((i) => (i + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images.length, intervalMs]);

  return (
    <div className={`v2-halftone ${className}`.trim()}>
      {images.map((image, i) => (
        <img
          key={image.src}
          src={image.src}
          alt={i === active ? image.alt : ""}
          aria-hidden={i === active ? undefined : true}
          decoding="async"
          className={`transition-opacity duration-[1200ms] ease-in-out motion-reduce:transition-none ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ position: i === 0 ? undefined : "absolute", inset: i === 0 ? undefined : 0 }}
        />
      ))}
    </div>
  );
}
