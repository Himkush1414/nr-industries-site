import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import { industries } from "@/data/company";

/** All 15 industries served, same data the live Industries page renders from. */
export function IndustriesSection() {
  return (
    <section className="v2-surface py-20 sm:py-24">
      <div className="container-page flex flex-col gap-12">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-3 text-center">
          <span className="v2-accent-text text-xs font-semibold tracking-[0.22em] uppercase">
            Industries We Serve
          </span>
          <h2 className="font-heading v2-fg text-3xl font-bold tracking-tight sm:text-4xl">
            Powering every sector
          </h2>
          <p className="v2-fg-dim text-base leading-relaxed">
            N R Industries powers 15+ sectors — from food, paper, and textile manufacturing to
            solar power plants, refineries, and hydro projects.
          </p>
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {industries.map((industry, i) => (
            <Reveal key={industry.name} delayMs={i * 25}>
              <div className="v2-card group relative aspect-square overflow-hidden">
                {industry.imageSrc && (
                  <img
                    src={industry.imageSrc}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    decoding="async"
                  />
                )}
                <div
                  className="absolute inset-0"
                  style={{ background: "linear-gradient(to top, rgba(0,0,0,0.78) 10%, rgba(0,0,0,0.15) 60%, transparent 85%)" }}
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-3 text-sm font-semibold text-white">
                  {industry.name}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Link to="/industries" className="v2-btn v2-btn-outline">
            View All Industries
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
