import { isSupabaseConfigured, requireConfiguration } from "./supabase.js";

export async function signIn(email, password) {
  const { data, error } = await requireConfiguration().auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

export async function signUp(email, password, fullName) {
  const { data, error } = await requireConfiguration().auth.signUp({
    email,
    password,
    options: { data: { full_name: fullName } }
  });
  if (error) throw error;
  return data;
}

export async function signOut() {
  const { error } = await requireConfiguration().auth.signOut();
  if (error) throw error;
}

export async function getIdentity() {
  if (!isSupabaseConfigured) return null;
  const client = requireConfiguration();
  const { data: { user }, error } = await client.auth.getUser();
  if (error || !user) return null;
  const { data: profile } = await client.from("profiles").select("id, full_name, role, status").eq("id", user.id).single();
  return { user, profile };
}

export async function requireAdmin() {
  const identity = await getIdentity();
  if (!identity || identity.profile?.role !== "admin" || identity.profile?.status !== "active") {
    window.location.replace("/login.html?next=/admin.html");
    throw new Error("Accès administrateur requis.");
  }
  return identity;
}

