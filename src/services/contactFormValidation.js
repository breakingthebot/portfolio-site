/*
 * src/services/contactFormValidation.js
 * Pure validation logic for the contact form, kept separate from the
 * component so it's unit-testable without rendering anything.
 * Connects to: src/components/ContactForm.jsx, tests/services/contactFormValidation.test.js
 * Created: 2026-07-06
 */

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_MESSAGE_LENGTH = 10;

/**
 * Validates contact form field values.
 *
 * @param {{name: string, email: string, message: string}} fields - The raw field values.
 * @returns {{name?: string, email?: string, message?: string}} A map of field name to error message, empty when valid.
 */
export function validateContactForm(fields) {
  const errors = {};
  const name = (fields.name || "").trim();
  const email = (fields.email || "").trim();
  const message = (fields.message || "").trim();

  if (!name) {
    errors.name = "Name is required.";
  }

  if (!email) {
    errors.email = "Email is required.";
  } else if (!EMAIL_PATTERN.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  if (!message) {
    errors.message = "Message is required.";
  } else if (message.length < MIN_MESSAGE_LENGTH) {
    errors.message = `Message should be at least ${MIN_MESSAGE_LENGTH} characters.`;
  }

  return errors;
}

/**
 * Checks whether the honeypot field was filled in, meaning the submission
 * almost certainly came from a bot rather than a person (real visitors
 * never see or fill this field -- it's hidden via CSS, not just
 * type="hidden", so simple bots that blindly fill every input still
 * catch it).
 *
 * @param {{_gotcha?: string}} fields - The raw field values, including the honeypot.
 * @returns {boolean} True if the honeypot field has any value.
 */
export function isHoneypotTriggered(fields) {
  return (fields._gotcha || "").trim() !== "";
}
