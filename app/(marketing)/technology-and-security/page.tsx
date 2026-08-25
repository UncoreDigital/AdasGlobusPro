import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import Software from "@/components/sections/Software";
import { certifications, technology } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { features, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Security & Technology — How We Handle Your Clients' Data",
  description: technology.subheading,
  alternates: { canonical: "/technology-and-security" },
};

/*
  Rewritten on the 24 August brief, which asked for two things at once: replace
  the generic security language with the actual infrastructure, and stop the
  site reading like an AI company.

  So the order changed. Controls come first and technology second, because the
  question a partner asks before signing is where their clients' data goes — not
  which platforms we run. The previous page opened with three "pillars" about
  cloud-native architecture and AI-enabled workflow, which answered a question
  nobody had asked.
*/
export default function TechnologyPage() {
  const published = features.certifications
    ? certifications.filter((c) => c.published)
    : [];

  return (
    <>
      <PageBanner
        eyebrow="Security & Technology"
        title={technology.subheading}
        lead="A locked-down delivery environment, controlled physical access, and a review protocol you can put in front of a peer reviewer."
        breadcrumbs={[{ name: "Security & Technology" }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="mx-auto max-w-3xl space-y-5">
            {technology.intro.map((paragraph) => (
              <Reveal key={paragraph}>
                <p className="text-[16px] leading-[1.8] text-ink-muted">{paragraph}</p>
              </Reveal>
            ))}
          </div>

          {published.length > 0 && (
            <Reveal className="mt-12">
              <ul className="mx-auto flex max-w-3xl flex-wrap justify-center gap-4">
                {published.map((cert) => {
                  const Icon = getIcon(cert.icon);
                  return (
                    <li
                      key={cert.name}
                      className="flex items-center gap-3.5 rounded-xl border border-emerald-mint/40 bg-emerald-mint/[0.07] px-5 py-4"
                    >
                      <Icon
                        className="h-5 w-5 shrink-0 text-emerald"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block text-[14px] font-bold text-navy-deep">
                          {cert.name} Certified
                        </span>
                        <span className="block text-[12.5px] text-ink-muted">
                          {cert.detail}
                        </span>
                      </span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          )}
        </div>
      </section>

      {/* The controls themselves — the substance of the page. */}
      <section className="section relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <SectionHeading
            eyebrow="Information Security"
            title="The Controls That Govern"
            accent="Every Engagement"
            lead="Client financial data is the most sensitive thing a firm hands to a staffing partner. These are the specific controls that apply, not a description of our intentions."
            align="center"
            onDark
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {technology.controls.map((control, i) => {
              const Icon = getIcon(control.icon);
              return (
                <RevealItem
                  key={control.title}
                  className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-white/[0.04] p-7 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
                >
                  <span
                    className="pointer-events-none absolute right-5 top-5 font-display text-[3rem] font-extrabold leading-none text-white/[0.04]"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-lg bg-white/5 text-accent-light transition-colors group-hover:bg-accent group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="relative mt-5 text-[15.5px] font-bold leading-snug text-white">
                    {control.title}
                  </h2>
                  <p className="relative mt-3 flex-1 text-[13.5px] leading-[1.75] text-white/60">
                    {control.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Technology, deliberately second and deliberately short. */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Technology"
            title="We Work in Your Systems,"
            accent="Not Ours"
            lead="No migration, no parallel chart of accounts, and nothing your clients would notice. Automation is used where it removes error — it is not what we sell."
            align="center"
          />
          <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {technology.capabilities.map((capability) => {
              const Icon = getIcon(capability.icon);
              return (
                <RevealItem
                  key={capability.title}
                  className="flex items-center gap-4 rounded-xl border border-border bg-white p-6 transition-all hover:-translate-y-1 hover:border-accent/50 hover:shadow-card"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent-dark">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="text-[14.5px] font-medium leading-snug text-navy-deep">
                    {capability.title}
                  </span>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      <Software variant="grouped" />
      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Security & Technology",
          url: `${site.url}/technology-and-security`,
          description: technology.subheading,
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
    </>
  );
}
