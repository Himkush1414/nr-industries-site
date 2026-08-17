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
    path: "M10 140 C10 60 30 10 55 10 C80 10 100 60 100 140 Z",
    width: 110,
    height: 150,
    eyes: [
      { cx: 45, cy: 55 },
      { cx: 65, cy: 55 },
    ],
    eyeRadius: 5,
  },
  {
    id: "gold-round",
    color: "var(--color-gold-500)",
    path: "M15 130 C15 70 40 30 70 30 C100 30 115 70 115 130 Z",
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
    path: "M5 120 C5 60 30 20 60 20 C90 20 115 60 115 120 Z",
    width: 120,
    height: 130,
    eyes: [
      { cx: 45, cy: 60 },
      { cx: 75, cy: 60 },
    ],
    eyeRadius: 5,
  },
  {
    id: "gold-short",
    color: "var(--color-gold-600)",
    path: "M10 110 C10 55 30 15 55 15 C80 15 100 55 100 110 Z",
    width: 105,
    height: 120,
    eyes: [
      { cx: 40, cy: 50 },
      { cx: 65, cy: 50 },
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