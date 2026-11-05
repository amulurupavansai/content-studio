# Content Studio

A planning app for faceless animated YouTube and Instagram channels. It is a fully static Next.js + Tailwind site: no backend, no accounts. Everything is stored in your browser's `localStorage`, and you can back it up with JSON export/import.

**Live site:** https://content-studio-iota-ochre.vercel.app

## Features
- **Channel setup** – niche, target audience, platforms, posts per week.
- **Idea bank** – tags, priority, status (Idea → Scripting → Voiceover → Animation → Editing → Scheduled → Published), search and filters.
- **Content calendar** – month view; drag ideas onto days, between days, or back to the tray to unschedule.
- **Script editor** – hook (first 3 seconds), body, CTA with word counts and estimated length (150 wpm).
- **Checklists** – thumbnail, title, description, hashtags, captions per video.
- **Performance log** – views, likes, comments per published video.
- **Guide** – 8-step workflow with free/low-cost tools and 30 niche ideas with pros/cons.

## Develop
```bash
npm install
npm run dev
```

## Build (static export to `out/`)
```bash
npm run build
```

## Deploy
Production: https://content-studio-iota-ochre.vercel.app

The site is hosted on Vercel. Merging or pushing to `main` triggers a production deployment through Vercel's Git integration, and pull requests get preview deployments. The Next.js framework preset is detected automatically and `output: "export"` produces a static site. No environment variables are needed.

## Data and privacy
Data lives only in the browser that created it. Clearing site data deletes it, and it does not sync between devices. Use **Export JSON** in the sidebar to back up and **Import JSON** to restore (import replaces current data).
