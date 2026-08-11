import React, { useState } from 'react';
import { Course } from '../types';

interface CoursesViewProps {
  courses: Course[];
  initialSelectedCode?: string;
  onNavigateToTMA: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({
  courses,
  initialSelectedCode,
  onNavigateToTMA,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCourseId, setActiveCourseId] = useState<string>(
    initialSelectedCode
      ? courses.find((c) => c.code.toLowerCase() === initialSelectedCode.toLowerCase())?.id || courses[0]?.id
      : courses[0]?.id
  );
  const [readingModuleTitle, setReadingModuleTitle] = useState<string | null>(null);

  const activeCourse = courses.find((c) => c.id === activeCourseId) || courses[0];

  const filteredCourses = courses.filter(
    (c) =>
      c.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary font-bold">
            E-Courseware Repository
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            Access NOUN official study materials, module lectures, and course guides.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-on-surface-variant text-xl">
            search
          </span>
          <input
            type="text"
            placeholder="Search course code or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface border border-outline-variant text-on-surface text-xs rounded-xl pl-10 pr-4 py-2.5 font-medium focus:outline-hidden focus:ring-2 focus:ring-primary/40 shadow-xs"
          />
        </div>
      </div>

      {/* Main Content split: Left course list selector, Right Courseware Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course List Column */}
        <div className="space-y-3">
          <h3 className="font-title-md text-sm font-bold text-primary uppercase tracking-wider px-1">
            Enrolled Courses ({filteredCourses.length})
          </h3>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredCourses.map((course) => {
              const isSelected = course.id === activeCourseId;
              return (
                <button
                  key={course.id}
                  type="button"
                  onClick={() => setActiveCourseId(course.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 ${
                    isSelected
                      ? 'bg-primary-container text-white border-primary shadow-md'
                      : 'bg-surface text-on-surface border-outline-variant hover:bg-surface-container-high'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-md ${
                      isSelected ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-primary'
                    }`}>
                      {course.code}
                    </span>
                    <span className={`text-xs font-semibold ${isSelected ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}`}>
                      {course.units} Units
                    </span>
                  </div>

                  <h4 className="font-title-md text-sm font-bold leading-snug">
                    {course.title}
                  </h4>

                  {/* Progress Bar */}
                  <div className="mt-1 space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className={isSelected ? 'text-primary-fixed-dim' : 'text-on-surface-variant'}>
                        Course Completion
                      </span>
                      <span className="font-bold">{course.progressPercent}%</span>
                    </div>
                    <div className={`w-full h-1.5 rounded-full overflow-hidden ${isSelected ? 'bg-white/20' : 'bg-surface-container-highest'}`}>
                      <div
                        className={`h-full ${isSelected ? 'bg-secondary-container' : 'bg-primary'}`}
                        style={{ width: `${course.progressPercent}%` }}
                      />
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Course Detailed Material Reader View */}
        {activeCourse && (
          <div className="lg:col-span-2 bg-surface rounded-xl p-6 border border-outline-variant shadow-sm flex flex-col gap-6">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-4 border-b border-outline-variant">
              <div>
                <div className="flex items-center gap-2">
                  <span className="bg-primary-container text-on-primary-container text-xs font-bold px-3 py-1 rounded-md">
                    {activeCourse.code}
                  </span>
                  <span className="text-xs font-semibold text-on-surface-variant">
                    {activeCourse.units} Credit Units Course
                  </span>
                </div>
                <h2 className="font-headline-lg text-xl font-bold text-primary mt-2">
                  {activeCourse.title}
                </h2>
                <p className="text-xs text-on-surface-variant mt-1">
                  Facilitator: <strong className="text-primary">{activeCourse.facilitator}</strong> ({activeCourse.facilitatorEmail})
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Downloading official e-Courseware PDF for ${activeCourse.code}...`)}
                  className="bg-primary text-white hover:bg-primary-container px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span className="material-symbols-outlined text-base">download</span>
                  <span>Full Course PDF</span>
                </button>
              </div>
            </div>

            {/* Course Overview description */}
            <div className="bg-surface-container p-4 rounded-xl text-xs text-on-surface leading-relaxed border border-outline-variant/60">
              <h4 className="font-bold text-primary mb-1">Course Description & Learning Objectives:</h4>
              <p>{activeCourse.description}</p>
            </div>

            {/* Course Modules List */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-title-md text-base font-bold text-primary">
                  Study Modules ({activeCourse.modules.length})
                </h3>
                <button
                  type="button"
                  onClick={onNavigateToTMA}
                  className="text-xs font-bold text-secondary hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>Go to Course TMAs</span>
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>

              <div className="space-y-3">
                {activeCourse.modules.map((mod, idx) => (
                  <div
                    key={mod.id}
                    className="p-4 bg-surface-container-lowest rounded-xl border border-outline-variant hover:border-primary/40 transition-all flex flex-col gap-2"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-primary tracking-wider">
                          Unit {idx + 1}
                        </span>
                        <h4 className="font-title-md text-sm font-bold text-primary">
                          {mod.title}
                        </h4>
                      </div>
                      <span className="text-[11px] font-semibold text-on-surface-variant bg-surface-container px-2.5 py-0.5 rounded-full">
                        {mod.readTime}
                      </span>
                    </div>

                    <p className="text-xs text-on-surface-variant">{mod.description}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-outline-variant/30 text-xs">
                      <span className="text-on-surface-variant font-mono text-[11px]">
                        File Size: {mod.pdfSize}
                      </span>
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setReadingModuleTitle(mod.title)}
                          className="text-primary hover:bg-surface-container px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer text-xs flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">visibility</span>
                          <span>Read Online</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => alert(`Downloading ${mod.title} PDF...`)}
                          className="text-primary hover:bg-surface-container px-3 py-1 rounded-md font-semibold transition-colors cursor-pointer text-xs flex items-center gap-1"
                        >
                          <span className="material-symbols-outlined text-sm">download</span>
                          <span>Download</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Online Reader Modal */}
      {readingModuleTitle && (
        <div className="fixed inset-0 bg-primary/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-2xl rounded-2xl p-6 shadow-2xl border border-outline-variant max-h-[85vh] flex flex-col">
            <div className="flex justify-between items-center pb-4 border-b border-outline-variant">
              <div>
                <span className="text-xs font-bold text-secondary uppercase">e-Reader Mode</span>
                <h3 className="font-title-md text-base font-bold text-primary">{readingModuleTitle}</h3>
              </div>
              <button
                type="button"
                onClick={() => setReadingModuleTitle(null)}
                className="text-on-surface-variant hover:text-primary p-1 text-xl font-bold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="py-6 overflow-y-auto space-y-4 text-xs text-on-surface leading-relaxed">
              <p className="font-semibold text-primary">
                National Open University of Nigeria (NOUN) - Official Distance Learning Reading Text
              </p>
              <p>
                Distance learning requires structured, self-directed reading. This unit provides comprehensive learning concepts designed to guide the student through key principles and self-assessment exercises.
              </p>

              <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/60 my-4 space-y-2">
                <h4 className="font-bold text-primary">1.1 Core Principles & Framework</h4>
                <p>
                  In this module, students explore essential terminology, analytical methods, and problem-solving strategies required for academic mastery.
                </p>
              </div>

              <div className="p-4 bg-amber-50 border border-amber-200 rounded-xl text-amber-900 font-medium">
                <strong>Self-Assessment Exercise 1.1:</strong> Formulate a 2-sentence summary of the main concept and compare your notes with the TMA questions in your portal.
              </div>
            </div>

            <div className="pt-4 border-t border-outline-variant flex justify-end">
              <button
                type="button"
                onClick={() => setReadingModuleTitle(null)}
                className="bg-primary text-white px-6 py-2 rounded-lg text-xs font-bold hover:bg-primary-container cursor-pointer"
              >
                Close e-Reader
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
