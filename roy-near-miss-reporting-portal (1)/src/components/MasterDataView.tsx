import React, { useState } from 'react';
import {
  Download,
  Edit2,
  Lock,
  Plus,
  RefreshCw,
  Search,
  Shield,
  Trash2,
  Truck,
  UserCheck,
  UserPlus,
  UserX,
  Users,
} from 'lucide-react';
import { NearMissReport, User, UserRole } from '../types';
import { StorageService } from '../services/storage';

interface MasterDataViewProps {
  admin: User;
  reports: NearMissReport[];
  users: User[];
  onRefreshUsers: () => void;
  onRefreshAll: () => void;
}

export const MasterDataView: React.FC<MasterDataViewProps> = ({
  admin,
  reports,
  users,
  onRefreshUsers,
  onRefreshAll,
}) => {
  const [activeTab, setActiveTab] = useState<'reports' | 'users'>('reports');
  const [searchTerm, setSearchTerm] = useState('');

  // Add user modal state
  const [showAddModal, setShowAddModal] = useState(false);
  const [newFullName, setNewFullName] = useState('');
  const [newStaffNo, setNewStaffNo] = useState('');
  const [newRole, setNewRole] = useState<UserRole>('driver');
  const [newDepartment, setNewDepartment] = useState('');
  const [newDesignation, setNewDesignation] = useState('');
  const [newTruckNo, setNewTruckNo] = useState('');
  const [newPassword, setNewPassword] = useState('Safety@123');
  const [modalError, setModalError] = useState<string | null>(null);

  // Edit user modal state
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editFullName, setEditFullName] = useState('');
  const [editDepartment, setEditDepartment] = useState('');
  const [editDesignation, setEditDesignation] = useState('');
  const [editRole, setEditRole] = useState<UserRole>('driver');
  const [editTruckNo, setEditTruckNo] = useState('');
  const [editNewPassword, setEditNewPassword] = useState('');

  // Filtered reports
  const filteredReports = reports.filter((r) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      r.id.toLowerCase().includes(q) ||
      r.reporterName.toLowerCase().includes(q) ||
      r.department.toLowerCase().includes(q) ||
      r.placeOfOccurrence.toLowerCase().includes(q) ||
      (r.truckNo || '').toLowerCase().includes(q)
    );
  });

  // Filtered users
  const filteredUsers = users.filter((u) => {
    if (!searchTerm.trim()) return true;
    const q = searchTerm.toLowerCase();
    return (
      u.fullName.toLowerCase().includes(q) ||
      u.staffNo.toLowerCase().includes(q) ||
      u.department.toLowerCase().includes(q) ||
      u.designation.toLowerCase().includes(q) ||
      (u.truckNo || '').toLowerCase().includes(q)
    );
  });

  const handleExportCsv = () => {
    const csvContent = StorageService.exportReportsCsv();
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `ROY_Near_Miss_Master_Data_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    setModalError(null);

    try {
      StorageService.addUser(admin, {
        fullName: newFullName,
        staffNo: newStaffNo,
        role: newRole,
        department: newDepartment,
        designation: newDesignation,
        truckNo: newTruckNo,
        password: newPassword,
      });

      setShowAddModal(false);
      // Reset fields
      setNewFullName('');
      setNewStaffNo('');
      setNewDepartment('');
      setNewDesignation('');
      setNewTruckNo('');
      onRefreshUsers();
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : 'Failed to add user.');
    }
  };

  const openEditModal = (u: User) => {
    setEditingUser(u);
    setEditFullName(u.fullName);
    setEditDepartment(u.department);
    setEditDesignation(u.designation);
    setEditRole(u.role);
    setEditTruckNo(u.truckNo || '');
    setEditNewPassword('');
    setModalError(null);
  };

  const handleSaveEditUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    setModalError(null);

    try {
      StorageService.updateUser(admin, editingUser.id, {
        fullName: editFullName,
        department: editDepartment,
        designation: editDesignation,
        role: editRole,
        truckNo: editTruckNo,
        newPassword: editNewPassword ? editNewPassword : undefined,
      });

      setEditingUser(null);
      onRefreshUsers();
    } catch (err: unknown) {
      setModalError(err instanceof Error ? err.message : 'Failed to update user.');
    }
  };

  const handleToggleUser = (targetUserId: string) => {
    try {
      StorageService.toggleUserActive(admin, targetUserId);
      onRefreshUsers();
    } catch (err: unknown) {
      alert(err instanceof Error ? err.message : 'Failed to change user status.');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Reset all demo data (reports, accounts) back to factory defaults?')) {
      StorageService.resetToDemoData();
      onRefreshAll();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-3 border-b border-[#e1ddd0]">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-[#202226]">
            Safety Master Data
          </h1>
          <p className="text-sm text-[#6b7178] mt-1">
            Complete database of all near-miss records, registered drivers, staff, and system accounts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded border border-[#e1ddd0] bg-white hover:bg-[#faf9f6] text-[#202226] transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-[#6b7178]" />
            <span>Export Reports (CSV)</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded bg-[#7A1315] hover:bg-[#590e10] text-white transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add User / Admin</span>
          </button>

          <button
            type="button"
            onClick={handleResetData}
            title="Reset to sample records"
            className="p-2 text-xs font-medium rounded border border-[#e1ddd0] bg-white hover:bg-[#faf9f6] text-[#6b7178] hover:text-[#202226]"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="flex border-b-2 border-[#e1ddd0] w-full sm:w-auto">
          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-5 py-2 text-sm font-semibold -mb-[2px] border-b-2 transition-colors ${
              activeTab === 'reports'
                ? 'border-[#7A1315] text-[#7A1315]'
                : 'border-transparent text-[#6b7178] hover:text-[#202226]'
            }`}
          >
            Incident Reports ({reports.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('users')}
            className={`px-5 py-2 text-sm font-semibold -mb-[2px] border-b-2 transition-colors ${
              activeTab === 'users'
                ? 'border-[#7A1315] text-[#7A1315]'
                : 'border-transparent text-[#6b7178] hover:text-[#202226]'
            }`}
          >
            User Accounts ({users.length})
          </button>
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#6b7178]" />
          <input
            type="text"
            placeholder={
              activeTab === 'reports'
                ? 'Search reports by place, name, truck...'
                : 'Search users by name, staff no...'
            }
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm border border-[#e1ddd0] rounded bg-white focus:outline-hidden focus:border-[#7A1315]"
          />
        </div>
      </div>

      {/* TAB 1: REPORTS TABLE */}
      {activeTab === 'reports' && (
        <div className="bg-white border border-[#e1ddd0] rounded shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#faf9f6] border-b border-[#e1ddd0] text-[#6b7178] font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3.5">Report ID</th>
                  <th className="py-3 px-3.5">Reporter</th>
                  <th className="py-3 px-3.5">Dept.</th>
                  <th className="py-3 px-3.5">Truck</th>
                  <th className="py-3 px-3.5">Date</th>
                  <th className="py-3 px-3.5">Place</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5">EHS Ack</th>
                  <th className="py-3 px-3.5">Corrective Action</th>
                  <th className="py-3 px-3.5 text-center">Confirmed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee6]">
                {filteredReports.length === 0 ? (
                  <tr>
                    <td colSpan={10} className="py-8 text-center text-[#6b7178]">
                      No reports match the current query.
                    </td>
                  </tr>
                ) : (
                  filteredReports.map((r) => (
                    <tr key={r.id} className="hover:bg-[#faf9f6] transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-[#7A1315] uppercase">
                        {r.id}
                      </td>
                      <td className="py-3 px-3.5 font-medium text-[#202226]">
                        {r.reporterName}
                      </td>
                      <td className="py-3 px-3.5 text-[#565b62]">{r.department}</td>
                      <td className="py-3 px-3.5 font-mono text-[#565b62]">
                        {r.truckNo || '—'}
                      </td>
                      <td className="py-3 px-3.5 text-[#565b62] whitespace-nowrap">
                        {r.dateOfOccurrence}
                      </td>
                      <td className="py-3 px-3.5 text-[#202226] max-w-xs truncate">
                        {r.placeOfOccurrence}
                      </td>
                      <td className="py-3 px-3.5 whitespace-nowrap">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${
                            r.status === 'Submitted'
                              ? 'bg-slate-100 text-slate-700'
                              : r.status === 'Under Review'
                              ? 'bg-red-50 text-[#7A1315]'
                              : r.status === 'In Progress'
                              ? 'bg-amber-50 text-amber-800'
                              : 'bg-emerald-50 text-emerald-800'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#565b62] whitespace-nowrap">
                        {r.ehsAck ? r.ehsAck.by : '—'}
                      </td>
                      <td className="py-3 px-3.5 text-[#565b62] max-w-xs truncate">
                        {r.correctiveAction ? r.correctiveAction.text : '—'}
                      </td>
                      <td className="py-3 px-3.5 text-center">
                        <span
                          className={`font-semibold ${
                            r.employeeConfirmed ? 'text-emerald-700' : 'text-slate-400'
                          }`}
                        >
                          {r.employeeConfirmed ? 'Yes' : 'No'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: USER ACCOUNTS TABLE */}
      {activeTab === 'users' && (
        <div className="bg-white border border-[#e1ddd0] rounded shadow-2xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-[#faf9f6] border-b border-[#e1ddd0] text-[#6b7178] font-semibold uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3.5">Staff No.</th>
                  <th className="py-3 px-3.5">Full Name</th>
                  <th className="py-3 px-3.5">Role</th>
                  <th className="py-3 px-3.5">Department</th>
                  <th className="py-3 px-3.5">Designation</th>
                  <th className="py-3 px-3.5">Truck Assigned</th>
                  <th className="py-3 px-3.5">Status</th>
                  <th className="py-3 px-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0eee6]">
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-[#6b7178]">
                      No user accounts found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-[#faf9f6] transition-colors">
                      <td className="py-3 px-3.5 font-mono font-bold text-[#202226]">
                        {u.staffNo}
                      </td>
                      <td className="py-3 px-3.5 font-semibold text-[#202226]">
                        {u.fullName}
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                            u.role === 'admin'
                              ? 'bg-[#7A1315]/10 text-[#7A1315]'
                              : u.role === 'driver'
                              ? 'bg-blue-50 text-blue-700'
                              : 'bg-emerald-50 text-emerald-700'
                          }`}
                        >
                          {u.role}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-[#565b62]">{u.department}</td>
                      <td className="py-3 px-3.5 text-[#565b62]">{u.designation}</td>
                      <td className="py-3 px-3.5 font-mono text-[#565b62]">
                        {u.truckNo || '—'}
                      </td>
                      <td className="py-3 px-3.5">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                            u.active
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-red-50 text-red-700'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              u.active ? 'bg-emerald-600' : 'bg-red-600'
                            }`}
                          />
                          {u.active ? 'Active' : 'Suspended'}
                        </span>
                      </td>
                      <td className="py-3 px-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => openEditModal(u)}
                            className="p-1 text-[#565b62] hover:text-[#7A1315] rounded hover:bg-white"
                            title="Edit Account"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          {u.id !== admin.id && (
                            <button
                              type="button"
                              onClick={() => handleToggleUser(u.id)}
                              className={`p-1 rounded text-xs font-semibold ${
                                u.active
                                  ? 'text-amber-700 hover:bg-amber-50'
                                  : 'text-emerald-700 hover:bg-emerald-50'
                              }`}
                              title={u.active ? 'Suspend User' : 'Reactivate User'}
                            >
                              {u.active ? (
                                <UserX className="w-3.5 h-3.5" />
                              ) : (
                                <UserCheck className="w-3.5 h-3.5" />
                              )}
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ADD USER MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-[#e1ddd0] max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1ddd0]">
              <h3 className="font-heading font-bold text-lg text-[#202226]">
                Add User or Administrator
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-[#6b7178] hover:text-[#202226] text-xl"
              >
                &times;
              </button>
            </div>

            {modalError && (
              <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleCreateUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#383c42] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={newFullName}
                  onChange={(e) => setNewFullName(e.target.value)}
                  placeholder="e.g. Samuel Kiptoo"
                  className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Staff / Employee No.
                  </label>
                  <input
                    type="text"
                    required
                    value={newStaffNo}
                    onChange={(e) => setNewStaffNo(e.target.value)}
                    placeholder="e.g. DRV-106"
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">Role</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  >
                    <option value="driver">Driver</option>
                    <option value="staff">Staff</option>
                    <option value="admin">EHS / Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    value={newDepartment}
                    onChange={(e) => setNewDepartment(e.target.value)}
                    placeholder="e.g. Logistics"
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={newDesignation}
                    onChange={(e) => setNewDesignation(e.target.value)}
                    placeholder="e.g. Tanker Driver"
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>
              </div>

              {newRole !== 'admin' && (
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Truck Assigned{' '}
                    <span className="text-[#6b7178] font-normal">
                      {newRole === 'driver' ? '(required)' : '(optional)'}
                    </span>
                  </label>
                  <input
                    type="text"
                    required={newRole === 'driver'}
                    value={newTruckNo}
                    onChange={(e) => setNewTruckNo(e.target.value)}
                    placeholder="e.g. KDF 778Q"
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#383c42] mb-1">
                  Temporary Password
                </label>
                <input
                  type="text"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#e1ddd0]">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 border border-[#e1ddd0] rounded text-[#565b62]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1315] hover:bg-[#590e10] text-white font-semibold rounded"
                >
                  Create Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {editingUser && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded border border-[#e1ddd0] max-w-lg w-full p-6 shadow-xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#e1ddd0]">
              <h3 className="font-heading font-bold text-lg text-[#202226]">
                Edit User: {editingUser.fullName}
              </h3>
              <button
                type="button"
                onClick={() => setEditingUser(null)}
                className="text-[#6b7178] hover:text-[#202226] text-xl"
              >
                &times;
              </button>
            </div>

            {modalError && (
              <div className="p-2.5 rounded bg-red-50 text-red-700 text-xs">
                {modalError}
              </div>
            )}

            <form onSubmit={handleSaveEditUser} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-[#383c42] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={editFullName}
                  onChange={(e) => setEditFullName(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Staff No.
                  </label>
                  <input
                    type="text"
                    disabled
                    value={editingUser.staffNo}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#f6f5f0] text-[#6b7178]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">Role</label>
                  <select
                    value={editRole}
                    onChange={(e) => setEditRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  >
                    <option value="driver">Driver</option>
                    <option value="staff">Staff</option>
                    <option value="admin">EHS / Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    required
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Designation
                  </label>
                  <input
                    type="text"
                    required
                    value={editDesignation}
                    onChange={(e) => setEditDesignation(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>
              </div>

              {editRole !== 'admin' && (
                <div>
                  <label className="block font-semibold text-[#383c42] mb-1">
                    Truck Assigned{' '}
                    <span className="text-[#6b7178] font-normal">
                      {editRole === 'driver' ? '(required)' : '(optional)'}
                    </span>
                  </label>
                  <input
                    type="text"
                    required={editRole === 'driver'}
                    value={editTruckNo}
                    onChange={(e) => setEditTruckNo(e.target.value)}
                    className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold text-[#383c42] mb-1">
                  Reset Password{' '}
                  <span className="text-[#6b7178] font-normal">
                    (leave blank to keep current)
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="Min 6 characters to change"
                  value={editNewPassword}
                  onChange={(e) => setEditNewPassword(e.target.value)}
                  className="w-full px-3 py-2 border border-[#e1ddd0] rounded bg-[#faf9f6]"
                />
              </div>

              <div className="flex justify-end gap-2.5 pt-3 border-t border-[#e1ddd0]">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="px-4 py-2 border border-[#e1ddd0] rounded text-[#565b62]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#7A1315] hover:bg-[#590e10] text-white font-semibold rounded"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
