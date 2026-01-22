
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY; // Using Anon key, hopefully RLS allows update if policy is loose or we are admin. 
// Actually RLS usually blocks updates. The user might need to use SERVICE_ROLE key.
// But we don't have SERVICE_ROLE key in .env usually for frontend projects.
// Let's check .env.
// If not, we might need to ask user to provide it or run this in a way that uses their local credentials if possible?
// Supabase CLI `db push` worked, so they have admin access via CLI. 
// For a script, we typically need the service role key for admin updates.
// Let's try regular client first, maybe tables are public?
// If fails, we instruct user to run SQL.

const supabase = createClient(supabaseUrl!, supabaseKey!);

async function main() {
    console.log("Fetching ID Photo variants...");

    // 1. Get ID Photo Feature
    const { data: feature } = await supabase.from('features').select('id').eq('key', 'create_id_photo').single();
    if (!feature) throw new Error("Feature 'create_id_photo' not found");

    // 2. Get Variants
    const { data: variants } = await supabase.from('variants').select('id, key').eq('feature_id', feature.id);
    if (!variants || variants.length === 0) throw new Error("No variants found");

    console.log(`Found ${variants.length} variants. Processing references...`);

    for (const variant of variants) {
        // Get references for this variant
        const { data: maps } = await supabase
            .from('variant_reference_map')
            .select('reference_asset_id, reference_assets(id, name, key)')
            .eq('variant_id', variant.id);

        if (!maps || maps.length === 0) continue;

        console.log(`\nVariant: ${variant.key} (${maps.length} assets)`);

        let index = 1;
        for (const m of maps) {
            const asset = m.reference_assets;
            if (!asset) continue;

            // Construct new key if missing
            const newKey = `${variant.key}_ref_${index.toString().padStart(2, '0')}`;

            if (asset.key === newKey) {
                console.log(`  [OK] Asset already has key: ${newKey}`);
            } else {
                // Update
                // Note: This relies on RLS allowing update or no RLS.
                const { error } = await supabase
                    .from('reference_assets')
                    .update({ key: newKey })
                    .eq('id', asset.id);

                if (error) {
                    console.error(`  [ERR] Failed to set key ${newKey}: ${error.message}`);
                    // If RLS fails, we generate SQL for them.
                    console.log(`  --> SQL TO RUN: UPDATE reference_assets SET key = '${newKey}' WHERE id = '${asset.id}';`);
                } else {
                    console.log(`  [UPDATED] Asset key set to: ${newKey}`);
                }
            }
            index++;
        }
    }
}

main();
