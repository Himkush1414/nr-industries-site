import { Phone } from "lucide-react";
import { COMPANY_PHONE_DISPLAY, buildTelLink } from "@/config/contact";
import type { ButtonVariant } from "@/components/Button";
import { Button } from "@/components/Button";
import { WhatsAppButton } from "@/components/WhatsAppButton";

interface PhoneButtonProps {
  variant?: ButtonVariant;
  className?: string;
}

/** tel: link CTA for users who prefer calling over WhatsApp. */
export function PhoneButton({ variant = "outline-on-light", className = "" }: PhoneButtonProps) {
  return (
    <Button
      href={buildTelLink()}
      variant={variant}
      className={className}
      aria-label={`Call N R Industries at ${COMPANY_PHONE_DISPLAY}`}
    >
      <Phone className="h-4 w-4" aria-hidden="true" />
      {COMPANY_PHONE_DISPLAY}
    </Button>
  );
}

interface ContactCtaGroupProps {
  productName?: string;
  className?: string;
}

/** WhatsApp + Phone CTAs paired together, per spec: every WhatsApp CTA sits next to a call option. */
export function ContactCtaGroup({ productName, className = "" }: ContactCtaGroupProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      <WhatsAppButton productName={productName} />
      <PhoneButton />
    </div>
  );
}
