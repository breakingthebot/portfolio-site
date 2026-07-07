/*
 * src/pages/Contact.jsx
 * Contact page. The form below is the primary way to reach out; the
 * mailto: link and GitHub link are always-working fallbacks in case the
 * form isn't configured yet or its submission fails.
 * Connects to: src/App.jsx, src/components/ContactForm.jsx
 * Created: 2026-07-06
 */

import ContactForm from "../components/ContactForm.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import "./Contact.css";

const CONTACT_EMAIL = "breakingthebot@gmail.com";

function Contact() {
  useDocumentTitle("Contact — Breaking the Bot");

  return (
    <section className="contact-page">
      <h1>Contact</h1>
      <p className="contact-intro">Use the form below, or reach me directly:</p>
      <a className="contact-email" href={`mailto:${CONTACT_EMAIL}`}>
        {CONTACT_EMAIL}
      </a>
      <ul className="contact-links">
        <li>
          <a href="https://github.com/breakingthebot" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
        </li>
      </ul>
      <ContactForm />
    </section>
  );
}

export default Contact;
