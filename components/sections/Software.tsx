import Reveal, { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { softwareFlat, softwareStack, technologyTeaser } from "@/lib/content";

/**
 * Platform proficiency.
 *
 * Set as wordmarks rather than vendor logos on purpose. Reproducing Intuit,
 * Xero, Sage and Thomson Reuters brand assets is a trademark question the
 * client has not cleared, and a wall of unlicensed logos on a compliance
 * services site is the wrong first impression. Typeset names make the same
 * claim and are the client's own statement of proficiency.
 *
 * Two presentations from one data source:
 *   `marquee` — the homepage strip, scanned rather than read.
 *   `grouped` — the technology page, where the categories are the argument:
 *               a firm needs to see its tax stack listed, not just its GL.
 */
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
                <ul className="mt-5 flex flex-wrap gap-2">
                  {tools.map((tool) => (
                    <li
                      key={tool}
                      className="rounded-lg border border-border bg-white px-3.5 py-2 text-[13.5px] font-medium text-navy-deep"
                    >
                      {tool}
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
              {[...row, ...row, ...row].map((name, j) => (
                <span
                  key={`${name}-${j}`}
                  aria-hidden={j >= row.length}
                  className="flex h-16 shrink-0 items-center whitespace-nowrap rounded-xl border border-border bg-slate-50 px-8 font-display text-[15px] font-bold text-navy-deep/70 transition-colors hover:border-brand/30 hover:text-brand"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        ))}
      </Reveal>
    </section>
  );
}
