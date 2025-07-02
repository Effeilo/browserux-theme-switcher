/**
 * Dynamically swaps image sources based on current theme.
 * 
 * Images must have:
 * - class "has-dark"
 * - attributes `data-src-light` and `data-src-dark`
 */

// Exports a function that updates image sources based on the current theme ('light' or 'dark')
export function updateThemeImages(theme: 'light' | 'dark') {

    // Selects all <img> elements that have the "has-dark" class
    // These are the images eligible for theme-based source swapping
    const images = document.querySelectorAll<HTMLImageElement>('img.has-dark');

    // Iterates through each matched image
    images.forEach((img) => {

        // Retrieves the explicitly defined image sources for light and dark themes
        const lightSrc = img.getAttribute('data-src-light');
        const darkSrc = img.getAttribute('data-src-dark');

        // Chooses the appropriate source based on the current theme
        const targetSrc = theme === 'dark' ? darkSrc : lightSrc;

        // Applies the new source only if:
        // - A valid targetSrc is defined
        // - The current `src` is different from the target
        // - The image is not marked as "locked" (opt-out from auto-swap)
        if (targetSrc && img.src !== targetSrc && !img.dataset.locked) {
            img.src = targetSrc;
        }
    });
}