/**
 * Updates images based on the theme applied to a given target.
 * Automatically replaces .ext with -dark.ext in dark mode, for images with 'has-dark'.
 *
 * @param target - The element on which the theme is applied (defaults to <html>)
 */

export function updateImagesByTheme(target: HTMLElement = document.documentElement): void {

    // Checks if the current theme is "dark" by reading the "data-theme" attribute
    // on the provided target element (defaults to <html>)
    const isDark = target.getAttribute("data-theme") === "dark";

    // Selects all <img> elements that have the "has-dark" class
    document.querySelectorAll<HTMLImageElement>('img.has-dark').forEach((img) => {

        // Retrieves the original image source:
        // - If the image already has a saved value in data-src, use it
        // - Otherwise, use the current src attribute value
        const originalSrc = img.dataset.src || img.getAttribute("src") || "";

        // If this is the first time the function runs for this image,
        // save the original source into the data-src attribute
        if (!img.dataset.src) img.dataset.src = originalSrc;

        // If the theme is dark
        img.src = isDark
            // Replace the original file extension (e.g., ".png") with "-dark.png"
            ? originalSrc.replace(/(\.\w+)$/, "-dark$1")
            // Otherwise, restore the original image source from data-src
            : img.dataset.src;
    });
}