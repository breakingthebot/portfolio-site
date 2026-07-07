/*
 * tests/services/resumeService.test.js
 * Verifies resume-availability checking.
 * Connects to: src/services/resumeService.js
 * Created: 2026-07-07
 */

import { describe, expect, it, vi } from "vitest";

import { isResumeAvailable, RESUME_PATH } from "../../src/services/resumeService.js";

function mockResponse({ ok, contentType }) {
  return {
    ok,
    headers: { get: (name) => (name === "content-type" ? contentType : null) },
  };
}

describe("isResumeAvailable", () => {
  it("returns true when a real PDF is served", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: true, contentType: "application/pdf" }));

    const result = await isResumeAvailable(fetchMock);

    expect(result).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(RESUME_PATH, { method: "HEAD" });
  });

  it("returns false when the resume file responds with an error status", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: false, contentType: null }));

    const result = await isResumeAvailable(fetchMock);

    expect(result).toBe(false);
  });

  it("returns false when the SPA fallback catches the path (200 but text/html, not a real file)", async () => {
    // Regression test: vercel.json rewrites every unmatched path to
    // index.html, so a *missing* resume.pdf still returns 200 -- with
    // Content-Type: text/html instead of application/pdf. response.ok
    // alone can't tell "file exists" from "SPA fallback caught this."
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: true, contentType: "text/html" }));

    const result = await isResumeAvailable(fetchMock);

    expect(result).toBe(false);
  });

  it("returns false when the request itself fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network error"));

    const result = await isResumeAvailable(fetchMock);

    expect(result).toBe(false);
  });
});
