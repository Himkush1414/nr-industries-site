import { Send } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import {
  type ContactFormErrors,
  type ContactFormValues,
  validateContactForm,
} from "@/utils/contactFormValidation";

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

  function updateField(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const validationErrors = validateContactForm(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      setIsSubmitted(false);
      return;
    }

    // TODO: wire to backend/email service. For now, log the payload for verification.
    console.log("Contact form submitted:", values);

    setIsSubmitted(true);
    setValues(INITIAL_VALUES);
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

      <Button as="button" type="submit" className="self-start">
        <Send className="h-4 w-4" aria-hidden="true" />
        Send Message
      </Button>

      {isSubmitted && (
        <p role="status" className="text-sm font-medium text-navy-700">
          Thank you — your message has been received. We'll get back to you shortly.
        </p>
      )}
    </form>
  );
}
