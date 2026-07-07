/*
 * src/pages/Contact.jsx
 * Contact page. Uses a mailto: link for now since there's no backend yet
 * (a real form via a service like Formspree is a good next iteration).
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import "./Contact.css";

const CONTACT_EMAIL = "your.email@example.com";

function Contact() {
  return (
    <section className="contact-page">
      <h1>Contact</h1>
      <p className="contact-intro">The best way to reach me is by email.</p>
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
    </section>
  );
}

export default Contact;
