/*
 * src/components/GithubChart.jsx
 * Embeds a GitHub contribution heatmap via ghchart.rshah.org, a free,
 * no-auth third-party image service -- GitHub itself doesn't offer a
 * public embeddable image for this, and building it first-party would
 * require a GitHub API token, which can't be safely shipped in a
 * client-side bundle. Hides itself entirely if the image fails to load
 * (service down, rate-limited, etc.), so a third-party outage never shows
 * a broken-image icon on the site.
 *
 * The active-day color is a fixed brand blue rather than theme-dependent:
 * the chart always sits on a fixed white card (see GithubChart.css) since
 * the service's "no activity" squares are a fixed light gray with no
 * dark-mode variant, so there's no dark background for a lighter accent
 * to contrast against.
 *
 * Connects to: src/pages/Home.jsx
 * Created: 2026-07-07
 */

import { useState } from "react";

import "./GithubChart.css";

const GITHUB_USERNAME = "breakingthebot";
const ACCENT = "2563eb";

function GithubChart() {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return null;
  }

  return (
    <div className="github-chart">
      <img
        className="github-chart-image"
        src={`https://ghchart.rshah.org/${ACCENT}/${GITHUB_USERNAME}`}
        alt={`${GITHUB_USERNAME}'s GitHub contribution activity`}
        onError={() => setFailed(true)}
      />
    </div>
  );
}

export default GithubChart;
