/*
 * src/services/blogService.js
 * Pure lookup helpers over the post data, kept separate from posts.js so
 * the lookup/sort logic is unit-testable without depending on real content.
 * Connects to: src/content/posts.js, src/pages/Blog.jsx, src/pages/BlogPost.jsx
 * Created: 2026-07-07
 */

export function getAllPosts(posts) {
  return [...posts].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPostBySlug(slug, posts) {
  return posts.find((post) => post.slug === slug) ?? null;
}
