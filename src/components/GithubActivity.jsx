/*
 * src/components/GithubActivity.jsx
 * Recent GitHub push activity, built live from GitHub's own public events
 * API (up to 10 pages fetched in parallel, see githubActivityService.js).
 * Replaces GithubChart.jsx (iteration 20's ghchart.rshah.org embed), which
 * was several+ days stale and, being a plain <img>, couldn't expose
 * per-day data for tooltips. Hides itself entirely if every page fails
 * (rate-limited, offline, etc.) -- same graceful-degradation pattern as
 * the resume/thumbnail checks, just never showing an error for a
 * decorative widget.
 *
 * Connects to: src/pages/Home.jsx, src/services/githubActivityService.js
 * Created: 2026-07-07
 */

import { useEffect, useState } from "react";

import { activityLevel, buildActivityDays, chunkIntoWeeks, fetchRecentActivity } from "../services/githubActivityService.js";
import "./GithubActivity.css";

function GithubActivity() {
  const [weeks, setWeeks] = useState(null);

  useEffect(() => {
    let cancelled = false;

    fetchRecentActivity()
      .then((counts) => {
        if (cancelled) return;
        setWeeks(chunkIntoWeeks(buildActivityDays(counts, new Date())));
      })
      .catch(() => {
        // Stay hidden -- not worth an error state for a decorative widget.
      });

    return () => {
      cancelled = true;
    };
  }, []);

  if (!weeks) {
    return null;
  }

  return (
    <div className="github-activity">
      <p className="github-activity-label">Recent GitHub activity (last ~90 days)</p>
      <div className="github-activity-grid">
        {weeks.map((week, weekIndex) => (
          <div className="github-activity-week" key={weekIndex}>
            {week.map((day) => (
              <div
                key={day.date}
                className={`github-activity-day github-activity-level-${activityLevel(day.count)}`}
                title={`${day.count} push${day.count === 1 ? "" : "es"} on ${day.date}`}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GithubActivity;
