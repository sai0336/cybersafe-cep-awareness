import React, { useEffect, useState } from 'react';
import { ShieldCheck, Menu, X, Home } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/activitiesData';

export function Header({ currentPath, onNavigate, completedIds = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => { setMobileMenuOpen(false); }, [currentPath]);
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onEscape = (event) => { if (event.key === 'Escape') setMobileMenuOpen(false); };
    document.addEventListener('keydown', onEscape);
    return () => document.removeEventListener('keydown', onEscape);
  }, [mobileMenuOpen]);

  const handleSelectJump = (e) => {
    const targetRoute = e.target.value;
    if (targetRoute) {
      onNavigate(targetRoute);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 no-print">
      <div className="cep-container py-3 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => onNavigate('/')}
          className="flex items-center gap-2.5 text-left focus:outline-none"
        >
          <span className="w-8 h-8 rounded bg-teal-600 flex items-center justify-center text-white shrink-0">
            <ShieldCheck className="w-5 h-5" />
          </span>
          <div>
            <span className="font-bold text-base sm:text-lg text-white block leading-none">
              CyberSafe <span className="font-normal text-slate-400">|</span>{' '}
              <span className="text-teal-400 font-semibold">Awareness Project</span>
            </span>
          </div>
        </button>

        {/* Simple Top Navigation */}
        <nav className="hidden md:flex items-center gap-3" aria-label="Main Navigation">
          <button
            type="button"
            onClick={() => onNavigate('/')}
            className={`px-3 py-1.5 rounded text-sm font-medium flex items-center gap-1.5 ${
              currentPath === '/'
                ? 'bg-teal-600 text-white'
                : 'text-slate-200 hover:bg-slate-800'
            }`}
          >
            <Home className="w-4 h-4" />
            Home
          </button>

          <select
            aria-label="Go to any activity page"
            value={currentPath}
            onChange={handleSelectJump}
            className="bg-slate-800 text-slate-100 text-sm rounded border border-slate-700 px-3 py-1.5 focus:border-teal-400 focus:outline-none max-w-xs"
          >
            <option value="/">Home — All 24 Activities</option>
            {ACTIVITIES_DATA.map((act) => (
              <option key={act.id} value={act.route}>
                {act.exactTitle}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1.5 rounded">
            Completed: <strong>{completedIds.length}/24</strong>
          </span>
        </nav>

        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded bg-slate-800 text-slate-200"
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
          aria-controls="cybersafe-mobile-menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {mobileMenuOpen && (
        <nav id="cybersafe-mobile-menu" aria-label="Mobile navigation" className="md:hidden bg-slate-900 border-t border-slate-800 px-4 py-3 space-y-2.5">
          <button
            type="button"
            onClick={() => {
              onNavigate('/');
              setMobileMenuOpen(false);
            }}
            className="text-sm font-medium text-white flex items-center gap-2 py-1"
          >
            <Home className="w-4 h-4 text-teal-400" /> Home (All 24 Activities)
          </button>
          <label className="block text-xs text-slate-300" htmlFor="mobile-page-select">Choose an activity</label>
          <select
            id="mobile-page-select"
            value={currentPath}
            onChange={handleSelectJump}
            className="w-full bg-slate-800 text-white text-sm rounded border border-slate-700 p-2"
          >
            <option value="/">Home — All 24 Activities</option>
            {ACTIVITIES_DATA.map((act) => (
              <option key={act.id} value={act.route}>
                {act.exactTitle}
              </option>
            ))}
          </select>
        </nav>
      )}
    </header>
  );
}
