import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { CertificationMarquee } from "@/components/CertificationMarquee";
import { ProductMarquee } from "@/components/ProductMarquee";
import { AmbientFlowBackground } from "@/components/AmbientFlowBackground";
import { CertificationStrip } from "@/components/CertificationStrip";
import { ClientMarquee } from "@/components/ClientMarquee";
import { FeatureRow } from "@/components/FeatureRow";
// Fix (round: About Us carousel swap): swapped out for <HomeAboutCarousel/>
// below — commented out, not deleted, so it's trivially recoverable.
// import { HomeAboutSection } from "@/components/HomeAboutSection";
import { HomeAboutCarousel } from "@/components/HomeAboutCarousel";
import { HomeStatsSection } from "@/components/HomeStatsSection";
import { IndustryIconChip } from "@/components/IndustryCard";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { SectionHeading } from "@/components/SectionHeading";
import { industries, whyChooseUs } from "@/data/company";
import { products } from "@/data/products";
import { PAGE_META } from "@/data/seo";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

/**
 * Fix (round: homepage body revert): restores the pre-V5 production body
 * content, reverting the "PRODUCTION ROUTING CHANGE" promotion of Lab V5's
 * sections here. Source: src/experimental-ui-v1/pages/ExperimentalV1HomePage.tsx
 * (the archived snapshot of this exact file, taken verbatim at promotion
 * time) — content below is copied from there unaltered, minus the Header/
 * Footer wrapper that file adds for itself (this page still relies on the
 * real, current <Layout> for those, unchanged by this revert).
 *
 * What's intentionally NOT reverted, per this task's scope: the current
 * <Header/> (including its transparent-PNG logo fix, but with the light/
 * dark toggle button now removed — see Header.tsx) and the current <Footer/>
 * (white background + watermark, unchanged) — both are Layout.tsx concerns,
 * outside this file, and were left exactly as they are.
 *
 * The light/dark theme context (src/hooks/useHomeTheme.tsx) this page used
 * to read is deleted, not just unused here — checked first that nothing
 * else depended on it (Footer.tsx never did; Header.tsx's toggle was its
 * only other consumer and is also being removed by this same task), so it's
 * genuinely dead now rather than orphaned.
 *
 * Fix (round: hero animation + stats restyle):
 *
 * Task 1 — hero text entrance animation, matching V4's approach (read
 * directly from src/experimental-ui-v4/components/Hero.tsx +
 * GsapReveal.tsx). V4 fades+slides each hero text group up on mount
 * (opacity 0->1, y +28px->0, duration 0.9s, ease "power3.out"), staggered
 * across two groups via a 0.4s delay on the second one. This hero has three
 * text groups instead of V4's two (eyebrow, headline, then tagline+
 * paragraph+CTAs bundled together — mirroring how V4 itself bundles its
 * subheadline+CTAs into one fade unit), so the same 0.4s step V4 uses
 * between its two groups is reused as the stagger interval across three:
 * delays of 0, 0.4, 0.8 — not a new interval invented for this page.
 * Duration (0.9) and ease ("power3.out") are copied verbatim. Not
 * reproduced: V4's headline additionally uses a self-contained per-character
 * 3D fold/flip component (FoldText.tsx, ~320 lines) layered on top of that
 * same fade+slide — duplicating that whole component into production for
 * one page felt like it exceeded "apply the same style of entrance
 * animation," so this headline gets the fade+slide treatment (the part of
 * V4's animation shared by every one of its hero text elements) without the
 * additional fold flourish that's otherwise unique to V4's own headline.
 *
 * Task 2 — the stat block below the hero is now <HomeStatsSection/> (see
 * that file for the V2-restyle details) instead of the old <StatStrip/>,
 * moved out of the hero section into its own standalone section below it —
 * V2's actual page assembly renders its equivalent block as a separate
 * section after the hero, not overlaid on it, so this mirrors that.
 * <StatStrip/> itself (src/components/StatStrip.tsx) is untouched — it's
 * still used by the archived /lab/v1 snapshot.
 */
