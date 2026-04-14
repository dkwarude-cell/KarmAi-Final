-- Run this code in your Supabase SQL Editor to automatically create a Profile when a User signs up!
-- This bridges the gap between Authentication and your App Data.

-- 1. Create a function that handles the insertion
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

-- 2. Create the trigger that calls the function every time a signup happens
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
