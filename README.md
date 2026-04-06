**EN** | [FR](./fr/README.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-theme-switcher-300.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# BrowserUX Theme Switcher

**A modern solution to offer a light/dark theme selector and enhance the user experience across all your web interfaces.**

BrowserUX Theme Switcher is a lightweight, accessible, and customizable Web Component designed to easily add a theme switcher button to any website or application. It automatically detects the system theme, remembers the user's preference, and applies the correct theme.

- [Project website](https://browserux.com/theme-switcher/)
- [Demo](https://browserux.com/theme-switcher/demo/)
- [Documentation](./docs/index.md)
- [Changelog](./CHANGELOG.md)

<br>

[![npm version](https://img.shields.io/npm/v/browserux-theme-switcher.svg)](https://www.npmjs.com/package/browserux-theme-switcher)
[![unpkg](https://img.shields.io/badge/CDN-unpkg-brightgreen)](https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.min.js)

## Features

- 🎚 Toggles `data-theme="light"` / `"dark"` on `<html>` or a custom target element
- 💾 Persists user preference in `localStorage`
- 🕶 Detects system preference via `prefers-color-scheme` on first load
- 📢 Dispatches a `theme-change` custom event on every theme change
- 🧠 Dynamic ARIA labels, multilingual, auto-detected or customizable
- 🌐 Built-in i18n for 9 languages (`en`, `fr`, `es`, `de`, `ja`, `ru`, `pt`, `it`, `nl`)
- 🖼 Automatic image swapping via filename convention or explicit `data-src-*` attributes
- 🎨 Fully customizable via CSS custom properties (`--bux-switch-*`)
- 🧩 Optional Shadow DOM, disable with `no-shadow`

## Installation

```bash
npm install browserux-theme-switcher
```

Or via CDN:

```html
<script type="module" src="https://unpkg.com/browserux-theme-switcher/dist/browserux-theme-switcher.esm.js"></script>
```

## Usage

```js
import 'browserux-theme-switcher';
```

```html
<browserux-theme-switcher></browserux-theme-switcher>
```

## Parameters

| Parameter | Type | Description |
|---|---|---|
| `target` | Attribute | CSS selector for the element that receives `data-theme` |
| `lang` | Attribute | Language code for built-in ARIA labels |
| `data-label-light` | Attribute | Custom ARIA label for activating light mode |
| `data-label-dark` | Attribute | Custom ARIA label for activating dark mode |
| `no-shadow` | Attribute | Disable Shadow DOM encapsulation |
| `style` | Attribute | CSS custom properties for visual customization |
| `theme-change` | Event | Fired on every theme change, `e.detail.theme` is `"light"` or `"dark"` |
| `light-icon` | Slot | Icon displayed on the light side of the toggle |
| `dark-icon` | Slot | Icon displayed on the dark side of the toggle |

## Documentation

For detailed documentation, see [docs/index.md](docs/index.md).

### Guide

- [Introduction](docs/guide/introduction.md) : what it is, why it exists, the three-step logic
- [Getting started](docs/guide/getting-started.md) : installation via npm or CDN, adding CSS
- [How it works](docs/guide/how-it-works.md) : lifecycle, persistence, Shadow DOM, ARIA
- [Framework usage](docs/guide/framework-usage.md) : React, Vue, Angular, vanilla JS
- [Theming](docs/guide/theming.md) : CSS variables, image switching strategies

### Reference

- [Attributes](docs/reference/attributes.md) : `target`, `lang`, `data-label-*`, `no-shadow`, `style`
- [Events](docs/reference/events.md) : `theme-change` event with payload and use cases
- [Slots](docs/reference/slots.md) : `light-icon`, `dark-icon` named slots
- [Utilities](docs/reference/utils.md) : `updateImagesByTheme`, `updateThemeImages`

### Additional reference

- [Compatibility](docs/compatibility.md) : browser support, framework compatibility, build formats
- [Contributing](docs/contributing.md) : report a bug, suggest an improvement, submit a PR

## License

MIT © 2026 [Effeilo](https://github.com/Effeilo)
