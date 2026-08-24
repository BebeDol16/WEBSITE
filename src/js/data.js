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
  { id: 1, name: "Housse Halo MagSafe", category: "Protection", price: 129000, stock: 18, brand: "Apple", models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro Max"], color: "smoke", description: "Housse transparente anti-jaunissement avec anneau magnétique renforcé et rebords surélevés.", tag: "Nouveau" },
  { id: 2, name: "Housse Carbon Shield", category: "Protection", price: 149000, stock: 12, brand: "Samsung", models: ["Galaxy S26 Ultra", "Galaxy S25 Ultra", "Galaxy S25+"], color: "black", description: "Fibre aramide, profil ultrafin et grip latéral précis pour une protection premium.", tag: "Bestseller" },
  { id: 3, name: "Housse Soft Touch", category: "Protection", price: 89000, stock: 24, brand: "Redmi", models: ["Redmi Note 15 Pro+", "Redmi Note 14 Pro+", "Redmi Note 14"], color: "blue", description: "Silicone doux, intérieur microfibre et finition minérale résistante aux traces.", tag: "Essentiel" },
  { id: 4, name: "Housse Terra Rugged", category: "Protection", price: 119000, stock: 10, brand: "Blackview", models: ["BL9000 Pro", "BV9300 Pro", "Shark 9"], color: "orange", description: "Double couche renforcée, angles absorbants et prise en main sécurisée pour les usages intensifs.", tag: "Renforcée" },
  { id: 5, name: "Housse Crystal Air", category: "Protection", price: 99000, stock: 16, brand: "Xiaomi", models: ["Xiaomi 17 Ultra", "Xiaomi 17 Pro", "Xiaomi 15 Ultra"], color: "ice", description: "Housse fine et transparente avec protection caméra et traitement anti-rayures.", tag: "Ultrafine" },

  { id: 6, name: "Câble Studio USB-C 100W", category: "Câbles", price: 59000, stock: 35, brand: "Universel", models: [], color: "lime", description: "Câble USB-C vers USB-C tressé de 1,5 m, compatible charge rapide jusqu’à 100 W.", tag: "100 W" },
  { id: 7, name: "Câble Lightning Premium", category: "Câbles", price: 49000, stock: 30, brand: "Apple", models: ["iPhone 15 Pro Max"], color: "white", description: "Câble USB-C vers Lightning renforcé de 1 m pour charge rapide et synchronisation.", tag: "Certifié" },
  { id: 8, name: "Câble USB-C Nomad 2m", category: "Câbles", price: 65000, stock: 22, brand: "Universel", models: [], color: "black", description: "Long câble tressé de 2 m avec connecteurs aluminium et attache de rangement.", tag: "2 mètres" },
  { id: 9, name: "Câble Multi 3-en-1", category: "Câbles", price: 69000, stock: 20, brand: "Universel", models: [], color: "orange", description: "Connecteurs USB-C, Lightning et Micro-USB réunis dans un câble pratique pour tous vos appareils.", tag: "Polyvalent" },
  { id: 10, name: "Câble Data Pro USB-C", category: "Câbles", price: 79000, stock: 14, brand: "Universel", models: [], color: "graphite", description: "Transfert de données haute vitesse et alimentation 100 W avec gaine nylon renforcée.", tag: "Data rapide" },

  { id: 11, name: "Chargeur GaN 67W", category: "Charge", price: 189000, stock: 15, brand: "Universel", models: [], color: "graphite", description: "Deux ports USB-C et un port USB-A avec gestion thermique intelligente.", tag: "Puissant" },
  { id: 12, name: "Chargeur Nomad 45W", category: "Charge", price: 139000, stock: 19, brand: "Huawei", models: ["Huawei Pura 80 Ultra", "Huawei Mate 70 Pro", "Huawei Nova"], color: "cream", description: "Bloc compact USB-C Power Delivery livré avec son câble tressé.", tag: "Compact" },
  { id: 13, name: "Chargeur Express 25W", category: "Charge", price: 99000, stock: 28, brand: "Samsung", models: ["Galaxy S26 Ultra", "Galaxy S26+", "Galaxy S25 Ultra"], color: "white", description: "Chargeur USB-C compact avec protocole de charge rapide compatible Samsung.", tag: "Charge rapide" },
  { id: 14, name: "Chargeur Mini 20W", category: "Charge", price: 89000, stock: 32, brand: "Apple", models: ["iPhone 17 Pro Max", "iPhone 17 Pro", "iPhone 16 Pro"], color: "blue", description: "Adaptateur USB-C léger et compact, idéal pour la maison et les déplacements.", tag: "Mini" },
  { id: 15, name: "Station Orbit 3-en-1", category: "Charge", price: 329000, stock: 8, brand: "Apple", models: ["iPhone 17 Pro Max", "iPhone 16 Pro", "iPhone 15 Pro Max"], color: "silver", description: "Recharge simultanée du téléphone, des écouteurs et de la montre sur un support élégant.", tag: "Premium" },

  { id: 16, name: "Écouteurs Air Pulse ANC", category: "Audio", price: 279000, stock: 11, brand: "Universel", models: [], color: "white", description: "Réduction de bruit hybride, appels clairs et autonomie totale de 30 heures.", tag: "ANC" },
  { id: 17, name: "Écouteurs Bass Core", category: "Audio", price: 159000, stock: 17, brand: "Universel", models: [], color: "black", description: "Son puissant, basses profondes, mode jeu faible latence et boîtier compact.", tag: "Basses HD" },
  { id: 18, name: "Écouteurs Open Fit", category: "Audio", price: 219000, stock: 13, brand: "Huawei", models: [], color: "cream", description: "Design ouvert confortable, micros anti-bruit et connexion Bluetooth multipoint.", tag: "Confort" },
  { id: 19, name: "Écouteurs Sport Move", category: "Audio", price: 189000, stock: 16, brand: "Universel", models: [], color: "orange", description: "Maintien sécurisé, résistance à la transpiration et commandes tactiles pour le sport.", tag: "Sport" },
  { id: 20, name: "Écouteurs Studio Pro", category: "Audio", price: 349000, stock: 7, brand: "Samsung", models: [], color: "graphite", description: "Audio haute résolution, réduction de bruit adaptative et recharge sans fil.", tag: "Studio" }
];

export const payments = [
  ["card", "Visa / Mastercard", "Carte bancaire"], ["paypal", "PayPal", "Compte PayPal"], ["mvola", "MVola", "Mobile Money"],
  ["orange", "Orange Money", "Mobile Money"], ["airtel", "Airtel Money", "Mobile Money"], ["cash", "Espèces", "À la livraison"]
];

