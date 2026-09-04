import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { COMPANY_ADDRESS_FULL, COMPANY_EMAIL, COMPANY_NAME, COMPANY_PHONE_DISPLAY } from "@/config/contact";
import { products } from "@/data/products";

const LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { to: "/lab/v2", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/industries", label: "Industries" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Products",
    links: [
      { to: "/products", label: "All Products" },
      ...products.slice(0, 4).map((p) => ({ to: `/products/${p.slug}`, label: p.name })),
    ],
  },
  {
    heading: "Resources",
    links: [{ to: "/specifications", label: "Specifications" }],
  },
];

/** Footer is deliberately always light-background, independent of the light/dark toggle. */
export function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--v2-footer-bg)", color: "var(--v2-footer-fg)" }}>
      <div className="container-page py-16 sm:py-20">
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
          <div className="flex max-w-sm flex-col gap-5">
            <span className="font-heading text-xl font-bold">{COMPANY_NAME}</span>
            <p className="text-sm leading-relaxed" style={{ color: "var(--v2-footer-fg-dim)" }}>
              {COMPANY_ADDRESS_FULL}
            </p>
            <Link to="/contact" className="v2-btn v2-btn-solid w-fit">
              Talk to the Team
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid flex-1 grid-cols-2 gap-8 sm:grid-cols-3">
            {LINK_COLUMNS.map((col) => (
              <div key={col.heading} className="flex flex-col gap-3">
                <span className="text-xs font-semibold tracking-[0.14em] uppercase" style={{ color: "var(--v2-footer-fg-dim)" }}>
                  {col.heading}
                </span>
                {col.links.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-sm font-medium hover:opacity-70"
                    style={{ color: "var(--v2-footer-fg)" }}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-12 flex flex-col gap-4 border-t pt-6 text-sm sm:flex-row sm:items-center sm:justify-between"
          style={{ borderColor: "var(--v2-footer-border)", color: "var(--v2-footer-fg-dim)" }}
        >
          <span>&copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.</span>
          <div className="flex flex-wrap gap-x-6 gap-y-1">
            <a href={`mailto:${COMPANY_EMAIL}`} className="hover:opacity-70">
              {COMPANY_EMAIL}
            </a>
            <span>{COMPANY_PHONE_DISPLAY}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
