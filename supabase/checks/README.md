# lead-notification — diagnosing "no email, no invocation"

Run these **one file at a time** in the Supabase SQL Editor, in order. They are
separate files rather than one script for two reasons, both of which make a
single combined run report the wrong answer:

* The editor runs a paste as one transaction, so an error anywhere discards
  every result before it — including the report you were after.
* `pg_net` queues each request into a table and its background worker only
  sends rows that have **committed**. The test insert must therefore finish its
  own run before the response can exist. Reading `net._http_response` in the
  same transaction that did the insert always shows nothing, whether or not
  delivery works.

The editor also displays only the last statement's result set per run, so each
file ends with the query whose output matters.

| File | What it does | Writes? |
|---|---|---|
| `1_report.sql` | Says which link in the chain is broken | no |
| `2_sync_secret.sql` | Ensures the Vault secret exists, prints it to copy into `WEBHOOK_SECRET` | yes |
| `3_send_test.sql` | Inserts one test lead, firing the trigger | yes |
| `4_test_result.sql` | Reports what came back — run ~20s after 3 | no |
| `5_cleanup.sql` | Deletes the test leads | yes |
