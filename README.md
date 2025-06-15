**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-theme-switcher-250.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# BrowserUX Theme Switcher

A lightweight and customizable Web Component that allows users to toggle between light and dark themes. Accessible, internationalized, and compatible with all modern frameworks.

[![npm version](https://img.shields.io/npm/v/browserux-theme-switcher.svg)](https://www.npmjs.com/package/browserux-theme-switcher)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js)

- Project website: [BrowserUX Theme Switcher](https://browserux.com/theme-switcher/)
- [Documentation](https://browserux.com/theme-switcher/documentation/)
- [About BrowserUX Theme Switcher](https://browserux.com/blog/articles/about-browserux-theme-switcher.html)


## Table of Contents

- [Features](#features)
- [How It Works](#how-it-works)
- [Installation](#installation)
- [Usage](#usage)
- [Parameters](#parameters-of-browserux-theme-switcher)
- [Build & Development](#build--development)
- [License](#license)

## Features

### 🎛 Smart Behavior

- 🎚 **Theme Switching**  
  Toggles between `data-theme="light"` and `"dark"` on a target element (default is `<html>`)

- 💾 **Automatic Persistence**  
  Stores user preference in `localStorage` and restores it on each visit

- 🕶 **System Detection**  
  Automatically applies the theme based on `prefers-color-scheme` if no user preference is set

- 📢 **`theme-change` Event**  
  Fires a custom event on each theme change (`e.detail.theme = "light" | "dark"`)

### 🌍 Accessibility & Internationalization

- 🧠 **Dynamic ARIA Labels**  
  Multilingual accessible labels generated automatically or customizable (`data-label-*`)

- 🌐 **Internationalization (`lang`)**  
  Supports multiple languages (auto-detection or manual setting via the `lang` attribute)

### 🎨 Visual Customization

- 🎯 **CSS Targeting (`target`)**  
  Allows applying the theme to a specific element (e.g., `<main>`, `#app`, etc.)

- 🎨 **Customizable CSS Variables**  
  Extensive visual customization via CSS properties (`--bux-switch-*`)

- 🌗 **Custom Icon Slots**  
  Customize icons using SVGs, emojis, or images (`light-icon`, `dark-icon`)

- 🖼 **Adaptive Images (`.has-dark`)**  
  Automatically switch images based on the theme (e.g., `logo.png` → `logo-dark.png`)

### 🔧 Flexible Integration

- 🧩 **Optional Shadow DOM (`no-shadow`)**  
  Disable encapsulation to allow more flexible global styling
  

## How It Works

The `<browserux-theme-switcher>` component dynamically applies a light or dark theme to an element on your page (`<html>` by default, or another element via the `target` attribute).

It follows a three-step logic:

### 1. Automatic Detection of System Theme

If no user preference is set, the component automatically detects the system’s preferred theme using the CSS rule:

```css
@media (prefers-color-scheme: dark)
```

### 2. Storing User Preference

When the user clicks the button to switch themes, their preference (`light` or `dark`) is saved in `localStorage`.

This preference will:

- be automatically applied on the next visit  
- take priority over system detection

### 3. Applying the Theme in the DOM

The component dynamically sets or updates the `data-theme` attribute on the targeted element, for example:

```html
<html data-theme="dark">...</html>
```

This allows you to:

- style the page using conditional CSS variables  
- adapt images (using `.has-dark`)  
- respond to events (like `theme-change`)

> The component works without dependencies, requires no complex configuration, and is compatible with all modern frameworks (React, Vue, Angular) as well as plain HTML.

## Installation

```bash
npm install browserux-theme-switcher
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js"></script>
```

> Use the `.esm.js` version if you're integrating this component via a bundler (React, Vue, etc.), and the `.min.js` version for direct HTML integration via CDN.

## Usage

### The `<browserux-theme-switcher>` Web Component

#### Modern project with bundler (Vite, Webpack, etc.)

1. Simply import the component into your code:

```js
import 'browserux-theme-switcher';
```

2. Then use it in your HTML:

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

#### React / Next.js

1. Add this to your React component (typically inside a `useEffect`):

```jsx
import { useEffect } from 'react';

useEffect(() => {
    import('browserux-theme-switcher');
}, []);
```

2. And in your JSX:

```jsx
<browserux-theme-switcher></browserux-theme-switcher>
```

> Add the `types/browserux-theme-switcher.d.ts` file for better TypeScript support with JSX.

#### Vue 3

1. Add this in `main.js` or `main.ts`:

```js
import 'browserux-theme-switcher';
```

2. Use it as a native component:

```html
<browserux-theme-switcher lang="fr"></browserux-theme-switcher>
```

#### Angular

1. Import it in `main.ts`:

```ts
import 'browserux-theme-switcher';
```

2. Add `CUSTOM_ELEMENTS_SCHEMA` to `AppModule`:

```ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
```

#### Integration without bundler / global script

1. Add the component directly via a CDN:

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js"></script>
```

2. And:

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

### Managing CSS Styles

To apply the light or dark theme to your page, you need to define your colors using CSS variables.  
The `<browserux-theme-switcher>` component automatically applies a `data-theme="dark"` or `"light"` attribute  
to the targeted element (by default `<html>`), which enables dynamic styling of your interface.

#### Full Example

```css
:root {
    --bux-page-bg: #eaeaea;
    --bux-page-color: #121212;
    --bux-color-primary: #f05e0e;
    --bux-color-secondary: #0e93f0;
    --bux-white: #fff;
}

/** Automatic dark mode based on system preferences */
@media (prefers-color-scheme: dark) {
    :root {
        --bux-page-bg: #333;
        --bux-page-color: #eaeaea;
        --bux-color-primary: #eb8a55;
        --bux-color-secondary: #58aae3;
        --bux-white: #444;
    }
}

/** Dark mode forced via browserux-theme-switcher */
[data-theme="dark"] {
    --bux-page-bg: #333;
    --bux-page-color: #eaeaea;
    --bux-color-primary: #eb8a55;
    --bux-color-secondary: #58aae3;
    --bux-white: #444;
}
```

#### Explications 

- `:root` defines the default colors (light mode).
- `@media (prefers-color-scheme: dark)` takes system preferences into account if the user hasn't selected a theme yet.
- `[data-theme="dark"]` forces dark mode when the user clicks the browserux-theme-switcher button.

> The switcher applies `data-theme="dark"` or `data-theme="light"` to the targeted element (`html` by default, or a container via the `target` attribute).  
> You should apply CSS variables to that same element or a shared parent.

### Managing Images Based on Theme (Dark Mode)

The `<browserux-theme-switcher>` component automatically handles theme-adaptive image display (light or dark) using the special `has-dark` class.

#### How does it work?

When you add the `has-dark` class to an image in your HTML:

```html
<img src="logo.png" class="has-dark" alt="Logo">
```

The component will automatically replace the `src` attribute with a `-dark` version when dark mode is active,  
and revert to the original image when switching back to light mode.

#### Requirements

- The original image must be named `name.ext` (e.g., `logo.png`).
- The dark image must be named exactly `name-dark.ext` (e.g., `logo-dark.png`).
- Both images must be located in the same directory.

#### Example

In light mode:

```html
<img src="logo.png" class="has-dark" />
```

→ Displays `logo.png`

🌙 In dark mode:

→ Automatically replaced with `logo-dark.png`

> The change is reversible and instant every time the theme switches, with no page reload or extra JavaScript required.

## Parameters of `<browserux-theme-switcher>`

`<browserux-theme-switcher>` offers many customization options:

| Parameter                | Type      | Name            | Description                                         |
|--------------------------|-----------|------------------|-----------------------------------------------------|
| Custom Targeting         | Attribute | `target`         | Applies the theme to a specific element             |
| Internationalization     | Attribute | `lang`           | Language selection                                  |
| ARIA Accessibility       | Attribute | `data-label-*`   | Customizable accessible labels                      |
| Optional Shadow DOM      | Attribute | `no-shadow`      | Disable encapsulation                               |
| CSS Customization        | Attribute | `style`          | Customization via CSS variables                     |
| Custom Event             | Event     | `theme-change`   | Event triggered on every theme change               |
| Icon Slots               | Slot      | `*-icon`         | Icon customization                                  |
  

### Attributes

#### Custom Targeting (`target`)

By default, the `<browserux-theme-switcher>` component applies the theme (`data-theme="light"` or `"dark"`) to the `<html>` element.  
However, you can customize this target using the `target` attribute.

##### Attribute: `target`

- Type: `string` (valid CSS selector)
- Default value: `html`
- Effect: applies the `data-theme` attribute to the specified element

##### Example

```html
<browserux-theme-switcher 
    target="#app"
></browserux-theme-switcher>

<div id="app">
  <!-- The theme is applied here -->
</div>
```

In this example, the `#app` element (and not `<html>`) will receive the `data-theme` attribute.  
This allows you to scope the theme to a specific container in your application—useful for micro-frontends, app shells, or embedded widgets.

##### Tip

Make sure your CSS styles are based on `[data-theme="dark"]` or `[data-theme="light"]` applied to the correct selector:

```css
#app[data-theme="dark"] {
  --bux-page-bg: #333;
  /* etc. */
}
```

> If the selector passed to `target` does not match any element at render time, the fallback will be `<html>`.

#### Internationalization (`lang`)

The `<browserux-theme-switcher>` component supports multiple languages for its accessible labels (e.g., "Switch to dark mode", "Activer sombre", etc.).

##### Attribute: `lang`

- Type: `string`  (`"en"`, `"fr"`, `"es"`, `"de"`, `"ja"`, `"ru"`, `"pt"`, `"it"`, `"nl"`)
- Default value: auto-detection
- Effect: forces the language used for the switch's ARIA labels (`aria-label`)

##### Example

```html
<browserux-theme-switcher 
  lang="fr"
></browserux-theme-switcher>
```

The ARIA label of the button will automatically be in French:  
`aria-label="Activer le mode sombre"` or `aria-label="Activer le mode clair"`

##### Automatic Detection if `lang` Is Not Defined

If you don’t specify the `lang` attribute, the component follows this logic:

1. Uses the `lang` value on the `<browserux-theme-switcher>` tag  
2. Otherwise, checks the `lang` value on the `<html lang="...">` tag  
3. Otherwise, falls back to `"en"` (English)

##### Built-in Languages

The component supports the following languages for accessible labels (`aria-label`):

- 🇬🇧 en – English (default)  
- 🇫🇷 fr – French  
- 🇪🇸 es – Spanish  
- 🇩🇪 de – German  
- 🇯🇵 ja – Japanese  
- 🇷🇺 ru – Russian  
- 🇵🇹 pt – Portuguese  
- 🇮🇹 it – Italian  
- 🇳🇱 nl – Dutch

#### ARIA Accessibility (`data-label-light` / `data-label-dark`)

The `<browserux-theme-switcher>` component is designed to be screen reader–friendly,  
thanks to dynamic `aria-label`s that describe the button's action (e.g., switch to light or dark mode).

By default, these labels are automatically generated based on the selected language (`lang` attribute).  
However, you can override them with your own custom labels using two attributes:

##### Attributes

| Attribute           | Role                                                                                   |
|---------------------|----------------------------------------------------------------------------------------|
| `data-label-light`  | Label when dark theme is active and the button allows switching to light mode         |
| `data-label-dark`   | Label when light theme is active and the button allows switching to dark mode         |

##### Example

```html
<browserux-theme-switcher
    data-label-light="Activer le thème clair"
    data-label-dark="Passer en mode sombre">
</browserux-theme-switcher>
```

Result:

- In light mode → `aria-label="Switch to dark mode"`
- In dark mode → `aria-label="Activate light theme"`

> These attributes take precedence over automatic language detection (`lang`).

#### Optional Shadow DOM (`no-shadow`)

By default, the `<browserux-theme-switcher>` component uses Shadow DOM to encapsulate its HTML and CSS.  
This ensures that its internal styles don’t interfere with the rest of the page—and vice versa.

However, in some cases—such as applying global styles or addressing specific framework constraints—it may be helpful to disable this encapsulation.

##### Attribute: `no-shadow`

- Type: `boolean` (presence-only)
- Default value: not present → Shadow DOM enabled
- Effect: if present, the component is rendered in the global DOM without encapsulation

##### Example

```html
<browserux-theme-switcher no-shadow></browserux-theme-switcher>
```

This component:

- will be rendered in the regular DOM (not inside a shadowRoot)
- can be styled using your global CSS
- will more easily inherit external styles

##### When to use `no-shadow`?

- When you want to easily override the component’s styles via global CSS
- If you need to theme the switcher using page-level CSS variables
- When integrating in a framework (e.g., Angular) where Shadow DOM causes issues
- To debug the component’s rendering more easily in the DOM

> ⚠️ Without Shadow DOM, the component is more vulnerable to global style conflicts. Use with caution in large-scale applications.

#### CSS Customization (`style`)

The `<browserux-theme-switcher>` component exposes several customizable CSS variables  
to let you tweak its appearance without overriding internal styles.

##### Available Variables

| Variable                  | Default   | Description                |
|---------------------------|-----------|----------------------------|
| `--bux-switch-width`      | `40px`    | Width of the toggle button |
| `--bux-switch-height`     | `24px`    | Height of the toggle button |
| `--bux-switch-bg-color`   | `#888`    | Background color of the switch |
| `--bux-switch-thumb-color`| `#fff`    | Thumb color                |
| `--bux-switch-emoji-size` | `inherit` | Emoji icon size            |

##### Example

```html
<browserux-theme-switcher
    style="
        --bux-switch-width: 60px;
        --bux-switch-height: 32px;
        --bux-switch-bg-color: #222;
        --bux-switch-thumb-color: orange;
        --bux-switch-emoji-size: 1.5rem;"
></browserux-theme-switcher>
```

- These variables can be dynamically updated based on the theme (`[data-theme="dark"]`) or breakpoints (media queries).
- They work even if `Shadow DOM` is enabled, thanks to the use of `CSS custom properties`.

### Events

#### Custom Event (`theme-change`)

The `<browserux-theme-switcher>` component dispatches a custom event named `theme-change` whenever the theme changes  
(e.g., after a user click, or an initial load using `localStorage`, etc.).

This event allows your application to dynamically respond to theme changes (layout updates, analytics, etc.).

##### Event

- Name: `theme-change`
- Payload: the emitted event is a `CustomEvent` where `e.detail.theme` contains the new theme value (`"light"` or `"dark"`).

##### Example JavaScript listener

```js
const switcher = document.querySelector('browserux-theme-switcher');

switcher?.addEventListener('theme-change', (e) => {
  console.log('Thème sélectionné :', e.detail.theme);
});
```

##### Possible use cases

- Dynamically change a CSS class on the `body`
- Trigger an animation or transition
- Store the theme in a global context or JS service
- Track interactions with an analytics tool

> The event is available as soon as the component is initialized and works in all contexts (frameworks or plain HTML).

### Slots

#### Custom icon slots (`light-icon` / `dark-icon`)

The `<browserux-theme-switcher>` component allows customization of its toggle button appearance  
by replacing default icons using HTML slots.

##### Available slots

| Slot          | Displayed when the current theme is...             | Example usage              |
|---------------|-----------------------------------------------------|----------------------------|
| `light-icon`  | Active = dark (icon to switch to light mode)        | ☀️, sun, light.svg          |
| `dark-icon`   | Active = light (icon to switch to dark mode)        | 🌙, moon, moon.svg          |

##### Examples

```html
<browserux-theme-switcher>
  <span slot="light-icon">🔆</span>
  <span slot="dark-icon">🌑</span>
</browserux-theme-switcher>
```

Or with SVG images:

```html
<browserux-theme-switcher>
  <img slot="light-icon" src="sun.svg" width="20" height="20" alt="Light mode">
  <img slot="dark-icon" src="moon.svg" width="20" height="20" alt="Dark mode">
</browserux-theme-switcher>
```

##### Behavior

- Each slot is dynamically shown or hidden based on the active theme
- Slots are accessible (with `aria-label`) and can contain:
    - emojis
    - SVG icons
    - raster images
    - custom elements

> If no slot is provided, default icons are used (☀️ / 🌙).

## Build & Development

```bash
npm install
npm run build
```

The project uses TypeScript and Rollup to generate build outputs:
- `dist/browserux-theme-switcher.esm.js`
- `dist/browserux-theme-switcher.umd.js`
- `dist/browserux-theme-switcher.d.ts`

> These builds are ready to be used in both module-based environments and traditional script loading contexts.

## License

MIT License, Free to use, modify, and distribute.