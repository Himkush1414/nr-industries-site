import { Moon, Sun } from "lucide-react";
import type { V2Theme } from "@/experimental-ui-v2/lib/useTheme";

export function ThemeToggle({ theme, onToggle }: { theme: V2Theme; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="v2-theme-toggle"
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
    >
      {theme === "light" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
    </button>
  );
}
