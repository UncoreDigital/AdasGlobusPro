import { ArrowRight, TrendingUp } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { busySeason } from "@/lib/content";
import { fadeLeft, fadeRight } from "@/lib/motion";

/**
 * The busy-season argument.
 *
 * New on this site — the global page never makes it, and for a CPA firm it is
 * the single strongest reason to pick up the phone. Everything else on the
 * page is a capability claim; this one is arithmetic the reader already knows
 * is true.
 *
 * Text only since the client's 21 October document, which removed the filing
 * calendar that sat in the right-hand column ("remove this whole part, keep
 * the text on the side"). The text now spans both columns, heading on the
 * left and the argument on the right, so the band does not read as half
 * empty. The calendar's dates are in git history if it is ever wanted back.
 */
export default function BusySeason() {
  return (
    <section className="section relative overflow-hidden bg-slate-50">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <Reveal variants={fadeRight}>
            <span className="eyebrow mb-4">{busySeason.eyebrow}</span>
            <h2 className="text-[1.75rem] font-extrabold leading-[1.15] text-navy-deep sm:text-4xl lg:text-[2.75rem]">
              The Four Months That{" "}
              <span className="text-gradient-accent">Decide Your Year</span>
            </h2>
          </Reveal>

          <Reveal variants={fadeLeft} className="lg:pt-9">
            <p className="text-[15.5px] leading-[1.8] text-ink-muted">{busySeason.body}</p>

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
        </div>
      </div>
    </section>
  );
}
