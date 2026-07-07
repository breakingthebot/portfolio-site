# Portfolio Site

[![Test](https://github.com/breakingthebot/portfolio-site/actions/workflows/test.yml/badge.svg)](https://github.com/breakingthebot/portfolio-site/actions/workflows/test.yml)

Personal portfolio site — home, projects, blog, and contact pages with client-side routing.

## Stack
- React 19 + React Router 7 (client-side routing)
- Vite (dev server + build)
- Vitest (unit tests)
- Plain CSS (no framework, no CSS-in-JS)
- Vercel Web Analytics (`@vercel/analytics`) — free tier, no cookie banner needed

## Setup
1. Install Node.js 22 or newer.
2. Clone this repo.
3. `npm install`

## Environment Variables
None required for the site to run. See `.env.example`:
- `VITE_BUILDS_DATA_URL` — optionally overrides where the Projects page fetches build data from (defaults to the live 286-builds index).
- `VITE_CONTACT_FORM_ENDPOINT` — your Formspree form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`), free at [formspree.io](https://formspree.io). Until this is set, the Contact page shows a "not configured" notice and relies on the `mailto:` link instead of a broken-looking form. Set in production via `vercel env add VITE_CONTACT_FORM_ENDPOINT production --value "https://formspree.io/f/xxxxxxxx"`, then redeploy (`vercel --prod`) — Vite bakes `VITE_` vars in at build time, so existing deployments won't pick up a new value without a rebuild.

## Running Locally
- `npm run dev` — start the dev server (prints a local URL).
- `npm test` — run the Vitest suite.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.

## Deployed
Live at [portfolio-site-three-blush-83.vercel.app](https://portfolio-site-three-blush-83.vercel.app). Deployed via `vercel` CLI (not the dashboard) with `vercel.json` set to rewrite every path to `index.html`, so client-side routes like `/projects` work correctly on direct navigation and refresh — GitHub Pages can't do this without extra configuration, which is why this went to Vercel instead. The GitHub repo is connected for automatic redeploys on push to `main`.

The contact form is fully wired up in production — `VITE_CONTACT_FORM_ENDPOINT` is set in Vercel and verified with a real end-to-end submission to Formspree.

## Architecture Notes
Four pages (Home, Projects, Blog, Contact) plus a catch-all 404 page share one `NavBar`/`Footer` layout via `App.jsx`'s route table. Name, tagline, bio, and contact email are real content now (sourced from the `breakingthebot/breakingthebot` GitHub profile README).

The Projects page is the one page with real logic: `src/services/buildsService.js` fetches the live `builds.json` from the [286-builds index](https://breakingthebot.github.io/286-builds/) and selects the most recent entries via a pure `selectHighlightedBuilds()` function, kept separate from the fetch call so it can be unit tested without mocking `fetch`. The page also always links out to the full searchable index rather than trying to duplicate its search/filter functionality here.

Blog is an intentional empty state for now — no fake posts.

Contact now has a real form (`src/components/ContactForm.jsx`) submitting to Formspree, with client-side validation split into a pure `validateContactForm()` function (`src/services/contactFormValidation.js`) so field rules are unit-tested without rendering anything. Submission itself lives in `src/services/contactFormService.js`, which also exposes `isContactFormConfigured()` — if `VITE_CONTACT_FORM_ENDPOINT` isn't set, the page shows a clear notice and leans on the `mailto:`/GitHub links instead of rendering a form that would silently fail.

The form also includes a honeypot field (`_gotcha`, Formspree's own convention) — positioned off-screen via CSS rather than `display:none` or `type="hidden"`, since some bots specifically skip fields hidden that way. `isHoneypotTriggered()` checks it client-side before ever calling `submitContactForm()`; a filled honeypot shows the same success message without an actual network request, so bots get no signal their submission was rejected. Formspree also discards any submission with a filled `_gotcha` server-side, as defense-in-depth.

`ResumeLink` (`src/components/ResumeLink.jsx`) shows a "Download Resume" button on Home only once a real `resume.pdf` exists in `public/` — never a dead link. This can't just check `fetch().ok`: `vercel.json` rewrites every unmatched path to `index.html`, so a *missing* `resume.pdf` still returns 200, just with `Content-Type: text/html` instead of `application/pdf`. `isResumeAvailable()` (`src/services/resumeService.js`) checks the actual content type, not just the status code — confirmed the bug existed by testing against a real missing file first (200/text-html), then confirmed the fix with a real file (200/application-pdf), before shipping. To activate the button, drop a real `resume.pdf` into `public/`.

### Mobile/layout fixes
Two real layout bugs, found by screenshotting the live site at mobile width with Playwright (no browser tool available otherwise, so this was set up ad hoc for verification — not a project dependency):

1. **Nav wrap** — `.nav-links` had no `flex-wrap`, so on narrow screens the brand name wrapped mid-text and crowded against the nav links instead of the link row dropping cleanly below the brand. Fixed with `flex-wrap: wrap` + `row-gap` on `.nav-bar`/`.nav-links`, plus a `max-width: 400px` breakpoint that puts the brand on its own line below ~400px.
2. **`.nav-bar` and `.site-footer` were shrink-wrapping to content width instead of filling their `max-width: 960px`** — both are direct flex children of `.app-shell` (a column flex container), and `margin: 0 auto` on a flex item suppresses the default `align-items: stretch` behavior, so without an explicit `width: 100%` they sized to content (measured 424px instead of 960px) instead of stretching up to the cap. This made the footer's divider line visibly shorter than the page content above it. Fixed by adding `width: 100%` alongside `max-width` on both.

Also left-aligned the Home bio paragraph (long-form text reads better left-aligned than centered) and added a `max-width: 480px` breakpoint scaling down the H1/tagline font sizes so the hero doesn't dominate small screens.

## Notes
- Blog page content is still an intentional empty state (no fake posts).
- No resume is uploaded yet — drop `resume.pdf` into `public/` to activate the Home page download button.
- `AGENTS.md` (build standards) is intentionally excluded from version control via `.gitignore`.
- The favicon and Open Graph/Twitter share image (`public/favicon.svg`, `public/og-image.svg`) are SVG. Most modern platforms (Discord, Slack, iMessage, Facebook) render SVG `og:image` fine, but some stricter validators (older Twitter Card validator, some LinkedIn crawlers) prefer raster PNG/JPG — worth upgrading to a designed PNG if you hit a platform that shows a blank preview.
