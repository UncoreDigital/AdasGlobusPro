import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import CountryCode from "@/components/CountryCode";
import JsonLd from "@/components/JsonLd";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import { offices, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Schedule a Call — Talk to ADAS Globus Pro",
  description:
    "Tell us your volumes, your software and your review protocol. A senior member of the advisory team responds within one business day with a proposed engagement structure.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        eyebrow="Schedule a Call"
        title="Let's Talk About What Your Firm Actually Needs"
        lead="Not a sales script. Tell us the volumes, the software and the review standard you work to, and we will come back with a concrete engagement structure — or tell you honestly if we are not the right fit."
        breadcrumbs={[{ name: "Schedule a Call" }]}
      />

      <section className="section bg-white">
        <div className="container">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-navy-deep">Send us the details</h2>
              <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">
                Fields marked <span className="text-accent-dark">*</span> are required.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </Reveal>

            <aside className="space-y-5">
              <Reveal className="rounded-2xl border border-border bg-slate-50 p-7">
                <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-ink-muted">
                  Direct lines
                </h2>
                <ul className="mt-5 space-y-4">
                  <li>
                    <a
                      href={site.emailHref}
                      className="group flex items-center gap-3.5 text-[14.5px] font-medium text-navy-deep transition-colors hover:text-brand"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-soft">
                        <Mail className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {site.email}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.phoneHref}
                      className="group flex items-center gap-3.5 text-[14.5px] font-medium text-navy-deep transition-colors hover:text-brand"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-brand shadow-soft">
                        <Phone className="h-4 w-4" aria-hidden="true" />
                      </span>
                      {site.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={site.whatsapp}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center gap-3.5 text-[14.5px] font-medium text-navy-deep transition-colors hover:text-brand"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-emerald shadow-soft">
                        <MessageCircle className="h-4 w-4" aria-hidden="true" />
                      </span>
                      WhatsApp
                    </a>
                  </li>
                </ul>

                <p className="mt-6 flex items-start gap-2.5 border-t border-border pt-5 text-[13px] leading-relaxed text-ink-muted">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-accent-dark" aria-hidden="true" />
                  Time-zone aligned delivery with extended support beyond standard business
                  hours. Response within one business day.
                </p>
              </Reveal>

              <RevealGroup className="space-y-4">
                {offices.map((office) => (
                  <RevealItem
                    key={office.country}
                    className="rounded-2xl border border-border bg-white p-6"
                  >
                    <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-dark">
                      {office.role}
                    </p>
                    <h3 className="mt-2 flex items-center gap-2.5 text-[13px] font-bold uppercase tracking-[0.14em] text-navy-deep">
                      <CountryCode code={office.code} />
                      {office.city}
                    </h3>
                    <p className="mt-3 flex gap-2.5 text-[13.5px] leading-relaxed text-ink-muted">
                      <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      {office.address}
                    </p>
                    <a
                      href={office.phoneHref}
                      className="mt-2.5 inline-block text-[13.5px] font-semibold text-brand hover:text-brand-light"
                    >
                      {office.phone}
                    </a>
                  </RevealItem>
                ))}
              </RevealGroup>
            </aside>
          </div>
        </div>
      </section>

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ContactPage",
          url: `${site.url}/contact`,
          mainEntity: {
            "@id": `${site.url}/#organization`,
            "@type": "Organization",
            name: site.name,
            contactPoint: offices.map((office) => ({
              "@type": "ContactPoint",
              telephone: office.phone,
              email: site.email,
              contactType: "sales",
              areaServed: office.country,
              availableLanguage: "English",
            })),
          },
        }}
      />
    </>
  );
}
