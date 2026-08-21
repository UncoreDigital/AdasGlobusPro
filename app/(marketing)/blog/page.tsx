import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, CalendarDays, Clock } from "lucide-react";
import PageBanner from "@/components/PageBanner";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import CTA from "@/components/sections/CTA";
import { getPosts } from "@/lib/posts";
import { features } from "@/lib/site";
import { formatDate, readingTime } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Insights — Writing for CPA Firms and Finance Leaders",
  description:
    "Practical writing on offshore accounting, multi-jurisdiction compliance, close cycles and building offshore capacity inside a CPA practice.",
  alternates: { canonical: "/blog" },
};

export default async function BlogPage() {
  if (!features.insights) notFound();

  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageBanner
        eyebrow="Insights"
        title="Writing for CPA Firms and Finance Leaders"
        lead="Notes from inside offshore delivery — what actually changes when capacity moves, and what does not."
        breadcrumbs={[{ name: "Insights" }]}
      />

      <section className="section bg-white">
        <div className="container">
          {posts.length === 0 ? (
            <Reveal className="mx-auto max-w-md rounded-2xl border border-dashed border-border bg-slate-50 p-12 text-center">
              <h2 className="text-lg font-bold text-navy-deep">Nothing published yet</h2>
              <p className="mt-3 text-[14.5px] leading-relaxed text-ink-muted">
                The first pieces are being written. In the meantime, the FAQs cover most of
                what firms ask before engaging us.
              </p>
              <Link
                href="/faqs"
                className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brand hover:text-brand-light"
              >
                Read the FAQs
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Reveal>
          ) : (
            <>
              {/* Lead story */}
              <Reveal>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="card-edge group grid gap-8 overflow-hidden p-6 hover:shadow-lift md:grid-cols-2 md:p-8"
                >
                  <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-slate-100">
                    {featured.cover_url ? (
                      <Image
                        src={featured.cover_url}
                        alt={featured.cover_alt ?? ""}
                        fill
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        priority
                      />
                    ) : (
                      <CoverFallback title={featured.title} />
                    )}
                  </div>

                  <div className="flex flex-col justify-center">
                    <Meta post={featured} />
                    <h2 className="mt-4 text-2xl font-extrabold leading-tight text-navy-deep transition-colors group-hover:text-brand sm:text-3xl">
                      {featured.title}
                    </h2>
                    <p className="mt-4 text-[15px] leading-[1.75] text-ink-muted">
                      {featured.excerpt}
                    </p>
                    <span className="mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-brand">
                      Read the piece
                      <ArrowRight
                        className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>

              {rest.length > 0 && (
                <RevealGroup className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <RevealItem key={post.id}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="card-edge group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
                      >
                        <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                          {post.cover_url ? (
                            <Image
                              src={post.cover_url}
                              alt={post.cover_alt ?? ""}
                              fill
                              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                            />
                          ) : (
                            <CoverFallback title={post.title} />
                          )}
                        </div>
                        <div className="flex flex-1 flex-col p-6">
                          <Meta post={post} />
                          <h2 className="mt-3 text-[17px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
                            {post.title}
                          </h2>
                          <p className="mt-3 flex-1 text-[14px] leading-[1.7] text-ink-muted">
                            {post.excerpt}
                          </p>
                        </div>
                      </Link>
                    </RevealItem>
                  ))}
                </RevealGroup>
              )}
            </>
          )}
        </div>
      </section>

      <CTA />
    </>
  );
}

function Meta({ post }: { post: { category: string; published_at: string | null; content: string } }) {
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[12px] text-ink-muted">
      <span className="rounded-full bg-brand/10 px-2.5 py-1 font-semibold text-brand">
        {post.category}
      </span>
      {post.published_at && (
        <span className="flex items-center gap-1.5">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
          {formatDate(post.published_at)}
        </span>
      )}
      <span className="flex items-center gap-1.5">
        <Clock className="h-3.5 w-3.5" aria-hidden="true" />
        {readingTime(post.content)} min read
      </span>
    </div>
  );
}

/**
 * Placeholder for posts published without a cover.
 *
 * A branded gradient rather than a grey box or a stock photo: it keeps the grid
 * even, and it never implies the post is about whatever the stock image shows.
 */
function CoverFallback({ title }: { title: string }) {
  return (
    <div
      className="flex h-full w-full items-center justify-center p-6"
      style={{ backgroundImage: "var(--gradient-brand)" }}
      aria-hidden="true"
    >
      <span className="line-clamp-3 text-center font-display text-[15px] font-bold leading-snug text-white/85">
        {title}
      </span>
    </div>
  );
}
