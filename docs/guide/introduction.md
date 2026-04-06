# Introduction

## What is `browserux-theme-switcher`?

`browserux-theme-switcher` is a Web Component that provides a fully functional light/dark theme toggle. It is built as a native Custom Element, works in any browser that supports Web Components, and integrates without modification into React, Vue, Angular, or plain HTML pages.

It detects the system color scheme on first load, persists the user's choice in `localStorage`, applies the theme via a `data-theme` attribute, updates ARIA labels for accessibility, swaps images automatically, and dispatches a `theme-change` event so other parts of your application can react.

Everything runs with a single HTML tag.

---

## Why this component?

Implementing a theme switcher from scratch involves solving several distinct problems:

- **Initial state** : what theme should be active before any user interaction?
- **Persistence** : how do you remember the user's choice across page reloads?
- **Accessibility** : how do you communicate the current state to screen readers?
- **Internationalisation** : how do you label the toggle for non-English users?
- **Images** : how do you swap image assets when the theme changes?
- **Framework compatibility** : how do you make it work in React, Vue, and Angular without rewrites?

`browserux-theme-switcher` handles each of these concerns out of the box, so you don't have to.

---

## The three-step logic

The component runs the same logic every time it is connected to the DOM:

### Step 1 - Detect initial theme

On load, the component checks `localStorage` for a previously saved preference. If none is found, it reads the system color scheme via `prefers-color-scheme`. If neither is available, it defaults to `light`.

### Step 2 - Persist user preference

When the user clicks the toggle, the chosen theme is saved to `localStorage` under the key `theme`. On the next page load, this value is read first and takes precedence over the system preference.

### Step 3 - Apply theme to the DOM

The selected theme is written as a `data-theme` attribute (`"light"` or `"dark"`) on the `<html>` element, or on a custom element defined via the `target` attribute. Your CSS reads this attribute to apply the correct styles.

---

## Positioning

`browserux-theme-switcher` is intentionally focused:

- It does not manage CSS custom properties for you
- It does not generate themes or design tokens
- It does not depend on any CSS framework
- It does not require a build step to use

It does one thing: give users a reliable, accessible way to switch themes, and tell the rest of your application when that switch happens.

---

## What `browserux-theme-switcher` does not do

- No CSS variable generation or token management
- No server-side rendering integration (see [Getting started](getting-started.md) for SSR notes)
- No automatic detection of prefers-contrast or prefers-reduced-motion
- No support for more than two themes (light and dark only)
