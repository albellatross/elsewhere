-- ============================================================================
-- Update prompt for "A Moment in Zootopia" (cinema variant) to avoid moderation
-- ============================================================================

with target_variant as (
    select id from variants where key = 'a_moment_in_zootopia'
),
current_prompt as (
    select distinct on (p.variant_id)
        p.variant_id,
        p.params_json,
        p.version
    from prompts p
    join target_variant tv on tv.id = p.variant_id
    where p.is_active = true
    order by p.variant_id, p.version desc
),
deactivated as (
    update prompts
    set is_active = false
    where variant_id in (select id from target_variant)
    returning 1
)
insert into prompts (
    variant_id,
    prompt_template,
    negative_prompt,
    params_json,
    version,
    is_active
)
select
    tv.id,
    $$Capture a luminous premiere-night selfie inside an original grand theater set in a futuristic animal metropolis called Aurora City.

Identity lock (critical):
The person in the center must match the uploaded selfie exactly. Preserve facial structure, skin texture, hairstyle, clothing, and expression. Do not beautify, reshape, or reinterpret the human identity.

Original companion characters:
- Left companion: a charismatic red panda navigator named Liora wearing a cobalt flight jacket with glowing constellation pins and a layered silk scarf. Her styling must feel freshly imagined.
- Right companion: an energetic desert jackrabbit musician named Ryen in an iridescent sound-reactive bomber jacket, paired with geometric earrings and luminous bracelets. Keep the design unique to this world.
Both characters must look newly created for this scene, with no resemblance to known media or existing intellectual property.

Composition and pose:
All three stand shoulder-to-shoulder, leaning slightly inward for a friendly selfie. The camera is held just above eye level for a wide selfie perspective, with everyone making warm, excited expressions.

Camera and lens language:
Treat this as an arm-length smartphone selfie (24–26mm equivalent). Allow mild wide-angle perspective while keeping faces flattering and natural.

Lighting:
Soft, balanced premiere lighting with gentle highlights from holographic marquee signage. Maintain natural skin tones and detailed fur rendering without harsh shadows or blown highlights.

Background:
Show a packed Aurora City premiere hall with tiered seats, floating lantern drones, and a panoramic screen displaying an abstract Aurora skyline logo. Avoid any familiar movie posters, logos, or recognizable brand marks.

Style and realism:
Blend realistic photographic rendering with polished anthropomorphic styling. The human subject and companion characters should integrate seamlessly, without compositing seams or halos.

Framing and output:
Vertical 3:4 composition. Convey the joy of an original premiere night inside Aurora City.$$,
    $$identity swap, altered human facial structure, extreme beautification, plastic skin, warped features, incorrect anatomy, misaligned eyes, cartoon human texture, harsh lighting, posterized shading, branded characters, disney, zootopia, nick wilde, judy hopps, police uniform, trademark logos, existing IP, empty theater, low detail crowd, motion blur on faces, duplicate limbs, extra heads, watermark, text artifacts$$,
    coalesce(cp.params_json, '{}'::jsonb),
    coalesce(cp.version, 0) + 1,
    true
from target_variant tv
left join current_prompt cp on cp.variant_id = tv.id;
