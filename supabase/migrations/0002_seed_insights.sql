-- ============================================================================
-- ADAS Globus — Insights seed content
-- Run after 0001_init.sql.
--
-- Four launch-ready posts, so the blog does not go live empty. An Insights
-- section with nothing in it is worse than no Insights section: it signals an
-- abandoned property to a visitor and gives search engines a thin page to index.
--
-- All four are seeded as DRAFT on purpose. The client should read them, adjust
-- anything that does not sound like the firm, and publish from /admin/posts.
-- Nothing here is visible on the public site until someone hits Publish.
--
-- Topic selection is deliberate: each maps to a service line or an industry
-- page and answers a question a U.S. CPA firm actually searches for, so the
-- posts pull traffic toward a commercial page rather than sitting in isolation.
--
-- Bodies are HTML because the TipTap editor round-trips HTML. They use only
-- the tags .prose-adas styles in app/globals.css — h2, h3, p, ul, ol, strong,
-- blockquote. Do not paste in tags the public page has no design for.
--
-- Dollar-quoted ($post$) rather than single-quoted, so apostrophes inside the
-- copy do not need doubling and cannot silently truncate a post mid-sentence.
-- ============================================================================

insert into public.posts
  (slug, title, excerpt, category, author, meta_title, meta_description, status, content)
values

-- ---------------------------------------------------------------------------
(
  'busy-season-readiness-checklist',
  'The Work That Should Happen Before January, Not During It',
  'Most busy-season pain is created in the autumn, when there is still time to prevent it. Here is what to fix between October and December.',
  'Practice Growth',
  'ADAS Globus',
  'Busy Season Readiness: A Q4 Checklist for CPA Firms',
  'The preparation work that decides how January through April actually goes — organiser chase, prior-year cleanup, capacity planning and template calibration.',
  'draft',
  $post$
<p>Every firm knows busy season is coming. Very few use the twelve weeks before it in a way that changes how it goes. By the time returns are arriving, the decisions that determine whether the season is manageable have already been made — or not made.</p>

<h2>The pattern most firms repeat</h2>

<p>Organisers go out in January. Clients respond through February. Preparation compresses into March. Reviewers become preparers somewhere around the 20th, and the work that was supposed to differentiate the firm — planning conversations, advisory work, anything billed at partner rates — gets pushed to the extension pile.</p>

<p>None of that is caused by January. It is caused by what did not happen in October.</p>

<h2>What to fix between October and December</h2>

<h3>1. Send organisers before the holidays, not after</h3>

<p>A client who receives an organiser in mid-November has six weeks of low-pressure time to gather documents. The same client receiving it on January 8 responds in February, because everyone else is asking them for things too. Moving the send date is the single cheapest intervention available, and it shifts a meaningful share of the workload out of the peak.</p>

<h3>2. Clean up prior-year books now</h3>

<p>Every return prepared from unreconciled books costs two to three times what it should, because the preparer stops to fix bookkeeping before they can start on tax. Identify the clients whose books you already know are a problem, and deal with them in the autumn when there is capacity to do it properly.</p>

<h3>3. Decide what you are not doing</h3>

<p>Firms rarely plan capacity; they discover it. Look at last season honestly: which returns lost money, which clients absorbed disproportionate partner time, and which work you took because saying no felt awkward. Deciding in October is a business decision. Deciding in March is triage.</p>

<h3>4. Calibrate any new capacity before it is needed</h3>

<p>This applies to a new hire, a seasonal contractor or an offshore team equally. Someone who learns your templates, your file structure and your review expectations in November is productive in week one of January. Someone who starts learning them in January is a net cost until roughly the point the season ends.</p>

<blockquote>The measure of readiness is not whether you have enough capacity. It is whether the capacity you have already knows how you work.</blockquote>

<h2>The arithmetic nobody likes</h2>

<p>Between the January 31 information-return deadline and April 15, a typical practice needs close to double the preparer capacity it can justify carrying for the rest of the year. There are only three ways to resolve that: hire for the peak and absorb the cost through the trough, decline work, or add capacity that scales in and back out.</p>

<p>Most firms do the second one without ever deciding to — they simply stop taking on clients around February. That is a strategy, but it should be a chosen one.</p>

<h2>A short checklist</h2>

<ul>
  <li>Organisers out before mid-December</li>
  <li>Problem-client bookkeeping cleaned up in Q4</li>
  <li>Client list reviewed for realised profitability, not billings</li>
  <li>Filing calendar built back from March 17 and April 15, not forward from January</li>
  <li>Any additional capacity onboarded and calibrated before January 1</li>
  <li>Review protocol written down, so a new preparer can meet it without asking</li>
</ul>

<p>None of this is difficult. It is simply work that has no deadline attached, which is why it does not happen.</p>
$post$
),

