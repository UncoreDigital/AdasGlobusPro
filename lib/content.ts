/**
 * Page copy that is not a service or an industry: the homepage bands, about,
 * the team, technology & security, and the FAQ set.
 *
 * ── U.S. site. ──────────────────────────────────────────────────────────────
 * Rewritten from the global site's copy rather than lifted from it, for two
 * reasons: the audience here is a U.S. CPA firm or U.S. finance team, and two
 * live sites carrying identical paragraphs on different domains is how one of
 * them gets treated as a duplicate. Every standard, form and deadline named
 * below is American.
 *
 * Three rules govern edits:
 *
 *  1. Claims with a number in them (accuracy %, time saved, client count) are
 *     the client's own and must not be invented, rounded up, or "improved".
 *     Figures that change over time live in Supabase `site_settings` instead —
 *     see lib/settings.ts — so the client can update them without a deploy.
 *
 *  2. ISO 27001 is described as "aligned", never "certified". The client's own
 *     site says aligned; upgrading that word is a compliance misrepresentation,
 *     not a copy improvement. The same applies to SOC 2: we support clients'
 *     SOC 2 work, we do not claim to hold a report.
 *
 *  3. ADAS Globus is not a CPA firm and does not sign, file or issue opinions.
 *     Copy must never imply otherwise — the client firm keeps the engagement,
 *     the judgement and the sign-off. See `boundary` below.
 */

/* ---------------------------------------------------------------------------
   The liability boundary. Rendered on service pages and in the footer.
   --------------------------------------------------------------------------- */

export const boundary =
  "ADAS Globus is an outsourcing partner, not a CPA firm. We do not sign returns, issue audit opinions, or hold ourselves out as licensed to practise public accounting in any U.S. state. Your firm retains the client relationship, the professional judgement and the final sign-off.";

/* ---------------------------------------------------------------------------
   Homepage
   --------------------------------------------------------------------------- */

export const hero = {
  headline: "Offshore Accounting Capacity",
  /** Rendered in accent as the emphasised second line of the H1. */
  headlineAccent: "Built for U.S. CPA Firms",
  subhead: "Serving CPA practices and finance teams across all 50 states",
  primaryCta: { label: "Schedule a Consultation", href: "/contact" },
  secondaryCta: { label: "Explore Services", href: "/services" },
  lead: "Qualified accountants, tax preparers and audit associates working inside your software, to your review standard, on your busy-season calendar — so 1040 season stops being a hiring problem.",
  chips: [
    "US GAAP · IRS · PCAOB trained",
    "Works in your software",
    "ISO 27001-aligned",
    "Overnight turnaround",
  ],
};

export const aboutTeaser = {
  eyebrow: "Who We Are",
  heading: "Your Offshore Accounting Division — Not Another Vendor to Manage",
  points: [
    "Serving U.S. CPA practices, public accounting firms and corporate finance functions since 2020, with a delivery centre built specifically around American engagement standards and busy-season cycles.",
    "Staffed by qualified accountants, tax preparers and audit associates trained in US GAAP, IRS procedure, PCAOB and AICPA guidance — not generalists reassigned to a U.S. desk.",
    "AI-augmented workflows cut manual processing time by up to 60%, compressing month-end close, 1040 and 1120 turnaround, and financial reporting delivery without adding review burden.",
    "Engagement models built for how U.S. firms actually staff: full-time dedicated professionals, part-time capacity, seasonal surge for January through April, or a permanent offshore bench.",
  ],
};

/**
 * "Why Choose ADAS Globus" — four differentiators.
 *
 * Rewritten for the U.S. reader. The global site's version claims fluency in
 * "US GAAP, IFRS, UK FRS 102, Australian AAS and UAE corporate tax", which on a
 * U.S.-only site reads as a firm spread thin rather than one with depth. Here
 * the same point is made by going narrower and more specific.
 */
