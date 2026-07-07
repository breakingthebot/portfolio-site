/*
 * src/components/ResumeLink.jsx
 * Renders a "Download Resume" link only once a real resume.pdf exists in
 * public/ -- never shows a link to a file that would 404. To activate,
 * drop a resume.pdf into public/.
 * Connects to: src/pages/Home.jsx, src/services/resumeService.js
 * Created: 2026-07-07
 */

import { useEffect, useState } from "react";

import { isResumeAvailable, RESUME_PATH } from "../services/resumeService.js";

function ResumeLink() {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let cancelled = false;

    isResumeAvailable().then((result) => {
      if (!cancelled) setAvailable(result);
    });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!available) {
    return null;
  }

  return (
    <a className="home-action-secondary" href={RESUME_PATH} target="_blank" rel="noopener noreferrer">
      Download Resume
    </a>
  );
}

export default ResumeLink;
