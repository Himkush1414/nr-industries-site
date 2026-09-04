import { ArrowRight, ArrowUpRight } from "lucide";
import { MorphIcon } from "morphicons/react";
import type { ReactNode } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

/** Button whose trailing arrow morphs (ArrowRight -> ArrowUpRight) on hover
 * via morphicons, instead of a static inline SVG. Reused for every button
 * arrow across this page. */
export function MorphArrowLink({
  to,
  variant = "solid",
  className = "",
  children,
}: {
  to: string;
  variant?: "solid" | "outline";
  className?: string;
  children: ReactNode;
}) {
  const [hover, setHover] = useState(false);

  return (
    <Link
      to={to}
      className={`v3-btn v3-btn-${variant} ${className}`.trim()}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocus={() => setHover(true)}
      onBlur={() => setHover(false)}
    >
      {children}
      <MorphIcon icon={hover ? ArrowUpRight : ArrowRight} size={16} reducedMotion="user" />
    </Link>
  );
}
