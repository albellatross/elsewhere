
import { createClient } from '@supabase/supabase-js';
import { supabaseUrl as defaultSupabaseUrl, supabaseAnonKey as defaultSupabaseAnonKey } from '../app/services/config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

export const supabase = createClient(supabaseUrl, supabaseKey);
