/*
 * src/components/Footer.jsx
 * Site-wide footer with copyright and social links.
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import "./Footer.css";

function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} Breaking the Bot ·{" "}
        <a href="https://github.com/breakingthebot" target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </p>
    </footer>
  );
}

export default Footer;
