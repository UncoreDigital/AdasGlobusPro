/*
  Leadership headshots: source photos in, matching card crops out.

    node scripts/build-team-photos.js

  The supplied photos were shot at different distances — one near-square, the
  rest head-and-shoulders — so a fixed crop puts one face at the top of its
  card and another in the middle. Each subject therefore carries
  its own measurements, and they live here rather than in someone's shell
  history: when a leader is replaced you change four numbers and re-run.

  ── How to measure a new photo ─────────────────────────────────────────────
  Run scripts/grid-team-photos.js to overlay a labelled grid, then read off:

    eyeY     the eye line, as a fraction of image HEIGHT
    headTop  the top of the hair          }  headH = chin − headTop
    chin     the bottom of the chin       }
    eyeX     the bridge of the nose, as a fraction of image WIDTH

  Do not try to detect this automatically. Two attempts failed on these exact
  photos: a skin-tone pass put Devarshi's face on his wooden desk, and a
  silhouette pass read his tan suit as skin and placed it on his chest. Wood,
  tan fabric and skin occupy the same corner of RGB. Five photos take five
  minutes to measure and the result is correct.

  ── How the framing works ──────────────────────────────────────────────────
  Every output places the eye line at EYE_AT and sizes the head to HEAD_AT, so
  the faces line up across the row regardless of how each photo was shot. That
  is the whole point: matching eye lines are what make a row of portraits read
  as one set. The script prints the spread it achieved — if that is not ~0.001,
  something clamped and the row will look wrong.

  ⚠️ Devarshi's source is the weak link. At 360x471 it holds less than a
  quarter the pixels of the others, so his card is upscaled 2.5x and is visibly
  the softest of the five. It also constrains the framing for everybody: his
  head starts 7.5% from the top, which caps how far down the eye line can go.
  A full-size original of that photograph would sharpen his card and widen the
  window for the whole row. Worth asking the client for.
*/

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "assets-src", "team");
const OUT = path.join(__dirname, "..", "public", "assets", "team");

/* 3:4 at 2x the ~360x480 the cards render at, so they stay sharp on retina. */
const OUT_W = 720;
const OUT_H = 960;
const RATIO = OUT_W / OUT_H;

/*
  These two are not free choices — they are the window every source can satisfy
  at once, and it is narrow.

  Devarshi's head starts 7.5% from the top of his frame, which caps how far down
  the eye line can sit: past EYE_AT 0.332 his crop wants pixels above the top of
  his photograph and clamps. That is the ceiling.

  The floor is headroom, and it is the constraint this file originally missed.
  A subject's crown sits at EYE_AT − f·HEAD_AT of the card, where f is the share
  of the head above the eye line. Smit's hair is voluminous — f = 0.61 against
  0.46 for Pratik — so at EYE_AT 0.29 his crown landed at 0.005 of the card and
  the top of his hair was sliced off. Nothing warned: his crop never clamped, so
  the eye-line spread still reported 0.001 while the card was visibly wrong.

  0.315 clears him by 3% of the card (~29px) and leaves Devarshi 6px of slack
  before he clamps. Raising HEAD_AT instead would also work, but it enlarges
  every head and pushes Devarshi's upscale past 2.7x, and he is already the
  softest card in the row.

  0.47 for a second reason too: Ritesh is 1024px wide and a wider crop runs out
  of frame before his face reaches the middle. At 0.45 he sits 3.5% off centre,
  at 0.47 it is 1.5% — invisible. Going further costs sharpness on Devarshi.

  Changing either number without re-solving will silently clamp somebody's crop
  or shave somebody's hair. The run prints headroom for exactly that reason.
*/
/** Where the eye line lands in the finished card, as a fraction of its height. */
const EYE_AT = 0.315;
/** How tall the head is in the finished card, hair to chin. */
const HEAD_AT = 0.47;

