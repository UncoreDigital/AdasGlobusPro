# Image brief: ADAS Globus Pro (U.S. and Canada site)

## October 2026: replace the AI images with real photographs

On the 17 October call the client said the site looks AI-made and asked for
real photos: **New York / Manhattan** for the U.S. side and **Canadian cities**
for the Canadian side. The hero, team, busy-season, service and industry images
are AI-generated (the about-page photo came from the client's old site), so this
list replaces the generation prompts further down. Those prompts are kept for reference only. Do not generate new images.

### Rules

- **Real photographs only.** Our own shoot, the client's own photos, or licensed
  stock (Unsplash/Pexels licence, or paid stock such as Adobe Stock or
  Shutterstock). No AI-generated, AI-extended or AI-upscaled images.
- **Real people where we can.** The client has a real office in Ahmedabad; a
  photo of the actual team at work beats any stock shot for credibility.
- **No legible text or logos** in frame (screens, signage, documents).
- **Landscape 3:2, at least 2400 px wide**, unless the row says otherwise.
  Send the original; the build script crops, resizes and converts to WebP.
- **A cool navy grade is fine** to keep the set consistent, but keep it
  natural. Heavy blue tinting is part of what reads as AI now.

### Shot list, in priority order

| # | Slot (file) | Where it shows | Subject | Notes |
|---|---|---|---|---|
| 1 | `photos/hero-us` | Homepage hero, full width | **Manhattan** skyline at dusk, ideally seen from inside an office | Headline sits over the **left ~45%** of the frame, so keep that side dark and quiet; subject and light on the right |
| 2 | `photos/team-floor` | `/team` page, and the free-trial band on the homepage | **The real Ahmedabad delivery floor**, people working | Most valuable photo on the list. Candid, nobody looking at the camera |
| 3 | `photos/handshake-city` | `/about`, "Our Story" | **Toronto** skyline (CN Tower) or a Canadian city street | Displayed at about 1.15:1, so keep the subject central |
| 4 | `photos/busy-season` | Homepage, "calendar we work to" card | A real team member at a desk in season | Shown as a small thumbnail (96 × 64 px); low priority |
| 5 | `services/*-hd` (5 files) | Banner on each service page | Real office or desk scenes, one per service | Slugs: `dynamic-solutions-suite`, `elite-accounting-solutions`, `spectrum-of-taxes`, `audit-excellence`, `professional-hiring` |
| 6 | `industries/*-hd` (5 files) | Industry cards and pages | Real scenes of each sector | Slugs: `manufacturing`, `it-software-tech-services`, `hospitality`, `qsr-restaurants-food-chains`, `e-commerce`. Lowest priority: these pages are footer-only |
| 7 | `og.jpg` | Link previews (LinkedIn, WhatsApp) | Optional: Manhattan or Toronto, darkened behind the logo | Exactly 1200 × 630 |

Already real, no action: the five leadership headshots in `team/`.

### Handing the files over

Put the originals in `assets-src/` under the same folder and name (for example
`assets-src/photos/hero-us.jpg`) and tell the developer. `scripts/build-photo-assets.js`
currently expects `.png` masters, so either export PNG or update the `src`
extension in its `PHOTOS` list, then run `node scripts/build-photo-assets.js`.

---

The rest of this file is the August brief, written when the plan was to generate
the images. It is superseded by the section above.

---

## Rules that apply to every prompt

**Never ask the model for text in the image.** Generated lettering is almost always
subtly wrong — a misspelled "ACCOUNTING", a garbled form number — and on an
accounting site that is worse than no image. All labels on this site are live HTML.

**Palette to name in every prompt** (sampled from the logo):

| Role | Hex |
|---|---|
| Deep navy | `#042454` |
| Royal blue | `#03529C` |
| Bright blue | `#0363B3` |
| Gold | `#C99A2A` |
| Off-white | `#F7F7F7` |

**Style anchor to paste into every prompt:**

> Photorealistic corporate photography, natural window light, shallow depth of field,
> muted cool-navy colour grade, professional but not stock-posed, no visible text or
> lettering anywhere in the frame, no logos, no watermarks, 4K, sharp focus.

**Aspect ratios matter more than absolute size.** Generate at the largest the tool
allows, then hand me the file — the build script resizes and converts to WebP.

**Diversity note:** these are U.S.-facing images of U.S. accounting professionals.
Ask explicitly for a mix of ages, genders and ethnicities across the set, or the
models default to the same person in every frame.

---

## Already imported — no action needed

Pulled from adasglobus.com, converted to WebP (3.95 MB → 0.21 MB total).

| Path | Used on |
|---|---|
| `team/smit-shah.webp`, `arpit-shah.webp`, `devarshi-shah.webp` | `/team`, `/about` — real leadership headshots |
| `industries/*.webp` (5) | Industry cards and detail pages |
| `services/*.webp` (5) | Service page sidebar |
| `photos/analyst-at-desk.webp` | Busy-season card |
| `photos/handshake-city.webp` | About story |
| `photos/cost-dashboard.webp` | Spare |

⚠️ The sector and service images are only **418×536** natively — fine as card
headers and sidebar panels, which is how they are used, but they cannot be
stretched full-bleed. Items 4 and 5 below replace them if you want that freedom.

---

## Still needed

### 1. Homepage hero — **highest value**
`public/assets/photos/hero-us.webp` · **16:9**, 2400×1350 minimum

The hero currently runs on a pure-CSS gradient with animated orbit rings. It looks
good and costs nothing, but a real photograph behind it at 25% opacity would add
warmth. Optional, and the page is complete without it.

> A modern American accounting firm office at dusk, wide establishing shot, two
> professionals reviewing documents at a glass conference table, city skyline
> visible through floor-to-ceiling windows behind them, warm interior lighting
> against cool blue evening light outside, deep navy `#042454` and royal blue
> `#03529C` dominating the colour grade with small warm gold `#C99A2A` accents
> from interior lamps, cinematic, shallow depth of field, plenty of empty space
> on the left third of the frame for headline text. Photorealistic corporate
> photography, natural light, no visible text or lettering, no logos, 4K.

---

### 2. Team / bench depth
`public/assets/photos/team-floor.webp` · **3:2**, 1800×1200 minimum

The `/team` page has three headshots and then a lot of typography. One wide shot of
a working floor makes "120+ professionals" feel real.

> A wide shot of a modern accounting delivery floor, eight to ten professionals of
> mixed ages, genders and ethnicities working at dual-monitor desks, spreadsheets
> and financial dashboards visible but illegible on screens, bright natural light
> from large windows on the left, clean contemporary office with navy and white
> finishes, sense of quiet focused work rather than a staged team photo, no one
> looking at the camera. Photorealistic corporate photography, muted cool colour
> grade, no visible text or lettering, no logos, 4K.

---

### 3. Busy season
`public/assets/photos/busy-season.webp` · **4:3**, 1600×1200 minimum

Currently borrowing `analyst-at-desk.webp`. A purpose-shot image would land the
January–April argument harder.

> An accountant at a desk during tax season, mid-thirties, focused expression,
> organised stacks of client folders and a dual-monitor setup with tax software
> open but illegible, a wall calendar out of focus in the background, early
> morning light through a window, sense of controlled busyness rather than chaos
> or stress, deep navy and cool blue colour grade with a warm gold desk lamp
> accent. Photorealistic corporate photography, shallow depth of field, no
> visible text or lettering, no logos, 4K.

---

### 4. Service page headers ×5 — **replaces low-res imports**
`public/assets/services/{slug}-hd.webp` · **16:9**, 2000×1125 each

Only needed if you want full-width service headers. The imported 418×536 files are
fine where they currently sit.

Slugs: `dynamic-solutions-suite`, `elite-accounting-solutions`, `spectrum-of-taxes`,
`audit-excellence`, `professional-hiring`

> **Dynamic Solutions Suite** — An overhead shot of a large desk with several
> distinct workstreams laid out in organised zones: financial statements, a
> payroll register, a tax organiser and an audit binder, one pair of hands
> bringing them together, clean navy desk surface, warm overhead light.
> Photorealistic, cool navy grade with gold accents, no text or lettering, 4K.

> **Elite Accounting Solutions** — A close, calm shot of hands reconciling
> accounts on a laptop showing a clean ledger interface, illegible figures, a
> coffee and a neat stack of statements alongside, soft morning window light,
> navy and white palette. Photorealistic, shallow depth of field, no text or
> lettering, 4K.

> **Spectrum of Taxes** — A tax professional at a dual-monitor workstation
> reviewing a return, tax preparation software visible but illegible, organised
> client files stacked to one side, focused expression, cool navy grade with a
> single warm gold lamp. Photorealistic, no text or lettering, 4K.

> **Audit Excellence** — Two auditors reviewing working papers together at a
> conference table, one pointing at a schedule, documents and a laptop between
> them, professional and collaborative, bright even light, navy and grey palette
> with gold accents. Photorealistic, no text or lettering, 4K.

> **Professional Hiring** — A video call in progress on a large monitor showing an
> onshore team, with an offshore professional at the desk in the foreground
> collaborating, both sides engaged, warm and natural rather than corporate-stock,
> cool navy grade. Photorealistic, no text or lettering, 4K.

---

### 5. Industry page headers ×5 — optional
`public/assets/industries/{slug}-hd.webp` · **16:9**, 2000×1125 each

Slugs: `manufacturing`, `it-software-tech-services`, `hospitality`,
`qsr-restaurants-food-chains`, `e-commerce`

> **Manufacturing** — Interior of a clean mid-sized American manufacturing
> facility, a controller with a tablet reviewing figures on the production floor,
> machinery softly out of focus behind, industrial but organised, cool blue-grey
> grade with warm safety-light accents. Photorealistic, no text or lettering, 4K.

> **Technology / SaaS** — A modern software company office, a finance lead
> reviewing revenue dashboards on a large monitor, charts visible but illegible,
> open-plan space with engineers out of focus behind, bright natural light, cool
> navy and blue palette. Photorealistic, no text or lettering, 4K.

> **Hospitality** — A hotel back-office at night, a night auditor reviewing the
> day's revenue reports, warm lobby light spilling through a doorway behind,
> calm and precise atmosphere, deep navy shadows with warm gold highlights.
> Photorealistic, no text or lettering, 4K.

> **QSR / Restaurants** — A restaurant manager reviewing weekly cost figures on a
> tablet in an empty dining room before service, kitchen visible out of focus
> behind, early morning light, warm neutral tones with navy accents.
> Photorealistic, no text or lettering, 4K.

> **E-Commerce & D2C** — A D2C brand founder reviewing channel performance on a
> laptop in a small warehouse or studio space, neatly stacked shipping boxes
> softly out of focus behind, bright natural light, clean modern palette with
> navy and gold accents. Photorealistic, no text or lettering, 4K.

---

### 6. Social share card — optional
`public/assets/og-photo.png` · **1200×630 exactly**

`og.png` currently renders the logo on a navy field, which is clean and safe. A
photographic version would stand out more in LinkedIn feeds.

> A dark navy background with a subtle blurred image of an American accounting
> office at dusk, heavily darkened and desaturated so it reads as texture rather
> than subject, large clear empty area in the centre for a logo to be composited
> on top, deep navy `#042454` dominant with a faint gold glow from the lower
> right corner. Photorealistic, atmospheric, no visible text or lettering, no
> logos, 1200×630.

---

## After you generate them

Drop the files in the paths above and tell me — I will resize, convert to WebP,
wire them into the pages that reference them, and re-run the visual check.

The optimiser is already in the repo:

```bash
node scripts/build-logo-assets.js   # logo assets
```

Photography goes through the same sharp pipeline; I will extend the script to
cover the new files once they exist.
