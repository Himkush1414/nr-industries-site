import { COMPANY_NAME } from "@/config/contact";
import type { Product } from "@/types/content";

// TODO: swap for the real production domain once it's connected (see COMPANY_WEBSITE_DISPLAY in config/contact.ts).
const SITE_URL = "https://nrpower.in";

interface ProductSchemaProps {
  product: Product;
}

/**
 * Product structured data (JSON-LD) for a single product detail page. Deliberately
 * omits the `offers`/price block — this is a B2B, quote-on-request catalog with no
 * public pricing, and schema.org data must reflect real facts, not a placeholder price.
 */
export function ProductSchema({ product }: ProductSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.intro,
    image: product.mainImageSrc ? `${SITE_URL}${product.mainImageSrc}` : undefined,
    brand: {
      "@type": "Brand",
      name: COMPANY_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: COMPANY_NAME,
      "@id": `${SITE_URL}/#organization`,
    },
  };

  return (
    <script
      type="application/ld+json"
      // Safe to inject: built from typed Product data sourced from data/products.ts, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
