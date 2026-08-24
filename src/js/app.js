import { brands, categories, payments, products } from "./data.js";
import { state, addToCart, clearCart, toggleFavorite, updateQuantity } from "./store.js";

const $ = selector => document.querySelector(selector);
const formatPrice = value => `${new Intl.NumberFormat("fr-FR").format(value)} Ar`;
const byId = id => products.find(product => product.id === Number(id));
const elements = {
  grid: $("#productGrid"), brandList: $("#brandList"), model: $("#modelSelect"), category: $("#categorySelect"), search: $("#searchInput"), sort: $("#sortSelect"),
  cartCount: $("#cartCount"), favoriteCount: $("#favoriteCount"), resultCount: $("#resultCount"), overlay: $("#overlay"), cart: $("#cartDrawer"), productModal: $("#productModal"), checkout: $("#checkoutModal"), success: $("#successModal"), toast: $("#toast")
};

function productVisual(product, large = false) {
  const categoryClass = product.category.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
  return `<div class="product-visual ${large ? "large" : ""} tone-${product.color}"><div class="device device-${categoryClass}"><span>ELITE.</span></div><i></i><i></i></div>`;
}

function renderBrands() {
  elements.brandList.innerHTML = Object.keys(brands).map(name => `<button class="brand-button ${state.filters.brand === name ? "active" : ""}" data-brand="${name}">${name}</button>`).join("");
  const models = state.filters.brand ? brands[state.filters.brand] : Object.values(brands).flat();
  elements.model.innerHTML = `<option value="">Tous les modèles</option>${models.map(model => `<option ${state.filters.model === model ? "selected" : ""}>${model}</option>`).join("")}`;
  elements.model.parentElement.classList.toggle("visible", Boolean(state.filters.brand));
}

function filteredProducts() {
  const query = state.filters.query.trim().toLocaleLowerCase("fr");
  const result = products.filter(product => {
    const brandMatch = !state.filters.brand || product.brand === state.filters.brand || product.brand === "Universel";
    const modelMatch = !state.filters.model || product.models.includes(state.filters.model) || product.brand === "Universel";
    const categoryMatch = !state.filters.category || product.category === state.filters.category;
    const textMatch = !query || [product.name, product.category, product.brand, product.description, ...product.models].join(" ").toLocaleLowerCase("fr").includes(query);
    return brandMatch && modelMatch && categoryMatch && textMatch && (!state.filters.favoritesOnly || state.favorites.includes(product.id));
  });
  if (state.filters.sort === "price-asc") result.sort((a, b) => a.price - b.price);
  if (state.filters.sort === "price-desc") result.sort((a, b) => b.price - a.price);
  return result;
}

function renderProducts() {
  const list = filteredProducts();
  elements.resultCount.textContent = `${list.length} produit${list.length > 1 ? "s" : ""}`;
  elements.grid.innerHTML = list.map(product => `<article class="product-card" data-id="${product.id}"><button class="favorite ${state.favorites.includes(product.id) ? "active" : ""}" data-favorite="${product.id}" aria-label="${state.favorites.includes(product.id) ? "Retirer des" : "Ajouter aux"} favoris">♡</button><button class="product-open" data-product="${product.id}" aria-label="Voir ${product.name}">${productVisual(product)}<div class="product-info"><div><span>${product.category} · ${product.tag}</span><h3>${product.name}</h3><p>${product.brand === "Universel" ? "Compatibilité universelle" : product.models.slice(0, 2).join(" · ")}</p></div><strong>${formatPrice(product.price)}</strong></div></button><button class="quick-add" data-add="${product.id}">Ajouter <span>+</span></button></article>`).join("");
  $("#emptyState").classList.toggle("hidden", list.length > 0);
}

function renderCounts() {
  elements.favoriteCount.textContent = state.favorites.length;
  elements.cartCount.textContent = state.cart.reduce((sum, item) => sum + item.quantity, 0);
}

function cartLines() { return state.cart.map(item => ({ ...item, product: byId(item.id) })).filter(item => item.product); }
function cartSubtotal() { return cartLines().reduce((sum, item) => sum + item.product.price * item.quantity, 0); }

