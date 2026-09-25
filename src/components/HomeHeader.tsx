import { Phone } from "lucide-react";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { buildTelLink, buildWhatsAppLink, COMPANY_PHONE_DISPLAY, WHATSAPP_GENERAL_MESSAGE } from "@/config/contact";
import { MobileNavPanel, MobileNavTrigger } from "@/components/MobileNavMenu";
import { useLockBodyScroll } from "@/hooks/useLockBodyScroll";

// Single shared breakpoint for every responsive override in this file.
const MOBILE_BREAKPOINT = 767;

/**
 * Home-page-only navigation bar — promoted from /lab/lv9's Lv9Nav.tsx (see
 * src/lab-lv9/components/Lv9Nav.tsx, left untouched as the reference this
 * was copied from). Floats transparently (`position: fixed`, no
 * background, just a backdrop blur) over whatever's scrolled behind it,
 * distributing its content across a 4-panel column grid (`calc((100% -
 * 60px) * fraction)`, 30px insets) instead of one left-to-right strip:
 * logo in panel 1, all 6 nav tabs spanning panels 2-3 as one evenly-gapped
 * group, phone + WhatsApp actions in panel 4. Below MOBILE_BREAKPOINT, the
 * tabs/actions groups are replaced by a hamburger button opening a menu.
 *
 * Every other route uses the original Header.tsx (sticky pill nav, restored
 * to how it looked before this bar was promoted) instead of this component
 * — see Layout.tsx, which picks between the two by route. Only Home's hero
 * is designed to sit flush behind this fixed bar (a dark background photo,
 * matching how LV3's hero works in lab-lv9), so `NAV_HEIGHT` is exported
 * only for this component's own mobile-menu offset, not for Layout's main
 * content padding.
 *
 * The mobile menu (below) intentionally does NOT reuse Lv9Nav's own
 * full-screen dark takeover panel — per an explicit request, it matches
 * the original Header.tsx's light dropdown panel (white background, navy
 * text, sliding in directly below the bar) instead, just repositioned with
 * `position: fixed` since this bar (unlike the original's `sticky` one)
 * reserves no space in normal document flow.
 */
export const NAV_HEIGHT = 90;

const TEXT_CREAM = "#F2F4F7";
// Same gold accent already used elsewhere on the real site (the hero
// heading's "INDUSTRIES"/"Power at Best", --color-gold-400 in index.css)
// — reused here as the nav tabs' hover color rather than inventing a new
// brand tone.
const GOLD_ACCENT = "#dcbd5c";
// Soft muted white ("dusty off-white", not flat #fff) for the masked logo
// — see the Panel 1 comment below for why it's masked rather than shown
// as the raw exported image.
const DUSTY_OFF_WHITE = "#E7E2D8";
const LOGO_HEIGHT = 47;
// The cropped source (public/cream-logo.png) is 662x187 — this preserves
// that exact aspect ratio at LOGO_HEIGHT so the mask isn't stretched.
const LOGO_WIDTH = Math.round((LOGO_HEIGHT * 662) / 187);
const ACTION_HEIGHT = 40;

const PANEL2_LEFT = "calc(30px + (100% - 60px) * 0.25)";
// Panels 2+3 combined — the 6 tabs span this whole width as one evenly-
// gapped group, rather than two separate 3-tab groups (which made the
// "Products"/"Specifications" gap, sitting right at the panel 2/3
// boundary, come out different from the gaps between other tabs).
const TABS_SPAN_WIDTH = "calc((100% - 60px) * 0.5)";
const PANEL4_LEFT = "calc(30px + (100% - 60px) * 0.75)";

const TABS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/products", label: "Products", end: false },
  { to: "/specifications", label: "Specifications", end: false },
  { to: "/industries", label: "Industries", end: false },
  { to: "/contact", label: "Contact", end: false },
] as const;

