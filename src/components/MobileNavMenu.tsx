import { Menu, Phone, X } from "lucide-react";
import { NavLink } from "react-router-dom";
import { buildTelLink } from "@/config/contact";
import { products } from "@/data/products";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/specifications", label: "Specifications" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
] as const;

/**
 * The mobile hamburger trigger button and its full-width dropdown panel,
 * shared verbatim by both Header.tsx (every route except Home) and
 * HomeHeader.tsx (Home) so Home's mobile nav can never drift into its own
 * separate version — same markup/classes everywhere. Split into two pure
 * pieces (not one component owning its own open state) because each caller
 * mounts them in a different place in its own DOM/layout (Header.tsx nests
 * the trigger inside its actions row and the panel as a sibling below it;
 * HomeHeader.tsx positions both independently within its fixed bar), so
 * open/close state stays with the caller.
 */
export function MobileNavTrigger({ isOpen, onToggle }: { isOpen: boolean; onToggle: () => void }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-expanded={isOpen}
      aria-label="Toggle menu"
      className="flex h-10 w-10 items-center justify-center rounded border border-ink-100 text-navy-950 lg:hidden"
    >
      {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
    </button>
  );
}

export function MobileNavPanel() {
  return (
    <nav
      aria-label="Mobile primary"
      className="pointer-events-auto max-h-[calc(100vh-80px)] overflow-y-auto border-t border-ink-100 bg-white lg:hidden"
    >
      <div className="container-page flex flex-col gap-1 py-4">
        <NavLink to="/" end className="rounded px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-navy-50">
          Home
        </NavLink>
        <NavLink to="/about" className="rounded px-3 py-2.5 text-sm font-semibold text-ink-700 hover:bg-navy-50">
          About
        </NavLink>

        <span className="px-3 pt-3 pb-1 text-xs font-semibold tracking-wide text-ink-300 uppercase">Products</span>
        {products.map((product) => (
          <NavLink
            key={product.slug}
            to={`/products/${product.slug}`}
            className="rounded px-3 py-2 text-sm text-ink-700 hover:bg-navy-50"
          >
            {product.name}
          </NavLink>
        ))}
        <NavLink to="/products" className="rounded px-3 py-2.5 text-sm font-semibold text-navy-800 hover:bg-navy-50">
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
  );
}
