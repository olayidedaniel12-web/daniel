import React from 'react';
import { StudentProfile } from '../types';

interface IDCardViewProps {
  profile: StudentProfile;
}

export const IDCardView: React.FC<IDCardViewProps> = ({ profile }) => {
  return (
    <div className="flex-1 md:ml-80 pb-24 md:pb-8 pt-6 md:pt-8 px-margin-mobile md:px-margin-desktop w-full max-w-[1200px] mx-auto flex flex-col gap-6 items-center">
      {/* Title */}
      <div className="w-full text-left">
        <h1 className="font-display-lg text-display-lg text-primary font-bold">
          Digital Student ID Card
        </h1>
        <p className="font-body-lg text-body-lg text-on-surface-variant mt-1">
          Official National Open University of Nigeria identity card for e-exams and campus verification.
        </p>
      </div>

      {/* ID Card Front Frame */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border-2 border-primary overflow-hidden transition-transform hover:scale-[1.01]">
        {/* Header NOUN Banner */}
        <div className="bg-[#001e40] text-white p-4 text-center border-b-4 border-yellow-400 relative">
          <div className="text-xs font-bold uppercase tracking-widest text-yellow-400">
            NATIONAL OPEN UNIVERSITY OF NIGERIA
          </div>
          <div className="text-[10px] text-blue-200 uppercase tracking-wide">
            WORK & LEARN • STUDENT IDENTITY CARD
          </div>
        </div>

        {/* Card Body */}
        <div className="p-6 flex flex-col items-center gap-4 bg-gradient-to-b from-blue-50/50 to-white">
          <div className="w-28 h-28 rounded-xl ring-4 ring-primary/30 overflow-hidden shadow-md">
            <img
              src={profile.photoUrl}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="text-center space-y-1">
            <h2 className="text-lg font-extrabold text-primary uppercase tracking-wide">
              {profile.name}
            </h2>
            <div className="inline-block bg-primary text-white text-xs font-mono font-bold px-3 py-1 rounded-md">
              MATRIC: {profile.matricNumber}
            </div>
          </div>

          <div className="w-full space-y-2 text-xs border-t border-b border-gray-200 py-3 font-medium text-gray-700">
            <div className="flex justify-between">
              <span className="text-gray-500">PROGRAMME:</span>
              <strong className="text-primary text-right">{profile.program}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">FACULTY:</span>
              <strong className="text-primary text-right">{profile.faculty}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">STUDY CENTRE:</span>
              <strong className="text-primary text-right">{profile.studyCentre}</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">EXPIRY DATE:</span>
              <strong className="text-green-700">31 DEC 2027</strong>
            </div>
          </div>

          {/* Barcode & QR Simulation */}
          <div className="w-full flex items-center justify-between pt-2">
            <div className="flex flex-col items-start">
              <span className="text-[9px] text-gray-400 font-mono">AUTHENTICATION CODE</span>
              <div className="font-mono text-xs font-bold text-gray-800 tracking-wider">
                |||||| | ||||||| |||| |||
              </div>
            </div>
            <div className="w-12 h-12 bg-gray-900 rounded-md p-1 flex items-center justify-center text-[8px] text-white font-mono text-center leading-tight">
              NOUN QR PASS
            </div>
          </div>
        </div>

        {/* Footer Bar */}
        <div className="bg-primary text-white text-[10px] text-center py-2 font-semibold">
          Property of NOUN • If found, please return to nearest NOUN Study Centre.
        </div>
      </div>

      <button
        type="button"
        onClick={() => window.print()}
        className="bg-primary text-white hover:bg-primary-container px-6 py-3 rounded-xl text-xs font-bold cursor-pointer transition-all flex items-center gap-2 shadow-md active:scale-95"
      >
        <span className="material-symbols-outlined text-base">print</span>
        <span>Print Laminated Student ID Card</span>
      </button>
    </div>
  );
};
