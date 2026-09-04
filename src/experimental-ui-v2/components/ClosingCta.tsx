import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { HalftonePhoto } from "@/experimental-ui-v2/components/HalftonePhoto";
import { CLOSING_PHOTOS } from "@/experimental-ui-v2/lib/productPhotos";

/** Closing section — same halftone treatment as the hero (a different photo
 * rotation, so the two sections don't repeat each other), for consistency. */
export function ClosingCta() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="flex flex-col gap-6">
          <h2 className="font-heading v2-fg text-3xl leading-tight font-bold tracking-tight sm:text-4xl">
            Ready to spec your next
            <br />
            power distribution project?
          </h2>
          <p className="v2-fg-dim max-w-md text-base leading-relaxed">
            Tell us the load, the voltage class, and the site conditions — our team will size the
            right equipment for it.
          </p>
          <Link to="/contact" className="v2-btn v2-btn-solid w-fit">
            Talk to Our Team
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>

        <Reveal delayMs={120}>
          <HalftonePhoto images={CLOSING_PHOTOS} className="aspect-[4/3] w-full" />
        </Reveal>
      </div>
    </section>
  );
}
