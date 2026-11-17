# CyberSafe — How the code works (beginner guide)

The project is a **React single-page application**. It has 25 page URLs, but the browser receives the same HTML shell and React decides which activity to show based on the current URL.

## When somebody opens the website

```text
index.html
  -> src/main.jsx     mounts <BrowserRouter><App/></BrowserRouter>
  -> src/App.jsx      shared Header / Routes / Footer / completion data
  -> HomePage.jsx     homepage on /
     OR ActivityPage.jsx on /activities/... route
          -> one of 24 demo components from DemosPart1/2/3
          -> StandardActivityLayout
          -> KnowledgeCheck
```

## Learn these React ideas

- **Components:** A function that returns JSX (`ActivityCard`, `Header`, `HomePage`).
- **Props:** Inputs that parent components pass to child components (`onNavigate`, `activity`).
- **State:** Data a component remembers and updates (`searchQuery`, `selectedCategory`, `completedIds`, current demo choices).
- **Events:** Button clicks invoke handlers that change state. React renders the latest state.
- **Routing:** `BrowserRouter` and `Routes` map URLs to components without reloading the entire website.
- **Persistence:** `localStorage` saves completion IDs and optional feedback locally. It is not a database or secure storage.

## Five easy experiments

1. Open `src/data/activitiesData.js`. Change an activity's `oneSentenceDescription` and observe the homepage card.
2. Open `src/pages/HomePage.jsx`. Type `phishing` into the search box; find the `.filter()` code that matches it.
3. Open `src/data/knowledgeChecks.js`. Rewrite one answer explanation in your own words, then test it in the browser.
4. Open `src/App.jsx`. Find `handleMarkComplete` and explain how it changes `completedIds` and triggers localStorage saving.
5. Open `src/styles/main.css`. Adjust `--teal-600` and see the site accent change; then inspect mobile widths.

## Commands

```bash
npm install
npm test
npm run dev
npm run build
npm run preview
```

**Rule for your GitHub portfolio:** You should be able to explain the route structure, React state, localStorage, simulated interactions and security disclaimer. Don't claim this app collects real cybersecurity incident data or sends feedback anywhere.
