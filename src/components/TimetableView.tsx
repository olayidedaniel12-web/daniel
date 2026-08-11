import React, { useState } from 'react';
import { ExamSchedule, StudentProfile } from '../types';

interface TimetableViewProps {
  profile: StudentProfile;
  schedule: ExamSchedule[];
}

export const TimetableView: React.FC<TimetableViewProps> = ({ profile, schedule }) => {
  const [filterSession, setFilterSession] = useState<'all' | 'Morning' | 'Afternoon'>('all');
  const [showSlipModal, setShowSlipModal] = useState<boolean>(false);

  const filteredSchedule = schedule.filter((item) => {
    if (filterSession !== 'all' && item.session !== filterSession) return false;
    return true;
  });

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display-lg text-display-lg text-primary font-bold">
            E-Exam Timetable & Seat Allocation
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
            2023_2 Semester Final Electronic Examination Schedule.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowSlipModal(true)}
          className="bg-primary hover:bg-primary-container text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
        >
          <span className="material-symbols-outlined text-base">badge</span>
          <span>Print Exam Clearance Slip</span>
        </button>
      </div>

      {/* Info Notice */}
      <div className="bg-surface-container p-4 rounded-xl border border-outline-variant/60 flex items-start gap-3">
        <span className="material-symbols-outlined text-primary text-xl">info</span>
        <p className="text-xs text-on-surface leading-relaxed">
          <strong>Important NOUN Examination Policy:</strong> Students must arrive at their assigned study centre e-Exam lab 30 minutes prior to session start with their laminated Student ID Card and printed Examination Clearance Slip.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="flex items-center justify-between bg-surface p-4 rounded-xl border border-outline-variant shadow-xs">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-primary">Filter Session:</span>
          <div className="flex items-center gap-1 bg-surface-container-high p-1 rounded-lg text-xs">
            <button
              type="button"
              onClick={() => setFilterSession('all')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                filterSession === 'all' ? 'bg-primary text-white' : 'text-on-surface-variant'
              }`}
            >
              All Sessions
            </button>
            <button
              type="button"
              onClick={() => setFilterSession('Morning')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                filterSession === 'Morning' ? 'bg-primary text-white' : 'text-on-surface-variant'
              }`}
            >
              Morning (08:30 - 12:00)
            </button>
            <button
              type="button"
              onClick={() => setFilterSession('Afternoon')}
              className={`px-3 py-1.5 rounded-md font-semibold transition-all cursor-pointer ${
                filterSession === 'Afternoon' ? 'bg-primary text-white' : 'text-on-surface-variant'
              }`}
            >
              Afternoon (01:00 - 05:00)
            </button>
          </div>
        </div>

        <span className="text-xs font-semibold text-on-surface-variant hidden sm:inline">
          Study Centre: <strong>{profile.studyCentre}</strong>
        </span>
      </div>

      {/* Schedule Table */}
      <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-surface-container border-b border-outline-variant text-primary font-bold">
                <th className="p-3">Course Code & Title</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time & Session</th>
                <th className="p-3">Exam Venue</th>
                <th className="p-3">Seat Number</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-outline-variant/40 text-on-surface font-medium">
              {filteredSchedule.map((exam) => (
                <tr key={exam.id} className="hover:bg-surface-container-low transition-colors">
                  <td className="p-3">
                    <span className="bg-primary-container text-white px-2 py-0.5 rounded-md text-[10px] font-bold mr-2">
                      {exam.courseCode}
                    </span>
                    <strong className="text-primary">{exam.courseTitle}</strong>
                  </td>
                  <td className="p-3 font-semibold text-on-surface">{exam.date}</td>
                  <td className="p-3">
                    <span className="font-mono">{exam.time}</span>
                    <span className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      exam.session === 'Morning' ? 'bg-amber-100 text-amber-900' : 'bg-purple-100 text-purple-900'
                    }`}>
                      {exam.session}
                    </span>
                  </td>
                  <td className="p-3 text-on-surface-variant">{exam.venue}</td>
                  <td className="p-3 font-mono font-bold text-secondary">{exam.seatNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slip Print Modal */}
      {showSlipModal && (
        <div className="fixed inset-0 bg-primary/70 backdrop-blur-xs z-[100] flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-xl rounded-2xl p-6 shadow-2xl border border-outline-variant space-y-4">
            <div className="text-center border-b pb-3 border-outline-variant">
              <h2 className="font-bold text-base text-primary">NATIONAL OPEN UNIVERSITY OF NIGERIA</h2>
              <p className="text-xs text-on-surface-variant uppercase font-semibold">e-Exam Clearance Pass & Seat Slip</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono bg-surface-container p-4 rounded-xl">
              <div>
                <span className="text-on-surface-variant block">Matric Number:</span>
                <strong className="text-primary text-sm">{profile.matricNumber}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Student Name:</span>
                <strong className="text-primary text-sm">{profile.name}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Program:</span>
                <strong>{profile.program}</strong>
              </div>
              <div>
                <span className="text-on-surface-variant block">Study Centre:</span>
                <strong>{profile.studyCentre}</strong>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h4 className="font-bold text-primary">Scheduled Examination Courses:</h4>
              <ul className="space-y-1 font-mono">
                {schedule.map((s) => (
                  <li key={s.id} className="p-2 bg-surface-container-lowest rounded-md border flex justify-between">
                    <span><strong>{s.courseCode}</strong> - {s.date} ({s.time})</span>
                    <span className="font-bold text-secondary">Seat: {s.seatNumber}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="pt-3 border-t border-outline-variant flex justify-between">
              <button
                type="button"
                onClick={() => window.print()}
                className="bg-primary text-white px-5 py-2 rounded-lg text-xs font-bold hover:bg-primary-container cursor-pointer flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">print</span>
                <span>Print Clearance Slip</span>
              </button>
              <button
                type="button"
                onClick={() => setShowSlipModal(false)}
                className="bg-surface-container text-on-surface px-4 py-2 rounded-lg text-xs font-bold cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
