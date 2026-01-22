-- ==============================================================================
-- Create Storage Bucket 'admin-assets' and set permissions
-- ==============================================================================

-- 1. Create Bucket
insert into storage.buckets (id, name, public) 
values ('admin-assets', 'admin-assets', true)
on conflict (id) do nothing;

-- 2. Drop existing policies to avoid conflicts
drop policy if exists "Public Access" on storage.objects;
drop policy if exists "Authenticated Upload" on storage.objects;
drop policy if exists "Anon Upload" on storage.objects;

-- 3. Create Policies
-- Allow anyone to read (Public)
create policy "Public Access" on storage.objects for select using ( bucket_id = 'admin-assets' );

-- Allow authenticated users to upload
create policy "Authenticated Upload" on storage.objects for insert to authenticated with check ( bucket_id = 'admin-assets' );

-- Allow anonymous users to upload (For local dev without auth)
create policy "Anon Upload" on storage.objects for insert to anon with check ( bucket_id = 'admin-assets' );

-- Allow deletion (Optional, for admin management)
create policy "Give full access to authenticated" on storage.objects for all to authenticated using (bucket_id = 'admin-assets') with check (bucket_id = 'admin-assets');
create policy "Give full access to anon" on storage.objects for all to anon using (bucket_id = 'admin-assets') with check (bucket_id = 'admin-assets');
