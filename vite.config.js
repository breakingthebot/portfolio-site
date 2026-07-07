/*
 * vite.config.js
 * Vite build/dev configuration.
 * Connects to: index.html, src/main.jsx
 * Created: 2026-07-06
 */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "node",
  },
});
