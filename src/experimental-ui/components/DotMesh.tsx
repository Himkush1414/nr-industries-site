import type { CSSProperties } from "react";
import { useMemo } from "react";

/**
 * Abstract tech-texture: a dot field whose size and opacity ripple along a sine
 * wave, rendered in the accent color. Two identical tiles scroll seamlessly for a
 * slow living drift (CSS only). prefers-reduced-motion freezes it via the global
 * reduced-motion rule on the animation.
 */
export function DotMesh({ className = "" }: { className?: string }) {
  const { tile, cols, rows, gap } = useMemo(() => {
    const c = 16;
    const r = 11;
    const g = 26;
    const dots: { x: number; y: number; radius: number; opacity: number }[] = [];
    for (let iy = 0; iy < r; iy++) {
      for (let ix = 0; ix < c; ix++) {
        const wave = 0.5 + 0.5 * Math.sin(ix * 0.55 + iy * 0.35);
        dots.push({
          x: ix * g + g / 2,
          y: iy * g + g / 2,
          radius: 1.1 + wave * 3.4,
          opacity: 0.12 + wave * 0.5,
        });
      }
    }
    return { tile: dots, cols: c, rows: r, gap: g };
  }, []);

  const tileW = cols * gap;
  const tileH = rows * gap;

  return (
    <svg
      className={className}
      viewBox={`0 0 ${tileW} ${tileH}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <g className="exp-dotmesh-scroll" style={{ "--tile-w": `${tileW}px` } as CSSProperties}>
        {[0, 1].map((t) => (
          <g key={t} transform={`translate(${t * tileW} 0)`}>
            {tile.map((d, i) => (
              <circle
                key={`${t}-${i}`}
                cx={d.x}
                cy={d.y}
                r={d.radius}
                fill="var(--exp-accent)"
                opacity={d.opacity}
              />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
