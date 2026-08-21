"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, Loader2, Save } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { createClient } from "@/lib/supabase/client";
import type { SiteSetting } from "@/lib/supabase/types";

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

    setState("saved");
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
              ? "These appear on the homepage and the about page. Leave a field empty and the site shows an em dash rather than a zero."
              : "Shown in the top bar, the footer and on the contact page."}
          </p>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {items.map((setting) => (
              <div key={setting.key} className={setting.key === "address" ? "sm:col-span-2" : ""}>
                <label
                  htmlFor={setting.key}
                  className="mb-2 block text-[13px] font-semibold text-navy-deep"
                >
                  {setting.label}
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

        {state === "saved" && (
          <p className="flex items-center gap-2 text-[13.5px] font-semibold text-emerald">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            Saved. Live within five minutes.
          </p>
        )}
        {state === "idle" && dirty.length === 0 && (
          <p className="text-[13px] text-slate-400">No unsaved changes.</p>
        )}
      </div>
    </div>
  );
}
