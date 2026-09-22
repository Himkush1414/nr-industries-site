import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header, NAV_HEIGHT } from "@/components/Header";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppointmentFab } from "@/experimental-ui/components/AppointmentFab";
// Styles for the fab + its modal only — safe to load site-wide.
import "@/experimental-ui/styles/experimental.css";

export function Layout() {
  // Header is `position: fixed` (promoted from /lab/lv9's Lv9Nav, see
  // Header.tsx's own comment) and reserves no space in normal document
  // flow on its own — unlike this component's previous `sticky` header,
  // which did. Home's hero is specifically designed to sit flush behind
  // the nav (a dark background photo, matching how LV3's hero works in
  // lab-lv9), so it gets no compensation; every other route's first
  // section has no such backdrop and would otherwise have its top content
  // hidden under the bar, so it gets `NAV_HEIGHT` of top padding here —
  // at the layout level, not by editing each page's own content, so their
  // content stays unchanged per this task's scope.
  const { pathname } = useLocation();
  const isHome = pathname === "/";

  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <OrganizationSchema />

      {/* Fixed, faint brand watermark behind all page content. Stays in place while the page scrolls. */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
      >
        <img
          src="/brand-logo.webp"
          alt=""
          className="w-[60vw] max-w-2xl opacity-[0.08]"
        />
      </div>

      <Header />
      <main className="flex-1" style={isHome ? undefined : { paddingTop: `${NAV_HEIGHT}px` }}>
        <Outlet />
      </main>
      <Footer />

      {/* Fixed circular booking button — one instance, present on every route. */}
      <AppointmentFab />
    </div>
  );
}
