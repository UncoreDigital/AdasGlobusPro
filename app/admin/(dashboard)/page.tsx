import Link from "next/link";
import { ArrowRight, FileText, Mail, Settings, TrendingUp } from "lucide-react";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import StatusPill from "@/components/admin/StatusPill";
import { createClient } from "@/lib/supabase/server";
import { features } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import type { Lead } from "@/lib/supabase/types";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const supabase = createClient();

  if (!supabase) {
    return (
      <>
        <AdminPageHeader title="Dashboard" />
        <NotConfigured />
      </>
    );
  }

  /*
    Counts use head:true so Postgres returns the count without the rows — the
    dashboard needs four numbers, not four full tables.
  */
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

  const [totalLeads, newLeads, recentLeads, publishedPosts, draftPosts, latest] =
    await Promise.all([
      supabase.from("leads").select("*", { count: "exact", head: true }),
      supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
      supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .gte("created_at", sevenDaysAgo),
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "published"),
      supabase.from("posts").select("*", { count: "exact", head: true }).eq("status", "draft"),
      supabase
        .from("leads")
        .select("id, name, email, company, services, status, created_at")
        .order("created_at", { ascending: false })
        .limit(6),
    ]);

  const stats = [
    { label: "Total leads", value: totalLeads.count ?? 0, icon: Mail, href: "/admin/leads" },
    { label: "Unactioned", value: newLeads.count ?? 0, icon: TrendingUp, href: "/admin/leads?status=new", highlight: true },
    { label: "Last 7 days", value: recentLeads.count ?? 0, icon: TrendingUp, href: "/admin/leads" },
    ...(features.insights
      ? [
          {
            label: "Published posts",
            value: publishedPosts.count ?? 0,
            icon: FileText,
            href: "/admin/posts",
          },
        ]
      : []),
  ];

  const rows = (latest.data ?? []) as Pick<
    Lead,
    "id" | "name" | "email" | "company" | "services" | "status" | "created_at"
  >[];

  return (
    <>
      <AdminPageHeader
        title="Dashboard"
        description="Enquiries from the website, and what is waiting on you."
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className={`group rounded-xl border bg-white p-6 transition-all hover:-translate-y-0.5 hover:shadow-card ${
              stat.highlight && stat.value > 0
                ? "border-accent/50 bg-accent/[0.04]"
                : "border-border"
            }`}
          >
            <div className="flex items-start justify-between">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                  stat.highlight && stat.value > 0
                    ? "bg-accent/15 text-accent-dark"
                    : "bg-brand/10 text-brand"
                }`}
              >
                <stat.icon className="h-4 w-4" aria-hidden="true" />
              </span>
              <ArrowRight
                className="h-4 w-4 text-slate-400 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                aria-hidden="true"
              />
            </div>
            <p className="mt-5 font-display text-3xl font-extrabold text-navy-deep">
              {stat.value}
            </p>
            <p className="mt-1 text-[13px] text-ink-muted">{stat.label}</p>
          </Link>
        ))}
      </div>

      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy-deep">Latest enquiries</h2>
          <Link
            href="/admin/leads"
            className="inline-flex items-center gap-1.5 text-[13.5px] font-semibold text-brand hover:text-brand-light"
          >
            View all
            <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl border border-border bg-white">
          {rows.length === 0 ? (
            <p className="p-10 text-center text-[14px] text-ink-muted">
              No enquiries yet. They will appear here as soon as the contact form is used.
            </p>
          ) : (
            <ul className="divide-y divide-border">
              {rows.map((lead) => (
                <li key={lead.id}>
                  <Link
                    href="/admin/leads"
                    className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-slate-50"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-[14.5px] font-semibold text-navy-deep">
                        {lead.name}
                        {lead.company && (
                          <span className="ml-2 font-normal text-ink-muted">
                            · {lead.company}
                          </span>
                        )}
                      </p>
                      <p className="mt-0.5 truncate text-[13px] text-ink-muted">{lead.email}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <StatusPill status={lead.status} />
                      <span className="text-[12.5px] text-slate-400">
                        {formatDate(lead.created_at)}
                      </span>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {features.insights && (draftPosts.count ?? 0) > 0 && (
        <p className="mt-6 flex items-center gap-2.5 rounded-xl border border-border bg-white p-5 text-[13.5px] text-ink-muted">
          <FileText className="h-4 w-4 shrink-0 text-brand" aria-hidden="true" />
          {draftPosts.count} draft {draftPosts.count === 1 ? "post is" : "posts are"} not
          published yet.
          <Link href="/admin/posts" className="font-semibold text-brand hover:text-brand-light">
            Review drafts
          </Link>
        </p>
      )}
    </>
  );
}

function NotConfigured() {
  return (
    <div className="rounded-xl border border-accent/40 bg-accent/5 p-8">
      <h2 className="flex items-center gap-2.5 text-[15px] font-bold text-navy-deep">
        <Settings className="h-4 w-4 text-accent-dark" aria-hidden="true" />
        Supabase is not configured
      </h2>
      <p className="mt-3 max-w-xl text-[13.5px] leading-relaxed text-ink-muted">
        Copy <code className="rounded bg-white px-1.5 py-0.5">.env.example</code> to{" "}
        <code className="rounded bg-white px-1.5 py-0.5">.env.local</code>, fill in the project
        URL and anon key, then run the migration in{" "}
        <code className="rounded bg-white px-1.5 py-0.5">supabase/migrations</code> from the
        Supabase SQL editor.
      </p>
    </div>
  );
}