-- ---------------------------------------------------------------------------
(
  'offshore-staffing-and-client-confidentiality',
  'Offshore Support and Client Confidentiality: What Actually Applies',
  'The compliance question partners ask first, answered plainly — what the AICPA rules require, what disclosure looks like in practice, and what to ask a provider.',
  'Tax & Compliance',
  'ADAS Globus',
  'Offshore Accounting and AICPA Client Confidentiality Rules',
  'What U.S. CPA firms need to consider on confidentiality, client disclosure and due diligence before engaging an offshore accounting provider.',
  'draft',
  $post$
<p>Whenever a partner considers offshore support, the same question arrives before any question about price or quality: <strong>are we allowed to do this?</strong></p>

<p>The short answer is yes, and firms have done it for two decades. The useful answer is that there are specific obligations attached, and they are worth understanding properly rather than delegating to a provider's reassurance.</p>

<p><em>What follows is general information, not legal advice. Your firm's own compliance counsel and your state board's rules govern.</em></p>

<h2>The obligations that actually apply</h2>

<h3>Client confidentiality</h3>

<p>AICPA professional standards restrict disclosing confidential client information to third parties without the client's consent. An outsourcing provider is a third party. Most firms address this through their engagement letter — a clause disclosing that the firm may use third-party service providers, and that it remains responsible for the confidentiality of the information — rather than seeking case-by-case consent.</p>

<h3>Responsibility does not transfer</h3>

<p>This is the part providers tend to skip. Engaging an outsourcing provider does not move professional responsibility anywhere. The firm remains responsible for the work, for supervising it, and for the confidentiality of what it hands over. A provider who implies otherwise is telling you something that is not true.</p>

<h3>Due diligence on the provider</h3>

<p>Because responsibility stays with the firm, the firm is expected to have satisfied itself that the provider can meet the standard. In practice that means asking — and documenting the answers to — a specific set of questions.</p>

<h2>What to ask before engaging anyone</h2>

<ol>
  <li><strong>Where does our client data physically sit?</strong> The right answer is inside your systems or an approved cloud environment. Copies on local machines in another country are a different risk profile entirely.</li>
  <li><strong>Who specifically can access it?</strong> Named individuals provisioned per engagement, or a general team login? Least privilege, or convenience?</li>
  <li><strong>What happens on exit?</strong> When someone leaves the provider or moves off your engagement, when is access revoked, and who checks?</li>
  <li><strong>Are confidentiality agreements individual?</strong> An organisation-level NDA is table stakes. Individually signed agreements by the people actually touching the work is the meaningful control.</li>
  <li><strong>What is the security framework, precisely?</strong> Be alert to the difference between "ISO 27001 certified" and "ISO 27001 aligned". Both can be legitimate; only one has been audited by a certification body. A provider who blurs that distinction is telling you how they will handle the next ambiguity.</li>
  <li><strong>Can you support our peer review?</strong> If your reviewer asks about the arrangement, can the provider give you documentation on controls, access and confidentiality — or does it become your problem to reconstruct?</li>
</ol>

<h2>What good looks like in practice</h2>

<p>A well-run arrangement is unremarkable from the outside. Work happens inside your software. No data leaves your environment. Access is provisioned per person and revoked on exit. Every individual involved has signed a confidentiality agreement. The provider can produce documentation when your compliance review asks for it, without a scramble.</p>

<blockquote>If a provider cannot answer the six questions above in a first call, that is the answer.</blockquote>

<h2>The disclosure conversation</h2>

<p>Firms often expect this to be difficult with clients. In practice it rarely is, provided it happens up front rather than emerging later. Clients generally care about two things: that their information is protected, and that the firm they hired is still the firm doing the thinking. Both are true in a properly structured arrangement, and saying so plainly is more persuasive than avoiding the subject.</p>
$post$
),

