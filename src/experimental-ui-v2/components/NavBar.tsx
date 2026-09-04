import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildTelLink, COMPANY_NAME, COMPANY_PHONE_DISPLAY } from "@/config/contact";
import { products } from "@/data/products";
import { ThemeToggle } from "@/experimental-ui-v2/components/ThemeToggle";
import type { V2Theme } from "@/experimental-ui-v2/lib/useTheme";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/specifications", label: "Specifications" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * A dedicated nav for this experiment — mirrors the live site's Header
 * structure and links exactly (same routes, same products dropdown, same
 * phone/WhatsApp actions) so it reads as "our real nav," but lives entirely
 * in this isolated folder so the theme toggle can slot in as a natural flex
 * child without touching the real Header.tsx or its shared bundle.
 */
export function NavBar({ theme, onToggleTheme }: { theme: V2Theme; onToggleTheme: () => void }) {
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

  const linkClass = (isActive: boolean) =>
    `px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
      isActive ? "v2-fg" : "v2-fg-dim hover:opacity-80"
    }`;

  return (
    <header className="v2-border v2-surface sticky top-0 z-50 border-b backdrop-blur">
      <div className="container-page flex h-[68px] items-center justify-between gap-4">
        <NavLink to="/lab/v2" className="flex min-w-0 shrink items-center gap-2" aria-label={`${COMPANY_NAME} home`}>
          {/* logo.webp has an opaque white background baked in (not transparent),
              so it needs a light chip behind it to read cleanly in dark mode
              rather than a filter (invert on an opaque white bg just blanks it). */}
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1.5 shadow-sm">
            <img
              src="/logo.webp"
              alt={COMPANY_NAME}
              width={180}
              height={32}
              className="h-7 w-auto max-w-[min(180px,48vw)] object-contain object-left"
              decoding="async"
            />
          </span>
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <NavLink to="/lab/v2" className={() => linkClass(true)}>
            Home
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => linkClass(isActive)}>
            About
          </NavLink>

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
              className={`flex items-center gap-1 px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
                isProductsRouteActive ? "v2-fg" : "v2-fg-dim hover:opacity-80"
              }`}
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${isProductsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isProductsOpen && (
              <div className="v2-card v2-surface-raised absolute top-full left-1/2 z-50 mt-2 w-[26rem] -translate-x-1/2 p-3 shadow-xl">
                <div className="grid grid-cols-2 gap-1">
                  {products.map((product) => (
                    <NavLink
                      key={product.slug}
                      to={`/products/${product.slug}`}
                      className="v2-fg rounded px-3 py-2 text-sm font-medium hover:opacity-70"
                    >
                      {product.name}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  to="/products"
                  className="v2-accent-text mt-2 flex items-center justify-between rounded px-3 py-2 text-sm font-semibold"
                  style={{ backgroundColor: "var(--v2-accent-soft)" }}
                >
                  View All Products
                </NavLink>
              </div>
            )}
          </div>

          {NAV_LINKS.slice(1).map((link) => (
            <NavLink key={link.to} to={link.to} className={({ isActive }) => linkClass(isActive)}>
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <a
            href={buildTelLink()}
            aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
            className="v2-theme-toggle hidden sm:inline-flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <WhatsAppButton compact />

          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle menu"
            className="v2-theme-toggle !w-10 !h-10 lg:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {isMobileOpen && (
        <nav aria-label="Mobile primary" className="v2-border v2-surface max-h-[calc(100vh-68px)] overflow-y-auto border-t lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            <NavLink to="/lab/v2" className="v2-fg rounded px-3 py-2.5 text-sm font-semibold hover:opacity-70">
              Home
            </NavLink>
            <NavLink to="/about" className="v2-fg rounded px-3 py-2.5 text-sm font-semibold hover:opacity-70">
              About
            </NavLink>

            <span className="v2-fg-faint px-3 pt-3 pb-1 text-xs font-semibold tracking-wide uppercase">
              Products
            </span>
            {products.map((product) => (
              <NavLink
                key={product.slug}
                to={`/products/${product.slug}`}
                className="v2-fg-dim rounded px-3 py-2 text-sm hover:opacity-70"
              >
                {product.name}
              </NavLink>
            ))}
            <NavLink to="/products" className="v2-accent-text rounded px-3 py-2.5 text-sm font-semibold">
              View All Products
            </NavLink>

            <div className="v2-border my-2 h-px border-t" />

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink key={link.to} to={link.to} className="v2-fg rounded px-3 py-2.5 text-sm font-semibold hover:opacity-70">
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 flex gap-3">
              <WhatsAppButton className="flex-1" />
              <a
                href={buildTelLink()}
                className="v2-border v2-accent-text flex flex-1 items-center justify-center gap-2 rounded border px-5 py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
