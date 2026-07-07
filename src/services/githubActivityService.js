/*
 * src/services/githubActivityService.js
 * Recent push activity from GitHub's own public events API (no auth
 * needed for public data, CORS-enabled) instead of a third-party image
 * service. Replaces the ghchart.rshah.org embed from iteration 20, which
 * turned out to be several+ days stale and, being a plain <img>, couldn't
 * expose per-day data for tooltips at all.
 *
 * This counts pushes per day, not commits: GitHub's public PushEvent
 * payload no longer includes a commit count or commit list (confirmed
 * live -- payload only has repository_id/push_id/ref/head/before).
 * Getting an exact commit count would mean comparing before/head SHAs via
 * a separate API call per push, which isn't safe against the 60 req/hour
 * unauthenticated rate limit for a widget hit by arbitrary site visitors.
 * A push is usually one commit for this project's one-commit-per-
 * iteration workflow, but is labeled as "pushes" everywhere in the UI to
 * stay accurate rather than overclaim a number this data can't back up.
 *
 * Trade-off: the events endpoint caps at 300 events across 10 pages
 * (confirmed live -- page 10 reached back about a month during a very
 * active stretch, less during calmer ones), not a full year, so older
 * cells in the 91-day grid are often genuinely empty rather than a
 * fetching bug. All 10 pages are fetched in parallel on mount; the
 * unauthenticated rate limit (60/hour) is scoped to the visitor's own IP,
 * not shared across site visitors, so this is safe for normal browsing.
 *
 * Connects to: src/components/GithubActivity.jsx
 * Created: 2026-07-07
 */

export const GITHUB_EVENTS_URL = "https://api.github.com/users/breakingthebot/events/public";
export const ACTIVITY_WINDOW_DAYS = 91;
export const MAX_EVENT_PAGES = 10;

/**
 * Counts PushEvents per day (UTC).
 *
 * @param {Array<object>} events - Raw events from the GitHub events API.
 * @returns {Object<string, number>} Map of "YYYY-MM-DD" -> push count.
 */
export function groupPushEventsByDay(events) {
  const counts = {};
  for (const event of events) {
    if (event.type !== "PushEvent") continue;
    const date = event.created_at.slice(0, 10);
    counts[date] = (counts[date] || 0) + 1;
  }
  return counts;
}

/**
 * Builds a chronological list of the last `numDays` days ending on `today`.
 *
 * @param {Object<string, number>} counts - Map of "YYYY-MM-DD" -> push count.
 * @param {Date} today - Reference "today" date (injectable for testability).
 * @param {number} [numDays]
 * @returns {Array<{date: string, count: number}>}
 */
export function buildActivityDays(counts, today, numDays = ACTIVITY_WINDOW_DAYS) {
  const days = [];
  for (let i = numDays - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setUTCDate(d.getUTCDate() - i);
    const dateStr = d.toISOString().slice(0, 10);
    days.push({ date: dateStr, count: counts[dateStr] || 0 });
  }
  return days;
}

/**
 * Chunks a flat day list into 7-day columns for grid rendering.
 *
 * @param {Array<object>} days
 * @returns {Array<Array<object>>}
 */
export function chunkIntoWeeks(days) {
  const weeks = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return weeks;
}

/**
 * Buckets a raw push count into a 0-4 intensity level for coloring.
 *
 * @param {number} count
 * @returns {number} 0-4
 */
export function activityLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 10) return 3;
  return 4;
}

/**
 * Fetches up to MAX_EVENT_PAGES pages of events in parallel and merges
 * whatever succeeds -- a single failed/rate-limited page doesn't discard
 * the rest.
 *
 * @param {(url: string, init?: object) => Promise<Response>} [fetchFn] - The fetch implementation to use. Defaults to the global fetch; tests pass a mock instead.
 * @returns {Promise<Object<string, number>>} Map of "YYYY-MM-DD" -> push count.
 */
export async function fetchRecentActivity(fetchFn = fetch) {
  const pages = Array.from({ length: MAX_EVENT_PAGES }, (_, i) => i + 1);
  const results = await Promise.allSettled(
    pages.map((page) =>
      fetchFn(`${GITHUB_EVENTS_URL}?page=${page}`).then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to fetch GitHub activity page ${page}: ${response.status}`);
        }
        return response.json();
      }),
    ),
  );

  const allEvents = results.filter((result) => result.status === "fulfilled").flatMap((result) => result.value);

  if (allEvents.length === 0) {
    throw new Error("Failed to fetch GitHub activity: all pages failed");
  }

  return groupPushEventsByDay(allEvents);
}