export function HomePage() {
  useDocumentMeta(PAGE_META.home.title, PAGE_META.home.description);

  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const heroRestRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const targets = [eyebrowRef.current, headlineRef.current, heroRestRef.current].filter(
      (el): el is HTMLElement => el !== null,
    );
    if (!targets.length) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    gsap.set(targets, { opacity: 0, y: 28 });
    const delays = [0, 0.4, 0.8];
    targets.forEach((el, i) => {
      gsap.to(el, { opacity: 1, y: 0, duration: 0.9, delay: delays[i], ease: "power3.out" });
    });
  }, []);

  return (
    <>
      {/* Hero */}
      <section className="relative flex min-h-[60vh] flex-col justify-center overflow-hidden bg-navy-950 sm:min-h-[72vh] lg:min-h-[calc(92vh-70px)]">
        <img
          src="/hero-home.webp"
          alt=""
          className="absolute inset-0 h-full w-full object-cover object-center"
          decoding="async"
          fetchPriority="high"
        />
        <div
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90"
          aria-hidden="true"
        />
        <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />

        <div className="container-page relative flex max-w-3xl flex-col gap-6 py-16 sm:py-20 lg:py-24">
          <span
            ref={eyebrowRef}
            className="flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-gold-400 uppercase"
          >
            <span className="h-px w-8 bg-gold-400" aria-hidden="true" />
            Power &amp; Distribution Equipment Manufacturer
          </span>
          <h1 ref={headlineRef} className="font-heading text-5xl font-bold tracking-tight text-white">
            <span className="uppercase">N R</span>{" "}
            <span className="text-gold-400 uppercase">Industries</span>
          </h1>
          <div ref={heroRestRef} className="flex flex-col gap-6">
            <p className="font-heading text-xl font-semibold text-gold-400">
              Power at Best
            </p>
            <p className="max-w-2xl text-base leading-relaxed text-navy-100/85">
              Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
              Voltage Stabilizers, and HT &amp; LT Panels — engineered for industrial, commercial,
              and utility-scale power distribution.
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <Link
                to="/products"
                className="inline-flex items-center gap-2 rounded bg-gold-500 px-7 py-4 text-sm font-semibold tracking-wide text-navy-950 shadow-lg shadow-gold-900/20 transition-all duration-150 hover:-translate-y-0.5 hover:bg-gold-400 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                View Our Products
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-white/90 transition-colors duration-150 hover:text-gold-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Contact Us
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <HomeStatsSection />

      <CertificationMarquee />
      <ProductMarquee />

      {/* About teaser — see the commented-out <HomeAboutSection/> import above
          for the previous version; swapped for a V2-style card carousel. */}
      {/* <HomeAboutSection /> */}
      <HomeAboutCarousel />

      {/* Products */}
      <section className="bg-navy-50 py-16 sm:py-20">
        {/* Intro band only — ambient flow background stops here, not behind
            the product cards below. */}
        <div className="relative mb-10 overflow-hidden bg-navy-900 py-16 sm:mb-14 sm:py-20">
          <AmbientFlowBackground />
          <div className="container-page relative z-10">
            <Reveal>
              <SectionHeading
                eyebrow="Our Products"
                title="A complete range of power equipment"
                subtitle="From power plants to precision electronics, engineered products for every stage of the distribution network."
                align="center"
                light
              />
            </Reveal>
          </div>
        </div>
        <div className="container-page">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product, i) => (
              <Reveal key={product.slug} delayMs={i * 40} className="h-full">
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us — alternating feature rows */}
      <section id="why-choose-us" className="py-16 sm:py-20">
        {/* Intro band only — ambient flow background stops here, not behind
            the rows below (each row has its own separate scroll-linked wipe). */}
        <div className="relative mb-10 overflow-hidden bg-navy-900 py-16 sm:mb-14 sm:py-20">
          <AmbientFlowBackground />
          <div className="container-page relative z-10">
            <Reveal>
              <SectionHeading
                eyebrow="Why Choose Us"
                title="Engineered for performance and longevity"
                align="center"
                subtitle="Every transformer is engineered to the load, voltage, and environmental demands of its site — validated through in-house testing, not a generic spec sheet. It's the standard trusted by power plants, refineries, and utility networks across India, backed by our team long after installation."
                light
              />
            </Reveal>
          </div>
        </div>
        <div className="container-page flex flex-col gap-14 sm:gap-16">
          {whyChooseUs.map((item, i) => (
            <FeatureRow
              key={item.title}
              title={item.title}
              description={item.description}
              imageLabel={item.title}
              imageSrc={item.imageSrc}
              reverse={i % 2 === 1}
              staggerIndex={i}
            />
          ))}
        </div>
      </section>

      {/* Certifications */}
      <section className="relative mb-6 overflow-hidden bg-navy-900 py-16 sm:mb-8 sm:py-20">
        <AmbientFlowBackground />
        <div className="container-page relative z-10 flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Certifications" title="Built to recognized standards" align="center" light />
          </Reveal>
          <Reveal>
            <CertificationStrip light />
          </Reveal>
        </div>
      </section>

      {/* Clients */}
      <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
        <AmbientFlowBackground />
        <div className="container-page relative z-10 flex flex-col gap-10">
          <Reveal>
            <SectionHeading
              eyebrow="Trusted By"
              title="Clients across industries"
              subtitle="From energy majors to national utilities, our equipment runs behind the scenes for organizations across sectors."
              align="center"
              light
            />
          </Reveal>
          <Reveal>
            <ClientMarquee />
          </Reveal>
        </div>
      </section>

      {/* Industries */}
      <section className="relative overflow-hidden bg-navy-50 py-16 sm:py-20">
        <div className="container-page relative flex flex-col gap-8">
          <Reveal>
            <SectionHeading eyebrow="Industries We Serve" title="Powering every sector" align="center" />
          </Reveal>
          <Reveal>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
              {industries.map((industry, i) => (
                <IndustryIconChip key={industry.name} industry={industry} index={i} />
              ))}
            </div>
          </Reveal>
          <Reveal className="flex justify-center">
            <Link
              to="/industries"
              className="inline-flex items-center gap-2 text-sm font-semibold text-navy-800 hover:text-gold-600"
            >
              View All Industries
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
