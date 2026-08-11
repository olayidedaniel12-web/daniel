import React, { useState } from 'react';
import { Header } from './components/Header';
import { SideNav, ActiveTab } from './components/SideNav';
import { BottomNav } from './components/BottomNav';
import { DashboardView } from './components/DashboardView';
import { TMAsView } from './components/TMAsView';
import { TMAQuizModal } from './components/TMAQuizModal';
import { CoursesView } from './components/CoursesView';
import { FinanceView } from './components/FinanceView';
import { TimetableView } from './components/TimetableView';
import { ResultsView } from './components/ResultsView';
import { ClearanceView } from './components/ClearanceView';
import { IDCardView } from './components/IDCardView';
import { NotificationModal } from './components/NotificationModal';

import {
  initialProfile,
  initialCourses,
  initialTMAs,
  initialTransactions,
  initialExamSchedule,
  initialSemesterResults,
  initialNotifications,
} from './data/mockData';
import { TMAAssignment, Transaction, NotificationItem } from './types';

export default function App() {
  const [profile, setProfile] = useState(initialProfile);
  const [courses, setCourses] = useState(initialCourses);
  const [tmas, setTMAs] = useState(initialTMAs);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [schedule] = useState(initialExamSchedule);
  const [results] = useState(initialSemesterResults);
  const [notifications, setNotifications] = useState(initialNotifications);

  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [activeQuizTMA, setActiveQuizTMA] = useState<TMAAssignment | null>(null);
  const [showNotificationsModal, setShowNotificationsModal] = useState<boolean>(false);
  const [selectedCourseCode, setSelectedCourseCode] = useState<string>('GST107');

  // Handle Quiz Submission
  const handleSubmitQuiz = (tmaId: string, score: number) => {
    setTMAs((prevTMAs) =>
      prevTMAs.map((t) => {
        if (t.id === tmaId) {
          return {
            ...t,
            status: 'graded',
            score: score,
            isUrgent: false,
          };
        }
        return t;
      })
    );

    // Find the course and update TMA completion
    const targetTMA = tmas.find((t) => t.id === tmaId);
    if (targetTMA) {
      setCourses((prevCourses) =>
        prevCourses.map((course) => {
          if (course.code === targetTMA.courseCode) {
            let tma1 = course.tma1Completed;
            let tma2 = course.tma2Completed;
            let tma3 = course.tma3Completed;

            if (targetTMA.tmaNumber === 1) tma1 = true;
            if (targetTMA.tmaNumber === 2) tma2 = true;
            if (targetTMA.tmaNumber === 3) tma3 = true;

            const completedCount = [tma1, tma2, tma3].filter(Boolean).length;
            const progress = Math.round((completedCount / 3) * 100);

            return {
              ...course,
              tma1Completed: tma1,
              tma2Completed: tma2,
              tma3Completed: tma3,
              progressPercent: progress,
            };
          }
          return course;
        })
      );

      // Push notification
      const newNotif: NotificationItem = {
        id: `n-${Date.now()}`,
        title: `TMA ${targetTMA.tmaNumber} Graded: ${targetTMA.courseCode}`,
        message: `Your TMA submission was graded ${score}/10 marks. Course progress updated.`,
        time: 'Just now',
        type: 'success',
        read: false,
      };
      setNotifications((prev) => [newNotif, ...prev]);
    }
  };

  // Handle Wallet Top-Up
  const handleUpdateWallet = (newBalance: number, newTx: Transaction) => {
    setProfile((prev) => ({ ...prev, walletBalance: newBalance }));
    setTransactions((prev) => [newTx, ...prev]);

    const newNotif: NotificationItem = {
      id: `n-${Date.now()}`,
      title: 'e-Wallet Deposit Successful',
      message: `Your wallet balance was updated to ₦${newBalance.toLocaleString('en-NG')}.`,
      time: 'Just now',
      type: 'success',
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const handleMarkAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const handleSelectNotification = (item: NotificationItem) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === item.id ? { ...n, read: true } : n))
    );
    if (item.title.toLowerCase().includes('tma')) {
      setActiveTab('tmas');
    } else if (item.title.toLowerCase().includes('wallet')) {
      setActiveTab('finance');
    } else if (item.title.toLowerCase().includes('exam')) {
      setActiveTab('timetable');
    }
    setShowNotificationsModal(false);
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row font-sans">
      {/* Header Bar (Mobile top bar) */}
      <Header
        profile={profile}
        notifications={notifications}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        onNavigateToProfile={() => setActiveTab('profile')}
      />

      {/* Desktop Side Navigation Drawer */}
      <SideNav
        profile={profile}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
        onOpenNotifications={() => setShowNotificationsModal(true)}
        unreadNotificationsCount={notifications.filter((n) => !n.read).length}
      />

      {/* Main Content Area based on activeTab */}
      <main className="flex-1 w-full min-h-screen">
        {activeTab === 'dashboard' && (
          <DashboardView
            profile={profile}
            courses={courses}
            tmas={tmas}
            onNavigate={(tab) => setActiveTab(tab)}
            onSelectCourse={(code) => setSelectedCourseCode(code)}
          />
        )}

        {activeTab === 'tmas' && (
          <TMAsView
            tmas={tmas}
            onTakeQuiz={(tma) => setActiveQuizTMA(tma)}
          />
        )}

        {activeTab === 'courses' && (
          <CoursesView
            courses={courses}
            initialSelectedCode={selectedCourseCode}
            onNavigateToTMA={() => setActiveTab('tmas')}
          />
        )}

        {activeTab === 'finance' && (
          <FinanceView
            profile={profile}
            transactions={transactions}
            onUpdateWallet={handleUpdateWallet}
          />
        )}

        {activeTab === 'timetable' && (
          <TimetableView
            profile={profile}
            schedule={schedule}
          />
        )}

        {activeTab === 'results' && (
          <ResultsView
            profile={profile}
            results={results}
          />
        )}

        {activeTab === 'clearance' && (
          <ClearanceView
            profile={profile}
          />
        )}

        {(activeTab === 'idcard' || activeTab === 'profile') && (
          <IDCardView
            profile={profile}
          />
        )}
      </main>

      {/* Mobile Fixed Bottom Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      {/* Interactive TMA Quiz Modal */}
      {activeQuizTMA && (
        <TMAQuizModal
          tma={activeQuizTMA}
          onClose={() => setActiveQuizTMA(null)}
          onSubmitQuiz={handleSubmitQuiz}
        />
      )}

      {/* Notifications Drawer Modal */}
      {showNotificationsModal && (
        <NotificationModal
          notifications={notifications}
          onClose={() => setShowNotificationsModal(false)}
          onMarkAllRead={handleMarkAllNotificationsRead}
          onSelectNotification={handleSelectNotification}
        />
      )}
    </div>
  );
}
