/**
 * Single source of truth for all contact details used across the site.
 * Update values here only — never hardcode phone/WhatsApp numbers elsewhere.
 */

// PLACEHOLDER — replace before launch
export const COMPANY_PHONE_DISPLAY = "+91 88942 25597";
export const COMPANY_PHONE_DISPLAY_2 = "+91 80919 30019";
// PLACEHOLDER — replace before launch (E.164 format, used in tel: links)
export const COMPANY_PHONE_TEL = "+91 88942 25597";
export const COMPANY_PHONE_TEL_2 = "+91 80919 30019";

// PLACEHOLDER — replace before launch (digits only, country code first, no + no spaces — wa.me format)
export const WHATSAPP_NUMBER = "+917018288734";
/** Second WhatsApp number — used only for the bottom-right appointment-form redirect, distinct from WHATSAPP_NUMBER above. */
export const WHATSAPP_NUMBER_2 = "+918091930019";

export const COMPANY_EMAIL = "info@nrenergy.in";
export const COMPANY_WEBSITE_DISPLAY = "nrpower.in";

export const COMPANY_ADDRESS_LINES = [
  "Vill. Rampur Banjaran, PO Dhaulakuan,",
  "Tehsil Paonta Sahib, Distt. Sirmaur,",
  "Himachal Pradesh 173031, INDIA",
] as const;

export const COMPANY_ADDRESS_FULL = COMPANY_ADDRESS_LINES.join(" ");

/** Google Maps listing for the manufacturing facility. */
export const COMPANY_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/place/NR+INDUSTRIES+-+TRANSFORMER+MANUFACTURER+,+REPAIR+AND+EXPORTER/@30.5055141,77.4806743,17z/data=!3m1!4b1!4m6!3m5!1s0x390f173aea4c0577:0x26aab691ade277bb!8m2!3d30.5055095!4d77.4832492!16s%2Fg%2F11bxc5dfkd?entry=ttu";

/** Embed URL for the contact page map — uses the same place coordinates. */
export const COMPANY_GOOGLE_MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=30.5055095,77.4832492&z=17&hl=en&output=embed";

export const COMPANY_NAME = "NR Industries";
export const COMPANY_TAGLINE = "Power at Best";

/** Generic (non-product) WhatsApp inquiry message, used on the Contact page. */
export const WHATSAPP_GENERAL_MESSAGE =
  "Hi, I'd like to know more about N R Industries' products and services.";

/** Builds a per-product WhatsApp inquiry message, per the required template. */
export function buildProductWhatsAppMessage(productName: string): string {
  return `Hi, I'm interested in ${productName}. I found this on your website and would like to know more about pricing, specifications, and availability.`;
}

/** Builds the pre-filled WhatsApp message from the appointment form's fields. */
export function buildAppointmentWhatsAppMessage({
  name,
  phone,
  message,
}: {
  name: string;
  phone: string;
  message: string;
}): string {
  return `Hi, I'd like to book an appointment.\nName: ${name}\nPhone: ${phone}\nMessage: ${message}`;
}

/** wa.me deep link — opens WhatsApp Web or the app automatically, pre-filled. */
export function buildWhatsAppLink(message: string, number: string = WHATSAPP_NUMBER): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function buildTelLink(number: string = COMPANY_PHONE_TEL): string {
  return `tel:${number}`;
}

export function buildMailtoLink(subject?: string): string {
  return subject
    ? `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}`
    : `mailto:${COMPANY_EMAIL}`;
}
