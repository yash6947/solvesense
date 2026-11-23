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
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Send, 
  MessageSquare, 
  FileText, 
  History, 
  Check, 
  RotateCcw, 
  BookOpen, 
  ArrowRight,
  Shield,
  Zap,
  X,
  ThumbsUp,
  ThumbsDown,
  Star,
  Share2,
  ChevronDown,
  ChevronUp,
  Terminal,
  Maximize2,
  Minimize2,
  Code2,
  BrainCircuit,
  Info,
  Tag,
  Shuffle
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

  // LeetCode Active Tab in Left Pane
  const [leftTab, setLeftTab] = useState<'description' | 'editorial' | 'submissions' | 'hints'>('description');

  // Bottom Console State (LeetCode Testcase / Test Result Drawer)
  const [isConsoleOpen, setIsConsoleOpen] = useState(true);
  const [consoleTab, setConsoleTab] = useState<'testcase' | 'result'>('testcase');

  // AI Copilot Drawer State
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);

  // Formula Sheet Modal State
  const [showFormulaModal, setShowFormulaModal] = useState(false);

  // Micro-interactions state (Like, Star, Share feedback)
  const [likesCount, setLikesCount] = useState(142);
  const [hasLiked, setHasLiked] = useState(false);
  const [isStarred, setIsStarred] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);
  const [isTagsOpen, setIsTagsOpen] = useState(true);
  const [isSimilarOpen, setIsSimilarOpen] = useState(false);

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
  const [submissionHistory, setSubmissionHistory] = useState<any[]>([]);

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
  >([
    {
      sender: 'mentor',
      text: 'Hello! I am your Solve Sense Socratic Physics Mentor. How can I guide your physical intuition or coordinate choice for this problem without giving away the answer?',
      time: 'Just now',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isChatSending, setIsChatSending] = useState(false);

  // Keyboard shortcut listener (Ctrl+Enter to Submit, A/B/C/D to select)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // If typing in input, textarea, or chat, don't trigger option shortcuts
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) {
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
          e.preventDefault();
          handleSubmitAnswer();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleSubmitAnswer();
      }

      if (!submissionResult && question?.options) {
        const key = e.key.toUpperCase();
        if (['A', 'B', 'C', 'D'].includes(key)) {
          const opt = question.options.find((o: any) => o.optionKey === key);
          if (opt) {
            if (question.questionType === 'SINGLE_CORRECT') {
              setSelectedSingleKey(key);
            } else if (question.questionType === 'MULTIPLE_CORRECT') {
              handleToggleMultiOption(key);
            }
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [question, selectedSingleKey, selectedMultiKeys, numericalInput, submissionResult]);

  // Reset state when questionId changes (e.g. clicking Next/Prev)
  useEffect(() => {
    setSelectedSingleKey('');
    setSelectedMultiKeys([]);
    setNumericalInput('');
    setSubmissionResult(null);
    setMistakeAnalysis(null);
    setUnlockedHintLevel(0);
    setHintsCache({});
    setSeconds(0);
    setIsTimerRunning(true);
    setLeftTab('description');
    setConsoleTab('testcase');
    fetchQuestionDetails();
  }, [questionId]);

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
    if (submissionResult) return;
    if (selectedMultiKeys.includes(key)) {
      setSelectedMultiKeys(selectedMultiKeys.filter((k) => k !== key));
    } else {
      setSelectedMultiKeys([...selectedMultiKeys, key]);
    }
  };

  const requestHint = async (level: number) => {
    if (hintsCache[level]) {
      setUnlockedHintLevel(Math.max(unlockedHintLevel, level));
      setLeftTab('hints');
      return;
    }

    setIsLoadingHint(true);
    try {
      const data = await apiRequest('/ai/hint', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          level,
          requestedLevel: level,
          mentorMode,
        }),
      });

      setHintsCache((prev) => ({
        ...prev,
        [level]: { text: data.hintTextLatex, note: data.guidanceNote },
      }));
      setUnlockedHintLevel(Math.max(unlockedHintLevel, level));
      setLeftTab('hints');
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
      const result = await apiRequest(`/questions/${questionId}/attempts`, {
        method: 'POST',
        body: JSON.stringify({
          submittedAnswer,
          timeSpentSeconds: Math.max(seconds, 1),
          hintsRequested: unlockedHintLevel,
        }),
      });

      setSubmissionResult(result);
      setIsTimerRunning(false);

      // Log to submission history
      const historyItem = {
        id: Date.now(),
        isCorrect: result.isCorrect,
        marksAwarded: result.marksAwarded ?? result.marksEarned,
        timeSpent: Math.max(seconds, 1),
        hintsUsed: unlockedHintLevel,
        submittedAt: new Date().toLocaleTimeString(),
      };
      setSubmissionHistory((prev) => [historyItem, ...prev]);

      // Automatically open the Test Result drawer tab like LeetCode
      setIsConsoleOpen(true);
      setConsoleTab('result');

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
      const analysis = await apiRequest('/ai/analyze-mistake', {
        method: 'POST',
        body: JSON.stringify({
          questionId,
          submittedAnswer,
          timeSpentSeconds: Math.max(seconds, 1),
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

  const handleSendChatMessage = async (e?: React.FormEvent, customMsg?: string) => {
    if (e) e.preventDefault();
    const userMsg = (customMsg || chatInput).trim();
    if (!userMsg || isChatSending) return;

    setChatInput('');
    setChatMessages((prev) => [
      ...prev,
      { 
        sender: 'student', 
        text: userMsg, 
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
      },
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
        { 
          sender: 'mentor', 
          text: response.replyLatex || response.reply, 
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) 
        },
      ]);
    } catch (err: any) {
      console.error('Chat error:', err);
      setChatMessages((prev) => [
        ...prev,
        {
          sender: 'mentor',
          text: 'The AI assistant is temporarily busy. Check the progressive hints tab or review the fundamental governing laws.',
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
    setConsoleTab('testcase');
  };

  const handleShareClick = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2000);
    }
  };

  const formatTimer = (totalSeconds: number) => {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'EASY':
        return 'text-[#00b8a3] bg-[#00b8a3]/10 border-[#00b8a3]/20';
      case 'MEDIUM':
        return 'text-[#ffc01e] bg-[#ffc01e]/10 border-[#ffc01e]/20';
      case 'HARD':
      case 'ADVANCED':
        return 'text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20';
      default:
        return 'text-[#8c8c8c] bg-[#1a1a1a] border-[#282828]';
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c] bg-[#0a0a0a]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
          <span className="text-xs font-mono tracking-wider text-[#a1a1aa]">LOADING LEETCODE WORKSPACE...</span>
        </div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="flex-1 flex items-center justify-center py-20 px-4 bg-[#0a0a0a]">
        <div className="max-w-md w-full p-6 rounded-xl bg-[#1a1a1a] border border-[#2e2e2e] text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#ff375f] mx-auto" />
          <h3 className="text-base font-bold text-white font-heading">Problem Unavailable</h3>
          <p className="text-xs text-[#8c8c8c]">{error || 'Could not load question.'}</p>
          <Link
            href="/solve"
            className="inline-block px-4 py-2 rounded-lg bg-[#2E5BFF] hover:bg-[#2044cc] text-white text-xs font-semibold"
          >
            Back to Problemset
          </Link>
        </div>
      </div>
    );
  }

  const promptSuggestions = [
    { label: 'Free Body Diagram', text: 'Help me set up the Free Body Diagram (FBD) for this problem.' },
    { label: 'Governing Law', text: 'What core conservation law or governing principle should I apply?' },
    { label: 'Sign Convention', text: 'What is the correct coordinate system and sign convention to use here?' },
    { label: 'Frame of Reference', text: 'Should I analyze this from an inertial or non-inertial frame of reference?' },
  ];

  const formulaCategories = [
    {
      category: 'Rotational Dynamics',
      formulas: [
        { name: 'Torque Balance', eq: '\\vec{\\tau} = \\vec{r} \\times \\vec{F} = I\\vec{\\alpha}' },
        { name: 'Pure Rolling Condition', eq: 'v_{cm} = \\omega R, \\quad a_{cm} = \\alpha R' },
        { name: 'Total Kinetic Energy', eq: 'K_{tot} = \\frac{1}{2}mv_{cm}^2 + \\frac{1}{2}I_{cm}\\omega^2' },
        { name: 'Angular Momentum', eq: '\\vec{L} = \\vec{r}_{cm} \\times m\\vec{v}_{cm} + I_{cm}\\vec{\\omega}' },
      ],
    },
    {
      category: 'Work, Energy & Power',
      formulas: [
        { name: 'Work-Energy Theorem', eq: 'W_{all} = \\Delta K = K_f - K_i' },
        { name: 'Conservative Force', eq: '\\vec{F} = -\\vec{\\nabla} U = -\\left(\\frac{\\partial U}{\\partial x}\\hat{i} + \\frac{\\partial U}{\\partial y}\\hat{j} + \\frac{\\partial U}{\\partial z}\\hat{k}\\right)' },
        { name: 'Instantaneous Power', eq: 'P = \\vec{F} \\cdot \\vec{v} = \\tau \\omega' },
      ],
    },
  ];

  return (
    <div className="flex-1 flex flex-col h-[calc(100vh-3.25rem)] overflow-hidden bg-[#0a0a0a] text-[#eff1f6]">
      {/* ======================================================== */}
      {/* LEETCODE WORKSPACE SUB-NAVBAR                            */}
      {/* ======================================================== */}
      <div className="h-11 border-b border-[#282828] bg-[#141414] px-4 flex items-center justify-between text-xs shrink-0 select-none">
        {/* Left: Problem navigation & breadcrumb */}
        <div className="flex items-center gap-3">
          <Link
            href="/solve"
            className="text-[#8c8c8c] hover:text-white flex items-center gap-1.5 font-medium transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-mono">Problem List</span>
          </Link>
          <span className="text-[#333333]">|</span>

          {/* Prev / Next Arrows */}
          <div className="flex items-center gap-1">
            <button
              disabled={!question.prevQuestionId}
              onClick={() => {
                if (question.prevQuestionId) router.push(`/solve/${question.prevQuestionId}`);
              }}
              title="Previous Problem (Ctrl + [)"
              className="p-1 rounded bg-[#1e1e1e] border border-[#2e2e2e] text-[#8c8c8c] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              disabled={!question.nextQuestionId}
              onClick={() => {
                if (question.nextQuestionId) router.push(`/solve/${question.nextQuestionId}`);
              }}
              title="Next Problem (Ctrl + ])"
              className="p-1 rounded bg-[#1e1e1e] border border-[#2e2e2e] text-[#8c8c8c] hover:text-white disabled:opacity-30 disabled:pointer-events-none transition-colors"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <span className="font-mono text-white font-bold tracking-tight">
            {question.code}
          </span>
          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyBadge(question.difficulty)}`}>
            {question.difficulty}
          </span>
          {question.isPYQ && (
            <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] font-mono bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
              JEE ADVANCED &apos;{question.pyqYear}
            </span>
          )}
        </div>

        {/* Center: Stopwatch & Marks */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#2e2e2e] font-mono text-white text-xs">
            <Clock className={`w-3.5 h-3.5 ${seconds > question.timeRecommendationSec ? 'text-[#ff375f]' : 'text-[#ffa116]'}`} />
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

          <div className="hidden md:flex items-center gap-1.5 font-mono text-[11px] text-[#8c8c8c]">
            <span>Marks:</span>
            <span className="text-[#00b8a3] font-bold">+{question.marks}</span>
            <span>/</span>
            <span className="text-[#ff375f] font-bold">-{question.negativeMarks}</span>
          </div>
        </div>

        {/* Right: LeetCode Tools & Submission Trigger */}
        <div className="flex items-center gap-2">
          {/* Formula Sheet Trigger */}
          <button
            onClick={() => setShowFormulaModal(true)}
            className="px-2.5 py-1 rounded bg-[#1a1a1a] border border-[#2e2e2e] text-[#8c8c8c] hover:text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
            title="Formula Reference Sheet"
          >
            <BookOpen className="w-3.5 h-3.5 text-[#2E5BFF]" />
            <span className="hidden lg:inline">Formulas</span>
          </button>

          {/* Scratchpad Trigger */}
          <button
            onClick={() => setShowScratchpad(!showScratchpad)}
            className={`px-2.5 py-1 rounded text-xs border font-medium flex items-center gap-1.5 transition-colors ${
              showScratchpad
                ? 'bg-[#2b2416] border-[#4a3b1d] text-[#ffa116]'
                : 'bg-[#1a1a1a] border-[#2e2e2e] text-[#8c8c8c] hover:text-white'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Scratchpad</span>
          </button>

          {/* AI Copilot Flyout Trigger */}
          <button
            onClick={() => setIsCopilotOpen(!isCopilotOpen)}
            className={`px-2.5 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm ${
              isCopilotOpen
                ? 'bg-[#2E5BFF] text-white border border-[#2E5BFF]'
                : 'bg-[#1a1a1a] border border-[#2e2e2e] text-[#eff1f6] hover:border-[#2E5BFF]/50'
            }`}
          >
            <BrainCircuit className="w-3.5 h-3.5 text-[#00b8a3]" />
            <span className="hidden sm:inline">Ask AI</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00e1ab] animate-pulse" />
          </button>

          {/* Submit Button */}
          <button
            onClick={handleSubmitAnswer}
            disabled={isSubmitting}
            className="px-3.5 py-1 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
            title="Submit Solution (Ctrl + Enter)"
          >
            {isSubmitting ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                <span>Evaluating...</span>
              </>
            ) : (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3]" />
                <span>Submit</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* MAIN SPLIT BODY (LEFT PANE & RIGHT PANE)                 */}
      {/* ======================================================== */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden relative">
        {/* ======================================================== */}
        {/* LEFT PANE: LEETCODE TABBED PROBLEM SPECIFICATION         */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col border-b lg:border-b-0 lg:border-r border-[#282828] bg-[#141414] overflow-hidden">
          {/* LeetCode Tab Strip */}
          <div className="flex items-center border-b border-[#282828] bg-[#1e1e1e] px-2 shrink-0 overflow-x-auto gap-0.5">
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
              onClick={() => setLeftTab('hints')}
              className={`lc-tab ${leftTab === 'hints' ? 'lc-tab-active' : ''}`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#ffa116]" />
              <span>Progressive Hints</span>
              {unlockedHintLevel > 0 && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#ffa116]/20 text-[#ffa116] ml-1">
                  {unlockedHintLevel}/4
                </span>
              )}
            </button>
            <button
              onClick={() => setLeftTab('submissions')}
              className={`lc-tab ${leftTab === 'submissions' ? 'lc-tab-active' : ''}`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Submissions</span>
              {submissionHistory.length > 0 && (
                <span className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-[#282828] text-white ml-1">
                  {submissionHistory.length}
                </span>
              )}
            </button>
          </div>

          {/* Left Tab Content Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-5 text-sm text-[#eff1f6] space-y-5">
            {/* TAB 1: DESCRIPTION */}
            {leftTab === 'description' && (
              <div className="space-y-5">
                {/* Problem Title & Meta Header */}
                <div className="border-b border-[#282828] pb-3 space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
                    <span className="font-mono text-[#00b8a3]">
                      {question.topic?.chapter?.name || 'Classical Mechanics'} &gt; {question.topic?.name}
                    </span>
                    <span className="font-mono text-[11px]">
                      Target Pace: {Math.round(question.timeRecommendationSec / 60)} min
                    </span>
                  </div>
                  <h1 className="text-xl font-bold text-white tracking-tight">
                    {question.code}: {question.topic ? question.topic.name : 'JEE Physics Problem'}
                  </h1>

                  {/* LeetCode Meta Bar (Difficulty, PYQ, Likes, Favorite, Share) */}
                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${getDifficultyBadge(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                      {question.isPYQ && (
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
                          JEE ADVANCED &apos;{question.pyqYear}
                        </span>
                      )}
                      <span className="text-[#8c8c8c] text-xs font-mono">
                        Acceptance: 44.8%
                      </span>
                    </div>

                    <div className="flex items-center gap-3 text-xs text-[#8c8c8c]">
                      <button
                        onClick={() => {
                          setHasLiked(!hasLiked);
                          setLikesCount(hasLiked ? likesCount - 1 : likesCount + 1);
                        }}
                        className={`flex items-center gap-1 transition-colors ${hasLiked ? 'text-[#00b8a3]' : 'hover:text-white'}`}
                        title="Like this question"
                      >
                        <ThumbsUp className="w-3.5 h-3.5" />
                        <span className="font-mono text-[11px]">{likesCount}</span>
                      </button>

                      <button
                        onClick={() => setIsStarred(!isStarred)}
                        className={`transition-colors ${isStarred ? 'text-[#ffa116]' : 'hover:text-white'}`}
                        title="Add to Starred"
                      >
                        <Star className={`w-3.5 h-3.5 ${isStarred ? 'fill-[#ffa116]' : ''}`} />
                      </button>

                      <button
                        onClick={handleShareClick}
                        className="hover:text-white transition-colors relative"
                        title="Share problem URL"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        {shareCopied && (
                          <span className="absolute -top-6 right-0 bg-[#00b8a3] text-black text-[10px] font-bold px-1.5 py-0.5 rounded shadow">
                            Copied!
                          </span>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Problem Statement with KaTeX */}
                <div className="leading-relaxed text-[#d1d5db] font-sans text-[15px] space-y-4">
                  <MathRenderer content={question.contentLatex} />
                </div>

                {/* Question Diagram if present */}
                {question.imageUrl && (
                  <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e]">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={question.imageUrl}
                      alt="Problem Diagram"
                      className="max-h-60 mx-auto object-contain rounded"
                    />
                  </div>
                )}

                {/* Official Marking Rules Accordion */}
                <div className="p-4 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] space-y-2 text-xs">
                  <div className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-[#2E5BFF]" />
                    <span>Official Marking Scheme & Rules</span>
                  </div>
                  <ul className="list-disc list-inside text-[#9ca3af] space-y-1 font-sans">
                    {question.questionType === 'SINGLE_CORRECT' && (
                      <>
                        <li><span className="text-[#00b8a3] font-semibold">+4 Marks</span> for the correct option selected.</li>
                        <li><span className="text-[#ff375f] font-semibold">-1 Mark</span> for an incorrect option.</li>
                        <li>0 Marks if unattempted.</li>
                      </>
                    )}
                    {question.questionType === 'MULTIPLE_CORRECT' && (
                      <>
                        <li><span className="text-[#00b8a3] font-semibold">+4 Marks</span> if all correct options are selected and no wrong option is chosen.</li>
                        <li><span className="text-[#00b8a3] font-semibold">+2 Marks</span> (Partial) if two or more correct options are selected without wrong choices.</li>
                        <li><span className="text-[#ff375f] font-semibold">-2 Marks</span> if any incorrect option is selected.</li>
                      </>
                    )}
                    {question.questionType === 'NUMERICAL' && (
                      <>
                        <li><span className="text-[#00b8a3] font-semibold">+4 Marks</span> for exact numerical value within ±0.05 tolerance.</li>
                        <li>0 Negative Marks.</li>
                      </>
                    )}
                  </ul>
                </div>

                {/* Collapsible Prerequisite Concepts */}
                {question.conceptTags && question.conceptTags.length > 0 && (
                  <div className="border border-[#282828] rounded-lg bg-[#181818] overflow-hidden">
                    <button
                      onClick={() => setIsTagsOpen(!isTagsOpen)}
                      className="w-full p-3 flex items-center justify-between text-xs font-semibold text-white hover:bg-[#202020] transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <Tag className="w-3.5 h-3.5 text-[#ffa116]" />
                        <span>Related Topics & Concepts</span>
                      </div>
                      {isTagsOpen ? <ChevronUp className="w-4 h-4 text-[#8c8c8c]" /> : <ChevronDown className="w-4 h-4 text-[#8c8c8c]" />}
                    </button>
                    {isTagsOpen && (
                      <div className="p-3 pt-0 flex flex-wrap gap-1.5 border-t border-[#282828]">
                        {question.conceptTags.map((tag: string) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded bg-[#1f1f1f] border border-[#2e2e2e] text-[11px] font-mono text-[#a1a1aa] hover:border-[#404040] transition-colors"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
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

                {submissionResult?.solutionLatex || question.solutionLatex || submissionResult?.verifiedSolution ? (
                  <div className="p-5 rounded-lg bg-[#1a1a1a] border border-[#2e2e2e] space-y-4">
                    <div className="text-xs font-mono font-bold text-[#00b8a3] flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>STEP-BY-STEP PROOF & GOVERNING EQUATIONS:</span>
                    </div>
                    <div className="text-sm text-[#d1d5db] leading-relaxed">
                      <MathRenderer
                        content={submissionResult?.solutionLatex || submissionResult?.verifiedSolution || question.solutionLatex}
                      />
                    </div>
                  </div>
                ) : (
                  <div className="p-8 text-center text-[#8c8c8c] bg-[#1a1a1a] rounded-lg border border-[#2e2e2e] space-y-2">
                    <HelpCircle className="w-8 h-8 mx-auto text-[#ffa116]" />
                    <h3 className="text-sm font-bold text-white">Solution Locked</h3>
                    <p className="text-xs max-w-sm mx-auto">
                      Submit an answer or consult the progressive hints tab to view the complete verified editorial derivation.
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* TAB 3: AI PROGRESSIVE HINTS */}
            {leftTab === 'hints' && (
              <div className="space-y-4">
                <div className="border-b border-[#282828] pb-3 flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-bold text-white">Socratic Progressive Hints</h2>
                    <p className="text-xs text-[#8c8c8c]">Calibrated hints designed to guide without giving away answers.</p>
                  </div>
                  {/* Mode Selector */}
                  <select
                    value={mentorMode}
                    onChange={(e: any) => setMentorMode(e.target.value)}
                    className="px-2.5 py-1.5 rounded bg-[#1e1e1e] border border-[#2e2e2e] text-xs text-[#eff1f6] outline-none font-mono"
                  >
                    <option value="COLLABORATIVE">Collaborative Mode</option>
                    <option value="STRICT">Strict Mode</option>
                  </select>
                </div>

                {/* 4 Hint Levels */}
                <div className="space-y-3">
                  {[
                    { level: 1, title: 'Tier 1: Core Physical Intuition', subtitle: 'Key physical phenomenon & Free Body Diagram setup', penalty: '0% PSI Impact' },
                    { level: 2, title: 'Tier 2: Governing Physical Law', subtitle: 'Conservation principles & Newton-Euler equations', penalty: '-5% PSI Impact' },
                    { level: 3, title: 'Tier 3: Tactical Equation Setup', subtitle: 'System equations in variables & coordinate choices', penalty: '-10% PSI Impact' },
                    { level: 4, title: 'Tier 4: Step-by-Step Method', subtitle: 'Complete mathematical roadmap towards final answer', penalty: '-20% PSI Impact' },
                  ].map((h) => {
                    const isUnlocked = unlockedHintLevel >= h.level;
                    return (
                      <div key={h.level} className="rounded-lg border border-[#2e2e2e] bg-[#1a1a1a] p-4 text-xs transition-colors hover:border-[#383838]">
                        <div className="flex items-center justify-between gap-3">
                          <div className="space-y-0.5">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white">{h.title}</span>
                              <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-[#121212] text-[#8c8c8c] border border-[#282828]">
                                {h.penalty}
                              </span>
                            </div>
                            <div className="text-[11px] text-[#8c8c8c]">{h.subtitle}</div>
                          </div>
                          <button
                            onClick={() => requestHint(h.level)}
                            disabled={isLoadingHint}
                            className={`px-3 py-1.5 rounded font-bold text-xs transition-colors shrink-0 ${
                              isUnlocked
                                ? 'bg-[#282828] text-white hover:bg-[#333333]'
                                : 'bg-[#ffa116] hover:bg-[#ff9500] text-black'
                            }`}
                          >
                            {isUnlocked ? 'Unlocked' : 'Unlock Hint'}
                          </button>
                        </div>

                        {/* Unlocked Hint Text */}
                        {isUnlocked && hintsCache[h.level] && (
                          <div className="mt-3 pt-3 border-t border-[#2e2e2e] text-[#d1d5db] space-y-1.5">
                            <MathRenderer content={hintsCache[h.level].text} />
                            {hintsCache[h.level].note && (
                              <p className="text-[11px] text-[#ffa116] font-mono mt-1">
                                Mentor Note: {hintsCache[h.level].note}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* TAB 4: LEETCODE SUBMISSIONS HISTORY */}
            {leftTab === 'submissions' && (
              <div className="space-y-4">
                <div className="border-b border-[#282828] pb-3">
                  <h2 className="text-base font-bold text-white">Execution Submissions</h2>
                  <p className="text-xs text-[#8c8c8c] mt-0.5">Official grading logs and execution telemetry for this problem.</p>
                </div>

                {submissionHistory.length > 0 ? (
                  <div className="rounded-lg border border-[#2e2e2e] overflow-hidden bg-[#1a1a1a]">
                    <table className="w-full text-left text-xs border-collapse font-mono">
                      <thead>
                        <tr className="border-b border-[#2e2e2e] bg-[#141414] text-[#8c8c8c] text-[11px] uppercase">
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Runtime</th>
                          <th className="py-2.5 px-3">Marks</th>
                          <th className="py-2.5 px-3">Hints</th>
                          <th className="py-2.5 px-3 text-right">Time</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#242424]">
                        {submissionHistory.map((sub) => (
                          <tr key={sub.id} className="hover:bg-[#202020] transition-colors">
                            <td className="py-2.5 px-3">
                              <span className={`font-bold flex items-center gap-1.5 ${sub.isCorrect ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                                {sub.isCorrect ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
                                <span>{sub.isCorrect ? 'Accepted' : 'Wrong Answer'}</span>
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-[#eff1f6]">{sub.timeSpent}s</td>
                            <td className={`py-2.5 px-3 font-bold ${sub.marksAwarded >= 0 ? 'text-[#00b8a3]' : 'text-[#ff375f]'}`}>
                              {sub.marksAwarded > 0 ? `+${sub.marksAwarded}` : sub.marksAwarded}
                            </td>
                            <td className="py-2.5 px-3 text-[#8c8c8c]">{sub.hintsUsed}/4</td>
                            <td className="py-2.5 px-3 text-right text-[#8c8c8c]">{sub.submittedAt}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="py-12 text-center text-[#8c8c8c]">
                    <History className="w-8 h-8 mx-auto mb-2 text-[#333333]" />
                    <p className="text-xs">No submissions recorded yet for this session.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ======================================================== */}
        {/* RIGHT PANE: LEETCODE SOLUTION EDITOR & TESTCASE CONSOLE   */}
        {/* ======================================================== */}
        <div className="lg:col-span-6 flex flex-col bg-[#0f0f0f] overflow-hidden">
          {/* Header of Right Pane */}
          <div className="h-10 border-b border-[#282828] bg-[#141414] px-4 flex items-center justify-between text-xs text-[#8c8c8c] shrink-0 font-mono">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-white">Solution Console</span>
              <span className="text-[#333333]">|</span>
              <span className="text-[11px] text-[#00b8a3]">
                {question.questionType.replace('_', ' ')}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-[10px] text-[#6b7280] hidden sm:inline">Shortcuts: A, B, C, D to choose</span>
              <button
                onClick={handleResetAnswer}
                className="text-[#8c8c8c] hover:text-white flex items-center gap-1 transition-colors"
                title="Reset Answers"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            </div>
          </div>

          {/* Solution Input Area (Middle) */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* If Scratchpad is active */}
            {showScratchpad && (
              <div className="p-3.5 rounded-lg bg-[#141414] border border-[#2e2e2e] space-y-2">
                <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
                  <span className="font-mono text-[#ffa116] font-bold flex items-center gap-1.5">
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Rough Work & Equations Scratchpad</span>
                  </span>
                  <button
                    onClick={() => setScratchpadText('')}
                    className="hover:text-white transition-colors"
                  >
                    Clear
                  </button>
                </div>
                <textarea
                  value={scratchpadText}
                  onChange={(e) => setScratchpadText(e.target.value)}
                  placeholder="Type intermediate formulas, force balances, or work notes here (e.g. tau = I * alpha, N - mg*cos(theta) = 0)..."
                  rows={4}
                  className="w-full bg-[#0a0a0a] border border-[#282828] rounded p-2.5 text-xs text-white font-mono outline-none resize-none focus:border-[#2E5BFF]"
                />
              </div>
            )}

            {/* SINGLE CORRECT MCQ SELECTOR */}
            {question.questionType === 'SINGLE_CORRECT' && (
              <div className="space-y-2.5">
                <div className="text-xs text-[#8c8c8c] font-medium font-mono uppercase tracking-wider mb-1">
                  Select one option:
                </div>
                {question.options &&
                  question.options.map((opt: any) => {
                    const isSelected = selectedSingleKey === opt.optionKey;
                    const isSubmitted = !!submissionResult;
                    const isCorrectAnswer = submissionResult?.correctAnswer?.includes(opt.optionKey);
                    const isWrongSelection = isSubmitted && isSelected && !isCorrectAnswer;

                    let cardClass = 'bg-[#181818] border-[#282828] text-[#d1d5db] hover:border-[#3d3d3d] hover:bg-[#202020]';
                    let badgeClass = 'bg-[#1f1f1f] text-[#8c8c8c] border border-[#2e2e2e]';

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        cardClass = 'bg-[#00b8a3]/10 border-[#00b8a3] text-white';
                        badgeClass = 'bg-[#00b8a3] text-black font-bold';
                      } else if (isWrongSelection) {
                        cardClass = 'bg-[#ff375f]/10 border-[#ff375f] text-white';
                        badgeClass = 'bg-[#ff375f] text-white font-bold';
                      }
                    } else if (isSelected) {
                      cardClass = 'bg-[#2E5BFF]/15 border-[#2E5BFF] text-white shadow-sm';
                      badgeClass = 'bg-[#2E5BFF] text-white font-bold';
                    }

                    return (
                      <div
                        key={opt.id || opt.optionKey}
                        onClick={() => {
                          if (!submissionResult) setSelectedSingleKey(opt.optionKey);
                        }}
                        className={`p-3.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          !submissionResult ? 'cursor-pointer' : 'cursor-default'
                        } ${cardClass}`}
                      >
                        <div className="flex items-center gap-3.5 flex-1">
                          <span className={`w-7 h-7 rounded-full flex items-center justify-center font-mono font-bold shrink-0 ${badgeClass}`}>
                            {opt.optionKey}
                          </span>
                          <div className="flex-1 font-medium text-sm">
                            <MathRenderer content={opt.contentLatex} inline />
                          </div>
                        </div>
                        {isSelected && !isSubmitted && <Check className="w-4 h-4 text-[#2E5BFF] shrink-0 ml-2" />}
                        {isCorrectAnswer && isSubmitted && <CheckCircle2 className="w-4 h-4 text-[#00b8a3] shrink-0 ml-2" />}
                        {isWrongSelection && isSubmitted && <XCircle className="w-4 h-4 text-[#ff375f] shrink-0 ml-2" />}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* MULTIPLE CORRECT MCQ SELECTOR */}
            {question.questionType === 'MULTIPLE_CORRECT' && (
              <div className="space-y-2.5">
                <div className="text-xs text-[#8c8c8c] font-medium font-mono uppercase tracking-wider mb-1">
                  Select one or more options (Partial marking enabled):
                </div>
                {question.options &&
                  question.options.map((opt: any) => {
                    const isSelected = selectedMultiKeys.includes(opt.optionKey);
                    const isSubmitted = !!submissionResult;
                    const isCorrectAnswer = submissionResult?.correctAnswer?.includes(opt.optionKey);
                    const isWrongSelection = isSubmitted && isSelected && !isCorrectAnswer;

                    let cardClass = 'bg-[#181818] border-[#282828] text-[#d1d5db] hover:border-[#3d3d3d] hover:bg-[#202020]';
                    let badgeClass = 'bg-[#1f1f1f] text-[#8c8c8c] border border-[#2e2e2e]';

                    if (isSubmitted) {
                      if (isCorrectAnswer) {
                        cardClass = 'bg-[#00b8a3]/10 border-[#00b8a3] text-white';
                        badgeClass = 'bg-[#00b8a3] text-black font-bold';
                      } else if (isWrongSelection) {
                        cardClass = 'bg-[#ff375f]/10 border-[#ff375f] text-white';
                        badgeClass = 'bg-[#ff375f] text-white font-bold';
                      }
                    } else if (isSelected) {
                      cardClass = 'bg-[#2E5BFF]/15 border-[#2E5BFF] text-white shadow-sm';
                      badgeClass = 'bg-[#2E5BFF] text-white font-bold';
                    }

                    return (
                      <div
                        key={opt.id || opt.optionKey}
                        onClick={() => handleToggleMultiOption(opt.optionKey)}
                        className={`p-3.5 rounded-lg border text-xs flex items-center justify-between transition-all ${
                          !submissionResult ? 'cursor-pointer' : 'cursor-default'
                        } ${cardClass}`}
                      >
                        <div className="flex items-center gap-3.5 flex-1">
                          <span className={`w-7 h-7 rounded-md flex items-center justify-center font-mono font-bold shrink-0 ${badgeClass}`}>
                            {opt.optionKey}
                          </span>
                          <div className="flex-1 font-medium text-sm">
                            <MathRenderer content={opt.contentLatex} inline />
                          </div>
                        </div>
                        {isSelected && !isSubmitted && <Check className="w-4 h-4 text-[#2E5BFF] shrink-0 ml-2" />}
                        {isCorrectAnswer && isSubmitted && <CheckCircle2 className="w-4 h-4 text-[#00b8a3] shrink-0 ml-2" />}
                        {isWrongSelection && isSubmitted && <XCircle className="w-4 h-4 text-[#ff375f] shrink-0 ml-2" />}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* NUMERICAL VALUE INPUT */}
            {question.questionType === 'NUMERICAL' && (
              <div className="space-y-3">
                <label className="block text-xs text-[#8c8c8c] font-medium font-mono uppercase tracking-wider">
                  Enter final numerical answer (Tolerance ±0.05):
                </label>
                <div className="relative max-w-sm">
                  <input
                    type="number"
                    step="any"
                    disabled={!!submissionResult}
                    value={numericalInput}
                    onChange={(e) => setNumericalInput(e.target.value)}
                    placeholder="e.g. 1.25"
                    className="w-full px-4 py-2.5 rounded-lg bg-[#181818] border border-[#282828] focus:border-[#2E5BFF] font-mono text-base text-white outline-none disabled:opacity-75 transition-colors"
                  />
                  <span className="absolute right-3.5 top-3 text-xs font-mono text-[#8c8c8c]">
                    SI Units
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* ======================================================== */}
          {/* LEETCODE TESTCASE & TEST RESULT DRAWER                   */}
          {/* ======================================================== */}
          <div className="border-t border-[#282828] bg-[#141414] shrink-0">
            {/* Console Tab Strip & Collapse Toggle */}
            <div className="h-9 border-b border-[#242424] px-4 flex items-center justify-between text-xs bg-[#181818]">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    setConsoleTab('testcase');
                    setIsConsoleOpen(true);
                  }}
                  className={`px-3 py-1 font-medium text-xs flex items-center gap-1.5 transition-colors ${
                    consoleTab === 'testcase' && isConsoleOpen
                      ? 'text-white border-b-2 border-[#2E5BFF]'
                      : 'text-[#8c8c8c] hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Testcase</span>
                </button>
                <button
                  onClick={() => {
                    setConsoleTab('result');
                    setIsConsoleOpen(true);
                  }}
                  className={`px-3 py-1 font-medium text-xs flex items-center gap-1.5 transition-colors ${
                    consoleTab === 'result' && isConsoleOpen
                      ? 'text-white border-b-2 border-[#2E5BFF]'
                      : 'text-[#8c8c8c] hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Test Result</span>
                  {submissionResult && (
                    <span className={`w-1.5 h-1.5 rounded-full ${submissionResult.isCorrect ? 'bg-[#00b8a3]' : 'bg-[#ff375f]'}`} />
                  )}
                </button>
              </div>

              <button
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                className="text-[#8c8c8c] hover:text-white flex items-center gap-1 text-[11px] font-mono"
              >
                <span>Console</span>
                {isConsoleOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronUp className="w-3.5 h-3.5" />}
              </button>
            </div>

            {/* Console Body Content */}
            {isConsoleOpen && (
              <div className="p-4 max-h-56 overflow-y-auto text-xs space-y-3 bg-[#141414]">
                {consoleTab === 'testcase' && (
                  <div className="space-y-2 text-[#9ca3af] font-mono">
                    <div className="flex items-center justify-between text-xs text-[#8c8c8c]">
                      <span>Exam Standard Test Parameters:</span>
                      <span className="text-[#00b8a3]">Standard JEE Gravity: g = 9.8 m/s²</span>
                    </div>
                    <div className="p-3 rounded bg-[#0a0a0a] border border-[#242424] space-y-1">
                      <div><strong className="text-white">Format:</strong> {question.questionType}</div>
                      <div><strong className="text-white">Marks:</strong> +{question.marks} / -{question.negativeMarks}</div>
                      <div><strong className="text-white">Coordinate System:</strong> Standard 2D Cartesian $(x, y)$</div>
                    </div>
                  </div>
                )}

                {consoleTab === 'result' && (
                  <div>
                    {submissionResult ? (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            {submissionResult.isCorrect ? (
                              <CheckCircle2 className="w-5 h-5 text-[#00b8a3]" />
                            ) : (
                              <XCircle className="w-5 h-5 text-[#ff375f]" />
                            )}
                            <span
                              className={`text-base font-bold font-heading ${
                                submissionResult.isCorrect ? 'text-[#00b8a3]' : 'text-[#ff375f]'
                              }`}
                            >
                              {submissionResult.isCorrect ? 'Accepted' : 'Wrong Answer'}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 font-mono text-xs">
                            <span>Runtime: <strong className="text-white">{seconds}s</strong></span>
                            <span>•</span>
                            <span>Marks: <strong className={(submissionResult.marksAwarded ?? submissionResult.marksEarned) >= 0 ? 'text-[#00b8a3]' : 'text-[#ff375f]'}>
                              {(submissionResult.marksAwarded ?? submissionResult.marksEarned) > 0 ? `+${submissionResult.marksAwarded ?? submissionResult.marksEarned}` : (submissionResult.marksAwarded ?? submissionResult.marksEarned)}
                            </strong></span>
                          </div>
                        </div>

                        {/* Explanation proof */}
                        <div className="p-3 rounded bg-[#0a0a0a] border border-[#242424] text-xs text-[#d1d5db] leading-relaxed">
                          <MathRenderer content={submissionResult.explanation || submissionResult.solutionLatex || submissionResult.verifiedSolution} />
                        </div>

                        {/* 9-Class Mistake Analysis Card if incorrect */}
                        {mistakeAnalysis && (
                          <div className="p-3 rounded bg-[#1f1618] border border-[#ff375f]/30 space-y-1.5 text-xs">
                            <div className="font-bold text-[#ffa116] flex items-center gap-1.5 font-heading">
                              <AlertCircle className="w-3.5 h-3.5 text-[#ff375f]" />
                              <span>Cognitive Diagnostic: {mistakeAnalysis.mistakeCategory || mistakeAnalysis.mistakeType}</span>
                            </div>
                            <p className="text-[#a1a1aa] leading-relaxed">
                              {mistakeAnalysis.feedback || mistakeAnalysis.analysisTextLatex || mistakeAnalysis.divergencePoint}
                            </p>
                            {(mistakeAnalysis.remedialAction || mistakeAnalysis.suggestedReview) && (
                              <div className="p-2 rounded bg-[#0a0a0a] border border-[#282828] text-[#00b8a3] font-mono text-[11px]">
                                Remedy: {mistakeAnalysis.remedialAction || mistakeAnalysis.suggestedReview}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => setLeftTab('editorial')}
                            className="px-3 py-1 rounded bg-[#1e1e1e] hover:bg-[#282828] text-[#00b8a3] border border-[#00b8a3]/30 font-medium text-xs flex items-center gap-1 transition-colors"
                          >
                            <BookOpen className="w-3 h-3" />
                            <span>View Full Editorial</span>
                          </button>
                          {question.nextQuestionId && (
                            <button
                              onClick={() => router.push(`/solve/${question.nextQuestionId}`)}
                              className="px-3 py-1 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-semibold text-xs flex items-center gap-1 transition-colors ml-auto"
                            >
                              <span>Next Problem</span>
                              <ArrowRight className="w-3 h-3 stroke-[2.5]" />
                            </button>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="py-6 text-center text-[#8c8c8c] font-mono">
                        Submit your answer above to execute test suite evaluation.
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}

            {/* Bottom Controls Bar (Run / Submit & Console Pill) */}
            <div className="h-12 border-t border-[#282828] px-4 flex items-center justify-between bg-[#181818]">
              <button
                onClick={() => setIsConsoleOpen(!isConsoleOpen)}
                className="px-3 py-1.5 rounded bg-[#1e1e1e] hover:bg-[#252525] border border-[#2e2e2e] text-xs font-mono text-[#8c8c8c] hover:text-white flex items-center gap-1.5 transition-colors"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Console</span>
                {isConsoleOpen ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />}
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleSubmitAnswer}
                  disabled={isSubmitting}
                  className="px-5 py-1.5 rounded bg-[#2cbb5d] hover:bg-[#26a050] text-white font-bold text-xs flex items-center gap-1.5 shadow transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>Grading...</span>
                    </>
                  ) : (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Submit Solution</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* SLIDING LEETCODE-STYLE AI COPILOT FLYOUT DRAWER          */}
        {/* ======================================================== */}
        {isCopilotOpen && (
          <div className="absolute right-0 top-0 bottom-0 w-full sm:w-[420px] bg-[#141414] border-l border-[#282828] shadow-2xl flex flex-col z-30 animate-in slide-in-from-right duration-200">
            {/* Copilot Header */}
            <div className="h-11 border-b border-[#282828] px-4 flex items-center justify-between bg-[#181818]">
              <div className="flex items-center gap-2">
                <BrainCircuit className="w-4 h-4 text-[#00b8a3]" />
                <span className="font-bold text-white text-xs font-heading">Solve Sense AI Physics Copilot</span>
              </div>
              <div className="flex items-center gap-2">
                <select
                  value={mentorMode}
                  onChange={(e: any) => setMentorMode(e.target.value)}
                  className="px-2 py-0.5 rounded bg-[#141414] border border-[#2e2e2e] text-[11px] text-[#eff1f6] outline-none font-mono"
                >
                  <option value="COLLABORATIVE">Collaborative</option>
                  <option value="STRICT">Strict Mode</option>
                </select>
                <button
                  onClick={() => setIsCopilotOpen(false)}
                  className="p-1 rounded text-[#8c8c8c] hover:text-white hover:bg-[#202020] transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2.5 border-b border-[#282828] bg-[#121212] overflow-x-auto flex gap-1.5 shrink-0">
              {promptSuggestions.map((p, i) => (
                <button
                  key={i}
                  onClick={() => handleSendChatMessage(undefined, p.text)}
                  disabled={isChatSending}
                  className="px-2.5 py-1 rounded-full bg-[#1a1a1a] hover:bg-[#242424] border border-[#2e2e2e] text-[11px] text-[#a1a1aa] hover:text-white whitespace-nowrap transition-colors"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Chat Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 text-xs">
              {chatMessages.map((msg, i) => (
                <div
                  key={i}
                  className={`p-3 rounded-lg ${
                    msg.sender === 'student'
                      ? 'bg-[#2E5BFF]/15 border border-[#2E5BFF]/30 text-white ml-6'
                      : 'bg-[#1a1a1a] border border-[#282828] text-[#d1d5db] mr-6'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] text-[#8c8c8c] mb-1 font-mono">
                    <span className="font-bold text-white">
                      {msg.sender === 'student' ? 'You' : `AI Mentor (${mentorMode})`}
                    </span>
                    <span>{msg.time}</span>
                  </div>
                  <div className="leading-relaxed">
                    <MathRenderer content={msg.text} />
                  </div>
                </div>
              ))}
              {isChatSending && (
                <div className="p-3 rounded-lg bg-[#1a1a1a] border border-[#282828] text-[#8c8c8c] flex items-center gap-2">
                  <RefreshCw className="w-3.5 h-3.5 animate-spin text-[#00b8a3]" />
                  <span className="text-xs font-mono">Formulating Socratic guidance...</span>
                </div>
              )}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChatMessage} className="p-3 border-t border-[#282828] bg-[#181818] flex gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask any physics conceptual doubt..."
                className="flex-1 px-3 py-1.5 rounded bg-[#141414] border border-[#2e2e2e] text-xs text-white placeholder-[#6b7280] outline-none focus:border-[#2E5BFF]"
              />
              <button
                type="submit"
                disabled={isChatSending || !chatInput.trim()}
                className="px-3 py-1.5 rounded bg-[#2E5BFF] hover:bg-[#2044cc] text-white text-xs font-bold disabled:opacity-50 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* FORMULA QUICK REFERENCE MODAL                            */}
      {/* ======================================================== */}
      {showFormulaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="max-w-2xl w-full p-6 rounded-xl bg-[#141414] border border-[#282828] space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#282828] pb-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#2E5BFF]" />
                <h3 className="text-base font-bold text-white font-heading">
                  JEE Advanced Physics Formula Card
                </h3>
              </div>
              <button
                onClick={() => setShowFormulaModal(false)}
                className="text-[#8c8c8c] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
              {formulaCategories.map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-xs font-bold text-[#00b8a3] uppercase font-mono tracking-wider">
                    {cat.category}
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {cat.formulas.map((f, fi) => (
                      <div key={fi} className="p-3 rounded-lg bg-[#1a1a1a] border border-[#282828] space-y-1">
                        <div className="text-[11px] text-[#8c8c8c] font-medium">{f.name}</div>
                        <div className="text-xs text-white">
                          <MathRenderer content={`$$${f.eq}$$`} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setShowFormulaModal(false)}
                className="px-4 py-1.5 rounded-lg bg-[#282828] hover:bg-[#333333] text-xs font-semibold text-white transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
