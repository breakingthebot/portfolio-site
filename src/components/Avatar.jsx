/*
 * src/components/Avatar.jsx
 * Simple initials monogram for the Home hero -- no photo needed, and it
 * follows the light/dark theme automatically since it's styled with the
 * same CSS custom properties as everything else, unlike a static image.
 * Connects to: src/pages/Home.jsx
 * Created: 2026-07-07
 */

import "./Avatar.css";

function Avatar() {
  return (
    <div className="avatar" aria-hidden="true">
      BB
    </div>
  );
}

export default Avatar;
