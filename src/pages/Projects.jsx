/*
 * src/pages/Projects.jsx
 * Shows a handful of recent builds pulled live from the 286-builds index,
 * plus a link to the full searchable index.
 * Connects to: src/services/buildsService.js, src/components/ProjectCard.jsx
 * Created: 2026-07-06
 */

import { useEffect, useState } from "react";

import { fetchHighlightedBuilds } from "../services/buildsService.js";
import ProjectCard from "../components/ProjectCard.jsx";
import "./Projects.css";

function Projects() {
  const [status, setStatus] = useState("loading");
  const [builds, setBuilds] = useState([]);

  useEffect(() => {
    let cancelled = false;

    fetchHighlightedBuilds()
      .then((highlighted) => {
        if (cancelled) return;
        setBuilds(highlighted);
        setStatus(highlighted.length === 0 ? "empty" : "ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="projects-page">
      <h1>Projects</h1>
      <p className="projects-intro">
        A running series of daily builds spanning multiple languages and problem types.{" "}
        <a href="https://breakingthebot.github.io/286-builds/" target="_blank" rel="noopener noreferrer">
          Browse the full searchable index →
        </a>
      </p>

      {status === "loading" && <p className="projects-status">Loading recent builds…</p>}
      {status === "error" && (
        <p className="projects-status projects-status-error">
          Couldn't load recent builds right now — the full index is always available{" "}
          <a href="https://breakingthebot.github.io/286-builds/" target="_blank" rel="noopener noreferrer">
            here
          </a>
          .
        </p>
      )}
      {status === "empty" && <p className="projects-status">No builds published yet — check back soon.</p>}

      {status === "ready" && (
        <div className="projects-grid">
          {builds.map((build) => (
            <ProjectCard key={build.build_number} build={build} />
          ))}
        </div>
      )}
    </section>
  );
}

export default Projects;
