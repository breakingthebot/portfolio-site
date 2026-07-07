/*
 * src/components/ProjectThumbnail.jsx
 * Shows a real thumbnail image once one exists at
 * public/project-thumbnails/{build_number}.jpg, otherwise a placeholder --
 * never a broken image icon.
 * Connects to: src/components/ProjectCard.jsx, src/services/projectThumbnailService.js
 * Created: 2026-07-07
 */

import { useEffect, useState } from "react";

import { getThumbnailPath, isThumbnailAvailable } from "../services/projectThumbnailService.js";

function ProjectThumbnail({ buildNumber, projectName }) {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    isThumbnailAvailable(buildNumber).then((result) => {
      if (!cancelled) setAvailable(result);
    });

    return () => {
      cancelled = true;
    };
  }, [buildNumber]);

  if (available) {
    return (
      <img
        className="project-card-thumbnail"
        src={getThumbnailPath(buildNumber)}
        alt={`${projectName} preview`}
      />
    );
  }

  return (
    <div className="project-card-thumbnail project-card-thumbnail-placeholder" aria-hidden="true">
      <span>🖼</span>
    </div>
  );
}

export default ProjectThumbnail;
