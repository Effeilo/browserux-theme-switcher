**EN** | [FR](./fr/CHANGELOG.md)

<div>
  <img src="https://browserux.com/assets/img/logo/logo-browserux-theme-switcher-250.png" alt="logo BrowserUX Theme Switcher"/>
</div>

# 📦 Changelog

All notable changes to this project will be documented in this file.

This changelog format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)  
and this project adheres to [Semantic Versioning](https://semver.org/).

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