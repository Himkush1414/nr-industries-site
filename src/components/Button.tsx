import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

export type ButtonVariant =
  | "primary"
  | "primary-on-dark"
  | "outline-on-dark"
  | "outline-on-light"
  | "whatsapp"
  | "ghost";

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: "bg-navy-800 text-white hover:bg-navy-700",
  "primary-on-dark": "bg-gold-500 text-navy-950 hover:bg-gold-400",
  "outline-on-dark": "border border-white/35 text-white hover:bg-white/10",
  "outline-on-light": "border border-navy-800 text-navy-800 hover:bg-navy-800 hover:text-white",
  whatsapp: "bg-[#25D366] text-white hover:bg-[#1FB959]",
  ghost: "text-navy-800 hover:bg-navy-50",
};

const BASE_CLASS =
  "inline-flex items-center justify-center gap-2 rounded px-5 py-3 text-sm font-semibold tracking-wide transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600";

interface CommonProps {
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
}

type ButtonAsAnchor = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { as?: "a" };
type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { as: "button" };

type ButtonProps = ButtonAsAnchor | ButtonAsButton;

/** Shared CTA primitive. Renders an <a> by default (href required for real navigation), or a <button> when as="button". */
export function Button(props: ButtonProps) {
  const { variant = "primary", className = "", children } = props;
  const classes = `${BASE_CLASS} ${VARIANT_CLASS[variant]} ${className}`;

  if (props.as === "button") {
    const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
    return (
      <button className={classes} {...rest}>
        {children}
      </button>
    );
  }

  const { as: _as, variant: _v, className: _c, children: _ch, ...rest } = props;
  return (
    <a className={classes} {...rest}>
      {children}
    </a>
  );
}
