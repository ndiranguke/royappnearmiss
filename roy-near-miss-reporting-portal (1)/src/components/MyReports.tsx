import React, { useState } from 'react';
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FilePlus2,
  MapPin,
  Search,
  Truck,
} from 'lucide-react';
import { NearMissReport, ReportStatus } from '../types';

interface MyReportsProps {
  reports: NearMissReport[];
  onOpenReport: (reportId: string) => void;
  onNavigateToCreate: () => void;
}

export const MyReports: React.FC<MyReportsProps> = ({
  reports,
  onOpenReport,
  onNavigateToCreate,
}) => {
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter((r) => {
    if (filterStatus !== 'ALL' && r.status !== filterStatus) return false;
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const combined = `${r.id} ${r.placeOfOccurrence} ${r.description} ${r.truckNo || ''}`.toLowerCase();
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#e1ddd0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
            My Near-Miss Reports
          </h1>
          <p className="text-sm text-[#6b7178] mt-1">
            Track all incident submissions, supervisory reviews, and verified corrective actions.
          </p>
        </div>

        <button
          type="button"
          onClick={onNavigateToCreate}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors shadow-xs"
        >
          <FilePlus2 className="w-4 h-4" />
          <span>New Near Miss</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7178]" />
          <input
            type="text"
            placeholder="Search by ID, location, truck, or description..."
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
              {st === 'ALL' ? 'All Reports' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Reports Listing */}
      {filteredReports.length === 0 ? (
        <div className="bg-white border border-[#e1ddd0] rounded p-12 text-center text-[#6b7178]">
          <AlertTriangle className="w-10 h-10 mx-auto text-slate-300 mb-3" />
          <h3 className="font-heading text-lg font-bold text-[#202226]">
            No reports match your filters
          </h3>
          <p className="text-xs text-[#6b7178] mt-1 max-w-sm mx-auto">
            Try adjusting your search query or submit a new near-miss report.
          </p>
          <button
            type="button"
            onClick={onNavigateToCreate}
            className="mt-4 inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded bg-[#7A1315] text-white hover:bg-[#590e10]"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            <span>Create Near Miss</span>
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report) => (
            <div
              key={report.id}
              onClick={() => onOpenReport(report.id)}
              className="bg-white border border-[#e1ddd0] hover:border-[#7A1315] rounded p-4 sm:p-5 shadow-2xs cursor-pointer transition-all hover:shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#f0eee6]">
                <div className="flex items-center gap-3">
                  <span className="font-mono text-xs font-bold text-[#7A1315] bg-[#7A1315]/10 px-2.5 py-0.5 rounded uppercase">
                    {report.id}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs text-[#6b7178]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{report.dateOfOccurrence}</span>
                    <Clock className="w-3.5 h-3.5 ml-1.5" />
                    <span>{report.timeOfOccurrence}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-center">
                  {report.employeeConfirmed && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                      <CheckCircle className="w-3 h-3" /> Confirmed
                    </span>
                  )}
                  {getStatusBadge(report.status)}
                </div>
              </div>

              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-sm font-bold text-[#202226]">
                  <MapPin className="w-4 h-4 text-[#7A1315] flex-shrink-0" />
                  <span>{report.placeOfOccurrence}</span>
                  {report.truckNo && (
                    <span className="inline-flex items-center gap-1 ml-2 text-xs font-mono font-medium text-[#565b62] bg-[#f6f5f0] px-2 py-0.5 rounded">
                      <Truck className="w-3 h-3" /> {report.truckNo}
                    </span>
                  )}
                </div>

                <p className="text-xs text-[#565b62] line-clamp-2 leading-relaxed">
                  {report.description}
                </p>

                {report.correctiveAction && (
                  <div className="mt-2.5 p-2.5 rounded bg-emerald-50/70 border border-emerald-200 text-xs text-emerald-900">
                    <span className="font-semibold">Corrective Action Taken: </span>
                    <span>{report.correctiveAction.text}</span>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-2.5 border-t border-[#f0eee6] flex items-center justify-between text-xs text-[#6b7178]">
                <span>
                  {report.timeline.length} timeline event{report.timeline.length === 1 ? '' : 's'}
                </span>
                <span className="font-medium text-[#7A1315] flex items-center gap-1">
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Details</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
