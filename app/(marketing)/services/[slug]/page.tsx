import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Target } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { boundary } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { getService, services, serviceSlugs } from "@/lib/services-data";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const service = getService(params.slug);
  if (!service) return {};
  return {
    title: service.meta.title,
    description: service.meta.description,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: service.meta.title,
      description: service.meta.description,
      url: `${site.url}/services/${service.slug}`,
    },
  };
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  const service = getService(params.slug);
  if (!service) notFound();

  const others = services.filter((s) => s.slug !== service.slug);
  const Icon = getIcon(service.icon);

  return (
    <>
      <PageBanner
        eyebrow="Our Expertise"
        title={service.heading}
        lead={service.summary}
        chips={service.outcomes}
        breadcrumbs={[{ name: "Our Expertise", href: "/services" }, { name: service.name }]}
        image={service.imageHd}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-brand/10 text-brand">
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </span>
                <div className="mt-7 space-y-5">
                  {service.intro.map((paragraph) => (
                    <p key={paragraph} className="text-[16px] leading-[1.8] text-ink-muted">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Reveal>

              {/* Who it's for */}
              <Reveal className="mt-10 rounded-2xl border border-border bg-slate-50 p-7">
                <h2 className="flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                  <Target className="h-4 w-4" aria-hidden="true" />
                  Who this is for
                </h2>
                <ul className="mt-5 space-y-3">
                  {service.whoItsFor.map((item) => (
                    <li key={item} className="flex gap-3 text-[14.5px] leading-snug text-ink-muted">
                      <span
                        className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal className="mt-12">
                <h2 className="text-xl font-bold text-navy-deep sm:text-2xl">
                  {service.scopeHeading}
                </h2>
              </Reveal>

              <RevealGroup as="ul" className="mt-6 space-y-3.5">
                {service.scope.map((item) => (
                  <RevealItem as="li" key={item} className="flex gap-3.5">
                    <span
                      className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10"
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3 text-emerald" />
                    </span>
                    <span className="text-[15px] leading-[1.7] text-ink-muted">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>

              {service.groups && (
                <div className="mt-14 grid gap-5 sm:grid-cols-2">
                  {service.groups.map((group) => (
                    <Reveal
                      key={group.name}
                      className="rounded-xl border border-border bg-slate-50 p-6"
                    >
                      <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                        {group.name}
                      </h3>
                      <ul className="mt-5 space-y-2.5">
                        {group.items.map((item) => (
                          <li
                            key={item}
                            className="flex gap-2.5 text-[14px] leading-snug text-ink-muted"
                          >
                            <span
                              className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                              aria-hidden="true"
                            />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </Reveal>
                  ))}
                </div>
              )}
            </div>

            {/* Sticky rail */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal className="overflow-hidden rounded-2xl border border-accent/30 bg-navy-deep text-white">
                <div className="p-7">
                  <h2 className="text-lg font-bold text-white">Discuss this service</h2>
                  <p className="mt-3 text-[14px] leading-[1.7] text-white/65">
                    Tell us your volumes, your software and your review protocol. We come back
                    within one business day with a proposed engagement structure.
                  </p>
                  <Link
                    href="/contact"
                    className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-[14.5px] font-semibold text-navy-deep transition-all hover:-translate-y-0.5"
                    style={{ backgroundImage: "var(--gradient-accent-x)" }}
                  >
                    Talk to us
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  <a
                    href={site.phoneHref}
                    className="mt-3 flex h-12 w-full items-center justify-center rounded-lg border border-white/20 text-[14px] font-semibold text-white transition-colors hover:border-accent-light hover:text-accent-light"
                  >
                    {site.phone}
                  </a>
                </div>
              </Reveal>

              {/* What you receive */}
              <Reveal className="mt-5 rounded-2xl border border-border bg-white p-7">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  What you receive
                </h2>
                <dl className="mt-5 space-y-4">
                  {service.deliverables.map((deliverable) => (
                    <div
                      key={deliverable.item}
                      className="border-l-2 border-accent/40 pl-4"
                    >
                      <dt className="text-[14px] font-semibold leading-snug text-navy-deep">
                        {deliverable.item}
                      </dt>
                      <dd className="mt-0.5 text-[12.5px] text-ink-muted">
                        {deliverable.cadence}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>

              <Reveal className="mt-5 rounded-2xl border border-border bg-white p-7">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Other service lines
                </h2>
                <ul className="mt-5 space-y-1">
                  {others.map((other) => {
                    const OtherIcon = getIcon(other.icon);
                    return (
                      <li key={other.slug}>
                        <Link
                          href={`/services/${other.slug}`}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                        >
                          <OtherIcon
                            className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-brand"
                            aria-hidden="true"
                          />
                          <span className="flex-1 text-[14px] font-medium text-navy-deep transition-colors group-hover:text-brand">
                            {other.name}
                          </span>
                          <ArrowRight
                            className="h-3.5 w-3.5 shrink-0 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                            aria-hidden="true"
                          />
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </aside>
          </div>

          {/*
            Scope-of-practice notice. On service pages specifically, because
            this is where a reader is closest to assuming we sign or file.
          */}
          <Reveal className="mt-16 rounded-xl border border-border bg-slate-50 p-6">
            <p className="text-[13px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-navy-deep">Scope of practice.</strong>{" "}
              {boundary}
            </p>
          </Reveal>
        </div>
      </section>

      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.name,
          description: service.meta.description,
          url: `${site.url}/services/${service.slug}`,
          provider: { "@id": `${site.url}/#organization` },
          serviceType: service.name,
          areaServed: { "@type": "Country", name: "United States" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: `${service.name} scope`,
            itemListElement: service.scope.map((item) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: item },
            })),
          },
        }}
      />
    </>
  );
}
