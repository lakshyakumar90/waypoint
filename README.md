# Waypoint

Personal learning dashboard built with React, Vite, Tailwind CSS v4, and Motion.

Live: https://lakshyakumar90.github.io/waypoint/

## Curriculum

135 topics and 899 learning steps across seven tracks:

- Full-stack development: the original 27 topics and 159 steps.
- Generative AI: foundations, context engineering, RAG, agent loops, tools, evaluations, customization, production, SDKs, and projects.
- DSA practice: all 165 questions from the Namaste DSA sheet snapshot, in its 14 categories, with original difficulty labels and practice/lesson/article links.
- System design: 11 chapters including networking, storage, scaling, distributed systems, resilience, and design exercises.
- Programming languages: Python, Java, Kotlin, Swift, Rust, C++, Dart, Flutter, and a suggested study sequence.
- DevOps & cloud: Linux, networking, Git, CI/CD, IaC, observability, security, Docker, registries, Kubernetes, AWS, GCP, and hands-on projects.
- Research papers: the recommended initial 15, subject reading lists, and reading techniques, with Scholar search links to locate exact editions.

Complete user-provided source roadmaps are preserved in `public/roadmaps/`. The DSA snapshot was fetched on 2026-10-19 and is not a live feed. Source coverage was checked against all supplied Markdown bullets. Learning hour estimates are approximate; full-stack estimates are curated and imported-topic estimates are based on checklist length.

## Local development

Node.js 22+:

```sh
npm ci
npm run dev
npm run build
npm run preview
```

## Progress and personalization

First visit asks for a name; avatars show its first letter. Change it in Settings or by clicking an avatar. Checklists, notes, custom tasks, and bookmarks save in local storage. Existing `waypoint-progress-v1` keys and all original task IDs are preserved. JSON export/import includes progress and the profile. Progress is local to the browser, without account sync. Export a backup before clearing browser data or changing devices. The original GenAI tracker is preserved at `genai-tracker.html`.

Track summaries, category filters, topic/subtopic search, progress filters, and a roadmap organize the expanded curriculum. Topic cards are paginated. DSA drawers include question search, difficulty filtering, source links, and per-question completion. Bulk completion applies to the entire topic, regardless of search filters.

## Deployment

Repository: https://github.com/lakshyakumar90/waypoint

GitHub Actions builds `dist` and deploys Pages after pushes to `main`. Repository Settings → Pages → Source must be GitHub Actions. Relative asset paths support the renamed `/waypoint/` deployment. The workflow also supports manual dispatch; use a new dispatch rather than a failed-job retry to avoid duplicate Pages artifacts.

Motion respects reduced-motion preferences. Supporting text and task labels use larger responsive typography, with one-column topic cards on phones.
