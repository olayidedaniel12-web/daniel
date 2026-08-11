import React, { useState } from 'react';
import { SemesterResult, StudentProfile } from '../types';

interface ResultsViewProps {
  profile: StudentProfile;
  results: SemesterResult[];
}

export const ResultsView: React.FC<ResultsViewProps> = ({ profile, results }) => {
  const [selectedSemesterIndex, setSelectedSemesterIndex] = useState<number>(0);

  const activeSemesterResult = results[selectedSemesterIndex] || results[0];

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary font-bold">
            Semester Academic Results
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Official Cumulative Grade Point Average (CGPA) & Course Grades Transcript.
          </p>
        </div>

        <button
          type="button"
          onClick={() => window.print()}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-base">print</span>
          <span>Download Statement of Results</span>
        </button>
      </div>

      {/* CGPA Stat Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-surface rounded-xl p-5 border border-outline-variant shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Cumulative CGPA</span>
          <div className="text-3xl font-extrabold text-primary font-mono mt-1">
            {profile.cgpa.toFixed(2)}
          </div>
          <span className="text-[11px] text-green-700 font-semibold mt-1 block">
            ● First Class Honors Division
          </span>
        </div>

        <div className="bg-surface rounded-xl p-5 border border-outline-variant shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Total Credit Units Earned</span>
          <div className="text-3xl font-extrabold text-primary font-mono mt-1">
            28 Units
          </div>
          <span className="text-[11px] text-on-surface-variant mt-1 block">
            Across 2 Completed Semesters
          </span>
        </div>

        <div className="bg-surface rounded-xl p-5 border border-outline-variant shadow-xs">
          <span className="text-xs text-on-surface-variant font-medium">Academic Status</span>
          <div className="text-3xl font-extrabold text-green-700 mt-1">
            GOOD
          </div>
          <span className="text-[11px] text-on-surface-variant mt-1 block">
            In Good Academic Standing
          </span>
        </div>
      </div>

      {/* Semester Selector Tabs */}
      <div className="flex items-center gap-2 bg-surface p-2 rounded-xl border border-outline-variant">
        {results.map((res, index) => (
          <button
            key={res.semester}
            type="button"
            onClick={() => setSelectedSemesterIndex(index)}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
              selectedSemesterIndex === index
                ? 'bg-primary text-white shadow-xs'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            {res.semester}
          </button>
        ))}
      </div>

      {/* Course Grades Breakdown Table */}
      <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-title-md text-base font-bold text-primary">
            {activeSemesterResult.semester} Course Grades
          </h3>
          <span className="text-xs font-mono font-bold text-primary bg-surface-container px-3 py-1 rounded-full">
            Semester GPA: {activeSemesterResult.gpa.toFixed(2)}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-primary font-bold">
                <th className="p-3">Course Code & Title</th>
                <th className="p-3">Units</th>
                <th className="p-3">TMA Score (30%)</th>
                <th className="p-3">Exam Score (70%)</th>
                <th className="p-3">Total Score (100%)</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-on-surface font-medium">
              {activeSemesterResult.courses.map((c) => (
                <tr key={c.code} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3">
                    <strong className="text-primary mr-2">{c.code}</strong>
                    <span>{c.title}</span>
                  </td>
                  <td className="p-3 font-mono font-bold">{c.units}</td>
                  <td className="p-3 font-mono">{c.tmaScore} / 30</td>
                  <td className="p-3 font-mono">{c.examScore} / 70</td>
                  <td className="p-3 font-mono font-bold text-primary">{c.totalScore}</td>
                  <td className="p-3">
                    <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                      c.grade === 'A' ? 'bg-green-100 text-green-800' :
                      c.grade === 'B' ? 'bg-blue-100 text-blue-800' :
                      'bg-amber-100 text-amber-800'
                    }`}>
                      {c.grade}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
