import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

/**
 * Promoted from /lab/lv9's useWireDecorativeButtons
 * (src/lab-lv9/hooks/useWireDecorativeButtons.ts), left untouched as the
 * reference this was copied from. The Home page's WhyChooseUsSection,
 * IndustriesCertificationsSection, and ProductsFaqSection components render
 * four elements with no `onClick` at all — decorative in the underlying
 * design — so this finds the already-rendered DOM nodes by stable text/
 * class matches and attaches plain `addEventListener` handlers to them
 * (there's no prop or ref those components expose for this), rather than
 * editing those components:
 *
 *   1. "Get Started" (WhyChooseUsSection)      -> the real Contact page,
 *      same destination the hero's own "Contact Us" link already points at.
 *   2. "Explore All Services" (WhyChooseUsSection) -> smooth-scrolls down to
 *      ProductsFaqSection's own Products section further down the page.
 *   3. "View Products" (ProductsFaqSection)    -> the real Products page,
 *      same destination the hero's own "View Our Products" link already
 *      points at.
 *   4. The `ArrowUpRight` icons on IndustriesCertificationsSection's two
 *      "Trusted across every industry" / "Decades of hands-on expertise"
 *      image blocks -> smooth-scrolls to that section's own industries
 *      carousel (the one with the real, already-working Previous/Next
 *      industries buttons), reusing that real behavior rather than
 *      re-implementing a second, separate cycling mechanism against a
 *      static image never built to cycle.
 *
 * Several of these targets don't exist in the DOM on first paint —
 * "Explore All Services", for instance, sits behind its own multi-stage
 * live-height-measurement cascade (measure real content, `setState`,
 * re-render, measure again), which can take more than one commit to
 * resolve. A one-time post-mount query misses anything not yet rendered at
 * that instant, so this uses a MutationObserver instead — it re-scans on
 * every DOM change and wires each target (idempotently, via a WeakSet) the
 * moment it appears, then keeps watching for the page's lifetime in case
 * any of these sections re-render their gating state again later.
 */
export function useWireDecorativeButtons() {
  const navigate = useNavigate();

  useEffect(() => {
    const wired = new WeakSet<Element>();

    function wireOnce(el: Element | null | undefined, handler: (e: Event) => void) {
      if (!el || wired.has(el)) return;
      wired.add(el);
      el.addEventListener("click", handler);
      if (el instanceof HTMLElement) el.style.cursor = "pointer";
    }

    function findButtonByText(text: string) {
      return Array.from(document.querySelectorAll("button")).find((b) => b.textContent?.trim() === text);
    }

    function scanAndWire() {
      wireOnce(findButtonByText("Get Started"), (e) => {
        e.preventDefault();
        navigate("/contact");
      });

      wireOnce(findButtonByText("Explore All Services"), (e) => {
        e.preventDefault();
        const productsIntro = Array.from(document.querySelectorAll("p")).find((p) =>
          p.textContent?.includes("A complete range of power and distribution equipment"),
        );
        productsIntro?.scrollIntoView({ behavior: "smooth", block: "center" });
      });

      wireOnce(findButtonByText("View Products"), (e) => {
        e.preventDefault();
        navigate("/products");
      });

      document.querySelectorAll("svg.lucide-arrow-up-right").forEach((svg) => {
        wireOnce(svg, (e) => {
          e.preventDefault();
          const industriesNextButton = document.querySelector('button[aria-label="Next industries"]');
          industriesNextButton?.scrollIntoView({ behavior: "smooth", block: "center" });
        });
      });
    }

    scanAndWire();
    const observer = new MutationObserver(scanAndWire);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [navigate]);
}
