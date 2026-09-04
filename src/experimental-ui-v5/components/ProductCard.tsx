import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import type { Product } from "@/types/content";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/products/${product.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded border border-ink-100 bg-white shadow-md shadow-navy-900/5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-navy-900/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600"
    >
      <ImagePlaceholder
        label={product.name}
        aspectRatio="video"
        src={product.mainImageSrc}
        fit="contain"
        className="h-56 shrink-0"
      />
      <div className="flex flex-1 flex-col gap-2 p-5">
        <h3 className="font-heading text-lg font-bold text-navy-950">{product.name}</h3>
        <p className="flex-1 text-sm leading-relaxed text-ink-500">{product.cardDescription}</p>
        <span className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-700 group-hover:text-gold-600">
          View Details
          <ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
        </span>
      </div>
    </Link>
  );
}
