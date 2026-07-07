/*
 * src/pages/Blog.jsx
 * Blog listing page. Renders real posts from src/content/posts.js, falling
 * back to the empty state when there are none.
 * Connects to: src/App.jsx, src/content/posts.js, src/services/blogService.js
 * Created: 2026-07-06
 */

import { Link } from "react-router-dom";

import POSTS from "../content/posts.js";
import { useDocumentTitle } from "../hooks/useDocumentTitle.js";
import { getAllPosts } from "../services/blogService.js";
import "./Blog.css";

function Blog() {
  useDocumentTitle("Blog — Breaking the Bot");

  const posts = getAllPosts(POSTS);

  if (posts.length === 0) {
    return (
      <section className="blog-page">
        <h1>Blog</h1>
        <p className="blog-empty-state">No posts yet — check back soon.</p>
      </section>
    );
  }

  return (
    <section className="blog-page">
      <h1>Blog</h1>
      <ul className="blog-list">
        {posts.map((post) => (
          <li key={post.slug} className="blog-list-item">
            <Link to={`/blog/${post.slug}`} className="blog-list-title">
              {post.title}
            </Link>
            <p className="blog-list-date">{post.date}</p>
            <p className="blog-list-excerpt">{post.excerpt}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Blog;
