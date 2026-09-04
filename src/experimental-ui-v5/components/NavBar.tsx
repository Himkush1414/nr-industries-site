import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { COMPANY_NAME, COMPANY_PHONE_DISPLAY, buildTelLink } from "@/config/contact";
import { products } from "@/data/products";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ThemeToggle, type V5Theme } from "@/experimental-ui-v5/components/ThemeToggle";

/**
 * Source: the real production nav, src/components/Header.tsx — copied
 * exactly for structure, links, dropdown, and mobile menu (confirmed it has
 * no existing light/dark toggle). Two categories of change from the source:
 *   1. The logo/"Home" targets point at /lab/v5 instead of "/" (same
 *      self-referencing pattern every Lab's copied nav already uses).
 *   2. A ThemeToggle is grafted into the right-side actions row (desktop)
 *      and the mobile menu — additive, not a replacement of any link.
 *
 * Fix (round 2, item 5): the real nav's hardcoded navy-950/ink-500/etc.
 * Tailwind classes never responded to this page's toggle, even though the
 * toggle is wired to visibly affect the nav — every color-bearing class
 * below is now the theme-aware v5-nav- or v5-chrome- prefixed equivalent
 * instead (see experimental-v5.css). Layout/spacing/structure are untouched.
 *
 * Fix (round 3, logo): /logo.webp has an opaque white backing baked in (no
 * alpha channel — confirmed via metadata, channels: 3, hasAlpha: false), so
 * it rendered as a visible rectangular tile on the nav bar. That file is
 * shared by the real site and every other lab, so it isn't touched here —
 * instead this is a genuinely transparent PNG cut from it (the source backed
 * onto a flat near-white, so a calibrated white-key + color-decontamination
 * pass removed it cleanly with no fringe) saved as its own V5-only asset.
 */
const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/specifications", label: "Specifications" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

function NavItem({ to, label, end }: { to: string; label: string; end?: boolean }) {
  return (
    <NavLink
      to={to}
      end={end}
      className="v5-nav-link px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150"
      style={({ isActive }) => (isActive ? { color: "var(--v5-chrome-fg)" } : undefined)}
    >
      {label}
    </NavLink>
  );
}

export function NavBar({ theme, onToggleTheme }: { theme: V5Theme; onToggleTheme: () => void }) {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    setIsProductsOpen(false);
    setIsMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsProductsOpen(false);
      }
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") setIsProductsOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const isProductsRouteActive = location.pathname.startsWith("/products");

  return (
    <header className="v5-nav-surface sticky top-0 z-50 border-b backdrop-blur">
      <div className="container-page flex h-[55px] items-center justify-between gap-4 py-3">
        {/* Logo */}
        <NavLink to="/lab/v5" className="flex min-w-0 shrink items-center" aria-label={`${COMPANY_NAME} home`}>
          <img
            src="/logo-v5-transparent.png"
            alt={COMPANY_NAME}
            width={248}
            height={44}
            className="h-10 w-auto max-w-[min(220px,52vw)] object-contain object-left sm:h-12 sm:max-w-[260px] lg:h-14 lg:max-w-[300px]"
            decoding="async"
          />
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <NavItem to="/lab/v5" label="Home" end />
          <NavItem to="/about" label="About" />

          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setIsProductsOpen(true)}
            onMouseLeave={() => setIsProductsOpen(false)}
          >
            <button
              type="button"
              onClick={() => setIsProductsOpen((v) => !v)}
              onFocus={() => setIsProductsOpen(true)}
              aria-expanded={isProductsOpen}
              aria-haspopup="true"
              className="v5-nav-link flex items-center gap-1 px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150"
              style={isProductsRouteActive ? { color: "var(--v5-chrome-fg)" } : undefined}
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${isProductsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isProductsOpen && (
              <div className="v5-nav-dropdown absolute top-full left-1/2 z-50 mt-2 w-[26rem] -translate-x-1/2 rounded border p-3 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {products.map((product) => (
                    <NavLink
                      key={product.slug}
                      to={`/products/${product.slug}`}
                      className="v5-nav-dropdown-item rounded px-3 py-2 text-sm font-medium"
                    >
                      {product.name}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  to="/products"
                  className="v5-nav-chip mt-2 flex items-center justify-between rounded px-3 py-2 text-sm font-semibold"
                >
                  View All Products
                </NavLink>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={buildTelLink()}
            aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
            className="v5-nav-icon-btn hidden h-[33px] w-[33px] items-center justify-center rounded-full border transition-colors duration-150 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <WhatsAppButton compact />

          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle menu"
            className="v5-nav-icon-btn flex h-10 w-10 items-center justify-center rounded border lg:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <nav aria-label="Mobile primary" className="v5-nav-surface-solid max-h-[calc(100vh-55px)] overflow-y-auto border-t lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            <NavLink to="/lab/v5" end className="v5-nav-dropdown-item rounded px-3 py-2.5 text-sm font-semibold">
              Home
            </NavLink>
            <NavLink to="/about" className="v5-nav-dropdown-item rounded px-3 py-2.5 text-sm font-semibold">
              About
            </NavLink>

            <span className="v5-chrome-fg-faint px-3 pt-3 pb-1 text-xs font-semibold tracking-wide uppercase">
              Products
            </span>
            {products.map((product) => (
              <NavLink
                key={product.slug}
                to={`/products/${product.slug}`}
                className="v5-nav-dropdown-item rounded px-3 py-2 text-sm"
              >
                {product.name}
              </NavLink>
            ))}
            <NavLink to="/products" className="v5-nav-chip rounded px-3 py-2.5 text-sm font-semibold">
              View All Products
            </NavLink>

            <div className="my-2 h-px" style={{ backgroundColor: "var(--v5-chrome-border)" }} />

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className="v5-nav-dropdown-item rounded px-3 py-2.5 text-sm font-semibold">
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 flex items-center gap-3">
              <WhatsAppButton className="flex-1" />
              <a
                href={buildTelLink()}
                className="v5-nav-icon-btn flex flex-1 items-center justify-center gap-2 rounded border px-5 py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
