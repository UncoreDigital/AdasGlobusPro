import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import AccountingRoles from "@/components/sections/AccountingRoles";
import CostAdvantage from "@/components/sections/CostAdvantage";
import CTA from "@/components/sections/CTA";
import EngagementModels from "@/components/sections/EngagementModels";
import FreeTrial from "@/components/sections/FreeTrial";
import { accountingRoles, rolesIntro } from "@/lib/content";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Accounting Roles We Support — Staffing for U.S. CPA Firms",
  description:
    "Bookkeepers, accountants, tax preparers, reviewers, AP/AR, payroll and audit support — trained professionals who work inside your software. Part-time, full-time or seasonal.",
  alternates: { canonical: "/accounting-roles" },
};

/*
  The page the top nav now points at, in place of the industry hub.

  Ordered the way the conversation actually goes: which role, on what terms,
  what it costs, and how do I try it without committing. The engagement models
  band repeats the strip inside AccountingRoles at more depth — the strip
  answers "can I have this part-time?" in passing, this one answers "what does
  part-time actually mean?" for a reader who came here to find out.
*/
export default function AccountingRolesPage() {
  return (
    <>
      <PageBanner
        eyebrow={rolesIntro.eyebrow}
        title="The Accounting Roles We Staff"
        lead={rolesIntro.lead}
        breadcrumbs={[{ name: "Accounting Roles" }]}
      />

      <AccountingRoles showCta={false} showEngagements={false} />
      <EngagementModels />
      <CostAdvantage />
      <FreeTrial />
      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: "Accounting roles staffed by ADAS Globus Pro",
          url: `${site.url}/accounting-roles`,
          itemListElement: accountingRoles.map((role, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: role.name,
            description: role.body,
          })),
        }}
      />
    </>
  );
}