-- ---------------------------------------------------------------------------
(
  'economic-nexus-saas-clients',
  'Your SaaS Client Probably Owes Sales Tax in States They Have Never Visited',
  'Economic nexus caught up with software years ago. Most growing SaaS businesses have crossed thresholds nobody has checked — and the exposure compounds quietly.',
  'Tax & Compliance',
  'ADAS Globus',
  'Economic Nexus for SaaS: A Guide for CPA Firms',
  'How economic nexus thresholds and SaaS taxability rules create silent multi-state sales tax exposure for growing software clients, and how to find it.',
  'draft',
  $post$
<p>Ask a founder of a growing SaaS business which states they have sales tax obligations in, and the usual answer is the state they are incorporated in. Ask which states their customers are in, and the answer is usually "everywhere".</p>

<p>Those two answers are frequently inconsistent, and the gap between them is a liability that grows every month nobody looks at it.</p>

<h2>Two rules interacting badly</h2>

<h3>Economic nexus</h3>

<p>Since <em>South Dakota v. Wayfair</em> (2018), states may require sales tax collection based on economic activity alone — no office, no employees, no physical presence of any kind. Thresholds commonly sit around $100,000 in sales or 200 separate transactions into the state, though both the amounts and the measurement periods vary.</p>

<p>Nothing notifies a business when it crosses one. There is no letter. The obligation simply begins.</p>

<h3>SaaS taxability</h3>

<p>Separately, states differ on whether software delivered as a service is taxable at all. Roughly twenty tax it. Others do not. Several tax it only in specific circumstances, and the definitions are not consistent with each other — one state's "software as a service" is another's "information service" with different treatment.</p>

<p>The combination is what causes trouble: a business can have nexus in a state where its product is not taxable, no nexus in a state where it would be, and both situations changing as it grows.</p>

<h2>Why it stays hidden</h2>

<p>A 200-transaction threshold is easy to cross with a low-priced product. A business selling a $40/month subscription reaches 200 transactions in a state with roughly seventeen customers there — well before the revenue figure looks like it warrants attention.</p>

<p>Meanwhile the accounting rarely surfaces it. Revenue is usually tracked by product or plan, not by ship-to state. Unless someone deliberately builds a state-by-state view, the data required to notice simply is not being looked at.</p>

<h2>The marketplace facilitator complication</h2>

<p>If a client sells through a marketplace, facilitator laws may put collection responsibility on the platform for those transactions. This is genuinely helpful, and it is also where a specific error recurs: a business sees tax being collected on marketplace sales, concludes it is covered, and continues selling through its own site with no collection at all.</p>

<p>Direct sales are always the seller's own responsibility. Channel-level analysis is required, not a single conclusion for the whole business.</p>

<h2>How to find the exposure</h2>

<ol>
  <li><strong>Build the state-by-state view.</strong> Sales and transaction counts by ship-to state, by month, for the last three years. Everything else depends on having this.</li>
  <li><strong>Compare against each threshold.</strong> Thresholds and measurement periods differ by state; a single number applied everywhere will be wrong somewhere.</li>
  <li><strong>Determine taxability per state.</strong> Nexus without taxability creates no collection obligation — though a registration or filing requirement may still exist.</li>
  <li><strong>Separate channels.</strong> Establish where facilitator laws already cover the client and where they do not.</li>
  <li><strong>Quantify before deciding.</strong> Size the exposure per state, then weigh registration, voluntary disclosure agreements and prospective-only registration with the client.</li>
</ol>

<h2>The conversation to have now</h2>

<p>Exposure discovered during a funding round or an acquisition is expensive twice: once to remediate, and again in the diligence discount it attracts. Found early, most of it is manageable — voluntary disclosure programmes exist in most states, and they typically limit the look-back period and abate penalties.</p>

<blockquote>The cost of finding this in year two is an afternoon of analysis. The cost of finding it in year five is a line item in someone else's diligence report.</blockquote>
$post$
),

