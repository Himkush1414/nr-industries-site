import {
  buildProductWhatsAppMessage,
  buildWhatsAppLink,
  WHATSAPP_GENERAL_MESSAGE,
} from "@/config/contact";
import type { ButtonVariant } from "@/components/Button";
import { Button } from "@/components/Button";

interface WhatsAppButtonProps {
  /** Pass the product name to pre-fill a product-specific inquiry; omit for a general inquiry. */
  productName?: string;
  variant?: ButtonVariant;
  className?: string;
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.28-1.38a9.9 9.9 0 0 0 4.71 1.2h.01c5.46 0 9.9-4.45 9.9-9.91C21.95 6.45 17.5 2 12.04 2Zm5.8 14.02c-.24.68-1.4 1.31-1.93 1.35-.5.05-1 .24-3.36-.7-2.85-1.14-4.68-4.02-4.82-4.2-.14-.19-1.16-1.55-1.16-2.95 0-1.4.73-2.09 1-2.38.24-.26.53-.33.7-.33.18 0 .35 0 .5.01.17.01.38-.06.6.45.24.56.8 1.96.87 2.1.07.15.12.32.02.51-.1.19-.15.31-.3.48-.15.17-.31.38-.45.5-.15.15-.3.31-.13.6.17.3.75 1.24 1.62 2 1.11.99 2.05 1.3 2.35 1.45.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.24.68-.15.28.1 1.78.84 2.08.99.3.15.5.23.58.35.08.13.08.72-.15 1.4Z" />
    </svg>
  );
}

/** Opens WhatsApp (web or app, auto-detected) with the inquiry message already filled in. */
export function WhatsAppButton({
  productName,
  variant = "whatsapp",
  className = "",
}: WhatsAppButtonProps) {
  const message = productName
    ? buildProductWhatsAppMessage(productName)
    : WHATSAPP_GENERAL_MESSAGE;

  return (
    <Button
      href={buildWhatsAppLink(message)}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      className={className}
      aria-label={
        productName ? `Enquire about ${productName} on WhatsApp` : "Chat with us on WhatsApp"
      }
    >
      <WhatsAppIcon />
      WhatsApp Us
    </Button>
  );
}
