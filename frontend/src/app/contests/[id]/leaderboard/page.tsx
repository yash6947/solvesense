'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { 
  Trophy, 
  Award, 
  Clock, 
  ArrowLeft, 
  Medal, 
  Users, 
  CheckCircle2, 
  Sparkles, 
  RefreshCw,
  Target
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
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-electric animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Computing Standings & Tie-Breakers...</span>
        </div>
      </div>
    );
  }

  const { contest, leaderboard, userRank } = leaderboardData;
  const topThree = leaderboard.slice(0, 3);
  const remaining = leaderboard.slice(3);

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Bar Navigation */}
      <div className="flex items-center justify-between">
        <Link
          href="/contests"
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Contests Arena</span>
        </Link>
        <span className="text-xs font-mono text-slate-400">
          Rankings updated in real-time
        </span>
      </div>

      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface via-card to-surface border border-card-border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" />
            <span>Official Examination Leaderboard</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {contest.title}
          </h1>
          <p className="text-xs text-slate-400">
            Total Marks: <span className="text-slate-200 font-bold">{contest.totalMarks}</span> • Tie-Breaking Rule: Score first, then least elapsed time.
          </p>
        </div>

        <Link
          href={`/contests/${contest.id}/take`}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-all shrink-0"
        >
          Retake or Review Paper
        </Link>
      </div>

      {/* Personal Standings Highlight Card */}
      {userRank && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-900/30 via-card to-blue-950/40 border border-blue-500/30 shadow-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center font-black text-2xl text-electric shadow-inner">
              #{userRank.rank}
            </div>
            <div className="space-y-1">
              <div className="text-xs font-semibold text-electric uppercase tracking-wider">
                Your Standings
              </div>
              <div className="text-base font-bold text-white">
                {user?.fullName || userRank.studentName}
              </div>
              <div className="text-xs text-slate-400">
                Solved {userRank.solvedCount} questions in {formatTime(userRank.totalTimeSeconds)}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-surface border border-card-border text-center min-w-[90px]">
              <div className="text-lg font-bold text-emerald-400">
                {userRank.score} / {contest.totalMarks}
              </div>
              <div className="text-[10px] text-slate-400">Score</div>
            </div>
            <div className="p-3 rounded-xl bg-surface border border-card-border text-center min-w-[90px]">
              <div className="text-lg font-bold text-electric">
                #{userRank.rank} <span className="text-xs text-slate-500">/ {leaderboard.length}</span>
              </div>
              <div className="text-[10px] text-slate-400">Official Rank</div>
            </div>
          </div>
        </div>
      )}

      {/* Podium Top 3 Standings */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {topThree.map((winner: any, i: number) => {
          const isGold = winner.rank === 1;
          const isSilver = winner.rank === 2;
          const isBronze = winner.rank === 3;

          return (
            <div
              key={winner.maskedEmail}
              className={`p-6 rounded-2xl border text-center relative overflow-hidden transition-all shadow-xl ${
                isGold
                  ? 'bg-gradient-to-b from-amber-500/15 via-card to-card border-amber-500/40 md:-translate-y-2'
                  : isSilver
                  ? 'bg-gradient-to-b from-slate-300/10 via-card to-card border-slate-400/30'
                  : 'bg-gradient-to-b from-amber-700/10 via-card to-card border-amber-700/30'
              }`}
            >
              <div className="space-y-3">
                <div
                  className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center font-bold text-xl shadow-lg ${
                    isGold
                      ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/20'
                      : isSilver
                      ? 'bg-slate-300 text-slate-950'
                      : 'bg-amber-700 text-white'
                  }`}
                >
                  #{winner.rank}
                </div>

                <div className="space-y-0.5">
                  <h3 className="text-base font-bold text-white truncate">
                    {winner.studentName}
                  </h3>
                  <div className="text-xs text-slate-400 font-mono">
                    {winner.maskedEmail}
                  </div>
                </div>

                <div className="pt-3 border-t border-card-border/60 flex items-center justify-around text-xs">
                  <div>
                    <div className="text-base font-bold text-emerald-400">{winner.score}</div>
                    <div className="text-[10px] text-slate-500">Marks</div>
                  </div>
                  <div>
                    <div className="text-base font-bold text-slate-200">
                      {formatTime(winner.totalTimeSeconds)}
                    </div>
                    <div className="text-[10px] text-slate-500">Time</div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="rounded-2xl border border-card-border bg-card overflow-hidden shadow-xl">
        <div className="p-4 border-b border-card-border bg-surface/50 flex items-center justify-between text-xs font-semibold text-slate-300">
          <span>Official Roster Standings</span>
          <span>{leaderboard.length} Aspirants Ranked</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-surface/30 text-slate-400 border-b border-card-border uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">Rank</th>
                <th className="py-3.5 px-4 font-semibold">Aspirant</th>
                <th className="py-3.5 px-4 font-semibold">Exam Focus</th>
                <th className="py-3.5 px-4 font-semibold text-center">Problems Solved</th>
                <th className="py-3.5 px-4 font-semibold text-center">Score</th>
                <th className="py-3.5 px-4 font-semibold text-right">Time Taken</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-card-border/60">
              {leaderboard.map((row: any) => {
                const isUser = userRank && row.maskedEmail === userRank.maskedEmail;
                return (
                  <tr
                    key={row.rank}
                    className={`transition-colors ${
                      isUser
                        ? 'bg-blue-600/10 font-medium'
                        : 'hover:bg-surface/40'
                    }`}
                  >
                    <td className="py-3 px-4 font-mono font-bold text-slate-300">
                      #{row.rank}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-white">{row.studentName}</div>
                      <div className="text-[10px] text-slate-500 font-mono">{row.maskedEmail}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {row.targetExam}
                    </td>
                    <td className="py-3 px-4 text-center font-mono text-slate-300">
                      {row.solvedCount}
                    </td>
                    <td className="py-3 px-4 text-center font-mono font-bold text-emerald-400">
                      {row.score}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-400">
                      {formatTime(row.totalTimeSeconds)}
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