function renderCart() {
  const lines = cartLines();
  $("#cartItems").innerHTML = lines.length ? lines.map(({ product, quantity }) => `<article class="cart-line">${productVisual(product)}<div><span>${product.category}</span><h3>${product.name}</h3><strong>${formatPrice(product.price)}</strong><div class="quantity"><button data-quantity="${product.id}" data-delta="-1" aria-label="Réduire">−</button><span>${quantity}</span><button data-quantity="${product.id}" data-delta="1" aria-label="Augmenter">+</button></div></div><button class="remove" data-remove="${product.id}" aria-label="Retirer ${product.name}">×</button></article>`).join("") : `<div class="cart-empty"><span>Bag</span><h3>Votre panier est vide.</h3><p>Découvrez notre sélection d’accessoires conçus pour durer.</p><button class="button button-dark" data-close>Découvrir la boutique</button></div>`;
  $("#cartFooter").classList.toggle("hidden", !lines.length);
  $("#cartSubtotal").textContent = formatPrice(cartSubtotal());
  renderCounts();
}

function showLayer(target) {
  [elements.cart, elements.productModal, elements.checkout, elements.success].forEach(node => { node.classList.remove("open"); node.setAttribute("aria-hidden", "true"); });
  elements.overlay.hidden = false; requestAnimationFrame(() => elements.overlay.classList.add("show"));
  target.classList.add("open"); target.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll");
  target.querySelector("button, input")?.focus();
}

function closeLayers() {
  [elements.cart, elements.productModal, elements.checkout, elements.success].forEach(node => { node.classList.remove("open"); node.setAttribute("aria-hidden", "true"); });
  elements.overlay.classList.remove("show"); document.body.classList.remove("no-scroll"); setTimeout(() => { elements.overlay.hidden = true; }, 200);
}

function openProduct(id) {
  const product = byId(id); if (!product) return;
  $("#productDetail").innerHTML = `<div class="modal-visual">${productVisual(product, true)}</div><div class="modal-copy"><span>${product.category} · ${product.tag}</span><h2 id="modalTitle">${product.name}</h2><strong>${formatPrice(product.price)}</strong><p>${product.description}</p><div class="compatibility"><b>Compatibilité</b><span>${product.models.length ? product.models.join(" · ") : "Tous les smartphones USB-C compatibles"}</span></div><div class="modal-actions"><button class="button button-accent" data-add="${product.id}" data-close-after>Ajouter au panier →</button><button class="favorite-large ${state.favorites.includes(product.id) ? "active" : ""}" data-favorite="${product.id}">♡</button></div></div>`;
  showLayer(elements.productModal);
}

function openCheckout() {
  const lines = cartLines(); if (!lines.length) return;
  $("#paymentOptions").innerHTML = payments.map(([value, name, note], index) => `<label class="payment-option"><input type="radio" name="payment" value="${value}" ${index === 0 ? "checked" : ""} /><span><b>${name}</b><small>${note}</small></span></label>`).join("");
  $("#checkoutItems").innerHTML = lines.map(({ product, quantity }) => `<div class="checkout-line"><span>${quantity} × ${product.name}</span><strong>${formatPrice(product.price * quantity)}</strong></div>`).join("");
  const subtotal = cartSubtotal(); $("#checkoutSubtotal").textContent = formatPrice(subtotal); $("#checkoutTotal").textContent = formatPrice(subtotal + 10000);
  updatePaymentNote("card"); showLayer(elements.checkout);
}

function updatePaymentNote(value) {
  const notes = { card: "Le paiement carte sera traité par une passerelle certifiée. Aucune donnée bancaire n’est enregistrée ici.", paypal: "Vous serez redirigé vers PayPal lors de l’intégration réelle.", mvola: "Une demande de validation MVola sera envoyée au numéro renseigné.", orange: "Une demande Orange Money sera envoyée au numéro renseigné.", airtel: "Une demande Airtel Money sera envoyée au numéro renseigné.", cash: "Vous réglerez le montant au moment de la livraison." };
  $("#paymentNote").textContent = notes[value];
}

