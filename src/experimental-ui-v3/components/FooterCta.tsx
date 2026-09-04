import { Globe, Mail, Phone } from "lucide";
import { MorphIcon } from "morphicons/react";
import { type FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import {
  buildTelLink,
  COMPANY_EMAIL,
  COMPANY_GOOGLE_MAPS_URL,
  COMPANY_NAME,
  COMPANY_PHONE_DISPLAY,
} from "@/config/contact";
import { GsapReveal } from "@/experimental-ui-v3/components/GsapReveal";
import { MorphArrowLink } from "@/experimental-ui-v3/components/MorphArrowLink";

const LINK_COLUMNS = [
  {
    heading: "Company",
    links: [
      { to: "/lab/v3", label: "Home" },
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

// Neither `lucide` nor `lucide-react` ship brand/logo icons anymore (both
// dropped them), so this is real functional contact channels — the facility's
// Google Maps listing, email, and phone — with generic icons, rather than
// social-platform icons we can't actually render or profile links we'd have
// to invent.
const CONTACT_LINKS = [
  { icon: Globe, label: "Find us on Google Maps", href: COMPANY_GOOGLE_MAPS_URL },
  { icon: Mail, label: `Email ${COMPANY_EMAIL}`, href: `mailto:${COMPANY_EMAIL}` },
  { icon: Phone, label: `Call ${COMPANY_PHONE_DISPLAY}`, href: buildTelLink() },
];

/**
 * Footer CTA band — large low-opacity wordmark watermark, an email capture,
 * link columns, social icons.
 *
 * The email capture is intentionally NOT wired to the real Supabase
 * `contact_submissions` table: that table's insert path (used by the real
 * Contact form and Lab V2's AppointmentModal) requires name/phone/message
 * fields with real validation, and this repo's DB schema constraints aren't
 * visible from here — forcing an email-only submission through that path
 * risked a silent or visible failure. Instead this is an honest, self-
 * contained local acknowledgment (no network call), same as a static mockup.
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
    <footer className="relative overflow-hidden border-t" style={{ borderColor: "var(--v3-glass-border)" }}>
      <span
        aria-hidden="true"
        className="font-heading pointer-events-none absolute -bottom-[6vw] left-1/2 -translate-x-1/2 text-[18vw] leading-none font-bold whitespace-nowrap select-none"
        style={{ color: "var(--v3-fg)", opacity: 0.04 }}
      >
        {COMPANY_NAME.toUpperCase()}
      </span>

      <div className="container-page relative flex flex-col gap-16 py-20 sm:py-24">
        <GsapReveal className="mx-auto flex max-w-xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading v3-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Ready to spec your next <em className="v3-accent-text italic">project</em>?
          </h2>
          <MorphArrowLink to="/contact" variant="solid">
            Talk to Our Team
          </MorphArrowLink>

          {submitted ? (
            <p className="v3-fg-dim text-sm">Thanks — we'll be in touch.</p>
          ) : (
            <form onSubmit={handleSubmit} className="flex w-full max-w-sm items-center gap-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                aria-label="Email address"
                className="v3-border v3-fg flex-1 rounded-full border bg-white/[0.04] px-4 py-2.5 text-sm outline-none placeholder:text-[var(--v3-fg-faint)] focus:border-[var(--v3-highlight-start)]"
              />
              <button type="submit" className="v3-btn v3-btn-solid !px-5 !py-2.5">
                Notify Me
              </button>
            </form>
          )}
        </GsapReveal>

        <div className="grid grid-cols-1 gap-10 border-t pt-12 sm:grid-cols-3" style={{ borderColor: "var(--v3-glass-border)" }}>
          <div className="flex flex-col gap-3">
            <span className="font-heading v3-fg text-lg font-bold">{COMPANY_NAME}</span>
            <a href={`mailto:${COMPANY_EMAIL}`} className="v3-fg-dim text-sm hover:opacity-80">
              {COMPANY_EMAIL}
            </a>
            <span className="v3-fg-dim text-sm">{COMPANY_PHONE_DISPLAY}</span>
            <div className="mt-2 flex items-center gap-3">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("http") ? "_blank" : undefined}
                  rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={link.label}
                  className="v3-arrow-btn !h-9 !w-9"
                >
                  <MorphIcon icon={link.icon} size={15} reducedMotion="user" />
                </a>
              ))}
            </div>
          </div>

          {LINK_COLUMNS.map((col) => (
            <div key={col.heading} className="flex flex-col gap-3">
              <span className="v3-fg-faint text-xs font-semibold tracking-[0.14em] uppercase">{col.heading}</span>
              {col.links.map((link) => (
                <Link key={link.to} to={link.to} className="v3-fg-dim text-sm hover:opacity-80">
                  {link.label}
                </Link>
              ))}
            </div>
          ))}
        </div>

        <p className="v3-fg-faint text-center text-xs">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
