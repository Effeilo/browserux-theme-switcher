# Attributes

All configuration is done through HTML attributes set on the `<browserux-theme-switcher>` element. No JavaScript API is required.

```html
<browserux-theme-switcher
  target="#app"
  lang="fr"
  data-label-light="Passer en mode clair"
  data-label-dark="Passer en mode sombre"
  no-shadow
  style="--bux-switch-bg-color: #3a86ff;"
></browserux-theme-switcher>
```

---

## Quick reference

| Attribute | Type | Default | Description |
|---|---|---|---|
| `target` | `string` | `undefined` | CSS selector for the element that receives `data-theme` |
| `lang` | `string` | `undefined` | Language code for built-in ARIA labels |
| `data-label-light` | `string` | *(i18n label)* | Custom ARIA label for activating light mode |
| `data-label-dark` | `string` | *(i18n label)* | Custom ARIA label for activating dark mode |
| `no-shadow` | `boolean` | `false` | Disable Shadow DOM encapsulation |
| `style` | `string` | — |   Inline CSS custom properties for visual customization |

---

## `target`

**Type:** `string` (CSS selector) - **Default:** `document.documentElement`

Specifies which element receives the `data-theme` attribute when the theme changes. Accepts any valid CSS selector.

If the attribute is absent or the selector does not match any element, the `<html>` element is used as a fallback.

```html
<!-- Apply theme to a scoped container instead of <html> -->
<main id="app">
  <browserux-theme-switcher target="#app"></browserux-theme-switcher>
</main>
```

```html
<!-- Apply to a custom element -->
<browserux-theme-switcher target=".theme-root"></browserux-theme-switcher>
```

Invalid selectors (malformed CSS) are caught silently. The component falls back to `<html>` without throwing.

---

## `lang`

**Type:** `string` - **Default:** inherits from `<html lang="">` or falls back to `'en'`

Sets the language for the built-in ARIA labels on the toggle button. Overrides any `lang` attribute present on the `<html>` element.

```html
<browserux-theme-switcher lang="fr"></browserux-theme-switcher>
```

Supported language codes:

| Code | Language |
|---|---|
| `en` | English (default) |
| `fr` | French |
| `es` | Spanish |
| `de` | German |
| `ja` | Japanese |
| `ru` | Russian |
| `pt` | Portuguese |
| `it` | Italian |
| `nl` | Dutch |

If an unsupported code is provided, the component falls back to English labels.

This attribute is observed. Changing it after connection updates the ARIA label immediately.

---

## `data-label-light`

**Type:** `string` - **Default:** language-dependent (e.g., `"Activate light mode"`)

Overrides the ARIA label displayed on the button when the current theme is dark (i.e., when clicking will switch to light mode).

```html
<browserux-theme-switcher
  data-label-light="Switch to light theme"
></browserux-theme-switcher>
```

This attribute is observed. Changing it after connection updates the button's `aria-label` immediately.

---

## `data-label-dark`

**Type:** `string` - **Default:** language-dependent (e.g., `"Activate dark mode"`)

Overrides the ARIA label displayed on the button when the current theme is light (i.e., when clicking will switch to dark mode).

```html
<browserux-theme-switcher
  data-label-dark="Switch to dark theme"
></browserux-theme-switcher>
```

This attribute is observed. Changing it after connection updates the button's `aria-label` immediately.

### How labels are selected

The active label always describes the action the button will perform, not the current state:

| Current theme | Displayed label source |
|---|---|
| `light` | `data-label-dark` or i18n "dark" label |
| `dark` | `data-label-light` or i18n "light" label |

The button also exposes `aria-pressed="true"` in dark mode and `aria-pressed="false"` in light mode for programmatic state detection.

---

## `no-shadow`

**Type:** boolean (presence/absence) - **Default:** absent (Shadow DOM is used)

When present, disables Shadow DOM encapsulation. The component's template is injected directly into the element's light DOM.

```html
<browserux-theme-switcher no-shadow></browserux-theme-switcher>
```

**When to use:**

- You want to style the toggle button's internals from your own stylesheet without CSS custom properties
- Your environment does not support Shadow DOM
- You need the component's internal elements to participate in the global document flow

**Trade-offs:**

| | Shadow DOM (default) | No Shadow DOM (`no-shadow`) |
|---|---|---|
| Style isolation | Full encapsulation | Global styles can affect internals |
| CSS custom properties | Supported | Supported |
| Slot support | Full slot API | Slots may not work as expected |

> This attribute is read once in `connectedCallback`. Changing it after the element connects has no effect.

---

## `style`

The `style` attribute on `browserux-theme-switcher` supports CSS custom properties that control the toggle's visual appearance. These properties are inherited by the Shadow DOM's `:host` rule.

```html
<browserux-theme-switcher
  style="
    --bux-switch-width: 50px;
    --bux-switch-height: 28px;
    --bux-switch-bg-color: #3a86ff;
    --bux-switch-thumb-color: #ffffff;
    --bux-switch-emoji-size: 1.2rem;
  "
></browserux-theme-switcher>
```

For the full list of supported properties and their defaults, see [Theming](../guide/theming.md).
