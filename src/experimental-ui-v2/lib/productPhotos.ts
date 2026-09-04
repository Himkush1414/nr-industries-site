import { products } from "@/data/products";

/** Real product photos, keyed by slug, for the hero/closing-CTA halftone rotations. */
function photoFor(slug: string) {
  const product = products.find((p) => p.slug === slug);
  return { src: product?.mainImageSrc ?? "", alt: product?.name ?? "" };
}

/** Split across hero + closing CTA so the two rotations don't repeat the same photos. */
export const HERO_PHOTOS = [
  photoFor("power-transformers"),
  photoFor("distribution-transformers"),
  photoFor("dry-type-transformer"),
  photoFor("compact-substation"),
].filter((p) => p.src);

export const CLOSING_PHOTOS = [
  photoFor("solar-inverter-duty-transformers"),
  photoFor("furnace-transformers"),
  photoFor("servo-voltage-stabilizer"),
  photoFor("ht-avr-transformer"),
  photoFor("ht-lt-panels"),
].filter((p) => p.src);
