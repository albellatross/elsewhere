-- ==============================================================================
-- Update: Add "Official Submission" and "Professional Use" variants for ID Photo
-- ==============================================================================

with f as (select id from features where key = 'create_id_photo')
insert into variants (feature_id, key, name, description, sort_order) 
select id, 'official', 'Official Submission', 'Strict adherence to official requirements (white bg, correct head size)', 1 from f union all
select id, 'professional', 'Professional Use', 'Polished, professional look for LinkedIn/CV', 2 from f
on conflict (feature_id, key) do update 
set name = excluded.name, description = excluded.description;
