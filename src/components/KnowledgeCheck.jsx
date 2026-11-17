import React, { useState, useEffect } from 'react';
import { HelpCircle, CheckCircle2, AlertCircle, RotateCcw } from 'lucide-react';

export function KnowledgeCheck({ activityId, knowledgeCheck, onComplete }) {
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [revealed, setRevealed] = useState(false);

  // Reset local state when switching to a different activity page
  useEffect(() => {
    setSelectedOption(null);
    setSubmitted(false);
    setRevealed(false);
  }, [activityId]);

  const handleSelect = (idx) => {
    setSelectedOption(idx);
    setSubmitted(true);
    setRevealed(false);
    if (idx === knowledgeCheck.correctIndex && onComplete) {
      onComplete(activityId);
    }
  };

  const isCorrect = selectedOption === knowledgeCheck.correctIndex;

  return (
    <section
      className="cep-card p-6 bg-white border-l-4 border-l-sky-600"
      aria-labelledby="knowledge-check-heading"
    >
      <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
        <div className="flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-sky-700" />
          <h2 id="knowledge-check-heading" className="text-lg font-bold text-slate-900 m-0">
            7. Short Knowledge Check
          </h2>
        </div>
        {submitted && (
          <button
            type="button"
            onClick={() => {
              setSelectedOption(null);
              setSubmitted(false);
              setRevealed(false);
            }}
            className="text-xs font-medium text-slate-600 hover:text-slate-900 inline-flex items-center gap-1 bg-slate-100 px-2.5 py-1 rounded"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Reset Question
          </button>
        )}
      </div>

      <p className="text-base font-semibold text-slate-800 mb-4">
        {knowledgeCheck.question}
      </p>

      <div className="space-y-2.5" role="group" aria-label="Answer options">
        {knowledgeCheck.options.map((option, idx) => {
          const isSelected = selectedOption === idx;
          const isRightAnswer = idx === knowledgeCheck.correctIndex;

          let optionStyle =
            'border-slate-300 bg-slate-50/70 hover:bg-slate-100 text-slate-800';
          if (submitted) {
            if (isRightAnswer) {
              optionStyle = 'border-emerald-500 bg-emerald-50 text-emerald-950 font-medium';
            } else if (isSelected && !isRightAnswer) {
              optionStyle = 'border-red-400 bg-red-50 text-red-900';
            }
          } else if (isSelected) {
            optionStyle = 'border-sky-600 bg-sky-50 text-sky-950 font-medium';
          }

          return (
            <button
              key={idx}
              type="button"
              aria-pressed={isSelected}
              onClick={() => handleSelect(idx)}
              className={`w-full text-left p-3.5 rounded-md border transition-colors flex items-start gap-3 ${optionStyle}`}
            >
              <span className="inline-flex items-center justify-center w-6 h-6 rounded-full border border-current text-xs font-bold shrink-0 mt-0.5">
                {String.fromCharCode(65 + idx)}
              </span>
              <span className="text-sm sm:text-base leading-snug flex-1">{option}</span>
              {submitted && isRightAnswer && (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              )}
              {submitted && isSelected && !isRightAnswer && (
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>

      {/* Section 8: Clear Explanation of the Correct Answer */}
      <div className="mt-5 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 m-0">
            8. Explanation of the Correct Answer
          </h3>
          {!submitted && (
            <button
              type="button"
              onClick={() => {
                setSelectedOption(null);
                setSubmitted(true);
                setRevealed(true);
              }}
              className="text-xs font-semibold text-sky-700 hover:text-sky-900 underline"
            >
              Reveal Answer & Explanation
            </button>
          )}
        </div>

        {submitted ? (
          <div
            className={`p-4 rounded-md border ${
              isCorrect
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : 'bg-amber-50 border-amber-200 text-amber-950'
            }`}
          >
            <p className="font-bold text-sm mb-1">
              {revealed
                ? `Answer revealed: Option ${String.fromCharCode(65 + knowledgeCheck.correctIndex)}.`
                : isCorrect
                  ? 'Correct Decision! Well spotted.'
                  : `Not quite. The safest answer is Option ${String.fromCharCode(
                      65 + knowledgeCheck.correctIndex
                    )}.`}
            </p>
            <p className="text-sm leading-relaxed m-0">{knowledgeCheck.explanation}</p>
          </div>
        ) : (
          <p className="text-xs text-slate-500 italic m-0">
            Select an option above (or click &ldquo;Reveal Answer &amp; Explanation&rdquo;) to view
            the detailed safety explanation.
          </p>
        )}
      </div>
    </section>
  );
}
