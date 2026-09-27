import { useEffect, useState } from "react";

/**
 * /lab/lv16 — single-photo showcase for the "grid doesn't forgive shortcuts"
 * panel ONLY: each product holds still, then blurs + fades out, the next
 * photo is swapped in already blurred/transparent, and it blurs + fades back
 * to sharp/opaque. Deliberately a distinct component from any slide-based
 * showcase elsewhere — this blur-crossfade behavior must not leak into any
 * other section.
 */

const PRODUCTS = [
  { name: "Power Transformers", image: "/products/power-transformers-main.webp" },
  { name: "Distribution Transformers", image: "/products/distribution-transformers-main.webp" },
  { name: "Compact Substations", image: "/products/compact-substation-main.webp" },
  { name: "HT & LT Panels", image: "/products/ht-lt-panels-main.webp" },
];

const STATIC_DURATION_MS = 3500;
const BLUR_DURATION_MS = 650;

export function BlurPhotoShowcase() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let staticTimer = 0;
    let swapTimer = 0;

    function scheduleStatic() {
      staticTimer = window.setTimeout(() => {
        if (reducedMotion) {
          setIndex((i) => (i + 1) % PRODUCTS.length);
          scheduleStatic();
          return;
        }
        setVisible(false); // start blur-out
        swapTimer = window.setTimeout(() => {
          setIndex((i) => (i + 1) % PRODUCTS.length);
          // Next paint: swap happens while still blurred/transparent, then
          // flip back to visible so it blurs back in on the new photo.
          requestAnimationFrame(() => {
            requestAnimationFrame(() => setVisible(true));
          });
          scheduleStatic();
        }, BLUR_DURATION_MS);
      }, STATIC_DURATION_MS);
    }

    scheduleStatic();
    return () => {
      window.clearTimeout(staticTimer);
      window.clearTimeout(swapTimer);
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
          filter: visible ? "blur(0px)" : "blur(16px)",
          opacity: visible ? 1 : 0,
          transition: `filter ${BLUR_DURATION_MS}ms ease, opacity ${BLUR_DURATION_MS}ms ease`,
        }}
      />
    </div>
  );
}
