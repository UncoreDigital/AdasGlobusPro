/**
 * Normalises an origin supplied through the environment.
 *
 * This exists because a single mistyped environment variable used to take the
 * whole build down, with an error that pointed nowhere near the cause:
 *
 *     TypeError: Invalid URL
 *     > Build error occurred
 *     Error: Failed to collect page data for /_not-found
 *
 * `/_not-found` has nothing to do with it. The real problem is that
 * `metadataBase: new URL(site.url)` in app/layout.tsx throws when the value is
 * not a fully-qualified URL, and pasting a bare host into a Vercel environment
 * variable — `adasglobuspro.vercel.app` rather than `https://adasglobuspro.vercel.app`
 * — is one of the easiest mistakes to make in that UI.
 *
 * So: accept what people actually type. A bare host gets https:// prepended, a
 * trailing slash is dropped, and anything genuinely unparseable falls back to
 * the default with a warning naming the variable, rather than failing the
 * deploy.
 *
 * Deliberately not throwing even in development. A wrong canonical origin is a
 * bad SEO day; a failed deploy on a Friday is worse, and the warning is loud
 * enough to find.
 */
export function normaliseOrigin(
  value: string | undefined,
  fallback: string,
  varName = "NEXT_PUBLIC_SITE_URL"
): string {
  const raw = value?.trim();
  if (!raw) return stripTrailingSlash(fallback);

  /* Bare host, or protocol-relative. Assume https — nothing here should be
     served over http, and Vercel issues certificates for every deployment. */
  const candidate = /^https?:\/\//i.test(raw)
    ? raw
    : `https://${raw.replace(/^\/\//, "")}`;

  try {
    const url = new URL(candidate);
    if (!url.hostname) throw new Error("no hostname");
    return stripTrailingSlash(url.origin);
  } catch {
    console.warn(
      `[config] ${varName} is not a usable URL (received: ${JSON.stringify(raw)}). ` +
        `Falling back to ${fallback}. Set it to a full origin, e.g. https://example.com`
    );
    return stripTrailingSlash(fallback);
  }
}

function stripTrailingSlash(value: string) {
  return value.replace(/\/+$/, "");
}
