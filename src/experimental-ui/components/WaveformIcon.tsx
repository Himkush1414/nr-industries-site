import { useId } from "react";

/**
 * Vertical audio-waveform glyph — blue-gradient bars of varying height. The bars
 * pulse up/down while the parent `.exp-appt-fab` is hovered (keyframes live in
 * experimental.css); static otherwise and under prefers-reduced-motion.
 */
export function WaveformIcon({ className = "" }: { className?: string }) {
  const gid = useId();
  // x offset + resting height within a 26 × 24 viewBox, vertically centred.
  const bars = [
    { x: 2.5, h: 7 },
    { x: 7.4, h: 15 },
    { x: 12.3, h: 22 },
    { x: 17.2, h: 12 },
    { x: 22.1, h: 8.5 },
  ];
  const cy = 12;

  return (
    <svg viewBox="0 0 26 24" className={className} fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7db6ff" />
          <stop offset="1" stopColor="#1b3aa0" />
        </linearGradient>
      </defs>
      {bars.map((b, i) => (
        <rect
          key={i}
          className="exp-wave-bar"
          x={b.x}
          y={cy - b.h / 2}
          width="2.4"
          height={b.h}
          rx="1.2"
          fill={`url(#${gid})`}
        />
      ))}
    </svg>
  );
}
