import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // 0. Handle CORS Preflight - Critical for preventing "Failed to send request"
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const addLog = (msg: string, data?: any) => {
            console.log(`[LOG] ${msg}`, data ? JSON.stringify(data) : '');
        };

        // 1. Init Supabase with User Auth Context
        const supabaseClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_ANON_KEY') ?? '',
            { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
        );

        // Check if user is logged in (Optional now)
        const { data: { user }, error: authError } = await supabaseClient.auth.getUser();
        if (authError || !user) {
            console.log("User is not logged in. Proceeding as Anonymous.");
            // throw new Error('Unauthorized: Please log in again.'); // REMOVED strict check
        }

        // 2. Parse Request - safely
        let body;
        try {
            body = await req.json();
        } catch (e) {
            throw new Error(`Invalid JSON body: ${e.message}`);
        }

        const {
            feature_key,
            variant_key,
            user_inputs = {},
            provider_key = 'chatgpt_image', // default
            dry_run = false,
            return_payload_only = false, // 🚀 NEW: Client-Side Execution Mode
            provider_api_key_override,
            provider_base_url_override,
            provider_deployment_id_override
        } = body;

        addLog('Received Params:', { feature_key, variant_key, provider_key, return_payload_only });

        let requestPlan: any = null; // 🚀 Define at top level

        if (!feature_key || !variant_key) {
            throw new Error('Missing feature_key or variant_key');
        }

        // 3. Get Configuration (Prompts + References)
        // 🔑 AUTH FIX: Use Service Role to bypass RLS for Configuration.
        // This ensures Anonymous users can still read Features/Variants even if RLS is set to 'authenticated' only.
        const serviceClient = createClient(
            Deno.env.get('SUPABASE_URL') ?? '',
            Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
        );

        // 3. DEBUG: Detailed Lookup
        // A. Check Feature
        const { data: featureCheck } = await serviceClient.from('features').select('id').eq('key', feature_key).maybeSingle();
        if (!featureCheck) {
            throw new Error(`Debug: Feature '${feature_key}' not found in DB.`);
        }

        // B. Check Variant
        const { data: variantCheck } = await serviceClient.from('variants')
            .select('id, key, feature_id')
            .eq('feature_id', featureCheck.id)
            .eq('key', variant_key)
            .maybeSingle();

        if (!variantCheck) {
            // Debug: List all variants for this feature
            const { data: allVars } = await serviceClient.from('variants').select('key').eq('feature_id', featureCheck.id);
            throw new Error(`Debug: Variant '${variant_key}' not found for feature '${feature_key}'. Available keys: ${allVars?.map(v => v.key).join(', ')}`);
        }

        // C. Full Query
        let variant: any = null;
        let dbError: any = null;

        const selectWithStrength = `
                id, name, key,
                prompts(id, prompt_template, params_json, is_active, version),
                reference_map:variant_reference_map(
                    role,
                    adjustment_strength,
                    asset:reference_assets(id, public_url, storage_path, key, name)
                )
            `;
        const selectWithoutStrength = `
                id, name, key,
                prompts(id, prompt_template, params_json, is_active, version),
                reference_map:variant_reference_map(
                    role,
                    asset:reference_assets(id, public_url, storage_path)
                )
            `;

        const primaryResult = await serviceClient
            .from('variants')
            .select(selectWithStrength)
            .eq('id', variantCheck.id)
            .eq('prompts.is_active', true)
            .order('version', { foreignTable: 'prompts', ascending: false }) // Get latest version
            .single();

        variant = primaryResult.data;
        dbError = primaryResult.error;

        if (dbError?.message?.includes('adjustment_strength')) {
            const fallbackResult = await serviceClient
                .from('variants')
                .select(selectWithoutStrength)
                .eq('id', variantCheck.id)
                .eq('prompts.is_active', true)
                .order('version', { foreignTable: 'prompts', ascending: false })
                .single();
            variant = fallbackResult.data;
            dbError = fallbackResult.error;
        }

        if (dbError || !variant) {
            console.error("Database query error:", dbError);
            throw new Error(`Configuration not found (Query Failed) for feature: ${feature_key}, variant: ${variant_key}. DB Error: ${dbError?.message}`);
        }

        // Filter prompts manually if needed (in case the order/limit in join is tricky)
        // With .single(), 'prompts' is an array.
        const activePrompts = variant.prompts || [];
        // Sort by version desc
        activePrompts.sort((a: any, b: any) => b.version - a.version);

        const promptConfig = activePrompts[0];
        if (!promptConfig) throw new Error(`Debug: Variant '${variant_key}' found, but no active prompts available.`);

        // 4. Get User's Provider Key
        // If user is null, this query returns no data (RLS or no match). 
        // We handle this gracefully.
        let userProvider: any = null;
        if (user) {
            const { data: up } = await supabaseClient
                .from('user_provider_configs')
                .select('api_key_encrypted, base_url, model')
                .eq('provider_key', provider_key)
                .single();
            userProvider = up;
        }

        let apiKey = userProvider?.api_key_encrypted;

        // Only for debugging/demo, allow fallback if no key but it's a dry run
        if (!apiKey && !dry_run && !provider_api_key_override) {
            // For client-side execution, allow missing key if return_payload_only (Hybrid Mode)
            // The frontend will inject the key.
            if (!return_payload_only) {
                if (!user) {
                    throw new Error("Anonymous users must provide API Configuration (API Key/URL).");
                } else {
                    throw new Error(`No API Key found for provider: ${provider_key}. Please configure it in Settings.`);
                }
            }
        }
        if (dry_run && !apiKey) apiKey = "mock-key";

        // 5. Assemble Prompt
        let finalPrompt = promptConfig.prompt_template || "";
        Object.keys(user_inputs).forEach(key => {
            const val = user_inputs[key];
            finalPrompt = finalPrompt.replace(new RegExp(`{{${key}}}`, 'g'), String(val));
        });
        if (user_inputs.background_prompt && !(promptConfig.prompt_template || "").includes('{{background_prompt}}')) {
            finalPrompt += " " + user_inputs.background_prompt;
        }

        // 3a. Resolve Reference Assets (if any)
        const refAssets = variant.reference_map;
        let backendRefImages: string[] = [];
        const selectedReferences: Array<{ key?: string | null; role?: string | null }> = [];

        if (refAssets && refAssets.length > 0) {
            let assetsToUse = refAssets;

            if ((variant.key || '').toLowerCase() === 'step_into_a_character') {
                const normalizedAssets = refAssets.filter((item: any) => item?.asset);
                const inputGender = (user_inputs.gender ?? '').toString().toLowerCase();
                const genderPrefix = inputGender === 'female'
                    ? 'character_0'
                    : inputGender === 'male'
                        ? 'character_1'
                        : null;

                const selectPool = (prefix: string | null) => {
                    if (!prefix) return [] as any[];
                    return normalizedAssets.filter((item: any) => (item.asset?.key || '').startsWith(prefix));
                };

                const randomPick = (items: any[]) => items[Math.floor(Math.random() * items.length)];

                let candidate = genderPrefix ? selectPool(genderPrefix) : [];
                if (!candidate.length) {
                    candidate = normalizedAssets.filter((item: any) => (item.asset?.key || '').startsWith('character_'));
                }
                if (!candidate.length) {
                    candidate = normalizedAssets;
                }

                assetsToUse = candidate.length ? [randomPick(candidate)] : [];

                addLog('Step Into Character reference selection', {
                    gender: inputGender,
                    pool: candidate.map((item: any) => item?.asset?.key || null).filter((key: string | null) => key)
                });
            }

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
                        console.warn('Failed to sign reference asset for generation plan', {
                            bucket,
                            path: objectPath,
                            error: error.message
                        });
                        return null;
                    }
                    return signed?.signedUrl || null;
                } catch (e) {
                    console.warn('Failed to sign reference asset for generation plan', {
                        bucket,
                        path: objectPath,
                        error: e instanceof Error ? e.message : e
                    });
                    return null;
                }
            };

            backendRefImages = await Promise.all(assetsToUse.map(async (item: any) => {
                const asset = item.asset;
                if (!asset) return null;
                selectedReferences.push({ key: asset.key ?? null, role: item.role ?? null });
                if (asset.public_url) return asset.public_url;
                if (asset.storage_path) {
                    return resolveSignedUrl(asset.storage_path);
                }
                return null;
            }));
            backendRefImages = backendRefImages.filter((url) => url !== null) as string[];
            if (selectedReferences.length && (variant.key || '').toLowerCase() === 'step_into_a_character') {
                addLog('Step Into Character selected references', selectedReferences);
            }
        }

        // 3b. Resolve Input Photo from Storage (Critical for large files)
        // 🚀 OPTIMIZATION: If return_payload_only, Backend does NOT download image.
        let inputImageBase64 = user_inputs.photo;

        if (!return_payload_only) {
            if (user_inputs.photo_storage_path && !user_inputs.photo) {
                addLog(`Downloading input photo from storage: ${user_inputs.photo_storage_path}`);
                // Ensure bucket is correct. Using 'assets' as enforced by frontend.
                const { data: fileData, error: downloadError } = await supabaseClient.storage
                    .from('assets')
                    .download(user_inputs.photo_storage_path);

                if (downloadError) {
                    console.error("Storage download failed:", downloadError);
                    throw new Error(`Failed to download input photo from 'assets' bucket: ${downloadError.message}. Make sure the bucket exists and is public/accessible.`);
                }
                if (fileData) {
                    const buf = await fileData.arrayBuffer();
                    const b64 = btoa(String.fromCharCode(...new Uint8Array(buf)));
                    user_inputs.photo = `data:image/png;base64,${b64}`;
                    inputImageBase64 = user_inputs.photo;
                    addLog('✅ Input photo downloaded and processed from storage');
                }
            }
        }

        // 6. Execute Generation (or Plan)
        let imageUrl = '';
        const metadata = { ...promptConfig.params_json, ...user_inputs };

        if (dry_run) {
            imageUrl = `https://placehold.co/1024x1024?text=${encodeURIComponent(variant.name)}+${encodeURIComponent(feature_key)}`;
        } else {
            // --- PROVIDER LOGIC ---
            const effectiveApiKey = provider_api_key_override || apiKey || "CLIENT_SIDE_KEY"; // Placeholder for plan
            const effectiveBaseUrl = provider_base_url_override || userProvider?.base_url || 'https://api.openai.com/v1';
            const effectiveDeployment = provider_deployment_id_override || userProvider?.model || promptConfig.params_json?.model || "dall-e-3";

            // 🧠 Smart Provider Detection
            // If the user pasted a Flux URL (e.g. bfl.ml or .../flux), treat it as Flux even if frontend said 'chatgpt_image'
            let activeProviderKey = provider_key;
            if (effectiveBaseUrl.toLowerCase().includes('flux') || effectiveBaseUrl.toLowerCase().includes('bfl')) {
                activeProviderKey = 'flux';
                addLog('🔌 Auto-detected Flux provider from URL');
            }

            const isAzure = effectiveBaseUrl.includes('azure.com');
            const allowReferenceImages = activeProviderKey !== 'chatgpt_image';
            const effectiveRefImages = allowReferenceImages ? backendRefImages : [];


            if (activeProviderKey === 'chatgpt_image' || activeProviderKey === 'openai') {
                // Determine Mode
                const isImageToImage = !!(inputImageBase64 || user_inputs.photo_storage_path);

                let url = '';
                let headers: Record<string, string> = {};
                let bodyData: any = null;
                let bodyType = 'json';

                if (isImageToImage) {
                    addLog('Mode: Image-to-Image (Edits)');
                    bodyType = 'multipart/form-data';

                    // Construct URL & Headers (Shared Logic)
                    if (isAzure) {
                        let cleanUrl = effectiveBaseUrl.trim();

                        // Extract API Version if present
                        let apiVersion = '2024-02-01';
                        if (cleanUrl.includes('api-version=')) {
                            const match = cleanUrl.match(/api-version=([^&]+)/);
                            if (match && match[1]) apiVersion = match[1];
                        }
                        // GPT-image edits require newer API version on Azure
                        if ((effectiveDeployment || '').toLowerCase().includes('gpt-image')
                            && apiVersion !== '2025-04-01-preview') {
                            apiVersion = '2025-04-01-preview';
                        }

                        cleanUrl = cleanUrl.split('?')[0];
                        cleanUrl = cleanUrl.replace(/\/+$/, '');

                        // 🧠 URL FIX: For Image-to-Image on Azure, we MUST use '/images/edits'.
                        // Even if user pasted '.../generations', we automatically switch to 'edits'.
                        // The previous 400 error confirmed 'generations' does not support image uploads.
                        cleanUrl = cleanUrl.replace(/\/images\/generations$/, '');
                        cleanUrl = cleanUrl.replace(/\/images\/edits$/, '');

                        if (cleanUrl.includes('/deployments/')) {
                            url = `${cleanUrl}/images/edits?api-version=${apiVersion}`;
                        } else {
                            url = `${cleanUrl}/deployments/${effectiveDeployment}/images/edits?api-version=${apiVersion}`;
                        }

                        // 🔑 MAAS AUTH FIX: User's curl confirms MaaS uses 'Bearer <HexKey>'
                        const isMaaS = effectiveBaseUrl.includes('cognitiveservices.azure.com');
                        const isJwt = effectiveApiKey.length > 50 && effectiveApiKey.includes('ey');

                        if (isMaaS || isJwt) {
                            headers['Authorization'] = `Bearer ${effectiveApiKey}`;
                            // 🕵️ SPOOF: Some internal WAFs block non-curl agents. Mimic curl to be safe.
                            headers['User-Agent'] = 'curl/7.88.1';
                        } else {
                            // Standard OpenAI.Azure (openai.azure.com) uses 'api-key' for Hex keys
                            headers['api-key'] = effectiveApiKey;
                        }
                    } else {
                        url = `${effectiveBaseUrl}/images/edits`;
                        headers['Authorization'] = `Bearer ${effectiveApiKey}`;
                        // DALL-E 2 standard usually
                    }

                    // Construct Body Data
                    if (return_payload_only) {
                        // For Client Execution, we return instructions
                        bodyData = {
                            prompt: finalPrompt,
                            // Tell frontend to attach the image
                            _attach_image: true,
                            _mode: 'edits'
                        };

                        if (effectiveRefImages.length > 0) {
                            bodyData.reference_images = effectiveRefImages;
                        }
                    } else {
                        // Standard Execution
                        const formData = new FormData();
                        if (inputImageBase64) {
                            const byteCharacters = atob(inputImageBase64.split('base64,')[1] || inputImageBase64);
                            const byteNumbers = new Array(byteCharacters.length);
                            for (let i = 0; i < byteCharacters.length; i++) {
                                byteNumbers[i] = byteCharacters.charCodeAt(i);
                            }
                            const byteArray = new Uint8Array(byteNumbers);
                            const blob = new Blob([byteArray], { type: 'image/png' });
                            formData.append('image', blob, 'image.png');
                        }
                        formData.append('prompt', finalPrompt);

                        if (!isAzure) {
                            formData.append('n', '1');
                            // ⚡️ PORTRAIT FIX: Use 1024x1536 for DALL-E 3 portrait composition.
                            formData.append('size', promptConfig.params_json?.size || "1024x1536");
                        }
                        bodyData = formData;
                    }

                } else {
                    addLog('Mode: Text-to-Image (Generations)');
                    headers['Content-Type'] = 'application/json';

                    let requestBody: any = {
                        prompt: finalPrompt,
                        n: 1,
                        // ⚡️ PORTRAIT FIX: Default to 1024x1536 for portrait generation.
                        size: promptConfig.params_json?.size || "1024x1536",
                        // ⚡️ SPEED OPTIMIZATION: Force standard quality for speed
                        quality: "standard"
                    };

                    if (isAzure) {
                        // 🧹 Robust Azure URL Cleaning
                        let cleanUrl = effectiveBaseUrl.trim();

                        // Extract API Version if present
                        let apiVersion = '2024-02-01';
                        if (cleanUrl.includes('api-version=')) {
                            const match = cleanUrl.match(/api-version=([^&]+)/);
                            if (match && match[1]) apiVersion = match[1];
                        }

                        cleanUrl = cleanUrl.split('?')[0]; // Remove query params (?api-version=...)
                        cleanUrl = cleanUrl.replace(/\/+$/, ''); // Remove trailing slash
                        cleanUrl = cleanUrl.replace(/\/images\/generations$/, ''); // Remove operation path
                        cleanUrl = cleanUrl.replace(/\/images\/edits$/, ''); // Remove operation path

                        if (cleanUrl.includes('/deployments/')) {
                            url = `${cleanUrl}/images/generations?api-version=${apiVersion}`;
                        } else {
                            url = `${cleanUrl}/deployments/${effectiveDeployment}/images/generations?api-version=${apiVersion}`;
                        }

                        const isJwt = effectiveApiKey.length > 50 && effectiveApiKey.includes('ey');
                        if (isJwt) {
                            headers['Authorization'] = `Bearer ${effectiveApiKey}`;
                            headers['User-Agent'] = 'curl/7.88.1';
                        } else {
                            headers['api-key'] = effectiveApiKey;
                        }
                    } else {
                        url = `${effectiveBaseUrl}/images/generations`;
                        headers['Authorization'] = `Bearer ${effectiveApiKey}`;
                        requestBody.model = effectiveDeployment;
                        if (promptConfig.params_json?.style) {
                            const modelName = typeof requestBody.model === 'string' ? requestBody.model.toLowerCase() : '';
                            if (modelName.includes('dall-e-3')) {
                                requestBody.style = promptConfig.params_json.style;
                            } else {
                                addLog('⚠️ Ignoring unsupported style param for model: ' + (requestBody.model || 'unknown'));
                            }
                        }
                    }
                    bodyData = return_payload_only ? requestBody : JSON.stringify(requestBody);
                }

                if (return_payload_only) {
                    requestPlan = {
                        strategy: 'client_fetch',
                        provider: 'openai',
                        request: {
                            url,
                            method: 'POST',
                            headers,
                            body_type: bodyType,
                            body_data: bodyData
                        }
                    };
                } else {
                    addLog('Calling Provider: ' + url);
                    const resp = await fetch(url, { method: 'POST', headers, body: bodyData });

                    if (!resp.ok) {
                        const err = await resp.text();

                        // Generate Curl for Debugging
                        const curlHeaders = Object.entries(headers).map(([k, v]) => `-H "${k}: ${v}"`).join(' ');
                        const generatedCurl = `curl -X POST "${url}" ${curlHeaders} -F "image=@test.png" -F "prompt=${finalPrompt.substring(0, 20)}..."`;

                        // Debug Info for User
                        const debugInfo = `\n\nDEBUG INFO:\nURL: ${url}\nHeaders: ${JSON.stringify(headers)}\nResponse: ${err}\n\nREPRODUCE WITH CURL:\n${generatedCurl}`;

                        if (resp.status === 404) {
                            if (isImageToImage) {
                                throw new Error(`Provider API Error (404): Endpoint Not Found.${debugInfo}\n\nPOSSIBLE CAUSES:\n1. Azure Region/Model does not support '/images/edits'.\n2. 'api-version' is mistyped or too old.\n3. Verify your Auth Token matches the endpoint type (Bearer vs api-key).`);
                            }
                            throw new Error(`Provider API Error (404): Resource Not Found.${debugInfo}`);
                        }

                        if (resp.status === 400 && err.includes('unsupported_content_type')) {
                            throw new Error(`Provider API Error (400): Endpoint Does Not Support Image Inputs.${debugInfo}\n\nDIAGNOSIS:\nThe endpoint '${url}' returned 'Unsupported content type'.\n\nMEANING:\nThis Azure Model/Endpoint ONLY accepts Text Prompts (JSON). It DOES NOT support uploading input images.`);
                        }

                        throw new Error(`Provider API Error (${resp.status}): ${err}`);
                    }

                    const resJson = await resp.json();
                    if (resJson.data && resJson.data.length > 0) {
                        if (resJson.data[0].url) {
                            imageUrl = resJson.data[0].url;
                        } else if (resJson.data[0].b64_json) {
                            // Support B64 response if URL is missing (Azure optimization)
                            imageUrl = `data:image/png;base64,${resJson.data[0].b64_json}`;
                        } else {
                            throw new Error("Unknown image format in response data.");
                        }
                    } else {
                        throw new Error("No image data in response: " + JSON.stringify(resJson));
                    }
                }

            } else if (activeProviderKey.includes('flux')) {
                let url = effectiveBaseUrl;
                const [baseUrl, queryString] = url.split('?');
                const normalizedBase = baseUrl.toLowerCase();
                const hasFluxPath = normalizedBase.includes('/flux-')
                    || normalizedBase.includes('/v1/flux')
                    || normalizedBase.includes('/providers/blackforestlabs/');
                const hasImagesGenerations = normalizedBase.includes('/images/generations');
                // Auto-fix URL for Flux if users just paste the base
                if (!hasFluxPath && !hasImagesGenerations && !normalizedBase.includes('bfl')) {
                    // Attempt to construct standard BFL endpoint if it looks like a base URL
                    url = `${baseUrl.replace(/\/+$/, '')}/v1/flux-1-schnell${queryString ? `?${queryString}` : ''}`;
                }
                addLog('Calling Flux Provider: ' + url);

                let referenceImagesBase64: string[] = [];
                if (Array.isArray(user_inputs.reference_images)) {
                    referenceImagesBase64 = user_inputs.reference_images
                        .filter((img: string | null) => img)
                        .map((img: string) => img.includes('base64,') ? img.split('base64,')[1] : img);
                }

                // ⚡️ SPEED OPTIMIZATION: Default to Flux.1-schnell if not specified.
                // Schnell is 10x faster than Pro/Dev models.
                const modelName = (effectiveDeployment || "Flux.1-schnell");
                const isSchnell = modelName.toLowerCase().includes('schnell') ||
                    modelName.toLowerCase().includes('fast') ||
                    effectiveBaseUrl.toLowerCase().includes('schnell');

                // Determine Strength Values
                // Priority: User Input > Backend Config > Default
                const mainStrength = user_inputs.strength
                    || promptConfig.params_json?.strength
                    || 0.3;

                // For Ref Strength, we look at the first reference asset's config
                // In future, could be per-asset if Flux API supports it.
                // Currently BFL API accepts a global 'reference_strength' or we map manually.
                // We'll use the primary one.
                const configRefStrength = variant.reference_map?.[0]?.adjustment_strength;
                const refStrength = user_inputs.reference_strength
                    || configRefStrength
                    || 0.6;

                // ⚡️ SPEED OPTIMIZATION: Reduce steps further for Flux.1-dev (14 -> 10)
                // 10 steps is enough for ID photos with simple backgrounds.
                const fluxBody: any = {
                    model: modelName,
                    prompt: finalPrompt,
                    num_inference_steps: isSchnell ? 4 : 10,
                    guidance_scale: isSchnell ? 1.0 : (user_inputs.guidance_scale || 7.5),
                    strength: mainStrength,
                    seed: Math.floor(Math.random() * 1000000)
                };

                if (return_payload_only) {
                    if (user_inputs.photo_storage_path || user_inputs.photo) {
                        fluxBody._attach_image_base64 = true; // Tell frontend to inject
                    }
                    // If ref images, we pass the URLs we resolved earlier
                    if (backendRefImages.length > 0) {
                        fluxBody.reference_images = backendRefImages;
                        fluxBody.reference_strength = refStrength;
                    }
                } else {
                    if (inputImageBase64) {
                        fluxBody.input_image = inputImageBase64.split('base64,')[1] || inputImageBase64;
                    }
                    if (backendRefImages.length > 0) {
                        // Need to download them if Flux doesn't support URL? 
                        // Actually Flux usually supports URL or Base64. 
                        // But if local, backendRefImages are Signed URLs, so they work.
                        fluxBody.reference_images = backendRefImages;
                        fluxBody.reference_strength = refStrength;
                    }
                }

                // ⚡️ SPEED OPTIMIZATION: Use 640x896 (Portrait) instead of 768x1024.
                // This reduces pixel count by ~25% more, significantly speeding up inference.
                fluxBody.width = 640;
                fluxBody.height = 896;

                const headers: Record<string, string> = { 'Content-Type': 'application/json' };
                if (effectiveBaseUrl.includes('bfl.ai') || effectiveBaseUrl.includes('api.bfl')) {
                    // 🔑 FIX: BFL uses 'x-key', not Bearer
                    headers['x-key'] = effectiveApiKey;
                } else if (effectiveBaseUrl.includes('services.ai.azure.com')) {
                    headers['api-key'] = effectiveApiKey;
                } else {
                    headers['Authorization'] = `Bearer ${effectiveApiKey}`;
                }

                if (return_payload_only) {
                    requestPlan = {
                        strategy: 'client_fetch',
                        provider: 'flux',
                        request: {
                            url, method: 'POST', headers,
                            body_type: 'json',
                            body_data: fluxBody
                        }
                    };
                } else {
                    const resp = await fetch(url, { method: 'POST', headers, body: JSON.stringify(fluxBody) });
                    if (!resp.ok) {
                        const err = await resp.text();
                        throw new Error(`Flux Provider API Error (${resp.status}): ${err}`);
                    }
                    const resJson = await resp.json();
                    if (resJson.image) imageUrl = resJson.image.startsWith('data:') ? resJson.image : `data:image/png;base64,${resJson.image}`;
                    else if (resJson.url) imageUrl = resJson.url;
                    else if (resJson.data && resJson.data[0]) imageUrl = resJson.data[0].url || `data:image/png;base64,${resJson.data[0].b64_json}`;
                    else throw new Error("No image in Flux response");
                }
            } else {
                throw new Error(`Unknown provider: ${provider_key}`);
            }
        }

        // Return Plan if requested
        if (requestPlan && selectedReferences.length > 0) {
            requestPlan.metadata = {
                ...(requestPlan.metadata || {}),
                reference_assets: selectedReferences,
                gender: user_inputs.gender ?? null,
                gender_confidence: user_inputs.gender_confidence ?? null
            };
        }

        if (return_payload_only && requestPlan) {
            addLog("REQUEST PLAN GENERATED:", requestPlan); // 🚀 DEBUG
            return new Response(JSON.stringify(requestPlan), {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' }
            });
        }

        // 7. Log Run
        // We use Service Role Client to bypass RLS for logging, ensuring we can log even for Anon users
        // (Since 'generation_runs' RLS might block Anon inserts)
        try {
            const serviceClient = createClient(
                Deno.env.get('SUPABASE_URL') ?? '',
                Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
            );

            const logPayload: any = {
                feature_key, variant_key, provider_key,
                input_assets_json: user_inputs,
                user_params_json: user_inputs,
                resolved_prompt: finalPrompt,
                reference_assets_json: selectedReferences,
                result_assets_json: [imageUrl],
                status: 'succeeded'
            };

            if (user) logPayload.user_id = user.id; // Only add if user exists

            const { error: logError } = await serviceClient.from('generation_runs').insert(logPayload);
            if (logError) console.error("Logging error:", logError);

        } catch (logErr) {
            console.error("Failed to init service client for logging:", logErr);
        }

        return new Response(JSON.stringify({
            image_url: imageUrl,
            prompt: finalPrompt,
            run_id: "generated-id"
        }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });

    } catch (error: any) {
        console.error("Critical Edge Function Error:", error);
        return new Response(JSON.stringify({
            error: error.message || "Unknown server error",
            stack: error.stack
        }), {
            status: 200, // Return 200 to allow frontend to read the 'error' field in JSON
            headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
    }
});
