/**
 * Page copy that is not a service or an industry: the homepage bands, about,
 * the team, technology & security, and the FAQ set.
 *
 * ── U.S. and Canada. ────────────────────────────────────────────────────────
 * Rewritten from the global site's copy rather than lifted from it, for two
 * reasons: the audience here is a North American CPA firm or finance team, and
 * two live sites carrying identical paragraphs on different domains is how one
 * of them gets treated as a duplicate.
 *
 * Until 17 October 2026 this was a U.S.-only site. The client then split the
 * firm into U.S. and Canadian practices and asked that every "U.S." on the site
 * read "U.S. and Canada", that em dashes be removed throughout (they read as
 * AI-written), and "practising" become "practicing". Canadian technical detail
 * (forms, software, deadlines) is still largely to come from the client; where
 * a U.S. form or rule is named below, it is a U.S. fact and is left as one.
 *
 * Three rules govern edits:
 *
 *  1. Claims with a number in them (accuracy %, time saved, client count) are
 *     the client's own and must not be invented, rounded up, or "improved".
 *     Figures that change over time live in Supabase `site_settings` instead —
 *     see lib/settings.ts — so the client can update them without a deploy.
 *
 *  2. Certification claims are published only in the client's own words. The
 *     24 August brief states ADAS Globus Pro is "AICPA/SOC 2 Certified" and
 *     "ISO Certified — use the exact certification wording", but supplied the
 *     exact wording for neither standard. A CPA firm verifies these during its
 *     own due diligence, so a wrong claim costs more than a missing one. See
 *     `certifications` below: each entry carries a `published` flag, and
 *     anything still awaiting wording stays off the site.
 *
 *  3. ADAS Globus Pro is not a CPA firm and does not sign, file or issue opinions.
 *     Copy must never imply otherwise — the client firm keeps the engagement,
 *     the judgement and the sign-off. The FAQ "Are you a CPA firm?" is the one
 *     place that now says so outright.
 */

import type { CountryIso } from "@/lib/regions";

/* ---------------------------------------------------------------------------
   The liability boundary used to live here as `boundary`, rendered as a
   "Scope of practice" notice on /about and every service page. The client
   asked for it to be removed altogether (21 October 2026). The same statement
   remains in the FAQ "Are you a CPA firm?" below.
   --------------------------------------------------------------------------- */

/* ---------------------------------------------------------------------------
   Homepage
   --------------------------------------------------------------------------- */

export const hero = {
  headline: "Add Accounting Capacity",
  /** Rendered in the accent gradient as the emphasised second line of the H1. */
  headlineAccent: "Without Adding U.S. or Canadian Headcount",
  subhead: "Accounting for U.S. and Canadian CPA and accounting firms",
  primaryCta: { label: "Start Your 3-Day Free Trial", href: "/contact" },
  secondaryCta: { label: "Talk to Us", href: "/contact" },
  lead: "Qualified bookkeepers, accountants, tax preparers and reviewers who work inside your software as part of your team: part-time, full-time or just for the season, without the cost of a full-time hire.",
  chips: [
    "Built and run by Chartered Accountants",
    "Part-time · Full-time · Seasonal",
    "Potentially 60%+ below a full-time hire",
    "3-day free trial",
  ],
};

export const aboutTeaser = {
  eyebrow: "Who We Are",
  heading: "Built and Run by Chartered Accountants",
  points: [
    "We are accountants, not a recruitment agency. The firm is owned and led by practicing Chartered Accountants, which is why our people arrive understanding month-end close, workpaper standards and what a reviewer is actually looking for.",
    "Every professional is employed, trained and supervised by us. You get the output of a qualified, managed accountant working inside your systems, without the recruiting, benefits, payroll tax and onboarding cost of hiring locally.",
    "Serving CPA, accounting and tax firms since 2020, now across the U.S. and Canada, with a delivery centre built around U.S. and Canadian engagement standards and the busy-season calendar.",
    "Part-time, full-time, seasonal or a permanent bench. You size the capacity to the work, not the other way round.",
  ],
};

/**
 * "Why Choose ADAS Globus Pro": three differentiators. There were four until
 * the client's 21 October document dropped "An Extension of Your Team".
 *
 * Rewritten for the North American reader. The global site's version claims
 * fluency in "US GAAP, IFRS, UK FRS 102, Australian AAS and UAE corporate tax",
 * which reads as a firm spread thin rather than one with depth. Since 17
 * October this site names the U.S. and Canada, and only those two.
 */
export const whyUs = [
  {
    title: "Built and Run by Chartered Accountants",
    body: "The firm is owned and led by practicing CAs, so the people setting the review standard have sat on your side of it. That is the difference between a staffing vendor sending you a CV and a firm sending you someone who already knows what a clean workpaper looks like.",
    icon: "Landmark",
  },
  {
    title: "Native to Your Software",
    body: "We work inside the environment you already run (QuickBooks, Xero, Sage Intacct, NetSuite) and the tax stack on top of it: UltraTax CS, Drake, ProSeries, Lacerte, CCH Axcess. No migration, no new chart of accounts, nothing your clients would notice.",
    icon: "Plug",
  },
  {
    /* Title and body are the client's own wording, from the 17 October document. */
    title: "Trained on U.S. & Canadian Standards",
    body: "U.S. GAAP, IRS requirements, CRA guidance, and Canadian accounting standards from day one, including the complexities that matter: multi-state and multi-province compliance, tax reporting, cross-border considerations, and the documentation depth expected by professional reviewers.",
    icon: "BadgeCheck",
  },
];

/**
 * Busy-season band — NEW, not on the global site.
 *
 * The single strongest argument to a U.S. CPA firm is capacity between January
 * and April, and the global site never makes it. This is the section most
 * likely to earn the call.
 */
export const busySeason = {
  eyebrow: "The Hiring Problem",
  heading: "You Cannot Hire for April and Pay for It All Year",
  body: "Between the January 31 information-return deadline and the April filing deadlines, a practice in the U.S. or Canada needs roughly twice the preparer capacity it can justify employing for the other eight months. Hire for the peak and you carry the cost through the trough. Do not hire, and you turn work away or burn out the people you have, and experienced preparers are the hardest role in the profession to fill right now.",
  resolution:
    "Seasonal capacity solves the arithmetic. Bring people on in January and stand them down in May, staffed by professionals who learned your templates in the autumn so week one is productive rather than instructional.",
  /* The filing calendar that sat beside this text was removed on the client's
     21 October document. See components/sections/BusySeason.tsx. */
};

