# How it works

`browserux-theme-switcher` is a native Custom Element that manages its own lifecycle, rendering, and state. Understanding how each part works helps you configure the component correctly and anticipate its behavior.

---

## Component lifecycle overview

```
<browserux-theme-switcher> connected to DOM
│
├── connectedCallback      → determine Shadow DOM or light DOM root
├── template clone         → inject HTML structure and scoped styles
├── event binding          → attach click listener to the toggle button
├── initializeTheme()      → detect and apply initial theme
│
│   [User clicks the toggle]
│
├── toggleTheme()          → compute next theme, save to localStorage
└── applyTheme()           → set data-theme, update ARIA, swap images, dispatch event
```

---

## Initialization

### Shadow DOM detection

When the element connects, the component checks for the `no-shadow` attribute. If absent, it creates a Shadow DOM root (`mode: 'open'`) and injects the template into it. If `no-shadow` is present, the template is injected directly into the element in the light DOM.

This decision is made once in `connectedCallback` and cannot change after connection.

### Template injection

A static `<template>` element holds the component's HTML structure and scoped styles. On each connection, the template content is cloned with `cloneNode(true)` and appended to the active root. This avoids re-parsing the markup on every instance.

---

## Theme initialization

`initializeTheme()` runs once when the element connects. It determines the starting theme using this priority order:

1. **Saved preference** : reads `localStorage.getItem('theme')`. If a value exists and is `'light'` or `'dark'`, it is used immediately.
2. **System preference** : if nothing is saved, reads `window.matchMedia('(prefers-color-scheme: dark)').matches` to detect the OS-level preference.
3. **Default** : if neither is available, defaults to `'light'`.

If the component starts from the system preference (no saved value), it also registers a `change` listener on `prefers-color-scheme`. This listener is removed implicitly when the user makes a manual choice, because subsequent `localStorage` writes take over on the next load.

---

## Applying the theme

`applyTheme(theme)` is the central method that runs both on initialization and after every user toggle. It performs four operations in sequence:

### 1. Set `data-theme` on the target element

```js
target.setAttribute('data-theme', theme);
```

The target defaults to `document.documentElement` (`<html>`). A custom element can be specified via the `target` attribute.

### 2. Update the toggle position

Instead of relying on `:host` state selectors (which have inconsistent behavior in Firefox), the component sets a CSS variable directly on itself:

```js
this.style.setProperty('--toggle-shift', theme === 'dark'
    ? 'translateX(calc(var(--bux-switch-width) - var(--bux-switch-height)))'
    : 'translateX(0)');
```

This approach works identically in all browsers.

### 3. Update ARIA labels

The toggle button's `aria-label` is updated to describe the next available action (not the current state). The label is sourced from:

- `data-label-light` / `data-label-dark` attributes (if set)
- The built-in `I18N_LABELS` table for the active language
- English fallback if the language is not supported

The button also receives `aria-pressed="true"` in dark mode and `aria-pressed="false"` in light mode.

### 4. Swap images and dispatch the event

Image sources are updated via `updateImagesByTheme()` and `updateThemeImages()`. A `theme-change` custom event is then dispatched with `bubbles: true` and `composed: true` so it crosses Shadow DOM boundaries.

See [Utilities](../reference/utils.md) and [Events](../reference/events.md) for details.

---

## Language resolution

The active language is resolved by `getLang()` in this order:

1. The `lang` attribute on the component itself
2. The `lang` attribute on `<html>`
3. Fallback to `'en'`

Supported language codes: `en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`.

---

## Target resolution

`getThemeTarget()` resolves the element that receives the `data-theme` attribute:

- If no `target` attribute is set → `document.documentElement`
- If `target` is set → `document.querySelector(target)`, with a fallback to `document.documentElement` if the selector is invalid or not found

Invalid CSS selectors are caught silently and cause the component to fall back to `<html>`.

---

## localStorage safety

All `localStorage` access is wrapped in `try/catch`. This protects the component in environments where storage access is restricted: private browsing in Safari or Firefox, cross-origin iframes, or strict Content Security Policies.

When `localStorage` is unavailable, the component still works. Theme preference is not persisted, but the toggle functions normally within the session.

---

## Slot fallbacks

After the template is injected, `handleSlotFallbacks()` runs in a `requestAnimationFrame` callback to check whether the `light-icon` and `dark-icon` slots have been filled by the consumer.

If a slot is empty, the component replaces it with a default emoji (`☀️` for light, `🌙` for dark). This replacement is permanent for that instance - the slot element is removed from the DOM.

If a slot receives content via `slotchange`, the check is deferred and respects the final slotted content before replacing.
