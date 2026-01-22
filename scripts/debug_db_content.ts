
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function main() {
    console.log("Connecting to:", supabaseUrl);

    const { data: features, error: fError } = await supabase
        .from('features')
        .select('*');

    if (fError) {
        console.error("Error fetching features:", fError);
    } else {
        console.log("\n=== FEATURES ===");
        console.table(features.map(f => ({ key: f.key, name: f.name })));
    }

    const { data: variants, error: vError } = await supabase
        .from('variants')
        .select('key, name, feature_id, features(key)');

    if (vError) {
        console.error("Error fetching variants:", vError);
    } else {
        console.log("\n=== VARIANTS ===");
        // @ts-ignore
        console.table(variants.map(v => ({
            feature: v.features?.key,
            variant_key: v.key,
            name: v.name
        })));
    }
}

main();
