import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { allFaqs, faqs } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQs — Engagement, Security, Pricing and Support",
  description:
    "Answers on what ADAS Globus does, who we serve, how engagements are structured, how client data is protected, how pricing works and how we communicate.",
  alternates: { canonical: "/faqs" },
};

export default function FaqsPage() {
  return (
    <>
      <PageBanner
        eyebrow="FAQs"
        title="Questions Firms Ask Before They Engage Us"
        lead="If something here is not covered, ask directly — a senior member of the advisory team will answer within one business day."
        breadcrumbs={[{ name: "FAQs" }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[16rem_1fr] lg:gap-16">
            {/* Group index. Anchors rather than a filter: nineteen answers is a
                page to read through, and hiding four fifths of it behind tabs
                costs more than the scroll it saves. */}
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <Reveal>
                <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Jump to
                </p>
                <nav className="mt-5" aria-label="FAQ sections">
                  <ul className="space-y-1">
                    {faqs.map((group) => (
                      <li key={group.group}>
                        <a
                          href={`#${slug(group.group)}`}
                          className="group flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-medium text-navy-deep transition-colors hover:bg-slate-50 hover:text-brand"
                        >
                          {group.group}
                          <span className="text-[12px] text-slate-400">
                            {group.items.length}
                          </span>
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </Reveal>
            </aside>

            <div className="space-y-14">
              {faqs.map((group) => (
                <section key={group.group} id={slug(group.group)} className="scroll-mt-32">
                  <Reveal>
                    <h2 className="text-xl font-extrabold text-navy-deep sm:text-2xl">
                      {group.group}
                    </h2>
                  </Reveal>
                  <div className="mt-6">
                    <FaqAccordion items={group.items} />
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          url: `${site.url}/faqs`,
          mainEntity: allFaqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
          })),
        }}
      />
    </>
  );
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}
