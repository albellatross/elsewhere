-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ==============================================================================
-- 1. Core Configuration Tables (Admin Managed)
-- ==============================================================================

-- Features: Top-level business capabilities (e.g., ID Photo, Pet Portrait)
create table if not exists features (
  id uuid primary key default uuid_generate_v4(),
  key text not null unique, -- 'create_id_photo', 'create_personal', 'templates'
  name text not null,
  description text,
  section text not null default 'Create', -- 'Create', 'Studio', 'Templates'
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Variants: Specific options/scenes within a feature (e.g., 'Blue Background', 'Christmas')
create table if not exists variants (
  id uuid primary key default uuid_generate_v4(),
  feature_id uuid references features(id) on delete cascade,
  key text not null, -- 'blue_bg', 'christmas', 'cyberpunk'
  name text not null,
  description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamp with time zone default now(),
  unique(feature_id, key)
);

-- Prompts: Versioned prompt templates for variants
create table if not exists prompts (
  id uuid primary key default uuid_generate_v4(),
  variant_id uuid references variants(id) on delete cascade,
  version int default 1,
  
  -- The core prompt template with variables like {{product_name}}
  prompt_template text not null, 
  
  -- Optional negative prompt
  negative_prompt text,
  
  -- JSON blob for parameters (strength, guidance_scale, steps, dimensions)
  params_json jsonb default '{}'::jsonb,
  
  is_active boolean default true,
  created_at timestamp with time zone default now()
);

-- Reference Assets: Images used for style/structure guidance
create table if not exists reference_assets (
  id uuid primary key default uuid_generate_v4(),
  
  name text,
  storage_path text not null, -- Path in Supabase Storage (e.g. 'references/123.jpg')
  public_url text, -- Computed public URL if public bucket, or signed URL logic
  
  width int,
  height int,
  
  tags_json jsonb default '[]'::jsonb, -- e.g. ["style", "lighting"]
  
  created_at timestamp with time zone default now()
);

-- Mapping Variants <-> Reference Assets (Many-to-Many)
create table if not exists variant_reference_map (
  variant_id uuid references variants(id) on delete cascade,
  reference_asset_id uuid references reference_assets(id) on delete cascade,
  
  -- Role of this reference image in this variant
  -- e.g. 'controlnet_structure', 'style_transfer', 'ip_adapter', 'img2img_init'
  role text default 'style', 
  
  primary key (variant_id, reference_asset_id)
);


-- ==============================================================================
-- 2. User & Provider Data (User Data)
-- ==============================================================================

-- User Provider Configs: Storing API Keys securely
-- RLS Policy: Users can ONLY see/edit their own rows.
create table if not exists user_provider_configs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  
  provider_key text not null, -- 'chatgpt_image', 'flux', 'midjourney'
  
  -- ENCRYPTED or at least obscured. 
  -- In a real prod env, use Supabase Vault. For now we assume RLS protects it.
  api_key_encrypted text, 
  base_url text,
  model text,
  
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  
  unique(user_id, provider_key)
);

-- Generation Runs: Logs of every generation attempt
-- RLS Policy: Users can see their own runs. Admins can see all.
create table if not exists generation_runs (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete set null,
  
  feature_key text, -- Denormalized for easier querying
  variant_key text,
  provider_key text,
  
  -- Inputs
  input_assets_json jsonb, -- e.g. { "user_photo": "url", "product_logo": "url" }
  user_params_json jsonb, -- e.g. { "product_name": "MyBrand" }
  
  -- Output
  resolved_prompt text, -- The final assembled prompt used
  result_assets_json jsonb, -- e.g. ["url1", "url2"]
  
  -- Status
  status text not null default 'queued', -- 'queued', 'running', 'succeeded', 'failed'
  error_message text,
  
  -- Perf / Meta
  duration_ms int,
  cost_token_count int, -- if available
  
  created_at timestamp with time zone default now()
);


-- ==============================================================================
-- 3. Row Level Security Policies
-- ==============================================================================

-- Enable RLS
alter table features enable row level security;
alter table variants enable row level security;
alter table prompts enable row level security;
alter table reference_assets enable row level security;
alter table variant_reference_map enable row level security;
alter table user_provider_configs enable row level security;
alter table generation_runs enable row level security;

-- Config Tables: Everyone (Authenticated) can READ (to fetch config for the UI)
-- Only Service Role (Admin) can WRITE.
create policy "Public Read Features" on features for select to authenticated using (true);
create policy "Public Read Variants" on variants for select to authenticated using (true);
create policy "Public Read Prompts" on prompts for select to authenticated using (true);
create policy "Public Read References" on reference_assets for select to authenticated using (true);
create policy "Public Read RefMap" on variant_reference_map for select to authenticated using (true);

-- User Provider Configs: Users can CRUD their own keys
create policy "Users manage own provider configs" on user_provider_configs
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

-- Generation Runs: Users can view their own runs
create policy "Users view own runs" on generation_runs
  for select using (auth.uid() = user_id);

create policy "Users create own runs" on generation_runs
  for insert with check (auth.uid() = user_id);
  
-- (Admins/ServiceRole bypass RLS by default or can be added explicitly if needed)

-- ==============================================================================
-- 4. Initial Seed Data
-- ==============================================================================

-- Features
insert into features (key, name, description, section, sort_order) values
('create_id_photo', 'ID Photo', 'Professional ID photos with background options', 'Create', 1),
('create_personal', 'Personal Photoshoot', 'Themed personal photos (New Year, Christmas...)', 'Create', 2),
('create_pet', 'Pet Portrait', 'Themed pet portraits', 'Create', 3),
('create_product', 'Product Visuals', 'Product advertising visuals with logo support', 'Create', 4),
('templates', 'Template Library', 'Quick generation using preset templates', 'Templates', 5)
on conflict (key) do nothing;

-- Variants for ID Photo
with f as (select id from features where key = 'create_id_photo')
insert into variants (feature_id, key, name, sort_order) 
select id, 'blue_bg', 'Blue Background', 1 from f union all
select id, 'white_bg', 'White Background', 2 from f union all
select id, 'grey_bg', 'Grey Background', 3 from f
on conflict do nothing;

-- Variants for Personal Photoshoot
with f as (select id from features where key = 'create_personal')
insert into variants (feature_id, key, name, sort_order) 
select id, 'newyear', 'New Year', 1 from f union all
select id, 'christmas', 'Christmas', 2 from f union all
select id, 'halloween', 'Halloween', 3 from f union all
select id, 'birthday', 'Birthday', 4 from f
on conflict do nothing;

-- Variants for Pet Portrait
with f as (select id from features where key = 'create_pet')
insert into variants (feature_id, key, name, sort_order) 
select id, 'newyear', 'New Year', 1 from f union all
select id, 'christmas', 'Christmas', 2 from f union all
select id, 'halloween', 'Halloween', 3 from f union all
select id, 'costume', 'Costume / Cosplay', 4 from f
on conflict do nothing;

-- Variants for Product Visuals
with f as (select id from features where key = 'create_product')
insert into variants (feature_id, key, name, sort_order) 
select id, 'cosmetics', 'Cosmetics', 1 from f union all
select id, 'electronics', 'Electronics', 2 from f union all
select id, 'sports', 'Sports & Fitness', 3 from f union all
select id, 'food', 'Food & Beverage', 4 from f
on conflict do nothing;
