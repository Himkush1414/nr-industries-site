import { Outlet } from "react-router-dom";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { OrganizationSchema } from "@/components/OrganizationSchema";
import { ScrollToTop } from "@/components/ScrollToTop";

export function Layout() {
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
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
