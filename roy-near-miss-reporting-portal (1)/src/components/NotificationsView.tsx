import React from 'react';
import { Bell, CheckCheck, Clock } from 'lucide-react';
import { NotificationItem } from '../types';

interface NotificationsViewProps {
  notifications: NotificationItem[];
  onOpenReport: (reportId: string) => void;
  onMarkRead: (notificationId: string) => void;
  onMarkAllRead: () => void;
}

export const NotificationsView: React.FC<NotificationsViewProps> = ({
  notifications,
  onOpenReport,
  onMarkRead,
  onMarkAllRead,
}) => {
  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return (
      d.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ' at ' +
      d.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  const hasUnread = notifications.some((n) => !n.read);

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[#e1ddd0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
            Notifications
          </h1>
          <p className="text-sm text-[#6b7178] mt-1">
            Status changes, review acknowledgements, and feedback requests.
          </p>
        </div>

        {hasUnread && (
          <button
            type="button"
            onClick={onMarkAllRead}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded border border-[#e1ddd0] bg-white text-[#383c42] hover:text-[#7A1315] hover:border-[#7A1315] transition-colors"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            <span>Mark All Read</span>
          </button>
        )}
      </div>

      {/* Notifications List */}
      <div className="bg-white border border-[#e1ddd0] rounded shadow-2xs divide-y divide-[#f0eee6] overflow-hidden">
        {notifications.length === 0 ? (
          <div className="text-center py-12 text-[#6b7178]">
            <Bell className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p className="text-sm font-medium text-[#202226]">No notifications yet</p>
            <p className="text-xs text-[#6b7178] mt-1">
              You will receive alerts here when near-miss reports are submitted or updated.
            </p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              onClick={() => {
                onMarkRead(n.id);
                if (n.reportId) {
                  onOpenReport(n.reportId);
                }
              }}
              className={`p-4 flex items-start gap-3.5 cursor-pointer hover:bg-[#faf9f6] transition-colors ${
                !n.read ? 'bg-red-50/20' : ''
              }`}
            >
              {/* Unread indicator */}
              <div className="pt-1 flex-shrink-0">
                <span
                  className={`block w-2.5 h-2.5 rounded-full ${
                    !n.read ? 'bg-[#7A1315] ring-2 ring-red-200' : 'bg-slate-300'
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div
                  className={`text-xs sm:text-sm leading-relaxed ${
                    !n.read ? 'font-semibold text-[#202226]' : 'text-[#565b62]'
                  }`}
                >
                  {n.message}
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#6b7178] mt-1">
                  <Clock className="w-3 h-3" />
                  <span>{formatDate(n.at)}</span>
                  {n.reportId && (
                    <>
                      <span>&middot;</span>
                      <span className="font-mono text-[#7A1315] uppercase">
                        Ref: {n.reportId}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
