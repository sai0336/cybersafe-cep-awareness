# CyberSafe — Cyber Security Awareness (CEP)

A **25-page, React/Vite educational website** for a college Community Engagement Project (CEP). The homepage introduces **24 interactive cyber-safety activities**, covering phishing, passwords, MFA, UPI, online scams, privacy, device safety, cyberbullying, deepfakes, and incident reporting.

**Portfolio / education disclaimer:** The scenarios are fictional. Nothing here conducts real payments, authenticates users, scans devices for threats, or substitutes for trained incident-response or legal advice. Do not enter real passwords, OTPs, or banking details into any practice box.

## Author and links

**Created by:** Sai Chavan — Software & Embedded Systems Developer.

- **GitHub profile:** https://github.com/sai0336
- **LinkedIn:** https://www.linkedin.com/in/sai-santosh-chavan/
- **Copyright:** © 2026 Sai Chavan. CyberSafe Awareness Project. All rights reserved.

The copyright year displayed in the website footer updates automatically. The GitHub link points to Sai's **profile**, not a CyberSafe source repository (which has not been created yet).
This is an independent educational demo and is not affiliated with a cybercrime-reporting authority.

## Quick start

Install a current Node.js LTS release and open a terminal in the folder containing this `package.json`:

```bash
npm install
npm run dev
```

Open the address printed by Vite (usually `http://localhost:5173/`).

```bash
npm test         # verifies activity catalogue and learning-check data
npm run build    # production build in dist/
npm run preview  # inspect the built site locally
```

If Windows says `npm` is not recognized, install Node.js LTS and restart the terminal. If PowerShell blocks `npm.ps1`, run `npm.cmd install` / `npm.cmd run dev`.

## Changes in final version 1.2

- Added clickable GitHub and LinkedIn links to the homepage and all-page footer.
- Added developer attribution, visible copyright, and an educational affiliation disclaimer.
- Added a custom shield favicon and sharing metadata.
- Added clear tab titles for each of the 24 activity pages.
- Made the official cybercrime-reporting site and 1930 helpline actionable links.
- Preserved all 25 routes, 24 learning activities, and the existing local-only privacy behavior.

See [FINAL_CHANGES.md](FINAL_CHANGES.md) for how the new elements work and how to change your links.

## What changed in version 1.1

- Replaced the **Tailwind CDN runtime script** with locally compiled Tailwind + PostCSS, suitable for deployment.
- Connected the previously unused **KnowledgeCheck** component to each activity, with 24 topic-specific questions.
- Fixed the misleading **Reveal Answer** completion behavior: revealing the answer no longer marks the activity complete.
- Added an accessible **reset-progress** control on the homepage, with confirmation.
- Improved mobile-menu accessibility (label, expanded state, Escape key, close on navigation).
- Improved navigation scroll behaviour and reduced-motion/anchor styling.
- Added a **Vercel SPA rewrite** so direct links and refreshes on `/activities/...` work.
- Clarified that the app **does store optional feedback and completed IDs in browser localStorage**, but does not send those notes to a server.
- Added dependency-free automated tests and audit notes.

See [FIXES_AND_REVIEW.md](FIXES_AND_REVIEW.md) for verified findings, limitations and manual test steps.

## Structure

```text
index.html                     Browser shell
src/main.jsx                  React and BrowserRouter mount
src/App.jsx                   Shared header/footer, routing and progress
src/pages/HomePage.jsx        Hero, search, filter, catalogue and progress reset
src/pages/ActivityPage.jsx    Per-route demo loading
src/components/               Navbar, cards, quiz and activity layout
src/data/activitiesData.js    24 activities and routes
src/data/knowledgeChecks.js   24 topic-specific learning checks
src/demos/DemosPart1.jsx      Activities 1–8
src/demos/DemosPart2.jsx      Activities 9–16
src/demos/DemosPart3.jsx      Activities 17–24
src/utils/progress.js         Safe progress normalization and updates
src/styles/main.css          Tailwind layers and custom design styles
vercel.json                   Single-page-app routing on Vercel
```

## Saving and privacy

- **Completed activities**: Saved under `cybersafe_cep_completed_ids` in the visitor's own browser.
- **Optional feedback note** (Activity 24): Saved under `cybersafe_cep_local_feedback` in the visitor's own browser.
- Neither feature sends data to a website backend, but **localStorage is persistent** on that device and should not be treated as secret storage.
- In the password demonstration, use **invented sample passwords only**. It is a teaching approximation, not a real security audit.

## Deployment

Import the source folder or GitHub repository into Vercel. Choose **Vite** (or let it auto-detect) and configure:

- Build command: `npm run build`
- Output directory: `dist`
- Root directory: `./`
- No API keys are required.

`vercel.json` provides SPA fallback for direct activity URLs. Check at least one `/activities/...` URL in an incognito window and refresh it after deployment.

## Before publishing this as college work

Run the build and browser checklist, verify the cyber-safety explanations against current official sources, and credit any third-party assets or educational sources you use. This repository is a **teaching prototype**, not an evidence report on actual community outreach or impact.

## Attribution / reuse

The project source includes third-party dependencies (React, React Router, Lucide, Vite and Tailwind CSS) under their own licenses. A public GitHub repository does not automatically grant others a license to redistribute this project. No separate project-wide open-source license has been selected.

