'use client';

import React, { useEffect, useState, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  CheckCircle2,
  Circle,
  FileText,
  Shuffle,
  Star,
  ChevronRight,
  TrendingUp,
  Zap,
  Calendar,
  Layers
} from 'lucide-react';
import { apiRequest } from '@/lib/api';

function ProblemBankContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialChapter = searchParams.get('chapter') || '';

  const [questions, setQuestions] = useState<any[]>([]);
  const [chapters, setChapters] = useState<any[]>([]);
  const [selectedChapter, setSelectedChapter] = useState(initialChapter);
  const [selectedDifficulty, setSelectedDifficulty] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
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
      setChapters(data || []);
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
      setQuestions(data || []);
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

  // Pick Random Question (LeetCode "Pick One")
  const handlePickRandom = () => {
    if (questions.length === 0) return;
    const randomIndex = Math.floor(Math.random() * questions.length);
    const randomQuestion = questions[randomIndex];
    router.push(`/solve/${randomQuestion.id}`);
  };

  // Client-side status filter
  const filteredQuestions = questions.filter((q) => {
    if (selectedStatus === 'SOLVED') return q.isSolved;
    if (selectedStatus === 'UNSOLVED') return !q.isSolved;
    return true;
  });

  const getDifficultyColor = (diff: string) => {
    switch (diff) {
      case 'EASY':
        return 'text-[#00b8a3]';
      case 'MEDIUM':
        return 'text-[#ffc01e]';
      case 'HARD':
        return 'text-[#ff375f]';
      case 'ADVANCED':
        return 'text-[#a855f7]';
      default:
        return 'text-[#9ca3af]';
    }
  };

  // Calculate difficulty stats
  const totalCount = questions.length;
  const easyCount = questions.filter((q) => q.difficulty === 'EASY').length;
  const medCount = questions.filter((q) => q.difficulty === 'MEDIUM').length;
  const hardCount = questions.filter((q) => q.difficulty === 'HARD' || q.difficulty === 'ADVANCED').length;
  const easySolved = questions.filter((q) => q.difficulty === 'EASY' && q.isSolved).length;
  const medSolved = questions.filter((q) => q.difficulty === 'MEDIUM' && q.isSolved).length;
  const hardSolved = questions.filter((q) => (q.difficulty === 'HARD' || q.difficulty === 'ADVANCED') && q.isSolved).length;
  const solvedCount = questions.filter((q) => q.isSolved).length;

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
      {/* Top Banner Grid: Study Plans & Daily Challenge (LeetCode Style) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Left: Study Plan Banner */}
        <div className="lg:col-span-8 p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-semibold uppercase text-[#ffa116]">Curated Study Plan</span>
                <span className="text-xs text-[#8c8c8c]">•</span>
                <span className="text-xs text-[#8c8c8c]">JEE Advanced 2026 Core</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                Competitive Physics Problemset
              </h1>
            </div>
            <button
              onClick={handlePickRandom}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded bg-[#333333] hover:bg-[#3d3d3d] text-xs font-semibold text-white border border-[#404040] transition-colors self-start sm:self-auto shrink-0"
            >
              <Shuffle className="w-3.5 h-3.5 text-[#00b8a3]" />
              <span>Pick One</span>
            </button>
          </div>

          {/* Category Chips Carousel */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <button
              onClick={() => setSelectedChapter('')}
              className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                selectedChapter === ''
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#1f1f1f] text-[#8c8c8c] hover:text-white hover:bg-[#2e2e2e]'
              }`}
            >
              All Topics
            </button>
            {chapters.map((chap) => (
              <button
                key={chap.id}
                onClick={() => setSelectedChapter(chap.slug)}
                className={`px-3 py-1 rounded transition-colors whitespace-nowrap ${
                  selectedChapter === chap.slug
                    ? 'bg-white text-black font-semibold'
                    : 'bg-[#1f1f1f] text-[#8c8c8c] hover:text-white hover:bg-[#2e2e2e]'
                }`}
              >
                {chap.name}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Solved Progress Card (LeetCode circle stats) */}
        <div className="lg:col-span-4 p-5 rounded-lg bg-[#262626] border border-[#333333] flex flex-col justify-between">
          <div className="flex items-center justify-between text-xs text-[#8c8c8c] mb-3">
            <span className="font-semibold text-white uppercase tracking-wider">Session Progress</span>
            <span className="font-mono text-white font-semibold">{solvedCount} / {totalCount} Solved</span>
          </div>

          {/* 3 Difficulty Progress Bars */}
          <div className="space-y-2 text-xs">
            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#00b8a3] font-medium">Easy</span>
                <span className="text-[#8c8c8c]">{easySolved} / {easyCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1f1f1f] overflow-hidden">
                <div className="h-full bg-[#00b8a3] transition-all duration-500" style={{ width: `${easyCount > 0 ? (easySolved / easyCount) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#ffc01e] font-medium">Medium</span>
                <span className="text-[#8c8c8c]">{medSolved} / {medCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1f1f1f] overflow-hidden">
                <div className="h-full bg-[#ffc01e] transition-all duration-500" style={{ width: `${medCount > 0 ? (medSolved / medCount) * 100 : 0}%` }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[11px] mb-1">
                <span className="text-[#ff375f] font-medium">Hard</span>
                <span className="text-[#8c8c8c]">{hardSolved} / {hardCount}</span>
              </div>
              <div className="w-full h-1.5 rounded-full bg-[#1f1f1f] overflow-hidden">
                <div className="h-full bg-[#ff375f] transition-all duration-500" style={{ width: `${hardCount > 0 ? (hardSolved / hardCount) * 100 : 0}%` }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter Control Bar (LeetCode Style) */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-[#262626] p-3 rounded-lg border border-[#333333]">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[220px] max-w-sm">
          <Search className="w-4 h-4 text-[#8c8c8c] absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search questions by topic, formula, or code..."
            className="w-full pl-9 pr-3 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] focus:border-[#ffa116] text-xs text-white placeholder-[#6b7280] outline-none transition-colors"
          />
        </form>

        {/* Filters Group */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-xs text-[#eff1f6] outline-none focus:border-[#ffa116] cursor-pointer"
          >
            <option value="">Difficulty</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-xs text-[#eff1f6] outline-none focus:border-[#ffa116] cursor-pointer"
          >
            <option value="ALL">Status</option>
            <option value="SOLVED">Solved</option>
            <option value="UNSOLVED">Unsolved</option>
          </select>

          {/* Question Type Dropdown */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-2.5 py-1.5 rounded bg-[#1f1f1f] border border-[#383838] text-xs text-[#eff1f6] outline-none focus:border-[#ffa116] cursor-pointer"
          >
            <option value="">Format</option>
            <option value="SINGLE_CORRECT">Single Correct</option>
            <option value="MULTIPLE_CORRECT">Multi-Correct</option>
            <option value="NUMERICAL">Numerical</option>
          </select>

          {/* PYQ Toggle Button */}
          <button
            onClick={() => setPyqOnly(!pyqOnly)}
            className={`px-3 py-1.5 rounded text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              pyqOnly
                ? 'bg-[#2b2416] border-[#4a3b1d] text-[#ffa116]'
                : 'bg-[#1f1f1f] border-[#383838] text-[#8c8c8c] hover:text-white'
            }`}
          >
            <Star className={`w-3.5 h-3.5 ${pyqOnly ? 'fill-[#ffa116] text-[#ffa116]' : ''}`} />
            <span>PYQs</span>
          </button>
        </div>
      </div>

      {/* LeetCode Clean Problem Table */}
      <div className="rounded-lg border border-[#333333] overflow-hidden bg-[#262626]">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#333333] bg-[#212121] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-semibold">
                <th className="py-3 px-4 w-12 text-center">Status</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 w-28 text-center">Solution</th>
                <th className="py-3 px-4 w-24 text-right">Acceptance</th>
                <th className="py-3 px-4 w-24 text-center">Difficulty</th>
                <th className="py-3 px-4 w-28 text-right">Marks</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#303030]">
              {isLoading ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#8c8c8c]">
                    <div className="inline-block w-5 h-5 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin mb-2" />
                    <div>Loading problems repository...</div>
                  </td>
                </tr>
              ) : filteredQuestions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-16 text-center text-[#8c8c8c]">
                    No questions found matching your filter criteria.
                  </td>
                </tr>
              ) : (
                filteredQuestions.map((q, index) => {
                  // Fake deterministic acceptance rate for realism
                  const fakeAcceptance = 35 + ((q.id.charCodeAt(q.id.length - 1) * 3) % 45);

                  return (
                    <tr
                      key={q.id}
                      onClick={() => router.push(`/solve/${q.id}`)}
                      className="lc-row cursor-pointer group"
                    >
                      {/* Status Column */}
                      <td className="py-3.5 px-4 text-center">
                        {q.isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00b8a3] mx-auto" />
                        ) : (
                          <Circle className="w-3.5 h-3.5 text-[#4a4a4a] group-hover:text-[#6a6a6a] mx-auto" />
                        )}
                      </td>

                      {/* Title Column */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[#8c8c8c] text-[11px]">
                            {q.code || `${index + 1}.`}
                          </span>
                          <span className="text-[#eff1f6] group-hover:text-[#ffa116] font-medium transition-colors">
                            {q.contentLatex.replace(/\$[^$]*\$/g, '').slice(0, 85).trim()}...
                          </span>

                          {/* Inline Tags */}
                          {q.isPYQ && (
                            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
                              PYQ {q.pyqYear}
                            </span>
                          )}

                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#1f1f1f] text-[#8c8c8c]">
                            {q.questionType.replace('_', ' ')}
                          </span>
                        </div>
                      </td>

                      {/* Solution / Editorial */}
                      <td className="py-3.5 px-4 text-center">
                        <FileText className="w-4 h-4 text-[#8c8c8c] group-hover:text-white mx-auto transition-colors" />
                      </td>

                      {/* Acceptance */}
                      <td className="py-3.5 px-4 text-right font-mono text-[#8c8c8c]">
                        {fakeAcceptance}%
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4 text-center">
                        <span className={`font-semibold ${getDifficultyColor(q.difficulty)}`}>
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Marks */}
                      <td className="py-3.5 px-4 text-right font-mono text-[#8c8c8c]">
                        <span className="text-[#00b8a3]">+{q.marks}</span> /{' '}
                        <span className="text-[#ff375f]">-{q.negativeMarks}</span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="py-3 px-4 border-t border-[#333333] bg-[#212121] flex items-center justify-between text-xs text-[#8c8c8c]">
          <span>Showing {filteredQuestions.length} of {questions.length} problems</span>
          <span className="text-[11px] font-mono">Marking: JEE Standard Pattern</span>
        </div>
      </div>
    </div>
  );
}

export default function ProblemBankPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center p-12 text-[#8c8c8c]">
          <div className="w-6 h-6 border-2 border-[#ffa116] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProblemBankContent />
    </Suspense>
  );
}
