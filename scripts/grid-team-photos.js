/*
  Measuring aid for scripts/build-team-photos.js.

    node scripts/grid-team-photos.js            all sources
    node scripts/grid-team-photos.js smit-shah  just one

  Writes one PNG per source into .tmp/team-grid/ with a 1% grid over the top
  55% of the frame. Open it and read off four numbers for the SUBJECTS table:

    eyeY     the horizontal line through the pupils
    headTop  the top of the hair
    chin     the bottom of the chin        (headH = chin − headTop)
    eyeX     the bridge of the nose, as a fraction of image WIDTH

  Read them at this size, not off a contact sheet. Measuring these photos from a
  450px-wide thumbnail put Pratik's head height at 0.085 against a true 0.170 and
  Devarshi's face centre at 0.510 against a true 0.655 — half the head size and a
  seventh of the frame off centre, which is exactly what a row of misaligned
  portraits looks like.

  Automatic detection was tried twice and is not worth a third go: skin-tone
  thresholding put Devarshi's face on his wooden desk, and a silhouette pass read
  his tan suit as skin and placed it on his chest. Wood, tan fabric and skin all
  sit in the same corner of RGB.
*/

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "assets-src", "team");
const OUT = path.join(__dirname, "..", ".tmp", "team-grid");

/** Rendered height. Big enough that a 1% line is a real distance on screen. */
const H = 1100;
/** Only the top of the frame matters — that is where the head is. */
const TOP = 0.55;

(async () => {
  if (!fs.existsSync(SRC)) {
    console.log(`No sources at ${SRC}`);
    return;
  }
  fs.mkdirSync(OUT, { recursive: true });

  const only = process.argv[2];
  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(png|jpe?g)$/i.test(f))
    .filter((f) => !only || f.startsWith(only));

  if (files.length === 0) {
    console.log(only ? `No source matching "${only}"` : "No sources found.");
    return;
  }

  for (const file of files) {
    const slug = file.replace(/\.(png|jpe?g)$/i, "");
    const meta = await sharp(path.join(SRC, file)).metadata();
    const w = Math.round((meta.width / meta.height) * H);
    const vh = Math.round(H * TOP);

    const base = await sharp(path.join(SRC, file))
      .removeAlpha()
      .resize(w, H)
      .extract({ left: 0, top: 0, width: w, height: vh })
      .toBuffer();

    let g = "";
    /* Horizontal: every 1%, labelled every 5%. Labels are fractions of the
       FULL image height, not of this cropped view. */
    for (let f = 0; f <= TOP * 100; f += 1) {
      const y = (f / 100) * H;
      const major = f % 5 === 0;
      g +=
        `<line x1="0" y1="${y}" x2="${w}" y2="${y}" stroke="${major ? "#ff2d55" : "#00e5ff"}" ` +
        `stroke-opacity="${major ? 0.95 : 0.35}" stroke-width="${major ? 1.3 : 0.6}"/>`;
      if (major) {
        g += `<text x="3" y="${y - 2}" font-family="monospace" font-size="14" fill="#ff2d55">.${String(f).padStart(2, "0")}</text>`;
      }
    }
    /* Vertical: every 2%, labelled every 10%, as a percentage of width. */
    for (let f = 0; f <= 100; f += 2) {
      const x = (f / 100) * w;
      const major = f % 10 === 0;
      g +=
        `<line x1="${x}" y1="0" x2="${x}" y2="${vh}" stroke="${major ? "#ffd400" : "#00e5ff"}" ` +
        `stroke-opacity="${major ? 0.9 : 0.3}" stroke-width="${major ? 1.2 : 0.6}"/>`;
      if (major) {
        g += `<text x="${x + 3}" y="${vh - 6}" font-family="monospace" font-size="14" fill="#ffd400">${f}</text>`;
      }
    }

    const dest = path.join(OUT, `${slug}.png`);
    await sharp(base)
      .composite([
        { input: Buffer.from(`<svg width="${w}" height="${vh}" xmlns="http://www.w3.org/2000/svg">${g}</svg>`) },
      ])
      .png()
      .toFile(dest);

    console.log(`${slug.padEnd(18)} ${meta.width}x${meta.height}  ->  ${path.relative(process.cwd(), dest)}`);
  }

  console.log(`\nRed lines are fractions of image height, yellow of image width.`);
})();
