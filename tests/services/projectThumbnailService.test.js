/*
 * tests/services/projectThumbnailService.test.js
 * Verifies thumbnail-availability checking and path building.
 * Connects to: src/services/projectThumbnailService.js
 * Created: 2026-07-07
 */

import { describe, expect, it, vi } from "vitest";

import {
  getThumbnailPath,
  isThumbnailAvailable,
  THUMBNAIL_DIR,
} from "../../src/services/projectThumbnailService.js";

function mockResponse({ ok, contentType }) {
  return {
    ok,
    headers: { get: (name) => (name === "content-type" ? contentType : null) },
  };
}

describe("getThumbnailPath", () => {
  it("builds the expected path for a build number", () => {
    expect(getThumbnailPath(25)).toBe(`${THUMBNAIL_DIR}/25.jpg`);
  });
});

describe("isThumbnailAvailable", () => {
  it("returns true when a real image is served", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: true, contentType: "image/jpeg" }));

    const result = await isThumbnailAvailable(25, fetchMock);

    expect(result).toBe(true);
    expect(fetchMock).toHaveBeenCalledWith(getThumbnailPath(25), { method: "HEAD" });
  });

  it("returns false when the thumbnail responds with an error status", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: false, contentType: null }));

    const result = await isThumbnailAvailable(25, fetchMock);

    expect(result).toBe(false);
  });

  it("returns false when the SPA fallback catches the path (200 but text/html, not a real image)", async () => {
    const fetchMock = vi.fn().mockResolvedValue(mockResponse({ ok: true, contentType: "text/html" }));

    const result = await isThumbnailAvailable(25, fetchMock);

    expect(result).toBe(false);
  });

  it("returns false when the request itself fails", async () => {
    const fetchMock = vi.fn().mockRejectedValue(new Error("network error"));

    const result = await isThumbnailAvailable(25, fetchMock);

    expect(result).toBe(false);
  });
});
