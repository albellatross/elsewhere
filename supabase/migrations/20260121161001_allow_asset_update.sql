
-- Allow authenticated users (Admins) to update reference assets (e.g. rename keys)
create policy "Authenticated users can update reference_assets" 
on reference_assets 
for update 
to authenticated 
using (true)
with check (true);
