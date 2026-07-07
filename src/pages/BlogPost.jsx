/*
 * src/pages/BlogPost.jsx
 * Single blog post view, resolved by slug from the URL.
 * Connects to: src/App.jsx, src/content/posts.js, src/services/blogService.js
 * Created: 2026-07-07
 */

import { Link, useParams } from "react-router-dom";

import POSTS from "../content/posts.js";
import { getPostBySlug } from "../services/blogService.js";
import "./BlogPost.css";

function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug, POSTS);

  if (!post) {
    return (
      <section className="blog-post-page">
        <p>That post doesn't exist.</p>
        <Link to="/blog" className="blog-post-back">
          Back to Blog
        </Link>
      </section>
    );
  }

  return (
    <section className="blog-post-page">
      <Link to="/blog" className="blog-post-back">
        Back to Blog
      </Link>
      <h1>{post.title}</h1>
      <p className="blog-post-date">{post.date}</p>
      {post.body.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </section>
  );
}

export default BlogPost;
