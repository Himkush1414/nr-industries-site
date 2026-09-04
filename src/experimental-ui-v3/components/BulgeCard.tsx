import { useRef } from "react";
import { gsap } from "@/experimental-ui-v3/lib/gsapSetup";
import { usePrefersReducedMotion } from "@/experimental-ui-v3/lib/usePrefersReducedMotion";

/**
 * Pointer-reactive "bulge" card: a subtle 3D tilt toward the cursor (GSAP,
 * quaternion-free rotateX/rotateY based on pointer position within the card)
 * plus a soft glow that tracks the pointer — the same ambient-glow language
 * used behind headings/CTAs, applied here on hover. No existing bulge
 * component was found in the codebase, so this is built fresh.
 */
export function BulgeCard({ image, label }: { image: string; label: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion) return;
    const card = cardRef.current;
    const glow = glowRef.current;
    if (!card || !glow) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = x / rect.width - 0.5;
    const cy = y / rect.height - 0.5;
    gsap.to(card, {
      rotateX: cy * -8,
      rotateY: cx * 8,
      scale: 1.02,
      transformPerspective: 800,
      duration: 0.5,
      ease: "power3.out",
    });
    gsap.to(glow, { x: x - 88, y: y - 88, opacity: 0.55, duration: 0.4, ease: "power3.out" });
  };

  const handleLeave = () => {
    if (reducedMotion) return;
    gsap.to(cardRef.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.7, ease: "power3.out" });
    gsap.to(glowRef.current, { opacity: 0, duration: 0.4 });
  };

  return (
    <div
      ref={cardRef}
      className="v3-bulge-card relative aspect-[4/3]"
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
    >
      <img src={image} alt="" className="h-full w-full object-cover" loading="lazy" decoding="async" />
      <div className="v3-bulge-overlay" aria-hidden="true" />
      <div
        ref={glowRef}
        className="pointer-events-none absolute top-0 left-0 h-44 w-44 rounded-full opacity-0"
        style={{ background: "radial-gradient(circle, rgba(255,255,255,0.4), transparent 70%)" }}
        aria-hidden="true"
      />
      <span className="v3-fg absolute bottom-4 left-4 text-sm font-semibold">{label}</span>
    </div>
  );
}
