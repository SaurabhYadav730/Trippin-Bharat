import React from 'react'
import {
  LayoutDashboard,
  MapPin,
  Landmark,
  Compass,
  FolderKanban,
  Hotel,
  Utensils,
  BookOpen,
  Map,
  Sliders,
  ShieldCheck,
  ShieldAlert,
  UploadCloud,
  Image,
  Users,
  MessageSquareWarning,
  BarChart3,
  Activity,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
} from 'lucide-react'

interface AdminSidebarProps {
  activeSection: string
  onSelectSection: (section: string) => void
  isCollapsed: boolean
  onToggleCollapse: () => void
  verificationBadgeCount?: number
  dataQualityBadgeCount?: number
}

interface NavGroup {
  label: string
  items: {
    id: string
    label: string
    icon: any
    badge?: number
  }[]
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeSection,
  onSelectSection,
  isCollapsed,
  onToggleCollapse,
  verificationBadgeCount = 2,
  dataQualityBadgeCount = 5,
}) => {
  const navGroups: NavGroup[] = [
    {
      label: 'OVERVIEW',
      items: [
        { id: 'overview', label: 'Platform Health', icon: LayoutDashboard },
      ],
    },
    {
      label: 'DISCOVER',
      items: [
        { id: 'destinations', label: 'Destinations', icon: MapPin },
        { id: 'attractions', label: 'Attractions & Sites', icon: Landmark },
        { id: 'experiences', label: 'Experiences', icon: Compass },
      ],
    },
    {
      label: 'STAY',
      items: [
        { id: 'hotels', label: 'Hotels & Haveli Stays', icon: Hotel },
      ],
    },
    {
      label: 'EAT',
      items: [
        { id: 'restaurants', label: 'Restaurants & Dining', icon: Utensils },
        { id: 'cuisines', label: 'Cuisines & Regional Food', icon: BookOpen },
      ],
    },
    {
      label: 'MAP',
      items: [
        { id: 'map-studio', label: 'GIS Map Studio', icon: Map },
      ],
    },
    {
      label: 'PLAN',
      items: [
        { id: 'trip-lab', label: 'Trip Engine Lab', icon: Sliders },
      ],
    },
    {
      label: 'DATA',
      items: [
        {
          id: 'verification',
          label: 'Verification Queue',
          icon: ShieldCheck,
          badge: verificationBadgeCount,
        },
        {
          id: 'data-quality',
          label: 'Data Quality Center',
          icon: ShieldAlert,
          badge: dataQualityBadgeCount,
        },
        { id: 'imports', label: 'Imports & Rollback', icon: UploadCloud },
        { id: 'media', label: 'Media Library', icon: Image },
      ],
    },
    {
      label: 'COMMUNITY',
      items: [
        { id: 'moderation', label: 'Reviews & Moderation', icon: MessageSquareWarning },
      ],
    },
    {
      label: 'ANALYTICS',
      items: [
        { id: 'analytics', label: 'Platform & Trip Analytics', icon: BarChart3 },
      ],
    },
    {
      label: 'SYSTEM',
      items: [
        { id: 'system-health', label: 'System & Integrations', icon: Activity },
        { id: 'audit-logs', label: 'Audit Logs & Diff History', icon: History },
        { id: 'settings', label: 'Roles & Settings', icon: Settings },
      ],
    },
  ]

  return (
    <aside
      className={`h-screen bg-white border-r border-[#E5E7EB] flex flex-col transition-all duration-300 select-none z-30 shrink-0 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Brand Header */}
      <div className="h-14 px-4 border-b border-[#E5E7EB] flex items-center justify-between">
        {!isCollapsed && (
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#C96F3B] to-[#B55F2D] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
              या
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-sm tracking-tight text-[#1F2937]">YĀTRA</span>
                <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-[#FDF6F0] text-[#C96F3B] border border-[#F3DFD1]">
                  ADMIN
                </span>
              </div>
              <div className="text-[10px] text-[#9CA3AF] font-mono tracking-tight font-medium">OPERATIONS OS</div>
            </div>
          </div>
        )}

        {isCollapsed && (
          <div className="mx-auto w-8 h-8 rounded-xl bg-gradient-to-br from-[#C96F3B] to-[#B55F2D] flex items-center justify-center text-white font-extrabold text-sm shadow-sm">
            या
          </div>
        )}

        <button
          onClick={onToggleCollapse}
          className="p-1 rounded-lg text-[#9CA3AF] hover:text-[#1F2937] hover:bg-gray-100 transition-colors"
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Groups */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4 text-xs font-medium">
        {navGroups.map((group) => (
          <div key={group.label} className="space-y-0.5">
            {!isCollapsed && (
              <div className="px-3 py-1 text-[10px] font-bold tracking-wider text-[#9CA3AF] uppercase">
                {group.label}
              </div>
            )}
            {group.items.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectSection(item.id)}
                  title={isCollapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl transition-all relative group ${
                    isActive
                      ? 'bg-[#FDF6F0] text-[#C96F3B] font-semibold shadow-xs'
                      : 'text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-50'
                  }`}
                >
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#C96F3B]' : 'text-[#9CA3AF] group-hover:text-[#4B5563]'
                    }`}
                  />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}

                  {/* Badge */}
                  {item.badge !== undefined && item.badge > 0 && (
                    <span
                      className={`ml-auto px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                        isActive
                          ? 'bg-[#C96F3B] text-white'
                          : 'bg-gray-100 text-[#4B5563] group-hover:bg-gray-200'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        ))}
      </div>

      {/* Footer Link to Public Website */}
      <div className="p-3 border-t border-[#E5E7EB] bg-white">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-xl text-[#6B7280] hover:text-[#1F2937] hover:bg-gray-50 transition-colors text-xs font-medium"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-[#C96F3B]" />
            {!isCollapsed && <span>View Public Portal</span>}
          </div>
        </a>
      </div>
    </aside>
  )
}
