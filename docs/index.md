# Documentation `browserux-theme-switcher`

## The project

Theme switching is a standard feature on modern web sites. But implementing it correctly means handling system preferences, persisting user choices, updating ARIA labels, swapping images, and staying accessible - across every framework and browser.

`browserux-theme-switcher` does all of this in a single Web Component. Drop `<browserux-theme-switcher>` into any HTML page and you get a fully functional light/dark toggle with no framework required.

One component. Zero dependencies. No configuration required to get started.

---

## Table of contents

### Guide

- [Introduction](guide/introduction.md) : what it is, why it exists, what it handles automatically
- [Getting started](guide/getting-started.md) : installation via npm or CDN, basic usage
- [How it works](guide/how-it-works.md) : initialization logic, persistence, system detection, DOM updates
- [Framework usage](guide/framework-usage.md) : React, Vue, Angular, and vanilla JS integration
- [Theming](guide/theming.md) : CSS variables, custom styles, image switching strategies

### Reference

- [Attributes](reference/attributes.md) : `target`, `lang`, `data-label-*`, `no-shadow`, `style`
- [Events](reference/events.md) : `theme-change` custom event with payload details
- [Slots](reference/slots.md) : `light-icon`, `dark-icon` named slots
- [Utilities](reference/utils.md) : `updateImagesByTheme`, `updateThemeImages`

### Additional reference

- [Compatibility](compatibility.md) : browser support, framework compatibility, build output formats
- [Contributing](contributing.md) : report a bug, suggest an improvement, submit a PR
