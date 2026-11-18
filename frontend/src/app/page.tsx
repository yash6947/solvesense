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
  BookOpen, 
  Layers, 
  Compass,
  Cpu,
  Flame,
  Check,
  Shield,
  Zap
} from 'lucide-react';
import MathRenderer from '@/components/MathRenderer';

export default function HomePage() {
  const sampleLatexFormula = '$$\\tau = I\\alpha \\implies \\vec{L} = \\int (\\vec{r} \\times \\vec{v}) \\, dm$$';

  return (
    <div className="flex flex-col w-full">
      {/* 1. HERO SECTION (Flowbite + Flow Aesthetic) */}
      <section className="relative overflow-hidden pt-20 pb-24 md:pt-28 md:pb-36">
        {/* Subtle radial ambient glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[380px] bg-blue-600/12 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-12 w-[350px] h-[350px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 left-12 w-[300px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          {/* Top Pill Announcement */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span>
            <span className="text-slate-300">Powered by</span>
            <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Google Gemini AI</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 hidden sm:inline">JEE Physics Diagnostic Engine</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white max-w-5xl mx-auto leading-[1.12]">
            Don&apos;t Just Solve Questions.{' '}
            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300">
              Master the Concepts Behind Them.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
            An intelligent problem-solving platform engineered for JEE Main & Advanced aspirants. Uncover your conceptual gaps, track prerequisite learning debt, and improve with real-time AI guidance.
          </p>

          {/* Call to Actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/auth/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all text-sm sm:text-base group"
            >
              <span>Start Learning Free</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/solve"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-sm sm:text-base"
            >
              <BookOpen className="w-4 h-4 text-cyan-400" />
              <span>Browse 37+ Problems</span>
            </Link>
          </div>

          {/* Stats Bar (Flowbite Clean Metrics) */}
          <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 rounded-xl flow-card text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Hints</span>
                <Sparkles className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">4-Tier</div>
              <div className="text-xs text-slate-400 mt-0.5">Progressive Socratic Clues</div>
            </div>

            <div className="p-4 rounded-xl flow-card text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Diagnosis</span>
                <BrainCircuit className="w-4 h-4 text-indigo-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">9 Classes</div>
              <div className="text-xs text-slate-400 mt-0.5">Cognitive Mistake Taxonomy</div>
            </div>

            <div className="p-4 rounded-xl flow-card text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Concept Graph</span>
                <Layers className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">DAG Traversal</div>
              <div className="text-xs text-slate-400 mt-0.5">Prerequisite Gap Detection</div>
            </div>

            <div className="p-4 rounded-xl flow-card text-left">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Index</span>
                <Zap className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white tracking-tight">PSI Score</div>
              <div className="text-xs text-slate-400 mt-0.5">Multi-Factor Skill Metric</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. LEETCODE-STYLE WORKSPACE DEMO PREVIEW */}
      <section className="py-20 border-t border-slate-800/80 bg-slate-950/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="flow-pill flow-pill-blue mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>The Workspace</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              A 3-Panel Problem Interface Built for Real Competitive Physics
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              No generic PDF solutions. Active problem solving with integrated KaTeX typography, real-time scratchpads, and deterministic grading.
            </p>
          </div>

          {/* Interactive UI Mock Window */}
          <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl shadow-black/40">
            {/* Window Title Bar */}
            <div className="bg-slate-950 px-5 py-3 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-slate-300 font-medium">PHY-ADV-24-ROT-01 • Rotational Dynamics</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="flow-pill flow-pill-rose text-[11px] py-0.5">
                  HARD • 4 Marks
                </span>
                <span className="font-mono text-slate-300 bg-slate-900 px-2.5 py-0.5 rounded border border-slate-800">
                  03:42
                </span>
              </div>
            </div>

            {/* 3 Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[420px]">
              {/* Left Panel: Problem Statement */}
              <div className="lg:col-span-5 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4">
                <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <Compass className="w-4 h-4" />
                  <span>Question Statement</span>
                </div>
                <div className="text-slate-200 text-sm leading-relaxed">
                  <MathRenderer content="A uniform solid cylinder of mass $M$ and radius $R$ is placed on a rough horizontal surface with coefficient of friction $\mu$. A horizontal force $F$ is applied at height $h = \frac{3R}{2}$ above the central axis:" />
                </div>
                <MathRenderer content={sampleLatexFormula} />
                <div className="text-slate-300 text-sm">
                  <MathRenderer content="What is the linear acceleration $a_{cm}$ of the center of mass if the cylinder rolls without slipping?" />
                </div>
              </div>

              {/* Center Panel: Answer Input */}
              <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-slate-800 space-y-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-slate-400 font-semibold uppercase tracking-wider mb-4">
                    <Target className="w-4 h-4 text-cyan-400" />
                    <span>Select Correct Option</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { key: 'A', text: '$a_{cm} = \\frac{F}{M}$' },
                      { key: 'B', text: '$a_{cm} = \\frac{5F}{3M}$', selected: true },
                      { key: 'C', text: '$a_{cm} = \\frac{2F}{3M}$' },
                      { key: 'D', text: '$a_{cm} = \\frac{4F}{3M}$' },
                    ].map((opt) => (
                      <div
                        key={opt.key}
                        className={`p-3.5 rounded-xl border text-sm flex items-center justify-between cursor-pointer transition-all ${
                          opt.selected
                            ? 'bg-blue-600/15 border-blue-500/50 text-white shadow-sm shadow-blue-500/10'
                            : 'bg-slate-950/50 border-slate-800 text-slate-300 hover:bg-slate-800/50 hover:border-slate-700'
                        }`}
                      >
                        <span className={`font-mono font-bold mr-2 text-xs ${opt.selected ? 'text-blue-400' : 'text-slate-500'}`}>
                          {opt.key}.
                        </span>
                        <div className="flex-1 font-medium">
                          <MathRenderer content={opt.text} inline />
                        </div>
                        {opt.selected && <CheckCircle2 className="w-4 h-4 text-blue-400 ml-2" />}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-400">JEE Marking: +4.0 / -1.0</span>
                  <button className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-md shadow-blue-600/30 transition-all">
                    Submit Answer
                  </button>
                </div>
              </div>

              {/* Right Panel: AI Mentor */}
              <div className="lg:col-span-3 p-6 bg-slate-950/40 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Gemini AI Mentor</span>
                  </div>
                  <span className="flow-pill flow-pill-purple text-[10px] py-0.5">
                    Strict Mode
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 space-y-1.5 shadow-sm">
                    <div className="font-semibold text-white flex items-center gap-1.5">
                      <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Level 1 Hint: Contact Point</span>
                    </div>
                    <p className="text-slate-400 leading-normal">
                      Take torque about the instantaneous axis of rotation passing through the contact point with the floor to eliminate friction.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 space-y-1">
                    <div className="font-semibold text-emerald-200 flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Concept Verified</span>
                    </div>
                    <div className="text-emerald-300/90 leading-normal text-[11px]">
                      <MathRenderer content="Parallel axis theorem: $I_P = I_{cm} + MR^2 = \frac{3}{2}MR^2$." inline />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE VALUE PILLARS (Flowbite 4-Column Feature Grid) */}
      <section className="py-24 border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="flow-pill flow-pill-blue mb-3">
              <Shield className="w-3.5 h-3.5" />
              <span>Diagnostic System</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              The Four Questions Our AI System Answers
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base leading-relaxed">
              Traditional mock test sites tell you your score. ZenithPhysics uncovers the exact cognitive bottleneck in your reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Pillar 1 */}
            <div className="p-6 rounded-2xl flow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                  <CheckCircle2 className="w-6 h-6 text-blue-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">1. What can you solve?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Demonstrated mastery verified through deterministic evaluation across Single-Correct, Multi-Correct partial marking, and Numerical problems.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-cyan-400 font-semibold">
                Calibrated Accuracy Tracking
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="p-6 rounded-2xl flow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                  <Layers className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">2. What do you understand?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Prerequisite concept graphs track your understanding of foundational principles: from calculus differentiation to rotational dynamics.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-purple-400 font-semibold">
                Directed Concept Mapping
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="p-6 rounded-2xl flow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-5">
                  <BrainCircuit className="w-6 h-6 text-amber-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">3. Where are you struggling?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  9-class mistake classification distinguishes between calculation errors, sign convention slip-ups, or deep prerequisite conceptual gaps.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-amber-400 font-semibold">
                9-Class Mistake Taxonomy
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="p-6 rounded-2xl flow-card flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                  <Cpu className="w-6 h-6 text-emerald-400" />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">4. What to practise next?</h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Adaptive recommendation engine schedules calibrated practice targeting your exact missing prerequisites to eliminate learning debt.
                </p>
              </div>
              <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-emerald-400 font-semibold">
                Dynamic Recommender Engine
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CALL TO ACTION (Flowbite Clean Gradient Box) */}
      <section className="py-24 border-t border-slate-800/80 bg-slate-950/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-10 sm:p-14 rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
            <div className="relative z-10 space-y-6">
              <div className="flow-pill flow-pill-blue mx-auto">
                <Flame className="w-3.5 h-3.5" />
                <span>Begin Preparation Today</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                Ready to Master JEE Physics?
              </h2>
              <p className="text-slate-300 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
                Join competitive aspirants solving JEE Main & Advanced Physics problems with diagnostic AI mentoring and concept mastery tracking.
              </p>
              <div className="pt-3 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/auth/register"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-white bg-blue-600 hover:bg-blue-500 shadow-lg shadow-blue-600/30 transition-all text-sm sm:text-base"
                >
                  Create Student Account
                </Link>
                <Link
                  href="/solve"
                  className="w-full sm:w-auto px-8 py-3.5 rounded-xl font-semibold text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all text-sm sm:text-base"
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
