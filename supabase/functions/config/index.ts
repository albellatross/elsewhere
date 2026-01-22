import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const url = new URL(req.url);
        const type = url.searchParams.get('type'); // features, variants, details

        // 🔑 AUTH FIX: Use Service Role for Config Access
        const serviceClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 1. Get All Features
        if (type === 'features') {
            const { data, error } = await serviceClient
                .from('features')
                .select('*')
                .eq('is_active', true)
                .order('sort_order');

            if (error) throw error;
            return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // 2. Get Variants for a Feature
        if (type === 'variants') {
            const featureKey = url.searchParams.get('feature_key');
            if (!featureKey) throw new Error('Missing feature_key');

            // First get feature_id from key
            const { data: feature } = await serviceClient.from('features').select('id').eq('key', featureKey).single();
            if (!feature) throw new Error('Feature not found');

            const { data, error } = await serviceClient
                .from('variants')
                .select('*')
                .eq('feature_id', feature.id)
                .eq('is_active', true)
                .order('sort_order');

            if (error) throw error;
            return new Response(JSON.stringify({ data }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        // 3. Get Details for a Variant (Prompt + References)
        if (type === 'details') {
            const variantKey = url.searchParams.get('variant_key');
            // Should also filter by feature_key to be safe, but variant_key is unique per feature usually. 
            // Our schema has unique(feature_id, key), so we need feature_id context ideally.
            const featureKey = url.searchParams.get('feature_key');

            if (!variantKey || !featureKey) throw new Error('Missing variant_key or feature_key');

            const { data: feature } = await serviceClient.from('features').select('id').eq('key', featureKey).single();
            if (!feature) throw new Error('Feature not found');

            const { data: variant } = await serviceClient
                .from('variants')
                .select('id, name, description')
                .eq('feature_id', feature.id)
                .eq('key', variantKey)
                .single();

            if (!variant) throw new Error('Variant not found');

            // Get Active Prompt
            const { data: prompt } = await serviceClient
                .from('prompts')
                .select('prompt_template, negative_prompt, params_json, version')
                .eq('variant_id', variant.id)
                .eq('is_active', true)
                .order('version', { ascending: false })
                .limit(1)
                .single();

            // Get References
            const { data: refMaps } = await serviceClient
                .from('variant_reference_map')
                .select('role, adjustment_strength, reference_assets(id, key, name, public_url, storage_path)')
                .eq('variant_id', variant.id);

            const resolveSignedUrl = async (storagePath: string | null | undefined) => {
                if (!storagePath) return null;
                const normalized = storagePath.replace(/^\/+/, '');
                const [bucket, ...pathParts] = normalized.split('/');
                const objectPath = pathParts.join('/');
                if (!bucket || !objectPath) return null;
                try {
                    const { data: signed, error } = await serviceClient.storage
                        .from(bucket)
                        .createSignedUrl(objectPath, 3600);
                    if (error) {
                        console.warn('Failed to sign reference asset', { bucket, path: objectPath, error: error.message });
                        return null;
                    }
                    return signed?.signedUrl ?? null;
                } catch (err) {
                    console.warn('Failed to sign reference asset', { bucket, path: objectPath, err });
                    return null;
                }
            };

            const references = refMaps
                ? await Promise.all(refMaps.map(async (r: any) => {
                    const asset = r.reference_assets || {};
                    const publicUrl = asset.public_url || (await resolveSignedUrl(asset.storage_path));
                    return {
                        ...asset,
                        public_url: publicUrl,
                        role: r.role,
                        adjustment_strength: r.adjustment_strength
                    };
                }))
                : [];

            return new Response(JSON.stringify({
                data: {
                    variant,
                    prompt,
                    references
                }
            }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
        }

        throw new Error('Invalid type parameter. Use features, variants, or details.');

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
