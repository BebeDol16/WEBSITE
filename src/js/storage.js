const PREFIX = "elite-mobile:";

export function read(key, fallback) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function write(key, value) {
  try { localStorage.setItem(PREFIX + key, JSON.stringify(value)); } catch { /* Navigation privée ou stockage indisponible. */ }
}

