import React, { useEffect, useState } from 'react';
import { NavView, NearMissReport, NotificationItem, User } from './types';
import { StorageService } from './services/storage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { AuthScreen } from './components/AuthScreen';
import { Overview } from './components/Overview';
import { ReportForm } from './components/ReportForm';
import { MyReports } from './components/MyReports';
import { ReviewQueue } from './components/ReviewQueue';
import { AdminReviewView } from './components/AdminReviewView';
import { MasterDataView } from './components/MasterDataView';
import { GuideView } from './components/GuideView';
import { NotificationsView } from './components/NotificationsView';
import { ReportDetailModal } from './components/ReportDetailModal';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    return StorageService.getCurrentUser();
  });

  const [currentView, setCurrentView] = useState<NavView>('home');
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [detailModalReportId, setDetailModalReportId] = useState<string | null>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Cached data state
  const [reports, setReports] = useState<NearMissReport[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Toast banner state
  const [toast, setToast] = useState<{
    text: string;
    type: 'success' | 'error';
  } | null>(null);

  const showToast = (text: string, type: 'success' | 'error' = 'success') => {
    setToast({ text, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  const loadData = () => {
    if (!currentUser) return;
    const rep = StorageService.getReports(currentUser.id, currentUser.role);
    setReports(rep);
    const notifs = StorageService.getNotifications(currentUser.id);
    setNotifications(notifs);
    if (currentUser.role === 'admin') {
      const u = StorageService.getUsers();
      setUsers(u);
    }
  };

  useEffect(() => {
    loadData();
  }, [currentUser]);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('home');
    showToast(`Welcome back, ${user.fullName}`);
  };

  const handleLogout = () => {
    StorageService.setCurrentUser(null);
    setCurrentUser(null);
    setCurrentView('home');
    setSelectedReportId(null);
    setDetailModalReportId(null);
    showToast('You have been logged out.');
  };

  const handleSwitchUser = (staffNo: string) => {
    try {
      const usersList = StorageService.getUsers();
      const target = usersList.find((u) => u.staffNo === staffNo);
      if (target) {
        StorageService.setCurrentUser(target);
        setCurrentUser(target);
        setCurrentView('home');
        setSelectedReportId(null);
        setDetailModalReportId(null);
        showToast(`Switched persona to ${target.fullName} (${target.role.toUpperCase()})`);
      }
    } catch {
      showToast('Could not switch persona.', 'error');
    }
  };

  const handleNavigate = (view: NavView) => {
    setCurrentView(view);
    if (view !== 'review') {
      setSelectedReportId(null);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenReport = (reportId: string) => {
    if (currentUser?.role === 'admin') {
      setSelectedReportId(reportId);
      setCurrentView('review');
    } else {
      setDetailModalReportId(reportId);
    }
  };

  const handleReportCreated = (newReportId: string) => {
    loadData();
    showToast(`Near-miss report ${newReportId.toUpperCase()} submitted successfully!`);
    setCurrentView('myreports');
  };

  const handleConfirmFeedback = (reportId: string) => {
    if (!currentUser) return;
    try {
      StorageService.confirmFeedback(currentUser, reportId);
      loadData();
      showToast('Feedback confirmed. Incident audit successfully closed.');
      setDetailModalReportId(null);
    } catch (err: unknown) {
      showToast(err instanceof Error ? err.message : 'Confirmation failed.', 'error');
    }
  };

  const handleMarkNotificationRead = (id: string) => {
    StorageService.markNotificationRead(id);
    if (currentUser) {
      setNotifications(StorageService.getNotifications(currentUser.id));
    }
  };

  const handleMarkAllNotificationsRead = () => {
    if (!currentUser) return;
    StorageService.markAllNotificationsRead(currentUser.id);
    setNotifications(StorageService.getNotifications(currentUser.id));
    showToast('All notifications marked as read.');
  };

  const unreadCount = notifications.filter((n) => !n.read).length;
  const detailModalReport = detailModalReportId
    ? reports.find((r) => r.id === detailModalReportId) || null
    : null;
  const reviewReport = selectedReportId
    ? reports.find((r) => r.id === selectedReportId) || null
    : null;

  // Not authenticated
  if (!currentUser) {
    return <AuthScreen onSuccess={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-[#f6f5f0] flex flex-col">
      {/* Toast Banner */}
      {toast && (
        <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
          <div
            className={`flex items-center gap-2.5 px-4 py-3 rounded shadow-lg text-xs sm:text-sm font-medium ${
              toast.type === 'error'
                ? 'bg-[#590e10] text-white border-l-4 border-red-400'
                : 'bg-[#23262b] text-white border-l-4 border-emerald-400'
            }`}
          >
            {toast.type === 'error' ? (
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />
            )}
            <span>{toast.text}</span>
          </div>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          currentView={currentView}
          userRole={currentUser.role}
          unreadCount={unreadCount}
          onNavigate={handleNavigate}
          isOpenMobile={isMobileSidebarOpen}
          onCloseMobile={() => setIsMobileSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            user={currentUser}
            unreadCount={unreadCount}
            onOpenNotifications={() => handleNavigate('notifications')}
            onLogout={handleLogout}
            onToggleMobileSidebar={() => setIsMobileSidebarOpen(true)}
            onSwitchUser={handleSwitchUser}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {currentView === 'home' && (
              <Overview
                user={currentUser}
                reports={reports}
                onNavigateToReport={() => handleNavigate('report')}
                onNavigateToQueue={() => handleNavigate('queue')}
                onOpenReport={handleOpenReport}
                onExportCsv={
                  currentUser.role === 'admin'
                    ? () => {
                        const csv = StorageService.exportReportsCsv();
                        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `ROY_Reports_${new Date().toISOString().slice(0, 10)}.csv`;
                        a.click();
                        URL.revokeObjectURL(url);
                      }
                    : undefined
                }
              />
            )}

            {currentView === 'report' && (
              <ReportForm
                user={currentUser}
                onSuccess={handleReportCreated}
                onCancel={() => handleNavigate('home')}
              />
            )}

            {currentView === 'myreports' && (
              <MyReports
                reports={reports}
                onOpenReport={handleOpenReport}
                onNavigateToCreate={() => handleNavigate('report')}
              />
            )}

            {currentView === 'queue' && currentUser.role === 'admin' && (
              <ReviewQueue
                reports={reports}
                onReviewReport={(id) => {
                  setSelectedReportId(id);
                  setCurrentView('review');
                }}
              />
            )}

            {currentView === 'review' && currentUser.role === 'admin' && reviewReport && (
              <AdminReviewView
                admin={currentUser}
                report={reviewReport}
                onBack={() => {
                  setSelectedReportId(null);
                  setCurrentView('queue');
                }}
                onReportUpdated={(updated) => {
                  loadData();
                  showToast(`Report ${updated.id.toUpperCase()} updated.`);
                }}
              />
            )}

            {currentView === 'master' && currentUser.role === 'admin' && (
              <MasterDataView
                admin={currentUser}
                reports={reports}
                users={users}
                onRefreshUsers={loadData}
                onRefreshAll={() => {
                  loadData();
                  showToast('Database reset to initial sample records.');
                }}
              />
            )}

            {currentView === 'education' && <GuideView />}

            {currentView === 'notifications' && (
              <NotificationsView
                notifications={notifications}
                onOpenReport={handleOpenReport}
                onMarkRead={handleMarkNotificationRead}
                onMarkAllRead={handleMarkAllNotificationsRead}
              />
            )}
          </main>
        </div>
      </div>

      {/* Employee / Driver Details Modal */}
      {detailModalReport && (
        <ReportDetailModal
          report={detailModalReport}
          currentUser={currentUser}
          onClose={() => setDetailModalReportId(null)}
          onConfirmFeedback={handleConfirmFeedback}
        />
      )}
    </div>
  );
}
