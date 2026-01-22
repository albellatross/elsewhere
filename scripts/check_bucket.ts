
import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing env vars');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
    console.log('Checking bucket admin-assets...');
    const { data, error } = await supabase.storage.getBucket('admin-assets');
    if (error) {
        console.error('Error getting bucket:', error.message);
        // Try listing buckets
        const { data: buckets, error: listError } = await supabase.storage.listBuckets();
        if (listError) {
            console.error('Error listing buckets:', listError.message);
        } else {
            console.log('Available buckets:', buckets.map(b => b.name));
        }
    } else {
        console.log('Bucket exists!', data);
    }
}

check();
