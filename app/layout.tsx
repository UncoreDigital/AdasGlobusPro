import { Analytics } from "@vercel/analytics/next";
import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.proposition}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  keywords: [
    "accounting outsourcing",
    "offshore accounting",
    "CPA firm outsourcing",
    "tax preparation outsourcing",
    "audit support",
    "offshore bookkeeping",
    "ADAS Globus Pro",
  ],
  authors: [{ name: site.name }],
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — ${site.proposition}`,
    description: site.description,
    url: site.url,
    images: [{ url: site.ogImage, width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.proposition}`,
    description: site.description,
    images: [site.ogImage],
  },
  /*
    The client reported (2 September) that a Google result for "AGP" shows no
    small image beside it. Two reasons, both fixed here and in
    scripts/build-logo-assets.js:

      1. Google's favicon crawler wants a square whose edge is a multiple of
         48px. The only icon declared here was 512x512, and 512 / 48 = 10.67 —
         so the one icon on offer was the wrong shape to be accepted.
      2. It also fetches /favicon.ico at the origin root regardless of what the
         markup says, and nothing answered that path at all.

    So: the 48px multiples are declared first and largest-last, /favicon.ico
    leads and is repeated as `shortcut`, and public/favicon.ico now exists to
    serve the root fetch.

    The mark on those plates was scaled up afterwards, for a separate reason.
    It sat at 82% of the plate WIDTH, and because the AGP monogram is a ~2.95:1
    band, width is what binds on a square plate — the glyphs were getting only
    28% of the height, which is roughly 4px once Google draws the icon at
    search-result size. See the SCALE note in scripts/build-logo-assets.js.

    One thing this cannot fix on its own, and it is outside the codebase:
    Google re-crawls favicons on its own schedule, typically days to a few
    weeks. Nothing here makes that happen sooner than the next crawl.

    The other half of the original problem — that the favicon is read for the
    CANONICAL host — is settled rather than pending now. site.url resolves to
    www.adasglobuspro.com, this site's own domain, so the host being described
    is the right one. It used to be a placeholder naming a different property;
    the note on `url` in lib/site.ts records what that cost.
  */
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48", type: "image/x-icon" },
      { url: "/assets/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/assets/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/assets/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/assets/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/assets/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: [{ url: "/favicon.ico" }],
    apple: [{ url: "/assets/apple-touch-icon.png", sizes: "180x180" }],
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#042454",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${jakarta.variable}`}>
      <body>
        {children}
        {/* Vercel Web Analytics. Renders nothing; it injects the collection
            script and reports a page view on each App Router navigation. Only
            active on Vercel deployments, so local and CI builds stay silent. */}
        <Analytics />
      </body>
    </html>
  );
}
