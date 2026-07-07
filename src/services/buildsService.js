/*
 * src/services/buildsService.js
 * Fetches and selects highlighted builds from the live 286-builds index.
 * Connects to: src/pages/Projects.jsx, tests/services/buildsService.test.js
 * Created: 2026-07-06
 */

export const BUILDS_DATA_URL =
  import.meta.env.VITE_BUILDS_DATA_URL || "https://breakingthebot.github.io/286-builds/data/builds.json";

const DEFAULT_HIGHLIGHT_COUNT = 6;

/**
 * Selects the N most recent builds, sorted by build number descending.
 *
 * @param {Array<{build_number: number}>} builds - The full list of build entries.
 * @param {number} [count] - How many builds to select.
 * @returns {Array<object>} The selected, sorted builds.
 */
export function selectHighlightedBuilds(builds, count = DEFAULT_HIGHLIGHT_COUNT) {
  return [...builds].sort((a, b) => b.build_number - a.build_number).slice(0, count);
}

/**
 * Fetches the live builds.json and returns the highlighted subset.
 *
 * @param {number} [count] - How many builds to select.
 * @returns {Promise<Array<object>>} The highlighted builds.
 */
export async function fetchHighlightedBuilds(count = DEFAULT_HIGHLIGHT_COUNT) {
  const response = await fetch(BUILDS_DATA_URL);

  if (!response.ok) {
    throw new Error(`Failed to fetch builds data: ${response.status}`);
  }

  const builds = await response.json();
  return selectHighlightedBuilds(builds, count);
}
