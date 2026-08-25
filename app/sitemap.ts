import type { MetadataRoute } from "next";
import { industrySlugs } from "@/lib/industries-data";
import { getPosts } from "@/lib/posts";
import { serviceSlugs } from "@/lib/services-data";
import { features, site } from "@/lib/site";

/**
 * Sitemap.
 *
 * Routes are derived from the same data files the pages and the navigation
 * render from, so a service added to services-data.ts is in the sitemap without
 * anyone remembering to add it — and a service removed cannot linger here
 * pointing at a 404.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: { path: string; priority: number; freq: "weekly" | "monthly" | "yearly" }[] = [
    { path: "", priority: 1, freq: "weekly" },
    { path: "/about", priority: 0.8, freq: "monthly" },
    { path: "/team", priority: 0.7, freq: "monthly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    /* High priority: it is what the top nav points at, and it carries the role
       vocabulary the client's outreach uses. */
    { path: "/accounting-roles", priority: 0.9, freq: "monthly" },
    /* Dropped from 0.8 when industries left the top nav — the pages stay, but
       they are no longer a primary entry point. */
    { path: "/industries", priority: 0.6, freq: "monthly" },
    { path: "/technology-and-security", priority: 0.7, freq: "monthly" },
    { path: "/faqs", priority: 0.6, freq: "monthly" },
    { path: "/contact", priority: 0.9, freq: "monthly" },
    { path: "/privacy-policy", priority: 0.2, freq: "yearly" },
  ];

  const routes: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified: now,
    changeFrequency: route.freq,
    priority: route.priority,
  }));

  for (const slug of serviceSlugs) {
    routes.push({
      url: `${site.url}/services/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.85,
    });
  }

  for (const slug of industrySlugs) {
    routes.push({
      url: `${site.url}/industries/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.75,
    });
  }

  if (features.insights) {
    routes.push({
      url: `${site.url}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });

    const posts = await getPosts();
    for (const post of posts) {
      routes.push({
        url: `${site.url}/blog/${post.slug}`,
        lastModified: new Date(post.updated_at),
        changeFrequency: "monthly",
        priority: 0.6,
      });
    }
  }

  return routes;
}
