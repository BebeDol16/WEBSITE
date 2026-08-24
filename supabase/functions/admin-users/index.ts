import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};

Deno.serve(async request => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = Deno.env.get("SUPABASE_URL")!;
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const authorization = request.headers.get("Authorization");
    if (!authorization) throw new Error("Session requise.");

    const token = authorization.replace("Bearer ", "");
    const authClient = createClient(url, anonKey);
    const { data: { user }, error: authError } = await authClient.auth.getUser(token);
    if (authError || !user) throw new Error("Session invalide.");

    const admin = createClient(url, serviceKey, { auth: { persistSession: false, autoRefreshToken: false } });
    const { data: actor } = await admin.from("profiles").select("role,status").eq("id", user.id).single();
    if (actor?.role !== "admin" || actor?.status !== "active") throw new Error("Accès administrateur refusé.");

    const body = await request.json();
    if (body.action === "list") {
      const { data: authUsers, error } = await admin.auth.admin.listUsers({ page: 1, perPage: 1000 });
      if (error) throw error;
      const { data: profiles } = await admin.from("profiles").select("id,full_name,role,status,created_at");
      const byId = new Map((profiles || []).map(profile => [profile.id, profile]));
      const users = authUsers.users.map(item => ({
        id: item.id,
        email: item.email,
        created_at: item.created_at,
        ...byId.get(item.id)
      }));
      return Response.json({ users }, { headers: cors });
    }

    if (body.action === "update") {
      const { userId, changes } = body;
      if (!userId || !changes || !["customer", "editor", "admin"].includes(changes.role ?? "customer") || !["active", "suspended"].includes(changes.status ?? "active")) {
        throw new Error("Modification non valide.");
      }
      if (userId === user.id && (changes.status === "suspended" || changes.role && changes.role !== "admin")) {
        throw new Error("Impossible de retirer votre propre accès administrateur.");
      }
      const allowed = Object.fromEntries(Object.entries(changes).filter(([key]) => ["role", "status"].includes(key)));
      const { error } = await admin.from("profiles").update({ ...allowed, updated_at: new Date().toISOString() }).eq("id", userId);
      if (error) throw error;
      await admin.from("audit_logs").insert({ actor_id: user.id, action: "user.update", target_id: userId, metadata: allowed });
      return Response.json({ ok: true }, { headers: cors });
    }
    throw new Error("Action inconnue.");
  } catch (error) {
    return Response.json({ error: error.message || "Erreur serveur." }, { status: 400, headers: cors });
  }
});

