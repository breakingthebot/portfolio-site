# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

## [1.5.0] - 2026-07-07
### Added
- Tech-stack badge row on Home (`src/components/TechStack.jsx`), a curated list of languages/tools used across the 286-builds series (`src/content/techStack.js`).
- GitHub contribution heatmap on Home (`src/components/GithubChart.jsx`), embedded via the free `ghchart.rshah.org` service. Renders on a fixed white card in both themes (the service's "no activity" squares are a fixed light gray with no dark variant) and hides itself entirely if the image fails to load, so a third-party outage never shows a broken-image icon.

## [1.4.0] - 2026-07-07
### Added
- Project thumbnails on `Projects` cards: a real image shows automatically once dropped into `public/project-thumbnails/{build_number}.jpg` and deployed; otherwise a clean placeholder shows instead of a blank space or broken image icon. `src/services/projectThumbnailService.js` detects a real image the same way `resumeService.js` detects a real resume (checks actual `Content-Type`, not just response status, since a missing file still returns 200 via the SPA rewrite).

## [1.3.0] - 2026-07-07
### Added
- "BB" avatar monogram (`src/components/Avatar.jsx`) in the Home hero, first step in a "deck this out" visual pass. CSS-driven (not a static image), so it follows the light/dark theme automatically like everything else.

## [1.2.0] - 2026-07-07
### Changed
- Project cards on the Projects page now show technology and category as visually distinct pill tags instead of a single muted "Tech · Category" text line, making the variety across builds easier to scan at a glance.

## [1.1.1] - 2026-07-07
### Fixed
- Normalized `h1` spacing across pages: `Projects`, `Blog`, and `Contact` previously had no heading CSS at all and fell through to the browser's UA-default margin, which stacked with each page's own container padding for an inconsistent gap above the title. Added a baseline `h1` rule in `global.css`; `Home`'s hero and `NotFound`'s "404" keep their own deliberate overrides.

## [1.1.0] - 2026-07-07
### Added
- First real blog post: "This Isn't New — It's Just the First Time I'm Logging It" (`src/content/posts.js`), on why this project exists.
- Blog now renders real posts instead of only the empty state: a list view (`Blog.jsx`) and a per-post detail view (`BlogPost.jsx`, new route `/blog/:slug`).
- `src/services/blogService.js` — pure `getAllPosts()` (sorts newest first) and `getPostBySlug()`, unit tested independently of real post content.

## [1.0.0] - 2026-07-07
### Added
- Light/dark theme toggle (`src/components/ThemeToggle.jsx`) in the nav, backed by pure logic in `src/services/themeService.js` (flip/resolve/persist), fully unit tested with a mock storage object.
- Manual choice persists to `localStorage` and overrides the OS `prefers-color-scheme` default. An inline blocking script in `index.html` re-applies any stored choice before React mounts, so there's no flash of the wrong theme on load.
- Verified with Playwright: initial light render, click-to-dark, and dark-persists-after-reload all screenshot-confirmed correct.

## [0.9.0] - 2026-07-07
### Fixed
- Nav links now wrap cleanly onto their own line below the brand on narrow screens, instead of the brand text wrapping mid-word and crowding the links.
- `.nav-bar` and `.site-footer` now correctly fill their `max-width: 960px` instead of shrink-wrapping to content width — both are flex children of a column flex container, and `margin: 0 auto` without an explicit `width` suppresses the default stretch behavior. Confirmed via Playwright bounding-box measurements (424px before, 960px after) and screenshots at 320px/375px/1280px plus dark mode.
- Home bio paragraph is now left-aligned instead of centered, for readability.
- Hero heading/tagline scale down below 480px so they don't dominate small screens.

## [0.8.0] - 2026-07-07
### Added
- "Download Resume" link on Home (`src/components/ResumeLink.jsx`), shown only once a real `resume.pdf` exists in `public/` — never a dead link.
- `isResumeAvailable()` (`src/services/resumeService.js`) checks the response's actual `Content-Type`, not just `response.ok`, since `vercel.json`'s catch-all rewrite means a missing file still returns 200 with `text/html`. Regression-tested for this exact case.

## [0.7.0] - 2026-07-07
### Added
- Vercel Web Analytics (`@vercel/analytics`), enabled via `vercel project web-analytics portfolio-site` and wired into `main.jsx`. Free tier, no cookie banner required.

## [0.6.0] - 2026-07-07
### Added
- Custom 404 page (`src/pages/NotFound.jsx`) with a catch-all `*` route, so unmatched paths show a real message instead of rendering blank under the nav/footer.

## [0.5.0] - 2026-07-07
### Added
- Favicon (`public/favicon.svg`) and Open Graph/Twitter Card meta tags for proper link previews when shared.
- `public/og-image.svg` social share card (1200x630).

## [0.4.3] - 2026-07-07
### Fixed
- Wired up the real Formspree endpoint in production (`VITE_CONTACT_FORM_ENDPOINT` set via `vercel env add`, then redeployed since Vite bakes `VITE_` vars in at build time). The contact form is no longer just built — it's live and verified with a real end-to-end submission.

## [0.4.2] - 2026-07-07
### Changed
- Filled in the Home page bio paragraph (background, current project, what I'm looking for), based on the `breakingthebot/breakingthebot` profile README.
- Replaced the placeholder contact email with breakingthebot@gmail.com.

## [0.4.1] - 2026-07-07
### Changed
- Replaced "Your Name" placeholder with "Breaking the Bot" across the nav, footer, page title, and Home page.
- Added a real tagline on Home, based on the bio in the `breakingthebot/breakingthebot` GitHub profile README.

## [0.4.0] - 2026-07-07
### Added
- Honeypot spam protection on the contact form (`_gotcha` field, Formspree's convention): hidden off-screen via CSS so real users never see it, but bots that blindly fill every field get caught. Triggering it shows the normal success message without an actual network request, so bots get no signal they were caught.
- Unit tests for honeypot detection logic.

## [0.3.0] - 2026-07-07
### Added
- GitHub Actions CI: `npm ci`, `npm test`, `npm run build` on every push/PR to `main`. Test badge in README.
- Deployed to Vercel via CLI at https://breakingthebot-portfolio-site.vercel.app, with `vercel.json` rewriting all paths to `index.html` for correct client-side route fallback. GitHub repo connected for automatic redeploys on push.

## [0.2.0] - 2026-07-07
### Added
- Real contact form (name/email/message) submitting to a configurable Formspree endpoint (`VITE_CONTACT_FORM_ENDPOINT`), with client-side validation and loading/success/error states.
- "Not configured" fallback notice when no form endpoint is set, so the page never silently fails.
- Unit tests for form validation rules and submission handling (success, error status, request shape).

## [0.1.0] - 2026-07-06
### Added
- Four routed pages: Home, Projects, Blog, Contact, sharing one NavBar/Footer layout.
- Projects page fetches recent builds live from the 286-builds index and links out to the full searchable site.
- Contact page with a `mailto:` link (no form/backend yet).
- Blog page with an intentional empty state.
- Unit tests for the highlighted-builds selection logic.
- MIT License.
