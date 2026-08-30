import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";
import { RevealBlock } from "./RevealBlock";
import { RevealText } from "./RevealText";

/**
 * Company overview video — the last section before the footer.
 *
 * The file lives at /public/company-overview.mp4. To swap it, replace that file
 * or repoint this constant.
 *
 * Full-bleed (edge to edge, no frame) and chrome-free (no native player UI).
 * Muted + autoplay + loop so it plays cleanly on its own; the observers pause it
 * when it's scrolled off-screen or the tab is hidden, and defer loading until the
 * panel is close. Under prefers-reduced-motion the <video> is never mounted — the
 * poster still fills the same space.
 */
const COMPANY_OVERVIEW_VIDEO_SRC = "/company-overview-updated.mp4";
/** Poster / reduced-motion still — a real plant-floor photo already in the project. */
const POSTER_SRC = "/hero-factory.webp";

export function VideoPanel() {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  // Defer putting the <video> in the DOM until the panel is ~1 screen away.
  useEffect(() => {
    if (reduced) return;
    const el = frameRef.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setMounted(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setMounted(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  // Play when scrolled into view, pause when scrolled away or the tab is hidden.
  useEffect(() => {
    if (!mounted || reduced) return;
    const el = frameRef.current;
    const video = videoRef.current;
    if (!el || !video) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) void video.play().catch(() => undefined);
        else video.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(el);

    const onVisibility = () => {
      if (document.hidden) video.pause();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [mounted, reduced]);

  return (
    /* pb removed so the panel meets the footer with no gap. */
    <section className="exp-sec-dark pt-24 sm:pt-28">
      <div className="container-page flex flex-col items-center gap-10">
        <RevealBlock className="flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="exp-eyebrow">Company Overview</span>
          <h2 className="exp-display exp-display-lg">
            <RevealText text="A look inside N R Industries" />
          </h2>
          <p className="exp-body max-w-lg">
            From core stacking to final routine test — a short walk through the plant that builds
            every unit.
          </p>
        </RevealBlock>
      </div>

      {/* Full-bleed video. Tablet/desktop: full 16:9 with 200px clipped off the
         top. Phone: a comfortable ~4:3 block with a centred crop. See
         .exp-video-frame / .exp-video-media in experimental.css. */}
      <RevealBlock distance={30} className="mt-10 w-full">
        <div ref={frameRef} className="exp-video-frame">
          <img src={POSTER_SRC} alt="" aria-hidden="true" loading="lazy" className="exp-video-media" />
          {!reduced && mounted && (
            <video
              ref={videoRef}
              className="exp-video-media"
              src={COMPANY_OVERVIEW_VIDEO_SRC}
              poster={POSTER_SRC}
              autoPlay
              muted
              loop
              playsInline
              controls={false}
              controlsList="nodownload noplaybackrate nofullscreen"
              disablePictureInPicture
              preload="metadata"
              tabIndex={-1}
            />
          )}
          {/* Covers the "Made in Raylight" watermark baked into the video's
             bottom-right corner; styled to read as a pill badge on the overlay.
             Remove this <Link> + the .exp-video-badge rule to revert. */}
          <Link to="/contact" className="exp-video-badge">
            Contact our team
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </div>
      </RevealBlock>
    </section>
  );
}
