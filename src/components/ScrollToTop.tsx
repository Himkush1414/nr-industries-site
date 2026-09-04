import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // "instant" isn't in TS's ScrollBehavior union (only "auto"/"smooth"), but
    // browsers support it and it's what avoids an animated scroll on every
    // route change — hence the cast rather than switching to "auto".
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);

  return null;
}
