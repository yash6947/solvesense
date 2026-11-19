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
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Entering exam hall environment...</span>
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
    <div className="flex-1 flex flex-col h-[calc(100vh-3.25rem)] overflow-hidden bg-[#1a1a1a]">
      {/* 1. Proctored Exam Top Bar */}
      <div className="h-12 border-b border-[#282828] bg-[#212121] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        <div className="flex items-center gap-3">
          <span className="font-bold text-white text-sm tracking-tight truncate max-w-xs sm:max-w-md">
            {contestData.title}
          </span>
          <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-[#1f1f1f] text-[#8c8c8c] border border-[#383838]">
            Section: Physics
          </span>
        </div>

        {/* Live Timer Pill & Submit */}
        <div className="flex items-center gap-3">
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded border font-mono font-bold text-xs ${
              timeLeftSec <= 300
                ? 'bg-[#381a1f] border-[#ff375f] text-[#ff375f] animate-pulse'
                : 'bg-[#1a1a1a] border-[#333333] text-white'
            }`}
          >
            <Clock className={`w-3.5 h-3.5 ${timeLeftSec <= 300 ? 'text-[#ff375f]' : 'text-[#ffa116]'}`} />
            <span>{formatTimer(timeLeftSec)}</span>
          </div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-3.5 py-1 rounded bg-[#ff375f] hover:bg-[#e03152] text-white font-semibold text-xs transition-colors"
          >
            Finish Test
          </button>
        </div>
      </div>

      {/* 2. Main Exam Body (Question View Left + Palette Right) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* Left (8 cols): Question Formulation & Answer Input */}
        <div className="lg:col-span-8 p-6 overflow-y-auto space-y-6 flex flex-col justify-between border-r border-[#282828] bg-[#1e1e1e]">
          <div className="space-y-6">
            {/* Question Header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#282828]">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded bg-[#282828] border border-[#383838] text-[#ffa116] font-bold font-mono text-xs flex items-center justify-center">
                  {currentIdx + 1}
                </span>
                <span className="text-xs font-semibold text-[#eff1f6]">
                  Question {currentIdx + 1} of {questions.length}
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs">
                <span className="font-mono text-[#8c8c8c] bg-[#1f1f1f] px-2 py-0.5 rounded border border-[#333333]">
                  {currentQ.questionType.replace('_', ' ')}
                </span>
                <span className="text-[#00b8a3] font-semibold">+{currentQ.marks}</span>
                <span className="text-[#ff375f] font-semibold">-{currentQ.negativeMarks}</span>
              </div>
            </div>

            {/* Question Statement */}
            <div className="text-[#eff1f6] text-sm leading-relaxed space-y-4">
              <MathRenderer content={currentQ.contentLatex} />
            </div>

            {/* Diagram */}
            {currentQ.imageUrl && (
              <div className="p-4 rounded bg-[#262626] border border-[#333333]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={currentQ.imageUrl}
                  alt="Diagram"
                  className="max-h-60 mx-auto object-contain rounded"
                />
              </div>
            )}

            {/* Options Selection */}
            <div className="space-y-3 pt-2">
              {currentQ.questionType === 'SINGLE_CORRECT' && (
                <div className="space-y-2">
                  {currentQ.options?.map((opt: any) => {
                    const isSelected = answers[currentQ.id]?.[0] === opt.optionKey;
                    return (
                      <div
                        key={opt.optionKey}
                        onClick={() => handleSelectOption(currentQ.id, opt.optionKey, false)}
                        className={`p-3.5 rounded border text-xs flex items-center gap-3 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#2b2416] border-[#ffa116] text-white'
                            : 'bg-[#262626] border-[#333333] text-[#d1d5db] hover:border-[#4a4a4a] hover:bg-[#2a2a2a]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected
                              ? 'border-[#ffa116] bg-[#ffa116] text-black'
                              : 'border-[#4a4a4a] text-[#8c8c8c]'
                          }`}
                        >
                          {opt.optionKey}
                        </div>
                        <div className="flex-1 font-medium">
                          <MathRenderer content={opt.contentLatex} inline />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.questionType === 'MULTIPLE_CORRECT' && (
                <div className="space-y-2">
                  {currentQ.options?.map((opt: any) => {
                    const selectedList = answers[currentQ.id] || [];
                    const isSelected = selectedList.includes(opt.optionKey);
                    return (
                      <div
                        key={opt.optionKey}
                        onClick={() => handleSelectOption(currentQ.id, opt.optionKey, true)}
                        className={`p-3.5 rounded border text-xs flex items-center gap-3 cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#2b2416] border-[#ffa116] text-white'
                            : 'bg-[#262626] border-[#333333] text-[#d1d5db] hover:border-[#4a4a4a] hover:bg-[#2a2a2a]'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border flex items-center justify-center text-xs font-mono font-bold ${
                            isSelected
                              ? 'border-[#ffa116] bg-[#ffa116] text-black'
                              : 'border-[#4a4a4a] text-[#8c8c8c]'
                          }`}
                        >
                          {isSelected ? '✓' : opt.optionKey}
                        </div>
                        <div className="flex-1 font-medium">
                          <MathRenderer content={opt.contentLatex} inline />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {currentQ.questionType === 'NUMERICAL' && (
                <div className="space-y-2">
                  <div className="text-xs text-[#8c8c8c] font-medium">
                    Enter calculated value (Tolerance: ±0.05):
                  </div>
                  <input
                    type="number"
                    step="any"
                    value={answers[currentQ.id] || ''}
                    onChange={(e) => handleNumericalChange(currentQ.id, e.target.value)}
                    placeholder="Enter decimal answer"
                    className="w-full px-4 py-2.5 rounded bg-[#262626] border border-[#333333] focus:border-[#ffa116] text-white text-sm font-mono outline-none"
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
                className={`px-3 py-1.5 rounded text-xs border flex items-center gap-1.5 transition-colors ${
                  markedForReview.includes(currentQ.id)
                    ? 'bg-[#2b2416] border-[#4a3b1d] text-[#ffa116]'
                    : 'bg-[#262626] border-[#383838] text-[#8c8c8c] hover:text-white'
                }`}
              >
                <Flag className="w-3.5 h-3.5" />
                <span>Mark for Review</span>
              </button>

              <button
                type="button"
                onClick={() => handleClearResponse(currentQ.id)}
                className="px-3 py-1.5 rounded text-xs bg-[#262626] border border-[#383838] text-[#8c8c8c] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Response</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                disabled={currentIdx === 0}
                onClick={() => setCurrentIdx(currentIdx - 1)}
                className="px-3.5 py-1.5 rounded bg-[#262626] border border-[#383838] disabled:opacity-30 text-white text-xs font-semibold flex items-center gap-1"
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
                className="px-4 py-1.5 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-white text-xs font-semibold flex items-center gap-1 transition-colors"
              >
                <span>{isLastQuestion ? 'Review & Submit' : 'Save & Next'}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Right (4 cols): Question Navigation Palette */}
        <div className="lg:col-span-4 p-5 bg-[#1a1a1a] overflow-y-auto space-y-5">
          <div className="space-y-1">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white">
              Question Palette
            </h3>
            <div className="grid grid-cols-3 gap-2 pt-2 text-[11px]">
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00b8a3] inline-block" />
                <span>Ans ({answeredCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ffa116] inline-block" />
                <span>Rev ({markedCount})</span>
              </div>
              <div className="flex items-center gap-1.5 text-[#8c8c8c]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4a4a4a] inline-block" />
                <span>Unv ({unattemptedCount})</span>
              </div>
            </div>
          </div>

          {/* Palette Grid */}
          <div className="grid grid-cols-5 gap-2 pt-2">
            {questions.map((q, idx) => {
              const isAnswered = answers[q.id] !== undefined;
              const isMarked = markedForReview.includes(q.id);
              const isCurrent = currentIdx === idx;

              let btnStyle = 'bg-[#262626] border-[#383838] text-[#8c8c8c]';
              if (isAnswered && isMarked) {
                btnStyle = 'bg-[#2b2416] border-[#ffa116] text-[#ffa116]';
              } else if (isAnswered) {
                btnStyle = 'bg-[#1b4329] border-[#00b8a3] text-[#00b8a3] font-bold';
              } else if (isMarked) {
                btnStyle = 'bg-[#2b2416] border-[#ffa116] text-[#ffa116]';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-9 rounded border font-mono font-bold text-xs transition-colors ${btnStyle} ${
                    isCurrent ? 'ring-1 ring-white' : ''
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Marking Rules */}
          <div className="p-3.5 rounded bg-[#262626] border border-[#333333] text-xs text-[#8c8c8c] space-y-1.5">
            <div className="font-semibold text-white">JEE Exam Rules</div>
            <p className="text-[11px] leading-relaxed">
              Single-correct: +4 / -1. Multi-correct: +4 full, +2 partial, -2 negative. Numerical: +4 / 0.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Final Submission Confirmation Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
          <div className="max-w-md w-full p-5 rounded bg-[#262626] border border-[#333333] shadow-2xl space-y-4">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-[#ffa116]" />
              <span>Confirm Final Submission</span>
            </h2>

            <p className="text-xs text-[#8c8c8c]">
              Are you sure you want to conclude the test? Once submitted, your paper will be locked and graded instantaneously.
            </p>

            <div className="grid grid-cols-3 gap-2 p-3 rounded bg-[#1f1f1f] border border-[#333333] text-center text-xs">
              <div>
                <div className="font-bold text-[#00b8a3] text-lg font-mono">{answeredCount}</div>
                <div className="text-[10px] text-[#8c8c8c]">Answered</div>
              </div>
              <div>
                <div className="font-bold text-[#ffa116] text-lg font-mono">{markedCount}</div>
                <div className="text-[10px] text-[#8c8c8c]">Review</div>
              </div>
              <div>
                <div className="font-bold text-[#8c8c8c] text-lg font-mono">{unattemptedCount}</div>
                <div className="text-[10px] text-[#8c8c8c]">Unanswered</div>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="flex-1 py-2 rounded bg-[#333333] hover:bg-[#3d3d3d] text-white text-xs font-semibold"
              >
                Return to Paper
              </button>

              <button
                type="button"
                onClick={finalizeSubmission}
                disabled={isSubmitting}
                className="flex-1 py-2 rounded bg-[#ff375f] hover:bg-[#e03152] text-white text-xs font-semibold flex items-center justify-center gap-1.5"
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
