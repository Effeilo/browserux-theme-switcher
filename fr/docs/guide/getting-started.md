# Démarrage rapide

`browserux-theme-switcher` fonctionne dans n'importe quelle page HTML ou projet JavaScript. Choisissez la méthode d'installation adaptée à votre configuration.

---

## Prérequis

| Environnement | Version minimale |
|---|---|
| Node.js | 18+ (pour les projets basés sur npm) |
| Navigateur | Tout navigateur supportant les Custom Elements |

Pour les détails de compatibilité navigateur, voir [Compatibilité](../compatibility.md).

---

## Installation

### Via npm

```bash
npm install browserux-theme-switcher
```

### Via CDN

Aucune étape de build requise. Ajoutez la balise script directement dans votre HTML :

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
```

---

## Usage basique

Une fois le script chargé, placez le composant n'importe où dans votre HTML :

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

C'est tout. Le composant s'initialise automatiquement à la connexion, détecte le thème système et affiche le bouton de bascule avec les icônes emoji par défaut (☀️ et 🌙).

---

## Usage dans un projet avec bundler

Importez le package une fois dans votre fichier d'entrée. Le composant s'enregistre globalement à l'import :

```js
import 'browserux-theme-switcher';
```

Puis utilisez-le dans n'importe quel template HTML :

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

---

## Ajouter le CSS pour le changement de thème

Le composant applique un attribut `data-theme` sur `<html>`. Votre CSS lit cet attribut pour changer les styles :

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
}

[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f0f0f0;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

Vous pouvez aussi combiner `@media (prefers-color-scheme: dark)` avec `[data-theme]` pour une approche en couches :

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #111111;
    --color-text: #f0f0f0;
  }
}
```

---

## Vérifier le résultat

Ouvrez les outils de développement de votre navigateur et inspectez l'élément `<html>`. Quand le composant est connecté et le thème appliqué, vous devriez voir :

```html
<html data-theme="light">
```

Cliquez sur le bouton et il bascule vers :

```html
<html data-theme="dark">
```

L'`aria-label` du bouton de bascule se met également à jour à chaque clic pour refléter la prochaine action disponible.

---

## Notes SSR et hydratation

Comme `browserux-theme-switcher` lit `localStorage` et `window.matchMedia` dans le navigateur, il ne doit pas être rendu côté serveur. Dans les frameworks avec SSR (Next.js, Nuxt, SvelteKit), importez ou enregistrez le composant uniquement côté client.

Pour Next.js, utilisez l'import dynamique avec `ssr: false` :

```js
import dynamic from 'next/dynamic';
const ThemeSwitcher = dynamic(() => import('browserux-theme-switcher'), { ssr: false });
```

Pour Nuxt 3, enveloppez l'import dans un composant `<ClientOnly>` ou utilisez des gardes `process.client`.
