import { ChevronDown, Menu, Phone, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { COMPANY_NAME, COMPANY_PHONE_DISPLAY, buildTelLink } from "@/config/contact";
import { products } from "@/data/products";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
      className={({ isActive }) =>
        `px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
          isActive ? "text-navy-950" : "text-ink-500 hover:text-navy-950"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export function Header() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Close menus on route change.
  useEffect(() => {
    setIsProductsOpen(false);
    setIsMobileOpen(false);
  }, [location.pathname]);

  // Close products dropdown on outside click / Escape.
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
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/95 backdrop-blur">
      <div className="container-page flex h-18 items-center justify-between gap-4 py-3">
        {/* Logo */}
        <NavLink to="/" className="flex shrink-0 items-center gap-3" aria-label={`${COMPANY_NAME} home`}>
          <div
            role="img"
            aria-label="Company logo — pending"
            className="flex h-11 w-11 items-center justify-center rounded bg-navy-950 text-sm font-bold text-gold-400"
          >
            NR
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading text-base font-bold text-navy-950 sm:text-lg">
              {COMPANY_NAME}
            </span>
            <span className="text-[11px] font-medium tracking-wide text-gold-600 uppercase">
              Power at Best
            </span>
          </div>
        </NavLink>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          <NavItem to="/" label="Home" end />

          <div ref={dropdownRef} className="relative">
            <button
              type="button"
              onClick={() => setIsProductsOpen((v) => !v)}
              aria-expanded={isProductsOpen}
              aria-haspopup="true"
              className={`flex items-center gap-1 px-1 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
                isProductsRouteActive ? "text-navy-950" : "text-ink-500 hover:text-navy-950"
              }`}
            >
              Products
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-150 ${isProductsOpen ? "rotate-180" : ""}`}
                aria-hidden="true"
              />
            </button>
            {isProductsOpen && (
              <div className="absolute top-full left-1/2 z-50 mt-2 w-[26rem] -translate-x-1/2 rounded border border-ink-100 bg-white p-3 shadow-xl shadow-navy-950/10">
                <div className="grid grid-cols-2 gap-1">
                  {products.map((product) => (
                    <NavLink
                      key={product.slug}
                      to={`/products/${product.slug}`}
                      className="rounded px-3 py-2 text-sm font-medium text-ink-700 hover:bg-navy-50 hover:text-navy-950"
                    >
                      {product.name}
                    </NavLink>
                  ))}
                </div>
                <NavLink
                  to="/products"
                  className="mt-2 flex items-center justify-between rounded bg-navy-50 px-3 py-2 text-sm font-semibold text-navy-800 hover:bg-navy-100"
                >
                  View All Products
                </NavLink>
              </div>
            )}
          </div>

          {NAV_LINKS.map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        {/* Right-side actions */}
        <div className="flex items-center gap-2">
          <a
            href={buildTelLink()}
            aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
            className="hidden h-10 w-10 items-center justify-center rounded border border-ink-100 text-navy-800 transition-colors duration-150 hover:border-navy-800 sm:flex"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
          </a>
          <WhatsAppButton className="hidden sm:inline-flex" />

          <button
            type="button"
            onClick={() => setIsMobileOpen((v) => !v)}
            aria-expanded={isMobileOpen}
            aria-label="Toggle menu"
            className="flex h-10 w-10 items-center justify-center rounded border border-ink-100 text-navy-950 lg:hidden"
          >
            {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && (
        <nav
          aria-label="Mobile primary"
          className="max-h-[calc(100vh-4.5rem)] overflow-y-auto border-t border-ink-100 bg-white lg:hidden"
        >
          <div className="container-page flex flex-col gap-1 py-4">
            <NavLink
              to="/"
              end
              className="rounded px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-navy-50"
            >
              Home
            </NavLink>
            <NavLink to="/about" className="rounded px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-navy-50">
              About
            </NavLink>

            <span className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-ink-300 uppercase">
              Products
            </span>
            {products.map((product) => (
              <NavLink
                key={product.slug}
                to={`/products/${product.slug}`}
                className="rounded px-3 py-2 text-sm text-ink-700 hover:bg-navy-50"
              >
                {product.name}
              </NavLink>
            ))}
            <NavLink
              to="/products"
              className="rounded px-3 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50"
            >
              View All Products
            </NavLink>

            <div className="my-2 h-px bg-ink-100" />

            {NAV_LINKS.slice(1).map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-navy-50"
              >
                {link.label}
              </NavLink>
            ))}

            <div className="mt-3 flex gap-3">
              <WhatsAppButton className="flex-1" />
              <a
                href={buildTelLink()}
                className="flex flex-1 items-center justify-center gap-2 rounded border border-navy-800 px-5 py-3 text-sm font-semibold text-navy-800"
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
