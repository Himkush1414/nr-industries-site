import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { supabase } from "@/lib/supabaseClient";
import {
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "@/utils/contactFormValidation";

/** Fires the Google Ads conversion event for a completed contact form submission.
 * Guarded so a slow-loading (or blocked) gtag.js never breaks the submit flow. */
function trackContactConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-18382965681/6fdFCN_PwuccELGX171E" });
  }
}

const INITIAL_VALUES: ContactFormValues = { name: "", email: "", phone: "", message: "" };

interface FieldProps {
  id: keyof ContactFormValues;
  label: string;
  type?: string;
  as?: "input" | "textarea";
  value: string;
  error?: string;
  onChange: (value: string) => void;
}

function Field({ id, label, type = "text", as = "input", value, error, onChange }: FieldProps) {
  const errorId = `${id}-error`;
  const sharedClass = `w-full rounded border px-4 py-2.5 text-sm text-navy-950 placeholder:text-ink-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 ${
    error ? "border-red-400" : "border-ink-100"
  }`;

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-navy-950">
        {label}
      </label>
      {as === "textarea" ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClass}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          className={sharedClass}
        />
      )}
      {error && (
        <p id={errorId} role="alert" className="text-xs font-medium text-red-600">
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const [values, setValues] = useState<ContactFormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);
      setSubmitError(null);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setIsSubmitted(false);

    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        message: values.message.trim(),
      });

      if (error) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }

      trackContactConversion();
      setIsSubmitted(true);
      setValues(INITIAL_VALUES);
    } catch {
      // Network failure or an unexpected thrown error — same user-facing message,
      // and the finally block below still resets isSubmitting either way.
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field
          id="name"
          label="Full Name"
          value={values.name}
          error={errors.name}
          onChange={(v) => updateField("name", v)}
        />
        <Field
          id="phone"
          label="Phone Number"
          type="tel"
          value={values.phone}
          error={errors.phone}
          onChange={(v) => updateField("phone", v)}
        />
      </div>
      <Field
        id="email"
        label="Email Address"
        type="email"
        value={values.email}
        error={errors.email}
        onChange={(v) => updateField("email", v)}
      />
      <Field
        id="message"
        label="Message"
        as="textarea"
        value={values.message}
        error={errors.message}
        onChange={(v) => updateField("message", v)}
      />

      <Button
        as="button"
        type="submit"
        disabled={isSubmitting}
        className="self-start disabled:opacity-60"
      >
        <Send className="h-4 w-4" aria-hidden="true" />
        {isSubmitting ? "Sending..." : "Send Message"}
      </Button>

      {isSubmitted && (
        <div
          role="status"
          className="flex items-start gap-3 rounded border border-green-200 bg-green-50 p-4"
        >
          <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-green-600" aria-hidden="true" />
          <p className="text-sm font-medium text-green-800">
            Thank you! We&apos;ll contact you soon.
          </p>
        </div>
      )}
      {submitError && (
        <div role="alert" className="flex items-start gap-3 rounded border border-red-200 bg-red-50 p-4">
          <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" aria-hidden="true" />
          <p className="text-sm font-medium text-red-700">{submitError}</p>
        </div>
      )}
    </form>
  );
}