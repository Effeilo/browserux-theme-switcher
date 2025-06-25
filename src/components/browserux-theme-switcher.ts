/**
 * browserux-theme-switcher.ts
 *
 * This script defines a custom Web Component <browserux-theme-switcher>
 * that allows users to toggle between light and dark themes.
 *
 * The theme is applied via the `data-theme` attribute on the <html> element
 * or a custom DOM target, and stored in localStorage to persist across sessions.
 *
 * The component also:
 * - Dynamically updates ARIA labels for accessibility in multiple languages
 * - Swaps images based on theme using a filename convention (`image-dark.ext`)
 * - Responds to system-level color scheme preferences
 *
 * The visual toggle switch is rendered with styles inside a Shadow DOM.
 */

import { updateImagesByTheme } from "../utils/theme-utils";

/**
 * Imports the strict type definition for valid theme values ('light' | 'dark').
 * Ensures consistent usage and safer theme-related logic across the component.
 */

import type { ThemeMode } from '../types/theme.types';

/**
 * Static HTML template for the component.
 * Includes structure and scoped styles for rendering the toggle,
 * with support for default emojis, slots, and custom properties.
 */

const template = document.createElement('template');
template.innerHTML = `
<style>
    :host,
    :root {
        --bux-switch-width: 40px;
        --bux-switch-height: 24px;
        --bux-switch-bg-color: #888;
        --bux-switch-thumb-color: #fff;
        --bux-switch-emoji-size: inherit;
    }
    .theme-toggle-wrapper {
        align-items: center;
        display: inline-flex;
        gap: 0.5rem;
        margin-left: 10px;
    }
    .theme-toggle-wrapper > button {
        background-color: var(--bux-switch-bg-color);
        border: none;
        border-radius: calc(var(--bux-switch-height) / 2);
        cursor: pointer;
        height: var(--bux-switch-height);
        padding: 0;
        position: relative;
        transition: background-color 0.3s ease;
        width: var(--bux-switch-width);
    }
    .theme-toggle-wrapper .toggle-thumb {
        background: var(--bux-switch-thumb-color);
        border-radius: 50%;
        height: calc(var(--bux-switch-height) - 4px);
        left: 2px;
        position: absolute;
        top: 2px;
        transition: transform 0.3s ease;
        width: calc(var(--bux-switch-height) - 4px);
        transform: var(--toggle-shift, translateX(0));
    }
    .theme-toggle-wrapper .default-emoji {
        font-size: var(--bux-switch-emoji-size);
        position: relative;
        top: -2px;
    }

    

</style>
<div class="theme-toggle-wrapper">
    <span class="theme-icon" aria-hidden="true">
        <span class="default-emoji" part="default-light"></span>
        <slot name="light-icon"></slot>
    </span>
    <button type="button" title="Switch theme" aria-label="Activate dark mode">
        <span class="toggle-thumb" aria-hidden="true"></span>
    </button>
    <span class="theme-icon" aria-hidden="true">
        <span class="default-emoji" part="default-dark"></span>
        <slot name="dark-icon"></slot>
    </span>
</div>
`;

/**
 * Internationalized ARIA labels for accessibility.
 *
 * Each language entry provides the default text for:
 * - 'light': the label when the switch will activate light mode
 * - 'dark': the label when the switch will activate dark mode
 *
 * Custom labels can still override these via `data-label-light` and `data-label-dark` attributes.
 */

const I18N_LABELS: Record<string, { light: string; dark: string }> = {
    en: {
        light: 'Activate light mode',
        dark: 'Activate dark mode'
    },
    fr: {
        light: 'Activer le mode clair',
        dark: 'Activer le mode sombre'
    },
    es: {
        light: 'Activar modo claro',
        dark: 'Activar modo oscuro'
    },
    de: {
        light: 'Hellmodus aktivieren',
        dark: 'Dunkelmodus aktivieren'
    },
    ja: {
        light: 'ライトモードを有効にする',
        dark: 'ダークモードを有効にする'
    },
    ru: {
        light: 'Включить светлый режим',
        dark: 'Включить тёмный режим'
    },
    pt: {
        light: 'Ativar modo claro',
        dark: 'Ativar modo escuro'
    },
    it: {
        light: 'Attiva modalità chiara',
        dark: 'Attiva modalità scura'
    },
    nl: {
        light: 'Lichte modus inschakelen',
        dark: 'Donkere modus inschakelen'
    }
};


/**
 * BrowseruxThemeSwitcher Web Component
 *
 * Provides a visual toggle button to switch between light and dark themes.
 * Automatically persists the selection, updates ARIA labels, and swaps image assets.
 *
 * Usage:
 * <browserux-theme-switcher></browserux-theme-switcher>
 */

class BrowseruxThemeSwitcher extends HTMLElement {

    /**
     * Attributes to observe for changes.
     * Changing these will trigger `attributeChangedCallback()`.
     */

