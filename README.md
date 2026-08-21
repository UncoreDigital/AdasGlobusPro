# ADAS Globus

Marketing site + admin portal for **ADAS Globus (U.S.)** — offshore accounting capacity for American CPA firms and finance teams.

## Read this first

**This is the U.S. site. It is not a replacement for adasglobus.com.**

The existing site stays live and keeps its global (US/UK/CA/AU/UAE) positioning.
This is a separate, U.S.-only property: every standard, form number, deadline and
time zone on it is American, and content that would only matter to a UK or
Australian reader has been removed rather than translated.

Three consequences worth knowing before you edit anything:

1. **Do not reintroduce multi-jurisdiction claims.** "US GAAP, IFRS, UK FRS 102 and
   Australian AAS" is the global site's line, not this one's.
2. **The copy is rewritten, not reused.** Two live sites carrying identical
   paragraphs on different domains is how one gets treated as a duplicate. The
   overlap with adasglobus.com is deliberately low.
3. **The legacy `.php` redirects are switched off.** The old site still serves
   those URLs itself. The map is kept in `next.config.mjs` for the day the two
   properties merge — see the note there.

### 🚩 Launch blocker

`NEXT_PUBLIC_SITE_URL` is a placeholder (`https://us.adasglobus.com`). The real
address is not decided. It must be set in the deploy environment before go-live —
two sites cannot both claim adasglobus.com as canonical without one being dropped
from the index in the other's favour.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 14 (App Router) |
| Styling | Tailwind CSS + CSS custom properties |
| Animation | framer-motion, variants centralised in [`lib/motion.ts`](lib/motion.ts) |
| Scrolling | Lenis momentum smoothing ([`SmoothScroll.tsx`](components/SmoothScroll.tsx)) |
| Database / Auth / Storage | Supabase |
| Rich text | TipTap |
| Validation | Zod |

Marketing pages are static / ISR (300s). `/admin/*` is a client-rendered island behind Supabase Auth, `noindex`.

---

## Getting started

```bash
npm install
cp .env.example .env.local     # then fill in the values
npm run dev                    # http://localhost:3000
```

The site runs without Supabase — the contact form returns a "not configured" message, the admin shows a setup panel, and every headline figure falls back to the value published on the live site (see [`lib/settings.ts`](lib/settings.ts)).

### Supabase setup

1. Create a Supabase project.
2. Copy the project URL and anon key into `.env.local`.
3. Open **Dashboard → SQL Editor → New query** and run
   [`0001_init.sql`](supabase/migrations/0001_init.sql), then
   [`0002_seed_insights.sql`](supabase/migrations/0002_seed_insights.sql).
   The second seeds four blog posts **as drafts** — read them, adjust anything
   that does not sound like the firm, and publish from `/admin/posts`.
4. Create the admin user under **Authentication → Users → Add user** (email + password).
   There is no public sign-up — that screen is the only way to get an admin account.
5. Sign in at `/admin/login`.

### Scripts

```bash
npm run dev         # dev server
npm run build       # production build
npm run start       # serve the production build
npm run typecheck   # tsc --noEmit
npm run lint        # next lint
```

---

## Project structure

```
app/
  (marketing)/                 static/ISR public site — TopBar + Header + Footer
    page.tsx                   home
    about/                     "Who We Are"
    services/                  "Our Expertise" index
    services/[slug]/           the five service lines
    industries/                "Industries We Serve" index
    industries/[slug]/         the five verticals
    technology-and-security/
    faqs/
    team/                      leadership, bench depth, review layers
    contact/                   "Schedule a Call"
    blog/ · blog/[slug]/       Insights, from Supabase
    privacy-policy/            DRAFT — pending legal review
  admin/
    login/                     unauthenticated
    (dashboard)/               guarded route group → AdminShell
      page.tsx                 dashboard
      leads/ posts/ posts/[id]/ settings/
  api/contact/                 validate + insert lead
  sitemap.ts robots.ts not-found.tsx globals.css

components/                    shared UI; components/sections/* compose pages
  brand/Logo.tsx               the lockup — see "Logo" below
  admin/                       the portal
lib/
  site.ts                      brand, offices, markets, navigation, feature flags
  services-data.ts             the 5 service lines      ← from adasglobus.com
  industries-data.ts           the 5 verticals + FAQs   ← from adasglobus.com
  content.ts                   home, about, technology, FAQs, USPs, testimonials
  motion.ts                    shared Framer Motion variants
  settings.ts posts.ts         Supabase-backed reads
  supabase/                    browser + server clients, types
middleware.ts                  session refresh + /admin guard
supabase/migrations/
  0001_init.sql              schema, RLS, storage
  0002_seed_insights.sql     four launch-ready posts, seeded as DRAFT
docs/IMAGE-BRIEF.md          what images exist, what is missing, prompts to generate them
```

