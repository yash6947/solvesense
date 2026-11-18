'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Award, 
  Building2, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  RefreshCw,
  Gift,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ScholarshipsPage() {
  const { user, profile, token } = useAuth();
  const [scholarships, setScholarships] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Application state: { [scholarshipId]: { isEligible, message, status } }
  const [applicationResults, setApplicationResults] = useState<{ [schId: string]: any }>({});
  const [applyingId, setApplyingId] = useState<string | null>(null);

  useEffect(() => {
    fetchScholarships();
  }, []);

  const fetchScholarships = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest('/institutes/scholarships');
      setScholarships(data);
    } catch (err) {
      console.error('Failed to load scholarships:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (schId: string) => {
    if (!token) {
      alert('Please sign in to check your eligibility and submit your academic application.');
      return;
    }

    setApplyingId(schId);
    try {
      const result = await apiRequest(`/institutes/scholarships/${schId}/apply`, {
        method: 'POST',
      });
      setApplicationResults((prev) => ({ ...prev, [schId]: result }));
    } catch (err: any) {
      console.error('Application failed:', err);
      alert('Application error: ' + err.message);
    } finally {
      setApplyingId(null);
    }
  };

  const currentPsi = profile?.problemSolvingIndex || 0;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner (Flowbite Clean Header) */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card-elevated shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="flow-pill flow-pill-amber">
            <Gift className="w-3.5 h-3.5" />
            <span>Talent Discovery & Merit Scholarships</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Coaching Institute Scholarships & Grants
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Coaching partners identify and sponsor top-performing competitive physics aspirants. Grants are awarded based on demonstrated Problem-Solving Index (PSI) and competitive mock test scores.
          </p>
        </div>
      </div>

      {/* Student Status Chip */}
      {user && (
        <div className="p-4 rounded-xl flow-card flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="space-y-0.5">
            <span className="text-slate-400">Authenticated Student Profile: </span>
            <span className="font-bold text-white">{user.fullName}</span> •{' '}
            <span className="text-slate-400 font-mono">{user.email}</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400 font-medium">Your Problem-Solving Index (PSI):</span>
            <span className="flow-pill flow-pill-blue font-bold font-mono text-xs">
              {currentPsi} / 100
            </span>
          </div>
        </div>
      )}

      {/* Scholarships Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-medium">Loading Scholarship Opportunities...</p>
        </div>
      ) : scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {scholarships.map((sch) => {
            const result = applicationResults[sch.id];
            const isApplying = applyingId === sch.id;

            return (
              <div
                key={sch.id}
                className="p-6 rounded-2xl flow-card hover:border-slate-700 transition-all shadow-xl flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-cyan-400" />
                      <span>{sch.instituteName}</span>
                    </span>
                    <span className="flow-pill flow-pill-emerald text-[10px]">
                      {sch.status}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-xl font-bold text-white leading-tight">
                      {sch.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {sch.description}
                    </p>
                  </div>

                  {/* Award Details Pill */}
                  <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-medium space-y-1">
                    <div className="text-[10px] uppercase font-bold tracking-wider text-amber-400">
                      Grant Award Package
                    </div>
                    <div>{sch.awardDetails}</div>
                  </div>

                  {/* Criteria Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Min. Demonstrated PSI</div>
                      <div className="font-bold text-white text-base font-mono">
                        {sch.minPsiScore}.0+
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900 border border-slate-800">
                      <div className="text-slate-400 text-[10px]">Min. Mock Test Score</div>
                      <div className="font-bold text-white text-base font-mono">
                        {sch.minContestScore}+ marks
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Feedback / Trigger Button */}
                <div className="space-y-3 pt-2">
                  {result ? (
                    <div
                      className={`p-4 rounded-xl border text-xs space-y-1.5 ${
                        result.isEligible
                          ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                          : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {result.isEligible ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Application Transmitted Successfully</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Eligibility Threshold Not Met</span>
                          </>
                        )}
                      </div>
                      <p className="leading-relaxed text-[11px]">{result.message}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(sch.id)}
                      disabled={isApplying}
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold text-xs shadow-md shadow-blue-600/25 flex items-center justify-center gap-2 transition-all"
                    >
                      {isApplying ? (
                        <>
                          <RefreshCw className="w-4 h-4 animate-spin" />
                          <span>Verifying Academic Metrics...</span>
                        </>
                      ) : (
                        <>
                          <span>Check Eligibility & Submit Application</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 rounded-2xl flow-card text-center space-y-3">
          <Award className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Open Scholarship Programs</h3>
          <p className="text-xs text-slate-400">Please check back soon for partner announcements.</p>
        </div>
      )}
    </div>
  );
}
