import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE_DISPLAY,
  COMPANY_WEBSITE_DISPLAY,
  buildMailtoLink,
  buildTelLink,
} from "@/config/contact";
import { products } from "@/data/products";

const QUICK_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Us" },
  { to: "/products", label: "Products" },
  { to: "/specifications", label: "Specifications" },
  { to: "/industries", label: "Industries We Serve" },
  { to: "/contact", label: "Contact" },
] as const;

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 text-navy-100">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
        {/* Company */}
        <div className="flex flex-col gap-4 lg:col-span-1">
          <div className="flex items-center gap-3">
            <div
              role="img"
              aria-label="Company logo — pending"
              className="flex h-10 w-10 items-center justify-center rounded bg-white/10 text-sm font-bold text-gold-400"
            >
              NR
            </div>
            <span className="font-heading text-lg font-bold text-white">{COMPANY_NAME}</span>
          </div>
          <p className="text-sm leading-relaxed text-navy-100/70">
            Manufacturer of Power &amp; Distribution Transformers, Compact Substations, Servo
            Voltage Stabilizers, and HT &amp; LT Panels — built on decades of experience in power
            distribution.
          </p>
          <span className="text-xs font-medium tracking-wide text-gold-400 uppercase">
            {COMPANY_WEBSITE_DISPLAY}
          </span>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
            Quick Links
          </h3>
          <ul className="flex flex-col gap-2.5">
            {QUICK_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-navy-100/70 transition-colors duration-150 hover:text-gold-400"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Products */}
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
            Products
          </h3>
          <ul className="flex flex-col gap-2.5">
            {products.map((product) => (
              <li key={product.slug}>
                <Link
                  to={`/products/${product.slug}`}
                  className="text-sm text-navy-100/70 transition-colors duration-150 hover:text-gold-400"
                >
                  {product.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="mb-4 text-sm font-semibold tracking-wide text-white uppercase">
            Get in Touch
          </h3>
          <ul className="flex flex-col gap-3 text-sm text-navy-100/70">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <span>
                {COMPANY_ADDRESS_LINES.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a href={buildTelLink()} className="hover:text-gold-400">
                {COMPANY_PHONE_DISPLAY}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="h-4 w-4 shrink-0 text-gold-400" aria-hidden="true" />
              <a href={buildMailtoLink()} className="hover:text-gold-400">
                {COMPANY_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-5 text-xs text-navy-100/60 sm:flex-row">
          <span>
            © {year} {COMPANY_NAME}. All rights reserved.
          </span>
          <span>Manufactured in Himachal Pradesh, India.</span>
        </div>
      </div>
    </footer>
  );
}
