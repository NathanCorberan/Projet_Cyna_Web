# nathancorberan-projet_cyna_web

## Description
**nathancorberan-projet_cyna_web** est une application web e-commerce développée avec **React** et **Vite.js**. Elle permet aux utilisateurs d'acheter et gérer des abonnements aux solutions de sécurité SaaS proposées par Cyna. L'objectif du projet est d'offrir une expérience fluide et sécurisée pour les utilisateurs, ainsi qu'un back-office performant pour la gestion des produits et commandes.

## Prérequis
Avant d'installer et d'exécuter ce projet, assurez-vous d'avoir les outils suivants installés :

- [Node.js](https://nodejs.org/) (version 18) et npm
- [Git](https://git-scm.com/)

## Installation

### 1. Cloner le dépôt
```sh
git clone https://github.com/NathanCorberan/Projet_Cyna_Web.git
cd projet_cyna_web
```

### 2. Installer les dépendances
```sh
npm install
```

### 3. Configuration de l'environnement
Créez un fichier `.env` à la racine du projet et ajoutez-y les variables d'environnement nécessaires (ex: URL de l'API backend).

### 4. Lancer l'application
```sh
npm run dev
```
L'application sera accessible via `http://localhost:5173/`.

## Fonctionnalités principales
- **Plateforme e-commerce** sécurisée avec gestion du panier et paiement en ligne
- **Expérience mobile-first** optimisée
- **Authentification et gestion des utilisateurs**
- **Back-office** pour l'administration des produits, commandes et clients
- **Recherche avancée** avec filtres et tri
- **Gestion des abonnements**
- **Assistance utilisateur** avec chatbot et formulaire de contact

## Structure du projet
Le projet suit une architecture modulaire :

- **`src/`** : Code source principal
  - **`components/`** : Composants réutilisables (ex: `Carousel.jsx`)
  - **`pages/`** : Pages principales de l'application (connexion, accueil, produits, panier, etc.)
  - **`styles/`** : Fichiers CSS
  - **`assets/`** : Images et autres ressources statiques
- **`public/`** : Contenu statique
- **`package.json`** : Fichier de configuration npm
- **`vite.config.js`** : Configuration Vite.js

## API et Intégration Backend
L'application communique avec une API REST développée en Symfony.
Quelques endpoints utiles :
- `GET /api/products` → Liste des produits
- `POST /api/login_check` → Authentification JWT
- `POST /api/orders` → Création de commande

## Tests
Pour exécuter les tests :
```sh
npm test
```

## Déploiement
### 1. Construire l'application pour la production
```sh
npm install
npm run build
```
Le projet sera compilé et les fichiers de production seront placés dans le dossier `dist/`.

### 2. Déploiement sur un serveur web (Ex: Vercel, Netlify, OVH...)
Hébergez les fichiers générés dans `dist/` sur votre serveur.

## Auteurs
- **Nathan Corberan** - Développement principal
- **Joris Lecharpentier** - Contributions backend et sécurité
- **Noah Barreau** - Expérience utilisateur et intégration API
- **Liova Hovakimyan** - Développement front-end

## Conclusion
Ce projet a été un excellent exercice de mise en pratique de nos compétences en développement web et en gestion de projet. Nous espérons que cette plateforme répondra aux attentes de l'entreprise Cyna et de ses clients.
