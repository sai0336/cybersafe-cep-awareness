import React from 'react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { ActivityIcon } from './IconMap';

const CATEGORY_STYLES = {
  'Account Security': 'bg-sky-50 text-sky-800 border border-sky-200',
  'Online Scams': 'bg-amber-50 text-amber-800 border border-amber-200',
  'Privacy': 'bg-teal-50 text-teal-800 border border-teal-200',
  'Device Safety': 'bg-indigo-50 text-indigo-800 border border-indigo-200',
  'Responsible Internet Use': 'bg-slate-100 text-slate-800 border border-slate-300'
};

export function ActivityCard({ activity, onNavigate, isCompleted }) {
  const badgeClass =
    CATEGORY_STYLES[activity.category] || 'bg-slate-100 text-slate-800 border border-slate-200';

  return (
    <article
      className="cep-card cep-card-hover p-5 flex flex-col justify-between h-full bg-white"
      aria-labelledby={`act-title-${activity.id}`}
    >
      <div>
        {/* Top Row: Activity Number Badge, Category, and Completion Check */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center justify-center px-2.5 py-1 rounded text-xs font-bold bg-slate-900 text-white tracking-wide">
              Activity {activity.number}
            </span>
            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeClass}`}>
              {activity.category}
            </span>
          </div>
          {isCompleted && (
            <span
              className="inline-flex items-center gap-1 text-xs font-semibold text-teal-700 bg-teal-50 border border-teal-200 px-2 py-0.5 rounded-full"
              title="Completed in this session"
            >
              <CheckCircle2 className="w-3.5 h-3.5" /> Done
            </span>
          )}
        </div>

        {/* Icon & Full Title */}
        <div className="flex items-start gap-3 mb-2.5">
          <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-teal-700 shrink-0 mt-0.5">
            <ActivityIcon name={activity.iconName} className="w-5 h-5" />
          </div>
          <h3
            id={`act-title-${activity.id}`}
            className="text-base font-bold text-slate-900 leading-snug"
          >
            <button
              type="button"
              onClick={() => onNavigate(activity.route)}
              className="text-left hover:text-teal-700 transition-colors focus:outline-none"
            >
              {activity.exactTitle}
            </button>
          </h3>
        </div>

        {/* One-Sentence Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {activity.oneSentenceDescription}
        </p>
      </div>

      {/* Bottom Row: Route Slug & Open Demo Link */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2 mt-auto">
        <code className="text-[11px] text-slate-400 font-mono truncate max-w-[170px]">
          {activity.route}
        </code>
        <button
          type="button"
          onClick={() => onNavigate(activity.route)}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal-700 hover:text-teal-900 bg-teal-50 hover:bg-teal-100 border border-teal-200 px-3 py-1.5 rounded transition-colors shrink-0"
        >
          <span>Open Demo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </article>
  );
}
