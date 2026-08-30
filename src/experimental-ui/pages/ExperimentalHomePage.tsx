import { whyChooseUs } from "@/data/company";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { CertificationsSection } from "../components/CertificationsSection";
import { ExpNavBar } from "../components/ExpNavBar";
import { Hero } from "../components/Hero";
import { HeroVideoSection } from "../components/HeroVideoSection";
import { HighlightRow } from "../components/HighlightRow";
import { IndustriesPanel } from "../components/IndustriesPanel";
import { ProductPanel } from "../components/ProductPanel";
import { ProductShowcase } from "../components/ProductShowcase";
import { TrustBlock } from "../components/TrustBlock";
import { VideoPanel } from "../components/VideoPanel";
import "../styles/experimental.css";

/**
 * Experimental homepage — pass 5 (full replacement of the pass-4 "Schneider"
 * direction). In-flow sticky nav → split hero with an oversized oval photo →
 * four highlight cards → "Find your best suited product" curved panel → trust
 * block → certifications → "Industries we serve" carousel panel → company
 * overview video panel. The site's existing contact/footer block (below, from
 * Layout) is untouched. See ACTIVE_HOMEPAGE_UI.
 */
export function ExperimentalHomePage() {
  useDocumentMeta(
    "N R Industries",
    "N R Industries manufactures Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations and HT & LT Panels from Himachal Pradesh, India.",
  );

  return (
    <div className="exp-root">
      <ExpNavBar />
      <Hero />
      <HeroVideoSection />

      {/* Four-card highlight row — directly under the hero video */}
      <section className="exp-sec-light pt-16 pb-24 sm:pt-20 sm:pb-28">
        <div className="container-page">
          <HighlightRow items={whyChooseUs} />
        </div>
      </section>

      <ProductPanel />
      <ProductShowcase />
      <TrustBlock />
      <CertificationsSection />
      <IndustriesPanel />
      <VideoPanel />
    </div>
  );
}
