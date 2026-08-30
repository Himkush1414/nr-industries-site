import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CurvedPanel } from "./CurvedPanel";
import { DotMesh } from "./DotMesh";
import { RevealText } from "./RevealText";

/**
 * "Find Your Best Suited Product" panel — abstract accent dot-mesh on one side,
 * headline + one line + a single CTA straight to the products range on the other.
 * (Replaces the reference site's location-picker flow with a direct link.)
 */
export function ProductPanel() {
  return (
    <section className="exp-sec-dark py-24 sm:py-28">
      <div className="container-page">
        <CurvedPanel
          visualSide="left"
          visual={
            <>
              <DotMesh className="absolute inset-0 h-full w-full" />
              <div className="exp-panel-fade pointer-events-none absolute inset-0" />
            </>
          }
        >
          <span className="exp-eyebrow">Product range</span>
          <h2 className="exp-display exp-display-lg">
            <RevealText text="Find Your Best Suited Product" />
          </h2>
          <p className="exp-body max-w-sm">
            Seven transformer families plus stabilizers, substations and panels — filter by rating,
            application and site conditions to find the right fit.
          </p>
          <Link
            to="/products"
            className="exp-btn exp-btn-solid mt-1 !bg-yellow-400 !text-black hover:!bg-yellow-300"
          >
            Explore the range
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </CurvedPanel>
      </div>
    </section>
  );
}
