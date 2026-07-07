/*
 * tests/services/githubActivityService.test.js
 * Verifies event grouping, day-list building, week chunking, level
 * bucketing, and fetch behavior.
 * Connects to: src/services/githubActivityService.js
 * Created: 2026-07-07
 */

import { describe, expect, it, vi } from "vitest";

import {
  activityLevel,
  buildActivityDays,
  chunkIntoWeeks,
  fetchRecentActivity,
  groupPushEventsByDay,
  MAX_EVENT_PAGES,
} from "../../src/services/githubActivityService.js";

function makeFetchMock(pageResponses) {
  return vi.fn((url) => {
    const page = Number(new URL(url).searchParams.get("page"));
    const resp = pageResponses[page - 1] ?? { ok: true, events: [] };
    if (!resp.ok) {
      return Promise.resolve({ ok: false, status: resp.status ?? 500 });
    }
    return Promise.resolve({ ok: true, json: () => Promise.resolve(resp.events) });
  });
}

describe("groupPushEventsByDay", () => {
  it("counts one per PushEvent per day", () => {
    // Real PushEvent payloads only have repository_id/push_id/ref/head/
    // before -- no size or commits array (confirmed against the live API)
    // -- so this counts pushes, not commits.
    const events = [
      { type: "PushEvent", created_at: "2026-07-07T10:00:00Z", payload: { ref: "refs/heads/main" } },
      { type: "PushEvent", created_at: "2026-07-07T15:00:00Z", payload: { ref: "refs/heads/main" } },
      { type: "PushEvent", created_at: "2026-07-06T10:00:00Z", payload: { ref: "refs/heads/main" } },
    ];

    expect(groupPushEventsByDay(events)).toEqual({ "2026-07-07": 2, "2026-07-06": 1 });
  });

  it("ignores non-PushEvent event types", () => {
    const events = [
      { type: "WatchEvent", created_at: "2026-07-07T10:00:00Z", payload: {} },
      { type: "PushEvent", created_at: "2026-07-07T10:00:00Z", payload: {} },
    ];

    expect(groupPushEventsByDay(events)).toEqual({ "2026-07-07": 1 });
  });

  it("returns an empty object for no events", () => {
    expect(groupPushEventsByDay([])).toEqual({});
  });
});

describe("buildActivityDays", () => {
  it("builds the requested number of days ending on the reference date", () => {
    const today = new Date("2026-07-07T12:00:00Z");

    const days = buildActivityDays({}, today, 3);

    expect(days.map((d) => d.date)).toEqual(["2026-07-05", "2026-07-06", "2026-07-07"]);
  });

  it("pulls counts from the map when present, defaults to zero otherwise", () => {
    const today = new Date("2026-07-07T12:00:00Z");
    const counts = { "2026-07-07": 4 };

    const days = buildActivityDays(counts, today, 2);

    expect(days).toEqual([
      { date: "2026-07-06", count: 0 },
      { date: "2026-07-07", count: 4 },
    ]);
  });
});

describe("chunkIntoWeeks", () => {
  it("chunks a flat list into groups of 7", () => {
    const days = Array.from({ length: 14 }, (_, i) => ({ date: `day-${i}`, count: 0 }));

    const weeks = chunkIntoWeeks(days);

    expect(weeks).toHaveLength(2);
    expect(weeks[0]).toHaveLength(7);
    expect(weeks[1]).toHaveLength(7);
  });

  it("leaves a shorter final chunk for non-multiples of 7", () => {
    const days = Array.from({ length: 9 }, (_, i) => ({ date: `day-${i}`, count: 0 }));

    const weeks = chunkIntoWeeks(days);

    expect(weeks).toHaveLength(2);
    expect(weeks[1]).toHaveLength(2);
  });
});

describe("activityLevel", () => {
  it("returns 0 for no activity", () => {
    expect(activityLevel(0)).toBe(0);
  });

  it("buckets increasing counts into increasing levels", () => {
    expect(activityLevel(1)).toBe(1);
    expect(activityLevel(5)).toBe(2);
    expect(activityLevel(10)).toBe(3);
    expect(activityLevel(25)).toBe(4);
  });
});

describe("fetchRecentActivity", () => {
  it("fetches all pages in parallel and merges events across pages", async () => {
    const fetchMock = makeFetchMock([
      { ok: true, events: [{ type: "PushEvent", created_at: "2026-07-07T10:00:00Z", payload: {} }] },
      { ok: true, events: [{ type: "PushEvent", created_at: "2026-07-06T10:00:00Z", payload: {} }] },
    ]);

    const result = await fetchRecentActivity(fetchMock);

    expect(result).toEqual({ "2026-07-07": 1, "2026-07-06": 1 });
    expect(fetchMock).toHaveBeenCalledTimes(MAX_EVENT_PAGES);
  });

  it("keeps events from pages that succeeded when some pages fail", async () => {
    const fetchMock = makeFetchMock([
      { ok: true, events: [{ type: "PushEvent", created_at: "2026-07-07T10:00:00Z", payload: {} }] },
      { ok: false, status: 403 },
    ]);

    const result = await fetchRecentActivity(fetchMock);

    expect(result).toEqual({ "2026-07-07": 1 });
  });

  it("throws when every page fails", async () => {
    const fetchMock = makeFetchMock(Array.from({ length: MAX_EVENT_PAGES }, () => ({ ok: false, status: 403 })));

    await expect(fetchRecentActivity(fetchMock)).rejects.toThrow();
  });
});
