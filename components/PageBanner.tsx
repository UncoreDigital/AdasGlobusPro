import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { cn } from "@/lib/utils";

/**
 * Interior page hero.
 *
 * One component for every non-home page so the H1 scale, the breadcrumb and the
 * band height cannot drift between /services/audit-excellence and
 * /industries/hospitality.
 *
 * `image` is optional. Where a page supplies one it sits *behind* the existing
 * brand treatment rather than replacing it.
 *
 * The overlay is a single left-to-right ramp, not a ramp on top of a flat wash.
 * Stacking the two multiplied out to ~99% navy over the copy and ~86% at the
 * far edge, which buried the photograph everywhere — it read as a navy band
 * with a faint texture rather than as photography.
 *
 * The ramp now holds ~0.86 across the left 40% where the heading and lead sit
 * (white on that measures about 5.1:1 even over the brightest frame in the set)
 * and opens to 0.34 at the right, where there is no text and the image can
 * actually be seen. Text sits on `relative z-10` above all of it.
 *
 * `object-right` on the photo is deliberate: every supplied header image places
 * its subject right of centre, and the copy runs down the left, so pinning the
 * crop right keeps the subject visible while the quietest part of the frame
 * sits under the words.
 */
export default function PageBanner({
  eyebrow,
  title,
  qualifier,
  lead,
  chips,
  breadcrumbs = [],
  image,
  imageAlt,
}: {
  eyebrow?: string;
  title: string;
  qualifier?: string;
  lead?: string;
  chips?: readonly string[];
  breadcrumbs?: { name: string; href?: string }[];
  /** Optional header photograph, 3:2. */
  image?: string;
  /**
   * Alt text. Omit for decorative use — the heading already names the subject,
   * and "photo of an accountant at a desk" under an H1 that says the same thing
   * is noise to a screen reader.
   */
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-navy-deep">
      {image && (
        <Image
          src={image}
          alt={imageAlt ?? ""}
          fill
          priority
          sizes="100vw"
          aria-hidden={imageAlt ? undefined : "true"}
          className="object-cover object-right"
        />
      )}

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: image
            ? "linear-gradient(100deg, hsl(var(--navy-deep) / 0.93) 0%, hsl(var(--navy-deep) / 0.86) 40%, hsl(var(--navy-deep) / 0.50) 72%, hsl(var(--navy-deep) / 0.34) 100%)"
            : "var(--gradient-brand)",
        }}
        aria-hidden="true"
      />
      {!image && <div className="absolute inset-0 bg-navy-deep/72" aria-hidden="true" />}
      <div
        className={cn("absolute inset-0 bg-grid", image ? "opacity-[0.18]" : "opacity-40")}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-28 top-0 h-[26rem] w-[26rem] rounded-full opacity-25 blur-[110px]"
        style={{ backgroundImage: "var(--gradient-accent)" }}
        aria-hidden="true"
      />

      <div className="container relative z-10 py-14 md:py-20">
        {breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-white/50">
              <li>
                <Link href="/" className="transition-colors hover:text-accent-light">
                  Home
                </Link>
              </li>
              {breadcrumbs.map((crumb, i) => (
                <li key={crumb.name} className="flex items-center gap-1.5">
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                  {crumb.href && i < breadcrumbs.length - 1 ? (
                    <Link href={crumb.href} className="transition-colors hover:text-accent-light">
                      {crumb.name}
                    </Link>
                  ) : (
                    <span className="text-white/80" aria-current="page">
                      {crumb.name}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        <Reveal className="max-w-3xl">
          {eyebrow && <span className="eyebrow eyebrow-on-dark mb-4">{eyebrow}</span>}
          <h1 className="text-[2rem] font-extrabold leading-[1.12] text-white sm:text-[2.75rem] lg:text-5xl">
            {title}
          </h1>
          {qualifier && (
            <p className="mt-2.5 text-[15px] font-medium text-accent-light">{qualifier}</p>
          )}
          {lead && (
            <p className="mt-5 max-w-2xl text-[15.5px] leading-[1.75] text-white/75">{lead}</p>
          )}

          {chips && chips.length > 0 && (
            <ul className="mt-8 flex flex-wrap gap-2.5">
              {chips.map((chip) => (
                <li
                  key={chip}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[12.5px] font-medium text-white/85 backdrop-blur"
                >
                  {chip}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}
