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

## Authentification et administration

1. Créez un projet Supabase et copiez `.env.example` vers `.env.local`.
2. Renseignez uniquement l’URL et la clé publique `anon` dans les variables `VITE_`.
3. Exécutez `database/schema.sql`, puis `supabase/migrations/001_auth_admin.sql` dans Supabase.
4. Créez votre compte via `/login.html`, puis attribuez-lui le rôle `admin` avec la commande commentée à la fin de la migration.
5. Déployez la fonction Edge `admin-users`. La clé `service_role` reste exclusivement dans les secrets Supabase.
6. Ouvrez `/admin.html` pour accéder au contrôle des utilisateurs et au journal de sécurité.

Ne publiez jamais `.env.local` ni une clé `service_role` dans GitHub ou dans le code du navigateur.

## Limites de cette V1

Le checkout ne prélève aucun paiement. Les produits, stocks, utilisateurs et commandes devront être raccordés à un backend sécurisé avant une mise en production.

