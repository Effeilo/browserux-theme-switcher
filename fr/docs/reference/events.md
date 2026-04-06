# Événements

`browserux-theme-switcher` dispatche un seul événement personnalisé à chaque changement de thème actif.

---

## `theme-change`

**Type :** `CustomEvent`  
**Bubbles :** `true`  
**Composed :** `true` (traverse les frontières Shadow DOM)

Déclenché à chaque fois que le composant applique un thème, aussi bien lors de l'initialisation qu'après chaque bascule utilisateur.

### Détail de l'événement

```ts
interface ThemeChangeDetail {
  theme: 'light' | 'dark';
}
```

La propriété `detail.theme` contient la valeur du thème nouvellement appliqué.

---

## Écouter l'événement

### En JavaScript pur

```js
const switcher = document.querySelector('browserux-theme-switcher');

switcher.addEventListener('theme-change', (e) => {
  console.log('Thème changé en :', e.detail.theme);
});
```

Comme l'événement remonte (bubbles), vous pouvez aussi écouter au niveau du document :

```js
document.addEventListener('theme-change', (e) => {
  console.log('Thème changé en :', e.detail.theme);
});
```

### Dans React

```jsx
import { useEffect, useRef } from 'react';
import 'browserux-theme-switcher';

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = (e) => console.log(e.detail.theme);
    el.addEventListener('theme-change', handler);
    return () => el.removeEventListener('theme-change', handler);
  }, []);

  return <browserux-theme-switcher ref={ref}></browserux-theme-switcher>;
}
```

### Dans Vue 3

```vue
<template>
  <browserux-theme-switcher @theme-change="onThemeChange"></browserux-theme-switcher>
</template>

<script setup>
function onThemeChange(e) {
  console.log(e.detail.theme);
}
</script>
```

### Dans Angular

```html
<browserux-theme-switcher (theme-change)="onThemeChange($event)">
</browserux-theme-switcher>
```

```ts
onThemeChange(event: CustomEvent<{ theme: string }>) {
  console.log(event.detail.theme);
}
```

---

## Cas d'usage

### Mettre à jour des composants tiers

Certaines bibliothèques (graphiques, éditeurs de code, cartes) exposent leur propre API de thème. Utilisez `theme-change` pour les synchroniser :

```js
document.addEventListener('theme-change', (e) => {
  myChart.setTheme(e.detail.theme === 'dark' ? 'dark' : 'light');
  editor.updateOptions({ theme: e.detail.theme === 'dark' ? 'vs-dark' : 'vs' });
});
```

### Persister vers un serveur

```js
document.addEventListener('theme-change', async (e) => {
  await fetch('/api/preferences', {
    method: 'POST',
    body: JSON.stringify({ theme: e.detail.theme }),
    headers: { 'Content-Type': 'application/json' }
  });
});
```

### Mettre à jour une balise meta pour les navigateurs mobiles

```js
const meta = document.querySelector('meta[name="theme-color"]');

document.addEventListener('theme-change', (e) => {
  if (meta) {
    meta.setAttribute('content', e.detail.theme === 'dark' ? '#111111' : '#ffffff');
  }
});
```

---

## Timing

L'événement `theme-change` est dispatché à la fin de `applyTheme()`, après :

1. La définition de `data-theme` sur l'élément cible
2. La mise à jour de la position du bouton de bascule
3. La mise à jour des labels ARIA
4. L'échange des images

Quand l'événement se déclenche, toutes les mises à jour DOM sont terminées. Les handlers peuvent lire `data-theme` sur l'élément cible en toute sécurité.

```js
document.addEventListener('theme-change', (e) => {
  const theme = document.documentElement.getAttribute('data-theme');
  // theme === e.detail.theme, toujours synchronisé
});
```

---

## Événement à l'initialisation

L'événement `theme-change` se déclenche également au chargement initial quand `initializeTheme()` s'exécute. Cela signifie que votre listener sera appelé une fois immédiatement après la connexion du composant, avant toute interaction utilisateur.

Si vous avez besoin de distinguer l'initialisation des changements déclenchés par l'utilisateur, vérifiez l'ordre d'enregistrement. Les listeners attachés avant la connexion du composant au DOM recevront l'événement d'initialisation. Les listeners attachés après la connexion peuvent ou non le recevoir selon le timing.
