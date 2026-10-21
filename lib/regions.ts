/**
 * The countries the site serves, and what changes when a visitor switches.
 *
 * Added on the 17 October 2026 call. The firm now runs U.S. and Canadian
 * practices, and the client asked for a country switch at the top right of the
 * header: pick a country and the services menu shows that country's offering.
 *
 * Built as a list rather than a U.S./Canada pair on purpose. The client
 * mentioned the UK, Europe and Australia as possible next markets, which is
 * why the switch is a dropdown rather than two tabs (see `features.regionSwitcher`
 * in lib/site.ts). Adding a country is a new entry here and a flag in
 * components/Flag.tsx; nothing in the header changes.
 *
 * What a switch does today: it swaps the "Our Expertise" dropdown and remembers
 * the choice in the visitor's browser. It does not change URLs, so it carries
 * no SEO weight. If Canada later gets its own pages, the switch should route to
 * them (a /ca/ path or a separate domain, with hreflang) instead.
 */

export type RegionCode = "us" | "ca";

/** ISO 3166 codes for the countries above. components/Flag.tsx draws each. */
export type CountryIso = "US" | "CA";

export type RegionLink = { name: string; href: string; blurb?: string };

export type Region = {
  code: RegionCode;
  /** ISO code, for the flag and CountryCode chips. */
  iso: CountryIso;
  /** Full name, for the menu. */
  name: string;
  /** Short form for the switch button itself. */
  short: string;
  /** One line under the name in the menu. */
  tagline: string;
  /** The "Our Expertise" dropdown for this country. */
  services: RegionLink[];
};

export const regions: Region[] = [
  {
    code: "us",
    iso: "US",
    name: "United States",
    short: "U.S.",
    tagline: "Services for U.S. firms",
    services: [
      {
        name: "Dynamic Solutions Suite",
        href: "/services/dynamic-solutions-suite",
        blurb: "Accounting, tax, compliance and audit under one framework",
      },
      {
        name: "Elite Accounting Solutions",
        href: "/services/elite-accounting-solutions",
        blurb: "Audit-ready books, reconciliations and month-end close",
      },
      {
        name: "Spectrum of Taxes",
        href: "/services/spectrum-of-taxes",
        blurb: "1040 through 990, SALT and international information returns",
      },
      {
        name: "Audit Excellence",
        href: "/services/audit-excellence",
        blurb: "Working papers, substantive testing, SOX and SOC support",
      },
      {
        name: "Dedicated Offshore Professionals",
        href: "/services/dedicated-offshore-professionals",
        blurb: "Trained accountants as an extension of your team, not a recruitment fee",
      },
    ],
  },
  {
    code: "ca",
    iso: "CA",
    name: "Canada",
    short: "Canada",
    tagline: "Services for Canadian firms",
    /*
      ⚠️ CLIENT TO SUPPLY: the Canadian service list. On the 17 October call
      the client said the list differs by country and that they would provide
      it, along with the technical pointers on Canadian forms and software.

      Until then this mirrors the U.S. lines, with the blurbs reworded so that
      nothing U.S.-only (SALT, SOX, 1040) is claimed for Canada. The T1/T2/T3
      wording is from the client's own mockup of the tax card.
    */
    services: [
      {
        name: "Dynamic Solutions Suite",
        href: "/services/dynamic-solutions-suite",
        blurb: "Accounting, tax, compliance and audit under one framework",
      },
      {
        name: "Elite Accounting Solutions",
        href: "/services/elite-accounting-solutions",
        blurb: "Audit-ready books, reconciliations and month-end close",
      },
      {
        name: "Spectrum of Taxes",
        href: "/services/spectrum-of-taxes",
        blurb: "T1, T2 and T3 returns prepared to CRA requirements",
      },
      {
        name: "Audit Excellence",
        href: "/services/audit-excellence",
        blurb: "Working papers, testing and control documentation to your methodology",
      },
      {
        name: "Dedicated Offshore Professionals",
        href: "/services/dedicated-offshore-professionals",
        blurb: "Trained accountants as an extension of your team, not a recruitment fee",
      },
    ],
  },
];

export const defaultRegion: RegionCode = "us";

export function getRegion(code: RegionCode): Region {
  return regions.find((r) => r.code === code) ?? regions[0];
}

export function isRegionCode(value: unknown): value is RegionCode {
  return regions.some((r) => r.code === value);
}
