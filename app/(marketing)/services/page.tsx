import type { Metadata } from "next";
import { Check } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Workflow from "@/components/sections/Workflow";
import { servicesIntro, services } from "@/lib/services-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Our Expertise — Accounting, Tax, Audit & Hiring Services",
  description: servicesIntro.body,
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Our Expertise"
        title={servicesIntro.subheading}
        lead={servicesIntro.body}
        chips={servicesIntro.pillars}
        breadcrumbs={[{ name: "Our Expertise" }]}
      />

      <ServicesGrid
        heading="Five Service Lines, One"
        accent="Delivery Standard"
        showCta={false}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
            <SectionHeading
              eyebrow="What You Get"
              title="The Same Delivery Standard on"
              accent="Every Service Line"
              lead="Whichever line you engage, the operating model underneath it does not change."
            />

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {servicesIntro.advantages.map((point: string) => (
                <RevealItem
                  key={point}
                  className="flex items-start gap-3 rounded-xl border border-border bg-slate-50 p-5 transition-colors hover:border-accent/50"
                >
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald" aria-hidden="true" />
                  <span className="text-[14.5px] font-medium leading-snug text-navy-deep">
                    {point}
                  </span>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      <Workflow />
      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "ADAS Globus Pro service lines",
          itemListElement: services.map((service, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: {
              "@type": "Service",
              name: service.name,
              description: service.summary,
              url: `${site.url}/services/${service.slug}`,
              provider: { "@id": `${site.url}/#organization` },
            },
          })),
        }}
      />
    </>
  );
}
