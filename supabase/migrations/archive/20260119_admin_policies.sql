-- ==============================================================================
-- Fix: Allow BOTH authenticated and ANONYMOUS users to manage configuration.
-- This is required because the current frontend has no login flow (runs as anon).
-- WARNING: This allows anyone with the anon key to modify your admin config.
--          Secure ONLY for local dev or internal networks.
-- ==============================================================================

-- Features
drop policy if exists "Enable full access for authenticated users" on features;
create policy "Enable full access for anon and authenticated" on features for all to anon, authenticated using (true) with check (true);

-- Variants
drop policy if exists "Enable full access for authenticated users" on variants;
create policy "Enable full access for anon and authenticated" on variants for all to anon, authenticated using (true) with check (true);

-- Prompts
drop policy if exists "Enable full access for authenticated users" on prompts;
create policy "Enable full access for anon and authenticated" on prompts for all to anon, authenticated using (true) with check (true);

-- Reference Assets
drop policy if exists "Enable full access for authenticated users" on reference_assets;
create policy "Enable full access for anon and authenticated" on reference_assets for all to anon, authenticated using (true) with check (true);

-- Variant Reference Map
drop policy if exists "Enable full access for authenticated users" on variant_reference_map;
create policy "Enable full access for anon and authenticated" on variant_reference_map for all to anon, authenticated using (true) with check (true);
