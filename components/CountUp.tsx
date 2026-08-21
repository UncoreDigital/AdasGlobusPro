"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Counts a figure up when it scrolls into view.
 *
 * Takes the already-split numeric value and suffix rather than a raw string, so
 * the "TBC" / em-dash cases never reach here — see splitFigure() in
 * lib/settings.ts. A counter that animates a non-number to zero is worse than
 * no counter.
 *
 * Uses rAF rather than a framer-motion spring because the value has to land on
 * the exact figure: a spring settles asymptotically and can read "1,149" for a
 * frame, which on a client-count claim is not acceptable.
 */
export default function CountUp({
  value,
  suffix = "",
  duration = 1600,
  className,
}: {
  value: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (typeof window !== "undefined") {
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) {
        setDisplay(value);
        return;
      }
    }

    let raf = 0;
    const start = performance.now();
    /* Same easing as the reveal variants, so the count feels part of the page. */
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      setDisplay(Math.round(ease(t) * value));
      if (t < 1) raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value, duration]);

  return (
    <span ref={ref} className={className}>
      {display.toLocaleString("en-US")}
      {suffix}
    </span>
  );
}
