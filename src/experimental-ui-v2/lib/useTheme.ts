import { useState } from "react";

export type V2Theme = "light" | "dark";

/**
 * Local, page-scoped light/dark state for this experiment only — never reads
 * or writes any global theme preference, and never touches `prefers-color-scheme`
 * on the rest of the site. Light is always the initial value, per spec.
 */
export function useTheme() {
  const [theme, setTheme] = useState<V2Theme>("light");
  const toggle = () => setTheme((t) => (t === "light" ? "dark" : "light"));
  return { theme, toggle };
}
