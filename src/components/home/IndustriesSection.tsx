import { DraggableMarquee } from "@/components/home/DraggableMarquee";

/**
 * /lab/lv16 — Industries panel, rebuilt from scratch (not resized from any
 * prior version): heading first with fluid breathing room below it, then the
 * 4-up industry photos riding a draggable, continuously auto-scrolling
 * conveyor-belt marquee (see DraggableMarquee) instead of a paged/arrowed
 * carousel, then the "Trusted across every industry" / "Decades of
 * hands-on expertise" stat strip spanning the full section width.
 */

const BG_GRADIENT =
  "linear-gradient(180deg, #0D1624 0%, #111C2B 20%, #182536 40%, #202D3D 60%, #2A3746 80%, #080D14 100%)";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const LINE_COLOR = "rgba(198, 192, 180, 0.16)";
const TEXT_CREAM = "#F2F4F7";
const DUSTY_CREAM_GRADIENT = "linear-gradient(160deg, rgb(214, 208, 195) 0%, rgb(178, 172, 159) 100%)";

const COMPANY_QUOTE =
  "Every industry that keeps moving trusts power that never stops — and everything we build is engineered to keep that promise.";

const INDUSTRIES: { name: string; description: string; image: string }[] = [
  { name: "Food Industry", description: "Reliable power for continuous processing and cold-chain operations.", image: "/industries/food-industry.webp" },
  { name: "Paper Industry", description: "Stable supply for high-load pulping and paper production lines.", image: "/industries/paper-industry.webp" },
  { name: "Plastic Industry", description: "Consistent voltage for extrusion and molding equipment.", image: "/industries/plastic-industry.webp" },
  { name: "Foundry", description: "Heavy-duty transformers built for furnace and casting loads.", image: "/industries/foundry.webp" },
  { name: "Solar Power Plants", description: "Inverter duty transformers matched to grid integration requirements.", image: "/industries/solar-power-plants.webp" },
  { name: "Power Plant", description: "Power transformers for generation and primary distribution circuits.", image: "/industries/power-plant.webp" },
  { name: "Water Treatment", description: "Dependable supply for pumping and treatment infrastructure.", image: "/industries/water-treatment.webp" },
  { name: "Refinery", description: "Robust equipment engineered for demanding industrial environments.", image: "/industries/refinery.webp" },
  { name: "Chemical Industry", description: "Durable transformers suited to continuous-process facilities.", image: "/industries/chemical-industry.webp" },
  { name: "Windmill Power Projects", description: "Transformers engineered for renewable generation applications.", image: "/industries/windmill-power-projects.webp" },
  { name: "Rice Industry", description: "Steady power for milling and processing operations.", image: "/industries/rice-industry.webp" },
  { name: "Textile Industry", description: "Consistent supply for spinning, weaving, and finishing lines.", image: "/industries/textile-industry.webp" },
  { name: "Cement Industry", description: "Heavy industrial-grade transformers for continuous plant operation.", image: "/industries/cement-industry.webp" },
  { name: "Pharma Industry", description: "Reliable, standards-compliant power for regulated manufacturing.", image: "/industries/pharma-industry.webp" },
  { name: "Hydro Projects", description: "Equipment suited to generation and distribution in hydro installations.", image: "/industries/hydro-projects.webp" },
];

function IndustryCard({ industry }: { industry: (typeof INDUSTRIES)[number] }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-md border"
      style={{ borderColor: LINE_COLOR, width: "clamp(220px, 22vw, 320px)" }}
    >
      <img
        src={industry.image}
        alt={industry.name}
        loading="lazy"
        draggable={false}
        style={{ width: "100%", height: "clamp(130px, 14vw, 200px)", objectFit: "cover" }}
      />
      {/* Divider line beneath the image, above the caption — same
          underline/divider treatment as before. */}
      <div style={{ borderTop: `1px solid ${LINE_COLOR}` }} />
      <div className="flex flex-col" style={{ gap: "6px", padding: "clamp(10px, 1.4vw, 16px)" }}>
        <span className="font-heading" style={{ fontSize: "clamp(13px, 1.3vw, 15px)", fontWeight: 600, color: TEXT_CREAM }}>{industry.name}</span>
        <span style={{ fontSize: "clamp(11px, 1.05vw, 12.5px)", lineHeight: 1.4, color: TEXT_CREAM, opacity: 0.88 }}>{industry.description}</span>
      </div>
    </div>
  );
}

