import type { ReactNode } from "react";
import { RevealBlock } from "./RevealBlock";

/**
 * Large soft asymmetric-cornered panel, split roughly half-and-half: a visual on
 * one side, headline + copy + CTA on the other. Shared shape for the
 * "Find your best suited product" panel and the "Industries we serve" panel.
 */
export function CurvedPanel({
  visual,
  children,
  visualSide = "left",
}: {
  visual: ReactNode;
  children: ReactNode;
  visualSide?: "left" | "right";
}) {
  return (
    <RevealBlock
      distance={36}
      className="exp-curved exp-hair grid border lg:grid-cols-2"
    >
      <div
        className={`exp-panel-visual relative min-h-[240px] overflow-hidden sm:min-h-[320px] ${
          visualSide === "right" ? "lg:order-2" : ""
        }`}
      >
        {visual}
      </div>
      <div className="flex flex-col items-start justify-center gap-5 p-8 sm:p-12 lg:p-14">
        {children}
      </div>
    </RevealBlock>
  );
}
