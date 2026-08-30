import { RevealBlock } from "./RevealBlock";
import { RevealText } from "./RevealText";

interface AboutHeroProps {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
}

/** About-page hero — same graphite + oval-photo language as the homepage,
 * without the drifting blur treatment (that's the homepage's signature). */
export function AboutHero({ eyebrow, title, description, image }: AboutHeroProps) {
  return (
    <section className="exp-sec-dark relative isolate overflow-hidden">
      <div className="exp-hero-oval pointer-events-none absolute top-[-18%] right-[4vw] hidden h-[136%] w-[34vw] max-w-[460px] lg:block">
        <img src={image} alt="N R Industries manufacturing facility" decoding="async" className="h-full w-full object-cover" />
      </div>

      <div className="container-page relative z-10 grid min-h-[46vh] content-center gap-8 py-16 lg:py-20">
        <div className="flex max-w-xl flex-col gap-5">
          <RevealBlock direction="left" className="exp-eyebrow">
            {eyebrow}
          </RevealBlock>
          <h1 className="exp-display exp-display-xl">
            <RevealText text={title} delayMs={100} />
          </h1>
          <RevealBlock delayMs={320}>
            <p className="exp-body-lg max-w-lg">{description}</p>
          </RevealBlock>
        </div>
      </div>

      <div className="relative z-10 flex justify-center pb-14 lg:hidden">
        <div className="exp-hero-oval aspect-[4/5] w-[64%] max-w-[240px]">
          <img src={image} alt="" decoding="async" className="h-full w-full object-cover" />
        </div>
      </div>
    </section>
  );
}
