/**
 * The five service lines, rewritten for the U.S. market.
 *
 * This file is the source of truth: the /services index, every
 * /services/[slug] page, the header dropdown, the footer column and the sitemap
 * all render from it. A service cannot exist without appearing in the nav and
 * cannot drift from the page that describes it, because there is only one copy
 * of the words.
 *
 * ── What changed from the global site ───────────────────────────────────────
 * The service names and scope are the client's. The copy around them is not:
 *
 *   · Non-U.S. content removed. The global Spectrum of Taxes page claims UK,
 *     Australian, Canadian and UAE tax expertise; on a U.S.-only site that
 *     reads as a firm spread thin rather than one with depth.
 *   · U.S. specifics added. Form numbers, filing deadlines, state nexus,
 *     AICPA/PCAOB references and busy-season framing — the things a U.S.
 *     partner is actually evaluating.
 *   · Every page now carries `whoItsFor` and `deliverables`, because "what
 *     exactly will land on my desk, and when" is the question the old pages
 *     never answered.
 *
 * Fields marked NEW did not exist on the source site and are drafted copy —
 * review those first.
 */

export type ServiceGroup = {
  name: string;
  items: string[];
};

export type Service = {
  slug: string;
  /** Short label for nav, cards and breadcrumbs. */
  name: string;
  /** Page H1. */
  heading: string;
  /** One line, used on the services index cards and in the header dropdown. */
  summary: string;
  /** Lead paragraphs on the detail page. */
  intro: string[];
  /** Heading above the scope list. */
  scopeHeading: string;
  /** The substance of the offer. */
  scope: string[];
  /** Optional grouped sub-services, rendered as a two-column matrix. */
  groups?: ServiceGroup[];
  /** NEW — three outcome chips shown under the hero. */
  outcomes: string[];
  /** NEW — who this line is built for. */
  whoItsFor: string[];
  /** NEW — what the client actually receives, and on what cadence. */
  deliverables: { item: string; cadence: string }[];
  /** Page-header photography, 1536x1024. See scripts/build-photo-assets.js. */
  imageHd: string;
  /** Lucide icon name, resolved through lib/icons.ts. */
  icon: string;
  meta: { title: string; description: string };
};

