import { RevealGroup, RevealItem } from "@/components/Reveal";
import SectionHeading from "@/components/SectionHeading";
import { workflow } from "@/lib/content";

/**
 * The engagement process, five steps.
 *
 * Each step now carries an elapsed-time label. "How long until this is actually
 * working?" is the question behind the question on every discovery call, and a
 * process diagram that does not answer it is decoration.
 *
 * The connecting rule is drawn behind the markers and stops at the last step —
 * running it to the edge implies a sixth stage. Hidden below lg, where the
 * cards stack and a horizontal line would have nothing to connect.
 */
export default function Workflow() {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionHeading
          eyebrow={workflow.eyebrow}
          title="Five Steps From First Call to"
          accent="Steady-State Delivery"
          lead={workflow.lead}
          align="center"
        />

        <div className="relative mt-16">
          <div
            className="absolute left-[10%] right-[10%] top-7 hidden h-px lg:block"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(var(--brand) / 0.25), hsl(var(--accent) / 0.45), hsl(var(--brand) / 0.25))",
            }}
            aria-hidden="true"
          />

          <RevealGroup className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-4">
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
