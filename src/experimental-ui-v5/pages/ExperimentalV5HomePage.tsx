import { useState } from "react";
import { AboutSection } from "@/experimental-ui-v5/components/AboutSection";
import { ClosingStatementSection } from "@/experimental-ui-v5/components/ClosingStatementSection";
import { Hero } from "@/experimental-ui-v5/components/Hero";
import { IndustriesShowcaseSection } from "@/experimental-ui-v5/components/IndustriesShowcaseSection";
import { NavBar } from "@/experimental-ui-v5/components/NavBar";
import { ProductsSection } from "@/experimental-ui-v5/components/ProductsSection";
import { StatsStrip } from "@/experimental-ui-v5/components/StatsSection";
import type { V5Theme } from "@/experimental-ui-v5/components/ThemeToggle";
import { TestedCertifiedSection } from "@/experimental-ui-v5/components/TestedCertifiedSection";
import { TrustedSection } from "@/experimental-ui-v5/components/TrustedSection";
import "@/experimental-ui-v5/styles/experimental-v5.css";

/**
 * Lab V5 — a remix of pieces read and copied from V2/V3/V4 and the real
 * production site, additive alongside all of them. Mirrors their exact
 * pattern: own folder, own /lab/v5 route, rendered outside <Layout>. Does
 * not touch V2, V3, V4, or the real site's files.
 *
 * Section order per spec:
 * Hero (V4 GhostFibers + V2 layout + V4 FoldText for the name) ->
 * Tested/Certified/Validated (V3 statement, FoldText heading) ->
 * Stats (V2's 4-stat block, verbatim) ->
 * Products (the real site's products section, verbatim) ->
 * About Us (V4 MagicBento, widened, images + certificates) ->
 * Trusted By (V2's dual-direction marquee, verbatim) ->
 * Featured Categories (V3's 3-panel structure, industries content) ->
 * Closing statement + contact (V3 statement reused as-is + real contact info).
 *
 * Theme toggle (fix, round 3, item 3): every section reads from the shared
 * token system in experimental-v5.css — the hero's GhostFibers lightMode,
 * the nav, and every V2/V3/V4-sourced section's own background/text tokens
 * all flip together off this one piece of state. See that file's header
 * comment for the token-by-token light/dark breakdown.
 */
export function ExperimentalV5HomePage() {
  const [theme, setTheme] = useState<V5Theme>("light");
  const toggleTheme = () => setTheme((t) => (t === "light" ? "dark" : "light"));

  return (
    <div className="v5-root min-h-screen" data-theme={theme}>
      <NavBar theme={theme} onToggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <TestedCertifiedSection />
      <StatsStrip />
      <ProductsSection />
      <AboutSection />
      <TrustedSection />
      <IndustriesShowcaseSection />
      <ClosingStatementSection />
    </div>
  );
}
