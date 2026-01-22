const FALLBACK_SUPABASE_URL = 'https://kmjfxqzquuprgfgqurmc.supabase.co';
const FALLBACK_SUPABASE_ANON_KEY = 'sb_publishable_h-0hslflVXwpTfYsemSwQA_J04M6RI3';

export const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || FALLBACK_SUPABASE_URL;
export const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || FALLBACK_SUPABASE_ANON_KEY;
export const isConfigured = Boolean(supabaseUrl && supabaseAnonKey);
