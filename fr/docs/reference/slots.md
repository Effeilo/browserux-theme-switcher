# Slots

`browserux-theme-switcher` expose deux slots nommés pour personnaliser les icônes affichées de chaque côté du bouton de bascule. Si aucun contenu de slot n'est fourni, le composant utilise des icônes emoji par défaut.

---

## Vue d'ensemble

```
[ light-icon ] [ bouton de bascule ] [ dark-icon ]
      ☀️                ●                  🌙
```

Les deux slots sont optionnels. Fournissez l'un, les deux, ou aucun.

---

## `light-icon`

**Position :** Côté gauche du bouton de bascule  
**Fallback par défaut :** ☀️  

L'icône affichée à côté du bouton côté thème clair. Visible dans tous les états.

```html
<!-- Par défaut (sans slot), affiche ☀️ automatiquement -->
<browserux-theme-switcher></browserux-theme-switcher>

<!-- Emoji personnalisé -->
<browserux-theme-switcher>
  <span slot="light-icon">🌤️</span>
</browserux-theme-switcher>

<!-- SVG personnalisé -->
<browserux-theme-switcher>
  <svg slot="light-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="currentColor"/>
    <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2"/>
    <!-- ... -->
  </svg>
</browserux-theme-switcher>

<!-- Image personnalisée -->
<browserux-theme-switcher>
  <img slot="light-icon" src="/icons/sun.svg" alt="" width="20" height="20">
</browserux-theme-switcher>
```

---

## `dark-icon`

**Position :** Côté droit du bouton de bascule  
**Fallback par défaut :** 🌙  

L'icône affichée à côté du bouton côté thème sombre. Visible dans tous les états.

```html
<!-- Par défaut (sans slot), affiche 🌙 automatiquement -->
<browserux-theme-switcher></browserux-theme-switcher>

<!-- Emoji personnalisé -->
<browserux-theme-switcher>
  <span slot="dark-icon">🌑</span>
</browserux-theme-switcher>

<!-- SVG personnalisé -->
<browserux-theme-switcher>
  <svg slot="dark-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1111.21 3..." fill="currentColor"/>
  </svg>
</browserux-theme-switcher>
```

---

## Utiliser les deux slots

```html
<browserux-theme-switcher>
  <span slot="light-icon">☀️</span>
  <span slot="dark-icon">🌙</span>
</browserux-theme-switcher>
```

```html
<!-- Avec des icônes SVG d'un design system -->
<browserux-theme-switcher>
  <svg slot="light-icon" aria-hidden="true"><!-- icône soleil --></svg>
  <svg slot="dark-icon" aria-hidden="true"><!-- icône lune --></svg>
</browserux-theme-switcher>
```

---

## Comportement des fallbacks

Si un slot nommé n'a pas de nœuds assignés, le composant remplace l'élément `<slot>` par un `<span>` par défaut contenant un emoji.

Ce remplacement est permanent pour cette instance. Une fois qu'un slot est remplacé par un fallback, du contenu sloté ne peut plus y être injecté.

La vérification s'exécute dans un callback `requestAnimationFrame` après le rendu initial, laissant au navigateur le temps de résoudre les assignations de slots avant d'appliquer le fallback.

---

## Shadow DOM et slots

Les slots sont une fonctionnalité du Shadow DOM. Quand `no-shadow` est utilisé, le composant injecte son template dans le light DOM et le mécanisme de slots ne s'applique pas.

Si vous utilisez `no-shadow` et souhaitez tout de même personnaliser les icônes, modifiez directement le HTML injecté ou ajoutez votre propre contenu à côté du composant.

---

## Accessibilité

Les icônes sont purement décoratives. Les deux wrappers de slots portent `aria-hidden="true"`, de sorte que les lecteurs d'écran les ignorent. Le nom accessible du bouton de bascule provient de l'attribut `aria-label`, pas des icônes.

Si vous fournissez une `<img>` dans un slot, définissez `alt=""` pour la garder décorative :

```html
<browserux-theme-switcher>
  <img slot="light-icon" src="/icons/sun.svg" alt="" width="20" height="20">
  <img slot="dark-icon" src="/icons/moon.svg" alt="" width="20" height="20">
</browserux-theme-switcher>
```
