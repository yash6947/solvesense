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
  ArrowRight, 
  Sparkles, 
  Award,
  ChevronRight,
  TrendingUp,
  RefreshCw,
  Compass
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { apiRequest } from '@/lib/api';
import MathRenderer from '@/components/MathRenderer';

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
          <RefreshCw className="w-8 h-8 text-electric animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Loading Student Telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !dashboardData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-card border border-card-border text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Dashboard Offline</h3>
          <p className="text-sm text-slate-400">{error || 'Could not load data.'}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { profile, performance, subjectProgress, weakConcepts, recentActivity, learningRoadmap } =
    dashboardData;

  const hasActivity = performance.totalAttempted > 0;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. WELCOME SECTION */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface via-card to-surface border border-card-border shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
              Hello, {profile.fullName}
            </h1>
            <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-electric text-xs font-semibold">
              {profile.targetExam.replace('_', ' ')} &apos;{profile.targetYear}
            </span>
          </div>
          <p className="text-sm text-slate-400">
            Academic Status: <span className="text-slate-200 font-medium">{profile.academicLevel}</span> • Active Focus: <span className="text-electric font-medium">Physics</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/solve"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/20 transition-all"
          >
            <BookOpen className="w-4 h-4" />
            Resume Practice
          </Link>
        </div>
      </div>

      {/* 2. CORE PERFORMANCE CARDS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Total Attempted */}
        <div className="p-5 rounded-2xl bg-card border border-card-border space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Questions Attempted</span>
            <Target className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-white">
            {performance.totalAttempted}
          </div>
          <div className="text-xs text-slate-500">
            {performance.totalCorrect} solved correctly
          </div>
        </div>

        {/* Accuracy */}
        <div className="p-5 rounded-2xl bg-card border border-card-border space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Overall Accuracy</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-emerald-400">
            {performance.accuracyPercentage}%
          </div>
          <div className="text-xs text-slate-500">
            Across Single & Multi-Correct
          </div>
        </div>

        {/* Current Streak */}
        <div className="p-5 rounded-2xl bg-card border border-card-border space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Current Streak</span>
            <Flame className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-amber-400">
            {profile.currentStreak} Days
          </div>
          <div className="text-xs text-slate-500">
            Record: {profile.longestStreak} days
          </div>
        </div>

        {/* Average Time */}
        <div className="p-5 rounded-2xl bg-card border border-card-border space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Average Solving Time</span>
            <Clock className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-purple-300">
            {performance.averageTimeSeconds > 0
              ? `${Math.floor(performance.averageTimeSeconds / 60)}m ${performance.averageTimeSeconds % 60}s`
              : 'N/A'}
          </div>
          <div className="text-xs text-slate-500">
            Target: &lt; 3m per problem
          </div>
        </div>

        {/* Problem-Solving Index (PSI) */}
        <div className="p-5 rounded-2xl bg-card border border-card-border space-y-2 col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between text-slate-400 text-xs font-medium">
            <span>Problem-Solving Index</span>
            <Award className="w-4 h-4 text-electric" />
          </div>
          <div className="text-2xl sm:text-3xl font-bold text-electric">
            {profile.problemSolvingIndex}
          </div>
          <div className="text-xs text-slate-500">
            Composite capability metric
          </div>
        </div>
      </div>

      {/* 3. DAILY GOAL PROGRESS */}
      <div className="p-5 rounded-2xl bg-card border border-card-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400">
            Today&apos;s Target
          </div>
          <div className="text-sm font-medium text-white flex items-center gap-2">
            <span>
              {performance.dailyGoalProgress.completedToday} of {performance.dailyGoalProgress.target} problems solved today
            </span>
            <span className="text-xs text-electric">({performance.dailyGoalProgress.percentage}%)</span>
          </div>
        </div>

        <div className="w-full sm:w-64 bg-surface rounded-full h-2.5 overflow-hidden border border-card-border">
          <div
            className="bg-gradient-to-r from-blue-600 to-electric h-full rounded-full transition-all duration-500"
            style={{ width: `${Math.min(100, performance.dailyGoalProgress.percentage)}%` }}
          />
        </div>
      </div>

      {/* 4. MAIN 2-COLUMN GRID (Syllabus & Weak Concepts / Activity) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (8 cols): Chapter Progress & Roadmap */}
        <div className="lg:col-span-8 space-y-8">
          {/* Chapter-Wise Progress */}
          <div className="p-6 rounded-2xl bg-card border border-card-border space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Compass className="w-5 h-5 text-electric" />
                  <span>Physics Syllabus Mastery</span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Real-time demonstrated mastery computed from verified question attempts
                </p>
              </div>
              <span className="text-xs font-mono text-slate-500">JEE Syllabus 2026</span>
            </div>

            <div className="space-y-3">
              {subjectProgress.chapters.map((chap: any) => (
                <div
                  key={chap.chapterId}
                  className="p-4 rounded-xl bg-surface/50 border border-card-border hover:border-slate-600 transition-colors flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <div className="text-sm font-semibold text-white">{chap.chapterName}</div>
                    <div className="text-xs text-slate-400">
                      {chap.topicsCount} Topics • {chap.attemptedCount} Attempts Logged
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-sm font-bold text-slate-200">
                        {chap.accuracyPercentage}%
                      </div>
                      <div className="text-[10px] text-slate-500">Accuracy</div>
                    </div>
                    <Link
                      href={`/solve?chapter=${chap.slug}`}
                      className="p-2 rounded-lg bg-surface hover:bg-blue-600/20 text-slate-400 hover:text-electric transition-colors"
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
          <div className="p-6 rounded-2xl bg-card border border-card-border space-y-5">
            <div>
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                <span>Personalized Concept Roadmap</span>
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Spaced-repetition tasks tailored to reinforce prerequisite gaps
              </p>
            </div>

            <div className="space-y-3">
              {learningRoadmap.map((item: any) => (
                <div
                  key={item.stepNumber}
                  className="p-4 rounded-xl bg-surface/40 border border-card-border flex items-start gap-3"
                >
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${
                      item.status === 'COMPLETED'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                        : item.status === 'IN_PROGRESS'
                        ? 'bg-blue-500/20 text-electric border border-blue-500/30'
                        : 'bg-slate-800 text-slate-500'
                    }`}
                  >
                    {item.stepNumber}
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="text-sm font-semibold text-white flex items-center justify-between">
                      <span>{item.title}</span>
                      <span
                        className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded ${
                          item.status === 'COMPLETED'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : item.status === 'IN_PROGRESS'
                            ? 'bg-blue-500/10 text-electric'
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
          <div className="p-6 rounded-2xl bg-card border border-card-border space-y-4">
            <div className="flex items-center gap-2 text-amber-400 text-sm font-bold">
              <AlertTriangle className="w-4 h-4" />
              <span>Diagnosed Learning Gaps</span>
            </div>
            <p className="text-xs text-slate-400">
              Identified from error patterns in your recent problem attempts:
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
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 font-mono">
                        {wc.diagnosedMistake}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">{wc.recommendation}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-xl bg-surface/50 border border-card-border text-center text-xs text-slate-400">
                No acute learning gaps detected yet. Keep solving!
              </div>
            )}
          </div>

          {/* Recent Activity Card */}
          <div className="p-6 rounded-2xl bg-card border border-card-border space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white">Recent Attempts</h4>
              <span className="text-xs text-slate-500">{recentActivity.length} logged</span>
            </div>

            {recentActivity.length > 0 ? (
              <div className="space-y-2.5">
                {recentActivity.slice(0, 5).map((att: any) => (
                  <div
                    key={att.attemptId}
                    className="p-3 rounded-xl bg-surface/50 border border-card-border text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-slate-300">{att.questionId}</span>
                      <span
                        className={`flex items-center gap-1 font-semibold ${
                          att.isCorrect ? 'text-emerald-400' : 'text-red-400'
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
              <div className="p-6 rounded-xl bg-surface/40 border border-card-border text-center text-xs text-slate-400 space-y-2">
                <div>No attempts recorded yet.</div>
                <Link
                  href="/solve"
                  className="inline-block text-electric font-semibold hover:underline"
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
