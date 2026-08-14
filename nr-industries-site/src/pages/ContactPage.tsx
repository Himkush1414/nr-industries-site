import { Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import {
  COMPANY_ADDRESS_LINES,
  COMPANY_EMAIL,
  COMPANY_PHONE_DISPLAY,
  buildMailtoLink,
  buildTelLink,
} from "@/config/contact";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";

export function ContactPage() {
  useDocumentMeta(
    "Contact Us",
    "Get in touch with N R Industries — Vill. Rampur Banjaran, Dhaulakuan, Sirmaur, Himachal Pradesh. Call, WhatsApp, or send us a message.",
  );

  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        title="Get in touch"
        description="For pricing, specifications, or project consultation — reach us directly or send a message below."
      />

      <section className="py-16 sm:py-20">
        <div className="container-page grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Contact details */}
          <Reveal className="flex flex-col gap-8">
            <div className="flex flex-col gap-5">
              <div className="flex items-start gap-4 rounded border border-ink-100 bg-white p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-navy-950">
                  <MapPin className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-950">Address</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink-500">
                    {COMPANY_ADDRESS_LINES.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </p>
                </div>
              </div>

              <a
                href={buildTelLink()}
                className="flex items-start gap-4 rounded border border-ink-100 bg-white p-5 transition-colors duration-150 hover:border-navy-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-navy-950">
                  <Phone className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-950">Phone</h3>
                  <p className="mt-1 text-sm text-ink-500">{COMPANY_PHONE_DISPLAY}</p>
                </div>
              </a>

              <a
                href={buildMailtoLink("Website Inquiry")}
                className="flex items-start gap-4 rounded border border-ink-100 bg-white p-5 transition-colors duration-150 hover:border-navy-300"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-navy-950">
                  <Mail className="h-5 w-5 text-gold-400" aria-hidden="true" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-navy-950">Email</h3>
                  <p className="mt-1 text-sm text-ink-500">{COMPANY_EMAIL}</p>
                </div>
              </a>
            </div>

            <div className="flex flex-col gap-3 rounded border border-ink-100 bg-navy-50 p-5">
              <h3 className="text-sm font-semibold text-navy-950">Prefer WhatsApp?</h3>
              <p className="text-sm text-ink-500">
                Send us a message directly and we'll respond as soon as possible.
              </p>
              <WhatsAppButton className="self-start" />
            </div>

            {/* PLACEHOLDER: embed Google Maps iframe with actual coordinates for Vill. Rampur Banjaran, PO Dhaulakuan, Sirmaur, HP */}
            <ImagePlaceholder
              label="Google Maps — Vill. Rampur Banjaran, Dhaulakuan, Sirmaur, HP"
              aspectRatio="video"
              className="rounded"
            />
          </Reveal>

          {/* Form */}
          <Reveal className="rounded border border-ink-100 bg-white p-6 sm:p-8">
            <h2 className="font-heading text-2xl font-bold text-navy-950">Send a Message</h2>
            <p className="mt-2 text-sm text-ink-500">
              Fill out the form and our team will get back to you.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
