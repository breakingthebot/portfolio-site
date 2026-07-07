/*
 * src/components/ThemeToggle.jsx
 * Manual light/dark override button, layered on top of the OS-preference
 * default. Persists the choice so it survives reloads and page changes.
 * Connects to: src/components/NavBar.jsx, src/services/themeService.js
 * Created: 2026-07-07
 */

import { useEffect, useState } from "react";

import { applyTheme, getNextTheme, resolveInitialTheme, storeTheme } from "../services/themeService.js";
import "./ThemeToggle.css";

function ThemeToggle() {
  const [theme, setTheme] = useState(() =>
    resolveInitialTheme(window.localStorage, window.matchMedia("(prefers-color-scheme: dark)").matches),
  );

  useEffect(() => {
    applyTheme(theme, document);
  }, [theme]);

  function handleClick() {
    const next = getNextTheme(theme);
    setTheme(next);
    storeTheme(next, window.localStorage);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={handleClick}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  );
}

export default ThemeToggle;
