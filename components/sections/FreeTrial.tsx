import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { freeTrial } from "@/lib/content";

/**
 * The 3-day free trial.
 *
 * Replaces the "$199 pilot" band. A price on a trial invites the reader to ask
 * what $199 buys and whether it is deductible from the first invoice — a
 * negotiation before there is a relationship. Free removes the question, and
 * the client asked for the change directly.
 *
 * The emphasis is on *real work assessed by your own reviewer*, because that is
 * the part a partner cares about. A trial that produces a sample file proves
 * nothing about how the firm handles their clients' actual books.
 */
export default function FreeTrial() {
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
                <span className="eyebrow mb-4">{freeTrial.eyebrow}</span>
                <h2 className="text-[1.6rem] font-extrabold leading-tight text-navy-deep sm:text-[2rem]">
                  {freeTrial.heading}
                </h2>
                <p className="mt-4 max-w-xl text-[15px] leading-[1.75] text-ink-muted">
                  {freeTrial.body}
                </p>

                <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                  {freeTrial.points.map((line) => (
                    <li
                      key={line}
                      className="flex items-center gap-2.5 text-[13.5px] text-ink-muted"
                    >
                      <Check className="h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                      {line}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-border bg-white p-7 text-center shadow-card">
                <Image
                  src="/assets/photos/team-floor.webp"
                  alt=""
                  width={1535}
                  height={1024}
                  sizes="(min-width: 1024px) 20rem, 100vw"
                  aria-hidden="true"
                  className="mx-auto h-24 w-full rounded-lg object-cover"
                />
                <p className="mt-5 font-display text-3xl font-extrabold leading-tight text-gradient-accent">
                  {freeTrial.subheading}
                </p>
                <Button href={freeTrial.cta.href} size="lg" className="mt-6 w-full">
                  {freeTrial.cta.label}
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <p className="mt-4 text-[12px] text-slate-400">
                  We reply within one business day
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
