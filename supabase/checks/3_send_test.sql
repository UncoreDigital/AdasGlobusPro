-- ============================================================================
-- STEP 3 - fire one real notification.
--
-- Run this file on its own and let it finish. The commit is the point: pg_net's
-- worker only sends requests from committed rows, so the insert has to land
-- before anything goes out. Then wait about 20 seconds and run
-- 4_test_result.sql.
--
-- Do not run this together with step 4. In one transaction the response cannot
-- exist yet, and it looks like a delivery failure that never happened.
-- ============================================================================
insert into public.leads (name, email, company, message, source_page)
values ('Delivery self-test', 'selftest@adasglobuspro.com', 'Internal',
        'Automated check of the lead-notification chain. Safe to ignore.',
        'supabase/checks/3_send_test.sql');

-- Confirms the row committed and the trigger raised no error. A warning in the
-- editor log pane here means the Vault secret is missing - do step 2.
select id, created_at, email
from public.leads
where email = 'selftest@adasglobuspro.com'
order by created_at desc
limit 1;
