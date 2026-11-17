import React from 'react';
import { ShieldCheck, BookOpen, Lock, Github, Linkedin, ExternalLink } from 'lucide-react';
import { ACTIVITIES_DATA } from '../data/activitiesData';

// Centralised links: edit only here if the developer's profiles change.
const developerLinks = [
  { name: 'GitHub', href: 'https://github.com/sai0336', Icon: Github },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/sai-santosh-chavan/', Icon: Linkedin },
];

export function Footer({ onNavigate }) {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 mt-16 no-print">
      <div className="cep-container py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Project identity, not a claim of official affiliation. */}
          <div>
            <div className="flex items-center gap-2 text-white font-bold text-base mb-2.5">
              <span className="w-7 h-7 rounded bg-teal-600 flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" aria-hidden="true" />
              </span>
              <span>CyberSafe | Awareness Project</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              A student-built, interactive educational demonstration for the college{' '}
              <strong className="text-slate-200">Community Engagement Project (CEP)</strong> on{' '}
              <em>Cyber Security Awareness</em>. Explore safe online habits through fictional scenarios.
            </p>
            <p className="text-xs text-slate-400 leading-relaxed mt-3">
              Independent educational project. Not an official cybercrime reporting service.
            </p>
          </div>

          {/* Common destinations inside the site. */}
          <nav aria-label="Footer activity navigation">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-teal-400" aria-hidden="true" /> Explore Activities
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                ['All 24 Activities', '/'],
                ['Cyber Security Basics', '/activities/introduction-to-cyber-security'],
                ['Strong Passwords', '/activities/strong-passwords'],
                ['UPI & Digital Payments', '/activities/safe-upi-and-digital-payments'],
                ['Family & Senior Safety', '/activities/cyber-safety-for-families-and-seniors'],
                ['Final Knowledge Review', '/activities/knowledge-review-and-feedback'],
              ].map(([label, path]) => (
                <li key={path}>
                  <button
                    type="button"
                    onClick={() => onNavigate(path)}
                    className="text-left text-slate-300 hover:text-teal-300 transition-colors focus-visible:outline-offset-4"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Official emergency resource and honest local-only privacy disclosure. */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-teal-400" aria-hidden="true" /> Safety & Privacy
            </h3>
            <div className="bg-slate-800/80 border border-slate-700 rounded-md p-3.5 text-xs text-slate-300 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white">Local educational simulations:</strong> Practice
                screens for OTPs, payments, messages and account settings do not contact real services.
              </p>
              <p>
                Never enter real passwords, OTPs or PINs. Completed activities and optional feedback
                are stored only in this browser (localStorage), not transmitted to our server.
              </p>
              <p className="text-teal-200 font-medium">
                Cyber fraud in India? Call{' '}
                <a className="underline underline-offset-2 hover:text-white" href="tel:1930" aria-label="Call India's national cyber crime helpline at 1930">1930</a>{' '}
                or visit{' '}
                <a className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-white" href="https://cybercrime.gov.in/" target="_blank" rel="noopener noreferrer">
                  cybercrime.gov.in <ExternalLink className="w-3 h-3" aria-hidden="true" />
                </a>.
              </p>
            </div>
          </div>

          {/* Real profile links, explicitly distinct from a not-yet-created project repository. */}
          <div>
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider mb-3">
              About the Developer
            </h3>
            <p className="text-white font-semibold">Sai Chavan</p>
            <p className="text-xs text-slate-400 mt-1 leading-relaxed">
              Software & Embedded Systems Developer
            </p>
            <p className="text-xs text-slate-400 mt-3 mb-4 leading-relaxed">
              Built for cyber-safety education and hands-on front-end learning.
            </p>
            <div className="flex flex-col items-start gap-2.5">
              {developerLinks.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-slate-100 hover:text-teal-300 transition-colors rounded-sm"
                  aria-label={`Visit Sai Chavan on ${name} (opens in a new tab)`}
                >
                  <Icon className="w-4 h-4 text-teal-400" aria-hidden="true" />
                  <span>{name}</span>
                  <ExternalLink className="w-3 h-3 text-slate-400" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <p className="m-0">
            © {year} Sai Chavan. CyberSafe Awareness Project. All rights reserved.
          </p>
          <p className="m-0">
            {ACTIVITIES_DATA.length} interactive activities · Educational demo · Third-party names belong to their owners.
          </p>
        </div>
      </div>
    </footer>
  );
}
