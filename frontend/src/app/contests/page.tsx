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
  Zap
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
      setContests(data);
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
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner (Flowbite Clean Header) */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card-elevated shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="flow-pill flow-pill-amber">
            <Trophy className="w-3.5 h-3.5" />
            <span>Competitive Exam Arena & Leaderboards</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            JEE Physics Contests & Timed Mocks
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Compete in national proctored mock examinations, chapter sprints, and weekly championships. Measure your speed, accuracy, and All-India rank under server-enforced time constraints.
          </p>
        </div>
      </div>

      {/* Filter Tabs (Flowbite Tab Pill) */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-900 border border-slate-800 w-fit text-xs font-semibold">
        {(['ALL', 'ACTIVE', 'UPCOMING'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg transition-all ${
              activeTab === tab
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab === 'ALL' ? 'All Contests' : tab === 'ACTIVE' ? 'Active Now' : 'Upcoming'}
          </button>
        ))}
      </div>

      {/* Contests Grid */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-medium">Loading Contest Schedules...</p>
        </div>
      ) : filteredContests.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredContests.map((c) => (
            <div
              key={c.id}
              className="p-6 rounded-2xl flow-card hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span
                    className={
                      c.status === 'ACTIVE'
                        ? 'flow-pill flow-pill-emerald'
                        : 'flow-pill flow-pill-blue'
                    }
                  >
                    ● {c.status}
                  </span>

                  <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                    {c.examType.replace('_', ' ')}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {c.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">
                    {c.description}
                  </p>
                </div>

                {/* Metadata Pills */}
                <div className="pt-2 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">{c.durationMinutes}m</div>
                    <div className="text-[10px] text-slate-500 font-medium">Duration</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">{c.totalMarks}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Max Marks</div>
                  </div>
                  <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800">
                    <div className="text-white font-bold">{c.participantsCount}</div>
                    <div className="text-[10px] text-slate-500 font-medium">Aspirants</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                {c.status === 'ACTIVE' ? (
                  <Link
                    href={`/contests/${c.id}/take`}
                    className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md shadow-blue-600/30 flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Enter Timed Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                ) : (
                  <button
                    disabled
                    className="w-full py-3 rounded-xl bg-slate-900 text-slate-500 font-semibold text-xs border border-slate-800 cursor-not-allowed text-center"
                  >
                    Opens Soon
                  </button>
                )}

                <Link
                  href={`/contests/${c.id}/leaderboard`}
                  className="w-full py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs border border-slate-800 flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Trophy className="w-3.5 h-3.5 text-amber-400" />
                  <span>View Live Leaderboard</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl flow-card text-center space-y-3">
          <Trophy className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Contests in this category</h3>
          <p className="text-xs text-slate-400">Please check back soon for upcoming examination schedules.</p>
        </div>
      )}
    </div>
  );
}