    static get observedAttributes(): string[] {
        return ['data-label-dark', 'data-label-light', 'target', 'lang'];
    }

    /**
     * Root context for rendering the component.
     * It is initialized in connectedCallback and points to either the Shadow DOM
     * (if used) or the element itself when the 'no-shadow' attribute is present.
     */

    private root!: ShadowRoot | HTMLElement;

    /**
     * Reference to the toggle button element inside the component.
     * Used to attach events and update accessibility attributes.
     */

    private button: HTMLButtonElement | null = null;

    /**
     * Constructor
     *
     * Initializes the shadow DOM (unless 'no-shadow' is present),
     * and injects the HTML structure and styles for the toggle.
     */   

    constructor() {
        // Calls the constructor of the parent HTMLElement class
        super();
    }

    /**
     * Lifecycle: Called when the element is inserted into the DOM.
     *
     * Determines rendering context (Shadow DOM or not),
     * clones and appends the static HTML/CSS template,
     * sets up the event listener for toggling themes,
     * initializes the current theme, and inserts fallback icons if no slots are used.
     */

    connectedCallback(): void {

        // Checks whether the element has a 'no-shadow' attribute
        // If not, the component will use Shadow DOM for encapsulation
        const useShadow = !this.hasAttribute('no-shadow');

        // If Shadow DOM is used, assign 'this.root' to the shadow root
        // Otherwise, fall back to using the element itself as the root
        this.root = useShadow ? this.attachShadow({ mode: 'open' }) : this;

        // Clone the static template content (HTML + styles) for this component instance
        const clone = template.content.cloneNode(true);

        // Append the cloned content into the rendering root (shadow DOM or light DOM)
        this.root.appendChild(clone)

        // Selects the toggle button inside the component (from shadow DOM or light DOM root)
        this.button = this.root.querySelector('button');

        // Attaches a click event listener to the button
        // The theme toggle handler is bound to the current instance
        this.button?.addEventListener('click', this.toggleTheme.bind(this));

        // Initializes the theme based on user preference or system settings
        this.initializeTheme();

        // Injects default emoji icons if no custom slot content is provided by the user
        requestAnimationFrame(() => this.handleSlotFallbacks());
    }

    /**
     * Lifecycle: Called when one of the observed attributes changes.
     *
     * Used to update the ARIA label if labels or language change.
     */

    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void {
        // Checks if the changed attribute is one that affects the button label or language
        if (["data-label-dark", "data-label-light", "lang"].includes(name)) {
            // If so, it updates the ARIA label accordingly
            this.updateButtonLabel();
        }
    }

    /**
     * Ensures default emojis are shown if no slot content is provided.
     * Dynamically appends fallback content only if the named slots are empty.
     * Listens to 'slotchange' for robustness.
     */
    
    private handleSlotFallbacks(): void {
        // Define the names of the slots we want to check
        const slotNames = ['light-icon', 'dark-icon'];

        slotNames.forEach((name) => {
            // Locate the <slot> element by its name
            const slot = this.root.querySelector<HTMLSlotElement>(`slot[name="${name}"]`);

            if (slot) {
                // Create a fallback emoji element
                const fallbackEmoji = document.createElement('span');
                fallbackEmoji.className = 'default-emoji';
                fallbackEmoji.textContent = name === 'light-icon' ? '☀️' : '🌙';

                // Define the check function to run now and on slotchange
                const check = () => {
                    // If no content has been slotted in, replace the <slot> with the fallback emoji
                    if (slot.assignedNodes().length === 0 && slot.isConnected) {
                        slot.replaceWith(fallbackEmoji);
                    }
                };

                // Run the check immediately after connection
                check();

                // Also run the check whenever the slot changes
                slot.addEventListener('slotchange', check);
            }
        });
    }

    /**
     * Retrieves the active language for the component.
     *
     * @returns {string} - Language code (e.g., 'en', 'fr')
     */

    private getLang(): string {
        // Returns the language code to use for labels.
        // Priority: component's 'lang' attribute > <html>'s 'lang' attribute > fallback to 'en'
        return this.getAttribute('lang') || document.documentElement.getAttribute('lang') || 'en';
    }

    /**
     * Determines the target element on which the theme should be applied.
     *
     * This method checks if the component has a 'target' attribute and tries to
     * select the corresponding element from the DOM.
     * If the selector is missing or invalid, it falls back to the <html> element.
     *
     * @returns {HTMLElement} The element where the 'data-theme' attribute is applied.
     */
    
    private getThemeTarget(): HTMLElement {
        // Reads the 'target' attribute value, if present
        const selector = this.getAttribute('target');

        // Tries to find the element using querySelector
        // If not found or missing, fallback to <html>
        return selector ? document.querySelector<HTMLElement>(selector) || document.documentElement : document.documentElement;
  
    }

    /**
     * Toggles between 'light' and 'dark' theme modes.
     *
     * Persists the choice in localStorage and applies the new theme.
     */

