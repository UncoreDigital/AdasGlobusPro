import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Logo from "@/components/brand/Logo";
import { navItems } from "@/lib/site";

/**
 * Root 404.
 *
 * Standalone rather than inside the marketing layout: a notFound() thrown from
 * an admin route would otherwise render the public header, footer and WhatsApp
 * button around it, which is a confusing place to land from behind a login.
 */
export default function NotFound() {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-navy-deep px-5 py-20 text-center">
      <div
        className="absolute inset-0"
        style={{ backgroundImage: "var(--gradient-brand)" }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-navy-deep/75" aria-hidden="true" />
      <div className="absolute inset-0 bg-grid opacity-40" aria-hidden="true" />

      <div className="relative">
        <Link href="/" className="mx-auto flex w-fit" aria-label="Home">
          <Logo size="lg" tone="dark" />
        </Link>

        <p className="mt-14 font-display text-[5rem] font-extrabold leading-none text-gradient-accent-on-dark sm:text-[7rem]">
          404
        </p>
        <h1 className="mt-4 text-2xl font-extrabold text-white sm:text-3xl">
          That page is not here
        </h1>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65">
          The link may be out of date. The site was recently rebuilt, so a few old
          addresses have moved.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Button href="/" size="lg">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
          <Button href="/contact" size="lg" variant="onDark">
            Schedule a call
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>

        <nav className="mt-14" aria-label="Site sections">
          <p className="text-[12px] font-bold uppercase tracking-[0.16em] text-white/35">
            Or try
          </p>
          <ul className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[13px] text-white/75 transition-colors hover:border-accent/50 hover:text-white"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
