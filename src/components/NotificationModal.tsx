import React from 'react';
import { NotificationItem } from '../types';

interface NotificationModalProps {
  notifications: NotificationItem[];
  onClose: () => void;
  onMarkAllRead: () => void;
  onSelectNotification: (item: NotificationItem) => void;
}

export const NotificationModal: React.FC<NotificationModalProps> = ({
  notifications,
  onClose,
  onMarkAllRead,
  onSelectNotification,
}) => {
  return (
    <div className="fixed inset-0 bg-primary/60 backdrop-blur-xs z-[100] flex justify-end">
      <div className="bg-surface w-full max-w-md h-full shadow-2xl border-l border-outline-variant flex flex-col animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="p-5 bg-primary text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-2xl">notifications</span>
            <h3 className="font-title-md text-base font-bold">Portal Notifications</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-white/80 hover:text-white text-xl font-bold p-1 cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-3 bg-surface-container border-b border-outline-variant flex items-center justify-between text-xs">
          <span className="text-on-surface-variant font-medium">
            {notifications.filter((n) => !n.read).length} Unread Alerts
          </span>
          <button
            type="button"
            onClick={onMarkAllRead}
            className="text-primary font-bold hover:underline cursor-pointer"
          >
            Mark all as read
          </button>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectNotification(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                !item.read
                  ? 'bg-surface-container-low border-primary/40 shadow-xs'
                  : 'bg-surface border-outline-variant/60 opacity-80'
              }`}
            >
              <div className="flex justify-between items-start gap-2">
                <h4 className="font-bold text-xs text-primary">{item.title}</h4>
                <span className="text-[10px] text-on-surface-variant font-medium">{item.time}</span>
              </div>
              <p className="text-xs text-on-surface-variant mt-1.5 leading-relaxed">{item.message}</p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-outline-variant bg-surface">
          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 bg-surface-container text-primary font-bold rounded-lg text-xs hover:bg-surface-container-high cursor-pointer"
          >
            Close Notifications
          </button>
        </div>
      </div>
    </div>
  );
};
