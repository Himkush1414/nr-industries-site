import { AboutSection } from "@/experimental-ui-v5/components/AboutSection";
import { Hero } from "@/experimental-ui-v5/components/Hero";
import { IndustriesShowcaseSection } from "@/experimental-ui-v5/components/IndustriesShowcaseSection";
import { ProductsSection } from "@/experimental-ui-v5/components/ProductsSection";
import { StatsStrip } from "@/experimental-ui-v5/components/StatsSection";
import { TestedCertifiedSection } from "@/experimental-ui-v5/components/TestedCertifiedSection";
import { TrustedSection } from "@/experimental-ui-v5/components/TrustedSection";
import "@/experimental-ui-v5/styles/experimental-v5.css";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useHomeTheme } from "@/hooks/useHomeTheme";

/**
 * PRODUCTION ROUTING CHANGE: this is now Lab V5's homepage content, promoted
 * to the real production homepage route (see the task of that name). The
 * former content living here is preserved unaltered at src/experimental-ui-v1
 * (/lab/v1). Lab V5 itself (src/experimental-ui-v5/, /lab/v5) is untouched —
 * every component imported below is used exactly as V5 defines it.
 *
 * Differs from V5's own /lab/v5 page assembly
 * (src/experimental-ui-v5/pages/ExperimentalV5HomePage.tsx) in three ways,
 * all because this page is wrapped in the real <Layout>
 * (src/components/Layout.tsx) rather than being a standalone lab page:
 *   1. No <NavBar/>. V5's own NavBar is a clone of the real Header that
 *      diverged to add a light/dark toggle (confirmed — see NavBar.tsx's own
 *      comments). Layout already renders the one real, shared <Header/> for
 *      every production page, so using V5's cloned nav here would duplicate
 *      shared layout AND leave two different nav implementations live at
 *      once. This page relies entirely on Layout's Header instead.
 *   2. No <ClosingStatementSection/>. Fix (Task 1, follow-up task): this
 *      used to render directly above the real <Footer/>, producing two
 *      near-identical "company info / quick links / products / get in
 *      touch / copyright" blocks stacked back to back. It's removed here
 *      entirely; its one genuinely distinct visual element (the giant
 *      low-opacity background wordmark) now lives in Footer.tsx's own
 *      variant="light" treatment instead (see Footer.tsx and Layout.tsx),
 *      which only applies on this route.
 *   3. Hero's theme prop and this wrapper's data-theme now come from
 *      useHomeTheme() (Task 3: site-wide toggle button, homepage-only
 *      effect) instead of a hardcoded "light" — Header.tsx renders the
 *      toggle on every page via the same shared context, but only ever
 *      calls toggleTheme() when the current route is "/", so this is the
 *      only place that reads the resulting theme value.
 * useDocumentMeta below is unchanged from what this route always called —
 * same PAGE_META.home data, so title/description/canonical/OG/Twitter tags
 * all carry over exactly as they were (canonical + OG url are derived from
 * the current pathname, which is still "/").
 */
export function HomePage() {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);
  const { theme } = useHomeTheme();

  return (
    <div className="v5-root" data-theme={theme}>
      <Hero theme={theme} />
      <TestedCertifiedSection />
      <StatsStrip />
      <ProductsSection />
      <AboutSection />
      <TrustedSection />
      <IndustriesShowcaseSection />
    </div>
  );
}
