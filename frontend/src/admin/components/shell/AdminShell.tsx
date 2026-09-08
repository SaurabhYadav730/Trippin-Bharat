import React, { useState } from 'react'
import { AdminSidebar } from './AdminSidebar'
import { AdminTopBar } from './AdminTopBar'
import { CommandPalette } from './CommandPalette'
import { QuickAddModal } from './QuickAddModal'
import { adminStorage } from '../../services/adminStorage'
import { dataQualityService } from '../../services/dataQualityService'
import type { AdminRole } from '../../types/admin'

interface AdminShellProps {
  activeSection: string
  onSelectSection: (section: string) => void
  currentRole: AdminRole
  onChangeRole: (role: AdminRole) => void
  environment: 'PRODUCTION' | 'DEVELOPMENT'
  onToggleEnvironment: () => void
  children: React.ReactNode
}

export const AdminShell: React.FC<AdminShellProps> = ({
  activeSection,
  onSelectSection,
  currentRole,
  onChangeRole,
  environment,
  onToggleEnvironment,
  children,
}) => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false)
  const [showCommandPalette, setShowCommandPalette] = useState(false)
  const [showQuickAdd, setShowQuickAdd] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const db = adminStorage.getDb()
  const dataQualityScan = dataQualityService.scanPlatformDataQuality()
  const pendingVerificationsCount = db.verifications.filter(
    (v) => v.currentStatus === 'pending_review'
  ).length
  const dataQualityIssuesCount = dataQualityScan.summaryCounts.critical + dataQualityScan.summaryCounts.warning

  const handleRefresh = () => {
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <div className="h-screen w-screen bg-[#F7F8FA] text-[#1F2937] flex overflow-hidden font-sans antialiased">
      {/* Collapsible Operational Sidebar */}
      <AdminSidebar
        activeSection={activeSection}
        onSelectSection={onSelectSection}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        verificationBadgeCount={pendingVerificationsCount}
        dataQualityBadgeCount={dataQualityIssuesCount}
      />

      {/* Main Workspace Frame */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        {/* Top Operational Bar */}
        <AdminTopBar
          onOpenCommandPalette={() => setShowCommandPalette(true)}
          onOpenQuickAdd={() => setShowQuickAdd(true)}
          currentRole={currentRole}
          onChangeRole={onChangeRole}
          environment={environment}
          onToggleEnvironment={onToggleEnvironment}
          pendingVerificationsCount={pendingVerificationsCount}
          dataQualityIssuesCount={dataQualityIssuesCount}
          onNavigateSection={onSelectSection}
        />

        {/* Dynamic Main Workspace Area */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#F7F8FA]">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* Global Command Palette (⌘K) */}
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
        onNavigate={(sec) => onSelectSection(sec)}
      />

      {/* Global Quick Add Modal */}
      <QuickAddModal
        isOpen={showQuickAdd}
        onClose={() => setShowQuickAdd(false)}
        onSuccess={handleRefresh}
      />
    </div>
  )
}
