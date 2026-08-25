import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { engagementModels } from "@/lib/content";
import { getIcon } from "@/lib/icons";

/**
 * The four ways a firm can engage us.
 *
 * On the source site this was buried three-quarters of the way down the
 * Dedicated Offshore Professionals page, where only a reader already sold on the
 * idea would find it. It belongs earlier and higher: "what would this actually
 * look like for us" is a question people ask before they ask what it costs, and
 * answering it up front removes the main reason a visitor leaves to think.
 */
export default function EngagementModels({
  onDark = false,
}: {
  onDark?: boolean;
}) {
  return (
    <section className={onDark ? "section relative overflow-hidden bg-navy-deep" : "section bg-white"}>
      {onDark && <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />}

      <div className="container relative">
        <SectionHeading
          eyebrow="Engagement Models"
          title="Four Ways to Engage Us,"
          accent="Depending on the Gap"
          lead="Capacity problems are not all the same shape. A firm turning away January returns needs something different from one building a permanent bench."
          align="center"
          onDark={onDark}
        />

        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {engagementModels.map((model) => {
            const Icon = getIcon(model.icon);
            return (
              <RevealItem
                key={model.name}
                className={
                  onDark
                    ? "group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.04] p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/[0.07]"
                    : "card-edge group flex h-full flex-col p-7 transition-transform hover:-translate-y-1.5 hover:shadow-lift"
                }
              >
                <span
                  className={
                    onDark
                      ? "flex h-12 w-12 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-accent-light transition-colors group-hover:border-accent/40 group-hover:bg-accent/10"
                      : "flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white"
                  }
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3
                  className={`mt-5 text-[16.5px] font-bold leading-snug ${
                    onDark ? "text-white" : "text-navy-deep"
                  }`}
                >
                  {model.name}
                </h3>
                <p
                  className={`mt-3 flex-1 text-[13.5px] leading-[1.7] ${
                    onDark ? "text-white/65" : "text-ink-muted"
                  }`}
                >
                  {model.body}
                </p>

                <p
                  className={`mt-5 border-t pt-4 text-[12px] font-semibold ${
                    onDark ? "border-white/10 text-accent-light" : "border-border text-accent-dark"
                  }`}
                >
                  Best for: {model.bestFor}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
