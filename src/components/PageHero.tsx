import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
  /** Optional full-bleed background image — only pass on pages that need a photo hero. */
  backgroundImage?: string;
}

/** Standard interior-page header: navy band with a blueprint-grid texture, title, and optional description/CTAs. */
export function PageHero({
  eyebrow,
  title,
  description,
  children,
  backgroundImage,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-navy-950 py-16 sm:py-20">
      {backgroundImage ? (
        <>
          <img
            src={backgroundImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            decoding="async"
          />
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/70 to-navy-950/90"
            aria-hidden="true"
          />
          <div className="blueprint-grid pointer-events-none absolute inset-0 opacity-30" aria-hidden="true" />
        </>
      ) : (
        <div className="blueprint-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      )}

      <div className="container-page relative flex flex-col gap-4">
        <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-400 uppercase">
          <span className="h-px w-6 bg-gold-400" aria-hidden="true" />
          {eyebrow}
        </span>
        <h1 className="max-w-3xl font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-base leading-relaxed text-navy-100/85 sm:text-lg">
            {description}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