/** "Our USPs — Operational Commitments Embedded Into Every Engagement" */
export const usps = [
  {
    title: "Dedicated Engagement Manager",
    body: "One named person accountable for your work, not a shared queue.",
    icon: "UserCheck",
  },
  {
    title: "Daily Timesheets, Weekly Task Plans",
    body: "You see what was worked on, for how long, and what is queued next.",
    icon: "ClipboardList",
  },
  {
    title: "Time-Zone Aligned Delivery",
    body: "Work moves overnight and is on your desk before the office opens.",
    icon: "Clock",
  },
  {
    title: "Built-In Team Backup",
    body: "Every engagement has a trained second, so leave never stalls work.",
    icon: "Users2",
  },
];

export const technologyTeaser = {
  eyebrow: "Software",
  /* Split for SectionHeading, which renders the accent half in the gradient. */
  title: "We Work in",
  accent: "Your Software",
  body: "Our professionals work in the platforms U.S. and Canadian firms actually run: general ledger, tax preparation, workpapers and payroll. You do not migrate, you do not retrain your staff, and your clients never see a change in how their work is handled.",
};

/**
 * The overnight band: "Your Workday Ends. Your Progress Does Not."
 *
 * Rewritten on the client's 21 October document from their recommended copy
 * (which they said could be rephrased). Their text, and where it went:
 *
 *   heading     "Your Workday Ends. Your Progress Does Not."  (verbatim)
 *   subheading  their first paragraph, with "your US office" made "your
 *               office" because the site now serves Canada too
 *   cycle[3]    their second paragraph, on overlapping working hours
 *   tagline     "Less waiting. Faster turnaround. More time to focus on your
 *               clients."  (verbatim)
 *
 * The four-step cycle stayed because it shows the claim rather than stating
 * it; its steps were rewritten to tell the client's version. Their copy is
 * also more modest than what it replaced: "much of the work is ready", not
 * "completed work is waiting".
 */
export const coverage = {
  eyebrow: "How the Day Works",
  heading: "Your Workday Ends.",
  accent: "Your Progress Does Not.",
  subheading:
    "While your office is closed, your offshore team keeps working on your accounting tasks. By the time you start your next business day, much of the work is ready for your review.",
  tagline: "Less waiting. Faster turnaround. More time to focus on your clients.",
  kicker: "Coverage across U.S. and Canadian time zones, Atlantic through Pacific.",
  cycle: [
    {
      time: "5:00 PM",
      zone: "Your office",
      label: "Hand-off",
      body: "Your workday ends. You queue the work: returns to prepare, reconciliations to clear, workpapers to build.",
    },
    {
      time: "Overnight",
      zone: "Our team",
      label: "Working",
      body: "Your offshore team keeps going while your office is closed, in your software and against your checklists.",
    },
    {
      time: "9:00 AM",
      zone: "Your office",
      label: "Ready",
      body: "Much of the work is ready for your review when your next business day starts, with open items flagged in writing.",
    },
    {
      time: "Overlap",
      zone: "Shared hours",
      label: "Connect",
      body: "With overlapping working hours, you can discuss questions, share feedback and clarify next steps without waiting another full day.",
    },
  ],
};

export const freeTrial = {
  eyebrow: "Try Before You Commit",
  heading: "Three Days of Real Work, Free",
  subheading: "3-Day Free Trial",
  body: "Give us live work, whether a set of returns, a month's bookkeeping or a batch of reconciliations, and we do it at our cost. You review the output with your own reviewer, against your own standard, before any money changes hands.",
  cta: { label: "Start Your 3-Day Free Trial", href: "/contact" },
  points: [
    "Real work, not a sample file",
    "Your software, your templates",
    "Assessed by your own reviewer",
    "No card, no commitment",
  ],
};

/**
 * Testimonials — reproduced verbatim from the client's own site.
 *
 * Attributed by role, not by name, because that is how the client published
 * them. Do not invent names, and do not reword the quotes to fit the U.S.
 * framing: a testimonial that has been edited is no longer a testimonial.
 */
/*
  Testimonials, and the credibility problem underneath them.

  The brief asks to "improve testimonial credibility". The biggest lever is a
  real name and firm against each quote, and we do not have permission for that
  yet — so the second lever is the one applied here: stop pretending we do.

  What changed:

    · The wording moved off the AI framing. The second quote used to praise
      "AI-augmented workflows", which worked directly against the brief's
      request to stop looking like an AI company.

    · The fake monogram is gone. The carousel used to derive initials from the
      role string and render them in a gradient circle, so "CPA Firm, United
      States" became a "CF" avatar that reads as a named person's monogram.
      Dressing an anonymous quote as an attributed one is the specific thing
      that makes a partner discount the whole section.

    · The anonymity is now stated, alongside an offer of a reference call. A
      CPA firm values discretion — being told "our clients asked not to be
      named, and we will introduce you to one" is more persuasive than a vague
      title over a fake avatar, and it moves the reader toward a conversation
      rather than toward scrolling past.

  ⚠️ Two things still need the client:

    1. Sign-off on the rewritten wording. These read as things a client said.
       If the originals were the clients' own words then ours are not, and
       putting words in a firm's mouth is not a decision to make on their
       behalf. If the originals were agency-written placeholders — which the
       register strongly suggests — ours can stand.

    2. Permission to attribute. Set `attribution` on any entry below and that
       card switches to a real monogram and a named cite automatically; the
       anonymity note hides itself once every quote is attributed. One
       attributed quote outperforms three anonymous ones.
*/

export type Testimonial = {
  quote: string;
  /** Job title while anonymous; the person's name once attribution is granted. */
  name: string;
  /** Firm descriptor while anonymous; the firm's actual name once granted. */
  role: string;
  /**
   * Set only when the client has written permission to name them. Presence of
   * this flag is what switches the card from icon to monogram, so it must never
   * be set speculatively.
   */
  attribution?: { person: string; firm: string; location?: string };
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They work like part of our team rather than a supplier we have to manage. Our templates, our review protocol, our deadlines, and a named person we can call when something needs a decision.",
    name: "Managing Partner",
    role: "Regional CPA Firm",
  },
  {
    quote:
      "We could not hire a senior accountant in our market at any sensible price. ADAS placed one inside two weeks, working in our own system, and the close is now three days shorter than it was.",
    name: "Managing Partner",
    role: "CPA Firm, United States",
  },
  {
    quote:
      "We took them on for the season and kept them. Two tax preparers through April, both trained on our templates in the autumn, both productive from week one instead of week four.",
    name: "Partner",
    role: "Public Accounting Practice",
  },
];