/*
  Measured off a 1% grid, one subject per sheet — see scripts/grid-team-photos.js.

  Worth stating how wrong eyeballing this was: read from a 450px-wide contact
  sheet, Pratik's head height came out at 0.085 against a true 0.170, and
  Devarshi's face centre at 0.510 against a true 0.655. Half the head size and a
  seventh of the frame off centre. Measure at full size.

  Listed in the order the cards appear on /team.
*/
const SUBJECTS = [
  { slug: "smit-shah",        file: "smit-shah.jpg",        eyeY: 0.200, headH: 0.254, headTop: 0.046, eyeX: 0.455 },
  { slug: "devarshi-shah",    file: "devarshi-shah.png",    eyeY: 0.265, headH: 0.375, headTop: 0.075, eyeX: 0.510 },
  { slug: "arpit-shah",       file: "arpit-shah.jpg",       eyeY: 0.305, headH: 0.340, headTop: 0.150, eyeX: 0.500 },
  { slug: "ritesh-prajapati", file: "ritesh-prajapati.jpg", eyeY: 0.395, headH: 0.370, headTop: 0.185, eyeX: 0.430 },
  /*
    Pratik's second photograph, and a much easier one: square, 1254px, shot
    square-on against white, so his face centre and the frame centre agree and
    eyeX needs no nudge. The first photo was a distant three-quarter shot whose
    head filled 0.170 of the frame and whose shoulders sat well right of his
    face — it needed eyeX pushed to 0.430 to fill the crop, and it upscaled
    hard. This one crops at 1.14x.

    It arrived as a circle on black. The black is gone: assets-src holds it
    already flattened onto the same white the circle sits on, because a 3:4
    crop of the original pulls black wedges into two corners of the card.
  */
  { slug: "pratik-shah",      file: "pratik-shah.jpg",      eyeY: 0.230, headH: 0.315, headTop: 0.085, eyeX: 0.495 },
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  let bytesIn = 0;
  let bytesOut = 0;
  const report = [];

  for (const s of SUBJECTS) {
    const from = path.join(SRC, s.file);
    if (!fs.existsSync(from)) {
      console.log(`SKIP (missing)  ${s.file}`);
      continue;
    }
    bytesIn += fs.statSync(from).size;

    const { width: W, height: H } = await sharp(from).metadata();

    /* Crop tall enough that the head fills HEAD_AT of it. */
    let ch = Math.round((s.headH * H) / HEAD_AT);
    let cw = Math.round(ch * RATIO);

    /* Never ask for more than the source holds, or extract() throws. */
    if (cw > W) {
      cw = W;
      ch = Math.round(cw / RATIO);
    }
    if (ch > H) {
      ch = H;
      cw = Math.round(ch * RATIO);
    }

    /* Place the eye line and the face centre, then clamp inside the frame. */
    const wantTop = s.eyeY * H - EYE_AT * ch;
    const wantLeft = s.eyeX * W - cw / 2;
    const top = Math.max(0, Math.min(Math.round(wantTop), H - ch));
    const left = Math.max(0, Math.min(Math.round(wantLeft), W - cw));

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

    /* What the framing actually came out as, after clamping. */
    const eyeActual = (s.eyeY * H - top) / ch;
    const headActual = (s.headH * H) / ch;
    const offCentre = Math.abs(Math.round(wantLeft) - left) / cw;
    /* Distance from the top of the card to the top of the hair. Negative means
       the crop cut into the crown, which no other check here catches. */
    const headroom = (s.headTop * H - top) / ch;

    report.push({ eyeActual, headActual, headroom });

    console.log(
      `${s.slug.padEnd(18)} ${W}x${H} -> ${cw}x${ch} @ ${left},${top}` +
        `   eye ${eyeActual.toFixed(3)}  head ${headActual.toFixed(3)}  ${(OUT_H / ch).toFixed(2)}x` +
        `  headroom ${(headroom * 100).toFixed(1)}%` +
        (Math.round(wantTop) !== top ? "  ⚠ eye line clamped" : "") +
        (offCentre > 0.005 ? `  ⚠ face ${(offCentre * 100).toFixed(1)}% off centre` : "") +
        (headroom < 0.02 ? "  ⚠ HAIR CLIPPED — raise EYE_AT or lower HEAD_AT" : "")
    );
  }

  const eyes = report.map((r) => r.eyeActual);
  const heads = report.map((r) => r.headActual);
  console.log(
    `\n  eye-line spread  ${(Math.max(...eyes) - Math.min(...eyes)).toFixed(3)}` +
      `   head-size spread ${(Math.max(...heads) - Math.min(...heads)).toFixed(3)}   (0 = aligned)`
  );
  console.log(
    `  ${report.length} headshots  ${(bytesIn / 1024).toFixed(0)} KB -> ${(bytesOut / 1024).toFixed(0)} KB WebP`
  );
})();
