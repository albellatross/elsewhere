-- ============================================================================
-- Add or refresh the "Step Into a Character" remix variant
-- ============================================================================

with target_feature as (
    select id from features where key = 'templates'
),
upsert_variant as (
    insert into variants (feature_id, key, name, description, sort_order, is_active)
    select id, 'step_into_a_character', 'Step Into a Character',
           'Transform the uploaded portrait into a cinematic cosplay while preserving identity.',
           20, true
    from target_feature
    on conflict (feature_id, key) do update
    set name = excluded.name,
        description = excluded.description,
        is_active = true
    returning id
),
latest_prompt as (
    select distinct on (p.variant_id)
        p.variant_id,
        p.version
    from prompts p
    join upsert_variant uv on uv.id = p.variant_id
    where p.is_active = true
    order by p.variant_id, p.version desc
),
deactivate_old as (
    update prompts
    set is_active = false
    where variant_id in (select id from upsert_variant)
    returning 1
),
insert_prompt as (
    insert into prompts (
        variant_id,
        prompt_template,
        negative_prompt,
        params_json,
        version,
        is_active
    )
    select
        uv.id,
        $$Create a cinematic cosplay portrait that keeps the uploaded person instantly recognizable.

Identity lock (non-negotiable):
- Mirror the real facial geometry, bone structure, skin tone, freckles, moles, scars, and head proportions exactly.
- Do not beautify, slim the face, reshape the nose, adjust jawlines, or modify the person’s age, gender, or expression.
- Eyes must remain aligned and consistent with the source photo. No anime irises, no face swap, no smoothing.

Cosplay transformation rules:
- Use the selected character reference only to design wardrobe, armor, fabrics, accessories, and stylized hair. The hairline and face shape stay identical to the source photo.
- Carry over prop design, color palette, and emblem details from the reference while ensuring every material looks physically real and wearable.
- Match the suggested stance or gesture without obscuring the user’s face.

World building:
- Stage the portrait inside a richly lit, animated-film universe rendered with photographic lighting and textures.
- Combine cinematic rim lights, volumetric depth, and soft bokeh to ground the cosplay in reality while keeping the world whimsical.
- Integrate environmental cues from the reference (architecture, sky colors, particles) without copying any licensed logos.

Camera + output:
- Shoot as a vertical 3:4 frame at portrait distance with a 50mm style lens.
- Retain crisp details on facial features, costume materials, and props. Avoid blur, posterization, or painterly artifacts.
- Deliver a finished image that looks like a real photo taken on set with premium lighting, not an illustration or cartoon.$$,
        $$face swap, stylized human face, plastic skin, anime head, warped anatomy, floating facial features, double head, de-aged subject, beauty filter, AI art texture, watercolor wash, posterized shading, harsh chromatic aberration, branded logos, disney, marvel, dc comics, halo, star wars, overwatch, excessive bloom, blown highlights, washed colors, duplicate limbs, watermark$$,
        jsonb_build_object(
            'size', '1024x1536',
            'style', 'vivid',
            'quality', 'standard',
            'strength', 0.35,
            'reference_strength', 0.65,
            'guidance_scale', 8.0
        ),
        coalesce(lp.version, 0) + 1,
        true
    from upsert_variant uv
    left join latest_prompt lp on lp.variant_id = uv.id
    returning variant_id
)
-- Refresh reference asset mapping so every `character_*` asset participates
, cleared_map as (
    delete from variant_reference_map
    where variant_id in (select id from upsert_variant)
)
insert into variant_reference_map (variant_id, reference_asset_id, role, adjustment_strength)
select uv.id, ra.id, 'character_reference', 0.65
from upsert_variant uv
join reference_assets ra on ra.key like 'character_%'
on conflict (variant_id, reference_asset_id) do update
set role = excluded.role,
    adjustment_strength = excluded.adjustment_strength;
