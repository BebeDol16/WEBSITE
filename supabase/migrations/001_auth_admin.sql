-- ELITE Mobile: authentification, rôles, audit et politiques RLS.
-- À exécuter dans un projet Supabase après database/schema.sql.

create type public.app_role as enum ('customer', 'editor', 'admin');
create type public.account_status as enum ('active', 'suspended');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  role public.app_role not null default 'customer',
  status public.account_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.audit_logs (
  id bigint generated always as identity primary key,
  actor_id uuid references auth.users(id) on delete set null,
  action text not null,
  target_id uuid,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

alter table public.orders add column if not exists user_id uuid references auth.users(id) on delete set null;
create index if not exists profiles_role_status_idx on public.profiles(role, status);
create index if not exists orders_user_id_idx on public.orders(user_id);
create index if not exists audit_logs_actor_id_idx on public.audit_logs(actor_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

create schema if not exists private;

create or replace function private.is_active_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role = 'admin' and status = 'active'
  );
$$;

create or replace function private.is_active_editor()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1 from public.profiles
    where id = (select auth.uid()) and role in ('admin', 'editor') and status = 'active'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, coalesce(new.raw_user_meta_data ->> 'full_name', ''));
  return new;
end;
$$;

create trigger on_auth_user_created
after insert on auth.users
for each row execute procedure public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.audit_logs enable row level security;
alter table public.orders enable row level security;
alter table public.products enable row level security;

revoke all on public.profiles, public.audit_logs, public.orders from anon, authenticated;
grant select on public.profiles to authenticated;
grant update (full_name) on public.profiles to authenticated;
grant select, insert on public.orders to authenticated;
grant select on public.audit_logs to authenticated;
grant select on public.products to anon, authenticated;
grant insert, update, delete on public.products to authenticated;

create policy profiles_select_own_or_admin on public.profiles
for select to authenticated
using ((select auth.uid()) = id or (select private.is_active_admin()));

create policy profiles_update_own on public.profiles
for update to authenticated
using ((select auth.uid()) = id and status = 'active')
with check ((select auth.uid()) = id);

create policy audit_admin_select on public.audit_logs
for select to authenticated
using ((select private.is_active_admin()));

create policy orders_select_own_or_admin on public.orders
for select to authenticated
using (user_id = (select auth.uid()) or (select private.is_active_admin()));

create policy orders_insert_own on public.orders
for insert to authenticated
with check (user_id = (select auth.uid()));

create policy products_public_read on public.products
for select to anon, authenticated
using (active = true or (select private.is_active_editor()));

create policy products_editor_insert on public.products
for insert to authenticated
with check ((select private.is_active_editor()));

create policy products_editor_update on public.products
for update to authenticated
using ((select private.is_active_editor()))
with check ((select private.is_active_editor()));

create policy products_admin_delete on public.products
for delete to authenticated
using ((select private.is_active_admin()));

-- Après la création de votre premier compte, exécutez UNE FOIS dans l’éditeur SQL :
-- update public.profiles set role = 'admin' where email = 'votre-adresse@example.com';

