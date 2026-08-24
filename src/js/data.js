export const brands = {
  Apple: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max"],
  Samsung: ["Galaxy S26 Ultra", "Galaxy S26+", "Galaxy S25 Ultra", "Galaxy S25+", "Galaxy Z Fold"],
  Xiaomi: ["Xiaomi 17 Ultra", "Xiaomi 17 Pro", "Xiaomi 15 Ultra", "Xiaomi 15"],
  Huawei: ["Huawei Pura 80 Ultra", "Huawei Pura 80 Pro", "Huawei Mate 70 Pro", "Huawei Nova"],
  Redmi: ["Redmi Note 15 Pro+", "Redmi Note 15 Pro", "Redmi Note 14 Pro+", "Redmi Note 14"],
  Blackview: ["BL9000 Pro", "BV9300 Pro", "Shark 9", "A200 Pro"]
};

export const categories = ["Protection", "Charge", "Câbles", "Audio"];

export const products = [
  { id: 1, name: "Coque Halo MagSafe", category: "Protection", price: 129000, brand: "Apple", models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max"], color: "smoke", description: "Protection transparente anti-jaunissement, anneau magnétique renforcé et rebords surélevés.", tag: "Nouveau" },
  { id: 2, name: "Coque Carbon Shield", category: "Protection", price: 149000, brand: "Samsung", models: ["Galaxy S26 Ultra", "Galaxy S25 Ultra", "Galaxy S25+"], color: "black", description: "Fibre aramide, profil ultrafin et grip latéral précis pour une protection premium.", tag: "Bestseller" },
  { id: 3, name: "Chargeur GaN 67W", category: "Charge", price: 189000, brand: "Universel", models: [], color: "graphite", description: "Charge rapide compacte, deux ports USB-C et un port USB-A avec gestion thermique.", tag: "Puissant" },
  { id: 4, name: "Câble Studio USB-C", category: "Câbles", price: 59000, brand: "Universel", models: [], color: "lime", description: "Câble tressé 100 W, connecteurs renforcés et longueur confortable de 1,5 m.", tag: "Garanti 2 ans" },
  { id: 5, name: "Station Orbit 3-en-1", category: "Charge", price: 329000, brand: "Apple", models: ["iPhone 17 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max"], color: "silver", description: "Recharge simultanée du téléphone, des écouteurs et de la montre dans un seul geste.", tag: "Premium" },
  { id: 6, name: "Verre Sapphire HD", category: "Protection", price: 79000, brand: "Xiaomi", models: ["Xiaomi 17 Ultra", "Xiaomi 15 Ultra", "Xiaomi 15"], color: "ice", description: "Verre haute transparence, pose assistée sans bulles et traitement anti-traces.", tag: "2 pièces" },
  { id: 7, name: "Écouteurs Air Pulse", category: "Audio", price: 279000, brand: "Universel", models: [], color: "white", description: "Réduction de bruit hybride, appels clairs et autonomie totale de 30 heures.", tag: "Audio HD" },
  { id: 8, name: "Coque Terra Rugged", category: "Protection", price: 119000, brand: "Blackview", models: ["BL9000 Pro", "BV9300 Pro", "Shark 9"], color: "orange", description: "Protection robuste à double couche conçue pour les usages intensifs et les chocs.", tag: "Renforcée" },
  { id: 9, name: "Chargeur Nomad 45W", category: "Charge", price: 139000, brand: "Huawei", models: ["Huawei Pura 80 Ultra", "Huawei Mate 70 Pro", "Huawei Nova"], color: "cream", description: "Bloc compact USB-C Power Delivery avec câble tressé assorti.", tag: "Compact" },
  { id: 10, name: "Coque Soft Touch", category: "Protection", price: 89000, brand: "Redmi", models: ["Redmi Note 15 Pro+", "Redmi Note 14 Pro+", "Redmi Note 14"], color: "blue", description: "Silicone doux, intérieur microfibre et coloris minéral sobre.", tag: "Essentiel" }
];

export const payments = [
  ["card", "Visa / Mastercard", "Carte bancaire"], ["paypal", "PayPal", "Compte PayPal"], ["mvola", "MVola", "Mobile Money"],
  ["orange", "Orange Money", "Mobile Money"], ["airtel", "Airtel Money", "Mobile Money"], ["cash", "Espèces", "À la livraison"]
];

