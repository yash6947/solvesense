'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Flame, 
  BarChart3, 
  Clock, 
  Target, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  BookOpen, 
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Compass,
  Award,
  Zap,
  Activity
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
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Syncing Real-Time Telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded-2xl flow-card text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Dashboard Offline</h3>
          <p className="text-sm text-slate-400">{error || 'Could not load data.'}</p>
          <button
            onClick={fetchDashboard}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold transition-all shadow-md shadow-blue-600/20"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { profile, performance, subjectProgress, weakConcepts, recentActivity, learningRoadmap } =
    dashboardData;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME SECTION (Flowbite Clean Hero Header) */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card-elevated shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, {profile.fullName}
            </h1>
            <span className="flow-pill flow-pill-blue">
              {profile.targetExam.replace('_', ' ')} &apos;{profile.targetYear}
            </span>
            <span className="flow-pill flow-pill-purple">
              {profile.academicLevel}
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Active Focus: <span className="text-cyan-300 font-semibold">Physics Mechanics & Electrodynamics</span> • Target Goal: <span className="text-slate-200 font-medium">Top 500 All-India Rank</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/solve"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs sm:text-sm shadow-md shadow-blue-600/30 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Resume Practice
          </Link>
        </div>
      </div>

      {/* 2. CORE PERFORMANCE METRICS (Flowbite 5-Card Metric Strip) */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Attempted */}
        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Attempted</span>
            <div className="p-1.5 rounded-lg bg-blue-500/10 text-blue-400">
              <Target className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {performance.totalAttempted}
          </div>
          <div className="text-xs text-slate-400 flex items-center gap-1">
            <span className="text-emerald-400 font-semibold">{performance.totalCorrect}</span> correct
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Accuracy</span>
            <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 tracking-tight">
            {performance.accuracyPercentage}%
          </div>
          <div className="text-xs text-slate-400">
            JEE Advanced weighted
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Streak</span>
            <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400">
              <Flame className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 tracking-tight">
            {profile.currentStreak} Days
          </div>
          <div className="text-xs text-slate-400">
            Longest: <span className="text-slate-300 font-semibold">{profile.longestStreak} days</span>
          </div>
        </div>

        {/* Average Time */}
        <div className="p-5 rounded-2xl flow-card space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>Pacing Avg</span>
            <div className="p-1.5 rounded-lg bg-purple-500/10 text-purple-400">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-300 tracking-tight">
            {performance.averageTimeSeconds > 0
              ? `${Math.floor(performance.averageTimeSeconds / 60)}m ${performance.averageTimeSeconds % 60}s`
              : 'N/A'}
          </div>
          <div className="text-xs text-slate-400">
            Target: &lt; 3m per problem
          </div>
        </div>

        {/* Problem-Solving Index (PSI) */}
        <div className="p-5 rounded-2xl flow-card space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold uppercase tracking-wider">
            <span>PSI Index</span>
            <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-cyan-300 tracking-tight">
            {profile.problemSolvingIndex}
          </div>
          <div className="text-xs text-slate-400">
            Multi-factor composite
          </div>
        </div>
      </div>

      {/* 3. DAILY GOAL PROGRESS (Flowbite Progress Bar) */}
      <div className="p-5 rounded-2xl flow-card flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            <span>Today&apos;s Solving Target</span>
          </div>
          <div className="text-sm font-medium text-white flex items-center gap-2">
            <span>
              {performance.dailyGoalProgress.completedToday} of {performance.dailyGoalProgress.target} problems completed
            </span>
            <span className="flow-pill flow-pill-blue text-[11px] py-0 px-2">
              {performance.dailyGoalProgress.percentage}%
            </span>
          </div>
        </div>

        <div className="w-full sm:w-72 bg-slate-900 rounded-full h-3 overflow-hidden border border-slate-800 p-0.5">
          <div
            className="bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 h-full rounded-full transition-all duration-700 shadow-sm"
            style={{ width: `${Math.min(100, performance.dailyGoalProgress.percentage)}%` }}
          />
        </div>
      </div>

      {/* 4. MAIN 2-COLUMN GRID (Syllabus & Weak Concepts / Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Chapter Progress & Roadmap */}
        <div className="lg:col-span-8 space-y-8">
          {/* Chapter-Wise Progress */}
          <div className="p-6 rounded-2xl flow-card space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-blue-400" />
                  <span>Physics Syllabus Mastery</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Demonstrated concept accuracy computed from verified submissions
                </p>
              </div>
              <span className="flow-pill flow-pill-slate font-mono text-[11px]">
                JEE Syllabus 2026
              </span>
            </div>

            <div className="space-y-3">
              {subjectProgress.chapters.map((chap: any) => (
                <div
                  key={chap.chapterId}
                  className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 hover:bg-slate-900 transition-all flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-bold text-white tracking-tight">{chap.chapterName}</div>
                    <div className="text-xs text-slate-400">
                      {chap.topicsCount} Topics • {chap.attemptedCount} Attempts Logged
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-100">
                        {chap.accuracyPercentage}%
                      </div>
                      <div className="text-[10px] text-slate-400 uppercase font-semibold">Accuracy</div>
                    </div>
                    <Link
                      href={`/solve?chapter=${chap.slug}`}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-blue-600/20 text-slate-400 hover:text-cyan-400 transition-colors"
                      title="Practice this chapter"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Learning Roadmap */}
          <div className="p-6 rounded-2xl flow-card space-y-5">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span>Personalized Concept Roadmap</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Spaced-repetition tasks tailored to reinforce prerequisite gaps
              </p>
            </div>

            <div className="space-y-3">
              {learningRoadmap.map((item: any) => (
                <div
                  key={item.stepNumber}
                  className="p-4 rounded-xl bg-slate-900/40 border border-slate-800 flex items-start gap-3.5"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'IN_PROGRESS'
                        ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.stepNumber}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-sm font-semibold text-white flex items-center justify-between">
                      <span>{item.title}</span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full ${
                          item.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                            : item.status === 'IN_PROGRESS'
                            ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                            : 'bg-slate-800 text-slate-500'
                        }`}
                      >
                        {item.status.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-normal">{item.reason}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column (4 cols): Weak Concepts & Recent Attempts */}
        <div className="lg:col-span-4 space-y-8">
          {/* Weak Concepts Card */}
          <div className="p-6 rounded-2xl flow-card space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Diagnosed Learning Gaps</span>
            </div>
            <p className="text-xs text-slate-400">
              Traced from prerequisite error patterns in recent attempts:
            </p>

            {weakConcepts.length > 0 ? (
              <div className="space-y-3">
                {weakConcepts.map((wc: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-300">{wc.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-mono">
                        {wc.diagnosedMistake}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{wc.recommendation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-center text-xs text-slate-400">
                No acute learning gaps detected yet. Keep solving!
              </div>
            )}
          </div>

          {/* Recent Activity Card */}
          <div className="p-6 rounded-2xl flow-card space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white">Recent Activity</h3>
              <span className="text-xs text-slate-500 font-medium">{recentActivity.length} logged</span>
            </div>

            {recentActivity.length > 0 ? (
              <div className="space-y-2.5">
                {recentActivity.slice(0, 5).map((att: any) => (
                  <div
                    key={att.attemptId}
                    className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-300 font-semibold">{att.questionId}</span>
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          att.isCorrect ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {att.isCorrect ? (
                          <>
                            <CheckCircle2 className="w-3.5 h-3.5" /> +{att.marksEarned}
                          </>
                        ) : (
                          <>
                            <XCircle className="w-3.5 h-3.5" /> {att.marksEarned}
                          </>
                        )}
                      </span>
                    </div>
                    {att.aiMentorFeedback && (
                      <p className="text-slate-400 text-[11px] italic line-clamp-2">
                        &ldquo;{att.aiMentorFeedback}&rdquo;
                      </p>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-6 rounded-xl bg-slate-900/40 border border-slate-800 text-center text-xs text-slate-400 space-y-2">
                <div>No attempts recorded yet.</div>
                <Link
                  href="/solve"
                  className="inline-block text-cyan-400 font-semibold hover:underline"
                >
                  Solve your first problem &rarr;
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
