-- ============================================================================
-- STEP 4 - what came back. Run about 20 seconds after step 3. Read-only.
-- ============================================================================
select id,
       status_code,
       timed_out,
       error_msg,
       left(content, 300) as response_body,
       created
from net._http_response
order by created desc
limit 5;

-- ---------------------------------------------------------------------------
--   200   Delivered. The mail is sent - check the inbox and the spam folder of
--         whatever NOTIFICATION_EMAIL points at.
--
--   401   The call arrived and the secrets disagree. Delete the Vault secret
--         and re-run step 2 to regenerate both sides:
--           delete from vault.secrets where name = 'lead_notification_secret';
--
--   500   The function ran and threw; response_body carries the message.
--         "Missing secrets" means SMTP_HOST / SMTP_USER / SMTP_PASS /
--         NOTIFICATION_EMAIL are not all set. For Gmail, SMTP_PASS must be a
--         16-character app password - the account password is always rejected.
--
--   timed_out = true
--         The function was still invoked; read its logs before assuming the
--         mail failed.
--
--   no new row
--         Nothing left the database. Check the queue:
--           select count(*) from net.http_request_queue;
--         Above zero and not draining within a minute is a stalled pg_net
--         worker - restart it and redo step 3:
--           select net.worker_restart();
--         Zero, with the trigger installed and the secret present, means the
--         trigger never fired; confirm step 3's row actually committed.
--
-- net._http_response is pruned after a few hours, so an empty table on its own
-- is not evidence of anything.
-- ---------------------------------------------------------------------------
