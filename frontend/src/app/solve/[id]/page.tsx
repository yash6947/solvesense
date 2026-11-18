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
  FileText,
  History,
  Check,
  ChevronRight,
  RotateCcw,
  BookOpen
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import MathRenderer from '@/components/MathRenderer';

export default function QuestionWorkspacePage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const questionId = params.id as string;

  const [question, setQuestion] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // LeetCode-style Active Left Pane Tab
  const [leftTab, setLeftTab] = useState<'description' | 'editorial' | 'submissions' | 'hints'>('description');

  // Timer state
  const [seconds, setSeconds] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  // Answer state
  const [selectedSingleKey, setSelectedSingleKey] = useState<string>('');
  const [selectedMultiKeys, setSelectedMultiKeys] = useState<string[]>([]);
  const [numericalInput, setNumericalInput] = useState<string>('');
  const [showScratchpad, setShowScratchpad] = useState<boolean>(false);
  const [scratchpadText, setScratchpadText] = useState<string>('');

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
          text: 'The AI assistant is temporarily unavailable. Please refer to the verified editorial solution tab.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    } finally {
      setIsChatSending(false);
    }
  };

  const handleResetAnswer = () => {
    setSelectedSingleKey('');
    setSelectedMultiKeys([]);
    setNumericalInput('');
    setSubmissionResult(null);
    setMistakeAnalysis(null);
    setIsTimerRunning(true);
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'EASY':
        return 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/20';
      case 'MEDIUM':
        return 'text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/20';
      case 'HARD':
        return 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20';
      case 'ADVANCED':
        return 'text-[#a855f7] bg-[#a855f7]/10 border-[#a855f7]/20';
      default:
        return 'text-[#9ca3af] bg-[#2a2a2a] border-[#383838]';
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono">Loading problem telemetry...</span>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4">
        <div className="max-w-md w-full p-6 rounded bg-[#262626] border border-[#333333] text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#ff375f] mx-auto" />
          <h3 className="text-base font-bold text-white">Problem Unavailable</h3>
          <p className="text-xs text-[#8c8c8c]">{error || 'Could not load question.'}</p>
          <Link
            href="/solve"
            className="inline-block px-4 py-2 rounded bg-[#333333] hover:bg-[#3d3d3d] text-white text-xs font-semibold"
          >
            Back to Problemset
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.25rem)] overflow-hidden bg-[#1a1a1a]">
      {/* LeetCode Workspace Top Sub-Navbar */}
      <div className="h-11 border-b border-[#282828] bg-[#212121] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        {/* Left: Back Link & Problem Code / Difficulty */}
        <div className="flex items-center gap-3">
          <Link
            href="/solve"
            className="text-[#8c8c8c] hover:text-[#eff1f6] flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Problem List</span>
          </Link>
          <span className="text-[#3a3a3a]">|</span>
          <span className="font-mono text-[#eff1f6] font-bold">
            {question.code}
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
          {question.isPYQ && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
              JEE PYQ {question.pyqYear}
            </span>
          )}
        </div>

        {/* Center: Stopwatch & Marking */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#333333] font-mono text-white text-xs">
            <Clock className="w-3 h-3 text-[#ffa116]" />
            <span className="font-bold">{formatTimer(seconds)}</span>
            {!submissionResult && (
              <button
                onClick={() => setIsTimerRunning(!isTimerRunning)}
                className="text-[#8c8c8c] hover:text-white ml-0.5"
                title={isTimerRunning ? 'Pause timer' : 'Resume timer'}
              >
                {isTimerRunning ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
              </button>
            )}
          </div>

          <div className="hidden sm:flex items-center gap-1 font-mono text-[11px] text-[#8c8c8c]">
            <span>Marks:</span>
            <span className="text-[#00b8a3] font-bold">+{question.marks}</span>
            <span>/</span>
            <span className="text-[#ff375f] font-bold">-{question.negativeMarks}</span>
          </div>
        </div>

        {/* Right: Quick Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`px-2.5 py-1 rounded text-xs border font-medium flex items-center gap-1.5 transition-colors ${
              showScratchpad
                ? 'bg-[#2b2416] border-[#4a3b1d] text-[#ffa116]'
                : 'bg-[#262626] border-[#383838] text-[#8c8c8c] hover:text-white'
            }`}
          >
            <Edit3 className="w-3 h-3" />
            <span className="hidden sm:inline">Scratchpad</span>
          </button>

          <button
            onClick={handleSubmitAnswer}
            disabled={isSubmitting}
            className="px-4 py-1 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-white font-semibold text-xs flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3 h-3 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Check className="w-3 h-3 stroke-[3]" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Body: Left Pane (Tabs) & Right Pane (Solving Workspace) */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* ======================================================== */}
        {/* LEFT PANE: LeetCode Tabbed Problem Description / Editorial */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#282828] bg-[#1e1e1e] overflow-hidden">
          {/* Tab Strip */}
          <div className="flex items-center border-b border-[#282828] bg-[#212121] px-2 shrink-0 overflow-x-auto">
            <button
              onClick={() => setLeftTab('description')}
              className={`lc-tab ${leftTab === 'description' ? 'lc-tab-active' : ''}`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Description</span>
            </button>
            <button
              onClick={() => setLeftTab('editorial')}
              className={`lc-tab ${leftTab === 'editorial' ? 'lc-tab-active' : ''}`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Editorial</span>
              {submissionResult && (
                <span className="w-1.5 h-1.5 rounded-full bg-[#00b8a3] ml-1" />
              )}
            </button>
            <button
              onClick={() => setLeftTab('submissions')}
              className={`lc-tab ${leftTab === 'submissions' ? 'lc-tab-active' : ''}`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Submissions</span>
              {submissionResult && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#282828] text-white ml-1">
                  1
                </span>
              )}
            </button>
            <button
              onClick={() => setLeftTab('hints')}
              className={`lc-tab ${leftTab === 'hints' ? 'lc-tab-active' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffa116]" />
              <span>Mentor Hints</span>
            </button>
          </div>

          {/* Tab Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 text-sm text-[#eff1f6] space-y-5">
            {/* TAB 1: DESCRIPTION */}
            {leftTab === 'description' && (
              <div className="space-y-5">
                {/* Title & Exam Meta */}
                <div className="border-b border-[#282828] pb-3">
                  <h1 className="text-lg font-bold text-white tracking-tight">
                    {question.code}: {question.topic ? question.topic.name : 'JEE Physics Problem'}
                  </h1>
                  <div className="flex items-center gap-2 text-xs text-[#8c8c8c] mt-1.5">
                    <span>{question.examType.replace('_', ' ')}</span>
                    <span>•</span>
                    <span className="font-mono">{question.questionType.replace('_', ' ')}</span>
                    <span>•</span>
                    <span>Time Target: {Math.round(question.timeRecommendationSec / 60)}m</span>
                  </div>
                </div>

                {/* Question Statement with KaTeX */}
                <div className="leading-relaxed text-[#d1d5db]">
                  <MathRenderer content={question.contentLatex} />
                </div>

                {/* Constraints & Exam Scheme Box */}
                <div className="p-3.5 rounded bg-[#262626] border border-[#333333] space-y-2 text-xs">
                  <div className="font-bold text-[#eff1f6] uppercase tracking-wider text-[11px]">
                    Marking Scheme & Rules
                  </div>
                  <ul className="list-disc list-inside text-[#9ca3af] space-y-1">
                    {question.questionType === 'SINGLE_CORRECT' && (
                      <>
                        <li><span className="text-[#00b8a3] font-medium">+4 Marks</span> for the correct option selected.</li>
                        <li><span className="text-[#ff375f] font-medium">-1 Mark</span> for an incorrect option.</li>
                        <li>0 Marks if unattempted.</li>
                      </>
                    )}
                    {question.questionType === 'MULTIPLE_CORRECT' && (
                      <>
                        <li><span className="text-[#00b8a3] font-medium">+4 Marks</span> if all correct options are selected and no incorrect option is chosen.</li>
                        <li><span className="text-[#00b8a3] font-medium">+2 Marks</span> (Partial) if two or more correct options are selected without any incorrect choice.</li>
                        <li><span className="text-[#ff375f] font-medium">-2 Marks</span> if any incorrect option is selected.</li>
                      </>
                    )}
                    {question.questionType === 'NUMERICAL' && (
                      <>
                        <li><span className="text-[#00b8a3] font-medium">+4 Marks</span> for exact numerical value within ±0.05 tolerance.</li>
                        <li>0 Negative Marks.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Prerequisite Tags */}
                {question.conceptTags && question.conceptTags.length > 0 && (
                  <div className="pt-2">
                    <div className="text-xs text-[#8c8c8c] font-medium mb-2">Prerequisite Concepts:</div>
                    <div className="flex flex-wrap gap-1.5">
                      {question.conceptTags.map((tag: string) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded bg-[#262626] border border-[#333333] text-[11px] font-mono text-[#8c8c8c]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* TAB 2: EDITORIAL & VERIFIED SOLUTION */}
            {leftTab === 'editorial' && (
              <div className="space-y-4">
                <div className="border-b border-[#282828] pb-3">
                  <h2 className="text-base font-bold text-white">Verified Editorial Solution</h2>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">
                    Step-by-step mathematical derivation and physical principle analysis.
                  </p>
                </div>

                {submissionResult?.solutionLatex || question.solutionLatex ? (
                  <div className="p-4 rounded bg-[#262626] border border-[#333333] space-y-3">
                    <div className="text-xs font-mono font-bold text-[#00b8a3]">DERIVATION & PROOF:</div>
                    <div className="text-sm text-[#d1d5db] leading-relaxed">
                      <MathRenderer
                        content={submissionResult?.solutionLatex || question.solutionLatex}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-6 text-center text-[#8c8c8c] bg-[#262626] rounded border border-[#333333]">
                    <HelpCircle className="w-6 h-6 mx-auto mb-2 text-[#ffa116]" />
                    <p className="text-xs">
                      Submit an answer or consult the progressive hints tab to view the complete verified editorial derivation.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: SUBMISSIONS */}
            {leftTab === 'submissions' && (
              <div className="space-y-4">
                <div className="border-b border-[#282828] pb-3">
                  <h2 className="text-base font-bold text-white">Your Submissions</h2>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">Execution history and scoring logs for this problem.</p>
                </div>

                {submissionResult ? (
                  <div className="rounded border border-[#333333] overflow-hidden bg-[#262626]">
                    <div className="p-4 flex items-center justify-between border-b border-[#333333]">
                      <div className="flex items-center gap-2">
                        {submissionResult.isCorrect ? (
                          <div className="flex items-center gap-1.5 text-[#00b8a3] font-bold text-sm">
                            <CheckCircle2 className="w-4 h-4" />
                            <span>Accepted</span>
                          </div>
                        ) : (
                          <div className="flex items-center gap-1.5 text-[#ff375f] font-bold text-sm">
                            <XCircle className="w-4 h-4" />
                            <span>Wrong Answer</span>
                          </div>
                        )}
                      </div>
                      <span className="font-mono text-xs text-[#8c8c8c]">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>

                    <div className="p-4 grid grid-cols-3 gap-2 text-center text-xs">
                      <div className="p-2 rounded bg-[#1f1f1f]">
                        <div className="text-[#8c8c8c] text-[10px] uppercase">Runtime</div>
                        <div className="font-mono font-bold text-white mt-0.5">{seconds}s</div>
                      </div>
                      <div className="p-2 rounded bg-[#1f1f1f]">
                        <div className="text-[#8c8c8c] text-[10px] uppercase">Marks</div>
                        <div className={`font-mono font-bold mt-0.5 ${submissionResult.marksAwarded >= 0 ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                          {submissionResult.marksAwarded > 0 ? `+${submissionResult.marksAwarded}` : submissionResult.marksAwarded}
                        </div>
                      </div>
                      <div className="p-2 rounded bg-[#1f1f1f]">
                        <div className="text-[#8c8c8c] text-[10px] uppercase">Hints Used</div>
                        <div className="font-mono font-bold text-white mt-0.5">{unlockedHintLevel} / 4</div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="py-12 text-center text-[#8c8c8c]">
                    <History className="w-6 h-6 mx-auto mb-2 text-[#4a4a4a]" />
                    <p className="text-xs">No submissions recorded yet for this session.</p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 4: MENTOR HINTS */}
            {leftTab === 'hints' && (
              <div className="space-y-4">
                <div className="border-b border-[#282828] pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white">Progressive Hints</h2>
                    <p className="text-xs text-[#8c8c8c]">Calibrated hints designed to guide without giving away answers.</p>
                  </div>
                  {/* Mode Selector */}
                  <select
                    value={mentorMode}
                    onChange={(e: any) => setMentorMode(e.target.value)}
                    className="px-2 py-1 rounded bg-[#262626] border border-[#333333] text-[11px] text-[#eff1f6] outline-none"
                  >
                    <option value="COLLABORATIVE">Collaborative Mode</option>
                    <option value="STRICT">Strict Exam Mode</option>
                  </select>
                </div>

                {/* 4 Hint Levels */}
                <div className="space-y-2.5">
                  {[
                    { level: 1, title: 'Level 1: Physical Intuition', subtitle: 'Conceptual setup & free body diagram' },
                    { level: 2, title: 'Level 2: Governing Physical Law', subtitle: 'Conservation principles & Newton-Euler laws' },
                    { level: 3, title: 'Level 3: Equation Formulation', subtitle: 'Simultaneous system equations in variables' },
                    { level: 4, title: 'Level 4: Complete Method Step', subtitle: 'Step-by-step mathematical path' },
                  ].map((h) => {
                    const isUnlocked = unlockedHintLevel >= h.level;
                    return (
                      <div key={h.level} className="rounded border border-[#333333] bg-[#262626] p-3 text-xs">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-bold text-white">{h.title}</div>
                            <div className="text-[11px] text-[#8c8c8c]">{h.subtitle}</div>
                          </div>
                          <button
                            onClick={() => requestHint(h.level)}
                            disabled={isLoadingHint}
                            className={`px-2.5 py-1 rounded font-semibold text-[11px] transition-colors ${
                              isUnlocked
                                ? 'bg-[#333333] text-white'
                                : 'bg-[#ffa116] hover:bg-[#ff9500] text-black'
                            }`}
                          >
                            {isUnlocked ? 'View' : 'Unlock Hint'}
                          </button>
                        </div>

                        {/* Unlocked Hint Text */}
                        {isUnlocked && hintsCache[h.level] && (
                          <div className="mt-3 pt-2.5 border-t border-[#333333] text-[#d1d5db] space-y-1">
                            <MathRenderer content={hintsCache[h.level].text} />
                            {hintsCache[h.level].note && (
                              <p className="text-[11px] text-[#ffa116] font-mono mt-1">
                                Note: {hintsCache[h.level].note}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Chat with Mentor Drawer */}
                <div className="pt-3 border-t border-[#282828] space-y-2">
                  <div className="text-xs font-bold text-white flex items-center gap-1.5">
                    <MessageSquare className="w-3.5 h-3.5 text-[#00b8a3]" />
                    <span>Ask a Concept Doubt</span>
                  </div>

                  {chatMessages.length > 0 && (
                    <div className="p-3 rounded bg-[#1a1a1a] border border-[#333333] max-h-40 overflow-y-auto space-y-2 text-xs">
                      {chatMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`p-2 rounded ${
                            msg.sender === 'student'
                              ? 'bg-[#282828] text-white ml-6 text-right'
                              : 'bg-[#222222] text-[#d1d5db] mr-6 border border-[#333333]'
                          }`}
                        >
                          <div className="font-semibold text-[10px] text-[#8c8c8c] mb-0.5">
                            {msg.sender === 'student' ? 'You' : 'AI Physics Mentor'} • {msg.time}
                          </div>
                          <MathRenderer content={msg.text} />
                        </div>
                      ))}
                    </div>
                  )}

                  <form onSubmit={handleSendChatMessage} className="flex gap-2">
                    <input
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="e.g. Why does friction point upward here?"
                      className="flex-1 px-3 py-1.5 rounded bg-[#262626] border border-[#383838] text-xs text-white placeholder-[#6b7280] outline-none focus:border-[#ffa116]"
                    />
                    <button
                      type="submit"
                      disabled={isChatSending || !chatInput.trim()}
                      className="px-3 py-1.5 rounded bg-[#333333] hover:bg-[#3d3d3d] text-white text-xs font-semibold disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </form>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANE: LeetCode-style Answer Editor & Test Console */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col bg-[#1a1a1a] overflow-hidden">
          {/* Header of Right Pane */}
          <div className="h-10 border-b border-[#282828] bg-[#212121] px-4 flex items-center justify-between text-xs text-[#8c8c8c] shrink-0">
            <span className="font-semibold text-white">Your Solution</span>
            <span className="font-mono text-[11px]">
              {question.questionType.replace('_', ' ')}
            </span>
          </div>

          {/* Interactive Workspace Area */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* If Scratchpad is active */}
            {showScratchpad && (
              <div className="p-3 rounded bg-[#202020] border border-[#333333] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
                  <span className="font-mono text-[#ffa116]">Rough Work / Scratchpad</span>
                  <button
                    onClick={() => setScratchpadText('')}
                    className="hover:text-white"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Type formulas or intermediate steps here (e.g. tau = I*alpha, F - f = m*a)..."
                  rows={4}
                  className="w-full bg-[#181818] border border-[#333333] rounded p-2.5 text-xs text-white font-mono outline-none resize-none"
                />
              </div>
            )}

            {/* SINGLE CORRECT MCQ SELECTOR */}
            {question.questionType === 'SINGLE_CORRECT' && (
              <div className="space-y-2.5">
                <div className="text-xs text-[#8c8c8c] mb-2 font-medium">Select exactly one option:</div>
                {question.options &&
                  question.options.map((opt: any) => {
                    const isSelected = selectedSingleKey === opt.optionKey;
                    return (
                      <div
                        key={opt.id || opt.optionKey}
                        onClick={() => setSelectedSingleKey(opt.optionKey)}
                        className={`p-3.5 rounded border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#2b2416] border-[#ffa116] text-white'
                            : 'bg-[#262626] border-[#333333] text-[#d1d5db] hover:border-[#4a4a4a] hover:bg-[#2a2a2a]'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold shrink-0 ${
                              isSelected
                                ? 'bg-[#ffa116] text-black'
                                : 'bg-[#1f1f1f] text-[#8c8c8c] border border-[#383838]'
                            }`}
                          >
                            {opt.optionKey}
                          </span>
                          <div className="flex-1 font-medium">
                            <MathRenderer content={opt.contentLatex} inline />
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#ffa116] shrink-0 ml-2" />}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* MULTIPLE CORRECT MCQ SELECTOR */}
            {question.questionType === 'MULTIPLE_CORRECT' && (
              <div className="space-y-2.5">
                <div className="text-xs text-[#8c8c8c] mb-2 font-medium">
                  Select one or more correct options (Partial marking enabled):
                </div>
                {question.options &&
                  question.options.map((opt: any) => {
                    const isSelected = selectedMultiKeys.includes(opt.optionKey);
                    return (
                      <div
                        key={opt.id || opt.optionKey}
                        onClick={() => handleToggleMultiOption(opt.optionKey)}
                        className={`p-3.5 rounded border text-xs flex items-center justify-between cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#2b2416] border-[#ffa116] text-white'
                            : 'bg-[#262626] border-[#333333] text-[#d1d5db] hover:border-[#4a4a4a] hover:bg-[#2a2a2a]'
                        }`}
                      >
                        <div className="flex items-center gap-3 flex-1">
                          <span
                            className={`w-6 h-6 rounded flex items-center justify-center font-mono font-bold shrink-0 ${
                              isSelected
                                ? 'bg-[#ffa116] text-black'
                                : 'bg-[#1f1f1f] text-[#8c8c8c] border border-[#383838]'
                            }`}
                          >
                            {opt.optionKey}
                          </span>
                          <div className="flex-1 font-medium">
                            <MathRenderer content={opt.contentLatex} inline />
                          </div>
                        </div>
                        {isSelected && <Check className="w-4 h-4 text-[#ffa116] shrink-0 ml-2" />}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* NUMERICAL VALUE INPUT */}
            {question.questionType === 'NUMERICAL' && (
              <div className="space-y-3">
                <label className="block text-xs text-[#8c8c8c] font-medium">
                  Enter final numerical answer (Rounded to 2 decimal places):
                </label>
                <div className="relative max-w-sm">
                  <input
                    type="number"
                    step="any"
                    value={numericalInput}
                    onChange={(e) => setNumericalInput(e.target.value)}
                    placeholder="e.g. 1.25"
                    className="w-full px-4 py-2.5 rounded bg-[#262626] border border-[#333333] focus:border-[#ffa116] font-mono text-base text-white outline-none"
                  />
                  <span className="absolute right-3 top-3 text-xs font-mono text-[#8c8c8c]">
                    SI Units
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* LEETCODE TEST RESULTS & SUBMISSION OUTPUT CONSOLE        */}
          {/* ======================================================== */}
          <div className="border-t border-[#282828] bg-[#1e1e1e] p-4 shrink-0 space-y-3">
            {/* If Result exists */}
            {submissionResult ? (
              <div
                className={`p-4 rounded border text-xs space-y-2.5 ${
                  submissionResult.isCorrect
                    ? 'bg-[#172b1d] border-[#2cbb5d] text-[#eff1f6]'
                    : 'bg-[#2b171c] border-[#ff375f] text-[#eff1f6]'
                }`}
              >
                {/* Header status */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {submissionResult.isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-[#2cbb5d]" />
                    ) : (
                      <XCircle className="w-5 h-5 text-[#ff375f]" />
                    )}
                    <span
                      className={`text-base font-bold ${
                        submissionResult.isCorrect ? 'text-[#2cbb5d]' : 'text-[#ff375f]'
                      }`}
                    >
                      {submissionResult.isCorrect ? 'Accepted' : 'Wrong Answer'}
                    </span>
                  </div>

                  <span className="font-mono text-xs">
                    Marks: <span className="font-bold">{submissionResult.marksAwarded > 0 ? `+${submissionResult.marksAwarded}` : submissionResult.marksAwarded}</span>
                  </span>
                </div>

                {/* Explanation text */}
                <div className="text-xs text-[#d1d5db] leading-relaxed pt-1 border-t border-[#383838]">
                  <MathRenderer content={submissionResult.explanation} />
                </div>

                {/* Mistake analysis card if incorrect */}
                {mistakeAnalysis && (
                  <div className="p-3 rounded bg-[#1f1f1f] border border-[#404040] space-y-1.5 text-xs mt-2">
                    <div className="font-bold text-[#ffa116] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>Cognitive Diagnostic: {mistakeAnalysis.mistakeCategory}</span>
                    </div>
                    <p className="text-[#9ca3af]">{mistakeAnalysis.feedback}</p>
                    {mistakeAnalysis.remedialAction && (
                      <p className="text-[#00b8a3] font-mono text-[11px]">
                        Remedy: {mistakeAnalysis.remedialAction}
                      </p>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
                <span>Status: Ready to evaluate</span>
                <span className="font-mono">Time elapsed: {formatTimer(seconds)}</span>
              </div>
            )}

            {/* Bottom Buttons Row */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={handleResetAnswer}
                className="px-3 py-1.5 rounded bg-[#262626] hover:bg-[#303030] text-[#8c8c8c] hover:text-white border border-[#333333] text-xs font-medium transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Answer</span>
              </button>

              <button
                type="button"
                onClick={handleSubmitAnswer}
                disabled={isSubmitting}
                className="px-6 py-2 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Grading Submission...</span>
                  </>
                ) : (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>Submit Answer</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
