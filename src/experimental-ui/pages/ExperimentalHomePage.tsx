import { whyChooseUs } from "@/data/company";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { CertificationsSection } from "../components/CertificationsSection";
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
 * Homepage — split hero with an oversized oval photo → four highlight cards →
 * "Find your best suited product" curved panel → trust block → certifications
 * → "Industries we serve" carousel panel → company overview video panel.
 * Navigation is the site's shared <Header> (rendered by <Layout>, same as
 * every other page) — this page no longer renders its own nav.
 */
export function ExperimentalHomePage() {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);

  return (
    <div className="exp-root">
      <Hero />

      {/* Four-card highlight row — directly under the hero, above the hero video.
          `relative isolate` (same as HeroVideoSection, which used to sit in this
          spot): Hero is a positioned (`relative`) stacking context, so per the
          CSS painting-order rules a plain non-positioned sibling paints *before*
          it regardless of DOM order — letting Hero's own fixed background layer
          show through on top of this section instead of staying behind it. Once
          this section is itself positioned, DOM order (this section after Hero)
          decides paint order again, as intended. */}
      <section className="exp-sec-light relative isolate pt-16 pb-24 sm:pt-20 sm:pb-28">
        <div className="container-page">
          <HighlightRow items={whyChooseUs} />
        </div>
      </section>

      <HeroVideoSection />

      <ProductPanel />
      <ProductShowcase />
      <TrustBlock />
      <CertificationsSection />
      <IndustriesPanel />
      <VideoPanel />
    </div>
  );
}
