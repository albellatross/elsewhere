
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl as fallbackSupabaseUrl, supabaseAnonKey as fallbackSupabaseAnonKey } from '../app/services/supabaseEnv';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || fallbackSupabaseUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || fallbackSupabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
