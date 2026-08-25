import { ArrowRight, X } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { costAdvantage } from "@/lib/content";
import { fadeLeft, fadeRight } from "@/lib/motion";

/**
 * The cost case.
 *
 * Framed as arithmetic, not a discount. The saving is stated as a potential
 * range with the client's own qualifier attached — "depending on role and
 * engagement" — because a firm that reads 60% as a quote and is later offered
 * 45% has been misled, and that is a conversation the sales team has to have
 * rather than the website.
 *
 * The list is what a U.S. hire costs *besides salary*, since that is where the
 * gap actually comes from and it is the part a partner under-counts when
 * comparing a rate card to a payroll line.
 */
export default function CostAdvantage() {
  return (
    <section className="section relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full opacity-20 blur-[110px]"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal variants={fadeRight}>
            <span className="eyebrow eyebrow-on-dark mb-4">{costAdvantage.eyebrow}</span>
            <h2 className="text-[1.75rem] font-extrabold leading-[1.15] text-white sm:text-4xl">
              Potentially{" "}
              <span className="text-gradient-accent-on-dark">60%+ Below</span> the Cost of a
              U.S. Hire
            </h2>
            <p className="mt-6 text-[15.5px] leading-[1.8] text-white/70">
              {costAdvantage.body}
            </p>

            <p className="mt-6 rounded-xl border-l-[3px] border-accent bg-white/[0.04] p-5 text-[13.5px] leading-relaxed text-white/70">
              {costAdvantage.footnote}
            </p>

            <Button href="/contact" size="lg" className="mt-8">
              Get a number for your role
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>

          <Reveal variants={fadeLeft}>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-7 sm:p-8">
              <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">
                What you also stop paying for
              </h3>

              <RevealGroup as="ul" className="mt-6 space-y-4">
                {costAdvantage.avoided.map((entry) => (
                  <RevealItem as="li" key={entry.item} className="flex gap-4">
                    <span
                      className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/5 text-white/40"
                      aria-hidden="true"
                    >
                      <X className="h-3.5 w-3.5" />
                    </span>
                    <span>
                      <span className="block text-[14.5px] font-semibold text-white">
                        {entry.item}
                      </span>
                      <span className="mt-0.5 block text-[13px] leading-snug text-white/55">
                        {entry.note}
                      </span>
                    </span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
