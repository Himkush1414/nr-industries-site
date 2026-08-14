/**
 * Single source of truth for all contact details used across the site.
 * Update values here only — never hardcode phone/WhatsApp numbers elsewhere.
 */

// PLACEHOLDER — replace before launch
export const COMPANY_PHONE_DISPLAY = "+91 70182 88734";
// PLACEHOLDER — replace before launch (E.164 format, used in tel: links)
export const COMPANY_PHONE_TEL = "+917018288734";

// PLACEHOLDER — replace before launch (digits only, country code first, no + no spaces — wa.me format)
export const WHATSAPP_NUMBER = "917018288734";

export const COMPANY_EMAIL = "nr.industries2012@gmail.com";
export const COMPANY_WEBSITE_DISPLAY = "www.nrindustriespower.in";

export const COMPANY_ADDRESS_LINES = [
  "Vill. Rampur Banjaran, PO Dhaulakuan,",
  "Tehsil Paonta Sahib, Distt. Sirmaur,",
  "Himachal Pradesh 173031, INDIA",
] as const;

export const COMPANY_ADDRESS_FULL = COMPANY_ADDRESS_LINES.join(" ");

export const COMPANY_NAME = "N R Industries";
export const COMPANY_TAGLINE = "Power at Best";

/** Generic (non-product) WhatsApp inquiry message, used on the Contact page. */
export const WHATSAPP_GENERAL_MESSAGE =
  "Hi, I'd like to know more about N R Industries' products and services.";

/** Builds a per-product WhatsApp inquiry message, per the required template. */
export function buildProductWhatsAppMessage(productName: string): string {
  return `Hi, I'm interested in ${productName}. I found this on your website and would like to know more about pricing, specifications, and availability.`;
}

/** wa.me deep link — opens WhatsApp Web or the app automatically, pre-filled. */
export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(): string {
  return `tel:${COMPANY_PHONE_TEL}`;
}

export function buildMailtoLink(subject?: string): string {
  return subject
    ? `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${COMPANY_EMAIL}`;
}
