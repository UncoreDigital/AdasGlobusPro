"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { serviceInterests, usStates } from "@/lib/content";
import { contactSchema } from "@/lib/validation";
import { cn } from "@/lib/utils";

type FieldErrors = Partial<Record<string, string>>;

/**
 * The lead form.
 *
 * Validates with the same Zod schema the API route uses, so the two cannot
 * drift. Field errors are shown inline and the first invalid field is focused —
 * a summary at the top of a nine-field form makes the reader hunt.
 *
 * On success the form is replaced rather than cleared: a blank form after
 * submission reads as "that did not go through" and produces duplicates.
 */
export default function ContactForm() {
  const pathname = usePathname();
  const [state, setState] = useState<"idle" | "submitting" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [selected, setSelected] = useState<string[]>([]);

  const toggleService = (value: string) =>
    setSelected((current) =>
      current.includes(value) ? current.filter((s) => s !== value) : [...current, value]
    );

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrors({});
    setFormError(null);

    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      company: String(data.get("company") ?? ""),
      phone: String(data.get("phone") ?? ""),
      state: String(data.get("state") ?? ""),
      services: selected,
      message: String(data.get("message") ?? ""),
      sourcePage: pathname,
      website: String(data.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(payload);
    if (!parsed.success) {
      const fieldErrors: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      const firstKey = Object.keys(fieldErrors)[0];
      form.querySelector<HTMLElement>(`[name="${firstKey}"]`)?.focus();
      return;
    }

    setState("submitting");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }

      setState("sent");
    } catch (error) {
      setState("error");
      setFormError(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again."
      );
    }
  }

  if (state === "sent") {
    return (
      <div className="rounded-2xl border border-emerald/25 bg-emerald/5 p-10 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald/10">
          <CheckCircle2 className="h-7 w-7 text-emerald" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-xl font-bold text-navy-deep">Thank you — we have it.</h2>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-ink-muted">
          A senior member of the advisory team will respond within one business day with a
          proposed engagement structure.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" required error={errors.name} autoComplete="name" />
        <Field
          label="Work email"
          name="email"
          type="email"
          required
          error={errors.email}
          autoComplete="email"
        />
        <Field label="Firm / company" name="company" error={errors.company} autoComplete="organization" />
        <Field label="Phone" name="phone" type="tel" error={errors.phone} autoComplete="tel" />
      </div>

      <div>
        <label htmlFor="state" className="mb-2 block text-[13px] font-semibold text-navy-deep">
          State
        </label>
        <select
          id="state"
          name="state"
          defaultValue=""
          className="h-12 w-full rounded-lg border border-input bg-white px-4 text-[14.5px] text-ink transition-colors focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        >
          <option value="">Select a state</option>
          {usStates.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
          <option value="Multiple states">Multiple states</option>
          <option value="Outside the U.S.">Outside the U.S.</option>
        </select>
      </div>

      <fieldset>
        <legend className="mb-3 text-[13px] font-semibold text-navy-deep">
          What are you interested in?
        </legend>
        <div className="flex flex-wrap gap-2">
          {serviceInterests.map((service) => {
            const active = selected.includes(service);
            return (
              <button
                key={service}
                type="button"
                onClick={() => toggleService(service)}
                aria-pressed={active}
                className={cn(
                  "rounded-full border px-4 py-2 text-[13px] font-medium transition-all",
                  active
                    ? "border-accent bg-accent/10 text-navy-deep"
                    : "border-border bg-white text-ink-muted hover:border-brand/40 hover:text-navy-deep"
                )}
              >
                {service}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div>
        <label htmlFor="message" className="mb-2 block text-[13px] font-semibold text-navy-deep">
          Tell us about your requirement
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Volumes, software you work in, review protocol, timelines…"
          className="w-full rounded-lg border border-input bg-white px-4 py-3 text-[14.5px] text-ink transition-colors placeholder:text-slate-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
        />
        {errors.message && <FieldError>{errors.message}</FieldError>}
      </div>

      {/* Honeypot. Hidden from sight and from the accessibility tree, and
          excluded from the tab order — a real visitor can never fill it. */}
      <div className="absolute h-0 w-0 overflow-hidden" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {formError && (
        <p className="flex items-start gap-2.5 rounded-lg border border-destructive/25 bg-destructive/5 p-4 text-[13.5px] text-destructive">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          {formError}
        </p>
      )}

      <Button type="submit" size="lg" className="w-full" disabled={state === "submitting"}>
        {state === "submitting" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            Sending…
          </>
        ) : (
          <>
            Schedule a Consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p className="text-center text-[12.5px] leading-relaxed text-slate-400">
        We use your details only to respond to this enquiry. No third-party sharing.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-2 block text-[13px] font-semibold text-navy-deep">
        {label}
        {required && <span className="ml-1 text-accent-dark">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${name}-error` : undefined}
        className={cn(
          "h-12 w-full rounded-lg border bg-white px-4 text-[14.5px] text-ink transition-colors placeholder:text-slate-400 focus:outline-none focus:ring-2",
          error
            ? "border-destructive focus:border-destructive focus:ring-destructive/20"
            : "border-input focus:border-brand focus:ring-brand/20"
        )}
      />
      {error && <FieldError id={`${name}-error`}>{error}</FieldError>}
    </div>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <p id={id} className="mt-1.5 text-[12.5px] text-destructive">
      {children}
    </p>
  );
}
