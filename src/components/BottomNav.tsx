import React from 'react';
import { ActiveTab } from './SideNav';

interface BottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, onTabChange }) => {
  const items: { id: ActiveTab; label: string; icon: string }[] = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'tmas', label: 'TMAs', icon: 'assignment' },
    { id: 'courses', label: 'Courses', icon: 'menu_book' },
    { id: 'finance', label: 'Finance', icon: 'account_balance_wallet' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full flex justify-around items-center bg-surface-container-lowest dark:bg-tertiary-container pb-safe z-50 h-16 border-t border-outline-variant dark:border-on-tertiary-fixed-variant shadow-lg">
      {items.map((item) => {
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onTabChange(item.id)}
            className={`flex flex-col items-center justify-center px-3 py-1 active:scale-90 transition-transform cursor-pointer rounded-full ${
              isActive
                ? 'bg-secondary-container text-on-secondary-container dark:bg-secondary dark:text-on-secondary font-bold'
                : 'text-on-surface-variant dark:text-on-tertiary-container hover:bg-surface-container-high'
            }`}
          >
            <span className={`material-symbols-outlined ${isActive ? 'fill' : ''}`}>
              {item.icon}
            </span>
            <span className="font-label-sm text-xs mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