function NavTab({ to, label, end }: { to: string; label: string; end?: boolean }) {
  // Both the underline and the text color follow the live hover state and
  // revert together on mouse-leave.
  const [hovering, setHovering] = useState(false);

  return (
    <NavLink
      to={to}
      end={end}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      style={({ isActive }) => ({
        position: "relative",
        display: "inline-block",
        paddingBottom: "6px",
        fontSize: "14px",
        fontWeight: 600,
        letterSpacing: "0.02em",
        color: isActive || hovering ? GOLD_ACCENT : TEXT_CREAM,
        opacity: isActive || hovering ? 1 : 0.8,
        textDecoration: "none",
        whiteSpace: "nowrap",
      })}
    >
      {label}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          left: 0,
          right: 0,
          bottom: 0,
          height: "2px",
          backgroundColor: GOLD_ACCENT,
          transform: hovering ? "scaleX(1)" : "scaleX(0)",
          transformOrigin: "left",
          transition: "transform 0.25s ease",
        }}
      />
    </NavLink>
  );
}

// Same WhatsApp glyph path as the site's shared WhatsAppButton.tsx —
// duplicated inline rather than reusing that component, since its own
// styling is built around a rounded pill shape (not the square this button
// needs) that isn't meant to be overridden from outside.
function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.9 9.9 0 0 0 4.71 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.35-.5.05-1 .24-3.36-.7-2.85-1.14-4.68-4.02-4.82-4.2-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.24-.26.53-.33.7-.33.18 0 .35 0 .5.01.17.01.38-.06.6.45.24.56.8 1.96.87 2.1.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.45.5-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2 1.11.99 2.05 1.3 2.35 1.45.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.68-.15.28.1 1.78.84 2.08.99.3.15.5.23.58.35.08.13.08.72-.15 1.4Z" />
    </svg>
  );
}

