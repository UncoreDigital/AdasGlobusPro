"use client";

import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { testimonials } from "@/lib/content";
import { EASE } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * Testimonial carousel.
 *
 * The quotes are attributed by role and firm type, not by name — that is how
 * the client published them, and inventing names to make them look stronger
 * would be fabricating a reference. The card leans on the quote itself and
 * treats the attribution as a caption rather than dressing it up with a stock
 * headshot, which is the usual way this gap gets papered over.
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

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Client Voices"
          title="What Partners and Finance Leaders"
          accent="Say About Working With Us"
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
                  <span
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full font-display text-sm font-extrabold text-white"
                    style={{ backgroundImage: "var(--gradient-brand)" }}
                    aria-hidden="true"
                  >
                    {active.role
                      .split(/[\s,]+/)
                      .filter(Boolean)
                      .slice(0, 2)
                      .map((w) => w[0])
                      .join("")}
                  </span>
                  <div>
                    <cite className="block text-[14.5px] font-bold not-italic text-navy-deep">
                      {active.name}
                    </cite>
                    <span className="text-[13px] text-ink-muted">{active.role}</span>
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

            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.role}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Testimonial ${i + 1}: ${t.role}`}
                  onClick={() => interact(() => go(i, i > index ? 1 : -1))}
                  className={cn(
                    "h-1.5 rounded-full transition-all duration-300",
                    i === index ? "w-8 bg-accent" : "w-1.5 bg-slate-200 hover:bg-slate-400"
                  )}
                />
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
        </div>
      </div>
    </section>
  );
}
