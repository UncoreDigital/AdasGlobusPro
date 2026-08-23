import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { getIcon } from "@/lib/icons";
import { industries, industriesIntro } from "@/lib/industries-data";

/**
 * The five verticals.
 *
 * Cards lead with the sector photography carried over from the old site — it is
 * already navy-graded, so it sits inside the palette rather than fighting it —
 * and then carry the sector's first two scope lines rather than a generic
 * blurb. "Absorption analysis and idle capacity treatment under ASC 330" tells
 * a manufacturing controller more in eight words than any positioning copy, and
 * that specificity is what separates this from a competitor's identical
 * five-industry grid.
 *
 * Cards use the HD frames, not the 418x536 crops carried over from the old
 * site. Those crops measure 16-27 mean luminance — near black — so they read as
 * dark rectangles whatever the overlay does. The HD set is two to four times
 * brighter and is already shipped for the detail-page banners.
 */
export default function IndustriesGrid({ compact = false }: { compact?: boolean }) {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow="Industries We Serve"
          title="Sector Expertise, Not a"
          accent="Standardised Chart of Accounts"
          lead={compact ? undefined : industriesIntro.body}
          align="center"
        />

        {/*
          Six columns, each card spanning two, so the grid is a 3-up. Five cards
          leave two on the last row; starting the fourth at column 2 centres the
          pair under the three above instead of stranding them at the left edge.
          A plain grid-cols-3 cannot express that half-column offset.
        */}
        <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {industries.map((industry, i) => {
            const Icon = getIcon(industry.icon);
            return (
              <RevealItem
                key={industry.slug}
                className={i === 3 ? "lg:col-span-2 lg:col-start-2" : "lg:col-span-2"}
              >
                <Link
                  href={`/industries/${industry.slug}`}
                  className="card-edge group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift"
                >
                  <div className="relative h-36 overflow-hidden bg-navy-deep">
                    <Image
                      src={industry.imageHd}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 22rem, (min-width: 640px) 45vw, 90vw"
                      quality={82}
                      aria-hidden="true"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-navy-deep/80 via-navy-deep/10 to-transparent"
                      aria-hidden="true"
                    />
                    <span className="absolute bottom-4 left-5 flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-accent-light backdrop-blur transition-colors group-hover:bg-accent group-hover:text-navy-deep">
                      <Icon className="h-4 w-4" aria-hidden="true" />
                    </span>
                    {/*
                      Chipped, like the icon badge at the foot. A bare glyph was
                      fine while the frames were near black; now that they are
                      properly exposed it lands on whatever happens to be in the
                      top-right corner and disappears against the light ones.
                    */}
                    <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-navy-deep/55 backdrop-blur transition-colors group-hover:bg-accent">
                      <ArrowUpRight
                        className="h-4 w-4 text-white transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-navy-deep"
                        aria-hidden="true"
                      />
                    </span>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-[16.5px] font-bold leading-snug text-navy-deep transition-colors group-hover:text-brand">
                      {industry.name}
                    </h3>
                    {industry.qualifier && (
                      <p className="mt-1 text-[12.5px] text-slate-400">{industry.qualifier}</p>
                    )}
                    <p className="mt-3 text-[14px] leading-[1.7] text-ink-muted">
                      {industry.summary}
                    </p>

                    <ul className="mt-auto space-y-2 border-t border-border pt-5">
                      {industry.scope.slice(0, 2).map((line) => (
                        <li
                          key={line}
                          className="flex gap-2.5 text-[12.5px] leading-snug text-slate-600"
                        >
                          <span
                            className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent"
                            aria-hidden="true"
                          />
                          {line}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
