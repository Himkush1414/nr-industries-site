import { CheckCircle2 } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ContactCtaGroup } from "@/components/PhoneButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { ProductCard } from "@/components/ProductCard";
import { Reveal } from "@/components/Reveal";
import { getProductBySlug, products } from "@/data/products";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const product = slug ? getProductBySlug(slug) : undefined;

  // Hooks must run unconditionally — meta falls back to safe defaults when product is missing,
  // and the redirect below fires after render.
  useDocumentMeta(
    product?.name ?? "Product Not Found",
    product
      ? `${product.tagline}. ${product.rangeLabel}: ${product.rangeValue}.`
      : "The requested product could not be found.",
  );

  if (!product) {
    return <Navigate to="/products" replace />;
  }

  const relatedProducts = products.filter((p) => p.slug !== product.slug).slice(0, 3);

  return (
    <>
      {/* Header */}
      <section
        className="blueprint-grid relative overflow-hidden bg-navy-950 py-16 sm:py-20"
        style={
          product.backgroundImageSrc
            ? {
                backgroundImage: `linear-gradient(to bottom, rgba(6,15,31,0.75), rgba(6,15,31,0.92)), url('${product.backgroundImageSrc}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }
            : undefined
        }
      >
        <div className="container-page relative flex flex-col gap-4">
          <nav aria-label="Breadcrumb" className="text-xs text-navy-100/60">
            <Link to="/products" className="hover:text-gold-400">
              Products
            </Link>
            <span className="mx-2" aria-hidden="true">
              /
            </span>
            <span className="text-navy-100/85">{product.name}</span>
          </nav>
          <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
            {product.name}
          </h1>
          <p className="max-w-2xl text-base leading-relaxed text-gold-400 sm:text-lg">
            {product.tagline}
          </p>
        </div>
      </section>

      {/* Intro + image */}
      <section className="py-16 sm:py-20">
        <div className="container-page grid items-start gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <ImagePlaceholder
              label={product.name}
              aspectRatio="video"
              className="rounded"
              src={product.mainImageSrc}
            />
          </Reveal>
          <Reveal className="flex flex-col gap-6">
            <p className="text-base leading-relaxed text-ink-500">{product.intro}</p>

            <div className="flex flex-col gap-1 rounded border border-navy-100 bg-navy-50 px-5 py-4">
              <span className="text-xs font-semibold tracking-wide text-navy-600 uppercase">
                {product.rangeLabel}
              </span>
              <span className="font-heading text-lg font-bold text-navy-950">
                {product.rangeValue}
              </span>
            </div>

            <ContactCtaGroup productName={product.name} />
          </Reveal>
        </div>
      </section>

      {/* Features */}
      {product.features.length > 0 && (
        <section className="bg-navy-50 py-16 sm:py-20">
          <div className="container-page flex flex-col gap-10">
            <Reveal>
              <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
                Key Features
              </h2>
            </Reveal>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {product.features.map((feature, i) => (
                <Reveal key={feature} delayMs={i * 40}>
                  <div className="flex items-start gap-3 rounded border border-ink-100 bg-white p-5">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" aria-hidden="true" />
                    <span className="text-sm leading-relaxed text-ink-700">{feature}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related products */}
      <section className="py-16 sm:py-20">
        <div className="container-page flex flex-col gap-10">
          <Reveal>
            <h2 className="font-heading text-2xl font-bold text-navy-950 sm:text-3xl">
              Explore Other Products
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {relatedProducts.map((related, i) => (
              <Reveal key={related.slug} delayMs={i * 40}>
                <ProductCard product={related} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}