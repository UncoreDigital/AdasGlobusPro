import AdminShell from "@/components/admin/AdminShell";
import { createClient } from "@/lib/supabase/server";

/**
 * Guarded route group.
 *
 * The redirect for an unauthenticated request happens in middleware.ts, before
 * this renders — this layout only reads the session to label the sidebar. It is
 * force-dynamic because a cached admin shell would show one administrator's
 * email to the next.
 */
export const dynamic = "force-dynamic";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const {
    data: { user },
  } = (await supabase?.auth.getUser()) ?? { data: { user: null } };

  return <AdminShell email={user?.email ?? null}>{children}</AdminShell>;
}