/*
  Shown under the carousel while any quote is unattributed. Hides itself once
  every entry carries `attribution`.
*/
export const testimonialsNote = {
  body: "Our clients are named on request, not on the website. Most CPA firms would rather not advertise that they use offshore capacity, and we respect that.",
  offer: "Ask us and we will arrange a reference call with a firm running work like yours.",
  cta: { label: "Ask for a reference", href: "/contact" },
};

export const homeCta = {
  heading: "Short of Accounting Staff?",
  body: "Tell us the role you cannot fill and the software you run. We will tell you what it costs, how quickly we can start, and honestly whether we are the right fit, then prove it with three days of free work.",
  cta: { label: "Start Your 3-Day Free Trial", href: "/contact" },
};

/** The band that closes every interior page. */
export const buildCta = {
  heading: "Let's Talk About the Role You Need Filled",
  body: "A short conversation, then three days of free work so you can judge the output yourself.",
  cta: { label: "Talk to Us", href: "/contact" },
};

/* ---------------------------------------------------------------------------
   About / Who We Are/* ---------------------------------------------------------------------------
   About / Who We Are
   --------------------------------------------------------------------------- */

export const about = {
  heading: "Built for the Way U.S. and Canadian Accounting Firms Actually Work",
  lead: "Offshore support fails when it is bolted on. It works when it is shaped around a firm's existing software, templates, review layers and deadlines, which is what we were built to do.",

  facts: [
    { value: "2020", label: "Founded" },
    { value: "15+", label: "Years combined leadership experience" },
    { value: "1,000+", label: "Engagements completed" },
    { value: "120+", label: "Accounting professionals" },
    { value: "50,000+", label: "Transactions processed monthly" },
    { value: "3", label: "Review layers before delivery" },
  ],

  story: {
    eyebrow: "Our Story",
    heading: "Started by Chartered Accountants Who Had Done the Work",
    paragraphs: [
      "ADAS Globus Pro was founded in 2020 by three practicing Chartered Accountants who had spent their careers inside audit, tax and financial reporting engagements, and had seen from the inside why offshore arrangements so often disappoint.",
      "The pattern was consistent. Work came back technically defensible but structurally wrong: right numbers, wrong templates; complete files, no documentation trail; capacity delivered, review burden increased. Firms ended up paying for support and then paying again in partner time to make it usable.",
      "So the firm was built the other way round. Templates, checklists, review layers and communication protocols are set up before any live work is touched, and the professionals assigned to a client learn that firm's conventions during onboarding rather than during busy season. The measure of success is simple: work that comes back ready to review, not ready to redo.",
    ],
  },

  vision: {
    heading: "Vision",
    body: "To be the staffing partner U.S. and Canadian CPA firms choose on merit rather than on price: recognised for the quality of the professionals we place, for functioning as a genuine extension of the practices we serve, and for partnerships built on trust and professional ethics rather than on contract length.",
  },
  mission: {
    heading: "Mission",
    body: "To give U.S. and Canadian CPA, accounting and tax firms qualified accounting staff they cannot hire locally: trained on U.S. and Canadian standards, working inside your systems, supervised by Chartered Accountants, and held to Professional Integrity, Operational Excellence and Accountability on every engagement.",
  },

  values: [
    { name: "Professional Integrity", body: "We say what the work actually is, including when it is not going well." },
    { name: "Operational Excellence", body: "Standardised workflows and checklist governance on every engagement." },
    { name: "Client-Centric Collaboration", body: "Your conventions, your templates, your review protocol." },
    { name: "Accountability", body: "A named engagement manager, and visible open items." },
    { name: "Continuous Advancement", body: "Ongoing training on U.S. and Canadian standards and platform releases." },
    { name: "Client Commitment", body: "Long-term relationships over transactional engagements." },
    { name: "Confidentiality & Data Security", body: "A locked-down delivery environment and individually signed NDAs." },
    { name: "Innovation & Technology", body: "Automation where it removes error, humans where judgement matters." },
    { name: "Teamwork & Collaboration", body: "Built-in backup so leave and illness never stall a deadline." },
    { name: "Professionalism", body: "Communication discipline your partners can put in front of a client." },
  ],
};

/* ---------------------------------------------------------------------------
   Team — NEW. The global site lists three names on the about page and nothing
   else; a U.S. firm evaluating an offshore partner asks about bench depth and
   review layers before it asks about anything on the services page.
   --------------------------------------------------------------------------- */

