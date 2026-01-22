import { supabase } from '../../services/supabase';
import { isConfigured } from './supabaseEnv';

const CONFIG_FUNCTION_NAME = 'config';

type ApiResult<T> = {
  data?: T | null;
  error?: string | null;
  [key: string]: unknown;
};

type ConfigRequestPayload = {
  type: 'features' | 'variants' | 'details';
  feature_key?: string;
  variant_key?: string | null;
};

export type ConfigFeature = {
  id: string;
  key: string;
  name?: string | null;
  description?: string | null;
  sort_order?: number | null;
  metadata_json?: Record<string, unknown> | null;
  is_active?: boolean;
  [key: string]: unknown;
};

export type ConfigVariant = {
  id: string;
  feature_id?: string;
  key: string;
  name?: string | null;
  description?: string | null;
  metadata_json?: Record<string, unknown> | null;
  sort_order?: number | null;
  is_active?: boolean;
  [key: string]: unknown;
};

export type VariantPrompt = {
  prompt_template?: string | null;
  negative_prompt?: string | null;
  params_json?: Record<string, unknown> | null;
  version?: number | null;
  [key: string]: unknown;
};

export type VariantReference = {
  id?: string;
  key?: string | null;
  name?: string | null;
  public_url?: string | null;
  storage_path?: string | null;
  role?: string | null;
  adjustment_strength?: number | null;
  [key: string]: unknown;
};

export type VariantDetailsResponse = {
  variant: {
    id: string;
    name: string | null;
    description: string | null;
    [key: string]: unknown;
  } | null;
  prompt: VariantPrompt | null;
  references: VariantReference[];
};

async function invokeConfig<T>(payload: ConfigRequestPayload): Promise<T | null> {
  if (!isConfigured) {
    console.warn('[config] Supabase environment variables missing.');
    return null;
  }

  try {
    const { data, error } = await supabase.functions.invoke<ApiResult<T>>(CONFIG_FUNCTION_NAME, {
      body: payload,
    });

    if (error) {
      console.warn('[config] Failed request', { payload, error });
      return null;
    }

    if (!data) {
      console.warn('[config] Empty response', { payload });
      return null;
    }

    if (typeof data === 'object' && data !== null) {
      const result = data as ApiResult<T>;
      if (result.error) {
        console.warn('[config] Error payload', { payload, error: result.error });
        return null;
      }

      if (result.data !== undefined) {
        return (result.data ?? null) as T | null;
      }
    }

    console.warn('[config] Unexpected response shape', { payload, data });
    return null;
  } catch (error) {
    console.warn('[config] Network error', { payload, error });
    return null;
  }
}

export async function fetchFeatures(): Promise<ConfigFeature[] | null> {
  return invokeConfig<ConfigFeature[]>({ type: 'features' });
}

export async function fetchVariants(featureKey: string): Promise<ConfigVariant[] | null> {
  return invokeConfig<ConfigVariant[]>({ type: 'variants', feature_key: featureKey });
}

export async function fetchVariantDetails(
  featureKey: string,
  variantKey: string | null | undefined,
): Promise<VariantDetailsResponse | null> {
  if (!variantKey) return null;
  return invokeConfig<VariantDetailsResponse>({
    type: 'details',
    feature_key: featureKey,
    variant_key: variantKey,
  });
}
