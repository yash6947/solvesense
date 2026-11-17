'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  HelpCircle, 
  BrainCircuit, 
  Target, 
  Trophy, 
  BarChart4, 
  ShieldCheck, 
  BookOpen, 
  Layers, 
  Compass,
  Cpu
} from 'lucide-react';
import MathRenderer from '@/components/MathRenderer';

export default function HomePage() {
  const sampleLatexFormula = '$$\\tau = I\\alpha \\implies \\vec{L} = \\int (\\vec{r} \\times \\vec{v}) \\, dm$$';

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-32 bg-gradient-to-b from-background via-surface/40 to-background">
        {/* Subtle background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/15 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-electric/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-electric text-xs sm:text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-electric animate-pulse" />
            <span>LeetCode-Style Physics Problem Solving Powered by Gemini AI</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Don&apos;t Just Solve Questions.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-electric to-blue-200">
              Master the Concepts Behind Them.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An intelligent learning platform that helps competitive exam aspirants solve better, understand their mistakes, and improve through personalized AI-powered practice.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/25 transition-all text-base"
            >
              Start Learning
              <ArrowRight className="w-5 h-5" />
            </Link>

            <Link
              href="/solve"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-slate-200 bg-surface hover:bg-surface/80 border border-card-border hover:border-slate-600 transition-all text-base"
            >
              <BookOpen className="w-5 h-5 text-electric" />
              Explore Question Bank
            </Link>
          </div>

          {/* Social Proof / Pillars */}
          <div className="mt-14 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-card/60 border border-card-border backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">4-Tier</div>
              <div className="text-xs text-slate-400 mt-0.5">Progressive Hints</div>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-card-border backdrop-blur-sm">
              <div className="text-2xl font-bold text-electric">9 Classes</div>
              <div className="text-xs text-slate-400 mt-0.5">Mistake Diagnosis</div>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-card-border backdrop-blur-sm">
              <div className="text-2xl font-bold text-white">Prerequisite</div>
              <div className="text-xs text-slate-400 mt-0.5">Knowledge Graphs</div>
            </div>
            <div className="p-4 rounded-xl bg-card/60 border border-card-border backdrop-blur-sm">
              <div className="text-2xl font-bold text-emerald-400">PSI Score</div>
              <div className="text-xs text-slate-400 mt-0.5">Problem-Solving Index</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEETCODE-STYLE WORKSPACE DEMO PREVIEW */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-xs uppercase tracking-widest text-electric font-semibold mb-2">
              The Workspace Experience
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              A 3-Panel Problem-Solving Interface Engineered for JEE Physics
            </h3>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Say goodbye to PDF answer keys. Experience active, multi-modal problem solving with integrated KaTeX typography, real-time formula scratchpads, and deterministic grading.
            </p>
          </div>

          {/* Interactive UI Mock Window */}
          <div className="rounded-2xl border border-card-border bg-card overflow-hidden shadow-2xl">
            {/* Window Title Bar */}
            <div className="bg-surface/80 px-4 py-3 border-b border-card-border flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-slate-300">PHY-ADV-2024-ROT-01 • JEE Advanced 2024</span>
              </div>
              <div className="flex items-center gap-4">
                <span className="px-2 py-0.5 rounded bg-red-500/10 text-red-400 border border-red-500/20 font-medium">
                  HARD • 4 Marks
                </span>
                <span className="font-mono text-slate-300">03:42</span>
              </div>
            </div>

            {/* 3 Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
              {/* Left Panel: Problem Statement */}
              <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-card-border space-y-4">
                <div className="flex items-center gap-2 text-xs text-electric font-semibold uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Problem Statement</span>
                </div>
                <div className="text-slate-200 text-sm leading-relaxed">
                  A uniform disk of mass $M$ and radius $R$ is pivoted at its center. A block of mass $m$ is attached to a light cord wound around its rim. If released from rest:
                </div>
                <MathRenderer content={sampleLatexFormula} />
                <div className="text-slate-300 text-sm">
                  Find the linear acceleration of mass $m$ in terms of $g$, $M$, and $m$.
                </div>
              </div>

              {/* Center Panel: Answer Input */}
              <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-card-border space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
                    <Target className="w-4 h-4 text-blue-400" />
                    <span>Select Correct Option</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { key: 'A', text: '$a = \\frac{mg}{M + 2m}$' },
                      { key: 'B', text: '$a = \\frac{2mg}{M + 2m}$' },
                      { key: 'C', text: '$a = \\frac{mg}{M + m}$' },
                      { key: 'D', text: '$a = \\frac{2mg}{2M + m}$' },
                    ].map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-lg border text-sm flex items-center justify-between cursor-pointer transition-colors ${
                          opt.key === 'B'
                            ? 'bg-blue-600/15 border-blue-500/50 text-white'
                            : 'bg-surface/50 border-card-border text-slate-300 hover:bg-surface'
                        }`}
                      >
                        <span className="font-mono font-semibold text-slate-400 mr-2">{opt.key}.</span>
                        <div className="flex-1">
                          <MathRenderer content={opt.text} inline />
                        </div>
                        {opt.key === 'B' && <CheckCircle2 className="w-4 h-4 text-blue-400 ml-2" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-card-border flex items-center justify-between">
                  <span className="text-xs text-slate-400">Deterministic auto-evaluation</span>
                  <button className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md">
                    Submit Answer
                  </button>
                </div>
              </div>

              {/* Right Panel: AI Mentor */}
              <div className="lg:col-span-3 p-6 bg-surface/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    <Sparkles className="w-4 h-4" />
                    <span>Gemini AI Mentor</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-electric font-medium">
                    Strict Mode
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3 rounded-lg bg-surface border border-card-border text-slate-300 space-y-1.5">
                    <div className="font-semibold text-white flex items-center gap-1">
                      <HelpCircle className="w-3.5 h-3.5 text-electric" />
                      <span>Level 1 Hint: Free Body Setup</span>
                    </div>
                    <p className="text-slate-400 leading-normal">
                      Isolate the mass $m$ and the disk separately. For the disk, the torque about the pivot is caused solely by the cord tension $T$.
                    </p>
                  </div>

                  <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                    <div className="font-semibold text-emerald-200 mb-1">Mistake Prevention:</div>
                    Remember the moment of inertia of a solid disk is $I = \\frac{1}{2}MR^2$, not $MR^2$.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PILLARS */}
      <section className="py-20 bg-surface/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs uppercase tracking-widest text-electric font-semibold mb-2">
              Educational Differentiation
            </h2>
            <h3 className="text-3xl sm:text-4xl font-bold text-white">
              The Four Questions Our AI System Answers
            </h3>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              Traditional platforms tell you if you got a 4 or a -1. ZenithPhysics uncovers the cognitive divergence in your thought process.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600/15 border border-blue-500/20 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">1. What can you solve?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Demonstrated mastery verified through deterministic evaluation across Single-Correct, Multi-Correct, and Numerical formats.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border/60 text-xs font-mono text-electric">
                Calibrated Accuracy Tracking
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-600/15 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">2. What do you understand?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Prerequisite concept graphs track your mastery of foundational laws: from basic vector algebra to coupled rigid-body dynamics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border/60 text-xs font-mono text-purple-400">
                Directed Concept Mapping
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-600/15 border border-amber-500/20 flex items-center justify-center mb-5">
                  <BrainCircuit className="w-6 h-6 text-amber-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">3. Where are you struggling?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  9-class mistake classification distinguishes between pure calculation errors, sign convention slip-ups, or deeper conceptual misunderstandings.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border/60 text-xs font-mono text-amber-400">
                9-Class Mistake Taxonomy
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl bg-card border border-card-border hover:border-blue-500/30 transition-all flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Cpu className="w-6 h-6 text-emerald-400" />
                </div>
                <h4 className="text-lg font-bold text-white mb-2">4. What to practise next?</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Adaptive recommendation engine schedules calibrated practice targeting your exact missing prerequisites to eliminate learning debt.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-card-border/60 text-xs font-mono text-emerald-400">
                Dynamic Recommender Engine
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION */}
      <section className="py-20 bg-background border-t border-card-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-r from-blue-900/30 via-surface to-blue-950/40 border border-blue-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Elevate Your JEE Problem-Solving?
              </h3>
              <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg">
                Join competitive aspirants solving JEE Main & Advanced Physics problems with diagnostic AI mentoring and concept mastery tracking.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/register"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-600/30 transition-all text-base"
                >
                  Create Student Account
                </Link>
                <Link
                  href="/solve"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-200 bg-surface hover:bg-surface/80 border border-card-border transition-all text-base"
                >
                  Try Sample Problems
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