export const whyUs = [
  {
    title: "Native to Your Software Stack",
    body: "We work inside the environment you already run — QuickBooks Online and Desktop, Xero, Sage Intacct, NetSuite, Dynamics 365, and the tax stack on top of it: Drake, UltraTax CS, Lacerte, ProSeries, CCH Axcess. No migration, no parallel chart of accounts, no change to how your clients are billed. Onboarding is measured in days.",
    icon: "Plug",
  },
  {
    title: "Trained on U.S. Standards, Not Adapted to Them",
    body: "US GAAP, IRS procedure, AICPA guidance and PCAOB standards are what our professionals are trained on from day one — including the parts that trip up offshore teams: state nexus, multi-state apportionment, Schedule K-1 allocations, and the documentation standard a peer reviewer will actually look for.",
    icon: "Landmark",
  },
  {
    title: "AI-Augmented, Human-Reviewed",
    body: "Our automation reaches better than 95% first-pass transaction categorisation and compresses bank reconciliation cycles by up to 70%. What it flags goes to a person; what it resolves does not. Every deliverable still clears preparer, reviewer and engagement-manager sign-off before it reaches your desk.",
    icon: "Sparkles",
  },
  {
    title: "You Keep Control — and the Sign-Off",
    body: "You set the priorities, the task list and the review protocol. Daily timesheets and weekly task plans make the work visible, and nothing is filed, signed or issued by us. Your firm holds the client relationship, the professional judgement and the final review.",
    icon: "SlidersHorizontal",
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
  eyebrow: "Busy Season",
  heading: "The Four Months That Decide Your Year",
  body: "Between the January 31 information-return deadline and the April 15 individual filing deadline, a U.S. practice needs roughly twice the preparer capacity it can justify employing for the other eight months. Hiring for the peak means carrying it through the trough; not hiring for it means turning work away or burning out the people you have.",
  resolution:
    "A dedicated offshore bench solves the arithmetic. Capacity scales into January and back out in May, the professionals on your engagement are the same ones who learned your templates in the autumn, and your reviewers spend the season reviewing rather than preparing.",
  milestones: [
    { date: "Jan 31", label: "1099-NEC, 1099-MISC and W-2 filing" },
    { date: "Mar 17", label: "Form 1065 and 1120-S deadline" },
    { date: "Apr 15", label: "Form 1040 and 1120 deadline" },
    { date: "Sep–Oct", label: "Extended returns and year-end planning" },
  ],
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
    title: "Enterprise-Grade Data Security",
    body: "ISO 27001-aligned controls, least-privilege access, signed NDAs.",
    icon: "Lock",
  },
  {
    title: "Support Beyond Business Hours",
    body: "Extended coverage through busy season and around filing deadlines.",
    icon: "Headphones",
  },
  {
    title: "Deadlines Held, Not Negotiated",
    body: "Turnaround is agreed in writing at scoping and tracked against it.",
    icon: "CalendarCheck",
  },
  {
    title: "AI-Enabled Process Automation",
    body: "Exception-driven workflows, so review time goes where it is needed.",
    icon: "Bot",
  },
  {
    title: "Built-In Team Backup",
    body: "Every engagement has a trained second, so leave never stalls work.",
    icon: "Users2",
  },
];

export const technologyTeaser = {
  eyebrow: "Technology",
  heading: "We Adapt to Your Stack. You Change Nothing.",
  body: "Our professionals hold current working proficiency across the accounting, ERP and tax platforms U.S. firms actually run — general ledger, tax prep, workpaper management, payroll and AP automation. You do not migrate, you do not retrain your staff, and your clients never see a change in how their work is handled.",
};

/**
 * "Around the Clock" band — reframed for the U.S.
 *
 * The global site's version is a six-country strip, which on a U.S. site is
 * noise. The claim that matters here is the overnight cycle: work handed off at
 * close of business is back before the next morning, in any U.S. time zone.
 */
