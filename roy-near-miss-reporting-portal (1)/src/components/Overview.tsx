import React from 'react';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FilePlus2,
  ListFilter,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';
import { NearMissReport, User } from '../types';
import { RoyLogo } from './RoyLogo';

interface OverviewProps {
  user: User;
  reports: NearMissReport[];
  onNavigateToReport: () => void;
  onNavigateToQueue: () => void;
  onOpenReport: (reportId: string) => void;
  onExportCsv?: () => void;
}

export const Overview: React.FC<OverviewProps> = ({
  user,
  reports,
  onNavigateToReport,
  onNavigateToQueue,
  onOpenReport,
  onExportCsv,
}) => {
  const isAdmin = user.role === 'admin';

  // Metrics
  const submittedCount = reports.filter((r) => r.status === 'Submitted').length;
  const reviewCount = reports.filter((r) => r.status === 'Under Review').length;
  const progressCount = reports.filter((r) => r.status === 'In Progress').length;
  const closedCount = reports.filter((r) => r.status === 'Corrected').length;

  const recentReports = [...reports].slice(0, 5);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-red-50 text-[#7A1315]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1315]" />
            Under Review
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-amber-50 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            In Progress
          </span>
        );
      case 'Corrected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Corrected
          </span>
        );
      default:
        return null;
    }
  };

  const formatDate = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleDateString(undefined, {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <div className="space-y-6">
      {/* Brand & Safety Status Card */}
      <div className="bg-[#23262b] text-white rounded-xl p-4 sm:p-5 border border-[#34383e] shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3 sm:gap-4 min-w-0">
          <div className="bg-white rounded-lg p-1.5 sm:p-2 shadow-xs flex-shrink-0">
            <RoyLogo size="sm" className="h-8 sm:h-10 md:h-11 w-auto" />
          </div>
          <div className="min-w-0">
            <div className="text-[11px] sm:text-xs font-bold tracking-wider uppercase text-[#e57373]">
              ROY Fleet HSSE Management
            </div>
            <h2 className="text-base sm:text-lg md:text-xl font-bold font-heading text-white truncate">
              {isAdmin ? 'EHS Incident Command & Safety Analytics' : 'Near-Miss Prevention & Reporting Portal'}
            </h2>
            <p className="text-xs text-[#9aa0a6] mt-0.5 hidden sm:block">
              Zero retaliation safety reporting. Empowering fleet drivers &amp; staff to eliminate hazards before accidents happen.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto justify-end flex-shrink-0">
          {!isAdmin ? (
            <button
              type="button"
              onClick={onNavigateToReport}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#7A1315] hover:bg-[#590e10] text-white text-xs sm:text-sm font-semibold rounded shadow-xs transition-colors"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Log Near-Miss</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={onNavigateToQueue}
              className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 bg-[#7A1315] hover:bg-[#590e10] text-white text-xs sm:text-sm font-semibold rounded shadow-xs transition-colors"
            >
              <ListFilter className="w-4 h-4" />
              <span>Review Reports ({reports.filter((r) => r.status === 'Submitted' || r.status === 'Under Review').length})</span>
            </button>
          )}
        </div>
      </div>

      {/* Top Welcome & Actions Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2 border-b border-[#e1ddd0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
            {isAdmin ? 'Fleet Safety Overview' : `Welcome back, ${user.fullName.split(' ')[0]}`}
          </h1>
          <p className="text-sm text-[#6b7178] mt-1">
            {isAdmin
              ? 'Monitoring reported close calls, investigation statuses, and closure tracking across all depots.'
              : 'Notice something hazardous on the road or in the yard? Log it now to protect the fleet.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {isAdmin ? (
            <>
              {onExportCsv && (
                <button
                  type="button"
                  onClick={onExportCsv}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[#e1ddd0] bg-white text-[#202226] hover:bg-[#faf9f6] transition-colors"
                >
                  <Download className="w-3.5 h-3.5 text-[#6b7178]" />
                  <span>Export CSV</span>
                </button>
              )}
              <button
                type="button"
                onClick={onNavigateToQueue}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors shadow-xs"
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>Open Review Queue</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onNavigateToReport}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors shadow-xs"
            >
              <FilePlus2 className="w-4 h-4" />
              <span>Report a Near Miss</span>
            </button>
          )}
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Submitted */}
        <div className="bg-white border border-[#e1ddd0] border-l-4 border-l-slate-400 p-4 rounded shadow-2xs">
          <div className="flex items-center justify-between text-[#6b7178] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Submitted</span>
            <Clock className="w-4 h-4 text-slate-400" />
          </div>
          <div className="font-heading text-3xl font-bold text-[#202226]">
            {submittedCount}
          </div>
          <div className="text-[11px] text-[#6b7178] mt-1">Awaiting EHS acknowledgement</div>
        </div>

        {/* Under Review */}
        <div className="bg-white border border-[#e1ddd0] border-l-4 border-l-[#7A1315] p-4 rounded shadow-2xs">
          <div className="flex items-center justify-between text-[#6b7178] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Under Review</span>
            <AlertTriangle className="w-4 h-4 text-[#7A1315]" />
          </div>
          <div className="font-heading text-3xl font-bold text-[#7A1315]">
            {reviewCount}
          </div>
          <div className="text-[11px] text-[#6b7178] mt-1">Root cause investigation</div>
        </div>

        {/* In Progress */}
        <div className="bg-white border border-[#e1ddd0] border-l-4 border-l-amber-500 p-4 rounded shadow-2xs">
          <div className="flex items-center justify-between text-[#6b7178] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">In Progress</span>
            <TrendingUp className="w-4 h-4 text-amber-500" />
          </div>
          <div className="font-heading text-3xl font-bold text-amber-700">
            {progressCount}
          </div>
          <div className="text-[11px] text-[#6b7178] mt-1">Corrective engineering active</div>
        </div>

        {/* Corrected */}
        <div className="bg-white border border-[#e1ddd0] border-l-4 border-l-emerald-600 p-4 rounded shadow-2xs">
          <div className="flex items-center justify-between text-[#6b7178] mb-1">
            <span className="text-xs font-medium uppercase tracking-wider">Corrected</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="font-heading text-3xl font-bold text-emerald-700">
            {closedCount}
          </div>
          <div className="text-[11px] text-[#6b7178] mt-1">Feedback confirmed &amp; closed</div>
        </div>
      </div>

      {/* Safety Philosophy Alert Banner */}
      <div className="p-4 rounded bg-[#23262b] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded bg-white/10 text-emerald-400 mt-0.5">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <div className="font-heading font-semibold text-base text-white">
              Heinrich&apos;s Safety Law &mdash; Catch It Early
            </div>
            <p className="text-xs text-[#c7cad0] mt-0.5 max-w-2xl">
              For every 1 major incident, there are 29 minor accidents and 300 near misses. By logging close calls today, you directly prevent future road collisions.
            </p>
          </div>
        </div>
        {!isAdmin && (
          <button
            type="button"
            onClick={onNavigateToReport}
            className="flex-shrink-0 px-3 py-1.5 text-xs font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors"
          >
            File Near Miss
          </button>
        )}
      </div>

      {/* Recent Reports List */}
      <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs">
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e1ddd0]">
          <div>
            <h2 className="text-lg font-bold font-heading text-[#202226]">
              {isAdmin ? 'Recent Fleet Submissions' : 'My Recent Submissions'}
            </h2>
            <p className="text-xs text-[#6b7178]">
              {reports.length} total report{reports.length === 1 ? '' : 's'} recorded in the system
            </p>
          </div>

          <button
            type="button"
            onClick={isAdmin ? onNavigateToQueue : onNavigateToReport}
            className="text-xs font-semibold text-[#7A1315] hover:underline flex items-center gap-1"
          >
            <span>{isAdmin ? 'View Full Queue' : 'Submit New'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {recentReports.length === 0 ? (
          <div className="text-center py-10 text-sm text-[#6b7178]">
            <AlertTriangle className="w-8 h-8 mx-auto text-slate-300 mb-2" />
            <p>No near-miss reports logged yet.</p>
          </div>
        ) : (
          <div className="divide-y divide-[#e1ddd0]">
            {recentReports.map((report) => (
              <div
                key={report.id}
                onClick={() => onOpenReport(report.id)}
                className="py-3.5 first:pt-1 last:pb-1 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-[#faf9f6] p-2 rounded cursor-pointer transition-colors"
              >
                <div className="space-y-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#7A1315] uppercase">
                      {report.id}
                    </span>
                    <span className="text-sm font-semibold text-[#202226] truncate">
                      {report.placeOfOccurrence}
                    </span>
                  </div>

                  <div className="text-xs text-[#6b7178] flex flex-wrap items-center gap-2">
                    <span className="font-medium text-[#383c42]">{report.reporterName}</span>
                    <span>&middot;</span>
                    <span>{report.department}</span>
                    {report.truckNo && (
                      <>
                        <span>&middot;</span>
                        <span className="text-[#202226] font-mono font-medium">
                          Truck {report.truckNo}
                        </span>
                      </>
                    )}
                    <span>&middot;</span>
                    <span>{formatDate(report.createdAt)}</span>
                  </div>

                  <p className="text-xs text-[#565b62] line-clamp-1 max-w-2xl">
                    {report.description}
                  </p>
                </div>

                <div className="flex items-center gap-3 self-start sm:self-center flex-shrink-0">
                  {getStatusBadge(report.status)}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onOpenReport(report.id);
                    }}
                    className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium border border-[#e1ddd0] rounded bg-white hover:border-[#7A1315] hover:text-[#7A1315] text-[#383c42] transition-colors"
                  >
                    <Eye className="w-3 h-3" />
                    <span>{isAdmin ? 'Review' : 'View'}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
