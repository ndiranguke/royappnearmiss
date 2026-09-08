import { NearMissReport, NotificationItem, ReportAttachment, User } from '../types';

export const ROY_LOGO = "/roy-logo.png";

const USERS_KEY = 'ROY_NM_USERS_DATA';
const REPORTS_KEY = 'ROY_NM_REPORTS_DATA';
const NOTIFS_KEY = 'ROY_NM_NOTIFICATIONS_DATA';
const CURRENT_USER_KEY = 'ROY_NM_CURRENT_USER';
const ADMIN_CODE_KEY = 'ROY_NM_ADMIN_CODE';

const INITIAL_ADMIN_CODE = 'ROY-SAFE2026';

const SEED_USERS: User[] = [
  {
    id: 'u_admin_default',
    fullName: 'EHS Administrator',
    staffNo: 'ADMIN001',
    department: 'EHS / HSSE',
    designation: 'EHS Manager',
    role: 'admin',
    truckNo: '',
    active: true,
    createdAt: '2026-08-01T08:00:00.000Z',
    password: 'Admin@123',
  },
  {
    id: 'u_driver_1',
    fullName: 'John Kamau',
    staffNo: 'DRV-101',
    department: 'Fleet Operations',
    designation: 'Heavy Commercial Driver',
    role: 'driver',
    truckNo: 'KDN 221A',
    active: true,
    createdAt: '2026-08-10T09:30:00.000Z',
    password: 'Driver@123',
  },
  {
    id: 'u_driver_2',
    fullName: 'David Ochieng',
    staffNo: 'DRV-102',
    department: 'Long Haul Logistics',
    designation: 'Tanker Driver',
    role: 'driver',
    truckNo: 'KDG 849Z',
    active: true,
    createdAt: '2026-08-15T11:00:00.000Z',
    password: 'Driver@123',
  },
  {
    id: 'u_staff_1',
    fullName: 'Grace Muthoni',
    staffNo: 'STF-501',
    department: 'Warehouse & Loading Yard',
    designation: 'Dispatch Supervisor',
    role: 'staff',
    truckNo: '',
    active: true,
    createdAt: '2026-08-18T14:20:00.000Z',
    password: 'Staff@123',
  },
];

