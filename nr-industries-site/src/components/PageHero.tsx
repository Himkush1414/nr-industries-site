import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

/** Standard interior-page header: navy band with a blueprint-grid texture, title, and optional description/CTAs. */
export function PageHero({ eyebrow, title, description, children }: PageHeroProps) {
  return (
    <section className="blueprint-grid relative overflow-hidden bg-navy-950 py-16 sm:py-20">
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
