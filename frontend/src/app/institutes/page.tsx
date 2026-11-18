'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Building2, 
  Users, 
  GraduationCap, 
  Award, 
  AlertTriangle, 
  ShieldCheck, 
  Search, 
  RefreshCw, 
  TrendingUp, 
  Zap, 
  Activity 
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function InstitutesPortalPage() {
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchRoster, setSearchRoster] = useState('');
  const [selectedBatch, setSelectedBatch] = useState('');

  useEffect(() => {
    fetchInstituteData();
  }, []);

  const fetchInstituteData = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest('/institutes/inst-apex-01/dashboard');
      setDashboardData(data);
    } catch (err) {
      console.error('Failed to load institute data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Loading institute portal...</span>
        </div>
      </div>
    );
  }

  const { institute, metrics, batches, studentsRequiringAttention, studentRoster } = dashboardData;

  const filteredStudents = studentRoster.filter((s: any) => {
    if (selectedBatch && s.batchName !== selectedBatch) return false;
    if (searchRoster) {
      const q = searchRoster.toLowerCase();
      return s.name.toLowerCase().includes(q) || s.maskedEmail.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Building2 className="w-4 h-4 text-[#ffa116]" />
            <span className="text-xs font-mono font-semibold uppercase text-[#ffa116]">Coaching Partner Dashboard</span>
            {institute.isVerified && (
              <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1b4329] text-[#00b8a3] border border-[#00b8a3]/20">
                Verified
              </span>
            )}
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {institute.name}
          </h1>
          <p className="text-xs text-[#8c8c8c] mt-1">
            Center: <span className="text-white font-mono">{institute.code}</span> • Location: {institute.city} • Role: SME Admin / Faculty
          </p>
        </div>

        <Link
          href="/scholarships"
          className="px-4 py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-semibold text-xs transition-colors shrink-0"
        >
          Manage Scholarships
        </Link>
      </div>

      {/* 2. Key Metrics Strip */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Total Students</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{metrics.totalStudents}</div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">Across {metrics.activeBatchesCount} batches</div>
        </div>

        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Batch Accuracy</div>
          <div className="text-2xl font-bold font-mono text-[#00b8a3] mt-1">{metrics.averageAccuracy}%</div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">Classroom benchmark</div>
        </div>

        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Average PSI</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">{metrics.averagePsi}</div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">Multi-factor capability</div>
        </div>

        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#ff375f] uppercase font-semibold">Needs Support</div>
          <div className="text-2xl font-bold font-mono text-[#ff375f] mt-1">{metrics.attentionNeededCount}</div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">Accuracy &lt; 50% or gap</div>
        </div>
      </div>

      {/* 3. Teacher Intervention Alerts */}
      {studentsRequiringAttention.length > 0 && (
        <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5 text-[#ffa116]" />
              <span>Aspirants Flagged For Academic Review</span>
            </h2>
            <span className="text-[11px] font-mono text-[#8c8c8c]">
              Automatic Detection
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {studentsRequiringAttention.map((s: any) => (
              <div
                key={s.id}
                className="p-3.5 rounded bg-[#1f1f1f] border border-[#333333] flex items-start justify-between gap-3 text-xs"
              >
                <div className="space-y-0.5">
                  <div className="font-bold text-white">{s.name}</div>
                  <div className="text-[11px] text-[#8c8c8c]">{s.batchName}</div>
                  <div className="text-[11px] text-[#ff375f] font-medium pt-1">
                    Diagnosed Weakness: {s.weakConcept}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="font-mono font-bold text-[#ff375f]">{s.accuracy}% Acc</div>
                  <div className="text-[10px] text-[#8c8c8c] font-mono">PSI: {s.problemSolvingIndex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Student Roster Table */}
      <div className="rounded-lg border border-[#333333] overflow-hidden bg-[#262626] p-5 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            Enrolled Aspirants Roster
          </h2>

          <div className="flex items-center gap-2">
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-[#8c8c8c] absolute left-2.5 top-2.5 pointer-events-none" />
              <input
                type="text"
                value={searchRoster}
                onChange={(e) => setSearchRoster(e.target.value)}
                placeholder="Search aspirant..."
                className="w-full pl-8 pr-3 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-xs text-white placeholder-[#6b7280] outline-none focus:border-[#ffa116]"
              />
            </div>

            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-xs text-white outline-none focus:border-[#ffa116]"
            >
              <option value="">All Batches</option>
              {batches.map((b: any) => (
                <option key={b.id} value={b.name}>
                  {b.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#333333] bg-[#212121] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-2.5 px-3">Aspirant Name</th>
                <th className="py-2.5 px-3">Batch</th>
                <th className="py-2.5 px-3 text-center">PSI Score</th>
                <th className="py-2.5 px-3 text-center">Accuracy</th>
                <th className="py-2.5 px-3">Diagnosed Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303030]">
              {filteredStudents.map((st: any) => (
                <tr key={st.id} className="lc-row">
                  <td className="py-3 px-3">
                    <div className="font-semibold text-[#eff1f6]">{st.name}</div>
                    <div className="text-[10px] text-[#8c8c8c] font-mono">{st.maskedEmail}</div>
                  </td>
                  <td className="py-3 px-3 text-[#8c8c8c]">{st.batchName}</td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-white">
                    {st.problemSolvingIndex}
                  </td>
                  <td className="py-3 px-3 text-center font-mono font-bold text-[#00b8a3]">
                    {st.accuracy}%
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        st.needsAttention
                          ? 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20'
                          : 'text-[#8c8c8c] bg-[#1f1f1f] border-[#383838]'
                      }`}
                    >
                      {st.weakConcept}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
