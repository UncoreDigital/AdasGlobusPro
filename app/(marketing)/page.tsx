import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AboutTeaser from "@/components/sections/AboutTeaser";
import BusySeason from "@/components/sections/BusySeason";
import CTA from "@/components/sections/CTA";
import Coverage from "@/components/sections/Coverage";
import EngagementModels from "@/components/sections/EngagementModels";
import Hero from "@/components/sections/Hero";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import PricingTeaser from "@/components/sections/PricingTeaser";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Software from "@/components/sections/Software";
import Testimonials from "@/components/sections/Testimonials";
import Usps from "@/components/sections/Usps";
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

export default async function HomePage() {
  const settings = await getSettings();

  return (
    <>
      <Hero clients={figure(settings.clients)} accuracy={figure(settings.accuracy)} />
      <AboutTeaser
        professionals={figure(settings.employees)}
        engagements={figure(settings.projects)}
      />
      <ServicesGrid heading="Five Service Lines," accent="One Delivery Standard" />
      <BusySeason />
      <WhyUs />
      <EngagementModels />
      <Workflow />
      <IndustriesGrid compact />
      <Coverage
        clients={splitFigure(settings.clients)}
        transactions={splitFigure(settings.transactions)}
      />
      <Software />
      <Usps />
      <PricingTeaser />
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
            alternateName: site.markName,
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
              addressLocality: office.city,
              streetAddress: office.address,
            })),
            areaServed: { "@type": "Country", name: "United States" },
            knowsAbout: [
              "US GAAP",
              "IRS tax preparation",
              "PCAOB audit standards",
              "State and local tax compliance",
              "Offshore accounting outsourcing",
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
