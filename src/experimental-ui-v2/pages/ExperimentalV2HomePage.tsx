import { CardCarousel } from "@/experimental-ui-v2/components/CardCarousel";
import { CertificationsSection } from "@/experimental-ui-v2/components/CertificationsSection";
import { ClosingCta } from "@/experimental-ui-v2/components/ClosingCta";
import { Footer } from "@/experimental-ui-v2/components/Footer";
import { Hero } from "@/experimental-ui-v2/components/Hero";
import { IndustriesSection } from "@/experimental-ui-v2/components/IndustriesSection";
import { NavBar } from "@/experimental-ui-v2/components/NavBar";
import { ProductRangeSection } from "@/experimental-ui-v2/components/ProductRangeSection";
import { SpecificationsSection } from "@/experimental-ui-v2/components/SpecificationsSection";
import { StatsStrip } from "@/experimental-ui-v2/components/StatsStrip";
import { TrustedSection } from "@/experimental-ui-v2/components/TrustedSection";
import { useTheme } from "@/experimental-ui-v2/lib/useTheme";
import "@/experimental-ui-v2/styles/experimental-v2.css";

/**
 * Isolated experiment #2 — a distinct dark-first template aesthetic, entirely
 * separate from both the live Home page and the still-pending HomeAboutSection
 * change. Only reachable at /lab/v2 (not linked anywhere in the live nav), so
 * it has zero effect on the live site until explicitly wired in.
 *
 * Section order (Trusted By moved up after the stats strip, per review round 2 —
 * an early credibility signal before the deeper product/industry/spec content,
 * rather than being buried right before the closing CTA):
 * Hero -> Stats -> Trusted By -> Differentiator carousel -> Product range ->
 * Industries -> Specifications -> Certifications -> Closing CTA -> Footer.
 */
export function ExperimentalV2HomePage() {
  const { theme, toggle } = useTheme();

  return (
    <div className="v2-root min-h-screen" data-theme={theme}>
      <NavBar theme={theme} onToggleTheme={toggle} />
      <Hero />
      <StatsStrip />
      <TrustedSection />
      <CardCarousel />
      <ProductRangeSection />
      <IndustriesSection />
      <SpecificationsSection />
      <CertificationsSection />
      <ClosingCta />
      <Footer />
    </div>
  );
}