let toastTimer;
function toast(message) { elements.toast.textContent = message; elements.toast.classList.add("show"); clearTimeout(toastTimer); toastTimer = setTimeout(() => elements.toast.classList.remove("show"), 2400); }
function resetFilters() { Object.assign(state.filters, { brand: "", model: "", category: "", query: "", sort: "featured", favoritesOnly: false }); elements.search.value = ""; elements.category.value = ""; elements.sort.value = "featured"; renderBrands(); renderProducts(); }

document.addEventListener("click", event => {
  const target = event.target.closest("button, [data-close]"); if (!target) return;
  if (target.matches("[data-brand]")) { state.filters.brand = state.filters.brand === target.dataset.brand ? "" : target.dataset.brand; state.filters.model = ""; renderBrands(); renderProducts(); }
  if (target.matches("[data-product]")) openProduct(target.dataset.product);
  if (target.matches("[data-favorite]")) { toggleFavorite(Number(target.dataset.favorite)); renderProducts(); renderCounts(); if (elements.productModal.classList.contains("open")) openProduct(target.dataset.favorite); toast("Favoris mis à jour"); }
  if (target.matches("[data-add]")) { addToCart(Number(target.dataset.add)); renderCart(); toast("Ajouté au panier"); if (target.hasAttribute("data-close-after")) { closeLayers(); setTimeout(() => { renderCart(); showLayer(elements.cart); }, 220); } }
  if (target.matches("[data-quantity]")) { const line = state.cart.find(item => item.id === Number(target.dataset.quantity)); if (line) updateQuantity(line.id, line.quantity + Number(target.dataset.delta)); renderCart(); }
  if (target.matches("[data-remove]")) { updateQuantity(Number(target.dataset.remove), 0); renderCart(); }
  if (target.matches("[data-close]")) closeLayers();
});

elements.overlay.addEventListener("click", closeLayers);
$("#openCart").addEventListener("click", () => { renderCart(); showLayer(elements.cart); });
$("#openSearch").addEventListener("click", () => { document.querySelector("#catalogue").scrollIntoView(); setTimeout(() => elements.search.focus(), 400); });
$("#showFavorites").addEventListener("click", () => { state.filters.favoritesOnly = !state.filters.favoritesOnly; renderProducts(); document.querySelector("#catalogue").scrollIntoView(); toast(state.filters.favoritesOnly ? "Favoris affichés" : "Toute la collection affichée"); });
$("#checkoutButton").addEventListener("click", openCheckout);
$("#resetFilters").addEventListener("click", resetFilters); $("#emptyReset").addEventListener("click", resetFilters);
elements.search.addEventListener("input", event => { state.filters.query = event.target.value; renderProducts(); });
elements.category.addEventListener("change", event => { state.filters.category = event.target.value; renderProducts(); });
elements.sort.addEventListener("change", event => { state.filters.sort = event.target.value; renderProducts(); });
elements.model.addEventListener("change", event => { state.filters.model = event.target.value; renderProducts(); });
$("#paymentOptions").addEventListener("change", event => updatePaymentNote(event.target.value));
$("#checkoutForm").addEventListener("submit", event => { event.preventDefault(); const ref = `EL-${new Date().getFullYear()}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36).slice(0, 6).toUpperCase()}`; clearCart(); renderCart(); $("#orderReference").textContent = ref; showLayer(elements.success); event.target.reset(); });
$("#successButton").addEventListener("click", () => { closeLayers(); document.querySelector("#catalogue").scrollIntoView(); });
$("#menuButton").addEventListener("click", event => { const open = document.body.classList.toggle("menu-open"); event.currentTarget.setAttribute("aria-expanded", String(open)); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLayers(); });
window.addEventListener("scroll", () => $("#header").classList.toggle("scrolled", scrollY > 10), { passive: true });

elements.category.innerHTML += categories.map(category => `<option>${category}</option>`).join("");
renderBrands(); renderProducts(); renderCart();

