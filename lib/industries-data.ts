/**
 * The five industry verticals, rewritten for the U.S. market.
 *
 * Same contract as services-data.ts: this file is the source of truth for the
 * /industries index, every /industries/[slug] page, the header dropdown, the
 * footer column and the sitemap.
 *
 * ── What changed from the global site ───────────────────────────────────────
 * The five sectors are the client's. The content is rebuilt around U.S.
 * accounting and tax specifics — ASC references, state nexus, IRS treatment,
 * Uniform Guidance, FLSA tip credits — because sector expertise is only
 * credible when it names the thing the sector actually struggles with.
 *
 * Each vertical now carries a `challenges` block ahead of the scope list. The
 * old pages jumped straight from a positioning paragraph to a service menu,
 * which reads as capability rather than understanding.
 *
 * The FAQ sets are kept and expanded — three sector-specific questions were the
 * most concretely useful copy on the old pages.
 */

export type Industry = {
  slug: string;
  /** Short label for nav, cards and breadcrumbs. */
  name: string;
  /** Parenthetical qualifier the client uses alongside the short name. */
  qualifier?: string;
  /** Page H1. */
  heading: string;
  /** One line, used on the industries index cards and header dropdown. */
  summary: string;
  /** Lead paragraphs on the detail page. */
  intro: string[];
  /** NEW — what actually goes wrong in this sector's books. */
  challenges: { title: string; body: string }[];
  /** The sector-specific service list. */
  scope: string[];
  faqs: { q: string; a: string }[];
  /** Card thumbnail, 418x536, imported from the live site. */
  image: string;
  /** Page-header photography, 1536x1024. See scripts/build-photo-assets.js. */
  imageHd: string;
  /** Lucide icon name, resolved through lib/icons.ts. */
  icon: string;
  meta: { title: string; description: string };
};

