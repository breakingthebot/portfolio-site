/*
 * src/pages/Blog.jsx
 * Blog listing page. Empty-state for now; post rendering comes in a later iteration.
 * Connects to: src/App.jsx
 * Created: 2026-07-06
 */

import "./Blog.css";

function Blog() {
  return (
    <section className="blog-page">
      <h1>Blog</h1>
      <p className="blog-empty-state">No posts yet — check back soon.</p>
    </section>
  );
}

export default Blog;
