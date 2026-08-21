import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { Button } from "@/components/ui/Button";
import { getIcon } from "@/lib/icons";
import { services, servicesIntro } from "@/lib/services-data";

/**
 * The five service lines.
 *
 * Five is an awkward count for a grid — a 3-up leaves two orphans on the last
 * row. The first card is given the full first row on large screens instead, so
 * the layout reads as "the flagship, then the four specialisms", which is also
 * how the client describes the suite.
 */
export default function ServicesGrid({
  heading = "A Fully Integrated Accounting Outsourcing Platform",
  accent = "From Transactional Processing to Strategic Advisory",
  showCta = true,
}: {
  heading?: string;
  accent?: string;
  showCta?: boolean;
}) {
  const [flagship, ...rest] = services;
  const FlagshipIcon = getIcon(flagship.icon);

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow="Our Expertise"
          title={heading}
          accent={accent}
          lead={servicesIntro.body}
          align="center"
        />

        <RevealGroup className="mt-14 grid gap-5 lg:grid-cols-4">
          {/* Flagship — spans the row, laid out as a split card. */}
          <RevealItem className="lg:col-span-4">
            <Link
              href={`/services/${flagship.slug}`}
              className="card-edge group grid gap-8 overflow-hidden p-7 hover:shadow-lift md:grid-cols-[1.4fr_1fr] md:p-9"
            >
              <div>
                <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                  <FlagshipIcon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-bold text-navy-deep transition-colors group-hover:text-brand md:text-2xl">
                  {flagship.name}
                </h3>
                <p className="mt-3 max-w-xl text-[15px] leading-[1.7] text-ink-muted">
                  {flagship.summary}
                </p>
                <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brand">
                  Explore the suite
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </div>

              <ul className="grid gap-2.5 self-center border-t border-border pt-6 md:border-l md:border-t-0 md:pl-8 md:pt-0">
                {flagship.outcomes.map((outcome) => (
                  <li key={outcome} className="flex items-center gap-2.5 text-[13.5px] text-ink-muted">
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </Link>
          </RevealItem>

          {rest.map((service) => {
            const Icon = getIcon(service.icon);
            return (
              <RevealItem key={service.slug}>
                <Link
                  href={`/services/${service.slug}`}
                  className="card-edge group flex h-full flex-col p-7 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors duration-300 group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-[17px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
                    {service.name}
                  </h3>
                  <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-ink-muted">
                    {service.summary}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[13.5px] font-semibold text-brand">
                    Learn more
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>

        {showCta && (
          <Reveal className="mt-12 flex justify-center">
            <Button href="/services" variant="outline" size="lg">
              View all services
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
          </Reveal>
        )}
      </div>
    </section>
  );
}
