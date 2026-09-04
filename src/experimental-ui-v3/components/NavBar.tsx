import { Menu, X } from "lucide";
import { MorphIcon } from "morphicons/react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "@/config/contact";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/specifications", label: "Specifications" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
];

/** Logo + 5 text links + one CTA — no search bar. Mobile toggle morphs
 * Menu -> X via morphicons instead of hard-swapping icons. */
export function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b" style={{ borderColor: "var(--v3-glass-border)", backdropFilter: "blur(16px)", backgroundColor: "color-mix(in srgb, var(--v3-bg-start) 70%, transparent)" }}>
      <div className="container-page flex h-[76px] items-center justify-between">
        <Link to="/lab/v3" className="flex items-center gap-2" aria-label={`${COMPANY_NAME} home`}>
          <span className="inline-flex items-center rounded-md bg-white px-2 py-1.5">
            <img src="/logo.webp" alt={COMPANY_NAME} className="h-6 w-auto object-contain" decoding="async" />
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="v3-fg-dim text-sm font-medium transition-colors duration-300 hover:text-[var(--v3-fg)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="v3-btn v3-btn-solid hidden lg:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="v3-arrow-btn lg:hidden"
          >
            <MorphIcon icon={open ? X : Menu} size={20} reducedMotion="user" label={open ? "Close menu" : "Open menu"} />
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Mobile primary"
          className="border-t lg:hidden"
          style={{ borderColor: "var(--v3-glass-border)", backgroundColor: "var(--v3-bg-start)" }}
        >
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="v3-fg rounded px-2 py-3 text-base font-medium"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="v3-btn v3-btn-solid mt-3 w-fit" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
