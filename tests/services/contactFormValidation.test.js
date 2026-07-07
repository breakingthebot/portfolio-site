/*
 * tests/services/contactFormValidation.test.js
 * Verifies contact form field validation.
 * Connects to: src/services/contactFormValidation.js
 * Created: 2026-07-06
 */

import { describe, expect, it } from "vitest";

import { isHoneypotTriggered, validateContactForm } from "../../src/services/contactFormValidation.js";

const VALID_FIELDS = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  message: "Hello, I'd love to chat about your work.",
};

describe("validateContactForm", () => {
  it("returns no errors for fully valid fields", () => {
    expect(validateContactForm(VALID_FIELDS)).toEqual({});
  });

  it("requires a name", () => {
    const errors = validateContactForm({ ...VALID_FIELDS, name: "  " });
    expect(errors.name).toMatch(/required/i);
  });

  it("requires an email", () => {
    const errors = validateContactForm({ ...VALID_FIELDS, email: "" });
    expect(errors.email).toMatch(/required/i);
  });

  it("rejects a malformed email", () => {
    const errors = validateContactForm({ ...VALID_FIELDS, email: "not-an-email" });
    expect(errors.email).toMatch(/valid email/i);
  });

  it("requires a message", () => {
    const errors = validateContactForm({ ...VALID_FIELDS, message: "" });
    expect(errors.message).toMatch(/required/i);
  });

  it("rejects a too-short message", () => {
    const errors = validateContactForm({ ...VALID_FIELDS, message: "hi" });
    expect(errors.message).toMatch(/at least/i);
  });

  it("trims whitespace before validating", () => {
    const errors = validateContactForm({ name: "  Ada  ", email: "  ada@example.com  ", message: `  ${VALID_FIELDS.message}  ` });
    expect(errors).toEqual({});
  });
});

describe("isHoneypotTriggered", () => {
  it("returns false when the honeypot field is empty or missing", () => {
    expect(isHoneypotTriggered({ _gotcha: "" })).toBe(false);
    expect(isHoneypotTriggered({})).toBe(false);
  });

  it("returns false when the honeypot field is only whitespace", () => {
    expect(isHoneypotTriggered({ _gotcha: "   " })).toBe(false);
  });

  it("returns true when the honeypot field has any value", () => {
    expect(isHoneypotTriggered({ _gotcha: "http://spam.example" })).toBe(true);
  });
});
