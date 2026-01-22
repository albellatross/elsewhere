
-- Add key column to reference_assets for semantic referencing
alter table reference_assets add column if not exists key text unique;

-- Optional: Create index for faster lookups if we query by key often
create index if not exists idx_reference_assets_key on reference_assets(key);