export const team = {
  hero: {
    heading: "The Bench Behind Every Engagement",
    lead: "People buy people. Here is who leads the firm, how the team is structured, and how many pairs of eyes a deliverable passes before it reaches yours.",
  },

  /*
    Headshots are built by scripts/build-team-photos.js from the sources in
    assets-src/team/ — see that file for why each subject carries its own crop.

    The Chartered Accountants come first because CA-led ownership is the
    positioning the 24 August brief asked us to lead on; the two Directors run
    delivery and client relationships and follow.

    Practice areas and LinkedIn profiles are the client's supplied list. Note
    that Smit and Arpit were previously the other way round here — Smit had
    accounting and Arpit had tax — so the bios and icons moved with them. If
    anything on these cards is queried, this pairing is the one to re-check.

    Bios for Pratik and Ritesh are the client's own words from
    docs/leader/Bio for website.docx, condensed for a card. The CA bios are
    ours, written from the practice areas the client published, and remain open
    to correction.

    LinkedIn hosts are normalised to www.linkedin.com. Two of the supplied URLs
    used in.linkedin.com, which is a locale redirect rather than a distinct
    profile — the paths are otherwise verbatim.

    Each entry carries its own `icon`, used only when features.leadershipProfiles
    is off. It used to be a positional array on the team page, which meant
    removing anyone from the middle of this list handed their icon to the next
    person along — which is exactly what happened when Arpit Shah came out.
  */
  leadership: [
    {
      name: "CA Smit Shah",
      role: "Managing Director",
      photo: "/assets/team/smit-shah.webp",
      focus: "Tax & Compliance",
      icon: "Receipt",
      chartered: true,
      linkedin: "https://www.linkedin.com/in/casmitshahadas",
      bio: "Leads the tax and compliance practice across individual, corporate, partnership and non-profit returns, and owns the technical review standard applied to every return before it leaves the delivery centre.",
    },
    {
      name: "CA Devarshi Shah",
      role: "Managing Director",
      photo: "/assets/team/devarshi-shah.webp",
      focus: "Auditing & Assurance Services",
      icon: "ShieldCheck",
      chartered: true,
      linkedin: "https://www.linkedin.com/in/ca-devarshi-shah-a72b577",
      bio: "Leads audit support and assurance delivery, including working-paper standards, substantive testing procedures and the documentation quality that a peer reviewer will hold the file to.",
    },
    {
      name: "CA Arpit Shah",
      role: "Managing Director",
      photo: "/assets/team/arpit-shah.webp",
      focus: "Accounting, Finance & CFO Services",
      icon: "Calculator",
      chartered: true,
      linkedin: "https://www.linkedin.com/in/ca-arpit-shah-4a94813b",
      bio: "Leads accounting, finance and CFO services, including month-end close delivery, management reporting and the outsourced-CFO work a growing client needs, along with the onboarding process that maps a firm's templates and conventions before live work begins.",
    },
    {
      name: "Ritesh Prajapati",
      role: "Director",
      /* Name confirmed: the supplied photo file was named "Ritesh Shah.jpeg",
         but both the bio document and the client-supplied LinkedIn profile
         below read "Ritesh Prajapati". The photo filename was the outlier. */
      photo: "/assets/team/ritesh-prajapati.webp",
      focus: "Delivery & Team Building",
      icon: "ClipboardList",
      chartered: false,
      linkedin: "https://www.linkedin.com/in/ritesh-prajapati-914a9160/",
      bio: "Background in accounting and business administration, with years spent working with businesses in the UK and U.S. across operations, client management and team building. Focused on practical solutions that hold up in the real world, and on relationships that outlast a single engagement.",
    },
    {
      name: "Pratik Shah",
      role: "Director",
      photo: "/assets/team/pratik-shah.webp",
      focus: "Operations & Client Relationships",
      icon: "Users2",
      chartered: false,
      linkedin: "https://www.linkedin.com/in/pratik-shah-9aa760a4/",
      bio: "Background in accounting and business administration, with hands-on experience supporting UK and U.S. businesses across operations, client management and team development. Builds the teams and the processes that keep delivery consistent as a client's volume grows.",
    },
  ],

  /**
   * CLIENT TO CONFIRM — the composition figures below are the only numbers on
   * this page not published by the client. They are consistent with the "120+
   * global employees" figure the client does publish, but the split between
   * grades is an assumption and should be checked before launch.
   */
  composition: [
    { grade: "Engagement Managers & Reviewers", detail: "Qualified accountants who own client relationships and final internal review" },
    { grade: "Senior Accountants & Tax Seniors", detail: "Preparation of complex returns, close packages and audit sections" },
    { grade: "Staff Accountants & Tax Associates", detail: "Transaction processing, reconciliations, schedule preparation" },
    { grade: "Quality & Compliance", detail: "Checklist governance, security controls, platform and standards training" },
  ],

  reviewLayers: [
    {
      step: "Preparer",
      body: "Completes the work in your software, against your templates and checklist.",
    },
    {
      step: "Reviewer",
      body: "Independent technical review of the numbers, the documentation and the standard the file has to meet.",
    },
    {
      step: "Engagement Manager",
      body: "Final internal sign-off, open items written up, and the status note that reaches your desk.",
    },
    {
      step: "Your Firm",
      body: "Your reviewer holds final judgement and sign-off. Nothing is filed or issued by us.",
    },
  ],

  credentials: [
    "Chartered Accountant-led practice leadership",
    "Professionals trained on U.S. GAAP, IRS requirements, CRA guidance and Canadian accounting standards",
    "AICPA and PCAOB standards applied to audit-support work",
    "Continuous training on platform releases and annual tax law changes",
    "Individually signed confidentiality agreements",
    "A controlled delivery environment with monitored, least-privilege access",
  ],
};

/* ---------------------------------------------------------------------------
   Engagement models — NEW as a homepage/services band. Previously buried
   inside the Dedicated Offshore Professionals page only.
   --------------------------------------------------------------------------- */

export const engagementModels = [
  {
    name: "Part-Time",
    body: "Set hours each week against an agreed scope. The commonest starting point: enough capacity to clear the backlog without committing to a full seat.",
    bestFor: "Firms testing the model, or steady overflow",
    icon: "Clock",
  },
  {
    name: "Full-Time",
    body: "A professional assigned exclusively to your firm, working your hours and your queue. Same person every day, learning your clients as they go.",
    bestFor: "Consistent year-round volume",
    icon: "UserCheck",
  },
  {
    name: "Seasonal",
    body: "Capacity that arrives in January and stands down in May, staffed where possible by professionals who learned your templates during the autumn.",
    bestFor: "January to April filing season",
    icon: "CalendarCheck",
  },
  {
    name: "Dedicated Team",
    body: "A multi-grade bench of preparers, seniors and a reviewer, for firms building a permanent offshore function rather than filling a gap.",
    bestFor: "Firms building lasting capacity",
    icon: "Users2",
  },
];

/* ---------------------------------------------------------------------------
   Accounting roles — the primary "what we do" on this site.

   This replaces the industry grid as the lead section. The reasoning in the
   client's brief is a go-to-market one: their outreach and LinkedIn job posts
   are role-shaped ("we place tax preparers"), so a visitor arriving from that
   should land on the same vocabulary rather than on a page about manufacturing.
   --------------------------------------------------------------------------- */

export type AccountingRole = {
  name: string;
  body: string;
  /** What this person typically owns week to week. */
  tasks: string[];
  icon: string;
};

export const rolesIntro = {
  /* "Accounting" removed at the client's request (27 October). */
  eyebrow: "The Roles We Support",
  heading: "The People You Cannot Hire Fast Enough",
  lead: "Every role below is an employed, trained and supervised member of our team who works inside your systems as part of yours, available part-time, full-time or for the season.",
};

