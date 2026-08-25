import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { workflow } from "@/lib/content";

/**
 * The engagement process.
 *
 * Each step carries an elapsed-time label. "How long until this is actually
 * working?" is the question behind the question on every discovery call, and a
 * process diagram that does not answer it is decoration.
 *
 * The connecting rule is drawn behind the markers and stops short of the edges —
 * running it to the edge implies a further stage. Hidden below lg, where the
 * cards stack and a horizontal line would have nothing to connect.
 *
 * Heading and column count both come from the data. The 24 August brief cut the
 * process from five steps to four and this component said "Five Steps From
 * First Call" in hardcoded text above a five-column grid holding four cards —
 * so the copy contradicted the diagram and the diagram had a dangling gap. It
 * cannot drift again: change `workflow.steps` and both follow.
 */

/* Tailwind needs whole class names at build time, so the column count is a
   lookup rather than a template string. */
const COLUMNS: Record<number, string> = {
  3: "lg:grid-cols-3",
  4: "lg:grid-cols-4",
  5: "lg:grid-cols-5",
  6: "lg:grid-cols-6",
};

export default function Workflow() {
  const count = workflow.steps.length;
  const columns = COLUMNS[count] ?? "lg:grid-cols-4";

  /* Half a column at each end, so the rule starts and finishes under a marker
     rather than pointing off into empty space. */
  const inset = `${50 / count}%`;

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={workflow.eyebrow}
          title={workflow.title}
          accent={workflow.accent}
          lead={workflow.lead}
          align="center"
        />

        <div className="relative mt-16">
          <div
            className="absolute top-7 hidden h-px lg:block"
            style={{
              left: inset,
              right: inset,
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--brand) / 0.25), hsl(var(--accent) / 0.45), hsl(var(--brand) / 0.25))",
            }}
            aria-hidden="true"
          />

          <RevealGroup className={`grid gap-10 sm:grid-cols-2 ${columns} lg:gap-4`}>
            {workflow.steps.map((step, i) => (
              <RevealItem key={step.title} className="relative text-center lg:px-2">
                <span
                  className="relative z-10 mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-white font-display text-lg font-extrabold text-white shadow-brand"
                  style={{ backgroundImage: "var(--gradient-brand)" }}
                >
                  {i + 1}
                </span>
                <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.14em] text-accent-dark">
                  {step.duration}
                </p>
                <h3 className="mt-1.5 text-[15.5px] font-bold text-navy-deep">{step.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-[1.7] text-ink-muted">{step.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
