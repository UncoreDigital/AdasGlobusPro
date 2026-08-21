/**
 * Derives every web logo asset from the client's master artwork.
 *
 *   node scripts/build-logo-assets.js
 *
 * Outputs are committed, so this only needs running when the client supplies
 * new artwork. Source of truth: public/assets/logo-master.jpeg
 */
const sharp = require("sharp");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "assets", "logo-master.jpeg");
const OUT = path.join(__dirname, "..", "public", "assets");

const CROPS = [
  { name: "logo", top: 0.18, bottom: 0.83, note: "full lockup incl. ruled tagline" },
  { name: "logo-compact", top: 0.18, bottom: 0.69, note: "monogram + wordmark" },
  { name: "logo-mark", top: 0.19, bottom: 0.57, note: "AGP monogram alone" },
];

/**
 * Knocks the white field out to transparency.
 *
 * The 2025 artwork needed a flood fill inward from the border, because the
 * globe's landmasses were white and *enclosed* — keying every white pixel
 * punched holes through the continents.
 *
 * The 2026 mark has no white interior elements at all. The A's inner triangle
 * is navy ink, and every other white area — the P's counter, the counters in
 * the wordmark and the tagline — is background showing through and *should*
 * become transparent. A flood fill cannot reach those: they are enclosed, so
 * they survived as opaque white blobs and read as holes punched in the letters
 * once the mark sat on navy.
 *
 * So this keys globally instead. It is safe for this specific artwork because
 * the lightest ink in it, #3A82F2, is ~250 away from white in RGB distance —
 * nowhere near the 96 cut-off. If a future revision introduces a genuinely
 * white-filled shape inside the mark, this has to go back to a flood fill.
 *
 * Edge pixels get a ramped alpha rather than a binary cut: the source is a JPEG
 * with anti-aliased, slightly compressed edges, and a hard threshold leaves a
 * bright fringe that is very visible once the mark sits on navy.
 */
async function knockout(buf) {
  const { data, info } = await sharp(buf).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width: w, height: h, channels: ch } = info;

  const FR = 255, FG = 255, FB = 255;
  const HARD = 34;   // <= this distance from white: fully transparent
  const SOFT = 96;   // >= this distance: fully opaque; between the two, a ramp

  let cleared = 0;
  for (let p = 0; p < w * h; p++) {
    const i = p * ch;
    const dr = data[i] - FR, dg = data[i + 1] - FG, db = data[i + 2] - FB;
    const d = Math.sqrt(dr * dr + dg * dg + db * db);

    if (d >= SOFT) continue;                       // ink, leave opaque
    const alpha = d <= HARD ? 0 : Math.round(((d - HARD) / (SOFT - HARD)) * 255);
    data[i + 3] = alpha;
    if (alpha === 0) cleared++;
  }

  return {
    buffer: await sharp(data, { raw: { width: w, height: h, channels: ch } }).png().toBuffer(),
    clearedPct: ((cleared / (w * h)) * 100).toFixed(1),
  };
}

(async () => {
  const meta = await sharp(SRC).metadata();
  const W = meta.width, H = meta.height;

  for (const crop of CROPS) {
    const top = Math.round(crop.top * H);
    const height = Math.round((crop.bottom - crop.top) * H);

    // Two passes: sharp applies trim ahead of extract inside a single pipeline,
    // which would trim the whole artwork and then extract from coordinates that
    // no longer exist.
    const cropped = await sharp(SRC).extract({ left: 0, top, width: W, height }).png().toBuffer();
    const trimmedBuf = await sharp(cropped).trim({ threshold: 12 }).png().toBuffer();
    const t = await sharp(trimmedBuf).metadata();
    const width = Math.min(t.width * 2, 2400);

    // Opaque version — for white surfaces, where the JPEG field is invisible.
    await sharp(trimmedBuf)
      .resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `${crop.name}.png`));

    // Transparent version — for navy bands, the footer and the admin rail.
    const { buffer, clearedPct } = await knockout(trimmedBuf);
    await sharp(buffer)
      .resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9 })
      .toFile(path.join(OUT, `${crop.name}-alpha.png`));

    const out = await sharp(path.join(OUT, `${crop.name}.png`)).metadata();
    console.log(
      `${crop.name.padEnd(18)} ${String(out.width).padStart(4)}x${String(out.height).padEnd(4)} ratio ${(out.width / out.height).toFixed(3)}  field cleared ${clearedPct}%  ${crop.note}`
    );
  }

  // Favicon + apple touch icon: monogram on the brand navy, so the white globe
  // highlights hold up against a dark browser chrome.
  const markAlpha = path.join(OUT, "logo-mark-alpha.png");
  for (const [size, name] of [[180, "apple-touch-icon.png"], [512, "icon-512.png"]]) {
    await sharp({
      create: { width: size, height: size, channels: 4, background: { r: 4, g: 36, b: 84, alpha: 1 } },
    })
      .composite([
        {
          input: await sharp(markAlpha)
            .resize({ width: Math.round(size * 0.82), height: Math.round(size * 0.82), fit: "inside" })
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png()
      .toFile(path.join(OUT, name));
  }
  console.log("apple-touch-icon.png 180x180, icon-512.png 512x512 (navy plate)");

  // Open Graph card: 1200x630, navy field, transparent lockup centred.
  await sharp({
    create: { width: 1200, height: 630, channels: 4, background: { r: 4, g: 36, b: 84, alpha: 1 } },
  })
    .composite([
      {
        input: await sharp(path.join(OUT, "logo-compact-alpha.png")).resize({ width: 780, fit: "inside" }).toBuffer(),
        gravity: "center",
      },
    ])
    .png()
    .toFile(path.join(OUT, "og.png"));
  console.log("og.png 1200x630");

})();
