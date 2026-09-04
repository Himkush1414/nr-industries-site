import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { COMPANY_NAME } from "@/config/contact";

const NAV_LINKS = [
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "Industries" },
  { to: "/contact", label: "Contact" },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className="sticky top-0 z-50 border-b backdrop-blur"
      style={{ borderColor: "var(--v4-border)", backgroundColor: "rgba(255,255,255,0.85)" }}
    >
      <div className="container-page flex h-[76px] items-center justify-between">
        <Link to="/lab/v4" className="flex items-center gap-2" aria-label={`${COMPANY_NAME} home`}>
          <img src="/logo.webp" alt={COMPANY_NAME} className="h-9 w-auto object-contain" decoding="async" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="v4-fg-dim text-sm font-medium transition-colors duration-300 hover:text-[var(--v4-accent)]"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link to="/contact" className="v4-btn v4-btn-solid hidden lg:inline-flex">
            Request a Quote
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="v4-btn-outline v4-btn flex h-10 w-10 items-center justify-center !p-0 lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav aria-label="Mobile primary" className="border-t bg-white lg:hidden" style={{ borderColor: "var(--v4-border)" }}>
          <div className="container-page flex flex-col gap-1 py-6">
            {NAV_LINKS.map((link) => (
              <Link key={link.to} to={link.to} className="v4-fg rounded px-2 py-3 text-base font-medium" onClick={() => setOpen(false)}>
                {link.label}
              </Link>
            ))}
            <Link to="/contact" className="v4-btn v4-btn-solid mt-3 w-fit" onClick={() => setOpen(false)}>
              Request a Quote
            </Link>
          </div>
        </nav>
      )}
    </header>
  );
}
