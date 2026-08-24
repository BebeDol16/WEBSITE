# Architecture ELITE Mobile

Ce dépôt réunit les deux versions du projet dans une structure unique.

## Front-end actuel

- `index.html` : accueil, catalogue, produit, panier et checkout.
- `src/js/data.js` : catalogue, marques, modèles et paiements.
- `src/js/store.js` : panier, favoris et filtres.
- `src/js/storage.js` : persistance locale.
- `src/js/app.js` : rendu et interactions.
- `src/styles/main.css` : design responsive.

## Parcours client

Accueil → Marque → Modèle → Catalogue → Produit → Panier → Checkout → Confirmation

## Évolution vers une vraie boutique

Le front-end pourra être relié à une API REST comportant les modules suivants :

- authentification et comptes clients ;
- catalogue, variantes, compatibilités et stocks ;
- commandes et suivi ;
- promotions et livraison ;
- paiements par carte, PayPal, MVola, Orange Money, Airtel Money et espèces ;
- administration des produits, clients et commandes.

La base relationnelle de départ se trouve dans `database/schema.sql`.

## Variante Shopify

Le dossier `shopify/` documente la transposition vers un thème Shopify utilisant Liquid, des sections configurables, des templates JSON et l’API Ajax du panier.

