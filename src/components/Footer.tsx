import { useState } from "react";
import { Mail, MapPin, Phone } from "lucide-react";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE_DISPLAY,
  COMPANY_PHONE_DISPLAY_2,
  COMPANY_WEBSITE_DISPLAY,
} from "@/config/contact";
import { products } from "@/data/products";

// Single shared breakpoint — matches Header.tsx's own.
const MOBILE_BREAKPOINT = 767;

/**
 * Site-wide footer — promoted from /lab/lv9's footer section
 * (src/lab-lv9/lv7/pages/Lv7Page.tsx's "SECTION 3", left untouched as the
 * reference this was copied from): a dusty matte-black panel (flat fill,
 * not the manifesto canvas's gradient — see FOOTER_BG_COLOR's own comment
 * for why) with the same 4-column grid the rest of the site's dark panels
 * use, plus a "Design by Manik Rana" credit line under "Manufactured in
 * Himachal Pradesh, India." — written directly into both the desktop and
 * mobile bottom bars here rather than via lv9's DOM-injection hook
 * (useInjectFooterCredit.tsx), which existed only because lv9's LV7Page.tsx
 * itself couldn't be edited; this component can just include it directly.
 */
// The manifesto/marquee canvas above this footer (now
// src/components/home/ManifestoMarqueeSection.tsx, Home-page-only) ends on
// this exact color — a flat fill here (not a gradient restarting at 0%)
// keeps the two visually continuous with no seam, regardless of either
// element's actual height. On every other route (no manifesto canvas above
// it), this is simply the footer's own flat background.
const FOOTER_BG_COLOR = "#080D14";
const GRAIN_URL =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

const LINE_COLOR = "rgba(198, 192, 180, 0.16)";
const TEXT_CREAM = "#F2F4F7";
const VERTICAL_LINE_FRACTIONS = [0, 0.25, 0.5, 0.75, 1];

const QUICK_LINKS = ["Home", "About Us", "Products", "Specifications", "Industries We Serve", "Contact"];
const FOOTER_MUTED = "rgba(242, 244, 247, 0.6)";
const FOOTER_FAINT = "rgba(242, 244, 247, 0.45)";
const FOOTER_FAINT_HOVER = "rgba(242, 244, 247, 0.85)";
const FOOTER_BLURB =
  "Manufacturer of Power & Distribution Transformers, Compact Substations, Servo Voltage Stabilizers, and HT & LT Panels — built on decades of experience in power distribution.";

function FooterColumnHeading({ children }: { children: string }) {
  return (
    <h3
      style={{
        fontSize: "13px",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        color: TEXT_CREAM,
        opacity: 0.8,
        marginBottom: "18px",
      }}
    >
      {children}
    </h3>
  );
}

