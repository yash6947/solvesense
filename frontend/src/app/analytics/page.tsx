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
      setKnowledgeGaps(gaps || []);
      setRecommendations(recs);
    } catch (err) {
      console.error('Failed to load student analytics:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Computing Problem-Solving Index metrics...</span>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded bg-[#262626] border border-[#333333] text-center space-y-4">
          <AlertTriangle className="w-8 h-8 text-[#ffc01e] mx-auto" />
          <h3 className="text-base font-bold text-white">Analytics Offline</h3>
          <button
            onClick={loadAllIntelligence}
            className="px-4 py-2 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black text-xs font-semibold"
          >
            Retry Connection
          </button>
        </div>
      </div>
    );
  }

  const { psi, summary, weeklyActivity, difficultyBreakdown, chapterPerformance } = analyticsData;

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* 1. Header Banner */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333]">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 className="w-4 h-4 text-[#ffa116]" />
          <span className="text-xs font-mono font-semibold uppercase text-[#ffa116]">Performance Telemetry</span>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Problem-Solving Index (PSI) & Concept Diagnostics
        </h1>
        <p className="text-xs text-[#8c8c8c] mt-1 max-w-2xl">
          Deterministic analytics measuring demonstrated problem solving capability across accuracy, pacing, difficulty calibration, and prerequisite concept mastery.
        </p>
      </div>

      {/* 2. PSI Master Score Card */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#333333]">
          <div>
            <div className="text-[11px] font-mono text-[#8c8c8c] uppercase font-semibold">Composite Rating</div>
            <div className="text-4xl font-black font-mono text-[#00b8a3] mt-1">
              {psi.overallPsi} <span className="text-sm text-[#8c8c8c] font-normal font-sans">/ 100 PSI</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="p-3 rounded bg-[#1f1f1f] border border-[#333333] text-center min-w-[90px]">
              <div className="text-lg font-bold font-mono text-[#00b8a3]">{summary.overallAccuracy}%</div>
              <div className="text-[10px] text-[#8c8c8c] uppercase font-mono mt-0.5">Accuracy</div>
            </div>
            <div className="p-3 rounded bg-[#1f1f1f] border border-[#333333] text-center min-w-[90px]">
              <div className="text-lg font-bold font-mono text-[#ffa116]">{summary.currentStreak}d</div>
              <div className="text-[10px] text-[#8c8c8c] uppercase font-mono mt-0.5">Streak</div>
            </div>
            <div className="p-3 rounded bg-[#1f1f1f] border border-[#333333] text-center min-w-[90px]">
              <div className="text-lg font-bold font-mono text-white">
                {Math.round(summary.averageTimeSeconds / 60)}m {summary.averageTimeSeconds % 60}s
              </div>
              <div className="text-[10px] text-[#8c8c8c] uppercase font-mono mt-0.5">Avg Pace</div>
            </div>
          </div>
        </div>

        {/* 4 Factor Contributions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Object.entries(psi.factors).map(([key, factor]: any) => (
            <div key={key} className="p-3.5 rounded bg-[#1f1f1f] border border-[#333333] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">
                  {key === 'accuracyFactor'
                    ? 'Accuracy'
                    : key === 'difficultyCalibration'
                    ? 'Difficulty Weight'
                    : key === 'streakConsistency'
                    ? 'Consistency'
                    : 'Speed Efficiency'}
                </span>
                <span className="font-mono font-bold text-[#00b8a3]">+{factor.contribution} pts</span>
              </div>

              <div className="w-full bg-[#141414] rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-[#00b8a3] h-full rounded-full"
                  style={{ width: `${Math.min(100, factor.score)}%` }}
                />
              </div>

              <p className="text-[11px] text-[#8c8c8c] leading-normal">{factor.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Recharts Section: Weekly Activity & Chapter Mastery */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: 7-Day Problem Solving Activity */}
        <div className="lg:col-span-7 p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>7-Day Problem Solving Volume</span>
            <span className="font-mono text-[#8c8c8c] text-[11px]">Past 7 Days</span>
          </div>

          <div className="h-60 w-full pt-2">
            {isClient && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyActivity}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333333" />
                  <XAxis dataKey="dayName" stroke="#8c8c8c" fontSize={11} />
                  <YAxis stroke="#8c8c8c" fontSize={11} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#262626',
                      borderColor: '#404040',
                      borderRadius: '0.375rem',
                      color: '#eff1f6',
                      fontSize: '12px',
                    }}
                  />
                  <Bar dataKey="attempted" name="Attempted" fill="#383838" radius={[2, 2, 0, 0]} />
                  <Bar dataKey="correct" name="Correct" fill="#00b8a3" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Right: Chapter-Wise Proficiency */}
        <div className="lg:col-span-5 p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
          <div className="flex items-center justify-between text-xs font-semibold text-white">
            <span>Chapter Mastery Breakdown</span>
            <span className="font-mono text-[#8c8c8c] text-[11px]">Accuracy %</span>
          </div>

          <div className="space-y-3 pt-1">
            {chapterPerformance.map((chap: any) => (
              <div key={chap.chapterId} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#eff1f6]">{chap.chapterName}</span>
                  <span className="font-mono text-[#8c8c8c]">{chap.accuracy}%</span>
                </div>
                <div className="w-full bg-[#141414] rounded-full h-1.5 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      chap.accuracy >= 70
                        ? 'bg-[#00b8a3]'
                        : chap.accuracy >= 40
                        ? 'bg-[#ffc01e]'
                        : chap.accuracy > 0
                        ? 'bg-[#ff375f]'
                        : 'bg-[#333333]'
                    }`}
                    style={{ width: `${Math.max(5, chap.accuracy)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Prerequisite Knowledge Gap Diagnosis */}
      <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Prerequisite Knowledge Gap Diagnosis
            </h2>
            <p className="text-xs text-[#8c8c8c] mt-0.5">
              Root-cause dependency analysis identifying prerequisite concepts behind incorrect attempts.
            </p>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-[#ffa116] border border-[#383838]">
            {knowledgeGaps.length} Gaps Flagged
          </span>
        </div>

        {knowledgeGaps.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {knowledgeGaps.map((gap: any, idx: number) => (
              <div
                key={idx}
                className="p-4 rounded bg-[#1f1f1f] border border-[#333333] space-y-2.5 text-xs"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-bold text-white block">{gap.conceptName}</span>
                    <span className="text-[11px] text-[#8c8c8c]">{gap.chapterName}</span>
                  </div>
                  <span className="text-[11px] font-mono font-semibold text-[#ff375f] bg-[#ff375f]/10 border border-[#ff375f]/20 px-2 py-0.5 rounded">
                    {gap.studentAccuracy}% Acc
                  </span>
                </div>

                {gap.isPrerequisiteGap && gap.rootCausePrerequisite && (
                  <div className="p-2.5 rounded bg-[#181818] border border-[#2e2e2e] space-y-1">
                    <div className="text-[11px] font-bold text-[#ffa116] flex items-center gap-1.5">
                      <Layers className="w-3.5 h-3.5" />
                      <span>Root Cause Prerequisite:</span>
                    </div>
                    <div className="text-white font-medium">
                      {gap.rootCausePrerequisite.name}
                    </div>
                    <p className="text-[#8c8c8c] text-[11px] leading-relaxed">
                      {gap.rootCausePrerequisite.reason}
                    </p>
                  </div>
                )}

                <div className="text-[#00b8a3] font-medium pt-1">
                  &rarr; {gap.recommendedAction}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-6 text-center text-xs text-[#8c8c8c] bg-[#1f1f1f] rounded border border-[#333333]">
            No acute prerequisite gaps detected. Foundational concept dependencies verified!
          </div>
        )}
      </div>

      {/* 5. Adaptive Question Recommendations */}
      {recommendations && (
        <div className="p-5 rounded-lg bg-[#262626] border border-[#333333] space-y-4">
          <div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">
              Targeted Remediation Queue
            </h2>
            <p className="text-xs text-[#8c8c8c] mt-0.5">
              {recommendations.primaryRecommendationMessage}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {recommendations.recommendations.map((rec: any) => (
              <div
                key={rec.questionId}
                className="p-4 rounded bg-[#1f1f1f] border border-[#333333] hover:border-[#404040] transition-colors flex flex-col justify-between space-y-3"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-white">
                      {rec.code}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#262626] text-[#8c8c8c] border border-[#383838]">
                      {rec.difficulty}
                    </span>
                  </div>

                  <div className="text-xs text-[#d1d5db] line-clamp-2 leading-relaxed">
                    <MathRenderer content={rec.contentLatexPreview} />
                  </div>

                  <div className="text-[11px] text-[#8c8c8c] pt-1">
                    <span className="text-[#ffa116] font-semibold">Reason: </span>
                    {rec.reason}
                  </div>
                </div>

                <Link
                  href={`/solve/${rec.questionId}`}
                  className="w-full py-2 rounded bg-[#333333] hover:bg-[#3d3d3d] text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>Solve Problem</span>
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
