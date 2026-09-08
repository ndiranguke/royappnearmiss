export type UserRole = 'staff' | 'driver' | 'admin';

export interface User {
  id: string;
  fullName: string;
  staffNo: string;
  department: string;
  designation: string;
  role: UserRole;
  truckNo?: string;
  active: boolean;
  createdAt: string;
  password?: string; // used for demo auth in mock storage
}

export type ReportStatus = 'Submitted' | 'Under Review' | 'In Progress' | 'Corrected';

export interface ReportAttachment {
  id: string;
  name: string;
  type: 'image' | 'video';
  url: string; // base64 or object URL
  driveUrl?: string;
  size?: number;
}

export interface ReportTimelineEntry {
  status: string;
  by: string;
  at: string;
  note?: string;
}

export interface NearMissReport {
  id: string;
  reporterId: string;
  reporterName: string;
  department: string;
  designation: string;
  truckNo?: string;
  dateOfOccurrence: string;
  timeOfOccurrence: string;
  placeOfOccurrence: string;
  description: string;
  suggestedAction?: string;
  status: ReportStatus;
  ehsAck?: {
    by: string;
    designation: string;
    date: string;
  } | null;
  correctiveAction?: {
    text: string;
    by: string;
    date: string;
  } | null;
  employeeConfirmed: boolean;
  timeline: ReportTimelineEntry[];
  attachments: ReportAttachment[];
  createdAt: number;
}

export interface NotificationItem {
  id: string;
  userId: string;
  reportId?: string;
  message: string;
  read: boolean;
  at: string;
}

export type NavView =
  | 'home'
  | 'report'
  | 'myreports'
  | 'queue'
  | 'master'
  | 'education'
  | 'notifications'
  | 'review';
