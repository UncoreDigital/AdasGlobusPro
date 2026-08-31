import { Mail, MapPin, Phone } from "lucide-react";
import { getSettings } from "@/lib/settings";
import { offices, site } from "@/lib/site";

/**
 * Utility strip above the header.
 *
 * The global site puts a six-country strip here. On the U.S. site that space
 * carries the one thing a visiting partner is checking instead: that there is a
 * real U.S. office and a U.S. number to call.
 *
 * Hidden below md — on a phone the contact details are one tap away in the
 * drawer and the footer, and 40px of chrome above a sticky header costs more
 * than it returns on a 667px-tall screen.
 */
export default async function TopBar() {
  const us = offices.find((o) => o.primary) ?? offices[0];

  /*
    The admin can override the published number; lib/site.ts is the fallback.
    Read here rather than passed down, because this component is rendered by the
    marketing layout and has no props to thread it through.
  */
  const settings = await getSettings();
  const phone = settings.phone ?? site.phone;

  return (
    <div className="hidden h-10 items-center border-b border-white/10 bg-navy-deep text-white md:flex">
      <div className="container flex items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <a
            href={`tel:${phone.replace(/[^\d+]/g, "")}`}
            className="flex items-center gap-2 text-[12.5px] text-white/75 transition-colors hover:text-accent-light"
          >
            <Phone className="h-3.5 w-3.5" aria-hidden="true" />
            {phone}
          </a>
          <a
            href={site.emailHref}
            className="flex items-center gap-2 text-[12.5px] text-white/75 transition-colors hover:text-accent-light"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden="true" />
            {site.email}
          </a>
        </div>

        <div className="flex items-center gap-5">
          <span className="hidden items-center gap-2 text-[12.5px] text-white/60 lg:flex">
            <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            {us.city}
          </span>
          <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-accent-light">
            Serving U.S. CPA Firms Nationwide
          </span>
        </div>
      </div>
    </div>
  );
}
