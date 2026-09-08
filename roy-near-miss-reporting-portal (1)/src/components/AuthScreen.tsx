import React, { useState } from 'react';
import { AlertCircle, ArrowRight, CheckCircle2, KeyRound, ShieldAlert, Truck, UserCheck } from 'lucide-react';
import { User, UserRole } from '../types';
import { StorageService } from '../services/storage';
import { RoyLogo } from './RoyLogo';

interface AuthScreenProps {
  onSuccess: (user: User) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onSuccess }) => {
  const [authTab, setAuthTab] = useState<'login' | 'register'>('login');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Login form state
  const [loginStaffNo, setLoginStaffNo] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginTruckNo, setLoginTruckNo] = useState('');

  // Register form state
  const [regFullName, setRegFullName] = useState('');
  const [regStaffNo, setRegStaffNo] = useState('');
  const [regRole, setRegRole] = useState<UserRole>('driver');
  const [regDepartment, setRegDepartment] = useState('');
  const [regDesignation, setRegDesignation] = useState('');
  const [regTruckNo, setRegTruckNo] = useState('');
  const [regAdminCode, setRegAdminCode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regPassword2, setRegPassword2] = useState('');

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const user = StorageService.login(loginStaffNo, loginPassword, loginTruckNo);
      onSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login failed. Please check credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (regPassword !== regPassword2) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    try {
      const user = StorageService.register({
        fullName: regFullName,
        staffNo: regStaffNo,
        role: regRole,
        department: regDepartment,
        designation: regDesignation,
        truckNo: regTruckNo,
        adminCode: regAdminCode,
        password: regPassword,
      });
      onSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Registration failed.');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (staffNo: string, pw: string, truck?: string) => {
    setError(null);
    try {
      const user = StorageService.login(staffNo, pw, truck);
      onSuccess(user);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Quick login failed.');
    }
  };

  return (
    <div id="auth-screen" className="min-h-screen flex flex-col md:flex-row bg-[#f6f5f0]">
      {/* Brand Side Panel */}
      <div className="w-full md:w-5/12 lg:w-4/12 bg-[#23262b] text-white flex flex-col justify-between p-6 sm:p-10 border-b-4 md:border-b-0 md:border-r-4 border-[#7A1315]">
        <div>
          <div className="inline-flex items-center bg-white rounded-xl p-2 sm:p-3 shadow-md border border-[#e1ddd0]/70 max-w-full">
            <RoyLogo size="lg" className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto max-w-[260px] sm:max-w-xs object-contain" />
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-[#f1efe9] mt-6 sm:mt-8 leading-tight">
            Report what almost went wrong<span className="text-[#e57373] mx-1.5">&middot;</span>before it does.
          </h2>

          <p className="text-sm text-[#c7cad0] mt-4 leading-relaxed font-light">
            Every serious accident is preceded by warning signs. The ROY Near-Miss Portal empowers our drivers and staff to flag close calls quickly so EHS teams can implement corrective actions.
          </p>

          <div className="mt-6 flex flex-wrap gap-2 text-xs font-semibold tracking-wider uppercase text-[#9aa0a6]">
            <span className="bg-[#2e333a] px-2.5 py-1 rounded border border-[#3e444d] text-emerald-400">
              Smart
            </span>
            <span className="bg-[#2e333a] px-2.5 py-1 rounded border border-[#3e444d] text-amber-400">
              Safe
            </span>
            <span className="bg-[#2e333a] px-2.5 py-1 rounded border border-[#3e444d] text-blue-400">
              Secure
            </span>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-[#3a3e44] text-xs text-[#9aa0a6] leading-relaxed">
          <p>
            Zero retaliation safety culture. Near-miss submissions are used purely for preventive engineering and fleet training.
          </p>
        </div>
      </div>

      {/* Auth Form Main Panel */}
      <div className="flex-1 flex items-center justify-center p-5 sm:p-10 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded border border-[#e1ddd0] p-6 sm:p-8 shadow-xs">
          {/* Navigation Tabs */}
          <div className="flex border-b-2 border-[#e1ddd0] mb-6">
            <button
              id="auth-tab-login"
              type="button"
              onClick={() => {
                setAuthTab('login');
                setError(null);
              }}
              className={`flex-1 text-center py-2.5 font-semibold text-sm transition-colors -mb-[2px] border-b-2 ${
                authTab === 'login'
                  ? 'border-[#7A1315] text-[#7A1315]'
                  : 'border-transparent text-[#6b7178] hover:text-[#202226]'
              }`}
            >
              Log In
            </button>
            <button
              id="auth-tab-register"
              type="button"
              onClick={() => {
                setAuthTab('register');
                setError(null);
              }}
              className={`flex-1 text-center py-2.5 font-semibold text-sm transition-colors -mb-[2px] border-b-2 ${
                authTab === 'register'
                  ? 'border-[#7A1315] text-[#7A1315]'
                  : 'border-transparent text-[#6b7178] hover:text-[#202226]'
              }`}
            >
              Create Account
            </button>
          </div>

          {/* Error Banner */}
          {error && (
            <div
              id="auth-error-box"
              className="mb-5 p-3 rounded bg-red-50 border-l-4 border-[#7A1315] text-xs sm:text-sm text-[#7A1315] flex items-start gap-2"
            >
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          {authTab === 'login' ? (
            <form id="login-form" onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#383c42] mb-1">
                  Staff / Employee No.
                </label>
                <input
                  id="li-staffno"
                  type="text"
                  required
                  value={loginStaffNo}
                  onChange={(e) => setLoginStaffNo(e.target.value)}
                  placeholder="e.g. ADMIN001 or DRV-101"
                  className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#383c42] mb-1">
                  Password
                </label>
                <input
                  id="li-password"
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-xs font-semibold text-[#383c42]">
                    Truck No. <span className="text-[#6b7178] font-normal">(required for drivers)</span>
                  </label>
                </div>
                <input
                  id="li-truck"
                  type="text"
                  value={loginTruckNo}
                  onChange={(e) => setLoginTruckNo(e.target.value)}
                  placeholder="e.g. KDN 221A"
                  className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                />
                <p className="text-[11px] text-[#6b7178] mt-1">
                  Drivers must enter their vehicle plate. Optional for staff &amp; admin.
                </p>
              </div>

              <button
                id="login-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#7A1315] hover:bg-[#590e10] text-white text-sm font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              >
                <span>{loading ? 'Authenticating...' : 'Sign In to Portal'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Demo Logins Quick Selection Box */}
              <div className="mt-6 pt-5 border-t border-[#e1ddd0]">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#6b7178] mb-2.5 flex items-center gap-1.5">
                  <KeyRound className="w-3.5 h-3.5 text-[#7A1315]" />
                  <span>One-Click Demo Credentials</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => quickLogin('ADMIN001', 'Admin@123')}
                    className="p-2 text-left rounded border border-[#e1ddd0] bg-[#faf9f6] hover:border-[#7A1315] hover:bg-white transition-colors"
                  >
                    <div className="font-semibold text-xs text-[#7A1315]">EHS Admin</div>
                    <div className="text-[10px] text-[#6b7178]">ADMIN001</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => quickLogin('DRV-101', 'Driver@123', 'KDN 221A')}
                    className="p-2 text-left rounded border border-[#e1ddd0] bg-[#faf9f6] hover:border-blue-600 hover:bg-white transition-colors"
                  >
                    <div className="font-semibold text-xs text-blue-700">Driver</div>
                    <div className="text-[10px] text-[#6b7178]">DRV-101 / KDN 221A</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => quickLogin('STF-501', 'Staff@123')}
                    className="p-2 text-left rounded border border-[#e1ddd0] bg-[#faf9f6] hover:border-emerald-600 hover:bg-white transition-colors"
                  >
                    <div className="font-semibold text-xs text-emerald-700">Staff</div>
                    <div className="text-[10px] text-[#6b7178]">STF-501</div>
                  </button>
                </div>
              </div>
            </form>
          ) : (
            /* REGISTER FORM */
            <form id="register-form" onSubmit={handleRegisterSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#383c42] mb-1">
                  Full Name
                </label>
                <input
                  id="rg-name"
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="e.g. Patrick Mwangi"
                  className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Staff / Employee No.
                  </label>
                  <input
                    id="rg-staffno"
                    type="text"
                    required
                    value={regStaffNo}
                    onChange={(e) => setRegStaffNo(e.target.value)}
                    placeholder="e.g. DRV-105"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Role
                  </label>
                  <select
                    id="rg-role"
                    required
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value as UserRole)}
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  >
                    <option value="driver">Driver</option>
                    <option value="staff">Staff</option>
                    <option value="admin">EHS / Admin</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Department
                  </label>
                  <input
                    id="rg-dept"
                    type="text"
                    required
                    value={regDepartment}
                    onChange={(e) => setRegDepartment(e.target.value)}
                    placeholder="e.g. Fleet Operations"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Designation
                  </label>
                  <input
                    id="rg-designation"
                    type="text"
                    required
                    value={regDesignation}
                    onChange={(e) => setRegDesignation(e.target.value)}
                    placeholder="e.g. Articulated Truck Driver"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>
              </div>

              {regRole !== 'admin' && (
                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Truck No.{' '}
                    <span className="text-[#6b7178] font-normal">
                      {regRole === 'driver' ? '(required for drivers)' : '(optional)'}
                    </span>
                  </label>
                  <input
                    id="rg-truck"
                    type="text"
                    required={regRole === 'driver'}
                    value={regTruckNo}
                    onChange={(e) => setRegTruckNo(e.target.value)}
                    placeholder="e.g. KDP 412B"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>
              )}

              {regRole === 'admin' && (
                <div className="p-3 bg-red-50/70 rounded border border-red-200">
                  <label className="block text-xs font-bold text-[#7A1315] mb-1 flex items-center gap-1">
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>EHS/Admin Access Code</span>
                  </label>
                  <input
                    id="rg-admincode"
                    type="text"
                    required
                    value={regAdminCode}
                    onChange={(e) => setRegAdminCode(e.target.value)}
                    placeholder="Enter EHS Admin Key (Default: ROY-SAFE2026)"
                    className="w-full px-3 py-1.5 text-sm border border-[#e1ddd0] rounded bg-white focus:outline-hidden focus:border-[#7A1315]"
                  />
                  <p className="text-[10px] text-[#6b7178] mt-1">
                    Provided by company safety leadership. For demo/preview: <span className="font-mono font-bold">ROY-SAFE2026</span>
                  </p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Password
                  </label>
                  <input
                    id="rg-password"
                    type="password"
                    required
                    minLength={6}
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min. 6 chars"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#383c42] mb-1">
                    Confirm Password
                  </label>
                  <input
                    id="rg-password2"
                    type="password"
                    required
                    minLength={6}
                    value={regPassword2}
                    onChange={(e) => setRegPassword2(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3 py-2 text-sm border border-[#e1ddd0] rounded focus:outline-hidden focus:border-[#7A1315] bg-[#faf9f6]"
                  />
                </div>
              </div>

              <button
                id="register-submit-btn"
                type="submit"
                disabled={loading}
                className="w-full py-2.5 px-4 bg-[#7A1315] hover:bg-[#590e10] text-white text-sm font-semibold rounded transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50 mt-2"
              >
                <span>{loading ? 'Creating Account...' : 'Register and Access Portal'}</span>
                <UserCheck className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
