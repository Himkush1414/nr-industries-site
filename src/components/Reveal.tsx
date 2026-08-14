import type { ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

interface RevealProps {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}

/** Fades a section up into place the first time it scrolls into view. */
export function Reveal({ children, delayMs = 0, className = "" }: RevealProps) {
  const { ref, isInView } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={`${isInView ? "animate-fade-up" : "opacity-0"} ${className}`}
      style={isInView ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
