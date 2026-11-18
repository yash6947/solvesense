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
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Loading Institute Multi-Tenant Portal...</span>
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
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner (Flowbite Clean Header) */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card-elevated shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="flow-pill flow-pill-blue">
              <Building2 className="w-3.5 h-3.5" />
              <span>Coaching Institute Portal</span>
            </span>
            {institute.isVerified && (
              <span className="flow-pill flow-pill-emerald">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified SME Partner
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {institute.name}
          </h1>
          <p className="text-xs text-slate-400">
            Center Code: <span className="font-mono text-slate-200 font-semibold">{institute.code}</span> • Location: {institute.city} • Role: Institute Staff / SME Admin
          </p>
        </div>

        <Link
          href="/scholarships"
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/20 transition-all shrink-0"
        >
          Manage Talent Scholarships
        </Link>
      </div>

      {/* 2. Key Analytics Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Enrolled Students</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">{metrics.totalStudents}</div>
          <div className="text-xs text-slate-400">Across {metrics.activeBatchesCount} batches</div>
        </div>

        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Batch Accuracy</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">{metrics.averageAccuracy}%</div>
          <div className="text-xs text-slate-400">Physics solving benchmark</div>
        </div>

        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Average PSI</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">{metrics.averagePsi}</div>
          <div className="text-xs text-slate-400">Composite capability metric</div>
        </div>

        <div className="p-5 rounded-2xl flow-card border-rose-500/30 space-y-2 bg-rose-500/5">
          <div className="flex items-center justify-between text-rose-400 text-xs font-semibold uppercase tracking-wider">
            <span>Requires Support</span>
            <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 tracking-tight">{metrics.attentionNeededCount}</div>
          <div className="text-xs text-rose-300">Accuracy &lt; 50% or concept gap</div>
        </div>
      </div>

      {/* 3. Teacher Academic Intervention Drawer */}
      {studentsRequiringAttention.length > 0 && (
        <div className="p-6 rounded-2xl flow-card border-amber-500/30 shadow-lg space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Teacher Alert: Aspirants Requiring Academic Support</span>
            </h2>
            <span className="flow-pill flow-pill-slate text-[11px]">
              Automated Prerequisite Detection
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {studentsRequiringAttention.map((s: any) => (
              <div
                key={s.id}
                className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="text-sm font-bold text-white">{s.name}</div>
                  <div className="text-xs text-slate-400">{s.batchName}</div>
                  <div className="text-xs text-rose-400 font-medium pt-1">
                    Acute Weakness: {s.weakConcept}
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-sm font-bold text-rose-400">{s.accuracy}% Acc</div>
                  <div className="text-[10px] text-slate-500 font-mono">PSI: {s.problemSolvingIndex}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. Batches Breakdown */}
      <div className="p-6 rounded-2xl flow-card shadow-lg space-y-5">
        <h2 className="text-base font-bold text-white flex items-center gap-2">
          <GraduationCap className="w-4 h-4 text-cyan-400" />
          <span>Active Student Batches</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {batches.map((batch: any) => (
            <div
              key={batch.id}
              className="p-5 rounded-xl bg-slate-900 border border-slate-800 space-y-3"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-sm">{batch.name}</span>
                <span className="flow-pill flow-pill-slate text-[10px]">
                  {batch.targetYear}
                </span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between text-slate-400">
                  <span>Enrolled:</span>
                  <span className="text-white font-semibold">{batch.studentCount} students</span>
                </div>
                <div className="flex items-center justify-between text-slate-400">
                  <span>Avg Accuracy:</span>
                  <span className="text-emerald-400 font-semibold">{batch.avgAccuracy}%</span>
                </div>
                <div className="flex items-center justify-between text-slate-400 pt-1">
                  <span>Top Weak Chapter:</span>
                  <span className="text-amber-400 font-medium">{batch.topWeakChapter}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Student Roster Table (Flowbite Clean Table) */}
      <div className="rounded-2xl flow-card overflow-hidden shadow-xl space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Users className="w-4 h-4 text-blue-400" />
            <span>Enrolled Students Roster</span>
          </h2>

          <div className="flex items-center gap-2.5">
            <div className="relative w-48">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-3 pointer-events-none" />
              <input
                type="text"
                value={searchRoster}
                onChange={(e) => setSearchRoster(e.target.value)}
                placeholder="Search student..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 transition-colors"
              />
            </div>

            <select
              value={selectedBatch}
              onChange={(e) => setSelectedBatch(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white outline-none focus:border-blue-500 font-medium"
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

        <div className="overflow-x-auto pt-2">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4 font-semibold">Student Name</th>
                <th className="py-3 px-4 font-semibold">Batch</th>
                <th className="py-3 px-4 font-semibold text-center">PSI Score</th>
                <th className="py-3 px-4 font-semibold text-center">Accuracy</th>
                <th className="py-3 px-4 font-semibold">Diagnosed Weakness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredStudents.map((st: any) => (
                <tr key={st.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-semibold text-white">{st.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{st.maskedEmail}</div>
                  </td>
                  <td className="py-3.5 px-4 text-slate-300">{st.batchName}</td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-cyan-300">
                    {st.problemSolvingIndex}
                  </td>
                  <td className="py-3.5 px-4 text-center font-mono font-bold text-slate-200">
                    {st.accuracy}%
                  </td>
                  <td className="py-3.5 px-4">
                    <span
                      className={
                        st.needsAttention
                          ? 'flow-pill flow-pill-rose text-[11px]'
                          : 'flow-pill flow-pill-slate text-[11px]'
                      }
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
