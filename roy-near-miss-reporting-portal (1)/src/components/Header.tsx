import React, { useState } from 'react';
import { Bell, LogOut, Menu, Shield, Truck, User as UserIcon, Users } from 'lucide-react';
import { User } from '../types';
import { RoyLogo } from './RoyLogo';

interface HeaderProps {
  user: User;
  unreadCount: number;
  onOpenNotifications: () => void;
  onLogout: () => void;
  onToggleMobileSidebar: () => void;
  onSwitchUser: (staffNo: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  unreadCount,
  onOpenNotifications,
  onLogout,
  onToggleMobileSidebar,
  onSwitchUser,
}) => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getInitials = (name: string) => {
    return name
      .trim()
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() || '')
      .join('');
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'admin':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-[#7A1315]/10 text-[#7A1315]">
            <Shield className="w-3 h-3" /> EHS Admin
          </span>
        );
      case 'driver':
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-700">
            <Truck className="w-3 h-3" /> Fleet Driver
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700">
            <Users className="w-3 h-3" /> Operations Staff
          </span>
        );
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#e1ddd0] flex items-center justify-between px-3 sm:px-6 sticky top-0 z-30 shadow-xs">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <button
          id="menu-toggle"
          type="button"
          onClick={onToggleMobileSidebar}
          className="lg:hidden p-1.5 sm:p-2 rounded text-[#565b62] hover:text-[#202226] hover:bg-[#f6f5f0] flex-shrink-0"
          title="Toggle navigation"
          aria-label="Toggle navigation menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile-visible ROY Logo */}
        <div className="lg:hidden flex-shrink-0 flex items-center pr-2 border-r border-[#e1ddd0]/70">
          <RoyLogo size="xs" className="h-7 w-auto object-contain" />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="font-semibold text-xs sm:text-sm md:text-base text-[#202226] truncate">
              {user.fullName}
            </span>
            <div className="hidden sm:inline-flex flex-shrink-0">{getRoleBadge(user.role)}</div>
          </div>
          <div className="text-[11px] sm:text-xs text-[#6b7178] truncate flex items-center gap-1 sm:gap-1.5">
            <span className="truncate">{user.designation}</span>
            {user.truckNo && (
              <>
                <span>&middot;</span>
                <span className="font-medium text-[#202226] flex-shrink-0">Truck {user.truckNo}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {/* Quick Demo Switcher */}
        <div className="relative">
          <button
            id="demo-switcher-btn"
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium border border-[#e1ddd0] rounded bg-[#faf9f6] text-[#383c42] hover:border-[#7A1315] hover:text-[#7A1315] transition-colors"
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Switch Persona</span>
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#e1ddd0] rounded shadow-lg py-2 z-50 text-xs">
              <div className="px-3 py-1 text-[#6b7178] font-semibold uppercase tracking-wider text-[10px]">
                Fast Demo Switch
              </div>
              <button
                type="button"
                onClick={() => {
                  onSwitchUser('ADMIN001');
                  setShowUserMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-[#f6f5f0] flex items-center justify-between ${
                  user.staffNo === 'ADMIN001' ? 'font-semibold text-[#7A1315] bg-[#7A1315]/5' : ''
                }`}
              >
                <div>
                  <div className="text-xs">EHS Administrator</div>
                  <div className="text-[10px] text-[#6b7178]">ADMIN001 &middot; Manager</div>
                </div>
                <Shield className="w-3.5 h-3.5 text-[#7A1315]" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchUser('DRV-101');
                  setShowUserMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-[#f6f5f0] flex items-center justify-between ${
                  user.staffNo === 'DRV-101' ? 'font-semibold text-[#7A1315] bg-[#7A1315]/5' : ''
                }`}
              >
                <div>
                  <div className="text-xs">John Kamau (Driver)</div>
                  <div className="text-[10px] text-[#6b7178]">DRV-101 &middot; Truck KDN 221A</div>
                </div>
                <Truck className="w-3.5 h-3.5 text-blue-600" />
              </button>
              <button
                type="button"
                onClick={() => {
                  onSwitchUser('STF-501');
                  setShowUserMenu(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-[#f6f5f0] flex items-center justify-between ${
                  user.staffNo === 'STF-501' ? 'font-semibold text-[#7A1315] bg-[#7A1315]/5' : ''
                }`}
              >
                <div>
                  <div className="text-xs">Grace Muthoni (Staff)</div>
                  <div className="text-[10px] text-[#6b7178]">STF-501 &middot; Dispatch</div>
                </div>
                <Users className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </div>
          )}
        </div>

        {/* Notifications Bell */}
        <button
          id="header-bell-btn"
          type="button"
          onClick={onOpenNotifications}
          className="relative p-2 rounded-full text-[#565b62] hover:text-[#7A1315] hover:bg-[#f6f5f0] transition-colors"
          title="View Notifications"
        >
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span
              id="header-bell-badge"
              className="absolute top-1 right-1 bg-[#7A1315] text-white text-[10px] font-bold rounded-full min-w-[16px] h-4 flex items-center justify-center px-1"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </span>
          )}
        </button>

        {/* User Initials Avatar */}
        <div
          className="w-8 h-8 rounded-full bg-[#7A1315] text-white flex items-center justify-center font-bold text-xs shadow-xs"
          title={user.fullName}
        >
          {getInitials(user.fullName)}
        </div>

        {/* Logout Button */}
        <button
          id="header-logout-btn"
          type="button"
          onClick={onLogout}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium border border-[#7A1315] text-[#7A1315] rounded hover:bg-[#7A1315] hover:text-white transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};
