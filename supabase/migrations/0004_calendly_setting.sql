-- ============================================================================
-- ADAS Globus Pro — Calendly booking link
-- Run after 0003_lead_notification.sql. Safe to re-run.
--
-- Adds the `calendly` row to public.site_settings so the Talk to Us page can
-- offer a "Book a call" action beside the enquiry form.
--
-- WHY A SETTINGS ROW RATHER THAN lib/site.ts
-- A booking URL is exactly the kind of value site_settings exists for: the
-- client changes scheduling tools, or the event slug, without a developer
-- present. Putting it here means they edit one field in the admin and the
-- button updates — no rebuild, no deploy.
--
-- SHIPPED EMPTY, DELIBERATELY. The client asked (2 September) for the Calendly
-- link to be amended, but supplied no URL, and this build never carried one —
-- next.config.mjs redirects the old site's /book-meeting.php to /contact and
-- notes that the enquiry form is the booking path. So the value starts null and
-- the button does not render at all until someone fills it in. An empty string
-- behaves the same way. See app/(marketing)/contact/page.tsx.
--
-- TO TURN IT ON: Admin > Site Settings > Contact > "Calendly Booking Link",
-- or directly:
--   update public.site_settings
--      set value = 'https://calendly.com/<account>/<event>'
--    where key = 'calendly';
-- ============================================================================

insert into public.site_settings (key, value, label, group_name, sort_order)
values ('calendly', null, 'Calendly Booking Link', 'contact', 3)
on conflict (key) do nothing;
