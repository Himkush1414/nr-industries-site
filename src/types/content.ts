export interface Product {
  slug: string;
  name: string;
  /** Short one-line description used on card grids (Home, Products overview). */
  cardDescription: string;
  tagline: string;
  intro: string;
  /** Label varies by product ("Power Range" vs "Voltage Range") â€” set per product. */
  rangeLabel: string;
  rangeValue: string;
  features: string[];
  /** Product photo under /public/products, used in cards and the detail page's image box. */
  mainImageSrc?: string;
  /** Hero/placeholder photo under /public/products, used behind the detail page header. */
  backgroundImageSrc?: string;
}

export interface DifferentiatorItem {
  title: string;
  description: string;
  /** Path to a real photo under /public. Falls back to the placeholder if omitted. */
  imageSrc?: string;
}

export interface Certification {
  code: string;
  label: string;
  /** Path to the real logo image under /public. Omit to fall back to the icon placeholder. */
  logoSrc?: string;
}

export interface IndustryItem {
  name: string;
  description: string;
  /** Path to a real photo under /public/industries. Falls back to the icon-only treatment if omitted. */
  imageSrc?: string;
}

export interface ClientItem {
  name: string;
  logoSrc: string;
}

export interface SpecRow {
  label: string;
  value: string;
}

export interface ProductionCapacityRow {
  rating: string;
  unitsPerAnnum: string;
}

export interface AdditionalService {
  title: string;
  description: string;
}
