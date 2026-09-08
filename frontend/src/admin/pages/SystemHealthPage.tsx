import React from 'react'
import {
  Activity,
  CheckCircle2,
  AlertTriangle,
  Server,
  Database,
  Cloud,
  Map,
  Mail,
  Shield,
  RefreshCw,
} from 'lucide-react'
import { adminService } from '../services/adminService'

export const SystemHealthPage: React.FC = () => {
  const integrations = adminService.getSystemIntegrations()

  return (
    <div className="space-y-6 text-xs animate-in fade-in duration-200">
      {/* Top Banner */}
      <div className="p-4 bg-white border border-[#E5E7EB] rounded-xl shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base font-bold text-[#1F2937]">
              System Health & Provider Integrations Telemetry
            </h2>
            <p className="text-[#6B7280] mt-0.5">
              Live heartbeat monitoring for GIS mapping, ISRO/Bhuvan geocoders, database clusters, and routing engines.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full font-bold">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span>All Core Services Operational</span>
        </div>
      </div>

      {/* Primary Server Health Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Database Read Latency</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">18 ms</div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">MongoDB Atlas Sharded</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">GIS Tile Server Uptime</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">99.98%</div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">Global CDN Cached</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">TSP Routing Engine Latency</div>
          <div className="text-2xl font-bold font-mono text-emerald-700 mt-1">12 ms</div>
          <div className="text-[10px] text-[#9CA3AF] mt-1">Algorithmic Heuristics</div>
        </div>

        <div className="p-4 rounded-xl bg-white border border-[#E5E7EB] shadow-sm">
          <div className="text-[#6B7280] text-[11px]">Global Error Rate</div>
          <div className="text-2xl font-bold font-mono text-[#1F2937] mt-1">0.01%</div>
          <div className="text-[10px] text-emerald-700 mt-1 font-medium">Within SLO limits (&lt;0.1%)</div>
        </div>
      </div>

      {/* Integrations Table */}
      <div className="bg-white border border-[#E5E7EB] rounded-xl overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#E5E7EB] flex items-center justify-between bg-white">
          <span className="font-bold text-[#1F2937]">Connected Services & Infrastructure</span>
          <span className="text-[11px] text-[#6B7280]">Security Rule: API Keys Masked / Zero Secret Exposure</span>
        </div>

        <table className="w-full text-left">
          <thead className="bg-[#F9FAFB] text-[#4B5563] font-semibold border-b border-[#E5E7EB] uppercase tracking-wider text-[10px]">
            <tr>
              <th className="px-4 py-3">Integration Service</th>
              <th className="px-4 py-3">Underlying Provider</th>
              <th className="px-4 py-3">Latency</th>
              <th className="px-4 py-3">Uptime SLA</th>
              <th className="px-4 py-3">Error Rate</th>
              <th className="px-4 py-3 text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E5E7EB]">
            {integrations.map((int) => (
              <tr key={int.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3.5">
                  <div className="font-bold text-[#1F2937]">{int.name}</div>
                  <div className="text-[10px] text-[#9CA3AF] uppercase font-mono">{int.type}</div>
                </td>
                <td className="px-4 py-3.5 text-[#374151] font-medium">{int.provider}</td>
                <td className="px-4 py-3.5 font-mono text-emerald-700 font-semibold">
                  {int.latencyMs} ms
                </td>
                <td className="px-4 py-3.5 font-mono text-[#374151]">{int.uptimePercent}%</td>
                <td className="px-4 py-3.5 font-mono text-[#6B7280]">{int.errorRate}%</td>
                <td className="px-4 py-3.5 text-right">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>{int.status}</span>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
