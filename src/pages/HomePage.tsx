import { HeroAndAboutSection } from "@/components/home/HeroAndAboutSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { LenisProvider } from "@/components/home/LenisProvider";
import { ManifestoMarqueeSection } from "@/components/home/ManifestoMarqueeSection";
import { ProductsFaqSection } from "@/components/home/ProductsFaqSection";
import { WhyChooseUsSection } from "@/components/home/WhyChooseUsSection";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { useWireDecorativeButtons } from "@/hooks/useWireDecorativeButtons";

/**
 * Promoted from /lab/lv16: a full architectural rebuild of the previous
 * (/lab/lv9-derived) Home page — fluid clamp()-based sizing throughout,
 * draggable auto-scrolling "conveyor belt" marquees for the Industries
 * images, Products, and company logos, a blur-crossfade single-photo panel,
 * and a mobile-specific static product list. The real Header/Footer (via
 * Layout.tsx) already cover navigation and the footer, so this only
 * composes the body sections.
 */
export function HomePage() {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);
  useWireDecorativeButtons();

  return (
    <LenisProvider>
      <HeroAndAboutSection />
      <WhyChooseUsSection />
      <IndustriesSection />
      <ProductsFaqSection />
      <ManifestoMarqueeSection />
    </LenisProvider>
  );
}
