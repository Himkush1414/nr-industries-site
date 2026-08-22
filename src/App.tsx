import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";

// Code-split every route except Home: Home is what most visitors land on directly, so it
// stays in the main bundle to avoid an extra request waterfall on first paint. Everything
// else is reached via in-app navigation, where a brief lazy-load is the right trade — this
// is what keeps recharts (Specifications only) and the Supabase client (Contact only) out
// of the bundle every visitor pays for on "/".
const AboutPage = lazy(() => import("@/pages/AboutPage").then((m) => ({ default: m.AboutPage })));
const ContactPage = lazy(() =>
  import("@/pages/ContactPage").then((m) => ({ default: m.ContactPage })),
);
const IndustriesPage = lazy(() =>
  import("@/pages/IndustriesPage").then((m) => ({ default: m.IndustriesPage })),
);
const NotFoundPage = lazy(() =>
  import("@/pages/NotFoundPage").then((m) => ({ default: m.NotFoundPage })),
);
const ProductDetailPage = lazy(() =>
  import("@/pages/ProductDetailPage").then((m) => ({ default: m.ProductDetailPage })),
);
const ProductsPage = lazy(() =>
  import("@/pages/ProductsPage").then((m) => ({ default: m.ProductsPage })),
);
const SpecificationsPage = lazy(() =>
  import("@/pages/SpecificationsPage").then((m) => ({ default: m.SpecificationsPage })),
);

/** Minimal, layout-neutral fallback — avoids a flash of empty white or a jarring spinner
 * while a route chunk loads (typically well under 200ms on a reasonable connection). */
function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" aria-hidden="true">
      <div className="h-8 w-8 animate-spin rounded-full border-2 border-navy-200 border-t-navy-800" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route
            path="about"
            element={
              <Suspense fallback={<RouteFallback />}>
                <AboutPage />
              </Suspense>
            }
          />
          <Route
            path="products"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ProductsPage />
              </Suspense>
            }
          />
          <Route
            path="products/:slug"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ProductDetailPage />
              </Suspense>
            }
          />
          <Route
            path="specifications"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SpecificationsPage />
              </Suspense>
            }
          />
          <Route
            path="industries"
            element={
              <Suspense fallback={<RouteFallback />}>
                <IndustriesPage />
              </Suspense>
            }
          />
          <Route
            path="contact"
            element={
              <Suspense fallback={<RouteFallback />}>
                <ContactPage />
              </Suspense>
            }
          />
          <Route
            path="*"
            element={
              <Suspense fallback={<RouteFallback />}>
                <NotFoundPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}