export const industries: Industry[] = [
  {
    slug: "manufacturing",
    name: "Manufacturing",
    qualifier: "Small & Mid-Scale Units",
    heading: "Manufacturing",
    summary:
      "Cost accounting, inventory valuation and multi-plant reporting for production-driven businesses.",
    intro: [
      "Manufacturing sits at the intersection of inventory accounting complexity, multi-plant structures and cross-border trade compliance. For a production business the difference between accurate and inaccurate cost accounting is the difference between knowing which product lines make money and guessing — a distinction basic bookkeeping competence does not resolve.",
      "The technical requirements are specific and unforgiving. Absorption costing under ASC 330 means fixed overhead has to be allocated on normal capacity, and idle capacity expensed rather than capitalised into inventory. Standard cost variances have to be analysed and disposed of correctly at period end. Section 263A uniform capitalisation pulls costs into inventory for tax that GAAP leaves in period expense, and the book-tax difference has to be tracked, not rediscovered each year.",
      "Our manufacturing practice is staffed by professionals with applied experience in production cost environments — giving controllers and CFOs the financial visibility to defend margins, manage working capital and satisfy multi-state compliance obligations.",
    ],
    challenges: [
      {
        title: "Overhead absorption that hides idle capacity",
        body: "When fixed overhead is spread across actual rather than normal capacity, a slow quarter capitalises the slowdown into inventory and defers the loss. ASC 330 requires the opposite treatment, and auditors look for it.",
      },
      {
        title: "Standard cost variances left undisposed",
        body: "Material, labour and overhead variances accumulate through the year and have to be allocated between inventory and COGS at period end. Dumping them all to COGS is the common shortcut and a common audit adjustment.",
      },
      {
        title: "Section 263A book-tax differences",
        body: "UNICAP capitalises costs into inventory for tax that GAAP expenses in the period. The schedule has to be maintained continuously, not reconstructed in March.",
      },
      {
        title: "Multi-state and multi-plant apportionment",
        body: "Plants in more than one state create nexus, apportionment and personal property tax filings that a single-entity chart of accounts is not structured to support.",
      },
    ],
    scope: [
      "Standard costing, actual costing and variance analysis across material, labour and overhead",
      "Inventory valuation under FIFO, LIFO and weighted average, with LIFO reserve tracking",
      "Bill of materials cost modelling and work-in-progress accounting",
      "Overhead absorption analysis and idle capacity treatment under ASC 330",
      "Section 263A uniform capitalisation schedules and book-tax difference tracking",
      "Accounts payable management for raw material and component procurement",
      "Multi-plant P&L preparation and consolidated management reporting",
      "Fixed asset accounting, depreciation scheduling and capital expenditure tracking",
      "Multi-state sales and use tax compliance, including manufacturing exemptions",
      "Import duty, tariff and landed cost analysis",
    ],
    faqs: [
      {
        q: "Can you manage inventory-based accounting?",
        a: "Yes — inventory tracking, valuation under FIFO, LIFO or weighted average, LIFO reserve maintenance, work-in-progress accounting and cost-of-goods calculations, with the supporting schedules an auditor will ask to see.",
      },
      {
        q: "Do you handle Section 263A and book-tax differences?",
        a: "Yes. We maintain UNICAP schedules through the year and track the resulting book-tax differences continuously, so the calculation is not being reconstructed under deadline pressure in March.",
      },
      {
        q: "Can you produce plant-level and consolidated reporting?",
        a: "Yes. We prepare P&L by plant or cost centre alongside a consolidated group view, with intercompany transactions eliminated and variances analysed against standard.",
      },
      {
        q: "Do you support manufacturing sales tax exemptions?",
        a: "Yes. Manufacturing exemption rules vary substantially by state, and we track exemption certificates and apply the correct treatment per jurisdiction as part of multi-state sales and use tax compliance.",
      },
    ],
    image: "/assets/industries/manufacturing.webp",
    imageHd: "/assets/industries/manufacturing-hd.webp",
    icon: "Factory",
    meta: {
      title: "Manufacturing Accounting Outsourcing — ADAS Globus",
      description:
        "Standard costing, ASC 330 inventory valuation, Section 263A schedules, multi-plant P&L and multi-state compliance for U.S. manufacturers.",
    },
  },

  {
    slug: "it-software-tech-services",
    name: "IT / Software / Tech Services",
    heading: "Technology, SaaS & IT Services",
    summary:
      "ASC 606 revenue recognition, equity compensation and multi-entity reporting for technology businesses.",
    intro: [
      "Technology companies — early-stage SaaS, mid-market IT services firms, or multinational software groups — operate in a financial environment defined by technically demanding revenue recognition, complex equity structures, multi-state tax exposure, and growth that consistently outpaces internal finance capacity.",
      "ASC 606 is where most of the difficulty concentrates. A SaaS contract bundling a subscription, an implementation service and a discounted first year has to be decomposed into performance obligations, allocated across them on standalone selling price, and recognised on a pattern that matches transfer of control. Add usage-based pricing, mid-term upgrades and multi-year prepayments and the deferred revenue waterfall becomes the single most-examined schedule in the file.",
      "Then there is nexus. Economic nexus thresholds now capture SaaS businesses that have never had an employee or an office in the states taxing them, and around twenty states treat SaaS as taxable — with definitions that differ from each other. A company can accumulate registration and filing obligations across a dozen states without noticing.",
      "Our technology practice brings current working knowledge of exactly these areas, giving CPA firms and finance teams the offshore capacity to manage them properly rather than approximately.",
    ],
    challenges: [
      {
        title: "ASC 606 allocation on bundled contracts",
        body: "Subscription, implementation and support obligations each need identifying, valuing at standalone selling price, and recognising on their own pattern. Recognising the invoice instead of the obligation is the most common error we correct.",
      },
      {
        title: "Deferred revenue that will not reconcile",
        body: "Mid-term upgrades, prorations, credits and multi-year prepayments break a waterfall that was built for simple annual terms — and it is the first schedule a diligence team asks for.",
      },
      {
        title: "Economic nexus creeping across states",
        body: "SaaS is taxable in roughly twenty states, on definitions that differ. Thresholds are crossed silently, and the exposure compounds until someone reconstructs several years of filings.",
      },
      {
        title: "Stock compensation under ASC 718",
        body: "Options, RSUs and ESPPs each carry their own expense pattern, forfeiture estimation and disclosure requirements — and the cap table rarely reconciles to the accounting without work.",
      },
    ],
    scope: [
      "Revenue recognition under ASC 606 — subscriptions, licences, professional services and bundled arrangements",
      "Deferred revenue waterfall preparation and contract asset/liability reconciliation",
      "Multi-entity consolidation with intercompany elimination and minority interest",
      "Software development cost capitalisation under ASC 350-40 and R&D expense under ASC 730",
      "Stock-based compensation under ASC 718 — options, RSUs and ESPPs",
      "Section 174 R&D capitalisation and amortisation schedules",
      "Economic nexus analysis, state registration management and SaaS taxability determination",
      "Multi-currency reporting and functional currency determination",
      "Board and investor reporting packages — ARR, churn, burn, runway and cohort analysis",
      "Federal and state income tax compliance, including R&D credit substantiation",
    ],
    faqs: [
      {
        q: "Do you handle subscription revenue and ASC 606?",
        a: "Yes — performance obligation identification, standalone selling price allocation, deferred revenue waterfalls, contract assets and liabilities, and the disclosures that go with them. It is the most common reason technology clients engage us.",
      },
      {
        q: "Can you manage multi-state sales tax for a SaaS business?",
        a: "Yes. We run economic nexus analysis against each state's threshold, determine SaaS taxability per jurisdiction, manage registrations, and handle ongoing filings — including cleaning up periods where a threshold was crossed before anyone noticed.",
      },
      {
        q: "Do you support investor and board reporting?",
        a: "Yes. Monthly board packages, ARR and churn schedules, burn and runway analysis, cohort profitability and the diligence-ready financial statements a funding round will require.",
      },
      {
        q: "Can you handle Section 174 R&D capitalisation?",
        a: "Yes. We prepare the capitalisation and amortisation schedules, track the book-tax difference, and coordinate the substantiation your firm needs to support an R&D credit claim.",
      },
    ],
    image: "/assets/industries/it-software-tech-services.webp",
    imageHd: "/assets/industries/it-software-tech-services-hd.webp",
    icon: "Cpu",
    meta: {
      title: "SaaS & Technology Accounting Outsourcing — ADAS Globus",
      description:
        "ASC 606 revenue recognition, deferred revenue waterfalls, ASC 718 stock compensation, Section 174 and SaaS nexus analysis for U.S. technology companies.",
    },
  },

  {
    slug: "hospitality",
    name: "Hospitality",
    qualifier: "Hotels, Cafes, Service Apartments",
    heading: "Hospitality",
    summary:
      "Night audit reconciliation, departmental reporting and tip compliance for service-intensive operations.",
    intro: [
      "Hospitality generates high transaction volume across several revenue streams — rooms, food and beverage, ancillary services, events — each with its own cost structure, supplier relationships and tax treatment. Financial trouble in a hotel is rarely fraud. It is almost always inadequate cost visibility and reconciliation discipline compounding quietly over a few quarters.",
      "The reporting convention is its own discipline. The Uniform System of Accounts for the Lodging Industry (USALI) structures results by department, so rooms, F&B and other operated departments each carry their own revenue, direct cost and profit — which is what makes benchmarking against comparable properties possible and what an owner or lender expects to see.",
      "Payroll adds a second layer. Tipped-employee compliance under the FLSA — tip credits, tip pooling rules, overtime on the full minimum wage rather than the cash wage, and the Form 8027 large food and beverage establishment report — is one of the most frequently mishandled areas in the sector.",
      "Our hospitality practice gives hotel groups, serviced apartment operators and F&B businesses the reporting and compliance infrastructure to hold margin discipline across all of it.",
    ],
    challenges: [
      {
        title: "Night audit that never quite reconciles",
        body: "PMS, POS and the general ledger drift apart daily. Once several weeks accumulate, isolating whether the difference is timing, comps, or a missing settlement becomes a forensic exercise.",
      },
      {
        title: "Tip credit and overtime exposure",
        body: "Overtime for tipped staff is calculated on the full minimum wage, not the reduced cash wage — a rule that is misapplied often enough to be a standard audit finding.",
      },
      {
        title: "Departmental reporting owners can use",
        body: "Without USALI-structured departmental P&Ls, an owner cannot tell whether F&B is subsidising rooms or the other way round, and cannot benchmark against comparable properties.",
      },
      {
        title: "Occupancy and F&B tax across jurisdictions",
        body: "Occupancy tax is frequently levied at city and county level on top of state sales tax, with rules that differ property by property.",
      },
    ],
    scope: [
      "Daily revenue reporting, night audit reconciliation and revenue variance analysis",
      "PMS and POS to general ledger reconciliation across all revenue streams",
      "Guest ledger, city ledger and advance deposit management",
      "USALI-structured departmental profit and loss reporting",
      "Food and beverage cost analysis, gross margin reporting and waste monitoring",
      "Payroll for shift-based and tipped workforces, including tip credit and overtime compliance",
      "Form 8027 preparation for large food and beverage establishments",
      "Fixed asset accounting for property, plant, furniture, fixtures and equipment",
      "Accounts payable and supplier management for high-volume procurement",
      "Occupancy tax, sales tax on F&B, and service charge compliance",
      "Owner and investor reporting packages, including management fee calculations",
    ],
    faqs: [
      {
        q: "Can you integrate with our PMS and POS systems?",
        a: "Yes. We reconcile PMS and POS output to the general ledger daily, so revenue, settlements, comps and adjustments tie rather than accumulating into an unexplained variance.",
      },
      {
        q: "Do you handle tipped-employee payroll compliance?",
        a: "Yes — tip credit application, tip pooling arrangements, overtime calculated on the full minimum wage, and Form 8027 for large food and beverage establishments.",
      },
      {
        q: "Can you produce USALI departmental reporting?",
        a: "Yes. Departmental P&Ls structured to USALI, so rooms, F&B and other operated departments each carry their own revenue, direct cost and departmental profit for owner reporting and benchmarking.",
      },
      {
        q: "Can you track food and beverage cost ratios?",
        a: "Yes. Cost percentages by outlet and period, margin analysis, waste and variance reporting, and the trend view that shows where margin is actually leaking.",
      },
    ],
    image: "/assets/industries/hospitality.webp",
    imageHd: "/assets/industries/hospitality-hd.webp",
    icon: "Hotel",
    meta: {
      title: "Hospitality Accounting Outsourcing — ADAS Globus",
      description:
        "Night audit reconciliation, USALI departmental reporting, tipped payroll compliance and occupancy tax for U.S. hotels, F&B and serviced apartments.",
    },
  },

  {
    slug: "qsr-restaurants-food-chains",
    name: "QSR / Restaurants / Food Chains",
    heading: "QSR, Restaurant Chains & Food Service Groups",
    summary:
      "Location-level P&L, prime cost reporting and franchise compliance for multi-unit operators.",
    intro: [
      "Quick service and multi-unit restaurant operators work in a margin-compressed, operationally intensive environment where the gap between a profitable and a loss-making location usually comes down to food cost ratio, labour scheduling and waste — none of which are visible without timely, location-level reporting.",
      "Prime cost is the number the sector runs on: cost of goods plus total labour, as a percentage of sales, per location, every period. Well-run operators hold it near 60% and review it weekly rather than monthly, because by month end the period that went wrong is already over.",
      "Multi-unit structures add their own complexity. Franchise royalties and advertising fund contributions accrue on gross sales and have to reconcile to the franchisor's own statements. Where locations sit in different states, sales tax treatment of prepared food differs — and delivery platform transactions raise marketplace facilitator questions that are still settling.",
      "Our QSR practice delivers the location-level visibility and consolidated group reporting that operators and franchisees need to hold profitability at scale.",
    ],
    challenges: [
      {
        title: "Prime cost seen monthly instead of weekly",
        body: "By the time a monthly P&L shows food cost drifting, the period is closed. Weekly prime cost by location is what lets an operator correct it while it is still correctable.",
      },
      {
        title: "Third-party delivery reconciliation",
        body: "DoorDash, Uber Eats and Grubhub each net commissions, promotions, adjustments and refunds differently before remitting. Booking the deposit as revenue understates both sales and cost.",
      },
      {
        title: "Franchise royalty and ad fund accruals",
        body: "Royalties and advertising contributions accrue on gross sales and must reconcile to the franchisor's statements — a reconciliation that is often not performed until a dispute forces it.",
      },
      {
        title: "Multi-state prepared food tax",
        body: "Prepared food is taxed differently from grocery, differently again by state and locality, and marketplace facilitator rules shift who remits on delivery orders.",
      },
    ],
    scope: [
      "Location-level P&L preparation and consolidated group financial reporting",
      "Weekly prime cost reporting — food cost percentage and labour cost ratio by location",
      "Daily sales reconciliation and POS-to-accounting integration",
      "Third-party delivery platform reconciliation — commissions, promotions, adjustments and refunds",
      "Franchise royalty and advertising fund accrual, reconciliation and area developer reporting",
      "Inventory and wastage accounting with theoretical-to-actual variance analysis",
      "Accounts payable and supplier management, centralised or location-level",
      "Payroll processing for hourly and tipped staff across multiple locations",
      "Multi-state and local sales tax compliance for prepared food and delivery",
      "Franchise disclosure and lender reporting packages",
    ],
    faqs: [
      {
        q: "Can you manage multi-location accounting?",
        a: "Yes. Location-level P&Ls consolidated into a group view, with intercompany eliminated and locations comparable against each other on prime cost and the same key ratios.",
      },
      {
        q: "How do you help control food cost and waste?",
        a: "Weekly prime cost reporting by location, theoretical-versus-actual food cost variance, and waste tracking — so a drifting location is visible while the period is still open.",
      },
      {
        q: "Do you reconcile third-party delivery platforms?",
        a: "Yes. We reconcile gross sales to net deposits across DoorDash, Uber Eats and Grubhub, breaking out commissions, promotions, adjustments and refunds so both revenue and cost are stated correctly.",
      },
      {
        q: "Can you handle franchise reporting requirements?",
        a: "Yes — royalty and advertising fund accruals, reconciliation to franchisor statements, area developer reporting and the periodic financial reporting a franchise agreement requires.",
      },
    ],
    image: "/assets/industries/qsr-restaurants-food-chains.webp",
    imageHd: "/assets/industries/qsr-restaurants-food-chains-hd.webp",
    icon: "UtensilsCrossed",
    meta: {
      title: "Restaurant & QSR Accounting Outsourcing — ADAS Globus",
      description:
        "Location-level P&L, weekly prime cost reporting, delivery platform reconciliation, franchise royalty accounting and multi-state food tax for U.S. operators.",
    },
  },

  {
    slug: "e-commerce",
    name: "E-Commerce & D2C Brands",
    heading: "E-Commerce & Direct-to-Consumer Brands",
    summary:
      "Multi-channel reconciliation, landed cost tracking and sales tax nexus for digital commerce.",
    intro: [
      "E-commerce and D2C businesses operate across a financially complex ecosystem — several sales channels, multiple payment processors, marketplace platforms, third-party logistics providers, and a multi-state tax environment that has not stopped moving since Wayfair.",
      "The reconciliation problem is structural. A Shopify payout is net of processing fees, refunds, chargebacks and reserve holds. An Amazon settlement nets referral fees, FBA fulfilment fees, storage, returns processing and advertising. Booking the deposit as revenue understates gross sales and hides every cost netted out of it — which is exactly the cost base a contribution margin analysis depends on.",
      "Sales tax is the second structural issue. Economic nexus thresholds — commonly $100,000 in sales or 200 transactions — are crossed silently, and marketplace facilitator laws shift collection responsibility onto Amazon or Etsy for those channels while leaving the brand's own Shopify sales entirely its own responsibility. The result is a business collecting correctly on one channel and accruing exposure on another.",
      "Our e-commerce practice provides the reconciliation discipline and compliance governance that fast-growing digital commerce businesses need to scale without accumulating liabilities they will have to unwind later.",
    ],
    challenges: [
      {
        title: "Payouts booked as revenue",
        body: "Net deposits hide fees, refunds and chargebacks in a single line. Gross sales are understated, cost of sales is invisible, and unit economics cannot be calculated from the books.",
      },
      {
        title: "Nexus thresholds crossed silently",
        body: "Nothing tells a brand it has passed $100,000 in a state. Exposure accumulates quietly and surfaces during diligence or an audit, by which time several years need reconstructing.",
      },
      {
        title: "Marketplace facilitator confusion",
        body: "Amazon and Etsy collect and remit on their channels; the brand's own storefront remains its own responsibility. Assuming coverage across all channels is a common and expensive error.",
      },
      {
        title: "Landed cost and true COGS",
        body: "Freight, duty, tariffs and 3PL fees belong in inventory cost. Expensing them as incurred overstates margin on every SKU and misprices the catalogue.",
      },
    ],
    scope: [
      "Multi-channel revenue reconciliation — Shopify, Amazon Seller Central, WooCommerce, Etsy, Walmart",
      "Payment processor reconciliation — Stripe, PayPal, Shopify Payments, Square — gross to net",
      "Inventory accounting, COGS calculation and landed cost tracking including duty and freight",
      "Marketplace fee, referral fee, FBA and fulfilment cost accounting",
      "Returns, refunds, chargeback and reserve accounting",
      "Economic nexus monitoring, state registration management and multi-state filing",
      "Marketplace facilitator analysis by channel and jurisdiction",
      "Import duty, tariff and customs compliance for international sourcing",
      "Contribution margin, unit economics and SKU-level profitability reporting",
      "Cohort analysis, CAC and LTV reporting for investor and lender packages",
    ],
    faqs: [
      {
        q: "Can you reconcile marketplace and processor payouts?",
        a: "Yes — gross sales down to net deposit across Shopify, Amazon, Stripe, PayPal and the rest, with fees, refunds, chargebacks and reserves broken out so revenue and cost are both stated properly.",
      },
      {
        q: "How do you handle sales tax nexus?",
        a: "We monitor sales and transaction counts against each state's economic nexus threshold, flag jurisdictions before they are crossed, manage registrations, and determine where marketplace facilitator rules already cover you and where they do not.",
      },
      {
        q: "Can you calculate true landed cost per SKU?",
        a: "Yes. Product cost, inbound freight, duty, tariffs and 3PL fees allocated into inventory cost, so COGS and contribution margin per SKU reflect what the goods actually cost to land.",
      },
      {
        q: "Do you support investor and lender reporting?",
        a: "Yes — contribution margin by channel and SKU, cohort analysis, CAC and LTV, inventory turns and the diligence-ready statements a raise or credit facility will require.",
      },
    ],
    image: "/assets/industries/e-commerce.webp",
    imageHd: "/assets/industries/e-commerce-hd.webp",
    icon: "ShoppingCart",
    meta: {
      title: "E-Commerce & D2C Accounting Outsourcing — ADAS Globus",
      description:
        "Multi-channel reconciliation, marketplace fee accounting, landed cost tracking, economic nexus monitoring and unit economics reporting for U.S. D2C brands.",
    },
  },
];

export const industrySlugs = industries.map((i) => i.slug);

export function getIndustry(slug: string) {
  return industries.find((i) => i.slug === slug);
}

/** The industries index intro. */
export const industriesIntro = {
  heading: "Industries We Serve",
  subheading: "Sector Expertise, Not a Standardised Chart of Accounts",
  body: "Applying one accounting framework across fundamentally different business models produces adequate bookkeeping and inadequate insight. A SaaS company allocating bundled contracts under ASC 606 needs different expertise than a multi-unit restaurant operator holding prime cost to 60% — and both need professionals who understand the operational context driving the numbers, not just the accounting treatment.",
};
