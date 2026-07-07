/*
 * tests/services/contactFormService.test.js
 * Verifies contact form configuration checks and submission handling.
 * Connects to: src/services/contactFormService.js
 * Created: 2026-07-06
 */

import { afterEach, describe, expect, it, vi } from "vitest";

import { isContactFormConfigured, submitContactForm } from "../../src/services/contactFormService.js";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("isContactFormConfigured", () => {
  it("returns false for an empty endpoint", () => {
    expect(isContactFormConfigured("")).toBe(false);
    expect(isContactFormConfigured("   ")).toBe(false);
  });

  it("returns true once an endpoint is set", () => {
    expect(isContactFormConfigured("https://formspree.io/f/abc123")).toBe(true);
  });
});

describe("submitContactForm", () => {
  const fields = { name: "Ada", email: "ada@example.com", message: "Hello there!" };

  it("resolves when the endpoint responds ok", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, status: 200 }));

    await expect(submitContactForm(fields, "https://formspree.io/f/abc123")).resolves.toBeUndefined();
  });

  it("posts the fields as JSON with the right headers", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 200 });
    vi.stubGlobal("fetch", fetchMock);

    await submitContactForm(fields, "https://formspree.io/f/abc123");

    expect(fetchMock).toHaveBeenCalledWith(
      "https://formspree.io/f/abc123",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({ "Content-Type": "application/json", Accept: "application/json" }),
        body: JSON.stringify(fields),
      }),
    );
  });

  it("throws when the endpoint responds with an error status", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: false, status: 422 }));

    await expect(submitContactForm(fields, "https://formspree.io/f/abc123")).rejects.toThrow(/422/);
  });
});
