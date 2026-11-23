'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  BookOpen, 
  Trophy, 
  Layers, 
  ShieldCheck, 
  ChevronRight, 
  TrendingUp, 
  Clock, 
  Cpu,
  GraduationCap,
  Play
} from 'lucide-react';
import MathRenderer from '@/components/MathRenderer';

export default function HomePage() {
  // Interactive mini problem solver for the hero preview
  const [selectedHeroOpt, setSelectedHeroOpt] = useState<string | null>(null);
  const [isHeroSubmitted, setIsHeroSubmitted] = useState(false);

  const heroProblem = {
    code: 'PHY-ADV-24-ROT-01',
    chapter: 'Rotational Motion',
    title: 'Rolling Motion of Cylinder under Offset Force',
    contentLatex: 'A uniform solid cylinder of mass $M$ and radius $R$ is placed on a rough horizontal surface with coefficient of friction $\\mu$. A horizontal force $F$ is applied at a height $h = \\frac{3R}{2}$ above the central axis. What is the linear acceleration $a_{cm}$ of the center of mass if it rolls without slipping?',
    options: [
      { key: 'A', text: '$\\frac{F}{M}$' },
      { key: 'B', text: '$\\frac{5F}{3M}$' },
      { key: 'C', text: '$\\frac{2F}{3M}$' },
      { key: 'D', text: '$\\frac{4F}{3M}$' }
    ],
    correctKey: 'B',
    explanationLatex: 'Taking torque about the bottom contact point $P$: $\\tau_P = F \\left(R + \\frac{3R}{2}\\right) = \\frac{5FR}{2}$. Parallel-axis theorem gives $I_P = \\frac{3}{2}MR^2$. Therefore $\\alpha = \\frac{5F}{3MR} \\implies a_{cm} = \\alpha R = \\frac{5F}{3M}$.'
  };

  const tracks = [
    {
      slug: 'rotational-motion',
      name: 'Rotational Motion & Rigid Bodies',
      problems: 7,
      desc: 'Moment of inertia integration, instantaneous axis, pure rolling, and angular momentum conservation.',
      badge: 'Core Advanced',
      color: 'border-[#2E5BFF]/30 text-[#6d88ff]',
    },
    {
      slug: 'kinematics',
      name: 'Kinematics in 1D & 2D',
      problems: 6,
      desc: 'Constrained motion, calculus-based trajectories, pursuit problems, and relative velocities.',
      badge: 'Foundation',
      color: 'border-[#00e1ab]/30 text-[#00e1ab]',
    },
    {
      slug: 'laws-of-motion',
      name: 'Newton’s Laws & Friction',
      problems: 6,
      desc: 'Pseudo forces in non-inertial frames, multi-pulley systems, and static-to-kinetic friction transitions.',
      badge: 'Crucial Mechanics',
      color: 'border-[#ffc01e]/30 text-[#ffc01e]',
    },
    {
      slug: 'thermodynamics',
      name: 'Thermodynamics & Kinetic Theory',
      problems: 6,
      desc: 'First and second laws, polytropic processes, indicator diagrams, and cyclic engine efficiencies.',
      badge: 'High Scoring',
      color: 'border-[#ff525c]/30 text-[#ff525c]',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#0e0e0e] text-[#eff1f6]">
      {/* 1. HERO SECTION WITH INTEGRATED INTERACTIVE DRILL */}
      <section className="relative border-b border-[#1f1f1f] py-16 lg:py-24 px-4 sm:px-6 overflow-hidden">
        {/* Ambient Gradient Glows */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#2E5BFF]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00e1ab]/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-[1320px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission & Hook */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181818] border border-[#282828] text-xs font-headline">
              <span className="w-2 h-2 rounded-full bg-[#00e1ab] animate-pulse" />
              <span className="text-white font-semibold">SolveSense Engine v2.0</span>
              <span className="text-[#666666]">•</span>
              <span className="text-[#00e1ab]">JEE Main & Advanced Mastery</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-headline font-bold text-white tracking-tight leading-[1.1]">
              A New Way to Master <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2E5BFF] via-[#6d88ff] to-[#00e1ab]">
                Competitive Exam Physics
              </span>
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-[#999999] leading-relaxed">
              The deliberate practice platform built for serious aspirants. Solve verified problems with KaTeX math precision, deterministic scoring, 4-tier progressive hints, and an AI mentor that pinpoints why you made a mistake.
            </p>

            {/* Quick Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/solve"
                className="px-6 py-3 rounded-lg bg-[#2E5BFF] hover:bg-[#254cd6] text-white font-headline font-semibold text-sm shadow-glow-primary transition-all flex items-center gap-2 group"
              >
                <span>Browse Problemset</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="/contests"
                className="px-6 py-3 rounded-lg bg-[#181818] hover:bg-[#202020] border border-[#2e2e2e] text-[#eff1f6] hover:text-white font-headline font-semibold text-sm transition-colors flex items-center gap-2"
              >
                <Trophy className="w-4 h-4 text-[#ffa116]" />
                <span>Join Live Mock Contest</span>
              </Link>
            </div>

            {/* Platform Trust Stats */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#1c1c1c] max-w-lg">
              <div>
                <div className="text-xl sm:text-2xl font-headline font-bold text-white">37+</div>
                <div className="text-[11px] text-[#8c8c8c] font-mono">Curated JEE Problems</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-headline font-bold text-[#00e1ab]">+4 / -1</div>
                <div className="text-[11px] text-[#8c8c8c] font-mono">Deterministic Scoring</div>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-headline font-bold text-[#ffa116]">100%</div>
                <div className="text-[11px] text-[#8c8c8c] font-mono">Verified LaTeX Proofs</div>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Problem Preview Card */}
          <div className="lg:col-span-5">
            <div className="glass-card p-6 rounded-xl border border-[#2a2a2a] shadow-2xl relative">
              {/* Header Badge */}
              <div className="flex items-center justify-between pb-3 border-b border-[#242424] text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#ff525c]" />
                  <span className="font-mono text-[11px] text-white font-semibold">{heroProblem.code}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="lc-badge lc-badge-hard">HARD</span>
                  <span className="text-[11px] font-mono text-[#8c8c8c]">+4 / -1</span>
                </div>
              </div>

              {/* Question Statement */}
              <div className="py-4 text-xs sm:text-sm text-[#d4d4d4] leading-relaxed">
                <MathRenderer content={heroProblem.contentLatex} />
              </div>

              {/* Interactive Options */}
              <div className="space-y-2 pt-1">
                {heroProblem.options.map((opt) => {
                  const isSelected = selectedHeroOpt === opt.key;
                  const isCorrect = isHeroSubmitted && opt.key === heroProblem.correctKey;
                  const isWrong = isHeroSubmitted && isSelected && !isCorrect;

                  let style = 'bg-[#181818] border-[#2c2c2c] text-[#d4d4d4] hover:border-[#404040]';
                  if (isSelected && !isHeroSubmitted) {
                    style = 'bg-[#1e2540] border-[#2E5BFF] text-white';
                  } else if (isCorrect) {
                    style = 'bg-[#123126] border-[#00e1ab] text-white';
                  } else if (isWrong) {
                    style = 'bg-[#31161a] border-[#ff525c] text-white';
                  }

                  return (
                    <div
                      key={opt.key}
                      onClick={() => !isHeroSubmitted && setSelectedHeroOpt(opt.key)}
                      className={`p-3 rounded-md border text-xs flex items-center justify-between transition-all cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-5 h-5 rounded font-mono font-bold flex items-center justify-center bg-[#111111] text-xs">
                          {opt.key}
                        </span>
                        <span className="font-medium">
                          <MathRenderer content={opt.text} inline />
                        </span>
                      </div>
                      {isCorrect && <CheckCircle2 className="w-4 h-4 text-[#00e1ab]" />}
                      {isWrong && <XCircle className="w-4 h-4 text-[#ff525c]" />}
                    </div>
                  );
                })}
              </div>

              {/* Submit & Result Footer */}
              <div className="mt-4 pt-3 border-t border-[#242424] flex items-center justify-between text-xs">
                {!isHeroSubmitted ? (
                  <>
                    <span className="text-[#8c8c8c] text-[11px]">Click an option to test</span>
                    <button
                      onClick={() => selectedHeroOpt && setIsHeroSubmitted(true)}
                      disabled={!selectedHeroOpt}
                      className="px-4 py-1.5 rounded bg-[#2E5BFF] hover:bg-[#254cd6] disabled:opacity-50 text-white font-headline font-semibold text-xs transition-colors"
                    >
                      Submit Answer
                    </button>
                  </>
                ) : (
                  <div className="w-full space-y-2">
                    <div className="flex items-center justify-between">
                      <span className={`font-headline font-bold text-xs ${selectedHeroOpt === heroProblem.correctKey ? 'text-[#00e1ab]' : 'text-[#ff525c]'}`}>
                        {selectedHeroOpt === heroProblem.correctKey ? '✓ Accepted (+4 Marks)' : '✗ Incorrect (-1 Mark)'}
                      </span>
                      <button
                        onClick={() => {
                          setIsHeroSubmitted(false);
                          setSelectedHeroOpt(null);
                        }}
                        className="text-[11px] text-[#8c8c8c] hover:text-white underline"
                      >
                        Reset Drill
                      </button>
                    </div>
                    <div className="text-[11px] text-[#a3a3a3] bg-[#121212] p-2.5 rounded border border-[#222222] leading-relaxed">
                      <MathRenderer content={heroProblem.explanationLatex} />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE 4 PILLARS OF SOLVESENSE */}
      <section className="py-16 sm:py-20 px-4 sm:px-6 max-w-[1320px] mx-auto w-full">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <h2 className="text-2xl sm:text-3xl font-headline font-bold text-white tracking-tight">
            Designed for Intellectual Rigor, Not Guesswork
          </h2>
          <p className="text-xs sm:text-sm text-[#8c8c8c]">
            Traditional question banks tell you whether you were right or wrong. SolveSense diagnoses the exact breakdown point in your physical reasoning.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Pillar 1 */}
          <div className="glass-card p-6 space-y-3.5 hover:border-[#2E5BFF]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#2E5BFF]/10 border border-[#2E5BFF]/20 flex items-center justify-center text-[#2E5BFF]">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-white">
              Deterministic Evaluator
            </h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Official JEE Advanced marking conventions. Multi-correct partial scoring (+4, +2, -2) and decimal tolerance evaluation ($\pm 0.05$) for numerical problems.
            </p>
          </div>

          {/* Pillar 2 */}
          <div className="glass-card p-6 space-y-3.5 hover:border-[#00e1ab]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#00e1ab]/10 border border-[#00e1ab]/20 flex items-center justify-center text-[#00e1ab]">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-white">
              4-Tier Progressive Hints
            </h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Never get stuck staring at a blank screen. Unlock Level 1 (Intuition), Level 2 (Governing Law), Level 3 (Mathematical Strategy), or Level 4 (Methodology).
            </p>
          </div>

          {/* Pillar 3 */}
          <div className="glass-card p-6 space-y-3.5 hover:border-[#ffa116]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#ffa116]/10 border border-[#ffa116]/20 flex items-center justify-center text-[#ffa116]">
              <Layers className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-white">
              Prerequisite Knowledge DAG
            </h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              A directed graph maps conceptual dependencies. Missed a rolling motion question? The engine determines if your bottleneck is friction or moment of inertia.
            </p>
          </div>

          {/* Pillar 4 */}
          <div className="glass-card p-6 space-y-3.5 hover:border-[#ff525c]/40 transition-colors">
            <div className="w-9 h-9 rounded-lg bg-[#ff525c]/10 border border-[#ff525c]/20 flex items-center justify-center text-[#ff525c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline font-bold text-base text-white">
              9-Class Mistake Taxonomy
            </h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Automated classification distinguishes calculation slips from sign errors, wrong approximations, or missing physics prerequisites.
            </p>
          </div>
        </div>
      </section>

      {/* 3. SYLLABUS MASTERY TRACKS */}
      <section className="border-t border-[#1f1f1f] py-16 px-4 sm:px-6 max-w-[1320px] mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-headline font-bold text-white tracking-tight">
              Curriculum Mastery Tracks
            </h2>
            <p className="text-xs text-[#8c8c8c] mt-0.5">
              Structured pathways spanning classical mechanics through electrodynamics
            </p>
          </div>
          <Link
            href="/solve"
            className="text-xs font-headline font-semibold text-[#2E5BFF] hover:text-[#6d88ff] flex items-center gap-1 transition-colors"
          >
            <span>View All Problems</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {tracks.map((track) => (
            <div
              key={track.slug}
              className="glass-card p-5 rounded-lg border border-[#242424] hover:border-[#333333] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${track.color}`}>
                    {track.badge}
                  </span>
                  <span className="text-xs font-mono text-[#8c8c8c]">
                    {track.problems} Problems
                  </span>
                </div>
                <h3 className="text-sm font-headline font-bold text-white mb-2 leading-snug group-hover:text-[#2E5BFF] transition-colors">
                  {track.name}
                </h3>
                <p className="text-xs text-[#8c8c8c] leading-relaxed">
                  {track.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#222222]">
                <Link
                  href={`/solve?chapter=${track.slug}`}
                  className="text-xs font-headline font-semibold text-[#00e1ab] hover:underline flex items-center justify-between"
                >
                  <span>Practice Chapter Drill</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. CALL TO ACTION STRIP */}
      <section className="border-t border-[#1f1f1f] bg-gradient-to-b from-[#0e0e0e] to-[#121212] py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto space-y-5">
          <h2 className="text-2xl sm:text-4xl font-headline font-bold text-white tracking-tight">
            Ready to calibrate your physics reasoning?
          </h2>
          <p className="text-xs sm:text-sm text-[#8c8c8c]">
            No credit card required. Experience deterministic scoring, diagnostic mistake diagnosis, and comprehensive editorial derivations today.
          </p>
          <div className="pt-2 flex justify-center gap-3">
            <Link
              href="/solve"
              className="px-6 py-2.5 rounded-lg bg-[#00e1ab] hover:bg-[#00c997] text-black font-headline font-bold text-xs shadow-glow-emerald transition-all"
            >
              Start Solving Free
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-2.5 rounded-lg bg-[#181818] hover:bg-[#222222] border border-[#2e2e2e] text-white font-headline font-semibold text-xs transition-colors"
            >
              Open Student Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
