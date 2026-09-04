import { lazy, Suspense } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { HomePage } from "@/pages/HomePage";

// Code-split every route except Home: Home is what most visitors land on directly, so it
// stays in the main bundle to avoid an extra request waterfall on first paint. Everything
// else is reached via in-app navigation, where a brief lazy-load is the right trade — this
// is what keeps the Supabase client (Contact only) out of the bundle every visitor pays for
// on "/".
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

// Lab V1 — archived reference copy of the real production homepage, exactly as it
// looked before the "PRODUCTION ROUTING CHANGE" task replaced it with Lab V5's
// design. Same isolation pattern as every lab below: its own folder
// (src/experimental-ui-v1/), its own route, not linked anywhere in the live nav,
// rendered outside <Layout>. Reach it directly at /lab/v1.
const ExperimentalV1HomePage = lazy(() =>
  import("@/experimental-ui-v1/pages/ExperimentalV1HomePage").then((m) => ({
    default: m.ExperimentalV1HomePage,
  })),
);

// Isolated visual experiment #2 — its own folder (src/experimental-ui-v2/), its own
// route, not linked anywhere in the live nav. Rendered outside <Layout> (it has its
// own nav bar + footer), so it shares nothing with and has zero effect on the rest
// of the site. Reach it directly at /lab/v2.
const ExperimentalV2HomePage = lazy(() =>
  import("@/experimental-ui-v2/pages/ExperimentalV2HomePage").then((m) => ({
    default: m.ExperimentalV2HomePage,
  })),
);

// Isolated visual experiment #3 — same pattern as #2 above: its own folder
// (src/experimental-ui-v3/), its own route, not linked anywhere in the live
// nav, rendered outside <Layout>. Does not touch Lab V2's files. Reach it
// directly at /lab/v3.
const ExperimentalV3HomePage = lazy(() =>
  import("@/experimental-ui-v3/pages/ExperimentalV3HomePage").then((m) => ({
    default: m.ExperimentalV3HomePage,
  })),
);

// Isolated visual experiment #4 — same pattern as #2/#3 above: its own folder
// (src/experimental-ui-v4/), its own route, not linked anywhere in the live
// nav, rendered outside <Layout>. Does not touch Lab V2 or Lab V3's files.
// Reach it directly at /lab/v4.
const ExperimentalV4HomePage = lazy(() =>
  import("@/experimental-ui-v4/pages/ExperimentalV4HomePage").then((m) => ({
    default: m.ExperimentalV4HomePage,
  })),
);

// Isolated visual experiment #5 — same pattern as #2/#3/#4 above: its own
// folder (src/experimental-ui-v5/), its own route, not linked anywhere in
// the live nav, rendered outside <Layout>. Remixes pieces read and copied
// from V2/V3/V4 and the real site, but does not modify any of them. Reach
// it directly at /lab/v5.
const ExperimentalV5HomePage = lazy(() =>
  import("@/experimental-ui-v5/pages/ExperimentalV5HomePage").then((m) => ({
    default: m.ExperimentalV5HomePage,
  })),
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
        <Route
          path="lab/v1"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ExperimentalV1HomePage />
            </Suspense>
          }
        />
        <Route
          path="lab/v2"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ExperimentalV2HomePage />
            </Suspense>
          }
        />
        <Route
          path="lab/v3"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ExperimentalV3HomePage />
            </Suspense>
          }
        />
        <Route
          path="lab/v4"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ExperimentalV4HomePage />
            </Suspense>
          }
        />
        <Route
          path="lab/v5"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ExperimentalV5HomePage />
            </Suspense>
          }
        />
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
