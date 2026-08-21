import Image from "next/image";
import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { softwareFlat, softwareStack, technologyTeaser, type SoftwareTool } from "@/lib/content";
import { cn } from "@/lib/utils";

/**
 * Platform proficiency.
 *
 * Tiles carry the vendor logo where the client has one, and the product name
 * set as a wordmark where they do not. That mix is deliberate rather than a
 * half-finished state: the client's own library covers ten of the platforms on
 * this list and none of the remaining thirteen, and a row that silently drops
 * Drake, Lacerte and CCH Axcess would be a worse answer for a U.S. CPA firm
 * than a row where three tiles are typeset. Every tile is the same size and
 * plate, so the row still reads as one set.
 *
 * Logos are normalised to a common optical weight by
 * scripts/build-software-logos.js — the raw files range from 300x300 squares
 * with a floating mark to 179px JPEGs, and dropping those in unprocessed gives
 * a row where every logo is a different size.
 *
 * Two presentations from one data source:
 *   `marquee` — the homepage strip, scanned rather than read.
 *   `grouped` — the technology page, where the categories are the argument: a
 *               firm needs to see its tax stack listed, not just its GL.
 */

/** One tile. Logo if there is one, wordmark if there is not. */
function Tool({ tool, className }: { tool: SoftwareTool; className?: string }) {
  return (
    <span
      className={cn(
        "flex h-16 shrink-0 items-center justify-center rounded-xl border border-border bg-white px-7 transition-colors",
        className
      )}
    >
      {tool.logo ? (
        <Image
          src={tool.logo}
          alt={tool.name}
          width={220}
          height={80}
          /*
            Height-constrained, not width-constrained. The set mixes wide
            wordmarks (Sage, Workiva) with square badges (Xero, UltraTax);
            matching on height is what makes them read as one row, and the
            max-width only stops the widest from crowding its neighbour.
          */
          className="h-9 w-auto max-w-[8rem] object-contain"
        />
      ) : (
        <span className="whitespace-nowrap font-display text-[15px] font-bold text-navy-deep/70">
          {tool.name}
        </span>
      )}
    </span>
  );
}

export default function Software({
  variant = "marquee",
}: {
  variant?: "marquee" | "grouped";
}) {
  if (variant === "grouped") {
    return (
      <section className="section bg-white">
        <div className="container">
          <SectionHeading
            eyebrow={technologyTeaser.eyebrow}
            title="We Adapt to Your Stack."
            accent="You Change Nothing."
            lead={technologyTeaser.body}
            align="center"
          />

          <RevealGroup className="mt-14 grid gap-5 sm:grid-cols-2">
            {Object.entries(softwareStack).map(([category, tools]) => (
              <RevealItem
                key={category}
                className="rounded-xl border border-border bg-slate-50 p-7 transition-colors hover:border-accent/50"
              >
                <h3 className="text-[12px] font-bold uppercase tracking-[0.16em] text-brand">
                  {category}
                </h3>
                <ul className="mt-5 flex flex-wrap gap-2.5">
                  {tools.map((tool) => (
                    <li key={tool.name}>
                      <Tool tool={tool} className="h-14 px-5" />
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal className="mt-8">
            <p className="text-center text-[13.5px] text-ink-muted">
              Running something not listed? Say so on the call — the list is what we are
              asked for most, not the limit of what we work in.
            </p>
          </Reveal>
        </div>
      </section>
    );
  }

  const half = Math.ceil(softwareFlat.length / 2);
  const rows = [softwareFlat.slice(0, half), softwareFlat.slice(half)];

  return (
    <section className="section-tight overflow-hidden bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={technologyTeaser.eyebrow}
          title="We Adapt to Your Stack."
          accent="You Change Nothing."
          lead={technologyTeaser.body}
          align="center"
        />
      </div>

      <Reveal className="mt-12 space-y-4">
        {rows.map((row, i) => (
          <div key={i} className="mask-fade-x pause-on-hover flex overflow-hidden">
            <div
              className={`flex shrink-0 gap-4 pr-4 ${
                i === 0 ? "animate-marquee" : "animate-marquee-reverse"
              }`}
            >
              {/*
                Three copies. The keyframe translates -50%, so two copies loop
                correctly but on a wide screen the strip runs out before the
                cycle does; three overfill any viewport we support and -50%
                still lands on a copy boundary.
              */}
              {[...row, ...row, ...row].map((tool, j) => (
                <Tool
                  key={`${tool.name}-${j}`}
                  tool={tool}
                  className="hover:border-brand/30"
                />
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
