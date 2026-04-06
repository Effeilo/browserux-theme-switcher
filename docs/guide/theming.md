# Theming

`browserux-theme-switcher` applies a `data-theme` attribute to a DOM element and provides CSS custom properties to style the toggle itself. This page covers both sides: styling your page based on the active theme, and customizing the component's visual appearance.

---

## Applying styles based on the active theme

The component sets `data-theme="light"` or `data-theme="dark"` on the `<html>` element (or a custom target). Your CSS reads this attribute to apply the appropriate styles.

### Using CSS custom properties

The recommended approach is to define your design tokens as CSS variables and override them per theme:

```css
:root {
  --color-bg: #ffffff;
  --color-text: #111111;
  --color-border: #e0e0e0;
  --color-accent: #0066cc;
}

[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f0f0f0;
  --color-border: #333333;
  --color-accent: #66aaff;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
}
```

### Combining with system preference

You can layer `@media (prefers-color-scheme: dark)` alongside `[data-theme]` so the page respects the system theme before any user interaction:

```css
/* System preference (before any toggle click) */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --color-bg: #111111;
    --color-text: #f0f0f0;
  }
}

/* Explicit user override */
[data-theme="dark"] {
  --color-bg: #111111;
  --color-text: #f0f0f0;
}

[data-theme="light"] {
  --color-bg: #ffffff;
  --color-text: #111111;
}
```

---

## Customizing the toggle component

The toggle button's visual appearance is controlled by CSS custom properties exposed on the component's Shadow DOM host. These can be set via the `style` attribute or in a CSS rule targeting `browserux-theme-switcher`.

### Available CSS custom properties

| Property | Default | Description |
|---|---|---|
| `--bux-switch-width` | `40px` | Total width of the toggle button |
| `--bux-switch-height` | `24px` | Total height of the toggle button |
| `--bux-switch-bg-color` | `#888` | Background color of the track |
| `--bux-switch-thumb-color` | `#fff` | Color of the sliding thumb |
| `--bux-switch-emoji-size` | `inherit` | Font size of the default emoji icons |

### Via the `style` attribute

```html
<browserux-theme-switcher
  style="
    --bux-switch-width: 50px;
    --bux-switch-height: 28px;
    --bux-switch-bg-color: #3a86ff;
    --bux-switch-thumb-color: #ffffff;
  "
></browserux-theme-switcher>
```

### Via a CSS rule

```css
browserux-theme-switcher {
  --bux-switch-width: 50px;
  --bux-switch-height: 28px;
  --bux-switch-bg-color: #3a86ff;
  --bux-switch-thumb-color: #ffffff;
  --bux-switch-emoji-size: 1.2rem;
}
```

---

## Managing images based on the active theme

The component provides two strategies for swapping image sources when the theme changes. Both strategies look for images with `class="has-dark"`.

### Strategy 1 - Automatic filename convention

Images are swapped automatically based on a filename naming convention. No additional attributes are needed on the image.

When the theme switches to dark, the component modifies the `src` by inserting `-dark` before the file extension:

```
/img/logo.webp → /img/logo-dark.webp
/img/banner.png → /img/banner-dark.png
```

**HTML:**

```html
<img class="has-dark" src="/img/logo.webp" alt="Logo">
```

The original `src` is preserved in `data-src` and restored when switching back to light mode.

**To opt out** of automatic switching on a specific image, add `data-locked`:

```html
<img class="has-dark" data-locked src="/img/logo.webp" alt="Logo">
```

### Strategy 2 - Explicit source attributes

For images where the filenames do not follow the `-dark` convention, specify sources explicitly using `data-src-light` and `data-src-dark`:

```html
<img
  class="has-dark"
  src="/img/logo.webp"
  data-src-light="/img/logo-light-version.webp"
  data-src-dark="/img/logo-inverted.webp"
  alt="Logo"
>
```

The component reads these attributes and swaps the `src` accordingly. This approach takes precedence over the filename convention when both `data-src-light` and `data-src-dark` are present.

### Priority

Both utility functions run on every theme change. `updateThemeImages()` (explicit attributes) runs after `updateImagesByTheme()` (filename convention). If `data-src-light` and `data-src-dark` are defined on an image, they override any automatic filename replacement.

---

## Targeting a custom element

By default, `data-theme` is applied to `<html>`. To scope the theme to a specific element:

```html
<main id="app">
  <browserux-theme-switcher target="#app"></browserux-theme-switcher>
  <!-- only #app gets data-theme, not <html> -->
</main>
```

This is useful when you need multiple independent theme zones on the same page, or when you want to avoid modifying the root element.
