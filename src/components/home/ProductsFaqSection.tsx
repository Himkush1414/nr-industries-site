import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { clients } from "@/data/company";
import { products } from "@/data/products";
import { DraggableMarquee } from "@/components/home/DraggableMarquee";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/** Only used to switch the Products section between its desktop
 * auto-scrolling marquee and its mobile static stacked list — an actual
 * behavioral difference (an animated conveyor vs. no motion at all), which
 * CSS alone can't express, unlike every other fluid size in this file. */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return isMobile;
}

/**
 * /lab/lv16 — Products / photo-grid / statement+logos / FAQ panel, rebuilt
 * from scratch: Products and the company logos row both ride the same
 * draggable conveyor-belt marquee as Industries (see DraggableMarquee),
 * products are static cards (no per-column timed cycling), the photo grid
 * and FAQ are otherwise plain fluid layouts, and FAQ content/behavior is
 * kept exactly as previously implemented (only the surrounding page changed).
 */

const BG_GRADIENT = "linear-gradient(160deg, #F2F4F7 0%, #E8E4DC 100%)";
const PANEL_BG_COLOR = "#F2F4F7";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.1' numOctaves='5' stitchTiles='stitch' result='t'/%3E%3CfeColorMatrix in='t' type='saturate' values='0' result='g'/%3E%3CfeComponentTransfer in='g'%3E%3CfeFuncA type='linear' slope='2.6' intercept='-0.6'/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";
const LINE_COLOR = "rgba(120, 112, 98, 0.14)";
const MATTE_BLACK = "#222222";

const PRODUCTS_INTRO_TEXT =
  "A complete range of power and distribution equipment, engineered for power plants, industrial facilities, and utility-scale networks.";

const COMPANY_STATEMENT = "Power isn't just what we build. It's a promise we keep.";

const PHOTO_GRID = [
  { image: "/why-choose-us/precision-engineering.jpeg", caption: "Precision built into every product we ship." },
  { image: "/why-choose-us/international-standards.jpeg", caption: "Tested against internationally recognized standards." },
  { image: "/why-choose-us/after-sales-support-new.jpeg", caption: "Support that continues well after installation." },
  { image: "/why-choose-us/eco-friendly-manufacturing.jpeg", caption: "Manufacturing built around sustainability." },
];

const SECTION_E_STATEMENT = "Power & Distribution Equipment Manufacturer";

// Moved here from the Industries section (removed there) — a small, static,
// compact row rather than large cycling badges.
const CERTIFICATIONS = [
  { name: "ISO 9001:2015", image: "/certifications/iso-v5-transparent.png" },
  { name: "BIS Certification", image: "/certifications/bis.webp" },
  { name: "ERDA", image: "/certifications/erda-v5-transparent.png" },
  { name: "NABL", image: "/certifications/nabl.webp" },
  { name: "United Nations Global Marketplace", image: "/certifications/un.webp" },
  { name: "BEE (Energy is Life)", image: "/certifications/bee.webp" },
  { name: "CPRI Approved", image: "/certifications/cpri.webp" },
];

const FAQS = [
  {
    question: "How long does delivery typically take?",
    answer:
      "Timelines depend on the unit's rating and specification, but our logistics are organized around on-time delivery — confirmed for your exact order at the quotation stage.",
  },
  {
    question: "Can equipment be customized to our site's voltage and load requirements?",
    answer:
      "Yes. Every unit is engineered to the load, voltage class, and environmental demands of its site rather than built to a generic spec sheet.",
  },
  {
    question: "What certifications do your products carry?",
    answer:
      "Our operations are ISO 9001:2015 certified, with products tested and validated against BIS, ERDA, NABL, and CPRI standards.",
  },
  {
    question: "Do you offer support after installation?",
    answer:
      "Yes — our team stays engaged from consultation through commissioning and beyond, including Annual Maintenance Contracts (AMC).",
  },
  {
    question: "Do you repair existing transformers, or only supply new ones?",
    answer: "Both. We offer distribution and power transformer repair services, backed by warranty.",
  },
];

function PlusCrossIcon({ active, size = 14, color = MATTE_BLACK }: { active: boolean; size?: number; color?: string }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: "relative",
        width: `${size}px`,
        height: `${size}px`,
        flexShrink: 0,
        transform: active ? "rotate(45deg)" : "rotate(0deg)",
        transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <span style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "2px", backgroundColor: color, transform: "translateY(-50%)", transition: "background-color 0.25s ease" }} />
      <span style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "2px", backgroundColor: color, transform: "translateX(-50%)", transition: "background-color 0.25s ease" }} />
    </div>
  );
}

function FaqSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}

function FaqItem({
  faq,
  isOpen,
  isFirst,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  isFirst: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      onClick={onToggle}
      className="cursor-pointer"
      style={{ borderTop: isFirst ? "none" : `1px solid ${LINE_COLOR}`, paddingTop: isFirst ? 0 : "20px", paddingBottom: "20px" }}
    >
      <div className="flex items-start justify-between gap-4">
        <p className="font-heading" style={{ fontSize: "14px", fontWeight: 600, lineHeight: 1.4, color: MATTE_BLACK, flex: 1 }}>
          {faq.question}
        </p>
        <button
          type="button"
          aria-label={isOpen ? `Collapse answer: ${faq.question}` : `Expand answer: ${faq.question}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className="inline-flex shrink-0 items-center justify-center"
          style={{ width: "28px", height: "28px", border: `1px solid ${isOpen ? MATTE_BLACK : LINE_COLOR}`, backgroundColor: isOpen ? MATTE_BLACK : "transparent" }}
        >
          <PlusCrossIcon active={isOpen} color={isOpen ? PANEL_BG_COLOR : MATTE_BLACK} />
        </button>
      </div>
      <p
        style={{
          fontSize: "12.5px",
          lineHeight: 1.6,
          color: MATTE_BLACK,
          opacity: isOpen ? 0.72 : 0,
          marginTop: isOpen ? "10px" : "0px",
          maxHeight: isOpen ? "160px" : "0px",
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease, margin-top 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {faq.answer}
      </p>
    </div>
  );
}

// Desktop marquee card — a fixed (not content-driven) height, so every card
// is exactly the same size regardless of how long its name/description runs;
// the description is line-clamped to 2 lines for the same reason.
function ProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <div
      className="flex flex-col rounded-md border"
      style={{
        borderColor: LINE_COLOR,
        width: "clamp(200px, 17vw, 270px)",
        height: "clamp(320px, 27vw, 400px)",
        gap: "clamp(6px, 0.8vw, 10px)",
        padding: "clamp(14px, 1.6vw, 20px)",
      }}
    >
      <img
        src={product.mainImageSrc}
        alt={product.name}
        loading="lazy"
        draggable={false}
        style={{ height: "clamp(130px, 13.5vw, 185px)", width: "100%", objectFit: "contain", flexShrink: 0 }}
      />
      <span
        className="font-heading text-center"
        style={{ fontSize: "clamp(13px, 1.2vw, 15px)", fontWeight: 600, color: MATTE_BLACK, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}
      >
        {product.name}
      </span>
      <p
        className="text-center"
        style={{
          fontSize: "clamp(11px, 1vw, 12.5px)",
          lineHeight: 1.45,
          color: MATTE_BLACK,
          opacity: 0.85,
          flex: 1,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
        }}
      >
        {product.cardDescription}
      </p>
      <Link
        to={`/products/${product.slug}`}
        className="inline-flex w-full items-center justify-center"
        style={{
          gap: "6px",
          padding: "clamp(7px, 0.9vw, 10px) 0",
          borderRadius: "6px",
          backgroundColor: MATTE_BLACK,
          color: PANEL_BG_COLOR,
          fontSize: "clamp(11px, 1vw, 12.5px)",
          fontWeight: 600,
          flexShrink: 0,
        }}
      >
        View Product
        <ArrowRight style={{ width: "12px", height: "12px" }} aria-hidden="true" />
      </Link>
    </div>
  );
}

// Mobile stacked-list card — compact, well under half the screen height,
// image alongside the text rather than stacked full-width above it.
function MobileProductCard({ product }: { product: (typeof products)[number] }) {
  return (
    <div className="flex items-center gap-3 rounded-md border" style={{ borderColor: LINE_COLOR, padding: "12px" }}>
      <img
        src={product.mainImageSrc}
        alt={product.name}
        loading="lazy"
        style={{ height: "88px", width: "88px", flexShrink: 0, objectFit: "contain" }}
      />
      <div className="flex min-w-0 flex-1 flex-col" style={{ gap: "4px" }}>
        <span className="font-heading" style={{ fontSize: "13.5px", fontWeight: 600, color: MATTE_BLACK }}>{product.name}</span>
        {/* Real spec detail (from the same data the Products detail page
            uses) instead of a per-card button — only one "View Product"
            action exists for this whole list, above it. */}
        <span style={{ fontSize: "11px", fontWeight: 600, color: MATTE_BLACK, opacity: 0.75 }}>
          {product.rangeLabel}: {product.rangeValue}
        </span>
        <p
          style={{
            fontSize: "11.5px",
            lineHeight: 1.4,
            color: MATTE_BLACK,
            opacity: 0.85,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {product.cardDescription}
        </p>
      </div>
    </div>
  );
}

export function ProductsFaqSection() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  function toggleFaq(index: number) {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  }
  const isMobile = useIsMobile();

  return (
    <>
      <FaqSchema />
      <section data-nav-theme="light" className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{ backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "120px 120px, cover" }}
        />
        <div className="relative flex w-full flex-col" style={{ padding: "clamp(24px, 5vh, 64px) clamp(20px, 5vw, 96px)" }}>
          {/* SECTION A+B — Products: a slow, continuously auto-scrolling,
              draggable conveyor of static product cards (no per-card timed
              cycling). Content is sized to its own natural composition
              (heading row, then a tight secondary row for the intro text +
              CTA, then the marquee) rather than forced into a fixed viewport
              height — that's what was producing the large dead gaps. */}
          <div className="flex flex-col" style={{ gap: "clamp(16px, 2.2vw, 24px)", paddingBottom: "clamp(24px, 3.5vw, 40px)" }}>
            <div className="flex items-center gap-2.5">
              <div
                role="img"
                aria-label="Company logo"
                style={{
                  height: "clamp(20px, 2.2vw, 28px)",
                  width: "clamp(20px, 2.2vw, 28px)",
                  flexShrink: 0,
                  backgroundColor: MATTE_BLACK,
                  WebkitMaskImage: "url(/company-logo-black-2-cropped.png)",
                  maskImage: "url(/company-logo-black-2-cropped.png)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />
              <span className="font-heading" style={{ fontSize: "clamp(16px, 1.9vw, 22px)", fontWeight: 600, color: MATTE_BLACK }}>Products</span>
            </div>

            {/* Intro text + CTA share one tight row (rather than being
                spread across the full row width with the heading, which
                left awkward floating gaps between the three pieces). */}
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <p style={{ fontSize: "clamp(13px, 1.5vw, 16px)", lineHeight: 1.5, color: MATTE_BLACK, maxWidth: "56ch" }}>{PRODUCTS_INTRO_TEXT}</p>
              <button
                type="button"
                className="inline-flex w-fit shrink-0 items-center"
                style={{ gap: "8px", padding: "clamp(10px, 1.2vw, 14px) clamp(18px, 2.2vw, 26px)", borderRadius: "6px", backgroundColor: MATTE_BLACK, color: PANEL_BG_COLOR, fontSize: "clamp(12.5px, 1.3vw, 15px)", fontWeight: 600, border: "none" }}
              >
                View Products
                <ArrowRight style={{ width: "14px", height: "14px" }} aria-hidden="true" />
              </button>
            </div>

            {/* Mobile: no marquee/motion at all — a plain vertical stacked
                list, one compact card per product. Desktop: the slow,
                draggable, auto-scrolling conveyor (noticeably slower than
                the Industries/logos marquees). */}
            {isMobile ? (
              <div className="flex flex-col" style={{ gap: "12px" }}>
                {products.map((product) => (
                  <MobileProductCard key={product.slug} product={product} />
                ))}
              </div>
            ) : (
              <DraggableMarquee
                items={products}
                ariaLabel="Our products"
                speed={16}
                gap={20}
                renderItem={(product) => <ProductCard key={product.slug} product={product} />}
              />
            )}
          </div>

          {/* SECTION D — Photo grid: static photos, modestly sized, laid out
              with the same tight rhythm as Products above. */}
          <div className="grid grid-cols-2 gap-5 border-t sm:grid-cols-4" style={{ borderColor: LINE_COLOR, paddingTop: "clamp(24px, 3.5vw, 40px)", paddingBottom: "clamp(24px, 3.5vw, 40px)" }}>
            {PHOTO_GRID.map((photo) => (
              <div key={photo.image} className="flex flex-col" style={{ gap: "clamp(8px, 1vw, 12px)" }}>
                <div className="overflow-hidden rounded-sm" style={{ height: "clamp(130px, 13vw, 200px)" }}>
                  <img src={photo.image} alt="" loading="lazy" className="h-full w-full" style={{ objectFit: "cover" }} />
                </div>
                <span style={{ fontSize: "clamp(11.5px, 1.2vw, 14px)", lineHeight: 1.4, color: MATTE_BLACK }}>{photo.caption}</span>
              </div>
            ))}
          </div>

          {/* SECTION C+E — Company statement + logos marquee + certifications. */}
          <div
            className="flex flex-col items-center border-t text-center"
            style={{ borderColor: LINE_COLOR, paddingTop: "clamp(24px, 3.5vw, 40px)", paddingBottom: "clamp(24px, 3.5vw, 40px)", gap: "clamp(16px, 2.2vw, 24px)" }}
          >
            <div className="flex items-center gap-2.5">
              <div
                role="img"
                aria-label="Company logo"
                style={{
                  height: "clamp(18px, 2vw, 24px)",
                  width: "clamp(18px, 2vw, 24px)",
                  flexShrink: 0,
                  backgroundColor: MATTE_BLACK,
                  WebkitMaskImage: "url(/company-logo-black-2-cropped.png)",
                  maskImage: "url(/company-logo-black-2-cropped.png)",
                  WebkitMaskSize: "contain",
                  maskSize: "contain",
                  WebkitMaskRepeat: "no-repeat",
                  maskRepeat: "no-repeat",
                }}
              />
              <span className="font-heading" style={{ fontSize: "clamp(14px, 1.5vw, 17px)", fontWeight: 600, color: MATTE_BLACK }}>NR Industries</span>
            </div>
            <p className="font-heading" style={{ fontSize: "clamp(16px, 2vw, 21px)", fontWeight: 700, lineHeight: 1.3, color: MATTE_BLACK, maxWidth: "560px" }}>
              {COMPANY_STATEMENT}
            </p>
            <p className="font-heading" style={{ fontSize: "clamp(12px, 1.2vw, 13.5px)", fontWeight: 600, color: MATTE_BLACK, opacity: 0.82 }}>{SECTION_E_STATEMENT}</p>

            {/* Company logos — draggable, auto-scrolling conveyor, full
                section width, modestly larger than before. */}
            <div className="w-full">
              <DraggableMarquee
                items={clients}
                ariaLabel="Companies that trust us"
                speed={28}
                gap={48}
                renderItem={(client) => (
                  <img
                    key={client.name}
                    src={client.logoSrc}
                    alt={client.name}
                    loading="lazy"
                    draggable={false}
                    style={{ height: "clamp(44px, 5vw, 64px)", width: "auto", maxWidth: "140px", objectFit: "contain" }}
                  />
                )}
              />
            </div>

            <div className="flex w-full flex-col items-center border-t" style={{ borderColor: LINE_COLOR, paddingTop: "clamp(14px, 1.8vw, 20px)", gap: "clamp(10px, 1.2vw, 14px)" }}>
              <span style={{ fontSize: "10.5px", fontWeight: 600, letterSpacing: "0.08em", color: MATTE_BLACK, opacity: 0.65, textTransform: "uppercase" }}>
                Certifications
              </span>
              <div className="flex flex-wrap items-center justify-center" style={{ gap: "clamp(16px, 2.4vw, 28px)" }}>
                {CERTIFICATIONS.map((cert) => (
                  <img key={cert.name} src={cert.image} alt={cert.name} loading="lazy" style={{ height: "clamp(30px, 3.2vw, 42px)", width: "auto", maxWidth: "82px", objectFit: "contain" }} />
                ))}
              </div>
            </div>
          </div>

          {/* SECTION F — FAQ, kept exactly as previously implemented. */}
          <div className="border-t" style={{ borderColor: LINE_COLOR, paddingTop: "clamp(24px, 3.5vw, 40px)" }}>
            <h3 className="font-heading" style={{ fontSize: "18px", fontWeight: 700, lineHeight: 1.2, color: MATTE_BLACK, marginBottom: "4px" }}>
              Frequently Asked Questions
            </h3>
            <p style={{ fontSize: "12px", lineHeight: 1.5, color: MATTE_BLACK, opacity: 0.68, marginBottom: "16px" }}>
              Answers to what teams most often ask us before placing an order.
            </p>
            <div className="flex flex-col">
              {FAQS.map((faq, i) => (
                <FaqItem key={faq.question} faq={faq} isOpen={openFaqIndex === i} isFirst={i === 0} onToggle={() => toggleFaq(i)} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
