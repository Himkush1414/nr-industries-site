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

// Fix (Vercel build failure): Labs V2-V5 (src/experimental-ui-v2/ through
// -v5/) are gitignored and untracked on purpose — "disposable design lab
// scaffolding," explicitly required to never reach GitHub (see the commit
// that added the .gitignore rule for them). They still exist locally on
// disk, which is why `tsc -b && vite build` passed on this machine, but a
// clean clone (Vercel's build environment) has no such files, so the four
// `import("@/experimental-ui-vN/...")` calls that used to be here failed
// with TS2307 "Cannot find module" at build time — confirmed by diffing
// what's in the last pushed commit's tree (nothing under those paths)
// against what App.tsx still imported (all four). Removed those lazy
// imports and their /lab/v2-v5 routes below entirely, since the only way to
// guarantee this class of error can never recur on a future deploy is for
// the pushed source to hold zero references to paths it doesn't contain.
// The lab folders themselves are untouched — still on disk, still reachable
// by running the dev server locally and wiring a route back in temporarily
// if needed, just not part of what ships. Lab V1 (src/experimental-ui-v1/)
// is deliberately NOT part of this — it's tracked and pushed (an archived
// snapshot of the real former homepage, not throwaway scaffolding), so its
// route below is untouched.

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