### Where content lives

Service and industry content is transcribed from adasglobus.com into
`lib/services-data.ts` and `lib/industries-data.ts`. **Those files are the source
of truth** — edit them, not the page components. The nav, the footer columns, the
detail pages and the sitemap all render from them, so a service cannot exist
without appearing in the navigation and cannot drift from the page describing it.

Fields the old site did not have (card `summary` lines, the `outcomes` chips) are
marked `NEW` in those files so the client can review only what was written fresh.

### Admin → Site Settings, and where it surfaces

| Setting | Renders in |
|---|---|
| Clients / Accuracy | Homepage hero proof card |
| Clients / Countries | "Around the Clock. Around the Globe" band |
| Countries / Employees | Homepage about teaser, `/about` fact strip |
| Projects, Transactions, Experience | `/about` fact strip |
| Primary phone | Footer |

Read via [`lib/settings.ts`](lib/settings.ts). The marketing tree revalidates every
300s, so an edit appears within five minutes without a rebuild.

Values are stored and rendered as **text**, never coerced to numbers. Leave a
figure empty and the site renders an em dash; type `TBC` and it is echoed back
verbatim. `Number("")` is `0`, and a site advertising "0+ clients served" is the
failure this design exists to prevent.

---

## Logo

The client supplied a rebranded mark in August 2026. It replaces the previous
navy / royal-blue / gold lockup entirely, and the differences are structural
rather than cosmetic:

| | 2025 mark | 2026 mark |
|---|---|---|
| Monogram | AGP wrapped around a 3D globe | flat, geometric A G P |
| Palette | navy, royal blue, **gold** | teal → cyan → blue → navy, **no gold** |
| Rule | PARTNER · INNOVATE · GROW | FINANCE · TALENT · GROWTH |
| Partnership bar | "in collaboration with POS Accounts" | none |

⚠️ **The first delivery of the new mark misspelled the wordmark as "ADAS
GLOBOUS PRO".** It was replaced by `docs/Updated loog.jpeg`, which is the file
the build uses. If a future revision arrives, check that spelling before
anything else.

[`scripts/build-logo-assets.js`](scripts/build-logo-assets.js) derives three
crops into `public/assets`, each in an opaque and an alpha version.

The alpha cut is now a **global white key**, not the flood fill the old mark
needed. That is a deliberate change: the 2025 globe had white landmasses
*enclosed* inside the mark, so keying every white pixel punched holes through
the continents and a border flood fill was the only safe approach. The 2026 mark
has no white interior elements — the A's inner triangle is navy ink, and the P's
counter is background that *should* be transparent, which a flood fill cannot
reach. If a future revision introduces a genuinely white-filled shape inside the
mark, this has to go back to a flood fill.

**The header and footer do not use the artwork.** At the ~40px a header allows
the stacked wordmark is illegible, and on navy the wordmark and rule disappear
because they are navy ink. [`components/brand/Logo.tsx`](components/brand/Logo.tsx)
composes a horizontal lockup instead: the AGP monogram beside the wordmark as
live text. The full artwork still appears at poster scale, on the OG card.

### Assets

```bash
node scripts/build-logo-assets.js    # source: public/assets/logo-master.jpeg
node scripts/build-photo-assets.js   # source: assets-src/
```

Outputs are committed, so these only need running when new artwork arrives.

| File | Use |
|---|---|
| `logo.png` / `logo-alpha.png` | full lockup incl. ruled tagline |
| `logo-compact.png` / `-alpha` | monogram + wordmark |
| `logo-mark-alpha.png` | AGP monogram — header, footer, admin, favicons |
| `og.jpg` | 1200×630 social card, photo + composited lockup |

---

## Design system

Palette sampled from the mark by pixel clustering — the full derivation, with
hex and HSL for every stop, is at the top of
[`app/globals.css`](app/globals.css).

The monogram is one left-to-right gradient across three flat letterforms, and
the tokens follow it:

- **Navy** `hsl(215 88% 13%)` — the wordmark, the A's inner triangle, every dark band
- **Teal** `hsl(188 99% 26%)` — the A. Text-safe on white at 5.6:1
- **Blue** `hsl(206 99% 33%)` — the G and P. The primary: links, focus, active states
- **Cyan** `hsl(185 96% 37%)` — **the accent.** Primary CTAs and emphasis only
- **Emerald** — *not* a brand colour. Verified / secure / success states only

### Two things that will trip you up

**There is no gold.** The token family is called `accent`, not `gold` or
`cyan` — named for the role ("the colour that owns conversion") so the next
rebrand is a token change rather than another site-wide find-and-replace. The
CTA keeps the *pattern* gold had, a high-luminance fill with a navy label,
because that pattern is what made it readable, not the hue.

