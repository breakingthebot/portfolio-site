# Changelog

All notable changes to this project are documented in this file.

## [Unreleased]

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
