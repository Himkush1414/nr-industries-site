import { X } from "lucide-react";
import { type FormEvent, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  buildAppointmentWhatsAppMessage,
  buildWhatsAppLink,
  COMPANY_NAME,
  WHATSAPP_NUMBER_2,
} from "@/config/contact";
import { supabase } from "@/lib/supabaseClient";
import { validateContactForm } from "@/utils/contactFormValidation";
import logo from "../assets/nr-logo.png";

/**
 * Appointment / inquiry modal opened from the nav's waveform badge.
 *
 * Submission reuses the Contact page's exact pipeline: the shared
 * `validateContactForm` validator, an insert into the same Supabase
 * `contact_submissions` table with the same column shape, and the same Google
 * Ads conversion event. No new backend, table, or handler. On success it also
 * opens a wa.me link (new tab) pre-filled with the submitted details, to
 * WHATSAPP_NUMBER_2 — a different number from the header's WhatsAppButton,
 * which stays on WHATSAPP_NUMBER and is untouched by this.
 */

/** Same conversion event the Contact form fires on a completed submission. */
function trackConversion() {
  if (typeof window.gtag === "function") {
    window.gtag("event", "conversion", { send_to: "AW-18382965681/6fdFCN_PwuccELGX171E" });
  }
}

type Values = { name: string; phone: string; message: string };
const EMPTY: Values = { name: "", phone: "", message: "" };

/** Mounted only while the modal is open (the nav owns that state), so this
 * component and its Supabase dependency are lazy-loaded on first open. */
function AppointmentModal({ onClose }: { onClose: () => void }) {
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const returnFocusTo = document.activeElement as HTMLElement | null;
    dialogRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      returnFocusTo?.focus?.();
    };
  }, [onClose]);

  const update = (field: keyof Values, v: string) => {
    setValues((p) => ({ ...p, [field]: v }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: undefined }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Shared validator — this box collects no email, so pass a value that clears
    // that check and keep the name / phone / message rules the Contact form uses.
    const all = validateContactForm({ ...values, email: "appointment@nrindustries.internal" });
    const errs: Partial<Record<keyof Values, string>> = {};
    if (all.name) errs.name = all.name;
    if (all.phone) errs.phone = all.phone;
    if (all.message) errs.message = all.message;
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      const { error } = await supabase.from("contact_submissions").insert({
        name: values.name.trim(),
        email: "",
        phone: values.phone.trim(),
        message: values.message.trim(),
      });
      if (error) {
        setSubmitError("Something went wrong. Please try again.");
        return;
      }
      trackConversion();

      // Hand off to WhatsApp with the submitted details pre-filled — a
      // distinct number from the header's WhatsAppButton (WHATSAPP_NUMBER).
      const waMessage = buildAppointmentWhatsAppMessage(values);
      window.open(buildWhatsAppLink(waMessage, WHATSAPP_NUMBER_2), "_blank", "noopener,noreferrer");

      setSubmitted(true);
      setValues(EMPTY);
    } catch {
      setSubmitError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return createPortal(
    <>
      <div className="exp-modal-backdrop" onClick={onClose} />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="exp-appt-title"
        tabIndex={-1}
        className="exp-modal"
      >
        <button type="button" onClick={onClose} aria-label="Close" className="exp-modal-close">
          <X className="h-4 w-4" aria-hidden="true" />
        </button>

        <div className="exp-modal-head">
          <img src={logo} alt={COMPANY_NAME} width={440} height={138} className="exp-modal-logo" />
          <h2 id="exp-appt-title" className="exp-modal-title">
            Book an Appointment
          </h2>
          <p className="exp-modal-sub">
            Share your details and we&apos;ll get back to you as soon as possible.
          </p>
        </div>

        {submitted ? (
          <div className="exp-modal-done" role="status">
            <p>Thank you — your appointment request is in. Our team will be in touch shortly.</p>
            <button type="button" onClick={onClose} className="exp-modal-submit">
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="exp-modal-form">
            <ModalField
              id="name"
              label="Name"
              value={values.name}
              error={errors.name}
              onChange={(v) => update("name", v)}
            />
            <ModalField
              id="phone"
              label="Phone Number"
              type="tel"
              value={values.phone}
              error={errors.phone}
              onChange={(v) => update("phone", v)}
            />
            <ModalField
              id="message"
              label="Message"
              textarea
              value={values.message}
              error={errors.message}
              onChange={(v) => update("message", v)}
            />
            {submitError && (
              <p className="exp-modal-err" role="alert">
                {submitError}
              </p>
            )}
            <button type="submit" disabled={submitting} className="exp-modal-submit">
              {submitting ? "Submitting…" : "Apply for Appointment"}
            </button>
          </form>
        )}
      </div>
    </>,
    document.body,
  );
}

function ModalField({
  id,
  label,
  type = "text",
  textarea = false,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  textarea?: boolean;
  value: string;
  error?: string;
  onChange: (v: string) => void;
}) {
  const fid = `exp-appt-${id}`;
  const eid = `${fid}-error`;
  return (
    <div className="exp-modal-field">
      <label htmlFor={fid} className="exp-modal-label">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={fid}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? eid : undefined}
          className={error ? "is-error" : undefined}
        />
      ) : (
        <input
          id={fid}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? eid : undefined}
          className={error ? "is-error" : undefined}
        />
      )}
      {error && (
        <span id={eid} className="exp-modal-fielderr" role="alert">
          {error}
        </span>
      )}
    </div>
  );
}

export default AppointmentModal;
