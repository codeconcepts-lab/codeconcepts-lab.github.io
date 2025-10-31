# Architecture Documentation

## Purpose
This document describes the architecture of the `codeconcepts-lab.github.io` static website repository. It covers scope, high-level system context, components and responsibilities, file layout mapping, runtime/data flow for the client, deployment and hosting notes, design decisions, non-functional considerations, and recommended next steps.

> Assumptions
> - This is a static website served via GitHub Pages (or a static host/CDN).
> - No server-side application logic lives in the repo (no backend service). If backend services exist, they are external and called from client-side code or static forms.

## Goals
- Provide a concise, developer-friendly map of the repo and how the site is built and served.
- Explain how components interact (pages, assets, vendor libraries).
- Document deployment and operational expectations.
- Provide actionable suggestions for improvements (performance, CI, tests).

## Scope
Includes all static assets, HTML pages, CSS, JavaScript, vendor libraries, and templates under this repository. It does not include any external services that may be used for analytics, forms, or APIs.

## System Context (high level)

Users' browsers <--> Static site (HTML/CSS/JS & assets) <--> Optional external services

- The repository provides static files (HTML, CSS, JS, images) that are served to end-users.
- Vendor libraries (Bootstrap, AOS, Glightbox, Swiper, etc.) are included under `src/vendor/` for local delivery.
- Forms or other external integrations (if present) post to external endpoints (Formspree, Netlify Forms, server API, etc.).

## Main Components

1. HTML pages (site content)
   - Root-level pages: `index.html`, `about.html`, `services.html`, `contact.html`, `quote.html` etc.
   - `html/` contains variants, templates, and page fragments used by the site (e.g., `html/templates/`, `html/services/`, `html/general/form_submission.html`).

2. Static assets
   - `src/css/` — main styles: `main.css`, `services.css`.
   - `src/js/` — site scripts: `main.js`, `services.js`.
   - `src/imgs/` — images used across the site (organized subfolders like `logo/`, `team/`, `Power/`).
   - `src/vendor/` — third-party libraries (Bootstrap, AOS, Glightbox, Swiper, purecounter, bootstrap-icons, etc.). These appear to be vendored for local delivery instead of using CDN links.

3. Templates and reusable HTML
   - `html/templates/` stores page templates and shared HTML fragments (404, privacy, project-details, projects, etc.).

4. Forms and client-side validation
   - `html/general/form_submission.html` and `src/vendor/php-email-form/validate.js` indicate client-side form validation; form handling likely posts to an external endpoint.

5. Build/Tooling
   - There is no visible build tool or package manager in the repository root (no `package.json`, `pyproject.toml`, or similar found in the workspace). The site seems to be maintained as a plain static site — authoring pages and assets directly.

## File map (key files and purpose)
- `index.html` — landing page
- `about.html` — about page
- `services.html` — services overview
- `contact.html` — contact page
- `quote.html` — quote/request page
- `html/templates/` — reusable HTML templates and pages
- `html/services/` — individual service pages (e.g., `catering_solutions.html`, `construction_services.html`, etc.)
- `src/css/main.css` — main styling
- `src/css/services.css` — services-specific styling
- `src/js/main.js` — main interaction scripts
- `src/js/services.js` — service-related scripts
- `src/vendor/` — vendored third-party libs for UI and effects

## Client-side runtime & data flow
1. Browser requests an HTML page (e.g., `index.html`).
2. HTML references CSS (`src/css/*.css`) and JS (`src/js/*.js`) and vendor assets located under `src/vendor/`.
3. Browser downloads assets; JS initializes UI behavior (AOS, glightbox, sliders, counters).
4. Forms are validated client-side and then submitted to an external endpoint or handled by a serverless form backend (if configured).
5. Third-party scripts (if any analytics or widgets are added) will fetch external resources and may contact external services.

## Deployment & Hosting
Recommended/observed approach:
- Host repo on GitHub Pages (repository name suggests a GitHub Pages site). Branch `main` is present — GitHub Pages can serve from `main`/`gh-pages` or `docs/` folder. Confirm repository GitHub Pages settings.
- Alternatively, deploy to any static host or CDN (Netlify, Vercel, Cloudflare Pages). Vendor assets are included, so no build step required for hosting.

