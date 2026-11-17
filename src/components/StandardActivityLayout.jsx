import React, { useState, useEffect } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Home } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/activitiesData';
import { ActivityIcon } from './IconMap';
import { KnowledgeCheck } from './KnowledgeCheck';
import { KNOWLEDGE_CHECKS } from '../data/knowledgeChecks';

export function StandardActivityLayout({
  activity,
  onNavigate,
  onMarkComplete,
  children
}) {
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    setResetKey((k) => k + 1);
  }, [activity.id]);

  const currentIndex = ACTIVITIES_DATA.findIndex((a) => a.id === activity.id);
  const prevActivity = currentIndex > 0 ? ACTIVITIES_DATA[currentIndex - 1] : null;
  const nextActivity =
    currentIndex < ACTIVITIES_DATA.length - 1 ? ACTIVITIES_DATA[currentIndex + 1] : null;

  const handleRestart = () => {
    setResetKey((k) => k + 1);
  };

  return (
    <main className="cep-container py-6 max-w-4xl mx-auto space-y-5">
      {/* Simple Navigation Bar: Home, Previous, Next, Restart */}
      <div className="flex flex-wrap items-center justify-between gap-2 no-print">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="cep-btn-secondary text-xs sm:text-sm py-1.5 px-3"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>

          {prevActivity && (
            <button
              type="button"
              onClick={() => onNavigate(prevActivity.route)}
              className="cep-btn-secondary text-xs sm:text-sm py-1.5 px-3"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
          )}

          {nextActivity && (
            <button
              type="button"
              onClick={() => onNavigate(nextActivity.route)}
              className="cep-btn-secondary text-xs sm:text-sm py-1.5 px-3"
            >
              <span>Next</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>

        <button
          type="button"
          onClick={handleRestart}
          className="cep-btn-secondary text-xs sm:text-sm py-1.5 px-3"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Restart</span>
        </button>
      </div>

      {/* 1. Activity Title & 2. One Short Explanation of the Problem */}
      <section className="cep-card p-5 sm:p-6 bg-white">
        <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
          <span className="font-bold text-teal-700 uppercase">{activity.category}</span>
          <span>•</span>
          <code>{activity.route}</code>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
            <ActivityIcon name={activity.iconName} className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 m-0">
              {activity.exactTitle}
            </h1>
            <p className="text-sm sm:text-base text-slate-700 mt-2 mb-0 leading-relaxed">
              {activity.introduction}
            </p>
          </div>
        </div>
      </section>

      {/* 3–7. Working Interactive Demo, Changing Result, Explanation, Safe Solution & Restart */}
      <div key={resetKey} className="space-y-5">
        <section className="cep-card p-5 sm:p-6 bg-white">
          {React.isValidElement(children)
            ? React.cloneElement(children, { onRestart: handleRestart })
            : children}
        </section>
        <KnowledgeCheck
          activityId={activity.id}
          knowledgeCheck={KNOWLEDGE_CHECKS[activity.id]}
          onComplete={() => onMarkComplete?.(activity.id)}
        />
      </div>

      {/* Bottom Simple Navigation: Previous, Home, Restart, Next */}
      <nav
        className="cep-card p-4 bg-white flex flex-wrap items-center justify-between gap-2 no-print"
        aria-label="Page Navigation"
      >
        <div className="flex items-center gap-2">
          {prevActivity ? (
            <button
              type="button"
              onClick={() => onNavigate(prevActivity.route)}
              className="cep-btn-secondary text-xs sm:text-sm py-2 px-3.5"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous: Act {prevActivity.number}</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="cep-btn-secondary text-xs sm:text-sm py-2 px-3.5"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          )}
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className="cep-btn-secondary text-xs sm:text-sm py-2 px-3.5"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </button>
          <button
            type="button"
            onClick={handleRestart}
            className="cep-btn-secondary text-xs sm:text-sm py-2 px-3.5"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Restart</span>
          </button>
        </div>

        <div>
          {nextActivity ? (
            <button
              type="button"
              onClick={() => onNavigate(nextActivity.route)}
              className="cep-btn-primary text-xs sm:text-sm py-2 px-4"
            >
              <span>Next: Act {nextActivity.number}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => onNavigate('/')}
              className="cep-btn-teal text-xs sm:text-sm py-2 px-4"
            >
              <span>Back to Home</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          )}
        </div>
      </nav>
    </main>
  );
}
