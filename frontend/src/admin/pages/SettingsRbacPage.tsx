import React, { useState } from 'react'
import {
  Settings,
  Shield,
  Check,
  X,
  Users,
  Lock,
  LogOut,
  CheckCircle2,
} from 'lucide-react'
import { rbacService, type PermissionAction } from '../services/rbacService'
import { adminService } from '../services/adminService'
import type { AdminRole } from '../types/admin'

interface SettingsRbacPageProps {
  currentRole: AdminRole
  onChangeRole: (role: AdminRole) => void
}

export const SettingsRbacPage: React.FC<SettingsRbacPageProps> = ({
  currentRole,
  onChangeRole,
}) => {
  const [sessions, setSessions] = useState([
    {
      id: 'sess-01',
      device: 'Chrome 128 on Windows 11 (Current Session)',
      ip: '192.168.1.42 (Mewar Operations LAN)',
      lastActive: 'Just now',
      isCurrent: true,
    },
    {
      id: 'sess-02',
      device: 'Safari on iPhone 16 Pro',
      ip: '49.36.112.5 (Airtel 5G Rajasthan)',
      lastActive: '2 hours ago',
      isCurrent: false,
    },
  ])
  const [terminatedMessage, setTerminatedMessage] = useState('')

  const roles = rbacService.getRoles()

  const permissionsList: { action: PermissionAction; label: string; module: string }[] = [
    { action: 'destination.read', label: 'View Destinations', module: 'Destinations' },
    { action: 'destination.create', label: 'Create Destinations', module: 'Destinations' },
    { action: 'destination.update', label: 'Edit & Calibrate Destinations', module: 'Destinations' },
    { action: 'destination.publish', label: 'Publish Live to Public Portal', module: 'Destinations' },
    { action: 'destination.delete', label: 'Archive / Delete Destinations', module: 'Destinations' },

    { action: 'attraction.read', label: 'View Attractions', module: 'Attractions' },
    { action: 'attraction.create', label: 'Add Landmark Records', module: 'Attractions' },
    { action: 'attraction.update', label: 'Edit Timings & Best-Time', module: 'Attractions' },
    { action: 'attraction.verify', label: 'Approve ASI Verification Status', module: 'Attractions' },
    { action: 'attraction.delete', label: 'Delete Landmark Records', module: 'Attractions' },

    { action: 'duplicate.merge', label: 'Field-Level Duplicate Record Merge', module: 'Data Integrity' },
    { action: 'dataQuality.fix', label: 'Resolve Heuristic Quality Issues', module: 'Data Integrity' },
    { action: 'import.execute', label: 'Execute Bulk CSV Ingestion', module: 'Imports' },
    { action: 'import.rollback', label: 'Rollback Ingestion Batches', module: 'Imports' },

    { action: 'tripLab.simulate', label: 'Run Algorithm Simulator & Tests', module: 'Trip Engine' },
    { action: 'analytics.read', label: 'Access Commercial Behavioral Metrics', module: 'Analytics' },
    { action: 'moderation.manage', label: 'Moderate User Reviews & Flag Spam', module: 'Community' },
    { action: 'settings.manage', label: 'Modify Platform Permissions & Roles', module: 'Security' },
  ]

  const handleSignOutOtherSessions = () => {
    setSessions((prev) => prev.filter((s) => s.isCurrent))
    setTerminatedMessage('Successfully signed out all remote mobile and browser sessions.')
    setTimeout(() => setTerminatedMessage(''), 4000)
  }

  return (
    <div className="space-y-6 text-xs animate-in fade-in duration-200">
      {/* Header */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-50 border border-orange-100 text-[#C96F3B]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">
              Role-Based Access Control (RBAC) & Security Policy
            </h2>
            <p className="text-[#6B7280] mt-0.5">
              Granular permission matrix across operational modules with live session enforcement.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[#6B7280] font-medium">Simulate Active Role:</span>
          <select
            value={currentRole}
            onChange={(e) => onChangeRole(e.target.value as AdminRole)}
            className="bg-white border border-[#E5E7EB] text-[#C96F3B] font-bold rounded-xl px-3 py-1.5 focus:border-[#C96F3B] outline-none"
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Admin Privilege Directive */}
      <div className="p-4 rounded-xl bg-[#FDF6F0] border border-[#F3D7C5] text-[#1F2937] flex items-start gap-3">
        <div className="p-2 rounded-xl bg-[#F8E5D8] text-[#C96F3B] shrink-0 mt-0.5">
          <Lock className="w-4 h-4" />
        </div>
        <div className="space-y-1">
          <div className="font-bold text-[#1F2937] text-sm">
            Master Role Architecture: Admin
          </div>
          <p className="text-[#6B7280] text-xs leading-relaxed">
            Per system guidelines, <strong>Admin</strong> possesses unrestricted capability to manage destinations, verify data, merge records, and execute imports without secondary bottlenecks. Sub-roles are provided for specialized staff operations.
          </p>
        </div>
      </div>

      {/* Granular Permission Matrix Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <span className="font-bold text-[#1F2937]">Global Permissions Matrix</span>
          <span className="text-[11px] text-[#6B7280]">Live verified on both client & service boundaries</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Permission Action</th>
              <th className="px-4 py-3">Functional Module</th>
              {roles.map((r) => (
                <th
                  key={r}
                  className={`px-3 py-3 text-center ${r === currentRole ? 'text-[#C96F3B] font-bold' : ''}`}
                >
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB] font-sans">
            {permissionsList.map((p) => (
              <tr key={p.action} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-semibold text-[#1F2937]">
                  <div>{p.label}</div>
                  <div className="text-[10px] font-mono text-[#9CA3AF]">{p.action}</div>
                </td>
                <td className="px-4 py-3 text-[#6B7280]">{p.module}</td>
                {roles.map((r) => {
                  const allowed = rbacService.can(r, p.action)
                  return (
                    <td key={r} className="px-3 py-3 text-center">
                      {allowed ? (
                        <Check className="w-4 h-4 text-emerald-600 mx-auto" />
                      ) : (
                        <X className="w-4 h-4 text-gray-300 mx-auto" />
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Active Session Management */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 space-y-4 shadow-sm">
        <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
          <div>
            <h3 className="font-bold text-[#1F2937]">Active Operator Sessions</h3>
            <p className="text-[#6B7280]">Authenticated workstation and field inspection terminals.</p>
          </div>
          {sessions.length > 1 && (
            <button
              onClick={handleSignOutOtherSessions}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 hover:bg-red-100 text-red-700 font-semibold transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out Other Sessions</span>
            </button>
          )}
        </div>

        {terminatedMessage && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{terminatedMessage}</span>
          </div>
        )}

        <div className="space-y-2">
          {sessions.map((s) => (
            <div
              key={s.id}
              className="p-3 bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl flex items-center justify-between"
            >
              <div className="space-y-0.5">
                <div className="font-bold text-[#1F2937] flex items-center gap-2">
                  <span>{s.device}</span>
                  {s.isCurrent && (
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      CURRENT
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-[#9CA3AF] font-mono">{s.ip}</div>
              </div>

              <div className="text-right text-[#6B7280] font-mono text-[11px]">
                {s.lastActive}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
