/*
 * tests/services/buildsService.test.js
 * Verifies highlighted-build selection logic.
 * Connects to: src/services/buildsService.js
 * Created: 2026-07-06
 */

import { describe, expect, it } from "vitest";

import { selectHighlightedBuilds } from "../../src/services/buildsService.js";

describe("selectHighlightedBuilds", () => {
  it("returns the N most recent builds sorted by build number descending", () => {
    const builds = [
      { build_number: 1, project_name: "Oldest" },
      { build_number: 5, project_name: "Newest" },
      { build_number: 3, project_name: "Middle" },
    ];

    const result = selectHighlightedBuilds(builds, 2);

    expect(result.map((build) => build.build_number)).toEqual([5, 3]);
  });

  it("returns every build when count exceeds the list length", () => {
    const builds = [{ build_number: 1 }, { build_number: 2 }];

    const result = selectHighlightedBuilds(builds, 10);

    expect(result).toHaveLength(2);
  });

  it("does not mutate the original array", () => {
    const builds = [{ build_number: 1 }, { build_number: 2 }];
    const original = [...builds];

    selectHighlightedBuilds(builds, 1);

    expect(builds).toEqual(original);
  });

  it("defaults to 6 highlighted builds when no count is given", () => {
    const builds = Array.from({ length: 10 }, (_, index) => ({ build_number: index + 1 }));

    const result = selectHighlightedBuilds(builds);

    expect(result).toHaveLength(6);
  });
});
