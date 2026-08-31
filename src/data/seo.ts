/**
 * Single source of truth for every static page's <title>/description. Kept
 * separate from the page components so copy can be edited here without
 * touching JSX. Product detail pages are the one exception — their
 * title/description are derived dynamically from `data/products.ts` (already
 * centralized there), not listed here.
 */

export interface PageMeta {
  title: string;
  description: string;
}

export const PAGE_META = {
  home: {
    title: "N R Industries",
    description:
      "N R Industries manufactures Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations and HT & LT Panels from Himachal Pradesh, India.",
  },
  about: {
    title: "About Us",
    description:
      "Learn about N R Industries — our vision, infrastructure, and why industrial and commercial clients across India choose our power distribution equipment.",
  },
  products: {
    title: "Products",
    description:
      "Explore N R Industries' full range: Power, Distribution, Furnace, Dry Type & Solar Inverter Duty Transformers, Servo Voltage Stabilizers, Compact Substations, and HT & LT Panels.",
  },
  specifications: {
    title: "Technical Specifications",
    description:
      "Technical specifications and annual production capacity for N R Industries' transformer range — rating, cooling, vector group, tap changer, and more.",
  },
  industries: {
    title: "Industries We Serve",
    description:
      "N R Industries powers 15+ sectors — from food, paper, and textile manufacturing to solar power plants, refineries, and hydro projects.",
  },
  contact: {
    title: "Contact Us",
    description:
      "Get in touch with N R Industries - Vill. Rampur Banjaran, Dhaulakuan, Sirmaur, Himachal Pradesh. Call, WhatsApp, or send us a message.",
  },
  notFound: {
    title: "Page Not Found",
    description: "The page you're looking for doesn't exist.",
  },
} as const satisfies Record<string, PageMeta>;