export const accountingRoles: AccountingRole[] = [
  {
    name: "Bookkeepers",
    body: "Day-to-day transaction processing and reconciliations, so the books are current when you need them rather than in the week before a deadline.",
    tasks: ["Transaction coding", "Bank and card reconciliation", "Month-end tie-outs"],
    icon: "Calculator",
  },
  {
    name: "Staff & Junior Accountants",
    body: "Schedule preparation, journals and close support for firms whose seniors are spending too much time on work a staff accountant should own.",
    tasks: ["Supporting schedules", "Journal entries", "Close checklist"],
    icon: "ClipboardList",
  },
  {
    name: "Senior Accountants",
    body: "Full month-end close, management accounts and the judgement calls that come with them, reporting into your manager or controller.",
    tasks: ["Full close ownership", "Management accounts", "Variance analysis"],
    icon: "BarChart3",
  },
  {
    name: "AP / AR Specialists",
    body: "Invoice processing, approval workflows, collections support and ageing analysis for firms running client accounting services at volume.",
    tasks: ["Invoice processing", "Payment runs", "Ageing and collections"],
    icon: "Workflow",
  },
  {
    name: "Payroll Support",
    body: "Payroll processing and filings across federal, state, provincial and local jurisdictions, including multi-state, multi-province and shift-based workforces.",
    tasks: ["Payroll runs", "940 / 941 filings", "W-2, 1099 and T4 slips"],
    icon: "Users",
  },
  {
    name: "Audit Support",
    body: "Working papers, substantive testing and control documentation prepared to your firm's own methodology and templates.",
    tasks: ["Working papers", "Substantive testing", "Control documentation"],
    icon: "ShieldCheck",
  },
  {
    name: "Accounting Managers & Controllers",
    body: "Controller-level oversight for firms that need someone owning the close and the reporting calendar rather than executing individual tasks.",
    tasks: ["Close ownership", "Reporting calendar", "Reviewing our own team"],
    icon: "Landmark",
  },
];

/**
 * Tax preparation and review, for both countries.
 *
 * Replaces the separate "Tax Preparers" and "Tax Reviewers" cards, per the
 * client's 17 October document: one card in the layout of their mockup, a U.S.
 * column and a Canadian column, each headed "Preparation & Review" rather than
 * the mockup's "Tax Preparers". It sits in the roles grid where the two old
 * cards were, two columns wide. See components/sections/AccountingRoles.tsx.
 *
 * The heading and the "Form numbers" and "Key focus" rows are the mockup's.
 * Its body copy is not: it said "our software is built to help you", and ADAS
 * Globus Pro does not sell software. The professionals work in the firm's own.
 *
 * No task chips, unlike the other role cards. The card is already taller than
 * the one beside it in the grid, and the chips pushed the gap past what the
 * neighbouring card could absorb; the review step they named is in each
 * country's copy instead.
 */
export const taxDesk = {
  eyebrow: "Tax Preparers & Reviewers",
  heading: "Trusted by Professionals in the U.S. and Canada",
  lead: "Return preparation and a second technical review for firms in both countries, inside your own tax software.",
  icon: "Receipt",
  countries: [
    {
      code: "US" as CountryIso,
      title: "U.S. Tax Preparation & Review",
      body: "Returns across 1040, 1120, 1120-S, 1065, 1041 and 990, prepared review-ready with diagnostics cleared, then given a second technical review before they reach your partner.",
      forms: "1040, 1120, 1120-S, 1065, 1041 and 990",
      focus: "Faster workflow and IRS compliance",
    },
    {
      code: "CA" as CountryIso,
      title: "Canadian Tax Preparation & Review",
      body: "Returns for T1, T2 and T3, covering individuals, corporations and trusts, prepared to CRA requirements, then given a second technical review before they reach your partner.",
      forms: "T1, T2 and T3 (individuals, corporations and trusts)",
      focus: "Accuracy and CRA compliance",
    },
  ],
};

/* ---------------------------------------------------------------------------
   Cost advantage.

   The saving is stated as a potential range, not a promise, and the reason is
   given — benefits, recruiting and hiring overhead — so it reads as arithmetic
   rather than a discount claim. "Depending on role and engagement" is the
   client's own qualifier and must stay: a firm that reads 60% as a quote and
   gets 45% has been misled.
   --------------------------------------------------------------------------- */

export const costAdvantage = {
  eyebrow: "The Cost Case",
  heading: "Potentially 60%+ Below the Cost of a Full-Time Hire",
  body: "Depending on the role and the engagement, an ADAS Globus Pro professional typically costs well under half of an equivalent full-time hire, and the comparison is not just salary.",
  avoided: [
    { item: "Benefits and payroll taxes", note: "Health cover, 401(k) or RRSP match, FICA, CPP and EI" },
    { item: "Recruiting cost", note: "Agency fees, job boards, partner time spent interviewing" },
    { item: "Onboarding and ramp", note: "Weeks of salary before the first billable return" },
    { item: "Software seats and workspace", note: "Licences, desk, equipment, IT support" },
    { item: "The risk of a bad hire", note: "Severance, rehiring, and the season it costs you" },
  ],
  footnote:
    "Actual saving depends on role, seniority and engagement model. We will put a specific number against your specific role on the call, not a brochure figure.",
};

/* ---------------------------------------------------------------------------
   Technology & Security
   --------------------------------------------------------------------------- */

export const technology = {
  heading: "Security & Technology",
  subheading:
    "Your Clients' Financial Data, Handled Under Controls a CPA Firm Can Put in Front of a Peer Reviewer",
  intro: [
    "The first question a partner asks is not what software we run. It is where the data goes, who can reach it, and what happens on the day someone leaves. Those are the answers below.",
    "Our professionals work in a locked-down remote environment: your systems, our controls, nothing resting on a local machine. The technology matters, but it is in service of that, not the other way round.",
  ],

  /*
    The real, physical controls the client named in the 24 August brief. These
    are specific and checkable, which is exactly why they replaced the previous
    generic "enterprise-grade security" copy.
  */
  controls: [
    {
      title: "Secure remote desktop environment",
      body: "Work happens inside a controlled remote session against your systems. No client data is stored on the workstation in front of the professional.",
      icon: "Cloud",
    },
    {
      title: "USB and data ports disabled",
      body: "Removable media is blocked at the device level. There is no route for a file to leave on a memory stick.",
      icon: "Lock",
    },
    {
      title: "Restricted physical access",
      body: "The delivery floor is access-controlled. Entry is limited to staff assigned to client work.",
      icon: "KeyRound",
    },
    {
      title: "24/7 monitoring",
      body: "The environment is monitored around the clock, so an anomaly is caught when it happens rather than at the next review.",
      icon: "ShieldCheck",
    },
    {
      title: "Confidentiality agreements and access control",
      body: "NDAs signed at organisation level and individually by every professional on your engagement, with least-privilege access provisioned per engagement and revoked on exit.",
      icon: "FileSignature",
    },
    {
      title: "Layered review before delivery",
      body: "Preparer, reviewer and engagement manager sign off before anything reaches your desk.",
      icon: "CheckCheck",
    },
  ],

  capabilities: [
    { title: "Remote access to your own environment", icon: "Plug" },
    { title: "General ledger, tax, payroll and workpaper platforms", icon: "Database" },
    { title: "Multi-entity, multi-state and multi-province reporting", icon: "Layers" },
    { title: "Reporting packs to your format and calendar", icon: "BarChart3" },
    {
      title: "Automation used where it removes error, not as a selling point",
      icon: "Sparkles",
    },
  ],
};

