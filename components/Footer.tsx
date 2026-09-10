import Link from "next/link";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import CountryCode from "@/components/CountryCode";
import Logo from "@/components/brand/Logo";
import { footerNav, offices, site } from "@/lib/site";
import { getSettings, figure } from "@/lib/settings";

const socials = [
  { name: "LinkedIn", href: site.social.linkedin, Icon: Linkedin },
  { name: "Facebook", href: site.social.facebook, Icon: Facebook },
  { name: "Instagram", href: site.social.instagram, Icon: Instagram },
];

export default async function Footer() {
  const settings = await getSettings();
  const phone = settings.phone ?? site.phone;

  return (
    <footer className="relative overflow-hidden bg-navy-deep text-white">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" aria-hidden="true" />
      {/* Accent hairline: the same rule that sits under the wordmark in the logo. */}
      <div
        className="absolute inset-x-0 top-0 h-px"
        style={{ backgroundImage: "var(--gradient-accent-x)" }}
        aria-hidden="true"
      />

      <div className="container relative">
        <div className="grid gap-12 py-16 lg:grid-cols-[1.25fr_2.5fr] lg:gap-16 lg:py-20">
          <div>
            <Link href="/" className="inline-flex" aria-label={`${site.name} home`}>
              <Logo size="lg" tone="dark" />
            </Link>

            <p className="mt-6 max-w-sm text-[14.5px] leading-relaxed text-white/60">
              {site.description}
            </p>

            <div className="mt-7 space-y-2.5">
              <a
                href={`tel:${phone.replace(/[^\d+]/g, "")}`}
                className="flex items-center gap-2.5 text-[14px] text-white/75 transition-colors hover:text-accent-light"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {figure(phone)}
              </a>
              <a
                href={site.emailHref}
                className="flex items-center gap-2.5 text-[14px] text-white/75 transition-colors hover:text-accent-light"
              >
                <Mail className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {site.email}
              </a>
            </div>

            <ul className="mt-7 flex gap-2.5">
              {socials.map(({ name, href, Icon }) => (
                <li key={name}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={name}
                    className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white/70 transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-white/5 hover:text-accent-light"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            {footerNav.map((column) => (
              <div key={column.heading}>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-accent-light">
                  {column.heading}
                </h3>
                <ul className="mt-5 space-y-3">
                  {column.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[14px] text-white/65 transition-colors hover:text-white"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Offices */}
        <div className="grid gap-8 border-t border-white/10 py-12 sm:grid-cols-2 lg:grid-cols-3">
          {offices.map((office) => (
            <div key={office.id}>
              <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-accent-light">
                {office.role}
              </p>
              <h3 className="mt-2 flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-white">
                <CountryCode code={office.code} tone="dark" />
                {office.city}
              </h3>
              <p className="mt-3 flex gap-2.5 text-[13.5px] leading-relaxed text-white/60">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {office.address}
              </p>
              <a
                href={office.phoneHref}
                className="mt-2.5 inline-flex items-center gap-2.5 text-[13.5px] text-white/75 transition-colors hover:text-accent-light"
              >
                <Phone className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                {office.phone}
              </a>
            </div>
          ))}
        </div>

        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/10 py-7 text-[13px] text-white/45 sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.legalName}. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="transition-colors hover:text-white/80">
              Privacy Policy
            </Link>
            <a
              href={site.globalSite}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/80"
            >
              Global site
            </a>
            <a
              href={site.builtBy.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/80"
            >
              Powered by {site.builtBy.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
