import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { usps } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { staggerFast } from "@/lib/motion";

/**
 * "Operational Commitments Embedded Into Every Engagement".
 *
 * Each item now carries a line of explanation. On the source site these were
 * eight bare labels — "Dedicated Project Manager for Every Engagement" — which
 * every competitor also claims. The sentence underneath is where the claim
 * either becomes concrete or exposes itself as filler, so it is worth the space.
 */
export default function Usps() {
  return (
    <section className="section bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Our Commitments"
          title="What You Get on Every Engagement,"
          accent="Not Just the Big Ones"
          lead="Not aspirations. These are the standing terms of how we work, applied from the first week to the smallest account."
          align="center"
        />

        <RevealGroup
          variants={staggerFast}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {usps.map((usp) => {
            const Icon = getIcon(usp.icon);
            return (
              <RevealItem
                key={usp.title}
                className="group flex h-full flex-col gap-4 rounded-xl border border-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-dark transition-colors duration-300 group-hover:bg-accent group-hover:text-navy-deep">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-[14.5px] font-bold leading-snug text-navy-deep">
                    {usp.title}
                  </h3>
                  <p className="mt-2 text-[13px] leading-[1.65] text-ink-muted">{usp.body}</p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
