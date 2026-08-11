import React from 'react';
import { StudentProfile } from '../types';

interface ClearanceViewProps {
  profile: StudentProfile;
}

export const ClearanceView: React.FC<ClearanceViewProps> = ({ profile }) => {
  const clearanceSteps = [
    { title: 'Bursary Fee Payment Clearance', status: 'Approved', dept: 'NOUN Bursary Dept', date: '10 Aug 2026' },
    { title: 'Academic Credentials Verification', status: 'Approved', dept: 'Admissions Office', date: '05 Aug 2026' },
    { title: 'Study Centre Registration Clearance', status: 'Approved', dept: 'Lagos Study Centre', date: '08 Aug 2026' },
    { title: 'E-Library Membership Clearance', status: 'Approved', dept: 'NOUN Library', date: '11 Aug 2026' },
  ];

  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6">
      {/* Title */}
      <div>
        <h1 className="font-display-lg text-display-lg text-primary font-bold">
          Student e-Clearance Status
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Track official institutional clearance verification across university departments.
        </p>
      </div>

      {/* Clearance Card Summary */}
      <div className="bg-surface rounded-xl p-6 border border-outline-variant shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b pb-4 border-outline-variant">
          <div>
            <span className="text-xs font-bold text-on-surface-variant uppercase">Matriculation Clearance Certificate</span>
            <h3 className="font-title-md text-lg font-bold text-primary">{profile.name} ({profile.matricNumber})</h3>
            <p className="text-xs text-on-surface-variant">{profile.program} • {profile.studyCentre}</p>
          </div>
          <span className="px-4 py-1.5 bg-green-100 text-green-800 font-bold rounded-full text-xs flex items-center gap-1">
            <span className="material-symbols-outlined text-sm">verified</span>
            Fully Cleared
          </span>
        </div>

        <div className="space-y-3">
          {clearanceSteps.map((step, idx) => (
            <div key={idx} className="p-4 bg-surface-container rounded-xl border border-outline-variant/60 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-green-100 text-green-700 font-bold text-xs flex items-center justify-center">
                  ✓
                </span>
                <div>
                  <h4 className="font-bold text-sm text-primary">{step.title}</h4>
                  <span className="text-xs text-on-surface-variant">{step.dept} • Cleared on {step.date}</span>
                </div>
              </div>
              <span className="text-xs font-bold text-green-800 bg-green-50 px-3 py-1 rounded-full border border-green-200">
                {step.status}
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={() => window.print()}
            className="bg-primary text-white hover:bg-primary-container px-5 py-2.5 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-sm">print</span>
            <span>Print Official Clearance Certificate</span>
          </button>
        </div>
      </div>
    </div>
  );
};
