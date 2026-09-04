import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * Task 3 (light/dark toggle, homepage only): shared theme state for the real
 * site. Provided once by Layout.tsx (so it wraps every real page — Header
 * and whichever page is routed via <Outlet/>), persisted to localStorage so
 * it survives a refresh. Header renders the toggle button on every page for
 * visual consistency, but only calls toggleTheme() when the current route is
 * "/" — see Header.tsx — so this state only ever visibly affects anything on
 * the homepage (src/pages/HomePage.tsx, the only consumer that reads `theme`
 * to render differently).
 */
export type HomeTheme = "light" | "dark";

const STORAGE_KEY = "nr-home-theme";

function readStoredTheme(): HomeTheme {
  if (typeof window === "undefined") return "light";
  return window.localStorage.getItem(STORAGE_KEY) === "dark" ? "dark" : "light";
}

interface HomeThemeContextValue {
  theme: HomeTheme;
  toggleTheme: () => void;
}

const HomeThemeContext = createContext<HomeThemeContextValue | null>(null);

export function HomeThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<HomeTheme>(readStoredTheme);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return <HomeThemeContext.Provider value={{ theme, toggleTheme }}>{children}</HomeThemeContext.Provider>;
}

export function useHomeTheme(): HomeThemeContextValue {
  const ctx = useContext(HomeThemeContext);
  if (!ctx) {
    throw new Error("useHomeTheme must be used within a HomeThemeProvider (see Layout.tsx)");
  }
  return ctx;
}
