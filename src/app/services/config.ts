const FALLBACK_SUPABASE_URL = 'https://your-project.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'your-anon-key';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;

const isConfigured =
  supabaseUrl &&
  supabaseUrl !== FALLBACK_SUPABASE_URL &&
  supabaseAnonKey &&
  supabaseAnonKey !== FALLBACK_SUPABASE_ANON_KEY;

const baseHeaders = isConfigured
  ? {
      Authorization: `Bearer ${supabaseAnonKey}`,
      apikey: supabaseAnonKey,
    }
  : null;

const configEndpoint = isConfigured
  ? `${supabaseUrl.replace(/\/+$/, '')}/functions/v1/config`
  : null;

type ApiResult<T> = {
  data?: T | null;
  error?: string | null;
  [key: string]: unknown;
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

async function request<T>(path: string): Promise<T | null> {
  if (!configEndpoint || !baseHeaders) {
    console.warn('[config] Supabase environment variables missing.');
    return null;
  }

  const url = `${configEndpoint}${path}${path.includes('?') ? '&' : '?'}_=${Date.now()}`;

  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: baseHeaders,
      cache: 'no-store',
    });

    const payload = (await response.json().catch(() => null)) as ApiResult<T> | null;

    if (!response.ok || !payload) {
      console.warn('[config] Failed request', { path: url, status: response.status });
      return null;
    }

    if (payload.error) {
      console.warn('[config] Error payload', { path: url, error: payload.error });
      return null;
    }

    if (payload.data !== undefined) {
      return (payload.data ?? null) as T | null;
    }

    console.warn('[config] Unexpected response shape', { path: url, payload });
    return null;
  } catch (error) {
    console.warn('[config] Network error', { path: url, error });
    return null;
  }
}

export async function fetchFeatures(): Promise<ConfigFeature[] | null> {
  return request<ConfigFeature[]>('?type=features');
}

export async function fetchVariants(featureKey: string): Promise<ConfigVariant[] | null> {
  return request<ConfigVariant[]>(`?type=variants&feature_key=${encodeURIComponent(featureKey)}`);
}

export async function fetchVariantDetails(
  featureKey: string,
  variantKey: string | null | undefined,
): Promise<VariantDetailsResponse | null> {
  if (!variantKey) return null;
  return request<VariantDetailsResponse>(
    `?type=details&feature_key=${encodeURIComponent(featureKey)}&variant_key=${encodeURIComponent(variantKey)}`,
  );
}
