/*
 * tests/services/blogService.test.js
 * Verifies post sort order and slug lookup logic.
 * Connects to: src/services/blogService.js
 * Created: 2026-07-07
 */

import { describe, expect, it } from "vitest";

import { getAllPosts, getPostBySlug } from "../../src/services/blogService.js";

const POSTS = [
  { slug: "first", title: "First", date: "2026-01-01" },
  { slug: "third", title: "Third", date: "2026-03-01" },
  { slug: "second", title: "Second", date: "2026-02-01" },
];

describe("getAllPosts", () => {
  it("sorts posts newest first", () => {
    expect(getAllPosts(POSTS).map((post) => post.slug)).toEqual(["third", "second", "first"]);
  });

  it("does not mutate the input array", () => {
    const original = [...POSTS];

    getAllPosts(POSTS);

    expect(POSTS).toEqual(original);
  });

  it("returns an empty array when given no posts", () => {
    expect(getAllPosts([])).toEqual([]);
  });
});

describe("getPostBySlug", () => {
  it("returns the matching post", () => {
    expect(getPostBySlug("second", POSTS)).toEqual(POSTS[2]);
  });

  it("returns null when no post matches", () => {
    expect(getPostBySlug("missing", POSTS)).toBeNull();
  });
});
