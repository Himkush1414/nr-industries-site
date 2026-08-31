import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * Hero video — its own full-bleed section, directly below <Hero>. Separate from
 * the company-overview <VideoPanel> that sits near the footer.
 *
 * Source: /public/hero-bg.mp4 (1920×1080, i.e. exactly 16:9). The frame is a
 * full-width 16:9 box with ~50px trimmed off the bottom (see .exp-herovid-*);
 * nothing on the sides or top is cropped — phone screens included.
 *
 * Chrome-free, muted + autoplay + loop. The <video> lazy-mounts when the
 * section is close, plays only while it's on-screen, and pauses when scrolled
 * away or the tab is hidden. Under prefers-reduced-motion the <video> is never
 * mounted — the poster still fills the same space.
 *
 * Reversible / isolated: delete this file, its `.exp-herovid-*` CSS block, and
 * the <HeroVideoSection /> line in ExperimentalHomePage.tsx to revert.
 */
const HERO_VIDEO_SRC = "/hero-bg.mp4";
/** Poster / reduced-motion still — a plant-floor photo already in the project. */
const POSTER_SRC = "/hero-home.webp";

export function HeroVideoSection() {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);

  // Defer putting the <video> in the DOM until the section is ~1 screen away.
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
    <section className="exp-sec-dark relative isolate">
      <div ref={frameRef} className="exp-herovid-frame">
        <img src={POSTER_SRC} alt="" aria-hidden="true" loading="lazy" className="exp-herovid-media" />
        {!reduced && mounted && (
          <video
            ref={videoRef}
            className="exp-herovid-media"
            src={HERO_VIDEO_SRC}
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
        {/* Decorative, non-interactive cover over the baked-in "Made in Raylight"
            watermark in the video's bottom-right corner. Desktop only. */}
        <div aria-hidden="true" className="exp-herovid-watermark-cover hidden lg:block" />
      </div>
    </section>
  );
}
