
import { useState } from 'react';
import { supabase } from '../../services/supabase';

interface GenerationRequest {
    feature_key: string;
    variant_key?: string;
    user_inputs: Record<string, any>;
    provider_api_key_override?: string;
}

interface GenerationResponse {
    image_url: string;
    status: string;
    error?: string;
}

export function useEdgeGeneration() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const generate = async (request: GenerationRequest): Promise<string | null> => {
        setLoading(true);
        setError(null);
        try {
            const { data, error } = await supabase.functions.invoke('generate-image', {
                body: request,
            });

            if (error) throw error;
            if (data.error) throw new Error(data.error);

            return data.image_url;
        } catch (err: any) {
            console.error('Generation Error:', err);

            // Attempt to extract meaningful error message from Supabase Functions response
            let message = err.message || 'Unknown error occurred';
            if (err.context && err.context.json) {
                try {
                    const body = await err.context.json();
                    if (body && body.error) {
                        message = body.error;
                    }
                } catch (e) {
                    // ignore json parse error
                }
            } else if (typeof err === 'string') {
                try {
                    const parsed = JSON.parse(err);
                    if (parsed.error) message = parsed.error;
                } catch (e) { }
            }

            setError(message);
            throw new Error(message); // Throw the clean message
        } finally {
            setLoading(false);
        }
    };

    return { generate, loading, error };
}