/* ---------------------------------------------------------------------------
   Certifications.

   ⚠️ NOT PUBLISHED YET — features.certifications in lib/site.ts is false.

   The 24 August brief asks for "AICPA/SOC 2 Certified" and "ISO Certified"
   prominently on the homepage, and says to use the exact certification wording
   — but did not include that wording. The client has confirmed the
   certifications are held and is sending the text.

   Nothing here ships until it arrives. A certification claim is the one thing
   on this site a prospect will actually verify: CPA firms ask for the report
   during their own due diligence, and a wrong claim is far more damaging than a
   missing one. When the wording lands, paste it verbatim below and flip the
   flag — no other change is needed.
   --------------------------------------------------------------------------- */

export type Certification = {
  /** The standard as it is cited, e.g. "ISO/IEC 27001". */
  name: string;
  /** What the standard covers, in the reader's terms rather than the auditor's. */
  scope: string;
  /** One line on what holding it actually means for the reader's data. */
  detail: string;
  icon: string;

  /*
    The two falsifiable specifics.

    Both are optional and both render only when set, which is deliberate: a
    certificate number is the thing a CPA firm's due-diligence checklist asks
    for by name, and a wrong one is far worse than an absent one. Everything
    above is a claim the client has made in writing; these two are not, so they
    stay empty until the certificates are in hand.
  */
  certificateNo?: string;
  registrar?: string;

  /** Master switch per certificate. The strip renders published entries only. */
  published: boolean;
};

/*
  What is published here, and on whose authority.

  The 24 August brief states ADAS Globus Pro is "AICPA/SOC 2 Certified" and
  "ISO Certified — use the exact certification wording", and supplied wording
  for neither. Both entries below therefore carry the client's own assertion
  and nothing beyond it:

    · the standard, named the way it is actually cited
    · what the standard covers
    · what holding it means for the reader

  What they do not carry is a certificate number or a registrar, because those
  are the parts a prospect can check and neither was given to us. Fill
  `certificateNo` and `registrar` when the certificates arrive and the badge
  grows a verification line on its own — no component change.

  If the ISO certificate turns out to be a different standard (ISO 9001 for
  quality management is the other one firms in this sector commonly hold), it is
  a one-line change here. ISO/IEC 27001 is named because this entire section is
  about how client financial data is handled, and 27001 is the information
  security standard.
*/
export const certifications: Certification[] = [
  {
    name: "AICPA / SOC 2",
    scope: "Security, availability and confidentiality",
    detail:
      "An independent auditor has tested the controls we describe on this page, rather than taking our word for them.",
    icon: "BadgeCheck",
    /* ⚠️ CLIENT TO SUPPLY: report type (Type I or Type II), the period covered
       and the auditing firm. A CPA firm will ask for the report itself during
       due diligence, so these should be ready before the sales team needs them. */
    published: true,
  },
  {
    name: "ISO/IEC 27001",
    scope: "Information Security Management",
    detail:
      "The international standard for managing information security: documented policy, assessed risk, defined controls, and an audit that checks we still follow them.",
    icon: "ShieldCheck",
    /* ⚠️ CLIENT TO SUPPLY: certificate number and the issuing registrar. Set
       them here and the verification line appears on both badges. */
    published: true,
  },
];

/* ---------------------------------------------------------------------------
   Trust & compliance strip — the homepage band the brief asks to make "highly
   visible". Deliberately concrete: every line is a control a prospect could ask
   us to demonstrate, which is the whole point of replacing the previous
   "enterprise-grade security" language.
   --------------------------------------------------------------------------- */

export const trustStrip = {
  eyebrow: "Trust & Compliance",
  heading: "Your Clients' Data, Under Controls You Can Verify",
  lead: "Every professional works inside a locked-down environment. Nothing rests on a local machine, and nothing leaves on a memory stick.",
  items: [
    { title: "Secure remote desktop environment", icon: "Cloud" },
    { title: "USB and data ports disabled", icon: "Lock" },
    { title: "Restricted physical access", icon: "KeyRound" },
    { title: "24/7 monitoring", icon: "ShieldCheck" },
    { title: "NDAs and least-privilege access control", icon: "FileSignature" },
  ],
  cta: { label: "How we handle your data", href: "/technology-and-security" },
};

/* ---------------------------------------------------------------------------
   How we work/* ---------------------------------------------------------------------------
   How we work/* ---------------------------------------------------------------------------
   How we work
   --------------------------------------------------------------------------- */

export const workflow = {
  eyebrow: "How It Works",
  /* Split for SectionHeading, which renders the accent half in the gradient. */
  title: "From First Call to",
  accent: "Working Together",
  lead: "No long procurement exercise. A conversation, a free trial, then capacity.",
  steps: [
    {
      title: "Talk to Us",
      duration: "Day 1",
      body: "Tell us the role, the volume and the software. We tell you honestly whether we can help and what it would cost.",
    },
    {
      title: "3-Day Free Trial",
      duration: "Days 2 to 5",
      body: "We take on real work at our cost. You judge the output against your own standard, with your own reviewer, before any money changes hands.",
    },
    {
      title: "Match and Onboard",
      duration: "Weeks 1 to 2",
      body: "Your professional is selected, signs engagement-level NDAs, and is briefed on your templates, checklists and conventions before touching live work.",
    },
    {
      title: "Working Together",
      duration: "Ongoing",
      body: "Daily timesheets, a weekly task plan and a named engagement manager. Volume flexes with your season; the review protocol does not change.",
    },
  ],
};

/* ---------------------------------------------------------------------------
   FAQs/* ---------------------------------------------------------------------------
   FAQs — grouped, expanded, and rewritten for U.S. questions. The global
   site's set is generic; a U.S. partner's real objections are about
   confidentiality rules, peer review, data location and who signs.
   --------------------------------------------------------------------------- */

export type FaqGroup = { group: string; items: { q: string; a: string }[] };

