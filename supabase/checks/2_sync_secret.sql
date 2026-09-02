-- ============================================================================
-- STEP 2 - make the database and the function agree on the shared secret.
--
-- Run this file on its own, then copy the printed value into
--   Edge Functions > lead-notification > Secrets > WEBHOOK_SECRET
--
-- The value is generated here and read back here, so the two sides cannot
-- drift by a stray space or a truncated paste. If a secret already exists it
-- is left alone and simply printed - this file never invalidates a working
-- setup, so it is safe to re-run.
--
-- gen_random_uuid() is the entropy source because it is core Postgres and
-- needs no extension; two of them give 64 hex characters.
-- ============================================================================
do $repair$
declare
  generated text;
begin
  if exists (select 1 from vault.secrets where name = 'lead_notification_secret') then
    raise notice 'Secret already present - leaving it as is. Copy the value below.';
    return;
  end if;

  generated := replace(gen_random_uuid()::text, '-', '')
            || replace(gen_random_uuid()::text, '-', '');

  perform vault.create_secret(
    generated,
    'lead_notification_secret',
    'Shared secret sent as x-webhook-secret to lead-notification'
  );

  raise notice 'Secret created. Copy the value below into WEBHOOK_SECRET.';
end;
$repair$;

-- Copy this whole value - it is what WEBHOOK_SECRET must be set to.
select decrypted_secret as copy_into_webhook_secret,
       length(decrypted_secret) as length_should_be_64,
       decrypted_secret <> btrim(decrypted_secret) as has_stray_whitespace
from vault.decrypted_secrets
where name = 'lead_notification_secret';

-- If a secret was already present and delivery still returns 401, the two
-- sides disagree and there is no way to tell which one is stale. Delete it and
-- re-run this file to get a fresh pair:
--   delete from vault.secrets where name = 'lead_notification_secret';
