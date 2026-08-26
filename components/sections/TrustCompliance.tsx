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
 * Two tiers, because a prospect reads them differently. The certificates are an
 * outside party's word and get the weight; the controls are ours and sit
 * underneath as the detail. Running them as one flat row of seven made the
 * audited claims look like the same kind of statement as "USB ports disabled",
 * which undersells the two that a due-diligence checklist actually asks about.
 *
 * Certificate numbers render only when set — see the note on `certifications`
 * in lib/content.ts. Nothing here invents a specific a prospect could check.
 */
export default function TrustCompliance() {
  const published = features.certifications
    ? certifications.filter((c) => c.published)
    : [];

  return (
    <section className="section bg-slate-50">
      <div className="container">
        <SectionHeading
          eyebrow={trustStrip.eyebrow}
          title="Your Clients' Data, Under"
          accent="Controls You Can Verify"
          lead={trustStrip.lead}
          align="center"
        />

        {published.length > 0 && (
          <RevealGroup className="mx-auto mt-12 grid max-w-4xl gap-4 sm:grid-cols-2">
            {published.map((cert) => {
              const Icon = getIcon(cert.icon);
              return (
                <RevealItem
                  key={cert.name}
                  className="flex gap-4 rounded-2xl border border-emerald-mint/40 bg-white p-6 shadow-card sm:p-7"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald/10 text-emerald">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>

                  <div className="min-w-0">
                    <p className="text-[16px] font-extrabold leading-tight text-navy-deep">
                      {cert.name}
                      <span className="ml-2 align-middle text-[11px] font-bold uppercase tracking-[0.1em] text-emerald">
                        Certified
                      </span>
                    </p>
                    <p className="mt-1 text-[13px] font-semibold text-accent-dark">
                      {cert.scope}
                    </p>
                    <p className="mt-2.5 text-[13.5px] leading-[1.65] text-ink-muted">
                      {cert.detail}
                    </p>

                    {(cert.certificateNo || cert.registrar) && (
                      <p className="mt-3 border-t border-border pt-3 text-[12px] text-slate-500">
                        {cert.certificateNo && (
                          <span className="font-medium">
                            Certificate {cert.certificateNo}
                          </span>
                        )}
                        {cert.certificateNo && cert.registrar && " · "}
                        {cert.registrar && <span>Issued by {cert.registrar}</span>}
                      </p>
                    )}
                  </div>
                </RevealItem>
              );
            })}
          </RevealGroup>
        )}

        <Reveal className="mt-10">
          <p className="text-center text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
            And the controls those audits cover
          </p>
        </Reveal>

        <RevealGroup className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
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