-- ---------------------------------------------------------------------------
(
  'prime-cost-restaurant-clients',
  'Prime Cost: The Number Multi-Unit Restaurant Clients Should See Every Week',
  'A monthly P&L tells a restaurant operator what went wrong after it is too late to fix. Weekly prime cost by location tells them while it still matters.',
  'Insights',
  'ADAS Globus',
  'Weekly Prime Cost Reporting for Restaurant and QSR Clients',
  'Why prime cost is the operating metric multi-unit restaurant clients need weekly, how to calculate it by location, and what the ratio should be.',
  'draft',
  $post$
<p>A restaurant client receives their January P&L in the third week of February. It shows food cost ran four points high. By then it is not information — it is history. The month is closed, the food is eaten, and whatever caused it has had six more weeks to continue.</p>

<p>This is the reporting problem in food service, and it is not solved by closing faster. It is solved by reporting a different number, more often.</p>

<h2>What prime cost is</h2>

<p>Prime cost is cost of goods sold plus total labour, expressed as a percentage of sales. Both components together, because they trade against each other: cutting labour to protect margin usually increases waste and portioning error, which shows up in food cost. Watching either one alone hides the trade.</p>

<p>Well-run full-service operations typically target somewhere around 60–65%. Quick service, with lower labour intensity, often runs lower. The absolute number matters less than the trend and the variance between locations running the same concept.</p>

<h2>Why weekly changes the outcome</h2>

<p>Monthly reporting has a structural flaw for this sector: by publication, the operator can no longer act on what it says. Weekly reporting turns the same data into something an operator can respond to — reset par levels, adjust the schedule, retrain on portioning, investigate a location that has diverged from its peers.</p>

<p>It does not need to be perfect to be useful. A weekly prime cost with estimated inventory and actual labour, delivered on Tuesday, is worth considerably more than a precise figure delivered a month later.</p>

<h2>Calculating it by location</h2>

<ol>
  <li><strong>Sales by location, by week.</strong> From the POS, net of comps and discounts, with third-party delivery separated — the margin profile there is different and blending it distorts everything.</li>
  <li><strong>Cost of goods by location.</strong> Opening inventory plus purchases minus closing inventory. Weekly counts on high-value categories are usually enough; full counts can stay monthly.</li>
  <li><strong>Total labour by location.</strong> Wages, payroll taxes and benefits — not just the wage line. Excluding the burden understates prime cost by several points and makes every location look better than it is.</li>
  <li><strong>Express as a percentage and compare.</strong> Against last week, against the same week last year, and — most usefully — against the other locations running the same concept.</li>
</ol>

<h2>What the variance tells you</h2>

<p>Two locations, same concept, same menu, same suppliers. One runs prime cost at 61%, the other at 67%. That six-point gap is not a mystery to be pondered; it is a specific operational difference, and there are only so many candidates: portioning discipline, waste, scheduling against demand, or shrinkage.</p>

<p>Without location-level reporting, that gap is invisible — the consolidated number sits at a perfectly reasonable 64% and nobody asks a question.</p>

<blockquote>Consolidated reporting tells an operator how the group is doing. Location-level reporting tells them what to do on Monday.</blockquote>

<h2>The delivery platform footnote</h2>

<p>Third-party delivery deserves separate treatment in any prime cost view. Commissions of 15–30% mean a delivery dollar and a dine-in dollar have materially different economics, and a location shifting toward delivery will show deteriorating margin that has nothing to do with how it is being run. Blending the two channels produces a number that moves for reasons nobody can explain.</p>

<h2>Where the accounting fits</h2>

<p>None of this requires new systems. It requires the POS, purchase and payroll data to be assembled into the same weekly view, consistently, by someone whose job it is — which is exactly the kind of recurring, deadline-bound reporting work that suits a dedicated offshore team. The operator gets a number they can act on every Tuesday, and the firm gets a client conversation about operations rather than about bookkeeping.</p>
$post$
)

on conflict (slug) do nothing;
