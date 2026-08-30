import type { ReactNode } from "react";

/** Small monospace label with an accent dot — e.g. "REQ. 01". */
export function PlateTag({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <span className={`exp-kicker inline-flex items-center gap-1.5 ${className}`}>
      <span className="exp-fill-accent h-1 w-1 rounded-full" aria-hidden="true" />
      {children}
    </span>
  );
}
