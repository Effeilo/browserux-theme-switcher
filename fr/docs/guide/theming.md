# Thématisation

`browserux-theme-switcher` applique un attribut `data-theme` sur un élément du DOM et expose des propriétés CSS personnalisées pour styliser le bouton de bascule. Cette page couvre les deux aspects : styliser votre page en fonction du thème actif, et personnaliser l'apparence visuelle du composant.

---

## Appliquer des styles selon le thème actif

Le composant définit `data-theme="light"` ou `data-theme="dark"` sur l'élément `<html>` (ou une cible personnalisée). Votre CSS lit cet attribut pour appliquer les styles appropriés.

### Utiliser les propriétés CSS personnalisées

L'approche recommandée consiste à définir vos tokens de design comme variables CSS et à les surcharger par thème :

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-border: #e0e0e0;
  --color-accent: #0066cc;
}

[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f0f0f0;
  --color-border: #333333;
  --color-accent: #66aaff;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

### Combiner avec la préférence système

Vous pouvez superposer `@media (prefers-color-scheme: dark)` à `[data-theme]` pour que la page respecte le thème système avant toute interaction utilisateur :

```css
/* Préférence système (avant tout clic sur le bouton) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #111111;
    --color-text: #f0f0f0;
  }
}

/* Choix explicite de l'utilisateur */
[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f0f0f0;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #111111;
}
```

---

## Personnaliser le composant de bascule

L'apparence visuelle du bouton de bascule est contrôlée par des propriétés CSS personnalisées exposées sur le host du Shadow DOM du composant. Elles peuvent être définies via l'attribut `style` ou dans une règle CSS ciblant `browserux-theme-switcher`.

### Propriétés CSS personnalisées disponibles

| Propriété | Valeur par défaut | Description |
|---|---|---|
| `--bux-switch-width` | `40px` | Largeur totale du bouton de bascule |
| `--bux-switch-height` | `24px` | Hauteur totale du bouton de bascule |
| `--bux-switch-bg-color` | `#888` | Couleur de fond de la piste |
| `--bux-switch-thumb-color` | `#fff` | Couleur du curseur glissant |
| `--bux-switch-emoji-size` | `inherit` | Taille de police des icônes emoji par défaut |

### Via l'attribut `style`

```html
<browserux-theme-switcher
  style="
    --bux-switch-width: 50px;
    --bux-switch-height: 28px;
    --bux-switch-bg-color: #3a86ff;
    --bux-switch-thumb-color: #ffffff;
  "
></browserux-theme-switcher>
```

### Via une règle CSS

```css
browserux-theme-switcher {
  --bux-switch-width: 50px;
  --bux-switch-height: 28px;
  --bux-switch-bg-color: #3a86ff;
  --bux-switch-thumb-color: #ffffff;
  --bux-switch-emoji-size: 1.2rem;
}
```

---

## Gérer les images selon le thème actif

Le composant propose deux stratégies pour échanger les sources d'images quand le thème change. Les deux stratégies ciblent les images avec `class="has-dark"`.

### Stratégie 1 - Convention de nommage automatique

Les images sont échangées automatiquement en suivant une convention de nommage de fichiers. Aucun attribut supplémentaire n'est nécessaire sur l'image.

Quand le thème bascule en mode sombre, le composant modifie le `src` en insérant `-dark` avant l'extension du fichier :

```
/img/logo.webp → /img/logo-dark.webp
/img/banner.png → /img/banner-dark.png
```

**HTML :**

```html
<img class="has-dark" src="/img/logo.webp" alt="Logo">
```

Le `src` original est conservé dans `data-src` et restauré lors du retour en mode clair.

**Pour désactiver** l'échange automatique sur une image spécifique, ajoutez `data-locked` :

```html
<img class="has-dark" data-locked src="/img/logo.webp" alt="Logo">
```

### Stratégie 2 - Attributs de source explicites

Pour les images dont les noms de fichiers ne suivent pas la convention `-dark`, spécifiez les sources explicitement avec `data-src-light` et `data-src-dark` :

```html
<img
  class="has-dark"
  src="/img/logo.webp"
  data-src-light="/img/logo-version-claire.webp"
  data-src-dark="/img/logo-inverse.webp"
  alt="Logo"
>
```

Le composant lit ces attributs et échange le `src` en conséquence. Cette approche a la priorité sur la convention de nommage quand `data-src-light` et `data-src-dark` sont tous les deux présents.

### Priorité

Les deux fonctions utilitaires s'exécutent à chaque changement de thème. `updateThemeImages()` (attributs explicites) s'exécute après `updateImagesByTheme()` (convention de nommage). Si `data-src-light` et `data-src-dark` sont définis sur une image, ils surchargent tout remplacement automatique basé sur le nom de fichier.

---

## Cibler un élément personnalisé

Par défaut, `data-theme` est appliqué sur `<html>`. Pour restreindre le thème à un élément spécifique :

```html
<main id="app">
  <browserux-theme-switcher target="#app"></browserux-theme-switcher>
  <!-- seul #app reçoit data-theme, pas <html> -->
</main>
```

C'est utile quand vous avez besoin de plusieurs zones de thème indépendantes sur la même page, ou quand vous souhaitez éviter de modifier l'élément racine.
