import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "../lib/usePrefersReducedMotion";

/**
 * Hero video — its own full-bleed section, directly below <Hero>. Separate from
 * the company-overview <VideoPanel> that sits near the footer.
 *
 * Source: /public/hero-video.mp4. The frame is a full-width 16:9 box with
 * ~50px trimmed off the bottom (see .exp-herovid-*); nothing on the sides or
 * top is cropped — phone screens included.
 *
 * Chrome-free, muted + autoplay + loop. The <video> lazy-mounts when the
 * section is close, plays only while it's on-screen, and pauses when scrolled
 * away or the tab is hidden. Under prefers-reduced-motion the <video> is never
 * mounted — the frame's own solid background fills the same space, no
 * fallback image.
 *
 * Reversible / isolated: delete this file, its `.exp-herovid-*` CSS block, and
 * the <HeroVideoSection /> line in ExperimentalHomePage.tsx to revert.
 */
const HERO_VIDEO_SRC = "/hero-video.mp4";

export function HeroVideoSection() {
  const reduced = usePrefersReducedMotion();
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mounted, setMounted] = useState(false);
  const [videoErrored, setVideoErrored] = useState(false);

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
        {!reduced && mounted && !videoErrored && (
          <video
            ref={videoRef}
            className="exp-herovid-media"
            src={HERO_VIDEO_SRC}
            autoPlay
            muted
            loop
            playsInline
            controls={false}
            controlsList="nodownload noplaybackrate nofullscreen"
            disablePictureInPicture
            preload="metadata"
            tabIndex={-1}
            // If the file 404s or fails to decode, unmount rather than leave a
            // broken/frozen <video> box — the frame's own solid background
            // (.exp-herovid-frame) is then the only thing visible, a clean fallback.
            onError={() => setVideoErrored(true)}
          />
        )}
        {/* Decorative, non-interactive cover over the baked-in "Made in Raylight"
            watermark in the video's bottom-right corner. Desktop only. */}
        <div aria-hidden="true" className="exp-herovid-watermark-cover hidden lg:block" />
      </div>
    </section>
  );
}
