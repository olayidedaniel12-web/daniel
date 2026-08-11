import React, { useState } from 'react';
import { TMAAssignment } from '../types';

interface TMAsViewProps {
  tmas: TMAAssignment[];
  onTakeQuiz: (tma: TMAAssignment) => void;
}

export const TMAsView: React.FC<TMAsViewProps> = ({ tmas, onTakeQuiz }) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'graded'>('all');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');

  const filteredTMAs = tmas.filter((item) => {
    if (filter === 'pending' && item.status !== 'pending') return false;
    if (filter === 'graded' && item.status === 'pending') return false;
    if (selectedCourse !== 'all' && item.courseCode !== selectedCourse) return false;
    return true;
  });

  const courseCodes = Array.from(new Set(tmas.map((t) => t.courseCode)));

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Title Header */}
      <div>
        <h1 className="font-display-lg text-display-lg text-primary font-bold">
          Tutor-Marked Assignments (TMAs)
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Complete your online continuous assessment tests (30% total grade weight).
        </p>
      </div>

      {/* Info Alert Banner */}
      <div className="p-4 bg-surface-container border border-outline-variant rounded-xl flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-xl mt-0.5">info</span>
        <div className="text-xs text-on-surface leading-relaxed">
          <strong className="text-primary font-bold">NOUN Continuous Assessment Rule:</strong> Each course has 3 TMAs (TMA 1, TMA 2, TMA 3) worth 10 marks each. High score on all TMAs maximizes your continuous assessment before the end-of-semester e-exams.
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center bg-surface p-4 rounded-xl border border-outline-variant shadow-xs">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-xl">
          <button
            type="button"
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'all'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All TMAs ({tmas.length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'pending'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Pending ({tmas.filter((t) => t.status === 'pending').length})
          </button>
          <button
            type="button"
            onClick={() => setFilter('graded')}
            className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
              filter === 'graded'
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            Completed ({tmas.filter((t) => t.status !== 'pending').length})
          </button>
        </div>

        {/* Course Code Dropdown */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <label className="text-xs font-semibold text-on-surface-variant whitespace-nowrap">
            Filter Course:
          </label>
          <select
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
            className="bg-surface-container-lowest border border-outline-variant text-on-surface text-xs rounded-lg px-3 py-2 font-semibold focus:outline-hidden focus:ring-2 focus:ring-primary/40 w-full sm:w-40"
          >
            <option value="all">All Courses</option>
            {courseCodes.map((code) => (
              <option key={code} value={code}>
                {code}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* TMA List Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTMAs.map((tma) => {
          const isPending = tma.status === 'pending';
          return (
            <div
              key={tma.id}
              className={`bg-surface rounded-xl p-5 border shadow-xs transition-all flex flex-col justify-between gap-4 ${
                tma.isUrgent && isPending
                  ? 'border-error/60 bg-error-container/20 ring-1 ring-error/30'
                  : 'border-outline-variant hover:border-primary/40'
              }`}
            >
              <div>
                <div className="flex justify-between items-start gap-2">
                  <span className="bg-primary-container text-on-primary-container text-xs font-bold px-2.5 py-1 rounded-md">
                    {tma.courseCode}
                  </span>
                  {isPending ? (
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 ${
                        tma.isUrgent
                          ? 'bg-error text-on-error animate-pulse'
                          : 'bg-amber-100 text-amber-800'
                      }`}
                    >
                      <span className="material-symbols-outlined text-xs">schedule</span>
                      {tma.dueDate}
                    </span>
                  ) : (
                    <span className="bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-xs">check_circle</span>
                      Graded ({tma.score}/10)
                    </span>
                  )}
                </div>

                <h3 className="font-title-md text-base font-bold text-primary mt-3">
                  {tma.courseTitle}
                </h3>
                <p className="text-xs text-on-surface-variant font-medium mt-1">
                  Assessment Level: <span className="font-bold text-primary">TMA {tma.tmaNumber}</span>
                </p>
              </div>

              <div className="pt-3 border-t border-outline-variant/40 flex items-center justify-between">
                <div className="text-xs text-on-surface-variant">
                  {isPending ? (
                    <span>{tma.questions.length || 10} Questions • Timed Test</span>
                  ) : (
                    <span className="text-green-700 font-semibold">
                      Recorded Score: {tma.score} / 10 Marks
                    </span>
                  )}
                </div>

                {isPending ? (
                  <button
                    type="button"
                    onClick={() => onTakeQuiz(tma)}
                    className="bg-primary hover:bg-primary-container text-white px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 shadow-xs active:scale-95"
                  >
                    <span>Take TMA</span>
                    <span className="material-symbols-outlined text-sm">edit_note</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => alert(`TMA ${tma.tmaNumber} for ${tma.courseCode} has been completed and graded ${tma.score}/10.`)}
                    className="bg-surface-container text-primary hover:bg-surface-container-high px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                  >
                    View Record
                  </button>
                )}
              </div>
            </div>
          );
        })}

        {filteredTMAs.length === 0 && (
          <div className="col-span-full py-12 text-center bg-surface rounded-xl border border-dashed border-outline-variant p-8">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">
              assignment_turned_in
            </span>
            <p className="font-title-md text-base text-primary font-bold">No assignments found</p>
            <p className="text-xs text-on-surface-variant mt-1">
              There are no TMAs matching your selected filter.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
