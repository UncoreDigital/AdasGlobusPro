-- ============================================================================
-- ADAS Globus Pro — initial schema
-- Run in the Supabase SQL Editor (Dashboard > SQL Editor > New query) against
-- the project referenced by NEXT_PUBLIC_SUPABASE_URL.
--
-- Security model throughout:
--   * anon may INSERT into leads (the public contact form) and may SELECT only
--     published posts and the site_settings the public pages read.
--   * authenticated (the admin) may do everything else.
--   * Nothing client-submitted is ever world-readable. In particular anon has
--     no SELECT on leads at all — a policy that let the public read the lead
--     table would expose every enquiry the firm has ever received.
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- 1. leads — contact form submissions
-- ---------------------------------------------------------------------------
create table if not exists public.leads (
  id            uuid primary key default gen_random_uuid(),
  created_at    timestamptz not null default now(),
  name          text not null,
  email         text not null,
  company       text,
  phone         text,
  state         text,   -- U.S. state; drives nexus and routing questions
  services      text[] not null default '{}',
  message       text,
  source_page   text,
  status        text not null default 'new'
                  check (status in ('new','contacted','qualified','won','lost','archived')),
  notes         text
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx     on public.leads (status);

alter table public.leads enable row level security;

drop policy if exists "leads: public can submit" on public.leads;
create policy "leads: public can submit"
  on public.leads for insert to anon, authenticated with check (true);

drop policy if exists "leads: admin can read" on public.leads;
create policy "leads: admin can read"
  on public.leads for select to authenticated using (true);

drop policy if exists "leads: admin can update" on public.leads;
create policy "leads: admin can update"
  on public.leads for update to authenticated using (true) with check (true);

drop policy if exists "leads: admin can delete" on public.leads;
create policy "leads: admin can delete"
  on public.leads for delete to authenticated using (true);

-- ---------------------------------------------------------------------------
-- 2. posts — the Insights CMS
-- ---------------------------------------------------------------------------
create table if not exists public.posts (
  id               uuid primary key default gen_random_uuid(),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now(),
  slug             text not null unique,
  title            text not null,
  excerpt          text not null default '',
  content          text not null default '',
  category         text not null default 'Insights',
  author           text not null default 'ADAS Globus Pro',
  cover_url        text,
  cover_alt        text,
  meta_title       text,
  meta_description text,
  is_featured      boolean not null default false,
  status           text not null default 'draft' check (status in ('draft','published')),
  published_at     timestamptz
);

create index if not exists posts_status_published_idx
  on public.posts (status, published_at desc);

alter table public.posts enable row level security;

-- Anonymous readers see published posts only — drafts must never leak, and a
-- post scheduled for a future published_at stays hidden until that moment.
drop policy if exists "posts: public reads published" on public.posts;
create policy "posts: public reads published"
  on public.posts for select to anon
  using (status = 'published' and published_at is not null and published_at <= now());

drop policy if exists "posts: admin full read" on public.posts;
create policy "posts: admin full read"
  on public.posts for select to authenticated using (true);

drop policy if exists "posts: admin writes" on public.posts;
create policy "posts: admin writes"
  on public.posts for insert to authenticated with check (true);

drop policy if exists "posts: admin updates" on public.posts;
create policy "posts: admin updates"
  on public.posts for update to authenticated using (true) with check (true);

drop policy if exists "posts: admin deletes" on public.posts;
create policy "posts: admin deletes"
  on public.posts for delete to authenticated using (true);

create or replace function public.touch_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists posts_touch_updated_at on public.posts;
create trigger posts_touch_updated_at
  before update on public.posts
  for each row execute function public.touch_updated_at();

-- ---------------------------------------------------------------------------
-- 3. site_settings — one source of truth for every headline figure
--
-- This table exists to stop the failure mode the previous site was drifting
-- toward: the client count is printed on the homepage hero, in the global
-- presence band and on the about page, and once those are three hard-coded
-- strings in three files they diverge. Every figure on the site reads from
-- exactly one row here.
-- ---------------------------------------------------------------------------
create table if not exists public.site_settings (
  key         text primary key,
  value       text,
  label       text not null,
  group_name  text not null default 'stats',
  sort_order  int  not null default 0,
  updated_at  timestamptz not null default now()
);

alter table public.site_settings enable row level security;

drop policy if exists "settings: public can read" on public.site_settings;
create policy "settings: public can read"
  on public.site_settings for select to anon, authenticated using (true);

drop policy if exists "settings: admin can write" on public.site_settings;
create policy "settings: admin can write"
  on public.site_settings for all to authenticated using (true) with check (true);

drop trigger if exists site_settings_touch_updated_at on public.site_settings;
create trigger site_settings_touch_updated_at
  before update on public.site_settings
  for each row execute function public.touch_updated_at();

-- Seeded with the figures currently published on adasglobus.com. Stored as
-- text, never numeric: "1,150+" and "99%+" are the client's own formatting, and
-- a numeric column would strip the suffix and turn an empty value into 0 —
-- which is how a site ends up advertising "0+ clients served".
insert into public.site_settings (key, value, label, group_name, sort_order) values
  ('clients',      '1,150+',  'Businesses & CPA Firms Served',   'stats',   1),
  ('accuracy',     '99%+',    'Accuracy & On-Time Reporting',    'stats',   2),
  ('countries',    '6',       'Countries With Presence',         'stats',   3),
  ('employees',    '120+',    'Global Employees',                'stats',   4),
  ('projects',     '1,000+',  'Projects Completed',              'stats',   5),
  ('transactions', '50,000+', 'Transactions Processed Monthly',  'stats',   6),
  ('experience',   '15+',     'Years of Combined Expertise',     'stats',   7),
  ('phone',        null,      'Primary Phone Number',            'contact', 1),
  ('address',      null,      'Registered Office Address',       'contact', 2)
on conflict (key) do nothing;

-- ---------------------------------------------------------------------------
-- 4. Storage — public bucket for post images
--
-- World-readable by design (they are published on the blog), admin-writable
-- only. There is deliberately no private bucket in this migration: the site
-- has no public file-upload path, so there is nothing confidential to store.
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'post-media',
  'post-media',
  true,
  10485760,                   -- 10 MB
  array['image/jpeg','image/png','image/webp','image/avif','image/svg+xml']
)
on conflict (id) do update set
  public             = excluded.public,
  file_size_limit    = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "post-media: anyone can read" on storage.objects;
create policy "post-media: anyone can read"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'post-media');

drop policy if exists "post-media: admin can write" on storage.objects;
create policy "post-media: admin can write"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'post-media');

drop policy if exists "post-media: admin can update" on storage.objects;
create policy "post-media: admin can update"
  on storage.objects for update to authenticated
  using (bucket_id = 'post-media');

drop policy if exists "post-media: admin can delete" on storage.objects;
create policy "post-media: admin can delete"
  on storage.objects for delete to authenticated
  using (bucket_id = 'post-media');
