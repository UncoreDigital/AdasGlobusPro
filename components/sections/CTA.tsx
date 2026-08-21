import { ArrowRight, Mail, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { Button } from "@/components/ui/Button";
import { buildCta } from "@/lib/content";
import { site } from "@/lib/site";

/**
 * The closing band. Defaults to the client's own "Let's Build Your Solution"
 * wording, which appears at the foot of every interior page on the live site;
 * the homepage passes its longer variant instead.
 */
export default function CTA({
  heading = buildCta.heading,
  body = buildCta.body,
  label = buildCta.cta.label,
  href = buildCta.cta.href,
}: {
  heading?: string;
  body?: string;
  label?: string;
  href?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-deep/70" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      <div
        className="pointer-events-none absolute -right-20 -top-24 h-[28rem] w-[28rem] rounded-full opacity-30 blur-[110px]"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-hidden="true"
      />

      <div className="container relative py-16 md:py-24">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-[1.75rem] font-extrabold leading-[1.15] text-white sm:text-4xl lg:text-[2.6rem]">
            {heading}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-[15.5px] leading-[1.75] text-white/70">
            {body}
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Button href={href} size="lg">
              {label}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={site.phoneHref} size="lg" variant="onDark">
              <Phone className="h-4 w-4" aria-hidden="true" />
              {site.phone}
            </Button>
          </div>

          <a
            href={site.emailHref}
            className="mt-7 inline-flex items-center gap-2 text-[14px] text-white/55 transition-colors hover:text-accent-light"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            {site.email}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
