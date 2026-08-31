import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import DOMPurify from "isomorphic-dompurify";
import { ArrowLeft, ArrowRight, CalendarDays, Clock, User } from "lucide-react";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { getPost, getPostSlugs, getRelatedPosts } from "@/lib/posts";
import { features, site } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";

export async function generateStaticParams() {
  if (!features.insights) return [];
  const slugs = await getPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return {};

  const title = post.meta_title || post.title;
  const description = post.meta_description || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title,
      description,
      url: `${site.url}/blog/${post.slug}`,
      publishedTime: post.published_at ?? undefined,
      modifiedTime: post.updated_at,
      authors: [post.author],
      images: post.cover_url ? [{ url: post.cover_url }] : undefined,
    },
  };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  if (!features.insights) notFound();

  const post = await getPost(params.slug);
  if (!post) notFound();

  const related = await getRelatedPosts(post);

  /*
    Post bodies are HTML from the admin editor. They are sanitised at render
    rather than only on save: a body that predates a sanitiser change, or one
    written directly into the table, must not be able to inject script into a
    visitor's page.
  */
  const clean = DOMPurify.sanitize(post.content, {
    USE_PROFILES: { html: true },
    ADD_ATTR: ["target", "rel"],
  });

  return (
    <>
      <article>
        <header className="relative overflow-hidden bg-navy-deep">
          <div
            className="absolute inset-0"
            style={{ backgroundImage: "var(--gradient-brand)" }}
            aria-hidden="true"
          />
          <div className="absolute inset-0 bg-navy-deep/75" aria-hidden="true" />
          <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

          <div className="container relative py-14 md:py-20">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-[13px] text-white/60 transition-colors hover:text-accent-light"
            >
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
              All insights
            </Link>

            <Reveal className="mt-6 max-w-3xl">
              <span className="inline-block rounded-full bg-white/10 px-3 py-1 text-[12px] font-semibold text-accent-light">
                {post.category}
              </span>
              <h1 className="mt-5 text-[2rem] font-extrabold leading-[1.15] text-white sm:text-[2.6rem]">
                {post.title}
              </h1>
              {post.excerpt && (
                <p className="mt-5 text-[16px] leading-[1.75] text-white/70">{post.excerpt}</p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-[13px] text-white/55">
                <span className="flex items-center gap-2">
                  <User className="h-3.5 w-3.5" aria-hidden="true" />
                  {post.author}
                </span>
                {post.published_at && (
                  <span className="flex items-center gap-2">
                    <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                    {formatDate(post.published_at)}
                  </span>
                )}
                <span className="flex items-center gap-2">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  {readingTime(post.content)} min read
                </span>
              </div>
            </Reveal>
          </div>
        </header>

        <div className="section bg-white">
          <div className="container">
            <div className="mx-auto max-w-[46rem]">
              {post.cover_url && (
                <Reveal className="relative mb-12 aspect-[16/9] overflow-hidden rounded-2xl bg-slate-100">
                  <Image
                    src={post.cover_url}
                    alt={post.cover_alt ?? ""}
                    fill
                    sizes="(min-width: 768px) 46rem, 100vw"
                    className="object-cover"
                    priority
                  />
                </Reveal>
              )}

              <div className="prose-adas" dangerouslySetInnerHTML={{ __html: clean }} />
            </div>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-tight bg-slate-50">
          <div className="container">
            <h2 className="text-xl font-extrabold text-navy-deep sm:text-2xl">Related reading</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => (
                <Link
                  key={item.id}
                  href={`/blog/${item.slug}`}
                  className="card-edge group flex flex-col p-6 hover:-translate-y-1 hover:shadow-card"
                >
                  <span className="text-[12px] font-semibold text-brand">{item.category}</span>
                  <h3 className="mt-2.5 flex-1 text-[15.5px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
                    {item.title}
                  </h3>
                  <span className="mt-4 flex items-center justify-between gap-3">
                    {item.published_at ? (
                      <span className="text-[12.5px] text-ink-muted">
                        {formatDate(item.published_at)}
                      </span>
                    ) : (
                      <span aria-hidden="true" />
                    )}
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                      Read the piece
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          headline: post.title,
          description: post.meta_description || post.excerpt,
          url: `${site.url}/blog/${post.slug}`,
          datePublished: post.published_at ?? undefined,
          dateModified: post.updated_at,
          author: { "@type": "Organization", name: post.author },
          publisher: { "@id": `${site.url}/#organization` },
          image: post.cover_url ? [post.cover_url] : undefined,
          mainEntityOfPage: { "@type": "WebPage", "@id": `${site.url}/blog/${post.slug}` },
        }}
      />
    </>
  );
}
