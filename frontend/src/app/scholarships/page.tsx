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
      setScholarships(data || []);
    } catch (err) {
      console.error('Failed to load scholarships:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApply = async (schId: string) => {
    setApplyingId(schId);
    try {
      const result = await apiRequest(`/institutes/scholarships/${schId}/apply`, {
        method: 'POST',
      });
      setApplicationResults((prev) => ({ ...prev, [schId]: result }));
    } catch (err: any) {
      console.error('Application failed:', err);
      alert('Application error: ' + (err.message || 'Failed to submit scholarship application'));
    } finally {
      setApplyingId(null);
    }
  };

  const currentPsi = profile?.problemSolvingIndex || 0;

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333]">
        <div className="flex items-center gap-2 mb-1">
          <Award className="w-4 h-4 text-[#ffa116]" />
          <span className="text-xs font-mono font-semibold uppercase text-[#ffa116]">Talent Discovery</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Institute Scholarships & Academic Grants
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-1 max-w-2xl">
          Coaching institute partners identify and sponsor top-performing competitive physics aspirants based on demonstrated Problem-Solving Index (PSI) and contest rankings.
        </p>
      </div>

      {/* Student Status Strip */}
      {user && (
        <div className="p-3.5 rounded bg-[#262626] border border-[#333333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="text-[#8c8c8c]">
            Aspirant: <span className="font-semibold text-white">{user.fullName}</span> •{' '}
            <span className="font-mono text-[#8c8c8c]">{user.email}</span>
          </div>

          <div className="flex items-center gap-2 font-mono">
            <span className="text-[#8c8c8c]">Your Demonstrated PSI:</span>
            <span className="px-2 py-0.5 rounded bg-[#1f1f1f] border border-[#383838] font-bold text-[#00b8a3]">
              {currentPsi} / 100
            </span>
          </div>
        </div>
      )}

      {/* Scholarships Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-[#8c8c8c]">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs font-mono">Loading scholarship programs...</p>
        </div>
      ) : scholarships.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {scholarships.map((sch) => {
            const result = applicationResults[sch.id];
            const isApplying = applyingId === sch.id;

            return (
              <div
                key={sch.id}
                className="p-5 rounded-lg bg-[#262626] border border-[#333333] hover:border-[#404040] transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <Building2 className="w-4 h-4 text-[#ffa116]" />
                      <span>{sch.instituteName}</span>
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#1b4329] text-[#00b8a3] border border-[#00b8a3]/20">
                      {sch.status}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white">
                      {sch.title}
                    </h3>
                    <p className="text-xs text-[#8c8c8c] mt-1 leading-relaxed">
                      {sch.description}
                    </p>
                  </div>

                  {/* Award Package Box */}
                  <div className="p-3 rounded bg-[#1f1f1f] border border-[#333333] space-y-1 text-xs">
                    <div className="text-[10px] uppercase font-mono font-bold text-[#ffa116]">
                      Grant Package
                    </div>
                    <div className="text-white font-medium">{sch.awardDetails}</div>
                  </div>

                  {/* Criteria Grid */}
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="p-2.5 rounded bg-[#1f1f1f] border border-[#333333]">
                      <div className="text-[#8c8c8c] text-[10px]">Min. Demonstrated PSI</div>
                      <div className="font-bold text-white text-sm font-mono mt-0.5">
                        {sch.minPsiScore}.0+
                      </div>
                    </div>
                    <div className="p-2.5 rounded bg-[#1f1f1f] border border-[#333333]">
                      <div className="text-[#8c8c8c] text-[10px]">Min. Contest Score</div>
                      <div className="font-bold text-white text-sm font-mono mt-0.5">
                        {sch.minContestScore}+ marks
                      </div>
                    </div>
                  </div>
                </div>

                {/* Application Feedback / Trigger Button */}
                <div className="space-y-2 pt-2 border-t border-[#333333]">
                  {result ? (
                    <div
                      className={`p-3 rounded border text-xs space-y-1 ${
                        result.isEligible
                          ? 'bg-[#1b4329] border-[#00b8a3] text-[#eff1f6]'
                          : 'bg-[#381a1f] border-[#ff375f] text-[#eff1f6]'
                      }`}
                    >
                      <div className="flex items-center gap-1.5 font-bold">
                        {result.isEligible ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-[#00b8a3]" />
                            <span>Application Verified & Submitted</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-[#ff375f]" />
                            <span>Eligibility Score Not Met</span>
                          </>
                        )}
                      </div>
                      <p className="text-[11px] text-[#8c8c8c]">{result.message}</p>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleApply(sch.id)}
                      disabled={isApplying}
                      className="w-full py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] disabled:opacity-50 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                    >
                      {isApplying ? (
                        <>
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Verifying PSI Score...</span>
                        </>
                      ) : (
                        <>
                          <span>Check Eligibility & Apply</span>
                          <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
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
        <div className="p-12 text-center text-[#8c8c8c] bg-[#262626] rounded border border-[#333333]">
          <p className="text-xs">No active scholarship programs at the moment.</p>
        </div>
      )}
    </div>
  );
}
