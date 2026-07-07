/*
 * src/services/resumeService.js
 * Checks whether a real resume file has been dropped into public/,
 * so the Home page can show a download link only when it would actually
 * work -- never a dead link to a file that doesn't exist yet.
 *
 * This can't just check response.ok: vercel.json rewrites every unmatched
 * path to index.html, so a *missing* resume.pdf still returns 200 with
 * Content-Type: text/html (confirmed locally against the Vite dev server,
 * which has the same SPA-fallback behavior). A *real* PDF is served with
 * Content-Type: application/pdf, so that's what actually distinguishes
 * "file exists" from "SPA fallback caught this path."
 *
 * Connects to: src/components/ResumeLink.jsx
 * Created: 2026-07-07
 */

export const RESUME_PATH = "/resume.pdf";

/**
 * Checks whether a real resume file exists at RESUME_PATH.
 *
 * @param {(url: string, init?: object) => Promise<Response>} [fetchFn] - The fetch implementation to use. Defaults to the global fetch; tests pass a mock instead.
 * @returns {Promise<boolean>} True only if the response is both ok and actually a PDF.
 */
export async function isResumeAvailable(fetchFn = fetch) {
  try {
    const response = await fetchFn(RESUME_PATH, { method: "HEAD" });
    if (!response.ok) {
      return false;
    }
    const contentType = response.headers?.get?.("content-type") || "";
    return contentType.includes("pdf");
  } catch {
    return false;
  }
}
