**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/img/logos/logo-browserux-theme-switcher-300.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
and this project adheres to [Semantic Versioning](https://semver.org/).

---

<br>

## [1.1.2] – 2026-04-06

### 🛠 Fixed

- Added `rootDir` to `tsconfig.json` to resolve TypeScript 5.x error caused by missing explicit root directory when `declarationDir` is set
- Updated `moduleResolution` from deprecated `"node"` to `"bundler"` for TypeScript 5.x compatibility
- Removed non-existent `types` entry from `include` in `tsconfig.json`

---

<br>

## [1.1.1] – 2026-03-28

### 🐞 Fixed

- **Inverted label fallbacks in `updateButtonLabel()`**: the `fallback.light` and `fallback.dark` values were swapped when no custom `data-label-*` attributes were provided, causing incorrect ARIA labels to be set on the toggle button.
- **`localStorage` error handling**: `getItem` and `setItem` calls are now wrapped in `try/catch` to prevent crashes in environments where `localStorage` is unavailable (e.g. private browsing mode in Safari/Firefox, or iframe security restrictions). The component gracefully falls back to system preferences.
- **Invalid `target` selector**: the `querySelector` call in `getThemeTarget()` is now wrapped in a `try/catch` to handle invalid CSS selectors (e.g. `target="@invalid"`) without throwing an uncaught `DOMException`.
- **Image URL regex**: updated the regex in `updateImagesByTheme()` from `/(\.\w+)$/` to `/(\.\w+)(\?.*)?$/` to correctly preserve query strings (e.g. `logo.png?v=2` → `logo-dark.png?v=2`).

<br>

---

<br>

## [1.1.0] – 2025-07-02

### ✨ Added

- Support for **theme-based image swapping** in any framework (React, Vue, Angular, HTML):
  - Dynamically replaces `<img class="has-dark">` sources based on the current theme.
  - Works **automatically** using a `-dark` filename convention (e.g. `logo.webp` → `logo-dark.webp`).
  - Also supports **manual override** with `data-src-light` and `data-src-dark` attributes for full control.

### 🛠 Improved

- Web Component now handles images inserted dynamically (e.g. via JSX, Vue templates, Angular bindings).
- The `updateImagesByTheme()` and `updateThemeImages()` utilities work together:
  - `updateImagesByTheme()` applies filename-based switching for simple use cases.
  - `updateThemeImages()` enables fine-grained control via explicit attributes.

<br>

---

<br>

## [1.0.3] – 2025-06-25

### 🐞 Fixed

- Ensured full theme toggle compatibility in Firefox:
  - Replaced reliance on `:host(.dark)` selector with a dynamic CSS variable (`--toggle-shift`)
    to control the toggle thumb position.
  - This avoids known limitations in Firefox's handling of Shadow DOM state-based selectors.

<br>

---

<br>

## [1.0.2] – 2025-06-25

### 🐞 Fixed

- Firefox compatibility: added a fallback for the unsupported `:host-context([data-theme="dark"])` selector.
  - The component now also uses a `.dark` class on `<browserux-theme-switcher>`, enabling `:host(.dark)` styling inside Shadow DOM for consistent theme behavior in Firefox.

<br>

---

<br>

## [1.0.1] – 2025-06-14

### ✨ Added

- Changelog

<br>

---

<br>

## [1.0.0] – 2025-06-14

### ✨ Added

- 💡 Web Component `<browserux-theme-switcher>` to toggle between light and dark themes  
- ⚙️ Automatic detection of system preferences (`prefers-color-scheme`)
- 💾 User preference persistence via `localStorage`
- 🌍 Multilingual support (`lang` auto-detection or override, 9 built-in languages)
- ♿ Accessibility: dynamic `aria-label`, customizable via `data-label-*`
- 🎨 Full visual customization via CSS variables (`--bux-switch-*`)
- 🧩 Optional Shadow DOM (`no-shadow`)
- 🎯 Custom target selector via the `target` attribute
- 🖼 Image switching via `.has-dark` class
- 🧠 `theme-change` event triggered on every switch
- 🎛 Slots for icon customization (`light-icon`, `dark-icon`)
- 📦 Compatible with all modern frameworks: React, Vue, Angular, or pure HTML
- 🔧 Built with TypeScript + Rollup (ESM, UMD, types)

<br>

---