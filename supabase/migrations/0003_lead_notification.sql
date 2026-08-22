-- ============================================================================
-- ADAS Globus Pro — new-lead email notification
-- Run after 0002_seed_insights.sql. Safe to re-run: everything is idempotent.
--
-- Emails the firm whenever a row lands in public.leads, by calling the
-- lead-notification edge function.
--
-- ORDER OF OPERATIONS — all four steps, or no email arrives:
--
--   1. Pick a shared secret. Any long random string; it is NOT a Supabase key:
--        openssl rand -hex 32
--
--   2. Give it to the function, with the SMTP settings:
--        supabase secrets set WEBHOOK_SECRET=<that string>
--        supabase secrets set SMTP_HOST=smtp.gmail.com SMTP_PORT=465 \
--          SMTP_USER=<sending mailbox> SMTP_PASS=<app password> \
--          NOTIFICATION_EMAIL=<who gets the alert>
--
--   3. Deploy with JWT verification OFF (supabase/config.toml already sets it):
--        supabase functions deploy lead-notification
--
--   4. Give the SAME shared secret to the database, then run this file:
--        select vault.create_secret(
--          '<that same string>', 'lead_notification_secret',
--          'Shared secret sent as x-webhook-secret to lead-notification'
--        );
--
-- WHY A SHARED SECRET RATHER THAN A SUPABASE KEY
-- Supabase's current key format is not accepted in an `Authorization: Bearer`
-- header. The gateway rejects such a call before the function starts, so the
-- failure leaves no trace in the invocation log — it looks like the trigger
-- never fired. A secret in our own header is checked inside the function, so a
-- bad call is logged as a 401 instead of vanishing.
-- ============================================================================

-- pg_net is NOT relocatable: it installs into its own `net` schema. Older
-- projects may have it in `extensions`. The trigger below is written to work
-- either way rather than assuming one of them.
create extension if not exists pg_net;
create extension if not exists supabase_vault with schema vault;

-- ---------------------------------------------------------------------------
-- Dispatcher. Written generically (it reads TG_TABLE_NAME rather than assuming
-- `leads`) so that adding a second notifying table later is one more trigger,
-- not a second copy of this function.
-- ---------------------------------------------------------------------------
create or replace function public.notify_lead_webhook()
returns trigger
language plpgsql
security definer
-- `http_post` is deliberately unqualified in the body: this search_path covers
-- both schemas pg_net can live in.
set search_path = public, net, extensions, vault
as $$
declare
  fn_url      text := 'https://jqadktgckghuwlputhoj.supabase.co/functions/v1/lead-notification';
  hook_secret text;
begin
  select decrypted_secret into hook_secret
  from vault.decrypted_secrets
  where name = 'lead_notification_secret';

  if coalesce(hook_secret, '') = '' then
    -- Loud, because the alternative is leads arriving that nobody is told about.
    raise warning
      'notify_lead_webhook: vault secret "lead_notification_secret" is missing — no notification sent for %',
      TG_TABLE_NAME;
    return NEW;
  end if;

  -- pg_net is asynchronous: this queues the request and returns immediately, so
  -- the INSERT never waits on HTTP and a slow mail server cannot make the
  -- contact form time out. The outcome lands in net._http_response a moment
  -- later, which is the only place delivery failures are visible.
  perform http_post(
    url     := fn_url,
    headers := jsonb_build_object(
                 'Content-Type',     'application/json',
                 'x-webhook-secret', hook_secret
               ),
    body    := jsonb_build_object(
                 'type',   TG_OP,
                 'table',  TG_TABLE_NAME,
                 'schema', TG_TABLE_SCHEMA,
                 'record', to_jsonb(NEW)
               )
  );

  return NEW;
end;
$$;

drop trigger if exists leads_notify on public.leads;
create trigger leads_notify
  after insert on public.leads
  for each row execute function public.notify_lead_webhook();

-- ---------------------------------------------------------------------------
-- Checking it worked
--
--   -- most recent delivery attempts, newest first
--   select id, status_code, created
--   from net._http_response
--   order by created desc
--   limit 5;
--
-- 200  delivered.
-- 401  the Vault secret and WEBHOOK_SECRET do not match.
-- 5xx  the function ran and threw — read the Edge Function logs.
-- no row at all  the trigger did not fire, or pg_net is not installed.
-- ---------------------------------------------------------------------------
