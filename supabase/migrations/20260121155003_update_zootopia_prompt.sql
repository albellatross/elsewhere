-- ============================================================================
-- Update: Replace "A Moment in Zootopia" prompt to avoid IP-specific content
-- ==========================================================================

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
),
removed_refs as (
    delete from variant_reference_map
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
    $$Create a high-quality cinematic selfie inside a radiant grand theater during the premiere of an original animated adventure set in a whimsical animal city.

Identity lock (critical):
The person in the center must match the uploaded selfie exactly. Preserve facial structure, skin texture, hairstyle, clothing, and expression. No beautification, reshaping, or reinterpretation.

Companion characters (original designs):
- Left companion: a stylish anthropomorphic fox friend wearing a teal festival blazer with geometric patches and a playful smile. The design must feel fresh and unique, avoiding visual callbacks to any known franchises.
- Right companion: a cheerful anthropomorphic rabbit friend in a silver iridescent bomber jacket with soft neon trims. Keep her energy upbeat and supportive, yet unmistakably original.
Both companions should look newly imagined for this scene—no recognizable character likenesses.

Composition and pose:
All three characters stand shoulder-to-shoulder, leaning slightly inward for a tight selfie. The camera is held just above eye level, creating a classic wide selfie perspective. Everyone looks directly at the lens with genuine excitement.

Camera and lens language:
Capture the moment as an arm-length smartphone selfie (approximately 24-26mm equivalent). Mild wide-angle distortion, clean focus on faces, and subtle depth falloff.

Lighting:
Soft, balanced theater lighting with a gentle glow from the screen. Maintain natural skin tones and detailed fur rendering without blown highlights or harsh shadows.

Background:
Show a packed, modern theater filled with silhouetted audience members. The main screen displays an abstract celebratory light show with custom lettering like “Premiere Night” — no logos, titles, or posters tied to existing media.

Style and realism:
Blend realistic photographic rendering with polished animated-anthropomorphic styling. The human subject and animal companions should integrate seamlessly without visible compositing artifacts.

Framing and output:
Vertical 3:4 composition. Convey the joy of sharing an unforgettable premiere night in a wholly original universe.$$,
    $$identity swap, altered human facial structure, extreme beautification, plastic skin, overly smoothed complexion, warped features, incorrect anatomy, misaligned eyes, cartoon human texture, washed-out lighting, harsh shadows, posterized shading, licensed characters, disney, zootopia, nick wilde, judy hopps, police uniform, recognizable logos, branded movie posters, empty theater, low detail crowd, motion blur on faces, duplicate limbs, extra heads, watermark, text artifacts$$,
    coalesce(cp.params_json, '{}'::jsonb),
    coalesce(cp.version, 0) + 1,
    true
from target_variant tv
left join current_prompt cp on cp.variant_id = tv.id;
