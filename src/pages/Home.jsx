/*
 * src/pages/Home.jsx
 * Landing page: hero intro and quick links to the other pages.
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import { Link } from "react-router-dom";

import "./Home.css";

function Home() {
  return (
    <section className="home-hero">
      <h1>Hi, I'm Breaking the Bot.</h1>
      <p className="home-tagline">28 years in operations and automation — now learning AI in public, one build at a time.</p>
      <p className="home-bio">
        Add your bio here. A couple of sentences about your background, what you're currently working on, and
        what you're looking for.
      </p>
      <div className="home-actions">
        <Link className="home-action-primary" to="/projects">
          See my projects
        </Link>
        <Link className="home-action-secondary" to="/contact">
          Get in touch
        </Link>
      </div>
    </section>
  );
}

export default Home;
