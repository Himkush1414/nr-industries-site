import { products } from "@/data/products";
import { TickerMarquee } from "@/components/TickerMarquee";

/** Thin scrolling product ticker on the home page — moves right → left. */
export function ProductMarquee() {
  const items = products.map((product) => product.name);

  return (
    <TickerMarquee
      className="mt-[10px]"
      items={items}
      ariaLabel="Our products"
      direction="rtl"
      variant="muted"
    />
  );
}
