/*
 * src/components/ContactForm.jsx
 * Contact form with client-side validation and Formspree submission.
 * Connects to: src/pages/Contact.jsx, src/services/contactFormValidation.js, src/services/contactFormService.js
 * Created: 2026-07-06
 */

import { useState } from "react";

import { isHoneypotTriggered, validateContactForm } from "../services/contactFormValidation.js";
import { isContactFormConfigured, submitContactForm } from "../services/contactFormService.js";
import "./ContactForm.css";

const EMPTY_FIELDS = { name: "", email: "", message: "", _gotcha: "" };

function ContactForm() {
  const [fields, setFields] = useState(EMPTY_FIELDS);
  const [fieldErrors, setFieldErrors] = useState({});
  const [status, setStatus] = useState("idle");

  if (!isContactFormConfigured()) {
    return (
      <p className="contact-form-not-configured">
        The contact form isn't set up yet — email me directly instead (see above). If you're the site owner:
        set <code>VITE_CONTACT_FORM_ENDPOINT</code> in <code>.env</code> to your Formspree endpoint to enable it.
      </p>
    );
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((previous) => ({ ...previous, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const errors = validateContactForm(fields);
    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    // A filled honeypot means a bot, not a person -- pretend success without
    // actually sending anything, so the bot has no signal to adapt its behavior.
    if (isHoneypotTriggered(fields)) {
      setStatus("success");
      setFields(EMPTY_FIELDS);
      return;
    }

    setStatus("submitting");

    try {
      await submitContactForm(fields);
      setStatus("success");
      setFields(EMPTY_FIELDS);
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return <p className="contact-form-success">Thanks — your message is sent. I'll get back to you soon.</p>;
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      {/* Honeypot: hidden from real users via CSS (not type="hidden", which
          some bots skip on purpose), so only bots that blindly fill every
          field end up filling this one. Formspree also discards any
          submission with a filled _gotcha field server-side. */}
      <label className="contact-form-honeypot" aria-hidden="true">
        Leave this field empty
        <input
          type="text"
          name="_gotcha"
          value={fields._gotcha}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </label>

      <label className="contact-form-field">
        Name
        <input type="text" name="name" value={fields.name} onChange={handleChange} />
        {fieldErrors.name && <span className="contact-form-error">{fieldErrors.name}</span>}
      </label>

      <label className="contact-form-field">
        Email
        <input type="email" name="email" value={fields.email} onChange={handleChange} />
        {fieldErrors.email && <span className="contact-form-error">{fieldErrors.email}</span>}
      </label>

      <label className="contact-form-field">
        Message
        <textarea name="message" rows="5" value={fields.message} onChange={handleChange} />
        {fieldErrors.message && <span className="contact-form-error">{fieldErrors.message}</span>}
      </label>

      {status === "error" && (
        <p className="contact-form-error contact-form-error-banner">
          Something went wrong sending that — try again, or email me directly (see above).
        </p>
      )}

      <button type="submit" disabled={status === "submitting"}>
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

export default ContactForm;
