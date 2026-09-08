import React from 'react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  MapPin,
  Truck,
  User as UserIcon,
  Video,
  X,
} from 'lucide-react';
import { NearMissReport, User } from '../types';
import { RoyLogo } from './RoyLogo';

interface ReportDetailModalProps {
  report: NearMissReport;
  currentUser: User;
  onClose: () => void;
  onConfirmFeedback: (reportId: string) => void;
}

export const ReportDetailModal: React.FC<ReportDetailModalProps> = ({
  report,
  currentUser,
  onClose,
  onConfirmFeedback,
}) => {
  const isReporter = currentUser.id === report.reporterId;
  const canConfirm = isReporter && report.status === 'Corrected' && !report.employeeConfirmed;

  const formatDate = (isoString?: string | number) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
    return (
      d.toLocaleDateString(undefined, {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      }) +
      ' ' +
      d.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  };

  const getStatusBadge = () => {
    switch (report.status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-slate-100 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-red-50 text-[#7A1315]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1315]" />
            Under Review
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-amber-50 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            In Progress
          </span>
        );
      case 'Corrected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide bg-emerald-50 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Corrected
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-3 sm:p-5">
      <div
        className="bg-white rounded border border-[#e1ddd0] max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-3.5 sm:p-5 border-b border-[#e1ddd0] flex items-center justify-between sticky top-0 bg-white z-10 gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 min-w-0">
            <div className="bg-[#f6f5f0] rounded p-1 border border-[#e1ddd0] flex-shrink-0">
              <RoyLogo size="xs" className="h-5 sm:h-6 w-auto" />
            </div>
            <span className="font-mono text-xs sm:text-sm font-bold text-[#7A1315] uppercase flex-shrink-0">
              {report.id}
            </span>
            <span className="text-sm sm:text-base font-bold font-heading text-[#202226] truncate">
              Incident Details
            </span>
            <div className="flex-shrink-0">{getStatusBadge()}</div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6b7178] hover:text-[#202226] hover:bg-[#faf9f6] flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5 text-xs text-[#383c42]">
          {/* Key Information */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#faf9f6] p-3.5 rounded border border-[#e1ddd0]">
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-0.5">
                Reporter
              </div>
              <div className="font-semibold text-[#202226]">{report.reporterName}</div>
              <div className="text-[11px] text-[#6b7178]">{report.department}</div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-0.5">
                Truck Assigned
              </div>
              <div className="font-mono font-semibold text-[#202226]">
                {report.truckNo || 'N/A'}
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-0.5">
                Date &amp; Time
              </div>
              <div className="font-semibold text-[#202226]">
                {report.dateOfOccurrence} {report.timeOfOccurrence}
              </div>
            </div>
          </div>

          {/* Place of occurrence */}
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-1">
              Place of Occurrence
            </div>
            <div className="flex items-center gap-1.5 text-sm font-semibold text-[#202226]">
              <MapPin className="w-4 h-4 text-[#7A1315] flex-shrink-0" />
              <span>{report.placeOfOccurrence}</span>
            </div>
          </div>

          {/* Description */}
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-1">
              What Happened
            </div>
            <div className="p-3 rounded bg-white border border-[#e1ddd0] text-xs leading-relaxed">
              {report.description}
            </div>
          </div>

          {/* Suggested action */}
          {report.suggestedAction && (
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-1">
                Suggested Corrective Action
              </div>
              <div className="p-3 rounded bg-amber-50/50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
                {report.suggestedAction}
              </div>
            </div>
          )}

          {/* Attachments */}
          {report.attachments.length > 0 && (
            <div>
              <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-2">
                Attached Media Evidence
              </div>
              <div className="flex flex-wrap gap-2.5">
                {report.attachments.map((att) => (
                  <div
                    key={att.id}
                    className="relative w-24 h-24 rounded border border-[#e1ddd0] overflow-hidden bg-black shadow-2xs"
                  >
                    {att.type === 'image' ? (
                      <img
                        src={att.url}
                        alt={att.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900 p-2">
                        <Video className="w-6 h-6 text-emerald-400 mb-1" />
                        <span className="text-[9px] truncate max-w-full">{att.name}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* EHS Acknowledgement details */}
          {report.ehsAck && (
            <div className="p-3 rounded bg-slate-50 border border-slate-200">
              <span className="font-semibold text-slate-900">EHS Acknowledgement: </span>
              <span className="text-slate-700">
                Acknowledged by {report.ehsAck.by} on {formatDate(report.ehsAck.date)}
              </span>
            </div>
          )}

          {/* Corrective action result */}
          {report.correctiveAction && (
            <div className="p-4 rounded bg-emerald-50 border border-emerald-300 text-emerald-950 space-y-1">
              <div className="font-bold flex items-center gap-1.5 text-xs text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Corrective Action Completed by EHS</span>
              </div>
              <p className="text-xs leading-relaxed">{report.correctiveAction.text}</p>
              <div className="text-[10px] text-emerald-700 pt-1">
                Verified by {report.correctiveAction.by} on {formatDate(report.correctiveAction.date)}
              </div>
            </div>
          )}

          {/* Timeline History */}
          <div>
            <div className="text-[10px] uppercase font-bold text-[#6b7178] tracking-wider mb-2.5">
              Incident Audit Timeline
            </div>
            <div className="pl-4 border-l-2 border-[#e1ddd0] space-y-3.5">
              {report.timeline.map((item, idx) => (
                <div key={idx} className="relative">
                  <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-[#7A1315]" />
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[#202226]">{item.status}</span>
                    <span className="text-[10px] text-[#6b7178]">{formatDate(item.at)}</span>
                  </div>
                  <div className="text-[11px] text-[#6b7178]">By {item.by}</div>
                  {item.note && (
                    <div className="text-[11px] text-[#383c42] mt-0.5 bg-[#faf9f6] p-1.5 rounded">
                      {item.note}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Feedback Confirmation Button for Reporter */}
          {canConfirm && (
            <div className="pt-3 border-t border-[#e1ddd0] space-y-2">
              <p className="text-xs text-[#6b7178]">
                Please review the corrective action above. If you are satisfied, click below to confirm receipt of feedback.
              </p>
              <button
                type="button"
                onClick={() => onConfirmFeedback(report.id)}
                className="w-full py-2.5 px-4 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Confirm I Received This Corrective Feedback</span>
              </button>
            </div>
          )}

          {report.employeeConfirmed && (
            <div className="p-2.5 rounded bg-emerald-50 text-emerald-800 text-xs font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
              <span>Employee confirmed receipt of feedback. Investigation is closed.</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-[#e1ddd0] bg-[#faf9f6] flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded border border-[#e1ddd0] bg-white text-[#202226] hover:bg-[#faf9f6]"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
