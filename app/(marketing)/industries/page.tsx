import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import CTA from "@/components/sections/CTA";
import IndustriesGrid from "@/components/sections/IndustriesGrid";
import { industries, industriesIntro } from "@/lib/industries-data";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Industries We Serve — Sector-Specific Accounting Expertise",
  description: industriesIntro.subheading,
  alternates: { canonical: "/industries" },
};

export default function IndustriesPage() {
  return (
    <>
      <PageBanner
        eyebrow="Industries We Serve"
        title={industriesIntro.subheading}
        lead={industriesIntro.body}
        breadcrumbs={[{ name: "Industries We Serve" }]}
      />

      <IndustriesGrid compact />
      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Industries served by ADAS Globus Pro",
          itemListElement: industries.map((industry, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: industry.name,
            url: `${site.url}/industries/${industry.slug}`,
          })),
        }}
      />
    </>
  );
}
