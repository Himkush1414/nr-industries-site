import { GsapReveal } from "@/experimental-ui-v4/components/GsapReveal";
import FlowingMenu from "@/experimental-ui-v4/components/FlowingMenu";
import { clients } from "@/data/company";

/**
 * Real client names + logos (not the demo's macOS codenames), recolored to
 * the light/blue direction rather than the given near-black bgColor. Ten
 * rows so the visible name/image genuinely changes as you move down the list.
 */
const partnerItems = clients.slice(0, 10).map((client) => ({
  link: "#",
  text: client.name.toUpperCase(),
  image: client.logoSrc,
}));

export function PartnersSection() {
  return (
    <section className="py-24 sm:py-32">
      <div className="container-page flex flex-col gap-12">
        <GsapReveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center">
          <span className="v4-micro-label">Trusted By</span>
          <h2 className="font-heading v4-fg text-3xl font-semibold tracking-tight sm:text-4xl">
            Running behind the scenes for names you know
          </h2>
        </GsapReveal>

        <GsapReveal delay={0.1}>
          <div className="v4-card overflow-hidden" style={{ height: "800px", position: "relative" }}>
            <FlowingMenu
              items={partnerItems}
              speed={15}
              textColor="#0f172a"
              bgColor="#F3F6FF"
              marqueeBgColor="#0f172a"
              marqueeTextColor="#ffffff"
              borderColor="#dce3f5"
            />
          </div>
        </GsapReveal>
      </div>
    </section>
  );
}
