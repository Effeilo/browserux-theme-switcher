# Compatibilité

---

## Prérequis d'environnement

| Environnement | Version minimale | Raison |
|---|---|---|
| Node.js | 18+ | Requis pour les projets basés sur npm |
| Navigateur | Voir tableau ci-dessous | Custom Elements v1, Shadow DOM |

---

## Support navigateur

`browserux-theme-switcher` utilise les APIs Web Components standards : Custom Elements v1, Shadow DOM v1 et les éléments `<slot>`. Ces APIs sont supportées dans tous les navigateurs modernes.

| Fonctionnalité | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Custom Elements v1 | 67+ | 63+ | 10.1+ | 79+ |
| Shadow DOM v1 | 53+ | 63+ | 10+ | 79+ |
| Slots nommés | 53+ | 63+ | 10+ | 79+ |
| `prefers-color-scheme` | 76+ | 67+ | 12.1+ | 79+ |
| `localStorage` | Tous | Tous | Tous | Tous |

> Safari présente des particularités connues avec les sélecteurs d'état Shadow DOM basés sur `:host` avec des conditions de classe. Le composant contourne cela en utilisant une propriété CSS personnalisée pour le positionnement du bouton plutôt que `:host(.dark)`.

---

## Compatibilité frameworks

| Framework | Statut | Notes |
|---|---|---|
| HTML vanilla | Supporté | `<script type="module">` direct ou CDN |
| React 17+ | Supporté | Importer dans les composants client uniquement |
| Next.js 13+ | Supporté | Utiliser `'use client'` ou import dynamique avec `ssr: false` |
| Vue 3 | Supporté | Ajouter à `isCustomElement` dans la config Vite pour éviter les avertissements |
| Nuxt 3 | Supporté | Utiliser `<ClientOnly>` ou garder avec `process.client` |
| Angular 14+ | Supporté | Ajouter `CUSTOM_ELEMENTS_SCHEMA` au module |
| Svelte | Supporté | Importer le package dans le script du composant |
| SvelteKit | Supporté | Importer uniquement dans le contexte client |

Voir [Utilisation avec les frameworks](guide/framework-usage.md) pour les détails d'implémentation.

---

## Formats de build disponibles

Le package embarque trois bundles pré-compilés :

| Fichier | Format | Cas d'usage |
|---|---|---|
| `browserux-theme-switcher.esm.js` | ES Module | Projets avec bundler (Vite, Webpack, Rollup) |
| `browserux-theme-switcher.umd.js` | UMD | Balises script legacy, environnements CommonJS |
| `browserux-theme-switcher.min.js` | UMD minifié | Usage CDN, production sans bundler |
| `browserux-theme-switcher.d.ts` | TypeScript | Projets avec vérification de types |

Le bundle ESM est l'export par défaut (champ `"module"` dans `package.json`).

---

## Disponibilité de localStorage

Le composant enveloppe tous les accès à `localStorage` dans un `try/catch`. Cela gère les environnements restreints suivants :

- Navigation privée dans Safari (lève une `SecurityError`)
- Iframes cross-origin avec permissions restrictives
- Content Security Policies bloquant l'accès au stockage
- Mode privé Firefox (le quota est 0, les écritures réussissent mais les lectures retournent null)

Quand `localStorage` est indisponible, le composant retombe silencieusement. Le bouton fonctionne normalement, mais le choix de l'utilisateur n'est pas persisté entre les rechargements de page.

---

## Support de `prefers-color-scheme`

Si le navigateur ne supporte pas `window.matchMedia('(prefers-color-scheme: dark)')`, le résultat de la media query vaut `false` et le composant utilise `'light'` par défaut quand aucune préférence enregistrée n'existe.

---

## Dépendances

`browserux-theme-switcher` n'a aucune dépendance à l'exécution. Le package est un Web Component autonome compilé depuis TypeScript avec Rollup.

Dépendances de compilation :

| Package | Rôle |
|---|---|
| [rollup](https://rollupjs.org/) | Bundler de modules |
| [typescript](https://www.typescriptlang.org/) | Compilateur TypeScript |
| [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript) | Plugin TypeScript pour Rollup |
| [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve) | Résolution des modules Node pour Rollup |
| [@rollup/plugin-terser](https://github.com/rollup/plugins/tree/master/packages/terser) | Minification |
| [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) | Bundling des déclarations TypeScript |
