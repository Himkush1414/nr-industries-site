import type { ReactNode } from "react";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { Reveal } from "@/components/Reveal";

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
  return (
    <Reveal className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
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
        <h3 className="font-heading text-2xl font-bold text-navy-950">{title}</h3>
        <p className="text-base leading-relaxed text-ink-500">{description}</p>
        {children}
      </div>
    </Reveal>
  );
}