import React, { useState } from 'react';
import { Search, Compass, PlayCircle, X } from 'lucide-react';
import { ACTIVITIES_DATA, CATEGORIES } from '../data/activitiesData';
import { ActivityCard } from '../components/ActivityCard';

export function HomePage({ onNavigate, completedIds = [], onResetProgress }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const scrollToActivities = () => {
    const el = document.getElementById('activities-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const filteredActivities = ACTIVITIES_DATA.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const q = searchQuery.trim().toLowerCase();
    if (!q) return matchesCategory;
    const hay = `${act.number} ${act.exactTitle} ${act.oneSentenceDescription} ${act.category}`.toLowerCase();
    return matchesCategory && hay.includes(q);
  });

  return (
    <main className="space-y-8 pb-8">
      {/* Simple Clean Hero Section */}
      <section className="bg-slate-900 text-white border-b border-slate-800 py-10">
        <div className="cep-container max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-teal-400 mb-2">
            Community Engagement Project (CEP)
          </p>
          <h1 className="text-2xl sm:text-4xl font-bold text-white m-0">
            Cyber Security Awareness
          </h1>
          <p className="text-base sm:text-lg text-slate-200 mt-2 mb-0">
            Learn to recognize online threats, protect your information, and use digital services
            safely.
          </p>
          <p className="text-sm text-slate-300 mt-3 mb-0 leading-relaxed max-w-2xl">
            Click any of the 24 activities below to try an interactive demonstration. You can test
            different choices, see what happens right away, and learn the safe way to protect
            yourself online.
          </p>

          <div className="pt-5 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={scrollToActivities}
              className="cep-btn-teal text-sm py-2.5 px-5"
            >
              <Compass className="w-4 h-4" />
              <span>Explore Activities</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigate('/activities/strong-passwords')}
              className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-600 font-semibold text-sm py-2.5 px-4 rounded-md inline-flex items-center gap-2"
            >
              <PlayCircle className="w-4 h-4 text-teal-400" />
              <span>Try Strong Password Demo (Act 03)</span>
            </button>
          </div>
          <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-300">
            <span>Designed &amp; developed by <strong className="text-white">Sai Chavan</strong></span>
            <a href="https://github.com/sai0336" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal-300" aria-label="Sai Chavan's GitHub profile (opens in a new tab)">GitHub ↗</a>
            <a href="https://www.linkedin.com/in/sai-santosh-chavan/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-teal-300" aria-label="Sai Chavan's LinkedIn profile (opens in a new tab)">LinkedIn ↗</a>
          </div>
        </div>
      </section>

      {/* Search, Category Filters & 24 Activity Cards */}
      <section id="activities-section" className="cep-container space-y-5">
        <div className="cep-card p-4 sm:p-5 bg-white space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 m-0">
              All 24 Interactive Activities ({filteredActivities.length})
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-semibold text-teal-800" role="status" aria-live="polite">
                {completedIds.length} of 24 completed
              </span>
              {completedIds.length > 0 && (
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm('Clear all locally saved CyberSafe activity progress?')) onResetProgress?.();
                  }}
                  className="text-xs text-slate-600 underline hover:text-slate-900"
                >
                  Reset progress
                </button>
              )}
            </div>
            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search activities (e.g. password, UPI)..."
                aria-label="Search activities"
                className="w-full bg-slate-50 border border-slate-300 rounded-md pl-9 pr-8 py-2 text-sm text-slate-900 focus:border-teal-600 focus:bg-white focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setSelectedCategory(category)}
                aria-pressed={selectedCategory === category}
                className={`px-3 py-1.5 rounded text-xs font-semibold border ${
                  selectedCategory === category
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredActivities.map((activity) => (
              <ActivityCard
                key={activity.id}
                activity={activity}
                onNavigate={onNavigate}
                isCompleted={completedIds.includes(activity.id)}
              />
            ))}
          </div>
        ) : (
          <div className="cep-card p-8 text-center bg-white space-y-3">
            <p className="text-sm text-slate-600 m-0">
              No activities matched your search.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="cep-btn-secondary text-xs"
            >
              Show All 24 Activities
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
