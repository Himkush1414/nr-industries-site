import { ChevronDown, Phone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { COMPANY_NAME, COMPANY_PHONE_DISPLAY, buildTelLink } from "@/config/contact";
import { products } from "@/data/products";
import { MobileNavPanel, MobileNavTrigger } from "@/components/MobileNavMenu";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { useNavScroll } from "@/hooks/useNavScroll";

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
        `rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
          isActive ? "bg-navy-950 text-white" : "text-ink-500 hover:text-navy-950"
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

  // Change #3 (navbar scroll behavior): a single 0-1 progress value derived
  // from scroll position. 0 = resting state (top of page, or bottom of
  // page); 1 = fully scrolled-past-hero state. Logo/actions ride this to
  // shift + fade, the pill nav rides it to slide up out of view, and a
  // slight backdrop blur is only present while progress is strictly between
  // the two (mid-transition) — never at rest, never once fully hidden.
  const navProgress = useNavScroll();
  const isTransitioning = navProgress > 0 && navProgress < 1;
  const isFullyHidden = navProgress >= 1;

  const logoStyle = {
    transform: `translateX(-${navProgress * 36}px)`,
    opacity: 1 - navProgress,
  };
  const actionsStyle = {
    transform: `translateX(${navProgress * 36}px)`,
    opacity: 1 - navProgress,
  };
  const pillStyle = {
    transform: `translate(-50%, calc(-50% - ${navProgress * 96}px))`,
    opacity: 1 - navProgress,
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-[background-color,backdrop-filter] duration-300 ${
        isTransitioning ? "bg-white/10 backdrop-blur-md" : "bg-transparent"
      } ${isFullyHidden ? "pointer-events-none" : ""}`}
    >
      <div className="relative flex h-20 w-full items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        {/* Logo
            Fix (Task 2): the prior fix for the opaque-box logo was never an
            SVG (searched git log + the codebase — none exists anywhere).
            It was a transparent PNG: /logo.webp has no alpha channel at all
            (confirmed via metadata — channels: 3, hasAlpha: false), so it
            rendered as a visible rectangular tile; the fix was a calibrated
            white-key + color-decontamination pass producing a genuinely
            transparent PNG, applied only to Lab V5's own nav clone
            (src/experimental-ui-v5/components/NavBar.tsx) at the time. Now
            that V5's content is the real homepage but this real, shared
            Header renders its nav (not V5's clone — see HomePage.tsx), that
            fix had never reached here. Reusing the same asset (not
            re-deriving it, not inventing a new treatment) makes it apply
            site-wide in one place, since this Header is the only nav on
            every real page. */}
        <NavLink
          to="/"
          className="flex min-w-0 shrink items-center transition-transform duration-300 ease-out"
          style={logoStyle}
          aria-label={`${COMPANY_NAME} home`}
        >
          <img
            src="/logo-v5-transparent.png"
            alt={COMPANY_NAME}
            width={248}
            height={44}
            className="h-[60px] w-auto max-w-[min(260px,52vw)] object-contain object-left"
            decoding="async"
          />
        </NavLink>

        {/* Desktop nav — curved floating pill strip, centered independently
            of the logo/actions flex flow so it stays true-center. */}
        <nav
          className="pointer-events-auto absolute top-1/2 left-1/2 hidden items-center gap-1 rounded-full border border-ink-100 bg-white/90 px-2 py-1.5 shadow-lg shadow-navy-950/10 backdrop-blur-sm transition-transform duration-300 ease-out lg:flex"
          style={pillStyle}
          aria-label="Primary"
        >
          <NavItem to="/" label="Home" end />
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
              className={`flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition-colors duration-150 ${
                isProductsRouteActive ? "bg-navy-950 text-white" : "text-ink-500 hover:text-navy-950"
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

          {NAV_LINKS.slice(1).map((link) => (
            <NavItem key={link.to} {...link} />
          ))}
        </nav>

        {/* Right-side actions */}
        <div
          className="flex items-center gap-2 transition-transform duration-300 ease-out"
          style={actionsStyle}
        >
          <a
            href={buildTelLink()}
            aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
            className="hidden h-[33px] w-[33px] items-center justify-center rounded-full border border-ink-100 text-navy-800 transition-colors duration-150 hover:border-navy-800 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <WhatsAppButton compact />

          <MobileNavTrigger isOpen={isMobileOpen} onToggle={() => setIsMobileOpen((v) => !v)} />
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileOpen && <MobileNavPanel />}
    </header>
  );
}
