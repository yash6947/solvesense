'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { 
  Clock, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  ChevronLeft, 
  ChevronRight, 
  Flag, 
  RotateCcw, 
  Send, 
  RefreshCw,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import MathRenderer from '@/components/MathRenderer';

export default function TakeContestPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const contestId = params.id as string;

  const [contestData, setContestData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Exam answers & status state
  // answers: { [qid]: answer }
  const [answers, setAnswers] = useState<{ [qid: string]: any }>({});
  // markedForReview: Set of qids
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);

  // Timer state
  const [timeLeftSec, setTimeLeftSec] = useState<number>(3600);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    if (!token) {
      router.push('/auth/login');
      return;
    }
    fetchContestPaper();
  }, [contestId, token]);

  // Countdown timer
  useEffect(() => {
    if (isLoading || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isLoading, isSubmitting]);

  const fetchContestPaper = async () => {
    setIsLoading(true);
    try {
      const data = await apiRequest(`/contests/${contestId}/paper`);
      setContestData(data.contest);
      setQuestions(data.questions);
      setTimeLeftSec((data.contest.durationMinutes || 60) * 60);
    } catch (err: any) {
      console.error('Failed to load contest paper:', err);
      alert('Could not load test paper: ' + err.message);
      router.push('/contests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (qid: string, key: string, isMulti: boolean) => {
    if (isMulti) {
      const current = Array.isArray(answers[qid]) ? answers[qid] : [];
      if (current.includes(key)) {
        setAnswers({ ...answers, [qid]: current.filter((k: string) => k !== key) });
      } else {
        setAnswers({ ...answers, [qid]: [...current, key] });
      }
    } else {
      setAnswers({ ...answers, [qid]: [key] });
    }
  };

  const handleNumericalChange = (qid: string, val: string) => {
    setAnswers({ ...answers, [qid]: val });
  };

  const handleClearResponse = (qid: string) => {
    const copy = { ...answers };
    delete copy[qid];
    setAnswers(copy);
  };

  const handleToggleReview = (qid: string) => {
    if (markedForReview.includes(qid)) {
      setMarkedForReview(markedForReview.filter((id) => id !== qid));
    } else {
      setMarkedForReview([...markedForReview, qid]);
    }
  };

  const handleAutoSubmit = () => {
    alert('Time has expired! Submitting your test automatically.');
    finalizeSubmission();
  };

  const finalizeSubmission = async () => {
    setIsSubmitting(true);
    try {
      const durationTaken = (contestData.durationMinutes * 60) - timeLeftSec;
      await apiRequest(`/contests/${contestId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          answers,
          timeSpentSeconds: Math.max(10, durationTaken),
        }),
      });

      router.push(`/contests/${contestId}/leaderboard`);
    } catch (err: any) {
      console.error('Submission failed:', err);
      alert('Submission error: ' + err.message);
      setIsSubmitting(false);
    }
  };

  const formatTimer = (secs: number) => {
    const h = Math.floor(secs / 3600);
    const m = Math.floor((secs % 3600) / 60);
    const s = secs % 60;
    if (h > 0) {
      return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  if (isLoading || !contestData) {
    return (
      <div className="flex-1 flex items-center justify-center py-24">
        <div className="flex flex-col items-center gap-3">
          <RefreshCw className="w-8 h-8 text-electric animate-spin" />
          <span className="text-slate-400 text-sm font-medium">Entering Proctored Exam Environment...</span>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;
  const isUrgent = timeLeftSec <= 300; // Under 5 mins

  // Palette counts
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.length;
  const unattemptedCount = questions.length - answeredCount;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-4rem)] overflow-hidden bg-background">
      {/* 1. Exam Proctored Header */}
      <div className="h-14 border-b border-card-border bg-surface px-4 sm:px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="font-bold text-sm text-white hidden sm:inline-block">
            {contestData.title}
          </span>
          <span className="text-xs px-2.5 py-0.5 rounded-full bg-blue-500/10 text-electric border border-blue-500/20 font-semibold font-mono">
            {contestData.examType.replace('_', ' ')}
          </span>
        </div>

        {/* Center Countdown Clock */}
        <div
          className={`flex items-center gap-2 px-4 py-1.5 rounded-xl border font-mono font-bold text-sm transition-all ${
            isUrgent
              ? 'bg-red-500/15 border-red-500 text-red-400 animate-pulse'
              : 'bg-background border-card-border text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-400" />
          <span>{formatTimer(timeLeftSec)}</span>
        </div>

        {/* End Test Button */}
        <button
          onClick={() => setShowSubmitModal(true)}
          className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-xs shadow-md transition-colors"
        >
          Finish Test
        </button>
      </div>

      {/* 2. Main Exam Body (Question View Left + Palette Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left (8 cols): Question Formulation & Answer Input */}
        <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6 flex flex-col justify-between border-r border-card-border">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-3 border-b border-card-border">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-blue-600/30 text-electric font-bold text-xs flex items-center justify-center border border-blue-500/40">
                  {currentIdx + 1}
                </span>
                <span className="text-xs font-semibold text-slate-300">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-slate-400 bg-surface px-2.5 py-1 rounded border border-card-border">
                  {currentQ.questionType.replace('_', ' ')}
                </span>
                <span className="text-emerald-400 font-semibold">+{currentQ.marks}</span>
                <span className="text-red-400 font-semibold">-{currentQ.negativeMarks}</span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-slate-200 text-sm leading-relaxed space-y-4">
              <MathRenderer content={currentQ.contentLatex} />
            </div>

            {/* Diagram */}
            {currentQ.imageUrl && (
              <div className="p-4 rounded-xl bg-surface border border-card-border">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentQ.imageUrl}
                  alt="Diagram"
                  className="max-h-60 mx-auto object-contain rounded-lg"
                />
              </div>
            )}

            {/* Options Selection */}
            <div className="space-y-3 pt-2">
              {currentQ.questionType === 'SINGLE_CORRECT' && (
                <div className="space-y-2.5">
                  {currentQ.options?.map((opt: any) => {
                    const isSelected = answers[currentQ.id]?.[0] === opt.optionKey;
                    return (
                      <div
                        key={opt.optionKey}
                        onClick={() => handleSelectOption(currentQ.id, opt.optionKey, false)}
                        className={`p-3.5 rounded-xl border text-sm flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                            : 'bg-surface/50 border-card-border text-slate-300 hover:bg-surface'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-full border flex items-center justify-center text-xs font-bold ${
                            isSelected
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
                    );
                  })}
                </div>
              )}

              {currentQ.questionType === 'MULTIPLE_CORRECT' && (
                <div className="space-y-2.5">
                  {currentQ.options?.map((opt: any) => {
                    const selectedList = answers[currentQ.id] || [];
                    const isSelected = selectedList.includes(opt.optionKey);
                    return (
                      <div
                        key={opt.optionKey}
                        onClick={() => handleSelectOption(currentQ.id, opt.optionKey, true)}
                        className={`p-3.5 rounded-xl border text-sm flex items-center gap-3 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-blue-600/20 border-blue-500 text-white shadow-sm'
                            : 'bg-surface/50 border-card-border text-slate-300 hover:bg-surface'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center text-xs font-bold ${
                            isSelected
                              ? 'border-blue-400 bg-blue-600 text-white'
                              : 'border-slate-500 text-slate-400'
                          }`}
                        >
                          {isSelected ? '✓' : opt.optionKey}
                        </div>
                        <div className="flex-1">
                          <MathRenderer content={opt.contentLatex} inline />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.questionType === 'NUMERICAL' && (
                <div className="space-y-3">
                  <div className="text-xs text-slate-400 font-medium">
                    Enter calculated value (Tolerance: ±0.05):
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleNumericalChange(currentQ.id, e.target.value)}
                    placeholder="Enter decimal answer"
                    className="w-full px-4 py-3 rounded-xl bg-surface border border-card-border focus:border-electric text-white text-lg font-mono outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-6 border-t border-card-border flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleReview(currentQ.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                    : 'bg-surface border-card-border text-slate-400 hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Mark for Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleClearResponse(currentQ.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-medium bg-surface border border-card-border text-slate-400 hover:text-white flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-4 py-2 rounded-xl bg-surface border border-card-border disabled:opacity-30 text-white text-xs font-medium flex items-center gap-1"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>

              <button
                onClick={() => {
                  if (isLastQuestion) {
                    setShowSubmitModal(true);
                  } else {
                    setCurrentIdx(currentIdx + 1);
                  }
                }}
                className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 shadow-md shadow-blue-600/20"
              >
                <span>{isLastQuestion ? 'Review & Submit' : 'Save & Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Question Navigation Palette */}
        <div className="lg:col-span-4 p-6 bg-surface/40 overflow-y-auto space-y-6">
          <div className="space-y-1">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Question Palette
            </h4>
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                <span>Answered ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                <span>Review ({markedCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <span className="w-3 h-3 rounded-full bg-slate-700 inline-block" />
                <span>Unvisited ({unattemptedCount})</span>
              </div>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 sm:grid-cols-6 gap-2.5 pt-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview.includes(q.id);
              const isCurrent = currentIdx === idx;

              let btnStyle = 'bg-surface border-card-border text-slate-400';
              if (isAnswered && isMarked) {
                btnStyle = 'bg-purple-600/30 border-purple-500 text-purple-300';
              } else if (isAnswered) {
                btnStyle = 'bg-emerald-600/30 border-emerald-500 text-emerald-300';
              } else if (isMarked) {
                btnStyle = 'bg-amber-600/30 border-amber-500 text-amber-300';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-10 rounded-xl border font-mono font-bold text-xs transition-all ${btnStyle} ${
                    isCurrent ? 'ring-2 ring-electric scale-105' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Test Guidance Warning */}
          <div className="p-4 rounded-xl bg-card border border-card-border text-xs text-slate-400 space-y-2">
            <div className="font-semibold text-slate-200 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" />
              <span>Standard Marking Scheme</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Single Correct: +4 / -1. Multiple Correct: +4, partial marking per correct option, -2 for incorrect choice. Numerical: +4 / 0.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Final Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-card border border-card-border shadow-2xl space-y-5">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-400" />
              <span>Confirm Final Submission</span>
            </h3>

            <p className="text-xs text-slate-400">
              Are you sure you want to conclude the test? Once submitted, your paper will be locked and graded instantaneously.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-surface border border-card-border text-center text-xs">
              <div>
                <div className="font-bold text-emerald-400 text-lg">{answeredCount}</div>
                <div className="text-[10px] text-slate-500">Answered</div>
              </div>
              <div>
                <div className="font-bold text-amber-400 text-lg">{markedCount}</div>
                <div className="text-[10px] text-slate-500">Review</div>
              </div>
              <div>
                <div className="font-bold text-slate-400 text-lg">{unattemptedCount}</div>
                <div className="text-[10px] text-slate-500">Unanswered</div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2.5 rounded-xl bg-surface border border-card-border text-slate-300 text-xs font-semibold hover:bg-surface/80"
              >
                Return to Paper
              </button>

              <button
                type="button"
                onClick={finalizeSubmission}
                disabled={isSubmitting}
                className="flex-1 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/30 flex items-center justify-center gap-1.5"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Grading...</span>
                  </>
                ) : (
                  'Submit Test'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
