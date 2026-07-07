/*
 * src/services/projectThumbnailService.js
 * Checks whether a real thumbnail image exists for a given build, so
 * ProjectCard can show a placeholder until a real image is dropped in.
 *
 * Same approach as resumeService.js: vercel.json rewrites every unmatched
 * path to index.html, so a *missing* thumbnail still returns 200 with
 * Content-Type: text/html. A real image is served with an image/* type,
 * which is what actually distinguishes "file exists" from "SPA fallback
 * caught this path."
 *
 * Connects to: src/components/ProjectCard.jsx
 * Created: 2026-07-07
 */

export const THUMBNAIL_DIR = "/project-thumbnails";

/**
 * @param {number} buildNumber
 * @returns {string} The expected thumbnail path for this build.
 */
export function getThumbnailPath(buildNumber) {
  return `${THUMBNAIL_DIR}/${buildNumber}.jpg`;
}

/**
 * @param {number} buildNumber
 * @param {(url: string, init?: object) => Promise<Response>} [fetchFn] - The fetch implementation to use. Defaults to the global fetch; tests pass a mock instead.
 * @returns {Promise<boolean>} True only if the response is both ok and actually an image.
 */
export async function isThumbnailAvailable(buildNumber, fetchFn = fetch) {
  try {
    const response = await fetchFn(getThumbnailPath(buildNumber), { method: "HEAD" });
    if (!response.ok) {
      return false;
    }
    const contentType = response.headers?.get?.("content-type") || "";
    return contentType.startsWith("image/");
  } catch {
    return false;
  }
}
