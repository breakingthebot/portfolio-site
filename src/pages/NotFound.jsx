/*
 * src/pages/NotFound.jsx
 * Catch-all page for any route that doesn't match, so unmatched paths
 * show a real message instead of a blank page under the nav/footer.
 * Connects to: src/App.jsx
 * Created: 2026-07-07
 */

import { Link } from "react-router-dom";

import "./NotFound.css";

function NotFound() {
  return (
    <section className="not-found-page">
      <h1>404</h1>
      <p>That page doesn't exist.</p>
      <Link className="not-found-link" to="/">
        Back to Home
      </Link>
    </section>
  );
}

export default NotFound;