export const coverage = {
  eyebrow: "How the Day Works",
  heading: "Your Evening Is Our Morning",
  subheading:
    "The time difference is the product. Work handed off at close of business is reviewed, prepared and returned before your team logs in.",
  kicker: "Coverage across every U.S. time zone, Eastern through Pacific.",
  cycle: [
    {
      time: "5:00 PM",
      zone: "Your office",
      label: "Hand-off",
      body: "You queue the day's work — returns to prepare, reconciliations to clear, workpapers to build.",
    },
    {
      time: "Overnight",
      zone: "Delivery centre",
      label: "Prepared",
      body: "Your dedicated team works the queue in your software, against your templates and checklists.",
    },
    {
      time: "Before dawn",
      zone: "Delivery centre",
      label: "Reviewed",
      body: "Preparer, reviewer and engagement-manager sign-off, with open items flagged in writing.",
    },
    {
      time: "9:00 AM",
      zone: "Your office",
      label: "On your desk",
      body: "Completed work and a short status note are waiting. Your reviewers review; they do not prepare.",
    },
  ],
};

export const pricingTeaser = {
  heading: "Would You Like to Validate Our Work First?",
  subheading: "Starting at $199",
  body: "Run a scoped pilot before committing to anything. We agree the deliverable, the turnaround and the review protocol up front — then you assess the output against your own standard, with your own reviewer, before an ongoing engagement is discussed.",
  cta: { label: "Start a Pilot", href: "/contact" },
  points: [
    "Scope agreed in writing first",
    "Your templates and review protocol",
    "No ongoing commitment",
    "Assessed against your own standard",
  ],
};

/**
 * Testimonials — reproduced verbatim from the client's own site.
 *
 * Attributed by role, not by name, because that is how the client published
 * them. Do not invent names, and do not reword the quotes to fit the U.S.
 * framing: a testimonial that has been edited is no longer a testimonial.
 */
export const testimonials = [
  {
    quote:
      "ADAS Globus operates as a genuine extension of our practice — not a third-party supplier. Their technical precision, structured communication, and consistent adherence to our internal review protocols have materially elevated the quality and capacity of our accounting operations.",
    name: "Managing Partner",
    role: "Regional CPA Firm",
  },
  {
    quote:
      "Integrating ADAS into our month-end close process was seamless. Their AI-augmented workflows compressed our close cycle by several days, with measurable improvement in first-pass accuracy across all entity accounts.",
    name: "CFO",
    role: "Mid-Market Technology Enterprise",
  },
  {
    quote:
      "For a multi-entity group operating across three jurisdictions, we needed an offshore partner capable of managing multiple regulatory frameworks simultaneously. ADAS delivers that — with the accountability and communication discipline our board requires.",
    name: "Group Finance Director",
    role: "Multi-Entity Holding Group",
  },
];

export const homeCta = {
  heading: "Ready to Add Capacity Without Adding Headcount?",
  body: "Tell us your volumes, the software you run and the review standard you hold work to. Our senior advisory team responds within one business day with a proposed engagement structure — or an honest answer that we are not the right fit.",
  cta: { label: "Schedule a Conversation", href: "/contact" },
};

/** The band that closes every interior page. */
export const buildCta = {
  heading: "Let's Build Your Solution",
  body: "Connect with us now and experience offshore staffing and strategic support that adapts to your firm.",
  cta: { label: "Connect With Us", href: "/contact" },
};

/* ---------------------------------------------------------------------------
   About / Who We Are
   --------------------------------------------------------------------------- */

