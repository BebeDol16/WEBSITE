import { createClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && key);
export const supabase = isSupabaseConfigured
  ? createClient(url, key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true }
    })
  : null;

export function requireConfiguration() {
  if (!supabase) throw new Error("Supabase n’est pas encore configuré. Consultez .env.example.");
  return supabase;
}

