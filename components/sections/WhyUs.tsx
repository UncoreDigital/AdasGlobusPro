import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { whyUs } from "@/lib/content";
import { getIcon } from "@/lib/icons";

/**
 * "Why Choose ADAS Globus Pro" — four differentiators on the navy band.
 *
 * Dark on purpose: it sits between two white sections and is the page's centre
 * of gravity. Cards are numbered because these are claims a reader compares
 * against a competitor's list, and numbering makes the set finite and scannable.
 */
export default function WhyUs() {
  return (
    <section className="section relative overflow-hidden bg-navy-deep">
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -left-32 top-1/4 h-[26rem] w-[26rem] rounded-full opacity-20 blur-[110px]"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <SectionHeading
          eyebrow="Why ADAS Globus Pro"
          title="Four Reasons Firms Choose Us Over"
          accent="a Conventional Outsourcer"
          lead="Offshore capacity is easy to buy and hard to integrate. These are the commitments that decide whether an engagement becomes part of your practice or another vendor to manage."
          onDark
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-5 md:grid-cols-2">
          {whyUs.map((item, i) => {
            const Icon = getIcon(item.icon);
            return (
              <RevealItem
                key={item.title}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.07] sm:p-8"
              >
                {/* Index, oversized and low-contrast — structure, not decoration. */}
                <span
                  className="pointer-events-none absolute -right-2 -top-5 font-display text-[5.5rem] font-extrabold leading-none text-white/[0.045] transition-colors duration-300 group-hover:text-accent/10"
                  aria-hidden="true"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="relative flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-light transition-colors duration-300 group-hover:border-accent/40 group-hover:bg-accent/10">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="relative mt-6 text-lg font-bold text-white">{item.title}</h3>
                <p className="relative mt-3 text-[14.5px] leading-[1.75] text-white/65">
                  {item.body}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
