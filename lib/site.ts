import { normaliseOrigin } from "@/lib/origin";
import { defaultRegion, getRegion, type RegionLink } from "@/lib/regions";

/**
 * Single source of truth for brand, contact and navigation.
 *
 * ── This site is the U.S. and Canada site. ───────────────────────────────────
 * adasglobus.com stays live and keeps the global (US/UK/CA/AU/UAE) positioning.
 * This build is a separate, North American property. It was U.S.-only until
 * 17 October 2026, when the client split the firm into U.S. and Canadian
 * practices and asked for "U.S. and Canada" wherever the site said "U.S.",
 * plus a country switch in the header (see lib/regions.ts).
 *
 * Two consequences to hold on to when editing:
 *   1. Two countries, not five. "US GAAP, IFRS, UK FRS 102 and Australian AAS"
 *      is the global site's line, not this one's; Canada is the only addition.
 *   2. Because both sites carry related content on different domains, the copy
 *      here is deliberately rewritten rather than reused, so search engines see
 *      two distinct properties instead of one duplicated twice.
 *
 * Naming is settled: the firm is "ADAS Globus Pro" everywhere on this site —
 * body copy, page titles, structured data and the logo alike. The earlier build
 * split `name` from `markName` because the domain said one thing and the mark
 * said another; the client has confirmed Pro, so that split is gone.
 *
 * The domain and the contact address are the Pro ones too: this site is
 * canonical at www.adasglobuspro.com and publishes info@adasglobuspro.com.
 * adasglobus.com is the parent's, and nothing here points at it. The footer's
 * "Global site" link to it was removed at the client's request on 24 October.
 */

