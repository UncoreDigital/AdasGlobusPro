import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AlertTriangle, ArrowRight, Check } from "lucide-react";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import { getIcon } from "@/lib/icons";
import { getIndustry, industries, industrySlugs } from "@/lib/industries-data";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return industrySlugs.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const industry = getIndustry(params.slug);
  if (!industry) return {};
  return {
    title: industry.meta.title,
    description: industry.meta.description,
    alternates: { canonical: `/industries/${industry.slug}` },
    openGraph: {
      title: industry.meta.title,
      description: industry.meta.description,
      url: `${site.url}/industries/${industry.slug}`,
    },
  };
}

export default function IndustryPage({ params }: { params: { slug: string } }) {
  const industry = getIndustry(params.slug);
  if (!industry) notFound();

  const others = industries.filter((i) => i.slug !== industry.slug);
  const Icon = getIcon(industry.icon);

  return (
    <>
      <PageBanner
        eyebrow="Industries We Serve"
        title={industry.heading}
        qualifier={industry.qualifier}
        lead={industry.summary}
        breadcrumbs={[
          { name: "Industries We Serve", href: "/industries" },
          { name: industry.name },
        ]}
        image={industry.imageHd}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl">
            <Reveal>
              <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-navy-deep text-accent-light">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="mt-7 space-y-5">
                {industry.intro.map((paragraph) => (
                  <p key={paragraph} className="text-[16px] leading-[1.8] text-ink-muted">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What actually goes wrong */}
      <section className="section-tight relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <SectionHeading
            eyebrow="What Goes Wrong"
            title="The Problems We See Most in"
            accent={industry.name}
            lead="Sector expertise is only credible when it names the thing the sector actually struggles with. These are the recurring ones."
            onDark
          />

          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2">
            {industry.challenges.map((challenge) => (
              <RevealItem
                key={challenge.title}
                className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent-light">
                  <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-[15px] font-bold leading-snug text-white">
                  {challenge.title}
                </h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-white/60">
                  {challenge.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Scope + rail */}
      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-14 lg:grid-cols-[1.35fr_1fr] lg:gap-16">
            <div>
              <Reveal>
                <h2 className="text-xl font-bold text-navy-deep sm:text-2xl">
                  What we handle for {industry.name.toLowerCase()} clients
                </h2>
              </Reveal>

              <RevealGroup className="mt-6 grid gap-3">
                {industry.scope.map((item) => (
                  <RevealItem
                    key={item}
                    className="flex gap-3.5 rounded-xl border border-border bg-slate-50 p-5 transition-colors hover:border-accent/50"
                  >
                    <span
                      className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald/10"
                      aria-hidden="true"
                    >
                      <Check className="h-3 w-3 text-emerald" />
                    </span>
                    <span className="text-[14.5px] leading-[1.7] text-ink-muted">{item}</span>
                  </RevealItem>
                ))}
              </RevealGroup>
            </div>

            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal className="rounded-2xl border border-accent/30 bg-navy-deep p-7 text-white">
                <h2 className="text-lg font-bold text-white">
                  Talk to someone who knows the sector
                </h2>
                <p className="mt-3 text-[14px] leading-[1.7] text-white/65">
                  Bring the awkward question — the one your last provider could not answer.
                  One business day to a proposed engagement structure.
                </p>
                <Link
                  href="/contact"
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-lg text-[14.5px] font-semibold text-navy-deep transition-all hover:-translate-y-0.5"
                  style={{ backgroundImage: "var(--gradient-accent-x)" }}
                >
                  Schedule a call
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Reveal>

              <Reveal className="mt-5 rounded-2xl border border-border bg-white p-7">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Other sectors
                </h2>
                <ul className="mt-5 space-y-1">
                  {others.map((other) => {
                    const OtherIcon = getIcon(other.icon);
                    return (
                      <li key={other.slug}>
                        <Link
                          href={`/industries/${other.slug}`}
                          className="group flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-slate-50"
                        >
                          <OtherIcon
                            className="h-4 w-4 shrink-0 text-slate-400 transition-colors group-hover:text-brand"
                            aria-hidden="true"
                          />
                          <span className="flex-1 text-[14px] font-medium text-navy-deep transition-colors group-hover:text-brand">
                            {other.name}
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      <section className="section-tight bg-slate-50">
        <div className="container max-w-3xl">
          <SectionHeading
            eyebrow="FAQs"
            title="Common Questions From"
            accent={`${industry.name} Clients`}
            align="center"
          />
          <div className="mt-10">
            <FaqAccordion items={industry.faqs} defaultOpen={0} />
          </div>
        </div>
      </section>

      <CTA />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: `${industry.name} accounting outsourcing`,
            description: industry.meta.description,
            url: `${site.url}/industries/${industry.slug}`,
            provider: { "@id": `${site.url}/#organization` },
            areaServed: { "@type": "Country", name: "United States" },
            audience: { "@type": "BusinessAudience", name: industry.name },
          },
          {
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: industry.faqs.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          },
        ]}
      />
    </>
  );
}
