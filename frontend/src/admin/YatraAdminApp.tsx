import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AdminShell } from './components/shell/AdminShell'
import { AdminDashboardPage } from './pages/AdminDashboardPage'
import { DestinationsAdminPage } from './pages/DestinationsAdminPage'
import { AttractionsAdminPage } from './pages/AttractionsAdminPage'
import { HotelsAdminPage } from './pages/HotelsAdminPage'
import { RestaurantsAdminPage } from './pages/RestaurantsAdminPage'
import { CuisinesAdminPage } from './pages/CuisinesAdminPage'
import { ExperiencesAdminPage } from './pages/ExperiencesAdminPage'
import { MapStudioView } from './components/modules/MapStudioView'
import { TripEngineLabView } from './components/modules/TripEngineLabView'
import { VerificationQueueView } from './components/modules/VerificationQueueView'
import { DataQualityView } from './components/modules/DataQualityView'
import { ImportsPage } from './pages/ImportsPage'
import { MediaLibraryPage } from './pages/MediaLibraryPage'
import { ModerationPage } from './pages/ModerationPage'
import { AnalyticsPage } from './pages/AnalyticsPage'
import { SystemHealthPage } from './pages/SystemHealthPage'
import { AuditLogsPage } from './pages/AuditLogsPage'
import { SettingsRbacPage } from './pages/SettingsRbacPage'
import type { AdminRole } from './types/admin'

export default function YatraAdminApp() {
  const [searchParams, setSearchParams] = useSearchParams()
  const sectionFromUrl = searchParams.get('tab') || 'overview'

  const [activeSection, setActiveSection] = useState<string>(sectionFromUrl)
  const [currentRole, setCurrentRole] = useState<AdminRole>('Admin')
  const [environment, setEnvironment] = useState<'PRODUCTION' | 'DEVELOPMENT'>('PRODUCTION')

  useEffect(() => {
    document.title = "Trippin' Bharat Admin — Tourism Operations OS"
  }, [])

  const handleSelectSection = (sec: string) => {
    setActiveSection(sec)
    setSearchParams({ tab: sec })
  }

  const handleToggleEnvironment = () => {
    setEnvironment((prev) => (prev === 'PRODUCTION' ? 'DEVELOPMENT' : 'PRODUCTION'))
  }

  return (
    <AdminShell
      activeSection={activeSection}
      onSelectSection={handleSelectSection}
      currentRole={currentRole}
      onChangeRole={setCurrentRole}
      environment={environment}
      onToggleEnvironment={handleToggleEnvironment}
    >
      {activeSection === 'overview' && (
        <AdminDashboardPage
          onNavigate={handleSelectSection}
          onOpenQuickAdd={() => {
            // Trigger Quick Add via custom event or selector
            const addBtn = document.querySelector('button[title*="Quick Add"], button:has(svg.lucide-plus)') as HTMLButtonElement
            if (addBtn) addBtn.click()
          }}
        />
      )}
      {activeSection === 'destinations' && <DestinationsAdminPage />}
      {activeSection === 'attractions' && <AttractionsAdminPage />}
      {activeSection === 'hotels' && <HotelsAdminPage />}
      {activeSection === 'restaurants' && <RestaurantsAdminPage />}
      {activeSection === 'cuisines' && <CuisinesAdminPage />}
      {activeSection === 'experiences' && <ExperiencesAdminPage />}
      {activeSection === 'map-studio' && <MapStudioView />}
      {activeSection === 'trip-lab' && <TripEngineLabView />}
      {activeSection === 'verification' && <VerificationQueueView />}
      {activeSection === 'data-quality' && (
        <DataQualityView
          onNavigateToEntity={(type) => {
            if (type === 'attraction') handleSelectSection('attractions')
            else if (type === 'hotel') handleSelectSection('hotels')
            else if (type === 'restaurant') handleSelectSection('restaurants')
            else handleSelectSection('destinations')
          }}
        />
      )}
      {activeSection === 'imports' && <ImportsPage />}
      {activeSection === 'media' && <MediaLibraryPage />}
      {activeSection === 'moderation' && <ModerationPage />}
      {activeSection === 'analytics' && <AnalyticsPage />}
      {activeSection === 'system-health' && <SystemHealthPage />}
      {activeSection === 'audit-logs' && <AuditLogsPage />}
      {activeSection === 'settings' && (
        <SettingsRbacPage currentRole={currentRole} onChangeRole={setCurrentRole} />
      )}
    </AdminShell>
  )
}
