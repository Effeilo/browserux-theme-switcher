# Getting started

`browserux-theme-switcher` works in any HTML page or JavaScript project. Choose the installation method that fits your setup.

---

## Requirements

| Environment | Minimum version |
|---|---|
| Node.js | 18+ (for npm-based projects) |
| Browser | Any browser with Custom Elements support |

For browser compatibility details, see [Compatibility](../compatibility.md).

---

## Installation

### Via npm

```bash
npm install browserux-theme-switcher
```

### Via CDN

No build step required. Add the script tag directly to your HTML:

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
```

---

## Basic usage

Once the script is loaded, place the component anywhere in your HTML:

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

That's it. The component initializes automatically on connection, detects the system theme, and renders the toggle button with default emoji icons (☀️ and 🌙).

---

## Usage in a bundler project

Import the package once in your entry file. The component registers itself globally on import:

```js
import 'browserux-theme-switcher';
```

Then use it in any HTML template:

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

---

## Adding CSS for theme switching

The component applies a `data-theme` attribute to `<html>`. Your CSS reads this attribute to switch styles:

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

You can also use `@media (prefers-color-scheme: dark)` alongside `[data-theme]` for a layered approach:

```css
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #111111;
    --color-text: #f0f0f0;
  }
}
```

---

## Verifying the output

Open your browser's developer tools and inspect the `<html>` element. When the component is connected and the theme is applied, you should see:

```html
<html data-theme="light">
```

Click the toggle and it switches to:

```html
<html data-theme="dark">
```

The toggle button's `aria-label` also updates on each click to reflect the next available action.

---

## SSR and hydration notes

Because `browserux-theme-switcher` reads `localStorage` and `window.matchMedia` in the browser, it must not be server-rendered. In frameworks with SSR (Next.js, Nuxt, SvelteKit), import or register the component only on the client side.

For Next.js, use dynamic import with `ssr: false`:

```js
import dynamic from 'next/dynamic';
const ThemeSwitcher = dynamic(() => import('browserux-theme-switcher'), { ssr: false });
```

For Nuxt 3, wrap the import in a `<ClientOnly>` component or use `process.client` guards.
