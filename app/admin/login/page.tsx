import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/brand/Logo";
import LoginForm from "@/components/admin/LoginForm";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-deep px-5 py-16">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-deep/80" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative w-full max-w-md">
        <Link href="/" className="flex justify-center" aria-label="ADAS Globus Pro home">
          <Logo size="lg" tone="dark" />
        </Link>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white p-8 shadow-lift">
          <h1 className="text-xl font-extrabold text-navy-deep">Admin sign in</h1>
          <p className="mt-2 text-[13.5px] text-ink-muted">
            Manage leads, insights and site settings.
          </p>

          <div className="mt-7">
            {/*
              useSearchParams inside LoginForm opts the tree into client-side
              rendering; the boundary keeps the rest of the page static instead
              of failing the build.
            */}
            <Suspense fallback={<div className="h-72" />}>
              <LoginForm />
            </Suspense>
          </div>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-[13px] text-white/45 transition-colors hover:text-accent-light"
        >
          ← Back to the site
        </Link>
      </div>
    </div>
  );
}
