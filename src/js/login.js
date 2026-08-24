import { signIn, signUp } from "./auth.js";
import { isSupabaseConfigured } from "./supabase.js";

const form = document.querySelector("#authForm");
const status = document.querySelector("#authStatus");
const nameField = document.querySelector("#nameField");
let mode = "login";

document.querySelectorAll("[data-mode]").forEach(button => button.addEventListener("click", () => {
  mode = button.dataset.mode;
  document.querySelectorAll("[data-mode]").forEach(item => item.classList.toggle("active", item === button));
  nameField.hidden = mode === "login";
  form.password.autocomplete = mode === "login" ? "current-password" : "new-password";
  status.textContent = "";
}));

if (!isSupabaseConfigured) status.textContent = "Configuration Supabase requise avant la première connexion.";

form.addEventListener("submit", async event => {
  event.preventDefault();
  status.textContent = "Vérification…";
  const values = new FormData(form);
  try {
    const result = mode === "login"
      ? await signIn(values.get("email"), values.get("password"))
      : await signUp(values.get("email"), values.get("password"), values.get("fullName"));
    if (mode === "signup" && !result.session) {
      status.textContent = "Compte créé. Vérifiez votre adresse e-mail avant de vous connecter.";
      return;
    }
    const next = new URLSearchParams(location.search).get("next") || "/account.html";
    location.assign(next.startsWith("/") ? next : "/account.html");
  } catch (error) {
    status.textContent = error.message || "Connexion impossible.";
  }
});

