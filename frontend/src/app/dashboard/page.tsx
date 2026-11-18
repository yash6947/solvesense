'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Flame, 
  Clock, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight, 
  TrendingUp, 
  RefreshCw, 
  Award, 
  Zap, 
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push('/auth/login');
      return;
    }

    if (token) {
      fetchDashboard();
    }
  }, [token, authLoading]);

  const fetchDashboard = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await apiRequest('/students/dashboard');
      setDashboardData(data);
    } catch (err: any) {
      console.error('Error fetching dashboard:', err);
      setError(err.message || 'Failed to load dashboard metrics');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Loading performance telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded bg-[#262626] border border-[#333333] text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-[#ffc01e] mx-auto" />
          <h3 className="text-base font-bold text-white">Dashboard Offline</h3>
          <p className="text-xs text-[#8c8c8c]">{error || 'Could not load data.'}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { profile, performance, subjectProgress, weakConcepts, recentActivity, learningRoadmap } =
    dashboardData;

  // Generate 28 mock streak heatmap squares
  const heatmapDays = Array.from({ length: 28 }, (_, i) => {
    const isCompleted = i >= 20 || i % 3 === 0;
    return { day: i + 1, active: isCompleted };
  });

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. TOP PROFILE & SUMMARY STRIP (LeetCode Style) */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-[#333333] border border-[#404040] flex items-center justify-center text-lg font-bold text-white">
            {profile.fullName ? profile.fullName[0].toUpperCase() : 'A'}
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg font-bold text-white tracking-tight">
                {profile.fullName}
              </h1>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-[#ffa116] border border-[#383838]">
                {profile.targetExam.replace('_', ' ')} &apos;{profile.targetYear}
              </span>
              <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-[#8c8c8c] border border-[#383838]">
                {profile.academicLevel}
              </span>
            </div>
            <p className="text-xs text-[#8c8c8c] mt-1">
              Active Focus: <span className="text-[#eff1f6]">Physics Mechanics & Electrodynamics</span> • Target: <span className="text-[#00b8a3]">Top 500 All-India Rank</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch md:self-auto justify-end">
          <Link
            href="/solve"
            className="px-4 py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Resume Practice</span>
          </Link>
        </div>
      </div>

      {/* 2. CORE METRICS STRIP */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Total Attempted */}
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Attempted</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {performance.totalAttempted}
          </div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">
            <span className="text-[#00b8a3] font-semibold">{performance.totalCorrect}</span> correct
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Accuracy</div>
          <div className="text-2xl font-bold font-mono text-[#00b8a3] mt-1">
            {performance.accuracyPercentage}%
          </div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">
            JEE weighted scoring
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold flex items-center gap-1">
            <Flame className="w-3 h-3 text-[#ffa116] fill-[#ffa116]" />
            <span>Daily Streak</span>
          </div>
          <div className="text-2xl font-bold font-mono text-[#ffa116] mt-1">
            {profile.currentStreak} Days
          </div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">
            Longest: {profile.longestStreak} days
          </div>
        </div>

        {/* Average Time */}
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333]">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Pacing Avg</div>
          <div className="text-2xl font-bold font-mono text-white mt-1">
            {performance.averageTimeSeconds > 0
              ? `${Math.floor(performance.averageTimeSeconds / 60)}m ${performance.averageTimeSeconds % 60}s`
              : 'N/A'}
          </div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">
            Target: &lt; 3m / problem
          </div>
        </div>

        {/* Problem-Solving Index (PSI) */}
        <div className="p-4 rounded-lg bg-[#262626] border border-[#333333] col-span-2 lg:col-span-1">
          <div className="text-[11px] text-[#8c8c8c] uppercase font-semibold">Problem-Solving Index</div>
          <div className="text-2xl font-bold font-mono text-[#00b8a3] mt-1">
            {profile.problemSolvingIndex}
          </div>
          <div className="text-[11px] text-[#8c8c8c] mt-1">
            Scale: 0 - 100.0
          </div>
        </div>
      </div>

      {/* 3. SPLIT WORKSPACE: LEFT 4 COLS (STREAK & SOLVED) / RIGHT 8 COLS (SYLLABUS & RECENT) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT COLUMN: Solved Stats & Heatmap */}
        <div className="lg:col-span-4 space-y-6">
          {/* Solved Problems Breakdown Card */}
          <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span>Problem Difficulty Breakdown</span>
              <span className="font-mono text-[#8c8c8c]">{performance.totalAttempted} Total</span>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#00b8a3] font-medium">Easy</span>
                  <span className="text-[#8c8c8c]">6 Attempted</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1f1f1f]">
                  <div className="h-full bg-[#00b8a3] rounded-full" style={{ width: '60%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#ffc01e] font-medium">Medium</span>
                  <span className="text-[#8c8c8c]">4 Attempted</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1f1f1f]">
                  <div className="h-full bg-[#ffc01e] rounded-full" style={{ width: '40%' }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="text-[#ff375f] font-medium">Hard / Advanced</span>
                  <span className="text-[#8c8c8c]">2 Attempted</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1f1f1f]">
                  <div className="h-full bg-[#ff375f] rounded-full" style={{ width: '25%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* 30-Day Activity Streak Heatmap (LeetCode Style) */}
          <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-white">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#ffa116]" />
                <span>30-Day Activity Grid</span>
              </span>
              <span className="text-[#00b8a3] font-mono text-[11px] font-semibold">{profile.currentStreak} Day Streak</span>
            </div>

            {/* Grid of squares */}
            <div className="grid grid-cols-7 gap-1.5 pt-1">
              {heatmapDays.map((d) => (
                <div
                  key={d.day}
                  title={`Day ${d.day}: ${d.active ? 'Practice completed' : 'No submissions'}`}
                  className={`h-5 rounded-sm transition-colors ${
                    d.active
                      ? 'bg-[#2cbb5d] hover:bg-[#26a050]'
                      : 'bg-[#1f1f1f] border border-[#2e2e2e]'
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center justify-between text-[10px] text-[#8c8c8c] pt-2 border-t border-[#333333]">
              <span>Less</span>
              <div className="flex items-center gap-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#1f1f1f] border border-[#2e2e2e]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#1b4329]" />
                <div className="w-2.5 h-2.5 rounded-sm bg-[#2cbb5d]" />
              </div>
              <span>More</span>
            </div>
          </div>

          {/* Weak Concepts Card */}
          {weakConcepts && weakConcepts.length > 0 && (
            <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-3">
              <div className="text-xs font-bold text-white uppercase tracking-wider flex items-center justify-between">
                <span>Concepts Requiring Review</span>
                <span className="text-[10px] font-mono text-[#ff375f]">{weakConcepts.length} Topics</span>
              </div>

              <div className="space-y-2">
                {weakConcepts.map((wc: any, i: number) => (
                  <div key={i} className="p-2.5 rounded bg-[#1f1f1f] border border-[#333333] text-xs">
                    <div className="font-semibold text-white">{wc.topic}</div>
                    <div className="text-[11px] text-[#8c8c8c] flex items-center justify-between mt-1">
                      <span>{wc.chapter}</span>
                      <span className="font-mono text-[#ff375f] font-semibold">{wc.accuracy}% Acc</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Chapter Mastery & Recent Activity */}
        <div className="lg:col-span-8 space-y-6">
          {/* Chapter Mastery List */}
          <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                  Chapter-Wise Syllabus Mastery
                </h2>
                <p className="text-xs text-[#8c8c8c] mt-0.5">
                  Verified performance across core JEE Physics syllabus
                </p>
              </div>
              <Link
                href="/solve"
                className="text-xs text-[#ffa116] hover:underline flex items-center gap-1"
              >
                <span>Browse All</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="space-y-3">
              {subjectProgress.map((chap: any) => (
                <div
                  key={chap.chapterSlug}
                  className="p-3 rounded bg-[#1f1f1f] border border-[#333333] hover:border-[#404040] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-white">{chap.chapterName}</span>
                      <span className="font-mono text-[10px] text-[#8c8c8c]">
                        {chap.solvedCount} / {chap.totalQuestions} Solved
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#00b8a3]">
                      {chap.masteryScore}% Mastery
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-1.5 rounded-full bg-[#141414] overflow-hidden">
                    <div
                      className="h-full bg-[#00b8a3] rounded-full transition-all duration-500"
                      style={{ width: `${chap.masteryScore}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Submissions Table */}
          <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Recent Submissions
              </h2>
              <span className="text-xs font-mono text-[#8c8c8c]">
                Last {recentActivity.length} attempts
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#333333] text-[#8c8c8c] text-[11px] font-semibold uppercase">
                    <th className="pb-2 w-10 text-center">Status</th>
                    <th className="pb-2">Problem</th>
                    <th className="pb-2 w-28 text-right">Time Taken</th>
                    <th className="pb-2 w-20 text-right">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#303030]">
                  {recentActivity.map((act: any, idx: number) => (
                    <tr key={idx} className="lc-row">
                      <td className="py-2.5 text-center">
                        {act.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00b8a3] mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#ff375f] mx-auto" />
                        )}
                      </td>
                      <td className="py-2.5">
                        <Link
                          href={`/solve/${act.questionId}`}
                          className="font-medium text-[#eff1f6] hover:text-[#ffa116] transition-colors"
                        >
                          {act.questionTitle}
                        </Link>
                      </td>
                      <td className="py-2.5 text-right font-mono text-[#8c8c8c]">
                        {act.timeSpentSeconds}s
                      </td>
                      <td className="py-2.5 text-right font-mono font-bold">
                        <span className={act.marksAwarded >= 0 ? 'text-[#00b8a3]' : 'text-[#ff375f]'}>
                          {act.marksAwarded > 0 ? `+${act.marksAwarded}` : act.marksAwarded}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
