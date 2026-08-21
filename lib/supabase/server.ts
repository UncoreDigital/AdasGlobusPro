import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "./types";

/**
 * Server client bound to the request's cookies.
 *
 * Returns null rather than throwing when the env is absent: server components
 * that read published content should degrade to an empty state on a
 * misconfigured preview deploy, not 500 the whole page.
 */
export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return null;

  const cookieStore = cookies();

  return createServerClient<Database>(url, key, {
    cookies: {
      get: (name: string) => cookieStore.get(name)?.value,
      /*
        Server components cannot write cookies. The session refresh that would
        need to happen here is done in middleware.ts instead, so these are
        no-ops guarded against the throw Next raises on a write attempt.
      */
      set(name: string, value: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value, ...options });
        } catch {
          /* called from a Server Component — middleware handles the refresh */
        }
      },
      remove(name: string, options: CookieOptions) {
        try {
          cookieStore.set({ name, value: "", ...options });
        } catch {
          /* as above */
        }
      },
    },
  });
}