const SEED_REPORTS: NearMissReport[] = [
  {
    id: 'nm_k9z1',
    reporterId: 'u_driver_1',
    reporterName: 'John Kamau',
    department: 'Fleet Operations',
    designation: 'Heavy Commercial Driver',
    truckNo: 'KDN 221A',
    dateOfOccurrence: '2026-09-06',
    timeOfOccurrence: '14:35',
    placeOfOccurrence: 'Mombasa Road near Salama descent',
    description:
      'Noticeable brake fade while descending the steep Salama hill with 28T payload. Air pressure was within range, but drum temperature spiked. Switched to engine compression brake, slowed down to crawler gear, and safely navigated to the runaway buffer area.',
    suggestedAction:
      'Conduct a thorough pneumatic and friction pad inspection on trailer axles 2 and 3 before returning this truck to service.',
    status: 'Under Review',
    ehsAck: {
      by: 'EHS Administrator',
      designation: 'EHS Manager',
      date: '2026-09-06T15:20:00.000Z',
    },
    correctiveAction: null,
    employeeConfirmed: false,
    timeline: [
      {
        status: 'Submitted',
        by: 'John Kamau',
        at: '2026-09-06T14:50:00.000Z',
        note: 'Report submitted via driver mobile portal.',
      },
      {
        status: 'Under Review',
        by: 'EHS Administrator',
        at: '2026-09-06T15:20:00.000Z',
        note: 'EHS acknowledged receipt. Workshop foreman notified to quarantine truck KDN 221A upon arrival.',
      },
    ],
    attachments: [],
    createdAt: new Date('2026-09-06T14:50:00.000Z').getTime(),
  },
  {
    id: 'nm_j8b4',
    reporterId: 'u_driver_2',
    reporterName: 'David Ochieng',
    department: 'Long Haul Logistics',
    designation: 'Tanker Driver',
    truckNo: 'KDG 849Z',
    dateOfOccurrence: '2026-09-07',
    timeOfOccurrence: '09:15',
    placeOfOccurrence: 'Athi River weighbridge approach lane',
    description:
      'A third-party flatbed lorry overtook aggressively from the hard shoulder and cut directly into my stopping distance to beat the scale queue. Emergency collision mitigation and manual horn prevented a severe front-corner collision.',
    suggestedAction:
      'Install traffic delineation cones and request highway authority enforcement at the approach 200m before the weighbridge gate.',
    status: 'Submitted',
    ehsAck: null,
    correctiveAction: null,
    employeeConfirmed: false,
    timeline: [
      {
        status: 'Submitted',
        by: 'David Ochieng',
        at: '2026-09-07T09:30:00.000Z',
        note: 'Report submitted with dashcam notes.',
      },
    ],
    attachments: [],
    createdAt: new Date('2026-09-07T09:30:00.000Z').getTime(),
  },
  {
    id: 'nm_c2m7',
    reporterId: 'u_staff_1',
    reporterName: 'Grace Muthoni',
    department: 'Warehouse & Loading Yard',
    designation: 'Dispatch Supervisor',
    truckNo: '',
    dateOfOccurrence: '2026-09-04',
    timeOfOccurrence: '16:00',
    placeOfOccurrence: 'Loading Bay 3 blind corner',
    description:
      'A 3-ton counterbalance forklift reversed around the high-stack pallet blind corner just as a warehouse clerk was walking across toward the dispatch desk. The driver heard a shout and braked within half a meter of the worker.',
    suggestedAction:
      'Mount a 180-degree parabolic convex mirror on column C-4 and apply high-visibility yellow floor paint for pedestrian-only walkways.',
    status: 'Corrected',
    ehsAck: {
      by: 'EHS Administrator',
      designation: 'EHS Manager',
      date: '2026-09-04T16:25:00.000Z',
    },
    correctiveAction: {
      text: 'Heavy-duty convex mirror installed at Column C-4. Demarcated pedestrian walkway repainted with anti-slip yellow floor epoxy, and forklift horn-at-corner rule re-briefed in tool-box talk.',
      by: 'EHS Administrator',
      date: '2026-09-05T11:00:00.000Z',
    },
    employeeConfirmed: true,
    timeline: [
      {
        status: 'Submitted',
        by: 'Grace Muthoni',
        at: '2026-09-04T16:10:00.000Z',
        note: 'Report logged by dispatch team.',
      },
      {
        status: 'Under Review',
        by: 'EHS Administrator',
        at: '2026-09-04T16:25:00.000Z',
        note: 'EHS inspection carried out at Bay 3.',
      },
      {
        status: 'In Progress',
        by: 'EHS Administrator',
        at: '2026-09-05T08:00:00.000Z',
        note: 'Maintenance team procured mirror and floor markings paint.',
      },
      {
        status: 'Corrected',
        by: 'EHS Administrator',
        at: '2026-09-05T11:00:00.000Z',
        note: 'Installation complete. Safety audit passed.',
      },
      {
        status: 'Feedback Confirmed',
        by: 'Grace Muthoni',
        at: '2026-09-05T14:15:00.000Z',
        note: 'Employee verified physical corrective action at Bay 3 and confirmed closure.',
      },
    ],
    attachments: [],
    createdAt: new Date('2026-09-04T16:10:00.000Z').getTime(),
  },
  {
    id: 'nm_m5p2',
    reporterId: 'u_driver_1',
    reporterName: 'John Kamau',
    department: 'Fleet Operations',
    designation: 'Heavy Commercial Driver',
    truckNo: 'KDN 221A',
    dateOfOccurrence: '2026-09-05',
    timeOfOccurrence: '19:40',
    placeOfOccurrence: 'Depot Yard Gate 2 pre-trip inspection area',
    description:
      'Overhead floodlight above the trailer kingpin inspection bay has failed completely. Driver had to use a handheld phone torch while inspecting coupling jaws, creating a pinch and fall hazard on the slippery wet gantry.',
    suggestedAction:
      'Fit an IP66 LED spotlight with emergency backup battery over the inspection platform.',
    status: 'In Progress',
    ehsAck: {
      by: 'EHS Administrator',
      designation: 'EHS Manager',
      date: '2026-09-05T20:10:00.000Z',
    },
    correctiveAction: null,
    employeeConfirmed: false,
    timeline: [
      {
        status: 'Submitted',
        by: 'John Kamau',
        at: '2026-09-05T19:55:00.000Z',
        note: 'Report submitted before night departure.',
      },
      {
        status: 'Under Review',
        by: 'EHS Administrator',
        at: '2026-09-05T20:10:00.000Z',
        note: 'Night duty supervisor informed.',
      },
      {
        status: 'In Progress',
        by: 'EHS Administrator',
        at: '2026-09-06T08:30:00.000Z',
        note: 'Electrical contractors hired to replace the halogen lamp with high-intensity LED light bar today.',
      },
    ],
    attachments: [],
    createdAt: new Date('2026-09-05T19:55:00.000Z').getTime(),
  },
];