export const services: Service[] = [
  {
    slug: "dynamic-solutions-suite",
    name: "Dynamic Solutions Suite",
    heading: "Dynamic Solutions Suite",
    summary:
      "Accounting, tax, compliance and audit support delivered under one engagement, one manager and one set of service commitments.",
    intro: [
      "The Dynamic Solutions Suite consolidates bookkeeping, payroll, tax preparation, compliance, financial reporting and audit support into a single offshore engagement — governed by one engagement manager and one set of delivery commitments.",
      "Firms running four vendors across four service lines spend more time coordinating than reviewing. Somebody has to chase the bookkeeper for the numbers the tax preparer needs, reconcile two versions of the trial balance, and explain the client's history a fourth time. That coordination is unbilled partner work, and it is why multi-vendor offshore arrangements quietly cost more than the invoices suggest.",
      "This suite exists to remove that overhead. One relationship, one escalation path, one calendar, and a team that already knows the entity because they closed its books last month before they prepared its return.",
    ],
    scopeHeading:
      "Full-cycle bookkeeping, general ledger management and period-end close",
    scope: [
      "Payroll processing with federal, state and local compliance across multiple jurisdictions",
      "Tax return preparation and filing support across all entity types",
      "Financial statement preparation — P&L, balance sheet, cash flow and notes",
      "Management reporting packages and board-level MIS",
      "Regulatory compliance monitoring and filing calendar management",
      "Audit support, internal control documentation and working paper preparation",
      "Sales and use tax compliance, including multi-state nexus tracking",
      "1099 and W-2 information return preparation ahead of the January 31 deadline",
    ],
    groups: [
      {
        name: "Accounting",
        items: [
          "Bookkeeping and general ledger management",
          "Invoice preparation and purchase booking",
          "Accounts receivable and accounts payable management",
          "Bank and credit card reconciliation",
          "Month-end and year-end close",
          "MIS and management reporting",
        ],
      },
      {
        name: "Tax, Compliance & Audit",
        items: [
          "Federal and state return preparation",
          "Tax planning analysis and estimated payments",
          "Sales and use tax filings",
          "1099 and W-2 information returns",
          "Audit working papers and testing support",
          "Internal control documentation",
        ],
      },
    ],
    outcomes: ["One engagement manager", "One delivery calendar", "Whole finance function"],
    whoItsFor: [
      "Firms currently coordinating two or more offshore vendors",
      "Practices offering clients a full-service back office",
      "Finance teams that want accounting and tax handled by one bench",
    ],
    deliverables: [
      { item: "Closed books and reconciled accounts", cadence: "Monthly" },
      { item: "Management reporting pack", cadence: "Monthly" },
      { item: "Prepared returns, review-ready", cadence: "Per filing calendar" },
      { item: "Timesheets and task plan", cadence: "Daily / weekly" },
    ],
    imageHd: "/assets/services/dynamic-solutions-suite-hd.webp",
    icon: "Layers",
    meta: {
      title: "Dynamic Solutions Suite — Full-Service Offshore Accounting",
      description:
        "Bookkeeping, payroll, tax, compliance, reporting and audit support delivered under a single offshore engagement for U.S. CPA firms and finance teams.",
    },
  },

  {
    slug: "elite-accounting-solutions",
    name: "Elite Accounting Solutions",
    heading: "Elite Accounting Solutions",
    summary:
      "Bookkeeping and month-end close maintained to audit-ready standards — consistently, at volume, and on your reporting calendar.",
    intro: [
      "Our core accounting service is built for U.S. CPA firms and finance teams that need financial records maintained to audit-ready standards: consistently, at volume, and inside the reporting deadlines they have already promised their own clients.",
      "Audit-ready is a specific claim, and it is worth being precise about it. It means the trial balance ties, the reconciliations are complete and documented, supporting schedules exist for every material balance, and the file can be handed to a reviewer — or to next year's auditor — without a remediation exercise first.",
      "Getting there at volume takes both halves of the process. AI-assisted categorisation and automated reconciliation matching handle the repetitive work at better than 95% first-pass accuracy. Qualified accountants handle the judgement calls, the exceptions and the review — three layers of it before anything reaches you.",
    ],
    scopeHeading: "Service scope",
    scope: [
      "AI-assisted transaction processing, categorisation and GL coding",
      "Automated bank and credit card reconciliation with exception review",
      "Accounts payable — invoice processing, approval workflow, payment scheduling",
      "Accounts receivable — invoicing, collections support, aging analysis",
      "Fixed asset register maintenance and depreciation scheduling",
      "Month-end and year-end close with structured checklist governance",
      "Management accounts and reporting packages delivered to your calendar",
      "Cash flow monitoring, rolling forecasts and working capital reporting",
      "Multi-entity consolidation with intercompany elimination",
      "Prior-period cleanup and catch-up bookkeeping for onboarding clients",
    ],
    groups: [
      {
        name: "Transaction & Reconciliation",
        items: [
          "Invoicing and purchase booking",
          "Bank and credit card reconciliation",
          "Loan and intercompany reconciliation",
          "AR and AP management",
          "COGS and inventory calculations",
          "Fixed asset accounting and depreciation",
        ],
      },
      {
        name: "Reporting & Analysis",
        items: [
          "Monthly financial reporting packages",
          "P&L and balance sheet review schedules",
          "Cash flow statements and forecasting",
          "Budget-to-actual and variance analysis",
          "Comparative and trend analysis",
          "Power BI dashboards and presentations",
        ],
      },
    ],
    outcomes: ["Audit-ready books", "Three review layers", "Close on your calendar"],
    whoItsFor: [
      "CPA firms delivering client accounting services (CAS) at volume",
      "Firms inheriting clients with messy or incomplete prior-year books",
      "Corporate finance teams whose close is slipping past its deadline",
    ],
    deliverables: [
      { item: "Reconciled trial balance with supporting schedules", cadence: "Monthly" },
      { item: "Financial statement package", cadence: "Monthly" },
      { item: "Close checklist with open items documented", cadence: "Monthly" },
      { item: "Cash flow and working capital reporting", cadence: "Monthly or weekly" },
    ],
    imageHd: "/assets/services/elite-accounting-solutions-hd.webp",
    icon: "Calculator",
    meta: {
      title: "Elite Accounting Solutions — Audit-Ready Offshore Bookkeeping",
      description:
        "AI-assisted transaction processing, automated reconciliation, AP/AR management and month-end close maintained to audit-ready standards for U.S. firms.",
    },
  },

  {
    slug: "spectrum-of-taxes",
    name: "Spectrum of Taxes",
    heading: "Spectrum of Taxes",
    summary:
      "Federal and state return preparation across every entity type — prepared review-ready, on your busy-season calendar.",
    intro: [
      "Our tax practice gives U.S. CPA firms the offshore preparation capacity to absorb high-volume, deadline-driven return work across individual, corporate, partnership, trust and non-profit entities.",
      "Preparation is the constraint, not review. A firm can review far more returns than it can prepare, which is why January to April is a staffing problem rather than a capability one. We take preparation off the critical path so your reviewers spend the season reviewing.",
      "Returns arrive review-ready: the workpapers are complete, the diagnostics are cleared, the carryforwards tie to last year, and open questions are listed in writing rather than buried in the file. Our preparers work in your tax software — Drake, UltraTax CS, Lacerte, ProSeries, ProConnect, CCH Axcess — against your own review checklist.",
      "Nothing is signed or filed by ADAS Globus Pro. Your firm remains the preparer of record and holds the final review.",
    ],
    scopeHeading: "Service scope",
    scope: [
      "Individual returns — Form 1040 and 1040-NR with all schedules",
      "Corporate returns — Form 1120 and Form 1120-S with Schedule K-1 preparation",
      "Partnership returns — Form 1065 with partner allocations and K-1s",
      "Trust and estate returns — Form 1041",
      "Non-profit compliance — Form 990, 990-EZ, 990-N and 990-PF",
      "Information returns — 1099-NEC, 1099-MISC, W-2 and W-3, ahead of the January 31 deadline",
      "Employment tax returns — Forms 940 and 941",
      "State and local tax compliance, including nexus analysis and multi-state apportionment",
      "International information returns — FBAR (FinCEN 114), Forms 5471, 5472 and 8938",
      "Extensions, estimated tax scheduling and prior-year amended returns",
    ],
    groups: [
      {
        name: "Entity Returns",
        items: [
          "C Corporations — Form 1120",
          "S Corporations — Form 1120-S and Schedule K-1",
          "Partnerships and LLCs — Form 1065",
          "Sole proprietors and single-member LLCs — Schedule C",
          "Trusts and estates — Form 1041",
          "Foreign-owned entities — Forms 5471 and 5472",
        ],
      },
      {
        name: "Specialist Filings",
        items: [
          "Non-profits — Forms 990, 990-EZ, 990-N",
          "Private foundations — Form 990-PF",
          "Employment returns — Forms 940 and 941",
          "W-2 and W-3 reporting",
          "SALT compliance and nexus analysis",
          "Amended returns and back-year filings",
        ],
      },
    ],
    outcomes: ["Review-ready returns", "All entity types", "Built for busy season"],
    whoItsFor: [
      "Practices turning away returns between January and April",
      "Firms whose partners are preparing rather than reviewing in season",
      "Practices with multi-state clients and growing SALT exposure",
    ],
    deliverables: [
      { item: "Prepared return with cleared diagnostics", cadence: "Per agreed turnaround" },
      { item: "Complete workpaper file and carryforward tie-out", cadence: "With each return" },
      { item: "Open-items memo for reviewer", cadence: "With each return" },
      { item: "Filing calendar and extension tracking", cadence: "Ongoing" },
    ],
    imageHd: "/assets/services/spectrum-of-taxes-hd.webp",
    icon: "Receipt",
    meta: {
      title: "Tax Preparation Outsourcing for U.S. CPA Firms — Spectrum of Taxes",
      description:
        "Offshore preparation of Forms 1040, 1120, 1120-S, 1065, 1041 and 990, plus SALT, 1099 and international information returns — delivered review-ready.",
    },
  },

  {
    slug: "audit-excellence",
    name: "Audit Excellence",
    heading: "Audit Excellence",
    summary:
      "Working papers, substantive testing and control documentation prepared to your firm's methodology and review protocol.",
    intro: [
      "Our audit support service is built for U.S. CPA firms working under constrained assurance capacity — qualified offshore professionals who execute audit procedures, compile working papers and support engagements to your firm's own methodology and documentation standards.",
      "Audit support is the hardest offshore work to get right, because the deliverable is not a number but a file. A file that reaches the right conclusion with inadequate documentation fails peer review just as surely as one that reaches the wrong conclusion. Our professionals are trained on that distinction: GAAS, US GAAP, PCAOB standards and AICPA guidance, applied to your templates rather than to a generic house style.",
      "Every engagement begins by learning your methodology — how you structure a file, how much documentation a testing conclusion carries, how exceptions are escalated, and what your reviewers expect to find where. That calibration happens during onboarding, not during the engagement.",
      "ADAS Globus Pro does not issue opinions and is not a licensed audit firm. We prepare; your firm reviews, concludes and signs.",
    ],
    scopeHeading: "Service scope",
    scope: [
      "Audit planning support — risk assessment, materiality determination, programme preparation",
      "Working paper preparation and documentation to your firm's templates",
      "Substantive testing — confirmations, vouching, tracing and analytical procedures",
      "Internal control evaluation and documentation, including flowcharts and narratives",
      "SOX Section 302 and 404 control testing and documentation support",
      "Compilation and review engagement preparation under SSARS",
      "Single Audit and Uniform Guidance support for government and non-profit entities",
      "Employee benefit plan audit support, including Form 5500 schedules",
      "Client-side SOC 2 readiness and control testing support",
      "Prior-year file review and carryforward preparation ahead of fieldwork",
    ],
    groups: [
      {
        name: "Assurance Engagements",
        items: [
          "Financial statement audits",
          "Internal audit support",
          "Operational audit",
          "Compliance and Single Audit",
          "Agreed-upon procedures (AUP)",
          "Compilations and reviews (SSARS)",
        ],
      },
      {
        name: "Specialist Engagements",
        items: [
          "Information systems (IT) audit support",
          "Forensic audit support",
          "Due diligence support",
          "ICFR and SOX 404 testing",
          "SOC 2 readiness support",
          "Employee benefit plan audits",
        ],
      },
    ],
    outcomes: ["GAAS, PCAOB, AICPA trained", "Your templates and protocol", "Twelve engagement types"],
    whoItsFor: [
      "Firms with more assurance work than assurance staff",
      "Practices facing peer review and tightening documentation expectations",
      "Firms wanting fieldwork prep done before the team arrives on site",
    ],
    deliverables: [
      { item: "Completed working paper sections", cadence: "Per engagement schedule" },
      { item: "Testing documentation and exception log", cadence: "With each section" },
      { item: "Control narratives and flowcharts", cadence: "Per engagement" },
      { item: "Open-items and follow-up list", cadence: "Weekly during fieldwork" },
    ],
    imageHd: "/assets/services/audit-excellence-hd.webp",
    icon: "ShieldCheck",
    meta: {
      title: "Audit Support Outsourcing for U.S. CPA Firms — Audit Excellence",
      description:
        "Audit planning, working papers, substantive testing, control documentation and SOX support prepared to your firm's methodology by GAAS-trained professionals.",
    },
  },

  {
    slug: "professional-hiring",
    name: "Professional Hiring",
    heading: "Professional Hiring",
    summary:
      "A dedicated offshore accountant — or a structured team — employed, managed and quality-controlled by us, working as part of yours.",
    intro: [
      "For firms scaling practice capacity and finance teams managing structural or seasonal volume, Professional Hiring places a dedicated accounting professional — or a structured multi-grade team — who operates as an integrated member of your organisation.",
      "This is not a staffing agency arrangement, and the distinction matters commercially. Every professional placed under this model is employed, managed, quality-controlled and professionally developed by ADAS Globus Pro. You receive the output of a supervised professional working inside your systems, without the payroll, benefits, recruitment, training, workspace or employment-risk overhead of an additional hire.",
      "It also solves the problem an agency cannot: continuity. The person on your engagement is the person who learned your templates, sat through your onboarding and closed your books last month — and there is a trained second who can step in when they take leave.",
    ],
    scopeHeading: "What every placement includes",
    scope: [
      "A dedicated professional matched to your platform and engagement requirements",
      "Working hours aligned to your time zone and your calendar",
      "Proficiency across your accounting, tax and workpaper software",
      "Structured reporting — daily timesheets and weekly task plans",
      "Ongoing training on U.S. standards, annual tax law changes and platform releases",
      "A trained backup professional briefed on your engagement",
      "Engagement-manager oversight and internal review before delivery",
      "Individually signed confidentiality agreements",
    ],
    groups: [
      {
        name: "Engagement Models",
        items: [
          "Full-time dedicated professional, exclusively assigned to your firm",
          "Part-time or shared capacity, structured around an agreed scope",
          "Seasonal surge for January through April, or year-end close",
          "Structured multi-grade team build for a permanent offshore function",
        ],
      },
      {
        name: "Profiles Available",
        items: [
          "Staff Accountant and Senior Accountant",
          "Tax Associate, Tax Senior and Tax Reviewer",
          "Payroll Specialist and Compliance Associate",
          "Audit Associate and Audit Senior",
          "Financial Analyst and Reporting Specialist",
          "Controller-level advisory and Virtual CFO",
        ],
      },
    ],
    outcomes: ["Employed and supervised by us", "Four engagement models", "Trained backup included"],
    whoItsFor: [
      "Firms that have tried and failed to hire locally at this grade",
      "Practices wanting a permanent offshore bench rather than project help",
      "Finance teams with a structural gap rather than a temporary one",
    ],
    deliverables: [
      { item: "Candidate profiles matched to your requirement", cadence: "Within 1 week of scoping" },
      { item: "Onboarding on your templates and conventions", cadence: "Before live work" },
      { item: "Daily timesheets and weekly task plan", cadence: "Daily / weekly" },
      { item: "Engagement-manager review before delivery", cadence: "Every deliverable" },
    ],
    imageHd: "/assets/services/professional-hiring-hd.webp",
    icon: "Users",
    meta: {
      title: "Hire Dedicated Offshore Accountants — Professional Hiring",
      description:
        "Full-time, part-time, seasonal or team-build offshore accounting professionals for U.S. firms — employed, managed and quality-controlled by ADAS Globus Pro.",
    },
  },
];

export const serviceSlugs = services.map((s) => s.slug);

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/** The services index intro. */
export const servicesIntro = {
  heading: "Our Services",
  subheading:
    "One Offshore Bench, From Transaction Processing Through to Assurance Support",
  body: "Five service lines, each built to function as a scalable, accountable extension of a U.S. practice or finance function — staffed by qualified professionals, run through three layers of review, and delivered inside the software you already use.",
  pillars: [
    "Trained on U.S. standards, not adapted to them",
    "AI-augmented delivery, human-reviewed",
    "Your software, your templates, your sign-off",
  ],
  advantages: [
    "Overnight turnaround across every U.S. time zone",
    "Capacity that scales into busy season and back out",
    "A named engagement manager on every account",
    "Daily timesheets and weekly task visibility",
    "Built-in backup so leave never stalls a deadline",
  ],
};
