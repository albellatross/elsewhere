
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("--- Reference Assets ---");
    const { data: assets, error } = await supabase
        .from('reference_assets')
        .select('*');

    if (error) {
        console.error("Error:", error);
    } else {
        console.table(assets);
    }

    console.log("\n--- Variant Reference Map ---");
    const { data: map, error: mapError } = await supabase
        .from('variant_reference_map')
        .select('role, adjustment_strength, variant_id, reference_asset_id, variants(key, name), reference_assets(name)');

    if (mapError) {
        console.error("Error:", mapError);
    } else {
        map.forEach(m => {
            console.log(`Variant: [${m.variants.key}] ${m.variants.name} <-> Asset: ${m.reference_assets.name} (Role: ${m.role})`);
        });
    }
}

main();
