import { useEffect, useState } from "react";

/**
 * Panel 4 of the new full-screen section — a simple product image
 * showcase: each product holds still for 7s, then slides out to the left
 * and vanishes, and the next product appears (statically, no slide-in).
 * No pixel/tile transition — plain CSS transform, clipped by this
 * component's own container so the slide-out motion never crosses into
 * panel 3 (the container in Lv4Page.tsx already has overflow-hidden and
 * is bounded exactly to panel 4's column).
 */

// Real product photography (shared static assets, public/products/ — same
// ones the main site's Products pages use), matching the site's actual core
// product line.
const PRODUCTS = [
  { name: "Power Transformers", image: "/products/power-transformers-main.webp" },
  { name: "Distribution Transformers", image: "/products/distribution-transformers-main.webp" },
  { name: "Compact Substations", image: "/products/compact-substation-main.webp" },
  { name: "HT & LT Panels", image: "/products/ht-lt-panels-main.webp" },
];

const STATIC_DURATION_MS = 7000;
const SLIDE_DURATION_MS = 700;

// This panel's background is uniformly this page's own light/cream matte
// tone (never a dark region), so the images are tinted toward it. A CSS
// `filter` (not a separate overlay <div>) is applied per-pixel to the
// image's own RGB and leaves its alpha channel untouched, so these
// transparent product PNGs/WEBPs stay transparent with no solid box behind
// them.
const PRODUCT_TINT_FILTER = "grayscale(75%) sepia(30%) brightness(1.05) contrast(0.9)";

export function ProductShowcase() {
  const [index, setIndex] = useState(0);
  const [sliding, setSliding] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let staticTimer = 0;
    let slideTimer = 0;

    function scheduleStatic() {
      staticTimer = window.setTimeout(() => {
        if (reducedMotion) {
          setIndex((i) => (i + 1) % PRODUCTS.length);
          scheduleStatic();
          return;
        }
        setSliding(true);
        slideTimer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % PRODUCTS.length);
          setSliding(false);
          scheduleStatic();
        }, SLIDE_DURATION_MS);
      }, STATIC_DURATION_MS);
    }

    scheduleStatic();
    return () => {
      window.clearTimeout(staticTimer);
      window.clearTimeout(slideTimer);
    };
  }, []);

  const product = PRODUCTS[index % PRODUCTS.length]!;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <img
        key={index}
        src={product.image}
        alt={product.name}
        loading="lazy"
        className="absolute inset-0 h-full w-full"
        style={{
          objectFit: "contain",
          filter: PRODUCT_TINT_FILTER,
          transform: sliding ? "translateX(-100%)" : "translateX(0)",
          transition: `transform ${SLIDE_DURATION_MS}ms ease-in`,
        }}
      />
    </div>
  );
}
