'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  ChevronRight, 
  BookOpen, 
  Edit3, 
  AlertCircle, 
  Layers, 
  ArrowLeft,
  RefreshCw,
  Bookmark
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import MathRenderer from '@/components/MathRenderer';

export default function QuestionWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Answer state
  const [selectedSingleKey, setSelectedSingleKey] = useState<string>('');
  const [selectedMultiKeys, setSelectedMultiKeys] = useState<string[]>([]);
  const [numericalInput, setNumericalInput] = useState<string>('');
  const [scratchpadText, setScratchpadText] = useState<string>('');
  const [activeCenterTab, setActiveCenterTab] = useState<'input' | 'scratchpad'>('input');

  // Submission & evaluation state
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<any>(null);

  // Progressive Hint state
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(0);
  const [hintsCache, setHintsCache] = useState<{ [level: number]: string }>({});
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  // Mobile layout tab
  const [mobileTab, setMobileTab] = useState<'problem' | 'workspace' | 'mentor'>('problem');

  // Timer effect
  useEffect(() => {
    let interval: any = null;
    if (isTimerRunning && !submissionResult) {
      interval = setInterval(() => {
        setSeconds((s) => s + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, submissionResult]);

  useEffect(() => {
    fetchQuestionDetails();
  }, [questionId]);

  const fetchQuestionDetails = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest(`/questions/${questionId}`);
      setQuestion(data);
    } catch (err: any) {
      console.error('Failed to load question:', err);
      setError(err.message || 'Failed to fetch question details');
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMultiOption = (key: string) => {
    if (selectedMultiKeys.includes(key)) {
      setSelectedMultiKeys(selectedMultiKeys.filter((k) => k !== key));
    } else {
      setSelectedMultiKeys([...selectedMultiKeys, key]);
    }
  };

  const requestHint = async (level: number) => {
    if (hintsCache[level]) {
      setUnlockedHintLevel(level);
      return;
    }

    setIsLoadingHint(true);
    try {
      const data = await apiRequest(`/questions/${questionId}/hints?level=${level}`);
      setHintsCache((prev) => ({ ...prev, [level]: data.hintTextLatex }));
      setUnlockedHintLevel(level);
    } catch (err: any) {
      console.error('Failed to fetch hint:', err);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleSubmitAnswer = async () => {
    if (!token) {
      router.push('/auth/login');
      return;
    }

    let answerPayload: any = null;

    if (question.questionType === 'SINGLE_CORRECT') {
      if (!selectedSingleKey) {
        alert('Please select an option before submitting.');
        return;
      }
      answerPayload = [selectedSingleKey];
    } else if (question.questionType === 'MULTIPLE_CORRECT') {
      if (selectedMultiKeys.length === 0) {
        alert('Please select at least one option.');
        return;
      }
      answerPayload = selectedMultiKeys;
    } else if (question.questionType === 'NUMERICAL') {
      if (numericalInput.trim() === '' || isNaN(Number(numericalInput))) {
        alert('Please enter a valid numerical value.');
        return;
      }
      answerPayload = parseFloat(numericalInput);
    }

    setIsSubmitting(true);
    try {
      const result = await apiRequest(`/questions/${questionId}/attempts`, {
        method: 'POST',
        body: JSON.stringify({
          submittedAnswer: answerPayload,
          timeSpentSeconds: seconds || 1,
          hintsRequested: unlockedHintLevel,
        }),
      });

      setSubmissionResult(result);
      setIsTimerRunning(false);
      // Switch mobile view to mentor/solution
      setMobileTab('mentor');
    } catch (err: any) {
      console.error('Submission failed:', err);
      alert(err.message || 'Error evaluating answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-electric animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Loading Workspace Telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded-2xl bg-card border border-card-border text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Problem Unavailable</h3>
          <p className="text-sm text-slate-400">{error || 'Could not load question.'}</p>
          <Link
            href="/solve"
            className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white text-sm font-semibold"
          >
            Return to Problem Bank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* Top Bar Navigation */}
      <div className="h-12 border-b border-card-border bg-surface/80 px-4 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-3">
          <Link
            href="/solve"
            className="text-slate-400 hover:text-white flex items-center gap-1 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Problem Bank</span>
          </Link>
          <span className="text-slate-600">|</span>
          <span className="font-mono text-slate-300 font-semibold">{question.code}</span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-500/10 text-electric border border-blue-500/20 font-medium">
            {question.examType.replace('_', ' ')}
          </span>
        </div>

        {/* Stopwatch & Marks */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-surface border border-card-border font-mono text-slate-200">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>{formatTimer(seconds)}</span>
            {!submissionResult && (
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-slate-400 hover:text-white ml-1"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1.5 font-medium text-slate-300">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>+{question.marks} / -{question.negativeMarks}</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-card-border bg-card text-xs font-semibold">
        <button
          onClick={() => setMobileTab('problem')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'problem'
              ? 'border-electric text-electric bg-surface'
              : 'border-transparent text-slate-400'
          }`}
        >
          1. Problem
        </button>
        <button
          onClick={() => setMobileTab('workspace')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'workspace'
              ? 'border-electric text-electric bg-surface'
              : 'border-transparent text-slate-400'
          }`}
        >
          2. Workspace
        </button>
        <button
          onClick={() => setMobileTab('mentor')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'mentor'
              ? 'border-electric text-electric bg-surface'
              : 'border-transparent text-slate-400'
          }`}
        >
          3. AI Mentor & Solution
        </button>
      </div>

      {/* 3-Panel Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* PANEL 1: PROBLEM STATEMENT (4 cols) */}
        <div
          className={`lg:col-span-5 border-r border-card-border bg-background p-6 overflow-y-auto space-y-6 ${
            mobileTab === 'problem' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Problem Statement
            </span>
            <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              {question.difficulty}
            </span>
          </div>

          <div className="text-slate-200 text-sm leading-relaxed space-y-4">
            <MathRenderer content={question.contentLatex} />
          </div>

          {question.imageUrl && (
            <div className="p-4 rounded-xl bg-surface border border-card-border">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageUrl}
                alt="Question Diagram"
                className="max-h-60 mx-auto object-contain rounded-lg"
              />
            </div>
          )}

          <div className="pt-4 border-t border-card-border text-xs text-slate-400 space-y-1">
            <div>
              <span className="text-slate-300 font-medium">Exam Standard:</span> {question.examType.replace('_', ' ')}
            </div>
            <div>
              <span className="text-slate-300 font-medium">Recommended Time:</span>{' '}
              {Math.round(question.timeRecommendationSec / 60)} minutes
            </div>
            {question.isPYQ && (
              <div className="text-amber-400 font-semibold">
                ★ JEE Previous Year Question ({question.pyqYear})
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: ANSWER INPUT & SCRATCHPAD (4 cols) */}
        <div
          className={`lg:col-span-4 border-r border-card-border bg-card p-6 overflow-y-auto flex flex-col justify-between ${
            mobileTab === 'workspace' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="space-y-5">
            {/* Center Tabs: Input vs Scratchpad */}
            <div className="flex items-center gap-2 p-1 rounded-xl bg-surface border border-card-border text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveCenterTab('input')}
                className={`flex-1 py-1.5 rounded-lg transition-colors ${
                  activeCenterTab === 'input'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Answer Selection
              </button>
              <button
                type="button"
                onClick={() => setActiveCenterTab('scratchpad')}
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-colors ${
                  activeCenterTab === 'scratchpad'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Working Notes</span>
              </button>
            </div>

            {activeCenterTab === 'input' ? (
              <div className="space-y-4">
                {/* 1. SINGLE CORRECT MCQ */}
                {question.questionType === 'SINGLE_CORRECT' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">
                      Select exactly one correct option:
                    </div>
                    {question.options?.map((opt: any) => (
                      <div
                        key={opt.optionKey}
                        onClick={() => setSelectedSingleKey(opt.optionKey)}
                        className={`p-3.5 rounded-xl border text-sm flex items-center gap-3 cursor-pointer transition-all ${
                          selectedSingleKey === opt.optionKey
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                            : 'bg-surface/50 border-card-border text-slate-300 hover:bg-surface'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            selectedSingleKey === opt.optionKey
                              ? 'border-blue-400 bg-blue-600 text-white'
                              : 'border-slate-500 text-slate-400'
                          }`}
                        >
                          {opt.optionKey}
                        </div>
                        <div className="flex-1">
                          <MathRenderer content={opt.contentLatex} inline />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 2. MULTIPLE CORRECT MCQ */}
                {question.questionType === 'MULTIPLE_CORRECT' && (
                  <div className="space-y-3">
                    <div className="text-xs text-slate-400 font-medium">
                      Select one or more correct options (Partial marking rules apply):
                    </div>
                    {question.options?.map((opt: any) => {
                      const isChecked = selectedMultiKeys.includes(opt.optionKey);
                      return (
                        <div
                          key={opt.optionKey}
                          onClick={() => handleToggleMultiOption(opt.optionKey)}
                          className={`p-3.5 rounded-xl border text-sm flex items-center gap-3 cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                              : 'bg-surface/50 border-card-border text-slate-300 hover:bg-surface'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                              isChecked
                                ? 'border-blue-400 bg-blue-600 text-white'
                                : 'border-slate-500 text-slate-400'
                            }`}
                          >
                            {isChecked ? '✓' : opt.optionKey}
                          </div>
                          <div className="flex-1">
                            <MathRenderer content={opt.contentLatex} inline />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* 3. NUMERICAL VALUE INPUT */}
                {question.questionType === 'NUMERICAL' && (
                  <div className="space-y-4">
                    <div className="text-xs text-slate-400 font-medium">
                      Enter the calculated decimal value (Tolerance: ±0.05):
                    </div>
                    <div className="relative">
                      <input
                        type="number"
                        step="any"
                        value={numericalInput}
                        onChange={(e) => setNumericalInput(e.target.value)}
                        placeholder="e.g. 2.00 or -4.50"
                        className="w-full px-4 py-3 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white text-lg font-mono outline-none"
                      />
                      {question.unit && (
                        <span className="absolute right-4 top-3.5 text-sm font-mono text-slate-400">
                          {question.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Rounded up to 2 decimal places. Standard SI unit applied.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              /* Scratchpad Tab */
              <div className="space-y-2">
                <div className="text-xs text-slate-400 font-medium">
                  Scratchpad & Formula Workspace:
                </div>
                <textarea
                  rows={10}
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Type working notes, free body equations, or torque balances here..."
                  className="w-full p-3.5 rounded-xl bg-surface border border-card-border text-white text-xs font-mono outline-none focus:border-electric resize-none"
                />
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-card-border mt-6">
            <button
              onClick={handleSubmitAnswer}
              disabled={isSubmitting || !!submissionResult}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Evaluating Answer...</span>
                </>
              ) : submissionResult ? (
                'Answer Evaluated'
              ) : (
                'Submit Final Answer'
              )}
            </button>
          </div>
        </div>

        {/* PANEL 3: AI MENTOR & EDITORIAL SOLUTIONS (3 cols) */}
        <div
          className={`lg:col-span-3 bg-surface/30 p-6 overflow-y-auto space-y-6 ${
            mobileTab === 'mentor' ? 'block' : 'hidden lg:block'
          }`}
        >
          {/* Post-Submission Result Card */}
          {submissionResult ? (
            <div className="space-y-6">
              <div
                className={`p-4 rounded-xl border text-sm space-y-2 ${
                  submissionResult.isCorrect
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : 'bg-red-500/10 border-red-500/30 text-red-300'
                }`}
              >
                <div className="flex items-center gap-2 font-bold text-base">
                  {submissionResult.isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      <span>Solved Correctly!</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-red-400" />
                      <span>Incorrect Answer</span>
                    </>
                  )}
                </div>
                <div className="text-xs">
                  Marks Awarded:{' '}
                  <span className="font-bold">
                    {submissionResult.marksEarned > 0 ? `+${submissionResult.marksEarned}` : submissionResult.marksEarned}
                  </span>{' '}
                  • Time Taken: {submissionResult.timeSpentSeconds}s
                </div>
                {!submissionResult.isCorrect && (
                  <div className="text-xs font-mono text-amber-300">
                    Diagnosed Error: {submissionResult.diagnosedMistake}
                  </div>
                )}
              </div>

              {/* Verified Editorial Solution */}
              <div className="p-4 rounded-xl bg-card border border-card-border space-y-3">
                <div className="text-xs font-bold uppercase tracking-wider text-electric flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  <span>Verified Editorial Solution</span>
                </div>
                <div className="text-xs text-slate-300 leading-relaxed space-y-3">
                  <MathRenderer
                    content={submissionResult.verifiedSolution?.solutionTextLatex || ''}
                  />
                </div>

                {submissionResult.verifiedSolution?.keyFormulas?.length > 0 && (
                  <div className="pt-3 border-t border-card-border/60">
                    <div className="text-[11px] font-semibold text-slate-400 mb-1.5">
                      Key Governing Laws:
                    </div>
                    <div className="space-y-1">
                      {submissionResult.verifiedSolution.keyFormulas.map(
                        (f: string, i: number) => (
                          <div key={i} className="text-xs text-electric">
                            <MathRenderer content={`$${f}$`} inline />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/solve"
                className="w-full py-2.5 rounded-xl bg-surface border border-card-border hover:border-slate-500 text-slate-200 text-xs font-semibold text-center block transition-colors"
              >
                Return to Problem Bank &rarr;
              </Link>
            </div>
          ) : (
            /* Pre-Submission AI Mentoring & Progressive Hints */
            <div className="space-y-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Mentor Guidance</span>
                </div>
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/20 text-electric">
                  Progressive Hints
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Stuck on this problem? Request tiered hints that guide your reasoning without revealing the final answer.
              </p>

              {/* Hint Level Selector Buttons */}
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((level) => (
                  <button
                    key={level}
                    onClick={() => requestHint(level)}
                    className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                      unlockedHintLevel >= level
                        ? 'bg-blue-600/20 border-blue-500 text-white'
                        : 'bg-surface border-card-border text-slate-400 hover:border-slate-600'
                    }`}
                  >
                    <div>Hint Level {level}</div>
                    <div className="text-[10px] text-slate-500">
                      {level === 1
                        ? 'Direction'
                        : level === 2
                        ? 'Formula'
                        : level === 3
                        ? 'Strategy'
                        : 'Guided Step'}
                    </div>
                  </button>
                ))}
              </div>

              {/* Unlocked Hint Content */}
              {isLoadingHint ? (
                <div className="py-6 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                  <RefreshCw className="w-4 h-4 text-electric animate-spin" />
                  <span>Consulting Physics Knowledge Graph...</span>
                </div>
              ) : unlockedHintLevel > 0 ? (
                <div className="p-4 rounded-xl bg-card border border-card-border space-y-2 text-xs">
                  <div className="font-bold text-electric flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Level {unlockedHintLevel} Hint:</span>
                  </div>
                  <div className="text-slate-300 leading-relaxed">
                    <MathRenderer content={hintsCache[unlockedHintLevel] || ''} />
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-surface/40 border border-card-border text-center text-xs text-slate-500">
                  Select a hint tier above if you need conceptual scaffolding.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