export const site = {
  name: "ADAS Globus Pro",
  legalName: "ADAS Globus Pro",

  /**
   * From the mark's own ruled line: FINANCE · TALENT · GROWTH.
   *
   * The 2026 artwork changed this. The previous mark read PARTNER · INNOVATE ·
   * GROW and named three practice lines (Finance / Accounting / Talent
   * Solutions) underneath; the new one collapses both into one rule. Anything
   * quoting the old wording is out of date.
   */
  tagline: "Finance. Talent. Growth.",

  /*
    The default page title after the brand: "ADAS Globus Pro | Accounting for
    U.S. and Canadian CPA and Accounting Firms". The client's 17 October
    document asked for this as "the very first line" of the site.

    History: on the 24 August brief it was "Add Accounting Capacity Without
    Adding U.S. Headcount", replacing "Precision-Engineered Accounting
    Outsourcing for U.S. CPA Firms and Enterprises". That headline survives as
    the homepage H1 (lib/content.ts `hero`).
  */
  proposition: "Accounting for U.S. and Canadian CPA and Accounting Firms",

  /*
    Rewritten to match the rest of the site. The previous value here described
    advanced driver-assistance and automotive technology — client-directed
    wording from the 2 September change list, but out of step with every other
    page, the JSON-LD and the keywords in app/layout.tsx, all of which describe
    offshore accounting, tax and audit support for U.S. CPA firms. Reverted to
    on-topic copy at the client's later instruction; drawn from the mission and
    story text in `about` (lib/content.ts) rather than the automotive line.

    Reach: this is the default description for the whole site. It fills
    <meta name="description">, og:description and twitter:description on the
    homepage and on any page that does not export its own `description`. Pages
    that do export one — /about, /contact, the service and industry routes —
    are unaffected.

    If the automotive wording is ever wanted back, it was:
      "ADAS Globus Pro provides advanced ADAS services and automotive
       services, ensuring safety through cutting-edge ADAS technology.
       Subscribe for updates!"
  */
  description:
    "ADAS Globus Pro gives U.S. and Canadian CPA firms offshore accountants, bookkeepers and tax preparers who work inside your systems as part of your team.",

  /**
   * Canonical origin. Settled: www.adasglobuspro.com.
   *
   * ── WHAT WENT WRONG HERE, SO IT DOES NOT HAPPEN AGAIN ────────────────────
   * NEXT_PUBLIC_SITE_URL was set to https://www.adasglobus.com — the PARENT
   * site's domain. Because this one value feeds the canonical tag, og:url, the
   * sitemap, robots.txt's Sitemap line and the Organization @id, every
   * page of this site was instructing search engines to index the parent
   * instead of itself, and the Organization @id collided with the parent's own
   * entity so the two firms merged rather than resolving separately.
   *
   * The visible symptom: searching the exact name "adasglobuspro" returned
   * adasglobus.com and not this site. That is Google obeying the canonical
   * directive, not a ranking problem, so no amount of copy or metadata work
   * would have shifted it.
   *
   * The failure was silent — the build passes, the pages render, nothing looks
   * wrong locally — which is why `forbiddenHosts` below now makes it loud.
   * ─────────────────────────────────────────────────────────────────────────
   *
   * Normalised rather than used raw: app/layout.tsx passes this to
   * `new URL()` for metadataBase, which throws on a bare host and takes the
   * entire build with it. See lib/origin.ts.
   *
   * The fourth argument is the guard. Any adasglobus.com host — apex or
   * subdomain — is refused and falls back to the default with a warning naming
   * the variable. If the two properties are ever genuinely merged, that is a
   * deliberate decision to make here, not something to arrive at by pasting a
   * domain into a Vercel environment variable.
   *
   * NOTE the guard only protects against the parent. Set the variable in every
   * deploy environment anyway: a preview build that canonicalises to production
   * can get itself dropped from the index in production's favour.
   */
  url: normaliseOrigin(
    process.env.NEXT_PUBLIC_SITE_URL,
    "https://www.adasglobuspro.com",
    "NEXT_PUBLIC_SITE_URL",
    ["adasglobus.com"]
  ),


  /**
   * Master artwork supplied by the client, optimised into /public/assets.
   *
   * `logo` keeps the near-white field the artwork was delivered on, so it is
   * for white surfaces and for structured data. `logoAlpha` is the same crop
   * with the field knocked out — usable on any ground, though note "ADAS" and
   * the PARTNER · INNOVATE · GROW rule are navy ink in the artwork itself, so
   * on a navy surface the live-text lockup in components/brand/Logo.tsx is the
   * correct choice rather than this file.
   */
  logo: "/assets/logo.png",
  logoAlpha: "/assets/logo-alpha.png",
  ogImage: "/assets/og.jpg",

  /*
    Incoming enquiries go to info@ — the client's 2 September change list.

    Lower-case and with no trailing whitespace, both deliberate. The previous
    value was "Info@adasglobuspro.com " with a trailing space, so the rendered
    href was "mailto:Info@adasglobuspro.com " — some mail clients carry that
    space into the To: field and then reject the address.

    NOTE: this pair is only what the site *displays* and links to. Where a
    contact-form submission is actually delivered is the NOTIFICATION_EMAIL
    secret on the lead-notification edge function, set with `supabase secrets
    set` and not held in this repo. Changing one without the other leaves the
    site advertising an address that receives nothing.
  */
  email: "info@adasglobuspro.com",
  emailHref: "mailto:info@adasglobuspro.com",

  /*
    The U.S. line, primary on this site and serving Canada too (+1).

    Changed on 24 October 2026 when the client updated their U.S. number;
    the old line was +1 (307) 533-0018.

    NOTE: the admin's Settings > phone overrides this in the top bar, the
    footer and the contact page (see lib/settings.ts). That value lives in
    Supabase, so it has to be changed there as well.
  */
  phone: "+1 (307) 241-5595",
  phoneHref: "tel:+13072415595",

  /*
    WhatsApp stays on the old line, +1 (307) 533-0018. The new number above is
    a virtual line with no WhatsApp account, so a wa.me link to it goes nowhere
    (client, 28 October 2026). Deliberately not derived from `phone`: the two
    are different numbers. Used by the floating button and the contact page.
  */
  whatsapp: "https://wa.me/13075330018",

  founded: 2020,

  social: {
    /*
      The ADAS Globus Pro company page, per the client's 2 September list —
      items 1 (home page) and 5 (footer) are the same value, because the header,
      the footer and the Organization JSON-LD all read this one field.

      Was linkedin.com/company/adas-globus, which is the older "ADAS Globus"
      page rather than the Pro one.
    */
    linkedin: "https://www.linkedin.com/company/adas-globus-pro/",
    facebook: "https://www.facebook.com/adasglobus/",
    instagram: "https://www.instagram.com/adas_globus/",
  },

  builtBy: {
    name: "Uncore Digital",
    url: "https://uncoredigital.com/",
  },
} as const;

/**
 * Locations shown on the site: the footer, /about, /contact and the
 * Organization structured data all render from this list.
 *
 * Changed on the client's 24 October instructions:
 *   · A Canadian office, in Edmonton. It has no phone of its own; the +1 U.S.
 *     line serves Canada too.
 *   · No Indian phone numbers anywhere. `phone` is optional for that reason,
 *     and every renderer skips the line when it is absent.
 *   · The two Ahmedabad centres are "Delivery Centre I" (Bodakdev) and
 *     "Delivery Centre II" (Keshavbaug Capital, moved from Paldi on 27
 *     October), in that order per the client's sketch, and
 *     both are headed "Ahmedabad, India". The locality moved out of the bold
 *     heading and lives only in the address now.
 *
 * `locality` is the bare city, kept separate because schema.org's
 * addressLocality wants "Ahmedabad", not the display string.
 *
 * The Dubai office is real and stays on the global site, but to a U.S. CPA firm
 * evaluating an offshore partner it reads as off-topic, and a sales address
 * dilutes the ones that matter.
 *
 * India is named openly as the delivery centre rather than buried. Hiding where
 * the work happens is the fastest way to lose this audience: it is the first
 * question in almost every discovery call, and the honest answer is the value
 * proposition.
 *
 * Country is carried as a two-letter `code`, not a flag emoji: Windows ships no
 * flag glyphs, so a regional-indicator pair falls back to the bare letters, and
 * this audience is overwhelmingly Windows. See components/CountryCode.tsx.
 */