Deployment checklist:
- Confirm which branch or folder GitHub Pages serves (Repository Settings → Pages).
- If using custom domain, update DNS and add `CNAME`.
- Consider delivering assets via CDN (or use GitHub Pages’ CDN) to speed edge delivery.

## Security and privacy considerations
- No server-side code in repo — fewer server vulnerabilities, but still:
  - Ensure forms that accept personal data submit to a trusted backend and use HTTPS.
  - Remove any API keys or secrets from repository; none should be committed.
  - If analytics or external widgets are used, document data-sharing implications in `privacy` page (there is `html/templates/privacy.html`).

## Performance considerations
- Vendor libraries are vendored locally; consider switching high-traffic, cacheable libraries to CDN to benefit from geographically distributed caches and cross-site caching.
- Compress and optimize images under `src/imgs/` (use modern formats like WebP where appropriate).
- Add appropriate Cache-Control headers when deploying on CDN or static host.
- Consider minifying CSS and JS and using a simple build step to produce minified bundles (optional but recommended).

## Accessibility
- Run a basic accessibility audit (Lighthouse or axe) to find issues in color contrast, focus order, ARIA usage, and images missing alt text.
- `color_palette_visual.html` exists in `html/templates/` — use it to validate color contrast.

## Scalability & Maintainability
- Repository is file-based content; for many pages, consider adopting a templating workflow or a static site generator (Jekyll, Eleventy, Hugo) to avoid duplication and improve maintainability.
- Add a small build step (npm scripts) to handle CSS/JS minification, image optimization, and generating production artifacts.

## Important design decisions (observed)
- Vendoring third-party libraries: easier offline development, but larger repository size and no automatic updates.
- Static-only architecture: simpler, lower operational overhead, but any dynamic interactions must rely on external services (forms, APIs).

## Suggested short-term improvements (low-risk)
1. Add `docs/ARCHITECTURE.md` (this file) and link from `README.md` or project homepage for developers.
2. Add a `README.md` at repo root with a short description and a link to this doc and how to preview locally (see "Try it locally").
3. Add an optional `package.json` with scripts for linting, minification, and image optimization. Keep the tooling lightweight.
4. Add GitHub Pages configuration notes (branch/folder) and add a `CNAME` if using a custom domain.

## Try it locally (quick)
Since this is a static site, you can preview pages locally with a simple static server. Example (python):

```bash
# From repo root
python3 -m http.server 8000
# then open http://localhost:8000/
```

(Or use `live-server`, `http-server` via npm, or your editor's Live Preview.)

## Decisions log / Known unknowns
- Unknown: exact deployment settings (GitHub Pages branch/folder). Action: verify repo's Pages settings.
- Unknown: whether any external form endpoints or analytics are configured. Action: search for known endpoint URLs in repo or check deployed site network calls.

## Diagram (ASCII)

Browser
  |
  |---> Static files (HTML, CSS, JS, images) [served from GitHub Pages or static host]
           |-- vendor libraries (src/vendor)
           |-- site assets (src/imgs, src/css, src/js)
  |
  +---> External services (forms, analytics, APIs) [HTTPS]

## Next steps (recommended)
- Confirm deployment target and add a short `DEPLOY.md` with instructions.
- Optionally add minimal build tooling (npm scripts) to produce minified assets and run quick checks.
- Add CI that: checks links (link checker), runs Lighthouse or simple tests, and deploys to target host.
- Improve documentation by adding diagrams (Mermaid) and mapping any external integrations.

---

Document created: `docs/ARCHITECTURE.md`

If you want, I can:
- Add a short `README.md` linking to this doc and showing how to preview locally.
- Add a minimal `package.json` with a `preview` script and build/minify scripts.
- Search the repo for any external service endpoints (forms, analytics) and document them.

Please tell me which follow-up you'd like next (README, search for external endpoints, or add a small build setup).