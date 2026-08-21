import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { contactSchema } from "@/lib/validation";

/**
 * Lead intake.
 *
 * Re-validates with the same schema the form uses — client-side validation is a
 * convenience for the visitor and no kind of guarantee here.
 *
 * Notification email is not sent from this route. It is fired by a Supabase
 * Database Webhook on insert, so a lead that reaches the table always produces
 * a notification even when it was inserted by something other than this
 * endpoint, and a mail outage can never cost us the row.
 */
export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Please check the form and try again." },
      { status: 400 }
    );
  }

  const { website, sourcePage, ...lead } = parsed.data;

  /*
    Honeypot hit. Returns 200 so the bot records a success and does not retry
    with the field cleared — a 400 here just teaches it what to omit.
  */
  if (website) return NextResponse.json({ ok: true });

  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json(
      { error: "The contact form is not configured yet. Please email us directly." },
      { status: 503 }
    );
  }

  const { error } = await supabase.from("leads").insert({
    name: lead.name,
    email: lead.email,
    company: lead.company || null,
    phone: lead.phone || null,
    state: lead.state || null,
    services: lead.services ?? [],
    message: lead.message || null,
    source_page: sourcePage || null,
  });

  if (error) {
    /* Logged for the server operator; the visitor gets a generic message rather
       than a database error string. */
    console.error("[contact] insert failed:", error.message);
    return NextResponse.json(
      { error: "We could not submit that. Please try again or email us directly." },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
