# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

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
- Deployed to Vercel via CLI at https://portfolio-site-three-blush-83.vercel.app, with `vercel.json` rewriting all paths to `index.html` for correct client-side route fallback. GitHub repo connected for automatic redeploys on push.

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
