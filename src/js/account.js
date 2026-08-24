import { getIdentity, signOut } from "./auth.js";
import { requireConfiguration } from "./supabase.js";

const identity = await getIdentity();
if (!identity) location.replace("/login.html?next=/account.html");
else {
  document.querySelector("#accountTitle").textContent = `Bienvenue, ${identity.profile?.full_name || identity.user.email}`;
  document.querySelector("#accountProfile").innerHTML = `<dl><dt>E-mail</dt><dd>${identity.user.email}</dd><dt>Statut</dt><dd>${identity.profile?.status || "actif"}</dd></dl>`;
  const { data } = await requireConfiguration().from("orders").select("reference, status, total_mga, created_at").order("created_at", { ascending: false });
  if (data?.length) document.querySelector("#accountOrders").innerHTML = data.map(order => `<article class="order-row"><strong>${order.reference}</strong><span>${order.status}</span><b>${new Intl.NumberFormat("fr-FR").format(order.total_mga)} Ar</b></article>`).join("");
}
document.querySelector("#logoutButton").addEventListener("click", async () => { await signOut(); location.replace("/"); });

