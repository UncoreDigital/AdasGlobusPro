"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { hero } from "@/lib/content";
import { EASE, fadeUp, stagger } from "@/lib/motion";

/**
 * Homepage hero.
 *
 * The background is layered: a photograph at the base, then the ribbon gradient
 * from the mark, then the geometric treatments that replaced the old globe's
 * orbit rings — angled plates cut to the A's slope, and a chevron field drifting
 * along the same diagonal.
 *
 * The photograph is protected by a left-to-right ramp rather than a flat wash.
 * A flat wash has to be set for the worst case — the brightest part of the
 * frame — and then applies that everywhere, which is what buried the image at
 * 45% opacity under an additional 55% navy. The ramp instead holds contrast
 * only where the type is: ~0.90 navy behind the headline on the left, opening
 * to ~0.30 on the right where the skyline can be seen.
 *
 * That works because of how this specific frame is composed. It is cropped
 * `object-right`, and the supplied image puts its subject and light on the
 * right with the near-empty dark office on the left — exactly where the
 * headline runs.
 *
 * Motion here does not wait for the viewport. Everything above the fold is
 * already visible on load, so a scroll-triggered variant would either fire
 * instantly (pointless) or never (broken).
 */
export default function Hero({
  clients,
  accuracy,
}: {
  clients: string;
  accuracy: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-navy-deep">
      {/* Photograph, base layer. Decorative — the H1 already says what it shows. */}
      <Image
        src="/assets/photos/hero-us.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        aria-hidden="true"
        className="-z-10 object-cover object-right opacity-90"
      />

      {/* Ribbon gradient from the mark, tinting the photo rather than hiding it. */}
      <div
        className="absolute inset-0 -z-10 opacity-60 mix-blend-multiply"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      {/* Contrast ramp: heavy under the headline, open over the skyline. */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(100deg, hsl(var(--navy-deep) / 0.90) 0%, hsl(var(--navy-deep) / 0.82) 34%, hsl(var(--navy-deep) / 0.48) 66%, hsl(var(--navy-deep) / 0.30) 100%)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 -z-10 bg-grid opacity-[0.22]" aria-hidden="true" />

      {/*
        Chevron plates. The 2026 monogram is flat and angular — a straight-sided
        A, a circular G, a squared P — with no rotational element anywhere in it,
        so the orbit rings the old globe justified had nothing left to reference.
        These are squares turned to the A's own slope, nested and breathing
        slowly, which puts the background in the same family as the mark.
      */}
      <div
        className="pointer-events-none absolute -right-[14%] top-1/2 -z-10 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="relative h-[40rem] w-[40rem] animate-breathe">
          <div className="absolute inset-0 rotate-[28deg] rounded-[3rem] border border-white/10" />
          <div className="absolute inset-[10%] rotate-[28deg] rounded-[2.5rem] border border-teal-light/25" />
          <div className="absolute inset-[22%] rotate-[28deg] rounded-[2rem] border border-brand-light/25" />
          <div className="absolute inset-[34%] rotate-[28deg] rounded-[1.5rem] border border-white/[0.07]" />
        </div>
      </div>

      {/* Drifting chevron field, travelling along the same diagonal. */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <div className="absolute -inset-[30%] animate-drift-slow bg-chevrons" />
      </div>

      {/* Accent glow, bottom-right — the teal end of the monogram. */}
      <div
        className="pointer-events-none absolute -bottom-40 -right-24 -z-10 h-[32rem] w-[32rem] rounded-full opacity-25 blur-[120px]"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid items-center gap-12 py-20 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:py-28 short:py-16">
          <motion.div initial="hidden" animate="show" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-[12px] font-semibold text-white/85 backdrop-blur"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-mint opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-mint" />
              </span>
              {hero.subhead}
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="mt-6 text-[2.1rem] font-extrabold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]"
            >
              {hero.headline}
              <br className="hidden sm:block" />{" "}
              <span className="text-gradient-accent-on-dark">{hero.headlineAccent}</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="mt-6 max-w-xl text-[16px] leading-[1.75] text-white/70"
            >
              {hero.lead}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-3">
              <Button href={hero.primaryCta.href} size="lg">
                {hero.primaryCta.label}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href={hero.secondaryCta.href} size="lg" variant="onDark">
                {hero.secondaryCta.label}
              </Button>
            </motion.div>

            <motion.ul variants={fadeUp} className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
              {hero.chips.map((chip) => (
                <li key={chip} className="flex items-center gap-2 text-[13px] text-white/65">
                  <Check className="h-3.5 w-3.5 shrink-0 text-accent-light" aria-hidden="true" />
                  {chip}
                </li>
              ))}
            </motion.ul>
          </motion.div>

          {/* Proof cluster. Two live figures plus the delivery commitments. */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE, delay: 0.15 }}
            className="relative lg:pl-6"
          >
            <div className="rounded-2xl border border-white/15 bg-white/[0.07] p-6 backdrop-blur-md sm:p-8">
              <div className="grid grid-cols-2 gap-6">
                <Figure value={clients} label="CPA, accounting and tax firms served" />
                <Figure value={accuracy} label="Accuracy & on-time reporting commitment" />
              </div>

              <div className="mt-7 space-y-3 border-t border-white/10 pt-7">
                {[
                  "Part-time, full-time or seasonal",
                  "Working inside your own software",
                  "Secure remote desktop environment",
                ].map((line) => (
                  <p key={line} className="flex items-start gap-2.5 text-[13.5px] text-white/70">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-mint" aria-hidden="true" />
                    {line}
                  </p>
                ))}
              </div>
            </div>

            {/* Trial tab, tucked flush under the card. -mt-3 left it straddling
                the card border; -mt-px lets the two edges meet. */}
            <div className="mx-auto -mt-px w-fit rounded-b-xl border border-t-0 border-accent/40 bg-navy-deep px-5 py-2.5">
              <p className="text-[12.5px] font-semibold text-accent-light">
                3-day free trial — no card, no commitment
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Section transition — a soft rise into the white band below. */}
      <div
        className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-b from-transparent to-white/[0.04]"
        aria-hidden="true"
      />
    </section>
  );
}

function Figure({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">{value}</p>
      <p className="mt-1.5 text-[12.5px] leading-snug text-white/55">{label}</p>
    </div>
  );
}
