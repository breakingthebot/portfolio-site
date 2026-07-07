# Portfolio Site

[![Test](https://github.com/breakingthebot/portfolio-site/actions/workflows/test.yml/badge.svg)](https://github.com/breakingthebot/portfolio-site/actions/workflows/test.yml)

Personal portfolio site — home, projects, blog, and contact pages with client-side routing.

## Stack
- React 19 + React Router 7 (client-side routing)
- Vite (dev server + build)
- Vitest (unit tests)
- Plain CSS (no framework, no CSS-in-JS)

## Setup
1. Install Node.js 22 or newer.
2. Clone this repo.
3. `npm install`

## Environment Variables
None required for the site to run. See `.env.example`:
- `VITE_BUILDS_DATA_URL` — optionally overrides where the Projects page fetches build data from (defaults to the live 286-builds index).
- `VITE_CONTACT_FORM_ENDPOINT` — your Formspree form endpoint (e.g. `https://formspree.io/f/xxxxxxxx`), free at [formspree.io](https://formspree.io). Until this is set, the Contact page shows a "not configured" notice and relies on the `mailto:` link instead of a broken-looking form.

## Running Locally
- `npm run dev` — start the dev server (prints a local URL).
- `npm test` — run the Vitest suite.
- `npm run build` — production build to `dist/`.
- `npm run preview` — serve the production build locally.

## Deployed
Not deployed yet — planned for Vercel (`vercel` for preview, `vercel --prod` for production) in an upcoming iteration, since Vercel handles client-side route fallbacks correctly out of the box.

## Architecture Notes
Four pages (Home, Projects, Blog, Contact) share one `NavBar`/`Footer` layout via `App.jsx`'s route table. Content is currently placeholder copy (name, bio, email) — swap it in whenever, the structure and routing are real and working.

The Projects page is the one page with real logic: `src/services/buildsService.js` fetches the live `builds.json` from the [286-builds index](https://breakingthebot.github.io/286-builds/) and selects the most recent entries via a pure `selectHighlightedBuilds()` function, kept separate from the fetch call so it can be unit tested without mocking `fetch`. The page also always links out to the full searchable index rather than trying to duplicate its search/filter functionality here.

Blog is an intentional empty state for now — no fake posts.

Contact now has a real form (`src/components/ContactForm.jsx`) submitting to Formspree, with client-side validation split into a pure `validateContactForm()` function (`src/services/contactFormValidation.js`) so field rules are unit-tested without rendering anything. Submission itself lives in `src/services/contactFormService.js`, which also exposes `isContactFormConfigured()` — if `VITE_CONTACT_FORM_ENDPOINT` isn't set, the page shows a clear notice and leans on the `mailto:`/GitHub links instead of rendering a form that would silently fail.

## Notes
- All bio/name/email content is placeholder text, clearly marked, ready to swap in.
- `AGENTS.md` (build standards) is intentionally excluded from version control via `.gitignore`.
