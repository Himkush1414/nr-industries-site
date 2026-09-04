import { AboutSection } from "@/experimental-ui-v4/components/AboutSection";
import { FaqSection } from "@/experimental-ui-v4/components/FaqSection";
import { FooterCta } from "@/experimental-ui-v4/components/FooterCta";
import { Hero } from "@/experimental-ui-v4/components/Hero";
import { LenisProvider } from "@/experimental-ui-v4/components/LenisProvider";
import { NavBar } from "@/experimental-ui-v4/components/NavBar";
import { PartnersSection } from "@/experimental-ui-v4/components/PartnersSection";
import { ProductsSection } from "@/experimental-ui-v4/components/ProductsSection";
import { StatsSection } from "@/experimental-ui-v4/components/StatsSection";
import "@/experimental-ui-v4/styles/experimental-v4.css";

/**
 * Lab V4 — a third, separate isolated visual experiment, additive alongside
 * Lab V2 (src/experimental-ui-v2/) and Lab V3 (src/experimental-ui-v3/).
 * Mirrors their exact pattern: its own folder, its own /lab/v4 route (not
 * linked in the live nav), rendered outside <Layout>. Does not touch V2 or
 * V3's files. Light/white base + blue accent, deliberately the opposite
 * direction from V3's near-black/indigo.
 */
export function ExperimentalV4HomePage() {
  return (
    <LenisProvider>
      <div className="v4-root min-h-screen">
        <NavBar />
        <Hero />
        <AboutSection />
        <ProductsSection />
        <PartnersSection />
        <StatsSection />
        <FaqSection />
        <FooterCta />
      </div>
    </LenisProvider>
  );
}
