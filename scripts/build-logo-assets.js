/**
 * Derives every web logo asset from the client's master artwork.
 *
 *   node scripts/build-logo-assets.js
 *
 * Outputs are committed, so this only needs running when the client supplies
 * new artwork. Source of truth: public/assets/logo-master.jpeg
 */
const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "public", "assets", "logo-master.jpeg");
const PUBLIC = path.join(__dirname, "..", "public");
const OUT = path.join(PUBLIC, "assets");

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

  /*
    Favicon set + apple touch icon: the monogram on the brand navy, so the mark
    holds up against a dark browser chrome rather than dissolving into it.

    WHY SO MANY SIZES — the client reported (2 September) that a Google result
    for "AGP" shows no small image. Google's favicon crawler wants a square
    whose edge is a MULTIPLE OF 48px, and it looks for /favicon.ico at the
    origin root as well as at the <link rel="icon"> tags. This build used to
    emit only 180 and 512: 512 is not a multiple of 48 (512 / 48 = 10.67), and
    nothing answered /favicon.ico at all, so there was nothing for Google to
    take. 48/96/144/192 below are the multiples; the .ico carries 16/32/48 for
    the browser tab and for that root-path fetch.
  */
  const markAlpha = path.join(OUT, "logo-mark-alpha.png");

  /** One navy plate with the monogram centred on it, as a PNG buffer. */
  const plate = async (size) =>
    sharp({
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
      .png({ compressionLevel: 9 })
      .toBuffer();

  const PNG_ICONS = [
    [48, "icon-48.png"],
    [96, "icon-96.png"],
    [144, "icon-144.png"],
    [192, "icon-192.png"],
    [180, "apple-touch-icon.png"],
    [512, "icon-512.png"],
  ];
  for (const [size, name] of PNG_ICONS) {
    fs.writeFileSync(path.join(OUT, name), await plate(size));
  }

  /*
    favicon.ico, written by hand because sharp has no ICO encoder.

    These are PNG-in-ICO: the container is allowed to hold a PNG payload rather
    than a BMP, which every browser since IE/Vista and Google's crawler read
    fine, and it keeps the file a few KB instead of ~25KB of raw BMP.

    Layout: a 6-byte ICONDIR, then one 16-byte ICONDIRENTRY per image, then the
    payloads. In an entry a stored dimension of 0 means 256 — not reachable at
    these sizes, but the & 0xff is what encodes that rule.
  */
  const icoSizes = [16, 32, 48];
  const icoPngs = [];
  for (const size of icoSizes) icoPngs.push(await plate(size));

  const dir = Buffer.alloc(6 + 16 * icoPngs.length);
  dir.writeUInt16LE(0, 0); // reserved
  dir.writeUInt16LE(1, 2); // 1 = icon (2 would be a cursor)
  dir.writeUInt16LE(icoPngs.length, 4);

  let offset = dir.length;
  icoPngs.forEach((png, i) => {
    const e = 6 + 16 * i;
    dir.writeUInt8(icoSizes[i] & 0xff, e); // width  (0 => 256)
    dir.writeUInt8(icoSizes[i] & 0xff, e + 1); // height (0 => 256)
    dir.writeUInt8(0, e + 2); // palette size, 0 for truecolour
    dir.writeUInt8(0, e + 3); // reserved
    dir.writeUInt16LE(1, e + 4); // colour planes
    dir.writeUInt16LE(32, e + 6); // bits per pixel
    dir.writeUInt32LE(png.length, e + 8); // payload bytes
    dir.writeUInt32LE(offset, e + 12); // payload offset
    offset += png.length;
  });

  /*
    The root of /public, not /public/assets: Google and older clients fetch
    /favicon.ico at the origin root, and only a file at the public root is
    served from that path.
  */
  fs.writeFileSync(path.join(PUBLIC, "favicon.ico"), Buffer.concat([dir, ...icoPngs]));

  console.log(
    `icons ${PNG_ICONS.map(([s]) => s).join("/")} (navy plate), favicon.ico ${icoSizes.join("/")}`
  );

  /*
    No Open Graph card here. build-photo-assets.js owns it: the card is the
    lockup composited over the supplied photography, so it belongs with the
    photography pipeline, and lib/site.ts points at the og.jpg that produces.
    Emitting a second one from this script left an orphan nothing referenced.
  */
})();