export const about = {
  heading: "Built for the Way U.S. Accounting Firms Actually Work",
  lead: "Offshore support fails when it is bolted on. It works when it is shaped around a firm's existing software, templates, review layers and deadlines — which is what we were built to do.",

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
      "ADAS Globus was founded in 2020 by three practising Chartered Accountants who had spent their careers inside audit, tax and financial reporting engagements — and had seen from the inside why offshore arrangements so often disappoint.",
      "The pattern was consistent. Work came back technically defensible but structurally wrong: right numbers, wrong templates; complete files, no documentation trail; capacity delivered, review burden increased. Firms ended up paying for support and then paying again in partner time to make it usable.",
      "So the firm was built the other way round. Templates, checklists, review layers and communication protocols are set up before any live work is touched, and the professionals assigned to a client learn that firm's conventions during onboarding rather than during busy season. The measure of success is simple: work that comes back ready to review, not ready to redo.",
    ],
  },

  vision: {
    heading: "Vision",
    body: "To be the offshore accounting partner U.S. CPA firms choose on merit rather than on price — recognised for precision-driven execution, for functioning as a genuine extension of the practices we serve, for leading through AI-enabled workflows, and for partnerships built on trust and professional ethics rather than on contract length.",
  },
  mission: {
    heading: "Mission",
    body: "To give U.S. CPA firms and finance teams dependable, scalable capacity across accounting, tax and audit support — delivered by dedicated teams that work inside your systems and standards, backed by AI-enabled workflows, and held to Professional Integrity, Operational Excellence and Accountability on every engagement.",
  },

  values: [
    { name: "Professional Integrity", body: "We say what the work actually is, including when it is not going well." },
    { name: "Operational Excellence", body: "Standardised workflows and checklist governance on every engagement." },
    { name: "Client-Centric Collaboration", body: "Your conventions, your templates, your review protocol." },
    { name: "Accountability", body: "A named engagement manager, and visible open items." },
    { name: "Continuous Advancement", body: "Ongoing training on U.S. standards and platform releases." },
    { name: "Client Commitment", body: "Long-term relationships over transactional engagements." },
    { name: "Confidentiality & Data Security", body: "ISO 27001-aligned controls and individually signed NDAs." },
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

  leadership: [
    {
      name: "CA Smit Shah",
      role: "Managing Director",
      photo: "/assets/team/smit-shah.webp",
      focus: "Accounting & Client Advisory",
      bio: "Leads the accounting and advisory practice, including month-end close delivery, management reporting and the client-onboarding process that maps a firm's templates and conventions before live work begins.",
    },
    {
      name: "CA Arpit Shah",
      role: "Managing Director",
      photo: "/assets/team/arpit-shah.webp",
      focus: "Taxation & Compliance",
      bio: "Leads the tax practice across individual, corporate, partnership and non-profit returns, and owns the technical review standard applied to every return before it leaves the delivery centre.",
    },
    {
      name: "CA Devarshi Shah",
      role: "Managing Director",
      photo: "/assets/team/devarshi-shah.webp",
      focus: "Audit Support & Assurance",
      bio: "Leads audit support and assurance delivery, including working-paper standards, substantive testing procedures and the documentation quality that a peer reviewer will hold the file to.",
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
      body: "Independent technical review — numbers, documentation, and the standard the file has to meet.",
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
    "Professionals trained on US GAAP and IRS procedure",
    "AICPA and PCAOB standards applied to audit-support work",
    "Continuous training on platform releases and annual tax law changes",
    "Individually signed confidentiality agreements",
    "ISO 27001-aligned information security environment",
  ],
};

/* ---------------------------------------------------------------------------
   Engagement models — NEW as a homepage/services band. Previously buried
   inside the Professional Hiring page only.
   --------------------------------------------------------------------------- */

export const engagementModels = [
  {
    name: "Full-Time Dedicated",
    body: "A professional assigned exclusively to your firm, working your hours and your queue. The default where volume is steady year-round.",
    bestFor: "Firms with consistent monthly volume",
    icon: "UserCheck",
  },
  {
    name: "Part-Time / Shared",
    body: "Structured hours against an agreed scope, for firms whose volume does not justify a full-time seat but whose work still needs a consistent, familiar preparer.",
    bestFor: "Smaller practices and specific workstreams",
    icon: "Clock",
  },
  {
    name: "Seasonal Surge",
    body: "Capacity that scales into January and back out in May, staffed by professionals who learned your templates during the autumn so they are productive from week one.",
    bestFor: "January–April filing season",
    icon: "CalendarCheck",
  },
  {
    name: "Offshore Team Build",
    body: "A structured multi-grade team — preparers, seniors and a reviewer — for firms establishing a permanent offshore function rather than filling a gap.",
    bestFor: "Firms building lasting capacity",
    icon: "Users2",
  },
];

/* ---------------------------------------------------------------------------
   Technology & Security
   --------------------------------------------------------------------------- */

export const technology = {
  heading: "Technology & Security",
  subheading:
    "AI-Augmented Delivery on an Enterprise-Grade, ISO 27001-Aligned Infrastructure",
  intro: [
    "Offshore accounting stopped being a labour-arbitrage decision some years ago. A U.S. firm evaluating a partner today is evaluating an operating environment: what runs automatically, what a person reviews, where client data physically sits, and who can reach it.",
    "ADAS Globus has invested deliberately in that environment. Cloud-native accounting platforms, AI-enabled workflow automation and analytics sit on top of an information-security framework modelled on ISO 27001 — because the firms we serve are themselves subject to professional standards on confidentiality and are asked about ours during their own peer review.",
    "The result is meant to be measurable rather than impressive: faster close cycles, fewer first-pass errors, a clearer view of where work stands, and a documentation trail that survives scrutiny.",
  ],
  pillars: [
    {
      title: "AI-Enabled Automation: Precision at Scale",
      body: "Transaction categorisation, reconciliation matching and anomaly detection run before a person opens the file. Better than 95% first-pass categorisation accuracy means our professionals spend their time on exceptions and judgement calls, not on keystrokes the machine already got right.",
      icon: "Sparkles",
    },
    {
      title: "Cloud-Native Delivery",
      body: "Every engagement runs inside your cloud accounting environment, with controlled access and a complete audit trail. Your team sees the same ledger we do, at the same moment — there is no separate copy of your data and no reconciliation between two versions of the truth.",
      icon: "Cloud",
    },
    {
      title: "Security Built for Regulated Professional Services",
      body: "Least-privilege access provisioned per engagement, reviewed on assignment change and revoked on exit. No client data on local devices, no personal storage, no removable media. Confidentiality agreements signed by the organisation and individually by every professional on your work.",
      icon: "ShieldCheck",
    },
  ],
  capabilities: [
    { title: "General ledger and ERP environments", icon: "Database" },
    { title: "Cloud accounting with real-time collaboration", icon: "Cloud" },
    { title: "Multi-entity and multi-location consolidation", icon: "Layers" },
    { title: "Automated workflows that remove manual error", icon: "Workflow" },
    { title: "Analytics and performance dashboards", icon: "BarChart3" },
    { title: "Integration with your existing business systems", icon: "Plug" },
  ],
  controls: [
    {
      title: "ISO 27001-aligned framework",
      body: "Information security policy, risk assessment and control objectives modelled on the standard.",
      icon: "BadgeCheck",
    },
    {
      title: "Least-privilege access",
      body: "Provisioned per engagement, reviewed on change of assignment, revoked on exit.",
      icon: "KeyRound",
    },
    {
      title: "Individually signed NDAs",
      body: "At organisation level and by every professional assigned to your engagement.",
      icon: "FileSignature",
    },
    {
      title: "No data on local devices",
      body: "Work happens inside your systems or an approved cloud environment. No removable media.",
      icon: "Cloud",
    },
    {
      title: "Three-layer review",
      body: "Preparer, reviewer and engagement manager sign off before anything reaches your desk.",
      icon: "CheckCheck",
    },
    {
      title: "Checklist governance",
      body: "Standardised workflows and periodic compliance checks across every engagement.",
      icon: "ListChecks",
    },
  ],
};

/* ---------------------------------------------------------------------------
   How we work
   --------------------------------------------------------------------------- */

export const workflow = {
  eyebrow: "How We Work",
  heading: "Five Steps From First Call to Steady-State Delivery",
  lead: "No engagement starts at full volume. The pilot exists so you assess our output against your own review standard before anything scales.",
  steps: [
    {
      title: "Discovery & Scoping",
      duration: "Week 1",
      body: "We map your volumes, software, entity mix and review protocol, then put the deliverable, the turnaround and the acceptance standard in writing before anyone touches live work.",
    },
    {
      title: "Team Assembly",
      duration: "Week 1–2",
      body: "Professionals are selected against your platform and engagement requirements, sign engagement-level NDAs, and are briefed on your templates, checklists and naming conventions.",
    },
    {
      title: "Pilot & Calibration",
      duration: "Week 2–4",
      body: "A scoped batch runs first. Your reviewer assesses it against your own standard, and we calibrate to your conventions — file structure, documentation depth, how open items are raised.",
    },
    {
      title: "Ramp-Up",
      duration: "Month 2",
      body: "Volume increases against agreed checkpoints. Where a permanent bench is being built, additional grades are added and trained on the conventions already established.",
    },
    {
      title: "Steady-State Delivery",
      duration: "Ongoing",
      body: "Daily timesheets, weekly task plans and a named engagement manager. Volume flexes with your season; the review protocol does not change.",
    },
  ],
};

/* ---------------------------------------------------------------------------
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
        q: "What does ADAS Globus actually do?",
        a: "We provide U.S. CPA firms and finance teams with dedicated offshore capacity across bookkeeping and accounting, tax preparation, audit support, and financial reporting — plus dedicated professional hiring where a firm wants a permanent offshore bench. The work is prepared in your software, to your templates, and returned for your review.",
      },
      {
        q: "Are you a CPA firm?",
        a: "No. ADAS Globus is an outsourcing partner, not a licensed CPA firm. We do not sign returns, issue audit opinions, or practise public accounting in any U.S. state. Your firm keeps the client relationship, the professional judgement and the final sign-off on everything we prepare.",
      },
      {
        q: "Who are your typical clients?",
        a: "Regional and local CPA practices, public accounting firms, and corporate finance teams — most commonly firms between two and fifty professionals who need capacity that scales with busy season without carrying it through the rest of the year.",
      },
      {
        q: "How experienced is the team?",
        a: "The practice is led by three Chartered Accountants with combined experience across audit, tax and financial reporting. Professionals are trained on US GAAP and IRS procedure, with ongoing training on annual tax law changes and platform releases.",
      },
    ],
  },
  {
    group: "Working Together",
    items: [
      {
        q: "Do we have to change our software?",
        a: "No — that is the point. We work inside your existing environment: QuickBooks Online or Desktop, Xero, Sage Intacct, NetSuite, Dynamics 365, and the tax stack on top of it. There is no migration, no parallel chart of accounts, and nothing your clients would notice.",
      },
      {
        q: "How long does onboarding take?",
        a: "Days rather than months. Week one is scoping and team assembly; a scoped pilot usually runs in weeks two to four so you can assess output against your own standard before volume increases. Firms building a permanent bench typically reach steady state in the second month.",
      },
      {
        q: "What engagement models do you offer?",
        a: "Four: a full-time dedicated professional, part-time or shared capacity against an agreed scope, seasonal surge for the January-to-April peak, and a structured multi-grade team build for firms establishing a permanent offshore function.",
      },
      {
        q: "How do we communicate day to day?",
        a: "Through a named engagement manager, in whichever channel your firm already uses — email, Teams, Slack, or your practice management tool. You receive daily timesheets and a weekly task plan, so the work is visible without you having to ask.",
      },
      {
        q: "Can you handle busy-season volume?",
        a: "Yes, and it is the most common reason firms engage us. Capacity scales into January and back out in May. Where possible the professionals staffing your season are the ones who learned your templates during the autumn, so they are productive from the first week rather than the fourth.",
      },
      {
        q: "What if the work is not up to our standard?",
        a: "The pilot exists precisely so you find that out before committing. If output does not meet your standard during the pilot, there is no ongoing engagement to unwind. In a live engagement, rework on our error is on us, and repeat issues are addressed at the engagement-manager level rather than passed back to the preparer.",
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
        a: "Confidentiality agreements are signed at organisation level and individually by every professional assigned to your engagement. Firms subject to AICPA confidentiality rules around disclosing client information to a third-party service provider should follow their own client-consent process — we will supply whatever documentation your compliance review requires.",
      },
      {
        q: "Are you ISO 27001 certified?",
        a: "We operate an ISO 27001-aligned information security environment — policy, risk assessment and control objectives modelled on the standard. We describe it as aligned rather than certified, because that is accurate, and we would rather you hear the precise answer from us than discover the distinction later.",
      },
      {
        q: "Can you support our SOC 2 or peer review requirements?",
        a: "We support client-side SOC 2 readiness and control testing as an audit-support service, and we will provide documentation on our own controls, access model and confidentiality arrangements for your peer review or client due diligence. We do not hold a SOC 2 report of our own.",
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
        a: "The named engagement manager on your account. Issues are raised in writing with what happened, what was corrected and what changed in the process — not absorbed quietly and repeated next month.",
      },
      {
        q: "Will the same people stay on our account?",
        a: "Yes, that is the model — continuity is what makes an offshore team useful rather than merely cheap. Every engagement also has a trained second, so planned leave or illness does not stall a deadline.",
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
        a: "By engagement model — a monthly rate for dedicated or part-time capacity, or scoped pricing for defined project work. Pricing is set against the scope agreed at discovery, so it does not move because a month was busier than expected.",
      },
      {
        q: "Can we try before committing?",
        a: "Yes. Pilot engagements start at $199. We agree the deliverable, the turnaround and the review protocol up front, and you assess the output with your own reviewer before any ongoing arrangement is discussed.",
      },
      {
        q: "Are we locked into a long contract?",
        a: "No. Both long-term and flexible arrangements are available, and seasonal engagements are scoped to the season. We would rather earn the renewal than enforce a term.",
      },
      {
        q: "How much does outsourcing actually save?",
        a: "Savings depend on the grade of work and the model, and the honest answer is that cost is rarely the deciding factor for the firms that stay. What they cite is capacity that does not have to be hired for the peak and carried through the trough, and partner time returned to review and client work rather than preparation.",
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

export const softwareStack: Record<string, SoftwareTool[]> = {
  "Accounting & ERP": [
    { name: "QuickBooks Online & Desktop", logo: "/assets/software/quickbooks.webp" },
    { name: "Xero", logo: "/assets/software/xero.webp" },
    { name: "Sage Intacct", logo: "/assets/software/sage.webp" },
    { name: "Microsoft Dynamics", logo: "/assets/software/microsoft-dynamics.webp" },
    { name: "NetSuite" },
  ],
  "Tax Preparation": [
    { name: "UltraTax CS", logo: "/assets/software/ultratax.webp" },
    { name: "ProSeries", logo: "/assets/software/proseries.webp" },
    { name: "ProConnect", logo: "/assets/software/proconnect.webp" },
    { name: "Drake Tax" },
    { name: "Lacerte" },
    { name: "CCH Axcess" },
  ],
  "Audit & Workpapers": [
    { name: "CaseWare", logo: "/assets/software/caseware.webp" },
    { name: "TeamMate", logo: "/assets/software/teammate.webp" },
    { name: "Workiva", logo: "/assets/software/workiva.webp" },
    { name: "SafeSend" },
    { name: "Suralink" },
  ],
  "Payroll, AP & Reporting": [
    { name: "Gusto" },
    { name: "ADP" },
    { name: "Paychex" },
    { name: "Bill.com" },
    { name: "Expensify" },
    { name: "Dext" },
    { name: "Power BI" },
  ],
};

/** Flat list, for the marquee. */
export const softwareFlat: SoftwareTool[] = Object.values(softwareStack).flat();

/**
 * U.S. states, for the lead form.
 *
 * Replaces the country picker the global site used. On a U.S.-only site the
 * state is the useful field: it drives which filing calendar applies, whether
 * a nexus conversation is needed, and which of our people picks up the call.
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

/** Services offered in the contact form's interest picker. */
export const serviceInterests = [
  "Bookkeeping & month-end close",
  "Tax preparation (1040 / 1120 / 1065)",
  "Audit support & workpapers",
  "Dedicated offshore staff",
  "Busy-season surge capacity",
  "Not sure yet — advise me",
];
