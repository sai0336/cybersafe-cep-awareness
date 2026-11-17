import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ACTIVITIES_DATA } from './data/activitiesData';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { normalizeCompletedIds, addCompletedId } from './utils/progress';
import { HomePage } from './pages/HomePage';
import { ActivityPage } from './pages/ActivityPage';

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const validIds = ACTIVITIES_DATA.map((item) => item.id);
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const raw = window.localStorage.getItem('cybersafe_cep_completed_ids');
      return normalizeCompletedIds(raw ? JSON.parse(raw) : [], validIds);
    } catch {
      // Some browsers block localStorage; the site still works without it.
      return [];
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem('cybersafe_cep_completed_ids', JSON.stringify(completedIds));
    } catch {
      // Progress works for the current session if storage is unavailable.
    }
  }, [completedIds]);

  useEffect(() => {
    // Keep the tab title meaningful when someone opens or shares an activity link.
    const activity = ACTIVITIES_DATA.find((item) => item.route === location.pathname);
    document.title = activity
      ? `${activity.shortTitle} | CyberSafe Awareness Project`
      : location.pathname === '/'
        ? 'CyberSafe | Cyber Security Awareness — Student CEP Project'
        : 'Page not found | CyberSafe Awareness Project';
    // Scroll to the start of each activity on navigation, including back/forward.
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleNavigate = (path) => navigate(path);

  const handleMarkComplete = (id) => {
    setCompletedIds((previous) => addCompletedId(previous, id, validIds));
  };

  const handleResetProgress = () => setCompletedIds([]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        currentPath={location.pathname}
        onNavigate={handleNavigate}
        completedIds={completedIds}
      />

      <div className="flex-1">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onNavigate={handleNavigate}
                completedIds={completedIds}
                onResetProgress={handleResetProgress}
              />
            }
          />
          {ACTIVITIES_DATA.map((act) => (
            <Route
              key={act.id}
              path={act.route}
              element={
                <ActivityPage
                  routePath={act.route}
                  onNavigate={handleNavigate}
                  completedIds={completedIds}
                  onMarkComplete={handleMarkComplete}
                />
              }
            />
          ))}
          <Route
            path="*"
            element={
              <ActivityPage
                routePath={location.pathname}
                onNavigate={handleNavigate}
                completedIds={completedIds}
                onMarkComplete={handleMarkComplete}
              />
            }
          />
        </Routes>
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
