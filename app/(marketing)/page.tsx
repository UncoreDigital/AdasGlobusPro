import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AccountingRoles from "@/components/sections/AccountingRoles";
import BusySeason from "@/components/sections/BusySeason";
import CTA from "@/components/sections/CTA";
import CostAdvantage from "@/components/sections/CostAdvantage";
import Coverage from "@/components/sections/Coverage";
import FreeTrial from "@/components/sections/FreeTrial";
import Hero from "@/components/sections/Hero";
import Software from "@/components/sections/Software";
import Testimonials from "@/components/sections/Testimonials";
import TrustCompliance from "@/components/sections/TrustCompliance";
import WhyUs from "@/components/sections/WhyUs";
import Workflow from "@/components/sections/Workflow";
import { homeCta } from "@/lib/content";
import { figure, getSettings, splitFigure } from "@/lib/settings";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: `${site.name} — ${site.proposition}`,
  description: site.description,
  alternates: { canonical: "/" },
};

/*
  Recomposed on the 24 August brief, which asked to cut the homepage length and
  the repetitive corporate language. Fourteen bands became twelve, and the ones
  that remain answer the questions in the order a firm asks them: I cannot
  staff April → here are the roles → here is what it costs → here is who is
  handling my clients' data → here is how it starts, free.

  Removed: AboutTeaser and Usps (both restated WhyUs in different words),
  ServicesGrid (still in the top nav and the footer), IndustriesGrid (footer
  only now — the brief asked to reduce the emphasis, not delete the pages, and
  they carry real search intent), and the standalone EngagementModels band,
  which is now a strip inside AccountingRoles where the question actually
  arises.

  The dark/light alternation is deliberate. CostAdvantage and WhyUs are both
  navy, so TrustCompliance sits between them rather than where its subject
  matter would otherwise put it.
*/
export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Hero clients={figure(settings.clients)} accuracy={figure(settings.accuracy)} />
      <BusySeason />
      <AccountingRoles />
      <CostAdvantage />
      <TrustCompliance />
      <WhyUs />
      <Workflow />
      <Coverage
        clients={splitFigure(settings.clients)}
        transactions={splitFigure(settings.transactions)}
      />
      <Software />
      <FreeTrial />
      <Testimonials />
      <CTA
        heading={homeCta.heading}
        body={homeCta.body}
        label={homeCta.cta.label}
        href={homeCta.cta.href}
      />

      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            "@id": `${site.url}/#organization`,
            name: site.name,
            description: site.description,
            url: site.url,
            logo: `${site.url}${site.logo}`,
            image: `${site.url}${site.ogImage}`,
            email: site.email,
            telephone: site.phone,
            foundingDate: String(site.founded),
            slogan: site.tagline,
            sameAs: Object.values(site.social),
            address: offices.map((office) => ({
              "@type": "PostalAddress",
              addressCountry: office.code,
              addressLocality: office.locality,
              streetAddress: office.address,
            })),
            areaServed: { "@type": "Country", name: "United States" },
            knowsAbout: [
              "Outsourced bookkeeping for CPA firms",
              "Offshore tax preparation staffing",
              "US GAAP",
              "IRS tax preparation",
              "Seasonal accounting capacity",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "@id": `${site.url}/#website`,
            url: site.url,
            name: site.name,
            publisher: { "@id": `${site.url}/#organization` },
          },
        ]}
      />
    </>
  );
}
