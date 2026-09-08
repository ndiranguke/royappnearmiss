import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  Filter,
  MapPin,
  Search,
  Truck,
  User as UserIcon,
} from 'lucide-react';
import { NearMissReport, ReportStatus } from '../types';

interface ReviewQueueProps {
  reports: NearMissReport[];
  onReviewReport: (reportId: string) => void;
}

export const ReviewQueue: React.FC<ReviewQueueProps> = ({
  reports,
  onReviewReport,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((r) => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const combined = `${r.id} ${r.reporterName} ${r.department} ${r.placeOfOccurrence} ${r.description} ${r.truckNo || ''}`.toLowerCase();
      return combined.includes(q);
    }
    return true;
  });

  const getStatusBadge = (status: ReportStatus) => {
    switch (status) {
      case 'Submitted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase bg-slate-100 text-slate-700">
            <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
            Submitted
          </span>
        );
      case 'Under Review':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase bg-red-50 text-[#7A1315]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#7A1315]" />
            Under Review
          </span>
        );
      case 'In Progress':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase bg-amber-50 text-amber-800">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
            In Progress
          </span>
        );
      case 'Corrected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-bold tracking-wide uppercase bg-emerald-50 text-emerald-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
            Corrected
          </span>
        );
    }
  };

  const pendingAckCount = reports.filter((r) => r.status === 'Submitted').length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#e1ddd0]">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
              EHS Review Queue
            </h1>
            {pendingAckCount > 0 && (
              <span className="bg-red-100 text-[#7A1315] text-xs font-bold px-2 py-0.5 rounded-full">
                {pendingAckCount} Needs Ack
              </span>
            )}
          </div>
          <p className="text-sm text-[#6b7178] mt-1">
            Review near-miss reports from drivers and operational staff. Acknowledge, investigate, and record corrective actions.
          </p>
        </div>
      </div>

      {/* Filter and Search controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7178]" />
          <input
            id="queue-search-input"
            type="text"
            placeholder="Search by driver, truck number, location, or keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-sm border border-[#e1ddd0] rounded bg-white focus:outline-hidden focus:border-[#7A1315]"
          />
        </div>

        <div className="flex items-center gap-1 bg-white p-1 border border-[#e1ddd0] rounded overflow-x-auto">
          {['ALL', 'Submitted', 'Under Review', 'In Progress', 'Corrected'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 text-xs font-medium rounded whitespace-nowrap transition-colors ${
                filterStatus === st
                  ? 'bg-[#7A1315] text-white'
                  : 'text-[#565b62] hover:text-[#202226] hover:bg-[#faf9f6]'
              }`}
            >
              {st === 'ALL' ? 'All' : st}
              {st === 'Submitted' && pendingAckCount > 0 && ` (${pendingAckCount})`}
            </button>
          ))}
        </div>
      </div>

      {/* Queue items */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-[#e1ddd0] rounded p-12 text-center text-[#6b7178]">
          <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-500 mb-3" />
          <h3 className="font-heading text-lg font-bold text-[#202226]">
            No reports in queue
          </h3>
          <p className="text-xs text-[#6b7178] mt-1 max-w-sm mx-auto">
            All reports matching this criteria have been resolved, or no submissions exist.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => {
            const isUnacknowledged = report.status === 'Submitted';

            return (
              <div
                key={report.id}
                onClick={() => onReviewReport(report.id)}
                className={`bg-white border rounded p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs ${
                  isUnacknowledged
                    ? 'border-l-4 border-l-red-600 border-[#e1ddd0]'
                    : 'border-[#e1ddd0] hover:border-[#7A1315]'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#f0eee6]">
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="font-mono text-xs font-bold text-[#7A1315] bg-[#7A1315]/10 px-2 py-0.5 rounded uppercase">
                      {report.id}
                    </span>
                    <span className="font-bold text-sm text-[#202226]">
                      {report.placeOfOccurrence}
                    </span>
                    {isUnacknowledged && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-bold text-red-700 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                        <AlertCircle className="w-3 h-3" /> Needs EHS Ack
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">{getStatusBadge(report.status)}</div>
                </div>

                <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs text-[#6b7178]">
                  <div className="flex items-center gap-1.5">
                    <UserIcon className="w-3.5 h-3.5 text-[#7A1315]" />
                    <span className="font-medium text-[#202226]">{report.reporterName}</span>
                    <span>({report.department})</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#565b62]" />
                    <span>Truck:</span>
                    <span className="font-mono font-medium text-[#202226]">
                      {report.truckNo || 'N/A'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#565b62]" />
                    <span>
                      {report.dateOfOccurrence} at {report.timeOfOccurrence}
                    </span>
                  </div>
                </div>

                <div className="mt-3 text-xs text-[#565b62] line-clamp-2 leading-relaxed bg-[#faf9f6] p-2.5 rounded border border-[#f0eee6]">
                  <span className="font-semibold text-[#202226]">Report: </span>
                  {report.description}
                </div>

                <div className="mt-3.5 flex items-center justify-between text-xs pt-2 border-t border-[#f0eee6]">
                  <span className="text-[#6b7178]">
                    {report.attachments.length > 0
                      ? `${report.attachments.length} attachment(s) included`
                      : 'No media attachments'}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onReviewReport(report.id);
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1 font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors"
                  >
                    <span>Review Incident</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
