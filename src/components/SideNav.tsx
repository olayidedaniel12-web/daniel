import React from 'react';
import { StudentProfile } from '../types';

export type ActiveTab = 'dashboard' | 'tmas' | 'courses' | 'finance' | 'results' | 'timetable' | 'clearance' | 'idcard' | 'profile';

interface SideNavProps {
  profile: StudentProfile;
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
  onOpenNotifications: () => void;
  unreadNotificationsCount: number;
}

export const SideNav: React.FC<SideNavProps> = ({
  profile,
  activeTab,
  onTabChange,
  onOpenNotifications,
  unreadNotificationsCount,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'tmas', label: 'TMAs', icon: 'assignment' },
    { id: 'courses', label: 'E-Courseware', icon: 'menu_book' },
    { id: 'finance', label: 'Wallet & Fees', icon: 'account_balance_wallet' },
    { id: 'results', label: 'Semester Results', icon: 'grade' },
    { id: 'timetable', label: 'Exam Timetable', icon: 'calendar_month' },
    { id: 'clearance', label: 'e-Clearance', icon: 'verified' },
    { id: 'idcard', label: 'Student ID Card', icon: 'badge' },
    { id: 'profile', label: 'My Profile', icon: 'person' },
  ];

  return (
    <nav className="hidden md:flex h-full w-80 rounded-r-xl bg-surface dark:bg-surface-dim shadow-xl fixed inset-y-0 left-0 z-[60] flex-col py-6 border-r border-outline-variant/50">
      <div className="px-6 mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-4 mb-3">
          <div 
            className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center overflow-hidden ring-2 ring-primary/20 cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onTabChange('profile')}
            title="View Profile"
          >
            <img
              className="w-full h-full object-cover"
              alt={profile.name}
              src={profile.photoUrl}
            />
          </div>
          <div>
            <h2 className="font-headline-lg text-primary text-lg font-bold leading-tight">
              Matric: {profile.matricNumber}
            </h2>
            <p className="font-body-md text-xs text-on-surface-variant font-medium mt-0.5">
              {profile.name}
            </p>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="inline-block px-2.5 py-0.5 bg-surface-container-high text-primary rounded-full text-xs font-semibold">
                {profile.semester}
              </span>
              <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-[10px] font-bold">
                ● {profile.status}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-surface-container rounded-xl text-xs font-medium text-on-surface">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary text-base">account_balance_wallet</span>
            <span>Wallet: <strong className="text-primary font-bold">₦{profile.walletBalance.toLocaleString('en-NG', { minimumFractionDigits: 2 })}</strong></span>
          </div>
          <button 
            onClick={() => onTabChange('finance')} 
            className="text-primary font-semibold hover:underline text-[11px]"
          >
            Top Up
          </button>
        </div>

        <div className="h-px bg-outline-variant w-full my-1"></div>
      </div>

      <ul className="flex-1 px-4 space-y-1.5 overflow-y-auto pr-2">
        {navItems.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-left transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>
                  {item.icon}
                </span>
                <span className="font-body-md text-sm">{item.label}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div className="px-4 mt-auto pt-4 border-t border-outline-variant/30 flex flex-col gap-2">
        <button
          type="button"
          onClick={onOpenNotifications}
          className="w-full flex items-center justify-between px-4 py-2.5 rounded-full text-on-surface-variant hover:bg-surface-container-high transition-all duration-200 cursor-pointer text-sm"
        >
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined">notifications</span>
            <span>Notifications</span>
          </div>
          {unreadNotificationsCount > 0 && (
            <span className="px-2 py-0.5 bg-error text-on-error rounded-full text-xs font-bold">
              {unreadNotificationsCount}
            </span>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            if (confirm('Are you sure you want to log out of NOUN ODL Portal?')) {
              alert('You have logged out successfully. Click OK to refresh session.');
              window.location.reload();
            }
          }}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-error hover:bg-error-container/50 transition-all duration-200 text-sm font-medium cursor-pointer"
        >
          <span className="material-symbols-outlined">logout</span>
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};
