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
  ChevronRight
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
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Header Banner (LeetCode Style) */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-[#ffa116]" />
            <span className="text-xs font-mono font-semibold uppercase text-[#ffa116]">Competitive Arena</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            JEE Physics Weekly Contests
          </h1>
          <p className="text-xs text-[#8c8c8c] mt-1 max-w-2xl">
            Simulated exam hall environment with official JEE scoring, timer enforcement, and real-time national leaderboard rankings.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 rounded bg-[#1f1f1f] border border-[#383838] text-xs">
          {(['ALL', 'ACTIVE', 'UPCOMING'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-1 rounded transition-colors ${
                activeTab === tab
                  ? 'bg-white text-black font-semibold'
                  : 'text-[#8c8c8c] hover:text-white'
              }`}
            >
              {tab === 'ALL' ? 'All' : tab === 'ACTIVE' ? 'Active Now' : 'Upcoming'}
            </button>
          ))}
        </div>
      </div>

      {/* Contests Grid */}
      {isLoading ? (
        <div className="py-20 text-center text-[#8c8c8c]">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin mx-auto mb-2" />
          <p className="text-xs font-mono">Loading contest schedule...</p>
        </div>
      ) : filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredContests.map((c) => {
            const isActive = c.status === 'ACTIVE';
            return (
              <div
                key={c.id}
                className="p-5 rounded-lg bg-[#262626] border border-[#333333] hover:border-[#404040] transition-colors flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[11px] font-mono font-semibold px-2 py-0.5 rounded border ${
                        isActive
                          ? 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/20'
                          : 'text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/20'
                      }`}
                    >
                      ● {c.status}
                    </span>
                    <span className="font-mono text-xs text-[#8c8c8c]">
                      {c.examType ? c.examType.replace('_', ' ') : 'JEE ADVANCED'}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-base font-bold text-white hover:text-[#ffa116] transition-colors">
                      {c.title}
                    </h3>
                    <p className="text-xs text-[#8c8c8c] mt-1 line-clamp-2 leading-relaxed">
                      {c.description}
                    </p>
                  </div>

                  {/* Metadata Chips */}
                  <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
                    <div className="p-2 rounded bg-[#1f1f1f] border border-[#333333]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Duration</div>
                      <div className="font-bold text-white font-mono mt-0.5">{c.durationMinutes}m</div>
                    </div>
                    <div className="p-2 rounded bg-[#1f1f1f] border border-[#333333]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Total Marks</div>
                      <div className="font-bold text-[#00b8a3] font-mono mt-0.5">{c.totalMarks}</div>
                    </div>
                    <div className="p-2 rounded bg-[#1f1f1f] border border-[#333333]">
                      <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Aspirants</div>
                      <div className="font-bold text-white font-mono mt-0.5">{c.participantsCount || 48}</div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 border-t border-[#333333] flex items-center justify-between gap-2">
                  <Link
                    href={`/contests/${c.id}/leaderboard`}
                    className="px-3 py-1.5 rounded bg-[#1f1f1f] hover:bg-[#282828] text-xs font-semibold text-[#8c8c8c] hover:text-white border border-[#383838] transition-colors"
                  >
                    Leaderboard
                  </Link>

                  <Link
                    href={`/contests/${c.id}/take`}
                    className="px-4 py-1.5 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-xs font-bold text-white flex items-center gap-1.5 transition-colors shadow-sm"
                  >
                    <span>{isActive ? 'Enter Contest' : 'Register'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-12 text-center text-[#8c8c8c] bg-[#262626] rounded border border-[#333333]">
          <p className="text-xs">No contests found for this filter.</p>
        </div>
      )}
    </div>
  );
}
