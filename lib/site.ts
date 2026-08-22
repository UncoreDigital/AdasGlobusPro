import { normaliseOrigin } from "@/lib/origin";

/**
 * Single source of truth for brand, contact and navigation.
 *
 * ── This site is the U.S. site. ──────────────────────────────────────────────
 * adasglobus.com stays live and keeps the global (US/UK/CA/AU/UAE) positioning.
 * This build is a separate, U.S.-only property: every claim, form number,
 * standard and time zone on it is American, and copy that would only matter to
 * a UK or Australian reader has been removed rather than translated.
 *
 * Two consequences to hold on to when editing:
 *   1. Do not reintroduce multi-jurisdiction claims. "US GAAP, IFRS, UK FRS 102
 *      and Australian AAS" is the global site's line, not this one's.
 *   2. Because both sites carry related content on different domains, the copy
 *      here is deliberately rewritten rather than reused, so search engines see
 *      two distinct properties instead of one duplicated twice.
 *
 * Naming is settled: the firm is "ADAS Globus Pro" everywhere on this site —
 * body copy, page titles, structured data and the logo alike. The earlier build
 * split `name` from `markName` because the domain said one thing and the mark
 * said another; the client has confirmed Pro, so that split is gone.
 *
 * The domain and email addresses still read adasglobus.com. Those are real
 * addresses, not brand names, and must not be "corrected".
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

  proposition:
    "Precision-Engineered Accounting Outsourcing for U.S. CPA Firms and Enterprises",

  description:
    "ADAS Globus Pro gives U.S. CPA firms and finance teams dedicated offshore capacity across bookkeeping, tax preparation, audit support and professional hiring — working in your software, to your review standard, on your busy-season calendar.",

  /**
   * Canonical origin.
   *
   * LAUNCH BLOCKER — the production address is not decided yet. The default
   * below is a placeholder so builds and previews work; it must be set in the
   * deploy environment before go-live, because two sites cannot both claim
   * adasglobus.com as canonical without one being dropped from the index in
   * the other's favour.
   *
   * Normalised rather than used raw: app/layout.tsx passes this to
   * `new URL()` for metadataBase, which throws on a bare host and takes the
   * entire build with it. See lib/origin.ts.
   */
  url: normaliseOrigin(process.env.NEXT_PUBLIC_SITE_URL, "https://us.adasglobus.com"),

  /** The global site, cross-linked from the footer. */
  globalSite: "https://adasglobus.com",

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

  email: "info@adasglobus.com",
  emailHref: "mailto:info@adasglobus.com",

  /** The U.S. line is the primary on this site. */
  phone: "+1 (972) 694-9811",
  phoneHref: "tel:+19726949811",

  whatsapp: "https://wa.me/919429461564",

  founded: 2020,

  social: {
    linkedin: "https://www.linkedin.com/company/adas-globus/",
    facebook: "https://www.facebook.com/adasglobus/",
    instagram: "https://www.instagram.com/adas_globus/",
  },

  builtBy: {
    name: "Uncore Digital",
    url: "https://uncoredigital.com/",
  },
} as const;

/**
 * Locations shown on the U.S. site.
 *
 * Two, not three. The Dubai office is real and stays on the global site, but to
 * a U.S. CPA firm evaluating an offshore partner it reads as off-topic, and a
 * third address dilutes the one that matters — the Texas one.
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
export const offices = [
  {
    country: "United States",
    code: "US",
    role: "U.S. Office",
    city: "Austin, Texas",
    address: "5900 Balcones Drive STE 100, Austin, Texas 78371",
    phone: "+1 (972) 694-9811",
    phoneHref: "tel:+19726949811",
    timezone: "America/Chicago",
    tzLabel: "CT",
    primary: true,
  },
  {
    country: "India",
    code: "IN",
    role: "Delivery Centre",
    city: "Ahmedabad, Gujarat",
    address: "304-305, Silver Oaks Complex, Paldi, Ahmedabad, Gujarat 380007",
    phone: "+91 94294 61564",
    phoneHref: "tel:+919429461564",
    timezone: "Asia/Kolkata",
    tzLabel: "IST",
    primary: false,
  },
] as const;

/**
 * U.S. time-zone coverage, replacing the global site's six-country strip.
 *
 * The claim this makes is the one a U.S. firm actually cares about: work moves
 * overnight and is on the reviewer's desk before the office opens — in
 * whichever zone that office is.
 */