function DesignCredit({ align }: { align: "flex-end" | "flex-start" }) {
  const [hovering, setHovering] = useState(false);
  return (
    <div style={{ display: "flex", justifyContent: align, alignItems: "center", gap: "8px", marginTop: "8px" }}>
      <span>Design by Manik Rana</span>
      <a
        href="https://manik-portfolio-chi.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        style={{
          fontWeight: 600,
          color: hovering ? FOOTER_FAINT_HOVER : FOOTER_FAINT,
          textDecoration: hovering ? "underline" : "none",
          cursor: "pointer",
        }}
      >
        Visit
      </a>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ width: "100%" }}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `${GRAIN_URL}, linear-gradient(${FOOTER_BG_COLOR}, ${FOOTER_BG_COLOR})`,
          backgroundBlendMode: "overlay, normal",
          backgroundSize: "140px 140px, cover",
        }}
      />

      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute -bottom-[6vw] left-1/2 -translate-x-1/2 text-[18vw] leading-none font-bold whitespace-nowrap select-none"
        style={{ color: TEXT_CREAM, opacity: 0.05 }}
      >
        {COMPANY_NAME.toUpperCase()}
      </span>

      <style>{`
        .site-footer-desktop { display: block; }
        .site-footer-mobile { display: none; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .site-footer-desktop { display: none; }
          .site-footer-mobile { display: block; }
        }
      `}</style>

      <div className="site-footer-desktop">
        {VERTICAL_LINE_FRACTIONS.map((fraction) => (
          <div
            key={fraction}
            aria-hidden="true"
            className="absolute"
            style={{
              top: 0,
              bottom: 0,
              left: `calc(30px + (100% - 60px) * ${fraction})`,
              width: "1px",
              backgroundColor: LINE_COLOR,
            }}
          />
        ))}

        <div
          className="relative"
          style={{
            display: "grid",
            gridTemplateColumns: `30px repeat(4, 1fr) 30px`,
            columnGap: "24px",
            paddingTop: "70px",
            paddingBottom: "50px",
          }}
        >
          <div className="flex flex-col" style={{ gridColumn: "2 / 3", gap: "16px" }}>
            <div className="flex items-center" style={{ gap: "10px" }}>
              <div
                role="img"
                aria-label="Company logo"
                style={{
                  height: "22px",
                  width: "22px",
                  flexShrink: 0,
                  backgroundColor: TEXT_CREAM,
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
              <span className="font-heading" style={{ fontSize: "18px", fontWeight: 700, color: TEXT_CREAM }}>
                {COMPANY_NAME}
              </span>
            </div>
            <p style={{ fontSize: "14px", lineHeight: 1.6, color: FOOTER_MUTED }}>{FOOTER_BLURB}</p>
            <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: FOOTER_FAINT }}>
              {COMPANY_WEBSITE_DISPLAY}
            </span>
          </div>

          <div style={{ gridColumn: "3 / 4" }}>
            <FooterColumnHeading>Quick Links</FooterColumnHeading>
            <ul className="flex flex-col" style={{ gap: "10px" }}>
              {QUICK_LINKS.map((label) => (
                <li key={label} style={{ fontSize: "14px", color: FOOTER_MUTED }}>
                  {label}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ gridColumn: "4 / 5" }}>
            <FooterColumnHeading>Products</FooterColumnHeading>
            <ul className="flex flex-col" style={{ gap: "10px" }}>
              {products.map((product) => (
                <li key={product.slug} style={{ fontSize: "14px", color: FOOTER_MUTED }}>
                  {product.name}
                </li>
              ))}
            </ul>
          </div>

          <div style={{ gridColumn: "5 / 6" }}>
            <FooterColumnHeading>Get in Touch</FooterColumnHeading>
            <ul className="flex flex-col" style={{ gap: "14px", fontSize: "14px", color: FOOTER_MUTED }}>
              <li className="flex items-start" style={{ gap: "10px" }}>
                <MapPin size={16} style={{ marginTop: "2px", flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
                <span>
                  {COMPANY_ADDRESS_LINES.map((line) => (
                    <span key={line} style={{ display: "block" }}>
                      {line}
                    </span>
                  ))}
                </span>
              </li>
              <li className="flex items-center" style={{ gap: "10px" }}>
                <Phone size={16} style={{ flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
                <div className="flex flex-col" style={{ gap: "4px" }}>
                  <span>{COMPANY_PHONE_DISPLAY}</span>
                  <span>{COMPANY_PHONE_DISPLAY_2}</span>
                </div>
              </li>
              <li className="flex items-center" style={{ gap: "10px" }}>
                <Mail size={16} style={{ flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
                <span>{COMPANY_EMAIL}</span>
              </li>
            </ul>
          </div>

          <div
            className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between"
            style={{
              gridColumn: "2 / 6",
              marginTop: "50px",
              paddingTop: "22px",
              borderTop: `1px solid ${LINE_COLOR}`,
              gap: "8px",
              fontSize: "12px",
              color: FOOTER_FAINT,
            }}
          >
            <span>
              © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
            </span>
            <div className="flex flex-col items-end" style={{ gap: "4px" }}>
              <span>Manufactured in Himachal Pradesh, India.</span>
              <DesignCredit align="flex-end" />
            </div>
          </div>
        </div>
      </div>

      <div className="site-footer-mobile relative" style={{ padding: "50px 20px 30px" }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ left: "20px", width: "1px", backgroundColor: LINE_COLOR }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0"
          style={{ right: "20px", width: "1px", backgroundColor: LINE_COLOR }}
        />

        <div className="flex flex-col" style={{ gap: "16px", marginBottom: "32px" }}>
          <div className="flex items-center" style={{ gap: "10px" }}>
            <div
              role="img"
              aria-label="Company logo"
              style={{
                height: "20px",
                width: "20px",
                flexShrink: 0,
                backgroundColor: TEXT_CREAM,
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
            <span className="font-heading" style={{ fontSize: "17px", fontWeight: 700, color: TEXT_CREAM }}>
              {COMPANY_NAME}
            </span>
          </div>
          <p style={{ fontSize: "14px", lineHeight: 1.6, color: FOOTER_MUTED }}>{FOOTER_BLURB}</p>
          <span style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: FOOTER_FAINT }}>
            {COMPANY_WEBSITE_DISPLAY}
          </span>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <FooterColumnHeading>Quick Links</FooterColumnHeading>
          <ul className="flex flex-col" style={{ gap: "10px" }}>
            {QUICK_LINKS.map((label) => (
              <li key={label} style={{ fontSize: "14px", color: FOOTER_MUTED }}>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <FooterColumnHeading>Products</FooterColumnHeading>
          <ul className="flex flex-col" style={{ gap: "10px" }}>
            {products.map((product) => (
              <li key={product.slug} style={{ fontSize: "14px", color: FOOTER_MUTED }}>
                {product.name}
              </li>
            ))}
          </ul>
        </div>

        <div style={{ marginBottom: "32px" }}>
          <FooterColumnHeading>Get in Touch</FooterColumnHeading>
          <ul className="flex flex-col" style={{ gap: "14px", fontSize: "14px", color: FOOTER_MUTED }}>
            <li className="flex items-start" style={{ gap: "10px" }}>
              <MapPin size={16} style={{ marginTop: "2px", flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
              <span>
                {COMPANY_ADDRESS_LINES.map((line) => (
                  <span key={line} style={{ display: "block" }}>
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center" style={{ gap: "10px" }}>
              <Phone size={16} style={{ flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
              <div className="flex flex-col" style={{ gap: "4px" }}>
                <span>{COMPANY_PHONE_DISPLAY}</span>
                <span>{COMPANY_PHONE_DISPLAY_2}</span>
              </div>
            </li>
            <li className="flex items-center" style={{ gap: "10px" }}>
              <Mail size={16} style={{ flexShrink: 0, color: TEXT_CREAM, opacity: 0.7 }} aria-hidden="true" />
              <span>{COMPANY_EMAIL}</span>
            </li>
          </ul>
        </div>

        <div
          className="flex flex-col"
          style={{
            paddingTop: "22px",
            borderTop: `1px solid ${LINE_COLOR}`,
            gap: "8px",
            fontSize: "12px",
            color: FOOTER_FAINT,
          }}
        >
          <span>
            © {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </span>
          <span>Manufactured in Himachal Pradesh, India.</span>
          <DesignCredit align="flex-start" />
        </div>
      </div>
    </footer>
  );
}
