import { read, write } from "./storage.js";

export const state = {
  cart: read("cart", []),
  favorites: read("favorites", []),
  filters: { brand: "", model: "", category: "", query: "", sort: "featured", favoritesOnly: false }
};

export function toggleFavorite(id) {
  state.favorites = state.favorites.includes(id) ? state.favorites.filter(item => item !== id) : [...state.favorites, id];
  write("favorites", state.favorites);
}

export function addToCart(id, quantity = 1) {
  const item = state.cart.find(line => line.id === id);
  if (item) item.quantity += quantity; else state.cart.push({ id, quantity });
  write("cart", state.cart);
}

export function updateQuantity(id, quantity) {
  state.cart = quantity <= 0 ? state.cart.filter(item => item.id !== id) : state.cart.map(item => item.id === id ? { ...item, quantity } : item);
  write("cart", state.cart);
}

export function clearCart() { state.cart = []; write("cart", []); }

