import Image from "next/image";
import { ArrowRight, TrendingUp } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { busySeason } from "@/lib/content";
import { fadeLeft, fadeRight } from "@/lib/motion";

/**
 * The busy-season argument.
 *
 * New on this site — the global page never makes it, and for a U.S. CPA firm it
 * is the single strongest reason to pick up the phone. Everything else on the
 * page is a capability claim; this one is arithmetic the reader already knows
 * is true, which is why it sits immediately after the services grid.
 *
 * The filing calendar is deliberately concrete. Naming March 17 and April 15
 * signals that we work to the same calendar the reader does, which a generic
 * "seasonal capacity" claim never does.
 */
export default function BusySeason() {
  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal variants={fadeRight}>
            <span className="eyebrow mb-4">{busySeason.eyebrow}</span>
            <h2 className="text-[1.75rem] font-extrabold leading-[1.15] text-navy-deep sm:text-4xl">
              The Four Months That{" "}
              <span className="text-gradient-accent">Decide Your Year</span>
            </h2>

            <p className="mt-6 text-[15.5px] leading-[1.8] text-ink-muted">{busySeason.body}</p>

            <div className="mt-6 rounded-xl border-l-[3px] border-accent bg-white p-6 shadow-soft">
              <p className="flex gap-3 text-[15px] leading-[1.75] text-navy-deep">
                <TrendingUp className="mt-1 h-5 w-5 shrink-0 text-accent-dark" aria-hidden="true" />
                {busySeason.resolution}
              </p>
            </div>

            <Button href="/contact" size="lg" className="mt-8">
              Plan your season
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <Reveal variants={fadeLeft}>
            {/* Filing calendar */}
            <div className="rounded-2xl border border-border bg-white p-7 shadow-card sm:p-8">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                The calendar we work to
              </h3>

              <RevealGroup as="ul" className="mt-6 space-y-1">
                {busySeason.milestones.map((milestone, i) => (
                  <RevealItem
                    as="li"
                    key={milestone.date}
                    className="relative flex gap-5 pb-6 last:pb-0"
                  >
                    {/* Spine, stopping at the last item. */}
                    {i < busySeason.milestones.length - 1 && (
                      <span
                        className="absolute left-[1.65rem] top-9 h-full w-px bg-border"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative z-10 flex h-[3.3rem] w-[3.3rem] shrink-0 flex-col items-center justify-center rounded-full border border-accent/40 bg-accent/[0.07] text-center">
                      <span className="font-display text-[12.5px] font-extrabold leading-none text-accent-dark">
                        {milestone.date}
                      </span>
                    </span>
                    <span className="pt-3.5 text-[14px] leading-snug text-ink-muted">
                      {milestone.label}
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>

              <div className="mt-6 flex items-center gap-4 border-t border-border pt-6">
                <Image
                  src="/assets/photos/busy-season.webp"
                  alt=""
                  width={1536}
                  height={1024}
                  aria-hidden="true"
                  className="h-16 w-24 shrink-0 rounded-lg object-cover"
                />
                <p className="text-[13px] leading-relaxed text-ink-muted">
                  Seasonal teams are briefed on your templates in the autumn, so week one of
                  January is productive rather than instructional.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
