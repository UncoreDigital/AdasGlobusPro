import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.name} collects, uses and protects personal information submitted through this website.`,
  alternates: { canonical: "/privacy-policy" },
  robots: { index: true, follow: true },
};

/**
 * CLIENT / LEGAL TO REVIEW.
 *
 * This is a working draft that describes what the site actually does — the
 * contact form, the data it stores, where it is stored and who can reach it.
 * It is accurate about the mechanics, but it has not been reviewed by counsel
 * and it does not attempt to enumerate every obligation across the five
 * jurisdictions ADAS Globus Pro operates in. It must be reviewed before launch.
 */
export default function PrivacyPolicyPage() {
  const sections = [
    {
      heading: "What we collect",
      body: [
        "When you submit the contact form we collect the name, work email, firm or company name, phone number, country, service interests and message you provide, together with the page you submitted from and the time of submission.",
        "We do not collect payment information through this website, and we do not ask for client financial data through any public form on this site.",
      ],
    },
    {
      heading: "Why we collect it",
      body: [
        "Solely to respond to your enquiry and, where you go on to engage us, to set up and administer that engagement. We do not sell personal information, and we do not share it with third parties for their own marketing.",
      ],
    },
    {
      heading: "Where it is stored",
      body: [
        "Form submissions are stored in a managed Postgres database operated by Supabase, protected by row-level security so that only authenticated administrators of this site can read them. Access is limited to the ADAS Globus Pro personnel who need it to respond to you.",
      ],
    },
    {
      heading: "How long we keep it",
      body: [
        "Enquiries that do not become engagements are retained for up to 24 months so we can pick up a conversation you resume, then deleted. Records relating to an active or past engagement are retained for as long as the engagement and any applicable professional or statutory retention period require.",
      ],
    },
    {
      heading: "Cookies and analytics",
      body: [
        "This site sets no advertising or cross-site tracking cookies. Authentication cookies are set only within the administrator area at /admin and are never set for public visitors.",
      ],
    },
    {
      heading: "Your rights",
      body: [
        "Depending on where you are located, you may have the right to request a copy of the personal information we hold about you, to have it corrected, or to have it deleted. Write to us at the address below and we will respond within the period required by the applicable law.",
      ],
    },
    {
      heading: "Client data under engagement",
      body: [
        "Personal and financial data we process on behalf of a client firm under an engagement is governed by that engagement's contract, confidentiality agreement and data protection terms — not by this website policy. Our information security environment is described on the Technology & Security page.",
      ],
    },
    {
      heading: "Contact",
      body: [
        `Questions about this policy, or any request relating to your personal information, can be sent to ${site.email}.`,
      ],
    },
  ];

  return (
    <>
      <PageBanner
        eyebrow="Legal"
        title="Privacy Policy"
        lead="How we handle information submitted through this website."
        breadcrumbs={[{ name: "Privacy Policy" }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-[46rem]">
            <p className="rounded-xl border border-accent/30 bg-accent/5 p-5 text-[13.5px] leading-relaxed text-ink-muted">
              <strong className="font-semibold text-navy-deep">Draft pending legal review.</strong>{" "}
              This policy accurately describes what this website does with the information
              you submit. It has not yet been reviewed by counsel against every jurisdiction
              in which ADAS Globus Pro operates.
            </p>

            <div className="prose-adas mt-10">
              {sections.map((section) => (
                <section key={section.heading}>
                  <h2>{section.heading}</h2>
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
