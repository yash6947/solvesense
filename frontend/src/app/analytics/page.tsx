'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  BarChart3, 
  TrendingUp, 
  Award, 
  BrainCircuit, 
  Clock, 
  Target, 
  Flame, 
  AlertTriangle, 
  ArrowRight, 
  Sparkles, 
  RefreshCw,
  Layers,
  ChevronRight,
  ShieldAlert,
  Compass,
  Zap,
  Activity
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import MathRenderer from '@/components/MathRenderer';

export default function AnalyticsPage() {
  const router = useRouter();
  const { user, token, isLoading: authLoading } = useAuth();

  const [analyticsData, setAnalyticsData] = useState<any>(null);
  const [knowledgeGaps, setKnowledgeGaps] = useState<any[]>([]);
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!authLoading && !token) {
      router.push('/auth/login');
      return;
    }

    if (token) {
      loadAllIntelligence();
    }
  }, [token, authLoading]);

  const loadAllIntelligence = async () => {
    setIsLoading(true);
    try {
      const [overview, gaps, recs] = await Promise.all([
        apiRequest('/analytics/overview'),
        apiRequest('/analytics/knowledge-gaps'),
        apiRequest('/learning/recommendations'),
      ]);
      setAnalyticsData(overview);
      setKnowledgeGaps(gaps);
      setRecommendations(recs);
    } catch (err) {
      console.error('Failed to load student intelligence:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Computing Problem-Solving Index & Telemetry...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded-2xl flow-card text-center space-y-4">
          <AlertTriangle className="w-10 h-10 text-amber-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Analytics Offline</h3>
          <button
            onClick={loadAllIntelligence}
            className="px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { psi, summary, weeklyActivity, difficultyBreakdown, chapterPerformance } = analyticsData;

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Header Banner (Flowbite Clean Header) */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card-elevated shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="flow-pill flow-pill-blue">
            <BrainCircuit className="w-3.5 h-3.5" />
            <span>Demonstrated Competency Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Student Analytics & Problem-Solving Index
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Transparent breakdown of your competitive problem-solving capabilities, prerequisite concept dependencies, and learning momentum.
          </p>
        </div>
      </div>

      {/* 2. Problem-Solving Index (PSI) Master Card */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card shadow-xl space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-cyan-400" />
              <span>Problem-Solving Index (PSI)</span>
            </div>
            <div className="text-4xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              {psi.overallPsi} <span className="text-lg text-slate-500 font-normal">/ 100</span>
            </div>
            <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
              A transparent, multi-factor metric of demonstrated capability across accuracy, problem difficulty, pacing, and practice consistency.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-[100px] shadow-sm">
              <div className="text-xl font-bold text-emerald-400">{summary.overallAccuracy}%</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Accuracy</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-[100px] shadow-sm">
              <div className="text-xl font-bold text-amber-400">{summary.currentStreak} Days</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Streak</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-center min-w-[100px] shadow-sm">
              <div className="text-xl font-bold text-purple-400">{Math.round(summary.averageTimeSeconds / 60)}m {summary.averageTimeSeconds % 60}s</div>
              <div className="text-[10px] text-slate-400 font-medium uppercase mt-0.5">Avg Pace</div>
            </div>
          </div>
        </div>

        {/* 4 Factor Contribution Bars */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {Object.entries(psi.factors).map(([key, factor]: any) => (
            <div key={key} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">
                  {key === 'accuracyFactor'
                    ? '1. Accuracy'
                    : key === 'difficultyCalibration'
                    ? '2. Difficulty Weight'
                    : key === 'streakConsistency'
                    ? '3. Consistency'
                    : '4. Speed Efficiency'}
                </span>
                <span className="font-mono font-bold text-cyan-300">+{factor.contribution} pts</span>
              </div>

              <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full rounded-full transition-all duration-700"
                  style={{ width: `${Math.min(100, factor.score)}%` }}
                />
              </div>

              <p className="text-[11px] text-slate-400 leading-normal">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recharts Section: Weekly Activity & Chapter Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left (7 cols): 7-Day Activity & Accuracy Bar Chart */}
        <div className="lg:col-span-7 p-6 rounded-2xl flow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-emerald-400" />
              <span>7-Day Problem Solving Activity</span>
            </h2>
            <span className="flow-pill flow-pill-slate text-[11px] font-mono">Past 7 Days</span>
          </div>

          <div className="h-64 w-full pt-4">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1f293d" />
                  <XAxis dataKey="dayName" stroke="#64748b" fontSize={11} />
                  <YAxis stroke="#64748b" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0b0f19',
                      borderColor: '#1f293d',
                      borderRadius: '0.75rem',
                      color: '#f8fafc',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="attempted" name="Questions Attempted" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="correct" name="Solved Correctly" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Right (5 cols): Chapter-Wise Proficiency */}
        <div className="lg:col-span-5 p-6 rounded-2xl flow-card space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-cyan-400" />
              <span>Chapter Mastery</span>
            </h2>
            <span className="flow-pill flow-pill-slate text-[11px] font-mono">Accuracy %</span>
          </div>

          <div className="space-y-3 pt-2">
            {chapterPerformance.map((chap: any) => (
              <div key={chap.chapterId} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-300 font-medium">{chap.chapterName}</span>
                  <span className="font-mono text-slate-300 font-bold">{chap.accuracy}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      chap.accuracy >= 75
                        ? 'bg-emerald-500'
                        : chap.accuracy >= 50
                        ? 'bg-blue-600'
                        : chap.accuracy > 0
                        ? 'bg-amber-500'
                        : 'bg-slate-800'
                    }`}
                    style={{ width: `${Math.max(5, chap.accuracy)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Knowledge Gap & Prerequisite Directed Graph */}
      <div className="p-6 sm:p-8 rounded-2xl flow-card shadow-xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <BrainCircuit className="w-5 h-5 text-amber-400" />
              <span>Prerequisite Knowledge Gap Diagnosis</span>
            </h2>
            <p className="text-xs text-slate-400">
              Our graph engine analyzes your error patterns and traces missing foundational dependencies.
            </p>
          </div>
          <span className="flow-pill flow-pill-amber">
            {knowledgeGaps.length} Gaps Detected
          </span>
        </div>

        {knowledgeGaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {knowledgeGaps.map((gap: any, idx: number) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-amber-500/30 space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs font-bold text-white block">{gap.conceptName}</span>
                    <span className="text-[10px] text-slate-400">{gap.chapterName}</span>
                  </div>
                  <span className="flow-pill flow-pill-rose text-[10px] py-0 px-2 font-bold">
                    {gap.studentAccuracy}% Accuracy
                  </span>
                </div>

                {/* Prerequisite DAG Link */}
                {gap.isPrerequisiteGap && gap.rootCausePrerequisite && (
                  <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1 text-xs">
                    <div className="text-[11px] font-bold text-cyan-300 flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Root Cause Prerequisite:</span>
                    </div>
                    <div className="text-slate-200 font-medium">
                      {gap.rootCausePrerequisite.name}
                    </div>
                    <p className="text-slate-400 text-[11px] leading-relaxed">
                      {gap.rootCausePrerequisite.reason}
                    </p>
                  </div>
                )}

                <p className="text-xs text-amber-300 font-medium pt-1">
                  &rarr; {gap.recommendedAction}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 rounded-xl bg-slate-900/30 border border-slate-800 text-center text-xs text-slate-400">
            No acute prerequisite gaps detected. Your foundational understanding is sound!
          </div>
        )}
      </div>

      {/* 5. Adaptive Question Recommendations */}
      {recommendations && (
        <div className="p-6 sm:p-8 rounded-2xl flow-card shadow-xl space-y-6">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-cyan-400" />
              <span>Adaptive Question Recommendations</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {recommendations.primaryRecommendationMessage}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recommendations.recommendations.map((rec: any) => (
              <div
                key={rec.questionId}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-cyan-300 bg-cyan-500/10 px-2.5 py-0.5 rounded-lg border border-cyan-500/20">
                      {rec.code}
                    </span>
                    <span className="flow-pill flow-pill-slate text-[10px]">
                      {rec.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-slate-300 leading-relaxed font-normal">
                    <MathRenderer content={rec.contentLatexPreview} />
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] text-cyan-300">
                    <span className="font-semibold text-slate-300">Why recommended: </span>
                    {rec.reason}
                  </div>
                </div>

                <Link
                  href={`/solve/${rec.questionId}`}
                  className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 shadow-md shadow-blue-600/20 transition-all"
                >
                  <span>Solve Recommended Problem</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
