/*
 * src/components/ProjectCard.jsx
 * Renders one highlighted build as a card (title, tech badge, description, repo link).
 * Connects to: src/pages/Projects.jsx
 * Created: 2026-07-06
 */

import ProjectThumbnail from "./ProjectThumbnail.jsx";
import "./ProjectCard.css";

function ProjectCard({ build }) {
  return (
    <article className="project-card">
      <ProjectThumbnail buildNumber={build.build_number} projectName={build.project_name} />
      <h3>
        <a href={build.repo_url} target="_blank" rel="noopener noreferrer">
          {build.project_name}
        </a>
      </h3>
      <p className="project-card-tags">
        <span className="project-card-tag project-card-tag-tech">{build.technology}</span>
        <span className="project-card-tag project-card-tag-category">{build.category}</span>
      </p>
      <p className="project-card-description">{build.description}</p>
      <a className="project-card-link" href={build.repo_url} target="_blank" rel="noopener noreferrer">
        View repo →
      </a>
    </article>
  );
}

export default ProjectCard;
