import { createClient } from "@/lib/supabase/server";
import type { SiteSetting } from "@/lib/supabase/types";

/**
 * Headline figures and contact details, read from Supabase `site_settings`.
 *
 * These live in the database rather than in content.ts because they are the
 * values most likely to change without a developer present — client counts,
 * transaction volumes, a new office phone number. The admin edits one row and
 * every surface that prints the figure updates together.
 *
 * This is also a correctness guard. The live site prints "1,150+" on the
 * homepage, "1,000+ projects" on the about page and "1150+" in the stats band;
 * once those are three hard-coded strings in three page files, they drift. Here
 * there is exactly one of each.
 */

export type Settings = Record<string, string | null>;

/** Fallbacks used when Supabase is unreachable or a row is missing. */
const FALLBACK: Settings = {
  clients: "1,150+",
  accuracy: "99%+",
  countries: "6",
  employees: "120+",
  projects: "1,000+",
  transactions: "50,000+",
  experience: "15+",
  phone: null,
  address: null,
};

export async function getSettings(): Promise<Settings> {
  const supabase = createClient();
  if (!supabase) return FALLBACK;

  const { data, error } = await supabase
    .from("site_settings")
    .select("key, value")
    .order("sort_order");

  if (error || !data) return FALLBACK;

  const settings: Settings = { ...FALLBACK };
  for (const row of data as Pick<SiteSetting, "key" | "value">[]) {
    /*
      An empty string is a deliberate "clear this figure" from the admin, so it
      overrides the fallback and renders as an em dash. Only a genuinely absent
      row keeps the fallback.
    */
    if (row.value !== null) settings[row.key] = row.value;
  }
  return settings;
}

/**
 * Renders a figure for display.
 *
 * Never coerces: `Number("")` is 0 and that would print "0+" where the client
 * meant "we have not confirmed this yet". Non-numeric values the admin types
 * ("TBC", "**") are echoed back verbatim.
 */
export function figure(value: string | null | undefined) {
  if (value === null || value === undefined || value.trim() === "") return "—";
  return value;
}

/**
 * Splits a figure into its numeric part and its suffix, so CountUp can animate
 * the number while the "+" or "%" stays put. Returns null for anything that
 * does not start with digits — "TBC" must render as text, not animate from 0.
 */
export function splitFigure(value: string | null | undefined) {
  if (!value) return null;
  const match = value.trim().match(/^([\d,]+(?:\.\d+)?)\s*(.*)$/);
  if (!match) return null;
  const numeric = Number(match[1].replace(/,/g, ""));
  if (Number.isNaN(numeric)) return null;
  return { value: numeric, suffix: match[2] ?? "", raw: value.trim() };
}
