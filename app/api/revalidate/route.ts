import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * On-demand revalidation for everything the admin can edit.
 *
 * Both admin forms write straight to Supabase from the browser, so Next.js has
 * no idea anything changed. Without this the only refresh path was the
 * five-minute ISR window on the marketing layout — and because ISR serves
 * stale-while-revalidate, the first reload after that window still returns the
 * old page and merely schedules the rebuild. Someone who saves, waits,
 * refreshes once and sees no change concludes the CMS is broken, which is
 * exactly what happened with the blog.
 *
 * Callers: components/admin/PostEditor.tsx and components/admin/SettingsForm.tsx.
 *
 * Authorisation is the caller's Supabase session, checked here rather than
 * trusted from middleware: middleware guards /admin, not /api, and an endpoint
 * that dumps the cache on request is worth protecting on its own terms. It is
 * not destructive — the worst an attacker achieves is making us re-render — but
 * unauthenticated cache-busting is still a free denial-of-service lever.
 */

type Scope = "post" | "settings";

export async function POST(request: Request) {
  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase is not configured." }, { status: 503 });
  }

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Not signed in." }, { status: 401 });
  }

  let scope: Scope = "post";
  let slug: string | undefined;
  try {
    const body = await request.json();
    if (body?.scope === "settings" || body?.scope === "post") scope = body.scope;
    if (typeof body?.slug === "string" && body.slug.length <= 200) slug = body.slug;
  } catch {
    /* No body is fine — the default scope still flushes the index paths. */
  }

  const revalidated: string[] = [];
  const flush = (path: string, type?: "page" | "layout") => {
    revalidatePath(path, type);
    revalidated.push(type ? `${path} (${type})` : path);
  };

  if (scope === "settings") {
    /*
      Headline figures appear on three pages, but the phone number is in the
      footer, which lives in the marketing layout and therefore renders into
      every page under it. Flushing the root layout is the only correct answer
      here — revalidating the three figure pages would leave a stale phone
      number on the other twenty.
    */
    flush("/", "layout");
  } else {
    /*
      The index pages always change: a title edit shows on the listing, a new
      post joins it, and the sitemap enumerates published slugs.
    */
    flush("/blog");
    flush("/sitemap.xml");
    if (slug) flush(`/blog/${slug}`);

    /*
      A slug rename leaves the old path prerendered and still serving, so flush
      the whole /blog/[slug] segment as well. This also covers the related-posts
      rail, which renders other posts' titles inside a page whose own slug did
      not change.
    */
    flush("/blog/[slug]", "page");
  }

  return NextResponse.json({ scope, revalidated, at: Date.now() });
}
