'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Play, 
  Pause, 
  Clock, 
  Award, 
  CheckCircle2, 
  XCircle, 
  Sparkles, 
  HelpCircle, 
  Edit3, 
  AlertCircle, 
  ArrowLeft,
  RefreshCw,
  Send,
  MessageSquare,
  ShieldAlert,
  Brain,
  Check
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

  // AI Mentor State
  const [mentorMode, setMentorMode] = useState<'COLLABORATIVE' | 'STRICT'>('COLLABORATIVE');
  const [unlockedHintLevel, setUnlockedHintLevel] = useState<number>(0);
  const [hintsCache, setHintsCache] = useState<{ [level: number]: { text: string; note: string } }>({});
  const [isLoadingHint, setIsLoadingHint] = useState(false);

  // Mistake Analysis State
  const [mistakeAnalysis, setMistakeAnalysis] = useState<any>(null);
  const [isLoadingMistake, setIsLoadingMistake] = useState(false);

  // AI Chat State
  const [chatMessages, setChatMessages] = useState<
    { sender: 'student' | 'mentor'; text: string; time: string }[]
  >([]);
  const [chatInput, setChatInput] = useState('');
  const [isChatSending, setIsChatSending] = useState(false);

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
      const data = await apiRequest('/ai/hint', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          requestedLevel: level,
          mentorMode,
        }),
      });

      setHintsCache((prev) => ({
        ...prev,
        [level]: { text: data.hintTextLatex, note: data.guidanceNote },
      }));
      setUnlockedHintLevel(level);
    } catch (err) {
      console.error('Failed to get hint:', err);
    } finally {
      setIsLoadingHint(false);
    }
  };

  const handleSubmitAnswer = async () => {
    let submittedAnswer: any = null;

    if (question.questionType === 'SINGLE_CORRECT') {
      if (!selectedSingleKey) {
        alert('Please select an option before submitting.');
        return;
      }
      submittedAnswer = selectedSingleKey;
    } else if (question.questionType === 'MULTIPLE_CORRECT') {
      if (selectedMultiKeys.length === 0) {
        alert('Please select at least one option.');
        return;
      }
      submittedAnswer = selectedMultiKeys;
    } else if (question.questionType === 'NUMERICAL') {
      if (!numericalInput || isNaN(Number(numericalInput))) {
        alert('Please enter a valid numerical value.');
        return;
      }
      submittedAnswer = parseFloat(numericalInput);
    }

    setIsSubmitting(true);
    try {
      const result = await apiRequest(`/questions/${questionId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          submittedAnswer,
          timeSpentSeconds: seconds,
          hintsRequested: unlockedHintLevel,
        }),
      });

      setSubmissionResult(result);
      setIsTimerRunning(false);

      if (!result.isCorrect) {
        triggerMistakeAnalysis(submittedAnswer);
      }
    } catch (err: any) {
      console.error('Error submitting answer:', err);
      alert(err.message || 'Failed to submit answer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerMistakeAnalysis = async (submittedAnswer: any) => {
    setIsLoadingMistake(true);
    try {
      const analysis = await apiRequest('/ai/mistake-analysis', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          submittedAnswer,
          timeSpentSeconds: seconds,
          mentorMode,
        }),
      });
      setMistakeAnalysis(analysis);
    } catch (err) {
      console.error('Failed to trigger AI mistake analysis:', err);
    } finally {
      setIsLoadingMistake(false);
    }
  };

  const handleSendChatMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isChatSending) return;

    const userMsg = chatInput.trim();
    setChatInput('');
    setChatMessages((prev) => [
      ...prev,
      { sender: 'student', text: userMsg, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
    ]);

    setIsChatSending(true);
    try {
      const response = await apiRequest('/ai/chat', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          studentMessage: userMsg,
          mentorMode,
        }),
      });

      setChatMessages((prev) => [
        ...prev,
        { sender: 'mentor', text: response.replyLatex, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'mentor',
          text: 'Unable to reach Gemini AI at the moment. Please review the verified editorial solution.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatSending(false);
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
          <RefreshCw className="w-8 h-8 text-blue-400 animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Loading Workspace Telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded-2xl flow-card text-center space-y-4">
          <AlertCircle className="w-10 h-10 text-rose-400 mx-auto" />
          <h3 className="text-lg font-bold text-white">Problem Unavailable</h3>
          <p className="text-sm text-slate-400">{error || 'Could not load question.'}</p>
          <Link
            href="/solve"
            className="inline-block px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow-md"
          >
            Return to Problem Bank
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-slate-950">
      {/* Top Bar Navigation (Flowbite Clean Workspace Header) */}
      <div className="h-13 border-b border-slate-800 bg-slate-950/90 px-4 py-2 flex items-center justify-between text-xs shrink-0 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Link
            href="/solve"
            className="text-slate-400 hover:text-white flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Problem Bank</span>
          </Link>
          <span className="text-slate-700">|</span>
          <span className="font-mono text-cyan-300 font-bold bg-cyan-500/10 px-2 py-0.5 rounded border border-cyan-500/20">
            {question.code}
          </span>
          <span className="flow-pill flow-pill-blue hidden sm:inline-flex text-[11px] py-0 px-2">
            {question.examType.replace('_', ' ')}
          </span>
        </div>

        {/* Stopwatch & Marks */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1 rounded-xl bg-slate-900 border border-slate-800 font-mono text-slate-200 shadow-sm">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold">{formatTimer(seconds)}</span>
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

          <div className="hidden sm:flex items-center gap-1.5 font-semibold text-slate-300 bg-slate-900 px-3 py-1 rounded-xl border border-slate-800">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>+{question.marks} / -{question.negativeMarks}</span>
          </div>
        </div>
      </div>

      {/* Mobile Tab Switcher */}
      <div className="lg:hidden flex border-b border-slate-800 bg-slate-900 text-xs font-semibold">
        <button
          onClick={() => setMobileTab('problem')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'problem'
              ? 'border-blue-500 text-blue-400 bg-slate-800/50'
              : 'border-transparent text-slate-400'
          }`}
        >
          1. Problem
        </button>
        <button
          onClick={() => setMobileTab('workspace')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'workspace'
              ? 'border-blue-500 text-blue-400 bg-slate-800/50'
              : 'border-transparent text-slate-400'
          }`}
        >
          2. Workspace
        </button>
        <button
          onClick={() => setMobileTab('mentor')}
          className={`flex-1 py-2.5 text-center border-b-2 transition-colors ${
            mobileTab === 'mentor'
              ? 'border-blue-500 text-blue-400 bg-slate-800/50'
              : 'border-transparent text-slate-400'
          }`}
        >
          3. AI Mentor
        </button>
      </div>

      {/* 3-Panel Main Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* PANEL 1: PROBLEM STATEMENT (5 cols) */}
        <div
          className={`lg:col-span-5 border-r border-slate-800 bg-slate-950 p-6 overflow-y-auto space-y-6 ${
            mobileTab === 'problem' ? 'block' : 'hidden lg:block'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Problem Statement
            </span>
            <span className="flow-pill flow-pill-amber">
              {question.difficulty}
            </span>
          </div>

          <div className="text-slate-200 text-sm leading-relaxed space-y-4">
            <MathRenderer content={question.contentLatex} />
          </div>

          {question.imageUrl && (
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={question.imageUrl}
                alt="Question Diagram"
                className="max-h-60 mx-auto object-contain rounded-lg"
              />
            </div>
          )}

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-1.5">
            <div>
              <span className="text-slate-300 font-medium">Exam Standard:</span> {question.examType.replace('_', ' ')}
            </div>
            <div>
              <span className="text-slate-300 font-medium">Recommended Time:</span>{' '}
              {Math.round(question.timeRecommendationSec / 60)} minutes
            </div>
            {question.isPYQ && (
              <div className="text-amber-400 font-semibold flex items-center gap-1 pt-1">
                ★ JEE Previous Year Question ({question.pyqYear})
              </div>
            )}
          </div>
        </div>

        {/* PANEL 2: ANSWER INPUT & SCRATCHPAD (4 cols) */}
        <div
          className={`lg:col-span-4 border-r border-slate-800 bg-slate-900/90 p-6 overflow-y-auto flex flex-col justify-between ${
            mobileTab === 'workspace' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="space-y-5">
            {/* Center Tabs: Input vs Scratchpad (Flowbite Tab Pill) */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-slate-800 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setActiveCenterTab('input')}
                className={`flex-1 py-1.5 rounded-lg transition-all ${
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
                className={`flex-1 py-1.5 rounded-lg flex items-center justify-center gap-1.5 transition-all ${
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
                            : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-950 hover:border-slate-700'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            selectedSingleKey === opt.optionKey
                              ? 'border-blue-400 bg-blue-600 text-white'
                              : 'border-slate-600 text-slate-400'
                          }`}
                        >
                          {opt.optionKey}
                        </div>
                        <div className="flex-1 font-medium">
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
                              ? 'bg-blue-600/20 border-blue-500 text-white shadow-md shadow-blue-500/10'
                              : 'bg-slate-950/60 border-slate-800 text-slate-300 hover:bg-slate-950 hover:border-slate-700'
                          }`}
                        >
                          <div
                            className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                              isChecked
                                ? 'border-blue-400 bg-blue-600 text-white'
                                : 'border-slate-600 text-slate-400'
                            }`}
                          >
                            {isChecked ? <Check className="w-3.5 h-3.5" /> : opt.optionKey}
                          </div>
                          <div className="flex-1 font-medium">
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
                        className="w-full px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 text-white text-lg font-mono outline-none"
                      />
                      {question.unit && (
                        <span className="absolute right-4 top-3.5 text-sm font-mono text-slate-400">
                          {question.unit}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-slate-500">
                      Standard SI units applied. Deterministic tolerance check configured on server.
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
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs font-mono outline-none focus:border-blue-500 resize-none"
                />
              </div>
            )}
          </div>

          {/* Submit Action */}
          <div className="pt-6 border-t border-slate-800 mt-6">
            <button
              onClick={handleSubmitAnswer}
              disabled={isSubmitting || !!submissionResult}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-semibold text-sm shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2"
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

        {/* PANEL 3: AI MENTOR, PROGRESSIVE HINTS & CHAT (3 cols) */}
        <div
          className={`lg:col-span-3 bg-slate-950/70 p-5 overflow-y-auto space-y-5 flex flex-col justify-between ${
            mobileTab === 'mentor' ? 'block' : 'hidden lg:flex'
          }`}
        >
          <div className="space-y-5">
            {/* Header: AI Mentor & Persona Switcher */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>AI Mentor</span>
              </div>

              {/* Mode Toggle (Flowbite Switch) */}
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800">
                <button
                  type="button"
                  onClick={() => setMentorMode('COLLABORATIVE')}
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                    mentorMode === 'COLLABORATIVE'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Collaborative Mode: step-by-step guidance and analogies"
                >
                  Collab
                </button>
                <button
                  type="button"
                  onClick={() => setMentorMode('STRICT')}
                  className={`px-2.5 py-0.5 rounded-md text-[10px] font-semibold transition-all ${
                    mentorMode === 'STRICT'
                      ? 'bg-rose-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                  title="Strict Mode: disciplined, socratic, refuses to reveal shortcuts"
                >
                  Strict
                </button>
              </div>
            </div>

            {/* Post-Submission Result & AI Mistake Diagnosis */}
            {submissionResult ? (
              <div className="space-y-4">
                {/* Result Banner */}
                <div
                  className={`p-4 rounded-xl border text-sm space-y-1.5 ${
                    submissionResult.isCorrect
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                      : 'bg-rose-500/10 border-rose-500/30 text-rose-300'
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
                        <XCircle className="w-5 h-5 text-rose-400" />
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
                </div>

                {/* AI Mistake Diagnosis Card */}
                {!submissionResult.isCorrect && (
                  <div className="p-4 rounded-xl flow-card border-amber-500/30 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1">
                        <Brain className="w-3.5 h-3.5" />
                        <span>AI Mistake Diagnosis</span>
                      </span>
                      {mistakeAnalysis && (
                        <span className="flow-pill flow-pill-amber text-[10px] py-0 px-2 font-mono">
                          {mistakeAnalysis.mistakeType}
                        </span>
                      )}
                    </div>

                    {isLoadingMistake ? (
                      <div className="py-4 text-center text-xs text-slate-400 flex items-center justify-center gap-2">
                        <RefreshCw className="w-4 h-4 text-amber-400 animate-spin" />
                        <span>Diagnosing reasoning path...</span>
                      </div>
                    ) : mistakeAnalysis ? (
                      <div className="space-y-2 text-xs">
                        <p className="text-slate-300 font-medium">
                          {mistakeAnalysis.divergencePoint}
                        </p>
                        <div className="text-slate-400 leading-relaxed text-[11px]">
                          <MathRenderer content={mistakeAnalysis.analysisTextLatex} />
                        </div>
                        {mistakeAnalysis.prerequisiteWarning && (
                          <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-[11px] flex items-center gap-1.5 font-medium">
                            <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                            <span>Prerequisite Warning: {mistakeAnalysis.prerequisiteWarning}</span>
                          </div>
                        )}
                        <div className="text-[11px] text-cyan-400 font-semibold pt-1">
                          &rarr; {mistakeAnalysis.suggestedReview}
                        </div>
                      </div>
                    ) : null}
                  </div>
                )}

                {/* Verified Editorial Solution */}
                <div className="p-4 rounded-xl flow-card space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-cyan-400 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4" />
                    <span>Verified Solution</span>
                  </div>
                  <div className="text-xs text-slate-300 leading-relaxed space-y-3">
                    <MathRenderer
                      content={submissionResult.verifiedSolution?.solutionTextLatex || ''}
                    />
                  </div>
                </div>

                <Link
                  href="/solve"
                  className="w-full py-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-semibold text-center block transition-colors"
                >
                  Return to Problem Bank &rarr;
                </Link>
              </div>
            ) : (
              /* Pre-Submission Progressive Hints Drawer */
              <div className="space-y-4">
                <div className="text-xs text-slate-400 leading-relaxed">
                  {mentorMode === 'STRICT'
                    ? 'Strict Mentor active: Hints provide mathematical constraints without shortcuts.'
                    : 'Collaborative Mentor active: Progressive hints to guide your reasoning.'}
                </div>

                {/* Hint Level Selector Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  {[1, 2, 3, 4].map((level) => (
                    <button
                      key={level}
                      onClick={() => requestHint(level)}
                      className={`p-2.5 rounded-xl border text-left text-xs font-medium transition-all ${
                        unlockedHintLevel >= level
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                          : 'bg-slate-900 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div className="font-semibold">Hint Level {level}</div>
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
                    <RefreshCw className="w-4 h-4 text-blue-400 animate-spin" />
                    <span>Consulting Gemini Knowledge Graph...</span>
                  </div>
                ) : unlockedHintLevel > 0 ? (
                  <div className="p-4 rounded-xl flow-card space-y-2 text-xs">
                    <div className="font-bold text-cyan-400 flex items-center gap-1.5">
                      <HelpCircle className="w-4 h-4" />
                      <span>Level {unlockedHintLevel} Hint:</span>
                    </div>
                    {hintsCache[unlockedHintLevel]?.note && (
                      <p className="text-[11px] text-slate-400 italic">
                        {hintsCache[unlockedHintLevel].note}
                      </p>
                    )}
                    <div className="text-slate-200 leading-relaxed">
                      <MathRenderer content={hintsCache[unlockedHintLevel]?.text || ''} />
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-500">
                    Select a progressive hint tier above if you need conceptual direction.
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Interactive Chat Drawer Section at Bottom of Panel 3 */}
          <div className="pt-4 border-t border-slate-800 space-y-3">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
              <MessageSquare className="w-3.5 h-3.5 text-cyan-400" />
              <span>Ask AI Mentor a Doubt</span>
            </div>

            {/* Conversation Feed */}
            {chatMessages.length > 0 && (
              <div className="max-h-48 overflow-y-auto space-y-2 p-2 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                {chatMessages.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded-lg text-xs leading-relaxed ${
                      msg.sender === 'student'
                        ? 'bg-blue-600/20 text-white ml-4 border border-blue-500/30'
                        : 'bg-slate-950 text-slate-300 mr-4 border border-slate-800'
                    }`}
                  >
                    <div className="text-[10px] font-bold text-slate-400 mb-1 flex items-center justify-between">
                      <span>{msg.sender === 'student' ? 'You' : `AI Mentor (${mentorMode})`}</span>
                      <span>{msg.time}</span>
                    </div>
                    <MathRenderer content={msg.text} />
                  </div>
                ))}
                {isChatSending && (
                  <div className="p-2 text-xs text-slate-400 italic flex items-center gap-2">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
                    <span>Gemini Mentor is formulating a physics explanation...</span>
                  </div>
                )}
              </div>
            )}

            {/* Chat Input Form */}
            <form onSubmit={handleSendChatMessage} className="flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about torque, formulas, constraints..."
                disabled={isChatSending}
                className="flex-1 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 focus:border-blue-500 text-white text-xs outline-none transition-colors"
              />
              <button
                type="submit"
                disabled={isChatSending || !chatInput.trim()}
                className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white transition-colors shadow-sm"
                title="Send doubt to AI mentor"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
