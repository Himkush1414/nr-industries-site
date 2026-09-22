import { Outlet, useLocation } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { HomeHeader } from "@/components/HomeHeader";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { ScrollToTop } from "@/components/ScrollToTop";
import { AppointmentFab } from "@/experimental-ui/components/AppointmentFab";
// Styles for the fab + its modal only — safe to load site-wide.
import "@/experimental-ui/styles/experimental.css";

export function Layout() {
  // Home uses its own fixed/transparent HomeHeader — its hero is designed
  // to sit flush behind that bar (a dark background photo), so <main> gets
  // no top padding there. Every other route uses the original, restored
  // Header (`sticky`, reserves its own space in normal document flow), so
  // no manual compensation is needed there either.
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

      {isHome ? <HomeHeader /> : <Header />}
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />

      {/* Fixed circular booking button — one instance, present on every route. */}
      <AppointmentFab />
    </div>
  );
}
