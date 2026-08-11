import React from 'react';
import { Course, TMAAssignment, StudentProfile } from '../types';
import { ActiveTab } from './SideNav';

interface DashboardViewProps {
  profile: StudentProfile;
  courses: Course[];
  tmas: TMAAssignment[];
  onNavigate: (tab: ActiveTab) => void;
  onSelectCourse: (courseCode: string) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  profile,
  courses,
  tmas,
  onNavigate,
  onSelectCourse,
}) => {
  const pendingUrgentTMAs = tmas.filter((t) => t.isUrgent && t.status === 'pending');
  const urgentCount = pendingUrgentTMAs.length;

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-8">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary font-bold tracking-tight">
            Student Dashboard
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-2">
            Welcome back, <span className="font-semibold text-primary">{profile.name}</span>. Here is your academic overview for the {profile.semester}.
          </p>
        </div>

        {/* CGPA Card (Desktop) */}
        <div className="hidden md:flex items-center gap-4 bg-surface p-4 rounded-xl shadow-sm border border-outline-variant hover:border-primary/30 transition-all">
          <div className="text-right">
            <p className="font-label-sm text-label-sm text-on-surface-variant">Current CGPA</p>
            <p className="font-headline-lg text-headline-lg text-primary font-bold">{profile.cgpa.toFixed(2)}</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-secondary-container flex items-center justify-center shadow-inner">
            <span className="material-symbols-outlined text-on-secondary-container fill text-2xl">
              workspace_premium
            </span>
          </div>
        </div>
      </div>

      {/* Pending TMAs Alert (High Priority) */}
      <div className="bg-error-container border border-error rounded-xl p-6 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-md">
        <div className="flex items-start gap-4">
          <span className="material-symbols-outlined text-error text-3xl shrink-0 mt-0.5">warning</span>
          <div>
            <h3 className="font-title-md text-title-md text-on-error-container font-semibold">
              Pending TMAs Alert
            </h3>
            <p className="font-body-md text-body-md text-on-error-container mt-1">
              {urgentCount > 0
                ? `You have ${urgentCount} Tutor-Marked Assignment${urgentCount > 1 ? 's' : ''} due within the next 48 hours.`
                : 'All urgent assignments submitted! Review upcoming TMAs and coursework.'}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onNavigate('tmas')}
          className="bg-error text-on-error px-6 py-3 rounded-lg font-label-sm text-label-sm hover:opacity-90 active:scale-95 transition-all whitespace-nowrap min-h-[44px] cursor-pointer font-semibold shadow-sm"
        >
          View Pending TMAs
        </button>
      </div>

      {/* Bento Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Quick Links (Span 1) */}
        <div className="bg-surface rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col gap-4">
          <h3 className="font-title-md text-title-md text-primary font-bold">Quick Links</h3>
          <div className="grid grid-cols-1 gap-3 flex-1">
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.99] min-h-[56px] text-left cursor-pointer border border-transparent hover:border-outline-variant/60"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">menu_book</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">E-Courseware</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward_ios</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('timetable')}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.99] min-h-[56px] text-left cursor-pointer border border-transparent hover:border-outline-variant/60"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">calendar_month</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Exam Timetable</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward_ios</span>
            </button>

            <button
              type="button"
              onClick={() => onNavigate('finance')}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.99] min-h-[56px] text-left cursor-pointer border border-transparent hover:border-outline-variant/60"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">payments</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Wallet & Fees</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward_ios</span>
            </button>

            {/* Added extra helpful NOUN portal links */}
            <button
              type="button"
              onClick={() => onNavigate('results')}
              className="flex items-center justify-between p-4 rounded-lg bg-surface-container hover:bg-surface-container-high transition-all active:scale-[0.99] min-h-[56px] text-left cursor-pointer border border-transparent hover:border-outline-variant/60"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-xl">grade</span>
                <span className="font-body-md text-body-md text-on-surface font-medium">Semester Results</span>
              </div>
              <span className="material-symbols-outlined text-on-surface-variant text-sm">arrow_forward_ios</span>
            </button>
          </div>
        </div>

        {/* Current Courses Progress (Span 2) */}
        <div className="md:col-span-2 bg-surface rounded-xl p-6 shadow-sm border border-outline-variant flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <h3 className="font-title-md text-title-md text-primary font-bold">Current Courses Overview</h3>
            <button
              type="button"
              onClick={() => onNavigate('courses')}
              className="text-primary hover:underline font-label-sm text-label-sm font-semibold cursor-pointer"
            >
              View All
            </button>
          </div>

          <div className="space-y-6">
            {courses.slice(0, 3).map((course) => {
              // Format TMA completion status line
              const completedCount = [course.tma1Completed, course.tma2Completed, course.tma3Completed].filter(Boolean).length;
              let tmaStatusText = 'No TMAs Completed';
              if (completedCount === 1) tmaStatusText = 'TMA 1 Completed';
              else if (completedCount === 2) tmaStatusText = 'TMA 1, 2 Completed';
              else if (completedCount === 3) tmaStatusText = 'All TMAs (1, 2, 3) Completed';

              return (
                <div 
                  key={course.id} 
                  className="flex flex-col gap-2 p-3 rounded-lg hover:bg-surface-container/50 transition-colors cursor-pointer group"
                  onClick={() => {
                    onSelectCourse(course.code);
                    onNavigate('courses');
                  }}
                >
                  <div className="flex justify-between items-end">
                    <div>
                      <h4 className="font-body-md text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                        {course.code}: {course.title}
                      </h4>
                      <p className="font-label-sm text-label-sm text-on-surface-variant">
                        {course.units} Units • {tmaStatusText}
                      </p>
                    </div>
                    <span className={`font-label-sm text-label-sm font-bold ${
                      course.progressPercent === 100 
                        ? 'text-green-600' 
                        : course.progressPercent > 50 
                        ? 'text-primary' 
                        : course.progressPercent > 0 
                        ? 'text-secondary font-bold' 
                        : 'text-on-surface-variant'
                    }`}>
                      {course.progressPercent}%
                    </span>
                  </div>
                  <div className="w-full bg-surface-container-highest h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        course.progressPercent === 100 
                          ? 'bg-green-600' 
                          : course.progressPercent > 50 
                          ? 'bg-primary' 
                          : 'bg-secondary'
                      }`}
                      style={{ width: `${course.progressPercent}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick Stats Footer */}
          <div className="mt-auto pt-4 border-t border-outline-variant/40 grid grid-cols-3 gap-2 text-center">
            <div className="p-2 bg-surface-container-low rounded-lg">
              <span className="block text-xs text-on-surface-variant">Total Courses</span>
              <span className="text-base font-bold text-primary">{courses.length}</span>
            </div>
            <div className="p-2 bg-surface-container-low rounded-lg">
              <span className="block text-xs text-on-surface-variant">Active TMAs</span>
              <span className="text-base font-bold text-secondary">{tmas.filter(t => t.status === 'pending').length}</span>
            </div>
            <div className="p-2 bg-surface-container-low rounded-lg">
              <span className="block text-xs text-on-surface-variant">Registered Units</span>
              <span className="text-base font-bold text-primary">{courses.reduce((acc, c) => acc + c.units, 0)} Units</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
