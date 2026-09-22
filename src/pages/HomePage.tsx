import { HeroAndAboutSection } from "@/components/home/HeroAndAboutSection";
import { IndustriesCertificationsSection } from "@/components/home/IndustriesCertificationsSection";
import { LenisProvider } from "@/components/home/LenisProvider";
import { ManifestoMarqueeSection } from "@/components/home/ManifestoMarqueeSection";
import { ProductsFaqSection } from "@/components/home/ProductsFaqSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useWireDecorativeButtons } from "@/hooks/useWireDecorativeButtons";

/**
 * Promoted from /lab/lv9 (src/lab-lv9/pages/Lv9Page.tsx): the same LV3-LV7
 * section stack (hero+about, why-choose-us, industries+certifications,
 * products/photo-grid/FAQ, manifesto+marquee), minus Lv9Nav and the footer
 * DOM-injection hook — the real site's Header and Footer (via Layout.tsx)
 * already cover both, so duplicating either here would render it twice.
 */
export function HomePage() {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);
  useWireDecorativeButtons();

  return (
    <LenisProvider>
      <HeroAndAboutSection />
      <WhyChooseUsSection />
      <IndustriesCertificationsSection />
      <ProductsFaqSection />
      <ManifestoMarqueeSection />
    </LenisProvider>
  );
}
