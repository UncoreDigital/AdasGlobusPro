import Link from "next/link";
import { ArrowRight } from "lucide-react";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { certifications, trustStrip } from "@/lib/content";
import { getIcon } from "@/lib/icons";
import { features } from "@/lib/site";

/**
 * Trust & compliance — the band the client asked to make "highly visible on the
 * homepage".
 *
 * Certifications and controls sit together because a prospect reads them as one
 * answer to one question. The certification row renders only entries flagged
 * `published` in lib/content.ts, so an unverified claim cannot reach the page by
 * accident: the ISO entry is waiting on the client's exact certificate wording
 * and stays dark until it arrives.
 */
export default function TrustCompliance() {
  const published = features.certifications
    ? certifications.filter((c) => c.published)
    : [];

  return (
    <section className="section-tight bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow={trustStrip.eyebrow}
          title="Your Clients' Data, Under"
          accent="Controls You Can Verify"
          lead={trustStrip.lead}
          align="center"
        />

        {published.length > 0 && (
          <Reveal className="mt-10">
            <ul className="flex flex-wrap justify-center gap-4">
              {published.map((cert) => {
                const Icon = getIcon(cert.icon);
                return (
                  <li
                    key={cert.name}
                    className="flex items-center gap-3.5 rounded-xl border border-emerald-mint/40 bg-white px-5 py-4 shadow-card"
                  >
                    <Icon className="h-6 w-6 shrink-0 text-emerald" aria-hidden="true" />
                    <span>
                      <span className="block text-[14.5px] font-extrabold text-navy-deep">
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

        <RevealGroup className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {trustStrip.items.map((item) => {
            const Icon = getIcon(item.icon);
            return (
              <RevealItem
                key={item.title}
                className="flex flex-col items-center gap-3 rounded-xl border border-border bg-white px-4 py-6 text-center transition-colors hover:border-accent/50"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-[13.5px] font-semibold leading-snug text-navy-deep">
                  {item.title}
                </span>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-8 text-center">
          <Link
            href={trustStrip.cta.href}
            className="inline-flex items-center gap-2 text-[14px] font-bold text-brand transition-colors hover:text-accent-dark"
          >
            {trustStrip.cta.label}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
