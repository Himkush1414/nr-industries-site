import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { useInView } from "@/hooks/useInView";

interface FeatureRowProps {
  eyebrow?: string;
  title: string;
  description: string;
  imageLabel: string;
  /** Real photo path under /public. Falls back to the placeholder if omitted. */
  imageSrc?: string;
  /** When true, image sits on the right instead of the left. */
  reverse?: boolean;
  children?: ReactNode;
}

export function FeatureRow({
  eyebrow,
  title,
  description,
  imageLabel,
  imageSrc,
  reverse = false,
  children,
}: FeatureRowProps) {
  const { ref, isInView } = useInView<HTMLDivElement>(0.25);

  return (
    <div
      ref={ref}
      className={`grid items-center gap-10 transition-all duration-700 ease-out lg:grid-cols-2 lg:gap-16 ${
        isInView
          ? "translate-y-0 opacity-100"
          : "translate-y-6 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      }`}
    >
      <div className={reverse ? "lg:order-2" : ""}>
        <ImagePlaceholder label={imageLabel} aspectRatio="video" className="rounded" src={imageSrc} />
      </div>
      <div className={`flex flex-col gap-4 ${reverse ? "lg:order-1" : ""}`}>
        {eyebrow && (
          <span className="flex items-center gap-2 text-xs font-semibold tracking-[0.18em] text-gold-600 uppercase">
            <span className="h-px w-6 bg-gold-600" aria-hidden="true" />
            {eyebrow}
          </span>
        )}
        <div className="inline-block">
          <h3
            className={`font-heading text-2xl font-bold text-navy-950 transition-all duration-700 ease-out ${
              isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
            }`}
          >
            {title}
          </h3>
          {/* Accent underline draws in just after the heading settles. */}
          <span
            aria-hidden="true"
            className={`mt-2 block h-[3px] w-12 origin-left rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-transform delay-200 duration-500 ease-out ${
              isInView ? "scale-x-100" : "scale-x-0"
            }`}
          />
        </div>
        <p
          className={`text-base leading-relaxed text-ink-500 transition-all delay-150 duration-700 ease-out ${
            isInView ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
          }`}
        >
          {description}
        </p>
        {children}
      </div>
    </div>
  );
}