import { requireAdmin, signOut } from "./auth.js";
import { requireConfiguration } from "./supabase.js";

const identity = await requireAdmin();
const client = requireConfiguration();
const status = document.querySelector("#adminStatus");
let users = [];
document.querySelector("#adminName").textContent = identity.profile.full_name || identity.user.email;

function switchView(view) {
  document.querySelectorAll("[data-panel]").forEach(panel => panel.hidden = panel.dataset.panel !== view);
  document.querySelectorAll("[data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === view));
  document.querySelector("#viewTitle").textContent = document.querySelector(`[data-view="${view}"]`).textContent;
}
document.querySelectorAll("[data-view]").forEach(button => button.addEventListener("click", () => switchView(button.dataset.view)));

async function invokeAdmin(action, payload = {}) {
  const { data, error } = await client.functions.invoke("admin-users", { body: { action, ...payload } });
  if (error) throw error;
  if (data?.error) throw new Error(data.error);
  return data;
}

function renderUsers(query = "") {
  const filtered = users.filter(user => `${user.full_name || ""} ${user.email || ""}`.toLowerCase().includes(query.toLowerCase()));
  document.querySelector("#usersTable").innerHTML = filtered.map(user => `<tr><td><strong>${user.full_name || "Sans nom"}</strong><small>${user.email || ""}</small></td><td><select data-role="${user.id}"><option ${user.role === "customer" ? "selected" : ""}>customer</option><option ${user.role === "editor" ? "selected" : ""}>editor</option><option ${user.role === "admin" ? "selected" : ""}>admin</option></select></td><td><span class="status-${user.status}">${user.status}</span></td><td>${new Date(user.created_at).toLocaleDateString("fr-FR")}</td><td><button data-toggle="${user.id}" data-status="${user.status}">${user.status === "active" ? "Suspendre" : "Réactiver"}</button></td></tr>`).join("");
  document.querySelectorAll("[data-role]").forEach(select => select.addEventListener("change", () => updateUser(select.dataset.role, { role: select.value })));
  document.querySelectorAll("[data-toggle]").forEach(button => button.addEventListener("click", () => updateUser(button.dataset.toggle, { status: button.dataset.status === "active" ? "suspended" : "active" })));
}

async function loadUsers() {
  status.textContent = "Chargement des utilisateurs…";
  try {
    const result = await invokeAdmin("list");
    users = result.users || [];
    renderUsers(document.querySelector("#userSearch").value);
    document.querySelector("#metricUsers").textContent = users.length;
    document.querySelector("#metricAdmins").textContent = users.filter(user => user.role === "admin").length;
    document.querySelector("#metricSuspended").textContent = users.filter(user => user.status === "suspended").length;
    status.textContent = "";
  } catch (error) { status.textContent = error.message; }
}

async function updateUser(userId, changes) {
  if (userId === identity.user.id && (changes.status === "suspended" || changes.role && changes.role !== "admin")) {
    status.textContent = "Vous ne pouvez pas retirer votre propre accès administrateur.";
    await loadUsers(); return;
  }
  try { await invokeAdmin("update", { userId, changes }); await loadUsers(); status.textContent = "Utilisateur mis à jour."; }
  catch (error) { status.textContent = error.message; }
}

async function loadAudit() {
  const { data } = await client.from("audit_logs").select("created_at, action, target_id, actor_id").order("created_at", { ascending: false }).limit(100);
  document.querySelector("#metricEvents").textContent = data?.length || 0;
  document.querySelector("#auditTable").innerHTML = (data || []).map(log => `<tr><td>${new Date(log.created_at).toLocaleString("fr-FR")}</td><td>${log.actor_id}</td><td>${log.action}</td><td>${log.target_id || "—"}</td></tr>`).join("");
}
document.querySelector("#userSearch").addEventListener("input", event => renderUsers(event.target.value));
document.querySelector("#refreshUsers").addEventListener("click", loadUsers);
document.querySelector("#logoutButton").addEventListener("click", async () => { await signOut(); location.replace("/login.html"); });
await Promise.all([loadUsers(), loadAudit()]);