function ImageStatCard({
  imageSrc,
  imageAlt,
  boldLine,
  statValue,
  statLabel,
}: {
  imageSrc: string;
  imageAlt: string;
  boldLine: string;
  statValue: string;
  statLabel: string;
}) {
  return (
    <div
      className="flex flex-1 items-center"
      style={{ gap: "clamp(12px, 1.6vw, 20px)", overflow: "hidden", borderRadius: "6px", border: `1px solid ${LINE_COLOR}`, backgroundColor: "rgba(255,255,255,0.03)" }}
    >
      <img
        src={imageSrc}
        alt={imageAlt}
        loading="lazy"
        style={{ height: "clamp(80px, 9vw, 130px)", width: "clamp(80px, 9vw, 130px)", flexShrink: 0, objectFit: "cover" }}
      />
      <div className="flex flex-1 items-center justify-between" style={{ gap: "12px", padding: "10px clamp(12px, 2vw, 24px) 10px 0" }}>
        <p className="font-heading" style={{ fontSize: "clamp(14px, 1.5vw, 18px)", fontWeight: 600, lineHeight: 1.25, color: TEXT_CREAM, margin: 0 }}>{boldLine}</p>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <span className="font-heading" style={{ display: "block", fontSize: "clamp(22px, 2.6vw, 32px)", fontWeight: 700, color: TEXT_CREAM }}>{statValue}</span>
          <span style={{ fontSize: "clamp(10px, 1.1vw, 12.5px)", color: TEXT_CREAM, opacity: 0.88 }}>{statLabel}</span>
        </div>
      </div>
    </div>
  );
}

export function IndustriesSection() {
  return (
    <section data-nav-theme="dark" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ backgroundImage: `${GRAIN_URL}, ${BG_GRADIENT}`, backgroundBlendMode: "overlay, normal", backgroundSize: "140px 140px, cover" }}
      />
      <div className="relative flex w-full flex-col" style={{ gap: "clamp(28px, 4vh, 56px)", padding: "clamp(32px, 6vh, 80px) clamp(20px, 5vw, 96px)" }}>
        {/* Heading, with fluid space below it before the images start. */}
        <div className="flex flex-col" style={{ gap: "clamp(10px, 1.4vw, 16px)" }}>
          <div className="flex items-center" style={{ gap: "10px" }}>
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "clamp(18px, 2vw, 24px)",
                width: "clamp(18px, 2vw, 24px)",
                flexShrink: 0,
                backgroundImage: DUSTY_CREAM_GRADIENT,
                WebkitMaskImage: "url(/company-logo-black-2-cropped.png)",
                maskImage: "url(/company-logo-black-2-cropped.png)",
                WebkitMaskSize: "contain",
                maskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
            <span className="font-heading" style={{ fontSize: "clamp(13px, 1.4vw, 16px)", fontWeight: 700, color: TEXT_CREAM }}>NR Industries</span>
          </div>
          <p className="font-heading" style={{ fontSize: "clamp(20px, 3.2vw, 36px)", fontWeight: 600, lineHeight: 1.3, color: TEXT_CREAM, maxWidth: "60ch" }}>
            {COMPANY_QUOTE}
          </p>
        </div>

        {/* 4-up (at typical desktop width) draggable, auto-scrolling
            conveyor of industry photos — no arrows, drag to nudge. */}
        <DraggableMarquee
          items={INDUSTRIES}
          ariaLabel="Industries we serve"
          speed={36}
          gap={20}
          renderItem={(industry) => <IndustryCard key={industry.name} industry={industry} />}
        />

        {/* "Trusted across every industry" / "Decades of hands-on expertise"
            — full width, no side margin, slightly larger images than before. */}
        <div className="flex w-full flex-col gap-4 border-t sm:flex-row" style={{ borderColor: LINE_COLOR, paddingTop: "clamp(16px, 2.4vw, 28px)" }}>
          <ImageStatCard
            imageSrc="/about-infrastructure.jpeg"
            imageAlt="Manufacturing infrastructure and testing facility"
            boldLine="Trusted across every industry."
            statValue="500+"
            statLabel="Industries Trusting Us"
          />
          <ImageStatCard
            imageSrc="/why-choose-us/after-sales-support-new.jpeg"
            imageAlt="Engineers at work"
            boldLine="Decades of hands-on expertise."
            statValue="15+"
            statLabel="Years of Experience"
          />
        </div>
      </div>
    </section>
  );
}
