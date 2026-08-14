export interface ContactFormValues {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export type ContactFormErrors = Partial<Record<keyof ContactFormValues, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
// Accepts optional +, spaces, hyphens; requires at least 7 digits.
const PHONE_PATTERN = /^[+\d][\d\s-]{6,}$/;

export function validateContactForm(values: ContactFormValues): ContactFormErrors {
  const errors: ContactFormErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  } else if (values.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters.";
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }

  if (!values.phone.trim()) {
    errors.phone = "Please enter your phone number.";
  } else if (!PHONE_PATTERN.test(values.phone.trim())) {
    errors.phone = "Please enter a valid phone number.";
  }

  if (!values.message.trim()) {
    errors.message = "Please enter a message.";
  } else if (values.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters.";
  }

  return errors;
}
