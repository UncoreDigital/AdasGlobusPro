/*
  Leadership headshots: source photos in, matching card crops out.

    node scripts/build-team-photos.js

  The four photos the client supplied were shot at four different distances —
  two full-body, two head-and-shoulders — so a fixed crop puts one face at the
  top of its card and another in the middle. Each subject therefore carries its
  own framing, and the numbers live here rather than in someone's shell history:
  when a leader is replaced, you change one line and re-run.

    faceY / faceX  where the face sits in the source, as a fraction
    zoom           crop height as a fraction of source height (smaller = tighter)

  These were set by eye against a contact sheet, deliberately. An automatic pass
  over skin tones put Devarshi's face on his desk, because polished wood and
  skin occupy the same corner of RGB. If you re-tune, render all the crops
  side by side and look at them — matching face sizes is the whole job, and it
  is not a thing a number tells you.

  These four are the whole leadership roster. To add someone: drop the source
  in assets-src/team/, add a line to SUBJECTS, run this, and add the matching
  entry to `team.leadership` in lib/content.ts.
*/

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "assets-src", "team");
const OUT = path.join(__dirname, "..", "public", "assets", "team");

/* 3:4 at 2x the 360x480 the cards render at, so they stay sharp on retina. */
const OUT_W = 720;
const OUT_H = 960;
const RATIO = OUT_W / OUT_H;

/* Where the face lands vertically in the finished card. */
const FACE_AT = 0.38;

const SUBJECTS = [
  { slug: "devarshi-shah",    file: "devarshi-shah.png",    faceY: 0.30, faceX: 0.47, zoom: 0.98 },
  { slug: "pratik-shah",      file: "pratik-shah.jpg",      faceY: 0.19, faceX: 0.46, zoom: 0.42 },
  { slug: "ritesh-prajapati", file: "ritesh-prajapati.jpg", faceY: 0.29, faceX: 0.49, zoom: 0.70 },
  { slug: "smit-shah",        file: "smit-shah.jpg",        faceY: 0.22, faceX: 0.54, zoom: 0.50 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  let bytesIn = 0;
  let bytesOut = 0;

  for (const s of SUBJECTS) {
    const from = path.join(SRC, s.file);
    if (!fs.existsSync(from)) {
      console.log(`SKIP (missing)  ${s.file}`);
      continue;
    }
    bytesIn += fs.statSync(from).size;

    const { width: W, height: H } = await sharp(from).metadata();

    let ch = Math.round(H * s.zoom);
    let cw = Math.round(ch * RATIO);
    /* Never ask for a crop wider than the source, or extract() throws. */
    if (cw > W) {
      cw = W;
      ch = Math.round(cw / RATIO);
    }

    let top = Math.round(H * s.faceY - ch * FACE_AT);
    let left = Math.round(W * s.faceX - cw / 2);
    top = Math.max(0, Math.min(top, H - ch));
    left = Math.max(0, Math.min(left, W - cw));

    const dest = path.join(OUT, `${s.slug}.webp`);
    await sharp(from)
      /* PNG sources arrive with alpha; a transparent headshot composites onto
         the card background and loses its edges. */
      .removeAlpha()
      .extract({ left, top, width: cw, height: ch })
      .resize(OUT_W, OUT_H, { fit: "cover" })
      .webp({ quality: 82 })
      .toFile(dest);

    bytesOut += fs.statSync(dest).size;
    console.log(
      `${s.slug.padEnd(18)} ${String(W)}x${H} -> ${cw}x${ch} @ ${left},${top} -> ` +
        `${OUT_W}x${OUT_H}  ${(fs.statSync(dest).size / 1024).toFixed(0)} KB`
    );
  }

  console.log(
    `\n${SUBJECTS.length} headshots  ` +
      `${(bytesIn / 1024).toFixed(0)} KB -> ${(bytesOut / 1024).toFixed(0)} KB WebP`
  );
})();
