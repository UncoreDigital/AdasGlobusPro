/**
 * Normalises the vendor logos into a single consistent set.
 *
 *   node scripts/build-software-logos.js
 *
 * Sources are the client's own logo files, carried across from adasglobus.com
 * into `assets-src/software/`. They arrive at wildly different sizes, aspect
 * ratios and padding — 300x300 squares with a logo floating in the middle,
 * 179x179 JPEGs, some with alpha and some on flat white — so dropping them
 * straight into a row of tiles gives a row where every logo is a different
 * optical size.
 *
 * Two passes fix that:
 *
 *   1. Trim the surrounding dead space, so what is left is the ink itself.
 *   2. Fit that ink inside one fixed box, so a wide wordmark (CaseWare) and a
 *      circular badge (Xero) end up with the same visual weight in the row.
 *
 * Everything is flattened onto white rather than keyed to transparency. Keying
 * would be wrong here: the QuickBooks badge is a white "qb" inside a green
 * circle, and a global white key punches the letters out of it — the same trap
 * the old ADAS globe presented. Flattening onto white is safe for every file in
 * the set, and the tiles that carry them are white anyway.
 */

const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const SRC = path.join(__dirname, "..", "assets-src", "software");
const OUT = path.join(__dirname, "..", "public", "assets", "software");

/*
  The box every logo is fitted into. 2x the ~110x40 the tiles render at, so the
  set stays crisp on a retina display without shipping 300px squares.
*/
const BOX = { width: 220, height: 80 };

/*
  Which platforms carry a logo, and which fall back to a typeset name.

  Two rules decide, and both were learned the hard way on this file:

    1. Never ship a parent company's mark for a product. Lacerte is Intuit,
       CCH Axcess is Wolters Kluwer, UltraTax CS is Thomson Reuters. Every
       logo-by-domain lookup returns the parent, and a Wolters Kluwer roundel
       captioned "CCH Axcess" claims a relationship with the wrong entity.
       ProSeries and ProConnect are the exception rather than a contradiction:
       Intuit publishes an actual product lockup for each.

    2. Never ship a mark nobody has looked at. Automated logo search is wrong
       often enough to be dangerous — a keyword search of Wikimedia Commons
       returned Aeroports de Paris for "ADP", the Buffalo Bills for "Bill.com",
       a PostGIS elephant for "NetSuite" and an AmaroK screenshot for "Drake",
       and logo.dev returned a dark tile with a swan on it for netsuite.com from
       two different domains.

  SafeSend and Suralink were dropped on a softer judgement: both returned a
  plausible brand-coloured icon from their own domain, but neither carries the
  product name and both are dark tiles in a row of wordmarks. Unrecognisable and
  visually broken is worse than typeset.

  To verify a candidate before adding it here: composite the set onto one sheet
  at ~300px wide per cell and look at every tile. It takes a minute and it is
  the only step that catches the swan.
*/
const LOGOS = [
  /* From the client's own library, carried over from adasglobus.com. */
  "quickbooks.png",
  "xero.png",
  "sage.png",
  "caseware.png",
  "proseries.png",
  "proconnect.jpg",

  /* Sourced by domain from the vendors themselves, and verified by eye. */
  "drake-tax.png",
  "gusto.png",
  "adp.png",
  "paychex.png",
  "bill-com.png",
  "dext.png",

  /*
    Typeset instead of logo'd — see the rules above:

      Lacerte      parent mark only (Intuit)
      CCH Axcess   parent mark only (Wolters Kluwer)
      UltraTax CS  parent mark only (Thomson Reuters)
      NetSuite     lookup returns the wrong asset entirely
      SafeSend     icon-only, dark tile, no product name
      Suralink     icon-only, no product name

    Also removed with the platform trim in lib/content.ts: microsoft-dynamics,
    teammate, workiva, expensify, power-bi. Those five are enterprise tools a
    small U.S. CPA practice is unlikely to run. The source PNGs are still in
    assets-src/software/, so putting any of them back is one line here.
  */
];

(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  let bytesIn = 0;
  let bytesOut = 0;

  for (const file of LOGOS) {
    const from = path.join(SRC, file);
    if (!fs.existsSync(from)) {
      console.log(`SKIP (missing)  ${file}`);
      continue;
    }
    bytesIn += fs.statSync(from).size;

    const slug = file.replace(/\.(png|jpe?g)$/i, "");
    const dest = path.join(OUT, `${slug}.webp`);

    /*
      Flatten before trimming, not after. Several of these carry a transparent
      border *and* a white plate inside it; trimming the alpha first leaves the
      white plate behind and the logo still floats in a box.
    */
    const flattened = await sharp(from).flatten({ background: "#ffffff" }).png().toBuffer();

    const trimmed = await sharp(flattened)
      .trim({ threshold: 12 })
      .png()
      .toBuffer()
      .catch(() => flattened); // a logo that fills its canvas has nothing to trim

    await sharp(trimmed)
      .resize({ ...BOX, fit: "contain", background: "#ffffff" })
      .webp({ quality: 90 })
      .toFile(dest);

    const before = await sharp(flattened).metadata();
    const after = await sharp(trimmed).metadata();
    const size = fs.statSync(dest).size;
    bytesOut += size;

    console.log(
      `${slug}.webp`.padEnd(26) +
        `${before.width}x${before.height}`.padStart(9) +
        ` -> trimmed ${`${after.width}x${after.height}`.padEnd(9)}` +
        ` ${(size / 1024).toFixed(1)} KB`
    );
  }

  console.log(
    `\n${LOGOS.length} logos  ${(bytesIn / 1024).toFixed(0)} KB -> ${(bytesOut / 1024).toFixed(0)} KB WebP`
  );
})();
