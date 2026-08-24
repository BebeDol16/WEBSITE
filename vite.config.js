import { defineConfig } from "vite";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        boutique: resolve(rootDir, "index.html"),
        connexion: resolve(rootDir, "login.html"),
        compte: resolve(rootDir, "account.html"),
        administration: resolve(rootDir, "admin.html")
      }
    }
  }
});