export function HomeHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Background content must not scroll while the mobile menu is open —
  // same behavior as the original Header.tsx's mobile menu.
  useLockBodyScroll(menuOpen);

  return (
    <>
    <nav
      aria-label="Primary"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: `${NAV_HEIGHT}px`,
        zIndex: 1000,
        // No background color/fill at rest — just blurs whatever scrolls
        // behind the bar, so it reads as one soft blurred patch of the
        // page itself rather than a distinct colored strip sitting on top
        // of it. While the mobile menu is open, this becomes a solid white
        // fill instead (logo included) — matching the original Header.tsx,
        // whose bar also goes solid while its own mobile menu is open.
        backgroundColor: menuOpen ? "#ffffff" : "transparent",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
      }}
    >
      {/* Mobile (<=767px): the desktop 3-panel layout (tabs group + phone/
          WhatsApp group) is replaced by a single hamburger button that
          opens a full-screen menu (below). Scoped via a plain media query
          rather than a JS width check — the swap is purely visual/CSS, no
          layout logic depends on knowing the width in JS. */}
      <style>{`
        .site-nav-desktop-tabs, .site-nav-desktop-actions { display: flex; }
        .site-nav-hamburger { display: none; }
        .site-nav-desktop-logo { display: flex; align-items: center; }
        .site-nav-mobile-logo { display: none; align-items: center; }
        @media (max-width: ${MOBILE_BREAKPOINT}px) {
          .site-nav-desktop-tabs, .site-nav-desktop-actions { display: none; }
          .site-nav-hamburger { display: flex; }
          .site-nav-desktop-logo { display: none; }
          .site-nav-mobile-logo { display: flex; }
        }
      `}</style>

      {/* Panel 1 — logo. Desktop keeps the existing solid-color mask (the
          logo file's own alpha channel as the stencil, filled with a flat
          dusty off-white) — its baked-in gold/tan tones read too close to
          the dark hero's own color range to stay reliably visible there.
          That off-white treatment is Home-desktop-only by design; every
          other nav instance (this bar's own mobile view included) uses the
          real full-color logo — same asset Header.tsx already uses on
          every non-Home route, desktop and mobile alike — so the brand mark
          reads consistently everywhere except this one deliberate exception. */}
      <Link
        to="/"
        aria-label="NR Industries home"
        className="site-nav-desktop-logo"
        style={{
          position: "absolute",
          left: "clamp(16px, 4vw, 30px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <div
          role="img"
          aria-label="NR Industries"
          style={{
            height: `clamp(34px, 8vw, ${LOGO_HEIGHT}px)`,
            width: `clamp(${Math.round((34 * 662) / 187)}px, ${(8 * 662) / 187}vw, ${LOGO_WIDTH}px)`,
            backgroundColor: DUSTY_OFF_WHITE,
            WebkitMaskImage: "url(/cream-logo.png)",
            maskImage: "url(/cream-logo.png)",
            WebkitMaskSize: "contain",
            maskSize: "contain",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "left center",
            maskPosition: "left center",
          }}
        />
      </Link>
      <Link
        to="/"
        aria-label="NR Industries home"
        className="site-nav-mobile-logo"
        style={{
          position: "absolute",
          left: "clamp(16px, 4vw, 30px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <img
          src="/logo-v5-transparent.png"
          alt="NR Industries"
          height={44}
          width={88}
          className="h-[clamp(32px,9vw,44px)] w-auto object-contain object-left"
          decoding="async"
        />
      </Link>

      {/* Panels 2-3 — all 6 nav tabs as one evenly-gapped group (a fixed
          `gap`, not `space-between`, so the gap between every pair —
          including "Products"/"Specifications" at the panel boundary — is
          identical; `gap` alone already guarantees that regardless of each
          label's own width). Centered. */}
      <div
        className="site-nav-desktop-tabs"
        style={{
          position: "absolute",
          left: PANEL2_LEFT,
          top: "50%",
          transform: "translateY(-50%)",
          width: TABS_SPAN_WIDTH,
          alignItems: "center",
          justifyContent: "center",
          gap: "22px",
        }}
      >
        {TABS.map((tab) => (
          <NavTab key={tab.to} {...tab} />
        ))}
      </div>

      {/* Panel 4 — call (circle) then WhatsApp (wider rectangle), in that
          left-to-right order. */}
      <div
        className="site-nav-desktop-actions"
        style={{
          position: "absolute",
          left: PANEL4_LEFT,
          right: "30px",
          top: "50%",
          transform: "translateY(-50%)",
          alignItems: "center",
          justifyContent: "flex-end",
          gap: "12px",
        }}
      >
        <a
          href={buildTelLink()}
          aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
          style={{
            width: `${ACTION_HEIGHT}px`,
            height: `${ACTION_HEIGHT}px`,
            borderRadius: "50%",
            border: `1px solid ${TEXT_CREAM}`,
            color: TEXT_CREAM,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
          }}
        >
          <Phone size={16} color={TEXT_CREAM} aria-hidden="true" />
        </a>
        <a
          href={buildWhatsAppLink(WHATSAPP_GENERAL_MESSAGE)}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat with us on WhatsApp"
          style={{
            height: `${ACTION_HEIGHT}px`,
            padding: "0 16px",
            borderRadius: "0px",
            backgroundColor: "#25D366",
            color: "#ffffff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            fontSize: "14px",
            fontWeight: 600,
            whiteSpace: "nowrap",
            flexShrink: 0,
          }}
        >
          <WhatsAppIcon />
          WhatsApp
        </a>
      </div>

      {/* Mobile-only hamburger trigger, panel-4 position (right edge, same
          clamp()-based inset as the logo's left inset for a symmetric
          margin). The `site-nav-hamburger` class on this wrapper (not on
          the button itself) is what the media query above actually toggles
          — MobileNavTrigger is the exact same component Header.tsx uses on
          every other route, unmodified, so it keeps its own `lg:hidden`
          class too, but that alone would show it up to 1024px instead of
          this bar's own 767px breakpoint; the wrapper's display:none/flex
          is what enforces the correct breakpoint here. */}
      <div
        className="site-nav-hamburger"
        style={{
          position: "absolute",
          right: "clamp(16px, 4vw, 30px)",
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <MobileNavTrigger isOpen={menuOpen} onToggle={() => setMenuOpen((v) => !v)} />
      </div>
    </nav>

    {/* Mobile menu — a SIBLING of <nav>, not a descendant: <nav> has
        `backdrop-filter`, which (like `transform`) creates a new
        containing block for `position: fixed` descendants — a fixed child
        of a 90px-tall nav would resolve its own top/bottom edges relative
        to that 90px box instead of the viewport. Living outside <nav>
        avoids that entirely.
        Per an explicit request, this is the exact same MobileNavPanel
        Header.tsx uses on every other route (not a separate/lookalike
        version) — just wrapped here with `position: fixed` and an explicit
        `top: NAV_HEIGHT` instead of the original's `sticky`-header-relative
        flow position, since this bar reserves no space in normal document
        flow. */}
    {menuOpen && (
        <div style={{ position: "fixed", top: `${NAV_HEIGHT}px`, left: 0, right: 0, zIndex: 1000 }}>
          <MobileNavPanel topOffsetPx={NAV_HEIGHT} />
        </div>
    )}
    </>
  );
}
