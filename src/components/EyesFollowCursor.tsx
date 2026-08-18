import { useEffect, useRef, useState } from "react";

interface Character {
  id: string;
  color: string;
  path: string;
  width: number;
  height: number;
  eyes: { cx: number; cy: number }[];
  eyeRadius: number;
}

const CHARACTERS: Character[] = [
  {
    id: "navy-tall",
    color: "var(--color-navy-800)",
    // Sharp rectangle
    path: "M15 10 L95 10 L95 140 L15 140 Z",
    width: 110,
    height: 150,
    eyes: [
      { cx: 42, cy: 45 },
      { cx: 68, cy: 45 },
    ],
    eyeRadius: 5,
  },
  {
    id: "gold-round",
    color: "var(--color-gold-500)",
    // Semicircle: flat bottom, round top
    path: "M15 130 L15 65 A50 50 0 0 1 115 65 L115 130 Z",
    width: 130,
    height: 140,
    eyes: [
      { cx: 55, cy: 65 },
      { cx: 85, cy: 65 },
    ],
    eyeRadius: 6,
  },
  {
    id: "navy-dome",
    color: "var(--color-navy-600)",
    // Fat rectangle, medium size, sharp corners
    path: "M5 25 L115 25 L115 120 L5 120 Z",
    width: 120,
    height: 130,
    eyes: [
      { cx: 42, cy: 58 },
      { cx: 78, cy: 58 },
    ],
    eyeRadius: 5,
  },
  {
    id: "gold-short",
    color: "var(--color-gold-600)",
    // Sharp triangle
    path: "M52 15 L100 110 L5 110 Z",
    width: 105,
    height: 120,
    eyes: [
      { cx: 40, cy: 78 },
      { cx: 65, cy: 78 },
    ],
    eyeRadius: 4,
  },
];

/** Simple flat blob characters whose eyes track the mouse. Idle sway plays when the
 * cursor is far away; pupils re-center smoothly on movement. No external libraries. */
export function EyesFollowCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pupilOffsets, setPupilOffsets] = useState<Record<string, { x: number; y: number }[]>>(
    {},
  );

  useEffect(() => {
    function handleMouseMove(e: MouseEvent) {
      const container = containerRef.current;
      if (!container) return;

      const characterEls = container.querySelectorAll<SVGSVGElement>("[data-character]");
      const nextOffsets: Record<string, { x: number; y: number }[]> = {};

      characterEls.forEach((el) => {
        const id = el.dataset.character;
        if (!id) return;
        const character = CHARACTERS.find((c) => c.id === id);
        if (!character) return;

        const rect = el.getBoundingClientRect();
        const scaleX = rect.width / character.width;
        const scaleY = rect.height / character.height;

        nextOffsets[id] = character.eyes.map((eye) => {
          const eyeScreenX = rect.left + eye.cx * scaleX;
          const eyeScreenY = rect.top + eye.cy * scaleY;
          const dx = e.clientX - eyeScreenX;
          const dy = e.clientY - eyeScreenY;
          const distance = Math.hypot(dx, dy) || 1;
          const clampedDistance = Math.min(distance, character.eyeRadius * 8);
          const angle = Math.atan2(dy, dx);
          const pull = (clampedDistance / (character.eyeRadius * 8)) * character.eyeRadius;
          return { x: Math.cos(angle) * pull, y: Math.sin(angle) * pull };
        });
      });

      setPupilOffsets(nextOffsets);
    }

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="flex h-full min-h-[220px] items-end justify-center gap-2 px-4 pb-4"
    >
      {CHARACTERS.map((character, i) => (
        <svg
          key={character.id}
          data-character={character.id}
          viewBox={`0 0 ${character.width} ${character.height}`}
          className="animate-character-sway"
          style={{
            width: `${100 / CHARACTERS.length}%`,
            maxWidth: 90,
            animationDelay: `${i * 0.3}s`,
          }}
        >
          <path d={character.path} fill={character.color} />
          {character.eyes.map((eye, eyeIndex) => {
            const offset = pupilOffsets[character.id]?.[eyeIndex] ?? { x: 0, y: 0 };
            return (
              <g key={eyeIndex}>
                <circle cx={eye.cx} cy={eye.cy} r={character.eyeRadius + 3} fill="white" />
                <circle
                  cx={eye.cx + offset.x}
                  cy={eye.cy + offset.y}
                  r={character.eyeRadius}
                  fill="var(--color-ink-900)"
                />
              </g>
            );
          })}
        </svg>
      ))}
    </div>
  );
}