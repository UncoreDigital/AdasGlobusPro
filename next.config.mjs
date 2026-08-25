/** @type {import('next').NextConfig} */

/*
  Same trap as NEXT_PUBLIC_SITE_URL: an unparseable value here throws while the
  config module is being evaluated, which fails the build before Next has even
  started. A malformed Supabase URL should cost you remote images, not the
  deploy — the app already degrades gracefully when Supabase is unreachable.
*/
function hostFrom(value) {
  if (!value) return undefined;
  try {
    return new URL(value.trim()).hostname || undefined;
  } catch {
    console.warn(
      `[config] NEXT_PUBLIC_SUPABASE_URL is not a usable URL (received: ${JSON.stringify(value)}). ` +
        "Remote images from Supabase storage will not be optimised."
    );
    return undefined;
  }
}

const supabaseHost = hostFrom(process.env.NEXT_PUBLIC_SUPABASE_URL);

/**
 * Legacy .php routes, mapped to their equivalents here.
 *
 * NOT ENABLED. adasglobus.com stays live and keeps serving these URLs itself,
 * so this site has no business redirecting them — it never owned them. The map
 * is kept because it becomes the redirect table the day the two properties are
 * merged, or the day the old site is retired. To turn it on, add the spread
 * back into redirects() below and confirm the DNS actually points here first.
 */
const legacyRoutes = {
  "/index.php": "/",
  "/about.php": "/about",
  "/our-services.php": "/services",
  "/dynamic-solutions-suite.php": "/services/dynamic-solutions-suite",
  "/elite-accounting-solutions.php": "/services/elite-accounting-solutions",
  "/spectrum-of-taxes.php": "/services/spectrum-of-taxes",
  "/audit-excellence.php": "/services/audit-excellence",
  "/professional-hiring.php": "/services/dedicated-offshore-professionals",
  "/industries-we-serve.php": "/industries",
  "/manufacturing.php": "/industries/manufacturing",
  "/it-software-tech-services.php": "/industries/it-software-tech-services",
  "/hospitality.php": "/industries/hospitality",
  "/qsr-restaurants-food-chains.php": "/industries/qsr-restaurants-food-chains",
  "/e-commerce.php": "/industries/e-commerce",
  "/technology-and-security.php": "/technology-and-security",
  "/faqs.php": "/faqs",
  "/contact.php": "/contact",
  /* No booking tool is carried over; the enquiry form is the booking path. */
  "/book-meeting.php": "/contact",
};

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: supabaseHost
      ? [{ protocol: "https", hostname: supabaseHost, pathname: "/storage/v1/object/public/**" }]
      : [],
  },
  async redirects() {
    /*
      See the note on legacyRoutes — that map stays off while the old site
      remains live at its own domain.

      This one is ours, though. "Professional Hiring" was renamed to
      "Dedicated Offshore Accounting Professionals" on the 24 August brief and
      the slug moved with it. Anything already pointing at the old path — a
      draft email, a bookmark, a preview URL shared with the client — keeps
      working.
    */
    return [
      {
        source: "/services/professional-hiring",
        destination: "/services/dedicated-offshore-professionals",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          /*
            HSTS is deliberately absent. It is a host-level decision with a
            long, hard-to-reverse tail, and setting it from the app would apply
            it to preview domains too. Set it at the CDN once the production
            domain is confirmed to serve HTTPS everywhere.
          */
        ],
      },
    ];
  },
};

export default nextConfig;
