# Utilities

`browserux-theme-switcher` includes two utility functions for updating image sources when the theme changes. Both are called automatically by the component on every theme application. They can also be imported and called manually if needed.

---

## `updateImagesByTheme()`

**File:** `src/utils/theme-utils.ts`

Automatically swaps image sources for `<img class="has-dark">` elements using a filename naming convention. No additional attributes are required on the image.

### Signature

```ts
function updateImagesByTheme(target?: HTMLElement): void
```

### Parameters

| Parameter | Type | Default | Description |
|---|---|---|---|
| `target` | `HTMLElement` | `document.documentElement` | The element whose `data-theme` attribute is read to determine the active theme |

### Behavior

1. Reads `data-theme` from `target` to determine if the active theme is `'dark'`
2. Selects all `<img class="has-dark">` elements in the document
3. Skips images that have the `data-locked` attribute
4. On first call for each image, saves the original `src` in `img.dataset.src`
5. In dark mode: modifies `src` by inserting `-dark` before the file extension
6. In light mode: restores the original `src` from `img.dataset.src`

### Filename convention

```
Original:   /img/logo.webp
Dark mode:  /img/logo-dark.webp

Original:   /img/banner.png
Dark mode:  /img/banner-dark.png
```

Query strings are preserved:

```
Original:   /img/logo.png?v=2
Dark mode:  /img/logo-dark.png?v=2
```

### Example

```html
<!-- These images are swapped automatically -->
<img class="has-dark" src="/img/logo.webp" alt="Logo">
<img class="has-dark" src="/img/hero.jpg" alt="Hero image">

<!-- This image is excluded from swapping -->
<img class="has-dark" data-locked src="/img/icon.svg" alt="Icon">
```

### Opting out

Add `data-locked` to any `<img class="has-dark">` to prevent it from being swapped:

```html
<img class="has-dark" data-locked src="/img/logo.webp" alt="Logo">
```

### Manual usage

The function can be imported and called independently:

```js
import { updateImagesByTheme } from 'browserux-theme-switcher/src/utils/theme-utils';

const target = document.querySelector('#app');
updateImagesByTheme(target);
```

---

## `updateThemeImages()`

**File:** `src/utils/theme-image.ts`

Swaps image sources for `<img class="has-dark">` elements using explicit `data-src-light` and `data-src-dark` attributes. Provides full control over which source is used per theme, without depending on a filename convention.

### Signature

```ts
function updateThemeImages(theme: 'light' | 'dark'): void
```

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `theme` | `'light' \| 'dark'` | The theme to apply to all eligible images |

### Behavior

1. Selects all `<img class="has-dark">` elements in the document
2. For each image, reads `data-src-light` and `data-src-dark`
3. Chooses the appropriate source based on `theme`
4. Updates `img.src` only if the source differs from the current value and the image does not have `data-locked`

### Example

```html
<!-- Using explicit source attributes -->
<img
  class="has-dark"
  src="/img/logo-light.webp"
  data-src-light="/img/logo-light.webp"
  data-src-dark="/img/logo-dark-variant.webp"
  alt="Logo"
>

<!-- Another image with completely different filenames per theme -->
<img
  class="has-dark"
  src="/img/hero-day.jpg"
  data-src-light="/img/hero-day.jpg"
  data-src-dark="/img/hero-night.jpg"
  alt="Hero"
>
```

### Manual usage

```js
import { updateThemeImages } from 'browserux-theme-switcher/src/utils/theme-image';

updateThemeImages('dark');
```

---

## Execution order

Inside `applyTheme()`, the component calls both functions in sequence:

```ts
updateImagesByTheme(this.getThemeTarget()); // filename convention
updateThemeImages(theme);                   // explicit attributes
```

`updateThemeImages()` runs second. If an image has both `data-src-light`/`data-src-dark` and a filename that follows the `-dark` convention, the explicit attributes take precedence because they run last and overwrite the result of the filename swap.

---

## Which function to use?

| Scenario | Recommended function |
|---|---|
| Images follow a consistent `-dark` naming pattern | `updateImagesByTheme()` |
| Images have arbitrary filenames per theme | `updateThemeImages()` |
| Both strategies coexist | Both, explicit attributes take precedence |
| You want to opt a single image out of swapping | Add `data-locked` |
