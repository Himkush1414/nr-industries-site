import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_NAME,
  COMPANY_PHONE_TEL,
} from "@/config/contact";

// TODO: swap for the real production domain once it's connected (see COMPANY_WEBSITE_DISPLAY in config/contact.ts).
const SITE_URL = "https://www.nrindustriespower.in";

// Coordinates match the manufacturing facility pin used in COMPANY_GOOGLE_MAPS_EMBED_URL (config/contact.ts).
const FACILITY_LATITUDE = 30.5055095;
const FACILITY_LONGITUDE = 77.4832492;

/**
 * Sitewide Organization / LocalBusiness structured data (JSON-LD). Rendered once in
 * Layout so every page carries it — this is what lets Google build rich results
 * (logo, address, phone) for the brand itself, separate from any single page's content.
 */
export function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: COMPANY_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.webp`,
    image: `${SITE_URL}/brand-logo.webp`,
    email: COMPANY_EMAIL,
    telephone: COMPANY_PHONE_TEL,
    address: {
      "@type": "PostalAddress",
      streetAddress: COMPANY_ADDRESS_LINES[0],
      addressLocality: "Paonta Sahib, Sirmaur",
      addressRegion: "Himachal Pradesh",
      postalCode: "173031",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: FACILITY_LATITUDE,
      longitude: FACILITY_LONGITUDE,
    },
    description:
      "N R Industries manufactures Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations and HT & LT Panels from Himachal Pradesh, India.",
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
