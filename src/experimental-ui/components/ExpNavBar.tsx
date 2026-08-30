import { Menu, Phone, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { COMPANY_PHONE_DISPLAY, buildTelLink } from "@/config/contact";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import logo from "../assets/nr-logo.png";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/about", label: "About", end: false },
  { to: "/products", label: "Products", end: false },
  { to: "/specifications", label: "Specifications", end: false },
  { to: "/industries", label: "Industries", end: false },
  { to: "/contact", label: "Contact", end: false },
];

/**
 * In-flow sticky navigation: logo, centered primary links, phone + WhatsApp
 * actions — same layout pattern as the site's own <Header>, kept as its own
 * component for the scroll-triggered background/shadow shift over the hero.
 * Replaces the site's own <header> (hidden via experimental.css while an
 * experimental page is mounted).
 *
 * The appointment box lives in the fixed corner button (<AppointmentFab>),
 * not here — same modal, same pipeline, just a different trigger location.
 */
export function ExpNavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        // "once scrolled past the hero" — the hero is roughly half a viewport tall
        setScrolled(window.scrollY > window.innerHeight * 0.45);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth >= 1024) setOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <div className="exp-nav" data-scrolled={scrolled}>
      <div className="container-page flex h-[55px] items-center justify-between gap-4 py-3">
        <NavLink to="/" className="shrink-0" aria-label="N R Industries — home">
          <img src={logo} alt="N R Industries" width={440} height={138} className="h-9 w-auto lg:h-10" />
        </NavLink>

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="exp-nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={buildTelLink()}
            aria-label={`Call ${COMPANY_PHONE_DISPLAY}`}
            className="hidden h-[33px] w-[33px] items-center justify-center rounded-full border border-ink-100 text-navy-800 transition-colors duration-150 hover:border-navy-800 sm:flex"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
          <WhatsAppButton compact />

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle menu"
            className="shrink-0 exp-ink lg:hidden"
          >
            {open ? <X className="h-6 w-6" aria-hidden="true" /> : <Menu className="h-6 w-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="exp-nav-mobile lg:hidden">
          <div className="container-page flex flex-col gap-1 py-4">
            {LINKS.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className="exp-nav-link rounded-lg px-3 py-3 text-[15px]"
              >
                {l.label}
              </NavLink>
            ))}
            <div className="mt-3 flex gap-3">
              <WhatsAppButton className="flex-1" />
              <a
                href={buildTelLink()}
                className="exp-ink flex flex-1 items-center justify-center gap-2 rounded-lg border border-ink-100 px-5 py-3 text-sm font-semibold"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
