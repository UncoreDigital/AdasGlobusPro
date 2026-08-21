"use client";

import { useMemo, useState } from "react";
import {
  Building2,
  ChevronDown,
  Download,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Search,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import StatusPill, { LEAD_STATUSES } from "@/components/admin/StatusPill";
import { createClient } from "@/lib/supabase/client";
import type { Lead, LeadStatus } from "@/lib/supabase/types";
import { formatDate } from "@/lib/utils";
import { cn } from "@/lib/utils";

/**
 * Lead inbox.
 *
 * Rows expand in place rather than opening a detail route: the message is the
 * only field that needs room, and a full page per lead would mean a round trip
 * to read two sentences and set a status.
 *
 * Status changes are optimistic and roll back on failure — the admin is
 * triaging a list, and a spinner per row would make that unusable.
 */
export default function LeadsTable({ initialLeads }: { initialLeads: Lead[] }) {
  const [leads, setLeads] = useState(initialLeads);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<LeadStatus | "all">("all");
  const [expanded, setExpanded] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return leads.filter((lead) => {
      if (filter !== "all" && lead.status !== filter) return false;
      if (!q) return true;
      return [lead.name, lead.email, lead.company, lead.message, lead.state]
        .filter(Boolean)
        .some((field) => String(field).toLowerCase().includes(q));
    });
  }, [leads, query, filter]);

  const counts = useMemo(() => {
    const map: Record<string, number> = { all: leads.length };
    for (const status of LEAD_STATUSES) {
      map[status] = leads.filter((l) => l.status === status).length;
    }
    return map;
  }, [leads]);

  async function updateStatus(id: string, status: LeadStatus) {
    const previous = leads;
    setLeads((current) => current.map((l) => (l.id === id ? { ...l, status } : l)));
    setBusy(id);

    const { error } = await createClient().from("leads").update({ status }).eq("id", id);

    setBusy(null);
    if (error) {
      setLeads(previous);
      alert("Could not update that lead. Please try again.");
    }
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead permanently? This cannot be undone.")) return;

    const previous = leads;
    setLeads((current) => current.filter((l) => l.id !== id));
    setBusy(id);

    const { error } = await createClient().from("leads").delete().eq("id", id);

    setBusy(null);
    if (error) {
      setLeads(previous);
      alert("Could not delete that lead. Please try again.");
    }
  }

  /**
   * CSV export of what is currently filtered, not the whole table — the admin
   * has just narrowed to what they want; exporting everything ignores that.
   *
   * Every field is quoted and internal quotes doubled: a message containing a
   * comma or a line break would otherwise shift every subsequent column.
   */
  function exportCsv() {
    const headers = [
      "Date",
      "Name",
      "Email",
      "Company",
      "Phone",
      "State",
      "Services",
      "Message",
      "Status",
      "Source page",
    ];
    const escape = (value: unknown) => `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((lead) =>
      [
        formatDate(lead.created_at),
        lead.name,
        lead.email,
        lead.company,
        lead.phone,
        lead.state,
        (lead.services ?? []).join("; "),
        lead.message,
        lead.status,
        lead.source_page,
      ]
        .map(escape)
        .join(",")
    );

    const blob = new Blob([[headers.map(escape).join(","), ...rows].join("\r\n")], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `adasglobus-leads-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search name, email, company, message…"
            aria-label="Search leads"
            className="h-11 w-full rounded-lg border border-input bg-white pl-10 pr-4 text-[14px] transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
          />
        </div>

        <button
          type="button"
          onClick={exportCsv}
          disabled={filtered.length === 0}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-lg border border-border bg-white px-4 text-[13.5px] font-semibold text-navy-deep transition-colors hover:border-brand hover:text-brand disabled:opacity-50"
        >
          <Download className="h-4 w-4" aria-hidden="true" />
          Export CSV ({filtered.length})
        </button>
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {(["all", ...LEAD_STATUSES] as const).map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setFilter(status)}
            aria-pressed={filter === status}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-[12.5px] font-semibold capitalize transition-colors",
              filter === status
                ? "border-navy-deep bg-navy-deep text-white"
                : "border-border bg-white text-ink-muted hover:border-brand/40 hover:text-navy-deep"
            )}
          >
            {status} <span className="ml-1 opacity-60">{counts[status] ?? 0}</span>
          </button>
        ))}
      </div>

      <div className="mt-5 overflow-hidden rounded-xl border border-border bg-white">
        {filtered.length === 0 ? (
          <p className="p-12 text-center text-[14px] text-ink-muted">
            {leads.length === 0
              ? "No enquiries yet. They will appear here as soon as the contact form is used."
              : "Nothing matches that filter."}
          </p>
        ) : (
          <ul className="divide-y divide-border">
            {filtered.map((lead) => {
              const isOpen = expanded === lead.id;
              return (
                <li key={lead.id} className={cn(busy === lead.id && "opacity-60")}>
                  <div className="flex flex-wrap items-start gap-4 px-5 py-4 sm:px-6">
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : lead.id)}
                      aria-expanded={isOpen}
                      className="flex min-w-0 flex-1 items-start gap-3 text-left"
                    >
                      <ChevronDown
                        className={cn(
                          "mt-1 h-4 w-4 shrink-0 text-slate-400 transition-transform",
                          isOpen && "rotate-180"
                        )}
                        aria-hidden="true"
                      />
                      <div className="min-w-0">
                        <p className="truncate text-[14.5px] font-semibold text-navy-deep">
                          {lead.name}
                        </p>
                        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12.5px] text-ink-muted">
                          <span className="inline-flex items-center gap-1.5">
                            <Mail className="h-3 w-3" aria-hidden="true" />
                            {lead.email}
                          </span>
                          {lead.company && (
                            <span className="inline-flex items-center gap-1.5">
                              <Building2 className="h-3 w-3" aria-hidden="true" />
                              {lead.company}
                            </span>
                          )}
                          {lead.state && (
                            <span className="inline-flex items-center gap-1.5">
                              <MapPin className="h-3 w-3" aria-hidden="true" />
                              {lead.state}
                            </span>
                          )}
                        </p>
                      </div>
                    </button>

                    <div className="flex shrink-0 items-center gap-3">
                      <span className="hidden text-[12.5px] text-slate-400 sm:inline">
                        {formatDate(lead.created_at)}
                      </span>

                      <label className="sr-only" htmlFor={`status-${lead.id}`}>
                        Status for {lead.name}
                      </label>
                      <select
                        id={`status-${lead.id}`}
                        value={lead.status}
                        onChange={(e) => updateStatus(lead.id, e.target.value as LeadStatus)}
                        className="h-8 rounded-lg border border-border bg-white px-2 text-[12.5px] font-semibold capitalize text-navy-deep focus:border-brand focus:outline-none"
                      >
                        {LEAD_STATUSES.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>

                      {busy === lead.id ? (
                        <Loader2 className="h-4 w-4 animate-spin text-slate-400" aria-hidden="true" />
                      ) : (
                        <button
                          type="button"
                          onClick={() => remove(lead.id)}
                          aria-label={`Delete lead from ${lead.name}`}
                          className="rounded-md p-1.5 text-slate-400 transition-colors hover:bg-destructive/10 hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {isOpen && (
                    <div className="border-t border-border bg-slate-50 px-5 py-5 sm:px-6">
                      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <Detail label="Phone" icon={Phone}>
                          {lead.phone ? (
                            <a href={`tel:${lead.phone}`} className="text-brand hover:underline">
                              {lead.phone}
                            </a>
                          ) : (
                            "—"
                          )}
                        </Detail>
                        <Detail label="Status">
                          <StatusPill status={lead.status} />
                        </Detail>
                        <Detail label="Source page">{lead.source_page || "—"}</Detail>
                        <Detail label="Received">{formatDate(lead.created_at)}</Detail>
                      </dl>

                      {lead.services?.length > 0 && (
                        <div className="mt-5">
                          <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            Interested in
                          </p>
                          <ul className="mt-2 flex flex-wrap gap-2">
                            {lead.services.map((service) => (
                              <li
                                key={service}
                                className="rounded-full bg-white px-3 py-1 text-[12px] text-navy-deep ring-1 ring-inset ring-border"
                              >
                                {service}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {lead.message && (
                        <div className="mt-5">
                          <p className="text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
                            Message
                          </p>
                          <p className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-4 text-[13.5px] leading-relaxed text-ink-muted ring-1 ring-inset ring-border">
                            {lead.message}
                          </p>
                        </div>
                      )}

                      <a
                        href={`mailto:${lead.email}?subject=${encodeURIComponent(
                          "Re: your enquiry to ADAS Globus"
                        )}`}
                        className="mt-5 inline-flex h-10 items-center gap-2 rounded-lg bg-navy-deep px-4 text-[13.5px] font-semibold text-white transition-colors hover:bg-navy"
                      >
                        <Mail className="h-4 w-4" aria-hidden="true" />
                        Reply by email
                      </a>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}

function Detail({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}) {
  return (
    <div>
      <dt className="flex items-center gap-1.5 text-[11.5px] font-bold uppercase tracking-[0.12em] text-slate-400">
        {Icon && <Icon className="h-3 w-3" aria-hidden />}
        {label}
      </dt>
      <dd className="mt-1.5 break-words text-[13.5px] text-navy-deep">{children}</dd>
    </div>
  );
}
