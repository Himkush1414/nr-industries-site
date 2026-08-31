import {
  COMPANY_CITY,
  COMPANY_COUNTRY,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE_TEL,
  COMPANY_POSTAL_CODE,
  COMPANY_STATE,
  COMPANY_STREET_ADDRESS,
} from "@/config/contact";
import { PAGE_META } from "@/data/seo";

// TODO: swap for the real production domain once it's connected (see COMPANY_WEBSITE_DISPLAY in config/contact.ts).
const SITE_URL = "https://nrpower.in";

// Coordinates match the manufacturing facility pin used in COMPANY_GOOGLE_MAPS_EMBED_URL (config/contact.ts).
const FACILITY_LATITUDE = 30.5055095;
const FACILITY_LONGITUDE = 77.4832492;

/**
 * Sitewide Organization / LocalBusiness structured data (JSON-LD). Rendered once in
 * Layout so every page carries it — this is what lets Google build rich results
 * (logo, address, phone) for the brand itself, separate from any single page's content.
 *
 * `@type` carries both `Organization` and `LocalBusiness`: this is a real
 * manufacturing facility at a fixed address (not just a brand/holding entity),
 * and `LocalBusiness` is the schema.org type that ties address + geo
 * coordinates to local-search relevance — that's the correct, factual way to
 * strengthen local search results for a specific city/region.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": ["Organization", "LocalBusiness"],
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/brand-logo.webp`,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_STREET_ADDRESS,
      addressLocality: COMPANY_CITY,
      addressRegion: COMPANY_STATE,
      postalCode: COMPANY_POSTAL_CODE,
      addressCountry: COMPANY_COUNTRY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: FACILITY_LATITUDE,
      longitude: FACILITY_LONGITUDE,
    },
    areaServed: "IN",
    description: PAGE_META.home.description,
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output here is safe to inject: it's built entirely from typed
      // constants in config/contact.ts, never from user input or external data.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
