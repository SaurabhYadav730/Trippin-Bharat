import React, { useState } from 'react'
import {
  Search,
  Plus,
  Bell,
  Activity,
  Shield,
  CheckCircle2,
  ChevronDown,
  User,
  LogOut,
  AlertCircle,
  Database,
} from 'lucide-react'
import { rbacService } from '../../services/rbacService'
import type { AdminRole } from '../../types/admin'

interface AdminTopBarProps {
  onOpenCommandPalette: () => void
  onOpenQuickAdd: () => void
  currentRole: AdminRole
  onChangeRole: (role: AdminRole) => void
  environment: 'PRODUCTION' | 'DEVELOPMENT'
  onToggleEnvironment: () => void
  pendingVerificationsCount: number
  dataQualityIssuesCount: number
  onNavigateSection: (section: string) => void
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onOpenCommandPalette,
  onOpenQuickAdd,
  currentRole,
  onChangeRole,
  environment,
  onToggleEnvironment,
  pendingVerificationsCount,
  dataQualityIssuesCount,
  onNavigateSection,
}) => {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfileMenu, setShowProfileMenu] = useState(false)

  const roles = rbacService.getRoles()

  return (
    <header className="h-14 bg-white border-b border-[#E5E7EB] px-4 flex items-center justify-between gap-4 z-20 select-none shadow-xs">
      {/* Search trigger */}
      <div className="flex items-center gap-3 flex-1 max-w-md">
        <button
          onClick={onOpenCommandPalette}
          className="w-full flex items-center justify-between px-3.5 py-1.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#6B7280] hover:text-[#1F2937] transition-all text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <Search className="w-3.5 h-3.5 text-[#C96F3B]" />
            <span>Search or jump to...</span>
          </div>
          <kbd className="px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB] font-mono text-[10px] text-[#6B7280] shadow-2xs">
            ⌘K /
          </kbd>
        </button>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Environment Indicator Switcher (NEVER CONFUSE PROD AND DEV) */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleEnvironment}
            title="Click to toggle working environment"
            className={`px-2.5 py-1 rounded-full text-[11px] font-mono font-bold tracking-wider border flex items-center gap-1.5 transition-all ${
              environment === 'PRODUCTION'
                ? 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100'
                : 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            <span
              className={`w-2 h-2 rounded-full ${
                environment === 'PRODUCTION' ? 'bg-rose-600' : 'bg-emerald-600'
              }`}
            />
            <span>{environment}</span>
          </button>
        </div>

        {/* Global Quick Add Button */}
        <button
          onClick={onOpenQuickAdd}
          className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#C96F3B] hover:bg-[#B55F2D] text-white text-xs font-semibold shadow-sm transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Quick Add</span>
        </button>

        {/* System Status Pill */}
        <div
          onClick={() => onNavigateSection('system-health')}
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#F9FAFB] border border-[#E5E7EB] text-[11px] text-[#4B5563] cursor-pointer hover:border-[#D1D5DB]"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="font-mono font-semibold">99.98%</span>
          <span className="text-[#9CA3AF] text-[10px]">Healthy</span>
        </div>

        {/* Notification Drawer Trigger */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-100 relative transition-colors"
          >
            <Bell className="w-4 h-4" />
            {pendingVerificationsCount + dataQualityIssuesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C96F3B] text-white font-mono text-[9px] font-bold flex items-center justify-center">
                {pendingVerificationsCount + dataQualityIssuesCount}
              </span>
            )}
          </button>

          {/* Notifications Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-4 text-xs space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-[#E5E7EB]">
                <span className="font-bold text-[#1F2937]">Operations Feed</span>
                <span className="text-[10px] text-[#9CA3AF]">Live Telemetry</span>
              </div>

              <div className="space-y-2">
                <div
                  onClick={() => {
                    onNavigateSection('verification')
                    setShowNotifications(false)
                  }}
                  className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#C96F3B]/40 hover:bg-[#FDF6F0]/30 cursor-pointer space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between text-[#C96F3B] font-semibold">
                    <span>{pendingVerificationsCount} Verification Requests</span>
                    <span className="text-[10px] text-[#9CA3AF]">Queue</span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Field updates for monument timings and prices waiting for approval.
                  </p>
                </div>

                <div
                  onClick={() => {
                    onNavigateSection('data-quality')
                    setShowNotifications(false)
                  }}
                  className="p-2.5 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-amber-300 hover:bg-amber-50/40 cursor-pointer space-y-1 transition-colors"
                >
                  <div className="flex items-center justify-between text-amber-700 font-semibold">
                    <span>{dataQualityIssuesCount} Data Health Issues</span>
                    <span className="text-[10px] text-[#9CA3AF]">Scanner</span>
                  </div>
                  <p className="text-[11px] text-[#6B7280]">
                    Heuristic scanner detected records missing coordinates or best-time data.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profile & Role Switcher */}
        <div className="relative">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 p-1.5 pl-2 rounded-xl bg-[#F9FAFB] border border-[#E5E7EB] hover:border-[#D1D5DB] text-[#1F2937] text-xs transition-colors"
          >
            <div className="w-6 h-6 rounded-full bg-[#C96F3B] flex items-center justify-center font-bold text-white text-[11px]">
              S
            </div>
            <div className="text-left hidden sm:block">
              <div className="font-bold text-[11px] leading-tight text-[#1F2937]">Saurabh Admin</div>
              <div className="text-[9px] text-[#C96F3B] font-mono leading-tight font-semibold">{currentRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#9CA3AF]" />
          </button>

          {/* Profile Dropdown & Role Switcher */}
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-64 bg-white border border-[#E5E7EB] rounded-2xl shadow-xl p-3 text-xs space-y-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="pb-2 border-b border-[#E5E7EB]">
                <div className="font-bold text-[#1F2937]">Saurabh Admin</div>
                <div className="text-[10px] text-[#6B7280]">saurabh@trippinbharat.internal</div>
                <div className="text-[10px] text-emerald-600 font-medium mt-1">2 Active Sessions</div>
              </div>

              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-[#9CA3AF] mb-1.5">
                  Simulate RBAC Role
                </div>
                <div className="space-y-1">
                  {roles.map((r) => (
                    <button
                      key={r}
                      onClick={() => {
                        onChangeRole(r)
                        setShowProfileMenu(false)
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        currentRole === r
                          ? 'bg-[#FDF6F0] text-[#C96F3B] font-bold'
                          : 'text-[#4B5563] hover:bg-gray-50'
                      }`}
                    >
                      <span>{r}</span>
                      {currentRole === r && <CheckCircle2 className="w-3.5 h-3.5 text-[#C96F3B]" />}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-[#E5E7EB]">
                <button
                  onClick={() => {
                    onNavigateSection('settings')
                    setShowProfileMenu(false)
                  }}
                  className="w-full text-left text-[#6B7280] hover:text-[#1F2937] py-1"
                >
                  Manage Permissions Matrix
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
