'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { 
  BookOpen, 
  Search, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Target, 
  Award, 
  Sparkles, 
  RefreshCw,
  Compass,
  ArrowRight
} from 'lucide-react';
import { apiRequest } from '@/lib/api';
import MathRenderer from '@/components/MathRenderer';

function ProblemBankContent() {
  const searchParams = useSearchParams();
  const initialChapter = searchParams.get('chapter') || '';

  const [questions, setQuestions] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState(initialChapter);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [pyqOnly, setPyqOnly] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchChapters();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [selectedChapter, selectedDifficulty, selectedType, pyqOnly]);

  const fetchChapters = async () => {
    try {
      const data = await apiRequest('/syllabus/subjects/physics/chapters');
      setChapters(data);
    } catch (err) {
      console.error('Failed to load chapters:', err);
    }
  };

  const fetchQuestions = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedChapter) params.append('chapterSlug', selectedChapter);
      if (selectedDifficulty) params.append('difficulty', selectedDifficulty);
      if (selectedType) params.append('questionType', selectedType);
      if (pyqOnly) params.append('isPYQ', 'true');
      if (searchQuery) params.append('search', searchQuery);

      const data = await apiRequest(`/questions?${params.toString()}`);
      setQuestions(data);
    } catch (err) {
      console.error('Failed to load questions:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchQuestions();
  };

  const getDifficultyBadge = (difficulty: string) => {
    switch (difficulty) {
      case 'EASY':
        return 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
      case 'MEDIUM':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      case 'HARD':
        return 'bg-red-500/15 text-red-400 border-red-500/30';
      case 'ADVANCED':
        return 'bg-purple-500/15 text-purple-400 border-purple-500/30';
      default:
        return 'bg-slate-700 text-slate-300';
    }
  };

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-surface via-card to-surface border border-card-border shadow-xl">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-electric text-xs font-semibold">
            <Compass className="w-3.5 h-3.5" />
            <span>JEE Main & Advanced Physics Repository</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Problem Bank & Workspace
          </h1>
          <p className="text-sm text-slate-400 leading-relaxed">
            Practice calibrated competitive examination problems with deterministic grading, LaTeX equations, and on-demand AI mentoring hints.
          </p>
        </div>
      </div>

      {/* Filter Toolbar */}
      <div className="p-5 rounded-2xl bg-card border border-card-border shadow-lg space-y-4">
        {/* Search & Main Controls */}
        <div className="flex flex-col md:flex-row gap-3 items-center justify-between">
          <form onSubmit={handleSearchSubmit} className="w-full md:w-96 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, formula, or code..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-surface border border-card-border focus:border-electric focus:ring-1 focus:ring-electric text-white placeholder-slate-500 text-sm outline-none transition-colors"
            />
          </form>

          {/* PYQ Toggle */}
          <div className="w-full md:w-auto flex items-center justify-between md:justify-end gap-3">
            <button
              onClick={() => setPyqOnly(!pyqOnly)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                pyqOnly
                  ? 'bg-amber-500/15 border-amber-500/50 text-amber-300'
                  : 'bg-surface border-card-border text-slate-400 hover:text-white'
              }`}
            >
              ★ Previous Year Questions (PYQ)
            </button>

            <span className="text-xs text-slate-400 font-medium">
              {questions.length} Problems Listed
            </span>
          </div>
        </div>

        {/* Secondary Filter Chips */}
        <div className="pt-3 border-t border-card-border flex flex-wrap items-center gap-2">
          {/* Chapter Selector */}
          <select
            value={selectedChapter}
            onChange={(e) => setSelectedChapter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-surface border border-card-border text-white text-xs outline-none focus:border-electric"
          >
            <option value="">All Physics Chapters</option>
            {chapters.map((chap) => (
              <option key={chap.id} value={chap.slug}>
                {chap.name}
              </option>
            ))}
          </select>

          {/* Difficulty Chips */}
          <div className="flex items-center gap-1.5">
            {['', 'EASY', 'MEDIUM', 'HARD', 'ADVANCED'].map((diff) => (
              <button
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedDifficulty === diff
                    ? 'bg-blue-600 border-blue-500 text-white'
                    : 'bg-surface border-card-border text-slate-400 hover:text-white'
                }`}
              >
                {diff || 'All Levels'}
              </button>
            ))}
          </div>

          {/* Question Type Filter */}
          <div className="flex items-center gap-1.5 ml-auto">
            {['', 'SINGLE_CORRECT', 'MULTIPLE_CORRECT', 'NUMERICAL'].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-colors ${
                  selectedType === type
                    ? 'bg-electric/20 border-electric/40 text-electric'
                    : 'bg-surface border-card-border text-slate-400 hover:text-white'
                }`}
              >
                {type ? type.replace('_', ' ') : 'All Formats'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions Listing */}
      {isLoading ? (
        <div className="py-20 text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-electric animate-spin mx-auto" />
          <p className="text-slate-400 text-sm font-medium">Loading Questions Repository...</p>
        </div>
      ) : questions.length > 0 ? (
        <div className="space-y-4">
          {questions.map((q) => (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-card border border-card-border hover:border-slate-600 transition-all shadow-md group flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
            >
              {/* Left Column: Code, Statement excerpt, tags */}
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-xs font-bold text-electric bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                    {q.code}
                  </span>

                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border ${getDifficultyBadge(
                      q.difficulty
                    )}`}
                  >
                    {q.difficulty}
                  </span>

                  <span className="text-xs text-slate-400 bg-surface px-2.5 py-0.5 rounded border border-card-border">
                    {q.questionType.replace('_', ' ')}
                  </span>

                  {q.isPYQ && (
                    <span className="text-[10px] font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
                      JEE PYQ {q.pyqYear}
                    </span>
                  )}

                  {q.isSolved && (
                    <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                      <CheckCircle2 className="w-3 h-3" /> Solved
                    </span>
                  )}
                </div>

                {/* Question Statement preview */}
                <div className="text-slate-300 text-sm line-clamp-2 leading-relaxed">
                  <MathRenderer content={q.contentLatex} />
                </div>

                {/* Metadata details */}
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span>+{q.marks} / -{q.negativeMarks} Marks</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>~{Math.round(q.timeRecommendationSec / 60)} mins</span>
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/solve/${q.id}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm shadow-md shadow-blue-600/20 transition-all shrink-0"
              >
                <span>{q.isSolved ? 'Solve Again' : 'Solve Problem'}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-12 rounded-2xl bg-card border border-card-border text-center space-y-3">
          <BookOpen className="w-10 h-10 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Questions Found</h3>
          <p className="text-xs text-slate-400">
            No questions match your current filter parameters. Try clearing the filters.
          </p>
          <button
            onClick={() => {
              setSelectedChapter('');
              setSelectedDifficulty('');
              setSelectedType('');
              setPyqOnly(false);
              setSearchQuery('');
            }}
            className="px-4 py-2 rounded-xl bg-surface border border-card-border text-xs text-electric font-semibold hover:bg-surface/80"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default function ProblemBankPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-24">
          <RefreshCw className="w-8 h-8 text-electric animate-spin" />
        </div>
      }
    >
      <ProblemBankContent />
    </Suspense>
  );
}
