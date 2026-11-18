'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Code2, 
  ArrowRight, 
  CheckCircle2, 
  Terminal, 
  BookOpen, 
  Trophy, 
  Shuffle, 
  Flame, 
  ShieldCheck, 
  Cpu, 
  Layers,
  ChevronRight,
  TrendingUp,
  FileCode2
} from 'lucide-react';
import MathRenderer from '@/components/MathRenderer';

export default function HomePage() {
  const featuredProblems = [
    {
      id: 'rot-001',
      code: 'ROT-001',
      title: 'Uniform Solid Cylinder on Rough Incline under External Torque',
      chapter: 'Rotational Motion',
      diff: 'HARD',
      diffColor: 'text-[#ff375f]',
      acceptance: '38.4%',
      marks: '+4 / -1',
      isPYQ: true,
      year: '2024'
    },
    {
      id: 'kin-001',
      code: 'KIN-001',
      title: 'Relative Velocity of Pursuit in Two Dimensions with Constant Speed',
      chapter: 'Kinematics',
      diff: 'MEDIUM',
      diffColor: 'text-[#ffc01e]',
      acceptance: '52.1%',
      marks: '+4 / -1',
      isPYQ: false,
      year: null
    },
    {
      id: 'thermo-001',
      code: 'THM-001',
      title: 'Polytropic Gas Expansion along Non-Standard Indicator Diagram',
      chapter: 'Thermodynamics',
      diff: 'HARD',
      diffColor: 'text-[#ff375f]',
      acceptance: '34.2%',
      marks: '+4 / -2',
      isPYQ: true,
      year: '2023'
    },
    {
      id: 'elec-001',
      code: 'ELE-001',
      title: 'Concentric Conducting Spherical Shells with Grounding Switches',
      chapter: 'Electrostatics',
      diff: 'MEDIUM',
      diffColor: 'text-[#ffc01e]',
      acceptance: '47.8%',
      marks: '+4 / -1',
      isPYQ: true,
      year: '2024'
    },
    {
      id: 'wep-001',
      code: 'WEP-001',
      title: 'Non-Conservative Work in Variable Tension Loop-the-Loop',
      chapter: 'Work, Energy & Power',
      diff: 'EASY',
      diffColor: 'text-[#00b8a3]',
      acceptance: '68.5%',
      marks: '+4 / -1',
      isPYQ: false,
      year: null
    }
  ];

  const tracks = [
    {
      name: 'Rotational Dynamics Mastery',
      problems: 12,
      desc: 'Moment of inertia integration, instantaneous axis, pure rolling, and angular momentum conservation.',
      badge: 'Core Track',
      color: 'border-[#ffa116]/30 text-[#ffa116]',
    },
    {
      name: 'Classical Mechanics & Calculus',
      problems: 14,
      desc: 'Constrained motion, variable mass systems, impulse-momentum, and non-inertial reference frames.',
      badge: 'Foundation',
      color: 'border-[#00b8a3]/30 text-[#00b8a3]',
    },
    {
      name: 'Thermal Physics & Kinetic Theory',
      problems: 7,
      desc: 'First and second laws, cyclic processes, heat engines, and degree of freedom calculations.',
      badge: 'Standard Track',
      color: 'border-[#ffc01e]/30 text-[#ffc01e]',
    },
    {
      name: 'Electrodynamics & Field Theory',
      problems: 9,
      desc: 'Gauss law applications, image charges, multipole potentials, and dielectric boundary conditions.',
      badge: 'Advanced Track',
      color: 'border-[#a855f7]/30 text-[#a855f7]',
    },
  ];

  return (
    <div className="flex flex-col w-full bg-[#1a1a1a] text-[#eff1f6]">
      {/* 1. HERO SECTION (LeetCode / GFG Style) */}
      <section className="border-b border-[#282828] py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-[1200px] mx-auto text-center space-y-6">
          {/* Engineering Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#262626] border border-[#333333] text-xs font-mono text-[#8c8c8c]">
            <span className="w-2 h-2 rounded-full bg-[#00b8a3]" />
            <span className="text-white font-medium">ZenithPhysics Platform</span>
            <span>•</span>
            <span>Deterministic JEE Problem Solving</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight max-w-4xl mx-auto leading-tight">
            A New Way to Master <br />
            <span className="text-[#ffa116]">Competitive Exam Physics</span>
          </h1>

          <p className="max-w-2xl mx-auto text-sm sm:text-base text-[#8c8c8c] leading-relaxed">
            The deliberate practice platform built for JEE Main & Advanced aspirants. Solve verified questions with full KaTeX math precision, deterministic scoring, and progressive conceptual hints.
          </p>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/solve"
              className="px-6 py-2.5 rounded bg-[#ffa116] hover:bg-[#ff9500] text-black font-bold text-sm shadow transition-colors flex items-center gap-2"
            >
              <span>Browse Problemset</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </Link>

            <Link
              href="/auth/register"
              className="px-6 py-2.5 rounded bg-[#262626] hover:bg-[#303030] text-[#eff1f6] hover:text-white border border-[#333333] font-semibold text-sm transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Stats Bar */}
          <div className="pt-8 border-t border-[#282828] max-w-3xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-white">37+</div>
              <div className="text-xs text-[#8c8c8c] mt-0.5">Calibrated Problems</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#00b8a3]">100%</div>
              <div className="text-xs text-[#8c8c8c] mt-0.5">Deterministic Grading</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#ffa116]">4-Tier</div>
              <div className="text-xs text-[#8c8c8c] mt-0.5">Progressive Hints</div>
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-bold font-mono text-[#ff375f]">JEE Main/Adv</div>
              <div className="text-xs text-[#8c8c8c] mt-0.5">Negative Marking</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. FEATURED PROBLEM & LIVE TABLE PREVIEW */}
      <section className="py-14 px-4 sm:px-6 max-w-[1200px] mx-auto w-full space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Code2 className="w-5 h-5 text-[#ffa116]" />
              <span>Trending JEE Physics Problems</span>
            </h2>
            <p className="text-xs text-[#8c8c8c] mt-1">
              Hand-picked practice problems spanning core mechanics and electrodynamics.
            </p>
          </div>

          <Link
            href="/solve"
            className="text-xs font-semibold text-[#ffa116] hover:underline flex items-center gap-1 self-start sm:self-auto"
          >
            <span>View all 37 questions</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* LeetCode Clean Problem Table */}
        <div className="rounded border border-[#333333] overflow-hidden bg-[#262626]">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-[#333333] bg-[#212121] text-[#8c8c8c] uppercase tracking-wider text-[11px] font-semibold">
                  <th className="py-3 px-4 w-12 text-center">#</th>
                  <th className="py-3 px-4">Title</th>
                  <th className="py-3 px-4 w-32">Topic</th>
                  <th className="py-3 px-4 w-24 text-right">Acceptance</th>
                  <th className="py-3 px-4 w-24 text-center">Difficulty</th>
                  <th className="py-3 px-4 w-28 text-right">Marks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#303030]">
                {featuredProblems.map((p, idx) => (
                  <tr
                    key={p.id}
                    className="lc-row cursor-pointer group"
                  >
                    <td className="py-3 px-4 text-center font-mono text-[#8c8c8c]">
                      {idx + 1}
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/solve/${p.id}`}
                        className="text-[#eff1f6] group-hover:text-[#ffa116] font-medium transition-colors flex items-center gap-2"
                      >
                        <span>{p.title}</span>
                        {p.isPYQ && (
                          <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2b2416] text-[#ffa116] border border-[#4a3b1d]">
                            PYQ {p.year}
                          </span>
                        )}
                      </Link>
                    </td>
                    <td className="py-3 px-4 text-[#8c8c8c] font-medium">
                      {p.chapter}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#8c8c8c]">
                      {p.acceptance}
                    </td>
                    <td className="py-3 px-4 text-center font-semibold">
                      <span className={p.diffColor}>{p.diff}</span>
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-[#8c8c8c]">
                      {p.marks}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 3. CURATED CURRICULUM TRACKS */}
      <section className="border-t border-[#282828] py-14 px-4 sm:px-6 bg-[#212121]">
        <div className="max-w-[1200px] mx-auto space-y-8">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Curated JEE Physics Study Tracks
            </h2>
            <p className="text-xs text-[#8c8c8c] mt-1">
              Structured progressive tracks designed to systematically eliminate conceptual prerequisites gaps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {tracks.map((track) => (
              <div
                key={track.name}
                className="p-5 rounded bg-[#262626] border border-[#333333] hover:border-[#4a4a4a] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-wider font-semibold px-2 py-0.5 rounded border ${track.color}`}>
                      {track.badge}
                    </span>
                    <span className="text-xs font-mono text-[#8c8c8c]">
                      {track.problems} Qs
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-white mb-2 leading-snug">
                    {track.name}
                  </h3>
                  <p className="text-xs text-[#8c8c8c] leading-relaxed">
                    {track.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-[#333333]">
                  <Link
                    href="/solve"
                    className="text-xs font-semibold text-[#ffa116] hover:underline flex items-center justify-between"
                  >
                    <span>Start Practice</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. PLATFORM ARCHITECTURE */}
      <section className="border-t border-[#282828] py-14 px-4 sm:px-6 max-w-[1200px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 rounded bg-[#262626] border border-[#333333] space-y-3">
            <div className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#383838] flex items-center justify-center text-[#00b8a3]">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Deterministic Grading Engine</h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Official JEE marking schemes. Single-correct (+4/-1), Multi-correct partial scoring (+4/+2/-2), and numerical evaluation with precision tolerances.
            </p>
          </div>

          <div className="p-5 rounded bg-[#262626] border border-[#333333] space-y-3">
            <div className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#383838] flex items-center justify-center text-[#ffa116]">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">Concept Dependency DAG</h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Directed prerequisite graphs track root causes. If you miss a rolling dynamics question, the engine identifies whether your bottleneck is friction or moment of inertia.
            </p>
          </div>

          <div className="p-5 rounded bg-[#262626] border border-[#333333] space-y-3">
            <div className="w-8 h-8 rounded bg-[#1f1f1f] border border-[#383838] flex items-center justify-center text-[#ff375f]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-white">9-Class Mistake Taxonomy</h3>
            <p className="text-xs text-[#8c8c8c] leading-relaxed">
              Automated classification distinguishes calculation slips from sign errors, wrong approximations, or missing physics prerequisites.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-[#282828] py-8 px-4 sm:px-6 bg-[#171717] text-xs text-[#8c8c8c]">
        <div className="max-w-[1200px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold text-white">ZenithCode Physics</span>
            <span>•</span>
            <span>Deterministic Competitive Exam Platform</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/solve" className="hover:text-white">Problems</Link>
            <Link href="/contests" className="hover:text-white">Contests</Link>
            <Link href="/analytics" className="hover:text-white">Analytics</Link>
            <Link href="/institutes" className="hover:text-white">Institutes</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