    private toggleTheme(): void {
        // Retrieves the element where the theme should be applied (e.g., <html>)
        const target = this.getThemeTarget();

        // Reads the current theme from the 'data-theme' attribute
        const current = target.getAttribute('data-theme');

        // Determines the next theme to apply: switch from 'dark' to 'light' or vice versa
        const newTheme: ThemeMode = current === 'dark' ? 'light' : 'dark';

        // Saves the selected theme in localStorage to persist user preference
        localStorage.setItem('theme', newTheme);

        // Applies the new theme and triggers related updates
        this.applyTheme(newTheme);
    }

    /**
     * Applies the given theme by:
     * - Setting `data-theme` on the target
     * - Updating ARIA labels
     * - Updating images for dark/light variants
     * - Dispatching a 'theme-change' event
     *
     * @param {string} theme - Either 'light' or 'dark'
     */

    private applyTheme(theme: ThemeMode): void {
        // Gets the element where the theme should be applied
        const target = this.getThemeTarget();

        // Sets the 'data-theme' attribute to either 'light' or 'dark'
        target.setAttribute('data-theme', theme);

        /**
         * Firefox-compatible toggle positioning:
         * Instead of relying on :host(.dark), we dynamically set a CSS variable
         * that controls the toggle position. This ensures consistent behavior
         * across all browsers, including Firefox, which may not apply
         * Shadow DOM state-based selectors like :host(.dark) reliably.
         */
        this.style.setProperty('--toggle-shift', theme === 'dark'
            ? 'translateX(calc(var(--bux-switch-width) - var(--bux-switch-height)))'
            : 'translateX(0)');

        // Updates the ARIA label on the toggle button based on the new theme
        this.updateButtonLabel();

        // Updates image sources to match the selected theme
        updateImagesByTheme(this.getThemeTarget());

        // Dispatches a custom 'theme-change' event so that other components or scripts can react
        this.dispatchEvent(new CustomEvent('theme-change', {
            // passes the new theme in the event payload
            detail: { theme },
            // allows the event to bubble up the DOM
            bubbles: true,
            // allows the event to cross shadow DOM boundaries
            composed: true
        }));
    }

    /**
     * Updates the toggle button's ARIA label based on current theme and language.
     * Supports custom labels via attributes, with fallback to `I18N_LABELS`.
     */

    private updateButtonLabel(): void {
        // If the toggle button doesn't exist, exit early
        if (!this.button) return;

        // Get the current theme from the target element's 'data-theme' attribute
        const theme = this.getThemeTarget().getAttribute('data-theme');

        // Determine the current language for localization
        const lang = this.getLang();

        // Get the appropriate fallback labels for the current language, or default to English
        const fallback = I18N_LABELS[lang] || I18N_LABELS['en'];

        // Get the dark mode label from attribute or fallback to the localized default
        const darkLabel = this.getAttribute('data-label-dark') || fallback.light;

        // Get the light mode label from attribute or fallback to the localized default
        const lightLabel = this.getAttribute('data-label-light') || fallback.dark;

        // Choose the correct label based on the active theme
        const label = theme === 'dark' ? darkLabel : lightLabel;

        // Update the button's ARIA label for screen readers
        this.button.setAttribute('aria-label', label);

        // Set aria-pressed to reflect the toggle state (true for dark, false for light)
        this.button.setAttribute('aria-pressed', theme === 'dark' ? 'true' : 'false');
    }

    /**
     * Type guard to verify if a given value is a valid theme mode ('light' or 'dark').
     *
     * @param value - The input string to check, usually from localStorage or user input.
     * @returns `true` if the value is 'light' or 'dark', otherwise `false`.
     *
     * Used to ensure safe usage of applyTheme() by confirming the value is a ThemeMode.
     */   
    
    private isThemeMode(value: string | null): value is ThemeMode {
        return value === 'light' || value === 'dark';
    }

    /**
     * Initializes the theme on first load by:
     * - Using stored preference (if available)
     * - Falling back to system preference
     * - Listening to system preference changes (if no manual override)
     */
    
    private initializeTheme(): void {
        // Retrieve the user's saved theme preference from localStorage (if any)
        const saved = localStorage.getItem('theme');

        // Detect the system's preferred color scheme using a media query
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

        // Choose the theme:
        // - Use the saved preference if available
        // - Otherwise, use the system preference (dark or light)
        const theme = saved || (prefersDark ? 'dark' : 'light');

        // Apply the selected theme to the target element
        if (this.isThemeMode(theme)) {
            this.applyTheme(theme);
        } else {
            this.applyTheme('light');
        }

        // If no user preference was saved, listen for system color scheme changes
        if (!saved) {
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                // On change, determine the new system preference and apply it
                const systemTheme = e.matches ? 'dark' : 'light';
                this.applyTheme(systemTheme);
            });
        }
    }
}

// Register the custom element with the browser
customElements.define('browserux-theme-switcher', BrowseruxThemeSwitcher);