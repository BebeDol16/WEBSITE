# ELITE Mobile

Prototype e-commerce premium pour accessoires smartphone à Madagascar.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l’adresse affichée par Vite. Un build de production se crée avec `npm run build`.

## Fonctionnalités

- catalogue dynamique, recherche, marque, modèle, catégorie et tri ;
- fiche produit accessible en fenêtre modale ;
- favoris et panier persistants dans le navigateur ;
- modification des quantités et calcul automatique des totaux ;
- checkout de démonstration (Visa/Mastercard, PayPal, MVola, Orange Money, Airtel Money, espèces) ;
- interface responsive et navigation clavier de base.

## Structure complémentaire

- `docs/ARCHITECTURE.md` décrit la fusion des deux versions et l’évolution backend ;
- `database/schema.sql` fournit le schéma PostgreSQL du catalogue, des clients, commandes et paiements ;
- `shopify/README.md` décrit la variante de thème Shopify ;
- `docs/design/` contient les concepts visuels de référence.

## Limites de cette V1

Le checkout ne prélève aucun paiement. Les produits, stocks, utilisateurs et commandes devront être raccordés à un backend sécurisé avant une mise en production.