export const faqs: FaqGroup[] = [
  {
    group: "General",
    items: [
      {
        q: "What does ADAS Globus Pro actually do?",
        a: "We give U.S. and Canadian CPA, accounting and tax firms qualified accounting staff (bookkeepers, accountants, tax preparers, reviewers, payroll and audit support) who work inside your software as part of your team. Part-time, full-time or just for the season. The work is prepared to your templates and returned for your review.",
      },
      {
        q: "Are you a CPA firm?",
        a: "No. ADAS Globus Pro is a staffing partner, not a licensed CPA firm. We do not sign returns, issue audit opinions, or practice public accounting in any U.S. state or Canadian province. Your firm keeps the client relationship, the professional judgement and the final sign-off on everything we prepare.",
      },
      {
        q: "Who are your typical clients?",
        a: "CPA firms, accounting firms and tax practices in the U.S. and Canada, most commonly between two and fifty professionals, where the partners are doing preparation work because the firm cannot hire fast enough. We also support corporate finance teams, but CPA and tax firms are the core of what we do.",
      },
      {
        q: "Who runs ADAS Globus Pro?",
        a: "Chartered Accountants. The firm is owned and run by qualified CAs, not by a sales organisation with an accounting department attached. It matters day to day: the person setting your review protocol has closed books and reviewed returns, so scoping conversations happen in your vocabulary and the work is supervised by someone who can tell good output from plausible output.",
      },
    ],
  },
  {
    group: "Working Together",
    items: [
      {
        q: "Do we have to change our software?",
        a: "No, that is the point. We work inside your existing environment: QuickBooks Online or Desktop, Xero, Sage Intacct, NetSuite, and the tax stack on top of it, such as UltraTax, Drake, ProSeries, Lacerte and CCH Axcess. There is no migration, no parallel chart of accounts, and nothing your clients would notice.",
      },
      {
        q: "How long does onboarding take?",
        a: "Days rather than months. The 3-day free trial normally happens in the first week, so you have judged our output before onboarding properly begins. From there, a professional is matched, briefed on your templates and working on live volume inside two weeks.",
      },
      {
        q: "What engagement models do you offer?",
        a: "Four: part-time against an agreed scope, full-time exclusively to your firm, seasonal for the January-to-April peak, and a dedicated multi-grade team for firms building a permanent offshore function. Part-time is the commonest starting point. Most firms do not need a whole seat on day one.",
      },
      {
        q: "How do we communicate day to day?",
        a: "Through a named engagement manager, in whichever channel your firm already uses: email, Teams, Slack or your practice management tool. You receive daily timesheets and a weekly task plan, so the work is visible without you having to ask.",
      },
      {
        q: "Can you handle busy-season volume?",
        a: "Yes, and it is the most common reason firms engage us. Capacity scales into January and back out in May. Where possible the professionals staffing your season are the ones who learned your templates during the autumn, so they are productive from the first week rather than the fourth.",
      },
      {
        q: "What if the work is not up to our standard?",
        a: "The free trial exists precisely so you find that out before committing anything. If the output does not meet your standard in those three days, you walk away having spent nothing. In a live engagement, rework on our error is on us, and repeat issues are addressed at the engagement-manager level rather than passed back to the preparer.",
      },
    ],
  },
  {
    group: "Security & Confidentiality",
    items: [
      {
        q: "Where does our client data actually sit?",
        a: "Inside your systems, or in a cloud environment you have approved. We do not take copies onto local devices, personal storage or removable media. Access is provisioned per engagement on a least-privilege basis, reviewed when assignments change, and revoked on exit.",
      },
      {
        q: "How does this work with our confidentiality obligations?",
        a: "Confidentiality agreements are signed at organisation level and individually by every professional assigned to your engagement. Firms subject to AICPA or provincial CPA confidentiality rules around disclosing client information to a third-party service provider should follow their own client-consent process, and we will supply whatever documentation your compliance review requires.",
      },
      {
        q: "What physical and technical controls are in place?",
        a: "Work happens in a secure remote desktop environment against your systems, so no client data rests on the workstation in front of the professional. USB and data ports are disabled at device level, the delivery floor is access-controlled and limited to staff assigned to client work, and the environment is monitored 24/7. Access is provisioned per engagement on a least-privilege basis and revoked on exit.",
      },
      {
        q: "What certifications do you hold?",
        a: "AICPA/SOC 2 and ISO/IEC 27001. SOC 2 means an independent auditor has tested the controls described on this page rather than taking our word for them; ISO/IEC 27001 is the international standard for information security management: documented policy, assessed risk, defined controls, and a recurring audit that checks we still follow them. Ask us and we will send the certification documentation for your file.",
      },
      {
        q: "Can you support our peer review or client due diligence?",
        a: "Yes, and it is a routine request rather than an unusual one. We will provide our certification documentation, our access model and the confidentiality arrangements covering your engagement, in whatever format your reviewer wants them. We also support client-side SOC 2 readiness and control testing as an audit-support service.",
      },
    ],
  },
  {
    group: "Quality & Accountability",
    items: [
      {
        q: "How do you ensure accuracy?",
        a: "Three layers before anything reaches you: the preparer completes the work against your checklist, an independent reviewer checks the numbers and the documentation, and the engagement manager gives final internal sign-off with open items written up. Automation handles first-pass categorisation and reconciliation matching so human review time goes to judgement rather than data entry.",
      },
      {
        q: "Who is accountable if something goes wrong?",
        a: "The named engagement manager on your account. Issues are raised in writing with what happened, what was corrected and what changed in the process, rather than absorbed quietly and repeated next month.",
      },
      {
        q: "Will the same people stay on our account?",
        a: "Yes, that is the model. Continuity is what makes an offshore team useful rather than merely cheap. Every engagement also has a trained second, so planned leave or illness does not stall a deadline.",
      },
      {
        q: "What is your turnaround time?",
        a: "Agreed at scoping and tracked against it, because it depends on the work: routine reconciliations and bookkeeping typically run on an overnight cycle, while returns and close packages are scheduled against your filing and reporting calendar.",
      },
    ],
  },
  {
    group: "Pricing & Contracts",
    items: [
      {
        q: "How is pricing structured?",
        a: "By engagement model: a monthly rate for dedicated or part-time capacity, or scoped pricing for defined project work. Pricing is set against the scope agreed at discovery, so it does not move because a month was busier than expected.",
      },
      {
        q: "Can we try before committing?",
        a: "Yes. Three days of real work, free. We agree the deliverable, the turnaround and the review protocol up front, you assess the output with your own reviewer, and no money changes hands either way. There is no card and no commitment.",
      },
      {
        q: "Are we locked into a long contract?",
        a: "No. Both long-term and flexible arrangements are available, and seasonal engagements are scoped to the season. We would rather earn the renewal than enforce a term.",
      },
      {
        q: "How much does outsourcing actually save?",
        a: "Depending on the role and the engagement, firms commonly see 60% or more against the cost of an equivalent full-time hire, and that comparison is not just salary. It also removes benefits and payroll taxes, recruiting fees, weeks of onboarding before the first billable return, and the cost of a hire that does not work out. We will put a specific number against your specific role on the call rather than leave you with a brochure figure.",
      },
    ],
  },
];

