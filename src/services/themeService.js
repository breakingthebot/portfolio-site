/*
 * src/services/themeService.js
 * Manual light/dark theme override on top of the OS-preference default.
 * Storage and system-preference reads are injectable so the pure logic
 * (getNextTheme, resolveInitialTheme) is unit-testable without a DOM.
 * Connects to: src/components/ThemeToggle.jsx, src/styles/global.css
 * Created: 2026-07-07
 */

export const THEME_STORAGE_KEY = "theme";

/**
 * Flips the current theme to its opposite.
 *
 * @param {"light" | "dark"} currentTheme - The current theme.
 * @returns {"light" | "dark"} The other theme.
 */
export function getNextTheme(currentTheme) {
  return currentTheme === "dark" ? "light" : "dark";
}

/**
 * Resolves which theme should be active on first load: a previously stored
 * explicit choice, or the OS preference if the visitor hasn't chosen yet.
 *
 * @param {{ getItem: (key: string) => string | null }} storage - Defaults to localStorage; tests pass a mock.
 * @param {boolean} systemPrefersDark - Whether the OS is set to dark mode.
 * @returns {"light" | "dark"} The theme to apply.
 */
export function resolveInitialTheme(storage, systemPrefersDark) {
  const stored = storage.getItem(THEME_STORAGE_KEY);
  if (stored === "light" || stored === "dark") {
    return stored;
  }
  return systemPrefersDark ? "dark" : "light";
}

/**
 * Persists an explicit theme choice.
 *
 * @param {"light" | "dark"} theme - The theme to store.
 * @param {{ setItem: (key: string, value: string) => void }} storage - Defaults to localStorage; tests pass a mock.
 * @returns {void}
 */
export function storeTheme(theme, storage) {
  storage.setItem(THEME_STORAGE_KEY, theme);
}

/**
 * Applies a theme by setting the data-theme attribute the CSS overrides key off of.
 *
 * @param {"light" | "dark"} theme - The theme to apply.
 * @param {{ documentElement: { setAttribute: (name: string, value: string) => void } }} doc - Defaults to document; tests pass a mock.
 * @returns {void}
 */
export function applyTheme(theme, doc) {
  doc.documentElement.setAttribute("data-theme", theme);
}
