
import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) process.exit(1);

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("--- ID Photo Reference Assets ---");

    // Get ID Photo Feature ID
    const { data: feature } = await supabase.from('features').select('id').eq('key', 'create_id_photo').single();
    if (!feature) { console.log("No feature found."); return; }

    // Get Variants
    const { data: variants } = await supabase.from('variants').select('id, key').eq('feature_id', feature.id);
    if (!variants) { console.log("No variants found."); return; }

    const variantIds = variants.map(v => v.id);

    const { data: map, error } = await supabase
        .from('variant_reference_map')
        .select('role, reference_assets(id, name, storage_path), variants(key)')
        .in('variant_id', variantIds);

    if (error) console.error(error);
    else {
        if (map.length === 0) console.log("No reference assets found for ID Photo.");
        map.forEach(m => {
            console.log(`Variant: ${m.variants.key} -> Asset: ${m.reference_assets.name}`);
        });
    }
}

main();
