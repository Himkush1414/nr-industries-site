import { Moon, Sun } from "lucide";
import { MorphIcon } from "morphicons/react";

export type V5Theme = "light" | "dark";

/**
 * The real site's nav has no light/dark toggle (confirmed — checked
 * src/components/Header.tsx), so this is a new addition grafted onto the
 * copied real nav, per spec, alongside its existing links rather than
 * replacing any of them.
 */
export function ThemeToggle({ theme, onToggle }: { theme: V5Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="v5-theme-toggle"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      <MorphIcon icon={theme === "light" ? Moon : Sun} size={16} reducedMotion="user" />
    </button>
  );
}
