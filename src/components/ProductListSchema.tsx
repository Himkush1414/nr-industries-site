import type { Product } from "@/types/content";

// TODO: swap for the real production domain once it's connected (see COMPANY_WEBSITE_DISPLAY in config/contact.ts).
const SITE_URL = "https://nrpower.in";

interface ProductListSchemaProps {
  products: Product[];
}

/**
 * ItemList structured data (JSON-LD) for the Products listing page — separate
 * from ProductSchema.tsx, which describes a single product on its own detail
 * page. This just tells search engines the catalog's shape (name + URL per
 * product, in display order), letting each item's own Product schema (on its
 * detail page) carry the richer facts.
 */
export function ProductListSchema({ products }: ProductListSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: products.map((product, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/products/${product.slug}`,
      name: product.name,
    })),
  };

  return (
    <script
      type="application/ld+json"
      // Safe to inject: built from typed Product data sourced from data/products.ts, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
