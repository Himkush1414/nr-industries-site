import { ArrowRight, Globe, Mail, Phone } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  buildTelLink,
  COMPANY_EMAIL,
  COMPANY_GOOGLE_MAPS_URL,
  COMPANY_NAME,
  COMPANY_PHONE_DISPLAY,
} from "@/config/contact";
import { GsapReveal } from "@/experimental-ui-v4/components/GsapReveal";

const LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { to: "/lab/v4", label: "Home" },
      { to: "/about", label: "About" },
      { to: "/industries", label: "Industries" },
      { to: "/contact", label: "Contact" },
    ],
  },
  {
    heading: "Products",
    links: [
      { to: "/products", label: "All Products" },
      { to: "/products/power-transformers", label: "Power Transformers" },
      { to: "/products/distribution-transformers", label: "Distribution Transformers" },
      { to: "/specifications", label: "Specifications" },
    ],
  },
];

const CONTACT_LINKS = [
  { icon: Globe, label: "Find us on Google Maps", href: COMPANY_GOOGLE_MAPS_URL },
  { icon: Mail, label: `Email ${COMPANY_EMAIL}`, href: `mailto:${COMPANY_EMAIL}` },
  { icon: Phone, label: `Call ${COMPANY_PHONE_DISPLAY}`, href: buildTelLink() },
];

/**
 * Footer CTA band — email capture is an honest, local-only acknowledgment
 * (no network call), not wired to the real Supabase contact_submissions
 * table: that table's insert path requires name/phone/message fields with
 * real validation, and this repo's DB schema constraints aren't visible from
 * here, so forcing an email-only submission through it risked a silent or
 * visible failure.
 */
export function FooterCta() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
  };

  return (
    <footer className="border-t" style={{ borderColor: "var(--v4-border)", backgroundColor: "var(--v4-bg-alt)" }}>
      <div className="container-page flex flex-col gap-16 py-20 sm:py-24">
        <GsapReveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading v4-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to spec your next project?
          </h2>
          <Link to="/contact" className="v4-btn v4-btn-solid">
            Talk to Our Team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>

          {submitted ? (
            <p className="v4-fg-dim text-sm">Thanks — we'll be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="v4-fg flex-1 rounded-full border bg-white px-4 py-2.5 text-sm outline-none placeholder:text-[var(--v4-fg-faint)] focus:border-[var(--v4-accent)]"
                style={{ borderColor: "var(--v4-border)" }}
              />
              <button type="submit" className="v4-btn v4-btn-solid !px-5 !py-2.5">
                Notify Me
              </button>
            </form>
          )}
        </GsapReveal>

        <div className="grid grid-cols-1 gap-10 border-t pt-12 sm:grid-cols-3" style={{ borderColor: "var(--v4-border)" }}>
          <div className="flex flex-col gap-3">
            <span className="font-heading v4-fg text-lg font-bold">{COMPANY_NAME}</span>
            <a href={`mailto:${COMPANY_EMAIL}`} className="v4-fg-dim text-sm hover:text-[var(--v4-accent)]">
              {COMPANY_EMAIL}
            </a>
            <span className="v4-fg-dim text-sm">{COMPANY_PHONE_DISPLAY}</span>
            <div className="mt-2 flex items-center gap-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border transition-colors duration-200 hover:border-[var(--v4-accent)]"
                  style={{ borderColor: "var(--v4-border)" }}
                >
                  <link.icon className="v4-fg h-4 w-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className="v4-fg-faint text-xs font-semibold tracking-[0.14em] uppercase">{col.heading}</span>
              {col.links.map((link) => (
                <Link key={link.to} to={link.to} className="v4-fg-dim text-sm hover:text-[var(--v4-accent)]">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <p className="v4-fg-faint text-center text-xs">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
