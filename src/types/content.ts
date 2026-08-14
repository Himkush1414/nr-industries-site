export interface Product {
  slug: string;
  name: string;
  /** Short one-line description used on card grids (Home, Products overview). */
  cardDescription: string;
  tagline: string;
  intro: string;
  /** Label varies by product ("Power Range" vs "Voltage Range") — set per product. */
  rangeLabel: string;
  rangeValue: string;
  features: string[];
}

export interface DifferentiatorItem {
  title: string;
  description: string;
}

export interface Certification {
  code: string;
  label: string;
}

export interface IndustryItem {
  name: string;
  description: string;
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
