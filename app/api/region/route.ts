import { NextResponse, type NextRequest } from "next/server";

/**
 * The visitor's country, for the header's country switch.
 *
 * Vercel resolves every request's country from its IP address and passes it
 * in the `x-vercel-ip-country` header. This route only reads that header and
 * hands it back. Nothing is stored, logged or set as a cookie, which keeps the
 * privacy policy's "no cookies for public visitors" true.
 *
 * Why a route and not the middleware: the middleware runs only for /admin and
 * /contact, and it calls Supabase. Widening it to every page would put a
 * Supabase round trip in front of every public page view.
 *
 * Off Vercel (local development, any other host) the header is absent and
 * this returns null; the client then falls back to the browser's time zone.
 * See `detectRegion` in components/RegionSwitcher.tsx.
 */
export const dynamic = "force-dynamic";

export function GET(request: NextRequest) {
  const raw = request.headers.get("x-vercel-ip-country");
  const country = raw && /^[A-Za-z]{2}$/.test(raw) ? raw.toUpperCase() : null;

  return NextResponse.json(
    { country },
    /* Varies per visitor, so never cached by the CDN or shared. */
    { headers: { "Cache-Control": "private, no-store" } }
  );
}
