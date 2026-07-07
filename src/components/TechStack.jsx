/*
 * src/components/TechStack.jsx
 * Small badge row of the languages/tools used across the 286-builds
 * series. Content lives in src/content/techStack.js.
 * Connects to: src/pages/Home.jsx, src/content/techStack.js
 * Created: 2026-07-07
 */

import TECH_STACK from "../content/techStack.js";
import "./TechStack.css";

function TechStack() {
  return (
    <ul className="tech-stack">
      {TECH_STACK.map((tech) => (
        <li key={tech} className="tech-stack-badge">
          {tech}
        </li>
      ))}
    </ul>
  );
}

export default TechStack;
