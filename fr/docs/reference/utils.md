# Utilitaires

`browserux-theme-switcher` inclut deux fonctions utilitaires pour mettre à jour les sources d'images quand le thème change. Les deux sont appelées automatiquement par le composant à chaque application de thème. Elles peuvent également être importées et appelées manuellement si nécessaire.

---

## `updateImagesByTheme()`

**Fichier :** `src/utils/theme-utils.ts`

Échange automatiquement les sources d'images pour les éléments `<img class="has-dark">` en utilisant une convention de nommage de fichiers. Aucun attribut supplémentaire n'est requis sur l'image.

### Signature

```ts
function updateImagesByTheme(target?: HTMLElement): void
```

### Paramètres

| Paramètre | Type | Défaut | Description |
|---|---|---|---|
| `target` | `HTMLElement` | `document.documentElement` | L'élément dont l'attribut `data-theme` est lu pour déterminer le thème actif |

### Comportement

1. Lit `data-theme` sur `target` pour déterminer si le thème actif est `'dark'`
2. Sélectionne tous les éléments `<img class="has-dark">` dans le document
3. Ignore les images ayant l'attribut `data-locked`
4. Au premier appel pour chaque image, enregistre le `src` original dans `img.dataset.src`
5. En mode sombre : modifie `src` en insérant `-dark` avant l'extension du fichier
6. En mode clair : restaure le `src` original depuis `img.dataset.src`

### Convention de nommage

```
Original :    /img/logo.webp
Mode sombre : /img/logo-dark.webp

Original :    /img/banner.png
Mode sombre : /img/banner-dark.png
```

Les query strings sont préservées :

```
Original :    /img/logo.png?v=2
Mode sombre : /img/logo-dark.png?v=2
```

### Exemple

```html
<!-- Ces images sont échangées automatiquement -->
<img class="has-dark" src="/img/logo.webp" alt="Logo">
<img class="has-dark" src="/img/hero.jpg" alt="Image hero">

<!-- Cette image est exclue de l'échange -->
<img class="has-dark" data-locked src="/img/icon.svg" alt="Icône">
```

### Désactivation par image

Ajoutez `data-locked` à n'importe quel `<img class="has-dark">` pour l'empêcher d'être échangée :

```html
<img class="has-dark" data-locked src="/img/logo.webp" alt="Logo">
```

### Usage manuel

La fonction peut être importée et appelée de manière indépendante :

```js
import { updateImagesByTheme } from 'browserux-theme-switcher/src/utils/theme-utils';

const target = document.querySelector('#app');
updateImagesByTheme(target);
```

---

## `updateThemeImages()`

**Fichier :** `src/utils/theme-image.ts`

Échange les sources d'images pour les éléments `<img class="has-dark">` en utilisant des attributs explicites `data-src-light` et `data-src-dark`. Fournit un contrôle total sur la source utilisée par thème, sans dépendre d'une convention de nommage de fichiers.

### Signature

```ts
function updateThemeImages(theme: 'light' | 'dark'): void
```

### Paramètres

| Paramètre | Type | Description |
|---|---|---|
| `theme` | `'light' \| 'dark'` | Le thème à appliquer à toutes les images éligibles |

### Comportement

1. Sélectionne tous les éléments `<img class="has-dark">` dans le document
2. Pour chaque image, lit `data-src-light` et `data-src-dark`
3. Choisit la source appropriée selon `theme`
4. Met à jour `img.src` uniquement si la source diffère de la valeur actuelle et si l'image n'a pas `data-locked`

### Exemple

```html
<!-- Utilisation d'attributs de source explicites -->
<img
  class="has-dark"
  src="/img/logo-clair.webp"
  data-src-light="/img/logo-clair.webp"
  data-src-dark="/img/logo-variante-sombre.webp"
  alt="Logo"
>

<!-- Une autre image avec des noms de fichiers complètement différents par thème -->
<img
  class="has-dark"
  src="/img/hero-jour.jpg"
  data-src-light="/img/hero-jour.jpg"
  data-src-dark="/img/hero-nuit.jpg"
  alt="Hero"
>
```

### Usage manuel

```js
import { updateThemeImages } from 'browserux-theme-switcher/src/utils/theme-image';

updateThemeImages('dark');
```

---

## Ordre d'exécution

Dans `applyTheme()`, le composant appelle les deux fonctions en séquence :

```ts
updateImagesByTheme(this.getThemeTarget()); // convention de nommage
updateThemeImages(theme);                   // attributs explicites
```

`updateThemeImages()` s'exécute en second. Si une image possède à la fois `data-src-light`/`data-src-dark` et un nom de fichier suivant la convention `-dark`, les attributs explicites ont la priorité car ils s'exécutent en dernier et écrasent le résultat de l'échange par nom de fichier.

---

## Quelle fonction utiliser ?

| Scénario | Fonction recommandée |
|---|---|
| Les images suivent un pattern de nommage `-dark` cohérent | `updateImagesByTheme()` |
| Les images ont des noms de fichiers arbitraires par thème | `updateThemeImages()` |
| Les deux stratégies coexistent | Les deux, les attributs explicites ont la priorité |
| Vous souhaitez exclure une image spécifique de l'échange | Ajoutez `data-locked` |
