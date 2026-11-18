'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Trophy, 
  ArrowLeft, 
  RefreshCw,
  Award,
  Clock,
  User,
  Medal
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';

export default function ContestLeaderboardPage() {
  const params = useParams();
  const { user } = useAuth();
  const contestId = params.id as string;

  const [leaderboardData, setLeaderboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, [contestId]);

  const fetchLeaderboard = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest(`/contests/${contestId}/leaderboard`);
      setLeaderboardData(data);
    } catch (err) {
      console.error('Failed to load leaderboard:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s.toString().padStart(2, '0')}s`;
  };

  if (isLoading || !leaderboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Computing rankings & tie-breakers...</span>
        </div>
      </div>
    );
  }

  const { contest, leaderboard, userRank } = leaderboardData;

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
        <Link
          href="/contests"
          className="hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Contests</span>
        </Link>
        <span className="font-mono text-[11px]">Server Verified Standings</span>
      </div>

      {/* Header Banner */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Trophy className="w-4 h-4 text-[#ffa116]" />
            <span className="text-xs font-mono uppercase text-[#ffa116]">Official Standings</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
            {contest.title}
          </h1>
          <p className="text-xs text-[#8c8c8c] mt-1">
            Total Marks: <span className="text-white font-mono font-bold">{contest.totalMarks}</span> • Tie-breaker: Highest score first, then least elapsed time.
          </p>
        </div>

        <Link
          href={`/contests/${contest.id}/take`}
          className="px-4 py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-semibold text-xs transition-colors shrink-0"
        >
          Retake or Review Paper
        </Link>
      </div>

      {/* LeetCode Standings Table */}
      <div className="rounded-lg border border-[#333333] overflow-hidden bg-[#262626]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#333333] bg-[#212121] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Aspirant Name</th>
                <th className="py-3 px-4 w-40">Institute / Batch</th>
                <th className="py-3 px-4 w-32 text-right">Time Elapsed</th>
                <th className="py-3 px-4 w-28 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303030]">
              {leaderboard.map((item: any) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <tr key={item.studentId || item.rank} className="lc-row">
                    {/* Rank */}
                    <td className="py-3 px-4 text-center font-mono font-bold">
                      {isTop1 ? (
                        <span className="text-[#ffa116]">🥇 1</span>
                      ) : isTop2 ? (
                        <span className="text-[#9ca3af]">🥈 2</span>
                      ) : isTop3 ? (
                        <span className="text-[#d97706]">🥉 3</span>
                      ) : (
                        <span className="text-[#8c8c8c]">{item.rank}</span>
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-[#eff1f6] flex items-center gap-2">
                        <span>{item.studentName}</span>
                        {item.rank <= 3 && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
                            Top 3
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Institute */}
                    <td className="py-3 px-4 text-[#8c8c8c]">
                      {item.instituteName || 'Independent Aspirant'}
                    </td>

                    {/* Time */}
                    <td className="py-3 px-4 text-right font-mono text-[#8c8c8c]">
                      {formatTime(item.timeSpentSeconds)}
                    </td>

                    {/* Score */}
                    <td className="py-3 px-4 text-right font-mono font-bold text-base text-[#00b8a3]">
                      {item.score}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
