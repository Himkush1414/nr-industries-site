import { FaqAccordion } from "@/experimental-ui-v3/components/FaqAccordion";
import { FooterCta } from "@/experimental-ui-v3/components/FooterCta";
import { Hero } from "@/experimental-ui-v3/components/Hero";
import { LenisProvider } from "@/experimental-ui-v3/components/LenisProvider";
import { NavBar } from "@/experimental-ui-v3/components/NavBar";
import { PartnerStrip } from "@/experimental-ui-v3/components/PartnerStrip";
import { ProcessSection } from "@/experimental-ui-v3/components/ProcessSection";
import { ShowcaseCards } from "@/experimental-ui-v3/components/ShowcaseCards";
import { ShowcaseGallery } from "@/experimental-ui-v3/components/ShowcaseGallery";
import { StatementReveal } from "@/experimental-ui-v3/components/StatementReveal";
import { StatsBars } from "@/experimental-ui-v3/components/StatsBars";
import { TestimonialsCarousel } from "@/experimental-ui-v3/components/TestimonialsCarousel";
import "@/experimental-ui-v3/styles/experimental-v3.css";

/**
 * Lab V3 — a second, separate isolated visual experiment, additive next to
 * Lab V2 (src/experimental-ui-v2/). Mirrors Lab V2's exact pattern: its own
 * folder, its own /lab/v3 route (not linked in the live nav), rendered
 * outside <Layout>. Does not touch Lab V2's files, the live Home page, or
 * any other page. New stack for this route only: GSAP + ScrollTrigger,
 * Lenis, React Three Fiber + drei + postprocessing, morphicons + lucide —
 * none of which exist anywhere else in the project.
 */
export function ExperimentalV3HomePage() {
  return (
    <LenisProvider>
      <div className="v3-root v3-page-bg min-h-screen">
        <NavBar />
        <Hero />
        <StatementReveal />
        <ShowcaseGallery />
        <PartnerStrip />
        <ProcessSection />
        <ShowcaseCards />
        <StatsBars />
        <TestimonialsCarousel />
        <FaqAccordion />
        <FooterCta />
      </div>
    </LenisProvider>
  );
}
