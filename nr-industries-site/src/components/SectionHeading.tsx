interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  /** Renders as h1 for page titles, h2 for section titles within a page. */
  as?: "h1" | "h2";
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as = "h2",
  light = false,
}: SectionHeadingProps) {
  const Heading = as;
  const alignClass = align === "center" ? "text-center items-center mx-auto" : "text-left items-start";

  return (
    <div className={`flex max-w-2xl flex-col gap-3 ${alignClass}`}>
      {eyebrow && (
        <span
          className={`flex items-center gap-2 text-xs font-semibold tracking-[0.18em] uppercase ${
            light ? "text-gold-400" : "text-gold-600"
          }`}
        >
          <span className={`h-px w-6 ${light ? "bg-gold-400" : "bg-gold-600"}`} aria-hidden="true" />
          {eyebrow}
        </span>
      )}
      <Heading
        className={`font-heading text-3xl font-bold tracking-tight sm:text-4xl ${
          light ? "text-white" : "text-navy-950"
        }`}
      >
        {title}
      </Heading>
      {subtitle && (
        <p className={`text-base leading-relaxed ${light ? "text-navy-100/85" : "text-ink-500"}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
}
