import { ArrowRight } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { accountingRoles, engagementModels, rolesIntro } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { staggerFast } from "@/lib/motion";

/**
 * The roles we staff — the primary "what we do" on this site.
 *
 * This replaced the industry grid as the lead section, on the client's brief.
 * The reasoning is go-to-market rather than aesthetic: their outreach and their
 * LinkedIn job posts are role-shaped ("we place tax preparers"), so a visitor
 * arriving from one should land on the same vocabulary rather than on a page
 * about manufacturing.
 *
 * The engagement strip sits directly under the grid rather than in its own
 * section, because "which of these can I have part-time?" is the immediate next
 * question and splitting the two made the reader hunt for the answer.
 *
 * On /accounting-roles the full EngagementModels band follows immediately, so
 * the strip is switched off there — otherwise the same four words appear twice
 * within one scroll, and the second time carries no more information than the
 * first.
 */
export default function AccountingRoles({
  showCta = true,
  showEngagements = true,
}: {
  showCta?: boolean;
  showEngagements?: boolean;
}) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={rolesIntro.eyebrow}
          title="The People You Cannot"
          accent="Hire Fast Enough"
          lead={rolesIntro.lead}
          align="center"
        />

        <RevealGroup
          variants={staggerFast}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {accountingRoles.map((role) => {
            const Icon = getIcon(role.icon);
            return (
              <RevealItem
                key={role.name}
                className="card-edge group flex h-full flex-col p-7 transition-transform hover:-translate-y-1.5 hover:shadow-lift"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>

                <h3 className="mt-5 text-[16.5px] font-bold leading-snug text-navy-deep">
                  {role.name}
                </h3>
                <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-ink-muted">
                  {role.body}
                </p>

                <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-5">
                  {role.tasks.map((task) => (
                    <li
                      key={task}
                      className="rounded-md bg-slate-50 px-2.5 py-1 text-[11.5px] font-medium text-slate-600"
                    >
                      {task}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {/* Engagement strip — the immediate follow-up question. */}
        {showEngagements && (
          <Reveal className="mt-12">
            <div className="rounded-2xl border border-border bg-slate-50 p-7 sm:p-8">
              <p className="text-center text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                Every role, on the terms that suit the work
              </p>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {engagementModels.map((model) => {
                  const Icon = getIcon(model.icon);
                  return (
                    <li
                      key={model.name}
                      className="flex items-center gap-3 rounded-xl border border-border bg-white px-4 py-3.5 transition-colors hover:border-accent/50"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-dark">
                        <Icon className="h-4 w-4" aria-hidden="true" />
                      </span>
                      <span className="text-[14.5px] font-bold text-navy-deep">
                        {model.name}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        )}

        {showCta && (
          <Reveal className="mt-10 flex justify-center">
            <Button href="/contact" size="lg">
              Tell us which role you need
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
