"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import {
  ExternalLink,
  FileText,
  LayoutDashboard,
  LogOut,
  Mail,
  Menu,
  Settings,
  X,
} from "lucide-react";
import Logo from "@/components/brand/Logo";
import { Button } from "@/components/ui/Button";
import { features, site } from "@/lib/site";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard, exact: true },
  { name: "Leads", href: "/admin/leads", icon: Mail },
  ...(features.insights ? [{ name: "Insights", href: "/admin/posts", icon: FileText }] : []),
  { name: "Site Settings", href: "/admin/settings", icon: Settings },
];

export default function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  }

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname.startsWith(href);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {open && (
        <div
          className="fixed inset-0 z-40 bg-navy-deep/50 lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-white/10 bg-navy-deep transition-transform lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex items-start justify-between gap-3 border-b border-white/10 p-5">
          <Link href="/admin" className="min-w-0">
            <Logo size="md" tone="dark" />
            <span className="mt-3 block text-[10.5px] font-bold uppercase tracking-[0.18em] text-white/40">
              Admin Panel
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded p-1 text-white/60 lg:hidden"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3" aria-label="Admin">
          {navItems.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3.5 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-white/10 text-white"
                    : "text-white/55 hover:bg-white/5 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" aria-hidden="true" />
                {item.name}
                {active && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="space-y-3 border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-1 text-xs text-white/50 transition-colors hover:text-accent-light"
          >
            <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
            View live site
          </Link>
          {email && (
            <p className="truncate px-1 text-xs text-white/40" title={email}>
              {email}
            </p>
          )}
          <Button
            variant="onDark"
            size="sm"
            className="w-full justify-start gap-2"
            onClick={signOut}
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            Sign out
          </Button>
          <p className="px-1 text-[11px] text-white/30">
            Built by{" "}
            <a
              href={site.builtBy.url}
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:text-white/60"
            >
              {site.builtBy.name}
            </a>
          </p>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 items-center gap-4 border-b border-border bg-white px-5 lg:hidden">
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="rounded p-1 text-navy-deep"
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
          <Logo size="sm" />
          <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-ink-muted">
            Admin
          </span>
        </header>

        <main className="flex-1 p-5 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