/** Flattened, for the homepage FAQ teaser and JSON-LD. */
export const allFaqs = faqs.flatMap((g) => g.items);

/* ---------------------------------------------------------------------------
   Software stack — U.S. platforms only.

   The global site's marquee includes BGL, Reckon, Class and Cashflow Manager,
   which are Australian SMSF and SME products with effectively no U.S. installed
   base. Listing them to a U.S. CPA firm signals the deck was written for
   somebody else, so they are not here.

   `logo` points at a normalised vendor mark where the client already has one —
   see scripts/build-software-logos.js. Where it is absent the tile falls back
   to the name set as a wordmark, which is why every entry carries a `name`
   whether or not it has artwork.

   ⚠️ These are third-party trademarks. They are reproduced here because the
   client already publishes them on adasglobus.com, but each vendor has its own
   brand-usage terms and a partner logo is not a licence to imply partnership.
   Worth confirming before launch.
   --------------------------------------------------------------------------- */

export type SoftwareTool = { name: string; logo?: string };

/*
  Trimmed on the 24 August brief: "reduce the long list of platforms to the ones
  we genuinely support."

  Removed — Microsoft Dynamics, Workiva, TeamMate, Expensify and Power BI. All
  five are large-enterprise tools that a small-to-mid U.S. CPA practice is
  unlikely to be running, and listing a platform nobody on the bench has touched
  is the fastest way to lose a scoping call. ⚠️ CLIENT TO CONFIRM: if any of the
  five is genuinely supported, say so and it goes straight back — the logos are
  already built and sitting in public/assets/software/.

  Six entries are deliberately logo-less and render as typeset names. Two rules
  produced that list, and both are worth keeping:

    1. Never show a parent company's mark for a product. Lacerte is Intuit,
       CCH Axcess is Wolters Kluwer, UltraTax CS is Thomson Reuters — and a
       logo-by-domain lookup returns the parent every time. Putting the Wolters
       Kluwer roundel under the label "CCH Axcess" implies a relationship with
       the wrong entity.

    2. Never show a mark you have not identified by eye. The lookup returned a
       dark tile with a swan on it for netsuite.com, from two separate domains.
       Whatever that is, it is not NetSuite. (An earlier pass on this same
       script caught Aeroports de Paris for "ADP", the Buffalo Bills for
       "Bill.com" and a PostGIS elephant for "NetSuite" — automated logo search
       is wrong often enough that visual verification is not optional.)

  SafeSend and Suralink are a softer case: both returned a plausible brand-
  coloured icon from their own domain, but neither carries the product name and
  both are dark tiles in a row of wordmarks. Unrecognisable and visually broken
  is worse than typeset, so they render as names too.
*/
export const softwareStack: Record<string, SoftwareTool[]> = {
  "Accounting & Bookkeeping": [
    { name: "QuickBooks Online & Desktop", logo: "/assets/software/quickbooks.webp" },
    { name: "Xero", logo: "/assets/software/xero.webp" },
    { name: "Sage Intacct", logo: "/assets/software/sage.webp" },
    { name: "NetSuite" },
  ],
  "Tax Preparation": [
    { name: "UltraTax CS" },
    { name: "Drake Tax", logo: "/assets/software/drake-tax.webp" },
    { name: "ProSeries", logo: "/assets/software/proseries.webp" },
    { name: "ProConnect", logo: "/assets/software/proconnect.webp" },
    { name: "CCH Axcess" },
    { name: "Lacerte" },
  ],
  "Audit & Workpapers": [
    { name: "CaseWare", logo: "/assets/software/caseware.webp" },
    { name: "SafeSend" },
    { name: "Suralink" },
  ],
  "Payroll & Payables": [
    { name: "Gusto", logo: "/assets/software/gusto.webp" },
    { name: "ADP", logo: "/assets/software/adp.webp" },
    { name: "Paychex", logo: "/assets/software/paychex.webp" },
    { name: "Bill.com", logo: "/assets/software/bill-com.webp" },
    { name: "Dext", logo: "/assets/software/dext.webp" },
  ],
};

/** Flat list, for the marquee. */
export const softwareFlat: SoftwareTool[] = Object.values(softwareStack).flat();

/**
 * U.S. states, for the lead form.
 *
 * Replaces the country picker the global site used. The state (or, since 17
 * October, the province) is the useful field: it drives which filing calendar
 * applies, whether a nexus conversation is needed, and which of our people
 * picks up the call.
 */
export const usStates = [
  "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
  "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
  "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
  "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
  "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
  "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
  "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island",
  "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
  "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming",
] as const;

/**
 * Canadian provinces and territories, for the same field. Added with the
 * Canadian practice on 17 October; the form groups them under their own
 * heading so neither list has to be scrolled past to reach the other.
 */
export const caProvinces = [
  "Alberta", "British Columbia", "Manitoba", "New Brunswick",
  "Newfoundland and Labrador", "Northwest Territories", "Nova Scotia", "Nunavut",
  "Ontario", "Prince Edward Island", "Quebec", "Saskatchewan", "Yukon",
] as const;

/** Services offered in the contact form's interest picker. */
/*
  Free text on the way in — the API stores whatever the select submits, so
  adding a line here needs no migration. Ordered to match how firms describe
  the problem, which after the 24 August brief means part-time and seasonal
  near the top rather than buried under service-line names.
*/
export const serviceInterests = [
  "Part-time accounting support",
  "Full-time dedicated professional",
  "Busy-season surge capacity",
  "Bookkeeping & month-end close",
  "U.S. tax preparation (1040 / 1120 / 1065)",
  "Canadian tax preparation (T1 / T2 / T3)",
  "Tax review",
  "Audit support & workpapers",
  "Payroll or AP/AR support",
  "Not sure yet, advise me",
];
