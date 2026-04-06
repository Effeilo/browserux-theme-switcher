# Utilisation avec les frameworks

`browserux-theme-switcher` est un Custom Element standard. Il fonctionne dans n'importe quel framework JavaScript sans modification, à condition que le composant soit enregistré avant son rendu.

---

## HTML vanilla (sans bundler)

Chargez le composant via CDN et utilisez la balise directement :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
</head>
<body>
  <header>
    <browserux-theme-switcher lang="fr"></browserux-theme-switcher>
  </header>
</body>
</html>
```

---

## JS vanilla avec un bundler

Importez une fois dans votre fichier d'entrée. L'enregistrement est automatique :

```js
// main.js ou index.js
import 'browserux-theme-switcher';
```

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

---

## React / Next.js

React ne transmet pas les props non standard aux Custom Elements comme attributs HTML. Utilisez une ref si vous avez besoin de définir des valeurs complexes par programmation. Pour un usage standard, la balise fonctionne directement :

```jsx
// App.jsx
import 'browserux-theme-switcher';

export default function App() {
  return (
    <header>
      <browserux-theme-switcher lang="fr"></browserux-theme-switcher>
    </header>
  );
}
```

Pour Next.js avec SSR, utilisez un import côté client uniquement :

```jsx
'use client';
import 'browserux-theme-switcher';

export default function Header() {
  return <browserux-theme-switcher lang="fr"></browserux-theme-switcher>;
}
```

Ou utilisez l'import dynamique au niveau du fichier pour empêcher le SSR :

```jsx
// components/ThemeSwitcher.jsx
import dynamic from 'next/dynamic';

const ThemeSwitcher = dynamic(
  () => import('browserux-theme-switcher').then(() => {
    return () => <browserux-theme-switcher lang="fr"></browserux-theme-switcher>;
  }),
  { ssr: false }
);

export default ThemeSwitcher;
```

### Écouter `theme-change` dans React

```jsx
import { useEffect, useRef } from 'react';
import 'browserux-theme-switcher';

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = (e) => console.log('Thème changé en :', e.detail.theme);
    el.addEventListener('theme-change', handler);
    return () => el.removeEventListener('theme-change', handler);
  }, []);

  return <browserux-theme-switcher ref={ref} lang="fr"></browserux-theme-switcher>;
}
```

---

## Vue 3

Vue traite automatiquement les éléments inconnus comme des Custom Elements avec Vite. Aucune configuration supplémentaire n'est nécessaire :

```vue
<script setup>
import 'browserux-theme-switcher';

function onThemeChange(e) {
  console.log('Thème changé en :', e.detail.theme);
}
</script>

<template>
  <header>
    <browserux-theme-switcher
      lang="fr"
      @theme-change="onThemeChange"
    ></browserux-theme-switcher>
  </header>
</template>
```

Si Vue avertit d'un élément inconnu, ajoutez le composant aux `compilerOptions` dans `vite.config.js` :

```js
// vite.config.js
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => tag.startsWith('browserux-'),
        },
      },
    }),
  ],
});
```

---

## Angular

Dans Angular, les éléments personnalisés sont supportés mais nécessitent de désactiver l'avertissement sur les éléments inconnus. Ajoutez `CUSTOM_ELEMENTS_SCHEMA` à votre module ou composant standalone :

```ts
// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import 'browserux-theme-switcher';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

```html
<!-- app.component.html -->
<header>
  <browserux-theme-switcher lang="fr" (theme-change)="onThemeChange($event)">
  </browserux-theme-switcher>
</header>
```

```ts
// app.component.ts
onThemeChange(event: CustomEvent) {
  console.log('Thème changé en :', event.detail.theme);
}
```

---

## Déclarations TypeScript

Lors de l'utilisation de `browserux-theme-switcher` dans un projet TypeScript, des erreurs peuvent apparaître si l'élément n'est pas reconnu dans les types JSX ou template. Ajoutez une déclaration pour étendre les maps d'éléments natifs :

```ts
// declarations.d.ts
declare namespace JSX {
  interface IntrinsicElements {
    'browserux-theme-switcher': React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >;
  }
}
```

Ou pour Vue/Angular, créez une déclaration d'élément globale :

```ts
// global.d.ts
declare global {
  interface HTMLElementTagNameMap {
    'browserux-theme-switcher': HTMLElement;
  }
}
```
