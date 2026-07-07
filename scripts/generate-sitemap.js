/*
 * scripts/generate-sitemap.js
 * Generates public/sitemap.xml from the real route list plus real blog
 * post slugs, so it never goes stale the way a hand-maintained sitemap
 * would the moment a new post is added. Runs automatically before every
 * build via the "prebuild" npm script.
 * Connects to: src/content/posts.js, package.json
 * Created: 2026-07-07
 */

import { writeFileSync } from "node:fs";

import POSTS from "../src/content/posts.js";

const SITE_URL = "https://breakingthebot-portfolio-site.vercel.app";
const STATIC_ROUTES = ["/", "/projects", "/blog", "/contact"];

function buildSitemap() {
  const postRoutes = POSTS.map((post) => `/blog/${post.slug}`);
  const routes = [...STATIC_ROUTES, ...postRoutes];

  const urls = routes.map((route) => `  <url><loc>${SITE_URL}${route}</loc></url>`).join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

const xml = buildSitemap();
writeFileSync(new URL("../public/sitemap.xml", import.meta.url), xml);
console.log(`Generated public/sitemap.xml with ${STATIC_ROUTES.length + POSTS.length} routes.`);
