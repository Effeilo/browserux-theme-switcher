# Compatibility

---

## Runtime requirements

| Environment | Minimum version | Reason |
|---|---|---|
| Node.js | 18+ | Required for npm-based projects |
| Browser | See table below | Custom Elements v1, Shadow DOM |

---

## Browser support

`browserux-theme-switcher` uses standard Web Component APIs: Custom Elements v1, Shadow DOM v1, and `<slot>` elements. These are supported in all modern browsers.

| Feature | Chrome | Firefox | Safari | Edge |
|---|---|---|---|---|
| Custom Elements v1 | 67+ | 63+ | 10.1+ | 79+ |
| Shadow DOM v1 | 53+ | 63+ | 10+ | 79+ |
| Named slots | 53+ | 63+ | 10+ | 79+ |
| `prefers-color-scheme` | 76+ | 67+ | 12.1+ | 79+ |
| `localStorage` | All | All | All | All |

> Safari has known quirks with Shadow DOM state-based selectors (`:host` with class conditions). The component works around this by using a CSS custom property for toggle positioning instead of `:host(.dark)`.

---

## Framework compatibility

| Framework | Status | Notes |
|---|---|---|
| Vanilla HTML | Supported | Direct `<script type="module">` or CDN |
| React 17+ | Supported | Import in client components only |
| Next.js 13+ | Supported | Use `'use client'` or dynamic import with `ssr: false` |
| Vue 3 | Supported | Add to `isCustomElement` in Vite config to silence warnings |
| Nuxt 3 | Supported | Use `<ClientOnly>` or guard with `process.client` |
| Angular 14+ | Supported | Add `CUSTOM_ELEMENTS_SCHEMA` to your module |
| Svelte | Supported | Import the package in your component script |
| SvelteKit | Supported | Import only in client context |

See [Framework usage](guide/framework-usage.md) for implementation details.

---

## Build output formats

The package ships three pre-built bundles:

| File | Format | Use case |
|---|---|---|
| `browserux-theme-switcher.esm.js` | ES Module | Bundler projects (Vite, Webpack, Rollup) |
| `browserux-theme-switcher.umd.js` | UMD | Legacy script tags, CommonJS environments |
| `browserux-theme-switcher.min.js` | Minified UMD | CDN usage, production without bundler |
| `browserux-theme-switcher.d.ts` | TypeScript | Type-checked projects |

The ESM bundle is the default export (`"module"` field in `package.json`).

---

## localStorage availability

The component wraps all `localStorage` access in `try/catch`. This handles the following restricted environments:

- Private browsing in Safari (throws `SecurityError`)
- Cross-origin iframes with restrictive permissions
- Content Security Policies that block storage access
- Firefox private mode (quota is 0, writes succeed but reads return nothing)

When `localStorage` is unavailable, the component falls back silently. The toggle functions normally, but the user's choice is not persisted across page reloads.

---

## `prefers-color-scheme` support

If the browser does not support `window.matchMedia('(prefers-color-scheme: dark)')`, the media query result evaluates to `false` and the component defaults to `'light'` when no saved preference exists.

---

## Dependencies

`browserux-theme-switcher` has no runtime dependencies. The package is a self-contained Web Component compiled from TypeScript using Rollup.

Build-time dependencies:

| Package | Role |
|---|---|
| [rollup](https://rollupjs.org/) | Module bundler |
| [typescript](https://www.typescriptlang.org/) | TypeScript compiler |
| [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript) | Rollup TypeScript plugin |
| [@rollup/plugin-node-resolve](https://github.com/rollup/plugins/tree/master/packages/node-resolve) | Node module resolution for Rollup |
| [@rollup/plugin-terser](https://github.com/rollup/plugins/tree/master/packages/terser) | Minification |
| [rollup-plugin-dts](https://github.com/Swatinem/rollup-plugin-dts) | TypeScript declaration bundling |
