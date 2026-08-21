import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { pricingTeaser } from "@/lib/content";

/**
 * The "$199 pilot" band.
 *
 * Framed as a trial rather than a price list because that is what the client's
 * own heading asks — "Would You Like to Validate Our Services First?" — and
 * because a single figure with no scope attached reads as a rate card the sales
 * conversation then has to walk back.
 */
export default function PricingTeaser() {
  return (
    <section className="section-tight bg-white">
      <div className="container">
        <Reveal>
          <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-slate-50 p-8 sm:p-12">
            <div
              className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-[80px]"
              style={{ backgroundImage: "var(--gradient-accent)" }}
              aria-hidden="true"
            />

            <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="eyebrow mb-4">Start Small</span>
                <h2 className="text-[1.6rem] font-extrabold leading-tight text-navy-deep sm:text-[2rem]">
                  {pricingTeaser.heading}
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-ink-muted">
                  {pricingTeaser.body}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {[
                    "Scope agreed in writing first",
                    "Your templates and review protocol",
                    "No ongoing commitment",
                    "Assessed against your own standard",
                  ].map((line) => (
                    <li key={line} className="flex items-center gap-2.5 text-[13.5px] text-ink-muted">
                      <Check className="h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-white p-7 text-center shadow-card">
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Pilot engagements from
                </p>
                <p className="mt-3 font-display text-5xl font-extrabold text-gradient-accent">
                  {pricingTeaser.subheading.replace("Starting at ", "")}
                </p>
                <Button href={pricingTeaser.cta.href} size="lg" className="mt-7 w-full">
                  {pricingTeaser.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <p className="mt-4 text-[12px] text-slate-400">
                  Senior advisory response within one business day
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
