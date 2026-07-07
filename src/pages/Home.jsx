/*
 * src/pages/Home.jsx
 * Landing page: hero intro and quick links to the other pages.
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import { Link } from "react-router-dom";

import Avatar from "../components/Avatar.jsx";
import GithubActivity from "../components/GithubActivity.jsx";
import ResumeLink from "../components/ResumeLink.jsx";
import TechStack from "../components/TechStack.jsx";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import "./Home.css";

function Home() {
  useDocumentTitle("Breaking the Bot — Portfolio");

  return (
    <section className="home-hero">
      <Avatar />
      <h1>Hi, I'm Breaking the Bot.</h1>
      <p className="home-tagline">28 years in operations and automation — now learning AI in public, one build at a time.</p>
      <p className="home-bio">
        After 28 years in operations and automation, I started learning AI seriously in April 2025 — and I'm
        building in public to document the process, not just the results. My main project right now is a series
        of 286 builds spanning different languages, tools, and problem types, aimed at getting broad hands-on
        exposure and figuring out where to go deeper.
      </p>
      <TechStack />
      <div className="home-actions">
        <Link className="home-action-primary" to="/projects">
          See my projects
        </Link>
        <Link className="home-action-secondary" to="/contact">
          Get in touch
        </Link>
        <ResumeLink />
      </div>
      <GithubActivity />
    </section>
  );
}

export default Home;
