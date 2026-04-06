# Framework usage

`browserux-theme-switcher` is a standard Custom Element. It works in any JavaScript framework without modification, as long as the component is registered before it is rendered.

---

## Vanilla HTML (no bundler)

Load the component via CDN and use the tag directly:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
</head>
<body>
  <header>
    <browserux-theme-switcher></browserux-theme-switcher>
  </header>
</body>
</html>
```

---

## Vanilla JS with a bundler

Import once in your entry file. Registration is automatic:

```js
// main.js or index.js
import 'browserux-theme-switcher';
```

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

---

## React / Next.js

React does not pass non-standard props to Custom Elements as HTML attributes. Use a wrapper ref if you need to set complex values programmatically. For standard usage, the tag works directly:

```jsx
// App.jsx
import 'browserux-theme-switcher';

export default function App() {
  return (
    <header>
      <browserux-theme-switcher lang="en"></browserux-theme-switcher>
    </header>
  );
}
```

For Next.js with SSR, use a client-only import:

```jsx
'use client';
import 'browserux-theme-switcher';

export default function Header() {
  return <browserux-theme-switcher></browserux-theme-switcher>;
}
```

Alternatively, use dynamic import at the file level to prevent SSR:

```jsx
// components/ThemeSwitcher.jsx
import dynamic from 'next/dynamic';

const ThemeSwitcher = dynamic(
  () => import('browserux-theme-switcher').then(() => {
    return () => <browserux-theme-switcher></browserux-theme-switcher>;
  }),
  { ssr: false }
);

export default ThemeSwitcher;
```

### Listening to `theme-change` in React

```jsx
import { useEffect, useRef } from 'react';
import 'browserux-theme-switcher';

export default function Header() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const handler = (e) => console.log('Theme changed to:', e.detail.theme);
    el.addEventListener('theme-change', handler);
    return () => el.removeEventListener('theme-change', handler);
  }, []);

  return <browserux-theme-switcher ref={ref}></browserux-theme-switcher>;
}
```

---

## Vue 3

Vue treats unknown elements as Custom Elements automatically when using Vite. No additional configuration needed:

```vue
<script setup>
import 'browserux-theme-switcher';

function onThemeChange(e) {
  console.log('Theme changed to:', e.detail.theme);
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

If Vue warns about an unknown element, add the component to the `compilerOptions` in `vite.config.js`:

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

In Angular, custom elements are supported but require opting out of the default unknown element warning. Add `CUSTOM_ELEMENTS_SCHEMA` to your module or standalone component:

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
  <browserux-theme-switcher lang="en" (theme-change)="onThemeChange($event)">
  </browserux-theme-switcher>
</header>
```

```ts
// app.component.ts
onThemeChange(event: CustomEvent) {
  console.log('Theme changed to:', event.detail.theme);
}
```

---

## TypeScript declarations

When using `browserux-theme-switcher` in a TypeScript project, you may see errors about the element not being recognized in JSX or template types. Add a declaration to extend the built-in element maps:

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

Or for Vue/Angular, create a global element declaration:

```ts
// global.d.ts
declare global {
  interface HTMLElementTagNameMap {
    'browserux-theme-switcher': HTMLElement;
  }
}
```
