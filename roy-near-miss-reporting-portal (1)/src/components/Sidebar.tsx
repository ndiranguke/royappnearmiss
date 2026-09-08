import React from 'react';
import {
  Bell,
  BookOpen,
  ClipboardList,
  Database,
  FileCheck2,
  FilePlus2,
  LayoutDashboard,
  ShieldCheck,
  X,
} from 'lucide-react';
import { NavView, UserRole } from '../types';
import { RoyLogo } from './RoyLogo';

interface SidebarProps {
  currentView: NavView;
  userRole: UserRole;
  unreadCount: number;
  onNavigate: (view: NavView) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  userRole,
  unreadCount,
  onNavigate,
  isOpenMobile,
  onCloseMobile,
}) => {
  const getNavItems = () => {
    if (userRole === 'admin') {
      return [
        { id: 'home' as NavView, label: 'Overview', icon: LayoutDashboard },
        { id: 'queue' as NavView, label: 'Review Queue', icon: ClipboardList },
        { id: 'master' as NavView, label: 'Master Data', icon: Database },
        { id: 'education' as NavView, label: 'Near-Miss Guide', icon: BookOpen },
        {
          id: 'notifications' as NavView,
          label: 'Notifications',
          icon: Bell,
          badge: unreadCount > 0 ? unreadCount : undefined,
        },
      ];
    }

    return [
      { id: 'home' as NavView, label: 'Overview', icon: LayoutDashboard },
      { id: 'report' as NavView, label: 'Report a Near Miss', icon: FilePlus2 },
      { id: 'myreports' as NavView, label: 'My Reports', icon: FileCheck2 },
      { id: 'education' as NavView, label: 'Near-Miss Guide', icon: BookOpen },
      {
        id: 'notifications' as NavView,
        label: 'Notifications',
        icon: Bell,
        badge: unreadCount > 0 ? unreadCount : undefined,
      },
    ];
  };

  const navItems = getNavItems();

  return (
    <>
      {/* Mobile backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden transition-opacity"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar container */}
      <aside
        id="app-sidebar"
        className={`fixed lg:sticky top-0 left-0 h-screen w-64 bg-[#23262b] text-[#e9e8e3] flex flex-col z-50 transition-transform duration-200 ease-in-out border-r border-[#34383e] ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Logo */}
        <div className="p-3.5 sm:p-4 border-b border-[#34383e] flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="bg-white rounded-md p-1 sm:p-1.5 shadow-xs flex items-center justify-center flex-shrink-0">
              <RoyLogo size="sm" className="h-7 sm:h-8 w-auto" />
            </div>
            <div className="min-w-0">
              <div className="font-heading font-bold text-sm sm:text-base text-white tracking-wide truncate">
                ROY FLEET
              </div>
              <div className="text-[10px] sm:text-[11px] text-[#9aa0a6] uppercase tracking-wider truncate">
                Safety Portal
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded text-[#9aa0a6] hover:text-white"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Label */}
        <div className="px-5 pt-5 pb-2 text-[11px] font-semibold tracking-wider text-[#787e85] uppercase">
          {userRole === 'admin' ? 'EHS Administration' : 'Incident Reporting'}
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                id={`nav-${item.id}`}
                type="button"
                onClick={() => {
                  onNavigate(item.id);
                  onCloseMobile();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#2c3036] text-white border-l-4 border-[#7A1315]'
                    : 'text-[#c7cad0] hover:bg-[#2c3036] hover:text-white border-l-4 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? 'text-[#e57373]' : 'text-[#9aa0a6]'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span className="bg-[#7A1315] text-white text-[11px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info */}
        <div className="p-4 border-t border-[#34383e] bg-[#1d2024] text-xs text-[#787e85]">
          <div className="flex items-center gap-1.5 font-medium text-white mb-1">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Smart &middot; Safe &middot; Secure</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            Report what almost went wrong &mdash; before it does.
          </p>
          <div className="mt-2 pt-2 border-t border-[#2e3238] flex justify-between items-center text-[10px] text-[#5c6168]">
            <span>ROY Safety v1.2</span>
            <span>GitHub Ready</span>
          </div>
        </div>
      </aside>
    </>
  );
};
