-- ============================================================================
-- STEP 1 - which link in the chain is broken. Read-only.
--
-- Run this file on its own. Every boolean should be true; the first false one
-- is the fault. Interpretation is below the query.
-- ============================================================================
select
  (select count(*) from pg_extension where extname = 'pg_net') > 0
    as pg_net_installed,
  (select count(*) from pg_extension where extname = 'supabase_vault') > 0
    as vault_installed,
  (select count(*)
     from pg_trigger
    where tgname = 'leads_notify'
      and tgrelid = 'public.leads'::regclass
      and not tgisinternal) > 0
    as trigger_installed,
  (select count(*)
     from pg_proc p join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public' and p.proname = 'notify_lead_webhook') > 0
    as trigger_function_exists,
  (select count(*)
     from vault.decrypted_secrets
    where name = 'lead_notification_secret'
      and coalesce(decrypted_secret, '') <> '') > 0
    as vault_secret_present,
  (select count(*) from public.leads)
    as leads_rows,
  (select count(*) from public.leads
    where created_at > now() - interval '1 day')
    as leads_last_24h,
  (select count(*) from net.http_request_queue)
    as requests_queued_unsent,
  (select count(*) from net._http_response
    where created > now() - interval '1 day')
    as delivery_attempts_24h;

-- ---------------------------------------------------------------------------
-- Reading it
--
--   trigger_installed / trigger_function_exists = false
--       0003_lead_notification.sql was never run against this project. Run it,
--       then go to step 3. This is the most common cause of the symptom.
--
--   vault_secret_present = false
--       The trigger exists but returns at its first `if` - it raises a warning
--       and calls nothing. Nothing reaches the function, nothing is logged.
--       That is exactly "no invocation at all". Do step 2.
--
--   pg_net_installed = false
--       Run 0003 (it creates the extension) or enable pg_net under
--       Database > Extensions.
--
--   leads_last_24h = 0
--       The row never landed, so this chain was never involved. Look at the
--       Vercel logs for /api/contact instead.
--
--   requests_queued_unsent above 0 and not draining
--       pg_net's worker is stalled. See step 4.
--
--   delivery_attempts_24h = 0 with leads_last_24h above 0
--       Leads arrived and nothing was ever dispatched - consistent with either
--       of the first two faults above.
-- ---------------------------------------------------------------------------
