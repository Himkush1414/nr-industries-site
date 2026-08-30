import { RevealBlock } from "./RevealBlock";
import { RevealText } from "./RevealText";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  as?: "h1" | "h2";
}

/**
 * Section header: a monospace tracked-out eyebrow, a confident display title
 * (word-stagger reveal preserved from the working motion system), and an
 * optional supporting line.
 */
export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  as = "h2",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const Heading = as;

  return (
    <div
      className={`flex max-w-2xl flex-col gap-4 ${
        isCenter ? "mx-auto items-center text-center" : "items-start text-left"
      }`}
    >
      <RevealBlock direction={isCenter ? "up" : "left"} className="flex items-center gap-2.5">
        <span className="exp-fill-accent h-1.5 w-1.5 rounded-full" aria-hidden="true" />
        <span className="exp-eyebrow">{eyebrow}</span>
      </RevealBlock>

      <Heading className="exp-display exp-display-lg">
        <RevealText text={title} delayMs={80} />
      </Heading>

      {subtitle && (
        <RevealBlock delayMs={200} className="exp-body-lg max-w-xl">
          <p>{subtitle}</p>
        </RevealBlock>
      )}
    </div>
  );
}
