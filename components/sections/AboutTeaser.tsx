import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { aboutTeaser } from "@/lib/content";
import { fadeLeft, fadeRight } from "@/lib/motion";

export default function AboutTeaser({
  professionals,
  engagements,
}: {
  professionals: string;
  engagements: string;
}) {
  return (
    <section className="section relative overflow-hidden bg-white">
      <div className="container">
        <div className="grid gap-14 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Visual: the monogram on nested plates cut to its own slope. The
              mark is the most distinctive asset the brand has, so it does the
              work here rather than a stock photograph of a handshake. */}
          <Reveal variants={fadeRight} className="relative order-2 lg:order-1">
            <div className="relative mx-auto aspect-square w-full max-w-[30rem]">
              <div
                className="absolute inset-0 rounded-full opacity-[0.07]"
                style={{ backgroundImage: "var(--gradient-brand)" }}
                aria-hidden="true"
              />
              <div
                className="absolute inset-[6%] rotate-[28deg] rounded-[2.5rem] border border-brand/15"
                aria-hidden="true"
              />
              <div
                className="absolute inset-[17%] rotate-[28deg] rounded-[2rem] border border-dashed border-teal/30"
                aria-hidden="true"
              />

              <div className="absolute inset-0 flex items-center justify-center p-[19%]">
                <Image
                  src="/assets/logo-mark-alpha.png"
                  alt=""
                  width={1094}
                  height={469}
                  aria-hidden="true"
                  className="w-full object-contain drop-shadow-xl"
                />
              </div>

              {/* Orbiting figure chips. */}
              <FloatChip className="left-0 top-[10%]" value={professionals} label="Professionals" />
              <FloatChip className="right-0 top-[16%]" value={engagements} label="Engagements" />
              <FloatChip
                className="bottom-[10%] left-1/2 -translate-x-1/2"
                value="2020"
                label="Since"
              />
            </div>
          </Reveal>

          <div className="order-1 lg:order-2">
            <SectionHeading
              eyebrow={aboutTeaser.eyebrow}
              title="Your Offshore Accounting Division —"
              accent="Not Another Vendor to Manage"
            />

            <RevealGroup as="ul" className="mt-8 space-y-5">
              {aboutTeaser.points.map((point) => (
                <RevealItem as="li" key={point} className="flex gap-3.5">
                  <span
                    className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand/10"
                    aria-hidden="true"
                  >
                    <Check className="h-3 w-3 text-brand" />
                  </span>
                  <p className="text-[15px] leading-[1.7] text-ink-muted">{point}</p>
                </RevealItem>
              ))}
            </RevealGroup>

            <Reveal variants={fadeLeft} className="mt-9">
              <Button href="/about" variant="outline" size="lg">
                More about ADAS Globus
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function FloatChip({
  className,
  value,
  label,
}: {
  className?: string;
  value: string;
  label: string;
}) {
  return (
    <div
      className={`absolute rounded-xl border border-border bg-white px-4 py-2.5 shadow-card ${className}`}
    >
      <p className="font-display text-xl font-extrabold text-navy-deep">{value}</p>
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-ink-muted">
        {label}
      </p>
    </div>
  );
}
