# Events

`browserux-theme-switcher` dispatches a single custom event whenever the active theme changes.

---

## `theme-change`

**Type:** `CustomEvent`  
**Bubbles:** `true`  
**Composed:** `true` (crosses Shadow DOM boundaries)

Fired every time the component applies a theme - both on initialization and after every user toggle.

### Event detail

```ts
interface ThemeChangeDetail {
  theme: 'light' | 'dark';
}
```

The `detail.theme` property contains the newly applied theme value.

---

## Listening to the event

### In plain JavaScript

```js
const switcher = document.querySelector('browserux-theme-switcher');

switcher.addEventListener('theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

Because the event bubbles, you can also listen at the document level:

```js
document.addEventListener('theme-change', (e) => {
  console.log('Theme changed to:', e.detail.theme);
});
```

### In React

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

### In Vue 3

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

### In Angular

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

## Use cases

### Updating third-party components

Some libraries (charts, code editors, maps) expose their own theme APIs. Use `theme-change` to synchronize them:

```js
document.addEventListener('theme-change', (e) => {
  myChart.setTheme(e.detail.theme === 'dark' ? 'dark' : 'light');
  editor.updateOptions({ theme: e.detail.theme === 'dark' ? 'vs-dark' : 'vs' });
});
```

### Persisting to a server

```js
document.addEventListener('theme-change', async (e) => {
  await fetch('/api/preferences', {
    method: 'POST',
    body: JSON.stringify({ theme: e.detail.theme }),
    headers: { 'Content-Type': 'application/json' }
  });
});
```

### Updating a meta tag for mobile browsers

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

The `theme-change` event is dispatched at the end of `applyTheme()`, after:

1. `data-theme` is set on the target element
2. The toggle position is updated
3. ARIA labels are updated
4. Images are swapped

When the event fires, all DOM updates are complete. Handlers can safely read `data-theme` from the target element.

```js
document.addEventListener('theme-change', (e) => {
  const theme = document.documentElement.getAttribute('data-theme');
  // theme === e.detail.theme, always in sync
});
```

---

## Initialization event

The `theme-change` event also fires on initial load when `initializeTheme()` runs. This means your listener will be called once immediately after the component connects, before any user interaction.

If you need to distinguish between initialization and user-triggered changes, check the order of registration. Listeners attached before the component connects to the DOM will receive the initialization event. Listeners attached after connection may or may not receive it depending on timing.
