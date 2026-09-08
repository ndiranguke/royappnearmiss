import React, { useState } from 'react';
import {
  AlertCircle,
  Calendar,
  Clock,
  FileCheck,
  FileText,
  MapPin,
  Send,
  Trash2,
  Upload,
  User as UserIcon,
  Video,
} from 'lucide-react';
import { ReportAttachment, User } from '../types';
import { StorageService } from '../services/storage';
import { RoyLogo } from './RoyLogo';

interface ReportFormProps {
  user: User;
  onSuccess: (reportId: string) => void;
  onCancel: () => void;
}

const MAX_ATTACH_BYTES = 4 * 1024 * 1024; // 4MB

export const ReportForm: React.FC<ReportFormProps> = ({
  user,
  onSuccess,
  onCancel,
}) => {
  const today = new Date().toISOString().slice(0, 10);
  const currentTime = new Date().toTimeString().slice(0, 5);

  const [department, setDepartment] = useState(user.department);
  const [designation, setDesignation] = useState(user.designation);
  const [truckNo, setTruckNo] = useState(user.truckNo || '');
  const [dateOfOccurrence, setDateOfOccurrence] = useState(today);
  const [timeOfOccurrence, setTimeOfOccurrence] = useState(currentTime);
  const [placeOfOccurrence, setPlaceOfOccurrence] = useState('');
  const [description, setDescription] = useState('');
  const [suggestedAction, setSuggestedAction] = useState('');

  const [attachments, setAttachments] = useState<ReportAttachment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Compress and handle image/video upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = e.target.files ? Array.from(e.target.files) : [];
    if (!files.length) return;

    if (attachments.length + files.length > 2) {
      setError('You can attach a maximum of 2 files.');
      return;
    }

    files.forEach((file) => {
      if (file.size > MAX_ATTACH_BYTES) {
        setError(`"${file.name}" exceeds the 4MB limit.`);
        return;
      }

      const isVideo = file.type.startsWith('video');
      const reader = new FileReader();

      reader.onload = () => {
        const rawUrl = reader.result as string;

        if (isVideo) {
          setAttachments((prev) => [
            ...prev,
            {
              id: 'att_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
              name: file.name,
              type: 'video',
              url: rawUrl,
              size: file.size,
            },
          ]);
        } else {
          // Compress image to keep localStorage efficient
          compressImage(rawUrl, (compressedUrl) => {
            setAttachments((prev) => [
              ...prev,
              {
                id: 'att_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5),
                name: file.name,
                type: 'image',
                url: compressedUrl,
                size: file.size,
              },
            ]);
          });
        }
      };

      reader.readAsDataURL(file);
    });

    e.target.value = '';
  };

  const compressImage = (dataUrl: string, callback: (result: string) => void) => {
    const img = new Image();
    img.onload = () => {
      const maxDimension = 1200;
      let width = img.width;
      let height = img.height;

      if (width > height) {
        if (width > maxDimension) {
          height = Math.round((height * maxDimension) / width);
          width = maxDimension;
        }
      } else {
        if (height > maxDimension) {
          width = Math.round((width * maxDimension) / height);
          height = maxDimension;
        }
      }

      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg', 0.75));
      } else {
        callback(dataUrl);
      }
    };
    img.onerror = () => callback(dataUrl);
    img.src = dataUrl;
  };

  const removeAttachment = (id: string) => {
    setAttachments((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!placeOfOccurrence.trim() || !description.trim()) {
      setError('Please provide the place of occurrence and detailed description.');
      return;
    }

    setLoading(true);
    try {
      const newReport = StorageService.createReport(
        user,
        {
          department: department.trim(),
          designation: designation.trim(),
          truckNo: truckNo.trim(),
          dateOfOccurrence,
          timeOfOccurrence,
          placeOfOccurrence: placeOfOccurrence.trim(),
          description: description.trim(),
          suggestedAction: suggestedAction.trim(),
        },
        attachments
      );

      onSuccess(newReport.id);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Failed to submit near-miss report.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="pb-3 border-b border-[#e1ddd0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
            Report a Near Miss
          </h1>
          <p className="text-sm text-[#6b7178] mt-1">
            Provide accurate information about the close call. Submissions are reviewed directly by the EHS management team.
          </p>
        </div>
        <div className="hidden sm:inline-flex bg-white rounded-lg p-1.5 border border-[#e1ddd0] shadow-2xs flex-shrink-0 self-start sm:self-center">
          <RoyLogo size="xs" className="h-6 sm:h-7 w-auto" />
        </div>
      </div>

      {error && (
        <div className="p-3.5 rounded bg-red-50 border-l-4 border-[#7A1315] text-xs sm:text-sm text-[#7A1315] flex items-center gap-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION 1: Reporter Details */}
        <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#e1ddd0] text-[#202226]">
            <UserIcon className="w-4 h-4 text-[#7A1315]" />
            <h2 className="font-heading font-semibold text-base">
              Section 1 &middot; Details of Person Reporting
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Full Name
              </label>
              <input
                type="text"
                disabled
                value={user.fullName}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded bg-[#f6f5f0] text-[#565b62]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Staff / Employee No.
              </label>
              <input
                type="text"
                disabled
                value={user.staffNo}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded bg-[#f6f5f0] text-[#565b62] font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Department
              </label>
              <input
                type="text"
                required
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Designation
              </label>
              <input
                type="text"
                required
                value={designation}
                onChange={(e) => setDesignation(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1">
                Truck No.{' '}
                <span className="text-[#6b7178] font-normal">
                  {user.role === 'driver' ? '(required)' : '(optional)'}
                </span>
              </label>
              <input
                type="text"
                required={user.role === 'driver'}
                value={truckNo}
                onChange={(e) => setTruckNo(e.target.value)}
                placeholder="e.g. KDN 221A"
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6] font-mono"
              />
            </div>
          </div>
        </div>

        {/* SECTION 2: Incident Time & Location */}
        <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#e1ddd0] text-[#202226]">
            <MapPin className="w-4 h-4 text-[#7A1315]" />
            <h2 className="font-heading font-semibold text-base">
              Section 2 &middot; Occurrence Details
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#6b7178]" />
                <span>Date of Occurrence</span>
              </label>
              <input
                id="f-date"
                type="date"
                required
                max={today}
                value={dateOfOccurrence}
                onChange={(e) => setDateOfOccurrence(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#383c42] mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#6b7178]" />
                <span>Time of Occurrence</span>
              </label>
              <input
                id="f-time"
                type="time"
                required
                value={timeOfOccurrence}
                onChange={(e) => setTimeOfOccurrence(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#383c42] mb-1">
              Place of Occurrence <span className="text-red-600">*</span>
            </label>
            <input
              id="f-place"
              type="text"
              required
              value={placeOfOccurrence}
              onChange={(e) => setPlaceOfOccurrence(e.target.value)}
              placeholder="e.g. Mombasa Road near Sultan Hamud weighbridge, or Depot Bay 4"
              className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
            />
            <p className="text-[11px] text-[#6b7178] mt-1">
              Specify landmark, kilometer marker, highway name, or facility warehouse bay.
            </p>
          </div>
        </div>

        {/* SECTION 3: Description & Suggestions */}
        <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#e1ddd0] text-[#202226]">
            <FileText className="w-4 h-4 text-[#7A1315]" />
            <h2 className="font-heading font-semibold text-base">
              Section 3 &middot; Incident Description
            </h2>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#383c42] mb-1">
              What happened? Give a brief description <span className="text-red-600">*</span>
            </label>
            <textarea
              id="f-desc"
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the circumstances leading to the near-miss, speed, road conditions, equipment involved, and actions taken to avoid harm..."
              className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#383c42] mb-1">
              Suggested corrective / defensive action{' '}
              <span className="text-[#6b7178] font-normal">(optional)</span>
            </label>
            <textarea
              id="f-action"
              rows={3}
              value={suggestedAction}
              onChange={(e) => setSuggestedAction(e.target.value)}
              placeholder="What do you think should be done to prevent this happening again? (e.g., lighting upgrade, brake line replacement, signage, re-training)..."
              className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
            />
          </div>
        </div>

        {/* SECTION 4: Attachments */}
        <div className="bg-white border border-[#e1ddd0] rounded p-5 sm:p-6 shadow-2xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-[#e1ddd0] text-[#202226]">
            <Upload className="w-4 h-4 text-[#7A1315]" />
            <h2 className="font-heading font-semibold text-base">
              Section 4 &middot; Photographic / Video Evidence (Optional)
            </h2>
          </div>

          <div>
            <label
              htmlFor="f-file-input"
              className="border-2 border-dashed border-[#c3c8cd] hover:border-[#7A1315] rounded p-6 flex flex-col items-center justify-center text-center cursor-pointer bg-[#faf9f6] transition-colors"
            >
              <Upload className="w-8 h-8 text-[#6b7178] mb-2" />
              <span className="text-sm font-semibold text-[#202226]">
                Click or drag photos / videos here
              </span>
              <span className="text-xs text-[#6b7178] mt-1">
                Up to 2 files &middot; Max 4MB each &middot; JPG, PNG, MP4, MOV
              </span>
              <input
                id="f-file-input"
                type="file"
                accept="image/*,video/*"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Attachment Previews */}
          {attachments.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {attachments.map((att) => (
                <div
                  key={att.id}
                  className="relative w-28 h-28 rounded border border-[#e1ddd0] bg-black overflow-hidden group shadow-2xs"
                >
                  {att.type === 'image' ? (
                    <img
                      src={att.url}
                      alt={att.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-white bg-slate-900 p-2">
                      <Video className="w-6 h-6 mb-1 text-emerald-400" />
                      <span className="text-[10px] truncate max-w-full text-center">
                        {att.name}
                      </span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => removeAttachment(att.id)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 hover:bg-red-600 text-white flex items-center justify-center transition-colors shadow-xs"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-[#565b62] hover:text-[#202226] border border-[#e1ddd0] rounded bg-white hover:bg-[#faf9f6]"
          >
            Cancel
          </button>

          <button
            id="submit-report-btn"
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-6 py-2.5 text-sm font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? (
              <span>Submitting Report...</span>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Near-Miss Report</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
