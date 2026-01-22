import { createClient } from '@supabase/supabase-js';
import 'dotenv/config';

// Load directly from .env file if process.env is missing (sometimes tsx doesn't load it automatically without -r dotenv/config)
// But we assume dotenv/config does the job.

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY");
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function main() {
    console.log("--- Debugging Variant: blank_background ---");

    // 1. Search for keys similar to blank%
    const { data: variants, error } = await supabase
        .from('variants')
        .select(`
        id, name, key, sort_order,
        feature:features(id, key),
        prompts(id, is_active, version)
    `)
        .ilike('key', '%blank%');

    if (error) {
        console.error("Error querying variants:", error);
        return;
    }

    console.log(`Found ${variants.length} variant(s) matching '%blank%':`);
    variants.forEach(v => {
        console.log(JSON.stringify(v, null, 2));
    });

    // 2. Check feature key specifically
    const { data: features } = await supabase
        .from('features')
        .select('id, key')
        .eq('key', 'create_id_photo');

    console.log("\n--- Feature: create_id_photo ---");
    console.log(features);
}

main();
