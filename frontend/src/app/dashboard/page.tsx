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
  ArrowUpRight,
  Shield,
  BrainCircuit,
  Compass,
  ArrowRight,
  Medal,
  Star
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
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c] bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">RETRIEVING LEETCODE TELEMETRY...</span>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-md w-full p-6 rounded-xl bg-[#141414] border border-[#282828] text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-[#ffa116] mx-auto" />
          <h3 className="text-base font-bold text-white font-heading">Dashboard Offline</h3>
          <p className="text-xs text-[#8c8c8c]">{error || 'Could not load student telemetry.'}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 rounded-lg bg-[#00e1ab] hover:bg-[#00c596] text-black text-xs font-bold transition-colors"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { profile, performance, subjectProgress, weakConcepts, recentActivity, learningRoadmap } =
    dashboardData;

  const chaptersList: any[] = Array.isArray(subjectProgress)
    ? subjectProgress
    : subjectProgress?.chapters || [];

  // LeetCode-style 12-month calendar heatmap (52 weeks x 7 days mock grid)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  // Real activity heatmap: 84 days (12 weeks).
  // A fresh account starts with a clean slate; today is marked active only after practice.
  const calendarCells = Array.from({ length: 84 }, (_, i) => {
    const isToday = i === 83;
    const level = isToday && (performance?.totalAttempted > 0) ? 2 : 0;
    return { day: i + 1, level };
  });

  const getHeatmapColor = (level: number) => {
    switch (level) {
      case 1:
        return 'bg-[#0e3a24]';
      case 2:
        return 'bg-[#1b6338]';
      case 3:
        return 'bg-[#2cbb5d]';
      default:
        return 'bg-[#181818] border border-[#242424]';
    }
  };

  const accuracyVal = performance?.accuracyPercentage || 0;
  const psiVal = profile?.problemSolvingIndex || 0;

  // Compute live difficulty counts from actual recent attempts
  const easySolved = recentActivity?.filter((a: any) => a.difficulty === 'EASY' && a.isCorrect).length || 0;
  const mediumSolved = recentActivity?.filter((a: any) => (a.difficulty === 'MEDIUM' || !a.difficulty) && a.isCorrect).length || 0;
  const hardSolved = recentActivity?.filter((a: any) => (a.difficulty === 'HARD' || a.difficulty === 'ADVANCED') && a.isCorrect).length || 0;

  // Badges & Milestones
  const badges = [
    { title: '7-Day Streak Warrior', icon: '🔥', desc: 'Maintained 7 consecutive days of rigorous physics practice' },
    { title: 'Mechanics Specialist', icon: '⚙️', desc: 'Completed 15+ Advanced Rotational Dynamics problems' },
    { title: 'Kota Mock Podium', icon: '🏆', desc: 'Achieved Top 3 in Weekly JEE Advanced Simulation' },
    { title: 'Cognitive Recovery', icon: '🎯', desc: 'Successfully debugged 5 consecutive conceptual mistakes' },
  ];

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6 bg-[#0a0a0a]">
      {/* ======================================================== */}
      {/* 1. TOP PROFILE & CANDIDATE BANNER                        */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#2E5BFF]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-4 z-10">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-[#181818] border border-[#282828] flex items-center justify-center text-2xl font-bold font-heading text-[#00e1ab] shadow-sm">
              {profile.fullName ? profile.fullName[0].toUpperCase() : 'S'}
            </div>
            <div className="absolute -bottom-1 -right-1 px-1.5 py-0.2 rounded bg-[#00e1ab] text-black text-[10px] font-mono font-bold">
              JEE
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-white font-heading tracking-tight">
                {profile.fullName}
              </h1>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
                {profile.targetExam.replace('_', ' ')} &apos;{profile.targetYear}
              </span>
              <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#181818] text-[#8c8c8c] border border-[#282828]">
                {profile.academicLevel}
              </span>
            </div>
            <p className="text-xs text-[#8c8c8c] mt-1.5 flex items-center gap-2 flex-wrap">
              <span>Domain Focus: <strong className="text-white">Mechanics & Electrodynamics</strong></span>
              <span>•</span>
              <span>National Projection: <strong className="text-[#00e1ab]">AIR Top 500</strong></span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto justify-end z-10">
          <Link
            href="/solve"
            className="px-5 py-2.5 rounded-xl bg-[#00e1ab] hover:bg-[#00c596] text-black font-bold text-xs flex items-center gap-2 shadow transition-all"
          >
            <BookOpen className="w-4 h-4 stroke-[2.5]" />
            <span>Resume Solving</span>
          </Link>
          <Link
            href="/contests"
            className="px-4 py-2.5 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#282828] text-white font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            <Award className="w-4 h-4 text-[#ffa116]" />
            <span className="hidden sm:inline">Contest Arena</span>
          </Link>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. LEETCODE SOLVED PROBLEMS CIRCLE & DIFFICULTY BARS     */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (5 cols): LeetCode Circular Solved Stats */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-white font-heading uppercase tracking-wider">
              Solved Problems Breakdown
            </span>
            <span className="text-xs font-mono text-[#8c8c8c]">
              Accuracy: <strong className="text-[#00e1ab]">{accuracyVal}%</strong>
            </span>
          </div>

          <div className="flex items-center gap-6 py-2">
            {/* LeetCode Circular Progress Ring */}
            <div className="relative w-28 h-28 shrink-0">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <path
                  className="text-[#181818]"
                  stroke="currentColor"
                  strokeWidth="3.5"
                  fill="none"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                {performance.totalCorrect > 0 && (
                  <path
                    className="text-[#00e1ab]"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeDasharray={`${Math.min(100, Math.round((performance.totalCorrect / 37) * 100))}, 100`}
                    strokeLinecap="round"
                    fill="none"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                )}
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
                <span className="text-xl font-bold text-white">{performance.totalCorrect || 0}</span>
                <span className="text-[10px] text-[#8c8c8c] uppercase">Solved</span>
              </div>
            </div>

            {/* Difficulty Breakdown Bars (LeetCode Style) */}
            <div className="flex-1 space-y-3 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-[#00e1ab] font-bold">Easy</span>
                  <span className="text-white font-semibold">
                    {easySolved} <span className="text-[#8c8c8c]">/ 10</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#181818] overflow-hidden">
                  <div
                    className="h-full bg-[#00e1ab] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((easySolved / 10) * 100))}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-[#ffa116] font-bold">Medium</span>
                  <span className="text-white font-semibold">
                    {mediumSolved} <span className="text-[#8c8c8c]">/ 15</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#181818] overflow-hidden">
                  <div
                    className="h-full bg-[#ffa116] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((mediumSolved / 15) * 100))}%` }}
                  />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1 font-mono">
                  <span className="text-[#ff525c] font-bold">Hard</span>
                  <span className="text-white font-semibold">
                    {hardSolved} <span className="text-[#8c8c8c]">/ 12</span>
                  </span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#181818] overflow-hidden">
                  <div
                    className="h-full bg-[#ff525c] rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, Math.round((hardSolved / 12) * 100))}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right (7 cols): GFG & LeetCode Annual Activity Heatmap */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#ffa116]" />
              <span className="text-xs font-bold text-white font-heading uppercase tracking-wider">
                184 Submissions in the Last Year
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs font-mono">
              <span>Streak: <strong className="text-[#ffa116]">{profile.currentStreak} Days</strong></span>
              <span>•</span>
              <span>Max: <strong className="text-white">{profile.longestStreak} Days</strong></span>
            </div>
          </div>

          {/* Month labels */}
          <div className="flex justify-between text-[10px] text-[#8c8c8c] font-mono px-1">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Grid of 12 columns x 7 rows */}
          <div className="grid grid-flow-col grid-rows-7 gap-1.5 overflow-x-auto py-1">
            {calendarCells.map((c) => (
              <div
                key={c.day}
                title={`Day ${c.day}: Active Problem-Solving Practice`}
                className={`w-3.5 h-3.5 rounded-sm transition-colors ${getHeatmapColor(c.level)}`}
              />
            ))}
          </div>

          <div className="flex items-center justify-between text-[10px] text-[#8c8c8c] pt-2 border-t border-[#242424] font-mono">
            <span>Less</span>
            <div className="flex items-center gap-1">
              <div className="w-2.5 h-2.5 rounded-sm bg-[#181818] border border-[#242424]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#0e3a24]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#1b6338]" />
              <div className="w-2.5 h-2.5 rounded-sm bg-[#2cbb5d]" />
            </div>
            <span>More</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. ACHIEVEMENTS & PSI TELEMETRY CARDS                    */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {badges.map((b, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-[#141414] border border-[#282828] hover:border-[#383838] transition-colors space-y-2"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">{b.icon}</span>
              <h4 className="text-xs font-bold text-white font-heading">{b.title}</h4>
            </div>
            <p className="text-[11px] text-[#8c8c8c] leading-relaxed">
              {b.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ======================================================== */}
      {/* 4. CHAPTER MASTERY & RECENT ATTEMPTS TABLE               */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left (6 cols): Chapter Mastery Cards */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Chapter-Wise Syllabus Mastery
            </h2>
            <Link
              href="/solve"
              className="text-xs text-[#00e1ab] hover:underline flex items-center gap-1 font-mono"
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-3">
            {chaptersList.map((chap: any) => {
              const chapterSlug = chap.slug || chap.chapterSlug || 'rotational-motion';
              const chapterName = chap.chapterName || chap.name || 'Chapter';
              const mastery = chap.masteryScore ?? chap.accuracyPercentage ?? 0;
              const solved = chap.solvedCount ?? chap.attemptedCount ?? 0;
              const total = chap.totalQuestions || 10;

              return (
                <div
                  key={chapterSlug}
                  className="p-4 rounded-xl bg-[#181818] border border-[#282828] hover:border-[#383838] transition-colors"
                >
                  <div className="flex items-center justify-between text-xs mb-2">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/solve?chapter=${chapterSlug}`}
                        className="font-bold text-white hover:text-[#00e1ab] transition-colors font-heading"
                      >
                        {chapterName}
                      </Link>
                      <span className="font-mono text-[11px] text-[#8c8c8c]">
                        ({solved}/{total})
                      </span>
                    </div>
                    <span className="font-mono text-xs font-bold text-[#00e1ab]">
                      {mastery}% Mastery
                    </span>
                  </div>

                  <div className="w-full h-2 rounded-full bg-[#121212] overflow-hidden">
                    <div
                      className="h-full bg-[#00e1ab] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(100, Math.max(5, mastery))}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right (6 cols): Recent Accepted & Attempted Submissions */}
        <div className="lg:col-span-6 p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-white font-heading uppercase tracking-wider">
              Recent Submissions Log
            </h2>
            <span className="text-xs font-mono text-[#8c8c8c]">
              Last {recentActivity.length} attempts
            </span>
          </div>

          {recentActivity.length === 0 ? (
            <div className="py-12 text-center space-y-3">
              <div className="w-10 h-10 rounded-full bg-[#181818] border border-[#282828] flex items-center justify-center mx-auto text-[#8c8c8c]">
                <Clock className="w-5 h-5" />
              </div>
              <h4 className="text-xs font-bold text-white font-heading">No submissions yet</h4>
              <p className="text-[11px] text-[#8c8c8c] max-w-xs mx-auto">
                Solve your first physics question in the Problem Bank to begin your practice streak and live accuracy telemetry.
              </p>
              <Link
                href="/solve"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#00e1ab] text-black font-bold text-xs hover:bg-[#00c596] transition-colors"
              >
                <span>Start Solving Problems</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-[#282828] text-[#8c8c8c] text-[11px] font-mono uppercase tracking-wider">
                    <th className="pb-3 w-12 text-center">Status</th>
                    <th className="pb-3">Problem</th>
                    <th className="pb-3 w-24 text-right">Time</th>
                    <th className="pb-3 w-20 text-right">Marks</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1e1e1e]">
                  {recentActivity.map((act: any, idx: number) => (
                    <tr key={idx} className="hover:bg-[#181818] transition-colors">
                      <td className="py-3 text-center">
                        {act.isCorrect ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00e1ab] mx-auto" />
                        ) : (
                          <XCircle className="w-4 h-4 text-[#ff525c] mx-auto" />
                        )}
                      </td>
                      <td className="py-3">
                        <Link
                          href={`/solve/${act.questionId}`}
                          className="font-semibold text-white hover:text-[#00e1ab] transition-colors"
                        >
                          {act.questionTitle}
                        </Link>
                      </td>
                      <td className="py-3 text-right font-mono text-[#8c8c8c]">
                        {act.timeSpentSeconds}s
                      </td>
                      <td className="py-3 text-right font-mono font-bold">
                        <span className={act.marksAwarded >= 0 ? 'text-[#00e1ab]' : 'text-[#ff525c]'}>
                          {act.marksAwarded > 0 ? `+${act.marksAwarded}` : act.marksAwarded}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
