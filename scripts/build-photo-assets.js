/**
 * Converts the supplied photography into the WebP assets the site references.
 *
 *   node scripts/build-photo-assets.js
 *
 * Sources live in `assets-src/`, NOT in `public/`. That matters: anything under
 * public/ is served, and the 27 MB of PNG masters would ship to visitors as
 * dead weight alongside the WebP files actually used. Sources stay out of the
 * served tree; only the derived WebP goes in.
 *
 * Outputs are committed, same convention as scripts/build-logo-assets.js — this
 * runs when new artwork arrives, not on every build.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "assets-src");
const OUT = path.join(__dirname, "..", "public", "assets");

/*
  Nothing is upscaled. Every master is 1536x1024, so 1536 is the ceiling —
  next/image generates the smaller responsive variants from it at request time,
  and asking sharp to invent pixels above the source only inflates the file.

  Quality 82 is where this particular set stops improving: the grade is soft and
  low-contrast, so the artefacts q78 would introduce in the gradients are
  visible, while q88 costs roughly 60% more bytes for no perceptible gain.
*/
const QUALITY = 82;
const MAX_WIDTH = 1536;

const PHOTOS = [
  { src: "photos/hero-us.png", out: "photos/hero-us" },
  { src: "photos/team-floor.png", out: "photos/team-floor" },
  { src: "photos/busy-season.png", out: "photos/busy-season" },

  { src: "services/dynamic-solutions-suite-hd.png", out: "services/dynamic-solutions-suite-hd" },
  { src: "services/elite-accounting-solutions-hd.png", out: "services/elite-accounting-solutions-hd" },
  { src: "services/spectrum-of-taxes-hd.png", out: "services/spectrum-of-taxes-hd" },
  { src: "services/audit-excellence-hd.png", out: "services/audit-excellence-hd" },
  { src: "services/professional-hiring-hd.png", out: "services/professional-hiring-hd" },

  { src: "industries/manufacturing-hd.png", out: "industries/manufacturing-hd" },
  { src: "industries/it-software-tech-services-hd.png", out: "industries/it-software-tech-services-hd" },
  { src: "industries/hospitality-hd.png", out: "industries/hospitality-hd" },
  { src: "industries/qsr-restaurants-food-chains-hd.png", out: "industries/qsr-restaurants-food-chains-hd" },
  { src: "industries/e-commerce-hd.png", out: "industries/e-commerce-hd" },
];

(async () => {
  let bytesIn = 0;
  let bytesOut = 0;

  for (const photo of PHOTOS) {
    const from = path.join(SRC, photo.src);
    if (!fs.existsSync(from)) {
      console.log(`SKIP (missing)  ${photo.src}`);
      continue;
    }
    bytesIn += fs.statSync(from).size;

    const dest = path.join(OUT, `${photo.out}.webp`);
    fs.mkdirSync(path.dirname(dest), { recursive: true });

    await sharp(from)
      .resize({ width: MAX_WIDTH, withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(dest);

    const meta = await sharp(dest).metadata();
    const size = fs.statSync(dest).size;
    bytesOut += size;
    console.log(
      `${photo.out}.webp`.padEnd(50) +
        `${meta.width}x${meta.height}`.padEnd(12) +
        `${(size / 1024).toFixed(0)} KB`
    );
  }

  /*
    Open Graph card. Must be exactly 1200x630 — the platforms crop anything else
    unpredictably, and a lockup that survives one crop gets guillotined by the
    next. The supplied photo is 1735x907 (1.913), close enough to 1.905 that a
    cover resize takes only a few pixels off the sides.

    The logo is composited here rather than baked into the generated photograph,
    so the wordmark stays the real artwork instead of an AI approximation of it.
  */
  const ogSrc = path.join(SRC, "og-photo.png");
  if (fs.existsSync(ogSrc)) {
    const base = await sharp(ogSrc)
      .resize({ width: 1200, height: 630, fit: "cover", position: "center" })
      /* Darkened so the lockup reads: the plate alone is mid-navy, and white
         text on it sits under 4:1 without this. */
      .modulate({ brightness: 0.72 })
      .toBuffer();

    const lockup = await sharp(path.join(OUT, "logo-compact-alpha.png"))
      .resize({ width: 620, fit: "inside" })
      .toBuffer();

    /*
      JPEG, not PNG. The previous card was flat navy plus a lockup, which PNG
      compressed to almost nothing; this one is a photograph, and PNG takes it
      past 1 MB. Some scrapers skip images that large, and every one of them
      accepts JPEG.
    */
    await sharp(base)
      .composite([{ input: lockup, gravity: "center" }])
      .jpeg({ quality: 88, chromaSubsampling: "4:4:4" })
      .toFile(path.join(OUT, "og.jpg"));

    const size = fs.statSync(path.join(OUT, "og.jpg")).size;
    console.log(`og.jpg`.padEnd(50) + `1200x630`.padEnd(12) + `${(size / 1024).toFixed(0)} KB`);
  }

  console.log(
    `\n${PHOTOS.length} photos  ${(bytesIn / 1024 / 1024).toFixed(2)} MB PNG -> ${(bytesOut / 1024 / 1024).toFixed(2)} MB WebP`
  );
})();
