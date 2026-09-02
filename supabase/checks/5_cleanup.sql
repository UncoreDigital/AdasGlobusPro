-- ============================================================================
-- STEP 5 - remove the self-test leads, once delivery is confirmed working.
-- ============================================================================
delete from public.leads where email = 'selftest@adasglobuspro.com';

select count(*) as remaining_test_rows
from public.leads
where email = 'selftest@adasglobuspro.com';
