import React from 'react';
import { NotificationItem, StudentProfile } from '../types';

interface HeaderProps {
  profile: StudentProfile;
  notifications: NotificationItem[];
  onOpenNotifications: () => void;
  onNavigateToProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  notifications,
  onOpenNotifications,
  onNavigateToProfile,
}) => {
  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <header className="w-full top-0 sticky border-b border-outline-variant dark:border-on-surface-variant shadow-sm flex items-center justify-between px-margin-mobile md:px-margin-desktop py-4 bg-surface dark:bg-surface-dim z-50 md:hidden">
      <div 
        className="flex items-center gap-2 cursor-pointer"
        onClick={onNavigateToProfile}
        title="View Student Profile"
      >
        <img
          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary/20"
          alt={profile.name}
          src={profile.photoUrl}
        />
        <div className="flex flex-col">
          <span className="font-headline-lg-mobile text-headline-lg-mobile dark:text-inverse-on-surface text-primary font-bold leading-tight">
            NOUN ODL Portal
          </span>
          <span className="text-xs text-on-surface-variant font-medium">
            {profile.matricNumber}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onOpenNotifications}
        className="relative text-primary dark:text-primary-fixed-dim hover:bg-surface-container-high transition-colors active:scale-95 duration-100 p-2 rounded-full flex items-center justify-center cursor-pointer"
        aria-label="Notifications"
      >
        <span className="material-symbols-outlined text-2xl">notifications</span>
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 w-5 h-5 bg-error text-on-error rounded-full text-[10px] font-bold flex items-center justify-center animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>
    </header>
  );
};
