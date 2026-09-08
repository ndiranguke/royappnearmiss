import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck2,
  FileText,
  MapPin,
  MessageSquare,
  ShieldCheck,
  Truck,
  User as UserIcon,
  Video,
} from 'lucide-react';
import { NearMissReport, User } from '../types';
import { StorageService } from '../services/storage';

interface AdminReviewViewProps {
  admin: User;
  report: NearMissReport;
  onBack: () => void;
  onReportUpdated: (updated: NearMissReport) => void;
}

export const AdminReviewView: React.FC<AdminReviewViewProps> = ({
  admin,
  report,
  onBack,
  onReportUpdated,
}) => {
  const [correctiveText, setCorrectiveText] = useState(
    report.correctiveAction?.text || ''
  );
  const [loadingAction, setLoadingAction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const formatDate = (isoString?: string | number) => {
    if (!isoString) return '—';
    const d = new Date(isoString);
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

  const handleAcknowledge = () => {
    setError(null);
    setLoadingAction('ack');
    try {
      const updated = StorageService.acknowledgeReport(admin, report.id);
      onReportUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to acknowledge report.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleSetInProgress = () => {
    if (!correctiveText.trim()) {
      setError('Please add a note on the corrective action before marking in progress.');
      return;
    }
    setError(null);
    setLoadingAction('progress');
    try {
      const updated = StorageService.setInProgress(admin, report.id, correctiveText.trim());
      onReportUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to update progress.');
    } finally {
      setLoadingAction(null);
    }
  };

  const handleCloseReport = () => {
    if (!correctiveText.trim()) {
      setError('Describe the corrective action taken before closing.');
      return;
    }
    setError(null);
    setLoadingAction('close');
    try {
      const updated = StorageService.closeReport(admin, report.id, correctiveText.trim());
      onReportUpdated(updated);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to close report.');
    } finally {
      setLoadingAction(null);
    }
  };

  const getStatusBadge = () => {
    switch (report.status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
            <span className="w-2 h-2 rounded-full bg-slate-500" />
            Submitted (Pending Ack)
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold tracking-wide uppercase bg-red-50 text-[#7A1315]">
            <span className="w-2 h-2 rounded-full bg-[#7A1315]" />
            Under Review
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold tracking-wide uppercase bg-amber-50 text-amber-800">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            Corrective Action In Progress
          </span>
        );
      case 'Corrected':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            Corrected / Closed
          </span>
        );
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top back link & headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#e1ddd0]">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="p-1.5 rounded text-[#565b62] hover:text-[#202226] hover:bg-[#faf9f6]"
            title="Back to Queue"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-bold text-[#7A1315] uppercase">
                {report.id}
              </span>
              <span className="text-xl sm:text-2xl font-bold font-heading text-[#202226]">
                &mdash; Incident Review
              </span>
            </div>
            <p className="text-xs text-[#6b7178] mt-0.5">
              Logged on {formatDate(report.createdAt)} by {report.reporterName}
            </p>
          </div>
        </div>

        <div>{getStatusBadge()}</div>
      </div>

      {error && (
        <div className="p-3.5 rounded bg-red-50 border-l-4 border-[#7A1315] text-xs sm:text-sm text-[#7A1315] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* SECTION 1: Details */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ddd0]">
          <h2 className="font-heading font-semibold text-base text-[#202226]">
            Section 1 &middot; Reported Details
          </h2>
          <span className="text-xs text-[#6b7178]">
            Reporter ID: {report.reporterId}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div>
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-0.5">
              Employee Name
            </div>
            <div className="font-semibold text-sm text-[#202226]">
              {report.reporterName}
            </div>
          </div>

          <div>
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-0.5">
              Department &middot; Role
            </div>
            <div className="font-semibold text-sm text-[#202226]">
              {report.department}
            </div>
            <div className="text-[11px] text-[#6b7178]">{report.designation}</div>
          </div>

          <div>
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-0.5">
              Truck Plate No.
            </div>
            <div className="font-semibold font-mono text-sm text-[#202226]">
              {report.truckNo || 'N/A'}
            </div>
          </div>

          <div>
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-0.5">
              Occurrence Timestamp
            </div>
            <div className="font-semibold text-sm text-[#202226]">
              {report.dateOfOccurrence}
            </div>
            <div className="text-[11px] text-[#6b7178]">{report.timeOfOccurrence}</div>
          </div>
        </div>

        <div className="pt-2 border-t border-[#f0eee6]">
          <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-1">
            Place of Occurrence
          </div>
          <div className="flex items-center gap-1.5 text-sm font-semibold text-[#202226]">
            <MapPin className="w-4 h-4 text-[#7A1315]" />
            <span>{report.placeOfOccurrence}</span>
          </div>
        </div>

        <div className="pt-2">
          <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-1">
            Incident Description (What Almost Went Wrong)
          </div>
          <div className="p-3 rounded bg-[#faf9f6] border border-[#e1ddd0] text-sm text-[#383c42] leading-relaxed">
            {report.description}
          </div>
        </div>

        {report.suggestedAction && (
          <div className="pt-1">
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-1">
              Employee&apos;s Suggested Action
            </div>
            <div className="p-3 rounded bg-amber-50/50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
              {report.suggestedAction}
            </div>
          </div>
        )}

        {/* Media Attachments */}
        {report.attachments.length > 0 && (
          <div className="pt-2">
            <div className="text-[#6b7178] uppercase text-[10px] tracking-wider mb-2">
              Attached Media Evidence ({report.attachments.length})
            </div>
            <div className="flex flex-wrap gap-3">
              {report.attachments.map((att) => (
                <div
                  key={att.id}
                  onClick={() => setActiveMedia(att.url)}
                  className="relative w-32 h-32 rounded border border-[#e1ddd0] overflow-hidden cursor-pointer hover:opacity-90 bg-black shadow-xs group"
                >
                  {att.type === 'image' ? (
                    <img
                      src={att.url}
                      alt={att.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900 p-2">
                      <Video className="w-8 h-8 text-emerald-400 mb-1" />
                      <span className="text-[10px] truncate max-w-full">{att.name}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-semibold transition-opacity">
                    Zoom View
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SECTION 2: EHS Acknowledgement */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ddd0]">
          <h2 className="font-heading font-semibold text-base text-[#202226]">
            Section 2 &middot; EHS Acknowledgement
          </h2>
          {report.ehsAck && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Acknowledged
            </span>
          )}
        </div>

        {report.ehsAck ? (
          <div className="p-3 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900">
            <span className="font-semibold">Receipt Acknowledged by: </span>
            <span>
              {report.ehsAck.by} ({report.ehsAck.designation}) on {formatDate(report.ehsAck.date)}
            </span>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-[#6b7178] leading-relaxed">
              Acknowledging indicates that EHS has received this report and initiated an investigation. The employee will receive a notification and the status will transition to <strong>Under Review</strong>.
            </p>
            <button
              id="admin-ack-btn"
              type="button"
              disabled={loadingAction === 'ack'}
              onClick={handleAcknowledge}
              className="inline-flex items-center gap-2 px-5 py-2 text-xs font-semibold rounded bg-[#23262b] hover:bg-[#383c42] text-white transition-colors disabled:opacity-50"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>{loadingAction === 'ack' ? 'Processing...' : 'Acknowledge Receipt of Report'}</span>
            </button>
          </div>
        )}
      </div>

      {/* SECTION 3: Corrective Action Implementation */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-2 border-b border-[#e1ddd0]">
          <h2 className="font-heading font-semibold text-base text-[#202226]">
            Section 3 &middot; Corrective Action Taken
          </h2>
          {report.correctiveAction && (
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Action Logged
            </span>
          )}
        </div>

        {report.status === 'Corrected' && report.correctiveAction ? (
          <div className="p-4 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900 space-y-1">
            <div className="font-bold text-sm">Action Implemented:</div>
            <p className="text-xs leading-relaxed">{report.correctiveAction.text}</p>
            <div className="pt-2 text-[11px] text-[#6b7178] border-t border-emerald-200/50">
              Verified by {report.correctiveAction.by} on {formatDate(report.correctiveAction.date)}
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Engineering or procedural corrective action notes
              </label>
              <textarea
                id="admin-corrective-textarea"
                rows={3}
                value={correctiveText}
                onChange={(e) => setCorrectiveText(e.target.value)}
                placeholder="Specify the repairs made, equipment replaced, procedures altered, or briefings conducted..."
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
              />
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                id="admin-progress-btn"
                type="button"
                disabled={!report.ehsAck || loadingAction === 'progress'}
                onClick={handleSetInProgress}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded border border-[#7A1315] text-[#7A1315] hover:bg-[#7A1315]/10 disabled:opacity-40 transition-colors"
                title={!report.ehsAck ? 'Acknowledge receipt first' : ''}
              >
                <span>{loadingAction === 'progress' ? 'Saving...' : 'Mark In Progress'}</span>
              </button>

              <button
                id="admin-close-btn"
                type="button"
                disabled={!report.ehsAck || loadingAction === 'close'}
                onClick={handleCloseReport}
                className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white disabled:opacity-40 transition-colors shadow-xs"
                title={!report.ehsAck ? 'Acknowledge receipt first' : ''}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{loadingAction === 'close' ? 'Closing...' : 'Close & Notify Employee'}</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* SECTION 4: Feedback Confirmation */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-2">
        <h2 className="font-heading font-semibold text-base text-[#202226] pb-2 border-b border-[#e1ddd0]">
          Section 4 &middot; Employee Feedback Confirmation
        </h2>

        {report.employeeConfirmed ? (
          <div className="flex items-center gap-2 p-3 rounded bg-emerald-50 text-emerald-800 text-xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
            <span>
              The reporting employee ({report.reporterName}) has reviewed the feedback and formally confirmed closure.
            </span>
          </div>
        ) : (
          <div className="text-xs text-[#6b7178] p-3 rounded bg-[#faf9f6] border border-[#f0eee6]">
            {report.status === 'Corrected'
              ? 'Corrective action notification has been dispatched to the employee. Awaiting their confirmation of receipt.'
              : 'Feedback confirmation is pending completion and closure of the corrective action.'}
          </div>
        )}
      </div>

      {/* SECTION 5: Timeline */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
        <h2 className="font-heading font-semibold text-base text-[#202226] pb-2 border-b border-[#e1ddd0]">
          Section 5 &middot; Comprehensive Audit Timeline
        </h2>

        <div className="relative pl-6 border-l-2 border-[#e1ddd0] space-y-6">
          {report.timeline.map((entry, idx) => (
            <div key={idx} className="relative">
              <span className="absolute -left-[31px] top-1 w-3.5 h-3.5 rounded-full bg-[#7A1315] border-2 border-white ring-2 ring-[#7A1315]/20" />
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <span className="font-bold text-xs text-[#202226]">
                  {entry.status}
                </span>
                <span className="text-[11px] text-[#6b7178]">
                  {formatDate(entry.at)}
                </span>
              </div>
              <div className="text-xs text-[#565b62] mt-0.5">
                Handled by: <span className="font-medium text-[#202226]">{entry.by}</span>
              </div>
              {entry.note && (
                <p className="text-xs text-[#6b7178] mt-1 bg-[#faf9f6] p-2 rounded border border-[#f0eee6]">
                  {entry.note}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Media Zoom Modal */}
      {activeMedia && (
        <div
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setActiveMedia(null)}
        >
          <div
            className="max-w-3xl max-h-[85vh] bg-black rounded overflow-hidden p-2"
            onClick={(e) => e.stopPropagation()}
          >
            {activeMedia.includes('video') || activeMedia.endsWith('.mp4') ? (
              <video src={activeMedia} controls className="max-w-full max-h-[80vh] mx-auto" />
            ) : (
              <img src={activeMedia} alt="Evidence" className="max-w-full max-h-[80vh] object-contain mx-auto" />
            )}
            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => setActiveMedia(null)}
                className="px-4 py-1 text-xs text-white bg-white/20 hover:bg-white/30 rounded"
              >
                Close Fullscreen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
