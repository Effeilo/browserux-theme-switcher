# Slots

`browserux-theme-switcher` exposes two named slots for customizing the icons displayed on either side of the toggle button. If no slot content is provided, the component falls back to default emoji icons.

---

## Overview

```
[ light-icon ] [ toggle button ] [ dark-icon ]
     ☀️               ●                🌙
```

Both slots are optional. Provide one, both, or neither.

---

## `light-icon`

**Position:** Left side of the toggle  
**Default fallback:** ☀️  

The icon displayed next to the toggle on the light theme side. Visible in all states.

```html
<!-- Default (no slot), shows ☀️ automatically -->
<browserux-theme-switcher></browserux-theme-switcher>

<!-- Custom emoji -->
<browserux-theme-switcher>
  <span slot="light-icon">🌤️</span>
</browserux-theme-switcher>

<!-- Custom SVG -->
<browserux-theme-switcher>
  <svg slot="light-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="currentColor"/>
    <line x1="12" y1="2" x2="12" y2="4" stroke="currentColor" stroke-width="2"/>
    <!-- ... -->
  </svg>
</browserux-theme-switcher>

<!-- Custom image -->
<browserux-theme-switcher>
  <img slot="light-icon" src="/icons/sun.svg" alt="" width="20" height="20">
</browserux-theme-switcher>
```

---

## `dark-icon`

**Position:** Right side of the toggle  
**Default fallback:** 🌙  

The icon displayed next to the toggle on the dark theme side. Visible in all states.

```html
<!-- Default (no slot), shows 🌙 automatically -->
<browserux-theme-switcher></browserux-theme-switcher>

<!-- Custom emoji -->
<browserux-theme-switcher>
  <span slot="dark-icon">🌑</span>
</browserux-theme-switcher>

<!-- Custom SVG -->
<browserux-theme-switcher>
  <svg slot="dark-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M21 12.79A9 9 0 1111.21 3..." fill="currentColor"/>
  </svg>
</browserux-theme-switcher>
```

---

## Using both slots

```html
<browserux-theme-switcher>
  <span slot="light-icon">☀️</span>
  <span slot="dark-icon">🌙</span>
</browserux-theme-switcher>
```

```html
<!-- With SVG icons from a design system -->
<browserux-theme-switcher>
  <svg slot="light-icon" aria-hidden="true"><!-- sun icon --></svg>
  <svg slot="dark-icon" aria-hidden="true"><!-- moon icon --></svg>
</browserux-theme-switcher>
```

---

## Fallback behavior

If a named slot has no assigned nodes, the component replaces the `<slot>` element with a default `<span>` containing an emoji character.

This replacement is permanent for that instance. Once a slot is replaced with a fallback, slotted content cannot be injected afterwards.

The check runs in a `requestAnimationFrame` callback after the initial render, giving the browser time to resolve slot assignments before the fallback is applied.

---

## Shadow DOM and slots

Slots are a Shadow DOM feature. When `no-shadow` is used, the component injects its template into the light DOM and the slot mechanism does not apply.

If you use `no-shadow` and still want to customize icons, modify the injected HTML directly or apply your own content alongside the component.

---

## Accessibility

The icons are purely decorative. Both slot wrappers carry `aria-hidden="true"`, so screen readers ignore them. The toggle button's accessible name comes from the `aria-label` attribute, not from the icons.

If you provide an `<img>` in a slot, set `alt=""` to keep it decorative:

```html
<browserux-theme-switcher>
  <img slot="light-icon" src="/icons/sun.svg" alt="" width="20" height="20">
  <img slot="dark-icon" src="/icons/moon.svg" alt="" width="20" height="20">
</browserux-theme-switcher>
```
