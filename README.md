# Waypoint — your personal learning path

A responsive learning tracker built with React, Vite, Tailwind CSS v4, and Motion. Covers all 27 topics from the supplied learning list, organized into five stages with prerequisites, documentation, and practice projects.

## Run locally

Requires Node.js 22+.

```sh
npm ci
npm run dev
```

Build with `npm run build`; inspect the production build with `npm run preview`.

## Tracking

Open any topic to check off learning steps, write notes, or add personal steps. Bookmark topics, search both topics and subtopics, filter by stage or progress, and explore the sequenced Roadmap. Progress is saved to this browser's local storage, with JSON backup/restore under Settings. Progress does not sync across devices. Clearing browser storage deletes local progress; export a backup first. The original GenAI tracker remains at `genai-tracker.html` with its original storage behavior.

Topic durations are rough estimates, not deadlines. Redux/Zustand, Prisma/Drizzle, and Supabase/Firebase are alternative tools to compare rather than mandatory layers for every project. WebSockets and SSE are taught before Socket.IO. Architecture topics lead from modular monoliths to deliberate service extraction and measured scaling.

## Deploy

The GitHub Actions workflow builds `dist` and deploys GitHub Pages on pushes to `main`. Repository Settings → Pages must use GitHub Actions as its build source. Vite uses relative asset paths to support the repository's GitHub Pages subdirectory and other static hosting.

Design direction informed by vibrant.design: expressive typography, a warm editorial palette, compact navigation, and restrained animated transitions. Motion respects reduced-motion preferences.