export type Office = {
  id: string;
  country: string;
  code: "US" | "CA" | "IN";
  /** The small label above the heading, e.g. "U.S. Office". */
  role: string;
  /** The bold heading. */
  city: string;
  locality: string;
  address: string;
  phone?: string;
  phoneHref?: string;
  timezone: string;
  tzLabel: string;
  primary: boolean;
};

export const offices: Office[] = [
  {
    id: "us-sheridan",
    country: "United States",
    code: "US",
    role: "U.S. Office",
    city: "Sheridan, Wyoming",
    locality: "Sheridan",
    /* Written the way U.S. addresses are, per the client's 17 October
       document: the "Ste 66976" suite number removed, state abbreviated. */
    address: "30 N Gould St, Sheridan, WY 82801",
    phone: "+1 (307) 241-5595",
    phoneHref: "tel:+13072415595",
    /* Wyoming is Mountain Time, so this is America/Denver and not the
       America/Chicago the Austin address carried. TopBar reads `timezone` to
       render the live U.S. clock, so a stale zone here shows the wrong hour. */
    timezone: "America/Denver",
    tzLabel: "MT",
    primary: true,
  },
  {
    id: "ca-edmonton",
    country: "Canada",
    code: "CA",
    role: "Canadian Office",
    city: "Edmonton, Alberta",
    locality: "Edmonton",
    /* The client's address, with a comma after the city to match the
       U.S. card beside it. */
    address: "9622 42 Ave NW, Edmonton, AB T6E 5Y4",
    timezone: "America/Edmonton",
    tzLabel: "MT",
    primary: false,
  },
  {
    id: "in-bodakdev",
    country: "India",
    code: "IN",
    role: "Delivery Centre I",
    city: "Ahmedabad, India",
    locality: "Ahmedabad",
    address: "Shilp Epitome, 1301/1302, Rajpath Rangoli Rd, Bodakdev, Ahmedabad, Gujarat 380059",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
    primary: false,
  },
  {
    /* Relocated from 304-305, Silver Oaks Complex, Paldi, Ahmedabad 380007
       (client email, 27 October). Written "Beside" where the client wrote
       "Besides", and with "Gujarat" to match Delivery Centre I. */
    id: "in-keshavbaug",
    country: "India",
    code: "IN",
    role: "Delivery Centre II",
    city: "Ahmedabad, India",
    locality: "Ahmedabad",
    address: "615-616, Keshavbaug Capital, Beside ITC Narmada, Ahmedabad, Gujarat 380015",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
    primary: false,
  },
];

/**
 * U.S. and Canadian time-zone coverage, replacing the global site's
 * six-country strip.
 *
 * The claim this makes is the one a North American firm actually cares about:
 * work moves overnight and is on the reviewer's desk before the office opens,
 * in whichever zone that office is. `cities` names one U.S. and one Canadian
 * city per zone so the strip says "both countries" without a second row.
 * Atlantic is Canadian only; Newfoundland is left off rather than claimed.
 */
export const timeZones = [
  { label: "Atlantic", tz: "America/Halifax", abbr: "AT", cities: "Halifax" },
  { label: "Eastern", tz: "America/New_York", abbr: "ET", cities: "New York · Toronto" },
  { label: "Central", tz: "America/Chicago", abbr: "CT", cities: "Chicago · Winnipeg" },
  { label: "Mountain", tz: "America/Denver", abbr: "MT", cities: "Denver · Calgary" },
  { label: "Pacific", tz: "America/Los_Angeles", abbr: "PT", cities: "Los Angeles · Vancouver" },
] as const;

/**
 * Feature switches for work that is built but not being shown yet.
 *
 * Off means genuinely unreachable, not merely unlinked: the routes 404 while
 * the flag is false, so there is no URL to guess. Nothing is deleted; flipping
 * a flag brings the feature back exactly as it was.
 */
