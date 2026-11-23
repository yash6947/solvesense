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
  RefreshCw,
  AlertTriangle,
  Check,
  X
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
  const [answers, setAnswers] = useState<{ [qid: string]: any }>({});
  const [markedForReview, setMarkedForReview] = useState<string[]>([]);

  // Timer state
  const [timeLeftSec, setTimeLeftSec] = useState<number>(3600);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitModal, setShowSubmitModal] = useState(false);

  useEffect(() => {
    fetchContestPaper();
  }, [contestId]);

  // Countdown timer
  useEffect(() => {
    if (isLoading || isSubmitting) return;

    const timer = setInterval(() => {
      setTimeLeftSec((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeSubmission();
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
      const data = await apiRequest(`/contests/${contestId}/take`);
      setContestData(data.contest);
      setQuestions(data.questions);
      setTimeLeftSec(data.contest.durationMinutes * 60);
    } catch (err: any) {
      console.error('Failed to load contest paper:', err);
      alert(err.message || 'Contest paper unavailable.');
      router.push('/contests');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectOption = (qid: string, key: string, isMulti: boolean) => {
    if (isMulti) {
      const current = answers[qid] || [];
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

  const handleToggleReview = (qid: string) => {
    if (markedForReview.includes(qid)) {
      setMarkedForReview(markedForReview.filter((id) => id !== qid));
    } else {
      setMarkedForReview([...markedForReview, qid]);
    }
  };

  const handleClearResponse = (qid: string) => {
    const updated = { ...answers };
    delete updated[qid];
    setAnswers(updated);
  };

  const finalizeSubmission = async () => {
    setIsSubmitting(true);
    try {
      await apiRequest(`/contests/${contestId}/submit`, {
        method: 'POST',
        body: JSON.stringify({
          answers,
          timeSpentSeconds: (contestData?.durationMinutes || 60) * 60 - timeLeftSec,
        }),
      });

      router.push(`/contests/${contestId}/leaderboard`);
    } catch (err: any) {
      console.error('Error submitting contest:', err);
      alert(err.message || 'Failed to submit contest paper.');
    } finally {
      setIsSubmitting(false);
      setShowSubmitModal(false);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const mins = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;
    if (hours > 0) {
      return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (isLoading || !contestData) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c] bg-[#0e0e0e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider">ENTERING OFFICIAL EXAM HALL...</span>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];
  const isLastQuestion = currentIdx === questions.length - 1;
  const answeredCount = Object.keys(answers).length;
  const markedCount = markedForReview.length;
  const unattemptedCount = questions.length - answeredCount;

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.5rem)] overflow-hidden bg-[#0e0e0e]">
      {/* 1. Proctored Exam Top Bar */}
      <div className="h-12 border-b border-[#282828] bg-[#141414] px-4 sm:px-6 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm font-heading tracking-tight truncate max-w-xs sm:max-w-md">
            {contestData.title}
          </span>
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-[#181818] text-[#00e1ab] border border-[#282828]">
            Physics Paper
          </span>
        </div>

        {/* Live Timer Pill & Submit */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-lg border font-mono font-bold text-xs ${
              timeLeftSec <= 300
                ? 'bg-[#ff525c]/10 border-[#ff525c] text-[#ff525c] animate-pulse'
                : 'bg-[#0e0e0e] border-[#282828] text-white'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${timeLeftSec <= 300 ? 'text-[#ff525c]' : 'text-[#ffa116]'}`} />
            <span>{formatTimer(timeLeftSec)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-1.5 rounded-lg bg-[#ff525c] hover:bg-[#e03152] text-white font-bold text-xs transition-colors shadow-sm"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* 2. Main Exam Body (Question View Left + Palette Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left (8 cols): Question Formulation & Answer Input */}
        <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6 flex flex-col justify-between border-r border-[#282828] bg-[#141414]">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#282828]">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-7 rounded-lg bg-[#181818] border border-[#282828] text-[#00e1ab] font-bold font-mono text-xs flex items-center justify-center">
                  {currentIdx + 1}
                </span>
                <span className="text-xs font-semibold text-white font-heading">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-2.5 text-xs font-mono">
                <span className="text-[#8c8c8c] bg-[#181818] px-2.5 py-0.5 rounded-md border border-[#282828]">
                  {currentQ.questionType.replace('_', ' ')}
                </span>
                <span className="text-[#00e1ab] font-bold">+{currentQ.marks}</span>
                <span className="text-[#ff525c] font-bold">-{currentQ.negativeMarks}</span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-[#eff1f6] text-[15px] leading-relaxed space-y-4 font-sans">
              <MathRenderer content={currentQ.contentLatex} />
            </div>

            {/* Diagram if present */}
            {currentQ.imageUrl && (
              <div className="p-4 rounded-xl bg-[#181818] border border-[#282828]">
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
                        className={`p-4 rounded-xl border text-xs flex items-center gap-3.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#2E5BFF]/15 border-[#2E5BFF] text-white shadow-sm'
                            : 'bg-[#181818] border-[#282828] text-[#d1d5db] hover:border-[#383838] hover:bg-[#202020]'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-lg border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            isSelected
                              ? 'border-[#2E5BFF] bg-[#2E5BFF] text-white'
                              : 'border-[#383838] bg-[#141414] text-[#8c8c8c]'
                          }`}
                        >
                          {opt.optionKey}
                        </div>
                        <div className="flex-1 font-medium text-sm">
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
                        className={`p-4 rounded-xl border text-xs flex items-center gap-3.5 cursor-pointer transition-all ${
                          isSelected
                            ? 'bg-[#2E5BFF]/15 border-[#2E5BFF] text-white shadow-sm'
                            : 'bg-[#181818] border-[#282828] text-[#d1d5db] hover:border-[#383838] hover:bg-[#202020]'
                        }`}
                      >
                        <div
                          className={`w-6 h-6 rounded-md border flex items-center justify-center text-xs font-mono font-bold shrink-0 ${
                            isSelected
                              ? 'border-[#2E5BFF] bg-[#2E5BFF] text-white'
                              : 'border-[#383838] bg-[#141414] text-[#8c8c8c]'
                          }`}
                        >
                          {isSelected ? '✓' : opt.optionKey}
                        </div>
                        <div className="flex-1 font-medium text-sm">
                          <MathRenderer content={opt.contentLatex} inline />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.questionType === 'NUMERICAL' && (
                <div className="space-y-2.5">
                  <div className="text-xs text-[#8c8c8c] font-mono uppercase tracking-wider">
                    Enter calculated value (Tolerance: ±0.05):
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleNumericalChange(currentQ.id, e.target.value)}
                    placeholder="Enter decimal answer"
                    className="w-full max-w-sm px-4 py-3 rounded-xl bg-[#181818] border border-[#282828] focus:border-[#2E5BFF] text-white text-base font-mono outline-none"
                  />
                </div>
              )}
            </div>
          </div>

          {/* Bottom Action Controls */}
          <div className="pt-4 border-t border-[#282828] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleReview(currentQ.id)}
                className={`px-3.5 py-2 rounded-xl text-xs border font-medium flex items-center gap-1.5 transition-colors ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-[#ffa116]/15 border-[#ffa116] text-[#ffa116]'
                    : 'bg-[#181818] border-[#282828] text-[#8c8c8c] hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Mark for Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleClearResponse(currentQ.id)}
                className="px-3.5 py-2 rounded-xl text-xs bg-[#181818] border border-[#282828] text-[#8c8c8c] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-4 py-2 rounded-xl bg-[#181818] border border-[#282828] disabled:opacity-30 text-white text-xs font-semibold flex items-center gap-1.5 hover:bg-[#202020] transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
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
                className="px-5 py-2 rounded-xl bg-[#00e1ab] hover:bg-[#00c596] text-black text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm"
              >
                <span>{isLastQuestion ? 'Review & Submit' : 'Save & Next'}</span>
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Question Navigation Palette */}
        <div className="lg:col-span-4 p-6 bg-[#0e0e0e] overflow-y-auto space-y-6">
          <div className="space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white font-heading">
              Exam Hall Question Palette
            </h3>
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px] font-mono">
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00e1ab] inline-block" />
                <span>Ans ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffa116] inline-block" />
                <span>Rev ({markedCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#282828] inline-block" />
                <span>Unv ({unattemptedCount})</span>
              </div>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2.5 pt-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview.includes(q.id);
              const isCurrent = idx === currentIdx;

              let btnStyle = 'bg-[#141414] border-[#282828] text-[#8c8c8c] hover:border-[#383838]';
              if (isMarked) {
                btnStyle = 'bg-[#ffa116]/15 border-[#ffa116] text-[#ffa116] font-bold';
              } else if (isAnswered) {
                btnStyle = 'bg-[#00e1ab]/15 border-[#00e1ab] text-[#00e1ab] font-bold';
              }

              if (isCurrent) {
                btnStyle += ' ring-2 ring-[#2E5BFF] ring-offset-2 ring-offset-[#0e0e0e]';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-10 rounded-xl border text-xs font-mono font-bold flex items-center justify-center transition-all ${btnStyle}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Exam Info Card */}
          <div className="p-4 rounded-xl bg-[#141414] border border-[#282828] space-y-2 text-xs">
            <div className="font-bold text-white font-heading">Proctoring Telemetry</div>
            <p className="text-[11px] text-[#8c8c8c] leading-relaxed">
              Window focus events and submission hashes are logged in compliance with official JEE exam guidelines.
            </p>
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-md w-full p-6 rounded-2xl bg-[#141414] border border-[#282828] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-white font-heading">Confirm Paper Submission</h3>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-[#8c8c8c] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-3 text-center text-xs">
              <div className="p-3 rounded-xl bg-[#181818] border border-[#282828]">
                <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Attempted</div>
                <div className="text-xl font-bold font-mono text-[#00e1ab] mt-1">{answeredCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#282828]">
                <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Under Review</div>
                <div className="text-xl font-bold font-mono text-[#ffa116] mt-1">{markedCount}</div>
              </div>
              <div className="p-3 rounded-xl bg-[#181818] border border-[#282828]">
                <div className="text-[10px] text-[#8c8c8c] uppercase font-mono">Unattempted</div>
                <div className="text-xl font-bold font-mono text-[#ff525c] mt-1">{unattemptedCount}</div>
              </div>
            </div>

            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Are you sure you want to finalize your submission? Once submitted, your scores and national percentile ranking will be computed instantly.
            </p>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-xl bg-[#181818] hover:bg-[#202020] text-xs font-semibold text-[#8c8c8c] hover:text-white border border-[#282828] transition-colors"
              >
                Resume Test
              </button>
              <button
                type="button"
                onClick={finalizeSubmission}
                disabled={isSubmitting}
                className="px-5 py-2 rounded-xl bg-[#ff525c] hover:bg-[#e03152] text-xs font-bold text-white flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Grading Paper...</span>
                  </>
                ) : (
                  <span>Submit & Exit</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
