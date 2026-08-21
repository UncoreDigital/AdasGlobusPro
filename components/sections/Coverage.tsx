"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import CountUp from "@/components/CountUp";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { coverage } from "@/lib/content";
import { timeZones } from "@/lib/site";
import { EASE } from "@/lib/motion";

/**
 * "Your Evening Is Our Morning" — the overnight delivery cycle.
 *
 * Replaces the global site's six-country presence band, which on a U.S.-only
 * site is noise: a partner in Ohio does not care that there is a Dubai office.
 * What they are working out is whether the time difference is a problem or the
 * product, so the section answers that directly and shows the four U.S. zones
 * running live underneath.
 *
 * The live clocks are the point. A list of time zones claims coverage; four
 * running clocks demonstrate it, and it is the one part of the page that is
 * different every time the visitor loads it.
 */
export default function Coverage({
  clients,
  transactions,
}: {
  clients: { value: number; suffix: string } | null;
  transactions: { value: number; suffix: string } | null;
}) {
  return (
    <section className="section relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-grid opacity-[0.35]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/3 rounded-full opacity-25 blur-[130px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="mx-auto max-w-3xl text-center">
          <Reveal>
            <span className="eyebrow eyebrow-on-dark mb-4">{coverage.eyebrow}</span>
            <h2 className="text-[1.75rem] font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
              Your Evening Is{" "}
              <span className="text-gradient-accent-on-dark">Our Morning</span>
            </h2>
            <p className="mt-5 text-[15.5px] leading-[1.75] text-white/70">
              {coverage.subheading}
            </p>
          </Reveal>
        </div>

        {/* The overnight cycle */}
        <div className="relative mt-16">
          <div
            className="absolute left-[12.5%] right-[12.5%] top-9 hidden h-px lg:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--sky) / 0.4), hsl(var(--accent) / 0.5), hsl(var(--sky) / 0.4))",
            }}
            aria-hidden="true"
          />

          <RevealGroup className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            {coverage.cycle.map((stage, i) => (
              <RevealItem key={stage.label} className="relative text-center lg:px-3">
                <span className="relative z-10 mx-auto flex h-[4.5rem] w-[4.5rem] flex-col items-center justify-center rounded-full border-4 border-navy-deep bg-white/[0.08] backdrop-blur">
                  <span className="font-display text-[13px] font-extrabold leading-none text-white">
                    {stage.time}
                  </span>
                  <span className="mt-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-accent-light">
                    {stage.label}
                  </span>
                </span>

                {/* Direction cue between stages, pointer devices only. */}
                {i < coverage.cycle.length - 1 && (
                  <ArrowRight
                    className="absolute -right-2 top-8 hidden h-4 w-4 text-accent/50 lg:block"
                    aria-hidden="true"
                  />
                )}

                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-sky-light">
                  {stage.zone}
                </p>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-white/65">{stage.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Live U.S. clocks */}
        <Reveal className="mt-16">
          <p className="text-center text-[13px] font-semibold text-white/50">
            {coverage.kicker}
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {timeZones.map((zone) => (
              <div
                key={zone.abbr}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-5 text-center transition-colors duration-300 hover:border-accent/30 hover:bg-white/[0.07]"
              >
                <p className="text-[11.5px] font-bold uppercase tracking-[0.16em] text-accent-light">
                  {zone.label}
                </p>
                <Clock timezone={zone.tz} label={zone.abbr} />
              </div>
            ))}
          </div>
        </Reveal>

        {/* Figures */}
        <Reveal className="mt-14">
          <div className="grid gap-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 sm:grid-cols-2 sm:p-10">
            <div className="text-center sm:border-r sm:border-white/10">
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                {clients ? <CountUp value={clients.value} suffix={clients.suffix} /> : "—"}
              </p>
              <p className="mt-2 text-[13.5px] text-white/55">
                Businesses and firms served
              </p>
            </div>
            <div className="text-center">
              <p className="font-display text-4xl font-extrabold text-white sm:text-5xl">
                {transactions ? (
                  <CountUp value={transactions.value} suffix={transactions.suffix} />
                ) : (
                  "—"
                )}
              </p>
              <p className="mt-2 text-[13.5px] text-white/55">
                Transactions processed monthly
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A single time-zone clock.
 *
 * Renders an em dash until mounted rather than the server's time: the server
 * clock and the visitor's differ by whatever the request took, and hydrating a
 * mismatched time is both a React warning and a visibly wrong number.
 */
function Clock({ timezone, label }: { timezone: string; label: string }) {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: timezone,
      }).format(new Date());

    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, [timezone]);

  return (
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: EASE }}
      className="mt-3 font-display text-2xl font-extrabold tabular-nums text-white"
    >
      {time ?? "—"}
      <span className="ml-1.5 text-[12px] font-semibold text-white/40">{label}</span>
    </motion.p>
  );
}
