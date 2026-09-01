"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Building2, Quote } from "lucide-react";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { testimonials, testimonialsNote } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Testimonial carousel.
 *
 * The quotes carry no names, because the client has not yet asked those firms
 * for permission — and inventing a name to make a quote look stronger is
 * fabricating a reference, not writing copy.
 *
 * So the card does the opposite of papering over it. No stock headshot, no
 * monogram derived from the firm descriptor, and a note underneath saying
 * plainly why there are no names and offering a reference call instead. A
 * partner reading anonymous testimonials is already asking the question;
 * answering it is worth more than a fourth quote.
 *
 * Set `attribution` on any entry in lib/content.ts and that card upgrades
 * itself — real monogram, named cite, firm and location — and the note hides
 * once every quote is attributed. See the provenance comment there for what
 * still needs the client's sign-off.
 *
 * Autoplay stops permanently on the first manual interaction: a carousel that
 * resumes and slides away from what the reader just chose is worse than one
 * that never moved.
 */
export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [engaged, setEngaged] = useState(false);

  const go = useCallback((next: number, dir: number) => {
    setDirection(dir);
    setIndex((next + testimonials.length) % testimonials.length);
  }, []);

  useEffect(() => {
    if (engaged) return;
    const id = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % testimonials.length);
    }, 7000);
    return () => clearInterval(id);
  }, [engaged]);

  const interact = (fn: () => void) => {
    setEngaged(true);
    fn();
  };

  const active = testimonials[index];
  const anyAnonymous = testimonials.some((t) => !t.attribution);

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Client Voices"
          title="What CPA Firm Partners Say"
          accent="About Working With Us"
          align="center"
        />

        <div className="relative mx-auto mt-14 max-w-3xl">
          <Quote
            className="absolute -left-2 -top-6 h-16 w-16 text-brand/10 sm:-left-8"
            aria-hidden="true"
          />

          <div className="relative min-h-[19rem] sm:min-h-[16rem]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.blockquote
                key={index}
                custom={direction}
                initial={{ opacity: 0, x: direction * 32 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -32 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="rounded-2xl border border-border bg-white p-8 shadow-card sm:p-10"
              >
                <p className="text-[16.5px] leading-[1.8] text-navy-deep sm:text-[17.5px]">
                  “{active.quote}”
                </p>
                <footer className="mt-7 flex items-center gap-4 border-t border-border pt-6">
                  {/*
                    A monogram only where there is a person to monogram. This
                    used to take initials from the role string, so an anonymous
                    "CPA Firm, United States" rendered as a "CF" avatar that
                    reads as somebody's initials — an attributed quote's costume
                    worn by an unattributed quote, which is exactly what makes a
                    partner discount the whole section.
                  */}
                  {active.attribution ? (
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-white"
                      style={{ backgroundImage: "var(--gradient-brand)" }}
                      aria-hidden="true"
                    >
                      {active.attribution.person
                        .split(" ")
                        .filter(Boolean)
                        .slice(0, 2)
                        .map((w) => w[0])
                        .join("")}
                    </span>
                  ) : (
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand"
                      aria-hidden="true"
                    >
                      <Building2 className="h-5 w-5" />
                    </span>
                  )}

                  <div>
                    <cite className="block text-[14.5px] font-bold not-italic text-navy-deep">
                      {active.attribution?.person ?? active.name}
                    </cite>
                    <span className="text-[13px] text-ink-muted">
                      {active.attribution
                        ? [active.name, active.attribution.firm, active.attribution.location]
                            .filter(Boolean)
                            .join(", ")
                        : active.role}
                    </span>
                  </div>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => interact(() => go(index - 1, -1))}
              aria-label="Previous testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-navy-deep transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>

            {/*
              The hit area is the button; the dot is the span inside it.
              Drawn as one element the inactive dots were 6x6 CSS px with an
              8px gap — 14px apart centre to centre, which is a coin-flip to
              hit with a thumb and under the 24px touch-target minimum. Padding
              the button to 24px square and dropping the wrapper gap to zero
              buys a real target without resizing the dot, so the control still
              reads as a row of dots rather than a row of buttons.
            */}
            <div className="flex items-center" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.role}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}: ${t.role}`}
                  onClick={() => interact(() => go(i, i > index ? 1 : -1))}
                  className="group flex h-6 items-center justify-center px-[10px]"
                >
                  <span
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === index ? "w-8 bg-accent" : "w-1.5 bg-slate-200 group-hover:bg-slate-400"
                    )}
                  />
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={() => interact(() => go(index + 1, 1))}
              aria-label="Next testimonial"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-white text-navy-deep transition-colors hover:border-brand hover:text-brand"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/*
            Shown while any quote is unattributed, and it does more work than an
            extra quote would. A partner reading anonymous testimonials is
            already asking why there are no names; answering that directly —
            and offering the reference call that actually closes — converts the
            weakness into the discretion a CPA firm wants from an offshore
            partner. Disappears on its own once every entry is attributed.
          */}
          {anyAnonymous && (
            <div className="mt-8 rounded-xl border border-border bg-white/70 p-5 text-center sm:p-6">
              <p className="text-[13.5px] leading-relaxed text-ink-muted">
                {testimonialsNote.body}
              </p>
              <p className="mt-2 text-[13.5px] leading-relaxed text-navy-deep">
                {testimonialsNote.offer}
              </p>
              <Link
                href={testimonialsNote.cta.href}
                className="mt-4 inline-flex items-center gap-2 text-[13.5px] font-bold text-brand transition-colors hover:text-accent-dark"
              >
                {testimonialsNote.cta.label}
                <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
