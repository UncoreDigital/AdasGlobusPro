"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { SiteSetting } from "@/lib/supabase/types";

/**
 * Tell the public site to re-render.
 *
 * Failure is deliberately non-fatal: the values are already saved, and the
 * five-minute ISR window still catches up. Reporting "save failed" over a cache
 * miss would be a lie about what happened to the data.
 */
async function revalidatePublicPages() {
  try {
    const res = await fetch("/api/revalidate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ scope: "settings" }),
    });
    return res.ok;
  } catch {
    return false;
  }
}

/*
  Settings that are saved but not rendered anywhere on the public site.

  `address` is one: the site prints each office's address from lib/site.ts,
  which has two of them, and a single "registered office" string has no slot to
  fill. Rather than let the field silently do nothing, it is badged in the form.

  ⚠️ CLIENT DECISION: either tell us where the registered office address should
  appear — footer, contact page, legal line — and it gets wired up, or we drop
  the field. Remove the key from this set the moment it renders somewhere.
*/
const UNUSED_KEYS = new Set(["address"]);

/**
 * Site settings editor.
 *
 * Values are stored and sent as text, never coerced to numbers. The client
 * writes "1,150+" and "99%+"; parsing those to a number and re-formatting would
 * lose the suffix, and an empty box would become 0 — which is how a site ends
 * up advertising "0+ clients served".
 *
 * Writes only the rows that actually changed, so an accidental Save does not
 * bump updated_at on all nine.
 */
export default function SettingsForm({ settings }: { settings: SiteSetting[] }) {
  const router = useRouter();
  const [values, setValues] = useState<Record<string, string>>(
    Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""]))
  );
  const [state, setState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  /** Saved to the database, but the public pages could not be re-rendered. */
  const [stale, setStale] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const initial = Object.fromEntries(settings.map((s) => [s.key, s.value ?? ""]));
  const dirty = settings.filter((s) => values[s.key] !== initial[s.key]);

  const groups = settings.reduce<Record<string, SiteSetting[]>>((acc, setting) => {
    (acc[setting.group_name] ??= []).push(setting);
    return acc;
  }, {});

  async function save() {
    if (dirty.length === 0) return;
    setState("saving");
    setError(null);

    const supabase = createClient();
    const { error: saveError } = await supabase.from("site_settings").upsert(
      dirty.map((setting) => ({
        ...setting,
        /* An empty box means "unconfirmed" and is stored as NULL, which the
           site renders as an em dash rather than as an empty string. */
        value: values[setting.key].trim() === "" ? null : values[setting.key].trim(),
      })),
      { onConflict: "key" }
    );

    if (saveError) {
      setState("error");
      setError(saveError.message);
      return;
    }

    /*
      Same problem the blog had: this form writes straight to Supabase, so
      nothing tells Next.js the figures changed. router.refresh() only refreshes
      this admin page — the public pages would keep serving the old numbers for
      up to five minutes, and the first reload after that would still be stale.
    */
    const fresh = await revalidatePublicPages();
    setState("saved");
    setStale(!fresh);
    router.refresh();
    setTimeout(() => setState("idle"), 2500);
  }

  return (
    <div className="max-w-3xl space-y-8">
      {Object.entries(groups).map(([group, items]) => (
        <section key={group} className="rounded-xl border border-border bg-white p-6 sm:p-8">
          <h2 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
            {group === "stats" ? "Headline figures" : group === "contact" ? "Contact details" : group}
          </h2>
          <p className="mt-2 text-[13.5px] leading-relaxed text-ink-muted">
            {group === "stats"
              ? "These appear on the homepage, the about page and the team page. Leave a field empty and the site shows an em dash rather than a zero."
              : "The phone number replaces the published one in the top bar, the footer and on the contact page. Leave it empty to use the number built into the site."}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {items.map((setting) => (
              <div key={setting.key} className={setting.key === "address" ? "sm:col-span-2" : ""}>
                <label
                  htmlFor={setting.key}
                  className="mb-2 block text-[13px] font-semibold text-navy-deep"
                >
                  {setting.label}
                  {UNUSED_KEYS.has(setting.key) && (
                    <span className="ml-2 rounded bg-amber-100 px-1.5 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-amber-800">
                      Not shown on the site yet
                    </span>
                  )}
                </label>
                <input
                  id={setting.key}
                  value={values[setting.key] ?? ""}
                  onChange={(e) =>
                    setValues((current) => ({ ...current, [setting.key]: e.target.value }))
                  }
                  placeholder="Leave empty to show —"
                  className="h-11 w-full rounded-lg border border-input bg-white px-4 text-[14px] transition-colors placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                />
              </div>
            ))}
          </div>
        </section>
      ))}

      {error && (
        <p
          role="alert"
          className="flex items-start gap-2.5 rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-[13.5px] text-destructive"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}

      <div className="sticky bottom-0 flex items-center gap-4 border-t border-border bg-slate-50/95 py-4 backdrop-blur">
        <Button onClick={save} variant="navy" size="lg" disabled={dirty.length === 0 || state === "saving"}>
          {state === "saving" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
              Saving…
            </>
          ) : (
            <>
              <Save className="h-4 w-4" aria-hidden="true" />
              Save {dirty.length > 0 && `(${dirty.length})`}
            </>
          )}
        </Button>

        {state === "saved" && !stale && (
          <p className="flex items-center gap-2 text-[13.5px] font-semibold text-emerald">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Saved and live
          </p>
        )}
        {state === "saved" && stale && (
          <p className="flex items-start gap-2 text-[12.5px] font-medium text-amber-700">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            Saved. The live pages could not be refreshed just now — they will
            update themselves within five minutes.
          </p>
        )}
        {state === "idle" && dirty.length === 0 && (
          <p className="text-[13px] text-slate-400">No unsaved changes.</p>
        )}
      </div>
    </div>
  );
}
