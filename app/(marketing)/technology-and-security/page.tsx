import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import CTA from "@/components/sections/CTA";
import Software from "@/components/sections/Software";
import { technology } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Technology & Security — AI-Augmented, ISO 27001-Aligned Delivery",
  description: technology.subheading,
  alternates: { canonical: "/technology-and-security" },
};

export default function TechnologyPage() {
  return (
    <>
      <PageBanner
        eyebrow="Technology & Security"
        title={technology.subheading}
        lead="Cloud-native accounting platforms, AI-enabled workflow automation and advanced analytics — governed by an ISO 27001-aligned information security environment."
        breadcrumbs={[{ name: "Technology & Security" }]}
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

          <RevealGroup className="mt-16 grid gap-5 lg:grid-cols-3">
            {technology.pillars.map((pillar, i) => {
              const Icon = getIcon(pillar.icon);
              return (
                <RevealItem
                  key={pillar.title}
                  className="card-edge group relative flex h-full flex-col p-8 hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <span
                    className="pointer-events-none absolute right-5 top-5 font-display text-[3.5rem] font-extrabold leading-none text-slate-100"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h2 className="relative mt-6 text-[17px] font-bold leading-snug text-navy-deep">
                    {pillar.title}
                  </h2>
                  <p className="relative mt-3.5 flex-1 text-[14.5px] leading-[1.75] text-ink-muted">
                    {pillar.body}
                  </p>
                </RevealItem>
              );
            })}
          </RevealGroup>
        </div>
      </section>

      {/* Capabilities */}
      <section className="section bg-slate-50">
        <div className="container">
          <SectionHeading
            eyebrow="Capabilities"
            title="What the Delivery Environment"
            accent="Actually Gives You"
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

      {/* Security controls */}
      <section className="section relative overflow-hidden bg-navy-deep">
        <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
        <div className="container relative">
          <div className="grid gap-14 lg:grid-cols-[1fr_1.35fr] lg:gap-16">
            <div>
              <SectionHeading
                eyebrow="Information Security"
                title="Designed for the Expectations of"
                accent="Regulated Professional Services"
                lead="Client financial data is the most sensitive thing a firm hands to an outsourcing partner. These are the controls that govern how it is accessed, handled and reviewed."
                onDark
              />

              <Reveal className="mt-8 inline-flex items-center gap-3.5 rounded-xl border border-emerald-mint/30 bg-emerald-mint/10 px-5 py-4">
                <ShieldCheck className="h-5 w-5 shrink-0 text-emerald-mint" aria-hidden="true" />
                <div>
                  <p className="text-[14px] font-bold text-white">ISO 27001-aligned</p>
                  <p className="text-[12.5px] text-white/60">
                    Policy, risk assessment and control objectives modelled on the standard
                  </p>
                </div>
              </Reveal>
            </div>

            <RevealGroup className="grid gap-4 sm:grid-cols-2">
              {technology.controls.map((control) => {
                const Icon = getIcon(control.icon);
                return (
                  <RevealItem
                    key={control.title}
                    className="rounded-xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-accent/40 hover:bg-white/[0.07]"
                  >
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 text-accent-light">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <h3 className="mt-4 text-[14.5px] font-bold text-white">{control.title}</h3>
                    <p className="mt-2 text-[13px] leading-relaxed text-white/60">
                      {control.body}
                    </p>
                  </RevealItem>
                );
              })}
            </RevealGroup>
          </div>
        </div>
      </section>

      <Software variant="grouped" />
      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: "Technology & Security",
          url: `${site.url}/technology-and-security`,
          description: technology.subheading,
          isPartOf: { "@id": `${site.url}/#website` },
        }}
      />
    </>
  );
}
