/*
 * src/content/techStack.js
 * Curated list of languages/tools used across the 286-builds series.
 * Grounded in the real distinct `technology` values from the live
 * builds.json (checked 2026-07-07, 25 builds), collapsed from ~17 raw
 * variants (e.g. "Python (SQL)", "Python (ML)", "JS async", "Vanilla JS")
 * down to their actual languages -- the raw field is too granular/
 * inconsistent for a clean badge row without fragile string-matching, so
 * this is a deliberate, human-curated summary instead of a runtime
 * derivation. Update by hand as new languages/tools show up in builds.
 * Connects to: src/components/TechStack.jsx
 * Created: 2026-07-07
 */

const TECH_STACK = [
  "Python",
  "JavaScript/TypeScript",
  "React",
  "Swift",
  "Kotlin",
  "Java",
  "C#",
  "Go",
  "Rust",
  "Ruby",
  "PHP",
  "Lua",
  "Shell",
];

export default TECH_STACK;
