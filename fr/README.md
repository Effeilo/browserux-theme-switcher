[EN](../README.md) | **FR**

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-theme-switcher-300.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# BrowserUX Theme Switcher

Un Web Component léger et personnalisable permettant aux utilisateurs de basculer entre les thèmes clair et sombre. Accessible, internationalisé et compatible avec tous les frameworks modernes.

[![npm version](https://img.shields.io/npm/v/browserux-theme-switcher.svg)](https://www.npmjs.com/package/browserux-theme-switcher)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js)

- Le site du projet : [BrowserUX Theme Switcher](https://browserux.com/fr/theme-switcher/)
- [La documentation](https://browserux.com/fr/theme-switcher/documentation/)
- [À propos de BrowserUX Theme Switcher](https://browserux.com/fr/blog/articles/a-propos-de-browserux-theme-switcher.html)

## Sommaire 

- [Fonctionnalités](#fonctionnalités)
- [Fonctionnement](#fonctionnement)
- [Installation](#installation)
- [Utilisation](#utilisation)
- [Paramètres](#paramètres-de-browserux-theme-switcher)
- [Build & Développement](#build--développement)
- [Licence](#license)

## Fonctionnalités 

### 🎛 Comportement intelligent

- 🎚 **Changement de thème**  
  Alterne entre `data-theme="light"` et `"dark"` sur un élément cible (par défaut `<html>`)

- 💾 **Persistance automatique**  
  Stocke la préférence utilisateur dans `localStorage` et la restaure à chaque visite

- 🕶 **Détection système**  
  Active automatiquement le thème en fonction de `prefers-color-scheme` si aucune préférence n’est définie

- 📢 **Événement `theme-change`**  
  Déclenche un événement personnalisé à chaque changement de thème (`e.detail.theme = "light" | "dark"`)


### 🌍 Accessibilité & internationalisation

- 🧠 **Libellés ARIA dynamiques**  
  Textes accessibles multilingues générés automatiquement ou personnalisables (`data-label-*`)

- 🌐 **Internationalisation (`lang`)**  
  Prise en charge de plusieurs langues (auto-détection ou forçage via attribut `lang`)


### 🎨 Personnalisation visuelle

- 🎯 **Ciblage CSS (`target`)**  
  Permet d’appliquer le thème à un élément spécifique (par ex. : `<main>`, `#app`, etc.)

- 🎨 **Variables CSS modifiables**  
  Large personnalisation de l’apparence via des propriétés CSS (`--bux-switch-*`)

- 🌗 **Slots personnalisés pour icônes**  
  Personnalisation des icônes avec des balises SVG, emojis ou images (`light-icon`, `dark-icon`)

- 🖼 **Images adaptatives (`.has-dark`)**  
  Remplacement automatique d’images selon le thème (ex. `logo.png` → `logo-dark.png`)

### 🔧 Intégration flexible

- 🧩 **Shadow DOM optionnel (`no-shadow`)**  
  Encapsulation désactivable pour permettre un style global plus souple    

## Fonctionnement

Le composant `<browserux-theme-switcher>` applique dynamiquement un thème clair ou sombre sur un élément de votre page (`<html>` par défaut ou un autre via l’attribut `target`).

Il suit une logique en trois étapes :

### 1. Détection automatique du thème système

Si aucune préférence utilisateur n’est encore définie, le composant détecte automatiquement le thème préféré du système via la règle CSS :

```css
@media (prefers-color-scheme: dark)
```

### 2. Stockage de la préférence utilisateur

Lorsque l’utilisateur clique sur le bouton pour basculer de thème, sa préférence (`light` ou `dark`) est enregistrée dans `localStorage`.

Cette préférence sera :

- appliquée automatiquement à la prochaine visite
- prioritaire sur la détection système

### 3. Application du thème dans le DOM

Le composant applique ou met à jour dynamiquement l’attribut data-theme sur l’élément ciblé, par exemple :

```html
<html data-theme="dark">...</html>
```

Cela permet de :

- styliser la page via des variables CSS conditionnelles
- adapter les images (avec `.has-dark`)
- réagir via des événements (comme `theme-change`)

> Le composant fonctionne sans dépendance, sans configuration complexe, et est compatible avec tous les frameworks modernes (React, Vue, Angular) ainsi qu’en HTML pur.

## Installation

```bash
npm install browserux-theme-switcher
```

Ou via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js"></script>
```

>  Utilisez la version .esm.js si vous intégrez ce composant via bundler (React, Vue, etc.), et la version .min.js pour une intégration HTML directe via CDN.

## Utilisation

### Le composant web `<browserux-theme-switcher>`

#### Projet moderne avec bundler (Vite, Webpack, etc.)

1. Importez simplement le composant dans votre code :

```js
import 'browserux-theme-switcher';
```

2. Puis utilisez-le dans votre HTML :

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

#### React / Next.js

1. Ajoutez dans votre composant React (souvent dans un useEffect) :

```jsx
import { useEffect } from 'react';

useEffect(() => {
    import('browserux-theme-switcher');
}, []);
```

2. Et dans votre JSX 

```jsx
<browserux-theme-switcher></browserux-theme-switcher>
```

> Ajoutez le fichier `types/browserux-theme-switcher.d.ts` pour un meilleur support TypeScript avec JSX.

#### Vue 3

1. Ajoutez dans main.js ou main.ts :

```js
import 'browserux-theme-switcher';
```

2. Utilisez-le comme un composant natif :

```html
<browserux-theme-switcher lang="fr"></browserux-theme-switcher>
```

#### Angular

1. Importez dans main.ts :

```ts
import 'browserux-theme-switcher';
```

2. Ajoutez le `CUSTOM_ELEMENTS_SCHEMA` dans `AppModule` :

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

#### Intégration sans bundler / script global

1. Ajoutez directement le composant via un CDN :

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js"></script>
```

2. Puis :

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

### Gestion des styles CSS

Pour que le thème clair ou sombre s’applique à votre page, vous devez définir vos couleurs via des variables CSS. Le composant `<browserux-theme-switcher>` applique automatiquement un attribut `data-theme="dark"` ou `"light"` à l’élément ciblé (par défaut `<html>`), ce qui permet de styliser dynamiquement votre interface.

#### Exemple complet 

```css
:root {
    --bux-page-bg: #eaeaea;
    --bux-page-color: #121212;
    --bux-color-primary: #f05e0e;
    --bux-color-secondary: #0e93f0;
    --bux-white: #fff;
}

/** Mode sombre automatique selon les préférences système */
@media (prefers-color-scheme: dark) {
    :root {
        --bux-page-bg: #333;
        --bux-page-color: #eaeaea;
        --bux-color-primary: #eb8a55;
        --bux-color-secondary: #58aae3;
        --bux-white: #444;
    }
}

/** Mode sombre forcé via browserux-theme-switcher */
[data-theme="dark"] {
    --bux-page-bg: #333;
    --bux-page-color: #eaeaea;
    --bux-color-primary: #eb8a55;
    --bux-color-secondary: #58aae3;
    --bux-white: #444;
}
```

#### Explications 

- `:root` définit les couleurs par défaut (mode clair).
- `@media (prefers-color-scheme: dark)` permet de prendre en compte les préférences système si l’utilisateur n’a pas encore choisi de thème.
- `[data-theme="dark"]` permet de forcer le mode sombre lorsque l’utilisateur clique sur le bouton du browserux-theme-switcher.

> Le switcher applique `data-theme="dark"` ou `data-theme="light"` sur l’élément ciblé (`html` par défaut, ou un conteneur via l’attribut `target`). Vous devez donc appliquer les variables CSS sur le même élément ou un parent commun.

### Gestion des images selon le thème (dark mode)

Le composant `<browserux-theme-switcher>` prend en charge automatiquement les images sensibles au thème en utilisant la classe `has-dark`.

#### 🔁 Changement d’image automatique (convention de nommage)

Par défaut, tout élément `<img>` ayant la classe `has-dark` verra son attribut `src` modifié dynamiquement en fonction du thème actif :

```html
<img src="logo.png" class="has-dark" alt="Logo">
```

- En mode clair : l’image d’origine est utilisée (`/img/logo.png`)
- En mode sombre : le composant recherchera `/img/logo-dark.png`

Cela fonctionne en ajoutant automatiquement `-dark` avant l’extension du fichier,  
et convient parfaitement aux ressources statiques suivant une convention de nommage cohérente.

#### ⚙️ Changement d’image manuel (attributs personnalisés)

Pour un contrôle plus précis, vous pouvez définir explicitement quelle image utiliser pour chaque thème à l’aide des attributs `data-src-light` et `data-src-dark` :

```html
<img
  class="has-dark"
  src="/cdn/images/logo-light.webp"
  data-src-light="/cdn/images/logo-light.webp"
  data-src-dark="/cdn/images/logo-dark.webp"
  alt="Logo"
/>
```

Cela est utile lorsque :

- Vos images ne suivent pas la convention de nommage avec le suffixe `-dark`
- Les ressources sont servies depuis un CMS ou un CDN avec des URLs personnalisées
- Vous souhaitez désactiver la logique automatique pour certains cas spécifiques

> Si les deux attributs `data-src-*` sont présents, ils ont priorité sur la convention de nommage.

#### 🔒 Désactivation du changement automatique

Vous pouvez désactiver le remplacement automatique de l’image pour un élément spécifique en ajoutant l’attribut `data-locked` :

```html
<img
  class="has-dark"
  src="/img/logo-custom.webp"
  data-locked
  alt="Static Logo"
/>
```

Cela empêchera le composant de modifier l’attribut `src`, quel que soit le thème actif.

Ces fonctionnalités sont compatibles avec tous les frameworks modernes, y compris React, Vue, Angular et le HTML pur.

## Paramètres de `<browserux-theme-switcher>`

`<browserux-theme-switcher>` offre de nombreuses possibilités de personnalisation :

| Paramètre | Type | Nom | Description |
|-----------|------|-----|-------------|
| Ciblage personnalisé | Attribut | `target` | Applique le thème sur un élément spécifique |
| Internationalisation | Attribut | `lang` | Choix de la langue |
| Accessibilité ARIA | Attribut | `data-label-*` | Libellés accessibles modifiables |
| Shadow DOM optionnel | Attribut | `no-shadow` | Encapsulation désactivable |
| Personnalisation CSS | Attribut | `Style` | Personnalisation via variables CSS |  
| Événement personnalisable  | Événement | `theme-change` | Événement émis sur chaque changement de thème |
| Slots icônes | Slot | `*-icon` | Personnalisation des icônes |       

### Attributs 

#### Ciblage personnalisé (`target`)

Par défaut, le composant `<browserux-theme-switcher>` applique le thème (`data-theme="light"` ou `"dark"`) sur l’élément `<html>`.
Mais vous pouvez personnaliser cette cible grâce à l’attribut `target`.

##### Attribut : `target`

- Type : `string` (sélecteur CSS valide)
- Valeur par défaut : `html`
- Effet : applique l’attribut `data-theme` sur l’élément correspondant

##### Exemple

```html
<browserux-theme-switcher 
    target="#app"
></browserux-theme-switcher>

<div id="app">
  <!-- Le thème s'applique ici -->
</div>
```

Dans cet exemple, c’est l’élément `#app` (et non `<html>`) qui recevra l’attribut `data-theme`. Cela permet de limiter le thème à un conteneur spécifique de votre application (utile dans des micro-frontends, app-shells ou widgets embarqués).

##### Astuce

Assurez-vous que vos styles CSS dépendent bien de `[data-theme="dark"]` ou `[data-theme="light"]` sur le bon sélecteur :

```css
#app[data-theme="dark"] {
  --bux-page-bg: #333;
  /* etc. */
}
```

> Si le sélecteur passé dans target ne correspond à aucun élément au moment du rendu, le fallback sera `<html>`.

#### Internationalisation (`lang`)

Le composant `<browserux-theme-switcher>` prend en charge plusieurs langues pour ses libellés accessibles (par exemple : Activer sombre, Switch to light mode, etc.).

##### Attribut : `lang`

- Type : `string`  ("`en`", "`fr`", "`es`", "`de`", "`ja`", "`ru`", "`pt`", "`it`", "`nl`")
- Valeur par défaut : auto-détection
- Effet : force la langue utilisée pour les libellés ARIA (`aria-label`) du switch

##### Exemple

```html
<browserux-theme-switcher 
  lang="fr"
></browserux-theme-switcher>
```

Le libellé ARIA du bouton sera automatiquement en français :
`aria-label="Activer le mode sombre"` ou `aria-label="Activer le mode clair"`

##### Détection automatique si lang n’est pas défini

Si vous n'indiquez pas `lang`, le composant suit cette logique :

1. Utilise la valeur de lang sur la balise `<browserux-theme-switcher>`
2. Sinon, regarde la valeur de lang sur la balise `<html lang="...">`
3. Sinon, fallback vers "`en`" (anglais)

##### Langues intégrées

Le composant prend en charge les langues suivantes pour les libellés accessibles (`aria-label`) :

- 🇬🇧 en – English (par défaut)
- 🇫🇷 fr – Français
- 🇪🇸 es – Español
- 🇩🇪 de – Deutsch
- 🇯🇵 ja – 日本語 (Japonais)
- 🇷🇺 ru – Русский (Russe)
- 🇵🇹 pt – Português
- 🇮🇹 it – Italiano
- 🇳🇱 nl – Nederlands

#### Accessibilité ARIA (`data-label-light` / `data-label-dark`)

Le composant `<browserux-theme-switcher>` est conçu pour être accessible aux lecteurs d’écran, grâce à des libellés dynamiques (`aria-label`) qui décrivent l’action du bouton (activer le mode clair ou sombre).

Par défaut, ces libellés sont générés automatiquement en fonction de la langue (via l’attribut `lang`).
Mais vous pouvez surcharger ces textes avec vos propres libellés personnalisés grâce à deux attributs :

##### Attributs

| Attribut | Rôle |
|-----------|------|
| `data-label-light` | Libellé lorsque le thème actif est sombre et que le bouton permet d’activer le mode clair |
| `data-label-dark` | Libellé lorsque le thème actif est clair et que le bouton permet d’activer le mode sombre |

##### Exemple

```html
<browserux-theme-switcher
    data-label-light="Activer le thème clair"
    data-label-dark="Passer en mode sombre">
</browserux-theme-switcher>
```

Résultat :

- En mode clair → `aria-label="Passer en mode sombre"`
- En mode sombre → `aria-label="Activer le thème clair"`

> Ces attributs sont prioritaires sur la détection automatique de langue (`lang`).

#### Shadow DOM optionnel (`no-shadow`)

Par défaut, le composant `<browserux-theme-switcher>` utilise le Shadow DOM pour encapsuler son HTML et son CSS. Cela garantit que ses styles internes ne perturbent pas ceux de la page, et inversement.

Mais dans certains cas, notamment pour appliquer des styles globaux ou pour des contraintes spécifiques de framework, il peut être utile de désactiver cette encapsulation.

##### Attribut : `no-shadow`

- Type : `boolean` (présence seule)
- Valeur par défaut : non présent → Shadow DOM activé
- Effet : si présent, le composant est rendu dans le DOM global sans encapsulation

##### Exemple

```html
<browserux-theme-switcher no-shadow></browserux-theme-switcher>
```

Ce composant :

- sera rendu dans le DOM classique (pas dans un shadowRoot)
- pourra être stylisé depuis votre CSS global
- héritera plus facilement des styles extérieurs

##### Quand utiliser no-shadow ?

- Lorsque vous voulez surcharger facilement les styles du composant via CSS global
- Si vous devez thématiser le switcher à partir de variables CSS de la page
- En contexte d’intégration dans un framework (ex. Angular) où le Shadow DOM pose problème
- Pour déboguer plus simplement le rendu dans le DOM

> Attention : sans Shadow DOM, le composant est plus sensible aux conflits de styles globaux. À utiliser avec précaution dans les grandes applications.

#### Personnalisation CSS (`style`)  

Le composant `<browserux-theme-switcher>` expose plusieurs variables CSS personnalisables permettant de modifier son apparence sans avoir à surcharger son style interne.

##### Variables disponibles

| Variable                 | Default | Description                 |
|--------------------------|---------|-----------------------------|
| --bux-switch-width       | `40px`  | Largeur du bouton toggle  |
| --bux-switch-height      | `24px`  | Hauteur  du bouton toggle |
| --bux-switch-bg-color    | `#888`  | Couleur de fond du switch    |
| --bux-switch-thumb-color | `#fff`  | Couleur du thumb   |
| --bux-switch-emoji-size | `inherit`  | Taille des icônes emoji   |

##### Exemple

```html
<browserux-theme-switcher
    style="
        --bux-switch-width: 60px;
        --bux-switch-height: 32px;
        --bux-switch-bg-color: #222;
        --bux-switch-thumb-color: orange;
        --bux-switch-emoji-size: 1.5rem;"
></browserux-theme-switcher>
```

- Ces variables peuvent être modifiées dynamiquement selon le thème (`[data-theme="dark"]`) ou les breakpoints (media queries).
- Elles fonctionnent même si le `Shadow DOM` est activé, grâce à l’usage des `CSS custom properties`.

### Événements 

#### Événement personnalisable (`theme-change`)

Le composant `<browserux-theme-switcher>` déclenche un événement personnalisé nommé `theme-change` à chaque changement de thème (suite à un clic utilisateur, un chargement initial avec `localStorage`, etc.).

Cet événement permet à votre application de réagir dynamiquement aux changements de thème (mise à jour du layout, analytics, etc.).

##### Événement

- Nom : `theme-change`
- Contenu :l’événement émis est un `CustomEvent` dont `e.detail.theme` contient la nouvelle valeur de thème ("`light`" ou "`dark`").

##### Exemple d’écouteur JavaScript

```js
const switcher = document.querySelector('browserux-theme-switcher');

switcher?.addEventListener('theme-change', (e) => {
  console.log('Thème sélectionné :', e.detail.theme);
});
```

##### Cas d’usage possibles

- Modifier dynamiquement une classe CSS sur le `body`
- Déclencher une animation ou une transition
- Stocker le thème dans un contexte global ou service JS
- Traquer les interactions avec un outil d’analytics

> L’événement est disponible dès l'initialisation du composant et fonctionne dans tous les contextes (framework ou HTML pur).

### Slots 

#### Personnalisation des icônes (`light-icon` / `dark-icon`)

Le composant `<browserux-theme-switcher>` permet de personnaliser l’apparence de son bouton en remplaçant les icônes par défaut grâce à l’usage des slots HTML.

##### Slots disponibles

| 
Slot                 | Affiché quand le thème est... | 	Exemple d’usage                 |
|--------------------------|---------|-----------------------------|
| `light-icon`      | actif = sombre (icône du mode clair à activer)  | ☀️, soleil, light.svg  |
| `dark-icon`      | actif = clair (icône du mode sombre à activer)  | 🌙, lune, moon.svg |

##### Exemples

```html
<browserux-theme-switcher>
  <span slot="light-icon">🔆</span>
  <span slot="dark-icon">🌑</span>
</browserux-theme-switcher>
```

Ou avec des images SVG :

```html
<browserux-theme-switcher>
  <img slot="light-icon" src="sun.svg" width="20" height="20" alt="Theme clair">
  <img slot="dark-icon" src="moon.svg" width="20" height="20" alt="Theme sombre">
</browserux-theme-switcher>
```

##### Fonctionnement

- Chaque slot est dynamiquement affiché ou caché selon le thème actif
- Les slots sont accessibles (avec aria-label) et peuvent contenir :
    - emoji
    - icônes SVG
    - images raster
    - balises personnalisées

> Si aucun slot n’est fourni, des icônes par défaut sont utilisées (☀️ / 🌙).

## Build & Développement

```bash
npm install
npm run build
```

Utilisez TypeScript + Rollup pour build :
- `dist/browserux-theme-switcher.esm.js`
- `dist/browserux-theme-switcher.umd.js`
- `dist/browserux-theme-switcher.d.ts`

## License

Licence MIT, Libre d’utilisation, de modification et de distribution.