'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Clock, 
  Users, 
  Award, 
  Calendar, 
  ArrowRight, 
  RefreshCw,
  Zap,
  ChevronRight,
  Shield,
  Sparkles
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

export default function ContestsCatalogPage() {
  const [contests, setContests] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'ALL' | 'ACTIVE' | 'UPCOMING'>('ALL');

  useEffect(() => {
    fetchContests();
  }, []);

  const fetchContests = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest('/contests');
      setContests(data || []);
    } catch (err) {
      console.error('Failed to load contests:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredContests = contests.filter((c) => {
    if (activeTab === 'ALL') return true;
    return c.status === activeTab;
  });

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6 bg-[#0e0e0e]">
      {/* Header Banner (Stitch Command Center Style) */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#00e1ab]/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00e1ab] animate-pulse" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#00e1ab]">
              Official Competitive Arena
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
              Kota Super-30 Scholarships
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
            Solve Sense JEE Advanced Weekly Contests
          </h1>
          <p className="text-xs text-[#8c8c8c] max-w-2xl leading-relaxed">
            Simulated exam hall environment with official JEE scoring (+4, -1, -2 partials), strict countdown timers, and live national percentile rankings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0e0e0e] border border-[#282828] text-xs z-10">
          {(['ALL', 'ACTIVE', 'UPCOMING'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3.5 py-1.5 rounded-lg font-medium transition-all ${
                activeTab === tab
                  ? 'bg-[#2E5BFF] text-white font-bold shadow-sm'
                  : 'text-[#8c8c8c] hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'All Contests' : tab === 'ACTIVE' ? 'Active Now' : 'Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {/* Contests Grid */}
      {isLoading ? (
        <div className="py-24 text-center text-[#8c8c8c]">
          <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-xs font-mono tracking-wider">RETRIEVING CONTEST SCHEDULE...</p>
        </div>
      ) : filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredContests.map((c) => {
            const isActive = c.status === 'ACTIVE';
            return (
              <div
                key={c.id}
                className="p-6 rounded-2xl bg-[#141414] border border-[#282828] hover:border-[#383838] transition-all flex flex-col justify-between space-y-5"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full border flex items-center gap-1.5 ${
                        isActive
                          ? 'text-[#00e1ab] bg-[#00e1ab]/10 border-[#00e1ab]/30'
                          : 'text-[#ffa116] bg-[#ffa116]/10 border-[#ffa116]/30'
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-[#00e1ab] animate-pulse' : 'bg-[#ffa116]'}`} />
                      <span>{c.status}</span>
                    </span>
                    <span className="font-mono text-xs text-[#8c8c8c]">
                      {c.examType ? c.examType.replace('_', ' ') : 'JEE ADVANCED'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white font-heading hover:text-[#00e1ab] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#8c8c8c] mt-1.5 line-clamp-2 leading-relaxed font-sans">
                      {c.description}
                    </p>
                  </div>

                  {/* Metadata Cards */}
                  <div className="grid grid-cols-3 gap-2.5 pt-1 text-center text-xs">
                    <div className="p-2.5 rounded-xl bg-[#181818] border border-[#282828]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Duration</div>
                      <div className="font-bold text-white font-mono mt-0.5">{c.durationMinutes}m</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#181818] border border-[#282828]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Marks</div>
                      <div className="font-bold text-[#00e1ab] font-mono mt-0.5">{c.totalMarks}</div>
                    </div>
                    <div className="p-2.5 rounded-xl bg-[#181818] border border-[#282828]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Aspirants</div>
                      <div className="font-bold text-white font-mono mt-0.5">{c.participantsCount || 48}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 border-t border-[#282828] flex items-center justify-between gap-3">
                  <Link
                    href={`/contests/${c.id}/leaderboard`}
                    className="px-3.5 py-2 rounded-xl bg-[#181818] hover:bg-[#202020] text-xs font-semibold text-[#8c8c8c] hover:text-white border border-[#282828] transition-colors"
                  >
                    Standings
                  </Link>

                  <Link
                    href={`/contests/${c.id}/take`}
                    className="px-4 py-2 rounded-xl bg-[#00e1ab] hover:bg-[#00c596] text-xs font-bold text-black flex items-center gap-1.5 transition-all shadow-sm"
                  >
                    <span>{isActive ? 'Enter Exam Hall' : 'Register Paper'}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-16 text-center text-[#8c8c8c] bg-[#141414] rounded-2xl border border-[#282828]">
          <p className="text-xs font-mono">No contests found for this filter tab.</p>
        </div>
      )}
    </div>
  );
}
