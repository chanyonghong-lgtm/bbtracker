-- Tot Tracker schema. Run once in Supabase: SQL Editor > New query > paste > Run.
-- Milk is stored inside food entries (type 'solids'), so adding milk tracking needed no schema change.

create table public.profiles (
  id uuid primary key references auth.users on delete cascade,
  display_name text not null
);

create table public.children (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  birthdate date,
  created_at timestamptz not null default now()
);

create table public.entries (
  id uuid primary key default gen_random_uuid(),
  child_id uuid not null references public.children on delete cascade,
  type text not null check (type in ('sleep', 'solids', 'diaper')),
  start_at timestamptz not null,
  end_at timestamptz,
  data jsonb not null default '{}'::jsonb,
  notes text,
  created_by uuid references auth.users default auth.uid(),
  updated_by uuid references auth.users,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index entries_child_start on public.entries (child_id, start_at desc);

-- Create a profile automatically when a user is added
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)));
  return new;
end $$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Row Level Security: any signed-in user is treated as family.
-- IMPORTANT: turn OFF public sign-ups (Authentication > Sign In / Providers > "Allow new users to sign up")
-- and add family members yourself, otherwise strangers could create accounts.
alter table public.profiles enable row level security;
alter table public.children enable row level security;
alter table public.entries  enable row level security;

create policy "family reads profiles" on public.profiles for select to authenticated using (true);
create policy "own profile update"    on public.profiles for update to authenticated using (id = auth.uid());

create policy "family children" on public.children for all to authenticated using (true) with check (true);
create policy "family entries"  on public.entries  for all to authenticated using (true) with check (true);

-- Live sync between family phones
alter publication supabase_realtime add table public.entries;

-- Users added before this script ran have no profile yet: create them
insert into public.profiles (id, display_name)
select id, split_part(email, '@', 1) from auth.users
on conflict (id) do nothing;