export const features = {
  /** The Insights blog: nav link, /blog, /blog/[slug], the admin editor. */
  insights: true,
  /** Secure client document exchange: /upload plus the admin inbox. */
  clientPortal: false,
  /** Footer newsletter signup and POST /api/newsletter behind it. */
  newsletter: false,

  /**
   * Named leadership profiles — headshots, names, roles and bios on /team and
   * /about.
   *
   * ON. It was off at the client's original request, which withheld the
   * identification while keeping the structural claim: each practice area
   * owned by a qualified accountant. That reversed when they supplied
   * headshots and written bios for the leadership team — a photograph and a
   * bio are an instruction to publish them.
   *
   * Turning this off again returns both pages to practice-area cards without
   * names or faces, and drops the Person entries from the structured data on
   * each — publishing names in JSON-LD while hiding them on the page would
   * leak exactly what the flag exists to withhold.
   */
  leadershipProfiles: true,

  /**
   * The certification badges on the homepage and the security page.
   *
   * The 24 August brief asks for "AICPA/SOC 2 Certified" and "ISO Certified —
   * use the exact certification wording", but supplied wording for neither. The
   * AICPA/SOC 2 entry ships in the client's own words; the ISO entry is held.
   *
   * This flag is the master switch for the whole band. Per-certificate control
   * is the `published` field on each entry in `certifications` — see
   * lib/content.ts. Turning this off hides the row entirely, which is the right
   * move if the client wants nothing shown until both are confirmed.
   */
  certifications: true,

  /**
   * The U.S. / Canada switch in the header, from the 17 October call.
   *
   * "dropdown" is the default and the recommendation: it takes a third country
   * without a redesign, and the client named the UK, Europe and Australia as
   * possible next markets. "tabs" is the side-by-side version the client asked
   * about, kept so both can be screenshotted for them to choose. `false` hides
   * the switch and the header shows the U.S. menu only.
   */
  regionSwitcher: "dropdown" as "dropdown" | "tabs" | false,
} as const;

export type NavItem = {
  name: string;
  href: string;
  dropdown?: RegionLink[];
  /**
   * Set on the services item. The header swaps `dropdown` for the selected
   * country's list from lib/regions.ts; `dropdown` itself is the U.S. list,
   * used wherever no country has been chosen.
   */
  regional?: boolean;
};

export const navItems: NavItem[] = [
  {
    name: "Who We Are",
    href: "/about",
    dropdown: [
      { name: "About ADAS Globus Pro", href: "/about", blurb: "How the firm is built, and why" },
      { name: "Our Team", href: "/team", blurb: "Leadership, bench depth and review layers" },
      {
        name: "Security & Technology",
        href: "/technology-and-security",
        blurb: "Secure remote desktop, restricted access, 24/7 monitoring",
      },
    ],
  },
  {
    name: "Our Expertise",
    href: "/services",
    /* Per country since 17 October. The lists live in lib/regions.ts. */
    dropdown: getRegion(defaultRegion).services,
    regional: true,
  },
  /*
    Industries left the top nav on the 24 August brief — the client's outreach
    and LinkedIn job posts are role-shaped, so "Accounting Roles" is the heading
    a visitor arrives expecting.

    The industry pages themselves are untouched and still reachable, from the
    footer and from /industries. They carry real search intent ("outsourced
    accounting for restaurants") that would be thrown away by deleting them, and
    the client asked to reduce the emphasis rather than remove the content.
  */
  { name: "Accounting Roles", href: "/accounting-roles" },
  { name: "FAQs", href: "/faqs" },
  ...(features.insights ? [{ name: "Insights", href: "/blog" }] : []),
];

/** Footer column layout — every link here must resolve to a real page. */
export const footerNav = [
  {
    heading: "Our Expertise",
    links: [
      /* First, because it is what the top nav points at. */
      { name: "Accounting Roles", href: "/accounting-roles" },
      { name: "Dynamic Solutions Suite", href: "/services/dynamic-solutions-suite" },
      { name: "Elite Accounting Solutions", href: "/services/elite-accounting-solutions" },
      { name: "Spectrum of Taxes", href: "/services/spectrum-of-taxes" },
      { name: "Audit Excellence", href: "/services/audit-excellence" },
      { name: "Dedicated Offshore Professionals", href: "/services/dedicated-offshore-professionals" },
    ],
  },
  {
    heading: "Industries",
    links: [
      { name: "Manufacturing", href: "/industries/manufacturing" },
      { name: "IT / Software / Tech", href: "/industries/it-software-tech-services" },
      { name: "Hospitality", href: "/industries/hospitality" },
      { name: "QSR / Restaurants", href: "/industries/qsr-restaurants-food-chains" },
      { name: "E-Commerce & D2C", href: "/industries/e-commerce" },
    ],
  },
  {
    heading: "Company",
    links: [
      { name: "Who We Are", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Security & Technology", href: "/technology-and-security" },
      { name: "FAQs", href: "/faqs" },
      ...(features.insights ? [{ name: "Insights", href: "/blog" }] : []),
      { name: "Talk to Us", href: "/contact" },
    ],
  },
];
