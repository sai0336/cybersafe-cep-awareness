# CyberSafe — Final Personalisation Notes (v1.2)

## What you asked for

This is the previous CyberSafe CEP website, updated with **Sai Chavan** as the credited developer, live GitHub and LinkedIn profile links, automatic copyright text and a few publishing refinements. The website still has **25 routes** (homepage + 24 activities) and its original quizzes, demos, filtering and local progress features.

## What changed and where

| File | Purpose |
| --- | --- |
| `src/components/Footer.jsx` | Shows developer name, GitHub + LinkedIn, copyright and cyber safety notice on **every page**. |
| `src/pages/HomePage.jsx` | Shows a subtle developer-credit line below the hero buttons. |
| `src/App.jsx` | Updates the browser tab title for each activity route. |
| `index.html` | Adds website author and sharing metadata, and references the favicon. |
| `public/favicon.svg` | Original small shield icon shown in browser tabs. |
| `README.md` | Documents author, links, setup, privacy, deployment and attribution. |

## Your profile links

- GitHub: https://github.com/sai0336
- LinkedIn: https://www.linkedin.com/in/sai-santosh-chavan/

The CyberSafe project repository itself has **not been created**. The GitHub link is correctly labelled as your personal GitHub profile, not as an existing CyberSafe repo.

### How to change these later

1. Open `src/components/Footer.jsx` and find `developerLinks` near the top.
2. Change the `href` value for GitHub or LinkedIn.
3. If you change them, also update the links in `src/pages/HomePage.jsx` and `README.md`.
4. Save and run `npm run dev`. Click the links to verify they open the right profiles.

### Copyright

The footer uses this JavaScript statement:

```js
const year = new Date().getFullYear();
```

When rendered, it displays **© {current year} Sai Chavan. CyberSafe Awareness Project. All rights reserved.** You don't need to edit the year each January.

The copyright notice applies to project material to the extent applicable law permits; names, logos and open-source libraries owned by others remain theirs. Don't represent the site as an official cybercrime authority.

## How to run the final version

Extract the ZIP into a folder. **The `package.json` file is directly inside the extracted project root** to avoid the earlier `ENOENT` wrong-folder error.

Open that folder in VS Code and run:

```powershell
npm install
npm test
npm run dev
```

The browser URL is usually `http://localhost:5173`. When everything looks right, run:

```powershell
npm run build
npm run preview
```

The production version is generated in the `dist` folder. Upload the source project to GitHub, then import it into Vercel (framework Vite, build `npm run build`, output `dist`).

## Manual final checklist

- [ ] Homepage opens and the developer credit appears below the buttons.
- [ ] GitHub opens `github.com/sai0336` in a new tab.
- [ ] LinkedIn opens `linkedin.com/in/sai-santosh-chavan/` in a new tab.
- [ ] Footer copyright shows the current year on all 25 pages.
- [ ] All 24 activity pages load when directly opened and refreshed.
- [ ] Course filters, knowledge checks, progress tracking and reset work.
- [ ] A small phone viewport shows 4 footer columns stacked appropriately.
- [ ] `npm run build` succeeds.
- [ ] Feedback and progress never send to a backend; they remain in localStorage.

## Portfolio wording

Use a truthful description like: **CyberSafe — a 25-page educational cyber-security awareness website developed as a college Community Engagement Project (CEP), featuring 24 interactive learning activities and local progress tracking.**

Don't claim it is a real financial-safety scanner, official cybercrime reporting service, or a finished client product.
