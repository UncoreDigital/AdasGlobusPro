import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      /*
        The admin island and the form endpoint have nothing to index.

        One entry, not two. A robots.txt Disallow is a PREFIX match, so
        "/admin" already covers "/admin", "/admin/", "/admin/posts" and
        everything below — the separate "/admin/" line that used to sit here
        matched a strict subset of what the line above it matched and could
        never change the outcome. "/api/" keeps its slash deliberately: the
        trailing slash is what stops it from also matching a future top-level
        route whose name merely starts with "api".
      */
      disallow: ["/admin", "/api/"],
    },
    sitemap: `${site.url}/sitemap.xml`,

    /*
      No `host`. Next.js will happily emit it, and it was set to site.url here,
      but Search Console flags the emitted line as "Rule ignored by Googlebot"
      — correctly, because Google has never supported the directive.

      `Host` was a Yandex extension for declaring the preferred mirror of a
      site. Yandex itself deprecated it in 2018, and it is absent from RFC 9309,
      the robots.txt specification Google authored and parses against. Google
      treats any unrecognised directive as an unknown line and skips it, which
      is exactly what the warning reports.

      Nothing is lost by removing it, because it was never doing the job it
      looked like it was doing. What actually tells Google which host is
      canonical is the <link rel="canonical"> tag — `alternates.canonical` in
      app/layout.tsx, resolved against `metadataBase`, which resolves to
      site.url and so already names www.adasglobuspro.com on every page. The
      apex → www redirect that backs it up is host-level configuration (the
      primary-domain setting on the deployment platform), not anything this
      repo controls — worth confirming there, but it was never robots.txt's
      job either.

      Leaving a directive in place that is guaranteed to be ignored just puts a
      standing warning in the report, where it competes for attention with
      warnings that mean something.
    */
  };
}
