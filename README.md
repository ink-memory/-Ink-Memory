<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://ai.google.dev/static/site-assets/images/share-ais-513315318.png" />
</div>

# Ink & Memory

This repository contains the Ink & Memory AI Studio landing page.

View the app in AI Studio: https://ai.studio/apps/a46d1322-f776-4ad7-a084-51fe6101b460

## Local Development

Prerequisite: Node.js 20 or newer.

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create local environment config:
   ```bash
   cp .env.example .env.local
   ```
3. Set `GEMINI_API_KEY` in `.env.local`.
4. Start the dev server:
   ```bash
   npm run dev
   ```

## GitHub Pages Deployment

This repo includes a GitHub Actions workflow at `.github/workflows/deploy.yml`.

When changes are pushed to `main`, the workflow builds the Vite app and publishes `dist/` to `dmeckhg-del/dmeckhg-del.github.io`.

Required repository secrets:

- `DEPLOY_TOKEN`: a Personal Access Token with write access to `dmeckhg-del/dmeckhg-del.github.io`.
- `GEMINI_API_KEY`: available to the build step if the app needs Gemini API configuration.

See [DEPLOYMENT.md](DEPLOYMENT.md) for setup and troubleshooting details.
