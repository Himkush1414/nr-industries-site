import { ArrowRight, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
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
 * In-flow sticky navigation: logo left, primary links + a CTA on the right.
 * Subtle background/shadow shift once the page is scrolled. Replaces the site's
 * own <header> (hidden via experimental.css while an experimental page is
 * mounted).
 *
 * The appointment box now lives in the fixed corner button (<AppointmentFab>),
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
      <div className="container-page flex h-[55px] items-center gap-4 py-3 sm:gap-6">
        <NavLink to="/" className="shrink-0" aria-label="N R Industries — home">
          <img src={logo} alt="N R Industries" width={440} height={138} className="h-9 w-auto lg:h-10" />
        </NavLink>

        <div className="min-w-0 flex-1" />

        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className="exp-nav-link">
              {l.label}
            </NavLink>
          ))}
        </nav>

        <NavLink to="/contact" className="exp-btn exp-btn-solid hidden shrink-0 !py-2.5 !text-[13px] lg:inline-flex">
          Get a Quote
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </NavLink>

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
            <NavLink
              to="/contact"
              onClick={() => setOpen(false)}
              className="exp-btn exp-btn-solid mt-3 justify-center"
            >
              Get a Quote
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </NavLink>
          </div>
        </div>
      )}
    </div>
  );
}
