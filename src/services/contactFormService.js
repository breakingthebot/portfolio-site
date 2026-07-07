/*
 * src/services/contactFormService.js
 * Submits validated contact form data to the configured Formspree endpoint.
 * Connects to: src/components/ContactForm.jsx
 * Created: 2026-07-06
 */

export const CONTACT_FORM_ENDPOINT = import.meta.env.VITE_CONTACT_FORM_ENDPOINT || "";

/**
 * Returns whether a real contact form endpoint has been configured.
 *
 * @param {string} [endpoint] - The endpoint to check. Defaults to the real configured one; tests pass an explicit value instead.
 * @returns {boolean} True once an endpoint is set.
 */
export function isContactFormConfigured(endpoint = CONTACT_FORM_ENDPOINT) {
  return endpoint.trim() !== "";
}

/**
 * Submits the contact form to Formspree, requesting a JSON response so the
 * page can show an inline success/error state instead of redirecting.
 *
 * @param {{name: string, email: string, message: string}} fields - The validated field values.
 * @param {string} [endpoint] - The endpoint to submit to. Defaults to the real configured one; tests pass an explicit value instead.
 * @returns {Promise<void>} Resolves on success, throws on failure.
 */
export async function submitContactForm(fields, endpoint = CONTACT_FORM_ENDPOINT) {
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(fields),
  });

  if (!response.ok) {
    throw new Error(`Form submission failed: ${response.status}`);
  }
}
