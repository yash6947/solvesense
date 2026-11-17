import React from 'react';
import Link from 'next/link';
import { Atom, Github, Award, Sparkles, BookOpen } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-card-border bg-[#070a12] text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <Atom className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg text-white">
                Zenith<span className="text-electric">Physics</span>
              </span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              An intelligent learning ecosystem engineered to diagnose knowledge gaps, foster independent reasoning, and master JEE Main & JEE Advanced Physics.
            </p>
            <div className="text-xs text-slate-500">
              Product Principle: &ldquo;Don&apos;t just solve questions. Understand why.&rdquo;
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Practice & Solve
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/solve" className="hover:text-electric transition-colors">
                  JEE Advanced Question Bank
                </Link>
              </li>
              <li>
                <Link href="/solve?difficulty=HARD" className="hover:text-electric transition-colors">
                  Challenging Mechanics Problems
                </Link>
              </li>
              <li>
                <Link href="/solve?isPYQ=true" className="hover:text-electric transition-colors">
                  Previous Year Questions (PYQs)
                </Link>
              </li>
              <li>
                <Link href="/contests" className="hover:text-electric transition-colors">
                  Weekly Proctored Mock Tests
                </Link>
              </li>
            </ul>
          </div>

          {/* Learning Tech */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              AI & Architecture
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li className="flex items-center gap-2 text-slate-300">
                <Sparkles className="w-4 h-4 text-electric" />
                <span>Google Gemini AI Mentor</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Prerequisite Knowledge Graphs</span>
              </li>
              <li className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Problem-Solving Index (PSI)</span>
              </li>
            </ul>
          </div>

          {/* Institutional & Legal */}
          <div>
            <h4 className="text-sm font-semibold text-slate-200 uppercase tracking-wider mb-4">
              Ecosystem
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/institutes" className="hover:text-electric transition-colors">
                  For Coaching Institutes
                </Link>
              </li>
              <li>
                <Link href="/scholarships" className="hover:text-electric transition-colors">
                  Talent Discovery & Scholarships
                </Link>
              </li>
              <li>
                <span className="text-slate-500">PostgreSQL + Prisma Verified Engine</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-card-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} ZenithPhysics EdTech SaaS. Built for JEE Main & Advanced Aspirants.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400">Strict & Collaborative Mentoring</span>
            <span>•</span>
            <span className="hover:text-slate-400">Deterministic Evaluation Engine</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