export const timeZones = [
  { label: "Eastern", tz: "America/New_York", abbr: "ET" },
  { label: "Central", tz: "America/Chicago", abbr: "CT" },
  { label: "Mountain", tz: "America/Denver", abbr: "MT" },
  { label: "Pacific", tz: "America/Los_Angeles", abbr: "PT" },
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
   * Off at the client's request. The sections stay, because "who leads each
   * practice area" is a real answer a prospect wants; what is withheld is the
   * identification. Each card renders the practice area and the credential
   * instead of a person.
   *
   * Nothing is deleted: `team.leadership` in lib/content.ts keeps the names,
   * bios and photo paths, and the headshots stay in public/assets/team/. This
   * also governs the Person entries in the structured data on both pages —
   * publishing names in JSON-LD while hiding them on the page would leak
   * exactly what the flag exists to withhold.
   */
  leadershipProfiles: false,
} as const;

export type NavItem = {
  name: string;
  href: string;
  dropdown?: { name: string; href: string; blurb?: string }[];
};

export const navItems: NavItem[] = [
  {
    name: "Who We Are",
    href: "/about",
    dropdown: [
      { name: "About ADAS Globus Pro", href: "/about", blurb: "How the firm is built, and why" },
      { name: "Our Team", href: "/team", blurb: "Leadership, bench depth and review layers" },
      {
        name: "Technology & Security",
        href: "/technology-and-security",
        blurb: "AI-augmented delivery, ISO 27001-aligned controls",
      },
    ],
  },
  {
    name: "Our Expertise",
    href: "/services",
    dropdown: [
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
        name: "Professional Hiring",
        href: "/services/professional-hiring",
        blurb: "Dedicated offshore professionals and structured team builds",
      },
    ],
  },
  {
    name: "Industries We Serve",
    href: "/industries",
    dropdown: [
      { name: "Manufacturing", href: "/industries/manufacturing", blurb: "Small & mid-scale units" },
      {
        name: "IT / Software / Tech Services",
        href: "/industries/it-software-tech-services",
        blurb: "SaaS and technology",
      },
      { name: "Hospitality", href: "/industries/hospitality", blurb: "Hotels, cafes, service apartments" },
      {
        name: "QSR / Restaurants / Food Chains",
        href: "/industries/qsr-restaurants-food-chains",
        blurb: "Multi-location food service",
      },
      { name: "E-Commerce & D2C Brands", href: "/industries/e-commerce", blurb: "Multi-channel digital commerce" },
    ],
  },
  { name: "FAQs", href: "/faqs" },
  ...(features.insights ? [{ name: "Insights", href: "/blog" }] : []),
];

/** Footer column layout — every link here must resolve to a real page. */
export const footerNav = [
  {
    heading: "Our Expertise",
    links: [
      { name: "Dynamic Solutions Suite", href: "/services/dynamic-solutions-suite" },
      { name: "Elite Accounting Solutions", href: "/services/elite-accounting-solutions" },
      { name: "Spectrum of Taxes", href: "/services/spectrum-of-taxes" },
      { name: "Audit Excellence", href: "/services/audit-excellence" },
      { name: "Professional Hiring", href: "/services/professional-hiring" },
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
      { name: "Technology & Security", href: "/technology-and-security" },
      { name: "FAQs", href: "/faqs" },
      ...(features.insights ? [{ name: "Insights", href: "/blog" }] : []),
      { name: "Schedule a Call", href: "/contact" },
    ],
  },
];
