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
  ChevronRight,
  TrendingUp,
  Sparkles,
  Calendar,
  Layers,
  ArrowRight,
  Filter,
  Check,
  Award,
  BookOpen,
  Flame,
  Zap,
  Tag,
  Clock,
  ShieldCheck
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

  // Pick Random Question (Classic LeetCode Feature)
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

  // Calculate stats
  const totalCount = questions.length;
  const easyCount = questions.filter((q) => q.difficulty === 'EASY').length;
  const medCount = questions.filter((q) => q.difficulty === 'MEDIUM').length;
  const hardCount = questions.filter((q) => q.difficulty === 'HARD' || q.difficulty === 'ADVANCED').length;
  const easySolved = questions.filter((q) => q.difficulty === 'EASY' && q.isSolved).length;
  const medSolved = questions.filter((q) => q.difficulty === 'MEDIUM' && q.isSolved).length;
  const hardSolved = questions.filter((q) => (q.difficulty === 'HARD' || q.difficulty === 'ADVANCED') && q.isSolved).length;
  const solvedCount = questions.filter((q) => q.isSolved).length;
  const completionPercentage = totalCount > 0 ? Math.round((solvedCount / totalCount) * 100) : 0;

  // Study plans (LeetCode 75 / Top 50 style)
  const studyPlans = [
    { title: 'Top 50 JEE Advanced Mechanics', solved: 14, total: 50, tag: 'High Yield', color: '#00e1ab' },
    { title: 'Electrodynamics & Magnetism 30', solved: 8, total: 30, tag: 'Calculus Intensive', color: '#2E5BFF' },
    { title: 'Thermodynamics Rapid Drill', solved: 6, total: 20, tag: 'Formula Rigor', color: '#ffa116' },
  ];

  return (
    <div className="flex-1 max-w-[1440px] w-full mx-auto px-4 sm:px-6 py-6 space-y-6 bg-[#0a0a0a]">
      {/* ======================================================== */}
      {/* 1. LEETCODE / GFG PROBLEM OF THE DAY & STUDY PLANS       */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Left (7 cols): Pinned Problem of the Day (POTD) */}
        <div className="lg:col-span-7 p-6 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col justify-between space-y-4 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-80 h-80 bg-[#ffa116]/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-3 z-10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20 text-[11px] font-mono font-bold">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Problem of the Day</span>
                </span>
                <span className="text-[11px] font-mono text-[#8c8c8c]">
                  November 23, 2026
                </span>
              </div>
              <span className="text-[11px] font-mono text-[#00e1ab] flex items-center gap-1">
                <Flame className="w-3.5 h-3.5 fill-[#00e1ab]" />
                <span>+10 PSI Points</span>
              </span>
            </div>

            <div>
              <Link
                href="/solve/PHY-ADV-24-ROT-01"
                className="text-lg sm:text-xl font-bold text-white hover:text-[#00e1ab] transition-colors font-heading tracking-tight"
              >
                PHY-ADV-24-ROT-01: Pure Rolling Dynamics on Rough Inclines
              </Link>
              <p className="text-xs text-[#8c8c8c] mt-1 line-clamp-2 leading-relaxed">
                A solid cylinder of mass M and radius R is placed on an incline with friction coefficient μ. Determine condition for rolling without slipping.
              </p>
            </div>

            <div className="flex items-center gap-2.5 pt-1 text-xs">
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold border text-[#ff375f] bg-[#ff375f]/10 border-[#ff375f]/20">
                HARD
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
                JEE ADVANCED &apos;24 PYQ
              </span>
              <span className="text-[#8c8c8c] font-mono text-[11px]">
                Marks: +4 / -1
              </span>
            </div>
          </div>

          <div className="pt-2 flex items-center justify-between z-10">
            <span className="text-xs text-[#8c8c8c] font-mono">
              Acceptance: <strong className="text-white">44.8%</strong>
            </span>
            <Link
              href="/solve/PHY-ADV-24-ROT-01"
              className="px-4 py-2 rounded-xl bg-[#00e1ab] hover:bg-[#00c596] text-black font-bold text-xs flex items-center gap-1.5 transition-all shadow-sm"
            >
              <span>Solve POTD Challenge</span>
              <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>

        {/* Right (5 cols): LeetCode-style Curated Study Plans */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-[#141414] border border-[#282828] space-y-3 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#2E5BFF]" />
              <span className="text-xs font-bold text-white font-heading uppercase tracking-wider">
                Curated Study Plans
              </span>
            </div>
            <span className="text-[11px] font-mono text-[#8c8c8c]">JEE 2026</span>
          </div>

          <div className="space-y-2.5">
            {studyPlans.map((sp, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#181818] border border-[#282828] hover:border-[#383838] transition-colors space-y-2"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-white font-heading">{sp.title}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#121212] text-[#8c8c8c] border border-[#242424]">
                    {sp.tag}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[#8c8c8c]">
                  <span>{sp.solved} of {sp.total} solved</span>
                  <span className="text-white font-bold">{Math.round((sp.solved / sp.total) * 100)}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#121212] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${(sp.solved / sp.total) * 100}%`, backgroundColor: sp.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. CHAPTER PILLS CAROUSEL (LEETCODE TAG STRIP)           */}
      {/* ======================================================== */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs select-none scrollbar-none">
        <button
          onClick={() => setSelectedChapter('')}
          className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
            selectedChapter === ''
              ? 'bg-[#2E5BFF] text-white font-bold shadow-sm'
              : 'bg-[#141414] border border-[#282828] text-[#8c8c8c] hover:text-white hover:border-[#383838]'
          }`}
        >
          All Topics
        </button>
        {chapters.map((chap) => {
          const isSelected = selectedChapter === chap.slug;
          return (
            <button
              key={chap.id}
              onClick={() => setSelectedChapter(isSelected ? '' : chap.slug)}
              className={`px-3.5 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-[#2E5BFF] text-white font-bold shadow-sm'
                  : 'bg-[#141414] border border-[#282828] text-[#8c8c8c] hover:text-white hover:border-[#383838]'
              }`}
            >
              {chap.name}
            </button>
          );
        })}
      </div>

      {/* ======================================================== */}
      {/* 3. MULTI-CRITERIA FILTER BAR & RANDOM PICKER             */}
      {/* ======================================================== */}
      <div className="p-4 rounded-2xl bg-[#141414] border border-[#282828] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 text-xs">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3.5 top-3 text-[#6b7280]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by code, title, or concept (e.g. ROT-01, Torque)..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#181818] border border-[#282828] focus:border-[#2E5BFF] text-white placeholder-[#6b7280] outline-none text-xs transition-colors"
          />
        </form>

        {/* Filter Dropdowns */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Difficulty Dropdown */}
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#181818] border border-[#282828] text-xs text-[#eff1f6] outline-none font-mono"
          >
            <option value="">Difficulty: All</option>
            <option value="EASY">Easy</option>
            <option value="MEDIUM">Medium</option>
            <option value="HARD">Hard</option>
            <option value="ADVANCED">Advanced</option>
          </select>

          {/* Status Dropdown */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 rounded-xl bg-[#181818] border border-[#282828] text-xs text-[#eff1f6] outline-none font-mono"
          >
            <option value="ALL">Status: All</option>
            <option value="SOLVED">Solved</option>
            <option value="UNSOLVED">Unsolved</option>
          </select>

          {/* PYQ Toggle Button */}
          <button
            type="button"
            onClick={() => setPyqOnly(!pyqOnly)}
            className={`px-3 py-2 rounded-xl border text-xs font-mono font-medium flex items-center gap-1.5 transition-colors ${
              pyqOnly
                ? 'bg-[#ffa116]/15 border-[#ffa116] text-[#ffa116]'
                : 'bg-[#181818] border-[#282828] text-[#8c8c8c] hover:text-white'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>PYQ Only</span>
          </button>

          {/* LeetCode Pick Random Button */}
          <button
            type="button"
            onClick={handlePickRandom}
            className="px-3.5 py-2 rounded-xl bg-[#181818] hover:bg-[#202020] border border-[#282828] text-xs font-bold text-[#00e1ab] flex items-center gap-1.5 transition-colors"
            title="Pick a Random Problem"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Pick One</span>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. LEETCODE-STYLE PROBLEM LIST TABLE                     */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-[#282828] overflow-hidden bg-[#141414]">
        {isLoading ? (
          <div className="py-24 text-center text-[#8c8c8c]">
            <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono tracking-wider">RETRIEVING PROBLEMS...</p>
          </div>
        ) : filteredQuestions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#282828] bg-[#101010] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-mono">
                  <th className="py-3.5 px-4 w-14 text-center">Status</th>
                  <th className="py-3.5 px-4">Title & Topic</th>
                  <th className="py-3.5 px-4 w-28 text-center">Solution</th>
                  <th className="py-3.5 px-4 w-28 text-right">Acceptance</th>
                  <th className="py-3.5 px-4 w-28 text-center">Difficulty</th>
                  <th className="py-3.5 px-4 w-24 text-right">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#1e1e1e]">
                {filteredQuestions.map((q, idx) => {
                  const isEasy = q.difficulty === 'EASY';
                  const isMedium = q.difficulty === 'MEDIUM';
                  const isHard = q.difficulty === 'HARD' || q.difficulty === 'ADVANCED';

                  return (
                    <tr
                      key={q.id}
                      className="hover:bg-[#181818] transition-colors group cursor-pointer"
                      onClick={() => router.push(`/solve/${q.id}`)}
                    >
                      {/* Status */}
                      <td className="py-3.5 px-4 text-center">
                        {q.isSolved ? (
                          <CheckCircle2 className="w-4 h-4 text-[#00e1ab] mx-auto" />
                        ) : (
                          <Circle className="w-4 h-4 text-[#333333] group-hover:text-[#666666] mx-auto" />
                        )}
                      </td>

                      {/* Title & Topic */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-[#8c8c8c] font-medium text-[11px]">
                            {q.code || `${idx + 1}.`}
                          </span>
                          <Link
                            href={`/solve/${q.id}`}
                            className="font-semibold text-white group-hover:text-[#00e1ab] transition-colors text-sm"
                            onClick={(e: React.MouseEvent) => e.stopPropagation()}
                          >
                            {q.topic ? `${q.topic.name}` : 'JEE Physics Problem'}
                          </Link>
                          {q.isPYQ && (
                            <span className="text-[10px] font-mono px-2 py-0.2 rounded-full bg-[#ffa116]/10 text-[#ffa116] border border-[#ffa116]/20">
                              &apos;{q.pyqYear} PYQ
                            </span>
                          )}
                          <span className="text-[10px] font-mono text-[#6b7280]">
                            {q.questionType.replace('_', ' ')}
                          </span>
                        </div>
                      </td>

                      {/* Solution */}
                      <td className="py-3.5 px-4 text-center">
                        <span className="inline-flex p-1 rounded bg-[#181818] text-[#2E5BFF] hover:text-white transition-colors" title="Editorial Available">
                          <BookOpen className="w-3.5 h-3.5" />
                        </span>
                      </td>

                      {/* Acceptance */}
                      <td className="py-3.5 px-4 text-right font-mono text-[#8c8c8c]">
                        44.8%
                      </td>

                      {/* Difficulty */}
                      <td className="py-3.5 px-4 text-center">
                        <span
                          className={`font-semibold text-[11px] font-mono px-2 py-0.5 rounded ${
                            isEasy
                              ? 'text-[#00e1ab] bg-[#00e1ab]/10'
                              : isMedium
                              ? 'text-[#ffa116] bg-[#ffa116]/10'
                              : 'text-[#ff525c] bg-[#ff525c]/10'
                          }`}
                        >
                          {q.difficulty}
                        </span>
                      </td>

                      {/* Marks */}
                      <td className="py-3.5 px-4 text-right font-mono font-bold text-white">
                        +{q.marks}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-16 text-center text-[#8c8c8c] space-y-2">
            <Filter className="w-8 h-8 mx-auto text-[#333333]" />
            <p className="text-xs font-mono">No problems matched your current filter criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function ProblemBankPage() {
  return (
    <Suspense
      fallback={
        <div className="flex-1 flex items-center justify-center py-24 text-[#8c8c8c] bg-[#0a0a0a]">
          <div className="w-8 h-8 border-2 border-[#00e1ab] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <ProblemBankContent />
    </Suspense>
  );
}
