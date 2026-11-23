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
  Medal,
  Sparkles,
  ArrowRight
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
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c] bg-[#0e0e0e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">COMPUTING NATIONAL RANKINGS & PERCENTILES...</span>
        </div>
      </div>
    );
  }

  const { contest, leaderboard, userRank } = leaderboardData;

  const top1 = leaderboard[0];
  const top2 = leaderboard[1];
  const top3 = leaderboard[2];

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6 bg-[#0e0e0e]">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
        <Link
          href="/contests"
          className="hover:text-white flex items-center gap-1.5 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Contests Arena</span>
        </Link>
        <span className="font-mono text-[11px] text-[#00e1ab]">Server Verified Standings</span>
      </div>

      {/* Header Banner */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-80 h-80 bg-[#ffa116]/5 rounded-full blur-3xl -z-0 pointer-events-none" />

        <div className="space-y-2 z-10">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-[#ffa116]" />
            <span className="text-xs font-mono uppercase tracking-wider text-[#ffa116] font-bold">
              Official Leaderboard & Percentile
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white font-heading tracking-tight">
            {contest.title}
          </h1>
          <p className="text-xs text-[#8c8c8c]">
            Total Marks: <span className="text-white font-mono font-bold">{contest.totalMarks}</span> • Tie-breaker: Highest score first, then least elapsed time.
          </p>
        </div>

        <Link
          href={`/contests/${contest.id}/take`}
          className="px-5 py-2.5 rounded-xl bg-[#00e1ab] hover:bg-[#00c596] text-black font-bold text-xs transition-all shrink-0 z-10 shadow-sm"
        >
          Retake or Review Paper
        </Link>
      </div>

      {/* TOP 3 PODIUM DISPLAY */}
      {leaderboard.length >= 3 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {/* Rank 2 */}
          {top2 && (
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col items-center text-center space-y-3 order-2 md:order-1">
              <span className="text-2xl">🥈</span>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#d1d5db]">Rank #2</span>
                <h3 className="text-base font-bold text-white font-heading">{top2.studentName}</h3>
                <p className="text-[11px] text-[#8c8c8c]">{top2.instituteName || 'Independent Aspirant'}</p>
              </div>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <span className="text-[#00e1ab] font-bold text-base">{top2.score} pts</span>
                <span className="text-[#8c8c8c]">•</span>
                <span className="text-[#8c8c8c]">{formatTime(top2.timeSpentSeconds)}</span>
              </div>
            </div>
          )}

          {/* Rank 1 (Gold, elevated) */}
          {top1 && (
            <div className="p-6 rounded-2xl bg-[#181818] border border-[#ffa116]/40 flex flex-col items-center text-center space-y-3 order-1 md:order-2 shadow-lg relative">
              <div className="absolute -top-3 px-3 py-0.5 rounded-full bg-[#ffa116] text-black font-mono font-bold text-[10px] uppercase tracking-wider">
                All-India Topper
              </div>
              <span className="text-3xl mt-1">🥇</span>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#ffa116]">Rank #1</span>
                <h3 className="text-lg font-bold text-white font-heading">{top1.studentName}</h3>
                <p className="text-[11px] text-[#8c8c8c]">{top1.instituteName || 'Independent Aspirant'}</p>
              </div>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <span className="text-[#00e1ab] font-bold text-lg">{top1.score} pts</span>
                <span className="text-[#8c8c8c]">•</span>
                <span className="text-[#8c8c8c]">{formatTime(top1.timeSpentSeconds)}</span>
              </div>
            </div>
          )}

          {/* Rank 3 */}
          {top3 && (
            <div className="p-5 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col items-center text-center space-y-3 order-3">
              <span className="text-2xl">🥉</span>
              <div className="space-y-0.5">
                <span className="text-xs font-mono font-bold text-[#d97706]">Rank #3</span>
                <h3 className="text-base font-bold text-white font-heading">{top3.studentName}</h3>
                <p className="text-[11px] text-[#8c8c8c]">{top3.instituteName || 'Independent Aspirant'}</p>
              </div>
              <div className="flex items-center gap-3 pt-2 text-xs font-mono">
                <span className="text-[#00e1ab] font-bold text-base">{top3.score} pts</span>
                <span className="text-[#8c8c8c]">•</span>
                <span className="text-[#8c8c8c]">{formatTime(top3.timeSpentSeconds)}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Official Standings Table */}
      <div className="rounded-2xl border border-[#282828] overflow-hidden bg-[#141414]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#282828] bg-[#101010] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-mono">
                <th className="py-3.5 px-5 w-20 text-center">Rank</th>
                <th className="py-3.5 px-5">Aspirant Name</th>
                <th className="py-3.5 px-5 w-48">Batch / Institute</th>
                <th className="py-3.5 px-5 w-36 text-right">Time Elapsed</th>
                <th className="py-3.5 px-5 w-32 text-right">Score</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#202020]">
              {leaderboard.map((item: any) => {
                const isTop1 = item.rank === 1;
                const isTop2 = item.rank === 2;
                const isTop3 = item.rank === 3;

                return (
                  <tr key={item.studentId || item.rank} className="hover:bg-[#181818] transition-colors">
                    {/* Rank */}
                    <td className="py-3.5 px-5 text-center font-mono font-bold">
                      {isTop1 ? (
                        <span className="text-[#ffa116]">🥇 1</span>
                      ) : isTop2 ? (
                        <span className="text-[#d1d5db]">🥈 2</span>
                      ) : isTop3 ? (
                        <span className="text-[#d97706]">🥉 3</span>
                      ) : (
                        <span className="text-[#8c8c8c]">{item.rank}</span>
                      )}
                    </td>

                    {/* Name */}
                    <td className="py-3.5 px-5">
                      <div className="font-semibold text-white flex items-center gap-2">
                        <span>{item.studentName}</span>
                        {item.rank <= 3 && (
                          <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
                            Podium
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Institute */}
                    <td className="py-3.5 px-5 text-[#8c8c8c]">
                      {item.instituteName || 'Independent Aspirant'}
                    </td>

                    {/* Time */}
                    <td className="py-3.5 px-5 text-right font-mono text-[#8c8c8c]">
                      {formatTime(item.timeSpentSeconds)}
                    </td>

                    {/* Score */}
                    <td className="py-3.5 px-5 text-right font-mono font-bold text-base text-[#00e1ab]">
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