const SEED_NOTIFS: NotificationItem[] = [
  {
    id: 'notif_1',
    userId: 'u_admin_default',
    reportId: 'nm_j8b4',
    message: 'New near-miss report NM_J8B4 from David Ochieng (Truck KDG 849Z).',
    read: false,
    at: '2026-09-07T09:30:00.000Z',
  },
  {
    id: 'notif_2',
    userId: 'u_driver_1',
    reportId: 'nm_k9z1',
    message: 'Your report NM_K9Z1 was acknowledged by EHS Administrator and is now under review.',
    read: false,
    at: '2026-09-06T15:20:00.000Z',
  },
  {
    id: 'notif_3',
    userId: 'u_driver_1',
    reportId: 'nm_m5p2',
    message: 'Corrective action is now in progress for report NM_M5P2.',
    read: true,
    at: '2026-09-06T08:30:00.000Z',
  },
  {
    id: 'notif_4',
    userId: 'u_staff_1',
    reportId: 'nm_c2m7',
    message: 'Corrective action has been taken on report NM_C2M7. Please review and confirm.',
    read: true,
    at: '2026-09-05T11:00:00.000Z',
  },
];

function initLocalStorage(): void {
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
  }
  if (!localStorage.getItem(REPORTS_KEY)) {
    localStorage.setItem(REPORTS_KEY, JSON.stringify(SEED_REPORTS));
  }
  if (!localStorage.getItem(NOTIFS_KEY)) {
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(SEED_NOTIFS));
  }
  if (!localStorage.getItem(ADMIN_CODE_KEY)) {
    localStorage.setItem(ADMIN_CODE_KEY, INITIAL_ADMIN_CODE);
  }
}

// Call on startup
initLocalStorage();

function getStoredUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : SEED_USERS;
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: User[]): void {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function getStoredReports(): NearMissReport[] {
  try {
    const raw = localStorage.getItem(REPORTS_KEY);
    return raw ? JSON.parse(raw) : SEED_REPORTS;
  } catch {
    return SEED_REPORTS;
  }
}

function saveReports(reports: NearMissReport[]): void {
  localStorage.setItem(REPORTS_KEY, JSON.stringify(reports));
}

function getStoredNotifications(): NotificationItem[] {
  try {
    const raw = localStorage.getItem(NOTIFS_KEY);
    return raw ? JSON.parse(raw) : SEED_NOTIFS;
  } catch {
    return SEED_NOTIFS;
  }
}

function saveNotifications(notifs: NotificationItem[]): void {
  localStorage.setItem(NOTIFS_KEY, JSON.stringify(notifs));
}

export const StorageService = {
  getCurrentUser(): User | null {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: User | null): void {
    if (user) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  },

  getAdminCode(): string {
    return localStorage.getItem(ADMIN_CODE_KEY) || INITIAL_ADMIN_CODE;
  },

  setAdminCode(code: string): void {
    localStorage.setItem(ADMIN_CODE_KEY, code);
  },

  login(staffNo: string, password: string, truckNo?: string): User {
    const sNo = (staffNo || '').trim().toLowerCase();
    const users = getStoredUsers();
    const user = users.find((u) => u.staffNo.toLowerCase() === sNo);

    if (!user || user.password !== password) {
      throw new Error('Incorrect staff / employee number or password.');
    }
    if (!user.active) {
      throw new Error('This account has been deactivated. Contact your EHS Manager.');
    }
    if (user.role === 'driver') {
      if (!truckNo && !user.truckNo) {
        throw new Error('Truck number is required for drivers to log in.');
      }
      if (truckNo) {
        user.truckNo = truckNo;
        saveUsers(users);
      }
    } else if (user.role === 'staff' && truckNo) {
      user.truckNo = truckNo;
      saveUsers(users);
    }

    this.setCurrentUser(user);
    return user;
  },

  register(payload: {
    fullName: string;
    staffNo: string;
    role: 'staff' | 'driver' | 'admin';
    department: string;
    designation: string;
    truckNo?: string;
    adminCode?: string;
    password: string;
  }): User {
    const fullName = payload.fullName.trim();
    const staffNo = payload.staffNo.trim();
    const role = payload.role;
    const department = payload.department.trim();
    const designation = payload.designation.trim();
    const truckNo = (payload.truckNo || '').trim();
    const adminCode = (payload.adminCode || '').trim();
    const pw = payload.password;

    if (!fullName || !staffNo || !role || !department || !designation || !pw) {
      throw new Error('Please fill in all required fields.');
    }
    if (role === 'driver' && !truckNo) {
      throw new Error('Truck number is required for driver accounts.');
    }
    if (role === 'admin' && adminCode !== this.getAdminCode()) {
      throw new Error('Incorrect EHS/Admin access code.');
    }
    if (pw.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const users = getStoredUsers();
    if (users.some((u) => u.staffNo.toLowerCase() === staffNo.toLowerCase())) {
      throw new Error('That staff number is already registered.');
    }

    const newUser: User = {
      id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      fullName,
      staffNo,
      department,
      designation,
      role,
      truckNo: role === 'admin' ? '' : truckNo,
      active: true,
      createdAt: new Date().toISOString(),
      password: pw,
    };

    users.push(newUser);
    saveUsers(users);
    this.setCurrentUser(newUser);
    return newUser;
  },

  getReports(requesterId: string, role?: string): NearMissReport[] {
    const reports = getStoredReports();
    if (role === 'admin') {
      return [...reports].sort((a, b) => b.createdAt - a.createdAt);
    }
    return reports
      .filter((r) => r.reporterId === requesterId)
      .sort((a, b) => b.createdAt - a.createdAt);
  },

  createReport(
    requester: User,
    payload: {
      department: string;
      designation: string;
      truckNo?: string;
      dateOfOccurrence: string;
      timeOfOccurrence: string;
      placeOfOccurrence: string;
      description: string;
      suggestedAction?: string;
    },
    attachments: ReportAttachment[] = []
  ): NearMissReport {
    const id = 'nm_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
    const now = new Date();
    const timelineEntry = {
      status: 'Submitted',
      by: requester.fullName,
      at: now.toISOString(),
      note: 'Report submitted by employee.',
    };

    const newReport: NearMissReport = {
      id,
      reporterId: requester.id,
      reporterName: requester.fullName,
      department: payload.department,
      designation: payload.designation,
      truckNo: payload.truckNo || requester.truckNo || '',
      dateOfOccurrence: payload.dateOfOccurrence,
      timeOfOccurrence: payload.timeOfOccurrence,
      placeOfOccurrence: payload.placeOfOccurrence,
      description: payload.description,
      suggestedAction: payload.suggestedAction || '',
      status: 'Submitted',
      ehsAck: null,
      correctiveAction: null,
      employeeConfirmed: false,
      timeline: [timelineEntry],
      attachments,
      createdAt: now.getTime(),
    };

    const reports = getStoredReports();
    reports.unshift(newReport);
    saveReports(reports);

    // Notify all admins
    const users = getStoredUsers();
    const admins = users.filter((u) => u.role === 'admin' && u.active);
    const notifs = getStoredNotifications();
    const truckLabel = newReport.truckNo ? ` (Truck ${newReport.truckNo})` : '';
    const alertMsg = `New near-miss report ${newReport.id.toUpperCase()} from ${requester.fullName}${truckLabel}.`;

    admins.forEach((admin) => {
      notifs.unshift({
        id: 'nt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        userId: admin.id,
        reportId: newReport.id,
        message: alertMsg,
        read: false,
        at: now.toISOString(),
      });
    });
    saveNotifications(notifs);

    return newReport;
  },

  acknowledgeReport(admin: User, reportId: string): NearMissReport {
    const reports = getStoredReports();
    const r = reports.find((x) => x.id === reportId);
    if (!r) throw new Error('Report not found.');

    const now = new Date().toISOString();
    r.status = 'Under Review';
    r.ehsAck = {
      by: admin.fullName,
      designation: admin.designation,
      date: now,
    };
    r.timeline.push({
      status: 'Under Review',
      by: admin.fullName,
      at: now,
      note: 'EHS acknowledged receipt of report and initiated review.',
    });

    saveReports(reports);

    // Notify reporter
    const notifs = getStoredNotifications();
    notifs.unshift({
      id: 'nt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: r.reporterId,
      reportId: r.id,
      message: `Your report ${r.id.toUpperCase()} was acknowledged by ${admin.fullName} and is now under review.`,
      read: false,
      at: now,
    });
    saveNotifications(notifs);

    return r;
  },

  setInProgress(admin: User, reportId: string, note: string): NearMissReport {
    if (!note.trim()) {
      throw new Error('Please provide details on the corrective action in progress.');
    }
    const reports = getStoredReports();
    const r = reports.find((x) => x.id === reportId);
    if (!r) throw new Error('Report not found.');

    const now = new Date().toISOString();
    r.status = 'In Progress';
    r.timeline.push({
      status: 'In Progress',
      by: admin.fullName,
      at: now,
      note,
    });

    saveReports(reports);

    // Notify reporter
    const notifs = getStoredNotifications();
    notifs.unshift({
      id: 'nt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: r.reporterId,
      reportId: r.id,
      message: `Corrective action is now in progress for report ${r.id.toUpperCase()}.`,
      read: false,
      at: now,
    });
    saveNotifications(notifs);

    return r;
  },

  closeReport(admin: User, reportId: string, correctiveText: string): NearMissReport {
    if (!correctiveText.trim()) {
      throw new Error('Describe the corrective action taken before closing.');
    }
    const reports = getStoredReports();
    const r = reports.find((x) => x.id === reportId);
    if (!r) throw new Error('Report not found.');

    const now = new Date().toISOString();
    r.status = 'Corrected';
    r.correctiveAction = {
      text: correctiveText.trim(),
      by: admin.fullName,
      date: now,
    };
    r.timeline.push({
      status: 'Corrected',
      by: admin.fullName,
      at: now,
      note: 'Corrective action completed. Issue closed pending employee confirmation.',
    });

    saveReports(reports);

    // Notify reporter
    const notifs = getStoredNotifications();
    notifs.unshift({
      id: 'nt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      userId: r.reporterId,
      reportId: r.id,
      message: `Corrective action has been completed for report ${r.id.toUpperCase()}. Please review and confirm.`,
      read: false,
      at: now,
    });
    saveNotifications(notifs);

    return r;
  },

  confirmFeedback(user: User, reportId: string): NearMissReport {
    const reports = getStoredReports();
    const r = reports.find((x) => x.id === reportId);
    if (!r) throw new Error('Report not found.');
    if (r.reporterId !== user.id) {
      throw new Error('Only the reporting employee can confirm feedback receipt.');
    }

    const now = new Date().toISOString();
    r.employeeConfirmed = true;
    r.timeline.push({
      status: 'Feedback Confirmed',
      by: user.fullName,
      at: now,
      note: 'Employee confirmed receipt of corrective action feedback.',
    });

    saveReports(reports);

    // Notify admins
    const users = getStoredUsers();
    const admins = users.filter((u) => u.role === 'admin' && u.active);
    const notifs = getStoredNotifications();
    admins.forEach((admin) => {
      notifs.unshift({
        id: 'nt_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
        userId: admin.id,
        reportId: r.id,
        message: `${user.fullName} confirmed receipt of feedback on ${r.id.toUpperCase()}.`,
        read: false,
        at: now,
      });
    });
    saveNotifications(notifs);

    return r;
  },

  getUsers(): User[] {
    const users = getStoredUsers();
    return [...users].sort((a, b) => a.fullName.localeCompare(b.fullName));
  },

  addUser(
    admin: User,
    payload: {
      fullName: string;
      staffNo: string;
      role: 'staff' | 'driver' | 'admin';
      department: string;
      designation: string;
      truckNo?: string;
      password: string;
    }
  ): User {
    if (admin.role !== 'admin') throw new Error('Not authorized.');
    const fullName = payload.fullName.trim();
    const staffNo = payload.staffNo.trim();
    const role = payload.role;
    const department = payload.department.trim();
    const designation = payload.designation.trim();
    const truckNo = (payload.truckNo || '').trim();
    const pw = payload.password;

    if (!fullName || !staffNo || !role || !department || !designation || !pw) {
      throw new Error('Please fill in all required fields.');
    }
    if (role === 'driver' && !truckNo) {
      throw new Error('Truck number is required for driver accounts.');
    }
    if (pw.length < 6) {
      throw new Error('Password must be at least 6 characters.');
    }

    const users = getStoredUsers();
    if (users.some((u) => u.staffNo.toLowerCase() === staffNo.toLowerCase())) {
      throw new Error('That staff number is already registered.');
    }

    const newUser: User = {
      id: 'u_' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      fullName,
      staffNo,
      department,
      designation,
      role,
      truckNo: role === 'admin' ? '' : truckNo,
      active: true,
      createdAt: new Date().toISOString(),
      password: pw,
    };

    users.push(newUser);
    saveUsers(users);
    return newUser;
  },

  updateUser(
    admin: User,
    userId: string,
    patch: {
      fullName?: string;
      department?: string;
      designation?: string;
      role?: 'staff' | 'driver' | 'admin';
      truckNo?: string;
      newPassword?: string;
    }
  ): User {
    if (admin.role !== 'admin') throw new Error('Not authorized.');
    const users = getStoredUsers();
    const u = users.find((x) => x.id === userId);
    if (!u) throw new Error('User not found.');

    if (patch.fullName !== undefined) u.fullName = patch.fullName.trim();
    if (patch.department !== undefined) u.department = patch.department.trim();
    if (patch.designation !== undefined) u.designation = patch.designation.trim();
    if (patch.role !== undefined) u.role = patch.role;
    if (patch.truckNo !== undefined) u.truckNo = patch.truckNo.trim();
    if (u.role === 'admin') u.truckNo = '';
    if (u.role === 'driver' && !u.truckNo) {
      throw new Error('Truck number is required for driver accounts.');
    }
    if (patch.newPassword) {
      if (patch.newPassword.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }
      u.password = patch.newPassword;
    }

    saveUsers(users);
    return u;
  },

  toggleUserActive(admin: User, userId: string): { id: string; active: boolean } {
    if (admin.role !== 'admin') throw new Error('Not authorized.');
    if (admin.id === userId) {
      throw new Error('You cannot suspend your own administrative account.');
    }
    const users = getStoredUsers();
    const u = users.find((x) => x.id === userId);
    if (!u) throw new Error('User not found.');

    u.active = !u.active;
    saveUsers(users);
    return { id: userId, active: u.active };
  },

  getNotifications(userId: string): NotificationItem[] {
    const notifs = getStoredNotifications();
    return notifs
      .filter((n) => n.userId === userId)
      .sort((a, b) => new Date(b.at).getTime() - new Date(a.at).getTime());
  },

  markNotificationRead(notificationId: string): void {
    const notifs = getStoredNotifications();
    const n = notifs.find((x) => x.id === notificationId);
    if (n) {
      n.read = true;
      saveNotifications(notifs);
    }
  },

  markAllNotificationsRead(userId: string): void {
    const notifs = getStoredNotifications();
    notifs.forEach((n) => {
      if (n.userId === userId) n.read = true;
    });
    saveNotifications(notifs);
  },

  exportReportsCsv(): string {
    const reports = getStoredReports();
    const headers = [
      'ID',
      'Reporter',
      'Department',
      'Designation',
      'Truck No',
      'Date of Occurrence',
      'Time of Occurrence',
      'Place of Occurrence',
      'Description',
      'Suggested Action',
      'Status',
      'EHS Acknowledged By',
      'Corrective Action',
      'Employee Confirmed',
      'Date Created',
    ];

    const rows = reports.map((r) => [
      r.id.toUpperCase(),
      r.reporterName,
      r.department,
      r.designation,
      r.truckNo || 'N/A',
      r.dateOfOccurrence,
      r.timeOfOccurrence,
      r.placeOfOccurrence,
      r.description,
      r.suggestedAction || 'N/A',
      r.status,
      r.ehsAck ? `${r.ehsAck.by} (${r.ehsAck.designation})` : 'Pending',
      r.correctiveAction ? r.correctiveAction.text : 'Pending',
      r.employeeConfirmed ? 'Yes' : 'No',
      new Date(r.createdAt).toISOString(),
    ]);

    const all = [headers, ...rows];
    return all
      .map((row) =>
        row
          .map((v) => {
            const s = v === undefined || v === null ? '' : String(v);
            return `"${s.replace(/"/g, '""')}"`;
          })
          .join(',')
      )
      .join('\r\n');
  },

  resetToDemoData(): void {
    localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    localStorage.setItem(REPORTS_KEY, JSON.stringify(SEED_REPORTS));
    localStorage.setItem(NOTIFS_KEY, JSON.stringify(SEED_NOTIFS));
    localStorage.setItem(ADMIN_CODE_KEY, INITIAL_ADMIN_CODE);
  },
};