**There are two accent text gradients.** `.text-gradient-accent` is tuned for
text on white and sits at 24–33% lightness; on a navy band it drops to roughly
2:1 and is unreadable. Dark surfaces use `.text-gradient-accent-on-dark`.
`SectionHeading` picks the right one from its `onDark` prop; hand-written
headings on dark bands have to choose deliberately.

Every foreground/background pair in the palette was measured against WCAG, not
eyeballed — the ratios quoted in the CSS comments are real figures.

### Motion

The globe is gone, so the orbit-ring motif went with it. Dark bands now use
`.bg-chevrons` and the `drift` / `breathe` animations: angled plates cut to
the A's own slope, travelling along the same diagonal. Nothing rotates, because
nothing in the mark does.

---

## Things a reviewer should know

- **ISO 27001 is described as "aligned", never "certified"**, because that is
  what the client publishes. Upgrading that word is a compliance
  misrepresentation, not a copy improvement. The same applies to SOC 2 — we
  support clients' SOC 2 work, we do not claim to hold a report.
- **ADAS Globus is not a CPA firm.** The scope-of-practice boundary is in
  `lib/content.ts` as `boundary` and renders on every service page and on
  `/about`. Copy must never imply we sign, file or issue opinions.
- **`/privacy-policy` is a draft pending legal review.** It accurately describes
  what the site does with submitted data but has not been checked by counsel.
  The page says so on its face.
- **Testimonials are attributed by role, not by name** — that is how the client
  published them. They are reproduced verbatim and must not be reworded to fit
  the U.S. framing; an edited testimonial is not a testimonial.
- **Country markers are two-letter codes, not flag emoji.** Windows ships no
  flag glyphs, so regional-indicator pairs fall back to bare letters, and this
  audience is overwhelmingly Windows. See
  [`components/CountryCode.tsx`](components/CountryCode.tsx).
- **Software platforms are set as wordmarks, not vendor logos.** Reproducing
  Intuit / Xero / Sage / Thomson Reuters brand assets is a trademark question
  the client has not cleared. BGL and Reckon were dropped from the global
  site's list — both are Australian products with no meaningful U.S. install base.
- **The tagline changed with the rebrand.** It is now FINANCE · TALENT ·
  GROWTH. Anything still quoting "Partner. Innovate. Grow." is out of date.
- **Two figures on `/team` are assumptions.** The bench-composition split is
  marked `CLIENT TO CONFIRM` in `lib/content.ts`; every other number on the
  site is the client's own.

## Images

Sixteen images were imported from adasglobus.com and converted to WebP
(3.95 MB → 0.21 MB), including the three real leadership headshots, which are
the only photography on the old site that could not be replaced.

The sector and service photographs are **418×536 natively**, so they are used as
card headers and sidebar panels and never stretched full-bleed.

[`docs/IMAGE-BRIEF.md`](docs/IMAGE-BRIEF.md) lists what is still missing, where
each file goes, and a ready-to-paste generation prompt for each — written for
ChatGPT or Gemini, with the brand palette and a no-text-in-image rule baked in.


## Feature flags

[`lib/site.ts`](lib/site.ts) carries `features`. Off means genuinely
unreachable — the routes 404 — not merely unlinked, so there is no URL to guess.
Nothing is deleted; flipping a flag restores the feature exactly as it was.

| Flag | Default | Covers |
|---|---|---|
| `insights` | on | `/blog`, `/blog/[slug]`, the nav link, the admin editor |
| `clientPortal` | off | secure document exchange |
| `newsletter` | off | footer signup |

---

## Redirects from the old site

The previous site used `.php` URLs. These are already shipped as permanent (308) redirects in
[`next.config.mjs`](next.config.mjs), so inbound links and existing rankings
survive the cutover:

| Old | New |
|---|---|
| `/index.php` | `/` |
| `/about.php` | `/about` |
| `/our-services.php` | `/services` |
| `/dynamic-solutions-suite.php` | `/services/dynamic-solutions-suite` |
| `/elite-accounting-solutions.php` | `/services/elite-accounting-solutions` |
| `/spectrum-of-taxes.php` | `/services/spectrum-of-taxes` |
| `/audit-excellence.php` | `/services/audit-excellence` |
| `/professional-hiring.php` | `/services/professional-hiring` |
| `/industries-we-serve.php` | `/industries` |
| `/manufacturing.php` | `/industries/manufacturing` |
| `/it-software-tech-services.php` | `/industries/it-software-tech-services` |
| `/hospitality.php` | `/industries/hospitality` |
| `/qsr-restaurants-food-chains.php` | `/industries/qsr-restaurants-food-chains` |
| `/e-commerce.php` | `/industries/e-commerce` |
| `/technology-and-security.php` | `/technology-and-security` |
| `/faqs.php` | `/faqs` |
| `/contact.php` | `/contact` |
| `/book-meeting.php` | `/contact` |

---

Built by [Uncore Digital](https://uncoredigital.com/).
