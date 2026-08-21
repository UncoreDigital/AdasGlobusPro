import { createClient } from "@/lib/supabase/server";
import type { Post } from "@/lib/supabase/types";

/**
 * Published-content reads for the Insights blog.
 *
 * Every query here filters on the published state explicitly even though RLS
 * already does for anonymous readers. That redundancy is deliberate: an admin
 * session hitting the public route would otherwise be served drafts through
 * their own authenticated policy, and see a page no visitor can see.
 */

const PUBLISHED = "status.eq.published";

function publishedFilter<T extends { eq: Function; not: Function; lte: Function }>(query: T) {
  return (query as any)
    .eq("status", "published")
    .not("published_at", "is", null)
    .lte("published_at", new Date().toISOString());
}

export async function getPosts(limit?: number): Promise<Post[]> {
  const supabase = createClient();
  if (!supabase) return [];

  let query = supabase.from("posts").select("*");
  query = publishedFilter(query).order("published_at", { ascending: false });
  if (limit) query = query.limit(limit);

  const { data, error } = await query;
  if (error || !data) return [];
  return data as Post[];
}

export async function getPost(slug: string): Promise<Post | null> {
  const supabase = createClient();
  if (!supabase) return null;

  const { data, error } = await publishedFilter(
    supabase.from("posts").select("*").eq("slug", slug)
  ).maybeSingle();

  if (error || !data) return null;
  return data as Post;
}

export async function getPostSlugs(): Promise<string[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data, error } = await publishedFilter(supabase.from("posts").select("slug"));
  if (error || !data) return [];
  return (data as { slug: string }[]).map((p) => p.slug);
}

/** Related posts: same category first, most recent, excluding the current one. */
export async function getRelatedPosts(post: Post, limit = 3): Promise<Post[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const { data } = await publishedFilter(
    supabase.from("posts").select("*").neq("id", post.id).eq("category", post.category)
  )
    .order("published_at", { ascending: false })
    .limit(limit);

  const sameCategory = (data as Post[] | null) ?? [];
  if (sameCategory.length >= limit) return sameCategory;

  /* Top up from anywhere when the category is thin. */
  const { data: rest } = await publishedFilter(
    supabase
      .from("posts")
      .select("*")
      .neq("id", post.id)
      .not("id", "in", `(${sameCategory.map((p) => p.id).join(",") || "null"})`)
  )
    .order("published_at", { ascending: false })
    .limit(limit - sameCategory.length);

  return [...sameCategory, ...((rest as Post[] | null) ?? [])];
}

export { PUBLISHED };
